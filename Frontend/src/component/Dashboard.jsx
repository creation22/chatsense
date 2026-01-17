import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import DashboardHeader from './Dashboard/DashboardHeader';
import OverviewCards from './Dashboard/OverviewCards';
import CommunicationAnalysis from './Dashboard/CommunicationAnalysis';
import EmotionalAnalysis from './Dashboard/EmotionalAnalysis';
import FlagsSection from './Dashboard/FlagsSection';
import TrendProjection from './Dashboard/TrendProjection';
import SuggestionsSection from './Dashboard/SuggestionsSection';

const Dashboard = ({ analysisData, onBackToHome }) => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const participantNames = analysisData?.participantNames || {};

  // --- 1. Empty State / Loading Design ---
  if (!analysisData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-slate-200">
           <Icon icon="solar:sad-circle-broken" className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-slate-900 font-semibold text-lg">No Analysis Found</h3>
        <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
          We couldn't find data for this session. Please try uploading your chat again.
        </p>
        <button 
          onClick={onBackToHome}
          className="mt-6 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Helper for score color coding
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-rose-600 bg-rose-50 border-rose-100";
  };

  const healthScore = analysisData?.summary?.relationship_health_score || 0;
  const romanceScore = analysisData?.summary?.romantic_probability || 0;

  return (
    <div className="min-h-screen w-full bg-slate-50 relative selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* --- Technical Background Grid (Matches Landing) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* --- Content Wrapper --- */}
      <div className="relative z-10 pb-20">
        
        {/* Navigation / Header Area */}
        <div className={`sticky top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent border-transparent'}`}>
            <div className="container mx-auto px-4 max-w-7xl py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Back Button */}
                    <button 
                        onClick={onBackToHome}
                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
                    >
                        <Icon icon="solar:arrow-left-linear" className="w-5 h-5" />
                        <span className="hidden sm:inline">Back to Input</span>
                    </button>

                    {/* Meta Info (Right Side) */}
                    <div className="flex items-center gap-3">
                         <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200 text-xs font-mono text-slate-500">
                            <Icon icon="solar:calendar-linear" className="w-3.5 h-3.5" />
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm text-xs font-medium text-slate-700 hover:bg-slate-50">
                            <Icon icon="solar:export-linear" className="w-4 h-4" />
                            <span>Export PDF</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header Component (Passed Down) */}
          <div className="mb-8">
            <DashboardHeader data={analysisData} mounted={mounted} participantNames={participantNames} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* --- Left Column: Deep Analysis (Span 8) --- */}
            <div className="lg:col-span-8 space-y-8">
              <OverviewCards data={analysisData} mounted={mounted} participantNames={participantNames} />
              
              <div className="space-y-8">
                 {/* Section Wrappers with "Paper" styling */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <CommunicationAnalysis data={analysisData} mounted={mounted} participantNames={participantNames} />
                </section>
                
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <EmotionalAnalysis data={analysisData} mounted={mounted} participantNames={participantNames} />
                </section>
                
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <FlagsSection data={analysisData} mounted={mounted} participantNames={participantNames} />
                </section>
                
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <TrendProjection data={analysisData} mounted={mounted} />
                </section>
                
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SuggestionsSection data={analysisData} mounted={mounted} participantNames={participantNames} />
                </section>
              </div>
            </div>

            {/* --- Right Column: Sticky Summary Panel (Span 4) --- */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              
              {/* Scorecard Widget */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Icon icon="solar:chart-square-bold" className="w-24 h-24 text-slate-900" />
                </div>

                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Executive Summary</h3>
                
                <div className="space-y-6 relative z-10">
                  {/* Metric 1 */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-slate-700 font-medium flex items-center gap-2">
                            <Icon icon="solar:heart-pulse-bold" className="text-emerald-500" />
                            Relationship Health
                        </span>
                        <span className={`text-2xl font-bold ${healthScore >= 60 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {healthScore}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${mounted ? healthScore : 0}%` }}
                        />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-slate-700 font-medium flex items-center gap-2">
                            <Icon icon="solar:magic-stick-3-bold" className="text-purple-500" />
                            Romantic Potential
                        </span>
                        <span className={`text-2xl font-bold ${romanceScore >= 60 ? 'text-purple-600' : 'text-slate-600'}`}>
                            {romanceScore}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${mounted ? romanceScore : 0}%` }}
                        />
                    </div>
                  </div>
                </div>

                {/* Dynamic Insight Badge */}
                <div className={`mt-8 p-4 rounded-xl border flex items-start gap-3 ${getScoreColor(healthScore)}`}>
                    <Icon icon="solar:info-circle-bold" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold uppercase mb-1 opacity-80">AI Assessment</p>
                        <p className="text-sm font-medium leading-relaxed">
                            {healthScore > 75 
                                ? "This connection shows strong signs of stability and mutual engagement." 
                                : healthScore > 50 
                                ? "There is potential here, but communication patterns indicate some friction."
                                : "Several red flags were detected. Proceed with awareness."}
                        </p>
                    </div>
                </div>
              </div>

              {/* Secondary Widget: Participants */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Analyzed Participants</h4>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                            {participantNames.p1 ? participantNames.p1[0].toUpperCase() : 'A'}
                        </div>
                        <span className="text-slate-700 font-medium text-sm">{participantNames.p1 || "Person 1"}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                         <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                            {participantNames.p2 ? participantNames.p2[0].toUpperCase() : 'B'}
                        </div>
                        <span className="text-slate-700 font-medium text-sm">{participantNames.p2 || "Person 2"}</span>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;