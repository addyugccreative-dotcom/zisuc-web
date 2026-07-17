import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Check, ThumbsUp, Sparkles, Truck, ShieldCheck, Heart } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'products' | 'ingredients' | 'orders';
  question: string;
  answer: string;
  helpfulCount: number;
}

interface FaqSectionProps {
  onOpenChat?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenChat }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'products' | 'ingredients' | 'orders'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [votedIds, setVotedIds] = useState<{ [key: string]: boolean }>({});

  const initialFaqs: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'products',
      question: "What is the best way to use the E-BAP Powder Cleanser?",
      answer: "Since E-BAP is a water-activated enzyme powder cleanser, begin by thoroughly wetting your hands and face. Dispense a dime-sized amount of powder onto wet palms. Rub your hands together with lukewarm water to create a rich, dense micro-foam. Gently massage this foam onto your face in circular motions, focusing on areas with excess sebum or dry patches. Rinse completely with lukewarm water. It is safe, sub-acidic, and perfectly balanced for daily morning and evening use.",
      helpfulCount: 142
    },
    {
      id: 'faq-2',
      category: 'products',
      question: "How does the Galachione Ampoule Pad target hyperpigmentation?",
      answer: "Our Galachione Ampoule Pad combines the refining power of Galactomyces Ferment Filtrate with the brightening benefits of Glutathione and Niacinamide. This trio works synergistically to block melanin transfer, soothe redness, and fade stubborn sunspots. The dual-sided pure cotton pad lets you exfoliate gently with the embossed side, then flip to the smooth side and leave on cheeks or forehead for 3–5 minutes as a targeted, hyper-concentrated brightening mask.",
      helpfulCount: 204
    },
    {
      id: 'faq-3',
      category: 'products',
      question: "Is Kira 60 C-Tide Cream suitable for acne-prone or oily skin types?",
      answer: "Yes, absolutely. While Kira 60 is deeply repairing, it is formulated as a lightweight gel-cream that sinks instantly into the skin without leaving a greasy residue. The 60% Centella Asiatica Extract immediately calms inflammation and redness, while the Marine Peptide Complex (C-Tide) repairs the lipid barrier without clogging pores (non-comedogenic). It provides the exact hydration balance needed to prevent rebound oiliness.",
      helpfulCount: 95
    },
    {
      id: 'faq-4',
      category: 'ingredients',
      question: "What are the core active ingredients inside ZISU'C skincare?",
      answer: "Our formulas center around high-efficacy, bio-compatible actives: Galactomyces (wild yeast ferment for skin glassiness), Glutathione (the mother of antioxidants for dark spots), Cicasome (encapsulated Centella to penetrate deep into skin layers), Bakuchiol (a gentle, plant-derived retinol alternative for fine lines), and Borfillin (to plump and smooth wrinkles naturally). We omit synthetic fragrances, parabens, and sulfates.",
      helpfulCount: 167
    },
    {
      id: 'faq-5',
      category: 'ingredients',
      question: "Can I layer the Galachione Pads with Retinol or Vitamin C?",
      answer: "Yes. Because our Galachione pads use stable Glutathione and fermented Galactomyces instead of highly acidic direct vitamin C, they do not cause irritation when layered with Retinol. However, we always recommend applying the Galachione pad during your morning routine to secure glowing protection, and reserving active Retinol or exfoliating acids for your night routine.",
      helpfulCount: 88
    },
    {
      id: 'faq-6',
      category: 'orders',
      question: "How long does shipping take and is international delivery available?",
      answer: "We offer worldwide express shipping. All orders within the United States are packed and shipped in 100% biodegradable materials, arriving in 2 to 5 business days. International delivery usually takes 5 to 10 business days depending on customs. We provide free shipping on all packages over $150, complete with real-time tracking numbers emailed immediately upon dispatch.",
      helpfulCount: 112
    },
    {
      id: 'faq-7',
      category: 'orders',
      question: "What is your return and satisfaction guarantee policy?",
      answer: "Your skin's happiness is our absolute priority. We offer an unconditional 30-day return policy. If a product does not agree with your skin or you are not completely satisfied with your results, simply contact our team to receive a pre-paid shipping label for a full refund or exchange—no awkward questions asked.",
      helpfulCount: 74
    }
  ];

  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (votedIds[id]) return;

    setVotedIds(prev => ({ ...prev, [id]: true }));
    setFaqs(prevFaqs => 
      prevFaqs.map(faq => 
        faq.id === id ? { ...faq, helpfulCount: faq.helpfulCount + 1 } : faq
      )
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-[#E5F2F2] py-16 md:py-24 relative overflow-hidden select-none" 
      id="faq-section"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Left Column */}
        <div className="w-full md:w-[35%] lg:w-[30%] flex flex-col items-start pt-2">
          <h2 className="font-sans font-semibold text-[36px] sm:text-[42px] md:text-[46px] text-[#1a1a1a] tracking-tight leading-[1.05] mb-5">
            Still have<br />questions?
          </h2>
          <p className="font-sans text-[13px] sm:text-[14px] text-stone-700 leading-relaxed mb-8 max-w-[280px]">
            Our team is here to answer all your questions about our products.
          </p>

          {/* Contact Card */}
          <div className="w-full bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-7 shadow-sm">
            <h3 className="font-sans text-[15px] sm:text-base text-stone-900 mb-3">Need help?</h3>
            <p className="font-sans text-[12px] sm:text-[13px] text-stone-600 leading-relaxed mb-6">
              Visit our help center, or contact our team Monday to Friday, 9am to 6pm.
            </p>
            <button 
              onClick={onOpenChat}
              className="w-full py-3 rounded-full border border-stone-200 bg-white font-sans text-[14px] text-stone-800 hover:bg-stone-50 transition-colors shadow-sm cursor-pointer"
            >
              Contact us
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[65%] lg:w-[70%] flex flex-col pt-4">
          {/* Dynamic Tabs Filters */}
          <div className="flex flex-nowrap overflow-x-auto select-none gap-2 mb-8 md:mb-10 font-sans text-[13px] w-full pb-2 hide-scrollbar">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'products', label: 'Product' },
              { id: 'ingredients', label: 'Ingredients' },
              { id: 'orders', label: 'General' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id as any); setExpandedId(null); }}
                className={`relative px-5 py-1.5 rounded-full overflow-hidden transition cursor-pointer border shrink-0 ${
                  activeCategory === cat.id
                    ? 'border-transparent text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border-transparent'
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-[#1A1A1A] z-0 origin-left"
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col"
              >
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => {
                    const isExpanded = expandedId === faq.id;
                    
                    return (
                    <motion.div
                      key={faq.id}
                      layout
                      className="border-b border-stone-200/50 overflow-hidden"
                    >
                      {/* Header trigger */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(faq.id)}
                        className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors hover:text-stone-600"
                      >
                        <span className="font-sans text-[14px] sm:text-[15px] text-[#1a1a1a] font-normal leading-snug">
                          {faq.question}
                        </span>
                        <div className="shrink-0 flex items-center justify-center transition-transform">
                          {isExpanded ? (
                            <span className="text-stone-500 text-xl font-light leading-none">−</span>
                          ) : (
                            <span className="text-stone-500 text-xl font-light leading-none">+</span>
                          )}
                        </div>
                      </button>

                      {/* Content pane with framer motion height */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-6 pt-1 space-y-4 pr-8">
                              <p className="text-[13px] sm:text-[14px] text-stone-600 leading-relaxed font-sans">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <p className="text-stone-500 font-sans text-[14px]">No questions found matching your criteria.</p>
                </motion.div>
              )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
