import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutGrid,
  FileCheck2,
  Users2,
  MessageSquare,
  Sparkles,
  Database,
  Settings,
  ShieldCheck,
  Check,
  Hexagon
} from 'lucide-react';

export const Sidebar = () => {
  const {
    currentRole,
    setCurrentRole,
    setIsChatOpen,
    isChatOpen,
    setIsFeedbackNetworkOpen,
    exportDatabaseBackup,
    setIsAuthModalOpen
  } = useApp();

  const [activeNav, setActiveNav] = useState('pipeline');

  const navItems = [
    { id: 'pipeline', label: 'Pipeline & Drives', icon: LayoutGrid, role: 'Student' },
    { id: 'review', label: 'Review Queue', icon: FileCheck2, role: 'Alumni' },
    { id: 'roster', label: 'Master Roster', icon: Users2, role: 'Admin' },
    { id: 'dialogs', label: 'Direct Dialogs', icon: MessageSquare, action: () => setIsChatOpen(true) },
    { id: 'feedback', label: 'Feedback Network', icon: Sparkles, action: () => setIsFeedbackNetworkOpen(true) },
    { id: 'backup', label: 'Backup & Export', icon: Database, action: exportDatabaseBackup },
  ];

  return (
    <aside className="w-60 border-r border-zinc-800/80 bg-[#09090b] text-zinc-300 flex flex-col justify-between py-5 px-4 shrink-0 z-30 select-none">
      
      <div>
        {/* Branding */}
        <div className="flex items-center gap-3 mb-6 px-1">
          <div className="h-9 w-9 rounded-xl bg-zinc-900 text-white border border-zinc-700/80 flex items-center justify-center font-black shadow-sm">
            <Hexagon className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div>
            <div className="font-extrabold text-base text-white tracking-tight">
              UniDome
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">
              Placement Network
            </p>
          </div>
        </div>

        {/* Role Switcher Capsule - Black & Grey */}
        <div className="p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between mb-6 text-[11px] font-bold">
          <button
            onClick={() => setCurrentRole('Student')}
            className={`flex-1 py-1.5 text-center rounded-lg transition-all ${
              currentRole === 'Student'
                ? 'bg-white text-zinc-950 font-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setCurrentRole('Alumni')}
            className={`flex-1 py-1.5 text-center rounded-lg transition-all ${
              currentRole === 'Alumni'
                ? 'bg-white text-zinc-950 font-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ALUM
          </button>
          <button
            onClick={() => setCurrentRole('Admin')}
            className={`flex-1 py-1.5 text-center rounded-lg transition-all ${
              currentRole === 'Admin'
                ? 'bg-white text-zinc-950 font-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  if (item.role) setCurrentRole(item.role);
                  if (item.action) item.action();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-zinc-700 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls */}
      <div className="space-y-3 pt-4 border-t border-zinc-800">
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
        >
          <Settings className="w-4 h-4 text-zinc-400" />
          <span>Settings</span>
        </button>

        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px]">
          <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
            <Check className="w-3.5 h-3.5 text-white" />
            <span>Dome Verified</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-400">v2.4</span>
        </div>
      </div>

    </aside>
  );
};
