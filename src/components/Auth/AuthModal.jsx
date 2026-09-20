import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Mail, Lock, UserCheck, Sparkles, Key, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal = ({ onClose }) => {
  const { registerGmailDomeId, loginUser } = useApp();
  const [mode, setMode] = useState('register'); // 'login' | 'register'
  const [role, setRole] = useState('Student'); // 'Student' | 'Alumni' | 'Admin'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedUser, setGeneratedUser] = useState(null);

  const handleGoogleOneTap = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const gUser = registerGmailDomeId({
        email: 'sanya.g@gmail.com',
        fullName: 'Sanya Gupta',
        role: role,
        rollNo: '2021CSB1042',
        companyName: role === 'Alumni' ? 'Stripe Inc' : 'Dome Campus'
      });
      setGeneratedUser(gUser);
      setIsSubmitting(false);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const regUser = registerGmailDomeId({
        email: email || 'user@gmail.com',
        fullName: fullName || 'Verified User',
        role: role,
        rollNo: rollNo || '2026-9402',
        companyName: companyName
      });
      setGeneratedUser(regUser);
      setIsSubmitting(false);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {generatedUser ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              UniDome ID Generated!
            </h3>
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">Assigned Dome ID:</span>
                <span className="font-mono font-bold text-cyan-500">{generatedUser.domeId}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Authenticated Email:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{generatedUser.email}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Account Role:</span>
                <span className="font-bold text-emerald-400">{generatedUser.role}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Session activated. Redirecting to your {generatedUser.role} dashboard...
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center space-y-2 mb-6">
              <div className="h-12 w-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                UniDome ID Creation & Auth
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Create or verify your institutional & Gmail credentials
              </p>
            </div>

            {/* Quick Google One-Tap Simulation */}
            <button
              onClick={handleGoogleOneTap}
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-3 shadow-sm transition-all mb-4"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
              </svg>
              <span>Continue with Gmail / Google OAuth</span>
            </button>

            <div className="relative my-4 text-center">
              <span className="bg-white dark:bg-slate-900 px-3 text-[10px] text-slate-400 font-mono uppercase">
                Or Register Manually
              </span>
              <div className="absolute inset-x-0 top-1/2 -z-10 border-t border-slate-200 dark:border-slate-800" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Role
                </label>
                <div className="flex gap-2">
                  {['Student', 'Alumni'].map(r => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        role === r
                          ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanya Gupta"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Gmail / Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com or name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {role === 'Student' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Student Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2021CSB1042"
                    value={rollNo}
                    onChange={e => setRollNo(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Current Company / Employer
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stripe, Uber, Google"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all mt-2"
              >
                <span>Generate Verified UniDome ID</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
