import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, ArrowRight } from 'lucide-react';

const TYPES = ['All', 'Full-time Job', 'Internship (6 Months)', 'Referral Spot'];

export const StudentOpenings = () => {
  const { opportunities } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredOpps = opportunities.filter(opp => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      opp.title.toLowerCase().includes(q) ||
      opp.company.toLowerCase().includes(q) ||
      opp.tags?.some(t => t.toLowerCase().includes(q));
    const matchesType = typeFilter === 'All' || opp.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 reveal">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h1 className="display text-4xl sm:text-5xl text-maroon-900 dark:text-peach-50">
          Openings
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 md:w-[560px]">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-sand-600" />
            <input
              type="text"
              placeholder="Search role, company or skill"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="input-field sm:w-56">
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="border-t divider">
        {filteredOpps.length === 0 && (
          <p className="py-10 text-center text-sm text-muted">No openings match your search.</p>
        )}
        {filteredOpps.map(opp => (
          <Link key={opp.id} to={`/student/openings/${opp.id}`} className="ruled-row px-1 group">
            <div className="min-w-0">
              <span className="text-mono-meta uppercase tracking-wide">{opp.company} · {opp.type}</span>
              <h3 className="font-bold text-base text-heading group-hover:text-maroon-700 dark:group-hover:text-peach-200 transition-colors">
                {opp.title}
              </h3>
            </div>
            <div className="hidden md:block text-right text-sm shrink-0">
              <div className="font-mono font-semibold text-maroon-700 dark:text-peach-200">{opp.salary}</div>
              <div className="text-muted text-xs mt-0.5">{opp.location}</div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className={opp.status === 'Active' ? 'pill-success' : 'pill-neutral'}>{opp.status}</span>
              <ArrowRight className="w-4 h-4 text-sand-600 group-hover:text-maroon-700 transition-colors" />
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};
