import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { Currency, convertAndFormatPrice } from '../lib/currency';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currentCurrency: Currency;
  onProductClick: (productId: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  products,
  currentCurrency,
  onProductClick,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter products based on search term
  const filteredProducts = query.trim() === '' 
    ? [] 
    : products.filter(product => {
        const term = query.toLowerCase();
        return (
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.tags.some(tag => tag.toLowerCase().includes(term)) ||
          product.vendor.toLowerCase().includes(term)
        );
      });

  // Popular quick searches
  const quickSearches = ['Serum', 'Retinol', 'Vitamin C', 'Cleanser', 'Essence', 'Lip'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="search-overlay-wrapper" className="fixed inset-0 z-50 flex flex-col justify-start">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/35 backdrop-blur-md cursor-pointer"
          />

          {/* Search container */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full bg-white border-b border-stone-200/60 shadow-xl px-6 py-8 sm:px-12 md:py-12 flex flex-col items-center z-10"
          >
            <div className="max-w-3xl w-full flex flex-col">
              {/* Close button inside top right container */}
              <div className="flex justify-end w-full mb-4">
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 rounded-full hover:bg-stone-50 text-stone-500 hover:text-stone-950 transition cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Main Search Input field */}
              <div className="relative flex items-center border-b-2 border-stone-900 py-3 mb-6">
                <Search className="w-6 h-6 text-stone-400 mr-4 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search our Clinical Formulas..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-hidden text-lg md:text-2xl font-serif text-stone-900 placeholder-stone-350 focus:ring-0"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Suggestions row if query is empty */}
              {query.trim() === '' && (
                <div className="text-left animate-fade-in">
                  <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-stone-400 mb-3">Popular Suggestions</p>
                  <div className="flex flex-wrap gap-2.5">
                    {quickSearches.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(term)}
                        className="px-4 py-1.5 rounded-full border border-stone-200 hover:border-stone-900 bg-stone-50/50 hover:bg-white text-xs text-stone-700 hover:text-stone-950 transition cursor-pointer font-mono"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results section */}
              {query.trim() !== '' && (
                <div className="text-left mt-2 max-h-[50vh] overflow-y-auto pr-1">
                  <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-stone-400 mb-4">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'Result' : 'Results'} Found
                  </p>

                  {filteredProducts.length > 0 ? (
                    <div className="flex flex-col divide-y divide-stone-100">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onProductClick(product.id);
                            onClose();
                          }}
                          className="flex items-center justify-between py-3.5 group cursor-pointer hover:bg-stone-50/40 rounded-lg px-2 -mx-2 transition"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-14 h-14 rounded-lg object-cover bg-[#FAF9F6] border border-stone-100 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="font-sans text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">
                                {product.vendor}
                              </p>
                              <p className="font-sans font-bold text-stone-950 text-sm leading-tight group-hover:text-[#BE2A59] transition">
                                {product.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="font-sans font-bold text-xs text-stone-800">
                                  {convertAndFormatPrice(product.price, currentCurrency)}
                                </p>
                                {product.compareAtPrice && (
                                  <p className="font-sans text-[11px] text-stone-400 line-through">
                                    {convertAndFormatPrice(product.compareAtPrice, currentCurrency)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="opacity-0 group-hover:opacity-100 transition translate-x-2 group-hover:translate-x-0 pr-2">
                            <ArrowRight className="w-4 h-4 text-[#BE2A59]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-stone-400">
                      <p className="font-serif italic text-lg mb-1">No products matched "{query}"</p>
                      <p className="text-xs font-sans">Please try searching for another ingredient or skincare concern.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
