import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AuthModal } from './Auth/AuthModal';
import { PostOpportunityModal } from './AlumniPortal/PostOpportunityModal';
import { FeedbackNetworkDrawer } from './FeedbackNetwork/FeedbackNetworkDrawer';
import {
  Plus,
  Bell,
  Sun,
  Moon,
  LogOut,
  Check,
  GraduationCap,
  ShieldCheck,
  MessageSquare,
  Flame,
  Sparkles
} from 'lucide-react';

const ROLES = [
  { id: 'Student', label: 'Student', icon: GraduationCap },
  { id: 'Alumni', label: 'Alumni', icon: ShieldCheck },
  { id: 'Admin', label: 'Admin', icon: ShieldCheck }
];

const iconBtn = 'relative btn-ghost p-2';

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
    setIsFeedbackNetworkOpen,
    setSelectedReviewApp,
    applications,
    signOut
  } = useApp();

  const navigate = useNavigate();
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const isAlumni = currentRole === 'Alumni';
  const unreadCount = alumNotifications.filter(n => !n.read).length;

  useEffect(() => {
    if (!showNotifDropdown) return;
    const close = () => setShowNotifDropdown(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [showNotifDropdown]);

  const openNotification = (n) => {
    const app = n.appId && applications.find(a => a.id === n.appId);
    if (app) {
      setSelectedReviewApp(app);
      navigate('/alumni/queue');
    }
    setShowNotifDropdown(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full surface-header">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-3">

        <div className="flex items-center gap-4 min-w-0">
          <button onClick={signOut} title="Sign out and return to sign-in" className="flex items-center gap-2.5 shrink-0 cursor-pointer">
            <div className="h-9 w-9 rounded-full bg-white p-0.5 border border-maroon-100 flex items-center justify-center overflow-hidden">
              <img src="/patel_hall_logo.png" alt="Patel Hall emblem" className="h-full w-full object-contain" />
            </div>
            <div className="hidden md:block text-left">
              <div className="font-extrabold text-sm text-maroon-800 dark:text-peach-50 leading-none">Patel Hall</div>
              <div className="text-[11px] text-muted leading-none mt-1">Placement & Referral Portal</div>
            </div>
          </button>

          {/* Role switcher: visible on every screen size */}
          <div className="flex items-center gap-0.5 p-1 rounded-lg bg-white/45 backdrop-blur-xl dark:bg-white/5 border border-sand-200/80 dark:border-sand-700 text-xs font-semibold">
            {ROLES.map(r => {
              const Icon = r.icon;
              const active = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setCurrentRole(r.id)}
                  aria-pressed={active}
                  title={`Switch to ${r.label}`}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    active
                      ? 'bg-maroon-700 text-peach-50'
                      : 'text-sand-700 dark:text-sand-300 hover:text-maroon-700 dark:hover:text-peach-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">

          {isAlumni && (
            <button onClick={() => setIsPostOpportunityOpen(true)} className="btn-primary hidden lg:inline-flex px-3 py-2 text-xs">
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Post opportunity</span>
            </button>
          )}

          <Link to="/hall-life" title="Hall Life" className={iconBtn}>
            <Flame className="w-4 h-4" />
          </Link>

          {(isAlumni || currentRole === 'Admin') && (
            <button onClick={() => setIsFeedbackNetworkOpen(true)} title="Feedback network" className={`${iconBtn} hidden sm:inline-flex`}>
              <Sparkles className="w-4 h-4" />
            </button>
          )}

          <button onClick={() => setIsChatOpen(true)} title="Messages" className={iconBtn}>
            <MessageSquare className="w-4 h-4" />
          </button>

          {isAlumni && (
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setShowNotifDropdown(v => !v)}
                title="Notifications"
                className={iconBtn}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-maroon-600 ring-2 ring-peach-50 dark:ring-sand-950" />
                )}
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 max-w-[90vw] surface-modal z-50 p-4">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b divider">
                    <span className="font-bold text-sm text-heading">Notifications</span>
                    <button onClick={markNotificationsRead} className="text-xs text-maroon-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer">
                      <Check className="w-3 h-3" /> Mark all read
                    </button>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {alumNotifications.length === 0 && <p className="text-xs text-muted py-4 text-center">You're all caught up.</p>}
                    {alumNotifications.map(n => (
                      <button
                        key={n.id}
                        onClick={() => openNotification(n)}
                        className={`w-full text-left surface-sunken p-2.5 cursor-pointer hover:border-maroon-200 transition-colors ${n.read ? 'opacity-70' : ''}`}
                      >
                        <div className="font-semibold text-heading text-sm">{n.title}</div>
                        <p className="text-muted text-xs leading-snug mt-0.5">{n.description}</p>
                        <span className="text-mono-meta mt-1 block">{n.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} className={iconBtn}>
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            title="Account and UniDome ID"
            className="hidden sm:flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-lg bg-white/45 backdrop-blur-xl dark:bg-white/5 border border-sand-200/80 dark:border-sand-700 hover:border-maroon-200 transition-colors cursor-pointer"
          >
            <div className="h-6 w-6 rounded-md bg-maroon-700 text-peach-50 flex items-center justify-center font-black text-xs">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <span className="text-xs font-semibold text-heading max-w-[120px] truncate">{currentUser?.name || 'Account'}</span>
          </button>

          <button onClick={signOut} title="Sign out" className={iconBtn}>
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
