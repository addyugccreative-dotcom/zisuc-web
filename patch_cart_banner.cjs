const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf-8');

const oldBanner = `            <div className="flex items-center justify-center bg-orange-50 text-orange-800 text-[10px] font-medium py-1 px-3 rounded mb-2.5 border border-orange-100">
              ⏳ Items in your cart are in high demand — reserved for 15 minutes
            </div>`;

code = code.replace(oldBanner, '');

fs.writeFileSync('src/components/CartDrawer.tsx', code);
