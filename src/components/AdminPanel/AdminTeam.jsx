import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export const AdminTeam = () => {
  const { adminUsers } = useApp();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
        Admin Privileges
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {adminUsers.map(usr => (
          <div key={usr.id} className="surface-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-peach-100 dark:bg-peach-900/30 text-peach-700 dark:text-peach-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="pill-neutral">{usr.status}</span>
            </div>
            <div>
              <h4 className="font-bold text-base text-heading">{usr.name}</h4>
              <p className="text-sm text-muted">{usr.role}</p>
              <p className="text-[11px] font-mono text-sand-600 mt-1">{usr.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
