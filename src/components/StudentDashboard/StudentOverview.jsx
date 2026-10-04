import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const StudentOverview = () => {
  const { opportunities, applications, studentResumes } = useApp();

  const activeOpenings = opportunities.filter(o => o.status === 'Active').length;
  const pendingCount = applications.filter(a => a.status === 'Pending Review').length;
  const mostRecentApp = applications[0];

  const stats = [
    { label: 'Active openings', value: activeOpenings, to: '/student/openings' },
    { label: 'Applied', value: applications.length, to: '/student/applications' },
    { label: 'Pending review', value: pendingCount, to: '/student/applications' },
    { label: 'Resumes ready', value: `${studentResumes.length}/4`, to: '/student/resumes' }
  ];

  return (
    <div className="space-y-10">

      <div className="grid grid-cols-2 lg:grid-cols-4 border-y divider reveal">
        {stats.map((stat, i) => (
          <Link
            key={stat.label}
            to={stat.to}
            className={`py-6 px-5 hover:bg-maroon-50/50 dark:hover:bg-sand-800/40 transition-colors ${i % 2 === 0 ? 'border-r' : ''} lg:border-r lg:last:border-r-0 divider`}
          >
            <span className="display text-4xl text-maroon-800 dark:text-peach-100 block">{stat.value}</span>
            <span className="text-xs text-muted font-medium mt-1 block">{stat.label}</span>
          </Link>
        ))}
      </div>

      <Link
        to="/student/openings"
        className="surface-band rounded-2xl px-7 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 group reveal reveal-2"
      >
        <div>
          <h2 className="display text-3xl text-peach-50">Browse alumni openings</h2>
          <p className="text-peach-200/80 mt-1.5 text-sm">{activeOpenings} active drives from verified Patel Hall alumni.</p>
        </div>
        <span className="inline-flex items-center gap-2 font-semibold text-peach-50 border-b-2 border-peach-300 pb-0.5 self-start sm:self-auto">
          Open openings <ArrowRight className="w-4 h-4" />
        </span>
      </Link>

      {mostRecentApp && (
        <div className="space-y-2 reveal reveal-3">
          <span className="text-label">Latest application</span>
          <div className="ruled-row border-t divider">
            <div>
              <h3 className="font-bold text-heading">{mostRecentApp.jobTitle} at {mostRecentApp.company}</h3>
              <p className="text-sm text-muted mt-0.5">
                {mostRecentApp.status === 'Pending Review'
                  ? 'Awaiting alumni review'
                  : `Reviewed by ${mostRecentApp.alumName} · ${mostRecentApp.scoreOutOf10}/10`}
              </p>
            </div>
            <Link to="/student/applications" className="text-sm font-semibold text-maroon-700 dark:text-peach-200 hover:underline shrink-0">
              View →
            </Link>
          </div>
        </div>
      )}

      <Link to="/student/referral" className="ruled-row border-y divider reveal reveal-4 rounded-none px-0">
        <div>
          <h3 className="font-bold text-heading">Need a custom referral?</h3>
          <p className="text-sm text-muted mt-0.5">Request a company or external POC for Admin to verify.</p>
        </div>
        <ArrowRight className="w-4 h-4 text-maroon-600 shrink-0" />
      </Link>

    </div>
  );
};
