'use client';

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
    date: string;
    count: number;
}

interface LineChartProps {
    data: DataPoint[];
    title: string;
    dataKey?: string;
    color?: string;
}

export function LineChart({ data, title, dataKey = 'count', color = '#818cf8' }: LineChartProps) {
    // Format dates for display
    const formattedData = data.map(item => ({
        ...item,
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));

    return (
        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                        dataKey="date" 
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey={dataKey} 
                        stroke={color}
                        strokeWidth={2}
                        dot={{ fill: color, r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );
}

