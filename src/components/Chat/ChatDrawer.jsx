import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Send,
  MessageSquare,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const ChatDrawer = () => {
  const {
    chatThreads,
    activeChatThreadId,
    setActiveChatThreadId,
    isChatOpen,
    setIsChatOpen,
    sendChatMessage,
    currentRole
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const [senderRole, setSenderRole] = useState(currentRole); // Can switch sender role dynamically for testing

  if (!isChatOpen) return null;

  const activeThread = chatThreads.find(t => t.id === activeChatThreadId) || chatThreads[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeThread) return;

    let senderName = 'Sanya Gupta (Student)';
    if (senderRole === 'Alumni') senderName = 'Aarav Mehta (ALUM)';
    if (senderRole === 'Admin') senderName = 'Placement Cell Admin';

    sendChatMessage(activeThread.id, messageText.trim(), senderRole, senderName);
    setMessageText('');
  };

  const getRoleBadge = (role) => {
    if (role === 'ALUM' || role === 'Alumni') {
      return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">ALUM</span>;
    }
    if (role === 'Admin') {
      return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">Admin</span>;
    }
    return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">Student</span>;
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Application Chat Channel
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Student • ALUM POC • Placement Cell
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsChatOpen(false)}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Thread Switcher Dropdown */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/40">
        <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
          Select Active Thread:
        </label>
        <select
          value={activeChatThreadId}
          onChange={e => setActiveChatThreadId(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
        >
          {chatThreads.map(t => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {activeThread?.messages.map(msg => {
          const isMe = msg.senderRole === senderRole;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                  {msg.senderName}
                </span>
                {getRoleBadge(msg.senderRole)}
                <span className="text-[9px] text-slate-400 font-mono">{msg.time}</span>
              </div>

              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  isMe
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none font-medium'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Role Sender Toggle Simulator */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
          <span>Reply as role:</span>
          <div className="flex items-center gap-1">
            {['Student', 'Alumni', 'Admin'].map(r => (
              <button
                key={r}
                onClick={() => setSenderRole(r)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  senderRole === r
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`Type reply as ${senderRole}...`}
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 shadow-md shadow-cyan-500/20 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
