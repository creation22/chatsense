import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  PieChart, Pie, Legend 
} from 'recharts';
import { Icon } from '@iconify/react';

const CommunicationAnalysis = ({ data, mounted, participantNames }) => {
  const communication = data?.communication || {};

  const userOneName = participantNames?.user_one || 'Person A';
  const userTwoName = participantNames?.user_two || 'Person B';

  const userOneScore = communication?.user_one?.communication_score ?? 0;
  const userTwoScore = communication?.user_two?.communication_score ?? 0;

  // Chart Data
  const barData = [
    { name: userOneName, score: Math.max(userOneScore, 0) },
    { name: userTwoName, score: Math.max(userTwoScore, 0) },
  ];

  // Helper to process pie data
  const processStyleData = (styleObj) => {
    return [
      { name: 'Assertive', value: styleObj?.assertive || 0, color: '#10b981' }, // Emerald-500
      { name: 'Passive', value: styleObj?.passive || 0, color: '#64748b' },    // Slate-500
      { name: 'Aggressive', value: styleObj?.aggressive || 0, color: '#f43f5e' }, // Rose-500
      { name: 'Passive Aggressive', value: styleObj?.passive_aggressive || 0, color: '#f59e0b' }, // Amber-500
    ].filter(item => item.value > 0);
  };

  const pieDataOne = processStyleData(communication?.user_one?.communication_style);
  const pieDataTwo = processStyleData(communication?.user_two?.communication_style);

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-xl text-xs">
          <p className="font-semibold text-slate-800 mb-1">{payload[0].name}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.fill || payload[0].color }} />
            <span className="text-slate-600">
              {payload[0].value}{payload[0].payload.score !== undefined ? '' : '%'}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`space-y-6 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-300`}>
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2">
        <div>
           <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Icon icon="solar:chat-line-bold-duotone" className="w-6 h-6 text-emerald-500" />
            Communication Dynamics
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Analyzing response patterns, tone, and engagement levels.
          </p>
        </div>
      </div>

      {/* --- Top Row: Scores & Styles --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Engagement Score (Bar Chart) */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <h4 className="text-sm font-semibold text-slate-700">Engagement Score</h4>
             <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">Metric</div>
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  hide 
                  domain={[0, 100]} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="score" radius={[6, 6, 6, 6]} barSize={40}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#34d399'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Communication Styles (Donut Charts) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* User One Style */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col items-center justify-center">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">{userOneName}</h4>
            <div className="h-[160px] w-full relative">
              {pieDataOne.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieDataOne}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieDataOne.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                  <Icon icon="solar:unavailable-linear" className="w-6 h-6 mb-1" />
                  No style data
                </div>
              )}
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <Icon icon="solar:user-circle-bold" className="w-8 h-8 text-slate-200" />
              </div>
            </div>
            {/* Simple Legend */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
                {pieDataOne.slice(0, 2).map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                    </div>
                ))}
            </div>
          </div>

          {/* User Two Style */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col items-center justify-center">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">{userTwoName}</h4>
            <div className="h-[160px] w-full relative">
              {pieDataTwo.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieDataTwo}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieDataTwo.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                  <Icon icon="solar:unavailable-linear" className="w-6 h-6 mb-1" />
                  No style data
                </div>
              )}
               {/* Center Icon */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <Icon icon="solar:user-circle-bold" className="w-8 h-8 text-slate-200" />
              </div>
            </div>
             <div className="flex flex-wrap justify-center gap-3 mt-2">
                {pieDataTwo.slice(0, 2).map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Row: Strengths & Weaknesses (Comparison View) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* User One Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              {userOneName[0]}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{userOneName}</h4>
              <p className="text-xs text-slate-500">Analysis Report</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icon icon="solar:check-circle-bold" className="text-emerald-500" /> Strengths
              </div>
              <ul className="space-y-2">
                {communication?.user_one?.strengths?.length > 0 ? (
                  communication.user_one.strengths.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 pl-2 border-l-2 border-emerald-100">
                      {item}
                    </li>
                  ))
                ) : <span className="text-xs text-slate-400 italic">No specific strengths detected.</span>}
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icon icon="solar:close-circle-bold" className="text-rose-500" /> Areas to Improve
              </div>
              <ul className="space-y-2">
                {communication?.user_one?.weaknesses?.length > 0 ? (
                  communication.user_one.weaknesses.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 pl-2 border-l-2 border-rose-100">
                      {item}
                    </li>
                  ))
                ) : <span className="text-xs text-slate-400 italic">No specific weaknesses detected.</span>}
              </ul>
            </div>
          </div>
        </div>

        {/* User Two Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
           <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
              {userTwoName[0]}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{userTwoName}</h4>
              <p className="text-xs text-slate-500">Analysis Report</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icon icon="solar:check-circle-bold" className="text-emerald-500" /> Strengths
              </div>
              <ul className="space-y-2">
                {communication?.user_two?.strengths?.length > 0 ? (
                  communication.user_two.strengths.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 pl-2 border-l-2 border-emerald-100">
                      {item}
                    </li>
                  ))
                ) : <span className="text-xs text-slate-400 italic">No specific strengths detected.</span>}
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icon icon="solar:close-circle-bold" className="text-rose-500" /> Areas to Improve
              </div>
               <ul className="space-y-2">
                {communication?.user_two?.weaknesses?.length > 0 ? (
                  communication.user_two.weaknesses.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 pl-2 border-l-2 border-rose-100">
                      {item}
                    </li>
                  ))
                ) : <span className="text-xs text-slate-400 italic">No specific weaknesses detected.</span>}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommunicationAnalysis;