import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MessageSquare } from 'lucide-react';

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
      return <span className="pill-accent">ALUM</span>;
    }
    if (role === 'Admin') {
      return <span className="pill-warning">Admin</span>;
    }
    return <span className="pill-brand">Student</span>;
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-sand-900 border-l border-sand-200 dark:border-sand-700 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 border-b divider bg-peach-50/60 dark:bg-sand-950/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-maroon-700 text-peach-50">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-heading">
              Application Chat Channel
            </h3>
            <p className="text-[11px] text-muted">
              Student • ALUM POC • Placement Cell
            </p>
          </div>
        </div>

        <button onClick={() => setIsChatOpen(false)} className="btn-ghost p-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Thread Switcher Dropdown */}
      <div className="p-3 border-b divider bg-peach-50/40 dark:bg-sand-950/30">
        <label className="input-label">
          Select Active Thread:
        </label>
        <select
          value={activeChatThreadId}
          onChange={e => setActiveChatThreadId(e.target.value)}
          className="input-field py-2"
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
                <span className="text-[10px] font-bold text-muted">
                  {msg.senderName}
                </span>
                {getRoleBadge(msg.senderRole)}
                <span className="text-[9px] text-sand-400 font-mono">{msg.time}</span>
              </div>

              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  isMe
                    ? 'bg-maroon-700 text-peach-50 rounded-br-none font-medium'
                    : 'bg-peach-100/70 dark:bg-sand-800 text-heading rounded-bl-none border border-sand-200/80 dark:border-sand-700'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Role Sender Toggle Simulator */}
      <div className="p-3 bg-peach-50/60 dark:bg-sand-950/40 border-t divider space-y-2">
        <div className="flex items-center justify-between text-[10px] text-muted font-mono">
          <span>Reply as role:</span>
          <div className="flex items-center gap-1">
            {['Student', 'Alumni', 'Admin'].map(r => (
              <button
                key={r}
                onClick={() => setSenderRole(r)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  senderRole === r
                    ? 'bg-maroon-700 text-peach-50 shadow-sm'
                    : 'bg-sand-100 dark:bg-sand-800 text-sand-500 dark:text-sand-400'
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
            className="input-field py-2.5"
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="btn-primary p-2.5 disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
