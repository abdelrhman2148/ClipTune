# ClipTune Analytics Dashboard Template

## Overview
This document outlines the analytics dashboard structure for tracking key metrics and making data-driven decisions.

---

## Dashboard Sections

### 1. Executive Summary (Top Row)

**Key Metrics Cards:**
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│   MRR       │   Users     │  Conversion │    Churn    │
│  $12,450    │   1,234     │    8.5%     │    3.2%     │
│  ↑ 15%      │  ↑ 23%      │  ↑ 2.1%     │  ↓ 0.8%     │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

**Metrics to Display:**
- Monthly Recurring Revenue (MRR)
- Total Active Users
- Free-to-Paid Conversion Rate
- Monthly Churn Rate
- Net Revenue Retention (NRR)
- Customer Lifetime Value (LTV)
- Customer Acquisition Cost (CAC)

---

### 2. Revenue Analytics

**Revenue Chart (Line Graph)**
- X-axis: Time (last 30/90 days)
- Y-axis: Revenue ($)
- Lines:
  - Total MRR
  - New MRR
  - Expansion MRR (upsells)
  - Churned MRR

**Revenue Breakdown (Pie Chart)**
- Pro Plan ($29/mo): X%
- Unlimited Plan ($79/mo): Y%
- Enterprise: Z%
- Other (one-time, API): W%

**Revenue Table:**
| Plan | Subscribers | MRR | ARPU | Growth |
|------|-------------|-----|------|--------|
| Free | 850 | $0 | $0 | +12% |
| Pro | 120 | $3,480 | $29 | +8% |
| Unlimited | 45 | $3,555 | $79 | +15% |
| Enterprise | 3 | $597 | $199 | +1 |

---

### 3. User Acquisition & Growth

**Acquisition Funnel:**
```
Visitors → Signups → Free Users → Paid Users
  10,000  →  1,200  →    850    →     168
  100%    →   12%   →    71%    →    14%
```

**Acquisition Channels:**
| Channel | Visitors | Signups | Conversion | Cost | CAC |
|---------|----------|---------|------------|------|-----|
| Organic Search | 4,500 | 540 | 12% | $0 | $0 |
| Social Media | 2,800 | 336 | 12% | $500 | $1.49 |
| Paid Ads | 1,200 | 180 | 15% | $800 | $4.44 |
| Referrals | 800 | 96 | 12% | $0 | $0 |
| Direct | 700 | 48 | 7% | $0 | $0 |

**Growth Metrics:**
- New Users (Daily/Weekly/Monthly)
- User Growth Rate (%)
- Activation Rate (users who create first clip)
- Time to First Value (TTFV)

---

### 4. User Engagement

**Active Users:**
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Monthly Active Users (MAU)
- DAU/MAU Ratio (stickiness)

**Feature Usage:**
| Feature | Users | Usage Rate | Trend |
|---------|-------|------------|-------|
| Video Upload | 1,234 | 100% | → |
| AI Suggestions | 890 | 72% | ↑ |
| Timeline Editor | 756 | 61% | ↑ |
| Multi-Export | 432 | 35% | ↑ |
| Batch Export | 98 | 8% | ↑ |

**Engagement Metrics:**
- Clips Created (total, per user)
- Average Session Duration
- Pages per Session
- Bounce Rate
- Return User Rate

---

### 5. Conversion Funnel

**Detailed Funnel:**
```
Landing Page → Signup → First Clip → Upgrade Prompt → Paid
   10,000   →  1,200  →    850    →       650       →  168
   100%     →   12%   →    71%    →       76%       →  26%
```

**Conversion Points:**
- Landing → Signup: 12%
- Signup → First Clip: 71%
- First Clip → Upgrade Prompt: 76%
- Upgrade Prompt → Paid: 26%

**Drop-off Analysis:**
- Where users drop off
- Time spent at each stage
- Common exit pages

---

### 6. Retention & Churn

**Cohort Analysis Table:**
| Cohort | Month 1 | Month 2 | Month 3 | Month 4 | Retention |
|--------|---------|---------|---------|---------|-----------|
| Jan 2024 | 100% | 85% | 72% | 68% | 68% |
| Feb 2024 | 100% | 88% | 75% | - | 75% |
| Mar 2024 | 100% | 90% | - | - | 90% |
| Apr 2024 | 100% | - | - | - | 100% |

**Churn Analysis:**
- Churn Rate (monthly)
- Churn Reasons (survey data)
- Time to Churn (average days)
- Win-back Success Rate

**Retention Metrics:**
- Day 1, 7, 30 Retention
- Monthly Retention Rate
- Annual Retention Rate

---

### 7. Product Usage

**Usage Patterns:**
- Peak Usage Times (hourly heatmap)
- Usage by Day of Week
- Average Clips per User
- Power Users (top 10%)

**Feature Adoption:**
- Time to Adopt Feature
- Feature Adoption Rate
- Feature Satisfaction Score

**Technical Metrics:**
- API Response Time
- Error Rate
- Uptime %
- Processing Time (video)

---

### 8. Customer Health

**Health Score Distribution:**
```
Healthy (8-10):    45%  ████████████████
At Risk (5-7):     35%  ████████████
Critical (0-4):    20%  ███████
```

**Health Indicators:**
- Login Frequency
- Feature Usage
- Support Tickets
- Payment Status
- Engagement Score

**At-Risk Users:**
- List of users with declining engagement
- Last login date
- Usage trend
- Recommended actions

---

### 9. Support & Satisfaction

**Support Metrics:**
- Total Tickets
- Average Response Time
- Resolution Time
- Ticket Volume by Category
- Customer Satisfaction (CSAT)

**Common Issues:**
| Issue | Count | % of Total | Avg Resolve Time |
|-------|-------|------------|------------------|
| Upload Failed | 45 | 32% | 2.3 hours |
| Export Error | 28 | 20% | 1.8 hours |
| Payment Issue | 22 | 16% | 0.5 hours |
| Feature Request | 18 | 13% | N/A |
| Bug Report | 27 | 19% | 4.2 hours |

**NPS Score:**
- Promoters (9-10): 65%
- Passives (7-8): 25%
- Detractors (0-6): 10%
- **NPS: 55**

---

### 10. Marketing Performance

**Campaign Performance:**
| Campaign | Impressions | Clicks | CTR | Signups | Cost | CAC |
|----------|-------------|--------|-----|---------|------|-----|
| TikTok Ads | 50K | 2,500 | 5% | 180 | $800 | $4.44 |
| YouTube Ads | 30K | 900 | 3% | 72 | $600 | $8.33 |
| Blog Post | 15K | 450 | 3% | 54 | $200 | $3.70 |
| Email Campaign | 5K | 750 | 15% | 90 | $100 | $1.11 |

**Content Performance:**
- Blog Post Views
- Social Media Engagement
- Video Tutorial Views
- Download Counts (templates, guides)

---

## Implementation Guide

### Data Sources

**PostHog Events:**
```javascript
// Track these events:
- page_view
- user_signed_up
- video_uploaded
- clip_created
- export_completed
- upgrade_prompt_shown
- upgrade_clicked
- subscription_started
- feature_used
- support_ticket_created
```

**Stripe Webhooks:**
- subscription.created
- subscription.updated
- subscription.deleted
- invoice.paid
- customer.created

**Supabase Queries:**
```sql
-- User metrics
SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '30 days';

-- Active users
SELECT COUNT(DISTINCT user_id) FROM projects 
WHERE created_at > NOW() - INTERVAL '7 days';

-- Conversion rate
SELECT 
  (SELECT COUNT(*) FROM users WHERE subscription_tier != 'free')::float /
  (SELECT COUNT(*) FROM users)::float * 100 as conversion_rate;
```

### Dashboard Tools

**Option 1: Custom Dashboard (Recommended)**
- Build with Next.js + Recharts/Chart.js
- Real-time data from PostHog API
- Stripe API for revenue data
- Supabase for user data

**Option 2: Third-Party Tools**
- Metabase (open-source BI tool)
- Retool (custom dashboards)
- Mixpanel (product analytics)
- Amplitude (user analytics)

### Code Example (Next.js Dashboard)

```typescript
// app/dashboard/analytics/page.tsx
import { getMRR, getUsers, getConversionRate } from '@/lib/analytics';

export default async function AnalyticsPage() {
  const mrr = await getMRR();
  const users = await getUsers();
  const conversion = await getConversionRate();

  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricCard title="MRR" value={`$${mrr}`} change="+15%" />
      <MetricCard title="Users" value={users} change="+23%" />
      <MetricCard title="Conversion" value={`${conversion}%`} change="+2.1%" />
      <MetricCard title="Churn" value="3.2%" change="-0.8%" />
    </div>
  );
}
```

---

## Reporting Schedule

**Daily:**
- Revenue updates
- Critical alerts (high churn, errors)

**Weekly:**
- User growth
- Feature adoption
- Support metrics

**Monthly:**
- Full dashboard review
- Cohort analysis
- Strategic insights

---

## Key Metrics Definitions

- **MRR (Monthly Recurring Revenue):** Sum of all subscription revenue
- **ARR (Annual Recurring Revenue):** MRR × 12
- **ARPU (Average Revenue Per User):** MRR / Total Paid Users
- **CAC (Customer Acquisition Cost):** Total Marketing Spend / New Customers
- **LTV (Lifetime Value):** ARPU × Average Customer Lifespan
- **Churn Rate:** Customers Lost / Total Customers
- **NRR (Net Revenue Retention):** (Starting MRR + Expansion - Churn) / Starting MRR

---

## Alerts & Thresholds

Set up alerts for:
- Churn rate > 5%
- Conversion rate drops > 20%
- Error rate > 1%
- Response time > 3 seconds
- MRR growth < 10% (monthly)

---

**Last Updated:** [Date]
**Owner:** Product/Data Team


