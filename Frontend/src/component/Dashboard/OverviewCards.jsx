import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Icon } from '@iconify/react';

const OverviewCards = ({ data, mounted, participantNames }) => {
  const communication = data?.communication || {};
  const timeline = data?.timeline || {};
  const futurePrediction = data?.future_prediction || {};

  const userOneName = participantNames?.user_one || 'User One';
  const userTwoName = participantNames?.user_two || 'User Two';

  const userOneScore = communication?.user_one?.communication_score || 0;
  const userTwoScore = communication?.user_two?.communication_score || 0;

  const chartData = [
    { name: userOneName, score: userOneScore },
    { name: userTwoName, score: userTwoScore },
  ];

  const getOutcomeColor = (outcome) => {
    if (outcome?.toLowerCase().includes('positive') || outcome?.toLowerCase().includes('improve')) {
      return 'text-emerald-600';
    }
    if (outcome?.toLowerCase().includes('negative') || outcome?.toLowerCase().includes('decline')) {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  const tooltipStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #d1fae5',
    borderRadius: '8px',
    color: '#065f46',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div className="space-y-6">
      <div
        className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-emerald-100 shadow-xl ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } transition-all duration-700 delay-100`}
      >
        <h3 className="text-xl font-semibold mb-4 text-emerald-900">Communication Score</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#059669" />
            <YAxis stroke="#059669" domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#10b981' : '#34d399'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-emerald-100 shadow-xl ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } transition-all duration-700 delay-200`}
      >
        <h3 className="text-xl font-semibold mb-4 text-emerald-900 flex items-center gap-2">
          <Icon icon="mdi:calendar-clock" className="w-5 h-5 text-emerald-600" />
          Timeline Context
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:clock-outline" className="w-4 h-4 text-emerald-600" />
            <div className="flex-1">
              <div className="text-sm text-emerald-700">Start Date</div>
              <div className="text-emerald-900 font-medium">
                {timeline?.start_date || 'N/A'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon icon="mdi:clock-outline" className="w-4 h-4 text-emerald-600" />
            <div className="flex-1">
              <div className="text-sm text-emerald-700">End Date</div>
              <div className="text-emerald-900 font-medium">
                {timeline?.end_date || 'N/A'}
              </div>
            </div>
          </div>
          {timeline?.context && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-sm text-emerald-700 mb-1">Context</div>
              <div className="text-emerald-900 text-sm">{timeline.context}</div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-emerald-100 shadow-xl ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } transition-all duration-700 delay-300`}
      >
        <h3 className="text-xl font-semibold mb-4 text-emerald-900">Future Outcome Preview</h3>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="mdi:trending-down" className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-900">If Unchanged</span>
            </div>
            <div className={`text-sm ${getOutcomeColor(futurePrediction?.if_unchanged)}`}>
              {futurePrediction?.if_unchanged || 'No prediction available'}
            </div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="mdi:trending-up" className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-900">If Improved</span>
            </div>
            <div className={`text-sm ${getOutcomeColor(futurePrediction?.if_improved)}`}>
              {futurePrediction?.if_improved || 'No prediction available'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCards;
