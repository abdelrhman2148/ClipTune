# Email Automation Testing Guide

## Quick Test Commands

### 1. Test Welcome Email

**Via Webhook:**
```bash
curl -X POST http://localhost:3000/api/webhooks/user-created \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test-secret" \
  -d '{
    "type": "INSERT",
    "table": "users",
    "record": {
      "id": "test-user-123",
      "email": "test@example.com",
      "created_at": "2024-01-15T10:00:00Z"
    }
  }'
```

**Direct API:**
```bash
curl -X POST http://localhost:3000/api/email/welcome \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }'
```

### 2. Test Upgrade Email

```bash
curl -X POST http://localhost:3000/api/email/upgrade \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "creditsUsed": 2,
    "creditsTotal": 3,
    "discountCode": "UPGRADE20"
  }'
```

### 3. Test Re-engagement Email

```bash
curl -X POST http://localhost:3000/api/email/re-engagement \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "daysInactive": 7,
    "discountCode": "COMEBACK30"
  }'
```

### 4. Test Cron Job

```bash
curl -X GET http://localhost:3000/api/cron/email-automation \
  -H "Authorization: Bearer test-secret"
```

---

## Using Test Scripts

### Bash Script

```bash
# Make executable
chmod +x scripts/test-email-automation.sh

# Run tests
./scripts/test-email-automation.sh

# Or with custom URL
./scripts/test-email-automation.sh https://your-domain.com
```

### Node.js Script

```bash
# Run with Node.js
node scripts/test-email-automation.js

# Or with custom environment
BASE_URL=https://your-domain.com \
USER_WEBHOOK_SECRET=your-secret \
CRON_SECRET=your-secret \
node scripts/test-email-automation.js
```

---

## Expected Responses

### Success Response
```json
{
  "success": true,
  "message": "Welcome email sent"
}
```

### Error Response (No API Key)
```json
{
  "success": false,
  "error": "Email service not configured"
}
```

### Cron Job Response
```json
{
  "success": true,
  "timestamp": "2024-01-15T10:00:00Z",
  "results": {
    "upgradeEmails": {
      "sent": 5,
      "errors": 0
    },
    "reEngagementEmails": {
      "sent": 12,
      "errors": 0
    }
  }
}
```

---

## Testing Checklist

- [ ] Welcome email sends successfully
- [ ] Upgrade email sends successfully
- [ ] Re-engagement email sends successfully
- [ ] Cron job executes and processes users
- [ ] Webhook authentication works
- [ ] Error handling works (missing API key)
- [ ] Email templates render correctly
- [ ] Check Resend dashboard for delivery

---

## Troubleshooting

### "Email service not configured"
- Set `RESEND_API_KEY` in `.env.local`
- Restart dev server

### "Unauthorized" errors
- Check `USER_WEBHOOK_SECRET` or `CRON_SECRET`
- Verify Authorization header matches

### Emails not appearing in Resend
- Check Resend dashboard
- Verify domain is verified (for production)
- Check spam folder

### Cron job not finding users
- Ensure Supabase has user data
- Check database connection
- Verify table names match

---

**Status:** Ready for Testing ✅

