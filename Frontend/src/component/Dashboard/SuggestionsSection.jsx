import React from 'react';
import { Icon } from '@iconify/react';

const SuggestionsSection = ({ data, mounted, participantNames }) => {
  const suggestions = data?.suggestions || {};

  const userOneName = participantNames?.user_one || 'Person A';
  const userTwoName = participantNames?.user_two || 'Person B';

  const userOneItems = Array.isArray(suggestions?.user_one) ? suggestions.user_one : [];
  const userTwoItems = Array.isArray(suggestions?.user_two) ? suggestions.user_two : [];
  const bothItems = Array.isArray(suggestions?.both) ? suggestions.both : [];

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-700 delay-800 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* --- Header --- */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Icon icon="solar:lightbulb-bold-duotone" className="w-6 h-6 text-amber-500" />
            Strategic Recommendations
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            AI-generated action items to improve communication and relationship health.
          </p>
        </div>
      </div>

      {/* --- Cards Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-slate-50/50">
        
        {/* User 1 Card */}
        <ActionCard 
          title={`For ${userOneName}`} 
          items={userOneItems}
          theme="emerald"
          icon="solar:user-speak-rounded-bold"
          avatar={userOneName[0]}
        />

        {/* User 2 Card */}
        <ActionCard 
          title={`For ${userTwoName}`} 
          items={userTwoItems}
          theme="indigo"
          icon="solar:user-speak-rounded-bold"
          avatar={userTwoName[0]}
        />

        {/* Mutual Card */}
        <ActionCard 
          title="Mutual Growth" 
          items={bothItems}
          theme="amber"
          icon="solar:users-group-rounded-bold"
          isSpecial={true}
        />

      </div>
    </div>
  );
};

// --- Sub-Component: Reusable Action Card ---
const ActionCard = ({ title, items, theme, icon, avatar, isSpecial = false }) => {
  
  // Theme Configurations
  const themes = {
    emerald: {
      bar: 'bg-emerald-500',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      bullet: 'text-emerald-500',
      hoverBorder: 'group-hover:border-emerald-300'
    },
    indigo: {
      bar: 'bg-indigo-500',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      bullet: 'text-indigo-500',
      hoverBorder: 'group-hover:border-indigo-300'
    },
    amber: {
      bar: 'bg-amber-500',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      bullet: 'text-amber-500',
      hoverBorder: 'group-hover:border-amber-300'
    }
  };

  const t = themes[theme];

  return (
    <div className={`group relative bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md ${t.hoverBorder} flex flex-col h-full`}>
      
      {/* Top Decoration Line */}
      <div className={`absolute top-0 left-4 right-4 h-0.5 rounded-b-full ${t.bar} opacity-0 group-hover:opacity-100 transition-opacity`} />

      <div className="p-5 flex-1">
        {/* Card Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-lg ${t.iconBg} ${t.iconColor} flex items-center justify-center`}>
            {avatar ? (
              <span className="font-bold text-sm">{avatar}</span>
            ) : (
              <Icon icon={icon} className="w-5 h-5" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">{title}</h4>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              {items.length} {items.length === 1 ? 'Action' : 'Actions'}
            </span>
          </div>
        </div>

        {/* Action List */}
        {items.length > 0 ? (
          <ul className="space-y-4">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed group/item">
                <Icon 
                  icon="solar:arrow-right-linear" 
                  className={`w-4 h-4 mt-1 flex-shrink-0 ${t.bullet} transition-transform group-hover/item:translate-x-1`} 
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-slate-100 border-dashed rounded-lg bg-slate-50/50">
            <Icon icon="solar:check-circle-linear" className="w-8 h-8 text-slate-300 mb-2" />
            <p className="text-xs text-slate-400">No specific actions required.</p>
          </div>
        )}
      </div>

      {/* Card Footer (Optional Interaction) */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/30 rounded-b-xl">
        <button className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-900 transition-colors">
          <Icon icon="solar:copy-linear" className="w-3.5 h-3.5" />
          <span>Copy to clipboard</span>
        </button>
      </div>
    </div>
  );
};

export default SuggestionsSection;