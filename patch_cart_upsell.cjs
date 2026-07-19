const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf-8');

code = code.replace(
  `className="relative overflow-hidden h-8 px-4 text-[10px] uppercase font-bold tracking-wider rounded transition flex items-center justify-center shrink-0 shadow-sm hover:scale-105 active:scale-95"
                        style={{ backgroundColor: settings.colorButton, color: settings.colorButtonText }}`,
  `className="relative overflow-hidden h-8 px-5 text-sm font-bold tracking-wide rounded-full transition flex items-center justify-center shrink-0 shadow-sm hover:scale-105 active:scale-95 bg-[#00c4ba] text-white"`
);

// We should also replace the styling of Shipping protection to match EXACTLY
// shipping protection text is not green, only the price is green and checkbox is cyan.

fs.writeFileSync('src/components/CartDrawer.tsx', code);
