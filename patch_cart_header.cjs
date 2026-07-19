const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf-8');

// Replace header
const oldHeader = `        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: \`\${settings.colorText}1a\` }}>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 opacity-75" />
            <span className="font-heading italic text-lg font-medium">Your Bag</span>
          </div>
          <button onClick={onClose} aria-label="Close Shopping Bag">
            <X className="w-5 h-5 hover:opacity-75" />
          </button>
        </div>`;

const newHeader = `        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-sans font-bold text-3xl text-stone-900">Cart</h2>
          <button onClick={onClose} aria-label="Close Shopping Bag" className="text-gray-400 hover:text-stone-900 transition">
            <X className="w-8 h-8 stroke-[1.5]" />
          </button>
        </div>`;

code = code.replace(oldHeader, newHeader);

// Adjust background of the Cart Drawer to white to match the screenshot
code = code.replace(
  `style={{
          backgroundColor: settings.colorBg,
          color: settings.colorText,
        }}`,
  `style={{
          backgroundColor: '#ffffff',
          color: '#1c1917',
        }}`
);

fs.writeFileSync('src/components/CartDrawer.tsx', code);
