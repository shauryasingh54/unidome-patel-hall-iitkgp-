import React from 'react';
import { MoreVertical, Clock, UserCheck, ArrowRight, Tag } from 'lucide-react';

export const OpportunityCard = ({ opportunity, index, onApply }) => {
  // Map index to soft pastel card variants matching reference photo
  const pastelVariants = [
    {
      bgClass: 'card-pastel-cyan',
      progressColor: 'bg-cyan-500',
      progressPercent: '90%',
      timeTag: '2 Days Left',
      subCategory: 'Prototyping & System Design'
    },
    {
      bgClass: 'card-pastel-peach',
      progressColor: 'bg-orange-500',
      progressPercent: '30%',
      timeTag: '3 weeks left',
      subCategory: 'Shopping & Microservices'
    },
    {
      bgClass: 'card-pastel-mint',
      progressColor: 'bg-emerald-500',
      progressPercent: '50%',
      timeTag: '2 weeks left',
      subCategory: 'Medical & Multimodal AI'
    },
    {
      bgClass: 'card-pastel-pink',
      progressColor: 'bg-pink-500',
      progressPercent: '20%',
      timeTag: '5 weeks left',
      subCategory: 'Wireframing & FinTech'
    }
  ];

  const variant = pastelVariants[index % pastelVariants.length];

  return (
    <div className={`group relative rounded-3xl border p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${variant.bgClass}`}>
      
      <div>
        {/* Top Header: Date & Menu */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
            {opportunity.postedDate || 'July 2, 2026'}
          </span>
          <button className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Job Title & SubCategory */}
        <div className="text-center my-4 space-y-1">
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {opportunity.title}
          </h3>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {opportunity.company} • {variant.subCategory}
          </p>
        </div>

        {/* Progress Bar with Percentage (matching reference photo) */}
        <div className="my-5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold">
            <span className="text-slate-500 dark:text-slate-400">Progress</span>
            <span className="text-slate-900 dark:text-white">{variant.progressPercent}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden">
            <div
              style={{ width: variant.progressPercent }}
              className={`h-full rounded-full transition-all duration-500 ${variant.progressColor}`}
            />
          </div>
        </div>
      </div>

      {/* Footer Row: Avatars + Time Tag & Apply CV Action */}
      <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-2">
        
        {/* Candidate & ALUM Avatars Stack */}
        <div className="flex items-center -space-x-2">
          <img
            src={opportunity.alumAvatar}
            alt={opportunity.alumName}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-white dark:ring-slate-900 shadow-sm"
            title={`ALUM POC: ${opportunity.alumName} (${opportunity.alumBatch})`}
          />
          <div className="h-8 w-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center font-bold text-xs shadow-sm">
            +3
          </div>
        </div>

        {/* Time Remaining Pill & Apply CV Button */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
            {variant.timeTag}
          </span>
          
          <button
            onClick={() => onApply(opportunity)}
            className="p-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 transition-transform shadow-md"
            title="Apply CV"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
