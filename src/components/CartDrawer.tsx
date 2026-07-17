import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Loader2, Check } from 'lucide-react';
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
    icon: "🚚", 
    toastLabel: "🎉 You've unlocked Free Global Shipping!" 
  },
  { 
    threshold: 182, 
    label: "Mystery Gift", 
    shortLabel: "Mystery Gift 🎁", 
    icon: "🎁", 
    toastLabel: "🎉 You've unlocked a Free Travel-Size Cica Cream!" 
  },
  { 
    threshold: 232, 
    label: "Surprise Unlock", 
    shortLabel: "Surprise Unlock ✨", 
    icon: "✨", 
    toastLabel: "🎉 You've unlocked a Free Skin Routine Guide + Priority!" 
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

  // Sync external discount application
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
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000, colors: ['#00C4BA', '#FFD700', '#FFC0CB'] };

          const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

          const interval: any = setInterval(function() {
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
        className={`fixed inset-y-0 right-0 w-full sm:w-96 max-w-full z-[160] flex flex-col shadow-2xl transition-transform duration-300 transform select-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: settings.colorBg,
          color: settings.colorText,
        }}
      >
        {toastMessage && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] z-50 bg-white shadow-xl border rounded-lg p-3 text-center animate-in slide-in-from-top-4 fade-in duration-300" style={{ borderColor: `${settings.colorText}1a` }}>
            <span className="text-xs font-bold text-teal-700">{toastMessage}</span>
          </div>
        )}
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: `${settings.colorText}1a` }}>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 opacity-75" />
            <span className="font-heading italic text-lg font-medium">Your Bag</span>
          </div>
          <button onClick={onClose} aria-label="Close Shopping Bag">
            <X className="w-5 h-5 hover:opacity-75" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="border-b px-4 py-2.5 flex flex-col pb-3" style={{ backgroundColor: `${settings.colorAccent}33`, borderColor: `${settings.colorText}11` }}>
          <span className="text-[10px] sm:text-[11px] font-medium text-center mb-1.5">
            {!nextTier ? (
              <span className="text-emerald-700 font-bold">🎉 Congratulations! You have unlocked all rewards!</span>
            ) : (
              <span>Spend <span className="font-bold font-mono text-teal-700">{convertAndFormatPrice('$' + (nextTier.threshold - subtotal), activeCurrency)}</span> more to unlock <span className="font-bold">{nextTier.label}</span> {nextTier.icon}</span>
            )}
          </span>
          <div className="relative w-full h-1 bg-neutral-200 rounded-full mt-1 mb-1">
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 z-10"
              style={{
                backgroundColor: settings.colorButton,
                width: `${progressPercent}%`,
              }}
            />
            {TIERS.map((tier, idx) => {
              const isUnlocked = subtotal >= tier.threshold;
              const leftPercent = getPositionPercent(idx);
              return (
                <div key={idx} className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center" style={{ left: `${leftPercent}%`, transform: `translate(-50%, -50%)` }}>
                  <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center bg-white transition-colors duration-300 ${isUnlocked ? 'border-teal-500' : 'border-neutral-300'}`}>
                    {isUnlocked && <Check className="w-2 h-2 text-teal-600" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative w-full h-4 mt-1.5">
            {TIERS.map((tier, idx) => {
              const isUnlocked = subtotal >= tier.threshold;
              const leftPercent = getPositionPercent(idx);
              return (
                <div key={idx} className="absolute top-0 flex justify-center w-20 sm:w-22 px-1" style={{ left: `${leftPercent}%`, transform: `translateX(-50%)` }}>
                  <span className={`text-[8px] sm:text-[9px] leading-tight text-center transition-colors font-semibold whitespace-normal break-words ${isUnlocked ? 'text-teal-700 font-bold' : 'text-gray-400'}`}>
                    {tier.shortLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic scroll list body */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
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
                className="flex gap-3 border-b pb-3 items-start animate-in fade-in duration-300"
                style={{ borderColor: `${settings.colorText}15` }}
              >
                {/* Product cover */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 aspect-square overflow-hidden bg-white border rounded shrink-0" style={{ borderColor: `${settings.colorText}0d` }}>
                  <img decoding="async" loading="lazy" src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>

                {/* Text specifics */}
                <div className="flex-1 flex flex-col justify-between h-full space-y-1.5">
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
                    <div className="flex items-center border rounded h-7 bg-white" style={{ borderColor: `${settings.colorText}22` }}>
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
                </div>
              </div>
            ))}
            
            {upsellProducts.length > 0 && (
              <div className="mt-8 pt-6 border-t" style={{ borderColor: `${settings.colorText}15` }}>
                <h4 className="font-heading italic text-sm mb-4 font-semibold uppercase tracking-widest text-center">Complete Your Routine</h4>
                <div className="space-y-4">
                  {upsellProducts.map((prod) => (
                    <div key={prod.id} className="flex gap-4 items-center border p-3 rounded bg-white/50 transition hover:bg-white" style={{ borderColor: `${settings.colorText}0d` }}>
                      <div 
                        className="w-14 h-14 aspect-square overflow-hidden bg-white border rounded shrink-0 cursor-pointer" 
                        style={{ borderColor: `${settings.colorText}0d` }}
                        onClick={() => onProductClick && onProductClick(prod.id)}
                      >
                        <img loading="lazy" src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 cursor-pointer" onClick={() => onProductClick && onProductClick(prod.id)}>
                        <h5 className="font-heading italic text-xs font-medium line-clamp-1 mb-1 hover:underline">{prod.title}</h5>
                        <span className="text-[10px] font-mono opacity-70">
                          {convertAndFormatPrice(prod.price, activeCurrency)}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          if (onAddToCart) onAddToCart(prod, 1, 0);
                        }}
                        className="relative overflow-hidden h-8 px-4 text-[10px] uppercase font-bold tracking-wider rounded transition flex items-center justify-center shrink-0 shadow-sm hover:scale-105 active:scale-95"
                        style={{ backgroundColor: settings.colorButton, color: settings.colorButtonText }}
                      >
                        <span className="relative z-10">Add</span>
                        <div className="animate-button-shine" />
                      </button>
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
          <div className="border-t p-4 bg-white/40 flex flex-col shrink-0" style={{ borderColor: `${settings.colorText}1a` }}>
            <div className="flex items-center justify-center bg-orange-50 text-orange-800 text-[10px] font-medium py-1 px-3 rounded mb-2.5 border border-orange-100">
              ⏳ Items in your cart are in high demand — reserved for 15 minutes
            </div>

            {/* Promo / Discount Code Input Section */}
            <div className="mb-2 pb-2.5 border-b" style={{ borderColor: `${settings.colorText}0f` }}>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
                <span>Have a discount code?</span>
                {isDiscountApplied && <span className="text-emerald-700 font-bold text-[9px] uppercase tracking-wider">10% OFF APPLIED</span>}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={discountInput}
                  onChange={(e) => {
                    setDiscountInput(e.target.value);
                    setDiscountError('');
                  }}
                  className="flex-1 h-8 px-2.5 text-xs border rounded bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 transition"
                  style={{ 
                    borderColor: `${settings.colorText}22`
                  }}
                  disabled={isDiscountApplied}
                />
                <button
                  type="button"
                  onClick={handleLocalApply}
                  className="h-8 px-4 text-[10px] uppercase font-bold tracking-wider rounded transition flex items-center justify-center shrink-0 cursor-pointer"
                  style={{
                    backgroundColor: isDiscountApplied ? '#10b981' : settings.colorButton,
                    color: settings.colorButtonText,
                    opacity: (!discountInput.trim() && !isDiscountApplied) ? 0.6 : 1
                  }}
                  disabled={!discountInput.trim() && !isDiscountApplied}
                >
                  {isDiscountApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {discountError && (
                <p className="text-[10px] text-red-500 mt-1 font-medium">{discountError}</p>
              )}
              {isDiscountApplied && (
                <div className="flex justify-between items-center mt-2 text-[10px] text-emerald-800 bg-emerald-50/70 border border-emerald-100 rounded px-2.5 py-1">
                  <span>Code <strong className="font-mono">{appliedCode}</strong> is active</span>
                  <button 
                    type="button" 
                    onClick={onRemoveDiscount} 
                    className="text-stone-500 hover:text-red-500 underline font-medium cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-1.5">
              <span className="uppercase tracking-wider">Subtotal Value</span>
              <span className="font-mono text-sm">{convertAndFormatPrice('$' + subtotal, activeCurrency)}</span>
            </div>

            {isDiscountApplied && (
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-2 text-emerald-700">
                <span className="uppercase tracking-wider">10% Exclusive Discount</span>
                <span className="font-mono text-sm">-{convertAndFormatPrice('$' + (subtotal * 0.1), activeCurrency)}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-xs sm:text-sm font-bold mb-3 border-t pt-1.5" style={{ borderColor: `${settings.colorText}1a` }}>
              <span className="uppercase tracking-wider">Total Value</span>
              <span className="font-mono text-base text-teal-800">{convertAndFormatPrice('$' + (subtotal - (isDiscountApplied ? subtotal * 0.1 : 0)), activeCurrency)}</span>
            </div>

            {/* Checkout action buttons */}
            {checkoutError && (
              <div className="mb-4 text-xs font-mono text-red-600 bg-red-50 p-2 border border-red-100 rounded text-center">
                {checkoutError}
              </div>
            )}
            
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-[9px] text-gray-500 font-medium mb-2">
              <span className="flex items-center gap-1">🔒 Secure Payment</span>
              <span>·</span>
              <span className="flex items-center gap-1">🚚 Free Returns</span>
              <span>·</span>
              <span className="flex items-center gap-1">💳 Visa/Mastercard/PayPal</span>
            </div>

            <LuxuryButton
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              showShine={true}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-widest font-subheading flex items-center justify-center gap-2"
              style={{
                backgroundColor: settings.colorButton,
                color: settings.colorButtonText,
                borderColor: settings.colorText,
                opacity: isCheckingOut ? 0.7 : 1,
                cursor: isCheckingOut ? 'not-allowed' : 'pointer'
              }}
              label={isCheckingOut ? "Connecting to Shopify..." : "Secure Checkout"}
            />

            <button
              onClick={onClose}
              className="block w-full text-center text-[10px] text-gray-500 font-mono mt-2 hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};
