import React from 'react';
import { useApp } from './context/AppContext';
import { LandingAuthPage } from './components/Auth/LandingAuthPage';
import { Header } from './components/Header';
import { StudentDashboard } from './components/StudentDashboard/StudentDashboard';
import { AlumniPortal } from './components/AlumniPortal/AlumniPortal';
import { AdminPanel } from './components/AdminPanel/AdminPanel';
import { ChatDrawer } from './components/Chat/ChatDrawer';

export const AppContent = () => {
  const { currentRole, isAuthenticated } = useApp();

  // If not authenticated, show the Landing & Sign-In Page with the 2 Demo IDs
  if (!isAuthenticated) {
    return <LandingAuthPage />;
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#09090b] text-zinc-100 overflow-x-hidden font-sans antialiased">
      
      {/* Top Header Bar */}
      <Header />

      {/* Main Full-Width Centered Content Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {currentRole === 'Student' && <StudentDashboard />}
        {currentRole === 'Alumni' && <AlumniPortal />}
        {currentRole === 'Admin' && <AdminPanel />}
      </main>

      {/* Slide-over Interactive Chat Drawer */}
      <ChatDrawer />

    </div>
  );
};
