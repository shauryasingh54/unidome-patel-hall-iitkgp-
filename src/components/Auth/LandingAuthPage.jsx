import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RegisterModal } from './RegisterModal';
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  Flame,
  CheckCircle2,
  Users,
  Compass,
  FileText
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
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 flex flex-col justify-between p-4 sm:p-6 lg:p-10 font-sans antialiased selection:bg-white selection:text-black">
      
      {/* Top Navbar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white p-0.5 border border-zinc-700/80 shadow-md flex items-center justify-center shrink-0">
            <img
              src="/patel_hall_logo.png"
              alt="Patel Hall Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-none">
                Patel Hall of Residence
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold">
                IIT Kharagpur
              </span>
            </div>
            <span className="text-xs text-zinc-400 font-mono mt-1 block">
              Placement & Alumni Referral Portal
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold text-xs transition-colors cursor-pointer"
        >
          <span>New Registration</span>
        </button>
      </header>

      {/* Main Center Grid */}
      <main className="max-w-6xl w-full mx-auto my-auto py-10 space-y-12">
        
        {/* Title Hero */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-bold">
            <Flame className="w-3.5 h-3.5 text-zinc-200" />
            <span>Patelian Brotherhood & Career Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Sign In to Patel Hall Referral Vault
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Connect students with verified alumni across Stripe, Uber, Google, and top Tier-1 tech for 1-click CV reviews, 1-to-10 scoring, and confidential referral fast-tracks.
          </p>
        </div>

        {/* 2 Clean Showcase Demo ID Cards (One-Click Entry) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto px-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              ⚡ Instant Demo Credentials (Select an ID to Explore)
            </span>
            <span className="text-[10px] font-mono text-zinc-500">1-Click Full Access</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Demo ID 1: Student */}
            <div
              onClick={loginAsStudent}
              className="p-6 sm:p-7 rounded-3xl bg-[#121215] border border-zinc-800 hover:border-zinc-500 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5 group shadow-xl hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-3.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-zinc-800 text-zinc-200 border border-zinc-700">
                      STUDENT DEMO ID
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400">Room D-304</span>
                </div>

                <div className="flex items-start gap-3.5 pt-1">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center font-black text-lg shrink-0 group-hover:scale-105 transition-transform">
                    SG
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-zinc-200 transition-colors">
                      Sanya Gupta
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      2021CSB1042 • Computer Science & Design
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-zinc-900 text-zinc-300 border border-zinc-800">
                        CPA 9.2 / 10.0
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">Batch of '25</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Pre-configured with <strong>4-Resume Studio</strong>, active Stripe & DeepMind application submissions, and live feedback reports.
                </p>
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-2xl bg-white text-zinc-950 font-black text-xs shadow-md flex items-center justify-center gap-2 group-hover:bg-zinc-200 transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Enter as Student (Sanya Gupta)</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

            {/* Demo ID 2: Alumni Reviewer */}
            <div
              onClick={loginAsAlumni}
              className="p-6 sm:p-7 rounded-3xl bg-[#121215] border border-zinc-800 hover:border-zinc-500 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5 group shadow-xl hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-3.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-zinc-800 text-zinc-200 border border-zinc-700">
                      ALUMNI DEMO ID
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400">Class of '21</span>
                </div>

                <div className="flex items-start gap-3.5 pt-1">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center font-black text-lg shrink-0 group-hover:scale-105 transition-transform">
                    AM
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-zinc-200 transition-colors">
                      Aarav Mehta
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      17CS10022 • Lead Product Designer at Stripe
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-zinc-900 text-zinc-300 border border-zinc-800">
                        Patel Alum POC
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">Stripe Bengaluru HQ</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Pre-configured with <strong>Stripe Referral Drives</strong>, incoming student CV queue, zoomable PDF viewer, and 1-to-10 scoring drawer.
                </p>
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-2xl bg-white text-zinc-950 font-black text-xs shadow-md flex items-center justify-center gap-2 group-hover:bg-zinc-200 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Enter as Alumni Reviewer (Aarav Mehta)</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

          </div>
        </div>

        {/* Custom Credential Sign-In Accordion */}
        <div className="max-w-md mx-auto p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-center space-y-3">
          <span className="text-[11px] font-mono text-zinc-400 block font-bold">
            Or Sign In with Custom IIT KGP Webmail
          </span>

          <form onSubmit={handleCustomSubmit} className="space-y-2.5">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="roll@kgpian.iitkgp.ac.in"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
              />
              <select
                value={inputRole}
                onChange={e => setInputRole(e.target.value)}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-xs text-zinc-300 font-medium focus:outline-none focus:border-zinc-500"
              >
                <option value="Student">Student</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-zinc-700 transition-colors cursor-pointer"
            >
              Sign In with Credentials
            </button>
          </form>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-500 font-mono">
        <span>Patel Hall of Residence • Indian Institute of Technology Kharagpur</span>
        <span>"Lux Et Veritas Vincant" • Placement Network v2.4</span>
      </footer>

      {isRegisterModalOpen && (
        <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />
      )}

    </div>
  );
};
