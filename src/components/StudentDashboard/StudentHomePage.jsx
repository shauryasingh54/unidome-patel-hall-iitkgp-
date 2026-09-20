import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSlider } from '../AlumniPortal/HeroSlider';
import {
  Calendar,
  MapPin,
  Sparkles,
  Building2,
  ChevronRight,
  Flame,
  CheckCircle2,
  Search,
  Filter,
  Briefcase
} from 'lucide-react';

export const StudentHomePage = () => {
  const { opportunities, announcements, setSelectedOpportunityForApply } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === 'All' || opp.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      
      {/* 1. Shared Framed Editorial Events & Success Slider (Identical on Student & Alumni views) */}
      <HeroSlider />

      {/* 2. Active Hall Announcements Feed */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
            <Flame className="w-4 h-4 text-zinc-200" />
            <span>Patel Hall Announcements & Notices</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">Live Campus Feed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements?.map(ann => (
            <div
              key={ann.id}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {ann.tag}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">{ann.datetime}</span>
                </div>
                <h4 className="font-extrabold text-sm text-white pt-1">
                  {ann.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {ann.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{ann.location}</span>
                </div>
                <span className="text-zinc-500 font-mono text-[10px]">Patel Hall Verified</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Openings & Drives */}
      <section className="space-y-4">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
            <Briefcase className="w-4 h-4 text-zinc-200" />
            <span>Alumni Openings & Drives ({filteredOpps.length})</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs overflow-x-auto">
            {['All', 'Full-time Job', 'Internship (6 Months)', 'Referral Spot'].map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  typeFilter === t
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by role title, company (Stripe, Uber, DeepMind), or skill tags..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-medium transition-colors"
          />
        </div>

        {/* Drives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOpps.map(opp => (
            <div
              key={opp.id}
              className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                      {opp.company} • {opp.type}
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-0.5">
                      {opp.title}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                    opp.status === 'Active' ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-zinc-950 text-zinc-500 border-zinc-800'
                  }`}>
                    {opp.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-400">
                  <span className="font-mono font-bold text-white">
                    {opp.salary}
                  </span>
                  <span>•</span>
                  <span>{opp.location}</span>
                  <span>•</span>
                  <span>
                    POC: <strong className="text-zinc-200">{opp.alumName}</strong> ({opp.alumBatch})
                  </span>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {opp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {opp.batchEligibility && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800 font-bold">
                      {opp.batchEligibility}
                    </span>
                  )}
                  {opp.tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-950 text-zinc-400 border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                <span className="text-[11px] text-zinc-500 font-mono">
                  {opp.applicantsCount || 0} applicants
                </span>

                <button
                  onClick={() => setSelectedOpportunityForApply(opp)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs shadow-sm transition-all cursor-pointer"
                >
                  <span>1-Click Apply</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
