import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Icon } from '@iconify/react';

const OverviewCards = ({ data, mounted, participantNames }) => {
  const communication = data?.communication || {};
  const timeline = data?.timeline || {};
  const futurePrediction = data?.future_prediction || {};

  const userOneName = participantNames?.user_one || 'Person A';
  const userTwoName = participantNames?.user_two || 'Person B';

  const chartData = [
    { name: userOneName, score: communication?.user_one?.communication_score || 0 },
    { name: userTwoName, score: communication?.user_two?.communication_score || 0 },
  ];

  // Helper for Future Prediction Styling
  const getScenarioStyle = (type) => {
    if (type === 'negative') return {
      bg: 'bg-rose-50', border: 'border-rose-100', icon: 'text-rose-500', title: 'text-rose-900',
      iconName: 'solar:graph-down-bold'
    };
    return {
      bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'text-emerald-500', title: 'text-emerald-900',
      iconName: 'solar:graph-up-bold'
    };
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white text-xs py-1 px-2 rounded shadow-lg">
          {payload[0].value}/100
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`space-y-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      {/* --- Card 1: Engagement Metrics --- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
            <Icon icon="solar:chart-2-bold" className="text-indigo-500" />
            Engagement Levels
          </h3>
        </div>
        <div className="p-5">
          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={32}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                  dy={10}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="score" radius={[6, 6, 6, 6]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            Relative communication scores based on activity & tone.
          </p>
        </div>
      </div>

      {/* --- Card 2: Timeline / Metadata --- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100">
           <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
            <Icon icon="solar:calendar-mark-bold" className="text-slate-500" />
            Session Metadata
          </h3>
        </div>
        <div className="p-4 space-y-4">
          
          {/* Date Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Start</span>
              <div className="font-mono text-sm text-slate-700 mt-1">
                {timeline?.start_date || '--/--'}
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">End</span>
              <div className="font-mono text-sm text-slate-700 mt-1">
                {timeline?.end_date || '--/--'}
              </div>
            </div>
          </div>

          {/* Context Snippet */}
          {timeline?.context && (
            <div className="relative pl-3 border-l-2 border-indigo-200">
              <p className="text-xs text-slate-500 italic leading-relaxed">
                "{timeline.context}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- Card 3: AI Predictions (Scenarios) --- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Decorative Background Mesh */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none"></div>

        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
           <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
            <Icon icon="solar:magic-stick-3-bold" className="text-purple-500" />
            Projected Outcomes
          </h3>
          <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200 font-bold">AI</span>
        </div>

        <div className="p-4 space-y-3 relative z-10">
          
          {/* Scenario A: Current Trajectory */}
          <div className={`p-3 rounded-xl border ${getScenarioStyle('negative').bg} ${getScenarioStyle('negative').border}`}>
             <div className="flex items-center gap-2 mb-1.5">
                <Icon icon={getScenarioStyle('negative').iconName} className={`w-4 h-4 ${getScenarioStyle('negative').icon}`} />
                <span className={`text-xs font-bold ${getScenarioStyle('negative').title} uppercase`}>Current Trajectory</span>
             </div>
             <p className="text-xs text-slate-600 leading-relaxed">
               {futurePrediction?.if_unchanged || 'Data insufficient for prediction.'}
             </p>
          </div>

          {/* Scenario B: Optimized Trajectory */}
          <div className={`p-3 rounded-xl border ${getScenarioStyle('positive').bg} ${getScenarioStyle('positive').border} relative`}>
             <div className="absolute top-3 right-3">
                <Icon icon="solar:star-bold" className="w-4 h-4 text-emerald-300" />
             </div>
             <div className="flex items-center gap-2 mb-1.5">
                <Icon icon={getScenarioStyle('positive').iconName} className={`w-4 h-4 ${getScenarioStyle('positive').icon}`} />
                <span className={`text-xs font-bold ${getScenarioStyle('positive').title} uppercase`}>Potential Growth</span>
             </div>
             <p className="text-xs text-slate-600 leading-relaxed">
               {futurePrediction?.if_improved || 'Data insufficient for prediction.'}
             </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default OverviewCards;