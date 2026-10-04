import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  MessageSquare,
  Clock,
  Download,
  FileText,
  Lock,
  Sparkles,
  Compass
} from 'lucide-react';

export const StudentApplications = () => {
  const { applications, startFollowUpChat, exportDatabaseBackup } = useApp();

  return (
    <div className="space-y-6">

      {/* Header & Status Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
            Application Status & CV Evaluations
          </h1>
          <p className="text-sm text-muted mt-1">
            Private status tracking, 1-to-10 CV scores, and feedback provided by Alumni.
          </p>
        </div>

        <button onClick={exportDatabaseBackup} className="btn-secondary self-start sm:self-auto">
          <Download className="w-3.5 h-3.5" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="surface-card-soft p-12 text-center space-y-3">
            <p className="text-sm text-muted">You haven't submitted any applications yet.</p>
            <Link to="/student/openings" className="btn-primary inline-flex">
              <Compass className="w-3.5 h-3.5" /> Browse Openings
            </Link>
          </div>
        ) : (
          applications.map(app => (
            <div key={app.id} className="surface-card p-6 hover:border-maroon-200 dark:hover:border-maroon-700 transition-all space-y-4">

              {/* Application Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="pill-neutral font-mono">#{app.id}</span>
                    <h3 className="text-base font-extrabold text-heading">{app.jobTitle}</h3>
                    <span className="text-muted text-sm">at <strong className="text-heading">{app.company}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted flex-wrap">
                    <span>Applied: {app.appliedDate}</span>
                    <span>•</span>
                    <span>Alum: <strong className="text-heading">{app.alumName}</strong></span>
                    <span>•</span>
                    <span className="font-mono text-muted flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {app.selectedResumeTitle || app.cvFileName}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {app.status === 'Accepted and Proceeded' && (
                    <span className="pill-success text-xs px-3 py-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accepted & Proceeded • {app.scoreOutOf10}/10</span>
                    </span>
                  )}
                  {app.status === 'Feedback Provided' && (
                    <span className="pill-accent text-xs px-3 py-1.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>CV Feedback & Tips • {app.scoreOutOf10}/10</span>
                    </span>
                  )}
                  {app.status === 'Pending Review' && (
                    <span className="pill-warning text-xs px-3 py-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Pending Review</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="surface-sunken p-4 text-sm space-y-1">
                <span className="text-label block">Your Pitch & Approach</span>
                <p className="text-muted italic">"{app.note}"</p>
              </div>

              {app.status !== 'Pending Review' && (
                <div className="surface-card-soft p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b divider">
                    <div className="flex items-center gap-2 text-label">
                      <Sparkles className="w-4 h-4" />
                      <span>Alumni Evaluation Breakdown</span>
                    </div>
                    <span className="pill-brand font-mono">CV Rating: {app.scoreOutOf10} / 10</span>
                  </div>

                  {app.whatStoodOut && (
                    <div className="text-sm space-y-1">
                      <span className="text-label block">What Stood Out</span>
                      <p className="text-heading leading-relaxed">"{app.whatStoodOut}"</p>
                    </div>
                  )}

                  {app.tipsAndSuggestions && (
                    <div className="text-sm space-y-1 pt-2 border-t divider">
                      <span className="text-label block">Constructive CV Tips</span>
                      <p className="text-muted leading-relaxed">"{app.tipsAndSuggestions}"</p>
                    </div>
                  )}

                  {app.feedbackShortcutsUsed?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {app.feedbackShortcutsUsed.map(tag => (
                        <span key={tag} className="pill-neutral">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-mono-meta">
                  <Lock className="w-3 h-3" />
                  <span>Private Result</span>
                </div>

                <button
                  onClick={() => startFollowUpChat(app.id, app.alumName, `${app.company} - ${app.jobTitle}`)}
                  className="btn-secondary"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
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
