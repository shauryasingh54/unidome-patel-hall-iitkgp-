import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { LandingAuthPage } from './components/Auth/LandingAuthPage';
import { AppShell } from './components/layout/AppShell';

import { StudentLayout } from './components/StudentDashboard/StudentLayout';
import { StudentOverview } from './components/StudentDashboard/StudentOverview';
import { StudentOpenings } from './components/StudentDashboard/StudentOpenings';
import { OpportunityDetail } from './components/StudentDashboard/OpportunityDetail';
import { StudentApplications } from './components/StudentDashboard/StudentApplications';
import { StudentResumesStudio } from './components/StudentDashboard/StudentResumesStudio';
import { ReferralRequestForm } from './components/StudentDashboard/ReferralRequestForm';

import { AlumniLayout } from './components/AlumniPortal/AlumniLayout';
import { AlumniOverview } from './components/AlumniPortal/AlumniOverview';
import { AlumniQueue } from './components/AlumniPortal/AlumniQueue';
import { AlumniPostings } from './components/AlumniPortal/AlumniPostings';

import { AdminLayout } from './components/AdminPanel/AdminLayout';
import { AdminOverview } from './components/AdminPanel/AdminOverview';
import { AdminTickets } from './components/AdminPanel/AdminTickets';
import { AdminRequests } from './components/AdminPanel/AdminRequests';
import { AdminDrives } from './components/AdminPanel/AdminDrives';
import { AdminTeam } from './components/AdminPanel/AdminTeam';

import { HallLife } from './components/HallLife/HallLife';

const roleHomePath = (role) => {
  if (role === 'Alumni') return '/alumni';
  if (role === 'Admin') return '/admin';
  return '/student';
};

export const AppContent = () => {
  const { currentRole, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <LandingAuthPage />;
  }

  const roleHome = roleHomePath(currentRole);

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to={roleHome} replace />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentOverview />} />
          <Route path="openings" element={<StudentOpenings />} />
          <Route path="openings/:opportunityId" element={<OpportunityDetail />} />
          <Route path="applications" element={<StudentApplications />} />
          <Route path="resumes" element={<StudentResumesStudio />} />
          <Route path="referral" element={<ReferralRequestForm />} />
        </Route>

        <Route path="/alumni" element={<AlumniLayout />}>
          <Route index element={<AlumniOverview />} />
          <Route path="queue" element={<AlumniQueue />} />
          <Route path="postings" element={<AlumniPostings />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="tickets" element={<AdminTickets />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="drives" element={<AdminDrives />} />
          <Route path="team" element={<AdminTeam />} />
        </Route>

        <Route path="/hall-life" element={<HallLife />} />

        <Route path="*" element={<Navigate to={roleHome} replace />} />
      </Route>
    </Routes>
  );
};
