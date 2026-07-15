import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LuxuryWebGLShowcase } from './LuxuryWebGLShowcase';
import { LuxuryButton } from './LuxuryButton';

// Visual category item types
interface CategoryItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  img: string;
  fallback: string;
  prodId: string;
  colorBg: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'serums',
    num: '01',
    title: 'Serums',
    subtitle: 'DEEP REPAIR & ACTIVE COLLAGEN',
    img: '/Serums.png',
    fallback: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800',
    prodId: 'super-retinol-vitamin-a',
    colorBg: '#FAF5F0'
  },
  {
    id: 'toners',
    num: '02',
    title: 'Toners',
    subtitle: 'HYDRATION BALANCER & ESSENCE',
    img: '/Toners.png',
    fallback: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800',
    prodId: 'glow-remedy-hydrating-essence',
    colorBg: '#FAF5F0'
  },
  {
    id: 'sun_protections',
    num: '03',
    title: 'Sun Protection',
    subtitle: 'UV SHIELD BROAD SPECTRUM',
    img: '/sun protections.png',
    fallback: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800',
    prodId: 'golden-reset-radiance-oil',
    colorBg: '#FAF5F0'
  },
  {
    id: 'hair_care',
    num: '04',
    title: 'Hair Care',
    subtitle: 'NURTURING BOTANICAL REPAIR',
    img: '/hair care.png',
    fallback: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800',
    prodId: 'overachiever-balm-cleanser',
    colorBg: '#FAF5F0'
  }
];

export const LuxuryCategoryShowcase: React.FC<{
  onNavigate: (view: string, productId?: string) => void;
  settings: {
    colorText: string;
    colorButton: string;
  };
}> = ({ onNavigate, settings }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHoverSection = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 bg-[#FAF5F0] border-b border-stone-200/40 relative overflow-hidden">
      
      <div className="max-w-[1530px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Large Editorial Typography & Category List Vertical Menu */}
        <div className="lg:col-span-5 text-left space-y-6 sm:space-y-10">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e76f51] font-bold block mb-1.5">
              BUILD YOUR SKIN RITUALS
            </span>
            <h2 className="font-heading italic text-2xl sm:text-4xl lg:text-5xl leading-[1.1] text-stone-900 tracking-tight">
              Curated Essentials
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-sm leading-relaxed">
              Every step works in premium, clinical synergy to synchronize hydration, cell barrier integrity, and natural light reflection.
            </p>
          </div>

          {/* LIST BOX */}
          <div className="flex flex-col space-y-0.5 border-t border-stone-900/10 pt-3">
            {CATEGORIES.map((cat, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => handleHoverSection(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className="group py-3 sm:py-5 border-b border-stone-900/10 cursor-pointer flex items-baseline justify-between transition-all duration-300 relative"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    {/* Numeric prefix */}
                    <span className="font-mono text-[10px] sm:text-xs text-stone-900/40 tracking-wider">
                      {cat.num}
                    </span>
                    
                    {/* Large Luxurious Category Name */}
                    <span 
                      className={`font-heading italic text-xl sm:text-3xl lg:text-4xl transition-all duration-500 ease-out select-none relative ${
                        isActive 
                          ? 'text-stone-900 font-bold scale-[1.01] translate-x-1' 
                          : 'text-stone-900/45 group-hover:text-stone-900/75 group-hover:translate-x-0.5'
                      }`}
                    >
                      {cat.title}
                      
                      {/* Premium elegant bottom line sliding-expand interaction */}
                      <span 
                        className={`absolute left-0 -bottom-1 h-[1.5px] bg-stone-900 transition-all duration-500 ease-out ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-1/3'
                        }`}
                      />
                    </span>
                  </div>

                  {/* Tiny subtitle showing active status metadata */}
                  <span className={`font-mono text-[9px] uppercase tracking-widest hidden sm:inline-block transition-opacity duration-500 ${
                    isActive ? 'opacity-80 text-[#e76f51]' : 'opacity-25'
                  }`}>
                    {cat.subtitle}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Luxury Button Trigger */}
          <div className="pt-1.5">
            <LuxuryButton
              onClick={() => onNavigate('product', CATEGORIES[activeIndex].prodId)}
              className="px-6 py-3 sm:px-8 sm:py-4 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FAF5F0] rounded cursor-pointer block text-center shadow-sm bg-[#1c1917] hover:bg-stone-850"
              label={`Shop Active ${CATEGORIES[activeIndex].title} →`}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Feature Image with elegant premium WebGL horizontal liquid displacement shader */}
        <div className="lg:col-span-7 relative h-[280px] sm:h-[480px] lg:h-[560px] w-full rounded-2xl overflow-hidden shadow-2xl flex items-end border border-stone-200/20 bg-stone-100 group">
          
          <LuxuryWebGLShowcase activeIndex={activeIndex} categories={CATEGORIES} />

          {/* Luxury Gradient Overlay for readability mask and cinematic depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none z-10" />

          {/* Hover floating dynamic tag info banner inside layout */}
          <div className="relative z-20 p-8 text-white w-full flex justify-between items-end">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#F2A183] block">
                Premium skincare series
              </span>
              <motion.h3 
                key={`h3-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="font-heading italic text-2xl sm:text-3xl font-bold tracking-tight mt-1"
              >
                {CATEGORIES[activeIndex].title}
              </motion.h3>
            </div>
            
            <span className="font-mono text-xs opacity-60">
              {CATEGORIES[activeIndex].num} / 04
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
