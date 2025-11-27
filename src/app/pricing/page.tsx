"use client";

import { useState } from 'react';

const PLANS = [
    { tier: 'free', name: 'Free', price: '$0', features: ['3 clips/month', 'Basic AI', 'Watermarked'], available: true },
    { tier: 'pro', name: 'Pro', price: '$29', features: ['50 clips/month', 'Advanced AI', 'No watermarks'], available: false },
    { tier: 'unlimited', name: 'Unlimited', price: '$79', features: ['Unlimited clips', 'Priority', '4K exports'], available: false },
];

export default function PricingPage() {
    const [email, setEmail] = useState('');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleJoinWaitlist = async (tier: string) => {
        if (!email) {
            setMessage('Please enter your email');
            return;
        }

        setLoading(true);
        setSelectedPlan(tier);

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, plan: tier }),
            });

            if (response.ok) {
                setMessage('🎉 You\'re on the waitlist! We\'ll email you when this plan launches.');
                setEmail('');
            } else {
                setMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
        }

        setLoading(false);
        setSelectedPlan(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 mb-4 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
                        🚀 Coming Soon
                    </div>
                    <h1 className="text-5xl font-extrabold mb-4">Choose Your Plan</h1>
                    <p className="text-xl text-slate-600">Start free. Upgrade when you're ready.</p>
                    {message && (
                        <div className={`mt-6 p-4 rounded-lg ${message.includes('🎉') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {message}
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.tier}
                            className={`bg-white rounded-2xl shadow-lg p-8 border-2 transition ${plan.tier === 'pro' ? 'border-indigo-500' : 'border-slate-200 hover:border-indigo-300'
                                }`}
                        >
                            {plan.tier === 'pro' && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="text-4xl font-extrabold mb-6">
                                {plan.price}
                                <span className="text-lg text-slate-500">/mo</span>
                            </div>
                            <ul className="mb-8 space-y-3">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2 text-slate-700">
                                        <span className="text-green-500">✓</span> {f}
                                    </li>
                                ))}
                            </ul>

                            {plan.available ? (
                                <button
                                    className="w-full py-3 rounded-lg font-bold bg-slate-200 text-slate-600 cursor-default"
                                >
                                    Current Plan
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button
                                        onClick={() => handleJoinWaitlist(plan.tier)}
                                        disabled={loading && selectedPlan === plan.tier}
                                        className="w-full py-3 rounded-lg font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        {loading && selectedPlan === plan.tier ? 'Joining...' : 'Join Waitlist'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center text-slate-500 text-sm">
                    <p>Pro and Unlimited plans launching soon. Join the waitlist to get early access and exclusive pricing!</p>
                </div>
            </div>
        </div>
    );
}
