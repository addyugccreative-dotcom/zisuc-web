import React, { useState } from 'react';
import { Star, ChevronDown, Plus, Minus, ShieldCheck, Heart } from 'lucide-react';
import { Product, CustomizerSettings } from '../types';
import { SafeImage } from './SafeImage';
import { LuxuryButton } from './LuxuryButton';

const getCustomProductImage = (productId: string): string | null => {
  if (productId === 'super-retinol-vitamin-a') return '/serum 1.webp';
  if (productId === 'glow-remedy-hydrating-essence') return '/toner 1.webp';
  if (productId === 'overachiever-balm-cleanser') return '/hair care 1.webp';
  if (productId === 'golden-reset-radiance-oil') return '/sun protection 1.png';
  return null;
};

const getProductBullets = (productId: string): string[] => {
  switch (productId) {
    case 'super-retinol-vitamin-a':
      return [
        "Retinal works to visibly reduce fine lines & wrinkles",
        "Accelerates skin cell renewal for ultimate smooth texture",
        "Soothes deep skin matrices and hydrates extensively",
        "Perfect lock for dry, dull, or sensitive skin profiles"
      ];
    case 'golden-reset-radiance-oil':
      return [
        "Peptides work to visibly reduce fine lines & wrinkles",
        "Boosts skin elasticity and seals moisture barriers",
        "Willowherb & chamomile soothe skin",
        "Suitable for sensitive skin and leaves a glazed glow"
      ];
    case 'glow-boost-vitamin-c':
      return [
        "15% Vitamin C complex visibly dissolves dark spots",
        "Fades stubborn blemishes and pigment residues",
        "Combats premature aging and pollution stressors",
        "Soft and light hydration daily on clean fresh skin"
      ];
    case 'peaches-peptide-serum':
      return [
        "Sextuple Peptide chain actively lifts sagging areas",
        "Increases healthy elasticity and firmness up to 45%",
        "Feeds direct bio-collagen to skin surface layers",
        "Locks down overnight hydration seamlessly without shine"
      ];
    case 'cloud-whip-barrier-repair':
      return [
        "Airy triple-whipped cream feels like a silk cloud",
        "Replenishes healthy surface lipids and ceramides",
        "Calms and resolves redness or dry patches instantly",
        "Double chamber airtight jars preserve perfect active potency"
      ];
    case 'glow-remedy-hydrating-essence':
      return [
        "Polypeptides work to lock inside ultimate moisture factor",
        "Plumps skin surface cells with hydration complex",
        "Prepares raw skin layer for active daily treatment boost",
        "Feeds vitamins and organic enzymes to deep structures"
      ];
    default:
      return [
        "Provides rich nourishment to skin surface layers",
        "Boosts skin cell renewal and locks in hydration",
        "Calms redness, dry patches, and environmental stress",
        "Suitable for sensitive and dry skin types"
      ];
  }
};

interface ProductMainProps {
  product: Product;
  settings: CustomizerSettings;
  onAddToCart: (product: Product, quantity: number, colorIdx: number) => void;
  onNavigateHome: () => void;
}

export const ProductMain: React.FC<ProductMainProps> = ({
  product,
  settings,
  onAddToCart,
  onNavigateHome,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'shipping'>('details');
  const [openIngredientIdx, setOpenIngredientIdx] = useState<number | null>(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const handleAddToCart = () => {
    onAddToCart(product, qty, activeColorIdx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-5">
      {/* Breadcrumb */}
      <nav className="text-[10px] sm:text-xs uppercase tracking-[0.18em] opacity-50 mb-5 flex items-center space-x-2 font-sans font-medium">
        <button onClick={onNavigateHome} className="hover:opacity-80 transition duration-150">HOME</button>
        <span className="text-[9px] opacity-60">&#62;</span>
        <span className="opacity-95 truncate max-w-[220px] sm:max-w-none" style={{ color: settings.colorText }}>{product.title}</span>
      </nav>

      {/* Main product structure grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-start">
        
        {/* Left Column: Image Gallery (Span 7 on desktop) */}
        <div className="lg:col-span-7 flex flex-col">
          <div 
            className="main-image-wrapper aspect-square overflow-hidden w-full rounded flex items-center justify-center relative select-none"
            style={{ backgroundColor: settings.colorBgSecondary || '#F5EBE0' }}
          >
            {product.compareAtPrice && (
              <span 
                className="absolute top-4 left-4 px-3 py-1 text-[9px] sm:text-xs uppercase tracking-widest font-bold rounded-sm z-15"
                style={{
                  backgroundColor: settings.colorAccent,
                  color: '#fff',
                }}
              >
                Sale
              </span>
            )}
            <SafeImage
              src={(activeImageIdx === 0 && getCustomProductImage(product.id)) || product.images[activeImageIdx] || product.images[0]}
              fallbackSrc={product.images[activeImageIdx] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-[600ms] hover:scale-105 cursor-zoom-in"
            />
          </div>

          {/* Centered Thumbnails Row flanked by ← and → arrow buttons exactly like 2nd image */}
          <div className="flex items-center justify-center gap-4 mt-3 select-none w-full">
            <button
              type="button"
              onClick={() => {
                const prev = (activeImageIdx - 1 + product.images.length) % product.images.length;
                setActiveImageIdx(prev);
              }}
              className="text-stone-400 hover:text-stone-950 transition duration-200 text-lg sm:text-xl px-2.5 py-1 cursor-pointer select-none font-light"
              aria-label="Previous image"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className="aspect-square w-12 sm:w-[56px] overflow-hidden rounded bg-[#FAF5F0] hover:opacity-100 transition transition-all duration-300 relative border p-[2px]"
                  style={{
                    borderColor: activeImageIdx === idx ? '#4c39fa' : 'transparent',
                    boxShadow: activeImageIdx === idx ? '0 0 0 1px #4c39fa' : 'none',
                    opacity: activeImageIdx === idx ? 1 : 0.85
                  }}
                >
                  <SafeImage 
                    src={(idx === 0 && getCustomProductImage(product.id)) || img} 
                    fallbackSrc={img}
                    alt="thumbnail" 
                    className="w-full h-full object-cover rounded-sm" 
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                const next = (activeImageIdx + 1) % product.images.length;
                setActiveImageIdx(next);
              }}
              className="text-stone-400 hover:text-stone-950 transition duration-200 text-lg sm:text-xl px-2.5 py-1 cursor-pointer select-none font-light"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        </div>

        {/* Right Column: Information Panel (Span 5 on desktop) */}
        <div className="lg:col-span-5 flex flex-col mt-2 lg:mt-0 select-none">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono opacity-65 block">{product.vendor}</span>
          <h1 className="font-heading font-light text-2xl sm:text-3xl lg:text-[36px] leading-[1.12] mt-1 mb-2 tracking-normal no-luxury-underline" style={{ color: settings.colorText }}>
            {product.title}
          </h1>

          {/* Price Container */}
          <div className="flex items-baseline space-x-3 mt-1.5 mb-4 select-none">
            <span className="text-xl sm:text-2.5xl font-bold tracking-tight text-stone-900">{product.price}</span>
            {product.compareAtPrice && (
              <span className="line-through text-stone-400 text-sm sm:text-base font-normal">{product.compareAtPrice}</span>
            )}
          </div>

          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed font-body mb-6">
            <p className="mb-4">{product.description}</p>
            <p className="font-semibold text-stone-900 mb-2.5 mt-2">Why you'll love it:</p>
            <ul className="space-y-2.5 pl-0.5">
              {getProductBullets(product.id).map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-[13px] sm:text-sm text-stone-800">
                  <span className="text-[#a39ce9] font-bold mt-[1px] text-base leading-none select-none">•</span>
                  <span className="leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* COLOR swatches selector block exactly like image 3 */}
          <div className="mt-5 border-t border-stone-200/55 pt-5">
            <span className="block font-sans text-xs uppercase tracking-[0.16em] text-stone-500 font-semibold mb-3">
              COLOR
            </span>
            <div className="flex gap-2">
              {[
                { name: "Lavender Cream", hex: "#b2a7f0" },
                { name: "Mint Dew", hex: "#d0f5e6" },
                { name: "Coral Bloom", hex: "#ffb4ac" },
                { name: "Alabaster", hex: "#fafafa" }
              ].map((color, idx) => {
                const isSelected = activeColorIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveColorIdx(idx)}
                    className="w-9 h-9 rounded-full transition-all duration-200 flex items-center justify-center p-[2.5px] cursor-pointer"
                    style={{
                      border: isSelected ? '2px solid #b2a7f0' : '2px solid transparent',
                      boxShadow: isSelected ? '0 0 0 1px #b2a7f0' : 'none',
                      transform: isSelected ? 'scale(1.05)' : 'none'
                    }}
                    aria-label={color.name}
                  >
                    <span className="w-full h-full rounded-full border border-stone-200/50" style={{ backgroundColor: color.hex }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Green Stock Depletion warning bar exactly like image 3 */}
          <div className="mt-5 mb-5 select-none space-y-1.5 pt-1.5">
            <div className="text-[11px] sm:text-xs font-semibold text-[#107048] tracking-wide flex items-center gap-1.5">
              Hurry, only 10 items left in stock!
            </div>
            <div className="w-full bg-[#e6ebe7] h-1 rounded-full overflow-hidden">
              <div className="bg-[#107048] h-full rounded-full transition-all duration-1000" style={{ width: '65%' }} />
            </div>
          </div>

          {/* Quantity and Actions exactly like image 3 */}
          <div className="mt-4 space-y-3">
            {/* Full-width Quantity selector */}
            <div className="flex items-center justify-between rounded-lg h-11 bg-[#FAF6F2] border border-[#FAF6F2] px-5 font-mono text-xs text-stone-900 w-full select-none">
              <button 
                type="button" 
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="px-4 py-2 text-stone-400 hover:text-stone-800 font-bold text-sm cursor-pointer select-none transition duration-150"
                aria-label="Decrease quantity"
              >
                —
              </button>
              <span className="font-bold text-xs font-mono text-stone-900">{qty}</span>
              <button 
                type="button" 
                onClick={() => setQty(qty + 1)}
                className="px-4 py-2 text-stone-400 hover:text-stone-800 font-bold text-sm cursor-pointer select-none transition duration-150"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Solid Purple Add to Cart Button exactly like image 3 */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full h-[52px] text-center text-xs sm:text-sm font-bold uppercase tracking-widest cursor-pointer rounded-lg bg-[#b2a7f0] text-stone-900 hover:bg-[#b2a7f0]/90 transition duration-150 flex items-center justify-center gap-2 shadow-[0_2px_4px_rgba(178,167,240,0.15)]"
            >
              <span>🛒 Add to cart</span>
            </button>

            {/* Hollow Purple Buy It Now Button exactly like image 3 */}
            <button
              type="button"
              className="w-full h-[52px] uppercase text-xs sm:text-sm font-bold tracking-widest border border-[#b2a7f0] bg-white text-[#b2a7f0] hover:bg-[#b2a7f0]/5 transition duration-150 rounded-lg cursor-pointer flex items-center justify-center"
            >
              Buy it now
            </button>
          </div>

          {/* Bundle & Save Offers card grid underneath exactly like image 3 */}
          <div className="mt-6 space-y-2.5">
            <p className="block font-sans text-xs uppercase tracking-[0.16em] text-stone-500 font-semibold mb-3">Bundle & Save Offers</p>
            {[
              { id: 1, label: 'Buy 1 item', price: `$${(parseFloat(product.price.replace('$', ''))).toFixed(2)}`, orig: product.compareAtPrice || '$150.00', pct: 'Standard Price' },
              { id: 2, label: 'Buy 2, save 20%', price: `$${((parseFloat(product.price.replace('$', '')) * 2) * 0.8).toFixed(2)}`, orig: `$${(parseFloat(product.price.replace('$', '')) * 2).toFixed(2)}`, pct: 'Save 20%' },
              { id: 3, label: 'Buy 3, save 30%', price: `$${((parseFloat(product.price.replace('$', '')) * 3) * 0.7).toFixed(2)}`, orig: `$${(parseFloat(product.price.replace('$', '')) * 3).toFixed(2)}`, pct: 'Best Choice' },
            ].map((tier, idx) => {
              const isSelected = qty === tier.id;
              return (
                <label 
                  key={idx} 
                  onClick={() => setQty(tier.id)}
                  className={`flex justify-between items-center p-3.5 border rounded-lg cursor-pointer transition-all duration-300 relative ${
                    isSelected 
                      ? 'bg-[#f5f3ff] border-[#b2a7f0] shadow-[0_0_0_1px_#b2a7f0]' 
                      : 'bg-[#FAF5F0] border-stone-200/50 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span 
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? 'border-[#b2a7f0] bg-white' : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#b2a7f0]" />}
                    </span>
                    <div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                        isSelected ? 'text-[#4c39fa]' : 'text-stone-800'
                      }`}>{tier.label}</span>
                      {tier.pct === 'Best Choice' ? (
                        <span className="inline-block text-[9px] bg-[#d1c9ff] text-[#4c39fa] font-bold px-2 py-0.5 rounded-full mt-0.5 uppercase tracking-wider">
                          {tier.pct}
                        </span>
                      ) : (
                        <span className={`text-[9px] font-mono tracking-tight font-semibold block ${
                          isSelected ? 'text-[#4c39fa]' : 'text-[#e76f51]'
                        }`}>{tier.pct}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-xs sm:text-sm font-bold font-mono ${
                      isSelected ? 'text-[#4c39fa]' : 'text-stone-900'
                    }`}>{tier.price}</span>
                    <span className="text-[10px] line-through text-stone-400 font-mono">{tier.orig}</span>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Secure details badging */}
          <div className="mt-5 flex items-center justify-center gap-1.5 py-3 px-3 border border-dashed border-stone-300 rounded text-[10.5px] opacity-80 font-mono text-stone-600 leading-normal">
            <ShieldCheck className="w-4 h-4 text-[#107048] shrink-0" />
            <span>Secure Checkout: SSL encrypted shopping. Free global shipping on packages over $150.</span>
          </div>

          {/* Product tabs details block as interactive specifications */}
          <div className="mt-8 border-t" style={{ borderColor: `${settings.colorText}1f` }}>
            <div className="flex border-b text-center font-bold tracking-widest uppercase text-[10px] sm:text-xs">
              {(['details', 'ingredients', 'shipping'] as const).map((tab) => (
                <button 
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-3.5 transition duration-200 hover:opacity-100 uppercase"
                  style={{
                    color: settings.colorText,
                    borderBottom: activeTab === tab ? '2px solid #b2a7f0' : '2px solid transparent',
                    opacity: activeTab === tab ? 1 : 0.5
                  }}
                >
                  {tab === 'details' ? 'Product details' : tab === 'ingredients' ? 'Ingredients' : 'Shipping'}
                </button>
              ))}
            </div>

            <div className="py-4 my-2">
              {activeTab === 'details' && (
                <div className="grid grid-cols-2 gap-4 text-xs font-subheading">
                  <div className="border-b pb-2" style={{ borderColor: `${settings.colorText}0d` }}>
                    <p className="text-[10px] uppercase tracking-wider opacity-60 font-mono">Skin Type</p>
                    <p className="font-semibold mt-1">All skin types — especially dry, dull, or sensitive</p>
                  </div>
                  <div className="border-b pb-2" style={{ borderColor: `${settings.colorText}0d` }}>
                    <p className="text-[10px] uppercase tracking-wider opacity-60 font-mono">Key Benefits</p>
                    <p className="font-semibold mt-1">Hydration, barrier repair, and glow enhancement</p>
                  </div>
                  <div className="border-b pb-2" style={{ borderColor: `${settings.colorText}0d` }}>
                    <p className="text-[10px] uppercase tracking-wider opacity-60 font-mono">Texture</p>
                    <p className="font-semibold mt-1">Silky gel-cream with a weightless, non-greasy finish</p>
                  </div>
                  <div className="border-b pb-2" style={{ borderColor: `${settings.colorText}0d` }}>
                    <p className="text-[10px] uppercase tracking-wider opacity-60 font-mono">Active Ingredients</p>
                    <p className="font-semibold mt-1">Bio-lipids, Ceramides, Natural Retinal & Oat extracts</p>
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="text-xs leading-relaxed opacity-90 font-body">
                  <p className="font-bold mb-1 uppercase tracking-wider text-[10px] opacity-60">Full Ingredients list:</p>
                  <p className="text-gray-800">{product.ingredients}</p>
                  <p className="mt-3 text-stone-500 font-normal italic">100% gluten-free, vegan certified, cruelty-free, organic compounds sourcing, made with planet-first practices.</p>
                </div>
              )}

              {activeTab === 'shipping' && (
                <p className="text-xs leading-relaxed text-gray-700 font-body">
                  {product.shipping}
                </p>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* BEFORE/AFTER BANNER DECORATOR */}
      <section className="mt-16 w-full relative h-48 sm:h-56 overflow-hidden rounded-xl border flex items-center justify-center p-6 bg-cover bg-center select-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200')`, borderColor: `${settings.colorText}10` }}>
        <div className="absolute inset-0 bg-black/35 z-0" />
        <div className="relative z-10 text-center text-white max-w-lg">
          <h2 className="font-heading italic text-2xl sm:text-3xl leading-tight">See the change, <span className="font-serif">feel</span> the difference.</h2>
          <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold mt-2 opacity-90">Brightening support with botanical vitamins & clinical actives</p>
        </div>
      </section>

      {/* PROVEN RESULTS SECTION AS SHOWN IN SCREENSHOT 2 PAGE 1 (at 3:38) */}
      <section className="mt-16 py-12 border-y border-stone-200/50">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest opacity-60">Tested Evidence</span>
          <h2 className="font-heading italic text-3xl sm:text-4xl mt-1 text-stone-900">Proven results that speak for themselves</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto select-none">
          {[
            { pct: 84, desc: "saw better hydration in 1 week" },
            { pct: 90, desc: "less redness in 14 days" },
            { pct: 95, desc: "witnessed a natural, brighter glow" },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-stone-100 shadow-xs">
              <div className="relative w-20 h-20 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="#F5EBE0" strokeWidth="5.5" fill="transparent" />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="34" 
                    stroke="#e76f51" 
                    strokeWidth="5.5" 
                    fill="transparent" 
                    strokeDasharray="213.6" 
                    strokeDashoffset={213.6 - (213.6 * stat.pct) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute font-subheading text-lg font-bold text-stone-900">{stat.pct}%</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-body font-medium max-w-[180px]">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KEY INGREDIENTS COLLAPSIBLE MODULE AS SHOWN IN SCREENSHOT 2 PAGE 1 (at 3:42) */}
      <section className="mt-16 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-widest opacity-60">Pure Compound Bioactives</span>
          <h2 className="font-heading italic text-2xl sm:text-3xl mt-1 text-stone-900">Key ingredients</h2>
        </div>

        <div className="space-y-3">
          {[
            { name: "Avocado Oil", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=150", benefit: "Deeply penetrates surface layers to restore fat-soluble vitamins and extreme elasticity to parched skin." },
            { name: "Acacia Extract", image: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=150", benefit: "A natural organic firming agent that instantly tightens fine lines and structural cellular collagen." },
            { name: "Argan Oil", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=150", benefit: "Known as liquid gold, contains ultra-rich oleic acids to seal in hydration for long wear." }
          ].map((ing, idx) => {
            const isOpen = openIngredientIdx === idx;
            return (
              <div 
                key={idx} 
                className="border rounded-xl bg-white overflow-hidden transition-all duration-300"
                style={{ borderColor: isOpen ? settings.colorText : `${settings.colorText}1f` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIngredientIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-subheading uppercase font-bold text-xs tracking-wider cursor-pointer text-stone-900 hover:bg-stone-50 select-none"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[#e76f51] font-mono text-[10px]">0{idx + 1}.</span>
                    <span>{ing.name}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-[#e76f51]' : 'opacity-70'}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-stone-100 pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in select-none">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#F2A183]/30">
                      <img src={ing.image} alt={ing.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-body mt-1 sm:mt-0">{ing.benefit}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ROUTINE STEPS GRID AS SHOWN IN SCREENSHOT 2 PAGE 1 */}
      <section className="mt-16">
        <div className="text-center mb-10 max-w-sm mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest opacity-60">Complete Your Routine</span>
          <h2 className="font-heading italic text-2xl sm:text-3xl leading-tight mt-1">New skin rituals. All-in-one. All natural.</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: 'STEP 1', label: 'Cleanse – Refresh & Reset', img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400' },
            { step: 'STEP 2', label: 'Tone – Balance & Prime', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400' },
            { step: 'STEP 3', label: 'Treat – Target & Transform', img: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=400' },
            { step: 'STEP 4', label: 'Moisturize – Seal & Protect', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400' },
          ].map((item, idx) => (
            <div key={idx} className="relative aspect-[3/4] overflow-hidden rounded group shadow-xs border" style={{ borderColor: `${settings.colorText}10` }}>
              <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 font-bold block mb-1">{item.step}</span>
                <p className="text-white text-xs sm:text-sm font-semibold tracking-wide font-sans">{item.label}</p>
              </div>
              <button className="absolute bottom-4 right-4 w-7 h-7 rounded-full bg-white select-none shadow text-stone-850 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-xs font-bold" aria-label="Add spot">+</button>
            </div>
          ))}
        </div>
      </section>

      {/* DEEP DIVE INTERACTIVE HOTSPOTS MODULE AS SHOWN IN SCREENSHOT 2 PAGE 2 (at 4:06) */}
      <section className="mt-16 bg-[#FAF5F0] p-6 sm:p-10 rounded-xl border" style={{ borderColor: `${settings.colorText}13` }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Hot spots trigger layout */}
          <div className="space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#e76f51] font-bold block">Formula breakdown</span>
            <h3 className="font-heading italic text-3xl sm:text-4xl leading-tight">Deep dive in the details.<br/><span className="font-serif">The choice is yours.</span></h3>
            
            <div className="space-y-4 font-subheading">
              {[
                { title: 'Triple-Whipped Texture', desc: 'Each cream is triple-whipped for a silky, cloud-like finish that melts instantly into your skin without leaving heavy residues.' },
                { title: 'Eco-Conscious Beauty', desc: 'Sustainably sourced botanical lipids housed in double-chamber airless protective glass jars to prevent oxidation.' },
                { title: 'Licensed Esthetician Support', desc: 'Need help mapping your routine? Reach out immediately via our live workspace support interface.' }
              ].map((hotspot, hIdx) => {
                const isSelected = activeHotspot === hIdx;
                return (
                  <div 
                    key={hIdx}
                    onClick={() => setActiveHotspot(isSelected ? null : hIdx)}
                    className={`border-l-2 pl-4 py-1.5 transition-all duration-300 cursor-pointer p-4 rounded-r ${
                      isSelected 
                        ? 'border-[#e76f51] bg-[#e76f51]/5 shadow-xs translate-x-1.5' 
                        : 'border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    <h4 className="font-bold text-xs uppercase tracking-wider">{hotspot.title}</h4>
                    <p className="text-xs text-gray-700 mt-1 leading-relaxed">{hotspot.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
 
          {/* Right Hot spots image with overlay absolute positions buttons */}
          <div className="relative rounded-2xl overflow-hidden shadow-md flex items-center justify-center border bg-white select-none" style={{ borderColor: `${settings.colorText}10` }}>
            <img src="https://images.unsplash.com/photo-1596701062351-df5f8af0d385?q=80&w=800" alt="Hotspot layout showcase" className="w-full h-80 object-cover opacity-90" />
            <div className="absolute inset-0 bg-stone-900/10 transition duration-300" />
            
            {/* Hotspot 1 button */}
            <div className="absolute top-[30%] left-[25%] z-20">
              <button 
                type="button"
                onClick={() => setActiveHotspot(activeHotspot === 0 ? null : 0)}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border transition-all duration-300 cursor-pointer active:scale-95 ${
                  activeHotspot === 0 ? 'bg-[#e76f51] text-white border-white scale-110' : 'bg-white text-stone-900 border-[#e76f51] hover:bg-stone-50'
                }`}
                aria-label="Triple Whipped spotlight"
              >
                <span className="text-xs font-bold font-mono">+</span>
                {activeHotspot === 0 && (
                  <span className="absolute -inset-1.5 rounded-full border border-[#e76f51] animate-ping opacity-60" />
                )}
              </button>
              {activeHotspot === 0 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white p-3 rounded-lg text-[10px] w-48 shadow-xl border border-stone-800 leading-normal animate-fade-in z-30">
                  <p className="font-bold uppercase tracking-wider text-amber-200">Triple-Whipped Texture</p>
                  <p className="opacity-90 mt-1 font-sans">Melts instantly like water without residues.</p>
                </div>
              )}
            </div>

            {/* Hotspot 2 button */}
            <div className="absolute bottom-[35%] right-[25%] z-20">
              <button 
                type="button"
                onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border transition-all duration-300 cursor-pointer active:scale-95 ${
                  activeHotspot === 1 ? 'bg-[#e76f51] text-white border-white scale-110' : 'bg-white text-stone-900 border-[#e76f51] hover:bg-stone-50'
                }`}
                aria-label="Eco Conscious spotlight"
              >
                <span className="text-xs font-bold font-mono">+</span>
                {activeHotspot === 1 && (
                  <span className="absolute -inset-1.5 rounded-full border border-[#e76f51] animate-ping opacity-60" />
                )}
              </button>
              {activeHotspot === 1 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white p-3 rounded-lg text-[10px] w-48 shadow-xl border border-stone-800 leading-normal animate-fade-in z-30">
                  <p className="font-bold uppercase tracking-wider text-amber-200">Eco-Conscious Beauty</p>
                  <p className="opacity-90 mt-1 font-sans">Airless protective jars to prevent compound oxidation.</p>
                </div>
              )}
            </div>

            {/* Hotspot 3 button */}
            <div className="absolute top-[50%] right-[40%] z-20">
              <button 
                type="button"
                onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border transition-all duration-300 cursor-pointer active:scale-95 ${
                  activeHotspot === 2 ? 'bg-[#e76f51] text-white border-white scale-110' : 'bg-white text-stone-900 border-[#e76f51] hover:bg-stone-50'
                }`}
                aria-label="Expert Esthetician spotlight"
              >
                <span className="text-xs font-bold font-mono">+</span>
                {activeHotspot === 2 && (
                  <span className="absolute -inset-1.5 rounded-full border border-[#e76f51] animate-ping opacity-60" />
                )}
              </button>
              {activeHotspot === 2 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white p-3 rounded-lg text-[10px] w-48 shadow-xl border border-stone-800 leading-normal animate-fade-in z-30">
                  <p className="font-bold uppercase tracking-wider text-amber-200">Esthetician Support</p>
                  <p className="opacity-90 mt-1 font-sans font-normal">Free mapping plans and guides with our licensed experts.</p>
                </div>
              )}
            </div>
            
          </div>
 
        </div>
      </section>
    </div>
  );
};
