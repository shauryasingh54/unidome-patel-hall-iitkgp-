import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Flame,
  ArrowUpRight
} from 'lucide-react';

export const HeroSlider = () => {
  const { heroSlides } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 6 seconds unless paused on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  const handlePrev = () => {
    setCurrentSlideIndex(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex(prev => (prev + 1) % heroSlides.length);
  };

  // 2 cards side-by-side on desktop
  const activeSlide = heroSlides[currentSlideIndex];
  const nextSlide = heroSlides[(currentSlideIndex + 1) % heroSlides.length];

  const renderEditorialCard = (slide) => (
    <div className="surface-card relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-maroon-200 dark:hover:border-maroon-700">

      {/* Top Half: Bold Typography & Brand Tag */}
      <div className="p-6 sm:p-7 space-y-3 z-10">
        <div className="flex items-center justify-between">
          <span className="text-mono-meta font-black uppercase tracking-widest">
            {slide.brandLogo || 'PATEL HALL NETWORK'}
          </span>
          <span className="pill-brand">
            {slide.bannerPill || slide.tag}
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-heading tracking-tight leading-tight">
            {slide.title}
          </h2>
          <p className="text-sm text-muted font-medium mt-1.5">
            {slide.headline || slide.description}
          </p>
        </div>
      </div>

      {/* Middle Center: Editorial Product/Event Framed Hero Image */}
      <div className="relative w-full h-56 sm:h-64 px-6 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full rounded-2xl overflow-hidden border border-maroon-100 dark:border-sand-700 shadow-inner relative group-hover:scale-[1.02] transition-transform duration-500">
          <img
            src={slide.coverImage}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/75 via-transparent to-transparent" />

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold px-2">
            <div className="flex items-center gap-1.5 text-[11px]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{slide.datetime}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[130px]">{slide.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Offer Pill Bar */}
      <div className="p-6 sm:p-7 pt-4 space-y-2.5">
        <div className="surface-sunken p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-maroon-700 text-peach-50 font-black text-xs flex items-center justify-center shrink-0">
              PH
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs text-heading block truncate">
                {slide.promoFooter || 'Verified Hall Referral & AMA Access'}
              </span>
              <span className="text-mono-meta block">
                {slide.promoFooterHighlight || 'Exclusive Placement Node'}
              </span>
            </div>
          </div>

          <span className="pill-accent shrink-0 font-mono">
            {slide.badge}
          </span>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted font-mono px-1">
          <span>{slide.termsText || '*Terms & Hall Verification Apply'}</span>
          <span className="text-maroon-600 flex items-center gap-0.5 hover:underline cursor-pointer">
            Details <ArrowUpRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>

    </div>
  );

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="space-y-4"
    >
      {/* Slider Top Header & Controls */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-label">
          <Flame className="w-4 h-4" />
          <span>Hall Events & Success Stories Showcase</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 mr-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'w-6 bg-maroon-700'
                    : 'w-2 bg-sand-200 dark:bg-sand-700 hover:bg-maroon-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="btn-ghost p-1.5"
            title="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="btn-ghost p-1.5"
            title="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dual Card Carousel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {renderEditorialCard(activeSlide)}
        <div className="hidden md:block">
          {renderEditorialCard(nextSlide)}
        </div>
      </div>

    </div>
  );
};
