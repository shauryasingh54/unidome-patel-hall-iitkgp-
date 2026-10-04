import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  FileCheck2,
  Briefcase,
  Clock,
  CheckCircle2,
  ArrowRight,
  Plus
} from 'lucide-react';

export const AlumniOverview = () => {
  const { applications, opportunities, setIsPostOpportunityOpen } = useApp();

  const pendingCount = applications.filter(a => a.status === 'Pending Review').length;
  const acceptedCount = applications.filter(a => a.status === 'Accepted and Proceeded').length;
  const activePostings = opportunities.filter(o => o.status === 'Active').length;

  const stats = [
    { label: 'Pending Reviews', value: pendingCount, icon: Clock, to: '/alumni/queue' },
    { label: 'Accepted & Proceeded', value: acceptedCount, icon: CheckCircle2, to: '/alumni/queue' },
    { label: 'Active Postings', value: activePostings, icon: Briefcase, to: '/alumni/postings' },
    { label: 'Total Applications', value: applications.length, icon: FileCheck2, to: '/alumni/queue' }
  ];

  return (
    <div className="space-y-8">

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.to}
              className="surface-card p-5 flex items-center justify-between hover:border-maroon-200 dark:hover:border-maroon-700 transition-all"
            >
              <div>
                <span className="text-xs text-muted font-medium block">{stat.label}</span>
                <span className="block text-2xl font-black text-heading mt-1">{stat.value}</span>
              </div>
              <div className="p-3 rounded-xl bg-maroon-50 dark:bg-maroon-900/30 text-maroon-700 dark:text-peach-200 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Primary CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="surface-card p-7 flex flex-col justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-maroon-700 text-peach-50 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-heading">Review Student CVs</h2>
              <p className="text-sm text-muted mt-0.5">
                {pendingCount > 0 ? `${pendingCount} application${pendingCount !== 1 ? 's' : ''} awaiting your review.` : 'All caught up — nothing pending.'}
              </p>
            </div>
          </div>
          <Link to="/alumni/queue" className="btn-primary self-start">
            <span>Open Review Queue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="surface-card p-7 flex flex-col justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-peach-600 text-peach-50 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-heading">Manage Your Postings</h2>
              <p className="text-sm text-muted mt-0.5">{activePostings} active drive{activePostings !== 1 ? 's' : ''} open to students.</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Link to="/alumni/postings" className="btn-secondary">
              <span>My Postings</span>
            </Link>
            <button onClick={() => setIsPostOpportunityOpen(true)} className="btn-primary">
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Post New</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
