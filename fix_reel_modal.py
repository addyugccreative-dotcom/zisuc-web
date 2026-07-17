import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

modal_search = r"""\{\/\* FULLSCREEN REEL MODAL \*\/\}[\s\S]*?\{\/\* FLASH SALE TIMER BANNER AS SHOWN IN SCREENSHOTS \*\/\}"""

modal_replace = """{/* FULLSCREEN REEL MODAL */}
            <AnimatePresence>
              {activeReel && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black z-[150] flex flex-col items-center justify-center"
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setActiveReel(null)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center bg-black/40 text-white backdrop-blur-md z-[170] hover:bg-black/60 transition shadow-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Video */}
                  <video
                    src={activeReel.reel.video}
                    autoPlay
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover sm:w-auto sm:max-w-[420px] sm:relative sm:h-full sm:mx-auto"
                  />
                  
                  {/* Scrim for text readability on mobile */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none sm:hidden" />

                  {/* Overlay content container */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none sm:relative sm:inset-auto sm:absolute sm:inset-0 sm:max-w-[420px] sm:mx-auto">
                    {/* Top: User info overlay */}
                    <div className="p-4 sm:p-6 mt-2 sm:mt-0 pointer-events-auto flex justify-start">
                      <div className="inline-flex items-center gap-2 text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                        <Instagram className="w-4 h-4" />
                        <span className="text-sm font-semibold tracking-wide">{activeReel.reel.name}</span>
                      </div>
                    </div>
                    
                    {/* Bottom: Product Strip */}
                    <div className="p-4 sm:p-6 pointer-events-auto">
                      <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-stone-50 border border-stone-100 flex-shrink-0 p-1 flex items-center justify-center">
                          <img 
                            src={activeReel.product.images[0]} 
                            alt={activeReel.product.title}
                            className="w-full h-full object-contain mix-blend-multiply"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-mono opacity-60 uppercase tracking-widest block truncate text-stone-600">{activeReel.product.vendor}</span>
                          <h4 className="font-heading italic text-sm sm:text-base font-bold text-[#2D2926] truncate">{activeReel.product.title}</h4>
                          <p className="text-xs font-bold font-mono text-stone-900 mt-0.5">{convertAndFormatPrice(activeReel.product.price, currentCurrency)}</p>
                        </div>
                        <button 
                          onClick={() => {
                            handleAddToCart(activeReel.product, 1, 0);
                            setActiveReel(null);
                          }}
                          className="h-9 sm:h-10 px-3 sm:px-4 bg-stone-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition shadow-md flex items-center gap-2 flex-shrink-0 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span className="hidden xs:inline">Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FLASH SALE TIMER BANNER AS SHOWN IN SCREENSHOTS */}"""

content = re.sub(modal_search, modal_replace, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)

