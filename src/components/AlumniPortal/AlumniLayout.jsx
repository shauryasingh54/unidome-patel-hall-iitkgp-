import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, FileCheck2, Briefcase, Flame } from 'lucide-react';

const navItems = [
  { to: '/alumni', label: 'Hall Life', icon: Flame, end: true },
  { to: '/alumni/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/alumni/queue', label: 'Review Queue', icon: FileCheck2 },
  { to: '/alumni/postings', label: 'My Postings', icon: Briefcase }
];

export const AlumniLayout = () => {
  const { currentUser } = useApp();
  const initials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')
    : 'U';

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-5 border-b divider">
        <div>
          <span className="text-label block mb-1.5">
            Alumni Reviewer Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
            {currentUser?.name ? `Welcome back, ${currentUser.name.split(' ')[0]}` : 'Welcome back'}
          </h1>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/45 backdrop-blur-xl dark:bg-white/5 border border-sand-200/80 dark:border-sand-700 self-start sm:self-auto">
          <div className="h-9 w-9 rounded-xl bg-peach-600 text-peach-50 flex items-center justify-center font-bold text-sm">
            {initials}
          </div>
          <div>
            <div className="font-bold text-heading text-sm leading-none">{currentUser?.name || 'Alumni'}</div>
            <span className="text-mono-meta leading-none">{currentUser?.profileTitle}</span>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <nav className="flex items-center justify-start border-b divider pb-px gap-7 overflow-x-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'tab-link-active' : 'tab-link')}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <Outlet />

    </div>
  );
};
