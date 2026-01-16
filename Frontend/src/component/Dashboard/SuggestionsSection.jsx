import { Icon } from '@iconify/react';

const SuggestionsSection = ({ data, mounted, participantNames }) => {
  const suggestions = data?.suggestions || {};

  const userOneName = participantNames?.user_one || 'User One';
  const userTwoName = participantNames?.user_two || 'User Two';

  const userOneSuggestions = Array.isArray(suggestions?.user_one) ? suggestions.user_one : [];
  const userTwoSuggestions = Array.isArray(suggestions?.user_two) ? suggestions.user_two : [];
  const bothSuggestions = Array.isArray(suggestions?.both) ? suggestions.both : [];

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('SuggestionsSection data:', {
      suggestions,
      userOneSuggestions,
      userTwoSuggestions,
      bothSuggestions,
    });
  }

  const SuggestionCard = ({ title, suggestions, iconName, colorClass }) => (
    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${colorClass.bg} ${colorClass.border}`}>
          <Icon icon={iconName} className={`w-5 h-5 ${colorClass.icon}`} />
        </div>
        <h4 className="text-lg font-semibold text-emerald-900">{title}</h4>
      </div>
      {suggestions && Array.isArray(suggestions) && suggestions.length > 0 ? (
        <ul className="space-y-3">
          {suggestions.map((suggestion, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className={`w-1.5 h-1.5 rounded-full ${colorClass.dot} mt-2 flex-shrink-0`} />
              <span className="text-sm text-emerald-900 leading-relaxed">{suggestion}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-emerald-600 text-sm bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <Icon icon="mdi:information-outline" className="w-4 h-4 inline mr-2" />
          No suggestions available for this section
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-emerald-100 shadow-xl ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-700 delay-800`}
    >
      <h3 className="text-2xl font-semibold mb-6 text-emerald-900 flex items-center gap-2">
        <Icon icon="mdi:lightbulb-on" className="w-6 h-6 text-emerald-600" />
        Suggestions & Actions
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SuggestionCard
          title={`For ${userOneName}`}
          suggestions={userOneSuggestions}
          iconName="mdi:account"
          colorClass={{
            bg: 'bg-emerald-100',
            border: 'border-emerald-300',
            icon: 'text-emerald-600',
            dot: 'bg-emerald-600',
          }}
        />
        <SuggestionCard
          title={`For ${userTwoName}`}
          suggestions={userTwoSuggestions}
          iconName="mdi:account"
          colorClass={{
            bg: 'bg-emerald-100',
            border: 'border-emerald-300',
            icon: 'text-emerald-600',
            dot: 'bg-emerald-600',
          }}
        />
        <SuggestionCard
          title="For Both"
          suggestions={bothSuggestions}
          iconName="mdi:account-group"
          colorClass={{
            bg: 'bg-emerald-100',
            border: 'border-emerald-300',
            icon: 'text-emerald-600',
            dot: 'bg-emerald-600',
          }}
        />
      </div>
    </div>
  );
};

export default SuggestionsSection;
