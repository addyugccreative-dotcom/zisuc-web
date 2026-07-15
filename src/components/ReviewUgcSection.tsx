import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface UgcVideo {
  id: string;
  videoUrl: string;
  posterUrl: string;
  isLive: boolean;
  topOverlays?: { text: string; bgClass: string; textClass: string }[];
  bottomOverlays?: { text: string; bgClass: string; textClass: string }[];
}

export const ReviewUgcSection: React.FC = () => {
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<UgcVideo | null>(null);
  const [isMutedInModal, setIsMutedInModal] = useState(false);
  const [isPlayingInModal, setIsPlayingInModal] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // High-quality local UGC Videos (using local assets in public folder to ensure instant zero-lag playback)
  const ugcVideos: UgcVideo[] = [
    {
      id: 'ugc-1',
      videoUrl: '/video frame 1.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600',
      isLive: true,
      topOverlays: [
        { text: 'Hydrating Formula', bgClass: 'bg-amber-300/95 border border-amber-400/20 shadow-xs', textClass: 'text-stone-900 font-sans text-[10px] font-bold px-2 py-0.5 rounded-[3px]' },
      ],
      bottomOverlays: [
        { text: 'Sweat & Waterproof', bgClass: 'bg-rose-500/90', textClass: 'text-white font-sans text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm' }
      ]
    },
    {
      id: 'ugc-2',
      videoUrl: '/UGC 2.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600',
      isLive: true,
      topOverlays: [
        { text: 'Maximum Daily Protection', bgClass: 'bg-white/95 border border-stone-200/50 backdrop-blur-xs', textClass: 'text-stone-900 font-serif text-[11px] font-semibold px-2.5 py-1 shadow-xs rounded-[4px]' }
      ]
    },
    {
      id: 'ugc-3',
      videoUrl: '/UGC 3.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600',
      isLive: true,
      topOverlays: [
        { text: 'No white cast', bgClass: 'bg-stone-900/95 shadow-xs', textClass: 'text-amber-100 font-sans text-[10px] font-semibold px-2 py-0.5 rounded-[3px]' }
      ],
      bottomOverlays: [
        { text: 'SPF 50++++', bgClass: 'bg-stone-900/90 shadow-sm', textClass: 'text-amber-200 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded' },
        { text: 'Sweat and Waterproof', bgClass: 'bg-stone-900/90 shadow-sm', textClass: 'text-white font-sans text-[9px] font-medium px-1.5 py-0.5 rounded' }
      ]
    },
    {
      id: 'ugc-4',
      videoUrl: '/UGC 4.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600',
      isLive: true,
      topOverlays: [
        { text: 'No white cast', bgClass: 'bg-stone-900/90 shadow-sm', textClass: 'text-white font-sans text-[10px] font-bold px-2 py-0.5 rounded' }
      ]
    },
    {
      id: 'ugc-5',
      videoUrl: '/video frame 2.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600',
      isLive: true,
      topOverlays: [
        { text: 'Dewy Finish', bgClass: 'bg-emerald-500/90 shadow-sm', textClass: 'text-white font-sans text-[10px] font-bold px-2 py-0.5 rounded' }
      ]
    },
    {
      id: 'ugc-6',
      videoUrl: '/video frame 3.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600',
      isLive: true,
      topOverlays: [
        { text: 'Daily Glow', bgClass: 'bg-amber-500/90 shadow-sm', textClass: 'text-white font-sans text-[10px] font-bold px-2 py-0.5 rounded' }
      ]
    },
    {
      id: 'ugc-7',
      videoUrl: '/video frame 4.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600',
      isLive: true,
      topOverlays: [
        { text: 'Deep Hydration', bgClass: 'bg-blue-500/90 shadow-sm', textClass: 'text-white font-sans text-[10px] font-bold px-2 py-0.5 rounded' }
      ]
    },
    {
      id: 'ugc-8',
      videoUrl: '/UGC 2.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600',
      isLive: true,
      topOverlays: [
        { text: 'Natural Glow', bgClass: 'bg-purple-500/90 shadow-sm', textClass: 'text-white font-sans text-[10px] font-bold px-2 py-0.5 rounded' }
      ]
    },
    {
      id: 'ugc-9',
      videoUrl: '/UGC 3.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600',
      isLive: true,
      topOverlays: [
        { text: 'Smooth Finish', bgClass: 'bg-indigo-500/90 shadow-sm', textClass: 'text-white font-sans text-[10px] font-bold px-2 py-0.5 rounded' }
      ]
    },
    {
      id: 'ugc-10',
      videoUrl: '/UGC 4.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1590156221120-e261d7778b11?q=80&w=600',
      isLive: true,
      topOverlays: [
        { text: 'Sun Safe', bgClass: 'bg-orange-500/90 shadow-sm', textClass: 'text-white font-sans text-[10px] font-bold px-2 py-0.5 rounded' }
      ]
    }
  ];

  // We duplicate the list of 10 items to make a continuous seamless scrolling marquee
  const repeatedVideos = [...ugcVideos, ...ugcVideos];

  // Sync mute state inside the modal
  useEffect(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = isMutedInModal;
    }
  }, [isMutedInModal, selectedVideo]);

  const openVideoInModal = (video: UgcVideo) => {
    setSelectedVideo(video);
    setIsMutedInModal(false); // Unmute by default so they can hear voiceover
    setIsPlayingInModal(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const handleNextModalVideo = () => {
    if (!selectedVideo) return;
    const currentIndex = ugcVideos.findIndex(v => v.id === selectedVideo.id);
    const nextIndex = (currentIndex + 1) % ugcVideos.length;
    setSelectedVideo(ugcVideos[nextIndex]);
    setIsPlayingInModal(true);
  };

  const handlePrevModalVideo = () => {
    if (!selectedVideo) return;
    const currentIndex = ugcVideos.findIndex(v => v.id === selectedVideo.id);
    const prevIndex = (currentIndex - 1 + ugcVideos.length) % ugcVideos.length;
    setSelectedVideo(ugcVideos[prevIndex]);
    setIsPlayingInModal(true);
  };

  const toggleModalPlay = () => {
    if (modalVideoRef.current) {
      if (isPlayingInModal) {
        modalVideoRef.current.pause();
        setIsPlayingInModal(false);
      } else {
        modalVideoRef.current.play().catch(() => {});
        setIsPlayingInModal(true);
      }
    }
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-16 md:py-20 select-none overflow-hidden border-t border-b border-stone-200/40 relative">
      {/* Dynamic Marquee Keyframes */}
      <style>{`
        @keyframes ugc-infinite-marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .ugc-marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: ugc-infinite-marquee 45s linear infinite;
        }
        .ugc-marquee-track.paused {
          animation-play-state: paused;
        }
        /* Hide scrollbars */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div className="space-y-1.5">
            <h2 className="font-heading font-light text-2xl sm:text-3xl text-stone-900 uppercase tracking-widest leading-none">
              REVIEW UGC
            </h2>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-stone-500 font-mono">
              Real customers • Unfiltered results
            </p>
          </div>
          
          {/* Scroll Control Button (Play/Pause instead of arrows) */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsAutoScrollPaused(!isAutoScrollPaused)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-mono font-medium tracking-wide cursor-pointer transition shadow-xs active:scale-95"
              aria-label={isAutoScrollPaused ? "Start auto scroll" : "Pause auto scroll"}
            >
              {isAutoScrollPaused ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <Play className="w-3.5 h-3.5 text-stone-600 fill-stone-600" />
                  <span>START AUTO SCROLL</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Pause className="w-3.5 h-3.5 text-stone-600 fill-stone-600" />
                  <span>PAUSE AUTO SCROLL</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Continuously Scrolling Track Wrapper */}
      <div 
        className="w-full overflow-hidden py-2"
        onMouseEnter={() => setIsAutoScrollPaused(true)}
        onMouseLeave={() => setIsAutoScrollPaused(false)}
      >
        <div className={`ugc-marquee-track px-4 ${isAutoScrollPaused ? 'paused' : ''}`}>
          {repeatedVideos.map((video, idx) => {
            const uniqueKey = `ugc-card-${video.id}-${idx}`;
            return (
              <div
                key={uniqueKey}
                onClick={() => openVideoInModal(video)}
                className="w-[170px] sm:w-[200px] aspect-[9/16] shrink-0 rounded-2xl overflow-hidden relative shadow-sm hover:shadow-md hover:scale-102 transition-all duration-300 cursor-pointer border border-stone-200/40 bg-[#FAF6F3] group"
              >
                {/* Autoplay Muted Low-Lag Local Video */}
                <video
                  src={video.videoUrl}
                  poster={video.posterUrl}
                  loop
                  muted
                  playsInline
                  autoPlay
                  preload="auto"
                  className="w-full h-full object-cover"
                />

                {/* Dark Mask layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top Text Badges / Overlays */}
                {video.topOverlays && video.topOverlays.length > 0 && (
                  <div className="absolute top-3 left-3 right-3 flex flex-col gap-1.5 items-start pointer-events-none">
                    {video.topOverlays.map((badge, bIdx) => (
                      <span 
                        key={bIdx} 
                        className={`${badge.bgClass} ${badge.textClass} tracking-wide`}
                      >
                        {badge.text}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom Custom Controls & Overlays */}
                <div className="absolute bottom-3.5 left-3 right-3 flex items-end justify-between z-10 pointer-events-none">
                  {/* Play Button Indicator (Enlarged and styled) */}
                  <div className="w-8 h-8 rounded-full bg-black/40 group-hover:bg-black/60 backdrop-blur-xs flex items-center justify-center transition shadow-xs">
                    <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                  </div>

                  {/* Bottom Center overlays */}
                  {video.bottomOverlays && video.bottomOverlays.length > 0 && (
                    <div className="flex flex-col gap-1 items-start ml-2 max-w-[100px]">
                      {video.bottomOverlays.map((badge, bIdx) => (
                        <span 
                          key={bIdx} 
                          className={`${badge.bgClass} ${badge.textClass} truncate max-w-full`}
                        >
                          {badge.text}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* LIVE badge bottom-right exactly like Screenshot 1 */}
                  {video.isLive && (
                    <span className="px-1.5 py-0.5 bg-black/50 backdrop-blur-xs text-white text-[8px] font-mono font-bold tracking-wider rounded uppercase shrink-0">
                      LIVE
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Immersive Full Screen UGC Video Overlay Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-150 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-sm sm:max-w-[420px] aspect-[9/16] bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full height active video playing */}
              <video
                ref={modalVideoRef}
                src={selectedVideo.videoUrl}
                autoPlay
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={toggleModalPlay}
              />

              {/* Gradient Dark Grids for Overlays */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Header inside Modal */}
              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-white text-xs font-mono tracking-widest uppercase font-bold drop-shadow-sm">
                    UGC VERIFIED REVIEW
                  </p>
                </div>

                {/* Close Button Circle */}
                <button
                  type="button"
                  onClick={closeVideoModal}
                  className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center text-white cursor-pointer transition border border-white/10 active:scale-95"
                  aria-label="Close review"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Arrows (Float on sides) */}
              <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
                <button
                  type="button"
                  onClick={handlePrevModalVideo}
                  className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center text-white cursor-pointer pointer-events-auto transition active:scale-95 border border-white/5"
                  aria-label="Previous UGC video"
                >
                  <ChevronLeft className="w-5 h-5" style={{ transform: 'none' }} />
                </button>
                <button
                  type="button"
                  onClick={handleNextModalVideo}
                  className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center text-white cursor-pointer pointer-events-auto transition active:scale-95 border border-white/5"
                  aria-label="Next UGC video"
                >
                  <ChevronRight className="w-5 h-5" style={{ transform: 'none' }} />
                </button>
              </div>

              {/* Footer Overlays / Captions inside Modal */}
              <div className="relative z-10 p-5 sm:p-6 mt-auto space-y-4">
                {/* Content badges */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedVideo.topOverlays && selectedVideo.topOverlays.map((badge, bIdx) => (
                    <span 
                      key={bIdx} 
                      className={`${badge.bgClass} ${badge.textClass} text-[10px] tracking-wide`}
                    >
                      {badge.text}
                    </span>
                  ))}
                  {selectedVideo.bottomOverlays && selectedVideo.bottomOverlays.map((badge, bIdx) => (
                    <span 
                      key={bIdx} 
                      className={`${badge.bgClass} ${badge.textClass} text-[10px] tracking-wide`}
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>

                {/* Interactive Player controls: Play/Pause state and Unmute state */}
                <div className="flex items-center justify-between">
                  {/* Play & Pause State */}
                  <button
                    type="button"
                    onClick={toggleModalPlay}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white text-xs font-medium cursor-pointer transition"
                  >
                    {isPlayingInModal ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-white" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        <span>Play</span>
                      </>
                    )}
                  </button>

                  {/* Volume (Unmute by default) Indicator toggle */}
                  <button
                    type="button"
                    onClick={() => setIsMutedInModal(!isMutedInModal)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white text-xs font-medium cursor-pointer transition border border-white/5"
                  >
                    {isMutedInModal ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Muted</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Sound On</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Simple Chevron helpers to replace lucide arrows in the modal so we don't have dependency issues
const ChevronLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);
