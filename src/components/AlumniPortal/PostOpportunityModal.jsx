import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building2, Briefcase, Plus, MapPin, Tag } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0c0c0e] text-zinc-100 shadow-2xl p-6 sm:p-7 overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-zinc-800 text-white border border-zinc-700">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">
              Post Referral Opportunity
            </h2>
            <p className="text-xs text-zinc-400">
              Publish a verified opening for students in the UniDome network
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Opportunity Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Product Designer"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Salary / Compensation
              </label>
              <input
                type="text"
                placeholder="e.g. ₹28L - ₹36L"
                value={formData.salary}
                onChange={e => setFormData({ ...formData, salary: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Opportunity Type
              </label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white focus:outline-none focus:border-zinc-500"
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
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Batch Eligibility
              </label>
              <input
                type="text"
                placeholder="e.g. 2025 & 2026 Batch"
                value={formData.batchEligibility}
                onChange={e => setFormData({ ...formData, batchEligibility: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Preferred POC Contact
              </label>
              <input
                type="text"
                placeholder="e.g. Direct Chat on Dome"
                value={formData.preferredPoc}
                onChange={e => setFormData({ ...formData, preferredPoc: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">
              Required Skills / Tags (Comma separated)
            </label>
            <input
              type="text"
              placeholder="Figma, Design Systems, React, Prototyping"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">
              Description & Referral Expectations
            </label>
            <textarea
              rows={3}
              placeholder="Describe requirements, team context, and candidate expectations..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Publish Opportunity</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
