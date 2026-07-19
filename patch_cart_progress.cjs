const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf-8');

code = code.replace(
  `<div className="border-b px-4 py-2.5 flex flex-col pb-3" style={{ backgroundColor: \`\${settings.colorAccent}33\`, borderColor: \`\${settings.colorText}11\` }}>`,
  `<div className="px-6 pt-4 pb-2 flex flex-col text-center">`
);

fs.writeFileSync('src/components/CartDrawer.tsx', code);
