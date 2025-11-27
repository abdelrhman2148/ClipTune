import { NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { userId, email, discountCode } = await request.json();

        if (!email && !userId) {
            return NextResponse.json({ error: 'Email or userId is required' }, { status: 400 });
        }

        // Get user data
        let userEmail = email;
        let userName = '';
        let creditsUsed = 0;
        let creditsTotal = 3;

        if (userId) {
            const { data: user } = await supabase
                .from('users')
                .select('email, subscription_tier, credits_remaining')
                .eq('id', userId)
                .single();

            if (user) {
                userEmail = user.email;
                userName = user.email.split('@')[0];
                creditsTotal = user.subscription_tier === 'free' ? 3 : 
                             user.subscription_tier === 'pro' ? 50 : -1;
                creditsUsed = creditsTotal - (user.credits_remaining || 0);
            }
        }

        if (!userEmail) {
            return NextResponse.json({ error: 'Could not find user email' }, { status: 400 });
        }

        const template = emailTemplates.upgradePrompt(
            userName || 'there',
            creditsUsed,
            creditsTotal,
            discountCode || 'UPGRADE20'
        );

        const result = await sendEmail({
            to: userEmail,
            subject: template.subject,
            html: template.html,
        });

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Upgrade email sent' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


