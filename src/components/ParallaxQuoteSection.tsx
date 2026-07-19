import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TextReveal = () => {
  const text = "\"Smooth Glide, Intense Color, And A Luminous Finish That Stays Flawless All Day.\"";
  const words = text.split(" ");
  
  return (
    <h2 className="text-[32px] leading-[1.3] md:text-[42px] lg:text-[54px] font-heading italic font-light tracking-tight text-center max-w-5xl px-4 md:px-8 mx-auto z-20 relative">
      {words.map((word, i) => {
        return (
          <React.Fragment key={i}>
            <motion.span 
              initial={{ color: "#e5e7eb" }}
              whileInView={{ color: "#1a1a1a" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="inline-block"
            >
              {word}
            </motion.span>
            {i < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </h2>
  );
};

const ParallaxImage = ({ 
  src, 
  alt, 
  className, 
  progress, 
  yOffset = 100,
  isCircle = false
}: { 
  src: string, 
  alt: string, 
  className: string, 
  progress: any,
  yOffset?: number,
  isCircle?: boolean
}) => {
  // Move upwards as we scroll
  const y = useTransform(progress, [0, 1], [yOffset, -yOffset]);
  
  return (
    <motion.div 
      style={{ y }}
      className={`absolute z-10 pointer-events-none ${className}`}
    >
      <img 
        src={src}
        alt={alt}
        className={`w-full h-auto drop-shadow-sm ${isCircle ? 'rounded-full aspect-square object-cover' : 'object-contain'}`}
      />
    </motion.div>
  );
};

const ParallaxQuoteSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[300vh] bg-[#FAFAFA]"
    >
      {/* Sticky Text Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Central Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-4xl px-6 sm:px-8 mx-auto space-y-8 sm:space-y-12">
          
          <TextReveal />
          
          <div className="relative flex flex-col items-center justify-center space-y-4 w-full">
            {/* Signature Auto-fill */}
            <motion.div 
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              className="w-48 md:w-64 flex justify-center py-4 relative z-20"
            >
              <h3 className="font-heading italic text-4xl md:text-5xl text-stone-900 tracking-wide">
                Zisu'c
              </h3>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Floating Images mapped to absolute positions in the 300vh container */}
      
      {/* Pair 1 - Near Top (below heading initially) */}
      <ParallaxImage 
        src="/Smooth Glide section image frame 1.png"
        alt="Image 1"
        progress={scrollYProgress}
        yOffset={150}
        isCircle={true}
        className="top-[22%] left-[5%] md:left-[15%] w-28 md:w-48 rotate-[-15deg]"
      />
      <ParallaxImage 
        src="/Smooth Glide section image frame 2.png"
        alt="Image 2"
        progress={scrollYProgress}
        yOffset={120}
        isCircle={true}
        className="top-[25%] right-[5%] md:right-[15%] w-28 md:w-48 rotate-[10deg]"
      />

      {/* Pair 2 - Upper Middle */}
      <ParallaxImage 
        src="/Smooth Glide section image frame 3.png"
        alt="Image 3"
        progress={scrollYProgress}
        yOffset={180}
        className="top-[40%] left-[8%] md:left-[12%] w-28 md:w-48 rotate-[-5deg]"
      />
      <ParallaxImage 
        src="/Smooth Glide section image frame 4.png"
        alt="Image 4"
        progress={scrollYProgress}
        yOffset={140}
        className="top-[48%] right-[10%] md:right-[20%] w-28 md:w-44 rotate-[15deg]"
      />

      {/* Pair 3 - Lower Middle */}
      <ParallaxImage 
        src="/Smooth Glide section image frame 5.png"
        alt="Image 5"
        progress={scrollYProgress}
        yOffset={160}
        className="top-[60%] left-[10%] md:left-[18%] w-28 md:w-44 rotate-[-10deg]"
      />
      <ParallaxImage 
        src="/Smooth Glide section image frame 6.png"
        alt="Image 6"
        progress={scrollYProgress}
        yOffset={200}
        className="top-[70%] right-[8%] md:right-[15%] w-32 md:w-56 rotate-[5deg]"
      />

      {/* Pair 4 - Near Bottom */}
      <ParallaxImage 
        src="/Smooth Glide section image frame 7.png"
        alt="Image 7"
        progress={scrollYProgress}
        yOffset={130}
        className="top-[82%] left-[15%] md:left-[25%] w-28 md:w-48 rotate-[-10deg]"
      />
      <ParallaxImage 
        src="/Smooth Glide section image frame 8.png"
        alt="Image 8"
        progress={scrollYProgress}
        yOffset={170}
        className="top-[90%] right-[12%] md:right-[22%] w-28 md:w-48 rotate-[10deg]"
      />

    </section>
  );
};

export default ParallaxQuoteSection;
