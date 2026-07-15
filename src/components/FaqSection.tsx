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

export const FaqSection: React.FC = () => {
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
    <section className="w-full bg-[#FAF8F5] py-20 md:py-24 border-t border-stone-200/40 relative overflow-hidden select-none" id="faq-section">
      {/* Structural Minimalist background assets */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-rose-50/20 via-amber-50/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-stone-100/30 via-stone-50/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#BE2A59] block">
            SKIN EDUCATION
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-4xl lg:text-5xl text-stone-900 uppercase tracking-widest leading-tight">
            FREQUENTLY ASKED
          </h2>
          <p className="font-serif italic text-stone-600 max-w-lg mx-auto text-sm sm:text-base">
            Detailed formulation insights, application guides, and order policies for our skin community.
          </p>
        </div>

        {/* Live Interactive Search and Filters Bar */}
        <div className="space-y-6 mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search formulation, ingredients or delivery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3.5 pl-11 pr-4 bg-white border border-stone-200/80 rounded-full text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-200 transition-all shadow-xs"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Dynamic Tabs Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <button
              onClick={() => { setActiveCategory('all'); setExpandedId(null); }}
              className={`px-4 py-2 rounded-full border transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-stone-900 border-stone-900 text-white font-semibold'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              ALL QUESTIONS
            </button>
            <button
              onClick={() => { setActiveCategory('products'); setExpandedId(null); }}
              className={`px-4 py-2 rounded-full border transition cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'products'
                  ? 'bg-stone-900 border-stone-900 text-white font-semibold'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#BE2A59]" />
              PRODUCTS & USE
            </button>
            <button
              onClick={() => { setActiveCategory('ingredients'); setExpandedId(null); }}
              className={`px-4 py-2 rounded-full border transition cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'ingredients'
                  ? 'bg-stone-900 border-stone-900 text-white font-semibold'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-stone-500 fill-stone-500" />
              INGREDIENTS
            </button>
            <button
              onClick={() => { setActiveCategory('orders'); setExpandedId(null); }}
              className={`px-4 py-2 rounded-full border transition cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'orders'
                  ? 'bg-stone-900 border-stone-900 text-white font-semibold'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-stone-500" />
              SHIPPING & RETURNS
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 min-h-[150px]">
          <AnimatePresence initial={false}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedId === faq.id;
                const hasVoted = votedIds[faq.id];
                
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:border-stone-300"
                  >
                    {/* Header trigger */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full px-5 py-4.5 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-stone-50/50 transition-colors"
                    >
                      <span className="font-heading font-medium text-stone-900 text-sm sm:text-base tracking-wide leading-snug">
                        {faq.question}
                      </span>
                      <div className="shrink-0 w-8 h-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-500 transition-transform">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-stone-800" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-500" />
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
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-stone-100 space-y-4">
                            <p className="text-xs sm:text-[14px] text-stone-600 leading-relaxed font-sans">
                              {faq.answer}
                            </p>

                            {/* Accordion Footer Interactive Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-stone-100/80 text-[11px] font-mono text-stone-400">
                              <div className="flex items-center gap-1.5">
                                <HelpCircle className="w-3.5 h-3.5 text-stone-300" />
                                <span>Updated: Today</span>
                              </div>

                              {/* Helpful counter button */}
                              <button
                                type="button"
                                onClick={(e) => handleVote(faq.id, e)}
                                disabled={hasVoted}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer active:scale-95 ${
                                  hasVoted
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                    : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-700'
                                }`}
                              >
                                {hasVoted ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-500" />
                                    <span>Helpful! ({faq.helpfulCount})</span>
                                  </>
                                ) : (
                                  <>
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>Was this helpful? ({faq.helpfulCount})</span>
                                  </>
                                )}
                              </button>
                            </div>
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
                className="text-center py-12 border border-dashed border-stone-200 rounded-2xl bg-white"
              >
                <HelpCircle className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h4 className="font-heading font-medium text-stone-800 text-sm">No match found</h4>
                <p className="text-xs text-stone-500 mt-1">Try searching for other words, e.g. "E-BAP" or "Galachione".</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security / trust badge */}
        <div className="mt-12 border-t border-stone-200/50 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-[#BE2A59]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h5 className="font-heading text-xs font-semibold text-stone-800 uppercase tracking-wider">Hypoallergenic</h5>
            <p className="text-[11px] text-stone-500 leading-relaxed">Formulated for ultra-sensitive skin types, dermatologically safe.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <h5 className="font-heading text-xs font-semibold text-stone-800 uppercase tracking-wider">Active Potency</h5>
            <p className="text-[11px] text-stone-500 leading-relaxed">High-percentage active botanicals for direct visible renewal.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
              <Truck className="w-5 h-5" />
            </div>
            <h5 className="font-heading text-xs font-semibold text-stone-800 uppercase tracking-wider">Eco Shipping</h5>
            <p className="text-[11px] text-stone-500 leading-relaxed">Free US & global shipping over $150 with glass-safe pack.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
