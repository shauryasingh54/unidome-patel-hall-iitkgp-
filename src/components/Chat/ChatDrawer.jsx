import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MessageSquare } from 'lucide-react';

// Seed data uses 'ALUM'; the app uses 'Alumni'. Normalize so ownership matches.
const roleKey = (r) => (r === 'ALUM' ? 'Alumni' : r);

const roleBadge = (role) => {
  const key = roleKey(role);
  if (key === 'Alumni') return <span className="pill-accent">Alumni</span>;
  if (key === 'Admin') return <span className="pill-warning">Admin</span>;
  return <span className="pill-brand">Student</span>;
};

export const ChatDrawer = () => {
  const {
    chatThreads,
    activeChatThreadId,
    setActiveChatThreadId,
    isChatOpen,
    setIsChatOpen,
    sendChatMessage,
    currentRole,
    currentUser
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const feedRef = useRef(null);

  const activeThread = chatThreads.find(t => t.id === activeChatThreadId) || chatThreads[0];
  const messageCount = activeThread?.messages.length || 0;

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [messageCount, activeThread?.id, isChatOpen]);

  if (!isChatOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeThread) return;
    sendChatMessage(activeThread.id, messageText.trim(), roleKey(currentRole), currentUser?.name || currentRole);
    setMessageText('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-white dark:bg-sand-900 border-l border-sand-200 dark:border-sand-700 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b divider">
        <div className="min-w-0">
          <h3 className="font-bold text-sm text-heading">Messages</h3>
          <p className="text-xs text-muted truncate">{activeThread?.title || 'No conversations yet'}</p>
        </div>
        <button onClick={() => setIsChatOpen(false)} className="btn-ghost p-2" title="Close">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 py-3 border-b divider">
        <select value={activeThread?.id || ''} onChange={e => setActiveChatThreadId(e.target.value)} className="input-field py-2 text-xs">
          {chatThreads.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <div ref={feedRef} className="flex-1 p-5 overflow-y-auto space-y-4">
        {messageCount === 0 && (
          <div className="text-center text-sm text-muted py-10 space-y-2">
            <MessageSquare className="w-6 h-6 mx-auto text-sand-600" />
            <p>No messages yet. Say hello to start the conversation.</p>
          </div>
        )}
        {activeThread?.messages.map(msg => {
          const isMe = roleKey(msg.senderRole) === roleKey(currentRole);
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[11px] font-semibold text-muted">{msg.senderName}</span>
                {roleBadge(msg.senderRole)}
                <span className="text-[10px] text-sand-600 font-mono">{msg.time}</span>
              </div>
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe
                    ? 'bg-maroon-700 text-peach-50 rounded-br-sm'
                    : 'bg-peach-100/70 dark:bg-sand-800 text-heading rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t divider flex items-center gap-2">
        <input
          type="text"
          placeholder="Write a message…"
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          className="input-field py-2.5"
          disabled={!activeThread}
        />
        <button type="submit" disabled={!messageText.trim() || !activeThread} className="btn-primary p-2.5" title="Send">
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
