import { NextResponse } from 'next/server';
import { stripe, PRICING_PLANS } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { priceId, userId, email } = await request.json();

        // Get or create Stripe customer
        const customers = await stripe.customers.list({ email, limit: 1 });
        let customerId = customers.data[0]?.id;

        if (!customerId) {
            const customer = await stripe.customers.create({ email });
            customerId = customer.id;

            // Update user record
            await supabase
                .from('users')
                .update({ stripe_customer_id: customerId })
                .eq('id', userId);
        }

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
            metadata: { userId },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
