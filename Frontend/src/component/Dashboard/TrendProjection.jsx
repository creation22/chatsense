import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceLine, Defs, LinearGradient, Stop 
} from 'recharts';
import { Icon } from '@iconify/react';

const TrendProjection = ({ data, mounted }) => {
  const trend = data?.trend_projection || {};

  const relationshipHealth = Array.isArray(trend?.relationship_health) ? trend.relationship_health : [0, 0, 0];
  const emotionalStability = Array.isArray(trend?.emotional_stability) ? trend.emotional_stability : [0, 0, 0];

  const chartData = relationshipHealth.map((health, idx) => ({
    period: idx === 0 ? 'Past' : idx === 1 ? 'Present' : 'Future',
    relationshipHealth: typeof health === 'number' ? health : 0,
    emotionalStability: typeof emotionalStability[idx] === 'number' ? emotionalStability[idx] : 0,
  }));

  const hasData = chartData.some(d => d.relationshipHealth > 0 || d.emotionalStability > 0);

  // Calculate generic trend direction for the badge
  const current = chartData[1]?.relationshipHealth || 0;
  const future = chartData[2]?.relationshipHealth || 0;
  const trendDiff = future - current;
  const isPositive = trendDiff >= 0;

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs">
          <p className="font-bold mb-2 uppercase tracking-wider text-slate-400">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-mono">{entry.value}/100</span>
              <span className="opacity-70">{entry.name}</span>
            </div>
          ))}
          {label === 'Future' && (
            <div className="mt-2 pt-2 border-t border-slate-700 text-[10px] text-emerald-400 italic">
              * AI Predicted Value
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-700 delay-700 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* --- Header --- */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Icon icon="solar:graph-new-up-bold-duotone" className="w-6 h-6 text-indigo-500" />
            Trajectory Forecast
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Predictive modeling based on current interaction velocity.
          </p>
        </div>
        
        {/* Trend Badge */}
        {hasData && (
          <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${
            isPositive ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
          }`}>
            <Icon icon={isPositive ? "solar:trending-up-bold" : "solar:trending-down-bold"} className="w-4 h-4" />
            <span className="text-xs font-bold">
              {isPositive ? 'Positive Outlook' : 'Declining Trend'}
            </span>
          </div>
        )}
      </div>

      {/* --- Chart Area --- */}
      <div className="p-6">
        {hasData ? (
          <div className="h-[350px] w-full relative">
            
            {/* Background "Prediction Zone" Label */}
            <div className="absolute top-2 right-10 text-xs font-bold text-indigo-400 uppercase tracking-widest opacity-20 pointer-events-none">
              Projection Phase
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                
                <XAxis 
                  dataKey="period" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  domain={[0, 100]} 
                />
                
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />

                {/* The "Now" Line */}
                <ReferenceLine x="Present" stroke="#cbd5e1" strokeDasharray="3 3" label={{ position: 'top', value: 'NOW', fill: '#94a3b8', fontSize: 10 }} />

                {/* Data Lines */}
                <Area
                  type="monotone"
                  dataKey="relationshipHealth"
                  name="Health"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorHealth)"
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="emotionalStability"
                  name="Stability"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorStability)"
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[350px] flex flex-col items-center justify-center text-center bg-slate-50 rounded-xl border border-slate-100 border-dashed">
             <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                <Icon icon="solar:graph-new-linear" className="w-6 h-6 text-slate-400" />
             </div>
            <p className="text-sm text-slate-500 font-medium">Insufficient data for projection</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Upload more chat history to unlock predictive analysis.
            </p>
          </div>
        )}
      </div>

      {/* --- Footer Legend --- */}
      {hasData && (
        <div className="px-6 pb-6 pt-2 flex justify-center gap-6">
           <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-medium text-slate-600">Relationship Health</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              <span className="text-xs font-medium text-slate-600">Emotional Stability</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default TrendProjection;