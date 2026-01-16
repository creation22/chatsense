import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { Icon } from '@iconify/react';

const EmotionalAnalysis = ({ data, mounted, participantNames }) => {
  const emotional = data?.emotional_analysis || {};

  const userOneName = participantNames?.user_one || 'User One';
  const userTwoName = participantNames?.user_two || 'User Two';

  const userOneMetrics = emotional?.user_one || {};
  const userTwoMetrics = emotional?.user_two || {};

  const radarDataOne = [
    { metric: 'Urgency', value: userOneMetrics?.urgency ?? 0 },
    { metric: 'Emotional Expression', value: userOneMetrics?.emotional_expression ?? 0 },
    { metric: 'Calmness', value: userOneMetrics?.calmness ?? 0 },
    { metric: 'Dependency', value: userOneMetrics?.dependency ?? 0 },
  ];

  const radarDataTwo = [
    { metric: 'Urgency', value: userTwoMetrics?.urgency ?? 0 },
    { metric: 'Emotional Expression', value: userTwoMetrics?.emotional_expression ?? 0 },
    { metric: 'Calmness', value: userTwoMetrics?.calmness ?? 0 },
    { metric: 'Dependency', value: userTwoMetrics?.dependency ?? 0 },
  ];

  const hasDataOne = radarDataOne.some(d => d.value > 0);
  const hasDataTwo = radarDataTwo.some(d => d.value > 0);

  const tooltipStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #d1fae5',
    borderRadius: '8px',
    color: '#065f46',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div
      className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-emerald-100 shadow-xl ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-700 delay-500`}
    >
      <h3 className="text-2xl font-semibold mb-6 text-emerald-900 flex items-center gap-2">
        <Icon icon="mdi:heart" className="w-6 h-6 text-emerald-600" />
        Emotional Analysis
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium mb-4 text-emerald-800">{userOneName} Emotional Metrics</h4>
          {hasDataOne ? (
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarDataOne}>
                <PolarGrid stroke="#d1fae5" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: '#059669', fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#047857', fontSize: 10 }}
                />
                <Radar
                  name={userOneName}
                  dataKey="value"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-center">
                <Icon icon="mdi:information-outline" className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Emotional metrics not available</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-lg font-medium mb-4 text-emerald-800">{userTwoName} Emotional Metrics</h4>
          {hasDataTwo ? (
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarDataTwo}>
                <PolarGrid stroke="#d1fae5" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: '#059669', fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#047857', fontSize: 10 }}
                />
                <Radar
                  name={userTwoName}
                  dataKey="value"
                  stroke="#34d399"
                  fill="#34d399"
                  fillOpacity={0.6}
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-center">
                <Icon icon="mdi:information-outline" className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Emotional metrics not available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmotionalAnalysis;
