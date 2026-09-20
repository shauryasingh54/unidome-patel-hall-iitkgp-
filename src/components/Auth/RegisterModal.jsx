import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  UserCheck,
  GraduationCap,
  Building2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const RegisterModal = ({ onClose }) => {
  const { registerUser } = useApp();
  const [role, setRole] = useState('Student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    roomNumber: '',
    department: 'Computer Science & Engineering',
    batch: 'Batch of 2026',
    cpa: '9.0 / 10.0',
    company: '',
    profileTitle: '',
    hall: 'Patel Hall of Residence'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({
      ...formData,
      role
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0c0c0e] text-zinc-100 shadow-2xl p-6 sm:p-7 overflow-hidden space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white p-0.5 border border-zinc-700 flex items-center justify-center shrink-0">
            <img src="/patel_hall_logo.png" alt="Patel Hall Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">
              Patel Hall Portal Registration
            </h3>
            <p className="text-xs text-zinc-400">
              Create a verified Student or Alumni profile for placement drives
            </p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('Student')}
            className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              role === 'Student'
                ? 'bg-white text-zinc-950 font-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Registration</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('Alumni')}
            className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              role === 'Alumni'
                ? 'bg-white text-zinc-950 font-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Alumni Verification</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rohan Sharma"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="user@iitkgp.ac.in"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                {role === 'Student' ? 'Roll Number *' : 'Alumni Passout Roll *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2022CSB1108"
                value={formData.rollNumber}
                onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                {role === 'Student' ? 'Patel Hall Room No' : 'Passout Batch'}
              </label>
              <input
                type="text"
                placeholder={role === 'Student' ? 'e.g. Room D-210' : 'e.g. Class of 2020'}
                value={role === 'Student' ? formData.roomNumber : formData.batch}
                onChange={e =>
                  role === 'Student'
                    ? setFormData({ ...formData, roomNumber: e.target.value })
                    : setFormData({ ...formData, batch: e.target.value })
                }
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          {role === 'Student' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Department / Branch</label>
                <input
                  type="text"
                  placeholder="Computer Science & Engineering"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Current CGPA / CPA</label>
                <input
                  type="text"
                  placeholder="e.g. 9.1 / 10.0"
                  value={formData.cpa}
                  onChange={e => setFormData({ ...formData, cpa: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Current Company</label>
                <input
                  type="text"
                  placeholder="e.g. Uber, Google, Stripe"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Designation / Role</label>
                <input
                  type="text"
                  placeholder="e.g. Staff Backend Engineer"
                  value={formData.profileTitle}
                  onChange={e => setFormData({ ...formData, profileTitle: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Complete Registration & Enter</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
