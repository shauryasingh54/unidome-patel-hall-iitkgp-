import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { ChatDrawer } from '../Chat/ChatDrawer';

export const AppShell = () => {
  return (
    <div className="flex flex-col min-h-screen w-full surface-page text-heading overflow-x-hidden font-sans antialiased">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        <Outlet />
      </main>

      <ChatDrawer />
    </div>
  );
};
