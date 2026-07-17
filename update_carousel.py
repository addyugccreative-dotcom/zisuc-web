import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace the whole desktop grid and mobile carousel section
# We'll just replace the desktop and mobile blocks with a single unified block
start_marker = "{/* Desktop view: 4 products staggered grid with luxury slow blur animations */}"
end_marker = "{/* SHOP BY INGREDIENTS BULLET CARDS (Image 2 - Left Aligned, Large Circles, Non-Selectable) */}"

new_carousel = """{/* Unified Carousel for Desktop and Mobile */}
              <div className="w-full relative mt-4 group/carousel">
                <div 
                  ref={carouselRef}
                  onScroll={handleCarouselScroll}
                  className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 scrollbar-none gap-0 sm:gap-4 md:gap-5"
                >
                  {(products.length > 0 ? products : mockProducts).map((product, idx) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        filter: "blur(0px)",
                        transition: {
                          duration: 1.4,
                          ease: [0.16, 1, 0.3, 1],
                          delay: (idx % 4) * 0.12 // Clean sequence stagger
                        }
                      }}
                      viewport={{ once: true, amount: 0.15 }}
                      className="w-full sm:w-1/2 lg:w-1/4 shrink-0 snap-center sm:snap-start px-4 sm:px-0"
                    >
                      <ProductCard
                        product={product}
                        colorText={settings.colorText}
                        colorAccent={settings.colorAccent}
                        colorButton={settings.colorButton}
                        colorButtonText={settings.colorButtonText}
                        onNavigate={(productId) => handleNavigate('product', productId)}
                        onQuickAdd={handleQuickAdd}
                        variant="minimal"
                        currentCurrency={currentCurrency}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Slider Arrow Controls and indicator progress line */}
                <div className="flex items-center justify-between gap-6 mt-4 px-4 sm:px-0 w-full">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => scrollCarousel('left')}
                      className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 bg-white hover:bg-stone-50 transition-all active:scale-95 shadow-xs cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <span className="text-sm font-bold">&larr;</span>
                    </button>
                    <button 
                      onClick={() => scrollCarousel('right')}
                      className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 bg-white hover:bg-stone-50 transition-all active:scale-95 shadow-xs cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <span className="text-sm font-bold">&rarr;</span>
                    </button>
                  </div>
                  
                  {/* Clean scale-proportionate progress line indicator */}
                  <div className="flex-1 max-w-xs h-[1.5px] bg-stone-200 relative overflow-hidden">
                    <div 
                      className="absolute top-0 bottom-0 left-0 bg-stone-900 transition-transform duration-300 ease-out"
                      style={{ 
                        width: `${100 / Math.max(1, displayProducts.length)}%`,
                        transform: `translateX(${scrollProgress * (displayProducts.length - 1) * 100}%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>
            
            """

import sys
s = content.find(start_marker)
e = content.find(end_marker)

if s == -1 or e == -1:
    print("Markers not found")
    sys.exit(1)

content = content[:s] + new_carousel + content[e:]

with open('src/App.tsx', 'w') as f:
    f.write(content)

