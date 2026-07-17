import React, { useEffect, useRef, useState } from 'react';

// Global manager to ensure only one video plays at a time
let activePlayingVideo: HTMLVideoElement | null = null;

export const registerVideoPlayback = (video: HTMLVideoElement) => {
  if (activePlayingVideo && activePlayingVideo !== video) {
    try {
      activePlayingVideo.pause();
    } catch (err) {
      console.log('Error pausing previous video:', err);
    }
  }
  activePlayingVideo = video;
};

export const unregisterVideoPlayback = (video: HTMLVideoElement) => {
  if (activePlayingVideo === video) {
    activePlayingVideo = null;
  }
};

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  aspectRatio?: string; // e.g., "16/9" or "aspect-[16/9]"
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  aboveTheFold?: boolean; // if true, preload="auto" immediately and don't lazy-mount
  objectFit?: 'cover' | 'contain';
}

export const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  className = '',
  aspectRatio,
  autoplay = true,
  loop = true,
  muted = true,
  playsInline = true,
  aboveTheFold = false,
  objectFit = 'cover'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(aboveTheFold);
  const [isInViewport, setIsInViewport] = useState(aboveTheFold);

  // Decode URI, strip extension, and resolve responsive source paths
  const getOptimizedUrls = (originalSrc: string) => {
    if (!originalSrc) return { original: '', mobile: '', desktop: '', poster: '' };

    let decoded = originalSrc;
    try {
      decoded = decodeURIComponent(originalSrc);
    } catch (e) {
      console.warn("Failed to decode URI in OptimizedVideo:", originalSrc, e);
    }
    const lastDotIdx = decoded.lastIndexOf('.');
    if (lastDotIdx === -1) {
      return { original: originalSrc, mobile: originalSrc, desktop: originalSrc, poster: '' };
    }

    const base = decoded.substring(0, lastDotIdx);
    
    // Construct responsive web-optimized versions
    const mobilePath = encodeURI(`${base}_mobile.mp4`);
    const desktopPath = encodeURI(`${base}_desktop.mp4`);
    const posterPath = encodeURI(`${base}_poster.webp`);

    return {
      original: originalSrc,
      mobile: mobilePath,
      desktop: desktopPath,
      poster: posterPath
    };
  };

  const urls = getOptimizedUrls(src);
  const finalPoster = poster || urls.poster;

  // 1. Prefetch Observer (300px threshold to trigger pre-fetch/metadata load and unload offscreen)
  useEffect(() => {
    if (aboveTheFold || !containerRef.current) return;

    const prefetchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsNearViewport(entry.isIntersecting);
        });
      },
      { rootMargin: '300px 0px 300px 0px', threshold: 0.01 }
    );

    prefetchObserver.observe(containerRef.current);
    return () => {
      prefetchObserver.disconnect();
    };
  }, [aboveTheFold, src]);

  // 2. Play/Pause Active Observer (0px boundary to only play on screen)
  useEffect(() => {
    if (!containerRef.current) return;

    const playbackObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { rootMargin: '0px', threshold: 0.01 }
    );

    playbackObserver.observe(containerRef.current);
    return () => {
      playbackObserver.disconnect();
    };
  }, [src]);

  // Playback control state machine with global registration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoplay && isInViewport) {
      // Register with the global playback manager to ensure single video plays
      registerVideoPlayback(video);

      // Browser sandboxing safety catch
      video.play().catch((err) => {
        console.log('Autoplay deferred or prevented:', err.message);
      });
    } else {
      video.pause();
      unregisterVideoPlayback(video);
    }

    return () => {
      if (video) {
        unregisterVideoPlayback(video);
      }
    };
  }, [isInViewport, autoplay]);

  // Clean aspect-ratio utility style with GPU hardware acceleration hints
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    contain: 'layout paint',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform, opacity',
    ...(aspectRatio ? { aspectRatio } : {})
  };

  return (
    <div 
      ref={containerRef} 
      style={containerStyle}
      className={`select-none ${className}`}
    >
      {/* Visual background placeholder or poster frame to eliminate white flash */}
      {finalPoster && (
        <img
          src={finalPoster}
          alt="Video preloader"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ease-out z-0"
          style={{
            objectFit,
            opacity: videoRef.current?.readyState && videoRef.current.readyState >= 3 ? 0 : 1,
            willChange: 'opacity'
          }}
          loading={aboveTheFold ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}

      {/* Lazy mount video content once near viewport */}
      {isNearViewport && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full z-10 bg-transparent"
          style={{ 
            objectFit,
            width: '100%',
            height: '100%',
          }}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={aboveTheFold ? 'auto' : 'metadata'}
        >
          {/* Mobile optimization source */}
          <source src={urls.mobile} media="(max-width: 767px)" type="video/mp4" />
          {/* Desktop optimization source */}
          <source src={urls.desktop} media="(min-width: 768px)" type="video/mp4" />
          {/* Fallback to original source if browser does not support media sources or if file is missing */}
          <source src={urls.original} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
