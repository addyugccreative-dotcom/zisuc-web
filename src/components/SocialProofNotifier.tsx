import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

export function SocialProofNotifier({ 
  activePage, 
  activeProduct, 
  products 
}: { 
  activePage: string;
  activeProduct: Product | null;
  products: Product[];
}) {
  const [notification, setNotification] = useState<{
    visible: boolean;
    product: Product | null;
    buyer: string;
    location: string;
    timeAgo: string;
  } | null>(null);

  // Stats
  const [hasScrolledDeepOnProduct, setHasScrolledDeepOnProduct] = useState(false);
  const [shownExactProductIds, setShownExactProductIds] = useState<Set<string>>(new Set());
  
  // Track explored products
  const [exploredProductIds, setExploredProductIds] = useState<Set<string>>(new Set());
  
  const [homeNotifCount, setHomeNotifCount] = useState(0);

  // Watch for page changes
  useEffect(() => {
    if (activePage === 'product' && activeProduct) {
      setExploredProductIds(prev => new Set(prev).add(activeProduct.id));
      setHasScrolledDeepOnProduct(false); // reset scroll tracker for new product view
    }
  }, [activePage, activeProduct]);

  // Handle scroll logic
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (activePage === 'product' && activeProduct) {
            if (currentScrollY > 1200) {
              setHasScrolledDeepOnProduct(true);
            } else if (currentScrollY < 600 && hasScrolledDeepOnProduct) {
              // Came back up near the top!
              if (!shownExactProductIds.has(activeProduct.id) && (!notification || !notification.visible)) {
                // Show exact product notification 1 time only for this product
                setShownExactProductIds(prev => new Set(prev).add(activeProduct.id));
                setHasScrolledDeepOnProduct(false); // Reset to prevent multiple triggers if they didn't scroll deep again
                
                // Dispatch a custom event to notify ProductMain to reduce quantity
                window.dispatchEvent(new CustomEvent('zisu-reduce-stock', { detail: { productId: activeProduct.id } }));

                setNotification({
                  visible: true,
                  product: activeProduct,
                  buyer: ["Tina", "Sarah", "Jessica", "Emma", "Olivia"][Math.floor(Math.random() * 5)],
                  location: ["USA", "UK", "Canada", "Australia"][Math.floor(Math.random() * 4)],
                  timeAgo: "just now"
                });
              }
            }
          }
          
          if (activePage === 'home') {
            // Home page logic
            // "only show these notification if some one explore more product then follow same pattern but not show to much notifcation show 6 notifcaition but with when they explore more then 3 product only"
            if (exploredProductIds.size >= 3 && homeNotifCount < 6 && currentScrollY > 1000) {
              // If we scroll deep enough on home
              // show random product then a bit later show recently explored product
              // Let's implement a simplified version of this:
              // trigger random home notification if none is active
              if ((!notification || !notification.visible) && products.length > 0) {
                 const now = Date.now();
                 // Only show if at least 15 seconds have passed since the last notification check
                 if (!(window as any)._lastNotifTime || (now - (window as any)._lastNotifTime > 15000)) {
                   (window as any)._lastNotifTime = now;
                   const randomChance = Math.random();
                   // 20% chance to trigger when crossing the 15s debounce threshold
                   if (randomChance < 0.2) {
                      setHomeNotifCount(prev => prev + 1);
                      const otherProducts = products.filter(p => !exploredProductIds.has(p.id));
                      const randomProduct = otherProducts.length > 0 ? otherProducts[Math.floor(Math.random() * otherProducts.length)] : products[Math.floor(Math.random() * products.length)];
                      
                      setNotification({
                        visible: true,
                        product: randomProduct,
                        buyer: ["Michael", "David", "James", "John", "Robert", "William"][Math.floor(Math.random() * 6)],
                        location: ["USA", "UK", "Canada", "Australia", "New Zealand"][Math.floor(Math.random() * 5)],
                        timeAgo: `${Math.floor(Math.random() * 5) + 1} min ago`
                      });

                      // Queue up the recently explored product notification after 30 seconds
                      if (activeProduct) {
                        setTimeout(() => {
                          setHomeNotifCount(prev => prev + 1);
                          setNotification({
                            visible: true,
                            product: activeProduct,
                            buyer: ["Sophia", "Isabella", "Mia", "Charlotte", "Amelia"][Math.floor(Math.random() * 5)],
                            location: ["USA", "UK", "Canada", "Australia"][Math.floor(Math.random() * 4)],
                            timeAgo: "just now"
                          });
                        }, 30000);
                      }
                   }
                 }
              }
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage, activeProduct, hasScrolledDeepOnProduct, shownExactProductIds, notification, exploredProductIds.size, homeNotifCount, products]);

  // Auto hide notification
  useEffect(() => {
    if (notification?.visible) {
      const timer = setTimeout(() => {
        setNotification(prev => prev ? { ...prev, visible: false } : null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification?.visible]);

  return (
    <AnimatePresence>
      {notification?.visible && notification.product && (
        <motion.div
          initial={{ opacity: 0, y: '0%', x: '-50%' }}
          animate={{ opacity: 1, y: '-50%', x: '-50%' }}
          exit={{ opacity: 0, y: '-100%', x: '-50%' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 z-[100] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-stone-100 p-3 sm:p-4 w-[90%] max-w-sm pointer-events-auto"
        >
          <div className="flex items-center gap-3 sm:gap-4 relative pr-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-stone-50 border border-stone-100 rounded-md overflow-hidden flex items-center justify-center">
              <SafeImage src={notification.product.images[0]} alt={notification.product.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                {notification.buyer} from {notification.location} just bought this!
              </p>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 truncate">
                {notification.product.title}
              </p>
              <p className="text-[9px] sm:text-[10px] text-stone-400 mt-1 font-medium tracking-wide uppercase">
                {notification.timeAgo}
              </p>
            </div>
            <button 
              onClick={() => setNotification(prev => prev ? {...prev, visible: false} : null)} 
              className="absolute top-0 right-0 p-1 text-stone-300 hover:text-stone-600 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
