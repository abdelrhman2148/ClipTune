# Analytics Dashboard Setup Guide

## Overview
The analytics dashboard provides real-time insights into your ClipTune metrics including revenue, users, conversion rates, and growth trends.

## Accessing the Dashboard

**URL:** `http://localhost:3000/dashboard` (development) or `https://your-domain.com/dashboard` (production)

**Note:** The dashboard is currently accessible without authentication. For production, you should add authentication/authorization.

## Features

### Key Metrics Displayed

1. **Revenue Metrics:**
   - Monthly Recurring Revenue (MRR)
   - Total Revenue (last 30 days)
   - Average Revenue Per User (ARPU)

2. **User Metrics:**
   - Total Users
   - New Users (last 30 days)
   - Paid Users
   - Active Users (last 7 days)

3. **Conversion Metrics:**
   - Conversion Rate (free to paid)
   - Churn Rate
   - Churn Count

4. **Activity Metrics:**
   - Total Projects Created
   - Total Clips Created

5. **Visualizations:**
   - Daily Signups Chart (last 30 days)
   - Subscription Tier Breakdown

## Data Sources

The dashboard pulls data from:

1. **Supabase Database:**
   - User data (`users` table)
   - Project data (`projects` table)
   - Clip data (`clips` table)

2. **Stripe API:**
   - Subscription data
   - Revenue data
   - Invoice data

## API Endpoint

**Endpoint:** `/api/analytics`

**Method:** GET

**Response:**
```json
{
  "metrics": {
    "mrr": 12450.00,
    "totalRevenue": 15000.00,
    "arpu": 29.00,
    "totalUsers": 1234,
    "newUsers": 150,
    "paidUsers": 168,
    "activeUsers": 450,
    "conversionRate": 13.6,
    "churnRate": 3.2,
    "churnCount": 5,
    "totalProjects": 2500,
    "totalClips": 5000,
    "subscriptionBreakdown": {
      "free": 1066,
      "pro": 120,
      "unlimited": 48
    }
  },
  "charts": {
    "dailySignups": [
      { "date": "2024-01-01", "count": 5 },
      ...
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Auto-Refresh

The dashboard automatically refreshes every 5 minutes to show the latest data.

## Adding Authentication (Recommended for Production)

To secure the dashboard, add authentication:

1. **Create a middleware:**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add your auth logic here
  // For example, check for admin role
  const isAdmin = request.cookies.get('admin')?.value === 'true';
  
  if (request.nextUrl.pathname.startsWith('/dashboard') && !isAdmin) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

2. **Or use Supabase Auth:**
```typescript
// In dashboard page
import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user || user.email !== 'admin@cliptune.com') {
    redirect('/');
  }
  
  // ... rest of dashboard
}
```

## Customization

### Adding New Metrics

1. Update the API route (`src/app/api/analytics/route.ts`) to fetch new data
2. Add the metric to the response
3. Add a new `MetricCard` component in the dashboard page

### Adding New Charts

1. Create a new chart component in `src/components/analytics/`
2. Add data fetching logic to the API route
3. Include the chart in the dashboard page

### Styling

The dashboard uses Tailwind CSS with a dark theme. You can customize colors in:
- `src/app/dashboard/page.tsx` (main layout)
- `src/components/analytics/MetricCard.tsx` (metric cards)
- `src/components/analytics/LineChart.tsx` (charts)

## Troubleshooting

### No Data Showing

1. **Check environment variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY`

2. **Check database:**
   - Ensure tables exist (`users`, `projects`, `clips`)
   - Verify data exists in tables

3. **Check Stripe:**
   - Verify API key is correct
   - Check if you have active subscriptions

### Slow Loading

- The dashboard queries multiple data sources
- Consider adding caching:
  ```typescript
  // In API route
  export const revalidate = 300; // Cache for 5 minutes
  ```

### Errors

- Check browser console for client-side errors
- Check server logs for API errors
- Verify all dependencies are installed (`recharts`)

## Next Steps

1. **Add more metrics:**
   - Feature usage analytics
   - Geographic distribution
   - Device/browser breakdown

2. **Add more charts:**
   - Revenue over time
   - User growth trends
   - Conversion funnel visualization

3. **Add filters:**
   - Date range selector
   - User segment filters
   - Export functionality

4. **Add alerts:**
   - Churn rate threshold alerts
   - Revenue drop alerts
   - Error rate monitoring

---

**Last Updated:** [Date]
**Status:** Production Ready (with auth recommended)

