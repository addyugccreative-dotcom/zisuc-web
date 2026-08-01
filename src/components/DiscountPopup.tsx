import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Gift } from 'lucide-react';
import { CustomizerSettings } from '../types';
import discountCloche from '../assets/images/discount_cloche_1784313346983.jpg';

interface DiscountPopupProps {
  settings: CustomizerSettings;
  onApplyDiscountDirectly: (code: string) => void;
  isCartDiscountApplied: boolean;
}

export const DiscountPopup: React.FC<DiscountPopupProps> = ({
  settings,
  onApplyDiscountDirectly,
  isCartDiscountApplied
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [hasDismissed, setHasDismissed] = useState(false);

  const COUPON_CODE = 'ZISUC10';

  useEffect(() => {
    // Check if user already dismissed or subscribed in this session/browser
    const dismissed = localStorage.getItem('zisuc_discount_dismissed') === 'true';
    const subscribed = localStorage.getItem('zisuc_discount_subscribed') === 'true';
    
    setHasDismissed(dismissed);
    setIsSubscribed(subscribed);

    if (!dismissed && !subscribed) {
      // Trigger slide-in after 2.5 seconds for premium feel
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('zisuc_discount_dismissed', 'true');
    setHasDismissed(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsSubscribed(true);
    localStorage.setItem('zisuc_discount_subscribed', 'true');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyAndShop = () => {
    onApplyDiscountDirectly(COUPON_CODE);
    setIsOpen(false);
  };

  const triggerOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating launcher icon in bottom right (only visible when popup is closed) */}
      <AnimatePresence>
        {(!isOpen && !isCartDiscountApplied) && (
          <motion.button
            id="discount-floating-trigger"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={triggerOpen}
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-5 z-[140] w-8 h-8 sm:w-9 sm:h-9 rounded-full shadow-lg flex items-center justify-center bg-stone-900 text-white hover:scale-105 active:scale-95 transition-transform duration-300 cursor-pointer"
            style={{ 
              backgroundColor: settings.colorButton || '#1c1917',
              color: settings.colorButtonText || '#ffffff'
            }}
            title="Claim 10% Exclusive Discount"
          >
            <div className="relative">
              <Gift className="w-4 h-4 sm:w-4.5 sm:h-4.5 animate-pulse" />
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[6.5px] sm:text-[7.5px] font-extrabold px-1 py-[0.5px] rounded-full uppercase tracking-wider font-sans scale-90 sm:scale-95 shadow-xs">
                10%
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Slide-in Pop-up Modal Container */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[180] flex items-center justify-center sm:justify-end p-4 sm:p-6 md:p-8 bg-black/40 backdrop-blur-xs select-none">
            {/* Click outside backdrop will dismiss */}
            <div className="absolute inset-0 cursor-default" onClick={handleDismiss} />

            <motion.div
              id="discount-popup-panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '120%', opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 180 }}
              className="relative w-full max-w-[760px] h-auto md:h-[460px] bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row z-10"
            >
              {/* Left Column: Visual Artwork (Desktop and Mobile custom images) */}
              <div className="w-full md:w-1/2 h-44 md:h-full bg-pink-50 relative shrink-0">
                {/* Desktop Version */}
                <img 
                  src="/discount pop laptop version image.png" 
                  alt="Swiss precision luxury cloche serum" 
                  className="hidden md:block w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Mobile Version */}
                <img 
                  src="/discount pop mobile version image.png" 
                  alt="Swiss precision luxury cloche serum" 
                  className="block md:hidden w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/5 pointer-events-none" />
              </div>

              {/* Right Column: Copywriting & Forms */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white relative">
                
                {/* Custom circular close button at top-right of text container */}
                <button
                  id="discount-close-btn"
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 transition-colors flex items-center justify-center cursor-pointer z-20 shadow-sm"
                  aria-label="Close discount popup"
                >
                  <X className="w-4 h-4" />
                </button>

                {!isSubscribed ? (
                  /* Form State */
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-block bg-[#FFF0F5] text-stone-800 text-[10px] font-bold tracking-[0.2em] px-2.5 py-1 uppercase rounded-sm font-subheading">
                        10% Exclusive Discount
                      </span>
                    </div>

                    <h3 className="font-subheading text-2xl md:text-3xl font-bold text-stone-900 leading-tight tracking-tight mb-3">
                      Swiss precision at the service of your skin.
                    </h3>

                    <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-body mb-5">
                      Get <strong className="text-stone-900 font-semibold">-10%</strong> on your first order by subscribing* to our newsletter and discover our Swiss biomimetic skincare.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div>
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border border-stone-200 rounded-full py-2.5 px-5 text-sm text-stone-850 placeholder-stone-400 focus:outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition"
                          required
                        />
                        {error && <p className="text-[11px] text-red-500 mt-1 pl-2">{error}</p>}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-full font-subheading font-bold text-xs uppercase tracking-wider transition duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer"
                        style={{
                          backgroundColor: settings.colorButton || '#1c1917',
                          color: settings.colorButtonText || '#ffffff'
                        }}
                      >
                        Receive my 10%
                      </button>
                    </form>

                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="mt-4 text-center text-[11px] font-subheading font-semibold text-stone-500 hover:text-stone-900 transition-colors block w-full hover:underline cursor-pointer"
                    >
                      No thanks, I don't want the discount.
                    </button>
                  </div>
                ) : (
                  /* Success State with unique Copyable Coupon */
                  <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4 border border-emerald-100">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>

                    <h3 className="font-subheading text-xl md:text-2xl font-bold text-stone-900 mb-2">
                      Unlock Complete!
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed font-body max-w-xs mb-5">
                      Use code below in your cart to claim <strong className="text-emerald-700">10% discount</strong>. One-time use only.
                    </p>

                    {/* Copyable discount box */}
                    <div className="w-full max-w-[280px] border-2 border-dashed border-stone-200 rounded-2xl p-4 bg-stone-50/50 mb-6 relative group">
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-2.5 text-[9px] uppercase tracking-widest text-stone-400 font-bold font-subheading">
                        Your Code
                      </span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-mono text-lg font-bold tracking-wider text-stone-800">
                          {COUPON_CODE}
                        </span>
                        <button
                          onClick={handleCopy}
                          className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-850 transition-colors flex items-center justify-center cursor-pointer"
                          title="Copy Promo Code"
                        >
                          {copied ? <Check className="w-4.5 h-4.5 text-emerald-600" /> : <Copy className="w-4.5 h-4.5" />}
                        </button>
                      </div>
                      {copied && (
                        <p className="text-[10px] text-emerald-600 font-semibold font-subheading mt-1.5">
                          Copied to clipboard!
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleApplyAndShop}
                      className="w-full py-3 px-6 rounded-full font-subheading font-bold text-xs uppercase tracking-wider transition duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer"
                      style={{
                        backgroundColor: '#10b981',
                        color: '#ffffff'
                      }}
                    >
                      Apply directly & open cart 🎉
                    </button>
                  </div>
                )}

                {/* Footer Legal Disclaimers */}
                <div className="mt-4 pt-4 border-t border-stone-100 text-[9px] text-stone-400 leading-relaxed font-body text-center md:text-left">
                  *I agree to receive communications by email from ZISU'C Skincare. Unsubscribe at any time.
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
