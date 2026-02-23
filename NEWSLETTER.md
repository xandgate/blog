# Newsletter Implementation Guide

## ✅ What's Implemented

Your blog now has a **self-hosted, spam-proof newsletter signup** that:

✨ **Anti-Spam Features:**
- Honeypot field (catches bots)
- Server-side rate limiting (1 submission/minute per IP)
- Client-side rate limiting (localStorage)
- Email validation (client + server)
- Duplicate detection

📊 **Analytics Ready:**
- Captures visitor segment (`govtech` or `ai-enabled`)
- Timestamps all signups
- Stores user agent for analytics

🔒 **Privacy First:**
- Data stored locally in `data/subscribers.json`
- File is git-ignored (never committed)
- No third-party tracking

## 📁 Files Created

```
src/
├── app/api/newsletter/route.ts    # API endpoint for submissions
├── components/
│   ├── Mailchimp.tsx              # Updated with self-hosted API
│   └── NewsletterSignup.tsx       # Alternative standalone component
data/
├── .gitkeep                       # Marks directory for git
├── README.md                      # Subscriber management guide
└── subscribers.json               # Your email list (auto-created, git-ignored)
```

## 🚀 Usage

The newsletter signup is **already live** on your homepage! The existing `<Mailchimp />` component now uses your self-hosted API instead of Mailchimp's external form.

### Alternative: Standalone Component

If you want to add newsletter signup elsewhere (e.g., blog post pages), use:

```tsx
import NewsletterSignup from '@/components/NewsletterSignup';

<NewsletterSignup segment="govtech" />
```

## 📧 Managing Subscribers

### View All Emails

```bash
cd /Users/varunbaker/dev/magic-portfolio
cat data/subscribers.json | jq -r '.subscribers[].email'
```

### Export to CSV

```bash
echo "email,timestamp,segment" > subscribers.csv
cat data/subscribers.json | jq -r '.subscribers[] | [.email, .timestamp, .segment] | @csv' >> subscribers.csv
```

### Count Subscribers

```bash
cat data/subscribers.json | jq '.subscribers | length'
```

### Filter by Segment

```bash
# Govtech subscribers
cat data/subscribers.json | jq -r '.subscribers[] | select(.segment=="govtech") | .email'

# AI-enabled subscribers
cat data/subscribers.json | jq -r '.subscribers[] | select(.segment=="ai-enabled") | .email'
```

## 📊 A/B Testing with Segments

Your blog automatically segments visitors:
- **US visitors** → `govtech` (see Drupal/govtech content)
- **International** → `ai-enabled` (see AI/architect content)

Track engagement in Google Analytics:

1. Add GA4 custom dimensions for `segment`
2. Track which segment converts better
3. Track which segment engages more with content

### Google Analytics Setup

In your GA4 property:
1. **Admin** → **Data display** → **Custom definitions**
2. Create dimension: `visitor_segment`
3. Add tracking code to send segment with events

Example tracking code:
```typescript
gtag('event', 'newsletter_signup', {
  visitor_segment: context.affinity.segment,
  custom_parameter: value
});
```

## 🔄 Migrating to Mailchimp (Later)

When ready to use a newsletter platform:

1. Export emails: `cat data/subscribers.json | jq -r '.subscribers[].email' > emails.txt`
2. Import to Mailchimp/ConvertKit/etc.
3. Update `/src/app/api/newsletter/route.ts` to post to their API
4. Keep honeypot + rate limiting for continued spam protection

## 🧪 Testing

Test the signup form:
1. Open your blog locally: `npm run dev`
2. Go to homepage
3. Try submitting (valid email → success)
4. Try again immediately (rate limit → error)
5. Check `data/subscribers.json` to see your entry

## 🛡️ Security Notes

- Server-side validation prevents injection attacks
- Rate limiting prevents spam floods
- Honeypot catches most bots without CAPTCHA
- No passwords stored (email only)
- `subscribers.json` never committed to git

## 📈 Next Steps

1. **Add Google Analytics** to track segment performance
2. **Test on production** after deploying
3. **Monitor spam** in `subscribers.json` (check for suspicious patterns)
4. **Send your first newsletter** when you have content!

---

Need help? Check `/data/README.md` for subscriber management or ask Vee!
