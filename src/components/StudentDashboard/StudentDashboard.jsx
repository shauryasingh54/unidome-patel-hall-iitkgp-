import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentHomePage } from './StudentHomePage';
import { StudentReviewPage } from './StudentReviewPage';
import { StudentResumesStudio } from './StudentResumesStudio';
import { ApplyModal } from './ApplyModal';
import {
  Compass,
  CheckCircle2,
  FileText,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const StudentDashboard = () => {
  const {
    selectedOpportunityForApply,
    setSelectedOpportunityForApply,
    applications,
    opportunities,
    studentResumes
  } = useApp();

  // 3 Primary Student Pages
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'reviews', 'resumes'

  const evaluatedCount = applications.filter(a => a.status !== 'Pending Review').length;

  return (
    <div className="space-y-8">
      
      {/* 1. Clean Minimal Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-bold block mb-1">
            Student Placement & Referral Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Explore Opportunities & Resumes
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-lg">
            Review live openings posted by alumni, submit your best-fit CV in 1-click, and track private review feedback.
          </p>
        </div>

        {/* Profile Pill */}
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs self-start sm:self-auto">
          <div className="h-7 w-7 rounded-lg bg-zinc-800 text-white flex items-center justify-center font-bold text-xs border border-zinc-700">
            SG
          </div>
          <div>
            <div className="font-bold text-white leading-none">Sanya Gupta</div>
            <span className="text-[10px] text-zinc-400 font-mono leading-none">Class of '25 • CPA 9.2</span>
          </div>
        </div>
      </div>

      {/* 2. Modern Segmented Tab Navigation Bar */}
      <div className="flex items-center justify-start border-b border-zinc-800/80 pb-px gap-6 overflow-x-auto text-xs font-bold">
        
        {/* Tab 1: Home & Drives */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-2 pb-3 transition-all cursor-pointer border-b-2 whitespace-nowrap ${
            activeTab === 'home'
              ? 'text-white border-white font-extrabold'
              : 'text-zinc-500 border-transparent hover:text-zinc-300'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Openings & Events ({opportunities.length})</span>
        </button>

        {/* Tab 2: Review & Assessment */}
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 pb-3 transition-all cursor-pointer border-b-2 whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'text-white border-white font-extrabold'
              : 'text-zinc-500 border-transparent hover:text-zinc-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Review & Assessment ({applications.length})</span>
          {evaluatedCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
              {evaluatedCount}
            </span>
          )}
        </button>

        {/* Tab 3: Uploading & Editing (4 Resumes) */}
        <button
          onClick={() => setActiveTab('resumes')}
          className={`flex items-center gap-2 pb-3 transition-all cursor-pointer border-b-2 whitespace-nowrap ${
            activeTab === 'resumes'
              ? 'text-white border-white font-extrabold'
              : 'text-zinc-500 border-transparent hover:text-zinc-300'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>4-Resume Studio</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
            {studentResumes.length}/4
          </span>
        </button>

      </div>

      {/* 3. Page Sub-views */}
      <div className="pt-1">
        {activeTab === 'home' && <StudentHomePage />}
        {activeTab === 'reviews' && <StudentReviewPage />}
        {activeTab === 'resumes' && <StudentResumesStudio />}
      </div>

      {/* 4. 1-Click Apply Modal */}
      {selectedOpportunityForApply && (
        <ApplyModal
          opportunity={selectedOpportunityForApply}
          onClose={() => setSelectedOpportunityForApply(null)}
        />
      )}

    </div>
  );
};
