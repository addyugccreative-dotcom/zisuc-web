const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf-8');

code = code.replace("import { X, Trash2, Plus, Minus, ShoppingBag, Loader2, Check } from 'lucide-react';", "import { X, Trash2, Plus, Minus, ShoppingBag, Loader2, Check, Truck, Gift, Box, ShieldCheck } from 'lucide-react';");

code = code.replace(/const TIERS = \[[\s\S]*?\];/, `const TIERS = [
  { 
    threshold: 150, 
    label: "Free Shipping", 
    shortLabel: "Free Shipping", 
    icon: Truck, 
    toastLabel: "🎉 You've unlocked Free Global Shipping!" 
  },
  { 
    threshold: 182, 
    label: "Cosmetic Bag", 
    shortLabel: "Cosmetic Bag", 
    icon: ShoppingBag, 
    toastLabel: "🎉 You've unlocked a Free Cosmetic Bag!" 
  },
  { 
    threshold: 232, 
    label: "Gift Box", 
    shortLabel: "Gift Box", 
    icon: Gift, 
    toastLabel: "🎉 You've unlocked a Free Gift Box!" 
  }
];`);

fs.writeFileSync('src/components/CartDrawer.tsx', code);
