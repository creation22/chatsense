import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './component/Navbar';
import Landing from './component/Landing';
import Dashboard from './component/Dashboard';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setShowDashboard(true);
    // Optional: Scroll to top when switching views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setShowDashboard(false);
    setAnalysisData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-white relative selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* --- Global Background Elements --- */}
      {/* These stay consistent across both Landing and Dashboard for a smooth feel */}
      <div className="fixed top-20 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[30rem] h-[30rem] bg-teal-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* --- Persistent Navigation --- */}
      <Navbar 
        onHomeClick={handleBackToHome} 
        showHomeButton={showDashboard} 
      />

      {/* --- Main Content Area --- */}
      {/* pt-24 ensures content isn't hidden behind the fixed Navbar */}
      <main className="pt-24 pb-12 relative z-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {showDashboard && analysisData ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Dashboard 
                analysisData={analysisData} 
                onBackToHome={handleBackToHome} 
              />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Landing onAnalysisComplete={handleAnalysisComplete} />
            </div>
          )}
        </div>
      </main>

      {/* --- Vercel Web Analytics --- */}
      <Analytics />

    </div>
  );
}

export default App;