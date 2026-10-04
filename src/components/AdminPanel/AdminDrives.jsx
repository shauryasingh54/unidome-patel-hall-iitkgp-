import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2 } from 'lucide-react';

export const AdminDrives = () => {
  const { opportunities, deleteOpportunity } = useApp();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
        Manage Drives
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opportunities.map(opp => (
          <div key={opp.id} className="surface-card p-5 flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-maroon-700 dark:text-peach-300 uppercase">{opp.company}</span>
              <h4 className="font-bold text-base text-heading">{opp.title}</h4>
              <p className="text-xs text-muted mt-1">POC: {opp.alumName} • Salary: {opp.salary}</p>
            </div>
            <button onClick={() => deleteOpportunity(opp.id)} className="btn-danger-ghost p-2" title="Delete Drive">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
