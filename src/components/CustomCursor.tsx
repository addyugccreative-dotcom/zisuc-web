import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Dynamic hover detection for premium interactive links & hover outlines
    const checkHover = () => {
      const hoveredEl = document.querySelector(':hover');
      if (hoveredEl) {
        if (
          hoveredEl.classList.contains('hover-outline-text-effect') ||
          hoveredEl.closest('.hover-outline-text-effect') ||
          hoveredEl.tagName === 'A' ||
          hoveredEl.tagName === 'BUTTON' ||
          hoveredEl.closest('button') ||
          hoveredEl.closest('a') ||
          hoveredEl.closest('.cursor-pointer') ||
          hoveredEl.classList.contains('cursor-pointer')
        ) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      }
    };

    window.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', checkHover);
    };
  }, []);

  // Smooth circular trail interpolation for follow lag
  useEffect(() => {
    let animationFrameId: number;
    
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (isHidden) return null;

  return (
    <>
      {/* Outer Outline Circle Cursor Ring */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full border transition-all duration-300 ease-out hidden md:block"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: isHovered ? '68px' : '40px',
          height: isHovered ? '68px' : '40px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovered ? 'rgba(242, 161, 131, 0.15)' : 'transparent',
          borderColor: isHovered ? '#f2a183' : 'rgba(45, 41, 38, 0.35)',
          mixBlendMode: 'difference',
        }}
        id="luxury-custom-cursor-ring"
      />
      {/* Centered Pointer Core Dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s, height 0.25s, background-color 0.25s',
          backgroundColor: isHovered ? '#f2a183' : '#2d2926',
        }}
        id="luxury-custom-cursor-core"
      />
    </>
  );
};
