import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowRight, ArrowLeft, Smartphone, Monitor, ChevronRight, Compass, Heart, Instagram, Mail, Calendar, Eye, Sparkles, Facebook, Moon, ChevronUp, ShoppingCart, CreditCard, Globe, Headphones, Zap, Truck, X } from 'lucide-react';
import { CustomizerSettings, CartItem, Product } from './types';
import { mockProducts } from './products-data';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductMain } from './components/ProductMain';
import { CartDrawer } from './components/CartDrawer';
import { DiscountPopup } from './components/DiscountPopup';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { SafeImage } from './components/SafeImage';
import { SocialProofNotifier } from './components/SocialProofNotifier';
import { fetchShopifyProducts } from './lib/shopify';
import { LuxuryCategoryShowcase } from './components/LuxuryCategoryShowcase';
import { LuxuryButton } from './components/LuxuryButton';
import { CurvedScrollText } from './components/CurvedScrollText';
import { PremiumSplitHeading, PremiumSlideInText, PremiumRevealImage, PremiumCircleIngredient } from './components/PremiumAnimations';
import { EditorialTestimonials } from './components/EditorialTestimonials';
import { CommunityInstagramFeed } from './components/CommunityInstagramFeed';
import { FaqSection } from './components/FaqSection';
import { CustomCursor } from './components/CustomCursor';
import { AboutPage, CertificatesPage, ContactPage, PartnersPage } from './components/ZisuPages';
import { FeaturesCollection } from './components/FeaturesCollection';
import { Currency, SUPPORTED_CURRENCIES, convertAndFormatPrice } from './lib/currency';
import { SearchOverlay } from './components/SearchOverlay';
import { OptimizedVideo } from './components/OptimizedVideo';
import { SkincareChatbot } from './components/SkincareChatbot';

// Import high-quality generated assets
import serumCardImage from './assets/images/serum_card_1780759261384.png';
import tonerCardImage from './assets/images/toner_card_1780759276376.png';
import sunCardImage from './assets/images/sun_protection_card_1780759290161.png';
import haircareCardImage from './assets/images/haircare_card_1780759303152.png';
import heroModelsBgImage from './assets/images/hero_models_bg_1780759319937.png';
import ParallaxQuoteSection from './components/ParallaxQuoteSection';

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

interface MutedAutoplayVideoProps {
  src: string;
  isMuted: boolean;
  className?: string;
  poster?: string;
  aboveTheFold?: boolean;
}

const MutedAutoplayVideo: React.FC<MutedAutoplayVideoProps> = ({ src, isMuted, className, poster, aboveTheFold = false }) => {
  return (
    <OptimizedVideo
      src={src}
      poster={poster}
      className={className}
      autoplay={true}
      muted={isMuted}
      aboveTheFold={aboveTheFold}
    />
  );
};

export default function App() {
  // 1. Theme editor / customizer initial default settings (Artistic Flair Preset)
  const [settings, setSettings] = useState<CustomizerSettings>({
    colorBg: '#FAF5F0',
    colorBgSecondary: '#F5EBE0',
    colorText: '#2D2926',
    colorAccent: '#00C4BA',
    colorButton: '#00C4BA',
    colorButtonText: '#ffffff',
    colorButtonHover: '#00A39A',
    
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
  const [activePage, setActivePage] = useState<'home' | 'product' | 'about' | 'certificates' | 'contact' | 'partners'>('home');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]);
  const [footerCurrencyMenuOpen, setFooterCurrencyMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const currencyFlags: Record<string, string> = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    CAD: '🇨🇦',
    AUD: '🇦🇺',
    JPY: '🇯🇵',
    KRW: '🇰🇷',
    INR: '🇮🇳',
    CNY: '🇨🇳',
    AED: '🇦🇪'
  };
  const [activeProductId, setActiveProductId] = useState('overachiever-balm-cleanser');
  const [isMobileView, setIsMobileView] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Discount Promo States
  const [isDiscountApplied, setIsDiscountApplied] = useState(() => {
    return localStorage.getItem('zisuc_discount_applied') === 'true';
  });
  const [appliedCode, setAppliedCode] = useState(() => {
    return localStorage.getItem('zisuc_applied_code') || '';
  });

  const handleApplyDiscount = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ZISUC10') {
      setIsDiscountApplied(true);
      setAppliedCode(clean);
      localStorage.setItem('zisuc_discount_applied', 'true');
      localStorage.setItem('zisuc_applied_code', clean);
      return true;
    }
    return false;
  };

  const handleRemoveDiscount = () => {
    setIsDiscountApplied(false);
    setAppliedCode('');
    localStorage.removeItem('zisuc_discount_applied');
    localStorage.removeItem('zisuc_applied_code');
  };

  const handleApplyDiscountDirectly = (code: string) => {
    handleApplyDiscount(code);
    setIsCartOpen(true);
  };

  const activePromoCategory = useState<'skincare' | 'makeup' | 'bodycare'>('skincare')[0]; // simple read-only fallback or original line placeholder
  const [, setActivePromoCategory] = useState<'skincare' | 'makeup' | 'bodycare'>('skincare');
  
  // Shopify state
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Premium website visual states matching Peaches screenshots
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>("Avocado Oil");
  const [activeRitualStep, setActiveRitualStep] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 23, minutes: 59, seconds: 48 });
  const [activeReelIdx, setActiveReelIdx] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showMatrixMore, setShowMatrixMore] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [activeReel, setActiveReel] = useState<{ reel: typeof videoReels[0], product: Product } | null>(null);
  const [isHeroMounted, setIsHeroMounted] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [bestsellerFilter, setBestsellerFilter] = useState<'Serums' | 'Cleanser' | 'Eye Cream' | 'Cream' | 'All'>('All');

  // Footer features autoplay slide index for mobile view only
  const [currentFeatureIdx, setCurrentFeatureIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeatureIdx((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevScrollPosRef = React.useRef(0);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.scrollY;
          if (currentScrollPos < 50) {
            setIsNavVisible(true);
          } else {
            const difference = currentScrollPos - prevScrollPosRef.current;
            if (Math.abs(difference) > 8) {
              setIsNavVisible(prevScrollPosRef.current > currentScrollPos);
            }
          }
          prevScrollPosRef.current = currentScrollPos;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const loadProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const shopifyProducts = await fetchShopifyProducts();
        if (shopifyProducts && shopifyProducts.length > 0) {
          setProducts(shopifyProducts);
          // Set initial cart item from dynamic data
          setCartItems([
            {
              product: shopifyProducts[0],
              quantity: 1,
              selectedColor: shopifyProducts[0].colors[0]
            }
          ]);
        } else {
          setProducts(mockProducts);
          setCartItems([
            {
              product: mockProducts[0],
              quantity: 1,
              selectedColor: mockProducts[0].colors[0]
            }
          ]);
        }
      } catch (err) {
        console.error("Failed to load products from Shopify, using mock data", err);
        setProducts(mockProducts);
        setCartItems([
          {
            product: mockProducts[0],
            quantity: 1,
            selectedColor: mockProducts[0].colors[0]
          }
        ]);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  const handleNavigate = (page: 'home' | 'product' | 'about' | 'certificates' | 'contact' | 'partners', productId?: string) => {
    setActivePage(page);
    if (productId) {
      setActiveProductId(productId);
    }
    // Scroll window instantly to top to prevent sliding/jumping
    window.scrollTo(0, 0);
  };

  // Keep scroll position strictly at top on any route or product transition
  useEffect(() => {
    window.scrollTo(0, 0);
    // Execute a slight delayed scroll to top to override any asynchronous child layout shifts
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 40);
    return () => clearTimeout(timer);
  }, [activePage, activeProductId]);

  const activeProduct = products.find(p => p.id === activeProductId) || products[0] || mockProducts[0];

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number, colorIdx: number) => {
    const selectedColor = product.colors[colorIdx] || product.colors[0];
    setCartItems(prevItems => {
      const existingIdx = prevItems.findIndex(
        item => item.product.id === product.id && item.selectedColor.name === selectedColor.name
      );

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { product, quantity, selectedColor }];
      }
    });
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product, colorIdx: number) => {
    handleAddToCart(product, 1, colorIdx);
  };

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      window.requestAnimationFrame(() => {
        if (!carouselRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        if (maxScroll > 0) {
          setScrollProgress(scrollLeft / maxScroll);
        }
      });
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
    { name: "Cicasome", image: "/cicasome ingredient image.png", benefit: "Soothes and repairs irritated skin barrier, promoting rapid recovery and cell renewal." },
    { name: "Bakuchiol", image: "/bakuchiol ingredient image.png", benefit: "A gentle, plant-derived retinol alternative that smooths fine lines and improves skin texture." },
    { name: "Hydration Complex", image: "/hydration complex ingredient image.png", benefit: "A synergistic blend of hyaluronic acids and humectants that locks in deep, multi-layer moisture." },
    { name: "Centella & Ginseng", image: "/centella and ginseng ingredient image.png", benefit: "Revitalizes tired skin cells while boosting collagen synthesis for a firmer, energetic complexion." },
    { name: "Botanical Complex", image: "/botanical complex ingredient image.png", benefit: "A rich blend of pure plant extracts that defends against environmental stressors and free radicals." },
    { name: "Edelweiss Stem Cells", image: "/edelweiss stem cells ingredient image.png", benefit: "An ultra-potent antioxidant that fights premature aging and lifts sagging skin areas." },
    { name: "Borfillin", image: "/borfillin ingredients image.png", benefit: "Plumps and volumizes skin structure to restore youthful fullness and diminish deep wrinkles." }
  ];

  // Ritual steps images matching video category selections at 0:45
  const ritualSteps = [
    { label: "1. Skincare", title: "Cleanse, Tone & Hydrate", desc: "Reveal your best skin with our essentials—designed to cleanse, hydrate, and glow.", img: "https://images.unsplash.com/photo-1596701062351-df5f8af0d385?q=80&w=800", prodId: "overachiever-balm-cleanser" },
    { label: "2. Makeup", title: "Luminous Pearlescent Glows", desc: "Add effortless radiance to your features with peach lips and hydrating glosses.", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800", prodId: "peachy-dreams-lip-mask" },
    { label: "3. Bodycare", title: "Nourish & Smooth Skin Barrier", desc: "Treat and hydrate your body's moisture barrier with rich essential botanical lipids.", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800", prodId: "golden-reset-radiance-oil" }
  ];

  // Video reels story loops
  const videoReels = [
    { name: "lumiere.skin", duration: "12s ago", video: "/video frame 1.mp4", bg: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600", title: "Refreshing face mist cleansing!", prodId: "clean-canvas-gel-cleanser" },
    { name: "dermadiary", duration: "2h ago", video: "/video frame 2.mp4", bg: "https://images.unsplash.com/photo-1590156546746-c589b4855072?q=80&w=600", title: "Night skin massage with Velvet cream!", prodId: "overachiever-balm-cleanser" },
    { name: "botanicglow", duration: "1d ago", video: "/video frame 3.mp4", bg: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600", title: "Brilliant glowing skin formula essence", prodId: "glow-remedy-hydrating-essence" },
    { name: "earthyskincare", duration: "3d ago", video: "/video frame 4.mp4", bg: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600", title: "Golden Radiance Oil drops are luxurious!", prodId: "golden-reset-radiance-oil" }
  ];

  // Bestsellers display
  const displayProducts = products.length > 0 ? products : mockProducts;

  // Comparison products
  const compProduct1 = (products.length > 0 ? products : mockProducts)[0] || mockProducts[0];
  const compProduct2 = (products.length > 1 ? products : mockProducts)[1] || mockProducts[4];
  const compProduct3 = (products.length > 2 ? products : mockProducts)[2] || mockProducts[9];

  const getComparisonProductImage = (product: Product): { src: string; fallback: string } => {
    const primaryImage = product.images[0] || '';
    
    if (primaryImage && (primaryImage.startsWith('http://') || primaryImage.startsWith('https://'))) {
      return { src: primaryImage, fallback: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600' };
    }
    
    // Local fallbacks
    const id = product.id.toLowerCase();
    if (id.includes('serum')) {
      return { src: '/Curated Essentials serum image frame.png', fallback: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600' };
    }
    if (id.includes('cleanser') || id.includes('essence') || id.includes('mist') || id.includes('toner')) {
      return { src: '/Curated Essentials cleanser image frame.png', fallback: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600' };
    }
    if (id.includes('cream') || id.includes('balm') || id.includes('mask') || id.includes('shampoo') || id.includes('conditioner')) {
      if (id.includes('eye-cream') || id.includes('eye')) {
        return { src: '/Curated Essentials eye cream image frame.png', fallback: 'https://images.unsplash.com/photo-1590156546746-c589b4855072?q=80&w=600' };
      }
      return { src: '/Curated Essentials cream image frame.png', fallback: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600' };
    }
    if (id.includes('oil') || id.includes('spf') || id.includes('sun') || id.includes('fluid') || id.includes('shield') || id.includes('pad')) {
      return { src: '/Curated Essentials eye cream image frame.png', fallback: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600' };
    }
    
    return { src: primaryImage || '/Curated Essentials serum image frame.png', fallback: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600' };
  };

  const getIngredientBenefit = (product: Product, ingredient: string): string => {
    const id = product.id.toLowerCase();
    const title = product.title.toLowerCase();
    const desc = product.description.toLowerCase();
    const ingText = (product.ingredients || '').toLowerCase();

    const hasIngredient = ingText.includes(ingredient.toLowerCase()) || desc.includes(ingredient.toLowerCase()) || title.includes(ingredient.toLowerCase());

    if (ingredient === "Niacinamide") {
      if (id.includes("retinol") || id.includes("retinal")) {
        return "Synergizes with retinol to support cellular renewal and reinforce moisture barrier";
      }
      if (id.includes("cleanser") || id.includes("wash")) {
        return "Soothes skin while cleansing to minimize irritation and maintain protective barrier";
      }
      if (id.includes("essence") || id.includes("toner") || id.includes("mist")) {
        return "Balances sebum production, calms redness, and visibly refines open pore texture";
      }
      if (id.includes("spf") || id.includes("sun") || id.includes("fluid")) {
        return "Evens out skin tone, reduces pigmentation, and defends against environmental stress";
      }
      if (id.includes("peptide") || id.includes("collagen")) {
        return "Enhances surface radiance and supports natural skin firming processes";
      }
      return hasIngredient 
        ? "Supports skin barrier strength and clarifies tone" 
        : "Provides gentle barrier support and optimizes skin clarity";
    }

    if (ingredient === "Hyaluronic Acid") {
      if (id.includes("essence") || id.includes("toner") || id.includes("mist")) {
        return "Inundates skin with multi-layer hydration to instantly plump and prepare skin";
      }
      if (id.includes("cream") || id.includes("moisturizer") || id.includes("balm") || id.includes("mask")) {
        return "Locks in deep moisture to prevent transepidermal water loss and smooth dehydration lines";
      }
      if (id.includes("spf") || id.includes("sun") || id.includes("fluid")) {
        return "Maintains comfortable, lightweight hydration under direct UV exposure";
      }
      if (id.includes("retinol") || id.includes("retinal")) {
        return "Deep hydration that offsets dry or peeling sensations caused by retinoids";
      }
      return hasIngredient 
        ? "Attracts and seals critical hydration for a dewy plump finish" 
        : "Maintains optimal moisture levels in the skin's outer layers";
    }

    if (ingredient === "Retinol") {
      if (id.includes("retinol") || id.includes("retinal")) {
        return "Encourages cellular turnover, diminishes fine lines, and refines texture";
      }
      if (id.includes("oil") || id.includes("night")) {
        return "Fades micro-wrinkles and targets photo-aging while skin recovers overnight";
      }
      if (id.includes("eye")) {
        return "Targets crow's feet and dark shadows with a gentle, slow-release retinoid";
      }
      return hasIngredient 
        ? "Speeds up surface skin cell renewal for a smoother look" 
        : "Not present, but product features alternative skin-smoothing factors";
    }

    if (ingredient === "Vitamin C") {
      if (id.includes("vitamin-c") || id.includes("c-serum") || id.includes("bright")) {
        return "Visibly fades stubborn hyperpigmentation and neutralizes free radicals";
      }
      if (id.includes("spf") || id.includes("sun") || id.includes("fluid")) {
        return "Acts as a powerful antioxidant partner to sunscreen, boosting UV defense";
      }
      if (id.includes("cleanser") || id.includes("essence")) {
        return "Gently revives dullness to reveal an immediate, natural lit-from-within glow";
      }
      return hasIngredient 
        ? "Powerfully brightens tone and defends against biological aging" 
        : "Aids in general defense against daily environmental pollutants";
    }

    if (ingredient === "Peptides") {
      if (id.includes("peptide") || id.includes("collagen") || id.includes("lift")) {
        return "Stimulates essential collagen synthesis to restore youthful skin elasticity";
      }
      if (id.includes("cream") || id.includes("moisturizer") || id.includes("eye")) {
        return "Dramatically firms sagging contours and cushions delicate skin areas";
      }
      if (id.includes("retinol") || id.includes("essence")) {
        return "Helps reconstruct protein matrices for structural resilience and bounce";
      }
      return hasIngredient 
        ? "Rebuilds skin structure, increasing overall firmness and elasticity" 
        : "Provides structural support for a plump, healthy looking complexion";
    }

    return "Optimizes natural skin performance and strengthens barrier longevity";
  };

  return (
    <div className="relative min-h-screen bg-[#FAF5F0] text-stone-900 font-sans overflow-x-clip selection:bg-[#F2A183] selection:text-white">
      {/* Premium custom mouse cursor outline animation */}
      <CustomCursor />
      
      {/* 2. THE FLOATING OPTIONS BUTTON REMOVED */}

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

        {/* PERSISTENT FLOATING SIDE BAR (LEFT SIDE) - Matches Image 4 and handles Scroll Hiding */}
        <div 
          className={`fixed left-1.5 sm:left-4 bottom-36 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-40 flex flex-col items-center bg-white border border-stone-200/50 py-2 sm:py-4.5 px-0.5 sm:px-1 shadow-md rounded-[32px] gap-2.5 sm:gap-4.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-7 sm:w-9 ${
            isNavVisible ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0 pointer-events-none'
          }`}
        >
          {/* Facebook Icon */}
          <a 
            href="https://www.facebook.com/people/ZISUC/61574275480806/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Facebook" 
            className="text-stone-800 hover:text-blue-600 transition-colors duration-300 flex items-center justify-center p-0.5 sm:p-1 rounded-full hover:bg-stone-50"
          >
            <Facebook className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-stone-900" />
          </a>

          {/* Instagram Icon */}
          <a 
            href="https://www.instagram.com/zisuc_us?igsh=aW81N3M5dnBldGht" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram" 
            className="text-stone-800 hover:text-pink-600 transition-colors duration-300 flex items-center justify-center p-0.5 sm:p-1 rounded-full hover:bg-stone-50"
          >
            <Instagram className="w-3 h-3 sm:w-4 sm:h-4 text-stone-900" />
          </a>

          {/* Back to Top Capsule Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-black hover:bg-stone-800 text-white flex flex-col items-center justify-center pt-1.5 pb-3 sm:pt-2 sm:pb-4.5 px-0 w-5 sm:w-7 rounded-full cursor-pointer transition-all duration-300 shadow-xs group border border-stone-800/10"
          >
            <ChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white mb-1 sm:mb-1.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span 
              className="text-[5.5px] sm:text-[7.5px] font-mono tracking-widest font-semibold text-white select-none whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Back to top
            </span>
          </button>
        </div>
        
        {/* A. Announcement Bar marquee */}
        <AnnouncementBar settings={settings} />

        {/* B. Store Navigation Header */}
        <Header
          settings={settings}
          cartItems={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
          onNavigate={handleNavigate}
          isMobileView={isMobileView}
          activePage={activePage}
          isNavVisible={isNavVisible}
          currentCurrency={currentCurrency}
          onCurrencyChange={setCurrentCurrency}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* C. PAGE CONTENT ROUTING */}
        <motion.div
          key={activePage + (activePage === 'product' ? `-${activeProductId}` : '')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col"
        >
        {activePage === 'home' ? (
          <div className="flex flex-col animate-fade-in">
            
            {/* 1. HERO BANNER - AUTOPLAY BEAUTY VIDEO & SCROLLING MARQUEE SYSTEM */}
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[9/16] md:aspect-video flex items-center overflow-hidden select-none group bg-[#FAF5F0]"
            >
              {/* Premium Models Image Background */}
              {/* Desktop / Laptop background */}
              <SafeImage
                src="/zisuc hero section image laptop verison.png"
                fallbackSrc={heroModelsBgImage}
                alt="Peaches Models Background (Laptop)"
                className={`absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none z-0 hidden md:block hero-image-zoom ${isHeroMounted ? 'hero-entrance-active' : 'hero-entrance-start'}`}
              />
              {/* Mobile background */}
              <SafeImage
                src="/zisuc hero section image mobile version.png"
                fallbackSrc={heroModelsBgImage}
                alt="Peaches Models Background (Mobile)"
                className={`absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none z-0 block md:hidden hero-image-zoom ${isHeroMounted ? 'hero-entrance-active' : 'hero-entrance-start'}`}
              />

              {/* Gradient Backdrop Mask for cinematic light exposure */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/35 to-stone-950/20 z-10" />

              {/* Main Content Overlay Area */}
              <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 relative z-20 flex flex-col justify-between h-full py-8 sm:py-12 text-white text-left">
                
                {/* Keeping space layout correct */}
                <div className="mt-14" />



                {/* 2. HUGE DYNAMIC HORIZONTAL SCROLLING TEXT IN ACCORDANCE WITH SCREENSHOT 1 */}
                <div className="absolute inset-x-0 bottom-[26%] xs:bottom-[28%] sm:bottom-[30%] md:bottom-[32%] -translate-y-1/2 w-full overflow-hidden select-none pointer-events-none z-15">
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
                          Unlock Your Skin’s Potential <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span> Unlock Your Skin’s Potential <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span> Unlock Your Skin’s Potential <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span>
                        </span>
                      ))}
                    </div>
                    {/* Duplicate Identical chunk for continuous loop */}
                    <div className="flex shrink-0 font-heading italic text-white/15 sm:text-white/20 text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-none uppercase gap-4 pr-4">
                      {Array(3).fill(null).map((_, idx) => (
                        <span key={`hero-q-${idx}`} className="flex-shrink-0 flex items-center">
                          Unlock Your Skin’s Potential <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span> Unlock Your Skin’s Potential <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span> Unlock Your Skin’s Potential <span className="mx-8 font-serif font-normal text-amber-200/30 animate-pulse">•</span>
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
            <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1530px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 bg-[#FAF5F0] hardware-accelerated">
              {[
                { title: "Serums", label: "DEEP REPAIR & RADIANCE", img: "/serum card image.png", filter: "Serums" },
                { title: "Cleanser", label: "BALANCE & PRIMER", img: "/cleanser card image.png", filter: "Cleanser" },
                { title: "Eye Cream", label: "UV SHIELD SPF 50+", img: "/eye cream card image.png", filter: "Eye Cream" },
                { title: "Cream", label: "STRENGTH & GLOW", img: "/cream card image.png", filter: "Cream" }
              ].map((cat, i) => (
                <PremiumSlideInText
                  key={i}
                  delay={i * 0.08}
                  className="relative aspect-[3/4] rounded-none overflow-hidden group cursor-pointer select-none border-0 shadow-none bg-stone-100"
                  onClick={() => {
                    const filterVal = cat.filter as 'Serums' | 'Cleanser' | 'Eye Cream' | 'Cream';
                    setBestsellerFilter(filterVal);
                    document.getElementById('bestsellers-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <PremiumRevealImage 
                    src={cat.img} 
                    fallbackSrc={cat.img}
                    alt={cat.title} 
                    className="absolute inset-0 w-full h-full animate-none rounded-none"
                    hoverZoom={true}
                  />
                  {/* Luxury high-contrast gradient overlay to ensure perfect contrast and match the editorial style of Image 1 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent transition duration-500 group-hover:from-stone-950/80 group-hover:via-stone-950/35 z-10 pointer-events-none" />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 text-white text-left pointer-events-none">
                    <span className="font-mono text-[9px] xs:text-[10px] sm:text-[10.5px] tracking-[0.2em] text-[#FFE8DE] font-bold mb-1.5 opacity-90 uppercase block leading-none">
                      {cat.label}
                    </span>
                    <h3 className="font-serif text-[26px] xs:text-[28px] sm:text-[32px] lg:text-[38px] font-medium leading-none tracking-wide text-white title-no-underline">
                      {cat.title}
                    </h3>
                  </div>
                </PremiumSlideInText>
              ))}
            </section>

            {/* 3. BESTSELLERS SECTION ("Glowing skin starts here") */}
            <section id="bestsellers-section" className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1530px] mx-auto w-full scroll-mt-6 border-t border-stone-200/50 hardware-accelerated">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-6">
                <div className="text-left">
                  <PremiumSplitHeading className="font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight text-stone-900 font-normal hover-outline-text-effect">
                    Glowing skin starts here
                  </PremiumSplitHeading>
                </div>
              </div>

              {/* Unified Carousel for Desktop and Mobile */}
              <div className="w-full relative mt-4 group/carousel">
                <div 
                  ref={carouselRef}
                  onScroll={handleCarouselScroll}
                  className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 scrollbar-none gap-0 sm:gap-4 md:gap-5"
                >
                  {displayProducts.map((product, idx) => (
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
                          delay: (idx % 4) * 0.12 // Clean sequence stagger
                        }
                      }}
                      viewport={{ once: true, amount: 0.15 }}
                      className="w-full sm:w-1/2 lg:w-1/4 shrink-0 snap-center sm:snap-start px-4 sm:px-0"
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
                        currentCurrency={currentCurrency}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Slider Arrow Controls and indicator progress line */}
                <div className="flex items-center justify-between gap-6 mt-4 px-4 sm:px-0 w-full">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => scrollCarousel('left')}
                      className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 bg-white hover:bg-stone-50 transition-all active:scale-95 shadow-xs cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button 
                      onClick={() => scrollCarousel('right')}
                      className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 bg-white hover:bg-stone-50 transition-all active:scale-95 shadow-xs cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  {/* Clean scale-proportionate progress line indicator */}
                  <div className="flex-1 max-w-xs h-[1.5px] bg-stone-200 relative overflow-hidden">
                    <div 
                      className="absolute top-0 bottom-0 left-0 bg-stone-900 transition-transform duration-300 ease-out"
                      style={{ 
                        width: `${100 / Math.max(1, displayProducts.length)}%`,
                        transform: `translateX(${scrollProgress * (displayProducts.length - 1) * 100}%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SHOP BY INGREDIENTS BULLET CARDS (Image 2 - Left Aligned, Large Circles, Non-Selectable) */}
            <section id="ingredients-section" className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1530px] mx-auto w-full border-b border-stone-200/50 section-deferred hardware-accelerated">
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
            <div className="section-deferred hardware-accelerated">
              <LuxuryCategoryShowcase onNavigate={handleNavigate} settings={settings} />
            </div>

            {/* FEATURES COLLECTION (Video & Image Request Integration) */}
            <div className="section-deferred hardware-accelerated">
              <FeaturesCollection 
                onNavigate={handleNavigate}
                onAddToCart={handleAddToCart}
                onShopAll={() => {
                  const targetEl = document.getElementById('bestsellers-section');
                  targetEl?.scrollIntoView({ behavior: 'smooth' });
                }} 
                currentCurrency={currentCurrency}
              />
            </div>

            {/* CURVED SCROLL TEXT DRIVEN BY GSAP SCROLLTRIGGER */}
            <div className="section-deferred hardware-accelerated">
              <CurvedScrollText />
            </div>

            {/* INTERACTIVE BEFORE AND AFTER IMAGE SLIT PREVIEW DRAG SLIDER */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onViewportEnter={() => {
                let start = performance.now();
                const duration = 2400; // 2.4 seconds
                const animateSlider = (currentTime: number) => {
                   const elapsed = currentTime - start;
                   if (elapsed < duration) {
                       const progress = elapsed / duration;
                       // Sine wave animation from 50 -> 85 -> 15 -> 50
                       const val = 50 + Math.sin(progress * Math.PI * 2) * 35;
                       setSliderVal(val);
                       requestAnimationFrame(animateSlider);
                   } else {
                       setSliderVal(50);
                   }
                };
                // Slight delay before animation starts so user can see it
                setTimeout(() => requestAnimationFrame((time) => {
                    start = time;
                    animateSlider(time);
                }), 800);
              }}
              className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-[1530px] mx-auto w-full select-none section-deferred hardware-accelerated"
            >

              {/* The Slider component frame - horizontal rectangle layout matching the template exactly! */}
              <div className="relative w-full h-[220px] xs:h-[260px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-sm select-none">
                
                {/* AFTER image: High-Resolution Dewy Skincare Model with glowing, smooth skin */}
                <div className="absolute inset-0">
                  <SafeImage 
                    src="/after image.png" 
                    fallbackSrc="/after image.png"
                    alt="After ZISU'C skincare treatment" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
                  />
                </div>

                {/* BEFORE image (clipped dynamically by sliding %). We use the identical underlying model photograph for perfect, gapless layout! */}
                <div 
                  className="absolute inset-0 border-r-2 border-white/90" 
                  style={{ clipPath: `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)` }}
                >
                  <SafeImage 
                    src="/before image.png" 
                    fallbackSrc="/before image.png"
                    alt="Before ZISU'C skincare treatment" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
                  />
                </div>

                {/* BEFORE/AFTER Badge overlays */}
                <div className="absolute bottom-5 left-5 bg-stone-900/80 backdrop-blur-md text-stone-100 text-[10px] sm:text-xs font-mono font-medium py-1.5 px-3.5 uppercase tracking-widest rounded-[4px] select-none pointer-events-none z-10">
                  BEFORE
                </div>
                <div className="absolute bottom-5 right-5 bg-stone-900/80 backdrop-blur-md text-stone-100 text-[10px] sm:text-xs font-mono font-medium py-1.5 px-3.5 uppercase tracking-widest rounded-[4px] select-none pointer-events-none z-10">
                  AFTER
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

            {/* PARALLAX QUOTE SECTION (NEW) */}
            <ParallaxQuoteSection />

            {/* VIDEO REELS LIVE STORIES STORIES GRID */}
            <section className="py-6 sm:py-10 bg-[#F5EBE0]/60 border-y border-stone-200/40 select-none section-deferred hardware-accelerated">
              <div className="max-w-full px-4 sm:px-6 md:px-8">
                
                {/* Genuine elegant left-aligned brand story headers */}
                <div className="text-left mb-6 md:mb-8 w-full select-none">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest opacity-60 block text-stone-600 font-bold">HOT ON SOCIAL</span>
                  <PremiumSplitHeading className="font-heading italic text-3xl sm:text-4xl lg:text-5xl leading-tight mt-1 mb-1 block text-stone-900 hover-outline-text-effect">See others' glow journey</PremiumSplitHeading>
                </div>

                {/* Highly responsive layout perfectly representing visual cards */}
                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 md:gap-5 pb-4">
                  {videoReels.map((reel, idx) => {
                    const matchedProd = products.find(p => p.id === reel.prodId) || mockProducts.find(p => p.id === reel.prodId);
                    return (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ 
                          duration: 0.8, 
                          ease: [0.215, 0.61, 0.355, 1],
                          delay: idx * 0.12
                        }}
                        className="flex flex-col group select-none cursor-pointer w-[75vw] sm:w-auto snap-center shrink-0"
                        onClick={() => {
                          if (matchedProd) {
                            setActiveReel({ reel, product: matchedProd });
                          }
                        }}
                      >
                        {/* 1. TOP VIDEO PORTRAIT WRAPPER WITH GORGEOUS USER DETAILS */}
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-stone-100 flex items-center justify-center rounded-none">
                          <MutedAutoplayVideo
                            src={reel.video}
                            isMuted={isMuted}
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
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
                            <img decoding="async" loading="lazy" 
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
                            <span className="block text-xs font-medium text-stone-600 mt-1">{convertAndFormatPrice(matchedProd?.price, currentCurrency)}</span>
                          </div>

                          {/* Pure theme accent rounded buy cart slider trigger */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (matchedProd) {
                                handleAddToCart(matchedProd, 1, 0);
                              }
                            }}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all shadow-xs flex-shrink-0 cursor-pointer overflow-hidden relative group/btn"
                            style={{ backgroundColor: settings.colorButton, color: settings.colorButtonText }}
                            aria-label={`Buy ${matchedProd?.title}`}
                          >
                            <ShoppingCart className="w-4 h-4 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-0 opacity-100 group-hover/btn:translate-x-10 group-hover/btn:opacity-0" />
                            <ShoppingCart className="w-4 h-4 absolute transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-10 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* FULLSCREEN REEL MODAL */}
            <AnimatePresence>
              {activeReel && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black z-[150] flex flex-col items-center justify-center"
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setActiveReel(null)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center bg-black/40 text-white backdrop-blur-md z-[170] hover:bg-black/60 transition shadow-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Video */}
                  <MutedAutoplayVideo
                    src={activeReel.reel.video}
                    isMuted={isMuted}
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                  />
                  
                  {/* Scrim for text readability on mobile */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                  {/* Overlay content container */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {/* Top: User info overlay */}
                    <div className="p-4 sm:p-6 mt-2 sm:mt-0 pointer-events-auto flex justify-start">
                      <div className="inline-flex items-center gap-2 text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                        <Instagram className="w-4 h-4" />
                        <span className="text-sm font-semibold tracking-wide">{activeReel.reel.name}</span>
                      </div>
                    </div>
                    
                    {/* Bottom: Product Strip */}
                    <div className="p-4 sm:p-6 pointer-events-auto sm:max-w-md sm:mx-auto sm:w-full">
                      <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-stone-50 border border-stone-100 flex-shrink-0 p-1 flex items-center justify-center">
                          <img decoding="async" loading="lazy" 
                            src={activeReel.product.images[0]} 
                            alt={activeReel.product.title}
                            className="w-full h-full object-contain mix-blend-multiply"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-mono opacity-60 uppercase tracking-widest block truncate text-stone-600">{activeReel.product.vendor}</span>
                          <h4 className="font-heading italic text-sm sm:text-base font-bold text-[#2D2926] truncate">{activeReel.product.title}</h4>
                          <p className="text-xs font-bold font-mono text-stone-900 mt-0.5">{convertAndFormatPrice(activeReel.product.price, currentCurrency)}</p>
                        </div>
                        <button 
                          onClick={() => {
                            handleAddToCart(activeReel.product, 1, 0);
                            setActiveReel(null);
                          }}
                          className="h-9 sm:h-10 px-3 sm:px-4 bg-stone-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition shadow-md flex items-center gap-2 flex-shrink-0 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span className="hidden xs:inline">Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FLASH SALE TIMER BANNER AS SHOWN IN SCREENSHOTS */}
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative overflow-hidden border-y border-stone-200 bg-[#FAF5F0] select-none section-deferred hardware-accelerated"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Left column: Beautiful portrait photo of model holding products */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto min-h-[260px] xs:min-h-[320px] sm:min-h-[480px] lg:min-h-[580px] overflow-hidden bg-[#E3DCD6] group/image">
                                    <picture>
                    <source media="(min-width: 1024px)" srcSet="/peaches skincare essentials laptop frame.png" />
                    <img decoding="async" loading="lazy" 
                      src="/peaches skincare essentials mobile frame.png" 
                      alt="Peaches Skincare Essentials" 
                      className="absolute inset-0 w-full h-full object-cover bg-[#E3DCD6] select-none transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.07]"
                      referrerPolicy="no-referrer"
                    />
                  </picture>
                </div>

                {/* Right column: Solid light teal background with elegant centered elements */}
                <div className="bg-[#E0F4F4] flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden min-h-[480px] lg:min-h-[580px]">
                  
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

              {/* Bottom teal stripe running full screen-width across bottom of entire grid */}
              <div className="w-full bg-[#00C4BA] py-4 border-t border-stone-800/10 overflow-hidden select-none relative flex">
                <div 
                  className="flex whitespace-nowrap animate-marquee py-0.5" 
                  style={{ animationDuration: '32s' }}
                >
                  <div className="flex shrink-0 font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white font-bold gap-12 sm:gap-20 pr-12 sm:pr-20">
                    {Array(4).fill(null).map((_, i) => (
                      <span key={`p-${i}`} className="flex items-center">
                        ✦ 50,000+ HAPPY CUSTOMERS ✦ #1 BESTSELLER ✦ AS SEEN ON INSTAGRAM ✦
                      </span>
                    ))}
                  </div>
                  <div className="flex shrink-0 font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white font-bold gap-12 sm:gap-20 pr-12 sm:pr-20">
                    {Array(4).fill(null).map((_, i) => (
                      <span key={`q-${i}`} className="flex items-center">
                        ✦ 50,000+ HAPPY CUSTOMERS ✦ #1 BESTSELLER ✦ AS SEEN ON INSTAGRAM ✦
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </motion.section>

            {/* "BEHIND THE GLOW: INGREDIENT HIGHLIGHTS" COMPARISON TABLE */}
            <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1530px] mx-auto w-full section-deferred hardware-accelerated">
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
                      {/* Column 1: Product 1 */}
                      <th className="p-0 w-[28.6%] bg-stone-50/5 border-l border-stone-200/60 font-normal">
                        <div className="flex flex-col h-full bg-[#FAF5F0]">
                          {/* Image Box */}
                          <HighlightImage
                            src={getComparisonProductImage(compProduct1).src}
                            fallbackSrc={getComparisonProductImage(compProduct1).fallback}
                            alt={compProduct1.title}
                          />
                          {/* Product Title */}
                          <div className="p-3 text-left flex flex-col justify-between flex-grow min-h-[70px] sm:min-h-[80px] bg-white">
                            <h3 className="font-serif italic text-stone-900 text-sm sm:text-[14px] leading-snug font-normal line-clamp-2">
                              {compProduct1.title}
                            </h3>
                          </div>
                          {/* Teal Button */}
                          <LuxuryButton 
                            type="button"
                            onClick={() => handleNavigate('product', compProduct1.id)}
                            className="w-full py-2.5 bg-[#00C4BA] hover:bg-[#00A39A] text-white text-xs font-semibold tracking-wider transition-colors rounded-none border-none cursor-pointer text-center select-none"
                            label="View now"
                          />
                        </div>
                      </th>
                      {/* Column 2: Product 2 */}
                      <th className="p-0 w-[28.7%] bg-stone-50/5 border-l border-stone-200/60 font-normal">
                        <div className="flex flex-col h-full bg-[#FAF5F0]">
                          {/* Image Box */}
                          <HighlightImage
                            src={getComparisonProductImage(compProduct2).src}
                            fallbackSrc={getComparisonProductImage(compProduct2).fallback}
                            alt={compProduct2.title}
                          />
                          {/* Product Title */}
                          <div className="p-3 text-left flex flex-col justify-between flex-grow min-h-[70px] sm:min-h-[80px] bg-white">
                            <h3 className="font-serif italic text-stone-900 text-sm sm:text-[14px] leading-snug font-normal line-clamp-2">
                              {compProduct2.title}
                            </h3>
                          </div>
                          {/* Teal Button */}
                          <LuxuryButton 
                            type="button"
                            onClick={() => handleNavigate('product', compProduct2.id)}
                            className="w-full py-2.5 bg-[#00C4BA] hover:bg-[#00A39A] text-white text-xs font-semibold tracking-wider transition-colors rounded-none border-none cursor-pointer text-center select-none"
                            label="View now"
                          />
                        </div>
                      </th>
                      {/* Column 3: Product 3 */}
                      <th className="p-0 w-[28.7%] bg-stone-50/5 border-l border-stone-200/60 font-normal">
                        <div className="flex flex-col h-full bg-[#FAF5F0]">
                          {/* Image Box */}
                          <HighlightImage
                            src={getComparisonProductImage(compProduct3).src}
                            fallbackSrc={getComparisonProductImage(compProduct3).fallback}
                            alt={compProduct3.title}
                          />
                          {/* Product Title */}
                          <div className="p-3 text-left flex flex-col justify-between flex-grow min-h-[70px] sm:min-h-[80px] bg-white">
                            <h3 className="font-serif italic text-stone-900 text-sm sm:text-[14px] leading-snug font-normal line-clamp-2">
                              {compProduct3.title}
                            </h3>
                          </div>
                          {/* Teal Button */}
                          <LuxuryButton 
                            type="button"
                            onClick={() => handleNavigate('product', compProduct3.id)}
                            className="w-full py-2.5 bg-[#00C4BA] hover:bg-[#00A39A] text-white text-xs font-semibold tracking-wider transition-colors rounded-none border-none cursor-pointer text-center select-none"
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
                        {getIngredientBenefit(compProduct1, 'Niacinamide')}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct2, 'Niacinamide')}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct3, 'Niacinamide')}
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/10 transition-colors">
                      <td className="py-2.5 px-3 font-subheading font-bold text-stone-900 text-xs sm:text-[13px] tracking-tight bg-stone-100/25">
                        Hyaluronic Acid
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct1, 'Hyaluronic Acid')}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct2, 'Hyaluronic Acid')}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct3, 'Hyaluronic Acid')}
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/10 transition-colors">
                      <td className="py-2.5 px-3 font-subheading font-bold text-stone-900 text-xs sm:text-[13px] tracking-tight bg-stone-100/25">
                        Retinol
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct1, 'Retinol')}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct2, 'Retinol')}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct3, 'Retinol')}
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/10 transition-colors">
                      <td className="py-2.5 px-3 font-subheading font-bold text-stone-900 text-xs sm:text-[13px] tracking-tight bg-stone-100/25">
                        Vitamin C
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct1, 'Vitamin C')}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct2, 'Vitamin C')}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct3, 'Vitamin C')}
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/10 transition-colors">
                      <td className="py-2.5 px-3 font-subheading font-bold text-stone-900 text-xs sm:text-[13px] tracking-tight bg-stone-100/25">
                        Peptides
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct1, 'Peptides')}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct2, 'Peptides')}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-gray-700 leading-relaxed text-xs sm:text-[13px] border-l border-stone-200/70">
                        {getIngredientBenefit(compProduct3, 'Peptides')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7. VERIFIED TESTIMONIALS */}
            <div className="section-deferred hardware-accelerated">
              <EditorialTestimonials onAddToCart={handleAddToCart} settings={settings} currentCurrency={currentCurrency} products={products} />
            </div>

            {/* 8. INSTAGRAM COMMUNITY FEED */}
            <div className="section-deferred hardware-accelerated">
              <CommunityInstagramFeed />
            </div>

            {/* 9. FREQUENTLY ASKED QUESTIONS */}
            <div className="section-deferred hardware-accelerated">
              <FaqSection onOpenChat={() => setIsChatOpen(true)} />
            </div>

          </div>
        ) : activePage === 'product' ? (
          /* D. PRODUCT DESCRIPTION DETAIL SCREEN */
          <ProductMain
            product={activeProduct}
            settings={settings}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => setActivePage('home')}
            onProductClick={(id) => handleNavigate('product', id)}
            currentCurrency={currentCurrency}
            products={products.length > 0 ? products : mockProducts}
          />
        ) : activePage === 'about' ? (
          <AboutPage settings={settings} onNavigateHome={() => handleNavigate('home')} />
        ) : activePage === 'certificates' ? (
          <CertificatesPage settings={settings} onNavigateHome={() => handleNavigate('home')} />
        ) : activePage === 'contact' ? (
          <ContactPage settings={settings} onNavigateHome={() => handleNavigate('home')} />
        ) : (
          <PartnersPage settings={settings} onNavigateHome={() => handleNavigate('home')} />
        )}
        </motion.div>
        {/* F. PREMIUM CUSTOM FOOTER */}
        <footer 
          className="pt-10 sm:pt-16 pb-0 select-none border-t border-stone-200/40 flex flex-col justify-between"
          style={{ 
            backgroundColor: '#00C4BA',
            color: '#ffffff',
          }}
        >
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 mb-6 sm:mb-10">
            
            {/* Features Row - Mobile Autoplay Carousel / Desktop Static Grid */}
            {/* Mobile Carousel */}
            <div className="block sm:hidden w-full relative overflow-hidden pb-8 mb-8 border-b border-white/20 min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeatureIdx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col items-center text-center px-4"
                >
                  {currentFeatureIdx === 0 && <CreditCard className="w-8 h-8 text-white mb-3" strokeWidth={1.5} />}
                  {currentFeatureIdx === 1 && <Globe className="w-8 h-8 text-white mb-3" strokeWidth={1.5} />}
                  {currentFeatureIdx === 2 && <Headphones className="w-8 h-8 text-white mb-3" strokeWidth={1.5} />}
                  {currentFeatureIdx === 3 && <Truck className="w-8 h-8 text-white mb-3" strokeWidth={1.5} />}
                  
                  <h5 className="font-sans text-sm font-bold text-white mb-1">
                    {currentFeatureIdx === 0 && "Secure payment"}
                    {currentFeatureIdx === 1 && "Free delivery worldwide"}
                    {currentFeatureIdx === 2 && "Lifetime support from our"}
                    {currentFeatureIdx === 3 && "Super-fast shipping in"}
                  </h5>
                  <p className="font-sans text-xs text-white/80">
                    {currentFeatureIdx === 0 && "Credit card, Check, Paypal"}
                    {currentFeatureIdx === 1 && "from 200$"}
                    {currentFeatureIdx === 2 && "skin experts"}
                    {currentFeatureIdx === 3 && "only 48 hours"}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Elegant Dots indicators */}
              <div className="flex justify-center gap-1.5 mt-4">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentFeatureIdx(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentFeatureIdx ? 'bg-white w-3' : 'bg-white/40'
                    }`}
                    aria-label={`Go to feature ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop / Tablet Grid */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-16 mb-16 border-b border-white/20">
              <div className="flex flex-col items-start text-left">
                <CreditCard className="w-8 h-8 text-white mb-4" strokeWidth={1.5} />
                <h5 className="font-sans text-[15px] text-white mb-1">Secure payment</h5>
                <p className="font-sans text-[15px] text-white/80">Credit card, Check, Paypal</p>
              </div>
              <div className="flex flex-col items-start text-left">
                <Globe className="w-8 h-8 text-white mb-4" strokeWidth={1.5} />
                <h5 className="font-sans text-[15px] text-white mb-1">Free delivery worldwide</h5>
                <p className="font-sans text-[15px] text-white/80">from 200$</p>
              </div>
              <div className="flex flex-col items-start text-left">
                <Headphones className="w-8 h-8 text-white mb-4" strokeWidth={1.5} />
                <h5 className="font-sans text-[15px] text-white mb-1">Lifetime support from our</h5>
                <p className="font-sans text-[15px] text-white/80">skin experts</p>
              </div>
              <div className="flex flex-col items-start text-left">
                <Truck className="w-8 h-8 text-white mb-4" strokeWidth={1.5} />
                <h5 className="font-sans text-[15px] text-white mb-1">Super-fast shipping in</h5>
                <p className="font-sans text-[15px] text-white/80">only 48 hours</p>
              </div>
            </div>

            {/* Main Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-8">
              
              {/* Column 1: About (Takes 3 cols) */}
              <div className="lg:col-span-3 flex flex-col items-start text-left pr-0 sm:pr-4">
                <h4 className="font-serif text-lg sm:text-2xl text-white mb-2 sm:mb-6">About</h4>
                <p className="text-sm sm:text-[15px] font-sans text-white/90 leading-relaxed">
                  At Peaches, we're all about creating a safe space for your skin, while still having fun with makeup.
                </p>
              </div>

              {/* Shop, Explore, Infos - Rendered in a subgrid on mobile/tablet to be side by side, but as regular columns on desktop */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-6 grid grid-cols-3 gap-2 sm:gap-4 lg:contents">
                {/* Column 2: Shop Catalog (Takes 2 cols) */}
                <div className="lg:col-span-2 flex flex-col items-start text-left">
                  <h4 className="font-serif text-sm sm:text-2xl text-white mb-2 sm:mb-6">Shop</h4>
                  <ul className="space-y-2 sm:space-y-4 text-xs sm:text-[15px] font-sans text-white/90">
                    <li><a href="#" className="hover:text-white/60 transition-colors">Skincare</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Bodycare</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Lip</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Eye</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Cheek</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Sets</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Complexion</a></li>
                  </ul>
                </div>

                {/* Column 3: Explore links (Takes 2 cols) */}
                <div className="lg:col-span-2 flex flex-col items-start text-left">
                  <h4 className="font-serif text-sm sm:text-2xl text-white mb-2 sm:mb-6">Explore</h4>
                  <ul className="space-y-2 sm:space-y-4 text-xs sm:text-[15px] font-sans text-white/90">
                    <li><a href="#" className="hover:text-white/60 transition-colors">About us</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Blogs</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Lookbook</a></li>
                  </ul>
                </div>

                {/* Column 4: Infos links (Takes 2 cols) */}
                <div className="lg:col-span-2 flex flex-col items-start text-left">
                  <h4 className="font-serif text-sm sm:text-2xl text-white mb-2 sm:mb-6">Infos</h4>
                  <ul className="space-y-2 sm:space-y-4 text-xs sm:text-[15px] font-sans text-white/90">
                    <li><a href="#" className="hover:text-white/60 transition-colors">Theme features</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Documentation</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Support</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">FAQ</a></li>
                    <li><a href="#" className="hover:text-white/60 transition-colors">Contact</a></li>
                  </ul>
                </div>
              </div>

              {/* Column 5: Newsletter Input (Takes 3 cols) */}
              <div className="lg:col-span-3 flex flex-col items-start text-left">
                <h4 className="font-serif text-lg sm:text-2xl text-white mb-2 sm:mb-6 whitespace-nowrap">Subscribe to our newsletters</h4>
                <form 
                  onSubmit={(e) => { e.preventDefault(); alert("Successfully subscribed!"); }}
                  className="flex w-full mt-1 items-center bg-white/10 justify-between relative shadow-sm"
                >
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full text-sm sm:text-[15px] font-sans outline-none bg-transparent py-2.5 sm:py-3.5 px-4 border-none text-white placeholder-white/50" 
                    required 
                  />
                  <button 
                    type="submit" 
                    className="w-10 sm:w-12 h-full absolute right-0 top-0 flex items-center justify-center text-white hover:text-white/60 transition-colors cursor-pointer" 
                    aria-label="Confirm signup"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-current" strokeWidth={1.5} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* GIGANTIC BRAND WORDMARK */}
          <div className="w-full select-none relative z-10 py-6 sm:py-12 flex justify-center items-center overflow-hidden">
            <motion.h1 
              initial={{ scale: 0.88, opacity: 0.6 }}
              whileInView={{ scale: 1.0, opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ 
                duration: 2.2, 
                ease: [0.16, 1, 0.3, 1] // ultra-smooth slow ease-out
              }}
              className="text-[18vw] text-white leading-none tracking-tight text-center pointer-events-none select-none w-full title-no-underline flex items-baseline justify-center uppercase"
              style={{
                fontFamily: "serif",
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              ZISU'C<span className="text-[10vw] ml-2 font-sans font-normal relative">&copy;</span>
            </motion.h1>
          </div>

          {/* Bottom Legal bar */}
          <div className="w-full border-t border-white/20 py-4 sm:py-5 flex flex-col lg:flex-row justify-between items-center text-[11px] sm:text-[13px] text-white/80 gap-4 sm:gap-6 select-none px-6 sm:px-12 relative z-20">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1">
              <span>&copy; 2026 By Addy growth studio and </span>
              <a href="#" className="hover:underline">privacy policy</a>
            </div>
            
            {/* Currency selector and Payment SVGs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Language & Currency Selectors */}
              <div className="flex items-center gap-4 font-sans text-[11px] sm:text-[13px] text-white/80">
                <div className="flex items-center gap-1 hover:text-white cursor-pointer">
                  <span>EN</span>
                  <span className="text-[10px]">&#9662;</span>
                </div>
                
                {/* Dynamic & Interactive Currency Selector Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setFooterCurrencyMenuOpen(!footerCurrencyMenuOpen)}
                    className="flex items-center gap-1.5 hover:text-white bg-transparent border-none text-[11px] sm:text-[13px] text-white/85 cursor-pointer font-sans"
                    aria-label="Select footer currency"
                  >
                    <span className="text-[13px]">{currencyFlags[currentCurrency.code] || '🇺🇸'}</span>
                    <span className="font-semibold tracking-wide">{currentCurrency.code}</span>
                    <span className="text-[9px] opacity-75">&#9662;</span>
                  </button>
                  
                  {footerCurrencyMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-30 cursor-default" 
                        onClick={() => setFooterCurrencyMenuOpen(false)} 
                      />
                      <div className="absolute right-0 bottom-full mb-3.5 w-40 bg-white border border-stone-200/80 shadow-2xl rounded-xl py-1.5 z-40 max-h-60 overflow-y-auto">
                        <p className="text-[9px] font-sans font-bold text-stone-400/90 px-3 py-1 uppercase tracking-wider border-b border-stone-100 mb-1">Select Currency</p>
                        {SUPPORTED_CURRENCIES.map((cur) => (
                          <button
                            key={cur.code}
                            type="button"
                            onClick={() => {
                              setCurrentCurrency(cur);
                              setFooterCurrencyMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-mono flex items-center justify-between transition-colors duration-150 hover:bg-stone-50 cursor-pointer ${
                              currentCurrency.code === cur.code ? 'text-[#00C4BA] font-bold bg-stone-50/70' : 'text-stone-700 hover:text-stone-900'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-[13px]">{currencyFlags[cur.code] || '🇺🇸'}</span>
                              <span className="tracking-tight">{cur.code} ({cur.symbol.trim()})</span>
                            </span>
                            {currentCurrency.code === cur.code && <span className="w-1.5 h-1.5 rounded-full bg-[#00C4BA]" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Payment Card Icons Container */}
              <div className="flex items-center gap-2">
                {/* Visa Icon Card */}
                <div className="px-1.5 py-0.5 rounded-[3px] bg-[#1429A0] flex items-center justify-center text-[9px] font-black text-white tracking-tighter select-none shadow-xs font-serif italic h-[22px]">
                  VISA
                </div>
                {/* Mastercard Icon Card */}
                <div className="px-1.5 py-0.5 rounded-[3px] bg-[#1a1f36] flex items-center justify-center text-[9px] font-black text-white tracking-tighter select-none shadow-xs font-sans h-[22px]">
                  <div className="flex -space-x-1.5">
                    <div className="w-[11px] h-[11px] bg-[#EB001B] rounded-full"></div>
                    <div className="w-[11px] h-[11px] bg-[#F79E1B] rounded-full"></div>
                  </div>
                </div>
                {/* AMEX Icon Card */}
                <div className="px-1.5 py-0.5 rounded-[3px] bg-[#0074CC] flex items-center justify-center text-[8px] font-black text-white tracking-tighter select-none shadow-xs font-sans h-[22px]">
                  AMEX
                </div>
                {/* PayPal Icon Card */}
                <div className="px-1.5 py-0.5 rounded-[3px] bg-white border border-stone-200 flex items-center justify-center text-[9px] font-bold text-[#003087] tracking-tighter select-none shadow-xs font-sans italic h-[22px]">
                  PayPal
                </div>
                {/* Discover Icon Card */}
                <div className="px-1 py-0.5 rounded-[3px] bg-white border border-stone-200 flex items-center justify-center text-[7px] font-bold text-stone-800 tracking-tighter select-none shadow-xs font-sans h-[22px]">
                  DISCOVER
                </div>
              </div>
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
          currentCurrency={currentCurrency}
          onAddToCart={handleAddToCart}
          products={products}
          onProductClick={(id) => {
            setIsCartOpen(false);
            handleNavigate('product', id);
          }}
          isDiscountApplied={isDiscountApplied}
          onApplyDiscount={handleApplyDiscount}
          onRemoveDiscount={handleRemoveDiscount}
          appliedCode={appliedCode}
        />

        {/* SWISS PRECISION 10% DISCOUNT POP-UP MODAL */}
        <DiscountPopup
          settings={settings}
          onApplyDiscountDirectly={handleApplyDiscountDirectly}
          isCartDiscountApplied={isDiscountApplied}
        />

        {/* G. SEARCH OVERLAY */}
        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={products.length > 0 ? products : mockProducts}
          currentCurrency={currentCurrency}
          onProductClick={(productId) => handleNavigate('product', productId)}
        />
        
        {/* Global Social Proof Notification */}
        <SocialProofNotifier 
          activePage={activePage} 
          activeProduct={activeProduct} 
          products={products.length > 0 ? products : mockProducts} 
        />

        {/* AI Support Chatbot Ava */}
        <SkincareChatbot 
          themeColor={settings.colorButton || '#00C4BA'} 
          products={products.length > 0 ? products : mockProducts}
          onAddToCart={handleAddToCart}
          currentCurrency={currentCurrency}
          isOpen={isChatOpen}
          onOpenChange={setIsChatOpen}
        />
      </div>

    </div>
  );
}
