import React, { useState, useEffect, useRef } from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '../types';
import { SafeImage } from './SafeImage';
import { LuxuryButton } from './LuxuryButton';
import { Currency, convertAndFormatPrice, parseUsdPrice, SUPPORTED_CURRENCIES } from '../lib/currency';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductCardProps {
  product: Product;
  colorText: string;
  colorAccent: string;
  colorButton: string;
  colorButtonText: string;
  onNavigate: (productId: string) => void;
  onQuickAdd: (product: Product, colorIdx: number) => void;
  variant?: 'standard' | 'minimal';
  currentCurrency?: Currency;
}

const getCustomProductImage = (product: Product, selectedColorIdx: number): string => {
  const primaryImage = product.images[selectedColorIdx] || product.images[0] || '';
  
  // If it's a real Shopify URL (starts with http), use it!
  if (primaryImage && (primaryImage.startsWith('http://') || primaryImage.startsWith('https://'))) {
    return primaryImage;
  }

  // For premium ZISU'C products, use the exact provided images without overriding
  if (product.vendor === "ZISU'C" && primaryImage) {
    return primaryImage;
  }
  
  // Otherwise, map local handles/paths to existing beautiful local image assets
  const id = product.id.toLowerCase();
  if (id.includes('serum')) {
    return '/Curated Essentials serum image frame.png';
  }
  if (id.includes('cleanser') || id.includes('essence') || id.includes('mist') || id.includes('toner')) {
    return '/Curated Essentials cleanser image frame.png';
  }
  if (id.includes('cream') || id.includes('balm') || id.includes('mask') || id.includes('shampoo') || id.includes('conditioner')) {
    if (id.includes('eye-cream') || id.includes('eye')) {
      return '/Curated Essentials eye cream image frame.png';
    }
    return '/Curated Essentials cream image frame.png';
  }
  if (id.includes('oil') || id.includes('spf') || id.includes('sun') || id.includes('fluid') || id.includes('shield') || id.includes('pad')) {
    return '/Curated Essentials eye cream image frame.png';
  }
  
  return primaryImage || '/Curated Essentials serum image frame.png';
};

const getCustomSecondaryProductImage = (product: Product, selectedColorIdx: number): string => {
  const secondaryImage = product.images[1] || product.images[0] || '';
  
  if (secondaryImage && (secondaryImage.startsWith('http://') || secondaryImage.startsWith('https://'))) {
    return secondaryImage;
  }

  if (product.vendor === "ZISU'C" && secondaryImage) {
    return secondaryImage;
  }
  
  return secondaryImage || getCustomProductImage(product, selectedColorIdx);
};

export const getProductBadge = (productId: string): string => {
  const id = productId.toLowerCase();
  
  if (id.includes('cica-pin-cell-skin-trigger')) return "Derm Tested";
  if (id.includes('e-bap-powder-cleanser')) return "10K+ Sold";
  if (id.includes('kira-60-c-tide-cream')) return "Derm Tested";
  if (id.includes('galachione-ampoule-pad')) return "1 in Brightening";
  if (id.includes('volume-shot-eye-cream')) return "10K+ Sold";
  if (id.includes('kira-60-c-tide-serum')) return "Back in Stock";
  if (id.includes('kira-60-c-tide-multi-mist')) return "Back in Stock";
  if (id.includes('super-retinol-vitamin-a')) return "Back in Stock";
  if (id.includes('glow-boost-vitamin-c')) return "1 in Brightening";
  
  if (id.includes('cleanser') || id.includes('wash')) return "10K+ Sold";
  if (id.includes('cream') || id.includes('moisturizer')) return "Derm Tested";
  if (id.includes('pad') || id.includes('peel') || id.includes('exfoliate')) return "1 in Brightening";
  if (id.includes('mist') || id.includes('spray')) return "Back in Stock";
  if (id.includes('serum') || id.includes('ampoule')) return "1 in Brightening";

  const badges = ["Derm Tested", "10K+ Sold", "1 in Brightening", "Back in Stock", "Bestseller"];
  let sum = 0;
  for (let i = 0; i < id.length; i++) {
    sum += id.charCodeAt(i);
  }
  return badges[sum % badges.length];
};

export const getBadgeConfig = (badge: string) => {
  switch (badge) {
    case "Derm Tested":
      return {
        bg: "bg-slate-900",
        text: "text-white",
        icon: (
          <svg className="w-3.5 h-3.5 mr-1 shrink-0 text-emerald-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.5a5 5 0 0 0-4-1.5a5 5 0 0 0-4 1.5v3.5A7.5 7.5 0 0 0 8 13.5a7.5 7.5 0 0 0 4-7.5V2.5Z" />
            <path d="M5.5 7l2 2l3.5 -3.5" />
          </svg>
        )
      };
    case "10K+ Sold":
      return {
        bg: "bg-emerald-700",
        text: "text-white",
        icon: (
          <svg className="w-3.5 h-3.5 mr-1 shrink-0 text-emerald-200" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 10V3.5H7M13.5 3.5L8.5 8.5L5.5 5.5L2 9" />
          </svg>
        )
      };
    case "1 in Brightening":
      return {
        bg: "bg-red-800",
        text: "text-white",
        icon: (
          <svg className="w-3.5 h-3.5 mr-1 shrink-0 text-rose-200" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 1.5l1.5 3.5l3.5 1.5l-3.5 1.5l-1.5 3.5l-1.5-3.5l-3.5-1.5l3.5-1.5z" />
          </svg>
        )
      };
    case "Back in Stock":
      return {
        bg: "bg-[#00C4BA]",
        text: "text-white",
        icon: (
          <svg className="w-3.5 h-3.5 mr-1 shrink-0 text-stone-900" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5v2.5M8 2.5l2 2M8 2.5L6 4.5" />
          </svg>
        )
      };
    case "Bestseller":
    default:
      return {
        bg: "bg-purple-800",
        text: "text-white",
        icon: (
          <svg className="w-3.5 h-3.5 mr-1 shrink-0 text-purple-200" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 11.5l1.5-6l3 2.5l1.5-4l1.5 4l3-2.5l1.5 6H2z" />
          </svg>
        )
      };
  }
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  colorText,
  colorAccent,
  colorButton,
  colorButtonText,
  onNavigate,
  onQuickAdd,
  variant = 'standard',
  currentCurrency,
}) => {
  const activeCurrency = currentCurrency || SUPPORTED_CURRENCIES[0];
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<'cart' | 'view' | null>(null);

  // Synchronized rating calculations
  const [customReviewsLength, setCustomReviewsLength] = useState(0);
  const [customReviewsSum, setCustomReviewsSum] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storageKey = `zisu_product_reviews_${product.id}`;
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const customList = parsed.filter((r: any) => r.id && r.id.startsWith('custom-'));
            setCustomReviewsLength(customList.length);
            setCustomReviewsSum(customList.reduce((acc: number, item: any) => acc + (item.rating || 0), 0));
          }
        } else {
          setCustomReviewsLength(0);
          setCustomReviewsSum(0);
        }
      } catch (e) {
        console.error(e);
      }
    };

    handleUpdate();

    // Listen to local storage write events or custom event to keep perfectly in sync!
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('zisu-reviews-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('zisu-reviews-updated', handleUpdate);
    };
  }, [product.id]);

  const baseReviewsCount = product.reviewsCount || 120;
  const globalReviewsCount = baseReviewsCount + customReviewsLength;
  const baseRating = product.rating || 4.8;
  const averageRating = customReviewsLength > 0
    ? ((baseRating * baseReviewsCount + customReviewsSum) / globalReviewsCount)
    : baseRating;

  const isMinimal = variant === 'minimal';
  const isSoldOut = product.id === 'super-retinol-vitamin-a';

  const baseUsdPrice = parseUsdPrice(product.price);
  
  // Smart dynamic fallback: if no compareAtPrice was fetched, calculate a 15% discount markup
  let finalCompareAtPrice = product.compareAtPrice;
  if (!finalCompareAtPrice || parseUsdPrice(finalCompareAtPrice) <= baseUsdPrice) {
    if (baseUsdPrice === 78) {
      finalCompareAtPrice = "$92.00";
    } else {
      const calculatedCompare = Math.round((baseUsdPrice / 0.85) * 100) / 100;
      finalCompareAtPrice = `$${calculatedCompare.toFixed(2)}`;
    }
  }

  const compareUsdPrice = parseUsdPrice(finalCompareAtPrice);
  const hasDiscount = compareUsdPrice > baseUsdPrice;
  const discountPercent = hasDiscount ? Math.round(((compareUsdPrice - baseUsdPrice) / compareUsdPrice) * 100) : 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hasRevealed = useRef(false);

  useEffect(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    if (hasRevealed.current) {
      gsap.set(img, { scale: 1.00, opacity: 1 });
      return;
    }

    // Set initial intense zoom state and hidden state
    gsap.set(img, {
      scale: 1.32,
      opacity: 0
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 98%',
      once: true,
      onEnter: () => {
        hasRevealed.current = true;
        gsap.to(img, {
          scale: 1.00,
          opacity: 1,
          duration: 1.8, // Intense slow luxury zoom out
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    // Fallback/Immediate reveal: if card is mounted directly inside viewport (e.g. changing tabs above scroll bottom)
    const rect = container.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInViewport) {
      hasRevealed.current = true;
      gsap.to(img, {
        scale: 1.00,
        opacity: 1,
        duration: 2.0, // Slow graceful reveal zoom out
        ease: 'power3.out',
        delay: 0.05,
        overwrite: 'auto'
      });
    }

    return () => {
      trigger.kill();
    };
  }, [product.id, selectedColorIdx]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (isMinimal) {
    return (
      <div
        ref={containerRef}
        onClick={() => onNavigate(product.id)}
        className="group relative flex flex-col p-0 bg-transparent cursor-pointer overflow-hidden transition duration-300 w-full shrink-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Product Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF5F0] mb-3 flex items-center justify-center transition-colors duration-300 w-full border border-stone-200/20">
          
          {/* Custom Badges matching the real Shop exact image */}
          {isSoldOut ? (
            <span className="absolute top-3 left-3 z-10 px-3 py-1.5 text-[9px] uppercase tracking-widest font-bold select-none text-[#934C4C] bg-[#FFE1E1] rounded-xs font-sans">
              SOLD OUT
            </span>
          ) : (
            (() => {
              const badgeText = getProductBadge(product.id);
              const { bg, text, icon } = getBadgeConfig(badgeText);
              return (
                <div className={`absolute top-3 left-3 z-10 inline-flex items-center ${bg} ${text} px-2 py-1 rounded-[4px] font-sans font-bold text-[9px] tracking-wide select-none shadow-xs`}>
                  {icon}
                  <span>{badgeText}</span>
                </div>
              );
            })()
          )}

          <div className="w-full h-full relative overflow-hidden">
            {/* Primary Image */}
            <div 
              className="absolute inset-0 transition duration-700 ease-out"
              style={{
                opacity: isHovered ? 0 : 1,
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <img
                ref={imgRef}
                src={getCustomProductImage(product, selectedColorIdx)}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Secondary Image */}
            <div 
              className="absolute inset-0 transition duration-700 ease-out"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'scale(1.1)' : 'scale(1.02)',
              }}
            >
              <img
                src={getCustomSecondaryProductImage(product, selectedColorIdx)}
                alt={`${product.title} Alternate`}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Mint-teal Round action buttons overlay (sliding in from the right edge) */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-3 z-20" onClick={(e) => e.stopPropagation()}>
            
            {/* Quick view button */}
            <div className="relative translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(product.id);
                }}
                onMouseEnter={() => setHoveredAction('view')}
                onMouseLeave={() => setHoveredAction(null)}
                className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-colors duration-300 relative overflow-hidden"
                aria-label="Quick View Product"
              >
                {/* Primary Icon - slides to the right on hover */}
                <Eye className="w-[18px] h-[18px] transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                {/* Duplicate Icon - slides in from the left on hover */}
                <Eye className="w-[18px] h-[18px] absolute transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
              </button>
              
              {/* Tooltip on the left */}
              <AnimatePresence>
                {hoveredAction === 'view' && (
                  <motion.div
                    initial={{ opacity: 0, x: -12, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -12, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-md whitespace-nowrap z-30"
                  >
                    QUICK VIEW
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-black rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Add to cart button */}
            <div className="relative translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-[600ms] delay-75 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickAdd(product, selectedColorIdx);
                }}
                onMouseEnter={() => setHoveredAction('cart')}
                onMouseLeave={() => setHoveredAction(null)}
                className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-colors duration-300 relative overflow-hidden"
                aria-label="Add product to cart"
              >
                {/* Primary Icon - slides to the right on hover */}
                <ShoppingCart className="w-[18px] h-[18px] transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                {/* Duplicate Icon - slides in from the left on hover */}
                <ShoppingCart className="w-[18px] h-[18px] absolute transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
              </button>

              {/* Tooltip on the left */}
              <AnimatePresence>
                {hoveredAction === 'cart' && (
                  <motion.div
                    initial={{ opacity: 0, x: -12, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -12, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-md whitespace-nowrap z-30"
                  >
                    ADD TO CART
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-black rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>


        {/* Text Info block - Left-Aligned Elegant Styling */}
        <div className="text-left mt-0.5">
          <span className="text-[10px] uppercase tracking-[0.15em] text-stone-500 block font-heading tracking-widest mb-1">
            {product.vendor}
          </span>
          <h3 
            className="font-serif text-[15px] text-stone-900 tracking-tight leading-tight line-clamp-1 product-title"
          >
            {product.title}
          </h3>

          {/* Small Star Rating Block (between title and price) */}
          <div className="flex items-center gap-1.5 mt-1 text-xs select-none">
            <span className="text-[10px] font-bold text-stone-700">
              {Number(averageRating).toFixed(1)}
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const isFilled = i < Math.round(Number(averageRating));
                return (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${isFilled ? 'text-[#00C4BA] fill-[#00C4BA]' : 'text-stone-200 fill-stone-100'}`}
                  />
                );
              })}
            </div>
            <span className="text-[10px] text-stone-400 font-normal">
              ({globalReviewsCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline space-x-2 mt-1.5 font-sans font-semibold text-[#00C4BA] text-sm">
            <span>{convertAndFormatPrice(product.price, activeCurrency)}</span>
            {finalCompareAtPrice && (
              <span className="line-through text-stone-400 text-xs font-normal font-sans pl-1">
                {convertAndFormatPrice(finalCompareAtPrice, activeCurrency)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={() => onNavigate(product.id)}
      className="group relative flex flex-col p-3 border rounded bg-white/40 cursor-pointer overflow-hidden transition duration-300 hover:shadow-sm"
      style={{
        borderColor: `${colorText}15`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF5F0] mb-4 border flex items-center justify-center transition-colors duration-300" style={{ borderColor: `${colorText}10` }}>
        {/* Sale badge */}
        {(() => {
          const badgeText = getProductBadge(product.id);
          const { bg, text, icon } = getBadgeConfig(badgeText);
          return (
            <div className={`absolute top-2.5 left-2.5 z-10 inline-flex items-center ${bg} ${text} px-2 py-1 rounded-[4px] font-sans font-bold text-[9px] tracking-wide select-none shadow-xs`}>
              {icon}
              <span>{badgeText}</span>
            </div>
          );
        })()}

        <div className="w-full h-full relative overflow-hidden">
          {/* Primary Image */}
          <div 
            className="absolute inset-0 transition duration-700 ease-out"
            style={{
              opacity: isHovered ? 0 : 1,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <img
              ref={imgRef}
              src={getCustomProductImage(product, selectedColorIdx)}
              alt={product.title}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Secondary Image */}
          <div 
            className="absolute inset-0 transition duration-700 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1.1)' : 'scale(1.02)',
            }}
          >
            <img
              src={getCustomSecondaryProductImage(product, selectedColorIdx)}
              alt={`${product.title} Alternate`}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Mint-teal Round action buttons overlay (sliding in from the right edge) */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-3 z-20" onClick={(e) => e.stopPropagation()}>
          
          {/* Quick view button */}
          <div className="relative translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(product.id);
              }}
              onMouseEnter={() => setHoveredAction('view')}
              onMouseLeave={() => setHoveredAction(null)}
              className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-colors duration-300 relative overflow-hidden"
              aria-label="Quick View Product"
            >
              {/* Primary Icon - slides to the right on hover */}
              <Eye className="w-[18px] h-[18px] transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
              {/* Duplicate Icon - slides in from the left on hover */}
              <Eye className="w-[18px] h-[18px] absolute transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
            </button>
            
            {/* Tooltip on the left */}
            <AnimatePresence>
              {hoveredAction === 'view' && (
                <motion.div
                  initial={{ opacity: 0, x: -12, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -12, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-md whitespace-nowrap z-30"
                >
                  QUICK VIEW
                  <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-black rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Add to cart button */}
          <div className="relative translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-[600ms] delay-75 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(product, selectedColorIdx);
              }}
              onMouseEnter={() => setHoveredAction('cart')}
              onMouseLeave={() => setHoveredAction(null)}
              className="w-11 h-11 rounded-full bg-[#A5F3E5] hover:bg-[#8CE5D6] text-stone-900 border border-white/60 shadow-lg flex items-center justify-center cursor-pointer group/btn transition-colors duration-300 relative overflow-hidden"
              aria-label="Add product to cart"
            >
              {/* Primary Icon - slides to the right on hover */}
              <ShoppingCart className="w-[18px] h-[18px] transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
              {/* Duplicate Icon - slides in from the left on hover */}
              <ShoppingCart className="w-[18px] h-[18px] absolute transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
            </button>

            {/* Tooltip on the left */}
            <AnimatePresence>
              {hoveredAction === 'cart' && (
                <motion.div
                  initial={{ opacity: 0, x: -12, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -12, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-md whitespace-nowrap z-30"
                >
                  ADD TO CART
                  <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-1.5 bg-black rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Text Info block */}
      <div className="flex-1 flex flex-col justify-between mt-1">
        <div>
          <span className="text-[10px] uppercase tracking-widest opacity-50 block font-mono">{product.vendor}</span>
          <h3 
            className="font-subheading text-[12px] uppercase font-semibold tracking-wide text-neutral-800 mt-0.5 line-clamp-1 product-title"
            style={{ color: colorText }}
          >
            {product.title}
          </h3>
        </div>

        {/* Rating stars & pricing */}
        <div className="mt-1.5">
          {/* Small Star Rating Block (between title and price) */}
          <div className="flex items-center gap-1.5 text-xs select-none mb-1">
            <span className="text-[10px] font-bold text-stone-700">
              {Number(averageRating).toFixed(1)}
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const isFilled = i < Math.round(Number(averageRating));
                return (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${isFilled ? 'text-[#00C4BA] fill-[#00C4BA]' : 'text-stone-200 fill-stone-100'}`}
                  />
                );
              })}
            </div>
            <span className="text-[10px] text-stone-400 font-normal">
              ({globalReviewsCount} reviews)
            </span>
          </div>
          <div className="flex items-baseline space-x-2 font-mono text-sm font-semibold">
            <span className="text-[#00C4BA]">{convertAndFormatPrice(product.price, activeCurrency)}</span>
            {finalCompareAtPrice && (
              <span className="line-through text-gray-400 text-xs font-normal">{convertAndFormatPrice(finalCompareAtPrice, activeCurrency)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
