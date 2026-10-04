import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus } from 'lucide-react';

export const PostOpportunityModal = ({ onClose }) => {
  const { addOpportunity, currentUser } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    company: currentUser?.company || 'Stripe',
    salary: '₹28L - ₹38L',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time Job',
    tags: 'UI/UX, React, Design Systems',
    batchEligibility: '2025 & 2026 Batch',
    preferredPoc: 'Direct Chat on Dome',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagList = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    addOpportunity({
      ...formData,
      tags: tagList.length ? tagList : ['Full-Time', 'Referral']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 surface-overlay animate-in fade-in">
      <div className="relative w-full max-w-lg surface-modal p-6 sm:p-8 overflow-hidden">

        <button onClick={onClose} className="btn-ghost absolute top-4 right-4 p-2">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-maroon-700 text-peach-50">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-heading">
              Post Referral Opportunity
            </h2>
            <p className="text-sm text-muted">
              Publish a verified opening for students in the UniDome network
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="input-label">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">Opportunity Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Product Designer"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="input-label">Salary / Compensation</label>
              <input
                type="text"
                placeholder="e.g. ₹28L - ₹36L"
                value={formData.salary}
                onChange={e => setFormData({ ...formData, salary: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">Opportunity Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="input-field"
              >
                <option value="Full-time Job">Full-time Job</option>
                <option value="Internship (6 Months)">Internship (6 Months)</option>
                <option value="Referral Spot">Referral Spot</option>
                <option value="Contract / Project">Contract / Project</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="input-label">Batch Eligibility</label>
              <input
                type="text"
                placeholder="e.g. 2025 & 2026 Batch"
                value={formData.batchEligibility}
                onChange={e => setFormData({ ...formData, batchEligibility: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">Preferred POC Contact</label>
              <input
                type="text"
                placeholder="e.g. Direct Chat on Dome"
                value={formData.preferredPoc}
                onChange={e => setFormData({ ...formData, preferredPoc: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="input-label">Required Skills / Tags (Comma separated)</label>
            <input
              type="text"
              placeholder="Figma, Design Systems, React, Prototyping"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="input-label">Description & Referral Expectations</label>
            <textarea
              rows={3}
              placeholder="Describe requirements, team context, and candidate expectations..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t divider">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Publish Opportunity</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
