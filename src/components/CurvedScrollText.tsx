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
  }, [isMobile]);

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

  // Generate 24 repeats to guarantee the text is completely solid, seamless and endless across the viewport
  const textBlocks = Array.from({ length: 24 }).map((_, i) => (
    <React.Fragment key={i}>
      <tspan fill="#292524" className="cormorant-serif-ticker">Kind to your skin, gentle on the planet.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tspan>
    </React.Fragment>
  ));

  const mobilePath = "M -3600,100 Q -3400,20 -3200,100 T -2800,100 T -2400,100 T -2000,100 T -1600,100 T -1200,100 T -800,100 T -400,100 T 0,100 T 400,100 T 800,100 T 1200,100 T 1600,100 T 2000,100 T 2400,100 T 2800,100 T 3200,100 T 3600,100 T 4000,100 T 4400,100";
  const desktopPath = "M -3600,120 Q -3300,-30 -3000,120 T -2400,120 T -1800,120 T -1200,120 T -600,120 T 0,120 T 600,120 T 1200,120 T 1800,120 T 2400,120 T 3000,120 T 3600,120 T 4200,120 T 4800,120";

  return (
    <div 
      ref={containerRef} 
      className="w-full bg-white relative overflow-hidden py-10 sm:py-5 select-none border-y border-stone-200/20 flex items-center justify-center"
      style={{ minHeight: isMobile ? '130px' : '150px', maxHeight: isMobile ? '170px' : '180px' }}
    >
      {/* Import authentic Cormorant Garamond font for that beauty editorial serif aesthetic */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400;1,500;1,600&display=swap');
        
        .cormorant-serif-ticker {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 400;
        }

        /* 
          Prominent, high-fashion typography matching the original Shopify theme video.
        */
        .premium-serif-curve-text {
          font-size: 38px;
          letter-spacing: -0.01em;
        }
        
        @media (max-width: 640px) {
          .premium-serif-curve-text {
            font-size: 28px; /* Prominent elegant wave text on mobile, letters look bigger and much closer */
            letter-spacing: -0.015em;
          }
        }
      `}</style>

      {/* Curved Path Container with tightly defined aspect ratio */}
      <div className={`w-full ${isMobile ? 'h-[110px]' : 'h-[150px]'} flex items-center justify-center relative overflow-visible`}>
        <svg 
          viewBox={isMobile ? "0 0 500 200" : "0 0 1000 240"} 
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
            <tspan>Kind to your skin, gentle on the planet.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tspan>
          </text>

          {/* 
            Repeating sine-wave-like curve for desktop and mobile!
            Pronounced rolling wave with 1200px period to show a clear wave shape on all screens.
          */}
          <path 
            id="ticker-premium-rising-gradient-path" 
            d={isMobile ? mobilePath : desktopPath} 
            fill="none" 
            stroke="transparent" 
            strokeWidth="0"
          />

          {/* Seamless rolling text path */}
          <text className="cormorant-serif-ticker tracking-tight leading-none premium-serif-curve-text" fill="#000000">
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
