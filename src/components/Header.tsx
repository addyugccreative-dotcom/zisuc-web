import { ProfileModal } from "./ProfileModal";
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, X, ChevronDown } from 'lucide-react';
import { CustomizerSettings, CartItem } from '../types';
import { Currency, SUPPORTED_CURRENCIES } from '../lib/currency';
import { initAuth } from '../lib/firebase';

interface HeaderProps {
  settings: CustomizerSettings;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onNavigate: (page: 'home' | 'product' | 'about' | 'certificates' | 'contact' | 'partners', productId?: string) => void;
  isMobileView: boolean;
  activePage: 'home' | 'product' | 'about' | 'certificates' | 'contact' | 'partners';
  isNavVisible?: boolean;
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  cartItems,
  onOpenCart,
  onNavigate,
  isMobileView,
  activePage,
  isNavVisible = true,
  currentCurrency,
  onCurrencyChange,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [mobileCurrencyOpen, setMobileCurrencyOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const unsubscribe = initAuth(
      (firebaseUser, token) => {
        setUser({
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.displayName || 'User')}&background=random`,
          accessToken: token
        });
      },
      () => setUser(null)
    );
    return () => unsubscribe();
  }, []);

  const menuLinks = [
    { title: 'Home', action: () => onNavigate('home'), isActive: activePage === 'home' },
    { 
      title: 'Catalog', 
      action: () => {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById('bestsellers-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
      isActive: activePage === 'product'
    },
    { title: 'About us', action: () => onNavigate('about'), isActive: activePage === 'about' },
    { title: 'Certificates', action: () => onNavigate('certificates'), isActive: activePage === 'certificates' },
    { title: 'Contact', action: () => onNavigate('contact'), isActive: activePage === 'contact' },
    { title: 'Partners', action: () => onNavigate('partners'), isActive: activePage === 'partners' },
  ];

  return (
    <>
      <header
        className={`w-full border-b transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sticky top-0 z-50 select-none ${
          isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{
          backgroundColor: '#FCF9F5', // Soft luxury off-white cream from Image 1
          borderColor: '#e5e5e5',
          color: '#2D2926',
        }}
      >
        <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-4 relative min-h-[72px]">
          {/* Left section: Hamburger & Navigation links (Desktop) */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Hamburger Menu (Mobile/Desktop consistent as per Image 1) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 hover:opacity-75 transition-opacity flex flex-col gap-[4.5px] w-6 justify-center items-start cursor-pointer"
              aria-label="Open mobile menu"
            >
              <span className="h-[2px] w-5 bg-stone-900 block rounded-full" />
              <span className="h-[2px] w-3.5 bg-stone-900 block rounded-full" />
              <span className="h-[2px] w-4.5 bg-stone-900 block rounded-full" />
            </button>

            {/* Navigation links (Desktop - exactly like Image 1, capitalized, normal weight, elegant) */}
            <nav className="hidden lg:flex items-center space-x-6 text-[14px] font-medium tracking-wide">
              {menuLinks.map((link, idx) => (
                <a
                  key={idx}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    link.action();
                  }}
                  className={`py-1 relative transition-all duration-200 text-stone-850 hover:text-stone-950`}
                  style={{ fontWeight: link.isActive ? '600' : '500' }}
                >
                  <span className={link.isActive ? 'text-stone-950 font-semibold' : 'text-stone-700 font-medium'}>
                    {link.title}
                  </span>
                  {link.isActive && (
                    <span 
                      className="absolute bottom-[-18px] left-0 right-0 h-[2.5px] bg-[#2D2926] transition-all duration-300" 
                      style={{ transform: 'scaleX(1)' }}
                    />
                  )}
                </a>
              ))}
            </nav>
          </div>
 
          {/* Centered Brand Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center z-10 flex items-center justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="flex items-center justify-center select-none cursor-pointer"
            >
              <img decoding="async" loading="lazy" src="/zisuc  logo.png" alt="ZISU'C Logo" className="h-5 sm:h-6 md:h-8 w-auto object-contain" />
            </a>
          </div>
 
          {/* Right Action Menu Icons (Exactly like Image 1) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 md:space-x-4 select-none z-10">
            {/* Currency picker */}
            <div className="relative">
              <button 
                onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                className="hidden md:flex items-center gap-1 opacity-80 text-xs font-mono tracking-tight cursor-pointer hover:opacity-100 transition text-stone-800 bg-transparent border-none py-1.5 px-2 rounded-md hover:bg-stone-100/60"
                aria-label="Change currency"
              >
                <span>{currentCurrency.code} {currentCurrency.symbol}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${currencyMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {currencyMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setCurrencyMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-44 bg-white border border-stone-200 shadow-xl rounded-xl py-1.5 z-40 max-h-64 overflow-y-auto">
                    <p className="text-[10px] font-sans font-bold text-stone-400 px-3 py-1 uppercase tracking-wider border-b border-stone-100 mb-1">Select Currency</p>
                    {SUPPORTED_CURRENCIES.map((cur) => (
                      <button
                        key={cur.code}
                        onClick={() => {
                          onCurrencyChange(cur);
                          setCurrencyMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between transition hover:bg-stone-50 ${
                          currentCurrency.code === cur.code ? 'text-[#BE2A59] font-bold bg-stone-50/50' : 'text-stone-700'
                        }`}
                      >
                        <span>{cur.code} ({cur.symbol.trim()})</span>
                        {currentCurrency.code === cur.code && <span className="w-1.5 h-1.5 rounded-full bg-[#BE2A59]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
 
            {/* Clickable Search Icon */}
            <button 
              onClick={onOpenSearch}
              className="p-1.5 hover:opacity-75 active:scale-95 transition text-stone-855 cursor-pointer" 
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
 
            {/* Profile trigger */}
            <button onClick={() => setIsProfileOpen(true)} className="hidden sm:block p-1.5 hover:opacity-100 opacity-80 transition cursor-pointer text-stone-850" aria-label="Account profile">
              {user ? (
                <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover border border-stone-200" />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </button>
 
            {/* Cart Icon with badge (matching Image 1 exactly - solid dark circle badge) */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 hover:opacity-75 active:scale-95 transition text-stone-855"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <span
                className="absolute top-0 right-0 text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-sans font-bold bg-[#2D2926] text-white select-none pointer-events-none shadow-sm"
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
            className="fixed inset-0 bg-black/40 z-[100] transition-opacity animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="fixed inset-y-0 left-0 w-72 max-w-full z-[110] flex flex-col p-6 shadow-2xl transition-transform duration-300 bg-white"
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <img decoding="async" loading="lazy" src="/zisuc-logo.png" alt="ZISU'C Logo" className="h-6 w-auto object-contain" />
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                aria-label="Close Mobile Drawer"
                className="p-1 hover:bg-stone-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-5 py-6 font-sans text-sm uppercase tracking-wider text-left">
              {menuLinks.map((link, idx) => (
                <div key={idx} className="border-b border-stone-50 pb-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      link.action();
                    }}
                    className={`font-semibold tracking-wide hover:opacity-75 block text-xs ${link.isActive ? 'text-stone-950 border-l-2 border-stone-900 pl-2' : 'text-stone-600'}`}
                  >
                    {link.title}
                  </a>
                </div>
              ))}

              {/* Profile / My Account Option */}
              <div className="border-b border-stone-50 pb-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setIsProfileOpen(true);
                  }}
                  className="font-semibold tracking-wide hover:opacity-75 block text-xs text-stone-600 flex items-center gap-2"
                >
                  {user ? (
                    <>
                      <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover border border-stone-200" />
                      <span>{user.name} (Account)</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span>My Account</span>
                    </>
                  )}
                </a>
              </div>
            </nav>

            {/* Mobile Currency Selector inside drawer */}
            <div className="mt-4 pt-4 border-t border-stone-100 text-left">
              <button
                onClick={() => setMobileCurrencyOpen(!mobileCurrencyOpen)}
                className="w-full flex items-center justify-between text-xs font-mono font-bold text-stone-700 py-2 px-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 cursor-pointer"
              >
                <span>CURRENCY: {currentCurrency.code} ({currentCurrency.symbol.trim()})</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCurrencyOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileCurrencyOpen && (
                <div className="mt-2 grid grid-cols-2 gap-1.5 p-2 bg-stone-50/50 rounded-lg max-h-44 overflow-y-auto">
                  {SUPPORTED_CURRENCIES.map((cur) => (
                    <button
                      key={cur.code}
                      onClick={() => {
                        onCurrencyChange(cur);
                        setMobileCurrencyOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left px-2 py-1.5 text-[11px] font-mono rounded-md transition ${
                        currentCurrency.code === cur.code ? 'text-[#BE2A59] font-bold bg-white shadow-xs' : 'text-stone-600 hover:bg-stone-100/50'
                      }`}
                    >
                      {cur.code} {cur.symbol}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-auto pt-6 border-t border-stone-100 text-[10px] text-stone-400 font-mono text-center">
              &copy; {new Date().getFullYear()} ZISU'C Skincare
            </div>
          </div>
        </>
      )}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} onLogin={setUser} onLogout={() => setUser(null)} />
    </>
  );
};
