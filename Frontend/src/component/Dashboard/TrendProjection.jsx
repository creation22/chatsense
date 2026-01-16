import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
      } transition-all duration-700 delay-700`}
    >
      <h3 className="text-2xl font-semibold mb-6 text-emerald-900 flex items-center gap-2">
        <Icon icon="mdi:trending-up" className="w-6 h-6 text-emerald-600" />
        Trend Projection
      </h3>

      {hasData ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
            <XAxis dataKey="period" stroke="#059669" />
            <YAxis stroke="#059669" domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              wrapperStyle={{ color: '#047857' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="relationshipHealth"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 6 }}
              activeDot={{ r: 8 }}
              name="Relationship Health"
            />
            <Line
              type="monotone"
              dataKey="emotionalStability"
              stroke="#34d399"
              strokeWidth={3}
              dot={{ fill: '#34d399', r: 6 }}
              activeDot={{ r: 8 }}
              name="Emotional Stability"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[400px] flex items-center justify-center text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="text-center">
            <Icon icon="mdi:information-outline" className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Trend projection data not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendProjection;
