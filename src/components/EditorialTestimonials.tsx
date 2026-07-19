import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ShoppingCart, Check, Pin } from 'lucide-react';
import { mockProducts } from '../products-data';
import { Product } from '../types';
import { Currency, convertAndFormatPrice, SUPPORTED_CURRENCIES } from '../lib/currency';

interface EditorialTestimonialsProps {
  onAddToCart: (product: Product, quantity: number, colorIdx: number) => void;
  settings: {
    colorText: string;
    colorAccent: string;
    colorBgSecondary: string;
    [key: string]: any;
  };
  currentCurrency?: Currency;
  products?: Product[];
}

interface TestimonialData {
  name: string;
  label: string;
  quote: string;
  avatar: string;
  productId: string;
  productTitle: string;
  productPrice: string;
  productImage: string;
}

const testimonials: TestimonialData[] = [
  {
    name: "Sarah M.",
    label: "VERIFIED CUSTOMER",
    quote: "My skin feels incredibly soft, hydrated, and looks more radiant than ever. I've received so many compliments since I started using this daily.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    productId: "super-retinol-vitamin-a",
    productTitle: "Super Retinol Vitamin A Serum",
    productPrice: "$128.00",
    productImage: "/serum 1.webp"
  },
  {
    name: "Emily R.",
    label: "SKIN THERAPIST",
    quote: "The Glow Boost Vitamin C is literally liquid gold. It faded my dark spots in under two weeks and gives the most incredible dewy, glassy finish.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    productId: "glow-boost-vitamin-c",
    productTitle: "Glow Boost Vitamin C Brightening",
    productPrice: "$85.00",
    productImage: "/serum 2.webp"
  },
  {
    name: "Olivia M.",
    label: "VERIFIED CUSTOMER",
    quote: "I am absolutely obsessed with the Cloud Whip Barrier Repair. It is lightweight yet intensely moisturizing, perfect for sensitive skin profiles.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    productId: "cloud-whip-barrier-repair",
    productTitle: "Cloud Whip Barrier Repair Moisturizer",
    productPrice: "$78.00",
    productImage: "/serum 4.webp"
  },
  {
    name: "Sophia K.",
    label: "BEAUTY EDITOR",
    quote: "The Peaches Peptide Serum has completely transformed my skin's elasticity. It feels so bouncy, plump, and smooth. A total staple in my routine.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    productId: "peaches-peptide-serum",
    productTitle: "Peaches Collagen Peptide Serum",
    productPrice: "$98.00",
    productImage: "/serum 3.webp"
  },
  {
    name: "Chloe L.",
    label: "VERIFIED CUSTOMER",
    quote: "I've been using the Golden Reset Radiance Oil every single night. It locks in deep moisture without feeling greasy at all. Absolute perfection.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    productId: "golden-reset-radiance-oil",
    productTitle: "Golden Reset Radiance Oil",
    productPrice: "$78.00",
    productImage: "/sun protection 1.png"
  },
  {
    name: "Jessica W.",
    label: "VERIFIED CUSTOMER",
    quote: "This Hydrating Essence is a complete game-changer! It primes my skin beautifully, locks down hydration, and leaves a gorgeous natural glow.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    productId: "glow-remedy-hydrating-essence",
    productTitle: "Glow Remedy Hydrating Essence",
    productPrice: "$78.00",
    productImage: "/toner 1.webp"
  }
];

export const EditorialTestimonials: React.FC<EditorialTestimonialsProps> = ({
  onAddToCart,
  settings,
  currentCurrency,
  products,
}) => {
  const activeCurrency = currentCurrency || SUPPORTED_CURRENCIES[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply high-end spring physics to dampen raw scroll events into liquid smooth ease with zero lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,    // High stiffness for instant, rigid, non-elastic tracking
    damping: 35,      // Perfect damping for tight, lag-free motion
    mass: 0.1,        // Ultra-low mass to completely eliminate rubber-band delay
    restDelta: 0.001
  });

  const isMobile = windowWidth < 1024;

  // Calculate pixel displacement so headings meet perfectly in the exact horizontal center
  const centerShift = 0.18 * Math.min(1280, windowWidth);

  // Horizontal Splitting Translations for Left/Right titles (Desktop only)
  // Starts centered at progress = 0 and smoothly moves outwards to edges at progress = 0.12
  const leftX = useTransform(smoothProgress, [0, 0.12], [isMobile ? "0px" : `${centerShift}px`, "0px"]);
  const rightX = useTransform(smoothProgress, [0, 0.12], [isMobile ? "0px" : `${-centerShift}px`, "0px"]);

  // Vertical Splitting Translations (Mobile only)
  // Starts centered vertically at progress = 0 and moves outwards to top/bottom at progress = 0.12
  const leftY = useTransform(smoothProgress, [0, 0.12], [isMobile ? "12vh" : "0px", "0px"]);
  const rightY = useTransform(smoothProgress, [0, 0.12], [isMobile ? "-12vh" : "0px", "0px"]);

  // Cards fade-in: immediately starts visible at progress = 0 and quickly completes fade-in as titles split
  const cardsOpacity = useTransform(smoothProgress, [0, 0.08], [0.1, 1]);

  // Vertical scrolling translation for the testimonial cards (starts immediately and centers last card at 0.95, then pauses until 1.0)
  const cardsY = useTransform(
    smoothProgress, 
    [0, 0.95, 1], 
    [
      isMobile ? "30px" : "180px", 
      isMobile ? "-1760px" : "-1820px",
      isMobile ? "-1760px" : "-1820px"
    ]
  );

  const handleQuickAdd = (productId: string) => {
    const list = products || mockProducts;
    const product = list.find(p => p.id === productId) || list[0];
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
      className="relative w-full h-[280vh] bg-[#FAF5F0]" // Snappy scroll track to support 6 cards beautifully and quickly without empty lag
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#FAF5F0] px-6 sm:px-12">
        
        {/* Full layout flex container */}
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col lg:flex-row items-center justify-between relative">
          
          {/* Left Title: Sticky on desktop, top on mobile */}
          <motion.div 
            style={{ x: leftX, y: leftY }}
            className="w-full lg:w-[28%] text-center lg:text-left pt-12 lg:pt-0 z-30"
          >
            <h2 className="font-serif font-light text-stone-900 tracking-normal text-3xl sm:text-4xl md:text-[40px] lg:text-[45px] leading-[1.2] no-luxury-underline title-no-underline">
              Don't just trust <span className="italic font-light">our</span> <br className="hidden lg:block" />
              words.
            </h2>
          </motion.div>

          {/* Center Column: Scrolling cards track */}
          <motion.div 
            style={{ opacity: cardsOpacity }}
            className="w-full lg:w-[44%] h-[46vh] lg:h-[70vh] overflow-hidden relative flex items-start justify-center my-4 lg:my-0 z-20"
          >
            {/* Ambient gradients to fade cards at the top and bottom edge */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#FAF5F0] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#FAF5F0] to-transparent z-20 pointer-events-none" />

            {/* Vertically animated track */}
            <motion.div 
              style={{ y: cardsY, transform: 'translateZ(0)' }}
              className="flex flex-col gap-10 w-full items-center py-24 pointer-events-auto will-change-transform"
            >
              {testimonials.map((test, idx) => {
                const isQuickAdded = addedProductId === test.productId;
                
                // Dynamically resolve real product from fetched Shopify list or mock data
                const list = products || mockProducts;
                const matchedProduct = list.find(p => p.id === test.productId) || list[idx % list.length];
                
                const productTitle = matchedProduct?.title || test.productTitle;
                const productPrice = matchedProduct?.price || test.productPrice;
                const productId = matchedProduct?.id || test.productId;
                
                // Get high-quality image from matched product or map to curated local public image frame
                let productImage = test.productImage;
                if (matchedProduct) {
                  const firstImg = matchedProduct.images[0] || '';
                  if (firstImg.startsWith('http://') || firstImg.startsWith('https://')) {
                    productImage = firstImg;
                  } else {
                    const id = matchedProduct.id.toLowerCase();
                    if (id.includes('serum')) {
                      productImage = '/Curated Essentials serum image frame.png';
                    } else if (id.includes('cleanser') || id.includes('essence') || id.includes('mist') || id.includes('toner')) {
                      productImage = '/Curated Essentials cleanser image frame.png';
                    } else if (id.includes('cream') || id.includes('balm') || id.includes('mask') || id.includes('shampoo') || id.includes('conditioner')) {
                      if (id.includes('eye-cream') || id.includes('eye')) {
                        productImage = '/Curated Essentials eye cream image frame.png';
                      } else {
                        productImage = '/Curated Essentials cream image frame.png';
                      }
                    } else if (id.includes('oil') || id.includes('spf') || id.includes('sun') || id.includes('fluid') || id.includes('shield') || id.includes('pad')) {
                      productImage = '/Curated Essentials eye cream image frame.png';
                    } else {
                      productImage = '/Curated Essentials serum image frame.png';
                    }
                  }
                }
                
                // Calculate responsive left-right stagger shifts for alternating cards
                const cardOffset = idx % 2 === 0 
                  ? (isMobile ? -16 : -45) 
                  : (isMobile ? 16 : 45);

                return (
                  <motion.div
                    key={idx}
                    style={{ x: cardOffset }}
                    className="w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] p-8 sm:p-10 rounded-[16px] bg-[#FCFAF7] border border-stone-200/40 shadow-[0_15px_45px_rgba(0,0,0,0.02)] flex flex-col justify-between will-change-transform transition-shadow duration-300 hover:shadow-[0_20px_55px_rgba(0,0,0,0.04)]"
                  >
                    {/* Customer Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3.5">
                        <img decoding="async" loading="lazy" 
                          src={test.avatar} 
                          alt={test.name} 
                          className="w-11 h-11 rounded-full object-cover border border-stone-200/50"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-left">
                          <p className="font-sans font-bold text-stone-950 text-sm leading-tight">{test.name}</p>
                          <p className="font-sans text-[10px] text-stone-450 font-bold tracking-widest uppercase mt-0.5">{test.label}</p>
                        </div>
                      </div>
                      {/* Elegant pushpin matching high-end boutique video */}
                      <Pin className="w-4 h-4 text-stone-400 -rotate-45" />
                    </div>

                    {/* Testimonial Quote */}
                    <div className="text-left mb-6">
                      <p className="font-serif italic text-stone-900 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed font-light">
                        “{test.quote}”
                      </p>
                    </div>

                    {/* Inner Product Pill */}
                    <div className="flex items-center justify-between p-4 rounded-[12px] bg-white border border-stone-200/30 shadow-xs">
                      <div className="flex items-center gap-3.5">
                        <img decoding="async" loading="lazy" 
                          src={productImage} 
                          alt={productTitle} 
                          className="w-14 h-14 rounded-lg object-contain bg-[#FAF9F6] border border-stone-150 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-left">
                          <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400 font-bold">XO WAVE</p>
                          <p className="font-sans font-bold text-stone-900 text-sm leading-tight line-clamp-1 mt-0.5">{productTitle}</p>
                          <p className="font-sans text-xs text-stone-600 mt-1 font-bold">{convertAndFormatPrice(productPrice, activeCurrency)}</p>
                        </div>
                      </div>

                      {/* Add to Cart button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleQuickAdd(productId);
                        }}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition duration-300 cursor-pointer shadow-xs shrink-0 ${
                          isQuickAdded 
                            ? 'bg-[#10B981] text-white hover:bg-[#069668]' 
                            : 'bg-[#00C4BA] text-white hover:bg-[#00B0A7]'
                        }`}
                        aria-label="Add to cart"
                      >
                        {isQuickAdded ? (
                          <Check className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <ShoppingCart className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Title: Sticky on desktop, bottom on mobile */}
          <motion.div 
            style={{ x: rightX, y: rightY }}
            className="w-full lg:w-[28%] text-center lg:text-right pb-12 lg:pb-0 z-30"
          >
            <h2 className="font-serif font-light text-stone-900 tracking-normal text-3xl sm:text-4xl md:text-[40px] lg:text-[45px] leading-[1.2] no-luxury-underline title-no-underline">
              See what people <br className="hidden lg:block" />
              <span className="italic font-light">are saying.</span>
            </h2>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
