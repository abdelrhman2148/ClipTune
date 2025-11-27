import Stripe from 'stripe';

let _stripe: Stripe | null = null;

// Initialize Stripe lazily to avoid build-time errors
export const getStripe = () => {
    if (!_stripe) {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            throw new Error('Missing STRIPE_SECRET_KEY environment variable');
        }
        _stripe = new Stripe(secretKey, {
            apiVersion: '2025-11-17.clover',
        });
    }
    return _stripe;
};

// For backwards compatibility - lazy getter
export const stripe = new Proxy({} as Stripe, {
    get(_, prop) {
        return getStripe()[prop as keyof Stripe];
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
