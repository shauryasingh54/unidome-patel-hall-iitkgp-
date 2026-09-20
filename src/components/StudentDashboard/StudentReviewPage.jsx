import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Clock,
  Download,
  FileText,
  Lock,
  Sparkles
} from 'lucide-react';

export const StudentReviewPage = () => {
  const { applications, startFollowUpChat, exportDatabaseBackup } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Header & Status Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-extrabold font-mono uppercase tracking-wider text-zinc-400">
            Application Status & CV Evaluations ({applications.length})
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Private status tracking, 1-to-10 CV scores, and feedback provided by Alumni.
          </p>
        </div>

        <button
          onClick={exportDatabaseBackup}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold self-start sm:self-auto transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 text-zinc-400 text-xs">
            You haven't submitted any applications yet. Head over to Openings to apply with your CV.
          </div>
        ) : (
          applications.map(app => (
            <div
              key={app.id}
              className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4"
            >
              
              {/* Application Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700">
                      #{app.id}
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      {app.jobTitle}
                    </h3>
                    <span className="text-zinc-400 text-xs">at <strong className="text-white">{app.company}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-400 flex-wrap">
                    <span>Applied: {app.appliedDate}</span>
                    <span>•</span>
                    <span>Alum: <strong className="text-zinc-200">{app.alumName}</strong></span>
                    <span>•</span>
                    <span className="font-mono text-zinc-400 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-zinc-500" />
                      {app.selectedResumeTitle || app.cvFileName}
                    </span>
                  </div>
                </div>

                {/* Outcome Badge */}
                <div className="shrink-0 flex items-center gap-2">
                  {app.status === 'Accepted and Proceeded' && (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-950 bg-white border border-zinc-200 flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-zinc-950" />
                      <span>Accepted & Proceeded • {app.scoreOutOf10}/10</span>
                    </span>
                  )}

                  {app.status === 'Feedback Provided' && (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-200 bg-zinc-800 border border-zinc-700 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-zinc-300" />
                      <span>CV Feedback & Tips • {app.scoreOutOf10}/10</span>
                    </span>
                  )}

                  {app.status === 'Pending Review' && (
                    <span className="px-3 py-1 rounded-xl text-xs font-medium text-zinc-400 bg-zinc-950 border border-zinc-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Pending Review</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Student's Pitch / Approach Submission */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/90 text-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
                  Your Pitch & Approach:
                </span>
                <p className="text-zinc-300 italic">
                  "{app.note}"
                </p>
              </div>

              {/* Alumni Feedback, 1-10 Scoring & Actionable Tips */}
              {app.status !== 'Pending Review' && (
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-zinc-300" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Alumni Evaluation Breakdown
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-zinc-950 text-white border border-zinc-700">
                      CV Rating: {app.scoreOutOf10} / 10
                    </span>
                  </div>

                  {app.whatStoodOut && (
                    <div className="text-xs space-y-1">
                      <span className="text-[10px] font-mono text-zinc-400 font-bold block uppercase">
                        What Stood Out:
                      </span>
                      <p className="text-zinc-200 leading-relaxed">
                        "{app.whatStoodOut}"
                      </p>
                    </div>
                  )}

                  {app.tipsAndSuggestions && (
                    <div className="text-xs space-y-1 pt-2 border-t border-zinc-800">
                      <span className="text-[10px] font-mono text-zinc-400 font-bold block uppercase">
                        Constructive CV Tips:
                      </span>
                      <p className="text-zinc-300 leading-relaxed">
                        "{app.tipsAndSuggestions}"
                      </p>
                    </div>
                  )}

                  {app.feedbackShortcutsUsed?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {app.feedbackShortcutsUsed.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Card Footer */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                  <Lock className="w-3 h-3" />
                  <span>Private Result</span>
                </div>

                <button
                  onClick={() => startFollowUpChat(app.id, app.alumName, `${app.company} - ${app.jobTitle}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-zinc-700 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Message {app.alumName} for Follow-Up</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
