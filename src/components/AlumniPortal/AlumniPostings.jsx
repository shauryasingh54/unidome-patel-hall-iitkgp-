import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2 } from 'lucide-react';

export const AlumniPostings = () => {
  const { opportunities, toggleOpportunityStatus, deleteOpportunity, setIsPostOpportunityOpen } = useApp();
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = opportunities.filter(o => statusFilter === 'All' || o.status === statusFilter);

  return (
    <div className="space-y-5">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
            My Posted Postings & Drives
          </h1>
          <p className="text-sm text-muted mt-1">{opportunities.length} openings in UniDome</p>
        </div>

        <button onClick={() => setIsPostOpportunityOpen(true)} className="btn-primary self-start sm:self-auto">
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Post Opportunity</span>
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/45 backdrop-blur-xl dark:bg-white/5 border border-sand-200/80 dark:border-sand-700 text-xs w-fit">
        {['All', 'Active', 'Closed'].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              statusFilter === s
                ? 'bg-maroon-700 text-peach-50 shadow-sm'
                : 'text-sand-700 dark:text-sand-300 hover:text-maroon-700 dark:hover:text-peach-100'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(opp => (
          <div
            key={opp.id}
            className={`rounded-2xl border p-5 transition-all flex flex-col justify-between space-y-3 ${
              opp.status === 'Active'
                ? 'bg-white dark:bg-sand-900 border-sand-200/80 dark:border-sand-700/60 hover:border-maroon-200 dark:hover:border-maroon-700'
                : 'bg-peach-50/60 dark:bg-sand-950/40 border-sand-200/50 dark:border-sand-800 opacity-75'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-mono-meta uppercase tracking-wide">{opp.company} • {opp.type}</span>
                  <h3 className="font-extrabold text-sm text-heading mt-0.5">{opp.title}</h3>
                </div>
                <button
                  onClick={() => toggleOpportunityStatus(opp.id)}
                  className={opp.status === 'Active' ? 'pill-success font-mono' : 'pill-neutral font-mono'}
                  title="Click to toggle Active/Closed status"
                >
                  {opp.status}
                </button>
              </div>

              <p className="text-sm text-muted line-clamp-2 leading-relaxed">{opp.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {opp.tags?.map(tag => <span key={tag} className="pill-neutral">{tag}</span>)}
              </div>
            </div>

            <div className="pt-3 border-t divider flex items-center justify-between text-[11px] text-muted">
              <div className="flex items-center gap-3">
                <span className="font-mono text-maroon-700 dark:text-peach-200 font-semibold">{opp.salary}</span>
                <span>•</span>
                <span>{opp.applicantsCount || 0} applicants</span>
              </div>
              <button onClick={() => window.confirm('Delete this posting? Existing applications stay on record.') && deleteOpportunity(opp.id)} className="btn-danger-ghost p-1.5" title="Delete Posting">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
