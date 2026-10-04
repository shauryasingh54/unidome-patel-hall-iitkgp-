import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FEEDBACK_SHORTCUTS } from '../../data/mockData';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
  Sparkles,
  Send,
  MessageSquare,
  Lock,
  Award
} from 'lucide-react';

export const AlumniReviewModal = ({ application, onClose }) => {
  const {
    submitAlumniReview,
    setActiveChatThreadId,
    setIsChatOpen,
    chatThreads
  } = useApp();

  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  // Decision formulation: 'accepted' (Accept and Proceed) vs 'feedback_only' (Constructive Feedback & Tips Only)
  const [decisionType, setDecisionType] = useState(
    application.decisionType || 'accepted'
  );

  // Rating & Structured Feedback State
  const [score, setScore] = useState(application.scoreOutOf10 || 9);
  const [whatStoodOut, setWhatStoodOut] = useState(application.whatStoodOut || '');
  const [tipsAndSuggestions, setTipsAndSuggestions] = useState(
    application.tipsAndSuggestions || ''
  );
  const [selectedShortcuts, setSelectedShortcuts] = useState(
    application.feedbackShortcutsUsed || []
  );
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!application) return null;

  const toggleShortcut = (shortcut) => {
    if (selectedShortcuts.includes(shortcut)) {
      setSelectedShortcuts(prev => prev.filter(s => s !== shortcut));
    } else {
      setSelectedShortcuts(prev => [...prev, shortcut]);
    }
  };

  const handleOpenChat = () => {
    const thread = chatThreads.find(t => t.ticketId === application.id);
    if (thread) {
      setActiveChatThreadId(thread.id);
    }
    setIsChatOpen(true);
  };

  const handleSubmitReview = (e) => {
    if (e) e.preventDefault();
    submitAlumniReview({
      appId: application.id,
      decisionType,
      scoreOutOf10: score,
      whatStoodOut,
      tipsAndSuggestions,
      selectedShortcuts
    });
    setSubmittedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleDownload = () => {
    const dummyText = `ALUMNI EVALUATION & CV REVIEW REPORT
---------------------------------------------------
Applicant: ${application.studentName} (Roll: ${application.studentRoll})
Program: ${application.studentMajor} (${application.studentBatch || 'Batch of 2025/2026'})
CPA: ${application.studentCpa}
Applied Posting: ${application.jobTitle} at ${application.company}

Evaluation Outcome: ${decisionType === 'accepted' ? 'Accepted and Proceeded' : 'Constructive Feedback & Tips Provided'}
CV Score: ${score} / 10
Candidate Approach / Strengths: ${whatStoodOut || 'N/A'}
Constructive CV Tips & Suggestions: ${tipsAndSuggestions || 'N/A'}
Evaluation Tags: ${selectedShortcuts.join(', ')}

Cover Note: "${application.note}"
`;
    const blob = new Blob([dummyText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = application.cvFileName || `${application.studentName}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 surface-overlay animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[92vh] flex flex-col surface-modal overflow-hidden">

        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b divider bg-peach-50/60 dark:bg-sand-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-maroon-700 text-peach-50">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-heading">
                  Student CV Review & Proposal Assessment
                </h3>
                <span className="pill-neutral font-mono">{application.cvFileSize || '2.1 MB'}</span>
                <span className="hidden sm:inline-flex pill-brand">
                  <Lock className="w-3 h-3" /> Private Assessment
                </span>
              </div>
              <p className="text-xs text-muted mt-0.5">
                Candidate: <strong className="text-heading">{application.studentName}</strong> • {application.studentMajor} (Roll: {application.studentRoll})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-sand-900 border border-sand-200 dark:border-sand-700 text-xs">
              <button
                onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                className="p-1 text-sand-400 hover:text-maroon-700 dark:hover:text-peach-200 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1 text-muted">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                className="p-1 text-sand-400 hover:text-maroon-700 dark:hover:text-peach-200 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Trigger */}
            <button
              onClick={handleOpenChat}
              className="btn-secondary p-2"
              title="Message Applicant Privately"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="btn-secondary px-3.5 py-1.5 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>

            {/* Close Button */}
            <button onClick={onClose} className="btn-ghost p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body Split View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

          {/* Left Panel: High-Fidelity Resume & Approach Overview */}
          <div className="flex-1 bg-peach-50/50 dark:bg-sand-950/40 p-6 overflow-y-auto flex flex-col items-center justify-start border-r divider">
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-2xl bg-white dark:bg-sand-900 text-heading shadow-lg rounded-xl border border-sand-200 dark:border-sand-700 p-8 sm:p-10 space-y-6 transition-transform duration-200"
            >
              {/* Header inside Resume */}
              <div className="border-b divider pb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-maroon-900 dark:text-peach-50 uppercase">
                    {application.studentName}
                  </h1>
                  <p className="text-sm text-muted font-medium mt-0.5">
                    {application.studentMajor} • Roll: {application.studentRoll}
                  </p>
                  <p className="text-xs text-muted font-mono mt-0.5">
                    Email: {application.studentEmail} | Verified UniDome Candidate
                  </p>
                </div>
                <div className="text-right">
                  <span className="pill-brand font-mono">CPA: {application.studentCpa}</span>
                </div>
              </div>

              {/* Target Position Applied For */}
              <div className="surface-sunken p-3">
                <span className="text-mono-meta uppercase tracking-wide block">Applying For Posted Opportunity</span>
                <span className="text-sm font-bold text-heading">{application.jobTitle}</span>
                <span className="text-sm text-muted ml-1.5">({application.company})</span>
              </div>

              {/* Student Overview & Approach Statement */}
              <div className="surface-card-soft p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-label">
                  <Sparkles className="w-3.5 h-3.5" />
                  Applicant Overview & Approach
                </div>
                <p className="text-sm text-heading italic leading-relaxed">
                  "{application.note}"
                </p>
              </div>

              {/* Academic Highlights & Competencies */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-maroon-700 dark:text-peach-200 border-b divider pb-1.5 mb-2">
                  Academic Highlights & Competencies
                </h2>
                <ul className="list-disc list-inside text-sm text-muted space-y-1">
                  <li>Specialization: Systems Engineering, Applied Problem Solving, Scalable Interfaces</li>
                  <li>Dean's Honor List for consecutive semesters with consistent top-tier academic standing</li>
                  <li>Lead Contributor in Technical Projects with real-time peer code reviews</li>
                </ul>
              </div>

              {/* Technical Experience & Projects */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-maroon-700 dark:text-peach-200 border-b divider pb-1.5 mb-2">
                  Featured Projects & Implementations
                </h2>
                <div className="space-y-2.5 text-sm text-muted">
                  <div className="surface-sunken p-2.5">
                    <strong className="text-heading block">1. Scalable Distributed Infrastructure</strong>
                    <p className="text-xs mt-0.5">
                      Engineered microservices architecture with high concurrency throughput and robust unit test coverage.
                    </p>
                  </div>
                  <div className="surface-sunken p-2.5">
                    <strong className="text-heading block">2. Minimal UI System & Interaction Architecture</strong>
                    <p className="text-xs mt-0.5">
                      Implemented tokens, responsive components, and accessible keyboard navigation in React.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t divider flex justify-between items-center text-[10px] text-muted font-mono">
                <span>Verified by Apex Dome Placement Directorate</span>
                <span>Page {currentPage} of {totalPages}</span>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="my-4 flex items-center gap-3 px-4 py-1.5 rounded-full bg-maroon-700 text-peach-50 text-xs font-mono shadow-md">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>Page {currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage(2)}
                disabled={currentPage === totalPages}
                className="p-1 disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel: Decision Formulation, 1-10 Scoring & Actionable Tips */}
          <div className="w-full md:w-[440px] bg-white dark:bg-sand-900 p-6 flex flex-col justify-between overflow-y-auto shrink-0 space-y-5">

            <form onSubmit={handleSubmitReview} className="space-y-4">

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-label">
                    <Award className="w-3.5 h-3.5" />
                    Alumni Proposal Review
                  </div>
                  <span className="text-mono-meta flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Private Notification
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-heading mt-1">
                  {application.studentName}
                </h4>
                <p className="text-sm text-muted">{application.jobTitle} • {application.company}</p>
              </div>

              {/* 1. Review Decision Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-heading block">
                  Decision Formulation:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDecisionType('accepted')}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      decisionType === 'accepted'
                        ? 'bg-maroon-50 dark:bg-maroon-900/30 border-maroon-400 shadow-sm'
                        : 'bg-peach-50 dark:bg-sand-950 border-sand-200 dark:border-sand-700 hover:border-maroon-200 dark:hover:border-maroon-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-heading">Accept & Proceed</span>
                      <CheckCircle2 className={`w-4 h-4 ${decisionType === 'accepted' ? 'text-maroon-700 dark:text-peach-200' : 'text-sand-400'}`} />
                    </div>
                    <p className="text-[10px] text-muted leading-tight">
                      Selected privately for next formulation/referral steps
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDecisionType('feedback_only')}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      decisionType === 'feedback_only'
                        ? 'bg-maroon-50 dark:bg-maroon-900/30 border-maroon-400 shadow-sm'
                        : 'bg-peach-50 dark:bg-sand-950 border-sand-200 dark:border-sand-700 hover:border-maroon-200 dark:hover:border-maroon-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-heading">CV Tips & Feedback</span>
                      <MessageSquare className={`w-4 h-4 ${decisionType === 'feedback_only' ? 'text-maroon-700 dark:text-peach-200' : 'text-sand-400'}`} />
                    </div>
                    <p className="text-[10px] text-muted leading-tight">
                      Provide CV rating score & detailed constructive advice
                    </p>
                  </button>
                </div>
              </div>

              {/* 2. 1 to 10 Candidate Rating Selector */}
              <div className="surface-sunken p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-heading">Score Student's CV (1 to 10):</span>
                  <span className="font-mono font-black text-sm px-2.5 py-0.5 rounded bg-maroon-700 text-peach-50">
                    {score} / 10
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setScore(val)}
                      className={`py-1.5 rounded-lg text-xs font-mono font-black transition-all cursor-pointer ${
                        score === val
                          ? 'bg-maroon-700 text-peach-50 shadow-md scale-105'
                          : 'bg-white dark:bg-sand-900 text-sand-500 dark:text-sand-400 border border-sand-200 dark:border-sand-700 hover:border-maroon-300'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Quick Assessment Chips */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-heading block">
                  Assessment Highlights:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {FEEDBACK_SHORTCUTS.map(sc => {
                    const isSelected = selectedShortcuts.includes(sc);
                    return (
                      <button
                        key={sc}
                        type="button"
                        onClick={() => toggleShortcut(sc)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-maroon-700 text-peach-50 font-bold'
                            : 'bg-peach-50 dark:bg-sand-950 text-sand-500 dark:text-sand-400 border border-sand-200 dark:border-sand-700 hover:border-maroon-300'
                        }`}
                      >
                        {sc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Structured Field: What Stood Out in Approach */}
              <div className="space-y-1">
                <label className="input-label">
                  What Stood Out in Candidate's Approach *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Review candidate's approach, core strengths, problem-solving depth..."
                  value={whatStoodOut}
                  onChange={e => setWhatStoodOut(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* 5. Structured Field: Constructive CV Tips & Suggestions */}
              <div className="space-y-1">
                <label className="input-label">
                  Constructive CV Tips & Improvement Suggestions {decisionType === 'feedback_only' ? '*' : '(Optional)'}
                </label>
                <textarea
                  rows={2}
                  required={decisionType === 'feedback_only'}
                  placeholder="Drop tips to improve this specific CV (e.g., metric proof points, system design details, formatting)..."
                  value={tipsAndSuggestions}
                  onChange={e => setTipsAndSuggestions(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Submit Review Button */}
              <button type="submit" className="btn-primary w-full py-2.5 mt-2">
                {submittedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Decision Recorded & Student Notified Privately!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>
                      {decisionType === 'accepted' ? 'Accept and Proceed (Private Notice)' : 'Submit CV Score & Feedback Tips'}
                    </span>
                  </>
                )}
              </button>

            </form>

            <div className="surface-sunken p-3 text-[11px] text-muted leading-snug">
              <span className="font-bold text-heading block mb-0.5">🔒 Private Notification Policy:</span>
              Decisions and feedback are delivered directly to the candidate via their private portal and direct dialog to prevent unhealthy competition.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
