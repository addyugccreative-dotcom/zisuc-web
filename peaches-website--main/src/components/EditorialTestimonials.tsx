import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { mockProducts } from '../products-data';
import { Product } from '../types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EditorialTestimonialsProps {
  onAddToCart: (product: Product, quantity: number, colorIdx: number) => void;
  settings: {
    colorText: string;
    colorAccent: string;
    colorBgSecondary: string;
    [key: string]: any;
  };
}

interface TestimonialData {
  name: string;
  label: string;
  rating: number;
  quote: string;
  avatar: string;
  productId: string;
}

const testimonials: TestimonialData[] = [
  {
    name: "SOPHIA ROSE",
    label: "Derm Approved Consumer — Dry Skin",
    rating: 5,
    quote: "My skin feels incredibly soft, hydrated, and looks more radiant than ever. The Peaches step program completely removed my acne bumps.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    productId: "super-retinol-vitamin-a",
  },
  {
    name: "MICHAEL NADER",
    label: "Verified Buyer — Active Athlete",
    rating: 5,
    quote: "The best moisturizer on the market! Lightweight, absorbs fast, and perfectly fits my dry base skin type. Highly recommend wave.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    productId: "cloud-whip-barrier-repair",
  },
  {
    name: "ELENA G.",
    label: "Skin Esthetician — Normal Skin",
    rating: 5,
    quote: "Simple, clean, and incredible results. Standard organic compound sourcing. My complexion faded significantly in under three weeks.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    productId: "glow-boost-vitamin-c",
  },
  {
    name: "CHARLOTTE K.",
    label: "Verified Buyer — Combination Skin",
    rating: 5,
    quote: "Visibly refined my pores and balanced my hydration levels within just a few days of use. A true lifesaver for combination skin.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    productId: "glow-remedy-hydrating-essence",
  },
  {
    name: "JONATHAN V.",
    label: "Verified Buyer — Tech Professional",
    rating: 5,
    quote: "An ultra-nourishing golden facial oil that leaves a beautiful non-greasy natural glow. It quickly restored my moisture barrier.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    productId: "golden-reset-radiance-oil",
  },
  {
    name: "ISABELLA M.",
    label: "Verified Buyer — Sensitive Skin",
    rating: 5,
    quote: "The peptide face lift serum literally sculpted my jawline and completely ironed out my dynamic frown lines! Absolute luxury in a bottle.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    productId: "peaches-peptide-serum",
  }
];

const getProductImage = (productId: string, originalImage: string): string => {
  if (productId === 'super-retinol-vitamin-a') return '/serum 1.webp';
  if (productId === 'glow-remedy-hydrating-essence') return '/toner 1.webp';
  if (productId === 'overachiever-balm-cleanser') return '/hair care 1.webp';
  if (productId === 'golden-reset-radiance-oil') return '/sun protection 1.png';
  if (productId === 'peaches-peptide-serum') return '/serum 3.webp';
  if (productId === 'cloud-whip-barrier-repair') return '/serum 4.webp';
  return originalImage;
};

export const EditorialTestimonials: React.FC<EditorialTestimonialsProps> = ({
  onAddToCart,
  settings,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftHeadingRef = useRef<HTMLDivElement>(null);
  const rightHeadingRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const leftH = leftHeadingRef.current;
    const rightH = rightHeadingRef.current;

    if (!container || !leftH || !rightH) return;

    const cards = gsap.utils.toArray('.editorial-testimonial-card') as HTMLDivElement[];
    if (cards.length === 0) return;

    // Use GSAP Context for resilient scoping and cleanups
    let ctx = gsap.context(() => {
      const calculatePositions = () => {
        const isMobile = window.innerWidth < 768;
        const gap = isMobile ? 30 : 150;
        const halfGap = gap / 2;
        const screenCenter = window.innerWidth / 2;

        // Obtain natural un-translated layout positions
        const leftHWidth = leftH.offsetWidth;
        const leftHOffsetLeft = leftH.offsetLeft;
        const rightHOffsetLeft = rightH.offsetLeft;

        // Calculate offset required to meet exactly in the center with specified gap
        const leftHOffsetCenter = (screenCenter - halfGap - leftHWidth) - leftHOffsetLeft;
        const rightHOffsetCenter = (screenCenter + halfGap) - rightHOffsetLeft;

        // Set high-performance initial transform and will-change styles
        gsap.set(leftH, { x: leftHOffsetCenter, opacity: 1, willChange: 'transform' });
        gsap.set(rightH, { x: rightHOffsetCenter, opacity: 1, willChange: 'transform' });

        // Reset all testimonial cards initially to their starting values
        cards.forEach((card) => {
          gsap.set(card, {
            opacity: 0,
            y: 120,
            scale: 0.92,
            filter: 'blur(10px)',
            zIndex: 10,
            willChange: 'transform, opacity, filter'
          });
        });

        // Initialize Master Pinning Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            start: 'top top',
            end: '+=450%', // Perfect luxury scroll weight
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              // Sync active state index to color code boundaries cleanly
              let currentActive = -1;
              if (p < 0.15) currentActive = -1;
              else if (p < 0.29) currentActive = 0;
              else if (p < 0.43) currentActive = 1;
              else if (p < 0.57) currentActive = 2;
              else if (p < 0.71) currentActive = 3;
              else if (p < 0.85) currentActive = 4;
              else currentActive = 5;
              setActiveIdx(currentActive);
            }
          }
        });

        // PHASE 2: Heading Drift sequence maps from scroll progress 0.0 to 0.15
        tl.to(leftH, {
          x: 0,
          ease: 'power1.inOut',
          duration: 0.15
        }, 0);

        tl.to(rightH, {
          x: 0,
          ease: 'power1.inOut',
          duration: 0.15
        }, 0);

        // Lock headings frozen on sides for everything else
        tl.to([leftH, rightH], {
          duration: 0.85
        }, 0.15);

        // STEP 1: Card 1 enters (0.0 to 0.29, begins entrance during drift phase to guarantee no blank page)
        tl.to(cards[0], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          zIndex: 100,
          keyframes: [
            { scale: 1.05, duration: 0.05 },
            { scale: 1.0, duration: 0.09 }
          ],
          ease: 'power2.out',
          duration: 0.29
        }, 0.0);

        // STEP 2: Card 1 recedes & Card 2 enters (0.29 to 0.43)
        tl.to(cards[0], {
          opacity: 0.5,
          y: -100,
          scale: 0.85,
          filter: 'blur(4px)',
          zIndex: 50,
          ease: 'power2.inOut',
          duration: 0.14
        }, 0.29);

        tl.to(cards[1], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          zIndex: 100,
          keyframes: [
            { scale: 1.05, duration: 0.05 },
            { scale: 1.0, duration: 0.09 }
          ],
          ease: 'power2.out',
          duration: 0.14
        }, 0.29);

        // STEP 3: Card 1 dismisses, Card 2 recedes & Card 3 enters (0.43 to 0.57)
        tl.to(cards[0], {
          opacity: 0,
          y: -220,
          scale: 0.75,
          filter: 'blur(10px)',
          zIndex: 10,
          ease: 'power2.in',
          duration: 0.14
        }, 0.43);

        tl.to(cards[1], {
          opacity: 0.5,
          y: -100,
          scale: 0.85,
          filter: 'blur(4px)',
          zIndex: 50,
          ease: 'power2.inOut',
          duration: 0.14
        }, 0.43);

        tl.to(cards[2], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          zIndex: 100,
          keyframes: [
            { scale: 1.05, duration: 0.05 },
            { scale: 1.0, duration: 0.09 }
          ],
          ease: 'power2.out',
          duration: 0.14
        }, 0.43);

        // STEP 4: Card 2 dismisses, Card 3 recedes & Card 4 enters (0.57 to 0.71)
        tl.to(cards[1], {
          opacity: 0,
          y: -220,
          scale: 0.75,
          filter: 'blur(10px)',
          zIndex: 10,
          ease: 'power2.in',
          duration: 0.14
        }, 0.57);

        tl.to(cards[2], {
          opacity: 0.5,
          y: -100,
          scale: 0.85,
          filter: 'blur(4px)',
          zIndex: 50,
          ease: 'power2.inOut',
          duration: 0.14
        }, 0.57);

        tl.to(cards[3], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          zIndex: 100,
          keyframes: [
            { scale: 1.05, duration: 0.05 },
            { scale: 1.0, duration: 0.09 }
          ],
          ease: 'power2.out',
          duration: 0.14
        }, 0.57);

        // STEP 5: Card 3 dismisses, Card 4 recedes & Card 5 enters (0.71 to 0.85)
        tl.to(cards[2], {
          opacity: 0,
          y: -220,
          scale: 0.75,
          filter: 'blur(10px)',
          zIndex: 10,
          ease: 'power2.in',
          duration: 0.14
        }, 0.71);

        tl.to(cards[3], {
          opacity: 0.5,
          y: -100,
          scale: 0.85,
          filter: 'blur(4px)',
          zIndex: 50,
          ease: 'power2.inOut',
          duration: 0.14
        }, 0.71);

        tl.to(cards[4], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          zIndex: 100,
          keyframes: [
            { scale: 1.05, duration: 0.05 },
            { scale: 1.0, duration: 0.09 }
          ],
          ease: 'power2.out',
          duration: 0.14
        }, 0.71);

        // STEP 6: Card 4 dismisses, Card 5 recedes & Card 6 enters (0.85 to 1.00)
        tl.to(cards[3], {
          opacity: 0,
          y: -220,
          scale: 0.75,
          filter: 'blur(10px)',
          zIndex: 10,
          ease: 'power2.in',
          duration: 0.14
        }, 0.85);

        tl.to(cards[4], {
          opacity: 0.5,
          y: -100,
          scale: 0.85,
          filter: 'blur(4px)',
          zIndex: 50,
          ease: 'power2.inOut',
          duration: 0.14
        }, 0.85);

        tl.to(cards[5], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          zIndex: 100,
          keyframes: [
            { scale: 1.05, duration: 0.05 },
            { scale: 1.0, duration: 0.09 }
          ],
          ease: 'power2.out',
          duration: 0.15
        }, 0.85);
      };

      // Delay execution briefly to guarantee DOM rendering / css variables are bound
      const runTimer = setTimeout(() => {
        calculatePositions();
      }, 100);

      // Listen on resize to reconstruct cleanly
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(runTimer);
        window.removeEventListener('resize', handleResize);
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleQuickAdd = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      onAddToCart(product, 1, 0);
      setAddedProductId(productId);
      setTimeout(() => {
        setAddedProductId(null);
      }, 2000);
    }
  };

  return (
    <section 
      ref={containerRef}
      id="editorial-reviews-section"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#FAF5F0' }}
    >
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#FAF5F0]">
        
        {/* Floating Side Headings Layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-full h-full flex items-center justify-between px-[5vw] sm:px-[8vw] lg:px-[10vw]">
            
            {/* Left Title */}
            <div 
              ref={leftHeadingRef}
              className="testimonial-heading font-heading font-semibold text-stone-900 tracking-tight text-left text-2xl sm:text-3xl md:text-[44px] lg:text-[48px] xl:text-[54px] max-w-[40vw] sm:max-w-[32vw]"
              style={{
                lineHeight: '1.05',
                willChange: 'transform',
              }}
            >
              Don't just trust <span className="italic font-normal text-rose-800">our</span><br />words.
            </div>

            {/* Right Title */}
            <div 
              ref={rightHeadingRef}
              className="testimonial-heading font-heading font-semibold text-stone-900 tracking-tight text-right text-2xl sm:text-3xl md:text-[44px] lg:text-[48px] xl:text-[54px] max-w-[40vw] sm:max-w-[32vw]"
              style={{
                lineHeight: '1.05',
                willChange: 'transform',
              }}
            >
              See what people<br /><span className="italic font-normal text-rose-800">are saying.</span>
            </div>

          </div>
        </div>

        {/* Testimonial Cards Overlay Canvas */}
        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {testimonials.map((test, idx) => {
              const matchedProduct = mockProducts.find(p => p.id === test.productId);
              if (!matchedProduct) return null;

              const isActive = idx === activeIdx;

              return (
                <div
                  key={idx}
                  className="editorial-testimonial-card absolute pointer-events-auto select-text will-change-transform"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '560px',
                    maxWidth: '90vw',
                    transition: 'box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive 
                      ? '0 30px 90px rgba(45, 41, 38, 0.15)' 
                      : '0 15px 45px rgba(45, 41, 38, 0.05)',
                  }}
                >
                  <div 
                    className="p-6 md:p-8 rounded-[24px] border bg-[#F5EFE7] flex flex-col justify-between h-full"
                    style={{
                      borderColor: isActive ? '#E6DFD5' : '#ECE5DB border-stone-200/40',
                    }}
                  >
                    
                    {/* Customer Info row */}
                    <div className="flex items-center gap-4 mb-5">
                      <img 
                        src={test.avatar} 
                        alt={test.name} 
                        className="w-11 h-11 md:w-13 md:h-13 rounded-full object-cover border border-stone-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left">
                        <p className="font-subheading font-bold text-stone-900 text-xs sm:text-sm tracking-wider uppercase">{test.name}</p>
                        <p className="font-mono text-[9px] text-stone-500 font-bold tracking-wider mt-0.5">{test.label}</p>
                      </div>
                    </div>

                    {/* Testimonial Rating & Quote */}
                    <div className="my-1 text-left">
                      <div className="flex text-amber-500 gap-0.5 mb-3.5 select-none">
                        {Array(test.rating).fill(null).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
                        ))}
                      </div>
                      <p className="font-heading italic text-stone-950 text-[14px] sm:text-base md:text-[18px] leading-relaxed">
                        "{test.quote}"
                      </p>
                    </div>

                    {/* Inline Product Card with Quick Add */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-stone-300/40">
                      <div className="flex items-center gap-3">
                        <img 
                          src={getProductImage(test.productId, matchedProduct.images[0])} 
                          alt={matchedProduct.title} 
                          className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl object-cover bg-stone-100 border border-stone-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-left">
                          <p className="font-mono text-[8px] uppercase tracking-widest text-rose-800 font-bold">Featured Product</p>
                          <p className="font-subheading font-bold text-stone-950 text-xs sm:text-sm leading-tight line-clamp-1">{matchedProduct.title}</p>
                          <p className="font-mono text-xs text-stone-600 mt-0.5 font-bold">{matchedProduct.price}</p>
                        </div>
                      </div>

                      <button
                        id={`review-quickadd-${test.productId}`}
                        className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-stone-700 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm select-none"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleQuickAdd(test.productId);
                        }}
                        aria-label="Quick Add to Cart"
                      >
                        {addedProductId === test.productId ? (
                          <Check className="w-4 h-4 text-[#F2A183] stroke-[3]" />
                        ) : (
                          <ShoppingCart className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
