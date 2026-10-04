import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, ChevronRight } from 'lucide-react';

export const StudentOpenings = () => {
  const { opportunities } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === 'All' || opp.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-5">

      <div>
        <h1 className="text-2xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
          Alumni Openings & Drives
        </h1>
        <p className="text-sm text-muted mt-1">
          {filteredOpps.length} opening{filteredOpps.length !== 1 ? 's' : ''} posted by verified Patel Hall alumni.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-sand-400" />
          <input
            type="text"
            placeholder="Search by role title, company, or skill tags..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-peach-100/70 dark:bg-sand-800/60 border border-sand-200/80 dark:border-sand-700 text-xs overflow-x-auto shrink-0">
          {['All', 'Full-time Job', 'Internship (6 Months)', 'Referral Spot'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === t
                  ? 'bg-maroon-700 text-peach-50 shadow-sm'
                  : 'text-sand-500 dark:text-sand-400 hover:text-maroon-700 dark:hover:text-peach-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Drives Grid — lean cards, click through to detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredOpps.map(opp => (
          <Link
            key={opp.id}
            to={`/student/openings/${opp.id}`}
            className="surface-card p-6 hover:border-maroon-200 dark:hover:border-maroon-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-mono-meta uppercase tracking-wide">
                    {opp.company} • {opp.type}
                  </span>
                  <h3 className="text-base font-extrabold text-heading mt-0.5">
                    {opp.title}
                  </h3>
                </div>
                <span className={opp.status === 'Active' ? 'pill-success shrink-0' : 'pill-neutral shrink-0'}>
                  {opp.status}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap text-xs text-muted">
                <span className="font-mono font-bold text-maroon-700 dark:text-peach-200">{opp.salary}</span>
                <span>•</span>
                <span>{opp.location}</span>
              </div>
            </div>

            <div className="pt-3 border-t divider flex items-center justify-between gap-3">
              <span className="text-mono-meta">{opp.applicantsCount || 0} applicants</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-maroon-700 dark:text-peach-200">
                View Details
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};
