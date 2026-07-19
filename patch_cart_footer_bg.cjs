const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf-8');

code = code.replace(
  `          <div className="border-t p-4 bg-white/40 flex flex-col shrink-0" style={{ borderColor: \`\${settings.colorText}1a\` }}>`,
  `          <div className="border-t border-gray-200 p-6 bg-white flex flex-col shrink-0">`
);

fs.writeFileSync('src/components/CartDrawer.tsx', code);
