import React from 'react';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend 
} from 'recharts';
import { Icon } from '@iconify/react';

const EmotionalAnalysis = ({ data, mounted, participantNames }) => {
  const emotional = data?.emotional_analysis || {};

  const userOneName = participantNames?.user_one || 'Person A';
  const userTwoName = participantNames?.user_two || 'Person B';

  const userOneMetrics = emotional?.user_one || {};
  const userTwoMetrics = emotional?.user_two || {};

  // Standardize keys for display
  const processMetrics = (metrics) => [
    { metric: 'Urgency', fullMark: 100, value: metrics?.urgency ?? 0 },
    { metric: 'Expression', fullMark: 100, value: metrics?.emotional_expression ?? 0 },
    { metric: 'Calmness', fullMark: 100, value: metrics?.calmness ?? 0 },
    { metric: 'Dependency', fullMark: 100, value: metrics?.dependency ?? 0 },
  ];

  const radarDataOne = processMetrics(userOneMetrics);
  const radarDataTwo = processMetrics(userTwoMetrics);

  const hasDataOne = radarDataOne.some(d => d.value > 0);
  const hasDataTwo = radarDataTwo.some(d => d.value > 0);

  // Helper to find dominant trait
  const getDominantTrait = (data) => {
    const max = data.reduce((prev, current) => (prev.value > current.value) ? prev : current, { value: 0, metric: 'None' });
    return max.value > 0 ? max.metric : 'None';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-xl text-xs z-50">
          <p className="font-bold text-slate-800 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].stroke }} />
            <span className="text-slate-600 font-medium">
              Score: {payload[0].value}/100
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-all duration-700 delay-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Icon icon="solar:heart-pulse-bold-duotone" className="w-6 h-6 text-rose-500" />
            Emotional Fingerprint
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Visualizing emotional intensity and stability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* --- Chart 1: User One (Emerald Theme) --- */}
        <div className="relative flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                {userOneName[0]}
             </div>
             <h4 className="font-semibold text-slate-900">{userOneName}</h4>
          </div>
          
          <div className="w-full h-[300px] relative">
            {hasDataOne ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarDataOne}>
                  <PolarGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name={userOneName}
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="#10b981"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
               <EmptyState />
            )}
          </div>

          {/* Insight Chip */}
          {hasDataOne && (
             <div className="mt-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                <Icon icon="solar:star-bold" className="w-3 h-3" />
                Dominant: {getDominantTrait(radarDataOne)}
             </div>
          )}
        </div>

        {/* --- Chart 2: User Two (Indigo Theme for Contrast) --- */}
        <div className="relative flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                {userTwoName[0]}
             </div>
             <h4 className="font-semibold text-slate-900">{userTwoName}</h4>
          </div>

          <div className="w-full h-[300px] relative">
            {hasDataTwo ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarDataTwo}>
                  <PolarGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name={userTwoName}
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="#6366f1"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Insight Chip */}
          {hasDataTwo && (
             <div className="mt-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-700 flex items-center gap-1.5">
                <Icon icon="solar:star-bold" className="w-3 h-3" />
                Dominant: {getDominantTrait(radarDataTwo)}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Empty State for this component
const EmptyState = () => (
  <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-full border border-slate-100 border-dashed m-4 aspect-square">
    <Icon icon="solar:graph-new-linear" className="w-8 h-8 mb-2 opacity-50" />
    <p className="text-xs">No emotional metrics</p>
  </div>
);

export default EmotionalAnalysis;