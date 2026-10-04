import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AccessTransferModal } from './AccessTransferModal';
import {
  ShieldCheck,
  Ticket,
  Clock,
  CheckCircle2,
  PhoneCall,
  Download,
  Upload,
  Key,
  ArrowRight
} from 'lucide-react';

export const AdminOverview = () => {
  const {
    applications,
    referralRequests,
    opportunities,
    isAccessTransferOpen,
    setIsAccessTransferOpen,
    exportDatabaseBackup,
    importDatabaseBackup
  } = useApp();

  const [backupRestoreStatus, setBackupRestoreStatus] = useState('');

  const totalTickets = applications.length + referralRequests.length;
  const pendingCount = applications.filter(a => a.status === 'Pending Review').length;
  const acceptedCount = applications.filter(a => a.status === 'Accepted and Proceeded').length;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const ok = importDatabaseBackup(event.target.result);
      setBackupRestoreStatus(ok ? 'Database successfully restored from JSON backup!' : 'Invalid backup file format.');
      setTimeout(() => setBackupRestoreStatus(''), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">

      {/* Admin Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-maroon-800 via-maroon-900 to-maroon-950 p-8 text-peach-50 shadow-xl">
        <div className="absolute right-0 top-0 -mr-10 -mt-10 w-64 h-64 rounded-full bg-peach-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-peach-400/15 border border-peach-400/25 text-peach-200 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Global Oversight
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-2">
              Dome Referral Master Ticket View
            </h2>
            <p className="text-sm text-peach-200/80 max-w-xl mt-1.5 leading-relaxed">
              All active student tickets, alumni responses, custom referral submissions, and admin privilege management.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={exportDatabaseBackup}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-peach-50 font-bold text-xs border border-white/15 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Backup</span>
            </button>

            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-peach-50 font-bold text-xs border border-white/15 shadow-sm cursor-pointer transition-all">
              <Upload className="w-4 h-4" />
              <span>Restore Backup</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={() => setIsAccessTransferOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-peach-400 hover:bg-peach-300 text-maroon-950 font-extrabold text-xs shadow-lg transition-all cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span>Transfer Admin Access</span>
            </button>
          </div>
        </div>
      </div>

      {backupRestoreStatus && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold text-center dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300">
          {backupRestoreStatus}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/admin/tickets" className="surface-card p-5 flex items-center justify-between hover:border-maroon-200 dark:hover:border-maroon-700 transition-all">
          <div>
            <span className="text-xs text-muted font-medium">Total Master Tickets</span>
            <span className="block text-2xl font-black text-heading mt-1">{totalTickets}</span>
          </div>
          <div className="p-3 rounded-xl bg-maroon-50 dark:bg-maroon-900/30 text-maroon-700 dark:text-peach-200">
            <Ticket className="w-6 h-6" />
          </div>
        </Link>

        <Link to="/admin/tickets" className="surface-card p-5 flex items-center justify-between hover:border-maroon-200 dark:hover:border-maroon-700 transition-all">
          <div>
            <span className="text-xs text-muted font-medium">Pending ALUM Reviews</span>
            <span className="block text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{pendingCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
        </Link>

        <Link to="/admin/tickets" className="surface-card p-5 flex items-center justify-between hover:border-maroon-200 dark:hover:border-maroon-700 transition-all">
          <div>
            <span className="text-xs text-muted font-medium">Successful Referrals</span>
            <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{acceptedCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </Link>

        <Link to="/admin/requests" className="surface-card p-5 flex items-center justify-between hover:border-maroon-200 dark:hover:border-maroon-700 transition-all">
          <div>
            <span className="text-xs text-muted font-medium">Custom POC Submissions</span>
            <span className="block text-2xl font-black text-maroon-700 dark:text-peach-300 mt-1">{referralRequests.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-peach-100 dark:bg-peach-900/30 text-peach-700 dark:text-peach-300">
            <PhoneCall className="w-6 h-6" />
          </div>
        </Link>
      </div>

      <Link to="/admin/drives" className="surface-card p-5 flex items-center justify-between hover:border-maroon-200 dark:hover:border-maroon-700 transition-all">
        <div>
          <h3 className="font-bold text-heading text-sm">Manage Drives</h3>
          <p className="text-xs text-muted mt-0.5">{opportunities.length} opportunities currently posted across all alumni.</p>
        </div>
        <ArrowRight className="w-4 h-4 text-maroon-600 shrink-0" />
      </Link>

      {isAccessTransferOpen && <AccessTransferModal onClose={() => setIsAccessTransferOpen(false)} />}

    </div>
  );
};
