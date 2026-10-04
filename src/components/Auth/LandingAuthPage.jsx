import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RegisterModal } from './RegisterModal';
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Flame
} from 'lucide-react';

export const LandingAuthPage = () => {
  const {
    loginAsStudent,
    loginAsAlumni,
    loginCustom,
    isRegisterModalOpen,
    setIsRegisterModalOpen
  } = useApp();

  const [inputEmail, setInputEmail] = useState('');
  const [inputRole, setInputRole] = useState('Student');

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    loginCustom(inputEmail, inputRole);
  };

  return (
    <div className="min-h-screen w-full surface-page text-heading font-sans antialiased selection:bg-maroon-200 relative overflow-hidden">

      <div className="relative z-10 flex flex-col min-h-screen p-4 sm:p-6 lg:p-10">

        {/* Top Navbar */}
        <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white p-0.5 border border-maroon-100 shadow-sm flex items-center justify-center shrink-0">
              <img
                src="/patel_hall_logo.png"
                alt="Patel Hall Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-maroon-800 dark:text-peach-50 tracking-tight leading-none">
                  Patel Hall of Residence
                </span>
                <span className="pill-brand">
                  IIT Kharagpur
                </span>
              </div>
              <span className="text-xs text-muted font-medium mt-1 block">
                Placement & Alumni Referral Portal
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="btn-secondary"
          >
            <span>New Registration</span>
          </button>
        </header>

        {/* Main Center Grid */}
        <main className="max-w-6xl w-full mx-auto my-auto py-12 space-y-14">

          {/* Title Hero */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-50 dark:bg-maroon-900/30 border border-maroon-100 dark:border-maroon-800 text-maroon-700 dark:text-peach-200 text-xs font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>Patelian Brotherhood & Career Network</span>
            </div>
            <h1 className="display text-5xl sm:text-7xl text-maroon-900 dark:text-peach-50 leading-[0.98]">
              Patel Hall<br />Referral Vault
            </h1>
            <p className="text-sm sm:text-base text-muted leading-relaxed max-w-xl mx-auto">
              Connect students with verified alumni across Stripe, Uber, Google, and top Tier-1 tech for 1-click CV reviews, 1-to-10 scoring, and confidential referral fast-tracks.
            </p>
          </div>

          {/* 2 Clean Showcase Demo ID Cards (One-Click Entry) */}
          <div className="space-y-5">
            <div className="flex items-center justify-between max-w-4xl mx-auto px-1">
              <span className="text-label">
                Instant Demo Credentials — select an ID to explore
              </span>
              <span className="text-mono-meta">1-Click Full Access</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

              {/* Demo ID 1: Student */}
              <div
                onClick={loginAsStudent}
                className="surface-card p-6 sm:p-8 hover:border-maroon-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="pill-brand">
                      STUDENT DEMO ID
                    </span>
                    <span className="text-mono-meta">Room D-304</span>
                  </div>

                  <div className="flex items-start gap-4 pt-1">
                    <div className="h-14 w-14 rounded-2xl bg-maroon-700 text-peach-50 flex items-center justify-center font-black text-lg shrink-0 group-hover:scale-105 transition-transform">
                      SG
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-heading group-hover:text-maroon-700 dark:group-hover:text-peach-200 transition-colors">
                        Sanya Gupta
                      </h3>
                      <p className="text-xs text-muted font-mono">
                        2021CSB1042 • Computer Science & Design
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="pill-neutral">CPA 9.2 / 10.0</span>
                        <span className="text-mono-meta">Batch of '25</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted leading-relaxed">
                    Pre-configured with a <strong className="text-heading">4-Resume Studio</strong>, active Stripe & DeepMind application submissions, and live feedback reports.
                  </p>
                </div>

                <button type="button" className="btn-primary w-full py-3">
                  <GraduationCap className="w-4 h-4" />
                  <span>Enter as Student (Sanya Gupta)</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

              {/* Demo ID 2: Alumni Reviewer */}
              <div
                onClick={loginAsAlumni}
                className="surface-card p-6 sm:p-8 hover:border-maroon-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="pill-accent">
                      ALUMNI DEMO ID
                    </span>
                    <span className="text-mono-meta">Class of '21</span>
                  </div>

                  <div className="flex items-start gap-4 pt-1">
                    <div className="h-14 w-14 rounded-2xl bg-peach-600 text-peach-50 flex items-center justify-center font-black text-lg shrink-0 group-hover:scale-105 transition-transform">
                      AM
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-heading group-hover:text-maroon-700 dark:group-hover:text-peach-200 transition-colors">
                        Aarav Mehta
                      </h3>
                      <p className="text-xs text-muted font-mono">
                        17CS10022 • Lead Product Designer at Stripe
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="pill-neutral">Patel Alum POC</span>
                        <span className="text-mono-meta">Stripe Bengaluru HQ</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted leading-relaxed">
                    Pre-configured with <strong className="text-heading">Stripe Referral Drives</strong>, incoming student CV queue, a zoomable CV viewer, and 1-to-10 scoring drawer.
                  </p>
                </div>

                <button type="button" className="btn-primary w-full py-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Enter as Alumni Reviewer (Aarav Mehta)</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

            </div>
          </div>

          {/* Custom Credential Sign-In Accordion */}
          <div className="max-w-md mx-auto surface-card-soft p-6 text-center space-y-3.5">
            <span className="text-label block">
              Or Sign In with Custom IIT KGP Webmail
            </span>

            <form onSubmit={handleCustomSubmit} className="space-y-2.5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="roll@kgpian.iitkgp.ac.in"
                  value={inputEmail}
                  onChange={e => setInputEmail(e.target.value)}
                  className="input-field font-mono"
                />
                <select
                  value={inputRole}
                  onChange={e => setInputRole(e.target.value)}
                  className="input-field w-auto"
                >
                  <option value="Student">Student</option>
                  <option value="Alumni">Alumni</option>
                </select>
              </div>

              <button type="submit" className="btn-primary w-full">
                Sign In with Credentials
              </button>
            </form>
          </div>

        </main>

        {/* Footer */}
        <footer className="max-w-6xl w-full mx-auto pt-6 border-t divider flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted font-mono">
          <span>Patel Hall of Residence • Indian Institute of Technology Kharagpur</span>
          <span>"Lux Et Veritas Vincant" • Placement Network v2.4</span>
        </footer>

      </div>

      {isRegisterModalOpen && (
        <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />
      )}

    </div>
  );
};
