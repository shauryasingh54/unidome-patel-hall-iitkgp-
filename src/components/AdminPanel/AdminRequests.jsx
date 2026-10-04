import React from 'react';
import { useApp } from '../../context/AppContext';

const STATUSES = ['Pending Admin Verification', 'Verified & Ticket Raised', 'Declined'];

export const AdminRequests = () => {
  const { referralRequests, updateReferralStatus } = useApp();

  return (
    <div className="space-y-5">
      <h1 className="display text-3xl sm:text-4xl text-maroon-900 dark:text-peach-50">
        Custom POC requests
      </h1>

      {referralRequests.length === 0 ? (
        <div className="surface-card-soft p-8 text-center text-sm text-muted">
          No custom referral requests yet.
        </div>
      ) : (
        <div className="border-t divider">
          {referralRequests.map(req => (
            <div key={req.id} className="ruled-row flex-col sm:flex-row sm:items-start px-1">
              <div className="flex-1 min-w-0 space-y-1.5">
                <span className="text-mono-meta uppercase tracking-wide">
                  {req.id} · {req.studentName} ({req.studentRoll}) · {req.submittedAt}
                </span>
                <h3 className="font-bold text-base text-heading">
                  {req.targetCompany} — {req.targetRole}
                </h3>
                {req.jobUrl && (
                  <a href={req.jobUrl} target="_blank" rel="noreferrer" className="text-xs text-maroon-700 dark:text-peach-200 hover:underline break-all">
                    {req.jobUrl}
                  </a>
                )}
                {req.externalPocName && (
                  <p className="text-sm text-muted">
                    External POC: <strong className="text-heading">{req.externalPocName}</strong>
                    {req.externalPocDesignation && <> · {req.externalPocDesignation}</>}
                    {req.externalPocPhone && <> · <span className="font-mono">{req.externalPocPhone}</span></>}
                  </p>
                )}
                {req.notes && <p className="text-sm text-muted italic">"{req.notes}"</p>}
              </div>

              <select
                value={req.status}
                onChange={e => updateReferralStatus(req.id, e.target.value)}
                className="input-field w-auto py-1.5 text-xs font-semibold shrink-0"
              >
                {STATUSES.includes(req.status) ? null : <option value={req.status}>{req.status}</option>}
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
