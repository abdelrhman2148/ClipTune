import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { userId, userEmail, rating, feedback, category } = await request.json();

        if (!rating || !feedback || !category) {
            return NextResponse.json(
                { error: 'Rating, feedback, and category are required' },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: 'Rating must be between 1 and 5' },
                { status: 400 }
            );
        }

        // Insert feedback into database
        const { data, error } = await supabase
            .from('feedback')
            .insert([
                {
                    user_id: userId || null,
                    user_email: userEmail || null,
                    rating,
                    feedback: feedback.trim(),
                    category,
                    created_at: new Date().toISOString(),
                },
            ])
            .select()
            .single();

        if (error) {
            // If table doesn't exist, log and return success anyway
            console.error('Feedback insert error:', error);
            if (error.code === '42P01') {
                // Table doesn't exist - return success but log for admin
                console.warn('Feedback table does not exist. Please create it in Supabase.');
                return NextResponse.json({
                    success: true,
                    message: 'Feedback received (pending database setup)',
                });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Feedback submitted successfully',
            data,
        });
    } catch (error: any) {
        console.error('Feedback error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('feedback')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ feedback: data || [] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


