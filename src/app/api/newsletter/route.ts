import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

interface Subscriber {
  email: string;
  timestamp: number;
  segment?: string;
  userAgent?: string;
}

interface SubscribersData {
  subscribers: Subscriber[];
}

// Rate limiting: track IPs to prevent spam
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 60000; // 1 minute between submissions per IP

async function loadSubscribers(): Promise<SubscribersData> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    // File doesn't exist yet, return empty
    return { subscribers: [] };
  }
}

async function saveSubscribers(data: SubscribersData): Promise<void> {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, honeypot, segment } = body;

    // 1. Honeypot check (if honeypot field is filled, it's a bot)
    if (honeypot) {
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
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

    // 4. Load existing subscribers
    const data = await loadSubscribers();

    // 5. Check for duplicates
    const exists = data.subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // 6. Add new subscriber
    const subscriber: Subscriber = {
      email: email.toLowerCase(),
      timestamp: now,
      segment,
      userAgent: request.headers.get('user-agent') || undefined,
    };

    data.subscribers.push(subscriber);
    await saveSubscribers(data);

    // 7. Update rate limit tracking
    recentSubmissions.set(ip, now);

    // Clean up old rate limit entries (older than 5 minutes)
    for (const [key, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > 300000) {
        recentSubmissions.delete(key);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
