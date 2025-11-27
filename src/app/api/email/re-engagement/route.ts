import { NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { userId, email, daysInactive, discountCode } = await request.json();

        if (!email && !userId) {
            return NextResponse.json({ error: 'Email or userId is required' }, { status: 400 });
        }

        // Get user data
        let userEmail = email;
        let userName = '';

        if (userId) {
            const { data: user } = await supabase
                .from('users')
                .select('email')
                .eq('id', userId)
                .single();

            if (user) {
                userEmail = user.email;
                userName = user.email.split('@')[0];
            }
        }

        if (!userEmail) {
            return NextResponse.json({ error: 'Could not find user email' }, { status: 400 });
        }

        const template = emailTemplates.reEngagement(
            userName || 'there',
            daysInactive || 7,
            discountCode || 'COMEBACK30'
        );

        const result = await sendEmail({
            to: userEmail,
            subject: template.subject,
            html: template.html,
        });

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Re-engagement email sent' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

