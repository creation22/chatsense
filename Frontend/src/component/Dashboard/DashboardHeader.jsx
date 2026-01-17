import React from 'react';
import { Icon } from '@iconify/react';

const DashboardHeader = ({ data, mounted, participantNames }) => {
  const summary = data?.summary || {};
  const relationshipType = summary?.relationship_type || 'Unknown';
  const sentiment = summary?.overall_sentiment || 'neutral';
  
  // Participant Names Logic
  const p1 = participantNames?.p1 || "Person A";
  const p2 = participantNames?.p2 || "Person B";

  // Sentiment Styles (Modern "Dot" style)
  const getSentimentStyle = (sent) => {
    switch (sent?.toLowerCase()) {
      case 'positive': return { color: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500', border: 'border-emerald-200' };
      case 'negative': return { color: 'text-rose-700', bg: 'bg-rose-50', dot: 'bg-rose-500', border: 'border-rose-200' };
      case 'mixed': return { color: 'text-amber-700', bg: 'bg-amber-50', dot: 'bg-amber-500', border: 'border-amber-200' };
      default: return { color: 'text-slate-700', bg: 'bg-slate-50', dot: 'bg-slate-500', border: 'border-slate-200' };
    }
  };

  const sentStyle = getSentimentStyle(sentiment);

  return (
    <div
      className={`relative w-full mb-8 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      } transition-all duration-700 ease-out`}
    >
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        
        {/* --- Left Side: Identity & Context --- */}
        <div className="flex items-start gap-4">
          {/* Avatar Stack Icon */}
          <div className="hidden sm:flex -space-x-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-emerald-700 font-bold text-lg shadow-sm">
              {p1[0]}
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-700 font-bold text-lg shadow-sm">
              {p2[0]}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              Conversation Analysis
              <span className="hidden md:inline-flex px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-500 font-normal">
                v2.4
              </span>
            </h1>
            <p className="text-slate-500 mt-1 flex items-center gap-2 text-sm">
              <span>Between <strong>{p1}</strong> and <strong>{p2}</strong></span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Processed {new Date().toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        {/* --- Right Side: KPI Stats Grid --- */}
        <div className="flex flex-wrap items-center gap-4">
            
            {/* Metric 1: Relationship Type */}
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Icon icon="solar:users-group-rounded-bold" className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Dynamic</p>
                    <p className="text-sm font-bold text-slate-900 capitalize">{relationshipType}</p>
                </div>
            </div>

            {/* Metric 2: Sentiment Status */}
            <div className={`flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm`}>
                <div className={`p-2 rounded-lg ${sentStyle.bg} ${sentStyle.color}`}>
                    <Icon icon="solar:emoji-funny-circle-bold" className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sentiment</p>
                    <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${sentStyle.dot}`}></span>
                        <p className="text-sm font-bold text-slate-900 capitalize">{sentiment}</p>
                    </div>
                </div>
            </div>

            {/* Metric 3: Message Count (Estimated) */}
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                    <Icon icon="solar:chat-line-bold" className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Messages</p>
                    <p className="text-sm font-bold text-slate-900">
                        {summary?.total_messages || 0} <span className="text-slate-400 font-normal text-xs">count</span>
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;