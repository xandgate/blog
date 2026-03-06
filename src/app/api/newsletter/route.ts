import { NextRequest, NextResponse } from 'next/server';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

// Rate limiting: track IPs to prevent spam
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 60000; // 1 minute between submissions per IP

export async function POST(request: NextRequest) {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
    console.error('Mailchimp environment variables not configured');
    return NextResponse.json(
      { error: 'Newsletter service not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { email, honeypot } = body;

    // 1. Honeypot check
    if (honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // 3. Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const lastSubmission = recentSubmissions.get(ip);

    if (lastSubmission && now - lastSubmission < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: 'Please wait before submitting again' },
        { status: 429 }
      );
    }

    // 4. Subscribe via Mailchimp API
    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email_address: email.toLowerCase(),
        status: 'subscribed',
        tags: ['blog'],
      }),
    });

    const data = await response.json();

    // Already subscribed — treat as success (don't leak subscription status)
    if (response.status === 400 && data.title === 'Member Exists') {
      return NextResponse.json({ success: true, message: 'Successfully subscribed!' }, { status: 200 });
    }

    if (!response.ok) {
      console.error('Mailchimp error:', data);
      return NextResponse.json(
        { error: 'Could not subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // 5. Update rate limit tracking
    recentSubmissions.set(ip, now);
    for (const [key, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > 300000) recentSubmissions.delete(key);
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
