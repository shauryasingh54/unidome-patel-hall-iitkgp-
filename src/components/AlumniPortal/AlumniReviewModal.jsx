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
  ArrowRight,
  HelpCircle,
  ShieldCheck,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[92vh] flex flex-col rounded-2xl border border-zinc-800 bg-[#0c0c0e] text-zinc-100 shadow-2xl overflow-hidden">
        
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-zinc-800/80 bg-zinc-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-zinc-800 text-white border border-zinc-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">
                  Student CV Review & Proposal Assessment
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {application.cvFileSize || '2.1 MB'}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800">
                  <Lock className="w-3 h-3 text-zinc-400" /> Private Assessment
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Candidate: <strong className="text-zinc-200">{application.studentName}</strong> • {application.studentMajor} (Roll: {application.studentRoll})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-zinc-800/80 border border-zinc-700 text-xs">
              <button
                onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1 text-zinc-300">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Trigger */}
            <button
              onClick={handleOpenChat}
              className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
              title="Message Applicant Privately"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-bold text-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body Split View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Panel: High-Fidelity Resume & Approach Overview */}
          <div className="flex-1 bg-[#141416] p-6 overflow-y-auto flex flex-col items-center justify-start border-r border-zinc-800/80">
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-2xl bg-[#1e1e24] text-zinc-100 shadow-2xl rounded-xl border border-zinc-700/80 p-8 sm:p-10 space-y-6 transition-transform duration-200"
            >
              {/* Header inside Resume */}
              <div className="border-b border-zinc-700 pb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                    {application.studentName}
                  </h1>
                  <p className="text-xs text-zinc-300 font-medium mt-0.5">
                    {application.studentMajor} • Roll: {application.studentRoll}
                  </p>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Email: {application.studentEmail} | Verified UniDome Candidate
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded bg-zinc-800 border border-zinc-600 text-[11px] font-bold text-zinc-100 font-mono">
                    CPA: {application.studentCpa}
                  </span>
                </div>
              </div>

              {/* Target Position Applied For */}
              <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-700/60">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide block">Applying For Posted Opportunity</span>
                <span className="text-xs font-bold text-white">{application.jobTitle}</span>
                <span className="text-xs text-zinc-400 ml-1.5">({application.company})</span>
              </div>

              {/* Student Overview & Approach Statement */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-700/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-200" />
                  Applicant Overview & Approach
                </div>
                <p className="text-xs text-zinc-200 italic leading-relaxed">
                  "{application.note}"
                </p>
              </div>

              {/* Academic Highlights & Competencies */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300 border-b border-zinc-700/80 pb-1 mb-2">
                  Academic Highlights & Competencies
                </h2>
                <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1">
                  <li>Specialization: Systems Engineering, Applied Problem Solving, Scalable Interfaces</li>
                  <li>Dean's Honor List for consecutive semesters with consistent top-tier academic standing</li>
                  <li>Lead Contributor in Technical Projects with real-time peer code reviews</li>
                </ul>
              </div>

              {/* Technical Experience & Projects */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300 border-b border-zinc-700/80 pb-1 mb-2">
                  Featured Projects & Implementations
                </h2>
                <div className="space-y-2.5 text-xs text-zinc-300">
                  <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                    <strong className="text-white block">1. Scalable Distributed Infrastructure</strong>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Engineered microservices architecture with high concurrency throughput and robust unit test coverage.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                    <strong className="text-white block">2. Minimal UI System & Interaction Architecture</strong>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Implemented tokens, responsive components, and accessible keyboard navigation in React.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-zinc-700/80 flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                <span>Verified by Apex Dome Placement Directorate</span>
                <span>Page {currentPage} of {totalPages}</span>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="my-4 flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-mono border border-zinc-800 shadow-md">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>Page {currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage(2)}
                disabled={currentPage === totalPages}
                className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel: Decision Formulation, 1-10 Scoring & Actionable Tips */}
          <div className="w-full md:w-[440px] bg-zinc-950 p-6 flex flex-col justify-between overflow-y-auto shrink-0 space-y-5">
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                    <Award className="w-3.5 h-3.5 text-zinc-300" />
                    Alumni Proposal Review
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Private Notification
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-white mt-1">
                  {application.studentName}
                </h4>
                <p className="text-xs text-zinc-400">{application.jobTitle} • {application.company}</p>
              </div>

              {/* 1. Review Decision Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-300">
                  Decision Formulation:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDecisionType('accepted')}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      decisionType === 'accepted'
                        ? 'bg-zinc-800 text-white border-white shadow-sm'
                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">Accept & Proceed</span>
                      <CheckCircle2 className={`w-4 h-4 ${decisionType === 'accepted' ? 'text-white' : 'text-zinc-500'}`} />
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-tight">
                      Selected privately for next formulation/referral steps
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDecisionType('feedback_only')}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      decisionType === 'feedback_only'
                        ? 'bg-zinc-800 text-white border-white shadow-sm'
                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">CV Tips & Feedback</span>
                      <MessageSquare className={`w-4 h-4 ${decisionType === 'feedback_only' ? 'text-white' : 'text-zinc-500'}`} />
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-tight">
                      Provide CV rating score & detailed constructive advice
                    </p>
                  </button>
                </div>
              </div>

              {/* 2. 1 to 10 Candidate Rating Selector */}
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-200">Score Student's CV (1 to 10):</span>
                  <span className="font-mono font-black text-sm px-2.5 py-0.5 rounded bg-white text-zinc-950">
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
                          ? 'bg-white text-zinc-950 shadow-md scale-105 border border-white'
                          : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Quick Assessment Chips */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-300">
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
                            ? 'bg-zinc-200 text-zinc-950 border border-white font-bold'
                            : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
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
                <label className="block text-xs font-bold text-zinc-300">
                  What Stood Out in Candidate's Approach *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Review candidate's approach, core strengths, problem-solving depth..."
                  value={whatStoodOut}
                  onChange={e => setWhatStoodOut(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              {/* 5. Structured Field: Constructive CV Tips & Suggestions */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-300">
                  Constructive CV Tips & Improvement Suggestions {decisionType === 'feedback_only' ? '*' : '(Optional)'}
                </label>
                <textarea
                  rows={2}
                  required={decisionType === 'feedback_only'}
                  placeholder="Drop tips to improve this specific CV (e.g., metric proof points, system design details, formatting)..."
                  value={tipsAndSuggestions}
                  onChange={e => setTipsAndSuggestions(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              {/* Submit Review Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
              >
                {submittedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Decision Recorded & Student Notified Privately!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-zinc-950" />
                    <span>
                      {decisionType === 'accepted' ? 'Accept and Proceed (Private Notice)' : 'Submit CV Score & Feedback Tips'}
                    </span>
                  </>
                )}
              </button>

            </form>

            <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[10px] text-zinc-400 leading-snug">
              <span className="font-bold text-zinc-300 block mb-0.5">🔒 Private Notification Policy:</span>
              Decisions and feedback are delivered directly to the candidate via their private portal and direct dialog to prevent unhealthy competition.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
