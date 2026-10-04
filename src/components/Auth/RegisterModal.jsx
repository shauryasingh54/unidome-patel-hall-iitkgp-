import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  GraduationCap,
  ArrowRight,
  ShieldCheck
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 surface-overlay animate-in fade-in">
      <div className="relative w-full max-w-lg surface-modal p-6 sm:p-8 overflow-hidden space-y-5">

        <button
          onClick={onClose}
          className="btn-ghost absolute top-4 right-4 p-2"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-white p-0.5 border border-maroon-100 flex items-center justify-center shrink-0">
            <img src="/patel_hall_logo.png" alt="Patel Hall Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-heading">
              Patel Hall Portal Registration
            </h3>
            <p className="text-xs text-muted">
              Create a verified Student or Alumni profile for placement drives
            </p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/45 backdrop-blur-xl dark:bg-white/5 border border-sand-200/80 dark:border-sand-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('Student')}
            className={`py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              role === 'Student'
                ? 'bg-maroon-700 text-peach-50 shadow-sm font-black'
                : 'text-sand-700 dark:text-sand-300 hover:text-maroon-700 dark:hover:text-peach-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Registration</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('Alumni')}
            className={`py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              role === 'Alumni'
                ? 'bg-maroon-700 text-peach-50 shadow-sm font-black'
                : 'text-sand-700 dark:text-sand-300 hover:text-maroon-700 dark:hover:text-peach-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Alumni Verification</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="input-label">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rohan Sharma"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">Email Address *</label>
              <input
                type="email"
                required
                placeholder="user@iitkgp.ac.in"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="input-label">
                {role === 'Student' ? 'Roll Number *' : 'Alumni Passout Roll *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2022CSB1108"
                value={formData.rollNumber}
                onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                className="input-field font-mono"
              />
            </div>

            <div>
              <label className="input-label">
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
                className="input-field"
              />
            </div>
          </div>

          {role === 'Student' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="input-label">Department / Branch</label>
                <input
                  type="text"
                  placeholder="Computer Science & Engineering"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Current CGPA / CPA</label>
                <input
                  type="text"
                  placeholder="e.g. 9.1 / 10.0"
                  value={formData.cpa}
                  onChange={e => setFormData({ ...formData, cpa: e.target.value })}
                  className="input-field font-mono"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="input-label">Current Company</label>
                <input
                  type="text"
                  placeholder="e.g. Uber, Google, Stripe"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Designation / Role</label>
                <input
                  type="text"
                  placeholder="e.g. Staff Backend Engineer"
                  value={formData.profileTitle}
                  onChange={e => setFormData({ ...formData, profileTitle: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          )}

          <div className="pt-3 border-t divider flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
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
