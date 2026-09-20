import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Flame,
  Sparkles,
  ArrowUpRight,
  Info
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
    <div className="relative rounded-3xl bg-[#18181c] border border-zinc-800/90 overflow-hidden shadow-2xl flex flex-col justify-between group transition-all duration-300 hover:border-zinc-700">
      
      {/* Top Half: Bold Typography & Brand Tag */}
      <div className="p-6 sm:p-7 space-y-3 z-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-black uppercase tracking-widest text-zinc-400">
            {slide.brandLogo || 'PATEL HALL NETWORK'}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-800 text-zinc-200 border border-zinc-700">
            {slide.bannerPill || slide.tag}
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            {slide.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1">
            {slide.headline || slide.description}
          </p>
        </div>
      </div>

      {/* Middle Center: Editorial Product/Event Framed Hero Image */}
      <div className="relative w-full h-56 sm:h-64 px-6 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full rounded-2xl overflow-hidden border border-zinc-700/60 shadow-inner relative group-hover:scale-[1.02] transition-transform duration-500">
          <img
            src={slide.coverImage}
            alt={slide.title}
            className="w-full h-full object-cover grayscale contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold px-2">
            <div className="flex items-center gap-1.5 text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-zinc-300" />
              <span>{slide.datetime}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-zinc-300 font-mono">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[130px]">{slide.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Offer Pill Bar (Like Amazon/FabIndia card reference) */}
      <div className="p-6 sm:p-7 pt-4 space-y-2.5">
        <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-xl bg-white text-black font-black text-xs flex items-center justify-center shrink-0">
              PH
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs text-white block truncate">
                {slide.promoFooter || 'Verified Hall Referral & AMA Access'}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono block">
                {slide.promoFooterHighlight || 'Exclusive Placement Node'}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-black bg-white text-zinc-950 shrink-0">
            {slide.badge}
          </span>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono px-1">
          <span>{slide.termsText || '*Terms & Hall Verification Apply'}</span>
          <span className="text-zinc-400 flex items-center gap-0.5 hover:text-white cursor-pointer">
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
      className="space-y-3"
    >
      {/* Slider Top Header & Controls */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
          <Flame className="w-4 h-4 text-zinc-200" />
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
                    ? 'w-6 bg-white'
                    : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
            title="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
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
