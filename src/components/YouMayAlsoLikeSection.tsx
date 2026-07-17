import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ShoppingCart, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { Currency, convertAndFormatPrice, parseUsdPrice } from '../lib/currency';
import { mockProducts } from '../products-data';
import { getProductBadge, getBadgeConfig } from './ProductCard';

interface YouMayAlsoLikeSectionProps {
  activeCurrency: Currency;
  onAddToCart: (product: Product, quantity: number, colorIdx: number) => void;
  onProductClick?: (productId: string) => void;
  themeColor: string;
  products?: Product[];
}

export const YouMayAlsoLikeSection: React.FC<YouMayAlsoLikeSectionProps> = ({
  activeCurrency,
  onAddToCart,
  onProductClick,
  themeColor,
  products,
}) => {
  const list = products || mockProducts;

  // Find 4 distinct products dynamically from the real Shopify list
  const p1 = list.find(p => p.id.toLowerCase().includes('e-bap') || p.id.toLowerCase().includes('powder-cleanser')) || list[0];
  const p2 = list.find(p => p.id.toLowerCase().includes('galachione') || p.id.toLowerCase().includes('ampoule-pad')) || list[Math.min(1, list.length - 1)];
  const p3 = list.find(p => p.id.toLowerCase().includes('kira') || p.id.toLowerCase().includes('tide') || p.id.toLowerCase().includes('cream')) || list[Math.min(2, list.length - 1)];
  const p4 = list.find(p => p.id !== p1.id && p.id !== p2.id && p.id !== p3.id) || list[Math.min(3, list.length - 1)];

  // Helper functions for dynamic product rendering
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

  const getSecondaryProductImage = (prod: Product, colorIdx: number) => {
    if (prod.images && prod.images.length > 1) {
      return prod.images[1] || prod.images[0];
    }
    if (prod.images && prod.images.length > 0) {
      return prod.images[0];
    }
    return "/placeholder.png";
  };

  // Get dynamic swatches for the 4 products
  const prod1Colors = getProductSwatches(p1);
  const prod2Colors = getProductSwatches(p2);
  const prod3Colors = getProductSwatches(p3);
  const prod4Colors = getProductSwatches(p4);

  // Color selection states for each card
  const [colorIdx1, setColorIdx1] = useState(0);
  const [colorIdx2, setColorIdx2] = useState(0);
  const [colorIdx3, setColorIdx3] = useState(0);
  const [colorIdx4, setColorIdx4] = useState(0);

  // Quick view details modal state
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);

  // Tooltip hover states for each of the 4 cards
  const [hoveredAction1, setHoveredAction1] = useState<'cart' | 'view' | null>(null);
  const [hoveredAction2, setHoveredAction2] = useState<'cart' | 'view' | null>(null);
  const [hoveredAction3, setHoveredAction3] = useState<'cart' | 'view' | null>(null);
  const [hoveredAction4, setHoveredAction4] = useState<'cart' | 'view' | null>(null);

  // Add toast trigger state
  const [successProduct, setSuccessProduct] = useState<string | null>(null);

  const handleAddToCart = (product: Product, index: number, colorIdx: number) => {
    onAddToCart(product, 1, colorIdx);
    setSuccessProduct(product.title);
    setTimeout(() => setSuccessProduct(null), 2000);
  };

  return (
    <div className="w-full bg-[#FAF9F5] py-24 border-t border-stone-200/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-6 text-left">
        {/* Title */}
        <h2 className="font-serif font-normal text-[#2D2926] text-3xl sm:text-[38px] tracking-tight mb-12">
          You may also like
        </h2>

        {/* 4-Column Grid with reduced gap as shown in Screenshot 4 */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 lg:grid lg:grid-cols-4 xl:gap-[18px] pb-4">
          
          {/* Card 1: p1 */}
          <div onClick={() => onProductClick?.(p1.id)} className="bg-white border border-stone-100 p-4 sm:p-5 flex flex-col group relative transition-shadow hover:shadow-lg cursor-pointer min-w-[85vw] sm:min-w-[300px] lg:min-w-0 snap-center">
            {/* Dynamic Badge */}
            {(() => {
              const badgeText = getProductBadge(p1.id);
              const { bg, text, icon } = getBadgeConfig(badgeText);
              return (
                <div className={`absolute top-4 left-4 z-10 inline-flex items-center ${bg} ${text} px-2 py-1 rounded-[4px] font-sans font-bold text-[9px] tracking-wide select-none shadow-xs`}>
                  {icon}
                  <span>{badgeText}</span>
                </div>
              );
            })()}

            {/* Image frame */}
            <div className="w-full aspect-square bg-[#FAF6F3] flex items-center justify-center p-3 relative overflow-hidden">
              {/* Primary Image */}
              <img
                src={getProductImage(p1, colorIdx1)}
                alt={p1.title}
                className="max-h-[250px] h-[85%] w-auto object-contain transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {/* Secondary Image */}
              <img
                src={getSecondaryProductImage(p1, colorIdx1)}
                alt={`${p1.title} Alternate`}
                className="absolute inset-0 m-auto max-h-[250px] h-[85%] w-auto object-contain transition-all duration-700 ease-out opacity-0 scale-[1.02] group-hover:opacity-100 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Hover Buttons with Move/Slide Animation on Icon Hover */}
              <div className="absolute right-4 bottom-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {/* Quick view button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedQuickView(p1); }}
                    onMouseEnter={() => setHoveredAction1('view')}
                    onMouseLeave={() => setHoveredAction1(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Quick View Product"
                  >
                    {/* Primary Icon - slides to the right on hover */}
                    <Eye className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    {/* Duplicate Icon - slides in from the left on hover */}
                    <Eye className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  {/* Tooltip on the left */}
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
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(p1, 1, colorIdx1); }}
                    onMouseEnter={() => setHoveredAction1('cart')}
                    onMouseLeave={() => setHoveredAction1(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Add product to cart"
                  >
                    {/* Primary Icon - slides to the right on hover */}
                    <ShoppingCart className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    {/* Duplicate Icon - slides in from the left on hover */}
                    <ShoppingCart className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  {/* Tooltip on the left */}
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

            {/* Metadata and Title */}
            <div className="text-left flex-grow flex flex-col justify-between mt-4">
              <div>
                <p className="text-[9px] font-mono font-bold tracking-wider text-stone-400 uppercase">
                  {p1.vendor}
                </p>
                <h3 className="font-serif text-stone-900 text-[15px] sm:text-[16px] leading-tight mt-1 font-normal">
                  {p1.title}
                </h3>

                {/* Star Rating Block */}
                <div className="flex items-center gap-1.5 mt-1.5 text-xs select-none">
                  <span className="text-[10px] font-bold text-stone-700">
                    {Number(p1.rating || 4.8).toFixed(1)}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const isFilled = i < Math.round(Number(p1.rating || 4.8));
                      return (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${isFilled ? 'text-[#00C4BA] fill-[#00C4BA]' : 'text-stone-200 fill-stone-100'}`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-stone-400 font-normal">
                    ({p1.reviewsCount || 120} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mt-2 font-sans font-semibold text-[#00C4BA] text-sm">
                <span>{convertAndFormatPrice(p1.price, activeCurrency)}</span>
                {(() => {
                  const baseUsdPrice = parseUsdPrice(p1.price);
                  let finalCompareAtPrice = p1.compareAtPrice;
                  if (!finalCompareAtPrice || parseUsdPrice(finalCompareAtPrice) <= baseUsdPrice) {
                    if (baseUsdPrice === 78) {
                      finalCompareAtPrice = "$92.00";
                    } else {
                      const calculatedCompare = Math.round((baseUsdPrice / 0.85) * 100) / 100;
                      finalCompareAtPrice = `$${calculatedCompare.toFixed(2)}`;
                    }
                  }
                  return (
                    <span className="line-through text-stone-400 text-xs font-normal font-sans pl-1">
                      {convertAndFormatPrice(finalCompareAtPrice, activeCurrency)}
                    </span>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Card 2: p2 */}
          <div onClick={() => onProductClick?.(p2.id)} className="bg-white border border-stone-100 p-4 sm:p-5 flex flex-col group relative transition-shadow hover:shadow-lg cursor-pointer min-w-[85vw] sm:min-w-[300px] lg:min-w-0 snap-center">
            {/* Dynamic Badge */}
            {(() => {
              const badgeText = getProductBadge(p2.id);
              const { bg, text, icon } = getBadgeConfig(badgeText);
              return (
                <div className={`absolute top-4 left-4 z-10 inline-flex items-center ${bg} ${text} px-2 py-1 rounded-[4px] font-sans font-bold text-[9px] tracking-wide select-none shadow-xs`}>
                  {icon}
                  <span>{badgeText}</span>
                </div>
              );
            })()}

            {/* Image frame */}
            <div className="w-full aspect-square bg-[#FAF6F3] flex items-center justify-center p-3 relative overflow-hidden">
              {/* Primary Image */}
              <img
                src={getProductImage(p2, colorIdx2)}
                alt={p2.title}
                className="max-h-[250px] h-[85%] w-auto object-contain transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {/* Secondary Image */}
              <img
                src={getSecondaryProductImage(p2, colorIdx2)}
                alt={`${p2.title} Alternate`}
                className="absolute inset-0 m-auto max-h-[250px] h-[85%] w-auto object-contain transition-all duration-700 ease-out opacity-0 scale-[1.02] group-hover:opacity-100 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Hover Buttons with Move/Slide Animation on Icon Hover */}
              <div className="absolute right-4 bottom-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {/* Quick view button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedQuickView(p2); }}
                    onMouseEnter={() => setHoveredAction2('view')}
                    onMouseLeave={() => setHoveredAction2(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Quick View Product"
                  >
                    {/* Primary Icon - slides to the right on hover */}
                    <Eye className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    {/* Duplicate Icon - slides in from the left on hover */}
                    <Eye className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  {/* Tooltip on the left */}
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
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(p2, 2, colorIdx2); }}
                    onMouseEnter={() => setHoveredAction2('cart')}
                    onMouseLeave={() => setHoveredAction2(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Add product to cart"
                  >
                    {/* Primary Icon - slides to the right on hover */}
                    <ShoppingCart className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    {/* Duplicate Icon - slides in from the left on hover */}
                    <ShoppingCart className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  {/* Tooltip on the left */}
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

            {/* Metadata and Title */}
            <div className="text-left flex-grow flex flex-col justify-between mt-4">
              <div>
                <p className="text-[9px] font-mono font-bold tracking-wider text-stone-400 uppercase">
                  {p2.vendor}
                </p>
                <h3 className="font-serif text-stone-900 text-[15px] sm:text-[16px] leading-tight mt-1 font-normal">
                  {p2.title}
                </h3>

                {/* Star Rating Block */}
                <div className="flex items-center gap-1.5 mt-1.5 text-xs select-none">
                  <span className="text-[10px] font-bold text-stone-700">
                    {Number(p2.rating || 4.8).toFixed(1)}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const isFilled = i < Math.round(Number(p2.rating || 4.8));
                      return (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${isFilled ? 'text-[#00C4BA] fill-[#00C4BA]' : 'text-stone-200 fill-stone-100'}`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-stone-400 font-normal">
                    ({p2.reviewsCount || 120} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mt-2 font-sans font-semibold text-[#00C4BA] text-sm">
                <span>{convertAndFormatPrice(p2.price, activeCurrency)}</span>
                {(() => {
                  const baseUsdPrice = parseUsdPrice(p2.price);
                  let finalCompareAtPrice = p2.compareAtPrice;
                  if (!finalCompareAtPrice || parseUsdPrice(finalCompareAtPrice) <= baseUsdPrice) {
                    if (baseUsdPrice === 78) {
                      finalCompareAtPrice = "$92.00";
                    } else {
                      const calculatedCompare = Math.round((baseUsdPrice / 0.85) * 100) / 100;
                      finalCompareAtPrice = `$${calculatedCompare.toFixed(2)}`;
                    }
                  }
                  return (
                    <span className="line-through text-stone-400 text-xs font-normal font-sans pl-1">
                      {convertAndFormatPrice(finalCompareAtPrice, activeCurrency)}
                    </span>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Card 3: p3 */}
          <div onClick={() => onProductClick?.(p3.id)} className="bg-white border border-stone-100 p-4 sm:p-5 flex flex-col group relative transition-shadow hover:shadow-lg cursor-pointer min-w-[85vw] sm:min-w-[300px] lg:min-w-0 snap-center">
            {/* Dynamic Badge */}
            {(() => {
              const badgeText = getProductBadge(p3.id);
              const { bg, text, icon } = getBadgeConfig(badgeText);
              return (
                <div className={`absolute top-4 left-4 z-10 inline-flex items-center ${bg} ${text} px-2 py-1 rounded-[4px] font-sans font-bold text-[9px] tracking-wide select-none shadow-xs`}>
                  {icon}
                  <span>{badgeText}</span>
                </div>
              );
            })()}

            {/* Image frame */}
            <div className="w-full aspect-square bg-[#FAF6F3] flex items-center justify-center p-3 relative overflow-hidden">
              {/* Primary Image */}
              <img
                src={getProductImage(p3, colorIdx3)}
                alt={p3.title}
                className="max-h-[250px] h-[85%] w-auto object-contain transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {/* Secondary Image */}
              <img
                src={getSecondaryProductImage(p3, colorIdx3)}
                alt={`${p3.title} Alternate`}
                className="absolute inset-0 m-auto max-h-[250px] h-[85%] w-auto object-contain transition-all duration-700 ease-out opacity-0 scale-[1.02] group-hover:opacity-100 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Hover Buttons with Move/Slide Animation on Icon Hover */}
              <div className="absolute right-4 bottom-4 flex flex-col gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10">
                {/* Quick view button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedQuickView(p3); }}
                    onMouseEnter={() => setHoveredAction3('view')}
                    onMouseLeave={() => setHoveredAction3(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Quick View Product"
                  >
                    {/* Primary Icon - slides to the right on hover */}
                    <Eye className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    {/* Duplicate Icon - slides in from the left on hover */}
                    <Eye className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  {/* Tooltip on the left */}
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
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(p3, 3, colorIdx3); }}
                    onMouseEnter={() => setHoveredAction3('cart')}
                    onMouseLeave={() => setHoveredAction3(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Add product to cart"
                  >
                    {/* Primary Icon - slides to the right on hover */}
                    <ShoppingCart className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    {/* Duplicate Icon - slides in from the left on hover */}
                    <ShoppingCart className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  {/* Tooltip on the left */}
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

            {/* Metadata and Title */}
            <div className="text-left flex-grow flex flex-col justify-between mt-4">
              <div>
                <p className="text-[9px] font-mono font-bold tracking-wider text-stone-400 uppercase">
                  {p3.vendor}
                </p>
                <h3 className="font-serif text-stone-900 text-[15px] sm:text-[16px] leading-tight mt-1 font-normal">
                  {p3.title}
                </h3>

                {/* Star Rating Block */}
                <div className="flex items-center gap-1.5 mt-1.5 text-xs select-none">
                  <span className="text-[10px] font-bold text-stone-700">
                    {Number(p3.rating || 4.8).toFixed(1)}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const isFilled = i < Math.round(Number(p3.rating || 4.8));
                      return (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${isFilled ? 'text-[#00C4BA] fill-[#00C4BA]' : 'text-stone-200 fill-stone-100'}`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-stone-400 font-normal">
                    ({p3.reviewsCount || 120} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mt-2 font-sans font-semibold text-[#00C4BA] text-sm">
                <span>{convertAndFormatPrice(p3.price, activeCurrency)}</span>
                {(() => {
                  const baseUsdPrice = parseUsdPrice(p3.price);
                  let finalCompareAtPrice = p3.compareAtPrice;
                  if (!finalCompareAtPrice || parseUsdPrice(finalCompareAtPrice) <= baseUsdPrice) {
                    if (baseUsdPrice === 78) {
                      finalCompareAtPrice = "$92.00";
                    } else {
                      const calculatedCompare = Math.round((baseUsdPrice / 0.85) * 100) / 100;
                      finalCompareAtPrice = `$${calculatedCompare.toFixed(2)}`;
                    }
                  }
                  return (
                    <span className="line-through text-stone-400 text-xs font-normal font-sans pl-1">
                      {convertAndFormatPrice(finalCompareAtPrice, activeCurrency)}
                    </span>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Card 4: p4 */}
          <div onClick={() => onProductClick?.(p4.id)} className="bg-white border border-stone-100 p-4 sm:p-5 flex flex-col group relative transition-shadow hover:shadow-lg cursor-pointer min-w-[85vw] sm:min-w-[300px] lg:min-w-0 snap-center">
            {/* Dynamic Badge */}
            {(() => {
              const badgeText = getProductBadge(p4.id);
              const { bg, text, icon } = getBadgeConfig(badgeText);
              return (
                <div className={`absolute top-4 left-4 z-10 inline-flex items-center ${bg} ${text} px-2 py-1 rounded-[4px] font-sans font-bold text-[9px] tracking-wide select-none shadow-xs`}>
                  {icon}
                  <span>{badgeText}</span>
                </div>
              );
            })()}

            {/* Image frame */}
            <div className="w-full aspect-square bg-[#FAF6F3] flex items-center justify-center p-3 relative overflow-hidden">
              {/* Primary Image */}
              <img
                src={getProductImage(p4, colorIdx4)}
                alt={p4.title}
                className="max-h-[250px] h-[85%] w-auto object-contain transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {/* Secondary Image */}
              <img
                src={getSecondaryProductImage(p4, colorIdx4)}
                alt={`${p4.title} Alternate`}
                className="absolute inset-0 m-auto max-h-[250px] h-[85%] w-auto object-contain transition-all duration-700 ease-out opacity-0 scale-[1.02] group-hover:opacity-100 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Hover Buttons with Move/Slide Animation on Icon Hover */}
              <div className="absolute right-4 bottom-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {/* Quick view button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedQuickView(p4); }}
                    onMouseEnter={() => setHoveredAction4('view')}
                    onMouseLeave={() => setHoveredAction4(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Quick View Product"
                  >
                    {/* Primary Icon - slides to the right on hover */}
                    <Eye className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    {/* Duplicate Icon - slides in from the left on hover */}
                    <Eye className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  {/* Tooltip on the left */}
                  <AnimatePresence>
                    {hoveredAction4 === 'view' && (
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
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(p4, 4, colorIdx4); }}
                    onMouseEnter={() => setHoveredAction4('cart')}
                    onMouseLeave={() => setHoveredAction4(null)}
                    className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-all duration-300 relative overflow-hidden"
                    aria-label="Add product to cart"
                  >
                    {/* Primary Icon - slides to the right on hover */}
                    <ShoppingCart className="w-[18px] h-[18px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                    {/* Duplicate Icon - slides in from the left on hover */}
                    <ShoppingCart className="w-[18px] h-[18px] absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                  </button>

                  {/* Tooltip on the left */}
                  <AnimatePresence>
                    {hoveredAction4 === 'cart' && (
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

            {/* Metadata and Title */}
            <div className="text-left flex-grow flex flex-col justify-between mt-4">
              <div>
                <p className="text-[9px] font-mono font-bold tracking-wider text-stone-400 uppercase">
                  {p4.vendor}
                </p>
                <h3 className="font-serif text-stone-900 text-[15px] sm:text-[16px] leading-tight mt-1 font-normal">
                  {p4.title}
                </h3>

                {/* Star Rating Block */}
                <div className="flex items-center gap-1.5 mt-1.5 text-xs select-none">
                  <span className="text-[10px] font-bold text-stone-700">
                    {Number(p4.rating || 4.8).toFixed(1)}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const isFilled = i < Math.round(Number(p4.rating || 4.8));
                      return (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${isFilled ? 'text-[#00C4BA] fill-[#00C4BA]' : 'text-stone-200 fill-stone-100'}`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-stone-400 font-normal">
                    ({p4.reviewsCount || 120} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mt-2 font-sans font-semibold text-[#00C4BA] text-sm">
                <span>{convertAndFormatPrice(p4.price, activeCurrency)}</span>
                {(() => {
                  const baseUsdPrice = parseUsdPrice(p4.price);
                  let finalCompareAtPrice = p4.compareAtPrice;
                  if (!finalCompareAtPrice || parseUsdPrice(finalCompareAtPrice) <= baseUsdPrice) {
                    if (baseUsdPrice === 78) {
                      finalCompareAtPrice = "$92.00";
                    } else {
                      const calculatedCompare = Math.round((baseUsdPrice / 0.85) * 100) / 100;
                      finalCompareAtPrice = `$${calculatedCompare.toFixed(2)}`;
                    }
                  }
                  return (
                    <span className="line-through text-stone-400 text-xs font-normal font-sans pl-1">
                      {convertAndFormatPrice(finalCompareAtPrice, activeCurrency)}
                    </span>
                  );
                })()}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Success Toast Notification (corresponds to drawer popup layout in bottom right) */}
      <AnimatePresence>
        {successProduct && (
          <motion.div
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            className="fixed bottom-6 right-6 bg-white shadow-2xl p-4 border border-stone-100 max-w-xs w-full z-130 flex items-center gap-4.5"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 leading-tight">Added to bag</p>
              <p className="text-[11px] text-stone-500 font-light truncate max-w-[180px] mt-0.5">{successProduct}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elegant Quick View Modal */}
      <AnimatePresence>
        {selectedQuickView && (
          <div className="fixed inset-0 bg-black/60 z-[140] flex items-center justify-center p-4">
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
