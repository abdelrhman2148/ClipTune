# ClipTune Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_UNLIMITED=price_...

# App
NEXT_PUBLIC_URL=http://localhost:3000

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run this SQL to create tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscription_tier TEXT DEFAULT 'free',
  credits_remaining INT DEFAULT 3,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'uploading',
  source_url TEXT,
  duration FLOAT,
  transcript_json JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Clips table
CREATE TABLE clips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  start_time FLOAT,
  end_time FLOAT,
  title TEXT,
  aspect_ratio TEXT,
  caption_settings JSONB,
  export_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Create two products:
   - **Pro**: $29/month
   - **Unlimited**: $79/month
3. Copy price IDs to `.env.local`
4. Set up webhook endpoint: `https://your-domain.com/api/webhooks/stripe`

## Analytics Setup (PostHog)

1. Sign up at [posthog.com](https://posthog.com)
2. Copy your project API key
3. Events to track:
   - `clip_created`
   - `video_uploaded`
   - `subscription_started`
