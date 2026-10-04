import React from 'react';
import { useApp } from '../../context/AppContext';

export const AdminRequests = () => {
  const { referralRequests } = useApp();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
        Custom POC Requests
      </h1>

      <div className="space-y-4">
        {referralRequests.length === 0 ? (
          <div className="surface-card-soft p-8 text-center text-sm text-muted">
            No custom referral requests submitted yet.
          </div>
        ) : (
          referralRequests.map(req => (
            <div key={req.id} className="surface-card p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b divider">
                <div>
                  <span className="text-mono-meta uppercase tracking-wide">
                    Ticket #{req.id} • Submitted by {req.studentName} ({req.studentRoll})
                  </span>
                  <h3 className="text-lg font-bold text-heading mt-0.5">
                    Target: {req.targetCompany} — {req.targetRole}
                  </h3>
                </div>
                <span className="pill-warning self-start sm:self-auto">{req.status}</span>
              </div>

              {req.externalPocName && (
                <div className="surface-sunken flex flex-wrap items-center justify-between gap-4 p-4 text-sm">
                  <div>
                    <span className="text-mono-meta uppercase font-bold block">Submitted External POC Contact:</span>
                    <strong className="text-heading text-base">{req.externalPocName}</strong>
                    <p className="text-muted">{req.externalPocDesignation}</p>
                  </div>
                  <span className="font-mono text-maroon-700 dark:text-peach-300 font-bold">{req.externalPocPhone}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
