# Deploying ClipTune to Vercel

## Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- All environment variables configured

## Step-by-Step Guide

### 1. Prepare Your Code

First, ensure your app is ready:
```bash
# Test build locally
npm run build

# If build succeeds, you're good to go!
```

### 2. Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial ClipTune MVP"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/cliptune.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js settings
5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Copy all values from your `.env.local` file
   - Paste them one by one
6. Click "Deploy"

#### Option B: Via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts and add env vars when asked
```

### 4. Post-Deployment Configuration

#### Set Up Custom Domain (Optional)
1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `cliptune.com`)
4. Update your DNS records as instructed

#### Configure Stripe Webhook
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter: `https://your-app.vercel.app/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `customer.subscription.deleted`
5. Copy the webhook secret
6. Add it to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
7. Redeploy to apply changes

### 5. Verify Deployment

Test these critical flows:
- [ ] Homepage loads
- [ ] `/editor` page renders
- [ ] `/pricing` page works
- [ ] Can navigate between pages
- [ ] No console errors in browser dev tools

### 6. Enable Production Analytics

Update your `.env` in Vercel:
- Set `NEXT_PUBLIC_URL` to your production URL
- Ensure PostHog keys are correct

## Troubleshooting

### Build Fails
**Error:** "Type error" or "Module not found"
- Check `tsconfig.json` is valid
- Run `npm install` to ensure all deps are installed
- Check for any TypeScript errors locally first

### API Routes 500 Error
- Check Vercel logs: Project → "Logs" tab
- Ensure environment variables are set correctly
- Verify Supabase/Stripe keys are production keys (not test)

### Slow Performance
- Run Lighthouse audit
- Optimize images (use Next.js `<Image>` component)
- Enable caching for static assets

## Rollback Plan
If something breaks:
1. Go to Vercel dashboard → "Deployments"
2. Find the last working deployment
3. Click "..." → "Promote to Production"

## Updating After Launch
```bash
# Make your changes
git add .
git commit -m "Fix: description of fix"
git push

# Vercel auto-deploys on every push to main
```

## Cost Estimate (Vercel Free Tier)
- **Bandwidth:** 100GB/month (free)
- **Builds:** Unlimited (free)
- **Serverless Functions:** 100GB-hrs + 1000 hrs invocation time (free)

For most MVPs, you won't exceed free tier limits.
