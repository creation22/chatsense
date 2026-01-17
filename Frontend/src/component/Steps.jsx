import React from "react";
import { Icon } from "@iconify/react";

const Steps = () => {
  const steps = [
    {
      number: "01",
      // Changed to WhatsApp icon as requested for the source
      icon: "logos:whatsapp-icon", 
      title: "Export Chat",
      description: "Export your conversation directly from WhatsApp or iMessage.",
      // Using a subtle ring color instead of heavy gradients
      accent: "ring-emerald-500/20",
    },
    {
      number: "02",
      icon: "solar:clipboard-add-linear", // A more modern "Paste" icon
      title: "Paste Content",
      description: "Drop the text into the analysis box. We handle the formatting.",
      accent: "ring-teal-500/20",
    },
    {
      number: "03",
      icon: "solar:magic-stick-3-linear", // "Magic/Insights" icon
      title: "Get Insights",
      description: "Unlock behavioral patterns, metrics, and summary charts instantly.",
      accent: "ring-emerald-500/20",
    },
  ];

  return (
    <div className="w-full py-24 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-emerald-100 bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wide">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            From Chat to <span className="text-emerald-600">Clarity</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Turn your messy chat logs into actionable data in three automated steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Decorative Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-slate-200 via-emerald-200 to-slate-200 border-t border-dashed border-slate-300" aria-hidden="true" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon Container with "Premium" Glass/Border effect */}
              <div className={`relative mb-6 z-10 transition-all duration-300 group-hover:-translate-y-2`}>
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-xl shadow-slate-200/50 transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                
                {/* Main Box */}
                <div className={`relative w-24 h-24 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center ${step.accent} ring-4`}>
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-md">
                    {step.number}
                  </div>
                  
                  {/* The Icon */}
                  <Icon 
                    icon={step.icon} 
                    className={`w-10 h-10 ${index === 0 ? '' : 'text-emerald-600'} transition-transform duration-500 group-hover:scale-110`} 
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-3 px-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Steps;