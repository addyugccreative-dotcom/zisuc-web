import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Loader2, Check, Truck, Gift, Box, ShieldCheck } from 'lucide-react';
import { CartItem, CustomizerSettings, Product } from '../types';
import { LuxuryButton } from './LuxuryButton';
import { Currency, convertAndFormatPrice, parseUsdPrice, SUPPORTED_CURRENCIES } from '../lib/currency';
import { createShopifyCheckout } from '../lib/shopify';
import { mockProducts } from '../products-data';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  settings: CustomizerSettings;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQty: (idx: number, qtyChange: number) => void;
  onRemoveItem: (idx: number) => void;
  currentCurrency?: Currency;
  onAddToCart?: (product: any, quantity: number, colorIdx: number) => void;
  products?: Product[];
  onProductClick?: (id: string) => void;
  isDiscountApplied?: boolean;
  onApplyDiscount?: (code: string) => boolean;
  onRemoveDiscount?: () => void;
  appliedCode?: string;
}

const TIERS = [
  { 
    threshold: 150, 
    label: "Free Shipping", 
    shortLabel: "Free Shipping", 
    icon: Truck, 
    toastLabel: "🎉 You've unlocked Free Global Shipping!" 
  },
  { 
    threshold: 182, 
    label: "Cosmetic Bag", 
    shortLabel: "Cosmetic Bag", 
    icon: ShoppingBag, 
    toastLabel: "🎉 You've unlocked a Free Cosmetic Bag!" 
  },
  { 
    threshold: 232, 
    label: "Gift Box", 
    shortLabel: "Gift Box", 
    icon: Gift, 
    toastLabel: "🎉 You've unlocked a Free Gift Box!" 
  }
];

const getPositionPercent = (idx: number) => {
  if (idx === 0) return 30;
  if (idx === 1) return 60;
  return 90;
};

const getProgressPercent = (val: number) => {
  if (val <= 0) return 0;
  if (val <= 150) {
    return (val / 150) * 30;
  }
  if (val <= 182) {
    return 30 + ((val - 150) / (182 - 150)) * 30;
  }
  if (val <= 232) {
    return 60 + ((val - 182) / (232 - 182)) * 30;
  }
  return Math.min(90 + ((val - 232) / 100) * 10, 100);
};

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  settings,
  cartItems,
  onClose,
  onUpdateQty,
  onRemoveItem,
  currentCurrency,
  onAddToCart,
  products,
  onProductClick,
  isDiscountApplied = false,
  onApplyDiscount,
  onRemoveDiscount,
  appliedCode = '',
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [discountInput, setDiscountInput] = useState(appliedCode);
  const [discountError, setDiscountError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (isDiscountApplied) {
      setDiscountInput(appliedCode);
    } else {
      setDiscountInput('');
    }
  }, [isDiscountApplied, appliedCode]);

  const handleLocalApply = () => {
    if (!onApplyDiscount) return;
    const cleanCode = discountInput.trim().toUpperCase();
    if (!cleanCode) return;
    
    const success = onApplyDiscount(cleanCode);
    if (success) {
      setDiscountError('');
    } else {
      setDiscountError('Invalid code. Try using ZISUC10.');
    }
  };

  const activeCurrency = currentCurrency || SUPPORTED_CURRENCIES[0];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseUsdPrice(item.product.price) * item.quantity,
    0
  );

  const maxThreshold = TIERS[TIERS.length - 1].threshold;
  const progressPercent = getProgressPercent(subtotal);
  const nextTier = TIERS.find(t => subtotal < t.threshold);

  const celebratedTiers = useRef(new Set<number>());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    TIERS.forEach((tier, index) => {
      if (subtotal >= tier.threshold) {
        if (!celebratedTiers.current.has(index)) {
          celebratedTiers.current.add(index);
          
          setToastMessage(tier.toastLabel);
          setTimeout(() => setToastMessage(null), 4000);

          const duration = 4 * 1000;
          const animationEnd = Date.now() + duration;
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000, colors: ['#00c4ba', '#FFD700', '#FFC0CB'] };

          const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

          const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
              return clearInterval(interval);
            }

            const particleCount = 20 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
          }, 250);
        }
      } else {
        if (celebratedTiers.current.has(index)) {
          celebratedTiers.current.delete(index);
        }
      }
    });
  }, [subtotal]);

  const availableProducts = (products && products.length > 0) ? products : mockProducts;
  const upsellProducts = availableProducts.filter(p => !cartItems.some(ci => ci.product.id === p.id)).slice(0, 2);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      setCheckoutError(null);
      const url = await createShopifyCheckout(cartItems);
      window.location.href = url;
    } catch (err: any) {
      setCheckoutError(err.message || 'Failed to start checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[150] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Cart Drawer Panel Container */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 max-w-full z-[160] flex flex-col shadow-lg transition-transform duration-300 transform select-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: '#ffffff',
          color: '#1c1917',
        }}
      >
        {toastMessage && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] z-50 bg-white shadow-md border rounded-lg p-3 text-center animate-in slide-in-from-top-4 fade-in duration-300" style={{ borderColor: `${settings.colorText}1a` }}>
            <span className="text-xs font-bold text-teal-700">{toastMessage}</span>
          </div>
        )}
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-sans font-bold text-3xl text-stone-900">Cart</h2>
          <button onClick={onClose} aria-label="Close Shopping Bag" className="text-gray-400 hover:text-stone-900 transition">
            <X className="w-8 h-8 stroke-[1.5]" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 pt-4 pb-2 flex flex-col text-center">
          <span className="text-[13px] font-medium text-center mb-1.5">
            {!nextTier ? (
              <span className="text-teal-600 font-bold text-sm">🎉 You have unlocked all rewards!</span>
            ) : (
              <span className="text-[13px] font-bold">You're {convertAndFormatPrice('$' + (nextTier.threshold - subtotal).toFixed(2), activeCurrency)} away from {nextTier.label.toUpperCase()}!</span>
            )}
          </span>
          
          <div className="relative w-[96%] mx-auto h-2 bg-neutral-200 rounded-full mt-5 mb-4">
            {/* Striped progress bar effect */}
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 z-10 overflow-hidden"
              style={{
                backgroundColor: '#00c4ba',
                width: `${progressPercent}%`,
              }}
            >
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
                backgroundSize: '1rem 1rem'
              }}></div>
            </div>
            {TIERS.map((tier, idx) => {
              const isUnlocked = subtotal >= tier.threshold;
              const leftPercent = getPositionPercent(idx);
              const Icon = tier.icon;
              return (
                <div key={idx} className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center" style={{ left: `${leftPercent}%`, transform: `translate(-50%, -50%)` }}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white transition-colors duration-300 ${isUnlocked ? 'border-[#00c4ba] text-[#00c4ba]' : 'border-neutral-300 text-neutral-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`absolute top-10 text-[10px] leading-tight text-center transition-colors font-medium whitespace-nowrap ${isUnlocked ? 'text-[#00c4ba]' : 'text-gray-500'}`}>
                    {tier.shortLabel}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-6"></div>
        </div>

        {/* Dynamic scroll list body */}
        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-4xl">🌸</span>
              <p className="font-heading italic text-sm mt-3 opacity-60">Your shopping bag is completely empty.</p>
              <button 
                onClick={onClose}
                className="mt-6 text-xs uppercase tracking-widest font-semibold font-subheading underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item, idx) => (
                <div
                key={idx}
                className="flex gap-4 border-b pb-4 items-center animate-in fade-in duration-300"
                style={{ borderColor: `${settings.colorText}15` }}
              >
                {/* Product cover */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 aspect-square overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
                  <img decoding="async" loading="lazy" src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>

                {/* Text specifics */}
                <div className="flex-1 flex flex-col justify-between h-full">
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
                            {convertAndFormatPrice('$' + (parseUsdPrice(item.product.price) * item.quantity).toFixed(2), activeCurrency)}
                          </span>
                          <span className="text-[15px] font-bold text-[#00c4ba] font-mono">
                            {convertAndFormatPrice('$' + (parseUsdPrice(item.product.price) * item.quantity * 0.9).toFixed(2), activeCurrency)}
                          </span>
                        </>
                      ) : (
                        <span className="text-[15px] font-bold text-[#00c4ba] font-mono">
                          {convertAndFormatPrice('$' + (parseUsdPrice(item.product.price) * item.quantity).toFixed(2), activeCurrency)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Shipping Protection inside the cart list, below items */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Box className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                <span className="text-sm font-semibold text-stone-900">Shipping Protection</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#00c4ba] font-bold text-sm">{convertAndFormatPrice('$2.55', activeCurrency)}</span>
                <div className="w-5 h-5 rounded flex items-center justify-center bg-[#00c4ba] text-white">
                  <Check className="w-4 h-4" />
                </div>
              </div>
            </div>

            {upsellProducts.length > 0 && (
              <div className="mt-6">
                <h3 className="font-sans font-extrabold text-[11px] tracking-widest text-stone-900 uppercase mb-4 border-t pt-4">
                  CONTINUE SHOPPING
                </h3>
                
                <div className="space-y-4">
                  {upsellProducts.map((prod) => (
                    <div key={prod.id} className="flex gap-4 items-center bg-white transition" style={{ borderColor: `${settings.colorText}0d` }}>
                      <div 
                        className="w-14 h-14 aspect-square overflow-hidden bg-white shrink-0 cursor-pointer" 
                        onClick={() => onProductClick && onProductClick(prod.id)}
                      >
                        <img loading="lazy" src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 cursor-pointer" onClick={() => onProductClick && onProductClick(prod.id)}>
                        <h5 className="font-sans font-bold text-sm line-clamp-2 mb-1">{prod.title}</h5>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[13px] font-bold text-[#00c4ba] font-mono">
                          {convertAndFormatPrice(prod.price, activeCurrency)}
                        </span>
                        <button 
                          onClick={() => {
                            if (onAddToCart) onAddToCart(prod, 1, 0);
                          }}
                          className="relative overflow-hidden h-7 px-4 text-xs font-bold tracking-wide rounded-full transition flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 bg-[#00c4ba] text-white"
                        >
                          <span className="relative z-10">ADD</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </>
          )}
        </div>

        {/* Footer info panels */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white flex flex-col shrink-0">
            {/* Savings & Subtotal */}
            {isDiscountApplied && (
              <div className="flex justify-between items-center text-sm font-bold mb-2">
                <span>Savings</span>
                <span>- {convertAndFormatPrice('$' + (subtotal * 0.1).toFixed(2), activeCurrency)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-xl font-bold mb-4">
              <span>Subtotal</span>
              <span className="font-mono">{convertAndFormatPrice('$' + (subtotal - (isDiscountApplied ? subtotal * 0.1 : 0) + 2.55).toFixed(2), activeCurrency)}</span>
            </div>

            <LuxuryButton
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut || !agreedToTerms}
              showShine={true}
              className="w-full py-3.5 text-base font-bold uppercase tracking-wide flex items-center justify-center gap-2 rounded-full"
              style={{
                backgroundColor: '#00c4ba',
                color: 'white',
                opacity: (isCheckingOut || !agreedToTerms) ? 0.7 : 1,
                cursor: (isCheckingOut || !agreedToTerms) ? 'not-allowed' : 'pointer'
              }}
              label={isCheckingOut ? "Processing..." : "CHECK OUT"}
            />

            <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-[#00c4ba] focus:ring-[#00c4ba]"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <span className="text-xs text-stone-600">I agree to the terms & conditions.</span>
            </label>
            
            {/* Payment Icons */}
            <div className="mt-4 flex justify-center">
              <img 
                src="/payment gateway image.png" 
                alt="Secure Payment Gateways" 
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
