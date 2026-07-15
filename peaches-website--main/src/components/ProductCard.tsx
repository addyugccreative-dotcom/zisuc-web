import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '../types';
import { SafeImage } from './SafeImage';
import { LuxuryButton } from './LuxuryButton';

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
}

const getCustomProductImage = (productId: string): string | null => {
  if (productId === 'super-retinol-vitamin-a') return '/serum 1.webp';
  if (productId === 'glow-remedy-hydrating-essence') return '/toner 1.webp';
  if (productId === 'overachiever-balm-cleanser') return '/hair care 1.webp';
  if (productId === 'golden-reset-radiance-oil') return '/sun protection 1.png';
  return null;
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
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isMinimal = variant === 'minimal';
  const isSoldOut = product.id === 'super-retinol-vitamin-a';

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
    const img = imgRef.current;
    if (img) {
      gsap.to(img, {
        scale: 1.28, // Smooth intense hover zoom in
        duration: 0.85,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const img = imgRef.current;
    if (img) {
      gsap.to(img, {
        scale: 1.00, // Smooth hover zoom out back to normal
        duration: 1.25,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }
  };

  if (isMinimal) {
    return (
      <div
        ref={containerRef}
        onClick={() => onNavigate(product.id)}
        className="group relative flex flex-col p-0 bg-transparent cursor-pointer overflow-hidden transition-all duration-300 w-full shrink-0"
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
          ) : product.compareAtPrice ? (
            <span className="absolute top-3 left-3 z-10 px-3 py-1.5 text-[9px] uppercase tracking-widest font-bold select-none text-[#5B4F9C] bg-[#E2E0F2] rounded-xs font-sans">
              SALE
            </span>
          ) : null}

          <div className="w-full h-full overflow-hidden">
            <img
              ref={imgRef}
              src={getCustomProductImage(product.id) || product.images[selectedColorIdx] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>


        </div>

        {/* Swatches Indicators - Left-Aligned */}
        <div className="flex items-center space-x-1.5 mb-2.5 h-4" onClick={(e) => e.stopPropagation()}>
          {product.colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColorIdx(idx)}
              className="w-3.5 h-3.5 rounded-full border transition-all"
              style={{
                backgroundColor: color.hex,
                borderColor: selectedColorIdx === idx ? '#1c1917' : '#e5e5e5',
                borderWidth: selectedColorIdx === idx ? '2px' : '1px',
                transform: selectedColorIdx === idx ? 'scale(1.15)' : 'none'
              }}
              aria-label={`Select ${color.name}`}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-[10px] text-stone-400 font-mono pl-1">+1</span>
          )}
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

          <div className="flex items-baseline space-x-2 mt-1.5 font-sans font-semibold text-stone-950 text-sm">
            <span>{product.price}</span>
            {product.compareAtPrice && (
              <span className="line-through text-stone-400 text-xs font-normal font-sans pl-1">
                {product.compareAtPrice}
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
      className="group relative flex flex-col p-3 border rounded bg-white/40 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-sm"
      style={{
        borderColor: `${colorText}15`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF5F0] mb-4 border flex items-center justify-center transition-colors duration-300" style={{ borderColor: `${colorText}10` }}>
        {/* Sale badge */}
        {product.compareAtPrice && (
          <span 
            className="absolute top-2.5 left-2.5 px-2 py-0.5 z-10 text-[9px] uppercase tracking-widest font-semibold border rounded select-none shadow-xs"
            style={{
              backgroundColor: colorAccent,
              color: colorText,
              borderColor: `${colorText}22`
            }}
          >
            Sale
          </span>
        )}

        <div className="w-full h-full overflow-hidden">
          <img
            ref={imgRef}
            src={getCustomProductImage(product.id) || product.images[selectedColorIdx] || product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>


      </div>

      {/* Swatches Indicators */}
      <div className="flex space-x-1.5 mb-2" onClick={(e) => e.stopPropagation()}>
        {product.colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedColorIdx(idx)}
            className="w-3 h-3 rounded-full border transition-all"
            style={{
              backgroundColor: color.hex,
              borderColor: selectedColorIdx === idx ? colorText : `${colorText}33`,
              transform: selectedColorIdx === idx ? 'scale(1.2)' : 'none'
            }}
            aria-label={`Select ${color.name}`}
          />
        ))}
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
        <div className="mt-2">
          <div className="flex items-center space-x-1 mb-1">
            {Array(5).fill(null).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-coral-500 stroke-none" style={{ fill: '#e76f51' }} />
            ))}
            <span className="text-[9px] opacity-60 font-mono">({product.reviewsCount})</span>
          </div>

          <div className="flex items-baseline space-x-2 font-mono text-sm font-semibold">
            <span style={{ color: colorText }}>{product.price}</span>
            {product.compareAtPrice && (
              <span className="line-through text-gray-400 text-xs font-normal">{product.compareAtPrice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
