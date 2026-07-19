import React, { useState, useEffect, useRef } from 'react';

// Global cache to track already loaded image URLs to prevent flashing on cached images
const loadedImageCache = new Set<string>();

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, fallbackSrc, alt, className = '', ...props }) => {
  const getOptimizedSrc = (url: string) => {
    if (!url) return url;
    if (url.includes('images.unsplash.com')) {
      let optimized = url;
      // Remove any existing fm parameter to avoid conflicts
      optimized = optimized.replace(/[&?]fm=[a-zA-Z0-9]+/g, '');
      // Remove auto parameter
      optimized = optimized.replace(/[&?]auto=[a-zA-Z0-9]+/g, '');
      // Add modern webp compression and auto formatting with safe dimensions
      optimized += (optimized.includes('?') ? '&' : '?') + 'fm=webp&q=75';
      
      // If no width is specified in the URL, apply a sensible responsive width cap to save bandwidth
      if (!optimized.includes('w=')) {
        optimized += '&w=1000';
      }
      return optimized;
    }
    return url;
  };

  const initialSrc = getOptimizedSrc(src);
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [hasFailed, setHasFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(() => loadedImageCache.has(initialSrc));
  const imgRef = useRef<HTMLImageElement>(null);

  // Monitor src changes
  useEffect(() => {
    const nextSrc = getOptimizedSrc(src);
    setImgSrc(nextSrc);
    setHasFailed(false);
    setIsLoaded(loadedImageCache.has(nextSrc));
  }, [src]);

  const handleError = () => {
    if (!hasFailed) {
      const failSrc = getOptimizedSrc(fallbackSrc);
      setImgSrc(failSrc);
      setHasFailed(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    loadedImageCache.add(imgSrc);
  };

  // Check if image is already cached on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleLoad();
    }
  }, [imgSrc]);

  // Combine original styles with performance properties
  const classes = className.split(' ');
  const objectFitClasses = classes.filter(cls => cls.startsWith('object-')).join(' ') || 'object-cover';
  const otherClasses = classes.filter(cls => !cls.startsWith('object-')).join(' ');

  const hasPosition = classes.some(cls => ['absolute', 'relative', 'fixed', 'sticky'].includes(cls));

  return (
    <div className={`${hasPosition ? '' : 'relative'} overflow-hidden ${otherClasses}`}>
      {/* Blurred preview block matching 120hz fluid specs */}
      {!isLoaded && !hasFailed && (
        <div 
          className="absolute inset-0 bg-stone-100 dark:bg-stone-900 animate-pulse"
          style={{ 
            filter: 'blur(10px)',
            transform: 'scale(1.05) translateZ(0)',
            willChange: 'opacity',
            transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      )}
      <img
        ref={imgRef}
        src={imgSrc}
        onLoad={handleLoad}
        onError={handleError}
        alt={alt}
        referrerPolicy="no-referrer"
        decoding="async"
        loading={props.loading || "lazy"}
        className={`w-full h-full ${objectFitClasses} transition-all duration-[400ms] cubic-bezier(0.16, 1, 0.3, 1) transform-gpu ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.02] blur-[4px]'
        }`}
        style={{
          willChange: 'transform, opacity, filter',
          backfaceVisibility: 'hidden',
          ...props.style
        }}
        {...props}
      />
    </div>
  );
};
