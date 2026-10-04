import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  CheckCircle2,
  Layers,
  ArrowRight,
  Sparkles,
  Clock,
  Flame
} from 'lucide-react';

export const StudentOverview = () => {
  const { opportunities, applications, studentResumes } = useApp();

  const activeOpenings = opportunities.filter(o => o.status === 'Active').length;
  const pendingCount = applications.filter(a => a.status === 'Pending Review').length;
  const evaluatedCount = applications.filter(a => a.status !== 'Pending Review').length;
  const mostRecentApp = applications[0];

  const stats = [
    { label: 'Active Openings', value: activeOpenings, icon: Compass, to: '/student/openings' },
    { label: 'Applications Submitted', value: applications.length, icon: CheckCircle2, to: '/student/applications' },
    { label: 'Pending Review', value: pendingCount, icon: Clock, to: '/student/applications' },
    { label: 'Resumes Configured', value: `${studentResumes.length}/4`, icon: Layers, to: '/student/resumes' }
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

      {/* Primary CTA */}
      <div className="surface-card p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-maroon-700 text-peach-50 flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-heading">Browse Alumni Openings</h2>
            <p className="text-sm text-muted mt-0.5">
              {activeOpenings} active drives posted by verified Patel Hall alumni right now.
            </p>
          </div>
        </div>
        <Link to="/student/openings" className="btn-primary shrink-0">
          <span>Browse Openings</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Continue where you left off */}
      {mostRecentApp && (
        <div className="surface-card-soft p-6 space-y-3">
          <div className="flex items-center gap-2 text-label">
            <Sparkles className="w-4 h-4" />
            <span>Continue Where You Left Off</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-heading text-sm">
                {mostRecentApp.jobTitle} at {mostRecentApp.company}
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {mostRecentApp.status === 'Pending Review'
                  ? 'Still awaiting alumni review.'
                  : `Reviewed by ${mostRecentApp.alumName} • Score ${mostRecentApp.scoreOutOf10}/10`}
              </p>
            </div>
            <Link to="/student/applications" className="btn-secondary shrink-0">
              <span>View Applications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Secondary links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/student/referral" className="surface-card p-5 flex items-center justify-between hover:border-maroon-200 dark:hover:border-maroon-700 transition-all">
          <div>
            <h3 className="font-bold text-heading text-sm">Need a Custom Referral?</h3>
            <p className="text-xs text-muted mt-0.5">Submit a target company or external POC for Admin to verify.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-maroon-600 shrink-0" />
        </Link>
        <Link to="/hall-life" className="surface-card p-5 flex items-center justify-between hover:border-maroon-200 dark:hover:border-maroon-700 transition-all">
          <div>
            <h3 className="font-bold text-heading text-sm flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" /> Hall Life</h3>
            <p className="text-xs text-muted mt-0.5">Events, traditions, and success stories from Patel Hall.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-maroon-600 shrink-0" />
        </Link>
      </div>

    </div>
  );
};
