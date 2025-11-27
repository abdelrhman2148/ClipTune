import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';
// Cache for 5 minutes
export const revalidate = 300;

export async function GET() {
    try {
        // Get current date ranges
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // User Metrics
        const { data: totalUsers, error: usersError } = await supabase
            .from('users')
            .select('id, subscription_tier, created_at', { count: 'exact' });

        const { data: newUsers, error: newUsersError } = await supabase
            .from('users')
            .select('id', { count: 'exact' })
            .gte('created_at', thirtyDaysAgo.toISOString());

        const { data: paidUsers, error: paidUsersError } = await supabase
            .from('users')
            .select('id', { count: 'exact' })
            .neq('subscription_tier', 'free');

        // Project/Clip Metrics
        const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select('id, user_id, created_at', { count: 'exact' });

        const { data: clips, error: clipsError } = await supabase
            .from('clips')
            .select('id, project_id, created_at', { count: 'exact' });

        // Active Users (users who created projects in last 7 days)
        const { data: activeUsers, error: activeUsersError } = await supabase
            .from('projects')
            .select('user_id', { count: 'exact' })
            .gte('created_at', sevenDaysAgo.toISOString());

        // Subscription Tiers Breakdown
        const subscriptionBreakdown = {
            free: totalUsers?.filter(u => u.subscription_tier === 'free').length || 0,
            pro: totalUsers?.filter(u => u.subscription_tier === 'pro').length || 0,
            unlimited: totalUsers?.filter(u => u.subscription_tier === 'unlimited').length || 0,
        };

        // Revenue Metrics (from Stripe)
        let mrr = 0;
        let totalRevenue = 0;
        let churnCount = 0;

        try {
            // Get active subscriptions
            const subscriptions = await stripe.subscriptions.list({
                status: 'active',
                limit: 100,
            });

            // Calculate MRR
            mrr = subscriptions.data.reduce((sum, sub) => {
                const price = sub.items.data[0]?.price;
                if (price) {
                    // Convert to monthly (handle annual plans)
                    const amount = price.unit_amount || 0;
                    const interval = price.recurring?.interval;
                    if (interval === 'month') {
                        return sum + amount / 100;
                    } else if (interval === 'year') {
                        return sum + (amount / 100) / 12;
                    }
                }
                return sum;
            }, 0);

            // Get revenue from last 30 days
            const invoices = await stripe.invoices.list({
                status: 'paid',
                created: {
                    gte: Math.floor(thirtyDaysAgo.getTime() / 1000),
                },
                limit: 100,
            });

            totalRevenue = invoices.data.reduce((sum, inv) => sum + (inv.amount_paid / 100), 0);

            // Get cancelled subscriptions in last 30 days
            const cancelledSubs = await stripe.subscriptions.list({
                status: 'canceled',
                created: {
                    gte: Math.floor(thirtyDaysAgo.getTime() / 1000),
                },
                limit: 100,
            });

            churnCount = cancelledSubs.data.length;
        } catch (stripeError) {
            console.error('Stripe error:', stripeError);
            // Continue with Supabase data if Stripe fails
        }

        // Calculate conversion rate
        const totalUsersCount = totalUsers?.length || 0;
        const paidUsersCount = paidUsers?.length || 0;
        const conversionRate = totalUsersCount > 0 
            ? (paidUsersCount / totalUsersCount) * 100 
            : 0;

        // Calculate churn rate
        const churnRate = paidUsersCount > 0 
            ? (churnCount / paidUsersCount) * 100 
            : 0;

        // Calculate ARPU (Average Revenue Per User)
        const arpu = paidUsersCount > 0 ? mrr / paidUsersCount : 0;

        // Daily signups for last 30 days (for chart)
        const dailySignups = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));

            const { count } = await supabase
                .from('users')
                .select('id', { count: 'exact', head: true })
                .gte('created_at', startOfDay.toISOString())
                .lte('created_at', endOfDay.toISOString());

            dailySignups.push({
                date: startOfDay.toISOString().split('T')[0],
                count: count || 0,
            });
        }

        return NextResponse.json({
            metrics: {
                // Revenue
                mrr: Math.round(mrr * 100) / 100,
                totalRevenue: Math.round(totalRevenue * 100) / 100,
                arpu: Math.round(arpu * 100) / 100,
                
                // Users
                totalUsers: totalUsersCount,
                newUsers: newUsers?.length || 0,
                paidUsers: paidUsersCount,
                activeUsers: activeUsers?.length || 0,
                
                // Conversion
                conversionRate: Math.round(conversionRate * 100) / 100,
                churnRate: Math.round(churnRate * 100) / 100,
                churnCount,
                
                // Activity
                totalProjects: projects?.length || 0,
                totalClips: clips?.length || 0,
                
                // Breakdown
                subscriptionBreakdown,
            },
            charts: {
                dailySignups,
            },
            timestamp: new Date().toISOString(),
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            },
        });
    } catch (error: any) {
        console.error('Analytics error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
