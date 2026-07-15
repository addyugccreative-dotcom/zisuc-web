import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Instagram } from 'lucide-react';

interface InstagramCard {
  handle: string;
  image: string;
  link?: string;
}

const communityCards: InstagramCard[] = [
  {
    handle: "dermadiary",
    image: "/post 1.jpg",
    link: "https://www.instagram.com/p/DXQMh2UCB1T/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    handle: "barefacedbeauty",
    image: "/post 2.jpg",
    link: "https://www.instagram.com/p/DXXV7DZiK2t/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    handle: "lumiere.skin",
    image: "/post 3.jpg",
    link: "https://www.instagram.com/p/DaOih_zGPjj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    handle: "velvetcomplexion",
    image: "/post 4.jpg",
    link: "https://www.instagram.com/p/DYAiQHdCOBv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    handle: "botanicglow",
    image: "/post 5.jpg",
    link: "https://www.instagram.com/p/DYNyFeYIPvu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    handle: "earthyskincare",
    image: "/post 6.jpg",
    link: "https://www.instagram.com/p/DYptQZcCCFZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    handle: "glowwithgrace",
    image: "/post 7.jpg",
    link: "https://www.instagram.com/p/DYnJthyItZ3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    handle: "zisucvibe",
    image: "/post 8.jpg",
    link: "https://www.instagram.com/p/DagkdsLmHej/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  }
];

interface InstagramCardComponentProps {
  scrollYProgress: any;
  idx: number;
  spacing: number;
  totalCards: number;
  card: InstagramCard;
  windowWidth: number;
  isMobile: boolean;
  isTablet: boolean;
}

// Extracted card component to respect Rules of Hooks and optimize hardware-accelerated motion values
const InstagramCardComponent: React.FC<InstagramCardComponentProps> = ({
  scrollYProgress,
  idx,
  spacing,
  totalCards,
  card,
  windowWidth,
  isMobile,
  isTablet
}) => {
  // Map smooth scroll value to horizontal position
  const x_card = useTransform(
    scrollYProgress, 
    [0, 1], 
    [idx * spacing, (idx - (totalCards - 1)) * spacing]
  );

  // Parabolic y-coordinate arc creates a beautiful, seamless rainbow curve
  // We approximate the parabola using an interpolation array to run at native hardware-accelerated speeds
  const curveFactor = isMobile ? 0.0016 : isTablet ? 0.0010 : 0.00065;
  const verticalOffset = isMobile ? 20 : 0;
  const pointsY = [-1200, -800, -400, 0, 400, 800, 1200];
  const outputsY = pointsY.map(xVal => (xVal * xVal) * curveFactor + verticalOffset);
  const y_card = useTransform(x_card, pointsY, outputsY);

  // Outward dynamic tilt rotation - mapped via linear interpolation for high performance
  const tiltFactor = isMobile ? 40 : 60;
  const rotate_card = useTransform(x_card, [-1200, 1200], [-1200 / tiltFactor, 1200 / tiltFactor]);

  // Soft fade filter near viewport edge boundaries for premium cinematic quality
  // Mapped via trapezoidal interpolation for instant, buttery-smooth opacity transitions
  const fadeStart = windowWidth * 0.42;
  const fadeEnd = windowWidth * 0.62;
  const opacity_card = useTransform(
    x_card,
    [-fadeEnd, -fadeStart, fadeStart, fadeEnd],
    [0, 1, 1, 0]
  );

  return (
    <motion.a
      href={card.link || `https://instagram.com/${card.handle}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ 
        x: x_card,
        y: y_card,
        rotate: rotate_card,
        opacity: opacity_card,
        zIndex: 10 + idx
      }}
      whileHover={{ 
        scale: 1.05, 
        zIndex: 100,
        boxShadow: "0 25px 50px -12px rgba(45,41,38,0.12)"
      }}
      className="absolute w-[210px] sm:w-[250px] md:w-[280px] bg-white p-3.5 pb-9 sm:pb-12 rounded-[12px] shadow-[0_8px_24px_rgba(45,41,38,0.04)] border border-stone-200/40 group cursor-pointer block transform-gpu origin-center transition-shadow duration-300"
    >
      {/* Polaroid Image Frame */}
      <div className="relative aspect-square w-full rounded-[6px] overflow-hidden bg-stone-100">
        <img decoding="async" loading="lazy" 
          src={card.image} 
          alt={`Peaches skin community - @${card.handle}`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        {/* Instagram tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white bg-black/40 backdrop-blur-[2px] py-1 px-2.5 rounded-full border border-white/10 shadow-xs">
          <Instagram className="w-3 h-3 text-white" />
          <span className="text-[10px] font-sans font-bold tracking-wide text-white">
            @{card.handle}
          </span>
        </div>
      </div>
    </motion.a>
  );
};

export const CommunityInstagramFeed: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  // Set clean, responsive horizontal spacing between card centers
  const spacing = isMobile ? 240 : isTablet ? 290 : 340;

  // Track the absolute scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply fluid, premium spring physics to filter out scroll notches and create a gorgeous liquid-smooth momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,     // Balanced stiffness for smooth, luxury glide
    damping: 26,       // Perfectly tuned damping to eliminate jitter and bounce
    mass: 0.4,         // Medium momentum to filter out rapid mousewheel ticks
    restDelta: 0.0001
  });

  return (
    <section 
      ref={containerRef}
      id="community-instagram-feed-section"
      className="relative w-full h-[380vh] bg-[#FAF5F0] select-none" // Generous track height to create a majestic, controlled scroll speed
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-12 md:py-16 bg-[#FAF5F0]">
        
        {/* Section Header: Anchored at the top */}
        <div className="max-w-7xl mx-auto px-6 text-center z-20">
          <h2 className="font-heading text-stone-900 text-3xl sm:text-4xl md:text-[40px] tracking-tight leading-tight title-no-underline no-luxury-underline">
            Join the skin community
          </h2>
          <p className="font-serif italic text-[15px] sm:text-[17px] text-[#BE2A59] font-light mt-2 title-no-underline no-luxury-underline">
            @zisucvibe
          </p>
        </div>

        {/* Curved Card Arena: centered vertically */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-visible z-10">
          
          {/* Ambient left and right vignette fade filters to look incredibly premium */}
          <div className="absolute left-0 inset-y-0 w-16 md:w-32 bg-gradient-to-r from-[#FAF5F0] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-16 md:w-32 bg-gradient-to-l from-[#FAF5F0] to-transparent z-20 pointer-events-none" />

          {/* Cards Anchor - perfectly centered point of the screen */}
          <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
            {communityCards.map((card, idx) => (
              <InstagramCardComponent
                key={idx}
                scrollYProgress={smoothProgress}
                idx={idx}
                spacing={spacing}
                totalCards={communityCards.length}
                card={card}
                windowWidth={windowWidth}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </div>
        </div>

        {/* Ambient indicator corresponding to video */}
        <div className="h-6 w-full flex items-center justify-center z-20 pointer-events-none opacity-0">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-450" />
        </div>

      </div>
    </section>
  );
};
