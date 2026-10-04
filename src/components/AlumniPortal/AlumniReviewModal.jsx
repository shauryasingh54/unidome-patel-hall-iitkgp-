import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FEEDBACK_SHORTCUTS } from '../../data/mockData';
import {
  X,
  Download,
  FileText,
  CheckCircle2,
  Send,
  MessageSquare,
  Lock,
  Award
} from 'lucide-react';

export const AlumniReviewModal = ({ application, onClose }) => {
  const { submitAlumniReview, setActiveChatThreadId, setIsChatOpen, chatThreads, studentResumes } = useApp();

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const resume = studentResumes.find(r => r.id === application.selectedResumeId);
  const isReviewed = application.status !== 'Pending Review';

  const [decisionType, setDecisionType] = useState(application.decisionType || 'accepted');
  const [score, setScore] = useState(application.scoreOutOf10 ?? null);
  const [whatStoodOut, setWhatStoodOut] = useState(application.whatStoodOut || '');
  const [tipsAndSuggestions, setTipsAndSuggestions] = useState(application.tipsAndSuggestions || '');
  const [selectedShortcuts, setSelectedShortcuts] = useState(application.feedbackShortcutsUsed || []);
  const [submitted, setSubmitted] = useState(false);

  const toggleShortcut = (shortcut) => {
    setSelectedShortcuts(prev =>
      prev.includes(shortcut) ? prev.filter(s => s !== shortcut) : [...prev, shortcut]
    );
  };

  const handleOpenChat = () => {
    const thread = chatThreads.find(t => t.ticketId === application.id);
    if (thread) setActiveChatThreadId(thread.id);
    setIsChatOpen(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (score === null) return;
    submitAlumniReview({
      appId: application.id,
      decisionType,
      scoreOutOf10: score,
      whatStoodOut,
      tipsAndSuggestions,
      selectedShortcuts
    });
    setSubmitted(true);
    setTimeout(onClose, 1000);
  };

  const handleDownload = () => {
    const text = `CV REVIEW SUMMARY
--------------------------------------------
Applicant: ${application.studentName} (${application.studentRoll})
Program: ${application.studentMajor} · CPA ${application.studentCpa}
Applied for: ${application.jobTitle} at ${application.company}
Resume submitted: ${application.selectedResumeTitle || application.cvFileName}

Outcome: ${decisionType === 'accepted' ? 'Accepted and proceeded' : 'Feedback and tips provided'}
Score: ${score ?? 'Not yet scored'} / 10
What stood out: ${whatStoodOut || 'N/A'}
Tips: ${tipsAndSuggestions || 'N/A'}
Highlights: ${selectedShortcuts.join(', ') || 'N/A'}

Student's pitch: "${application.note}"
`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${application.studentRoll}_review_summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const canSubmit = score !== null && whatStoodOut.trim() && (decisionType === 'accepted' || tipsAndSuggestions.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 surface-overlay animate-in fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col surface-modal overflow-hidden">

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b divider shrink-0">
          <div className="min-w-0">
            <h3 className="font-extrabold text-base text-heading truncate">{application.studentName}</h3>
            <p className="text-xs text-muted truncate">
              {application.studentMajor} · {application.studentRoll} · applied for {application.jobTitle} ({application.company})
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={handleOpenChat} className="btn-secondary p-2" title="Message applicant">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button onClick={handleDownload} className="btn-secondary px-3 py-2 text-xs">
              <Download className="w-3.5 h-3.5" />
              <span>Summary</span>
            </button>
            <button onClick={onClose} className="btn-ghost p-2" title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_380px] overflow-hidden">

          {/* Left: what the student actually submitted */}
          <div className="overflow-y-auto p-6 space-y-5">
            <div className="space-y-1.5">
              <span className="text-label">Pitch</span>
              <p className="text-base text-heading leading-relaxed">"{application.note}"</p>
            </div>

            <div className="surface-sunken p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-heading">
                <FileText className="w-4 h-4" />
                {application.selectedResumeTitle || application.cvFileName}
              </div>
              <p className="text-xs text-mono-meta">{application.cvFileName} · {application.cvFileSize}</p>
              {resume && (
                <>
                  <p className="text-sm text-muted leading-relaxed pt-1">{resume.aboutStatement}</p>
                  {resume.workEthics && <p className="text-sm text-muted italic">"{resume.workEthics}"</p>}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[...(resume.repoLinks || []), ...(resume.attachments || [])].map((l, i) => (
                      <a key={i} href={l.url} target="_blank" rel="noreferrer" className="pill-neutral hover:text-maroon-700">
                        {l.label}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="text-xs text-muted flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Your review is private and only shared with this student.
            </div>
          </div>

          {/* Right: review form */}
          <form onSubmit={handleSubmitReview} className="overflow-y-auto border-t md:border-t-0 md:border-l divider bg-peach-50/50 dark:bg-sand-950/40 p-6 space-y-5">

            <div className="space-y-2">
              <span className="text-label flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> Decision</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'accepted', title: 'Accept & proceed', note: 'Move to next referral step' },
                  { id: 'feedback_only', title: 'Feedback only', note: 'Score and tips, no referral' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDecisionType(opt.id)}
                    className={`p-3 rounded-lg text-left border transition-colors cursor-pointer ${
                      decisionType === opt.id
                        ? 'bg-maroon-700 border-maroon-700 text-peach-50'
                        : 'bg-white dark:bg-sand-900 border-sand-200 dark:border-sand-700 text-heading hover:border-maroon-300'
                    }`}
                  >
                    <span className="block text-xs font-bold">{opt.title}</span>
                    <span className={`block text-[11px] mt-0.5 ${decisionType === opt.id ? 'text-peach-200' : 'text-muted'}`}>{opt.note}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="input-label mb-0">Score (1–10)</span>
                <span className="font-mono text-sm font-bold text-maroon-700 dark:text-peach-200">{score ?? '—'}{score !== null && ' / 10'}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setScore(val)}
                    className={`py-2 rounded-md text-xs font-mono font-bold cursor-pointer transition-colors ${
                      score === val
                        ? 'bg-maroon-700 text-peach-50'
                        : 'bg-white dark:bg-sand-900 text-sand-700 border border-sand-200 dark:border-sand-700 hover:border-maroon-300'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="input-label mb-0">Highlights</span>
              <div className="flex flex-wrap gap-1.5">
                {FEEDBACK_SHORTCUTS.map(sc => {
                  const on = selectedShortcuts.includes(sc);
                  return (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => toggleShortcut(sc)}
                      className={`px-2 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-colors ${
                        on ? 'bg-maroon-700 text-peach-50' : 'bg-white dark:bg-sand-900 text-sand-600 dark:text-sand-300 border border-sand-200 dark:border-sand-700 hover:border-maroon-300'
                      }`}
                    >
                      {sc}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="input-label">What stood out *</label>
              <textarea rows={2} required value={whatStoodOut} onChange={e => setWhatStoodOut(e.target.value)} className="input-field" placeholder="Strengths, project depth, clarity of approach" />
            </div>

            <div>
              <label className="input-label">Tips to improve the CV {decisionType === 'feedback_only' ? '*' : '(optional)'}</label>
              <textarea rows={2} required={decisionType === 'feedback_only'} value={tipsAndSuggestions} onChange={e => setTipsAndSuggestions(e.target.value)} className="input-field" placeholder="Metrics to add, sections to cut, formatting" />
            </div>

            <button type="submit" disabled={!canSubmit || submitted} className="btn-primary w-full py-2.5">
              {submitted ? <><CheckCircle2 className="w-4 h-4" /> Saved</> : <><Send className="w-4 h-4" /> {decisionType === 'accepted' ? 'Accept & notify student' : 'Send feedback'}</>}
            </button>
            {score === null && <p className="text-[11px] text-muted text-center">Choose a score to continue.</p>}
            {isReviewed && <p className="text-[11px] text-muted text-center">This application was already reviewed. Saving updates it.</p>}
          </form>

        </div>
      </div>
    </div>
  );
};
