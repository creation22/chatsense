import { useState, useEffect } from 'react';
import DashboardHeader from './Dashboard/DashboardHeader';
import OverviewCards from './Dashboard/OverviewCards';
import CommunicationAnalysis from './Dashboard/CommunicationAnalysis';
import EmotionalAnalysis from './Dashboard/EmotionalAnalysis';
import FlagsSection from './Dashboard/FlagsSection';
import TrendProjection from './Dashboard/TrendProjection';
import SuggestionsSection from './Dashboard/SuggestionsSection';

const Dashboard = ({ analysisData, onBackToHome }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const participantNames = analysisData?.participantNames || {};

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-emerald-600 text-lg">No analysis data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #10b981, transparent)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* App Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <DashboardHeader data={analysisData} mounted={mounted} participantNames={participantNames} />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <OverviewCards data={analysisData} mounted={mounted} participantNames={participantNames} />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-emerald-100 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-emerald-900">Quick Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-emerald-700 mb-1">Relationship Health</div>
                    <div className="text-3xl font-bold text-emerald-600">
                      {analysisData?.summary?.relationship_health_score || 0}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-emerald-700 mb-1">Romantic Probability</div>
                    <div className="text-3xl font-bold text-emerald-600">
                      {analysisData?.summary?.romantic_probability || 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CommunicationAnalysis data={analysisData} mounted={mounted} participantNames={participantNames} />
          </div>

          <div className="mt-8">
            <EmotionalAnalysis data={analysisData} mounted={mounted} participantNames={participantNames} />
          </div>

          <div className="mt-8">
            <FlagsSection data={analysisData} mounted={mounted} participantNames={participantNames} />
          </div>

          <div className="mt-8">
            <TrendProjection data={analysisData} mounted={mounted} />
          </div>

          <div className="mt-8">
            <SuggestionsSection data={analysisData} mounted={mounted} participantNames={participantNames} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

