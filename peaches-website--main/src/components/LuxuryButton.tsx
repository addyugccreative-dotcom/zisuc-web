import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  label?: string; // Optional simple string label for character splitting animation
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  children,
  label,
  className = '',
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      // If cursor enters closer to the top, it enters from the top, so we animate downward (push letters down).
      // If it enters closer to the bottom, it enters from the bottom, so we animate upward (push letters up).
      const isTopEntry = relativeY < rect.height / 2;
      setDirection(isTopEntry ? 'down' : 'up');
    }
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If we want the leave animation to match the entry direction:
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const isTopExit = relativeY < rect.height / 2;
      // This allows leaving naturally
    }
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  // Split label into letters if label is provided
  // If no label is provided but children is a string, split the children
  const textToSplit = label || (typeof children === 'string' ? children : '');
  const characters = textToSplit ? textToSplit.split('') : [];

  const transitionDuration = 0.38; // Between 0.3s and 0.5s for snappy luxury feel
  const transitionEase = [0.22, 1, 0.36, 1]; // Premium luxury cubic bezier (strong initial acceleration, ultra smooth settle)

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group select-none transition-shadow active:scale-[0.98] ${className}`}
      style={{
        ...style,
        perspective: '1000px',
      }}
      {...props}
    >
      {/* Background luxury overlay */}
      <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {characters.length > 0 ? (
        <span className="relative z-10 flex items-center justify-center gap-x-[0px] h-full py-0.5 pointer-events-none">
          {characters.map((char, idx) => {
            // Spaces need simple non-breaking character
            if (char === ' ') {
              return <span key={idx} className="inline-block">&nbsp;</span>;
            }

            // Direction-aware offsets and opacity transitions:
            // When direction is 'up' (enter from bottom):
            // - Primary characters animate from 0% (y), 1 (opacity) to -105% (y), 0 (opacity)
            // - Secondary characters animate from 105% (y), 0 (opacity) to 0% (y), 1 (opacity)
            // When direction is 'down' (enter from top):
            // - Primary characters animate from 0% (y), 1 (opacity) to 105% (y), 0 (opacity)
            // - Secondary characters animate from -105% (y), 0 (opacity) to 0% (y), 1 (opacity)
            
            const primaryY = isHovered 
              ? (direction === 'up' ? '-100%' : '100%') 
              : '0%';

            const primaryOpacity = isHovered ? 0 : 1;

            const secondaryY = isHovered 
              ? '0%' 
              : (direction === 'up' ? '100%' : '-100%');

            const secondaryOpacity = isHovered ? 1 : 0;

            const delay = idx * 0.025; // Highly optimized stagger between 0.02s and 0.05s

            return (
              <span 
                key={idx} 
                className="relative inline-block overflow-hidden h-[1.35em] leading-[1.35em]"
                style={{ willChange: 'transform, opacity' }} // Hardware accelerated
              >
                {/* Active/Primary Layer */}
                <motion.span
                  className="inline-block"
                  animate={{ y: primaryY, opacity: primaryOpacity }}
                  transition={{
                    duration: transitionDuration,
                    ease: transitionEase,
                    delay: delay,
                  }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  {char}
                </motion.span>

                {/* Incoming/Secondary Layer (Identical Duplicate) */}
                <motion.span
                  className="absolute left-0 top-0 inline-block"
                  initial={{ y: direction === 'up' ? '100%' : '-100%', opacity: 0 }}
                  animate={{ y: secondaryY, opacity: secondaryOpacity }}
                  transition={{
                    duration: transitionDuration,
                    ease: transitionEase,
                    delay: delay,
                  }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
        </span>
      ) : (
        // Fallback for custom children (like icons + text)
        <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
          {children}
        </span>
      )}
    </button>
  );
};

