# Newsletter Subscribers

## File Structure

- `subscribers.json` - Contains all email addresses (git-ignored for privacy)

## Format

```json
{
  "subscribers": [
    {
      "email": "example@email.com",
      "timestamp": 1706890800000,
      "segment": "govtech",
      "userAgent": "Mozilla/5.0..."
    }
  ]
}
```

## Exporting Subscribers

To export email addresses for use with a newsletter platform:

```bash
# All emails (one per line)
cat subscribers.json | jq -r '.subscribers[].email'

# CSV format
echo "email,timestamp,segment" > subscribers.csv
cat subscribers.json | jq -r '.subscribers[] | [.email, .timestamp, .segment] | @csv' >> subscribers.csv
```

## Migrating to a Platform

When ready to use Mailchimp, ConvertKit, etc.:

1. Export emails using the commands above
2. Import to your platform
3. Update the API route to send to their API instead of JSON file
4. Keep the same honeypot + rate limiting for spam protection

## Security Notes

- `subscribers.json` is git-ignored (never committed)
- Server-side validation prevents spam
- Honeypot catches most bots
- Rate limiting: 1 submission per minute per IP
- Client-side localStorage prevents double submissions
