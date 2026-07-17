import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  // Use refs to track current mouse position and animated trail position
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Throttled mouseover check for hover elements using mouseover
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        if (
          target.classList.contains('hover-outline-text-effect') ||
          target.closest('.hover-outline-text-effect') ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.cursor-pointer') ||
          target.classList.contains('cursor-pointer')
        ) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      }
    };

    window.addEventListener('mouseover', checkHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', checkHover);
    };
  }, []);

  // Update trail and position directly in the DOM for ultimate high performance (no React re-renders on mousemove!)
  useEffect(() => {
    if (isHidden) return;

    let animId: number;
    const updateDOM = () => {
      // Interpolate trail
      const dx = mousePos.current.x - trailPos.current.x;
      const dy = mousePos.current.y - trailPos.current.y;
      
      trailPos.current.x += dx * 0.15;
      trailPos.current.y += dy * 0.15;

      // Update ring with GPU accelerated translation
      if (ringRef.current) {
        const scaleValue = isHovered ? 1.7 : 1;
        ringRef.current.style.transform = `translate3d(calc(${trailPos.current.x}px - 50%), calc(${trailPos.current.y}px - 50%), 0) scale(${scaleValue})`;
        ringRef.current.style.backgroundColor = isHovered ? 'rgba(242, 161, 131, 0.15)' : 'transparent';
        ringRef.current.style.borderColor = isHovered ? '#f2a183' : 'rgba(45, 41, 38, 0.35)';
      }

      // Update core dot with GPU accelerated translation
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(calc(${mousePos.current.x}px - 50%), calc(${mousePos.current.y}px - 50%), 0)`;
      }

      animId = requestAnimationFrame(updateDOM);
    };

    animId = requestAnimationFrame(updateDOM);
    return () => cancelAnimationFrame(animId);
  }, [isHidden, isHovered]);

  if (isHidden) return null;

  return (
    <>
      {/* Outer Outline Circle Cursor Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border transition-[background-color,border-color] duration-300 ease-out hidden md:block"
        style={{
          width: '40px',
          height: '40px',
          transform: 'translate3d(-100px, -100px, 0)',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
        id="luxury-custom-cursor-ring"
      />
      {/* Centered Pointer Core Dot */}
      <div
        ref={coreRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full hidden md:block"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          backgroundColor: isHovered ? '#f2a183' : '#2d2926',
          willChange: 'transform',
        }}
        id="luxury-custom-cursor-core"
      />
    </>
  );
};
