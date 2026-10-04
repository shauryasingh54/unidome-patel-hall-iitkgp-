import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlumniReviewModal } from './AlumniReviewModal';
import {
  FileText,
  Search,
  CheckCircle2,
  Eye,
  MessageSquare,
  Lock
} from 'lucide-react';

export const AlumniQueue = () => {
  const {
    applications,
    opportunities,
    selectedReviewApp,
    setSelectedReviewApp,
    setActiveChatThreadId,
    setIsChatOpen,
    chatThreads
  } = useApp();

  const [cvSearch, setCvSearch] = useState('');
  const [cvFilterStatus, setCvFilterStatus] = useState('All');
  const [selectedOpportunityFilter, setSelectedOpportunityFilter] = useState('All');

  const handleOpenChat = (appId) => {
    const thread = chatThreads.find(t => t.ticketId === appId);
    if (thread) setActiveChatThreadId(thread.id);
    setIsChatOpen(true);
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(cvSearch.toLowerCase()) ||
      app.studentRoll.toLowerCase().includes(cvSearch.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(cvSearch.toLowerCase()) ||
      app.company.toLowerCase().includes(cvSearch.toLowerCase());

    const matchesOpp = selectedOpportunityFilter === 'All' || app.opportunityId === selectedOpportunityFilter;

    let matchesStatus = true;
    if (cvFilterStatus === 'Pending Review') matchesStatus = app.status === 'Pending Review';
    if (cvFilterStatus === 'Accepted and Proceeded') matchesStatus = app.status === 'Accepted and Proceeded';
    if (cvFilterStatus === 'Feedback Provided') matchesStatus = app.status === 'Feedback Provided';

    return matchesSearch && matchesOpp && matchesStatus;
  });

  const pendingCount = applications.filter(a => a.status === 'Pending Review').length;
  const acceptedCount = applications.filter(a => a.status === 'Accepted and Proceeded').length;
  const feedbackCount = applications.filter(a => a.status === 'Feedback Provided').length;

  return (
    <div className="space-y-5">

      <div>
        <h1 className="text-2xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
          Student Proposals & CV Review Queue
        </h1>
        <p className="text-sm text-muted mt-1">
          {pendingCount} Pending • {acceptedCount} Proceeded • {feedbackCount} Feedback Provided
        </p>
      </div>

      {/* Status Pills */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-peach-100/70 dark:bg-sand-800/60 border border-sand-200/80 dark:border-sand-700 text-xs overflow-x-auto w-fit">
        {[
          { id: 'All', label: 'All' },
          { id: 'Pending Review', label: 'Pending' },
          { id: 'Accepted and Proceeded', label: 'Proceeded' },
          { id: 'Feedback Provided', label: 'Feedback' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setCvFilterStatus(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              cvFilterStatus === tab.id
                ? 'bg-maroon-700 text-peach-50 shadow-sm'
                : 'text-sand-500 dark:text-sand-400 hover:text-maroon-700 dark:hover:text-peach-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar & Opportunity Filter Dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-sand-400" />
          <input
            type="text"
            placeholder="Search candidate, roll number, or role..."
            value={cvSearch}
            onChange={e => setCvSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedOpportunityFilter}
            onChange={e => setSelectedOpportunityFilter(e.target.value)}
            className="input-field"
          >
            <option value="All">All Postings ({opportunities.length})</option>
            {opportunities.map(opp => (
              <option key={opp.id} value={opp.id}>{opp.company} - {opp.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Candidate Queue Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredApps.length === 0 ? (
          <div className="lg:col-span-2 surface-card-soft p-8 text-center text-sm text-muted">
            No candidate applications match the selected filter criteria.
          </div>
        ) : (
          filteredApps.map(app => (
            <div key={app.id} className="surface-card p-5 hover:border-maroon-200 dark:hover:border-maroon-700 transition-all flex flex-col justify-between gap-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-maroon-700 text-peach-50 flex items-center justify-center font-black text-sm shrink-0">
                    {app.studentName.charAt(0)}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-sm text-heading">{app.studentName}</h3>
                      <span className="pill-neutral font-mono">{app.studentRoll}</span>
                    </div>
                    <p className="text-sm text-muted">
                      Applied for <strong className="text-heading">{app.jobTitle}</strong> ({app.company})
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1">
                  {app.status === 'Accepted and Proceeded' && (
                    <div className="pill-success text-[11px] px-2.5 py-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{app.scoreOutOf10}/10</span>
                    </div>
                  )}
                  {app.status === 'Feedback Provided' && (
                    <div className="pill-accent text-[11px] px-2.5 py-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{app.scoreOutOf10}/10</span>
                    </div>
                  )}
                  {app.status === 'Pending Review' && (
                    <span className="pill-warning text-[10px]">Pending Review</span>
                  )}
                  {app.privateNotificationSent && (
                    <span className="text-[9px] text-muted font-mono flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Notified
                    </span>
                  )}
                </div>
              </div>

              <div className="surface-sunken p-2.5 text-sm text-muted">
                <span className="text-mono-meta font-bold block mb-0.5">Approach & Overview:</span>
                <p className="italic line-clamp-2">"{app.note}"</p>
              </div>

              <div className="pt-3 border-t divider flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="font-medium text-heading truncate max-w-[140px]">{app.cvFileName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenChat(app.id)} className="btn-secondary p-1.5" title="Open Private Dialog">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedReviewApp(app)}
                    className={app.status !== 'Pending Review' ? 'btn-secondary px-3 py-1.5 text-xs' : 'btn-primary px-3 py-1.5 text-xs'}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{app.status === 'Pending Review' ? 'Review & Score' : 'Update Review'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedReviewApp && (
        <AlumniReviewModal application={selectedReviewApp} onClose={() => setSelectedReviewApp(null)} />
      )}

    </div>
  );
};
