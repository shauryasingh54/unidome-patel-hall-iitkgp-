import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MessageSquare } from 'lucide-react';

export const AdminTickets = () => {
  const { applications, updateApplicationStatus, setActiveChatThreadId, setIsChatOpen, chatThreads } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = applications.filter(app =>
    app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenChat = (appId) => {
    const thread = chatThreads.find(t => t.ticketId === appId);
    if (thread) setActiveChatThreadId(thread.id);
    setIsChatOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
          Master Application Tickets
        </h1>
        <div className="relative sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-sand-400" />
          <input
            type="text"
            placeholder="Search ticket..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-9 py-2"
          />
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-peach-50/80 dark:bg-sand-950/60 text-muted font-mono uppercase tracking-wider text-[11px] border-b divider">
              <tr>
                <th className="p-4">Ticket ID</th>
                <th className="p-4">Student & Roll</th>
                <th className="p-4">Target Company & Role</th>
                <th className="p-4">ALUM POC Score</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100 dark:divide-sand-800 font-medium">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-peach-50/60 dark:hover:bg-sand-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-maroon-700 dark:text-peach-300">{app.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-heading">{app.studentName}</div>
                    <div className="text-[11px] text-muted font-mono">{app.studentRoll} • CPA {app.studentCpa}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-heading">{app.company}</div>
                    <div className="text-muted text-xs">{app.jobTitle}</div>
                  </td>
                  <td className="p-4">
                    {app.scoreOutOf10 ? (
                      <span className="pill-success font-mono">{app.scoreOutOf10} / 10</span>
                    ) : (
                      <span className="text-[11px] text-sand-400 font-mono">Unrated</span>
                    )}
                  </td>
                  <td className="p-4">
                    <select
                      value={app.status}
                      onChange={e => updateApplicationStatus(app.id, e.target.value)}
                      className="input-field py-1.5 text-xs font-bold w-auto"
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Accepted and Proceeded">Accepted and Proceeded</option>
                      <option value="Feedback Provided">Feedback Provided</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleOpenChat(app.id)} className="btn-secondary px-3 py-1.5 text-xs">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat Thread</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
