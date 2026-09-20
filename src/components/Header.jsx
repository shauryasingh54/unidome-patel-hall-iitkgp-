import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AuthModal } from './Auth/AuthModal';
import { PostOpportunityModal } from './AlumniPortal/PostOpportunityModal';
import { FeedbackNetworkDrawer } from './FeedbackNetwork/FeedbackNetworkDrawer';
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  LogOut,
  UserCheck,
  Check,
  GraduationCap,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

export const Header = () => {
  const {
    theme,
    toggleTheme,
    currentRole,
    setCurrentRole,
    currentUser,
    alumNotifications,
    markNotificationsRead,
    setIsAuthModalOpen,
    isAuthModalOpen,
    setIsPostOpportunityOpen,
    isPostOpportunityOpen,
    setIsChatOpen,
    setSelectedCvApp,
    applications,
    signOut
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unreadNotifsCount = alumNotifications.filter(n => !n.read).length || 2;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Branding & Official Patel Hall Emblem */}
        <div className="flex items-center gap-6 shrink-0">
          <div
            onClick={signOut}
            title="Click to switch accounts / landing page"
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="h-10 w-10 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center border border-zinc-700/80 overflow-hidden shrink-0">
              <img
                src="/patel_hall_logo.png"
                alt="Patel Hall IIT Kharagpur Emblem"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-none">
                  Patel Hall
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold">
                  IIT KGP
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono leading-none mt-1 block">
                Placement & Referral Portal
              </span>
            </div>
          </div>

          {/* Role Switcher Pill in Top Bar */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold">
            <button
              onClick={() => setCurrentRole('Student')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                currentRole === 'Student'
                  ? 'bg-white text-zinc-950 font-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>

            <button
              onClick={() => setCurrentRole('Alumni')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                currentRole === 'Alumni'
                  ? 'bg-white text-zinc-950 font-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ALUM</span>
            </button>

            <button
              onClick={() => setCurrentRole('Admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                currentRole === 'Admin'
                  ? 'bg-white text-zinc-950 font-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Center Search Input */}
        <div className="relative hidden lg:block w-64">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search drives, skills, hall records..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-medium"
          />
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5">
          
          {/* Post Referral CTA for ALUM */}
          {currentRole === 'Alumni' && (
            <button
              onClick={() => setIsPostOpportunityOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Post Opportunity</span>
            </button>
          )}

          {/* Direct Chat Trigger */}
          <button
            onClick={() => setIsChatOpen(true)}
            title="Messages & Dialogs"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              title="Notifications"
              className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-white ring-2 ring-zinc-900" />
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
                  <span className="font-bold text-sm text-white">Notifications</span>
                  <button onClick={markNotificationsRead} className="text-xs text-zinc-300 hover:underline flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" /> Mark read
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {alumNotifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.appId) {
                          const app = applications.find(a => a.id === n.appId);
                          if (app) setSelectedCvApp(app);
                        }
                        setShowNotifDropdown(false);
                      }}
                      className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs cursor-pointer hover:border-zinc-700 transition-all"
                    >
                      <div className="font-semibold text-white mb-0.5">{n.title}</div>
                      <p className="text-zinc-400 leading-snug">{n.description}</p>
                      <span className="text-[10px] text-zinc-500 font-mono mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Switch Theme"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4 text-zinc-300" /> : <Sun className="w-4 h-4 text-zinc-300" />}
          </button>

          {/* User Profile Chip */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all text-left cursor-pointer"
          >
            <div className="h-6 w-6 rounded-lg bg-zinc-800 text-white flex items-center justify-center font-black text-xs border border-zinc-700">
              {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-white leading-none block">
                {currentUser?.name || 'User'}
              </span>
            </div>
          </button>

          {/* Sign Out / Exit to Landing */}
          <button
            onClick={signOut}
            title="Sign Out / Switch Demo ID"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>

      </div>

      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
      {isPostOpportunityOpen && <PostOpportunityModal onClose={() => setIsPostOpportunityOpen(false)} />}
      <FeedbackNetworkDrawer />

    </header>
  );
};
