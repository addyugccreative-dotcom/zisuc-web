const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf-8');

// Replace cart item layout
const oldItem = `                <div className="flex-1 flex flex-col justify-between h-full space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-heading italic text-xs sm:text-sm font-medium line-clamp-1">{item.product.title}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-200"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span className="text-[9px] text-gray-500 font-mono capitalize">{item.selectedColor.name}</span>
                      </div>
                    </div>
                    {/* Delete item click */}
                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-1 text-gray-400 hover:text-red-500 transition shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quantity adjustment drawer block */}
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center border rounded h-7 bg-white" style={{ borderColor: \`\${settings.colorText}22\` }}>
                      <button
                        onClick={() => onUpdateQty(idx, -1)}
                        className="px-2 text-stone-500 hover:text-stone-800 text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold font-mono">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(idx, 1)}
                        className="px-2 text-stone-500 hover:text-stone-800 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-xs font-mono font-semibold" style={{ color: settings.colorText }}>
                      {convertAndFormatPrice('$' + (parseUsdPrice(item.product.price) * item.quantity), activeCurrency)}
                    </span>
                  </div>
                </div>`;

const newItem = `                <div className="flex-1 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-sans font-bold text-base sm:text-[17px] text-stone-900 line-clamp-2">{item.product.title}</h4>
                    </div>
                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-1 text-gray-400 hover:text-red-500 transition shrink-0 mt-0.5"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-gray-200 rounded-full h-8 bg-white px-1">
                      <button
                        onClick={() => onUpdateQty(idx, -1)}
                        className="px-2.5 text-stone-500 hover:text-stone-800"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(idx, 1)}
                        className="px-2.5 text-stone-500 hover:text-stone-800"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      {isDiscountApplied ? (
                        <>
                          <span className="text-xs text-gray-400 line-through font-mono">
                            {convertAndFormatPrice('$' + (parseUsdPrice(item.product.price) * item.quantity), activeCurrency)}
                          </span>
                          <span className="text-[15px] font-bold text-[#00c4ba] font-mono">
                            {convertAndFormatPrice('$' + (parseUsdPrice(item.product.price) * item.quantity * 0.9), activeCurrency)}
                          </span>
                        </>
                      ) : (
                        <span className="text-[15px] font-bold text-[#00c4ba] font-mono">
                          {convertAndFormatPrice('$' + (parseUsdPrice(item.product.price) * item.quantity), activeCurrency)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>`;

code = code.replace(oldItem, newItem);

// Replace cart item container styling
code = code.replace(
  `className="flex gap-3 border-b pb-3 items-start animate-in fade-in duration-300"`,
  `className="flex gap-4 border-b pb-4 items-center animate-in fade-in duration-300"`
);

// Replace product image styling
code = code.replace(
  `className="w-12 h-12 sm:w-16 sm:h-16 aspect-square overflow-hidden bg-white border rounded shrink-0"`,
  `className="w-20 h-20 sm:w-24 sm:h-24 aspect-square overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0"`
);

fs.writeFileSync('src/components/CartDrawer.tsx', code);
