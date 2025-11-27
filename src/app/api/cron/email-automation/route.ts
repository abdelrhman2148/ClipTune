import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendUpgradeEmail, sendReEngagementEmail } from '@/lib/email-automation';

export const dynamic = 'force-dynamic';

/**
 * Cron job endpoint for email automation
 * 
 * This endpoint should be called periodically (e.g., daily via Vercel Cron)
 * 
 * Tasks:
 * 1. Check for users with low credits → send upgrade email
 * 2. Check for inactive users → send re-engagement email
 * 
 * Setup:
 * - Add to vercel.json for automatic scheduling
 * - Or use external cron service (cron-job.org, EasyCron, etc.)
 */
export async function GET(request: Request) {
    // Verify cron secret (optional but recommended)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = {
        upgradeEmails: { sent: 0, errors: 0 },
        reEngagementEmails: { sent: 0, errors: 0 },
    };

    try {
        // Task 1: Check for users with low credits
        const { data: lowCreditUsers, error: lowCreditError } = await supabase
            .from('users')
            .select('id, email, subscription_tier, credits_remaining')
            .eq('subscription_tier', 'free')
            .lte('credits_remaining', 1);

        if (!lowCreditError && lowCreditUsers) {
            for (const user of lowCreditUsers) {
                const creditsTotal = 3; // Free tier
                const creditsUsed = creditsTotal - (user.credits_remaining || 0);
                
                const result = await sendUpgradeEmail({
                    userId: user.id,
                    email: user.email,
                    creditsUsed,
                    creditsTotal,
                    discountCode: 'UPGRADE20',
                });

                if (result.success) {
                    results.upgradeEmails.sent++;
                } else {
                    results.upgradeEmails.errors++;
                }
            }
        }

        // Task 2: Check for inactive users (no projects in last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Get all users
        const { data: allUsers, error: usersError } = await supabase
            .from('users')
            .select('id, email, created_at');

        if (!usersError && allUsers) {
            for (const user of allUsers) {
                // Check last project creation date
                const { data: lastProject } = await supabase
                    .from('projects')
                    .select('created_at')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (!lastProject) {
                    // User has never created a project
                    const daysSinceSignup = Math.floor(
                        (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
                    );

                    // Send re-engagement if signed up 7+ days ago
                    if (daysSinceSignup >= 7) {
                        const result = await sendReEngagementEmail({
                            userId: user.id,
                            email: user.email,
                            daysInactive: daysSinceSignup,
                            discountCode: 'COMEBACK30',
                        });

                        if (result.success) {
                            results.reEngagementEmails.sent++;
                        } else {
                            results.reEngagementEmails.errors++;
                        }
                    }
                } else {
                    // User has created projects, check last activity
                    const lastActivityDate = new Date(lastProject.created_at);
                    const daysInactive = Math.floor(
                        (Date.now() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)
                    );

                    // Send re-engagement if inactive for 7+ days
                    if (daysInactive >= 7 && daysInactive <= 30) {
                        const result = await sendReEngagementEmail({
                            userId: user.id,
                            email: user.email,
                            daysInactive,
                            discountCode: 'COMEBACK30',
                        });

                        if (result.success) {
                            results.reEngagementEmails.sent++;
                        } else {
                            results.reEngagementEmails.errors++;
                        }
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            results,
        });
    } catch (error: any) {
        console.error('Cron job error:', error);
        return NextResponse.json({
            success: false,
            error: error.message,
            results,
        }, { status: 500 });
    }
}

