'use client';

import { useEffect, useState } from 'react';
import { MetricCard } from '@/components/analytics/MetricCard';
import { LineChart } from '@/components/analytics/LineChart';

interface AnalyticsData {
    metrics: {
        mrr: number;
        totalRevenue: number;
        arpu: number;
        totalUsers: number;
        newUsers: number;
        paidUsers: number;
        activeUsers: number;
        conversionRate: number;
        churnRate: number;
        churnCount: number;
        totalProjects: number;
        totalClips: number;
        subscriptionBreakdown: {
            free: number;
            pro: number;
            unlimited: number;
        };
    };
    charts: {
        dailySignups: Array<{ date: string; count: number }>;
    };
    timestamp?: string;
}

export default function DashboardPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAnalytics();
        // Refresh every 5 minutes
        const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/analytics');
            if (!response.ok) {
                throw new Error('Failed to fetch analytics');
            }
            const analyticsData = await response.json();
            setData(analyticsData);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to load analytics');
            console.error('Analytics error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-white text-xl">Loading analytics...</div>
                </div>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-red-400 text-xl mb-4">Error: {error}</div>
                    <button
                        onClick={fetchAnalytics}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const { metrics, charts } = data;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
                    <p className="text-slate-400">Real-time metrics and insights</p>
                    {data && (
                        <p className="text-xs text-slate-500 mt-2">
                            Last updated: {new Date(data.timestamp || Date.now()).toLocaleString()}
                        </p>
                    )}
                </div>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard
                        title="Monthly Recurring Revenue"
                        value={`$${metrics.mrr.toLocaleString()}`}
                        changeType="positive"
                        subtitle="MRR"
                    />
                    <MetricCard
                        title="Total Users"
                        value={metrics.totalUsers.toLocaleString()}
                        change={`+${metrics.newUsers} this month`}
                        changeType="positive"
                    />
                    <MetricCard
                        title="Conversion Rate"
                        value={`${metrics.conversionRate.toFixed(1)}%`}
                        subtitle={`${metrics.paidUsers} paid / ${metrics.totalUsers} total`}
                    />
                    <MetricCard
                        title="Churn Rate"
                        value={`${metrics.churnRate.toFixed(1)}%`}
                        change={`${metrics.churnCount} cancelled`}
                        changeType={metrics.churnRate > 5 ? 'negative' : 'neutral'}
                    />
                </div>

                {/* Secondary Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard
                        title="Total Revenue (30d)"
                        value={`$${metrics.totalRevenue.toLocaleString()}`}
                    />
                    <MetricCard
                        title="ARPU"
                        value={`$${metrics.arpu.toFixed(2)}`}
                        subtitle="Average Revenue Per User"
                    />
                    <MetricCard
                        title="Active Users (7d)"
                        value={metrics.activeUsers.toLocaleString()}
                    />
                    <MetricCard
                        title="Total Clips Created"
                        value={metrics.totalClips.toLocaleString()}
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <LineChart
                        data={charts.dailySignups}
                        title="Daily Signups (Last 30 Days)"
                        color="#818cf8"
                    />
                    <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
                        <h3 className="text-lg font-semibold text-white mb-4">Subscription Breakdown</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Free</span>
                                    <span className="text-white font-semibold">
                                        {metrics.subscriptionBreakdown.free} ({((metrics.subscriptionBreakdown.free / metrics.totalUsers) * 100).toFixed(1)}%)
                                    </span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-slate-500 h-2 rounded-full"
                                        style={{ width: `${(metrics.subscriptionBreakdown.free / metrics.totalUsers) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Pro</span>
                                    <span className="text-white font-semibold">
                                        {metrics.subscriptionBreakdown.pro} ({((metrics.subscriptionBreakdown.pro / metrics.totalUsers) * 100).toFixed(1)}%)
                                    </span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-indigo-500 h-2 rounded-full"
                                        style={{ width: `${(metrics.subscriptionBreakdown.pro / metrics.totalUsers) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Unlimited</span>
                                    <span className="text-white font-semibold">
                                        {metrics.subscriptionBreakdown.unlimited} ({((metrics.subscriptionBreakdown.unlimited / metrics.totalUsers) * 100).toFixed(1)}%)
                                    </span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-cyan-500 h-2 rounded-full"
                                        style={{ width: `${(metrics.subscriptionBreakdown.unlimited / metrics.totalUsers) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Total Projects"
                        value={metrics.totalProjects.toLocaleString()}
                    />
                    <MetricCard
                        title="New Users (30d)"
                        value={metrics.newUsers.toLocaleString()}
                    />
                    <MetricCard
                        title="Paid Users"
                        value={metrics.paidUsers.toLocaleString()}
                        subtitle={`${((metrics.paidUsers / metrics.totalUsers) * 100).toFixed(1)}% of total`}
                    />
                </div>
            </div>
        </div>
    );
}

