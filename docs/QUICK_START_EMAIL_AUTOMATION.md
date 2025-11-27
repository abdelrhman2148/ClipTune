# Quick Start: Email Automation

## ✅ What's Been Set Up

1. **Email Automation Library** (`src/lib/email-automation.ts`)
   - Functions to send welcome, upgrade, and re-engagement emails
   - Works server-side directly (no API calls needed)

2. **Webhook Handler** (`/api/webhooks/user-created`)
   - Triggers welcome email when users are created
   - Can be called by Supabase database webhooks

3. **Cron Job** (`/api/cron/email-automation`)
   - Runs daily (10 AM UTC) via Vercel Cron
   - Checks for low credits and inactive users
   - Sends upgrade and re-engagement emails

4. **Vercel Configuration** (`vercel.json`)
   - Automatic cron job scheduling

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Add Environment Variables

```bash
# .env.local
RESEND_API_KEY=re_xxxxx  # Get from https://resend.com
USER_WEBHOOK_SECRET=your-random-secret-here
CRON_SECRET=your-random-secret-here
```

Generate secrets:
```bash
openssl rand -hex 32
```

### Step 2: Set Up Supabase Webhook (Optional but Recommended)

1. Go to Supabase Dashboard → Database → Webhooks
2. Create new webhook:
   - **Table:** `users`
   - **Events:** INSERT
   - **URL:** `https://your-domain.com/api/webhooks/user-created`
   - **Headers:** `Authorization: Bearer your-webhook-secret`

### Step 3: Deploy to Vercel

The cron job will automatically be set up when you deploy:
```bash
git push origin main
# Vercel will auto-deploy and configure cron
```

---

## 📧 Email Automation Flow

### Welcome Email
```
User Created → Supabase Webhook → /api/webhooks/user-created → Welcome Email
```

### Upgrade Email
```
Daily Cron → Check Credits → If ≤ 1 → Upgrade Email
```

### Re-engagement Email
```
Daily Cron → Check Last Activity → If ≥ 7 days → Re-engagement Email
```

---

## 🧪 Testing

### Test Welcome Email
```bash
curl -X POST http://localhost:3000/api/webhooks/user-created \
  -H "Authorization: Bearer your-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "INSERT",
    "table": "users",
    "record": {
      "id": "test-id",
      "email": "test@example.com"
    }
  }'
```

### Test Cron Job
```bash
curl http://localhost:3000/api/cron/email-automation \
  -H "Authorization: Bearer your-cron-secret"
```

---

## 📊 Monitoring

### Check Email Delivery
- Resend Dashboard: https://resend.com/emails

### Check Cron Execution
- Vercel Dashboard → Your Project → Logs
- Filter by `/api/cron/email-automation`

### Check Webhook Calls
- Vercel Dashboard → Your Project → Logs
- Filter by `/api/webhooks/user-created`

---

## 🎯 Next Steps

1. ✅ Set up Resend account
2. ✅ Add environment variables
3. ✅ Configure Supabase webhook
4. ✅ Deploy to Vercel
5. ⏳ Test all email types
6. ⏳ Monitor email performance
7. ⏳ Customize email templates

---

**Status:** Ready to Deploy! 🚀


