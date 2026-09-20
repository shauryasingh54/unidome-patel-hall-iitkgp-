import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Building2, UserPlus, PhoneCall, Link2, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ReferralRequestForm = () => {
  const { submitCustomReferralRequest } = useApp();
  const [formData, setFormData] = useState({
    targetCompany: '',
    targetRole: '',
    jobUrl: '',
    externalPocName: '',
    externalPocPhone: '',
    externalPocDesignation: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCustomReferralRequest(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        targetCompany: '',
        targetRole: '',
        jobUrl: '',
        externalPocName: '',
        externalPocPhone: '',
        externalPocDesignation: '',
        notes: ''
      });
    }, 2500);
  };

  return (
    <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-8 shadow-xl">
      
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center font-bold">
          <UserPlus className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Submit Custom Referral or External POC
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Can't find a listed opportunity? Request custom alumni outreach or submit direct POC contacts to the Admin team.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Custom Referral Ticket Routed to Admin
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            The Placement Cell & Alumni team will verify the target company/POC details and establish an official Dome referral ticket for you.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Company */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-500" />
                Target Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Atlassian, Microsoft, CRED"
                value={formData.targetCompany}
                onChange={e => setFormData({ ...formData, targetCompany: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Target Role */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Position / Job Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Frontend Engineer, Product Analyst"
                value={formData.targetRole}
                onChange={e => setFormData({ ...formData, targetRole: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Job URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-cyan-500" />
              Careers Page / Job Portal Link
            </label>
            <input
              type="url"
              placeholder="https://company.com/careers/job-id"
              value={formData.jobUrl}
              onChange={e => setFormData({ ...formData, jobUrl: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* External POC Details Divider */}
          <div className="p-4 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              <PhoneCall className="w-4 h-4" />
              Optional External POC / Alumni Contact Details
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              If you got in touch with an external alumni contact, share their details so Admin can formalize the referral loop.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  POC Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Nair"
                  value={formData.externalPocName}
                  onChange={e => setFormData({ ...formData, externalPocName: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  POC Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.externalPocPhone}
                  onChange={e => setFormData({ ...formData, externalPocPhone: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                POC Designation / Company Role
              </label>
              <input
                type="text"
                placeholder="e.g. Engineering Manager at Atlassian (Batch 2018)"
                value={formData.externalPocDesignation}
                onChange={e => setFormData({ ...formData, externalPocDesignation: e.target.value })}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Additional Context / Request Notes
            </label>
            <textarea
              rows={3}
              placeholder="Explain why you are requesting this company or any prior conversation with the POC..."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Form submit */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-500" />
              <span>Admin ensures privacy for all submitted contacts</span>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-extrabold shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Request Ticket
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
