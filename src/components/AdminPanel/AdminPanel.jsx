import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AccessTransferModal } from './AccessTransferModal';
import {
  ShieldCheck,
  Ticket,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Key,
  PhoneCall,
  MessageSquare,
  Download,
  Upload,
  Database,
  RefreshCw,
  Trash2
} from 'lucide-react';

export const AdminPanel = () => {
  const {
    applications,
    referralRequests,
    adminUsers,
    opportunities,
    deleteOpportunity,
    updateApplicationStatus,
    isAccessTransferOpen,
    setIsAccessTransferOpen,
    setActiveChatThreadId,
    setIsChatOpen,
    chatThreads,
    exportDatabaseBackup,
    importDatabaseBackup
  } = useApp();

  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' | 'requests' | 'drives' | 'team'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [backupRestoreStatus, setBackupRestoreStatus] = useState('');

  const totalTickets = applications.length + referralRequests.length;
  const pendingCount = applications.filter(a => a.status === 'Pending Review' || a.status === 'Notified ALUM').length;
  const acceptedCount = applications.filter(a => a.status === 'Accepted').length;

  const filteredApps = applications.filter(app => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenChat = (appId) => {
    const thread = chatThreads.find(t => t.ticketId === appId);
    if (thread) {
      setActiveChatThreadId(thread.id);
    }
    setIsChatOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const ok = importDatabaseBackup(event.target.result);
      if (ok) {
        setBackupRestoreStatus('Database successfully restored from JSON backup!');
      } else {
        setBackupRestoreStatus('Invalid backup file format.');
      }
      setTimeout(() => setBackupRestoreStatus(''), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      
      {/* Admin Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 p-8 border border-slate-800 text-white shadow-2xl">
        <div className="absolute right-0 top-0 -mr-10 -mt-10 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold font-mono">
              <ShieldCheck className="w-3.5 h-3.5" /> Master Placement Cell Panel
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Dome Referral Master Ticket View
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
              Global oversight across all active student application tickets, alumni responses, custom referral submissions, and administrative privilege management.
            </p>
          </div>

          {/* Database Backup & Access Transfer Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={exportDatabaseBackup}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Backup JSON</span>
            </button>

            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-sm cursor-pointer transition-all">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Restore Backup</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={() => setIsAccessTransferOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              <Key className="w-4 h-4" />
              <span>Transfer Admin Access</span>
            </button>
          </div>
        </div>
      </div>

      {backupRestoreStatus && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold text-center">
          {backupRestoreStatus}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Master Tickets</span>
            <span className="block text-2xl font-black text-slate-900 dark:text-white mt-1">{totalTickets}</span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <Ticket className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pending ALUM Reviews</span>
            <span className="block text-2xl font-black text-amber-500 mt-1">{pendingCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Successful Referrals</span>
            <span className="block text-2xl font-black text-emerald-500 mt-1">{acceptedCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Custom POC Submissions</span>
            <span className="block text-2xl font-black text-indigo-400 mt-1">{referralRequests.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <PhoneCall className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tickets'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            Master Application Tickets ({applications.length})
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'requests'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            POC Requests ({referralRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('drives')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'drives'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            Manage Drives ({opportunities.length})
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'team'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Admin Privileges ({adminUsers.length})
          </button>
        </div>

        {activeTab === 'tickets' && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search ticket..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tab 1: Master Application Tickets Table */}
      {activeTab === 'tickets' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Ticket ID</th>
                  <th className="p-4">Student & Roll</th>
                  <th className="p-4">Target Company & Role</th>
                  <th className="p-4">ALUM POC Score</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredApps.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {app.id}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">{app.studentName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{app.studentRoll} • CPA {app.studentCpa}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-slate-200">{app.company}</div>
                      <div className="text-slate-500">{app.jobTitle}</div>
                    </td>
                    <td className="p-4">
                      {app.scoreOutOf10 ? (
                        <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {app.scoreOutOf10} / 10
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">Unrated</span>
                      )}
                    </td>
                    <td className="p-4">
                      <select
                        value={app.status}
                        onChange={e => updateApplicationStatus(app.id, e.target.value)}
                        className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Notified ALUM">Notified ALUM</option>
                        <option value="Accepted">Accepted / Referred</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenChat(app.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/40 text-xs font-bold transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Chat Thread</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Custom POC Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {referralRequests.map(req => (
            <div
              key={req.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                    Ticket #{req.id} • Submitted by {req.studentName} ({req.studentRoll})
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    Target: {req.targetCompany} — {req.targetRole}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 self-start sm:self-auto">
                  {req.status}
                </span>
              </div>

              {req.externalPocName && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                      Submitted External POC Contact:
                    </span>
                    <strong className="text-slate-900 dark:text-white text-sm">{req.externalPocName}</strong>
                    <p className="text-slate-500">{req.externalPocDesignation}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                      {req.externalPocPhone}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Drive Management */}
      {activeTab === 'drives' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map(opp => (
            <div
              key={opp.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm flex items-start justify-between gap-4"
            >
              <div>
                <span className="text-xs font-bold text-cyan-500 uppercase">{opp.company}</span>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{opp.title}</h4>
                <p className="text-xs text-slate-500 mt-1">POC: {opp.alumName} • Salary: {opp.salary}</p>
              </div>
              <button
                onClick={() => deleteOpportunity(opp.id)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10"
                title="Delete Drive"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Admin Privilege Roster */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {adminUsers.map(usr => (
            <div
              key={usr.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {usr.status}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{usr.name}</h4>
                <p className="text-xs text-slate-500">{usr.role}</p>
                <p className="text-[11px] font-mono text-slate-400 mt-1">{usr.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAccessTransferOpen && <AccessTransferModal onClose={() => setIsAccessTransferOpen(false)} />}

    </div>
  );
};
