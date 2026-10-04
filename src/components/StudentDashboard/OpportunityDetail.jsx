import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Building2,
  MapPin,
  UserCheck,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const OpportunityDetail = () => {
  const { opportunityId } = useParams();
  const navigate = useNavigate();
  const { opportunities, studentResumes, currentUser, submitApplication, applications } = useApp();

  const opportunity = opportunities.find(o => o.id === opportunityId);

  const [selectedResumeId, setSelectedResumeId] = useState(studentResumes[0]?.id || 'cv-1');
  const [pitchNote, setPitchNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!opportunity) {
    return (
      <div className="surface-card-soft p-10 text-center space-y-3">
        <p className="text-sm text-muted">This opportunity isn't available anymore.</p>
        <Link to="/student/openings" className="btn-secondary inline-flex">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Openings
        </Link>
      </div>
    );
  }

  const alreadyApplied = applications.some(a => a.opportunityId === opportunity.id && a.studentName === currentUser?.name);
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
      setTimeout(() => navigate('/student/applications'), 1400);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">

      <Link to="/student/openings" className="btn-ghost -ml-3 px-3 py-1.5 text-xs inline-flex">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Openings
      </Link>

      {/* Posting header */}
      <div className="surface-card p-7 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-mono-meta uppercase tracking-wide">{opportunity.company} • {opportunity.type}</span>
            <h1 className="text-2xl font-black text-heading mt-1">{opportunity.title}</h1>
          </div>
          <span className={opportunity.status === 'Active' ? 'pill-success shrink-0' : 'pill-neutral shrink-0'}>
            {opportunity.status}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-sm text-muted">
          <span className="font-mono font-bold text-maroon-700 dark:text-peach-200">{opportunity.salary}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {opportunity.location}</span>
          <span>•</span>
          <span>{opportunity.applicantsCount || 0} applicants</span>
        </div>

        <p className="text-sm text-heading leading-relaxed">{opportunity.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {opportunity.batchEligibility && <span className="pill-brand">{opportunity.batchEligibility}</span>}
          {opportunity.tags?.map(tag => <span key={tag} className="pill-neutral">{tag}</span>)}
        </div>

        <div className="surface-sunken p-3.5 flex items-center gap-3">
          <img src={opportunity.alumAvatar} alt={opportunity.alumName} className="h-10 w-10 rounded-full object-cover avatar-ring" />
          <div className="text-sm">
            <span className="text-muted">Alumni Reviewer: </span>
            <strong className="text-heading">{opportunity.alumName}</strong>
            <span className="text-muted"> ({opportunity.alumBatch}) — {opportunity.alumProfile}</span>
          </div>
        </div>
      </div>

      {/* Apply section */}
      <div className="surface-card p-7 space-y-5">
        {alreadyApplied ? (
          <div className="text-center py-6 space-y-3">
            <div className="h-14 w-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-heading">You've already applied to this opportunity</h3>
            <Link to="/student/applications" className="btn-secondary inline-flex">Track Status</Link>
          </div>
        ) : submittedSuccess ? (
          <div className="text-center py-6 space-y-3">
            <div className="h-14 w-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-heading">Application & CV Submitted!</h3>
            <p className="text-sm text-muted">Redirecting to your applications...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-extrabold text-heading">Apply with Your CV</h2>

            <div className="space-y-2">
              <label className="text-xs font-bold text-heading block">Select 1 of Your 4 Configured Resumes</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {studentResumes.map(resume => {
                  const isSelected = selectedResumeId === resume.id;
                  return (
                    <div
                      key={resume.id}
                      onClick={() => setSelectedResumeId(resume.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-maroon-50 dark:bg-maroon-900/30 border-maroon-400 shadow-sm'
                          : 'bg-peach-50 dark:bg-sand-900 border-sand-200 dark:border-sand-700 hover:border-maroon-200 dark:hover:border-maroon-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="pill-neutral px-1.5 py-0.2 text-[9px]">Slot #{resume.slotNumber}</span>
                        <span className={`text-[9px] font-mono font-bold ${isSelected ? 'text-maroon-700 dark:text-peach-200' : 'text-sand-600'}`}>
                          {resume.badge}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold line-clamp-1 text-heading">{resume.title}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted font-mono mt-1 pt-1.5 border-t divider">
                        <FileText className="w-3 h-3" />
                        <span className="truncate max-w-[140px]">{resume.fileName}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="input-label">Why you believe you'll be a great pick for this role *</label>
              <textarea
                rows={3}
                required
                value={pitchNote}
                onChange={e => setPitchNote(e.target.value)}
                placeholder="Explain your approach, project alignment with the posting, why your selected CV is the best fit..."
                className="input-field"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-muted">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>
                Submitted with verified profile: <strong className="text-heading">{currentUser?.name} ({currentUser?.rollNumber} • CPA {currentUser?.cpa})</strong>
              </span>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3">
              {isSubmitting ? <span>Submitting Application...</span> : <span>1-Click Submit Selected CV</span>}
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
