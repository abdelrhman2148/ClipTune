import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email-automation';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Webhook endpoint for user creation events
 * Can be triggered by:
 * 1. Supabase Database Webhook (recommended)
 * 2. Manual API call after user creation
 * 3. Vercel Edge Function trigger
 */
export async function POST(request: Request) {
    try {
        // Verify webhook secret (optional but recommended)
        const authHeader = request.headers.get('authorization');
        const webhookSecret = process.env.USER_WEBHOOK_SECRET;
        
        if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        
        // Handle Supabase webhook format
        let userId: string | undefined;
        let email: string | undefined;
        let name: string | undefined;

        if (body.type === 'INSERT' && body.table === 'users') {
            // Supabase webhook format
            const user = body.record;
            userId = user.id;
            email = user.email;
            name = user.email?.split('@')[0];
        } else if (body.userId || body.email) {
            // Manual API call format
            userId = body.userId;
            email = body.email;
            name = body.name;
        } else {
            return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Send welcome email
        const result = await sendWelcomeEmail({ userId, email, name });

        if (!result.success) {
            return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Welcome email sent',
            userId,
            email 
        });
    } catch (error: any) {
        console.error('User created webhook error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


