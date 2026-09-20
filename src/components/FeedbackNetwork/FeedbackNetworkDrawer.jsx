import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  Star,
  Award,
  UserCheck,
  Building2,
  Tag,
  Search,
  CheckCircle2,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

export const FeedbackNetworkDrawer = () => {
  const { feedbackNetwork, isFeedbackNetworkOpen, setIsFeedbackNetworkOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isFeedbackNetworkOpen) return null;

  const filteredNetwork = feedbackNetwork.filter(item =>
    item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.alumName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getScoreColor = (score) => {
    if (score >= 9.0) return 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 7.5) return 'text-cyan-500 border-cyan-500/30 bg-cyan-500/10';
    return 'text-amber-500 border-amber-500/30 bg-amber-500/10';
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Candidate Feedback Network
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Aggregated Alumni 1-10 Ratings & Evaluation History
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsFeedbackNetworkOpen(false)}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-950/40">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate name, company, alum..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {filteredNetwork.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No feedback entries found.
          </div>
        ) : (
          filteredNetwork.map(item => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-3 hover:border-cyan-500/40 transition-all shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {item.studentName}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      ({item.studentRoll})
                    </span>
                  </div>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium mt-0.5">
                    Applied for {item.jobTitle} at <strong>{item.company}</strong>
                  </p>
                </div>

                {/* Score out of 10 Pill */}
                <div className={`px-3 py-1 rounded-full border text-xs font-black flex items-center gap-1 font-mono shrink-0 ${getScoreColor(item.scoreOutOf10)}`}>
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.scoreOutOf10} / 10</span>
                </div>
              </div>

              {/* Feedback text */}
              {item.feedbackText && (
                <p className="text-xs text-slate-700 dark:text-slate-300 italic bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                  "{item.feedbackText}"
                </p>
              )}

              {/* Shortcuts Used */}
              {item.shortcuts && item.shortcuts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.shortcuts.map((sc, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300/50 dark:border-slate-700/50"
                    >
                      {sc}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer Meta */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-cyan-500" /> Evaluated by {item.alumName} ({item.alumBatch})
                </span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
