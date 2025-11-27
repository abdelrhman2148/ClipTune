interface MetricCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    subtitle?: string;
}

export function MetricCard({ title, value, change, changeType, subtitle }: MetricCardProps) {
    const changeColor = changeType === 'positive' 
        ? 'text-green-400' 
        : changeType === 'negative' 
        ? 'text-red-400' 
        : 'text-slate-400';

    return (
        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-2">{title}</div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            {change && (
                <div className={`text-sm font-medium ${changeColor} flex items-center gap-1`}>
                    {changeType === 'positive' && '↑'}
                    {changeType === 'negative' && '↓'}
                    {change}
                </div>
            )}
            {subtitle && (
                <div className="text-xs text-slate-500 mt-2">{subtitle}</div>
            )}
        </div>
    );
}

