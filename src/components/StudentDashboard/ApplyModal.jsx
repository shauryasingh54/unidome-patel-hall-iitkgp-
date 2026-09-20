import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  FileText,
  CheckCircle2,
  Building2,
  UserCheck,
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ApplyModal = ({ opportunity, onClose }) => {
  const { submitApplication, studentResumes } = useApp();
  const [selectedResumeId, setSelectedResumeId] = useState(studentResumes[0]?.id || 'cv-1');
  const [pitchNote, setPitchNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!opportunity) return null;

  const chosenResume = studentResumes.find(r => r.id === selectedResumeId) || studentResumes[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitApplication({
        opportunityId: opportunity.id,
        selectedResumeId,
        pitchNote
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      setTimeout(() => {
        onClose();
      }, 1400);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-zinc-800 bg-[#0c0c0e] text-zinc-100 shadow-2xl p-6 sm:p-7 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-zinc-800 text-white flex items-center justify-center border border-zinc-700">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Application & CV Submitted!
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Your resume <strong className="text-white">"{chosenResume?.title}"</strong> and custom pitch note have been routed directly to <strong className="text-white">{opportunity.alumName}</strong> ({opportunity.company}).
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-zinc-800 text-white border border-zinc-700">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-white">
                    Apply for {opportunity.company}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Target Role: <strong className="text-zinc-200">{opportunity.title}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-zinc-300 shrink-0" />
                  <span className="text-zinc-400">
                    Alumni Reviewer: <strong className="text-white">{opportunity.alumName}</strong> ({opportunity.alumBatch})
                  </span>
                </div>
                <span className="font-mono text-zinc-300 font-bold">{opportunity.salary}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* 1. Choose which of the 4 Resumes to Submit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-zinc-300">
                    Select 1 of Your 4 Configured Resumes:
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Pick the CV best aligned with this opening
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {studentResumes.map(resume => {
                    const isSelected = selectedResumeId === resume.id;
                    return (
                      <div
                        key={resume.id}
                        onClick={() => setSelectedResumeId(resume.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-zinc-800 text-white border-white shadow-sm'
                            : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-zinc-900 text-zinc-300 border border-zinc-700">
                            Slot #{resume.slotNumber}
                          </span>
                          <span className={`text-[9px] font-mono font-bold ${isSelected ? 'text-white' : 'text-zinc-500'}`}>
                            {resume.badge}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold line-clamp-1 text-white">
                          {resume.title}
                        </h4>

                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono mt-1 pt-1.5 border-t border-zinc-800/80">
                          <FileText className="w-3 h-3 text-zinc-400" />
                          <span className="truncate max-w-[140px]">{resume.fileName}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Short Pitch Note */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  Why you believe you'll be a great pick for this role *
                </label>
                <textarea
                  rows={3}
                  required
                  value={pitchNote}
                  onChange={e => setPitchNote(e.target.value)}
                  placeholder="Explain your approach, project alignment with the posting, why your selected CV is the best fit..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-medium"
                />
              </div>

              {/* Student Verified Profile Badge */}
              <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                <span>
                  Submitted with verified profile: <strong>Sanya Gupta (2021CSB1042 • CPA 9.2)</strong>
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-black shadow-md disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <span>1-Click Submit Selected CV</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
