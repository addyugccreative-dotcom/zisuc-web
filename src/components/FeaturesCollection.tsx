import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ShoppingCart, ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import { mockProducts } from '../products-data';
import { Product } from '../types';
import { Currency, convertAndFormatPrice, SUPPORTED_CURRENCIES } from '../lib/currency';

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
  const activeCurrency = currentCurrency || SUPPORTED_CURRENCIES[0];
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const list = products && products.length > 0 ? products : mockProducts;

  // Local active states for multiple colors per product in slider
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({});

  // Hover states for individual product action tooltips
  const [hoveredAction, setHoveredAction] = useState<{ productId: string; action: 'cart' | 'view' | null }>({
    productId: '',
    action: null
  });

  // Quick View Modal states
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [quickViewColorIdx, setQuickViewColorIdx] = useState<number>(0);
  const [quickViewQty, setQuickViewQty] = useState<number>(1);
  const [quickViewActiveTab, setQuickViewActiveTab] = useState<'desc' | 'ingredients' | 'use'>('desc');

  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.75;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const triggerQuickView = (prod: Product, defaultColorIdx: number) => {
    setSelectedQuickViewProduct(prod);
    setQuickViewColorIdx(defaultColorIdx);
    setQuickViewQty(1);
    setQuickViewActiveTab('desc');
  };

  const handleQuickViewAddToCart = () => {
    if (selectedQuickViewProduct && onAddToCart) {
      onAddToCart(selectedQuickViewProduct, quickViewQty, quickViewColorIdx);
      setSelectedQuickViewProduct(null);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FCF9F5] py-20 px-4 sm:px-8 md:px-16 lg:px-24 select-text max-w-[1530px] mx-auto w-full border-t border-stone-200/30 overflow-hidden"
    >
      {/* 1. TOP BLOCK: GRID & STAGGERED LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24">
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

      {/* 2. BOTTOM BLOCK: CURATED PRODUCTS CAROUSEL SLIDER */}
      <div className="relative mt-12 pt-8 border-t border-stone-200/50">
        
        {/* Navigation Arrow controls vertically aligned */}
        <div className="absolute top-1/2 -left-3 sm:-left-6 z-30 -translate-y-1/2">
          <button 
            onClick={() => handleScroll('left')}
            className="w-10 h-10 rounded-full bg-white border border-stone-200/60 shadow-sm flex items-center justify-center text-stone-500 hover:text-stone-900 transition hover:scale-105 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 ml-[-2px]" />
          </button>
        </div>
        
        <div className="absolute top-1/2 -right-3 sm:-right-6 z-30 -translate-y-1/2">
          <button 
            onClick={() => handleScroll('right')}
            className="w-10 h-10 rounded-full bg-white border border-stone-200/60 shadow-sm flex items-center justify-center text-stone-500 hover:text-stone-900 transition hover:scale-105 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 ml-[2px]" />
          </button>
        </div>

        {/* Carousel Container */}
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 pb-8 pt-4 hide-scrollbar snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {list.map((item, idx) => {
            const currentSelectedColorIdx = selectedColors[item.id] || 0;
            const activeColor = item.colors[currentSelectedColorIdx];
            const activeImage = item.images[currentSelectedColorIdx] || item.images[0];

            return (
              <div 
                key={`${item.id}-${idx}`}
                className="flex-shrink-0 w-[240px] sm:w-[280px] lg:w-[320px] flex flex-col group snap-center"
              >
                {/* Image Container with Actions */}
                <div className="aspect-[4/5] bg-white rounded-lg border border-stone-200/50 overflow-hidden relative shadow-xs flex items-center justify-center p-4">
                  {/* Sale Badge */}
                  {item.compareAtPrice && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-1 rounded-sm z-20 shadow-xs">
                      SALE
                    </div>
                  )}
                  
                  {/* Product Image */}
                  <div 
                    className="w-full h-full relative cursor-pointer"
                    onClick={() => onNavigate?.('product', item.id)}
                  >
                    <img decoding="async" loading="lazy" 
                      src={activeImage} 
                      alt={item.title}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[1.2s] group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="absolute right-3 bottom-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20 delay-100">
                    <button 
                      onClick={(e) => { e.stopPropagation(); triggerQuickView(item, currentSelectedColorIdx); }}
                      onMouseEnter={() => setHoveredAction({ productId: item.id, action: 'view' })}
                      onMouseLeave={() => setHoveredAction({ productId: item.id, action: null })}
                      className="relative w-9 h-9 rounded-full bg-white border border-stone-200 text-stone-600 flex items-center justify-center shadow-md overflow-hidden group/btn cursor-pointer"
                      aria-label="Quick view"
                    >
                      <div className="absolute inset-0 bg-stone-100 translate-y-[102%] group-hover/btn:translate-y-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <Eye className="w-4 h-4 relative z-10 transition-transform duration-[350ms] ease-out group-hover/btn:-translate-y-[1px]" />
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart?.(item, 1, currentSelectedColorIdx); }}
                      onMouseEnter={() => setHoveredAction({ productId: item.id, action: 'cart' })}
                      onMouseLeave={() => setHoveredAction({ productId: item.id, action: null })}
                      className="relative w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-md overflow-hidden group/btn cursor-pointer"
                      aria-label="Add to cart"
                    >
                      <div className="absolute inset-0 bg-stone-800 translate-y-[102%] group-hover/btn:translate-y-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <ShoppingCart className="w-4 h-4 relative z-10 transition-transform duration-[350ms] ease-out group-hover/btn:-translate-y-[1px]" />
                    </button>
                  </div>
                </div>

                {/* Swatches Indicators - Hidden based on request? The request was about product card and product page. Wait, "FROM MY WEBSITE PRODUCT PAGE ALSO AND FORM HOME PAGE REMOVE THE SELECT COLOR OPTION". I will remove this part completely. */}

                {/* Text Info block */}
                <div className="text-left mt-3">
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block font-mono">{item.vendor}</span>
                  <h3 
                    className="font-subheading text-[13px] uppercase font-semibold tracking-wide text-neutral-800 mt-1 line-clamp-1 cursor-pointer hover:underline"
                    onClick={() => onNavigate?.('product', item.id)}
                  >
                    {item.title}
                  </h3>
                  
                  {/* Rating stars & pricing */}
                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {Array(5).fill(null).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
                      ))}
                      <span className="text-[9px] text-stone-400 font-mono pl-1">({item.reviewsCount})</span>
                    </div>
                    <div className="flex items-baseline space-x-2 font-mono text-sm font-semibold">
                      <span className="text-stone-900">{convertAndFormatPrice(item.price, activeCurrency)}</span>
                      {item.compareAtPrice && (
                        <span className="line-through text-gray-400 text-xs font-normal">{convertAndFormatPrice(item.compareAtPrice, activeCurrency)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. QUICK VIEW MODAL COMPONENT */}
      <AnimatePresence>
        {selectedQuickViewProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuickViewProduct(null)}
              className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="bg-[#FCF9F5] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative z-10 flex flex-col md:flex-row p-6 sm:p-8 gap-8 border border-stone-200/50"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedQuickViewProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-900 flex items-center justify-center shadow-md cursor-pointer transition z-50 hover:scale-105"
                aria-label="Close Quick View"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Product Image Gallery */}
              <div className="w-full md:w-1/2 flex flex-col space-y-4">
                <div className="aspect-[4/5] bg-white rounded-lg border border-stone-200/40 overflow-hidden relative flex items-center justify-center p-4">
                  <img decoding="async" loading="lazy" 
                    src={selectedQuickViewProduct.images[0]} 
                    alt={selectedQuickViewProduct.title} 
                    className="w-full h-full object-contain mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Column: Details & Actions */}
              <div className="w-full md:w-1/2 flex flex-col text-left justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C0A890] font-bold block mb-1">
                    {selectedQuickViewProduct.vendor}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-stone-900 tracking-tight leading-tight font-normal">
                    {selectedQuickViewProduct.title}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-500 font-mono">({selectedQuickViewProduct.reviewsCount} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 text-lg sm:text-xl font-bold text-stone-950 mb-6">
                    <span>{convertAndFormatPrice(selectedQuickViewProduct.price, activeCurrency)}</span>
                    {selectedQuickViewProduct.compareAtPrice && (
                      <span className="line-through text-stone-400 text-sm font-normal">
                        {convertAndFormatPrice(selectedQuickViewProduct.compareAtPrice, activeCurrency)}
                      </span>
                    )}
                  </div>

                  {/* Tabs Description/Ingredients/Use */}
                  <div className="border-b border-stone-200 mb-4 flex gap-4 text-xs font-mono font-bold tracking-wider uppercase">
                    {[
                      { id: 'desc', label: 'About' },
                      { id: 'ingredients', label: 'Ingredients' },
                      { id: 'use', label: 'How to Use' }
                    ].map((tab) => (
                      <button 
                        key={tab.id}
                        onClick={() => setQuickViewActiveTab(tab.id as any)}
                        className={`pb-2 border-b-2 transition cursor-pointer ${
                          quickViewActiveTab === tab.id ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Contents */}
                  <div className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 h-28 overflow-y-auto">
                    {quickViewActiveTab === 'desc' && <p>{selectedQuickViewProduct.description}</p>}
                    {quickViewActiveTab === 'ingredients' && <p>{selectedQuickViewProduct.ingredients}</p>}
                    {quickViewActiveTab === 'use' && <p>{selectedQuickViewProduct.howToUse}</p>}
                  </div>
                </div>

                {/* Quantity and Checkout Trigger */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center border-t border-stone-200/60 pt-4 mt-auto">
                  {/* Quantity picker */}
                  <div className="flex items-center justify-between border border-stone-300 rounded bg-white h-12 px-3 min-w-[110px]">
                    <button 
                      onClick={() => setQuickViewQty(prev => Math.max(1, prev - 1))}
                      className="text-stone-500 hover:text-stone-900 text-lg font-bold w-6 text-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm text-stone-900 font-bold">{quickViewQty}</span>
                    <button 
                      onClick={() => setQuickViewQty(prev => prev + 1)}
                      className="text-stone-500 hover:text-stone-900 text-lg font-bold w-6 text-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Main Add Button */}
                  <button 
                    onClick={handleQuickViewAddToCart}
                    className="flex-1 h-12 bg-[#1c1917] hover:bg-stone-800 text-[#FAF5F0] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    ADD TO BAG • {convertAndFormatPrice(selectedQuickViewProduct.price, activeCurrency)}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
