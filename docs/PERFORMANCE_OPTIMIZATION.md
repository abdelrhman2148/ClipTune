# Performance Optimization Guide

## Overview
This document outlines the performance optimizations implemented in ClipTune and how to measure and improve them.

## Implemented Optimizations

### 1. Next.js Configuration (`next.config.ts`)

**Compression:**
- Enabled `compress: true` for gzip/brotli compression

**Image Optimization:**
- AVIF and WebP format support
- Responsive image sizes
- Minimum cache TTL: 60 seconds

**Package Optimization:**
- Tree-shaking for large packages (recharts, supabase)
- Reduced bundle size

**Caching Headers:**
- Static assets: 1 year cache
- API routes: 5 minutes cache with stale-while-revalidate
- Security headers (X-Frame-Options, CSP, etc.)

### 2. Code Splitting

**Dynamic Imports:**
- Use `next/dynamic` for heavy components
- Lazy load charts and analytics

**Example:**
```typescript
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('@/components/analytics/LineChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // If component doesn't need SSR
});
```

### 3. Image Optimization

**Next.js Image Component:**
- Automatic WebP/AVIF conversion
- Responsive images
- Lazy loading by default

**LazyImage Component:**
- Custom component with loading states
- Placeholder while loading
- Priority loading for above-the-fold images

### 4. API Route Caching

**Analytics API:**
- 5-minute cache with `revalidate: 300`
- Stale-while-revalidate for better UX
- Cache-Control headers

### 5. Font Optimization

**Next.js Font Optimization:**
- Self-hosted fonts (Geist)
- Preload critical fonts
- Font display: swap for better FCP

## Performance Metrics

### Target Scores (Lighthouse)

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 95+

### Key Metrics

**Core Web Vitals:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

**Other Metrics:**
- **FCP (First Contentful Paint):** < 1.8s
- **TTI (Time to Interactive):** < 3.8s
- **TBT (Total Blocking Time):** < 200ms

## Measuring Performance

### 1. Lighthouse Audit

**Run locally:**
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

**Or use Chrome DevTools:**
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select categories and device
4. Click "Analyze page load"

### 2. Web Vitals

**Next.js Analytics:**
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Or use PostHog:**
```typescript
import { usePostHog } from 'posthog-js/react';

function MyComponent() {
  const posthog = usePostHog();
  
  useEffect(() => {
    // Track Web Vitals
    import('web-vitals').then(({ onCLS, onFID, onLCP }) => {
      onCLS((metric) => posthog.capture('web_vital', { name: 'CLS', value: metric.value }));
      onFID((metric) => posthog.capture('web_vital', { name: 'FID', value: metric.value }));
      onLCP((metric) => posthog.capture('web_vital', { name: 'LCP', value: metric.value }));
    });
  }, []);
}
```

## Optimization Checklist

### Images
- [ ] Use Next.js Image component
- [ ] Optimize image formats (WebP/AVIF)
- [ ] Set appropriate sizes
- [ ] Lazy load below-the-fold images
- [ ] Use priority for above-the-fold images

### JavaScript
- [ ] Code split large bundles
- [ ] Remove unused dependencies
- [ ] Use dynamic imports for heavy components
- [ ] Minimize third-party scripts
- [ ] Defer non-critical JavaScript

### CSS
- [ ] Remove unused CSS
- [ ] Use CSS modules or Tailwind purging
- [ ] Inline critical CSS
- [ ] Minimize CSS

### Fonts
- [ ] Self-host fonts
- [ ] Preload critical fonts
- [ ] Use font-display: swap
- [ ] Limit font weights/styles

### Caching
- [ ] Set appropriate cache headers
- [ ] Use CDN for static assets
- [ ] Implement service worker (optional)
- [ ] Cache API responses appropriately

### Database
- [ ] Add indexes for common queries
- [ ] Optimize Supabase queries
- [ ] Use connection pooling
- [ ] Cache frequently accessed data

## Additional Optimizations

### 1. Service Worker (PWA)

**Install:**
```bash
npm install next-pwa
```

**Configure:**
```typescript
// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
```

### 2. Bundle Analyzer

**Install:**
```bash
npm install @next/bundle-analyzer
```

**Configure:**
```typescript
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

**Run:**
```bash
ANALYZE=true npm run build
```

### 3. Database Query Optimization

**Add Indexes:**
```sql
-- Example indexes for common queries
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_clips_project_id ON clips(project_id);
```

**Optimize Queries:**
- Use `select()` to limit fields
- Use pagination for large datasets
- Cache expensive queries

### 4. API Route Optimization

**Batch Requests:**
```typescript
// Instead of multiple requests, batch them
const [users, projects, clips] = await Promise.all([
  supabase.from('users').select(),
  supabase.from('projects').select(),
  supabase.from('clips').select(),
]);
```

**Use Streaming:**
```typescript
// For large responses
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      // Stream data as it's available
    },
  });
  
  return new Response(stream);
}
```

## Monitoring

### 1. Vercel Analytics

Vercel provides built-in analytics:
- Real User Monitoring (RUM)
- Web Vitals tracking
- Performance insights

### 2. PostHog Performance

Track performance events:
```typescript
posthog.capture('page_load', {
  load_time: performance.timing.loadEventEnd - performance.timing.navigationStart,
  dom_ready: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
});
```

### 3. Custom Monitoring

Create performance monitoring:
```typescript
// lib/performance.ts
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name}: ${end - start}ms`);
  
  // Send to analytics
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('performance', {
      name,
      duration: end - start,
    });
  }
}
```

## Troubleshooting

### Slow Page Loads

1. **Check bundle size:**
   ```bash
   npm run build
   # Look for large chunks
   ```

2. **Check network tab:**
   - Identify slow requests
   - Check for blocking resources
   - Verify caching is working

3. **Check database queries:**
   - Use Supabase dashboard to see query times
   - Add indexes for slow queries
   - Optimize N+1 queries

### High Memory Usage

1. **Check for memory leaks:**
   - Use Chrome DevTools Memory profiler
   - Look for detached DOM nodes
   - Check event listener cleanup

2. **Optimize images:**
   - Reduce image sizes
   - Use appropriate formats
   - Lazy load images

### Poor Core Web Vitals

1. **LCP Issues:**
   - Optimize largest image
   - Preload critical resources
   - Reduce server response time

2. **FID Issues:**
   - Reduce JavaScript execution time
   - Code split large bundles
   - Defer non-critical JavaScript

3. **CLS Issues:**
   - Set image dimensions
   - Reserve space for dynamic content
   - Avoid inserting content above existing content

---

**Last Updated:** [Date]
**Status:** Production Ready


