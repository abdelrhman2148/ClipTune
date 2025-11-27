import { NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { userId, email, name } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Get user data if userId provided
        let userName = name;
        if (userId && !name) {
            const { data: user } = await supabase
                .from('users')
                .select('email')
                .eq('id', userId)
                .single();
            
            if (user) {
                userName = user.email.split('@')[0];
            }
        }

        const template = emailTemplates.welcome(userName || 'there');
        const result = await sendEmail({
            to: email,
            subject: template.subject,
            html: template.html,
        });

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Welcome email sent' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


