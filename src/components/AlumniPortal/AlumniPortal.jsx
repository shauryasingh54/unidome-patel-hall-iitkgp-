import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSlider } from './HeroSlider';
import { AlumniReviewModal } from './AlumniReviewModal';
import { PostOpportunityModal } from './PostOpportunityModal';
import {
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare,
  Plus,
  Briefcase,
  Building2,
  Calendar,
  Users,
  Check,
  Clock,
  Trash2,
  ExternalLink,
  ChevronRight,
  Filter,
  Flame,
  Award,
  Lock,
  Sparkles
} from 'lucide-react';

export const AlumniPortal = () => {
  const {
    applications,
    opportunities,
    toggleOpportunityStatus,
    deleteOpportunity,
    selectedReviewApp,
    setSelectedReviewApp,
    isPostOpportunityOpen,
    setIsPostOpportunityOpen,
    setActiveChatThreadId,
    setIsChatOpen,
    chatThreads,
    currentUser
  } = useApp();

  // Search and status filter for CV queue
  const [cvSearch, setCvSearch] = useState('');
  const [cvFilterStatus, setCvFilterStatus] = useState('All'); // 'All', 'Pending Review', 'Accepted and Proceeded', 'Feedback Provided'
  const [selectedOpportunityFilter, setSelectedOpportunityFilter] = useState('All');

  const handleOpenChat = (appId) => {
    const thread = chatThreads.find(t => t.ticketId === appId);
    if (thread) {
      setActiveChatThreadId(thread.id);
    } else {
      // If thread not found, open chat
      setIsChatOpen(true);
      return;
    }
    setIsChatOpen(true);
  };

  // Filtered student applications
  const filteredApps = applications.filter(app => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(cvSearch.toLowerCase()) ||
      app.studentRoll.toLowerCase().includes(cvSearch.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(cvSearch.toLowerCase()) ||
      app.company.toLowerCase().includes(cvSearch.toLowerCase());

    const matchesOpp =
      selectedOpportunityFilter === 'All' || app.opportunityId === selectedOpportunityFilter;

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
    <div className="space-y-7 max-w-7xl mx-auto">
      
      {/* 1. Top Banner: Combined Promotional Hero Slider */}
      <HeroSlider />

      {/* 2. Main Workspace: Split 2-Column Action Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* ========================================================= */}
        {/* Column A: Student CV Review & Scoring Feed (7 cols)       */}
        {/* ========================================================= */}
        <section className="lg:col-span-7 space-y-4">
          
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#121214] border border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-zinc-800 flex items-center justify-center text-white border border-zinc-700">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-white tracking-tight">
                  Student Proposals & CV Review Queue
                </h2>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span>{pendingCount} Pending</span>
                  <span>•</span>
                  <span>{acceptedCount} Proceeded</span>
                  <span>•</span>
                  <span>{feedbackCount} Feedback Provided</span>
                </div>
              </div>
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs overflow-x-auto">
              {[
                { id: 'All', label: 'All' },
                { id: 'Pending Review', label: 'Pending' },
                { id: 'Accepted and Proceeded', label: 'Proceeded' },
                { id: 'Feedback Provided', label: 'Feedback' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCvFilterStatus(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    cvFilterStatus === tab.id
                      ? 'bg-white text-zinc-950 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar & Opportunity Filter Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            <div className="sm:col-span-8 relative">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search candidate, roll number, or role..."
                value={cvSearch}
                onChange={e => setCvSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-medium"
              />
            </div>

            <div className="sm:col-span-4">
              <select
                value={selectedOpportunityFilter}
                onChange={e => setSelectedOpportunityFilter(e.target.value)}
                className="w-full py-2 px-3 rounded-xl text-xs bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-600 font-medium"
              >
                <option value="All">All Postings ({opportunities.length})</option>
                {opportunities.map(opp => (
                  <option key={opp.id} value={opp.id}>
                    {opp.company} - {opp.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Candidate Queue Cards */}
          <div className="space-y-3.5">
            {filteredApps.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 text-zinc-400 text-xs">
                No candidate applications match the selected filter criteria.
              </div>
            ) : (
              filteredApps.map(app => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl border border-zinc-800/80 bg-[#121215] hover:border-zinc-700 transition-all flex flex-col justify-between gap-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    
                    {/* Candidate Info */}
                    <div className="flex items-start gap-3.5">
                      <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center font-black text-sm shrink-0">
                        {app.studentName.charAt(0)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-extrabold text-sm text-white">
                            {app.studentName}
                          </h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                            {app.studentRoll}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-900 text-zinc-200 border border-zinc-700">
                            CPA {app.studentCpa}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-300">
                          Applied for <strong className="text-white">{app.jobTitle}</strong> ({app.company})
                        </p>

                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/90 text-xs text-zinc-300">
                          <span className="text-[10px] font-mono text-zinc-400 font-bold block mb-0.5">Approach & Overview:</span>
                          <p className="italic text-zinc-300 line-clamp-2">"{app.note}"</p>
                        </div>
                      </div>
                    </div>

                    {/* Outcome Status Badge */}
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      {app.status === 'Accepted and Proceeded' && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 text-white font-mono text-[11px] font-bold border border-zinc-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-100" />
                          <span>Accepted & Proceeded • {app.scoreOutOf10}/10</span>
                        </div>
                      )}

                      {app.status === 'Feedback Provided' && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 font-mono text-[11px] font-medium border border-zinc-800">
                          <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Feedback Given • {app.scoreOutOf10}/10</span>
                        </div>
                      )}

                      {app.status === 'Pending Review' && (
                        <span className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-400 font-mono text-[10px] font-bold border border-zinc-800">
                          Pending Review
                        </span>
                      )}

                      {app.privateNotificationSent && (
                        <span className="text-[9px] text-zinc-500 font-mono flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Notified Privately
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CV File metadata & Quick Actions */}
                  <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <FileText className="w-3.5 h-3.5 text-zinc-300" />
                      <span className="font-medium text-zinc-300">{app.cvFileName}</span>
                      <span className="text-[10px] font-mono text-zinc-500">({app.cvFileSize})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Chat Trigger */}
                      <button
                        onClick={() => handleOpenChat(app.id)}
                        className="p-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
                        title="Open Private Dialog with Student"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>

                      {/* Review & Score Drawer Trigger */}
                      <button
                        onClick={() => setSelectedReviewApp(app)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          app.status !== 'Pending Review'
                            ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                            : 'bg-white hover:bg-zinc-200 text-zinc-950 shadow-sm font-black'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>
                          {app.status === 'Pending Review'
                            ? 'Review Approach & Score CV'
                            : 'Update Review & Score'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Structured Feedback & Tips Display if already evaluated */}
                  {app.status !== 'Pending Review' && (
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300 space-y-2">
                      {app.whatStoodOut && (
                        <div>
                          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">What Stood Out:</span>
                          <p className="italic text-zinc-300">"{app.whatStoodOut}"</p>
                        </div>
                      )}
                      {app.tipsAndSuggestions && (
                        <div className="pt-1 border-t border-zinc-900">
                          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Constructive CV Tips:</span>
                          <p className="text-zinc-400">"{app.tipsAndSuggestions}"</p>
                        </div>
                      )}
                      {app.feedbackShortcutsUsed?.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {app.feedbackShortcutsUsed.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))
            )}
          </div>

        </section>

        {/* ========================================================= */}
        {/* Column B: Opportunity Posting & Management (5 cols)       */}
        {/* ========================================================= */}
        <section className="lg:col-span-5 space-y-4">
          
          {/* Header & Post CTA */}
          <div className="p-4 rounded-2xl bg-[#121214] border border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-zinc-800 flex items-center justify-center text-white border border-zinc-700">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-white tracking-tight">
                  My Posted Postings & Drives
                </h2>
                <span className="text-[11px] text-zinc-400">
                  {opportunities.length} Openings in UniDome
                </span>
              </div>
            </div>

            {/* "+ Post Opportunity" Action */}
            <button
              onClick={() => setIsPostOpportunityOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Post Opportunity</span>
            </button>
          </div>

          {/* Opportunities List Cards */}
          <div className="space-y-3.5">
            {opportunities.map(opp => (
              <div
                key={opp.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  opp.status === 'Active'
                    ? 'bg-[#121215] border-zinc-800/80 hover:border-zinc-700'
                    : 'bg-zinc-950/60 border-zinc-900 opacity-75'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                        {opp.company} • {opp.type}
                      </span>
                      <h3 className="font-extrabold text-sm text-white mt-0.5">
                        {opp.title}
                      </h3>
                    </div>

                    {/* Active / Closed Toggle Switch */}
                    <button
                      onClick={() => toggleOpportunityStatus(opp.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                        opp.status === 'Active'
                          ? 'bg-zinc-800 text-white border-zinc-600'
                          : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                      }`}
                      title="Click to toggle Active/Closed status"
                    >
                      {opp.status === 'Active' ? 'Active' : 'Closed'}
                    </button>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Skills / Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {opp.tags?.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-900 text-zinc-300 border border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Filter link, Salary & Delete */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-zinc-300 font-semibold">{opp.salary}</span>
                    <span>•</span>
                    <button
                      onClick={() => setSelectedOpportunityFilter(opp.id)}
                      className="text-zinc-300 hover:text-white underline font-semibold cursor-pointer"
                    >
                      {opp.applicantsCount || 0} applicants
                    </button>
                  </div>

                  <button
                    onClick={() => deleteOpportunity(opp.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-zinc-900 transition-colors cursor-pointer"
                    title="Delete Posting"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </section>

      </div>

      {/* 3. Slide-Over / Pop-up Review & Scoring Modal */}
      {selectedReviewApp && (
        <AlumniReviewModal
          application={selectedReviewApp}
          onClose={() => setSelectedReviewApp(null)}
        />
      )}

      {/* 4. Post Opportunity Creation Modal */}
      {isPostOpportunityOpen && (
        <PostOpportunityModal
          onClose={() => setIsPostOpportunityOpen(false)}
        />
      )}

    </div>
  );
};
