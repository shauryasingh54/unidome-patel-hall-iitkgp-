import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Ticket, PhoneCall, Database, Users } from 'lucide-react';

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/tickets', label: 'Master Tickets', icon: Ticket },
  { to: '/admin/requests', label: 'POC Requests', icon: PhoneCall },
  { to: '/admin/drives', label: 'Manage Drives', icon: Database },
  { to: '/admin/team', label: 'Admin Privileges', icon: Users }
];

export const AdminLayout = () => {
  return (
    <div className="space-y-8">

      <div className="pb-6 border-b divider">
        <span className="text-label block mb-1.5">Master Placement Cell Panel</span>
        <h1 className="text-2xl sm:text-3xl font-black text-maroon-900 dark:text-peach-50 tracking-tight">
          Dome Referral Admin Console
        </h1>
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
