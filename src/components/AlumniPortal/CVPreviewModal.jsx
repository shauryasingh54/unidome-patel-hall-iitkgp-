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
  UserCheck,
  Star,
  Sparkles,
  Send,
  MessageSquare
} from 'lucide-react';

export const CVPreviewModal = ({ application, onClose, onAccept, onDecline }) => {
  const { submitAlumEvaluation } = useApp();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  // Rating & Feedback State
  const [score, setScore] = useState(application.scoreOutOf10 || 9.0);
  const [feedbackNotes, setFeedbackNotes] = useState(application.alumFeedbackNotes || '');
  const [selectedShortcuts, setSelectedShortcuts] = useState(application.feedbackShortcutsUsed || []);
  const [savedFeedbackSuccess, setSavedFeedbackSuccess] = useState(false);

  if (!application) return null;

  const toggleShortcut = (shortcut) => {
    if (selectedShortcuts.includes(shortcut)) {
      setSelectedShortcuts(prev => prev.filter(s => s !== shortcut));
    } else {
      setSelectedShortcuts(prev => [...prev, shortcut]);
    }
  };

  const handleSaveEvaluation = () => {
    submitAlumEvaluation({
      appId: application.id,
      scoreOutOf10: score,
      alumFeedbackNotes: feedbackNotes,
      selectedShortcuts
    });
    setSavedFeedbackSuccess(true);
    setTimeout(() => {
      setSavedFeedbackSuccess(false);
    }, 2000);
  };

  const handleDownload = () => {
    const dummyText = `ALUMNI REFERRAL PORTAL - APEX DOME
---------------------------------------------------
Candidate: ${application.studentName}
Roll Number: ${application.studentRoll}
Email: ${application.studentEmail}
Major: ${application.studentMajor}
CPA: ${application.studentCpa}

Applied Position: ${application.jobTitle} at ${application.company}
Alum Rating Score: ${score} / 10
Alum Feedback Notes: ${feedbackNotes}
Shortcuts: ${selectedShortcuts.join(', ')}
`;
    const blob = new Blob([dummyText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = application.cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  CV Preview & Alumni Evaluation • {application.cvFileName}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {application.cvFileSize}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Applicant: <strong className="text-slate-800 dark:text-slate-200">{application.studentName}</strong> ({application.studentRoll})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                className="p-1 text-slate-500 hover:text-cyan-500"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                className="p-1 text-slate-500 hover:text-cyan-500"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body Split View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Column: PDF Document Viewer Canvas */}
          <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-6 overflow-y-auto flex flex-col items-center justify-start">
            
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-2xl bg-white text-slate-900 shadow-2xl rounded-lg border border-slate-200 p-8 sm:p-12 space-y-6 transition-transform duration-200"
            >
              <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                    {application.studentName}
                  </h1>
                  <p className="text-xs text-slate-600 font-medium">
                    {application.studentMajor} • Roll: {application.studentRoll}
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    Email: {application.studentEmail} | Location: Dome Campus
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-[11px] font-bold text-slate-800">
                    CPA: {application.studentCpa}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-700 border-b border-slate-200 pb-1 mb-2">
                  Academic Highlights & Competencies
                </h2>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                  <li>Specializing in Systems Architecture & Human-Computer Interaction</li>
                  <li>Dean's Honor List for 6 consecutive semesters</li>
                  <li>Lead organizer of Apex Annual Hackathon (500+ participants)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-700 border-b border-slate-200 pb-1 mb-2">
                  Featured Projects
                </h2>
                <div className="space-y-2 text-xs text-slate-700">
                  <div>
                    <strong className="text-slate-900">1. UniDome Referral System Redesign</strong>
                    <p className="text-[11px] text-slate-600">Designed modular design system in Figma, implemented component states and accessible dark/light themes.</p>
                  </div>
                  <div>
                    <strong className="text-slate-900">2. Real-Time Distributed KV Engine</strong>
                    <p className="text-[11px] text-slate-600">Implemented Raft consensus algorithm in Go with 99.9% uptime test suite.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
                  Applicant Cover Note:
                </span>
                <p className="text-xs italic text-slate-700 leading-relaxed">
                  "{application.note}"
                </p>
              </div>

              <div className="pt-8 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>Verified via Apex Dome Placement Cell</span>
                <span>Page {currentPage} of {totalPages}</span>
              </div>
            </div>

            <div className="my-4 flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/80 text-white text-xs font-mono shadow-lg">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>Page {currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage(2)}
                disabled={currentPage === totalPages}
                className="p-1 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: ALUM 1-10 Candidate Scoring & Feedback Shortcuts */}
          <div className="w-full md:w-96 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between overflow-y-auto shrink-0 space-y-6">
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Candidate Evaluation Network
                </span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {application.studentName}
                </h4>
                <p className="text-xs text-slate-500">{application.jobTitle} ({application.company})</p>
              </div>

              {/* 1 to 10 Candidate Rating Selector */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Rate Candidate (1 to 10):</span>
                  <span className="font-mono font-black text-cyan-500 text-sm">{score} / 10</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                    <button
                      key={val}
                      onClick={() => setScore(val)}
                      className={`py-1.5 rounded-lg text-xs font-extrabold transition-all font-mono ${
                        score === val
                          ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20 scale-105'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Feedback Shortcut Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Quick Feedback Shortcuts:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {FEEDBACK_SHORTCUTS.map(sc => {
                    const isSelected = selectedShortcuts.includes(sc);
                    return (
                      <button
                        key={sc}
                        type="button"
                        onClick={() => toggleShortcut(sc)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40 font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 hover:border-slate-400'
                        }`}
                      >
                        {sc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Written Qualitative Feedback */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Written Feedback Notes:
                </label>
                <textarea
                  rows={3}
                  placeholder="Share feedback on code quality, design depth, or interview preparedness..."
                  value={feedbackNotes}
                  onChange={e => setFeedbackNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {/* Save Feedback Action */}
              <button
                onClick={handleSaveEvaluation}
                className="w-full py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs shadow-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{savedFeedbackSuccess ? 'Saved to Feedback Network!' : 'Save Score & Feedback'}</span>
              </button>
            </div>

            {/* Decision Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  handleSaveEvaluation();
                  onAccept(application.id);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Accept & Refer Candidate</span>
              </button>

              <button
                onClick={() => {
                  onDecline(application.id);
                  onClose();
                }}
                className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 font-bold text-xs transition-colors"
              >
                Decline Request
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
