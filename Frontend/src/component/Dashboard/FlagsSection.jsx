import React from 'react';
import { Icon } from '@iconify/react';

const FlagsSection = ({ data, mounted, participantNames }) => {
  const flags = data?.flags || {};

  const userOneName = participantNames?.user_one || 'Person A';
  const userTwoName = participantNames?.user_two || 'Person B';

  const userOneGreen = flags?.user_one?.green_flags || [];
  const userOneRed = flags?.user_one?.red_flags || [];
  const userTwoGreen = flags?.user_two?.green_flags || [];
  const userTwoRed = flags?.user_two?.red_flags || [];

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-700 delay-600 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* --- Section Header --- */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Icon icon="solar:flag-bold-duotone" className="w-6 h-6 text-amber-500" />
            Behavioral Indicators
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Key positive signals and potential friction points detected in the text.
          </p>
        </div>
      </div>

      {/* --- Content Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        
        {/* User One Column */}
        <UserFlagColumn 
          name={userOneName} 
          greens={userOneGreen} 
          reds={userOneRed} 
          color="emerald" // Theme identifier
        />

        {/* User Two Column */}
        <UserFlagColumn 
          name={userTwoName} 
          greens={userTwoGreen} 
          reds={userTwoRed} 
          color="indigo" // Theme identifier
        />

      </div>
    </div>
  );
};

// --- Sub-Component: Individual User Column ---
const UserFlagColumn = ({ name, greens, reds, color }) => {
  const bgColor = color === 'emerald' ? 'bg-emerald-100' : 'bg-indigo-100';
  const textColor = color === 'emerald' ? 'text-emerald-700' : 'text-indigo-700';

  return (
    <div className="p-6">
      {/* Column Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-8 rounded-full ${bgColor} ${textColor} flex items-center justify-center font-bold text-xs`}>
          {name[0]}
        </div>
        <h4 className="font-semibold text-slate-900">{name}</h4>
      </div>

      <div className="space-y-8">
        
        {/* RED FLAGS SECTION (Priority First) */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Risks & Warnings</h5>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">
              {reds.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {reds.length > 0 ? (
              reds.map((flag, idx) => (
                <div key={idx} className="group flex items-start gap-3 p-3 rounded-xl bg-rose-50 border border-rose-100 hover:border-rose-200 transition-colors">
                  <div className="mt-0.5 p-1 bg-white rounded-md shadow-sm text-rose-500">
                    <Icon icon="solar:danger-triangle-bold" className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-700 leading-snug group-hover:text-slate-900">
                    {flag}
                  </span>
                </div>
              ))
            ) : (
              // Empty State for Red Flags (Positive)
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 border-dashed opacity-70">
                <Icon icon="solar:shield-check-linear" className="w-5 h-5 text-slate-400" />
                <span className="text-sm text-slate-500">No critical red flags detected.</span>
              </div>
            )}
          </div>
        </div>

        {/* GREEN FLAGS SECTION */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Positive Signals</h5>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">
              {greens.length}
            </span>
          </div>

          <div className="space-y-3">
            {greens.length > 0 ? (
              greens.map((flag, idx) => (
                <div key={idx} className="group flex items-start gap-3">
                   <div className="mt-1 relative flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50 group-hover:ring-emerald-100 transition-all"></div>
                      <div className="absolute top-2 left-1 w-px h-6 bg-slate-200 last:hidden"></div>
                   </div>
                   <span className="text-sm text-slate-600 group-hover:text-emerald-700 transition-colors pb-2">
                    {flag}
                   </span>
                </div>
              ))
            ) : (
              // Empty State for Green Flags (Neutral)
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 border-dashed opacity-70">
                <Icon icon="solar:leaf-linear" className="w-5 h-5 text-slate-400" />
                <span className="text-sm text-slate-500">No strong positive signals detected.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FlagsSection;