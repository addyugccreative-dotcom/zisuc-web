import re

with open('src/components/FeaturesCollection.tsx', 'r') as f:
    content = f.read()

buttons_search = r"""<button\s*onClick=\{\(e\) => \{ e\.stopPropagation\(\); triggerQuickView\(item, currentSelectedColorIdx\); \}\}\s*onMouseEnter=\{\(\) => setHoveredAction\(\{ productId: item\.id, action: 'view' \}\)\}\s*onMouseLeave=\{\(\) => setHoveredAction\(\{ productId: item\.id, action: null \}\)\}\s*className="[^"]*"\s*aria-label="Quick view"\s*>\s*<Eye className="w-4 h-4" />\s*</button>\s*<button\s*onClick=\{\(e\) => \{ e\.stopPropagation\(\); onAddToCart\?\.unwrap\?\.\(\)\? \.\.\. \}\}\s*onMouseEnter=\{\(\) => setHoveredAction\(\{ productId: item\.id, action: 'cart' \}\)\}\s*onMouseLeave=\{\(\) => setHoveredAction\(\{ productId: item\.id, action: null \}\)\}\s*className="[^"]*"\s*aria-label="Add to cart"\s*>\s*<ShoppingCart className="w-4 h-4" />\s*</button>"""

# Actually, exact matching using standard string replacement will be safer.

replace_from = """                  <div className="absolute right-3 bottom-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                    <button 
                      onClick={(e) => { e.stopPropagation(); triggerQuickView(item, currentSelectedColorIdx); }}
                      onMouseEnter={() => setHoveredAction({ productId: item.id, action: 'view' })}
                      onMouseLeave={() => setHoveredAction({ productId: item.id, action: null })}
                      className="w-9 h-9 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 flex items-center justify-center shadow-md transition hover:scale-105 cursor-pointer"
                      aria-label="Quick view"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart?.(item, 1, currentSelectedColorIdx); }}
                      onMouseEnter={() => setHoveredAction({ productId: item.id, action: 'cart' })}
                      onMouseLeave={() => setHoveredAction({ productId: item.id, action: null })}
                      className="w-9 h-9 rounded-full bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center shadow-md transition hover:scale-105 cursor-pointer"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>"""

replace_to = """                  <div className="absolute right-3 bottom-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20 delay-100">
                    <button 
                      onClick={(e) => { e.stopPropagation(); triggerQuickView(item, currentSelectedColorIdx); }}
                      onMouseEnter={() => setHoveredAction({ productId: item.id, action: 'view' })}
                      onMouseLeave={() => setHoveredAction({ productId: item.id, action: null })}
                      className="relative w-9 h-9 rounded-full bg-white border border-stone-200 text-stone-600 flex items-center justify-center shadow-md overflow-hidden group/btn cursor-pointer"
                      aria-label="Quick view"
                    >
                      <div className="absolute inset-0 bg-stone-100 translate-y-[102%] group-hover/btn:translate-y-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <Eye className="w-4 h-4 relative z-10 transition-transform duration-[350ms] ease-out group-hover/btn:-translate-y-[1px]" />
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart?.(item, 1, currentSelectedColorIdx); }}
                      onMouseEnter={() => setHoveredAction({ productId: item.id, action: 'cart' })}
                      onMouseLeave={() => setHoveredAction({ productId: item.id, action: null })}
                      className="relative w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-md overflow-hidden group/btn cursor-pointer"
                      aria-label="Add to cart"
                    >
                      <div className="absolute inset-0 bg-stone-800 translate-y-[102%] group-hover/btn:translate-y-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <ShoppingCart className="w-4 h-4 relative z-10 transition-transform duration-[350ms] ease-out group-hover/btn:-translate-y-[1px]" />
                    </button>
                  </div>"""

if replace_from in content:
    content = content.replace(replace_from, replace_to)
    with open('src/components/FeaturesCollection.tsx', 'w') as f:
        f.write(content)
    print("Successfully replaced.")
else:
    print("Could not find the exact string.")
