import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Check,
  GraduationCap,
  ShieldCheck,
  MessageSquare,
  Flame
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
    setSelectedReviewApp,
    applications,
    signOut
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unreadNotifsCount = alumNotifications.filter(n => !n.read).length;

  const roles = [
    { id: 'Student', label: 'Student', icon: GraduationCap },
    { id: 'Alumni', label: 'Alumni', icon: ShieldCheck },
    { id: 'Admin', label: 'Admin', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-30 w-full surface-header">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4">

        {/* Left: Branding & Official Patel Hall Emblem */}
        <div className="flex items-center gap-5 shrink-0">
          <div
            onClick={signOut}
            title="Click to switch accounts / landing page"
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="h-11 w-11 rounded-full bg-white p-0.5 shadow-sm flex items-center justify-center border border-maroon-100 overflow-hidden shrink-0">
              <img
                src="/patel_hall_logo.png"
                alt="Patel Hall IIT Kharagpur Emblem"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-maroon-800 dark:text-peach-50 tracking-tight leading-none">
                  Patel Hall
                </span>
                <span className="pill-brand">
                  IIT KGP
                </span>
              </div>
              <span className="text-[11px] text-muted font-medium leading-none mt-1 block">
                Placement & Referral Portal
              </span>
            </div>
          </div>

          {/* Role Switcher Pill in Top Bar */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-peach-100/70 dark:bg-sand-800/60 border border-sand-200/80 dark:border-sand-700 text-xs font-bold">
            {roles.map(r => {
              const Icon = r.icon;
              const isActive = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setCurrentRole(r.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-maroon-700 text-peach-50 shadow-sm font-black'
                      : 'text-sand-500 dark:text-sand-400 hover:text-maroon-700 dark:hover:text-peach-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Search Input */}
        <div className="relative hidden lg:block w-64">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-sand-400" />
          <input
            type="text"
            placeholder="Search drives, skills, hall records..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-9 py-2 text-xs"
          />
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">

          {/* Post Referral CTA for ALUM */}
          {currentRole === 'Alumni' && (
            <button
              onClick={() => setIsPostOpportunityOpen(true)}
              className="btn-primary hidden sm:inline-flex px-3.5 py-2 text-xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Post Opportunity</span>
            </button>
          )}

          {/* Hall Life */}
          <Link to="/hall-life" title="Hall Life" className="btn-ghost p-2">
            <Flame className="w-4 h-4" />
          </Link>

          {/* Direct Chat Trigger */}
          <button
            onClick={() => setIsChatOpen(true)}
            title="Messages & Dialogs"
            className="btn-ghost p-2"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              title="Notifications"
              className="btn-ghost relative p-2"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-maroon-600 ring-2 ring-white dark:ring-sand-950" />
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 surface-modal z-50 p-4 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between mb-3 pb-2 border-b divider">
                  <span className="font-bold text-sm text-heading">Notifications</span>
                  <button onClick={markNotificationsRead} className="text-xs text-maroon-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer">
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
                          if (app) setSelectedReviewApp(app);
                        }
                        setShowNotifDropdown(false);
                      }}
                      className="surface-sunken p-2.5 cursor-pointer hover:border-maroon-200 dark:hover:border-maroon-700 transition-all"
                    >
                      <div className="font-semibold text-heading text-sm mb-0.5">{n.title}</div>
                      <p className="text-muted text-xs leading-snug">{n.description}</p>
                      <span className="text-mono-meta mt-1 block">{n.time}</span>
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
            className="btn-ghost p-2"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile Chip */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl bg-peach-100/70 dark:bg-sand-800/60 border border-sand-200/80 dark:border-sand-700 hover:border-maroon-200 dark:hover:border-maroon-700 transition-all text-left cursor-pointer"
          >
            <div className="h-6 w-6 rounded-lg bg-maroon-700 text-peach-50 flex items-center justify-center font-black text-xs">
              {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-heading leading-none block">
                {currentUser?.name || 'User'}
              </span>
            </div>
          </button>

          {/* Sign Out / Exit to Landing */}
          <button
            onClick={signOut}
            title="Sign Out / Switch Demo ID"
            className="btn-ghost p-2"
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
