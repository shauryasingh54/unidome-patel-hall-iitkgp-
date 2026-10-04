import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Star, UserCheck, Search } from 'lucide-react';

export const FeedbackNetworkDrawer = () => {
  const { feedbackNetwork, isFeedbackNetworkOpen, setIsFeedbackNetworkOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isFeedbackNetworkOpen) return null;

  const filteredNetwork = feedbackNetwork.filter(item =>
    item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.alumName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getScoreClass = (score) => {
    if (score >= 9.0) return 'pill-success';
    if (score >= 7.5) return 'pill-accent';
    return 'pill-warning';
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] bg-white dark:bg-sand-900 border-l border-sand-200 dark:border-sand-700 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

      {/* Drawer Header */}
      <div className="flex items-center justify-between p-5 border-b divider bg-peach-50/60 dark:bg-sand-950/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-maroon-700 text-peach-50 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-heading">
              Candidate Feedback Network
            </h3>
            <p className="text-[11px] text-muted">
              Aggregated Alumni 1-10 Ratings & Evaluation History
            </p>
          </div>
        </div>

        <button onClick={() => setIsFeedbackNetworkOpen(false)} className="btn-ghost p-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4 border-b divider bg-peach-50/40 dark:bg-sand-950/30">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-sand-600" />
          <input
            type="text"
            placeholder="Search candidate name, company, alum..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-9 py-2"
          />
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {filteredNetwork.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted">
            No feedback entries found.
          </div>
        ) : (
          filteredNetwork.map(item => (
            <div
              key={item.id}
              className="surface-card-soft p-5 space-y-3 hover:border-maroon-300 dark:hover:border-maroon-600 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-heading">
                      {item.studentName}
                    </h4>
                    <span className="text-[10px] font-mono text-sand-600">
                      ({item.studentRoll})
                    </span>
                  </div>
                  <p className="text-xs text-maroon-700 dark:text-peach-300 font-medium mt-0.5">
                    Applied for {item.jobTitle} at <strong>{item.company}</strong>
                  </p>
                </div>

                {/* Score out of 10 Pill */}
                <span className={`${getScoreClass(item.scoreOutOf10)} shrink-0 font-mono`}>
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.scoreOutOf10} / 10</span>
                </span>
              </div>

              {/* Feedback text */}
              {item.feedbackText && (
                <p className="text-sm text-heading italic bg-white dark:bg-sand-900 p-3 rounded-xl border border-sand-200/70 dark:border-sand-800/70">
                  "{item.feedbackText}"
                </p>
              )}

              {/* Shortcuts Used */}
              {item.shortcuts && item.shortcuts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.shortcuts.map((sc, i) => (
                    <span key={i} className="pill-neutral">{sc}</span>
                  ))}
                </div>
              )}

              {/* Footer Meta */}
              <div className="pt-2 border-t divider flex items-center justify-between text-[10px] text-sand-600 font-mono">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-maroon-600" /> Evaluated by {item.alumName} ({item.alumBatch})
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
