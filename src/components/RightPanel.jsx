import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  MoreVertical,
  Star,
  Send,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const RightPanel = () => {
  const {
    sendChatMessage,
    activeChatThreadId,
    setIsChatOpen,
    setSelectedCvApp,
    applications
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [starredIds, setStarredIds] = useState(['msg-1']);

  const messagesList = [
    {
      id: 'msg-1',
      name: 'Stephanie',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      online: true,
      text: 'I reviewed Priya\'s assignment. It was quite good 👏 Sending internal HR...',
      meta: '19 July • Stripe Talent',
      starred: true
    },
    {
      id: 'msg-2',
      name: 'David',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      online: false,
      text: 'Requesting project update for Alex Ri...',
      meta: '21 July'
    },
    {
      id: 'msg-3',
      name: 'William',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      online: false,
      text: 'Candidate David Chen cleared round...',
      meta: '17 July'
    },
    {
      id: 'msg-4',
      name: 'Alona',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      online: false,
      text: 'I am really impressed from your work...',
      meta: '18 July'
    },
    {
      id: 'msg-5',
      name: 'Hira (Self)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      online: true,
      text: 'Scored candidate 9/10. Referred dire...',
      meta: '21 July'
    },
    {
      id: 'msg-6',
      name: 'Ghulam',
      initials: 'G',
      online: false,
      text: 'Campus placement batch statistics ex...',
      meta: 'Yesterday'
    }
  ];

  const handleSendInstant = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendChatMessage(activeChatThreadId, messageInput.trim(), 'ALUM', 'Hira (Self)');
    setMessageInput('');
  };

  return (
    <aside className="w-80 lg:w-96 border-l border-zinc-800/80 bg-[#09090b] text-white p-5 flex flex-col justify-between shrink-0 overflow-y-auto hidden xl:flex select-none">
      
      <div className="space-y-4">
        {/* Header in Black & Grey */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-sm text-white tracking-tight">
              Client & Alumni Messages
            </h3>
            <span className="h-5 w-5 rounded-full bg-zinc-800 text-zinc-300 font-bold text-[10px] flex items-center justify-center border border-zinc-700">
              5
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsChatOpen(true)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
            >
              <Search className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg text-zinc-400 hover:text-white">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages List in Black & Grey */}
        <div className="space-y-2">
          {messagesList.map(msg => {
            const isStarred = starredIds.includes(msg.id) || msg.starred;
            return (
              <div
                key={msg.id}
                onClick={() => setIsChatOpen(true)}
                className="group p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    {msg.avatar ? (
                      <img
                        src={msg.avatar}
                        alt={msg.name}
                        className="h-9 w-9 rounded-full object-cover ring-1 ring-zinc-700 grayscale contrast-125"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center text-xs">
                        {msg.initials}
                      </div>
                    )}
                    {msg.online && (
                      <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-white ring-2 ring-zinc-900" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-white truncate">
                        {msg.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {msg.meta}
                        </span>
                        {isStarred && (
                          <Star className="w-3 h-3 text-white fill-white ml-1" />
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 leading-snug">
                      {msg.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instant Message Input Box with Solid White Send Button */}
        <form onSubmit={handleSendInstant} className="relative flex items-center pt-2">
          <input
            type="text"
            placeholder="Write instant dialog message..."
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            className="w-full pl-3.5 pr-11 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-medium"
          />
          <button
            type="submit"
            className="absolute right-2 p-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Candidate Feedback Network Card in Black & Grey */}
      <div className="mt-5 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-zinc-300" />
            <span>Candidate Feedback Network</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono">
            48 Verified
          </span>
        </div>

        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Alumni scores above 8/10 unlock instant skip-level fast tracks with partner engineering orgs.
        </p>

        <button
          onClick={() => {
            if (applications && applications.length > 0) {
              setSelectedCvApp(applications[0]);
            }
          }}
          className="text-[11px] font-bold text-zinc-200 hover:text-white hover:underline flex items-center gap-1 pt-1 cursor-pointer"
        >
          <span>View Recent Evaluation (#TK-9740)</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </aside>
  );
};
