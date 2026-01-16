import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Icon } from '@iconify/react';

const CommunicationAnalysis = ({ data, mounted, participantNames }) => {
  const communication = data?.communication || {};

  const userOneName = participantNames?.user_one || 'User One';
  const userTwoName = participantNames?.user_two || 'User Two';

  const userOneScore = communication?.user_one?.communication_score ?? 0;
  const userTwoScore = communication?.user_two?.communication_score ?? 0;

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('CommunicationAnalysis data:', {
      communication,
      userOneScore,
      userTwoScore,
      userOneStrengths: communication?.user_one?.strengths,
      userTwoStrengths: communication?.user_two?.strengths,
    });
  }

  const barData = [
    { name: userOneName, score: Math.max(userOneScore, 0) },
    { name: userTwoName, score: Math.max(userTwoScore, 0) },
  ];

  const userOneStyle = communication?.user_one?.communication_style || {};
  const userTwoStyle = communication?.user_two?.communication_style || {};

  const pieDataOne = [
    { name: 'Assertive', value: userOneStyle?.assertive || 0 },
    { name: 'Passive', value: userOneStyle?.passive || 0 },
    { name: 'Aggressive', value: userOneStyle?.aggressive || 0 },
    { name: 'Passive Aggressive', value: userOneStyle?.passive_aggressive || 0 },
  ].filter(item => item.value > 0);

  const pieDataTwo = [
    { name: 'Assertive', value: userTwoStyle?.assertive || 0 },
    { name: 'Passive', value: userTwoStyle?.passive || 0 },
    { name: 'Aggressive', value: userTwoStyle?.aggressive || 0 },
    { name: 'Passive Aggressive', value: userTwoStyle?.passive_aggressive || 0 },
  ].filter(item => item.value > 0);

  const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

  const userOneStrengths = communication?.user_one?.strengths || [];
  const userOneWeaknesses = communication?.user_one?.weaknesses || [];
  const userTwoStrengths = communication?.user_two?.strengths || [];
  const userTwoWeaknesses = communication?.user_two?.weaknesses || [];

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
      } transition-all duration-700 delay-400`}
    >
      <h3 className="text-2xl font-semibold mb-6 text-emerald-900 flex items-center gap-2">
        <Icon icon="mdi:message-text" className="w-6 h-6 text-emerald-600" />
        Communication Analysis
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-medium mb-4 text-emerald-800">Communication Score</h4>
          {userOneScore === 0 && userTwoScore === 0 ? (
            <div className="h-[250px] flex items-center justify-center text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-center">
                <Icon icon="mdi:information-outline" className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Communication scores not available</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#059669" />
                <YAxis stroke="#059669" domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#34d399'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-lg font-medium mb-4 text-emerald-800">{userOneName} Style</h4>
            {pieDataOne.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieDataOne}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieDataOne.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-emerald-600 text-sm">No style data available</div>
            )}
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-emerald-800">{userTwoName} Style</h4>
            {pieDataTwo.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieDataTwo}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieDataTwo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-emerald-600 text-sm">No style data available</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium mb-4 text-emerald-800">{userOneName}</h4>
          <div className="space-y-4">
            {userOneStrengths.length > 0 ? (
              <div>
                <div className="text-sm text-emerald-700 mb-2 flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="w-4 h-4 text-emerald-600" />
                  Strengths
                </div>
                <div className="flex flex-wrap gap-2">
                  {userOneStrengths.map((strength, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm border border-emerald-200"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                No strengths identified
              </div>
            )}
            {userOneWeaknesses.length > 0 ? (
              <div>
                <div className="text-sm text-emerald-700 mb-2 flex items-center gap-2">
                  <Icon icon="mdi:close-circle" className="w-4 h-4 text-red-500" />
                  Weaknesses
                </div>
                <div className="flex flex-wrap gap-2">
                  {userOneWeaknesses.map((weakness, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm border border-red-200"
                    >
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                No weaknesses identified
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-4 text-emerald-800">{userTwoName}</h4>
          <div className="space-y-4">
            {userTwoStrengths.length > 0 ? (
              <div>
                <div className="text-sm text-emerald-700 mb-2 flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="w-4 h-4 text-emerald-600" />
                  Strengths
                </div>
                <div className="flex flex-wrap gap-2">
                  {userTwoStrengths.map((strength, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm border border-emerald-200"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                No strengths identified
              </div>
            )}
            {userTwoWeaknesses.length > 0 ? (
              <div>
                <div className="text-sm text-emerald-700 mb-2 flex items-center gap-2">
                  <Icon icon="mdi:close-circle" className="w-4 h-4 text-red-500" />
                  Weaknesses
                </div>
                <div className="flex flex-wrap gap-2">
                  {userTwoWeaknesses.map((weakness, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm border border-red-200"
                    >
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                No weaknesses identified
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationAnalysis;
