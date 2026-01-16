import React from "react";
import { Icon } from "@iconify/react";

const Steps = () => {
  const steps = [
    {
      number: 1,
      icon: "mdi:content-copy",
      title: "Copy Your Chat",
      description: "Export or copy your WhatsApp, iMessage, or any chat conversation",
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/30",
    },
    {
      number: 2,
      icon: "mdi:paste",
      title: "Paste Here",
      description: "Paste the chat text into the input box above",
      gradient: "from-teal-500 to-emerald-500",
      shadow: "shadow-teal-500/30",
    },
    {
      number: 3,
      icon: "mdi:chart-line",
      title: "Get Insights",
      description: "Receive comprehensive analysis with charts, metrics, and suggestions",
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/30",
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            How It Works
          </h2>
          <p className="text-slate-500 text-lg">
            Get insights in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 -z-10" />
              )}

              {/* Step Number Circle */}
              <div className={`relative mb-4 w-24 h-24 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg ${step.shadow} group-hover:scale-110 transition-transform duration-300`}>
                <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm" />
                <div className="relative z-10">
                  <Icon icon={step.icon} className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center text-emerald-600 font-bold text-sm shadow-md">
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-800">
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

