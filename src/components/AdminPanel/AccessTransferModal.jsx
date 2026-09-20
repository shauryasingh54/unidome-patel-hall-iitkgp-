import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, CheckCircle2, UserCheck, Key, ShieldCheck } from 'lucide-react';

export const AccessTransferModal = ({ onClose }) => {
  const { adminUsers, transferAdminAccess } = useApp();
  const [selectedUserId, setSelectedUserId] = useState(adminUsers[1]?.id || '');
  const [roleScope, setRoleScope] = useState('Full Administrative Access');
  const [confirmed, setConfirmed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!confirmed) return;

    transferAdminAccess(selectedUserId, roleScope);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  const selectedUser = adminUsers.find(u => u.id === selectedUserId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="h-14 w-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Admin Access Transferred!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Primary administrative ownership has been granted to <strong className="text-cyan-500">{selectedUser?.name}</strong>.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Transfer Admin Privileges
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Re-assign primary dome management permissions to a team member.
                </p>
              </div>
            </div>

            <form onSubmit={handleTransfer} className="space-y-4">
              
              {/* Select Team Member */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Designated Team Member *
                </label>
                <select
                  value={selectedUserId}
                  onChange={e => setSelectedUserId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                >
                  {adminUsers.map(usr => (
                    <option key={usr.id} value={usr.id}>
                      {usr.name} — {usr.role} ({usr.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Scope */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Access Level Scope
                </label>
                <select
                  value={roleScope}
                  onChange={e => setRoleScope(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Full Administrative Access">Full Administrative Access (Master Ticket Control)</option>
                  <option value="Alumni Outreach Lead">Alumni Outreach Lead (POC Verification Only)</option>
                  <option value="Read-Only Placement Auditor">Read-Only Placement Auditor</option>
                </select>
              </div>

              {/* Confirmation Checkbox */}
              <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="confirmCheck"
                    checked={confirmed}
                    onChange={e => setConfirmed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <label htmlFor="confirmCheck" className="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                    I confirm transferring administrative access to <strong>{selectedUser?.name || 'selected user'}</strong>.
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!confirmed}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md shadow-amber-500/20 disabled:opacity-40 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transfer Access</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
