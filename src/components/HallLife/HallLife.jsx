import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSlider } from '../AlumniPortal/HeroSlider';
import { MapPin } from 'lucide-react';

export const HallLife = () => {
  const { announcements } = useApp();

  return (
    <div className="space-y-10">

      <section className="surface-band rounded-2xl px-7 py-9 sm:px-10 sm:py-12 reveal relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="relative max-w-2xl">
          <span className="text-label text-peach-300 reveal reveal-2">Patel Hall Community</span>
          <h1 className="display text-4xl sm:text-6xl text-peach-50 mt-3 leading-[1.02] reveal reveal-3">
            Hall Life & Traditions
          </h1>
          <p className="text-peach-200/80 mt-4 text-base sm:text-lg max-w-lg reveal reveal-4">
            Festivals, events and success stories from the Patel Hall family.
          </p>
        </div>
      </section>

      <div className="reveal reveal-3">
        <HeroSlider />
      </div>

      <section className="space-y-2 reveal reveal-4">
        <span className="text-label">Announcements & Notices</span>
        <div className="border-t divider">
          {announcements?.map(ann => (
            <div key={ann.id} className="ruled-row flex-col sm:flex-row sm:items-start">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="pill-brand">{ann.tag}</span>
                  <span className="text-mono-meta">{ann.datetime}</span>
                </div>
                <h4 className="font-bold text-base text-heading">{ann.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{ann.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted shrink-0">
                <MapPin className="w-3.5 h-3.5" />
                <span>{ann.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
