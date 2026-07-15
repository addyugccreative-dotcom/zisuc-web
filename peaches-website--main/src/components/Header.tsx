import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { CustomizerSettings, CartItem } from '../types';

interface HeaderProps {
  settings: CustomizerSettings;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onNavigate: (page: 'home' | 'product', productId?: string) => void;
  isMobileView: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  cartItems,
  onOpenCart,
  onNavigate,
  isMobileView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const menuLinks = [
    { title: 'ON SALE - 50% OFF', url: '#', isHighlight: true },
    { 
      title: 'SHOP', 
      url: '#',
      children: ['Clean Canvas Cleansers', 'Glow Hydrating Essences', 'Active serums', 'Plumping Lip Care'] 
    },
    { 
      title: 'COLLECTIONS', 
      url: '#',
      children: ['Daily Essentials', 'Before / After Journeys', 'Shop by Active Ingredients', 'Skin Ritual Bundles'] 
    },
    { 
      title: 'THEME FEATURES', 
      url: '#',
      children: ['Drag Before & After Slider', 'Video Reel Shopper', 'Ingredients Comparison Matrix', 'Countdown timers'] 
    }
  ];

  return (
    <>
      <header
        className="w-full border-b transition-all duration-300 stick top-0 z-50 sticky select-none"
        style={{
          backgroundColor: settings.colorBg,
          borderColor: `${settings.colorText}1f`,
          color: settings.colorText,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 p-2 hover:opacity-75 transition-opacity flex flex-col gap-1 w-6 justify-center items-start"
            aria-label="Open mobile menu"
          >
            <span className="h-[2px] w-5 bg-current block rounded-full" />
            <span className="h-[2px] w-3.5 bg-current block rounded-full animate-pulse" />
            <span className="h-[2px] w-4.5 bg-current block rounded-full" />
          </button>

          {/* Navigation links (Desktop) */}
          <nav className="hidden lg:flex space-x-8 text-xs font-medium uppercase tracking-widest" style={{ color: settings.colorText }}>
            
            {/* 1. ON SALE WITH INDIGO BADGE */}
            <div className="relative group py-2">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                className="hover:opacity-75 flex items-center gap-1.5 transition text-stone-800 font-bold"
                style={{ color: settings.colorText }}
              >
                <span>ON SALE</span>
                <span className="bg-[#EBE6FF] text-[#553C9A] px-2 py-0.5 rounded text-[9px] font-bold tracking-normal uppercase shrink-0">
                  50% OFF
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </a>
              
              {/* ON SALE DROPDOWN */}
              <div 
                className="absolute left-0 top-full mt-2 w-64 p-4 rounded-xl bg-white border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 text-stone-900 text-left font-sans"
                style={{ borderColor: `${settings.colorText}1a` }}
              >
                <div className="flex flex-col gap-1">
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:bg-[#EBE6FF]/30 p-2.5 rounded-lg transition-all text-left">
                    <span className="block text-xs font-bold uppercase tracking-wider text-stone-800">Summer Sale • Up to 50%</span>
                    <span className="text-[10px] text-stone-500 font-normal block mt-0.5">Signature items at seasonal markdown values.</span>
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:bg-[#EBE6FF]/30 p-2.5 rounded-lg transition-all text-left">
                    <span className="block text-xs font-bold uppercase tracking-wider text-stone-800">Bundle Savings</span>
                    <span className="text-[10px] text-stone-500 font-normal block mt-0.5">Mix and match body products & save 20%.</span>
                  </a>
                  <div className="h-px bg-stone-100 my-1" />
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:bg-[#EBE6FF]/30 p-2 rounded-lg transition-all text-center block text-[10px] font-bold text-[#553C9A] uppercase tracking-wider">
                    View Sale Catalog All &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* 2. SHOP MEGA MENU WITH 3 TEXT COLUMNS AND 2 PROMO CARDS */}
            <div className="relative group py-2">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                className="hover:opacity-75 flex items-center gap-1 transition text-stone-800"
                style={{ color: settings.colorText }}
              >
                <span>SHOP</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </a>

              {/* SHOP GIANT DROPDOWN MENU */}
              <div 
                className="absolute left-1/2 -translate-x-[25%] top-full mt-2 w-[94vw] max-w-6xl p-8 rounded-2xl bg-white border shadow-2xl text-stone-900 grid grid-cols-5 gap-6 select-none opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 z-50 text-left font-sans"
                style={{ borderColor: `${settings.colorText}1f` }}
              >
                {/* Column A: Skincare */}
                <div className="flex flex-col">
                  <h4 className="font-heading italic text-lg font-bold tracking-wide text-stone-950 mb-4 pb-1.5 border-b border-stone-100 uppercase">Skincare</h4>
                  <div className="flex flex-col gap-2.5 text-xs text-stone-600">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Cleansers</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Toners & Mists</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Serums & Treatments</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Moisturizers & Creams</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Sunscreen & Protection</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Exfoliators</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-[#F2A183] font-bold tracking-wider transition-all pt-2.5 text-[#e76f51] block uppercase text-[9px] font-mono">SHOP ALL &rarr;</a>
                  </div>
                </div>

                {/* Column B: Bodycare */}
                <div className="flex flex-col">
                  <h4 className="font-heading italic text-lg font-bold tracking-wide text-stone-950 mb-4 pb-1.5 border-b border-stone-100 uppercase">Bodycare</h4>
                  <div className="flex flex-col gap-2.5 text-xs text-stone-600">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Body Wash & Shower Gels</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Scrubs & Exfoliators</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Lotions & Creams</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Body Oils & Butters</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Hand & Foot Care</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Shop all</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-[#F2A183] font-bold tracking-wider transition-all pt-2.5 text-[#e76f51] block uppercase text-[9px] font-mono">SHOP ALL &rarr;</a>
                  </div>
                </div>

                {/* Column C: Makeup */}
                <div className="flex flex-col">
                  <h4 className="font-heading italic text-lg font-bold tracking-wide text-stone-950 mb-4 pb-1.5 border-b border-stone-100 uppercase">Makeup</h4>
                  <div className="flex flex-col gap-2.5 text-xs text-stone-600">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Face</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Eyes</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Brows</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Lips</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Cheeks</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-900 hover:font-medium transition-all py-0.5">Primers</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-[#F2A183] font-bold tracking-wider transition-all pt-2.5 text-[#e76f51] block uppercase text-[9px] font-mono">SHOP ALL &rarr;</a>
                  </div>
                </div>

                {/* Column D: Promo Card 1 - FLASH SALE */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/20 group/promo aspect-[4/5] min-h-[260px] flex flex-col justify-end">
                  <img 
                    src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400" 
                    alt="Flash sale cosmetics" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/promo:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent z-10" />
                  <div className="absolute inset-0 p-4 z-20 flex flex-col justify-between text-left">
                    <div>
                      <span className="bg-[#FAF5F0] text-stone-950 text-[9px] font-mono tracking-widest px-2 py-0.5 rounded font-bold uppercase select-none inline-block">
                        FLASH SALE
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold leading-snug mb-3">
                        Save 30% for your daily look with <span className="italic font-serif font-normal text-amber-200">exclusive deals</span>
                      </p>
                      <button 
                        type="button" 
                        onClick={() => onNavigate('home')} 
                        className="w-full bg-white text-stone-900 hover:bg-[#FAF5F0] text-[10px] font-bold tracking-widest py-2 rounded-lg transition active:scale-95 text-center uppercase cursor-pointer"
                      >
                        Shop Flashsale
                      </button>
                    </div>
                  </div>
                </div>

                {/* Column E: Promo Card 2 - TRENDING */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/20 group/promo aspect-[4/5] min-h-[260px] flex flex-col justify-end">
                  <img 
                    src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400" 
                    alt="Trending bundle product" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/promo:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent z-10" />
                  <div className="absolute inset-0 p-4 z-20 flex flex-col justify-between text-left">
                    <div>
                      <span className="bg-[#FAF5F0] text-[#e76f51] text-[9px] font-mono tracking-widest px-2 py-0.5 rounded font-bold uppercase select-none inline-block">
                        TRENDING
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold leading-snug mb-3">
                        Shop in bundle and <span className="italic font-serif font-normal text-amber-200">save up to 20%</span>
                      </p>
                      <button 
                        type="button" 
                        onClick={() => onNavigate('home')} 
                        className="w-full bg-white text-stone-900 hover:bg-[#FAF5F0] text-[10px] font-bold tracking-widest py-2 rounded-lg transition active:scale-95 text-center uppercase cursor-pointer"
                      >
                        Build your bundle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. COLLECTIONS */}
            <div className="relative group py-2">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                className="hover:opacity-75 flex items-center gap-1 transition text-stone-800"
                style={{ color: settings.colorText }}
              >
                <span>COLLECTIONS</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </a>
              
              {/* COLLECTIONS DROPDOWN */}
              <div 
                className="absolute left-0 top-full mt-2 w-72 p-5 rounded-2xl bg-white border shadow-2xl text-stone-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 text-left font-sans"
                style={{ borderColor: `${settings.colorText}1f` }}
              >
                <div className="flex flex-col gap-2 text-xs text-stone-600">
                  <span className="font-mono text-[9px] text-[#e76f51] tracking-widest uppercase font-bold mb-1 block">Selected Series</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-950 p-2 rounded-lg hover:bg-stone-50 flex items-center justify-between transition-all">
                    <span className="font-medium text-stone-850">Daily Essentials Pack</span>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-950 p-2 rounded-lg hover:bg-stone-50 flex items-center justify-between transition-all">
                    <span className="font-medium text-stone-850">Skin Ritual Organics</span>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-950 p-2 rounded-lg hover:bg-stone-50 flex items-center justify-between transition-all">
                    <span className="font-medium text-stone-850">Active Recovery Glows</span>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-stone-950 p-2 rounded-lg hover:bg-stone-50 flex items-center justify-between transition-all">
                    <span className="font-medium text-stone-850">Before / After Journeys</span>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            </div>

            {/* 4. THEME FEATURES */}
            <div className="relative group py-2">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                className="hover:opacity-75 flex items-center gap-1 transition text-stone-800"
                style={{ color: settings.colorText }}
              >
                <span>THEME FEATURES</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </a>
              
              {/* THEME FEATURES DROPDOWN (Matches Screenshot 2) */}
              <div 
                className="absolute left-0 top-full mt-2 w-60 p-4 rounded-xl bg-white border shadow-2xl text-stone-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 text-left font-sans"
                style={{ borderColor: `${settings.colorText}1f` }}
              >
                <div className="flex flex-col gap-0.5">
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
                    className="block px-3 py-2 text-xs text-stone-700 hover:text-stone-950 hover:bg-[#FAF5F0] rounded-lg tracking-wide transition-all font-medium text-left"
                  >
                    Filters vertical
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
                    className="block px-3 py-2 text-xs text-stone-700 hover:text-stone-950 hover:bg-[#FAF5F0] rounded-lg tracking-wide transition-all font-medium text-left"
                  >
                    Filters horizontal
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
                    className="block px-3 py-2 text-xs text-stone-700 hover:text-stone-950 hover:bg-[#FAF5F0] rounded-lg tracking-wide transition-all font-medium text-left"
                  >
                    Filters drawer
                  </a>
                  <div className="h-px bg-stone-100 my-2" />
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
                    className="block px-3 py-2 text-xs text-stone-700 hover:text-stone-950 hover:bg-[#FAF5F0] rounded-lg tracking-wide transition-all text-left font-normal"
                  >
                    Drag Before &amp; After Slider
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
                    className="block px-3 py-2 text-xs text-stone-700 hover:text-stone-950 hover:bg-[#FAF5F0] rounded-lg tracking-wide transition-all text-left font-normal"
                  >
                    Video Reel Shopper
                  </a>
                </div>
              </div>
            </div>

          </nav>

          {/* Centered Brand Logo */}
          <div className="text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="font-heading italic font-light text-3xl tracking-normal flex items-center justify-center relative select-none"
            >
              <span>{settings.logoText}</span>
              <sup className="text-xs font-serif ml-[1px] relative -top-3 scale-90 font-light select-none">©</sup>
            </a>
          </div>

          {/* Right Action Menu Icons */}
          <div className="flex items-center space-x-4 select-none">
            {/* Currency picker */}
            <div className="hidden md:flex items-center gap-1 opacity-75 text-xs font-mono tracking-tight cursor-pointer hover:opacity-100 transition">
              <span>USD $</span>
              <span className="text-[10px]">&bull;</span>
            </div>

            <button className="p-1.5 hover:opacity-75 active:scale-95 transition" aria-label="Search">
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Profile trigger */}
            <div className="hidden md:block p-1.5 hover:opacity-100 opacity-75 transition cursor-pointer" aria-label="Account profile">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>

            <button
              onClick={onOpenCart}
              className="relative p-1.5 hover:opacity-75 active:scale-95 transition"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <span
                className="absolute top-0.5 right-0.5 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold bg-[#2D2926] text-white select-none pointer-events-none"
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[100] transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="fixed inset-y-0 left-0 w-72 max-w-full z-[110] flex flex-col p-6 shadow-2xl transition-transform duration-300"
            style={{
              backgroundColor: settings.colorBg,
              color: settings.colorText,
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b">
              <span className="font-heading italic font-semibold tracking-wider">{settings.logoText}</span>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close Mobile Drawer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-5 py-6 font-subheading text-sm uppercase tracking-wider">
              {menuLinks.map((link, idx) => (
                <div key={idx} className="border-b pb-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      onNavigate('home');
                    }}
                    className="font-medium hover:opacity-75 block"
                  >
                    {link.title}
                  </a>
                  {link.children && (
                    <div className="pl-4 mt-2 space-y-1 text-xs opacity-80 font-normal">
                      {link.children.map((child, cIdx) => (
                        <a
                          key={cIdx}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileMenuOpen(false);
                            onNavigate('home');
                          }}
                          className="block py-1 hover:underline"
                        >
                          {child}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};
