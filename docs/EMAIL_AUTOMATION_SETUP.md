# Email Automation Setup Guide

## Overview
This guide explains how to set up automated email triggers for ClipTune, including welcome emails, upgrade prompts, and re-engagement campaigns.

---

## Automation Types

### 1. Real-Time Triggers (Webhooks)
These fire immediately when events occur:

- **User Signup** → Welcome Email
- **Subscription Started** → Welcome Email (if first subscription)
- **Low Credits** → Upgrade Email (can also be scheduled)

### 2. Scheduled Tasks (Cron Jobs)
These run on a schedule (daily recommended):

- **Low Credits Check** → Upgrade Email
- **Inactive Users** → Re-engagement Email

---

## Setup Instructions

### Step 1: Environment Variables

Add to `.env.local`:

```bash
# Email Automation
RESEND_API_KEY=re_xxxxx
USER_WEBHOOK_SECRET=your-secret-key-here
CRON_SECRET=your-cron-secret-here
```

**Generate Secrets:**
```bash
# Generate random secrets
openssl rand -hex 32
```

---

### Step 2: Supabase Database Webhook (Recommended)

Set up a webhook to trigger welcome emails when users are created.

#### Option A: Supabase Dashboard

1. Go to Supabase Dashboard → Database → Webhooks
2. Click "Create a new hook"
3. Configure:
   - **Name:** User Created Webhook
   - **Table:** `users`
   - **Events:** INSERT
   - **Type:** HTTP Request
   - **URL:** `https://your-domain.com/api/webhooks/user-created`
   - **HTTP Method:** POST
   - **HTTP Headers:**
     ```
     Authorization: Bearer your-secret-key-here
     Content-Type: application/json
     ```
   - **HTTP Request Body:**
     ```json
     {
       "type": "INSERT",
       "table": "users",
       "record": {
         "id": "{id}",
         "email": "{email}",
         "created_at": "{created_at}"
       }
     }
     ```

#### Option B: SQL Function (Alternative)

Create a database function that triggers on user creation:

```sql
-- Create function to send webhook
CREATE OR REPLACE FUNCTION notify_user_created()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://your-domain.com/api/webhooks/user-created',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.webhook_secret', true)
      ),
      body := jsonb_build_object(
        'type', 'INSERT',
        'table', 'users',
        'record', jsonb_build_object(
          'id', NEW.id,
          'email', NEW.email,
          'created_at', NEW.created_at
        )
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_user_created
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION notify_user_created();
```

---

### Step 3: Vercel Cron Job Setup

#### Option A: Vercel Cron (Recommended)

The `vercel.json` file is already configured. Just deploy to Vercel and the cron job will run automatically.

**Schedule:** Daily at 10:00 AM UTC

**To change schedule:**
Edit `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/email-automation",
      "schedule": "0 10 * * *"  // Cron expression
    }
  ]
}
```

**Cron Schedule Examples:**
- `0 10 * * *` - Daily at 10:00 AM UTC
- `0 */6 * * *` - Every 6 hours
- `0 0 * * 1` - Every Monday at midnight

#### Option B: External Cron Service

If not using Vercel, use an external service:

**cron-job.org:**
1. Sign up at https://cron-job.org
2. Create new cron job
3. URL: `https://your-domain.com/api/cron/email-automation`
4. Schedule: Daily
5. HTTP Header: `Authorization: Bearer your-cron-secret`

**EasyCron:**
1. Sign up at https://www.easycron.com
2. Create new cron job
3. URL: `https://your-domain.com/api/cron/email-automation`
4. Add header: `Authorization: Bearer your-cron-secret`

---

### Step 4: Manual Integration Points

If you create users programmatically, trigger emails manually:

```typescript
import { sendWelcomeEmail } from '@/lib/email-automation';

// After creating user
const { data: user } = await supabase
  .from('users')
  .insert([{ email, ... }])
  .select()
  .single();

// Send welcome email
await sendWelcomeEmail({
  userId: user.id,
  email: user.email,
  name: user.email.split('@')[0],
});
```

---

## Testing

### Test Welcome Email

**Option 1: Via Webhook**
```bash
curl -X POST http://localhost:3000/api/webhooks/user-created \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-key" \
  -d '{
    "type": "INSERT",
    "table": "users",
    "record": {
      "id": "test-user-id",
      "email": "test@example.com",
      "created_at": "2024-01-15T10:00:00Z"
    }
  }'
```

**Option 2: Direct API Call**
```bash
curl -X POST http://localhost:3000/api/email/welcome \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }'
```

### Test Upgrade Email

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

### Test Re-engagement Email

```bash
curl -X POST http://localhost:3000/api/email/re-engagement \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "daysInactive": 7,
    "discountCode": "COMEBACK30"
  }'
```

### Test Cron Job

```bash
# Local testing
curl http://localhost:3000/api/cron/email-automation \
  -H "Authorization: Bearer your-cron-secret"

# Production
curl https://your-domain.com/api/cron/email-automation \
  -H "Authorization: Bearer your-cron-secret"
```

---

## Automation Flow

### Welcome Email Flow

```
User Signs Up
    ↓
Supabase Database Trigger (or manual call)
    ↓
POST /api/webhooks/user-created
    ↓
Send Welcome Email via /api/email/welcome
    ↓
Email Delivered
```

### Upgrade Email Flow

```
User Creates Clip
    ↓
Credits Decrease
    ↓
Daily Cron Job Checks Credits
    ↓
If credits ≤ 1 → Send Upgrade Email
    ↓
Email Delivered
```

### Re-engagement Email Flow

```
Daily Cron Job Runs
    ↓
Check Last Project Date for Each User
    ↓
If inactive ≥ 7 days → Send Re-engagement Email
    ↓
Email Delivered
```

---

## Monitoring & Logs

### Check Email Delivery

**Resend Dashboard:**
- Go to https://resend.com/emails
- View sent emails, delivery status, opens, clicks

### Check Cron Job Execution

**Vercel Logs:**
- Go to Vercel Dashboard → Your Project → Logs
- Filter by `/api/cron/email-automation`
- Check execution times and results

**Manual Check:**
```bash
# The cron endpoint returns execution results
{
  "success": true,
  "timestamp": "2024-01-15T10:00:00Z",
  "results": {
    "upgradeEmails": { "sent": 5, "errors": 0 },
    "reEngagementEmails": { "sent": 12, "errors": 0 }
  }
}
```

---

## Customization

### Change Email Templates

Edit templates in `src/lib/email.ts`:
- `emailTemplates.welcome()`
- `emailTemplates.upgradePrompt()`
- `emailTemplates.reEngagement()`

### Adjust Cron Schedule

Edit `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/email-automation",
      "schedule": "0 */6 * * *"  // Every 6 hours
    }
  ]
}
```

### Customize Triggers

Edit `src/app/api/cron/email-automation/route.ts`:
- Change credit thresholds
- Adjust inactive user criteria
- Add new automation tasks

---

## Troubleshooting

### Emails Not Sending

1. **Check Resend API Key:**
   ```bash
   echo $RESEND_API_KEY
   ```

2. **Check Resend Dashboard:**
   - Verify domain is verified
   - Check for rate limits
   - Review error logs

3. **Check Webhook Logs:**
   - Vercel logs for webhook calls
   - Supabase logs for database triggers

### Cron Job Not Running

1. **Check Vercel Cron:**
   - Verify `vercel.json` is deployed
   - Check Vercel dashboard → Cron Jobs
   - Review execution logs

2. **Check Authorization:**
   - Verify `CRON_SECRET` is set
   - Check Authorization header matches

3. **Manual Test:**
   ```bash
   curl https://your-domain.com/api/cron/email-automation \
     -H "Authorization: Bearer your-cron-secret"
   ```

### Webhook Not Firing

1. **Check Supabase Webhook:**
   - Verify webhook is enabled
   - Check webhook URL is correct
   - Review webhook logs in Supabase

2. **Test Manually:**
   ```bash
   curl -X POST https://your-domain.com/api/webhooks/user-created \
     -H "Authorization: Bearer your-secret" \
     -H "Content-Type: application/json" \
     -d '{...}'
   ```

---

## Best Practices

1. **Rate Limiting:**
   - Don't send too many emails to the same user
   - Add cooldown periods between emails
   - Respect user preferences

2. **Error Handling:**
   - Log all email failures
   - Retry failed sends (with backoff)
   - Monitor delivery rates

3. **Testing:**
   - Test all email templates
   - Verify webhook triggers
   - Test cron job execution

4. **Monitoring:**
   - Track email open rates
   - Monitor click-through rates
   - Review unsubscribe rates

---

## Next Steps

1. ✅ Set up environment variables
2. ✅ Configure Supabase webhook
3. ✅ Deploy to Vercel (cron auto-configures)
4. ✅ Test all email types
5. ⏳ Monitor email performance
6. ⏳ A/B test email content
7. ⏳ Add unsubscribe handling
8. ⏳ Set up email analytics

---

**Last Updated:** [Date]
**Status:** Production Ready


