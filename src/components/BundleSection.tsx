import React, { useState } from 'react';
import { Plus, Eye, ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CustomizerSettings } from '../types';
import { Currency, convertAndFormatPrice } from '../lib/currency';
import { mockProducts } from '../products-data';

interface BundleSectionProps {
  activeCurrency: Currency;
  onAddToCart: (product: Product, quantity: number, colorIdx: number) => void;
  themeColor: string;
  products?: Product[];
}

export const BundleSection: React.FC<BundleSectionProps> = ({
  activeCurrency,
  onAddToCart,
  themeColor,
  products,
}) => {
  const list = products && products.length > 0 ? products : mockProducts;
  
  // Find the three products for the bundle dynamically (Cleanser, Pad, Cream)
  const prod1 = list.find(p => p.id.toLowerCase().includes('e-bap') || p.id.toLowerCase().includes('powder-cleanser')) 
    || mockProducts.find(p => p.id.toLowerCase().includes('e-bap') || p.id.toLowerCase().includes('powder-cleanser'))
    || list[0]
    || mockProducts[0];
  const prod2 = list.find(p => p.id.toLowerCase().includes('galachione') || p.id.toLowerCase().includes('ampoule-pad'))
    || mockProducts.find(p => p.id.toLowerCase().includes('galachione') || p.id.toLowerCase().includes('ampoule-pad'))
    || list[Math.min(1, list.length - 1)]
    || mockProducts[1];
  const prod3 = list.find(p => p.id.toLowerCase().includes('kira') || p.id.toLowerCase().includes('tide') || p.id.toLowerCase().includes('cream'))
    || mockProducts.find(p => p.id.toLowerCase().includes('kira') || p.id.toLowerCase().includes('tide') || p.id.toLowerCase().includes('cream'))
    || list[Math.min(2, list.length - 1)]
    || mockProducts[2];

  // Helper functions for dynamic product rendering
  const parsePriceToNumber = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  };

  const getDiscountPercent = (priceStr: string, compareStr?: string): number => {
    if (!compareStr) return 0;
    const p = parsePriceToNumber(priceStr);
    const c = parsePriceToNumber(compareStr);
    if (c <= p) return 0;
    return Math.round(((c - p) / c) * 100);
  };

  const getProductSwatches = (prod: Product) => {
    if (prod.colors && prod.colors.length > 0) {
      return prod.colors;
    }
    return [{ name: "Default", hex: "#78716c" }];
  };

  const getProductImage = (prod: Product, colorIdx: number) => {
    if (prod.images && prod.images.length > 0) {
      return prod.images[colorIdx] || prod.images[0];
    }
    return "/placeholder.png";
  };

  // Get dynamic swatches for the 3 products
  const prod1Colors = getProductSwatches(prod1);
  const prod2Colors = getProductSwatches(prod2);
  const prod3Colors = getProductSwatches(prod3);

  // Active swatch states for each product
  const [colorIdx1, setColorIdx1] = useState(0);
  const [colorIdx2, setColorIdx2] = useState(0);
  const [colorIdx3, setColorIdx3] = useState(0);

  // Success state for adding to cart
  const [addedStatus, setAddedStatus] = useState<'idle' | 'adding' | 'success'>('idle');

  // Hover state for the big add-all button
  const [isHovered, setIsHovered] = useState(false);

  // Quick view details modal state
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);

  // Tooltip hover states for each of the 3 cards
  const [hoveredAction1, setHoveredAction1] = useState<'cart' | 'view' | null>(null);
  const [hoveredAction2, setHoveredAction2] = useState<'cart' | 'view' | null>(null);
  const [hoveredAction3, setHoveredAction3] = useState<'cart' | 'view' | null>(null);

  // Dynamic price computations
  const price1 = parsePriceToNumber(prod1.price);
  const price2 = parsePriceToNumber(prod2.price);
  const price3 = parsePriceToNumber(prod3.price);
  const totalPrice = price1 + price2 + price3;

  const compare1 = prod1.compareAtPrice ? parsePriceToNumber(prod1.compareAtPrice) : price1 * 1.25;
  const compare2 = prod2.compareAtPrice ? parsePriceToNumber(prod2.compareAtPrice) : price2 * 1.25;
  const compare3 = prod3.compareAtPrice ? parsePriceToNumber(prod3.compareAtPrice) : price3 * 1.25;
  const totalCompare = compare1 + compare2 + compare3;

  const totalDiscount = totalCompare - totalPrice;

  const handleAddAll = () => {
    setAddedStatus('adding');
    setTimeout(() => {
      // Add all 3 items to the cart
      onAddToCart(prod1, 1, colorIdx1);
      onAddToCart(prod2, 1, colorIdx2);
      onAddToCart(prod3, 1, colorIdx3);
      setAddedStatus('success');
      setTimeout(() => setAddedStatus('idle'), 2500);
    }, 800);
  };

  return (
    <div className="w-full bg-[#FDFBF7] pt-24 pb-0 border-t border-stone-200/60 relative flex flex-col">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center flex-grow mb-16">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-stone-400 uppercase mb-4">
            PERFECTLY PAIRED ROUTINE
          </p>
          <h2 className="text-3xl sm:text-[44px] font-serif italic font-normal text-stone-900 tracking-tight leading-none mb-3">
            Glow essentials bundle
          </h2>
          <p className="text-stone-500 font-sans text-xs sm:text-[14px] font-light max-w-xl mx-auto leading-relaxed tracking-wide mb-0">
            Save when you purchase our daily triple-step system. Purify, hydrate, and seal in organic nutrients.
          </p>
        </div>

        {/* Bundle Grid: 3-column layout side-by-side on mobile horizontally using grid-cols-5 to include plus separators */}
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] lg:flex lg:flex-row items-stretch justify-between gap-1 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
          {/* Card 1: Cleanser */}
          <div className="col-span-1 lg:flex-1 bg-white border border-stone-100 flex flex-col group relative p-1 sm:p-4 lg:p-5 transition-shadow hover:shadow-lg rounded-[3px] sm:rounded-none">
            {/* Dynamic Discount Badge */}
            {getDiscountPercent(prod1.price, prod1.compareAtPrice) > 0 && (
              <div className="absolute top-1 sm:top-4 left-1 sm:left-4 z-10">
                <span className="px-1 py-0.5 sm:px-2.5 sm:py-1.5 bg-[#AC1D22] text-white text-[7px] sm:text-[10px] font-sans font-bold tracking-wider uppercase select-none rounded-[2px] sm:rounded-[4px] shadow-sm flex items-center gap-1">
                  SAVE {getDiscountPercent(prod1.price, prod1.compareAtPrice)}%
                </span>
              </div>
            )}

            {/* Image display */}
            <div className="w-full aspect-square bg-[#FAF6F3] flex items-center justify-center p-1 sm:p-4 relative overflow-hidden h-16 xs:h-24 sm:h-36 md:h-48 lg:h-auto">
              <img
                src={getProductImage(prod1, colorIdx1)}
                alt={prod1.title}
                className="max-h-[55px] xs:max-h-[80px] sm:max-h-[120px] lg:max-h-[250px] h-[85%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Hover Buttons (Only on Desktop) */}
              <div className="hidden lg:flex absolute right-4 bottom-4 flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {/* Quick view button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectedQuickView(prod1)}
                    onMouseEnter={() => setHoveredAction1('view')}
                    onMouseLeave={() => setHoveredAction1(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Quick View Product"
                  >
                    <Eye className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    <Eye className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  <AnimatePresence>
                    {hoveredAction1 === 'view' && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-xl whitespace-nowrap z-30"
                      >
                        QUICK VIEW
                        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-black rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Add to cart button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(prod1, 1, colorIdx1);
                      const btn = document.getElementById('toast-trigger');
                      if (btn) btn.click();
                    }}
                    onMouseEnter={() => setHoveredAction1('cart')}
                    onMouseLeave={() => setHoveredAction1(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Add product to cart"
                  >
                    <ShoppingCart className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    <ShoppingCart className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  <AnimatePresence>
                    {hoveredAction1 === 'cart' && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-xl whitespace-nowrap z-30"
                      >
                        ADD TO CART
                        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-black rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Product details */}
            <div className="text-left mt-1.5 sm:mt-6 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-[7px] xs:text-[8px] sm:text-[10px] font-mono font-semibold tracking-wider text-stone-400 uppercase">
                  {prod1.vendor}
                </p>
                <h3 className="font-serif text-stone-900 text-[10px] sm:text-xs lg:text-[17px] mt-0.5 sm:mt-1 leading-tight font-normal line-clamp-2 min-h-[2.4em] sm:min-h-0">
                  {prod1.title}
                </h3>
              </div>
              <div className="flex flex-wrap items-baseline gap-1 mt-1 sm:mt-3 font-sans">
                <span className="text-[#00C4BA] text-[11px] sm:text-sm lg:text-lg font-extrabold tracking-tight">
                  {convertAndFormatPrice(prod1.price, activeCurrency)}
                </span>
                {prod1.compareAtPrice && (
                  <span className="text-stone-400 text-[8px] sm:text-xs line-through font-mono">
                    {convertAndFormatPrice(prod1.compareAtPrice, activeCurrency)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Plus separator */}
          <div className="col-span-1 text-stone-300 font-light text-sm sm:text-lg lg:text-2xl select-none shrink-0 flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-stone-300" />
          </div>

          {/* Card 2: Ampoule Pad */}
          <div className="col-span-1 lg:flex-1 bg-white border border-stone-100 flex flex-col group relative p-1 sm:p-4 lg:p-5 transition-shadow hover:shadow-lg rounded-[3px] sm:rounded-none">
            {/* Dynamic Discount Badge */}
            {getDiscountPercent(prod2.price, prod2.compareAtPrice) > 0 && (
              <div className="absolute top-1 sm:top-4 left-1 sm:left-4 z-10">
                <span className="px-1 py-0.5 sm:px-2.5 sm:py-1.5 bg-[#AC1D22] text-white text-[7px] sm:text-[10px] font-sans font-bold tracking-wider uppercase select-none rounded-[2px] sm:rounded-[4px] shadow-sm flex items-center gap-1">
                  SAVE {getDiscountPercent(prod2.price, prod2.compareAtPrice)}%
                </span>
              </div>
            )}

            {/* Image display */}
            <div className="w-full aspect-square bg-[#FAF6F3] flex items-center justify-center p-1 sm:p-4 relative overflow-hidden h-16 xs:h-24 sm:h-36 md:h-48 lg:h-auto">
              <img
                src={getProductImage(prod2, colorIdx2)}
                alt={prod2.title}
                className="max-h-[55px] xs:max-h-[80px] sm:max-h-[120px] lg:max-h-[250px] h-[85%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Hover Buttons (Only on Desktop) */}
              <div className="hidden lg:flex absolute right-4 bottom-4 flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {/* Quick view button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectedQuickView(prod2)}
                    onMouseEnter={() => setHoveredAction2('view')}
                    onMouseLeave={() => setHoveredAction2(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Quick View Product"
                  >
                    <Eye className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    <Eye className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  <AnimatePresence>
                    {hoveredAction2 === 'view' && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-xl whitespace-nowrap z-30"
                      >
                        QUICK VIEW
                        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-black rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Add to cart button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(prod2, 1, colorIdx2);
                    }}
                    onMouseEnter={() => setHoveredAction2('cart')}
                    onMouseLeave={() => setHoveredAction2(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Add product to cart"
                  >
                    <ShoppingCart className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    <ShoppingCart className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  <AnimatePresence>
                    {hoveredAction2 === 'cart' && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-xl whitespace-nowrap z-30"
                      >
                        ADD TO CART
                        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-black rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Product details */}
            <div className="text-left mt-1.5 sm:mt-6 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-[7px] xs:text-[8px] sm:text-[10px] font-mono font-semibold tracking-wider text-stone-400 uppercase">
                  {prod2.vendor}
                </p>
                <h3 className="font-serif text-stone-900 text-[10px] sm:text-xs lg:text-[17px] mt-0.5 sm:mt-1 leading-tight font-normal line-clamp-2 min-h-[2.4em] sm:min-h-0">
                  {prod2.title}
                </h3>
              </div>
              <div className="flex flex-wrap items-baseline gap-1 mt-1 sm:mt-3 font-sans">
                <span className="text-[#00C4BA] text-[11px] sm:text-sm lg:text-lg font-extrabold tracking-tight">
                  {convertAndFormatPrice(prod2.price, activeCurrency)}
                </span>
                {prod2.compareAtPrice && (
                  <span className="text-stone-400 text-[8px] sm:text-xs line-through font-mono">
                    {convertAndFormatPrice(prod2.compareAtPrice, activeCurrency)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Plus separator */}
          <div className="col-span-1 text-stone-300 font-light text-sm sm:text-lg lg:text-2xl select-none shrink-0 flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-stone-300" />
          </div>

          {/* Card 3: Kira 60 Cream */}
          <div className="col-span-1 lg:flex-1 bg-white border border-stone-100 flex flex-col group relative p-1 sm:p-4 lg:p-5 transition-shadow hover:shadow-lg rounded-[3px] sm:rounded-none">
            {/* Dynamic Discount Badge */}
            {getDiscountPercent(prod3.price, prod3.compareAtPrice) > 0 && (
              <div className="absolute top-1 sm:top-4 left-1 sm:left-4 z-10">
                <span className="px-1 py-0.5 sm:px-2.5 sm:py-1.5 bg-[#AC1D22] text-white text-[7px] sm:text-[10px] font-sans font-bold tracking-wider uppercase select-none rounded-[2px] sm:rounded-[4px] shadow-sm flex items-center gap-1">
                  SAVE {getDiscountPercent(prod3.price, prod3.compareAtPrice)}%
                </span>
              </div>
            )}

            {/* Image display */}
            <div className="w-full aspect-square bg-[#FAF6F3] flex items-center justify-center p-1 sm:p-4 relative overflow-hidden h-16 xs:h-24 sm:h-36 md:h-48 lg:h-auto">
              <img
                src={getProductImage(prod3, colorIdx3)}
                alt={prod3.title}
                className="max-h-[55px] xs:max-h-[80px] sm:max-h-[120px] lg:max-h-[250px] h-[85%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Hover Buttons (Only on Desktop) */}
              <div className="hidden lg:flex absolute right-4 bottom-4 flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {/* Quick view button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectedQuickView(prod3)}
                    onMouseEnter={() => setHoveredAction3('view')}
                    onMouseLeave={() => setHoveredAction3(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Quick View Product"
                  >
                    <Eye className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    <Eye className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  <AnimatePresence>
                    {hoveredAction3 === 'view' && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-xl whitespace-nowrap z-30"
                      >
                        QUICK VIEW
                        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-black rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Add to cart button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(prod3, 1, colorIdx3);
                    }}
                    onMouseEnter={() => setHoveredAction3('cart')}
                    onMouseLeave={() => setHoveredAction3(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Add product to cart"
                  >
                    <ShoppingCart className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    <ShoppingCart className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  <AnimatePresence>
                    {hoveredAction3 === 'cart' && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-xl whitespace-nowrap z-30"
                      >
                        ADD TO CART
                        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-black rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Product details */}
            <div className="text-left mt-1.5 sm:mt-6 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-[7px] xs:text-[8px] sm:text-[10px] font-mono font-semibold tracking-wider text-stone-400 uppercase">
                  {prod3.vendor}
                </p>
                <h3 className="font-serif text-stone-900 text-[10px] sm:text-xs lg:text-[17px] mt-0.5 sm:mt-1 leading-tight font-normal line-clamp-2 min-h-[2.4em] sm:min-h-0">
                  {prod3.title}
                </h3>
              </div>
              <div className="flex flex-wrap items-baseline gap-1 mt-1 sm:mt-3 font-sans">
                <span className="text-[#00C4BA] text-[11px] sm:text-sm lg:text-lg font-extrabold tracking-tight">
                  {convertAndFormatPrice(prod3.price, activeCurrency)}
                </span>
                {prod3.compareAtPrice && (
                  <span className="text-stone-400 text-[8px] sm:text-xs line-through font-mono">
                    {convertAndFormatPrice(prod3.compareAtPrice, activeCurrency)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big checkout button perfectly styled and centered inside container margins */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20">
        <motion.button
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleAddAll}
          disabled={addedStatus === 'adding'}
          animate={{
            scale: [1, 1.03, 1, 1],
            boxShadow: [
              "0 4px 6px -1px rgba(0, 196, 186, 0.1), 0 2px 4px -1px rgba(0, 196, 186, 0.06)",
              "0 12px 20px -3px rgba(0, 196, 186, 0.4), 0 4px 8px -2px rgba(0, 196, 186, 0.2)",
              "0 4px 6px -1px rgba(0, 196, 186, 0.1), 0 2px 4px -1px rgba(0, 196, 186, 0.06)",
              "0 4px 6px -1px rgba(0, 196, 186, 0.1), 0 2px 4px -1px rgba(0, 196, 186, 0.06)"
            ],
            filter: [
              "brightness(1)",
              "brightness(1.1)",
              "brightness(1)",
              "brightness(1)"
            ]
          }}
          transition={{
            duration: 3.7, // Matches the shine animation loop (2.2s active + 1.5s delay)
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 1]
          }}
          className="w-full py-5 xs:py-6 text-[10px] xs:text-xs sm:text-sm font-extrabold tracking-[0.05em] xs:tracking-[0.15em] sm:tracking-[0.2em] uppercase cursor-pointer flex items-center justify-center gap-2 xs:gap-3 transition-all rounded-[4px] focus:outline-hidden text-white select-none relative overflow-hidden active:scale-95"
          style={{ backgroundColor: '#00C4BA' }}
        >
          {/* White shine light pass animation */}
          <motion.div
            className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 pointer-events-none"
            initial={{ left: '-150px' }}
            animate={{
              left: ['-150px', '100%', '100%']
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut"
            }}
          />

          {addedStatus === 'idle' && (
            <span className="flex items-center gap-1.5 xs:gap-3 relative z-10">
              <ShoppingCart className="w-4 h-4 xs:w-4.5 xs:h-4.5 text-white shrink-0" />
              <span className="inline-flex overflow-hidden">
                {`ADD ALL TO CART • ${convertAndFormatPrice(`$${totalPrice.toFixed(2)}`, activeCurrency)} — SAVE ${convertAndFormatPrice(`$${totalDiscount.toFixed(2)}`, activeCurrency)}`.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block whitespace-pre font-extrabold"
                    animate={isHovered ? {
                      y: [0, -6, 6, 0],
                      transition: {
                        duration: 0.45,
                        delay: index * 0.015,
                        ease: "easeInOut"
                      }
                    } : { y: 0 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </span>
          )}
          {addedStatus === 'adding' && (
            <span className="animate-pulse relative z-10 text-white font-extrabold">Adding routine to cart...</span>
          )}
          {addedStatus === 'success' && (
            <span className="flex items-center gap-2 relative z-10 text-white font-extrabold">
              <Check className="w-5 h-5 text-white shrink-0" />
              <span>Routine added to cart successfully!</span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Elegant Quick View Modal */}
      <AnimatePresence>
        {selectedQuickView && (
          <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-lg w-full p-8 shadow-2xl relative border border-stone-150 rounded-none text-left"
            >
              <button
                onClick={() => setSelectedQuickView(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-full font-sans font-normal text-lg cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                &times;
              </button>
              
              <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest block">{selectedQuickView.vendor}</span>
              <h4 className="font-serif italic text-2xl font-normal mt-1 text-[#2D2926]">{selectedQuickView.title}</h4>
              
              <div className="flex gap-6 my-6 border-y py-5 border-stone-100 items-start">
                <img
                  src={selectedQuickView.images[0]}
                  alt={selectedQuickView.title}
                  className="w-24 h-24 object-cover border border-stone-100 bg-[#FAF6F3]"
                />
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-tight text-[#3B4BEF] bg-[#DCE4FF] px-2 py-1 rounded-[3px]">
                    Signature Formula
                  </span>
                  <p className="text-lg font-bold font-mono mt-3 text-stone-900">
                    {convertAndFormatPrice(selectedQuickView.price, activeCurrency)}
                  </p>
                  <p className="text-stone-400 text-xs line-through mt-0.5">
                    {selectedQuickView.compareAtPrice && convertAndFormatPrice(selectedQuickView.compareAtPrice, activeCurrency)}
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-stone-500 font-light mb-6">
                {selectedQuickView.description}
              </p>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(selectedQuickView, 1, 0);
                    setSelectedQuickView(null);
                  }}
                  className="flex-1 py-3.5 bg-stone-900 hover:bg-stone-850 text-white font-semibold text-xs tracking-widest uppercase transition-colors rounded-none"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedQuickView(null)}
                  className="py-3.5 px-6 bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold text-xs tracking-wider uppercase transition-colors border border-stone-200 rounded-none"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
