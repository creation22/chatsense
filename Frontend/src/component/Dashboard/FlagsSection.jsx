import { Icon } from '@iconify/react';

const FlagsSection = ({ data, mounted, participantNames }) => {
  const flags = data?.flags || {};

  const userOneName = participantNames?.user_one || 'User One';
  const userTwoName = participantNames?.user_two || 'User Two';

  const userOneGreenFlags = flags?.user_one?.green_flags || [];
  const userOneRedFlags = flags?.user_one?.red_flags || [];
  const userTwoGreenFlags = flags?.user_two?.green_flags || [];
  const userTwoRedFlags = flags?.user_two?.red_flags || [];

  const FlagList = ({ greenFlags, redFlags, title }) => (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-emerald-900">{title}</h4>
      
      {greenFlags.length > 0 && (
        <div>
          <div className="text-sm text-emerald-700 mb-2 flex items-center gap-2">
            <Icon icon="mdi:check-circle" className="w-4 h-4 text-emerald-600" />
            Green Flags
          </div>
          <div className="space-y-2">
            {greenFlags.map((flag, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <Icon icon="mdi:check-circle" className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-emerald-900">{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {redFlags.length > 0 && (
        <div>
          <div className="text-sm text-emerald-700 mb-2 flex items-center gap-2">
            <Icon icon="mdi:close-circle" className="w-4 h-4 text-red-500" />
            Red Flags
          </div>
          <div className="space-y-2">
            {redFlags.map((flag, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <Icon icon="mdi:close-circle" className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-red-900">{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {greenFlags.length === 0 && redFlags.length === 0 && (
        <div className="text-emerald-600 text-sm">No flags available</div>
      )}
    </div>
  );

  return (
    <div
      className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-emerald-100 shadow-xl ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-700 delay-600`}
    >
      <h3 className="text-2xl font-semibold mb-6 text-emerald-900">Flags</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FlagList
          greenFlags={userOneGreenFlags}
          redFlags={userOneRedFlags}
          title={userOneName}
        />
        <FlagList
          greenFlags={userTwoGreenFlags}
          redFlags={userTwoRedFlags}
          title={userTwoName}
        />
      </div>
    </div>
  );
};

export default FlagsSection;
