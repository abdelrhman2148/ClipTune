'use client';

import { useState } from 'react';

export default function TestEmailPage() {
    const [results, setResults] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const testEndpoint = async (name: string, endpoint: string, method: string, body?: any, headers?: Record<string, string>) => {
        setLoading(prev => ({ ...prev, [name]: true }));
        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            const data = await response.json();
            setResults(prev => ({
                ...prev,
                [name]: {
                    status: response.status,
                    success: response.ok,
                    data,
                },
            }));
        } catch (error: any) {
            setResults(prev => ({
                ...prev,
                [name]: {
                    success: false,
                    error: error.message,
                },
            }));
        } finally {
            setLoading(prev => ({ ...prev, [name]: false }));
        }
    };

    const timestamp = Date.now();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Email Automation Tests</h1>

                <div className="space-y-4">
                    {/* Test 1: Welcome Email */}
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                        <h2 className="text-xl font-semibold text-white mb-4">1. Welcome Email</h2>
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={() => testEndpoint(
                                    'welcome-webhook',
                                    '/api/webhooks/user-created',
                                    'POST',
                                    {
                                        type: 'INSERT',
                                        table: 'users',
                                        record: {
                                            id: `test-user-${timestamp}`,
                                            email: `test-${timestamp}@example.com`,
                                            created_at: new Date().toISOString(),
                                        },
                                    },
                                    { Authorization: 'Bearer test-secret' }
                                )}
                                disabled={loading['welcome-webhook']}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
                            >
                                {loading['welcome-webhook'] ? 'Testing...' : 'Test Webhook'}
                            </button>
                            <button
                                onClick={() => testEndpoint(
                                    'welcome-direct',
                                    '/api/email/welcome',
                                    'POST',
                                    {
                                        email: `test-direct-${timestamp}@example.com`,
                                        name: 'Test User',
                                    }
                                )}
                                disabled={loading['welcome-direct']}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
                            >
                                {loading['welcome-direct'] ? 'Testing...' : 'Test Direct API'}
                            </button>
                        </div>
                        {(results['welcome-webhook'] || results['welcome-direct']) && (
                            <pre className="bg-slate-900 p-4 rounded text-sm text-green-400 overflow-auto">
                                {JSON.stringify(results['welcome-webhook'] || results['welcome-direct'], null, 2)}
                            </pre>
                        )}
                    </div>

                    {/* Test 2: Upgrade Email */}
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                        <h2 className="text-xl font-semibold text-white mb-4">2. Upgrade Email</h2>
                        <button
                            onClick={() => testEndpoint(
                                'upgrade',
                                '/api/email/upgrade',
                                'POST',
                                {
                                    email: `test-upgrade-${timestamp}@example.com`,
                                    creditsUsed: 2,
                                    creditsTotal: 3,
                                    discountCode: 'UPGRADE20',
                                }
                            )}
                            disabled={loading['upgrade']}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 mb-4"
                        >
                            {loading['upgrade'] ? 'Testing...' : 'Test Upgrade Email'}
                        </button>
                        {results['upgrade'] && (
                            <pre className="bg-slate-900 p-4 rounded text-sm text-green-400 overflow-auto">
                                {JSON.stringify(results['upgrade'], null, 2)}
                            </pre>
                        )}
                    </div>

                    {/* Test 3: Re-engagement Email */}
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                        <h2 className="text-xl font-semibold text-white mb-4">3. Re-engagement Email</h2>
                        <button
                            onClick={() => testEndpoint(
                                'reengagement',
                                '/api/email/re-engagement',
                                'POST',
                                {
                                    email: `test-reengage-${timestamp}@example.com`,
                                    daysInactive: 7,
                                    discountCode: 'COMEBACK30',
                                }
                            )}
                            disabled={loading['reengagement']}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 mb-4"
                        >
                            {loading['reengagement'] ? 'Testing...' : 'Test Re-engagement Email'}
                        </button>
                        {results['reengagement'] && (
                            <pre className="bg-slate-900 p-4 rounded text-sm text-green-400 overflow-auto">
                                {JSON.stringify(results['reengagement'], null, 2)}
                            </pre>
                        )}
                    </div>

                    {/* Test 4: Cron Job */}
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                        <h2 className="text-xl font-semibold text-white mb-4">4. Cron Job</h2>
                        <button
                            onClick={() => testEndpoint(
                                'cron',
                                '/api/cron/email-automation',
                                'GET',
                                undefined,
                                { Authorization: 'Bearer test-secret' }
                            )}
                            disabled={loading['cron']}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 mb-4"
                        >
                            {loading['cron'] ? 'Testing...' : 'Test Cron Job'}
                        </button>
                        {results['cron'] && (
                            <pre className="bg-slate-900 p-4 rounded text-sm text-green-400 overflow-auto">
                                {JSON.stringify(results['cron'], null, 2)}
                            </pre>
                        )}
                    </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                    <p className="text-yellow-300 text-sm">
                        <strong>Note:</strong> If RESEND_API_KEY is not set, emails won't actually send,
                        but the API endpoints should still return success responses. Check your .env.local file.
                    </p>
                </div>
            </div>
        </div>
    );
}


