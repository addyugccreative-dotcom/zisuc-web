import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CurvedScrollText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const measurementRef = useRef<SVGTextElement>(null);
  const [textWidth, setTextWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Media query matching 640px viewport break
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    setIsMobile(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Measure the precise pixel width of one complete repeating phrase: "Kind to your skin, gentle on the planet.      "
    if (measurementRef.current) {
      try {
        const width = measurementRef.current.getComputedTextLength();
        if (width > 0) {
          setTextWidth(width);
        } else {
          setTextWidth(900);
        }
      } catch (err) {
        setTextWidth(900);
      }
    }
  }, []);

  useEffect(() => {
    if (!textPathRef.current || textWidth === 0) return;

    // To prevent any visual glitch or jump, shift exactly by one full phrase pixel-width.
    // Reducing duration to 13 seconds creates a faster, lively, incredibly premium scrolling pace.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textPathRef.current,
        {
          attr: { startOffset: 0 }
        },
        {
          attr: { startOffset: -textWidth },
          ease: 'none',
          duration: 8.5, 
          repeat: -1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [textWidth]);

  // Generate 16 repeats to guarantee the text is completely solid, seamless and endless across the viewport
  const textBlocks = Array.from({ length: 16 }).map((_, i) => (
    <React.Fragment key={i}>
      <tspan fill="#3a3a3a" fontWeight="300" className="text-light-serif font-serif italic">Kind to your skin, gentle on the </tspan>
      <tspan fill="#000000" fontWeight="700" className="text-bold-serif font-serif italic">planet.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tspan>
    </React.Fragment>
  ));

  return (
    <div 
      ref={containerRef} 
      className="w-full bg-[#FAF5F0] relative overflow-hidden py-4 sm:py-8 select-none border-y border-stone-200/25 flex items-center justify-center"
      style={{ minHeight: isMobile ? '135px' : '190px', maxHeight: '280px' }}
    >
      {/* Import authentic Cormorant Garamond font for that beauty editorial serif aesthetic */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400;1,600;1,700&display=swap');
        
        .cormorant-serif-ticker {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
        }

        .text-light-serif {
          font-weight: 300;
        }

        .text-bold-serif {
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        /* 
          Prominent, high-fashion typography matching the original Shopify theme video.
        */
        .premium-serif-curve-text {
          font-size: 78px;
          letter-spacing: -0.01em;
        }
        
        @media (max-width: 640px) {
          .premium-serif-curve-text {
            font-size: 44px; /* Visually bold, high-fashion text on mobile matching screenshot 1 */
            letter-spacing: -0.02em;
          }
        }
      `}</style>

      {/* Curved Path Container with tightly defined aspect ratio */}
      <div className="w-full h-[135px] sm:h-[190px] flex items-center justify-center relative overflow-visible">
        <svg 
          viewBox="0 0 1000 240" 
          className="w-full h-full pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          {/* Hidden measurement node for calculating exact seamless offset width */}
          <text 
            ref={measurementRef} 
            opacity="0" 
            x="-3000" 
            y="-3000" 
            className="cormorant-serif-ticker premium-serif-curve-text"
          >
            <tspan>Kind to your skin, gentle on the </tspan>
            <tspan>planet.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tspan>
          </text>

          {/* 
            Continuous, mathematically smooth, ultra-premium sine-wave-like curve for desktop and mobile!
          */}
          <path 
            id="ticker-premium-rising-gradient-path" 
            d="M -3000,120 C -2750,50 -2500,50 -2250,120 C -2000,190 -1750,190 -1500,120 C -1250,50 -1000,50 -750,120 C -500,190 -250,190 0,120 C 250,50 500,50 750,120 C 1000,190 1250,190 1500,120 C 1750,50 2000,50 2250,120 C 2500,190 2750,190 3000,120" 
            fill="none" 
            stroke="transparent" 
            strokeWidth="0"
          />

          {/* Seamless rolling text path */}
          <text className="cormorant-serif-ticker tracking-tight leading-none premium-serif-curve-text">
            <textPath 
              href="#ticker-premium-rising-gradient-path" 
              ref={textPathRef} 
              startOffset="0%"
            >
              {textBlocks}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
