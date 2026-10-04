import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  CheckCircle2,
  Layers,
  UserPlus,
  Flame,
  LayoutDashboard
} from 'lucide-react';

const navItems = [
  { to: '/student', label: 'Hall Life', icon: Flame, end: true },
  { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/student/openings', label: 'Openings', icon: Compass },
  { to: '/student/applications', label: 'Applications', icon: CheckCircle2 },
  { to: '/student/resumes', label: 'Resumes', icon: Layers },
  { to: '/student/referral', label: 'Custom Referral', icon: UserPlus }
];

export const StudentLayout = () => {
  const { currentUser } = useApp();
  const initials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')
    : 'U';

  return (
    <div className="space-y-6">

      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-5 border-b divider">
        <div>
          <span className="text-label block mb-1.5">
            Student Placement & Referral Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
            {currentUser?.name ? `Welcome back, ${currentUser.name.split(' ')[0]}` : 'Welcome back'}
          </h1>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-peach-100/70 dark:bg-sand-800/60 border border-sand-200/80 dark:border-sand-700 self-start sm:self-auto">
          <div className="h-9 w-9 rounded-xl bg-maroon-700 text-peach-50 flex items-center justify-center font-bold text-sm">
            {initials}
          </div>
          <div>
            <div className="font-bold text-heading text-sm leading-none">{currentUser?.name || 'Student'}</div>
            <span className="text-mono-meta leading-none">{currentUser?.batch} • CPA {currentUser?.cpa}</span>
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
