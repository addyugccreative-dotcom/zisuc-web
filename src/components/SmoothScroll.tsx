import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export const SmoothScrollProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // 1. Initialize Lenis with exact settings
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,      // keep native scroll on mobile for performance/battery
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    // RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const gsapTickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTickerCb);
    gsap.ticker.lagSmoothing(0);

    // 3. Anchor link handling with Lenis scrollTo
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl as HTMLElement, {
          offset: -80,
          duration: 1.2,
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 4. Subtle scroll-linked reveal animation for product cards, sections, and images
    // opacity 0 -> 1, translateY 30px -> 0 as element enters viewport (60% threshold)
    const initRevealAnimations = () => {
      const targets = document.querySelectorAll(
        '.reveal-on-scroll, .product-card, section > div:not([data-no-reveal]), img:not([data-no-reveal])'
      );

      targets.forEach((el) => {
        const element = el as HTMLElement;
        if (element.dataset.lenisAnimated) return;
        element.dataset.lenisAnimated = 'true';

        // Check if element is already in viewport
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight * 0.9;

        if (!isInViewport) {
          gsap.set(element, {
            opacity: 0,
            y: 30,
          });

          ScrollTrigger.create({
            trigger: element,
            start: 'top 85%', // 60-85% threshold into viewport
            once: true,
            onEnter: () => {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: 'power3.out',
              });
            },
          });
        }
      });
    };

    // Run reveals after initial load & layout settle
    const revealTimeout = setTimeout(() => {
      initRevealAnimations();
      ScrollTrigger.refresh();
    }, 200);

    // Re-trigger reveal scanner periodically for dynamic content
    const observer = new MutationObserver(() => {
      initRevealAnimations();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(revealTimeout);
      observer.disconnect();
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(gsapTickerCb);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return <>{children}</>;
};
