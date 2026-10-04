import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSlider } from '../AlumniPortal/HeroSlider';
import { MapPin, Flame } from 'lucide-react';

export const HallLife = () => {
  const { announcements } = useApp();

  return (
    <div className="space-y-8">

      <HeroSlider />

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-label">
          <Flame className="w-4 h-4" />
          <span>Patel Hall Announcements & Notices</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {announcements?.map(ann => (
            <div key={ann.id} className="surface-card p-5 hover:border-maroon-200 dark:hover:border-maroon-700 transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="pill-brand">{ann.tag}</span>
                  <span className="text-mono-meta">{ann.datetime}</span>
                </div>
                <h4 className="font-extrabold text-sm text-heading pt-1">{ann.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{ann.description}</p>
              </div>

              <div className="pt-3 border-t divider flex items-center justify-between text-xs text-muted font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{ann.location}</span>
                </div>
                <span className="text-mono-meta">Patel Hall Verified</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
