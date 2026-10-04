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
    <div className="max-w-3xl mx-auto surface-card p-6 sm:p-8">

      <div className="flex items-center gap-3 mb-6 pb-5 border-b divider">
        <div className="h-12 w-12 rounded-xl bg-maroon-700 text-peach-50 flex items-center justify-center shrink-0">
          <UserPlus className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-heading">
            Submit Custom Referral or External POC
          </h2>
          <p className="text-sm text-muted">
            Can't find a listed opportunity? Request custom alumni outreach or submit direct POC contacts to the Admin team.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-heading">
            Custom Referral Ticket Routed to Admin
          </h3>
          <p className="text-sm text-muted max-w-md mx-auto">
            The Placement Cell & Alumni team will verify the target company/POC details and establish an official Dome referral ticket for you.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Target Company */}
            <div>
              <label className="input-label flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-maroon-600" />
                Target Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Atlassian, Microsoft, CRED"
                value={formData.targetCompany}
                onChange={e => setFormData({ ...formData, targetCompany: e.target.value })}
                className="input-field"
              />
            </div>

            {/* Target Role */}
            <div>
              <label className="input-label">
                Target Position / Job Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Frontend Engineer, Product Analyst"
                value={formData.targetRole}
                onChange={e => setFormData({ ...formData, targetRole: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          {/* Job URL */}
          <div>
            <label className="input-label flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-maroon-600" />
              Careers Page / Job Portal Link
            </label>
            <input
              type="url"
              placeholder="https://company.com/careers/job-id"
              value={formData.jobUrl}
              onChange={e => setFormData({ ...formData, jobUrl: e.target.value })}
              className="input-field"
            />
          </div>

          {/* External POC Details Divider */}
          <div className="surface-sunken p-5 space-y-4">
            <div className="flex items-center gap-2 text-label">
              <PhoneCall className="w-4 h-4" />
              Optional External POC / Alumni Contact Details
            </div>
            <p className="text-xs text-muted">
              If you got in touch with an external alumni contact, share their details so Admin can formalize the referral loop.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="input-label">POC Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Nair"
                  value={formData.externalPocName}
                  onChange={e => setFormData({ ...formData, externalPocName: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">POC Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.externalPocPhone}
                  onChange={e => setFormData({ ...formData, externalPocPhone: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="input-label">POC Designation / Company Role</label>
              <input
                type="text"
                placeholder="e.g. Engineering Manager at Atlassian (Batch 2018)"
                value={formData.externalPocDesignation}
                onChange={e => setFormData({ ...formData, externalPocDesignation: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="input-label">Additional Context / Request Notes</label>
            <textarea
              rows={3}
              placeholder="Explain why you are requesting this company or any prior conversation with the POC..."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="input-field"
            />
          </div>

          {/* Form submit */}
          <div className="flex items-center justify-between pt-3 border-t divider">
            <div className="flex items-center gap-2 text-[11px] text-muted">
              <ShieldAlert className="w-3.5 h-3.5 text-maroon-600" />
              <span>Admin ensures privacy for all submitted contacts</span>
            </div>
            <button type="submit" className="btn-primary">
              <Send className="w-3.5 h-3.5" />
              Submit Request Ticket
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
