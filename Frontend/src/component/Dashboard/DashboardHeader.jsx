import { Icon } from '@iconify/react';

const DashboardHeader = ({ data, mounted, participantNames }) => {
  const summary = data?.summary || {};
  const relationshipType = summary?.relationship_type || 'Unknown';
  const sentiment = summary?.overall_sentiment || 'neutral';
  const healthScore = summary?.relationship_health_score || 0;
  const romanticProb = summary?.romantic_probability || 0;

  const sentimentColors = {
    positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    negative: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-gray-50 text-gray-700 border-gray-200',
    mixed: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  };

  const getSentimentLabel = (sent) => {
    const labels = {
      positive: 'Positive',
      negative: 'Negative',
      neutral: 'Neutral',
      mixed: 'Mixed',
    };
    return labels[sent] || 'Neutral';
  };

  return (
    <div
      className={`bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-emerald-100 shadow-xl ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-700`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mb-2">
            Conversation Insight Dashboard
          </h1>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
              <Icon icon="mdi:account-group" className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-900 font-medium">{relationshipType}</span>
            </div>
            <div
              className={`px-4 py-2 rounded-lg border ${sentimentColors[sentiment]}`}
            >
              {getSentimentLabel(sentiment)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-emerald-100"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(romanticProb / 100) * 251.2} 251.2`}
                  className="text-emerald-500 transition-all duration-1000"
                  style={{
                    opacity: mounted ? 1 : 0,
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{romanticProb}%</div>
                  <div className="text-xs text-emerald-600">Romantic</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-emerald-700 flex items-center gap-2">
                <Icon icon="mdi:trending-up" className="w-4 h-4" />
                Health Score
              </span>
              <span className="text-sm font-semibold text-emerald-600">{healthScore}%</span>
            </div>
            <div className="h-3 bg-emerald-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: mounted ? `${healthScore}%` : '0%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
