import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

function getStripeClient(): Stripe {
    if (stripeClient) {
        return stripeClient;
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!secretKey) {
        // Return a client with placeholder key that will fail gracefully at runtime
        stripeClient = new Stripe('sk_test_placeholder', {
            apiVersion: '2025-11-17.clover' as any,
        });
        return stripeClient;
    }

    stripeClient = new Stripe(secretKey, {
        apiVersion: '2025-11-17.clover' as any,
    });
    return stripeClient;
}

// Initialize Stripe on the server side (lazy)
export const stripe = new Proxy({} as Stripe, {
    get(_target, prop) {
        return getStripeClient()[prop as keyof Stripe];
    }
});

// Pricing tiers
export const PRICING_PLANS = {
    free: {
        name: 'Free',
        price: 0,
        credits: 3, // 3 clips per month
        features: ['3 clips/month', 'Basic AI suggestions', 'Watermarked exports'],
    },
    pro: {
        name: 'Pro',
        price: 29,
        priceId: process.env.STRIPE_PRICE_ID_PRO,
        credits: 50,
        features: ['50 clips/month', 'Advanced AI', 'No watermarks', '1080p exports'],
    },
    unlimited: {
        name: 'Unlimited',
        price: 79,
        priceId: process.env.STRIPE_PRICE_ID_UNLIMITED,
        credits: -1, // Unlimited
        features: ['Unlimited clips', 'Priority processing', '4K exports', 'API access'],
    },
};
