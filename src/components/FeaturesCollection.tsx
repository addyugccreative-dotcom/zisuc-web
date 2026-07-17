import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Currency } from '../lib/currency';

interface FeaturesCollectionProps {
  onNavigate?: (page: 'home' | 'product' | 'about' | 'certificates' | 'contact' | 'partners', productId?: string) => void;
  onAddToCart?: (product: Product, quantity: number, colorIdx: number) => void;
  onShopAll?: () => void;
  currentCurrency?: Currency;
  products?: Product[];
}

export const FeaturesCollection: React.FC<FeaturesCollectionProps> = ({ 
  onNavigate, 
  onAddToCart,
  onShopAll,
  currentCurrency,
  products
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FCF9F5] py-20 px-4 sm:px-8 md:px-16 lg:px-24 select-text max-w-[1530px] mx-auto w-full border-t border-stone-200/30 overflow-hidden"
    >
      {/* 1. TOP BLOCK: GRID & STAGGERED LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Column 1: Left (Three Women Image & Description) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden bg-[#FAF5F0] border border-stone-200/40 relative aspect-[4/5] w-full shadow-xs rounded-lg"
          >
            <motion.img 
              initial={{ scale: 1.25 }}
              whileInView={{ scale: 1.0 }}
              whileHover={{ scale: 1.15, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src="/peaches skin portrait image.png" 
              alt="ZISU'C Skincare Collection" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xs text-left font-serif italic">
            Our skincare can be easily incorporated into your routine, delivering incredible results alongside your products.
          </p>
        </div>

        {/* Right Area (Column 2 & 3 equivalent): spans 8 columns in lg */}
        <div className="lg:col-span-8 flex flex-col space-y-12">
          
          {/* Row 1: Heading block */}
          <div className="text-left max-w-2xl">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C0A890] font-bold block mb-3 select-none">
              FEATURES COLLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] leading-[1.15] text-stone-900 tracking-tight font-normal">
              Curated to <span className="italic font-light">nourish</span> your skin, <br className="hidden md:block" />
              <span className="italic font-light">pamper</span> your body, and <br className="hidden md:block" />
              <span className="italic font-light">elevate</span> your natural beauty.
            </h2>
            <button 
              onClick={(e) => {
                e.preventDefault();
                onShopAll?.();
              }}
              className="mt-6 font-mono text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-1 hover:opacity-75 transition duration-200 cursor-pointer flex items-center gap-1"
            >
              SHOP ALL <span className="text-sm font-sans">&rarr;</span>
            </button>
          </div>

          {/* Row 2: Staggered images */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 items-end">
            
            {/* Middle Image (Frame 1 - Smaller) */}
            <div className="flex flex-col space-y-4 sm:col-span-2">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="overflow-hidden bg-[#FAF5F0] border border-stone-200/40 relative aspect-[4/5] w-full shadow-xs rounded-lg"
              >
                <motion.img 
                  initial={{ scale: 1.25 }}
                  whileInView={{ scale: 1.0 }}
                  whileHover={{ scale: 1.15, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src="/image frame 1.png" 
                  alt="Aesthetic Skin Rituals" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Right Image (Frame 2 - Larger) */}
            <div className="flex flex-col space-y-4 sm:col-span-3">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="overflow-hidden bg-[#FAF5F0] border border-stone-200/40 relative aspect-[4/5] w-full shadow-xs rounded-lg"
              >
                <motion.img 
                  initial={{ scale: 1.25 }}
                  whileInView={{ scale: 1.0 }}
                  whileHover={{ scale: 1.15, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src="/image frame 2.png" 
                  alt="Radiant Glow Skincare" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </motion.section>
  );
};
