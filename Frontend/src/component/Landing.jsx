import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Steps from "./Steps";
import Footer from "./Footer";

const Landing = ({ onAnalysisComplete }) => {
  const [chatText, setChatText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // --- Logic remains the same, only UI changes ---
  const handleAnalyze = async () => {
    if (!chatText.trim()) {
      setError("Please paste your chat conversation first.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { analyzeChat } = await import("../utils/api");
      const { transformAnalysisData } = await import("../utils/dataTransform");
      
      const response = await analyzeChat(chatText);
      const transformedData = transformAnalysisData(response);
      
      setSuccess(true);
      setTimeout(() => {
        if (onAnalysisComplete) onAnalysisComplete(transformedData);
      }, 500);
    } catch (err) {
      setError(err.message || "Failed to analyze conversation. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setChatText(text);
      setError(null);
    } catch (err) {
      setError("Unable to read from clipboard. Please paste manually.");
    }
  };

  const handleClear = () => {
    setChatText("");
    setError(null);
    setSuccess(false);
  };

  const features = [
    { icon: "solar:heart-pulse-bold", label: "Emotional Depth", desc: "Track sentiment swings & patterns." },
    { icon: "solar:chat-line-bold", label: "Communication", desc: "Response times & volume metrics." },
    { icon: "solar:graph-up-bold", label: "Trend Analysis", desc: "Visualize relationship health." },
    { icon: "solar:flag-bold", label: "Red Flags", desc: "AI-detected warning signs." },
    { icon: "solar:lightbulb-bold", label: "Actionable Insights", desc: "Personalized improvement tips." },
    { icon: "solar:shield-check-bold", label: "Privacy First", desc: "Data processing is ephemeral." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      
      {/* --- Technical Background Grid --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>

      {/* --- Hero Section --- */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-xs font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            AI Relationship Intelligence v2.0
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Decode your <span className="text-emerald-600">conversations</span>.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Paste your chat logs below. Our engine parses sentiment, response times, and hidden patterns to give you a clear report.
          </p>
        </div>

        {/* --- The "Editor" Input Component --- */}
        <div className="max-w-4xl mx-auto relative group">
          {/* Decorative glow behind the editor */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-2xl opacity-20 blur transition duration-500 group-hover:opacity-40"></div>
          
          <div className="relative bg-white rounded-xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            
            {/* Toolbar / Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
              <div className="text-xs font-mono text-slate-400">input.txt</div>
              <div className="flex gap-2">
                {chatText && (
                  <button 
                    onClick={handleClear}
                    className="text-xs font-medium text-slate-400 hover:text-rose-500 transition-colors px-2"
                  >
                    Clear
                  </button>
                )}
                <button 
                  onClick={handlePaste}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition-all"
                >
                  <Icon icon="solar:clipboard-add-linear" />
                  Paste
                </button>
              </div>
            </div>

            {/* Text Area */}
            <textarea
              value={chatText}
              onChange={(e) => { setChatText(e.target.value); setError(null); }}
              placeholder="Paste WhatsApp or iMessage export here..."
              disabled={loading}
              className="w-full bg-white p-6 text-slate-600 placeholder:text-slate-300 focus:outline-none min-h-[280px] font-mono text-sm resize-y"
              spellCheck="false"
            />

            {/* Bottom Status Bar / Action Area */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              
              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                 {error ? (
                    <div className="flex items-center gap-2 text-rose-600 text-sm font-medium animate-in slide-in-from-left-2">
                      <Icon icon="solar:danger-circle-bold" />
                      <span>{error}</span>
                    </div>
                 ) : success ? (
                    <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium animate-in slide-in-from-left-2">
                      <Icon icon="solar:check-circle-bold" />
                      <span>Ready to analyze</span>
                    </div>
                 ) : (
                    <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs font-mono">
                      <Icon icon="solar:info-circle-linear" />
                      <span>Data is processed locally in browser memory</span>
                    </div>
                 )}
              </div>

              {/* Main Action Button */}
              <button
                onClick={handleAnalyze}
                disabled={loading || !chatText.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all shadow-lg shadow-slate-900/20"
              >
                {loading ? (
                  <>
                    <Icon icon="svg-spinners:ring-resize" className="w-4 h-4" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Run Analysis</span>
                    <Icon icon="solar:arrow-right-linear" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Steps Component --- */}
      <section className="py-20 border-t border-slate-200 bg-white">
        <Steps />
      </section>

      {/* --- Features Grid (Bento Style) --- */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Intelligence breakdown</h2>
            <p className="text-slate-500">Six distinct metrics to understand your dynamic.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:scale-110 transition-all duration-300 mb-4">
                  <Icon icon={feature.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Minimal CTA --- */}
      <section className="py-24 px-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Stop guessing. Start knowing.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button
              onClick={() => {
                document.querySelector('textarea')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.querySelector('textarea')?.focus();
              }}
              className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30"
            >
              Start Analysis
            </button>
            <p className="text-xs text-slate-400 font-mono">No sign-up required</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;