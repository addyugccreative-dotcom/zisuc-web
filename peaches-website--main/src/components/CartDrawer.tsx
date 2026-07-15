import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem, CustomizerSettings } from '../types';
import { LuxuryButton } from './LuxuryButton';

interface CartDrawerProps {
  isOpen: boolean;
  settings: CustomizerSettings;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQty: (idx: number, qtyChange: number) => void;
  onRemoveItem: (idx: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  settings,
  cartItems,
  onClose,
  onUpdateQty,
  onRemoveItem,
}) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.product.price.replace('$', '')) * item.quantity,
    0
  );

  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountToFreeShipping = freeShippingThreshold - subtotal;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: `${settings.colorText}1a` }}>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 opacity-75" />
            <span className="font-heading italic text-lg font-medium">Your Bag</span>
          </div>
          <button onClick={onClose} aria-label="Close Shopping Bag">
            <X className="w-5 h-5 hover:opacity-75" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="border-b px-6 py-4 flex flex-col" style={{ backgroundColor: `${settings.colorAccent}33`, borderColor: `${settings.colorText}11` }}>
          <span className="text-xs font-medium">
            {isFreeShipping ? (
              <span className="text-emerald-700 font-bold">🎉 Congratulations! You have unlocked free global shipping!</span>
            ) : (
              <span>You are <span className="font-bold font-mono">${amountToFreeShipping.toFixed(2)}</span> away from free shipping globally!</span>
            )}
          </span>
          <div className="w-full h-1.5 bg-neutral-200 rounded mt-2.5 overflow-hidden">
            <div
              className="h-full rounded transition-all duration-500"
              style={{
                backgroundColor: settings.colorButton,
                width: `${progressPercent}%`,
              }}
            />
          </div>
        </div>

        {/* Dynamic scroll list body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
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
            cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 border-b pb-4 items-start"
                style={{ borderColor: `${settings.colorText}15` }}
              >
                {/* Product cover */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 aspect-square overflow-hidden bg-white border rounded shrink-0" style={{ borderColor: `${settings.colorText}0d` }}>
                  <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
                      ${(parseFloat(item.product.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info panels */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 bg-white/40" style={{ borderColor: `${settings.colorText}1a` }}>
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold mb-4">
              <span className="uppercase tracking-wider">Subtotal Value</span>
              <span className="font-mono text-base">${subtotal.toFixed(2)}</span>
            </div>

            {/* Checkout action buttons */}
            <LuxuryButton
              type="button"
              className="w-full py-4 text-xs font-bold uppercase tracking-widest font-subheading flex items-center justify-center gap-2"
              style={{
                backgroundColor: settings.colorButton,
                color: settings.colorButtonText,
                borderColor: settings.colorText,
              }}
              label="Secure Checkout"
            />

            <button
              onClick={onClose}
              className="block w-full text-center text-[10px] text-gray-500 font-mono mt-4 hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};
