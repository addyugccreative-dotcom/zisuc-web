import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SafeImage } from './SafeImage';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PremiumSplitHeadingProps {
  children: string;
  className?: string;
  id?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
}

/**
 * Premium Column/Line Split Text Reveal Animation
 * Splitting text on character boundaries but wrapping them inside inline words
 * to prevent breaking the word structures on responsive text lines.
 */
export const PremiumSplitHeading: React.FC<PremiumSplitHeadingProps> = ({
  children,
  className = '',
  id,
  as: Component = 'h2'
}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Fast-select all individual character containers
    const chars = el.querySelectorAll('.premium-char');
    if (chars.length === 0) return;

    // Set high-end pre-reveal initial values
    gsap.set(chars, {
      opacity: 0,
      filter: 'blur(5px)',
      x: -12,
      y: 8,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(chars, {
          opacity: 1,
          filter: 'blur(0px)',
          x: 0,
          y: 0,
          duration: 1.1, // 0.8s - 1.4s
          stagger: 0.025, // 0.02s - 0.05s
          ease: 'power4.out',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [children]);

  // Split text into words first to prevent bad line wrap-points
  const words = children.split(' ');

  return (
    <Component ref={elementRef as any} className={`${className} inline-wrap`} id={id}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIdx) => (
            <span
              key={charIdx}
              className="premium-char inline-block origin-left"
              style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
};

interface PremiumSlideInTextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'div' | 'p' | 'span' | 'h3' | 'h4' | 'button' | 'a';
  delay?: number;
}

/**
 * Editorial Content Slide In Animation
 * Softly fades content and pushes upward with a premium, expensive touch.
 */
export const PremiumSlideInText: React.FC<PremiumSlideInTextProps> = ({
  children,
  className = '',
  id,
  as: Component = 'div',
  delay = 0,
  ...rest
}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    gsap.set(el, {
      opacity: 0,
      y: 28
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.0, // 0.8s - 1.2s
          ease: 'power3.out',
          delay: delay,
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [delay]);

  return (
    <Component
      ref={elementRef as any}
      className={className}
      id={id}
      style={{ willChange: 'transform, opacity' }}
      {...rest}
    >
      {children}
    </Component>
  );
};

interface PremiumRevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  id?: string;
  fallbackSrc: string;
  hoverZoom?: boolean;
}

/**
 * Luxury Zoom-Out Reveal Image Component
 * Smooth scales down image from intense 1.25/1.28 down to 1.00 while fading in on scroll Trigger.
 * Also handles intense zoom-in hover animations smoothly via GSAP.
 */
export const PremiumRevealImage: React.FC<PremiumRevealImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  id,
  fallbackSrc,
  hoverZoom = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const isRevealedRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const imgWrap = imageWrapperRef.current;
    if (!container || !imgWrap) return;

    // Apply intense initial zoom-in and opacity 0
    gsap.set(imgWrap, {
      scale: 1.26,
      opacity: 0
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        isRevealedRef.current = true;
        gsap.to(imgWrap, {
          scale: 1.00,
          opacity: 1,
          duration: 1.8, // Elegant, expensive deceleration
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (!hoverZoom) return;
    const imgWrap = imageWrapperRef.current;
    if (imgWrap) {
      gsap.to(imgWrap, {
        scale: 1.28, // Intense luxury hover zoom in
        duration: 0.85, // Responsive, rich acceleration
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

  const handleMouseLeave = () => {
    if (!hoverZoom) return;
    const imgWrap = imageWrapperRef.current;
    if (imgWrap) {
      gsap.to(imgWrap, {
        scale: 1.00, // Smooth return to normal
        duration: 1.25, // Silky dynamic slow deceleration
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${className} overflow-hidden`}
      id={id}
      style={{ isolation: 'isolate' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={imageWrapperRef} 
        className="w-full h-full"
        style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
      >
        <SafeImage
          src={src}
          fallbackSrc={fallbackSrc}
          alt={alt}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </div>
    </div>
  );
};

interface PremiumCircleIngredientProps {
  image: string;
  name: string;
  delay?: number;
}

/**
 * Circle Ingredient Capsule matching Image 1
 * Displays dynamic zoom-out of interior ingredient on entering viewport.
 * Pure white circle backdrop and intensive cursor hover zoom scaling.
 */
export const PremiumCircleIngredient: React.FC<PremiumCircleIngredientProps> = ({
  image,
  name,
  delay = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isRevealedRef = useRef(false);

  useEffect(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    // Initially scale it up intensely and set opacity 0
    gsap.set(img, {
      scale: 1.35,
      opacity: 0
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        isRevealedRef.current = true;
        gsap.to(img, {
          scale: 1.00,
          opacity: 1,
          duration: 1.8, // Slower, luxury scroll-down zoom out reveal
          ease: 'power3.out',
          delay: delay,
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [delay, image]);

  const handleMouseEnter = () => {
    const img = imgRef.current;
    if (img) {
      gsap.to(img, {
        scale: 1.28, // Intense luxury zoom-in
        duration: 0.85, // responsive, fast acceleration
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    if (img) {
      gsap.to(img, {
        scale: 1.00, // Return to original size
        duration: 1.25, // Slow expensive deceleration
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[130px] h-[130px] xs:w-[136px] xs:h-[136px] sm:w-44 sm:h-44 rounded-full overflow-hidden border border-stone-100 p-2 bg-white shadow-[0_6px_20px_rgba(45,41,38,0.03)] flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-full rounded-full overflow-hidden relative bg-white">
        <img
          ref={imgRef}
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
    </div>
  );
};
