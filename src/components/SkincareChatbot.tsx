import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, X, Send, Sparkles, User, RefreshCw, ChevronRight, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { mockProducts } from '../products-data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isInitialCategory?: boolean;
}

interface SkincareChatbotProps {
  themeColor: string;
  products?: Product[];
  onAddToCart?: (product: Product, quantity: number, colorIdx: number) => void;
  currentCurrency?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

// Randomized high-quality fallback answers to ensure replies are always different and feel organic
const RECOMMENDATION_REPLIES = [
  "That sounds like a great skincare goal! 🧴 For amazing results, I highly recommend exploring our signature **Kira 60 C-Tide Cream** to nourish the skin, or the **Galachione Ampoule Pad** to instantly sweep away dullness. Both work wonderfully for all skin types! Would you like details on ingredients?",
  "I'd love to help you find the perfect match for your skin! ✨ To get started, I highly suggest trying our **E-BAP Powder Cleanser** for gentle, pH-balanced enzyme exfoliation, or the **Kira 60 C-Tide Serum** to deeply soothe and calm any irritation. Which skin concern would you like to target first?",
  "Wonderful choice! To give your skin a vibrant, bouncy look, you can't go wrong with our **Glow Boost Vitamin C Brightening Serum** to fade dark spots, or the **Cloud Whip Barrier Repair Moisturizer** to replenish deep hydration. What is your primary skin concern today?"
];

const SHIPPING_REPLIES = [
  "Certainly! 📦 Our packages ship out within 2 business days. If you've placed an order, please search your inbox for support@zisuc.com to retrieve your live tracking link. You can also message our friendly support team right here!",
  "I can certainly check order policies for you! 📦 Generally, priority orders arrive in 2-3 business days, while standard domestic delivery takes 5-7 business days. Do you have an order number I can help look up?",
  "No problem at all! 🗺️ Once your package leaves our warehouse, an email with your USPS or DHL tracking link is sent automatically. If you haven't received it, let me know and we will check our system right away."
];

const RETURN_REPLIES = [
  "No worries at all! ↩️ We offer a generous 30-day return window for unused and unopened products. Please drop our support team an email at support@zisuc.com, and they'll send you a prepaid return shipping label right away!",
  "Starting a return is super simple! 📋 As long as your product is in its original packaging and was delivered within the last 30 days, we've got you covered. Would you like to know more about our refund process?",
  "We want you to love your skincare routine! 🌸 If something didn't work out, email us at support@zisuc.com with your order number. We'll arrange a return or a product swap to find something that suits your skin better!"
];

const GENERAL_REPLIES = [
  "I would be happy to help you with that! ✨ Let me share some information: we always formulate with pure Centella, Marine Peptides, and active botanical ingredients to ensure healthy, glowing skin without any irritation. What other questions can I answer for you?",
  "I'm here to guide you every step of the way! 🌿 Did you know all of our formulations are 100% vegan, cruelty-free, and crafted in small batches for peak potency? Let me know what you're looking for, and I'll find the perfect solution!",
  "That is an excellent question! ✨ Our products are specifically designed to be layered together harmoniously. Is there a specific product from our lineup you'd like to learn more about?"
];

// Helper to get a random item from array
const getRandomItem = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Helper to scan chatbot text for any recommended products and return them
const getRecommendedProductsInMessage = (content: string, availableProducts: Product[]): Product[] => {
  if (!content) return [];
  const text = content.toLowerCase();
  
  const found: Product[] = [];
  availableProducts.forEach(prod => {
    const titleLower = prod.title.toLowerCase();
    const cleanTitle = titleLower.replace(/['’‘°\s\-\u00cb\u009a]/g, '');
    const cleanText = text.replace(/['’‘°\s\-\u00cb\u009a]/g, '');
    
    if (cleanText.includes(cleanTitle) || text.includes(prod.id)) {
      found.push(prod);
      return;
    }
    
    // Check specific tags or key tokens to find matches reliably
    if (prod.id === "e-bap-powder-cleanser" && (text.includes("e-bap") || text.includes("powder cleanser") || text.includes("papain") || text.includes("cleanser"))) {
      found.push(prod);
      return;
    }
    if (prod.id === "kira-60-c-tide-cream" && (text.includes("c-tide cream") || text.includes("kira cream") || text.includes("barrier cream"))) {
      found.push(prod);
      return;
    }
    if (prod.id === "kira-60-c-tide-serum" && (text.includes("c-tide serum") || text.includes("kira serum"))) {
      found.push(prod);
      return;
    }
    if (prod.id === "galachione-ampoule-pad" && (text.includes("galachione") || text.includes("ampoule pad") || text.includes("toner pad") || text.includes("pads"))) {
      found.push(prod);
      return;
    }
    if (prod.id === "cica-pin-cell-skin-trigger" && (text.includes("skin trigger") || text.includes("pin cell") || text.includes("microneedle"))) {
      found.push(prod);
      return;
    }
    if (prod.id === "volume-shot-eye-cream" && (text.includes("eye cream") || text.includes("volume shot"))) {
      found.push(prod);
      return;
    }
    if (prod.id === "super-retinol-vitamin-a" && (text.includes("super retinol") || text.includes("retinol complex") || text.includes("retinal"))) {
      found.push(prod);
      return;
    }
    if (prod.id === "glow-boost-vitamin-c" && (text.includes("glow boost") || text.includes("vitamin c") || text.includes("ferulic"))) {
      found.push(prod);
      return;
    }
    if (prod.id === "peaches-peptide-serum" && (text.includes("peaches peptide") || text.includes("collagen peptide") || text.includes("face lift serum"))) {
      found.push(prod);
      return;
    }
    if (prod.id === "cloud-whip-barrier-repair" && (text.includes("cloud whip") || text.includes("barrier repair") || text.includes("oat flour"))) {
      found.push(prod);
      return;
    }
  });
  
  // Deduplicate and return max 2 recommendations
  return Array.from(new Set(found)).slice(0, 2);
};

// Extractor to find product recommendations or return options from the chatbot response text
const extractQuickRepliesFromText = (text: string, availableProducts: Product[]): string[] => {
  const suggestions: string[] = [];
  const textLower = text.toLowerCase();
  
  // Look for specific product names mentioned in the text
  availableProducts.forEach(prod => {
    const titleLower = prod.title.toLowerCase();
    if (textLower.includes(titleLower) || textLower.includes(prod.id.replace(/-/g, ' '))) {
      suggestions.push(`${prod.title} 🧴`);
    }
  });
  
  if (textLower.includes("return") || textLower.includes("refund")) {
    suggestions.push("Start return ↩️");
    suggestions.push("Return policy 📋");
  }
  
  if (textLower.includes("track") || textLower.includes("ship") || textLower.includes("order")) {
    suggestions.push("Track order 🗺️");
    suggestions.push("Shipping times ✈️");
  }

  // If the assistant is asking about dry, oily, or sensitive skin types
  if (textLower.includes("skin type") || textLower.includes("dry, oily") || textLower.includes("dry skin") || textLower.includes("sensitive skin") || textLower.includes("match for your skin")) {
    suggestions.push("Dry Skin 🌵");
    suggestions.push("Oily/Acne Skin 🧴");
    suggestions.push("Sensitive Skin 🌸");
    suggestions.push("Normal/Combo ✨");
  } else if (textLower.includes("dryness") || textLower.includes("flak")) {
    suggestions.push("Dryness & Flaking 🌵");
    suggestions.push("Barrier repair 🛡️");
  } else if (textLower.includes("dull") || textLower.includes("dark spots") || textLower.includes("bright")) {
    suggestions.push("Dullness & Spots 🌟");
    suggestions.push("Brightening 🌟");
  } else if (textLower.includes("pore") || textLower.includes("texture") || textLower.includes("bumpy")) {
    suggestions.push("Pores & Shine 🧼");
    suggestions.push("Bumpy texture ✨");
  } else if (textLower.includes("redness") || textLower.includes("irritat")) {
    suggestions.push("Redness & Irritation 🌿");
    suggestions.push("Barrier repair 🛡️");
  } else if (textLower.includes("aging") || textLower.includes("wrinkle") || textLower.includes("line")) {
    suggestions.push("Anti-aging ⏳");
    suggestions.push("Firmness & Lift 🍑");
  }

  // Fallback if no specific skin options match but it is about recommendation
  if (suggestions.length === 0 && (textLower.includes("recommend") || textLower.includes("routine") || textLower.includes("type"))) {
    suggestions.push("Dry Skin 🌵");
    suggestions.push("Oily/Acne Skin 🧴");
    suggestions.push("Sensitive Skin 🌸");
    suggestions.push("Normal/Combo ✨");
  }
  
  suggestions.push("Main Menu ↩️");
  
  // Return unique, up to 5 suggestions
  return Array.from(new Set(suggestions)).slice(0, 5);
};

export const SkincareChatbot: React.FC<SkincareChatbotProps> = ({ 
  themeColor,
  products = mockProducts,
  onAddToCart,
  currentCurrency = 'USD',
  isOpen: isOpenProp,
  onOpenChange
}) => {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenInternal;
  
  const setIsOpen = (val: boolean) => {
    if (onOpenChange) {
      onOpenChange(val);
    }
    setIsOpenInternal(val);
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasChosenCategory, setHasChosenCategory] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [addedProductIds, setAddedProductIds] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialCategories = [
    { id: 'order_shipping', label: '📦 Order & Shipping' },
    { id: 'product_recommendation', label: '🧴 Product Recommendation' },
    { id: 'returns_refunds', label: '↩️ Returns & Refunds' },
    { id: 'something_else', label: '❓ Something else' }
  ];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  // Sync initialization of messages when isOpen changes from outside
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hi, I'm Kira, your ZISU'C Skincare & Support Assistant! ✨ How can I help you today? Please choose a topic below or type your message directly.",
          timestamp: new Date()
        }
      ]);
      setHasChosenCategory(false);
      setQuickReplies([]);
    }
  }, [isOpen]);

  // Reset chat / initialize Kira
  const handleOpenChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hi, I'm Kira, your ZISU'C Skincare & Support Assistant! ✨ How can I help you today? Please choose a topic below or type your message directly.",
          timestamp: new Date()
        }
      ]);
      setHasChosenCategory(false);
      setQuickReplies([]);
    }
  };

  // Unified Handler for Clicks (Initial Categories and Sub-options)
  const handleQuickReplyClick = async (categoryLabel: string) => {
    setHasChosenCategory(true);
    
    // 1. Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      role: 'user',
      content: categoryLabel,
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Dynamic state machine to suggest relevant buttons right above the input
    if (categoryLabel.includes("Product Recommendation")) {
      setQuickReplies(["Dry Skin 🌵", "Oily/Acne Skin 🧴", "Sensitive Skin 🌸", "Normal/Combo ✨", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Order & Shipping")) {
      setQuickReplies(["Track order 🗺️", "Shipping times ✈️", "Talk to team 💌", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Returns & Refunds")) {
      setQuickReplies(["Start return ↩️", "Return policy 📋", "Damaged item 📦", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Something else")) {
      setQuickReplies(["Apply steps 🧴", "Ingredients 🌿", "Talk to team 💌", "Main Menu ↩️"]);
    } 
    // Skin type selections
    else if (categoryLabel.includes("Dry Skin 🌵")) {
      setQuickReplies(["Dryness & Flaking 🌵", "Dullness & Spots 🌟", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Oily/Acne Skin 🧴")) {
      setQuickReplies(["Pores & Shine 🧼", "Bumpy texture ✨", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Sensitive Skin 🌸")) {
      setQuickReplies(["Redness & Irritation 🌿", "Barrier repair 🛡️", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Normal/Combo ✨")) {
      setQuickReplies(["Brightening 🌟", "Anti-aging ⏳", "Main Menu ↩️"]);
    }
    // Deep Sub-level selections
    else if (["Dryness & Flaking 🌵", "Barrier repair 🛡️"].includes(categoryLabel)) {
      setQuickReplies(["Kira 60 C-Tide Cream 🧴", "E-BAP Powder Cleanser 🧼", "Cloud Whip Moisturizer ☁️", "Main Menu ↩️"]);
    } else if (["Dullness & Spots 🌟", "Brightening 🌟"].includes(categoryLabel)) {
      setQuickReplies(["Galachione Ampoule Pad 🌟", "Glow Boost Vitamin C Serum 🍊", "Main Menu ↩️"]);
    } else if (["Pores & Shine 🧼", "Bumpy texture ✨"].includes(categoryLabel)) {
      setQuickReplies(["Cica Pin Cell Skin Trigger 📌", "Pore-Refining AHA BHA 🧼", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Redness & Irritation 🌿")) {
      setQuickReplies(["Kira 60 C-Tide Serum 🌿", "Kira 60 C-Tide Multi Mist 💦", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Anti-aging ⏳")) {
      setQuickReplies(["Super Retinol Serum ⏳", "Peaches Peptide Serum 🍑", "Volume Shot Eye Cream 👀", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Start return ↩️")) {
      setQuickReplies(["My item is unused 📦", "My item is used/opened 🧴", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Track order 🗺️")) {
      setQuickReplies(["Track shipment 📦", "Talk to team 💌", "Main Menu ↩️"]);
    } else if (categoryLabel.includes("Main Menu ↩️")) {
      handleResetChat();
      return;
    } else {
      // General transition suggestions
      setQuickReplies(["Ask about ingredients 🌿", "Talk to team 💌", "Main Menu ↩️"]);
    }

    try {
      const payloadMessages = updatedMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: payloadMessages })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages(prev => [...prev, {
          id: Math.random().toString(),
          role: 'assistant',
          content: data.text,
          timestamp: new Date()
        }]);
        // Also parse dynamic recommendations and suggest buttons
        const suggestions = extractQuickRepliesFromText(data.text, products);
        if (suggestions.length > 1) {
          setQuickReplies(suggestions);
        }
      } else {
        throw new Error(data.error || "No response text");
      }
    } catch (err: any) {
      console.error(err);
      // Friendly, non-repetitive brand-aligned fallback response
      let fallbackText = getRandomItem(GENERAL_REPLIES);
      if (categoryLabel.includes("Recommendation") || categoryLabel.includes("Skin") || categoryLabel.includes("Dry") || categoryLabel.includes("Oily") || categoryLabel.includes("Sensitive") || categoryLabel.includes("Normal")) {
        fallbackText = getRandomItem(RECOMMENDATION_REPLIES);
      } else if (categoryLabel.includes("Order") || categoryLabel.includes("Track") || categoryLabel.includes("Ship")) {
        fallbackText = getRandomItem(SHIPPING_REPLIES);
      } else if (categoryLabel.includes("Returns") || categoryLabel.includes("return") || categoryLabel.includes("Refund")) {
        fallbackText = getRandomItem(RETURN_REPLIES);
      }
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: 'assistant',
        content: fallbackText,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setHasChosenCategory(true);

    // Suggest general context options above input after user types
    setQuickReplies(["Dry Skin 🌵", "Track order 🗺️", "Returns & Refunds ↩️", "Main Menu ↩️"]);

    // Add user message to state
    const userMsg: Message = {
      id: Math.random().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Map messages array to what backend expects
      const payloadMessages = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: payloadMessages })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages(prev => [...prev, {
          id: Math.random().toString(),
          role: 'assistant',
          content: data.text,
          timestamp: new Date()
        }]);
        // Extract options dynamically to make chat extremely easy
        const suggestions = extractQuickRepliesFromText(data.text, products);
        if (suggestions.length > 1) {
          setQuickReplies(suggestions);
        }
      } else {
        throw new Error(data.error || "Failed to generate reply");
      }
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: 'assistant',
        content: `I'm here to help! ✨ ${getRandomItem(GENERAL_REPLIES)}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi, I'm Kira, your ZISU'C Skincare & Support Assistant! ✨ How can I help you today? Please choose a topic below to get started.",
        timestamp: new Date()
      }
    ]);
    setHasChosenCategory(false);
    setInputMessage('');
    setIsLoading(false);
    setQuickReplies([]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button - repositioned to left side, near bottom but above sticky add-to-cart */}
      <div className="fixed bottom-20 sm:bottom-24 left-3 sm:left-5 z-50">
        <motion.button
          id="chat-trigger-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenChat}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full shadow-lg flex items-center justify-center cursor-pointer text-white relative focus:outline-none"
          style={{ backgroundColor: themeColor }}
        >
          <Headphones className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 border border-white rounded-full animate-pulse" />
        </motion.button>
      </div>

      {/* Chat Window Popup - opens on the left side near the trigger */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-window-container"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-16 sm:bottom-20 left-3 sm:left-5 w-[92vw] sm:w-[380px] h-[520px] bg-[#FAF5F0] rounded-2xl shadow-2xl z-50 border border-stone-200/80 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div 
              className="px-4 py-3 text-white flex items-center justify-between shadow-sm shrink-0"
              style={{ backgroundColor: themeColor }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold font-sans text-sm tracking-wide">
                  Ki
                </div>
                <div>
                  <h3 className="font-bold font-sans text-[13.5px] leading-tight tracking-wide flex items-center gap-1">
                    Kira <Sparkles className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                  </h3>
                  <p className="text-[10px] text-white/80 leading-none">Skincare & Support Expert</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleResetChat} 
                  title="Reset conversation"
                  className="p-1.5 hover:bg-white/10 rounded-full transition cursor-pointer text-white"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 hover:bg-white/10 rounded-full transition cursor-pointer text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-stone-200">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="space-y-2"
                >
                  <div className={`flex gap-2 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {/* Left Avatar for Kira */}
                    {msg.role === 'assistant' && (
                      <div className="w-6.5 h-6.5 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center text-[10px] font-bold text-stone-700 shrink-0 self-end">
                        K
                      </div>
                    )}

                    <div className="flex flex-col max-w-[80%] gap-1">
                      <div
                        className={`px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed shadow-sm font-sans ${
                          msg.role === 'user'
                            ? 'bg-stone-800 text-white rounded-br-none'
                            : 'bg-white text-stone-800 rounded-bl-none border border-stone-200/50'
                        }`}
                      >
                        {msg.content}
                      </div>

                      {/* Render real product card if a product is recommended in the assistant's response */}
                      {msg.role === 'assistant' && (() => {
                        const recommended = getRecommendedProductsInMessage(msg.content, products);
                        if (recommended.length === 0) return null;
                        return (
                          <div className="mt-2 space-y-2 w-full">
                            {recommended.map((prod) => {
                              const isAdded = addedProductIds.includes(prod.id);
                              return (
                                <div 
                                  key={prod.id}
                                  className="bg-white border border-stone-200/60 rounded-xl p-2.5 flex gap-3 shadow-xs hover:shadow-sm transition-all duration-200"
                                >
                                  {/* Product Image */}
                                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0">
                                    <img 
                                      src={prod.images[0]} 
                                      alt={prod.title} 
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  {/* Product Details */}
                                  <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div>
                                      <h4 className="text-[12px] font-bold text-stone-800 truncate font-sans tracking-tight">
                                        {prod.title}
                                      </h4>
                                      <p className="text-[10px] text-stone-500 font-mono font-semibold mt-0.5">
                                        {prod.price}
                                      </p>
                                    </div>
                                    
                                    {/* Add to Cart button */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (onAddToCart) {
                                          onAddToCart(prod, 1, 0);
                                          setAddedProductIds(prev => [...prev, prod.id]);
                                          setTimeout(() => {
                                            setAddedProductIds(prev => prev.filter(id => id !== prod.id));
                                          }, 2500);
                                        }
                                      }}
                                      disabled={isAdded}
                                      className="mt-1.5 self-start px-3 py-1 text-[10px] font-bold tracking-wide rounded-full flex items-center gap-1.5 cursor-pointer select-none transition-all duration-200 focus:outline-none"
                                      style={{
                                        backgroundColor: isAdded ? '#10B981' : themeColor,
                                        color: '#ffffff'
                                      }}
                                    >
                                      {isAdded ? (
                                        <>
                                          <Check className="w-3 h-3 text-white" />
                                          <span>Added!</span>
                                        </>
                                      ) : (
                                        <>
                                          <ShoppingCart className="w-3 h-3 text-white" />
                                          <span>Add to Cart</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}

                      <span className="text-[8.5px] text-stone-400 self-end px-1 mt-0.5">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Right Avatar for User */}
                    {msg.role === 'user' && (
                      <div className="w-6.5 h-6.5 rounded-full bg-stone-700 flex items-center justify-center text-white shrink-0 self-end">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Initial Topic Selection Option Buttons */}
              {!hasChosenCategory && (
                <div className="flex flex-col gap-2 pt-2 pl-8 pr-4">
                  <span className="text-[10px] text-stone-500 font-semibold tracking-wider uppercase mb-1">Select a topic to start:</span>
                  {initialCategories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ x: 3, backgroundColor: '#ffffff' }}
                      onClick={() => handleQuickReplyClick(cat.label)}
                      className="w-full text-left bg-stone-50 hover:bg-white text-stone-700 text-[12px] font-medium py-2.5 px-3.5 rounded-xl border border-stone-200/80 hover:border-stone-300 shadow-sm transition flex items-center justify-between cursor-pointer focus:outline-none"
                    >
                      <span>{cat.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Typing Loader Indicator */}
              {isLoading && (
                <div className="flex gap-2 items-center text-stone-400 pl-8 py-1.5">
                  <div className="bg-white border border-stone-200/50 px-3.5 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies vertical list container */}
            {hasChosenCategory && quickReplies.length > 0 && (
              <div className="px-4 py-2.5 bg-[#F5EFE9] border-t border-stone-200/60 flex flex-col gap-1.5 shrink-0 max-h-[170px] overflow-y-auto scrollbar-thin scrollbar-thumb-stone-300">
                <span className="text-[9.5px] text-stone-500 font-bold tracking-wider uppercase mb-0.5">Please choose an option below:</span>
                <div className="flex flex-col gap-1.5">
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickReplyClick(reply)}
                      disabled={isLoading}
                      className="w-full text-left bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-700 text-[11.5px] font-medium py-2 px-3.5 rounded-xl border border-stone-200/80 hover:border-stone-300 shadow-xs cursor-pointer transition flex items-center justify-between focus:outline-none disabled:opacity-50"
                    >
                      <span className="truncate">{reply}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form Footer */}
            <form 
              onSubmit={handleSendMessage} 
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message to Kira..."
                disabled={isLoading}
                className="flex-1 bg-stone-50 border border-stone-200/80 rounded-full px-4 py-2 text-xs text-stone-850 focus:outline-none focus:ring-1 focus:ring-stone-400 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer transition focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                style={{ backgroundColor: themeColor }}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
