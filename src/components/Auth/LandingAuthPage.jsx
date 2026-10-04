import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RegisterModal } from './RegisterModal';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const DEMO_IDS = [
  {
    key: 'student',
    initials: 'SG',
    name: 'Sanya Gupta',
    role: 'Student',
    detail: '2021CSB1042 · CSE & Design · CPA 9.2'
  },
  {
    key: 'alumni',
    initials: 'AM',
    name: 'Aarav Mehta',
    role: 'Alumni reviewer',
    detail: "Lead Product Designer, Stripe · Class of '21"
  }
];

const PROMISES = [
  'Apply in one click with any of your four resume profiles',
  'Get CV scores and feedback from verified Patel Hall alumni',
  'Private referral fast-tracks for the strongest candidates'
];

export const LandingAuthPage = () => {
  const { loginAsStudent, loginAsAlumni, loginCustom, isRegisterModalOpen, setIsRegisterModalOpen } = useApp();
  const [inputEmail, setInputEmail] = useState('');
  const [inputRole, setInputRole] = useState('Student');

  const enterDemo = (key) => (key === 'student' ? loginAsStudent() : loginAsAlumni());

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    loginCustom(inputEmail.trim(), inputRole);
  };

  return (
    <div className="w-full flex flex-col min-h-[100dvh] font-sans antialiased selection:bg-maroon-200">

      <header className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 sm:px-8 pt-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white p-0.5 border border-maroon-100 flex items-center justify-center">
            <img src="/patel_hall_logo.png" alt="Patel Hall emblem" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-maroon-800 dark:text-peach-50 leading-none">Patel Hall of Residence</div>
            <div className="hidden sm:block text-[11px] text-muted leading-none mt-1">IIT Kharagpur · Placement & Alumni Referral Portal</div>
          </div>
        </div>
        <button onClick={() => setIsRegisterModalOpen(true)} className="btn-secondary px-3.5 py-2 text-xs whitespace-nowrap shrink-0">
          New registration
        </button>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

        <section className="lg:col-span-7 space-y-6 reveal">
          <span className="text-label">Patel Ka Tempo High Hai!</span>
          <h1 className="display text-5xl sm:text-7xl text-maroon-900 dark:text-peach-50 leading-[0.95]">
            Patel Hall<br />Referral Vault
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
            Connect with verified Patel Hall alumni working at Stripe, Uber, Google and other leading tech companies.
          </p>
          <ul className="space-y-2.5">
            {PROMISES.map(p => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-heading">
                <CheckCircle2 className="w-4 h-4 text-maroon-600 dark:text-peach-300 mt-0.5 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:col-span-5 surface-card p-6 sm:p-7 space-y-5 reveal reveal-2">
          <div>
            <h2 className="display text-2xl text-heading">Sign in</h2>
            <p className="text-xs text-muted mt-1">Pick a demo account to explore, or use your webmail.</p>
          </div>

          <div className="space-y-2">
            {DEMO_IDS.map(d => (
              <button
                key={d.key}
                onClick={() => enterDemo(d.key)}
                className="w-full flex items-center gap-3.5 p-3.5 rounded-lg border border-sand-200 dark:border-sand-700 hover:border-maroon-400 hover:bg-maroon-50/50 dark:hover:bg-sand-800/50 transition-colors text-left cursor-pointer group"
              >
                <div className="h-10 w-10 rounded-lg bg-maroon-700 text-peach-50 flex items-center justify-center font-black text-sm shrink-0">
                  {d.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-heading">{d.name}</span>
                    <span className="pill-neutral">{d.role}</span>
                  </div>
                  <p className="text-[11px] text-muted font-mono truncate mt-0.5">{d.detail}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-sand-600 group-hover:text-maroon-700 transition-colors shrink-0" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-sand-600 font-mono uppercase tracking-wider">
            <span className="flex-1 border-t divider" /> or use webmail <span className="flex-1 border-t divider" />
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-2.5">
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <input
                type="email"
                required
                placeholder="roll@kgpian.iitkgp.ac.in"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
                className="input-field font-mono text-xs"
              />
              <select value={inputRole} onChange={e => setInputRole(e.target.value)} className="input-field w-auto">
                <option value="Student">Student</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">Continue</button>
          </form>
        </section>

      </main>

      <footer className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-5 border-t divider flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted">
        <span>Patel Hall of Residence · Indian Institute of Technology Kharagpur</span>
        <span className="font-mono">Lux Et Veritas Vincant</span>
      </footer>

      {isRegisterModalOpen && <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />}

    </div>
  );
};
