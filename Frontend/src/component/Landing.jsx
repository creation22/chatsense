import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Steps from "./Steps";
import Footer from "./Footer";

const Landing = ({ onAnalysisComplete }) => {
  const [chatText, setChatText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
        if (onAnalysisComplete) {
          onAnalysisComplete(transformedData);
        }
      }, 500);
    } catch (err) {
      setError(err.message || "Failed to analyze conversation. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAnalyze();
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
    { icon: "mdi:heart-pulse", label: "Emotional Depth", desc: "Track sentiment swings and emotional patterns" },
    { icon: "mdi:message-processing", label: "Communication", desc: "Analyze response time & message volume" },
    { icon: "mdi:chart-line", label: "Trend Analysis", desc: "See relationship health over time" },
    { icon: "mdi:flag", label: "Red Flags", desc: "Identify potential warning signs" },
    { icon: "mdi:lightbulb-on", label: "Actionable Insights", desc: "Get personalized suggestions" },
    { icon: "mdi:shield-check", label: "Privacy First", desc: "Your data is never stored" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
      {/* Background decoration blobs */}
      <div className="fixed top-20 left-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-3xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 relative overflow-hidden">
          
          {/* Top decorative line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400" />

          {/* Header Section */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-700 text-xs font-medium uppercase tracking-wider mb-2">
              <Icon icon="mdi:sparkles" className="w-3.5 h-3.5" />
              AI Relationship Intelligence
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
              Decode Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Conversations</span>
            </h1>
            
            <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
              Paste your chat logs to uncover hidden emotions, communication patterns, and relationship health metrics.
            </p>
          </div>

          {/* Main Input Card */}
          <div className="space-y-6 relative z-10">
            
            {/* Text Area Container */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 hover:border-emerald-300">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Chat Content
                </label>
                <div className="flex gap-2">
                  <button 
                    onClick={handlePaste}
                    className="text-xs flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                  >
                    <Icon icon="mdi:content-paste" /> Paste
                  </button>
                  {chatText && (
                    <button 
                      onClick={handleClear}
                      className="text-xs flex items-center gap-1 text-slate-400 hover:text-red-500 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                      <Icon icon="mdi:trash-can-outline" /> Clear
                    </button>
                  )}
                </div>
              </div>

              <textarea
                value={chatText}
                onChange={(e) => {
                  setChatText(e.target.value);
                  setError(null);
                }}
                onKeyDown={handleKeyPress}
                placeholder="Paste your WhatsApp or exported chat text here..."
                disabled={loading}
                className="w-full bg-transparent p-5 text-slate-700 placeholder:text-slate-400 focus:outline-none min-h-[200px] resize-y rounded-b-2xl font-mono text-sm leading-relaxed"
              />
            </div>

            {/* Feedback Messages */}
            <div className="min-h-[3rem]">
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
                  <Icon icon="mdi:alert-circle" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold block mb-1">Error Analysis Failed</span>
                    {error}
                  </div>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm animate-in fade-in slide-in-from-top-2">
                  <div className="bg-emerald-100 p-1 rounded-full">
                    <Icon icon="mdi:check" className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Analysis successful! Generating insights...</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !chatText.trim()}
              className="group w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white shadow-lg transition-all duration-300 hover:shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <div className="relative flex items-center justify-center gap-2 font-semibold text-lg">
                {loading ? (
                  <>
                    <Icon icon="svg-spinners:180-ring-with-bg" className="w-6 h-6 text-emerald-100" />
                    <span>Processing Conversation...</span>
                  </>
                ) : (
                  <>
                    <span>Run Analysis</span>
                    <Icon icon="mdi:arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
            
            <p className="text-center text-xs text-slate-400 mt-4">
              Press <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded border border-slate-200 text-slate-500">Ctrl</kbd> + <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded border border-slate-200 text-slate-500">Enter</kbd> to analyze instantly
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <Steps />
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              What You Get
            </h2>
            <p className="text-slate-500 text-lg">
              Comprehensive insights into your conversations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-4 group-hover:bg-emerald-100 transition-colors">
                  <Icon icon={feature.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 text-lg mb-2">
                  {feature.label}
                </h3>
                <p className="text-sm text-slate-500">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Understand Your Conversations?
            </h2>
            <p className="text-emerald-50 text-lg mb-6">
              Get started now and discover insights you never knew existed
            </p>
            <button
              onClick={() => {
                document.querySelector('textarea')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.querySelector('textarea')?.focus();
              }}
              className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start Analyzing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
