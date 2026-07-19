const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf-8');

// Replace footer info panels
const oldFooter = `            {/* Promo / Discount Code Input Section */}
            <div className="mb-2 pb-2.5 border-b" style={{ borderColor: \`\${settings.colorText}0f\` }}>
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
                    borderColor: \`\${settings.colorText}22\`
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

            <div className="flex justify-between items-center text-xs sm:text-sm font-bold mb-3 border-t pt-1.5" style={{ borderColor: \`\${settings.colorText}1a\` }}>
              <span className="uppercase tracking-wider">Total Value</span>
              <span className="font-mono text-base text-teal-800">{convertAndFormatPrice('$' + (subtotal - (isDiscountApplied ? subtotal * 0.1 : 0)), activeCurrency)}</span>
            </div>`;

const newFooter = `            {/* Shipping Protection */}
            <div className="flex items-center justify-between mb-4 mt-2">
              <div className="flex items-center gap-3">
                <Box className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                <span className="text-sm font-semibold text-stone-900">Shipping Protection</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#00c4ba] font-bold text-sm">$2.55</span>
                <div className="w-5 h-5 rounded flex items-center justify-center bg-[#00c4ba] text-white">
                  <Check className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            {/* Savings & Subtotal */}
            {isDiscountApplied && (
              <div className="flex justify-between items-center text-sm font-bold mb-2">
                <span>Savings</span>
                <span>- {convertAndFormatPrice('$' + (subtotal * 0.1), activeCurrency)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-xl font-bold mb-4">
              <span>Subtotal</span>
              <span className="font-mono">{convertAndFormatPrice('$' + (subtotal - (isDiscountApplied ? subtotal * 0.1 : 0) + 2.55), activeCurrency)}</span>
            </div>`;

code = code.replace(oldFooter, newFooter);

// Replace button and add terms + payment icons
const oldCheckout = `            <LuxuryButton
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
            </button>`;

const newCheckout = `            <LuxuryButton
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
            <div className="flex flex-wrap justify-center items-center gap-1.5 mt-4">
               {/* We can use placeholder blocks or SVGs for AMEX, Apple Pay, Diners Club, Discover, Google Pay, Mastercard, PayPal, Shop Pay, Visa */}
               <img src="https://cdn.shopify.com/s/assets/payment_icons/american_express-12858714bc10cdf384b62b8f41d20f56d8c6b1f9f3b024628ee3269fdc7bf36f.svg" alt="Amex" className="h-6" />
               <img src="https://cdn.shopify.com/s/assets/payment_icons/apple_pay-f6db0077dc7c325b436ecbdcf254239100b35b70b1663bf08d21589fe6820cb6.svg" alt="Apple Pay" className="h-6" />
               <img src="https://cdn.shopify.com/s/assets/payment_icons/diners_club-16436b9fb6dd9060edb51f1c7c44e23941e544ad798282d6aef160431ce56d3d.svg" alt="Diners Club" className="h-6" />
               <img src="https://cdn.shopify.com/s/assets/payment_icons/discover-cc9808e50193c7496e7a5245eb86d5e06f02e2476c0fe70f2c4001670b1359f6.svg" alt="Discover" className="h-6" />
               <img src="https://cdn.shopify.com/s/assets/payment_icons/google_pay-c66a29c63facf2053bf6935298f26af5e1daaa0ec7bb429ffb372659103c8008.svg" alt="Google Pay" className="h-6" />
               <img src="https://cdn.shopify.com/s/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg" alt="Mastercard" className="h-6" />
               <img src="https://cdn.shopify.com/s/assets/payment_icons/paypal-49e4c1e03244b6d2de0d270ca0d22dd15da6e92cc7266e93eb43762df5aa355d.svg" alt="PayPal" className="h-6" />
               <img src="https://cdn.shopify.com/s/assets/payment_icons/shop_pay-45a165684d0bda0ccb5380ee464de13a0c5fc20fbdf74e48816c117f7baf0a94.svg" alt="Shop Pay" className="h-6" />
               <img src="https://cdn.shopify.com/s/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4f5976ea81f9f2178229410ea9105.svg" alt="Visa" className="h-6" />
            </div>`;

code = code.replace(oldCheckout, newCheckout);

// Add agreedToTerms state
code = code.replace(
  `const [discountError, setDiscountError] = useState('');`,
  `const [discountError, setDiscountError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);`
);

fs.writeFileSync('src/components/CartDrawer.tsx', code);
