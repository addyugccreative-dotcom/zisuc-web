import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Add state for activeReel
state_search = r"const \[reelCheckoutProduct, setReelCheckoutProduct\] = useState<Product \| null>\(null\);"
state_replace = """const [activeReel, setActiveReel] = useState<{ reel: typeof videoReels[0], product: Product } | null>(null);"""
content = re.sub(state_search, state_replace, content)

# 2. Update onClick handler for reel items
onClick_search = r"""onClick=\{\(\) => \{\s*if \(matchedProd\) \{\s*setReelCheckoutProduct\(matchedProd\);\s*\}\s*\}\}"""
onClick_replace = """onClick={() => {
                          if (matchedProd) {
                            setActiveReel({ reel, product: matchedProd });
                          }
                        }}"""
content = re.sub(onClick_search, onClick_replace, content)

# 3. Update the modal render
modal_search = r"\{\/\* NESTED DYNAMIC INLINE CHECKOUT MODAL BOX FOR REEL PRODUCT EXTRAS \*\/\}[\s\S]*?\{\/\* FLASH SALE TIMER BANNER AS SHOWN IN SCREENSHOTS \*\/\}"
modal_replace = """{/* FULLSCREEN REEL MODAL */}
            <AnimatePresence>
              {activeReel && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black z-[150] flex flex-col"
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setActiveReel(null)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center bg-black/40 text-white backdrop-blur-md z-[160] hover:bg-black/60 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Video Container */}
                  <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                    <video
                      src={activeReel.reel.video}
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full sm:w-auto sm:max-w-[400px] object-cover"
                    />
                    {/* User info overlay */}
                    <div className="absolute top-4 left-4 sm:left-[calc(50%-200px+16px)] flex items-center gap-2 text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm font-semibold tracking-wide">{activeReel.reel.name}</span>
                    </div>
                  </div>

                  {/* Bottom Product Strip */}
                  <div className="bg-white p-4 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-[160] sm:absolute sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md sm:rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-md bg-stone-50 border border-stone-100 flex-shrink-0 p-1 flex items-center justify-center">
                        <img 
                          src={activeReel.product.images[0]} 
                          alt={activeReel.product.title}
                          className="w-full h-full object-contain mix-blend-multiply"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest block truncate">{activeReel.product.vendor}</span>
                        <h4 className="font-heading italic text-sm sm:text-base font-bold text-[#2D2926] truncate">{activeReel.product.title}</h4>
                        <p className="text-xs font-bold font-mono text-stone-900 mt-0.5">{convertAndFormatPrice(activeReel.product.price, currentCurrency)}</p>
                      </div>
                      <button 
                        onClick={() => {
                          handleAddToCart(activeReel.product, 1, 0);
                          setActiveReel(null);
                        }}
                        className="h-10 px-4 bg-stone-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition shadow-md flex items-center gap-2 flex-shrink-0"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span className="hidden xs:inline">Add</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FLASH SALE TIMER BANNER AS SHOWN IN SCREENSHOTS */}"""
content = re.sub(modal_search, modal_replace, content)

# 4. We also need to update the shopping cart button in the video strip to avoid it overriding setReelCheckoutProduct
cart_btn_search = r"""onClick=\{\(e\) => \{\s*e\.stopPropagation\(\);\s*if \(matchedProd\) \{\s*setReelCheckoutProduct\(matchedProd\);\s*\}\s*\}\}"""
cart_btn_replace = """onClick={(e) => {
                              e.stopPropagation();
                              if (matchedProd) {
                                handleAddToCart(matchedProd, 1, 0);
                              }
                            }}"""
content = re.sub(cart_btn_search, cart_btn_replace, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
