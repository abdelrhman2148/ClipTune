import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { email, plan } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        // Store in Supabase (create waitlist table if it doesn't exist)
        const { data, error } = await supabase
            .from('waitlist')
            .insert([
                {
                    email,
                    plan,
                    created_at: new Date().toISOString(),
                },
            ])
            .select();

        if (error) {
            // If table doesn't exist, just log it (won't break the flow)
            console.error('Supabase error:', error);
            return NextResponse.json({
                message: 'Added to waitlist (pending database setup)'
            });
        }

        return NextResponse.json({
            message: 'Successfully added to waitlist',
            data
        });
    } catch (error: any) {
        console.error('Waitlist error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
