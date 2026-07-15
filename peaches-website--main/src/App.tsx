import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Smartphone, Monitor, ChevronRight, Compass, Heart, Instagram, Mail, Calendar, Eye, Sparkles } from 'lucide-react';
import { CustomizerSettings, CartItem, Product } from './types';
import { mockProducts } from './products-data';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductMain } from './components/ProductMain';
import { CartDrawer } from './components/CartDrawer';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { SafeImage } from './components/SafeImage';
import { LuxuryCategoryShowcase } from './components/LuxuryCategoryShowcase';
import { LuxuryButton } from './components/LuxuryButton';
import { CurvedScrollText } from './components/CurvedScrollText';
import { PremiumSplitHeading, PremiumSlideInText, PremiumRevealImage, PremiumCircleIngredient } from './components/PremiumAnimations';
import { EditorialTestimonials } from './components/EditorialTestimonials';
import { CustomCursor } from './components/CustomCursor';

// Import high-quality generated assets
import serumCardImage from './assets/images/serum_card_1780759261384.png';
import tonerCardImage from './assets/images/toner_card_1780759276376.png';
import sunCardImage from './assets/images/sun_protection_card_1780759290161.png';
import haircareCardImage from './assets/images/haircare_card_1780759303152.png';
import heroModelsBgImage from './assets/images/hero_models_bg_1780759319937.png';

interface HighlightImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
}

const HighlightImage: React.FC<HighlightImageProps> = ({ src, fallbackSrc, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <div className="w-full h-[140px] sm:h-[180px] md:h-[220px] bg-[#FAF5F0] overflow-hidden flex items-center justify-center border-b border-stone-100 relative">
      <motion.img 
        src={imgSrc} 
        alt={alt}
        onError={() => {
          if (!hasError) {
            setImgSrc(fallbackSrc);
            setHasError(true);
          }
        }}
        className="h-[120px] sm:h-[150px] md:h-[180px] w-auto object-contain mix-blend-multiply cursor-pointer"
        initial={{ scale: 1.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        whileHover={{ 
          scale: 1.15,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1]
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default function App() {
  // 1. Theme editor / customizer initial default settings (Artistic Flair Preset)
  const [settings, setSettings] = useState<CustomizerSettings>({
    colorBg: '#FAF5F0',
    colorBgSecondary: '#F5EBE0',
    colorText: '#2D2926',
    colorAccent: '#b2a7f0',
    colorButton: '#b2a7f0',
    colorButtonText: '#1c1917',
    colorButtonHover: '#9c90eb',
    
    logoText: 'Peaches',
    announcementText: 'FREE SHIPPING ON ALL DOMESTIC ORDERS • WELCOME TO THE PEACH CLUB • NEW ARRIVALS DROPPING WEEKLY •',
    announcementSpeed: 80,
    
    heroHeading: 'Skin that glows from within.',
    heroSubheading: 'Discover the Peaches ritual: a curated selection of artisanal botanical extracts designed for effortless radiance.',
    heroButtonLabel: 'Shop the Glow',
    heroAlignment: 'left',
    heroParallax: true,

    bestsellersTitle: 'Daily Essentials',
    marqueeSpeed: 95,
    
    featuredTitle: 'Curated to nourish your skin, pamper your body, and elevate your natural beauty.',
    promoHeading: 'Turn blah days into spa days',
    promoSubheading: 'Pamper your skin from head to toe with our bodycare products—designed to deeply nourish, smooth, and refresh for soft, healthy skin every day.',
    promoImagePosition: 'left',
    
    animationSpeed: '0.3s'
  });

  // Pages & Navigation States
  const [activePage, setActivePage] = useState<'home' | 'product'>('home');
  const [activeProductId, setActiveProductId] = useState('overachiever-balm-cleanser');
  const [isMobileView, setIsMobileView] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activePromoCategory, setActivePromoCategory] = useState<'skincare' | 'makeup' | 'bodycare'>('skincare');

  // Premium website visual states matching Peaches screenshots
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>("Avocado Oil");
  const [activeRitualStep, setActiveRitualStep] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 23, minutes: 59, seconds: 48 });
  const [activeReelIdx, setActiveReelIdx] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showMatrixMore, setShowMatrixMore] = useState(false);
  const [bestsellerFilter, setBestsellerFilter] = useState<'ALL' | 'Serums' | 'Toners' | 'Sun Protections' | 'Hair Care'>('Serums');
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [reelCheckoutProduct, setReelCheckoutProduct] = useState<Product | null>(null);
  const [isHeroMounted, setIsHeroMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Countdown clock ticker interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 2, hours: 23, minutes: 59, seconds: 48 }; // Reset loop
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set default initial cart item
  useEffect(() => {
    setCartItems([
      {
        product: mockProducts[0],
        quantity: 1,
        selectedColor: mockProducts[0].colors[0]
      }
    ]);
  }, []);

  const handleNavigate = (page: 'home' | 'product', productId?: string) => {
    setActivePage(page);
    if (productId) {
      setActiveProductId(productId);
    }
    // Scroll window smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProduct = mockProducts.find(p => p.id === activeProductId) || mockProducts[0];

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number, colorIdx: number) => {
    const selectedColor = product.colors[colorIdx] || product.colors[0];
    const existingIdx = cartItems.findIndex(
      item => item.product.id === product.id && item.selectedColor.name === selectedColor.name
    );

    if (existingIdx > -1) {
      const updated = [...cartItems];
      updated[existingIdx].quantity += quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { product, quantity, selectedColor }]);
    }
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product, colorIdx: number) => {
    handleAddToCart(product, 1, colorIdx);
  };

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
      }
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleUpdateQty = (idx: number, qtyChange: number) => {
    const updated = [...cartItems];
    const target = updated[idx];
    if (target.quantity + qtyChange > 0) {
      target.quantity += qtyChange;
      setCartItems(updated);
    }
  };

  const handleRemoveItem = (idx: number) => {
    const updated = [...cartItems];
    updated.splice(idx, 1);
    setCartItems(updated);
  };

  // Ingredients and benefits lists
  const ingredientsCircles = [
    { name: "Avocado Oil", image: "https://images.unsplash.com/photo-1582284540020-8acae03f417a?q=80&w=350", benefit: "Deeply penetrates surface layers to restore fat-soluble vitamins and extreme elasticity to parched skin." },
    { name: "Acacia Extract", image: "https://images.unsplash.com/photo-1551248429-4043bcdc74af?q=80&w=350", benefit: "A natural organic firming agent that instantly tightens fine lines and structural cellular collagen." },
    { name: "Rose Extract", image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=350", benefit: "Soothes irritated base skin while balancing tender pH values with organic floral active lipids." },
    { name: "Tangerine Extract", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=350", benefit: "Exceptional antioxidant support rich in Vitamin C for immediate cell renewal and complexion brightness." },
    { name: "Annato Oil", image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=350", benefit: "Calms reactive skin areas while adding standard natural beta-carotene dermal protection." },
    { name: "Aloe Juice", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=350", benefit: "Provides moisturizing amino acid enzymes to quench delicate and inflamed skin cells." },
    { name: "Argan Oil", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=350", benefit: "Known as liquid gold, contains ultra-rich oleic acids to seal in hydration for long wear." }
  ];

  // Ritual steps images matching video category selections at 0:45
  const ritualSteps = [
    { label: "1. Skincare", title: "Cleanse, Tone & Hydrate", desc: "Reveal your best skin with our essentials—designed to cleanse, hydrate, and glow.", img: "https://images.unsplash.com/photo-1596701062351-df5f8af0d385?q=80&w=800", prodId: "overachiever-balm-cleanser" },
    { label: "2. Makeup", title: "Luminous Pearlescent Glows", desc: "Add effortless radiance to your features with peach lips and hydrating glosses.", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800", prodId: "peachy-dreams-lip-mask" },
    { label: "3. Bodycare", title: "Nourish & Smooth Skin Barrier", desc: "Treat and hydrate your body's moisture barrier with rich essential botanical lipids.", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800", prodId: "golden-reset-radiance-oil" }
  ];

  // Video reels story loops
  const videoReels = [
    { name: "lumiere.skin", duration: "12s ago", bg: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600", title: "Refreshing face mist cleansing!", prodId: "clean-canvas-gel-cleanser" },
    { name: "dermadiary", duration: "2h ago", bg: "https://images.unsplash.com/photo-1590156546746-c589b4855072?q=80&w=600", title: "Night skin massage with Velvet cream!", prodId: "overachiever-balm-cleanser" },
    { name: "botanicglow", duration: "1d ago", bg: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600", title: "Brilliant glowing skin formula essence", prodId: "glow-remedy-hydrating-essence" },
    { name: "earthyskincare", duration: "3d ago", bg: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600", title: "Golden Radiance Oil drops are luxurious!", prodId: "golden-reset-radiance-oil" }
  ];

  // Bestsellers filtering
  const filteredProducts = mockProducts.filter(p => {
    if (bestsellerFilter === 'ALL') return true;
    return p.tags.includes(bestsellerFilter);
  });

  return (
    <div className="relative min-h-screen bg-[#FAF5F0] text-stone-900 font-sans overflow-x-hidden selection:bg-[#F2A183] selection:text-white">
      {/* Premium custom mouse cursor outline animation */}
      <CustomCursor />
      
      {/* 2. THE FLOATING OPTIONS BUTTON */}
      <button
        onClick={() => setIsCustomizerOpen(true)}
        className="fixed bottom-6 right-6 bg-stone-900 hover:bg-stone-850 text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all z-[80] font-bold text-xs uppercase tracking-widest border border-[#F2A183]/50 flex items-center gap-2 cursor-pointer"
        aria-label="Customize branding and settings"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F2A183]"></span>
        </span>
        <Sparkles className="w-4 h-4 text-[#F2A183] animate-pulse" />
        <span>Customize Theme Presets</span>
      </button>

      {/* 1. SLIDING SIDE WINDOW DRAWER FOR THEME CUSTOMIZER OPTIONS */}
      <div 
        className={`fixed top-0 bottom-0 left-0 w-96 max-w-[85vw] bg-neutral-900 z-[90] shadow-2xl transition-transform duration-300 ease-out transform ${
          isCustomizerOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        <div className="sticky top-0 bg-stone-950 p-4 border-b border-stone-800 flex items-center justify-between text-white z-50">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wider">Theme Presets & Zip Exporter</span>
          </div>
          <button 
            onClick={() => setIsCustomizerOpen(false)}
            className="text-stone-400 hover:text-white px-2.5 py-1 text-sm bg-stone-900 rounded font-bold border border-stone-800 cursor-pointer"
          >
            Close &times;
          </button>
        </div>

        <ThemeCustomizer
          settings={settings}
          onChangeSettings={setSettings}
          isMobileView={isMobileView}
          onToggleView={() => setIsMobileView(!isMobileView)}
        />
      </div>

      {/* Dim backdrop */}
      {isCustomizerOpen && (
        <div 
          onClick={() => setIsCustomizerOpen(false)}
          className="fixed inset-0 bg-black/60 z-[85] transition-opacity duration-300"
        />
      )}

      {/* MAIN WEBSITE BODY PANEL */}
      <div className="w-full flex-col min-h-screen">
        
        {/* A. Announcement Bar marquee */}
        <AnnouncementBar settings={settings} />

        {/* B. Store Navigation Header */}
        <Header
          settings={settings}
          cartItems={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
          onNavigate={handleNavigate}
          isMobileView={isMobileView}
        />

        {/* C. PAGE CONTENT ROUTING */}
        {/* C. PAGE CONTENT ROUTING */}
        {activePage === 'home' ? (
          <div className="flex flex-col animate-fade-in">
            
            {/* 1. HERO BANNER - AUTOPLAY BEAUTY VIDEO & SCROLLING MARQUEE SYSTEM */}
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[440px] xs:h-[500px] sm:h-[680px] md:h-[720px] lg:h-[820px] flex items-center overflow-hidden select-none group bg-[#FAF5F0]"
            >
              {/* Premium Models Image Background */}
              {/* Desktop / Laptop background */}
              <SafeImage
                src="/hero image Laptop view.png"
                fallbackSrc={heroModelsBgImage}
                alt="Peaches Models Background (Laptop)"
                className={`absolute inset-0 w-full h-full object-cover object-[82%_center] select-none pointer-events-none z-0 hidden md:block hero-image-zoom ${isHeroMounted ? 'hero-entrance-active' : 'hero-entrance-start'}`}
              />
              {/* Mobile background */}
              <SafeImage
                src="/hero image mobile view.png"
                fallbackSrc={heroModelsBgImage}
                alt="Peaches Models Background (Mobile)"
                className={`absolute inset-0 w-full h-full object-cover object-[76%_center] select-none pointer-events-none z-0 block md:hidden hero-image-zoom ${isHeroMounted ? 'hero-entrance-active' : 'hero-entrance-start'}`}
              />

              {/* Gradient Backdrop Mask for cinematic light exposure */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/35 to-stone-950/20 z-10" />

              {/* VERTICAL FLOATING RAIL (LEFT SIDE OF HERO SCREENSHOT 1) */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 z-35 hidden lg:flex flex-col items-center bg-white/95 text-stone-900 border border-stone-200/50 py-6 px-3.5 shadow-xl rounded-full gap-5">
                {/* Facebook icon */}
                <a href="#" aria-label="Facebook" className="hover:text-[#F2A183] text-stone-700 transition">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                </a>
                
                {/* X / Twitter icon */}
                <a href="#" aria-label="X Twitter" className="hover:text-[#F2A183] text-stone-700 transition">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                
                {/* Pinterest icon */}
                <a href="#" aria-label="Pinterest" className="hover:text-[#F2A183] text-stone-700 transition">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.23 2.63 7.85 6.33 9.34-.1-.79-.19-2-.03-2.86.14-.79.93-4.04.93-4.04s-.24-.48-.24-1.19c0-1.11.65-1.94 1.45-1.94.68 0 1.01.51 1.01 1.12 0 .69-.44 1.72-.67 2.67-.19.8.4 1.45 1.19 1.45 1.43 0 2.53-1.51 2.53-3.69 0-1.93-1.39-3.28-3.37-3.28-2.29 0-3.64 1.72-3.64 3.5 0 .69.27 1.44.6 1.84.07.08.08.15.06.23l-.22.92c-.04.14-.12.18-.28.1-1.07-.5-1.63-1.89-1.63-3.04 0-2.48 1.8-4.75 5.19-4.75 2.73 0 4.85 1.95 4.85 4.54 0 2.71-1.71 4.9-4.09 4.9-.8 0-1.55-.42-1.8-.9l-.49 1.87c-.18.68-.66 1.54-.99 2.08 1.19.36 2.45.56 3.75.56 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                  </svg>
                </a>

                {/* Instagram icon */}
                <a href="#" aria-label="Instagram" className="hover:text-[#F2A183] text-stone-700 transition">
                  <svg className="w-4.5 h-4.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>

                <div className="w-full h-px bg-stone-200" />

                {/* Ambient theme toggle */}
                <button 
                  onClick={() => {
                    const el = document.documentElement;
                    el.classList.toggle('dark');
                  }} 
                  className="text-stone-700 hover:text-[#e76f51] transition cursor-pointer" 
                  aria-label="Toggle visual theme"
                >
                  <svg className="w-4.5 h-4.5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                  </svg>
                </button>

                {/* Pinned Vertical Back to Top Bar */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-stone-950 text-white text-[8px] font-mono hover:bg-[#e76f51] flex items-center justify-center gap-2 py-3 px-1 rounded-lg cursor-pointer transition-all uppercase tracking-widest mt-2"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  <span>Back to top</span>
                  <span className="text-[10px] font-sans">&uarr;</span>
                </button>
              </div>

              {/* Main Content Overlay Area */}
              <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 relative z-20 flex flex-col justify-between h-full py-8 sm:py-12 text-white text-left">
                
                {/* Keeping space layout correct */}
                <div className="mt-14" />



                {/* 2. HUGE DYNAMIC HORIZONTAL SCROLLING TEXT IN ACCORDANCE WITH SCREENSHOT 1 */}
                <div className="absolute inset-x-0 top-[22%] xs:top-[25%] sm:top-[28%] md:top-[32%] -translate-y-1/2 w-full overflow-hidden select-none pointer-events-none z-15">
                  <div 
                    className="flex whitespace-nowrap animate-marquee py-2" 
                    style={{ 
                      animationDuration: `${settings.marqueeSpeed || 25}s` 
                    }}
                  >
                    {/* First segment */}
                    <div className="flex shrink-0 font-heading italic text-white/15 sm:text-white/20 text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-none uppercase gap-4 pr-4">
                      {Array(3).fill(null).map((_, idx) => (
                        <span key={`hero-p-${idx}`} className="flex-shrink-0 flex items-center">
                          High quality <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span> Natural ingredients <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span> Personalized for you <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span>
                        </span>
                      ))}
                    </div>
                    {/* Duplicate Identical chunk for continuous loop */}
                    <div className="flex shrink-0 font-heading italic text-white/15 sm:text-white/20 text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-none uppercase gap-4 pr-4">
                      {Array(3).fill(null).map((_, idx) => (
                        <span key={`hero-q-${idx}`} className="flex-shrink-0 flex items-center">
                          High quality <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span> Natural ingredients <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span> Personalized for you <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Bottom Row: Paragraph and Button Block */}
                <div className="mt-8 flex flex-col md:flex-row justify-between items-end gap-6 w-full pt-12 border-t border-white/10">
                  <PremiumSlideInText as="p" delay={0.1} className="max-w-md leading-relaxed text-xs sm:text-sm text-stone-200 opacity-95 font-body font-normal select-text">
                    Reveal your best skin yet with our essentials—designed to cleanse, hydrate, and glow, every step of the way.
                  </PremiumSlideInText>
                  
                  {/* Shop now Block Button (aligned right matches screenshot exactly) */}
                  <PremiumSlideInText delay={0.25} className="flex select-none">
                    <LuxuryButton
                      onClick={() => {
                        const targetEl = document.getElementById('bestsellers-section');
                        targetEl?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-[#2D2926] bg-white hover:bg-[#FAF5F0] duration-300 active:scale-95 transition-all text-center rounded-sm shrink-0 cursor-pointer shadow-2xl font-sans"
                      label="Shop now"
                    />
                  </PremiumSlideInText>
                </div>

              </div>
            </motion.section>

            {/* 2. FOUR CORE CATEGORIES CARDS GRID */}
            <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1530px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                { title: "serums", label: "DEEP REPAIR & RADIANCE", img: serumCardImage, customImg: "/Serums.png", filter: "Serums" },
                { title: "Toners", label: "BALANCE & PRIMER", img: tonerCardImage, customImg: "/Toners.png", filter: "Toners" },
                { title: "sun protections", label: "UV SHIELD SPF 50+", img: sunCardImage, customImg: "/sun protections.png", filter: "Sun Protections" },
                { title: "haircare", label: "STRENGTH & GLOW", img: haircareCardImage, customImg: "/hair care.png", filter: "Hair Care" }
              ].map((cat, i) => (
                <PremiumSlideInText
                  key={i}
                  delay={i * 0.08}
                  className="relative aspect-[3/4] rounded-lg overflow-hidden group border border-stone-200/45 shadow-sm cursor-pointer select-none"
                  onClick={() => {
                    const filterVal = cat.filter as 'Serums' | 'Toners' | 'Sun Protections' | 'Hair Care';
                    setBestsellerFilter(filterVal);
                    document.getElementById('bestsellers-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <PremiumRevealImage 
                    src={cat.customImg} 
                    fallbackSrc={cat.img}
                    alt={cat.title} 
                    className="absolute inset-0 w-full h-full animate-none"
                    hoverZoom={true}
                  />
                  <div className="absolute inset-0 bg-stone-950/15 transition duration-500 group-hover:bg-stone-950/25 z-10 pointer-events-none" />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white text-left pointer-events-none">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-[#FCDCCD] font-bold mb-1 opacity-95 uppercase">{cat.label}</span>
                    <h3 className="font-serif text-2xl font-medium tracking-wide capitalize">{cat.title}</h3>
                  </div>
                </PremiumSlideInText>
              ))}
            </section>

            {/* 3. BESTSELLERS SECTION ("Glowing skin starts here") */}
            <section id="bestsellers-section" className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1530px] mx-auto w-full scroll-mt-6 border-t border-stone-200/50">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-6">
                <div className="text-left">
                  <PremiumSplitHeading className="font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight text-stone-900 font-normal hover-outline-text-effect">
                    Glowing skin starts here
                  </PremiumSplitHeading>
                </div>
                 {/* Tab layout matching the live shop design, centered inline filter list */}
                <div className="flex flex-row flex-nowrap items-center gap-4 sm:gap-8 font-sans overflow-x-auto scrollbar-none w-full md:w-auto -mx-6 px-6 md:mx-0 md:px-0">
                  {([ 'Serums', 'Toners', 'Sun Protections', 'Hair Care'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setBestsellerFilter(filter)}
                      className={`text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest whitespace-nowrap shrink-0 transition duration-300 relative py-1 cursor-pointer font-medium ${
                        bestsellerFilter === filter 
                          ? 'text-stone-950 font-bold' 
                          : 'text-stone-400 hover:text-stone-950'
                      }`}
                    >
                      <span className="relative z-10">{filter}</span>
                      {bestsellerFilter === filter && (
                        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-950" />
                      )}
                    </button>
                  ))}
                  
                  {/* Shop all link on the right side */}
                  <span className="hidden md:inline-block text-stone-300">|</span>
                  <button 
                    onClick={() => {
                      setBestsellerFilter('Serums');
                    }}
                    className="hidden md:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#e76f51] hover:text-stone-900 transition-colors duration-200 cursor-pointer"
                  >
                    <span>Shop all bestsellers</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Desktop view: 4 products staggered grid with luxury slow blur animations */}
              <motion.div 
                key={`desktop-${bestsellerFilter}`}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.42 // Extremely elegant sequential step-by-step stagger (counting 1... 2... 3... 4...)
                    }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }} // Triggers only when 35% of the section is visible in screen view
                className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 w-full mt-2"
              >
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        y: 110, // Moves straight upward from the bottom middle
                        filter: "blur(14px)",
                        scale: 0.97
                      },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        filter: "blur(0px)",
                        scale: 1,
                        transition: {
                          duration: 2.3, // Silky slow premium transition duration
                          ease: [0.16, 1, 0.3, 1] // Custom luxury cubic-bezier ease out
                        }
                      }
                    }}
                    className="w-full bg-transparent"
                  >
                    <ProductCard
                      product={product}
                      colorText={settings.colorText}
                      colorAccent={settings.colorAccent}
                      colorButton={settings.colorButton}
                      colorButtonText={settings.colorButtonText}
                      onNavigate={(productId) => handleNavigate('product', productId)}
                      onQuickAdd={handleQuickAdd}
                      variant="minimal"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile view: Horizontal Carousel showing exactly 1 product nicely per frame */}
              <div className="sm:hidden w-full relative mt-4">
                <div 
                  ref={carouselRef}
                  onScroll={handleCarouselScroll}
                  className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 scrollbar-none gap-0"
                >
                  {filteredProducts.map((product, idx) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        filter: "blur(0px)",
                        transition: {
                          duration: 1.4,
                          ease: [0.16, 1, 0.3, 1],
                          delay: idx * 0.12 // Clean sequence stagger
                        }
                      }}
                      viewport={{ once: true, amount: 0.15 }}
                      className="w-full shrink-0 snap-center px-4"
                    >
                      <ProductCard
                        product={product}
                        colorText={settings.colorText}
                        colorAccent={settings.colorAccent}
                        colorButton={settings.colorButton}
                        colorButtonText={settings.colorButtonText}
                        onNavigate={(productId) => handleNavigate('product', productId)}
                        onQuickAdd={handleQuickAdd}
                        variant="minimal"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Slider Arrow Controls and indicator progress line */}
                <div className="flex items-center justify-between gap-6 -mt-2 px-4 w-full">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => scrollCarousel('left')}
                      className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 bg-white hover:bg-stone-50 transition-all active:scale-95 shadow-xs cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <span className="text-sm font-bold">&larr;</span>
                    </button>
                    <button 
                      onClick={() => scrollCarousel('right')}
                      className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 bg-white hover:bg-stone-50 transition-all active:scale-95 shadow-xs cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <span className="text-sm font-bold">&rarr;</span>
                    </button>
                  </div>

                  {/* Clean scale-proportionate progress line indicator */}
                  <div className="flex-1 max-w-xs h-[1.5px] bg-stone-200 relative overflow-hidden">
                    <div 
                      className="absolute top-0 bottom-0 left-0 bg-stone-900 transition-transform duration-300 ease-out"
                      style={{ 
                        width: `${100 / Math.max(1, filteredProducts.length)}%`,
                        transform: `translateX(${scrollProgress * (filteredProducts.length - 1) * 100}%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SHOP BY INGREDIENTS BULLET CARDS (Image 2 - Left Aligned, Large Circles, Non-Selectable) */}
            <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1530px] mx-auto w-full border-b border-stone-200/50">
              {/* Header block with see all link on right */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
                <div className="text-left">
                  <PremiumSlideInText as="span" className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-65 block mb-1">
                    Pure Extracts
                  </PremiumSlideInText>
                  <PremiumSplitHeading className="font-heading italic text-4xl sm:text-5xl text-stone-900 tracking-tight leading-[1.1] mb-1.5 block">
                    Shop by ingredients
                  </PremiumSplitHeading>
                  <PremiumSlideInText as="p" delay={0.15} className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md leading-relaxed">
                    Strengthens your skin's barrier for a healthier, natural glow.
                  </PremiumSlideInText>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <PremiumSlideInText delay={0.25}>
                    <button 
                      onClick={() => handleNavigate('home')}
                      className="group font-subheading text-xs font-bold uppercase tracking-widest text-stone-800 hover:text-stone-950 flex items-center gap-1.5 duration-155 pl-1 md:pl-0 cursor-pointer"
                    >
                      <span className="relative luxury-underline">See all ingredients</span> 
                      <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                    </button>
                  </PremiumSlideInText>
                </div>
              </div>

              {/* High precision rounded layout with big circles, with beautiful mobile horizontal swipe displaying two per frame */}
              <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 scrollbar-none snap-x snap-mandatory scroll-smooth w-full px-1 justify-start sm:justify-center items-center">
                {ingredientsCircles.map((ing, idx) => (
                  <div
                    key={ing.name}
                    className="flex flex-col items-center gap-3.5 select-none text-center w-[calc(50%-8px)] sm:w-auto shrink-0 snap-start"
                  >
                    <PremiumCircleIngredient
                      image={ing.image}
                      name={ing.name}
                      delay={idx * 0.06}
                    />
                    {/* Elegant serif typography matching original website screenshot */}
                    <span className="text-[13px] sm:text-sm md:text-base font-serif font-normal text-stone-900 tracking-wide leading-tight block">
                      {ing.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* CURATED ULTRA-LUXURY CATEGORIES SHOWCASE (Images 4 & 5 Redesign) */}
            <LuxuryCategoryShowcase onNavigate={handleNavigate} settings={settings} />

            {/* CURVED SCROLL TEXT DRIVEN BY GSAP SCROLLTRIGGER */}
            <CurvedScrollText />

            {/* INTERACTIVE BEFORE AND AFTER IMAGE SLIT PREVIEW DRAG SLIDER */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-[1530px] mx-auto w-full select-none"
            >

              {/* The Slider component frame - horizontal rectangle layout matching the template exactly! */}
              <div className="relative w-full h-[220px] xs:h-[260px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-sm select-none">
                
                {/* AFTER image: High-Resolution Dewy Skincare Model with glowing, smooth skin */}
                <div className="absolute inset-0">
                  <img 
                    src="/After girl.png" 
                    alt="After Peaches skincare treatment" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* BEFORE image (clipped dynamically by sliding %). We use the identical underlying model photograph for perfect, gapless layout! */}
                <div 
                  className="absolute inset-0 border-r-2 border-white/90" 
                  style={{ clipPath: `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)` }}
                >
                  <img 
                    src="/Before girl.png" 
                    alt="Before Peaches skincare treatment" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Vertical handle bar cursor guide with gorgeous solid white pause button pointer */}
                <div 
                  className="absolute top-0 bottom-0 w-[1.5px] bg-white/90 z-20 pointer-events-none" 
                  style={{ left: `${sliderVal}%` }}
                >
                  {/* Perfect solid white circle knob with a dark slate pause icon symbol '||' inside */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 rounded-full bg-white border border-stone-200/50 shadow-xl flex items-center justify-center pointer-events-none transition duration-150 transform hover:scale-110">
                    <div className="flex gap-1.5 items-center justify-center">
                      <div className="w-[3px] h-[14px] bg-[#292524] rounded-full"></div>
                      <div className="w-[3px] h-[14px] bg-[#292524] rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Invisible HTML range capturing touch and mouse events seamlessly */}
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderVal} 
                  onChange={(e) => setSliderVal(Number(e.target.value))} 
                  className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full" 
                  aria-label="Drag to verify results"
                />
              </div>
            </motion.section>

            {/* VIDEO REELS LIVE STORIES STORIES GRID */}
            <section className="py-6 sm:py-10 bg-[#F5EBE0]/60 border-y border-stone-200/40 select-none">
              <div className="max-w-full px-4 sm:px-6 md:px-8">
                
                {/* Genuine elegant left-aligned brand story headers */}
                <div className="text-left mb-6 md:mb-8 w-full select-none">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest opacity-60 block text-stone-600 font-bold">HOT ON SOCIAL</span>
                  <PremiumSplitHeading className="font-heading italic text-3xl sm:text-4xl lg:text-5xl leading-tight mt-1 mb-1 block text-stone-900 hover-outline-text-effect">See others' glow journey</PremiumSplitHeading>
                </div>

                {/* Highly responsive layout perfectly representing visual cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
                  {videoReels.map((reel, idx) => {
                    const matchedProd = mockProducts.find(p => p.id === reel.prodId);
                    return (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, scale: 1.18 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.35 }}
                        transition={{ 
                          duration: 1.6, 
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="flex flex-col group select-none cursor-pointer"
                        onClick={() => {
                          if (matchedProd) {
                            setReelCheckoutProduct(matchedProd);
                          }
                        }}
                      >
                        {/* 1. TOP VIDEO PORTRAIT WRAPPER WITH GORGEOUS USER DETAILS */}
                        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 flex items-center justify-center rounded-none">
                          {/* Aesthetic Cover Visual simulating premium video */}
                          <PremiumRevealImage 
                            src={reel.bg} 
                            fallbackSrc={reel.bg}
                            alt={reel.name} 
                            className="absolute inset-0 w-full h-full object-cover"
                            hoverZoom={true}
                          />
                          
                          {/* Rich bottom-weighted dark cinema gradient scrim overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-black/10 to-stone-950/35 z-10 pointer-events-none" />

                          {/* Dynamic controls in Top Right corner */}
                          <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                            {/* Play Circle Icon */}
                            <div className="w-8 h-8 rounded-full border border-white/40 bg-white/10 backdrop-blur-[2px] flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition shadow-xs">
                              <svg className="w-2.5 h-2.5 fill-current ml-0.5" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>

                            {/* Audio Speaker Mute Toggle Indicator */}
                            <button 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setIsMuted(!isMuted); 
                              }}
                              className="w-8 h-8 rounded-full border border-white/40 bg-white/10 backdrop-blur-[2px] flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition shadow-xs"
                              aria-label="Toggle mute state"
                            >
                              {isMuted ? (
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z"/>
                                </svg>
                              ) : (
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/>
                                </svg>
                              )}
                            </button>
                          </div>

                          {/* Authentic Instagram Username at Bottom Left of card frame */}
                          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 z-20 text-white select-none pointer-events-none">
                            <Instagram className="w-3.5 h-3.5 text-white hover:scale-105 transition" />
                            <span className="text-xs font-semibold leading-none select-none tracking-wide text-white drop-shadow-sm">{reel.name}</span>
                          </div>
                        </div>

                        {/* 2. REPUTABLE BOTTOM PRODUCT CARD METADATA STRIP */}
                        <div className="flex items-center gap-3 p-3 bg-white rounded-none transition-colors">
                          {/* Miniature Product Package Thumbnail */}
                          <div className="w-12 h-12 rounded-none bg-stone-50 border border-stone-100 flex-shrink-0 overflow-hidden flex items-center justify-center p-1">
                            <img 
                              src={matchedProd?.images[0]} 
                              alt={matchedProd?.title} 
                              className="w-full h-full object-contain mix-blend-multiply" 
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Brand, Title, and Price Text with premium editorial alignment */}
                          <div className="flex-1 min-w-0 text-left">
                            <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-mono font-medium leading-none">{matchedProd?.vendor || "XO WAVE"}</span>
                            <span className="block text-xs font-semibold text-stone-900 truncate mt-1 leading-tight">{matchedProd?.title}</span>
                            <span className="block text-xs font-medium text-stone-600 mt-1">{matchedProd?.price}</span>
                          </div>

                          {/* Pure theme accent rounded buy cart slider trigger */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (matchedProd) {
                                setReelCheckoutProduct(matchedProd);
                              }
                            }}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all shadow-xs flex-shrink-0 cursor-pointer"
                            style={{ backgroundColor: settings.colorButton, color: settings.colorButtonText }}
                            aria-label={`Buy ${matchedProd?.title}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* NESTED DYNAMIC INLINE CHECKOUT MODAL BOX FOR REEL PRODUCT EXTRAS */}
            {reelCheckoutProduct && (
              <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border animate-fade-in">
                  <button 
                    onClick={() => setReelCheckoutProduct(null)}
                    className="absolute top-4 right-4 w-7 h-7 rounded-sm flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold border rounded-full text-xs cursor-pointer"
                  >
                    &times;
                  </button>
                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest block">{reelCheckoutProduct.vendor}</span>
                  <h4 className="font-heading italic text-xl font-bold mt-1 text-[#2D2926]">{reelCheckoutProduct.title}</h4>
                  
                  <div className="flex items-center gap-4 my-4 border-y py-3 border-stone-100">
                    <img src={reelCheckoutProduct.images[0]} alt={reelCheckoutProduct.title} className="w-16 h-16 object-cover rounded-md border" />
                    <div>
                      <span className="text-xs font-mono font-bold tracking-tight text-emerald-800 bg-emerald-50 px-2 py-1 rounded">Prepacked Glow</span>
                      <p className="text-sm font-bold font-mono mt-1.5">{reelCheckoutProduct.price}</p>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-gray-650 mb-4">{reelCheckoutProduct.description}</p>
                  
                  <div className="flex gap-2">
                    <LuxuryButton
                      type="button"
                      onClick={() => {
                        handleAddToCart(reelCheckoutProduct, 1, 0);
                        setReelCheckoutProduct(null);
                      }}
                      className="flex-1 py-3 bg-stone-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-stone-850"
                      label="Add To Checkout Bag"
                    />
                    <LuxuryButton
                      type="button"
                      onClick={() => {
                        handleNavigate('product', reelCheckoutProduct.id);
                        setReelCheckoutProduct(null);
                      }}
                      className="py-3 px-4 bg-stone-100 text-[#2D2926] rounded text-[10px] font-bold uppercase tracking-wider hover:bg-stone-200 border"
                      label="View Details"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FLASH SALE TIMER BANNER AS SHOWN IN SCREENSHOTS */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative overflow-hidden border-y border-stone-200 bg-[#FAF5F0] select-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Left column: Beautiful portrait photo of model holding products */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto min-h-[260px] xs:min-h-[320px] sm:min-h-[480px] lg:min-h-[580px] overflow-hidden bg-[#E3DCD6] group/image">
                  <img 
                    src="/hero image Laptop view.png" 
                    alt="Peaches Skincare Essentials" 
                    className="absolute inset-0 w-full h-full object-contain bg-[#E3DCD6] select-none transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.07]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Right column: Solid light periwinkle/lilac background with elegant centered elements */}
                <div className="bg-[#DBDCF5] flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden min-h-[480px] lg:min-h-[580px]">
                  
                  {/* Lilac content wrapper centered vertically */}
                  <div className="my-auto flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center w-full">
                    
                    {/* Small upper uppercase subtitle */}
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-stone-700 font-bold block select-none">
                      FLASHSALE
                    </span>

                    {/* Main Title of flash sale with exact editorial typography and alignments */}
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.2] text-stone-900 tracking-tight font-medium max-w-md select-none">
                      Hurry! Exclusive offers on <span className="italic">your</span>
                      <br />
                      <span className="italic">beauty essentials</span>
                    </h2>

                    {/* Square black button */}
                    <div className="pt-2">
                      <LuxuryButton
                        type="button"
                        onClick={() => handleNavigate('product', 'overachiever-balm-cleanser')}
                        className="px-8 py-3.5 bg-black hover:bg-stone-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-xs shrink-0 cursor-pointer rounded-none border-none"
                        label="Shop Flashsale"
                      />
                    </div>

                    {/* Ticking live countdown serif digits on the pure periwinkle canvas */}
                    <div className="flex justify-center items-center gap-5 sm:gap-10 py-4 sm:py-6 select-none font-serif w-full">
                      {[
                        { label: 'DAYS', val: String(timeLeft.days) },
                        { label: 'HOURS', val: String(timeLeft.hours).padStart(2, '0') },
                        { label: 'MINUTES', val: String(timeLeft.minutes).padStart(2, '0') },
                        { label: 'SECONDS', val: String(timeLeft.seconds).padStart(2, '0') },
                      ].map((cell, idx) => (
                        <div key={idx} className="flex flex-col items-center min-w-[55px] sm:min-w-[85px]">
                          <span className="text-5xl sm:text-6xl md:text-7xl font-light text-stone-900 leading-none tracking-tight">
                            {cell.val}
                          </span>
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-stone-600 font-sans font-bold mt-3">
                            {cell.label}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

              </div>

              {/* Bottom pink stripe running full screen-width across bottom of entire grid */}
              <div className="w-full bg-[#FCAB96] py-3.5 border-t border-stone-800/10 overflow-hidden select-none relative flex">
                <div 
                  className="animate-marquee font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-stone-900 font-bold flex gap-12 sm:gap-20 whitespace-nowrap"
                  style={{ animationDuration: '32s' }}
                >
                  {Array(16).fill(null).map((_, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3.5">
                      <svg className="w-3.5 h-3.5 text-stone-900 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                      </svg>
                      <span>Coming soon</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.section>

            {/* "BEHIND THE GLOW: INGREDIENT HIGHLIGHTS" COMPARISON TABLE */}
            <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1530px] mx-auto w-full">
              <div className="text-left mb-5 sm:mb-6 max-w-2xl pl-1 sm:pl-2">
                <PremiumSlideInText as="span" className="font-mono text-xs uppercase tracking-widest opacity-60 block text-left">Deep Product Comparison</PremiumSlideInText>
                <PremiumSplitHeading className="font-heading italic text-3xl sm:text-4xl leading-tight mt-1 text-[#2D2926] mb-1.5 block text-left">Behind the Glow: Ingredient highlights</PremiumSplitHeading>
                <PremiumSlideInText as="p" delay={0.15} className="text-xs sm:text-sm text-gray-600 mt-2 text-left">Evaluate formulas side-by-side to understand which active is structured for your skin goals.</PremiumSlideInText>
              </div>

              {/* Responsive table block with side-by-side products matching Peaches spec */}
              <div className="overflow-x-auto border border-stone-200 shadow-xs bg-[#FAF9F5]">
                <table className="w-full text-left font-sans text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-stone-200">
                      {/* Column 0: Ingredient name cell header */}
                      <th className="p-3 sm:p-4 w-[14%] bg-stone-50/5"></th>
                      {/* Column 1: Serums product */}
                      <th className="p-0 w-[28.6%] bg-stone-50/5 border-l border-stone-200/60 font-normal">
                        <div className="flex flex-col h-full bg-[#FAF5F0]">
                          {/* Image Box */}
                          <HighlightImage
                            src="/serum 2.webp"
                            fallbackSrc="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600"
                            alt="Super Retinol Vitamin A Serum"
                          />
                          {/* Product Title */}
                          <div className="p-3 text-left flex flex-col justify-between flex-grow min-h-[70px] sm:min-h-[80px] bg-white">
                            <h3 className="font-serif italic text-stone-900 text-sm sm:text-[14px] leading-snug font-normal line-clamp-2">
                              Super Retinol Vitamin A Serum
                            </h3>
                          </div>
                          {/* Lavender Button */}
                          <LuxuryButton 
                            type="button"
                            onClick={() => handleNavigate('product', 'super-retinol-vitamin-a')}
                            className="w-full py-2.5 bg-[#B0B2F8] hover:bg-[#9FA1EB] text-stone-900 text-xs font-semibold tracking-wider transition-colors rounded-none border-none cursor-pointer text-center select-none"
                            label="View now"
                          />
                        </div>
                      </th>
                      {/* Column 2: Toners product */}
                      <th className="p-0 w-[28.7%] bg-stone-50/5 border-l border-stone-200/60 font-normal">
                        <div className="flex flex-col h-full bg-[#FAF5F0]">
                          {/* Image Box */}
                          <HighlightImage
                            src="/toner 1.webp"
                            fallbackSrc="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600"
                            alt="Glow Remedy Hydrating Essence"
                          />
                          {/* Product Title */}
                          <div className="p-3 text-left flex flex-col justify-between flex-grow min-h-[70px] sm:min-h-[80px] bg-white">
                            <h3 className="font-serif italic text-stone-900 text-sm sm:text-[14px] leading-snug font-normal line-clamp-2">
                              Glow Remedy Hydrating Essence
                            </h3>
                          </div>
                          {/* Lavender Button */}
                          <LuxuryButton 
                            type="button"
                            onClick={() => handleNavigate('product', 'glow-remedy-hydrating-essence')}
                            className="w-full py-2.5 bg-[#B0B2F8] hover:bg-[#9FA1EB] text-stone-900 text-xs font-semibold tracking-wider transition-colors rounded-none border-none cursor-pointer text-center select-none"
                            label="View now"
                          />
                        </div>
                      </th>
                      {/* Column 3: Sun Protections product */}
                      <th className="p-0 w-[28.7%] bg-stone-50/5 border-l border-stone-200/60 font-normal">
                        <div className="flex flex-col h-full bg-[#FAF5F0]">
                          {/* Image Box */}
                          <HighlightImage
                            src="/sun protection 1.png"
                            fallbackSrc="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600"
                            alt="Peach Matte Daily Sun Shield SPF 50+"
                          />
                          {/* Product Title */}
                          <div className="p-3 text-left flex flex-col justify-between flex-grow min-h-[70px] sm:min-h-[80px] bg-white">
                            <h3 className="font-serif italic text-stone-900 text-sm sm:text-[14px] leading-snug font-normal line-clamp-2">
                              Peach Matte Daily Sun Shield SPF 50+
                            </h3>
                          </div>
                          {/* Lavender Button */}
                          <LuxuryButton 
                            type="button"
                            onClick={() => handleNavigate('product', 'peaches-daily-spf-50')}
                            className="w-full py-2.5 bg-[#B0B2F8] hover:bg-[#9FA1EB] text-stone-900 text-xs font-semibold tracking-wider transition-colors rounded-none border-none cursor-pointer text-center select-none"
                            label="View now"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 bg-[#FAF9F5]/40">
                    <tr className="hover:bg-amber-50/10 transition-colors">
                      <td className="py-2.5 px-3 font-subheading font-bold text-stone-900 text-xs sm:text-[13px] tracking-tight bg-stone-100/25">
                        Niacinamide
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Brightens skin and strengthens barrier
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Balances tone and reduces redness
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Evens out and illuminates skin tone
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/10 transition-colors">
                      <td className="py-2.5 px-3 font-subheading font-bold text-stone-900 text-xs sm:text-[13px] tracking-tight bg-stone-100/25">
                        Hyaluronic Acid
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Deep hydration for lasting moisture
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Boosts elasticity and plumpness
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Locks in moisture and softens skin
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/10 transition-colors">
                      <td className="py-2.5 px-3 font-subheading font-bold text-stone-900 text-xs sm:text-[13px] tracking-tight bg-stone-100/25">
                        Retinol
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Reduces fine lines and wrinkles
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Encourages cell renewal
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Smooths and firms the skin
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/10 transition-colors">
                      <td className="py-2.5 px-3 font-subheading font-bold text-stone-900 text-xs sm:text-[13px] tracking-tight bg-stone-100/25">
                        Vitamin C
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Brightens and fades dark spots
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Protects against free radicals
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Enhances natural radiance
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/10 transition-colors">
                      <td className="py-2.5 px-3 font-subheading font-bold text-stone-900 text-xs sm:text-[13px] tracking-tight bg-stone-100/25">
                        Peptides
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Promotes collagen production
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Strengthens skin structure
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        Improves firmness and elasticity
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7. VERIFIED TESTIMONIALS */}
            <EditorialTestimonials onAddToCart={handleAddToCart} settings={settings} />

          </div>
        ) : (
          /* D. PRODUCT DESCRIPTION DETAIL SCREEN */
          <ProductMain
            product={activeProduct}
            settings={settings}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => setActivePage('home')}
          />
        )}

        {/* E. FOOTER */}
        <footer 
          className="py-10 sm:py-12 px-6 border-t text-sm font-subheading select-none mt-auto"
          style={{ 
            backgroundColor: settings.colorBgSecondary,
            color: settings.colorText,
            borderColor: `${settings.colorText}1a`
          }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="font-heading italic font-semibold text-xl tracking-wider mb-6">Peaches Store<span className="text-xs font-normal align-super">&copy;</span></h3>
              <p className="text-xs line-clamp-4 leading-relaxed opacity-85">
                At Peaches, we are dedicated to creating organic, clean skin products crafted to enhance and enrich your natural beauty. Est. 2026.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest mb-6 opacity-80">Shop Catalog</h4>
              <ul className="space-y-3 text-xs opacity-75 text-left">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('home'); }} className="hover:underline">Clean Canvas Cleansers</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('home'); }} className="hover:underline">Glow Hydrating Essences</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('home'); }} className="hover:underline">Barrier Repair Moisturizers</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('home'); }} className="hover:underline">Weekly Relief Hydrators</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest mb-6 opacity-80">Information</h4>
              <ul className="space-y-3 text-xs opacity-75 text-left">
                <li><a href="#" className="hover:underline">About Our Brand</a></li>
                <li><a href="#" className="hover:underline">Esthetics FAQs</a></li>
                <li><a href="#" className="hover:underline font-semibold">Contact Estheticians</a></li>
                <li><a href="#" className="hover:underline">Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest mb-6 opacity-80">Newsletter Connection</h4>
              <p className="text-[11px] opacity-75 leading-relaxed mb-4 text-left">Register to receive our latest collections updates, stories and seasonal offers.</p>
              <form className="flex border-b pb-2" style={{ borderColor: `${settings.colorText}22` }}>
                <input type="email" placeholder="Your email address" className="w-full text-xs outline-none bg-transparent py-1 border-none text-[#2c1a11] px-0 placeholder-neutral-500" required />
                <button type="submit" className="hover:translate-x-1 transition-transform" aria-label="Confirm signup">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] opacity-60 gap-4 font-mono select-none" style={{ borderColor: `${settings.colorText}1a` }}>
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} - Peaches Wave (Preset Peaches Theme Replica). Designed for Shopify OS 2.0.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:underline animate-duration-300">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </footer>

        {/* F. SHOPPING CART DRAWER PORTALS */}
        <CartDrawer
          isOpen={isCartOpen}
          settings={settings}
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
        />

      </div>

    </div>
  );
}
