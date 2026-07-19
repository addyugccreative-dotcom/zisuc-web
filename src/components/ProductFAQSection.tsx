import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  id: string;
  category: 'Product' | 'Ingredients' | 'General';
  question: string;
  answer: React.ReactNode;
}

const getProductFAQs = (product: Product): FAQ[] => {
  const isKiraCream = product.id === 'kira-60-c-tide-cream' || product.title.toLowerCase().includes('cream');
  const isEbap = product.title.toLowerCase().includes('e-bap') || product.title.toLowerCase().includes('cleanser');
  const isGalachione = product.title.toLowerCase().includes('galachione');
  const isCica = product.title.toLowerCase().includes('cica');
  const isSerum = product.title.toLowerCase().includes('serum');
  const isMist = product.title.toLowerCase().includes('mist');
  
  const generalFAQs: FAQ[] = [
    {
      id: 'g1',
      category: 'General',
      question: 'How long does shipping take and is international delivery available?',
      answer: 'Standard shipping within the US takes 3-5 business days. We also offer expedited 2-day shipping. International delivery is currently available to select countries, usually taking 7-14 business days depending on customs.'
    },
    {
      id: 'g2',
      category: 'General',
      question: 'What is your return and satisfaction guarantee policy?',
      answer: 'We offer a 30-day money-back guarantee. If you are not completely satisfied with your ZISU\'C purchase, you can return gently used products within 30 days for a full refund, no questions asked.'
    }
  ];

  let productFAQs: FAQ[] = [];

  if (isKiraCream) {
    productFAQs = [
      {
        id: 'p1',
        category: 'Product',
        question: 'Is Kira 60˚ C-Tide Cream suitable for acne-prone or oily skin types?',
        answer: 'Yes, despite its deeply nourishing texture, it is non-comedogenic and formulated to absorb seamlessly without leaving a greasy residue, making it suitable for all skin types, including acne-prone skin.'
      },
      {
        id: 'p2',
        category: 'Product',
        question: 'Can I use this cream under makeup?',
        answer: 'Absolutely. It serves as an excellent makeup primer by plumping the skin and creating a smooth, hydrated canvas that helps makeup glide on beautifully and last longer.'
      },
      {
        id: 'i1',
        category: 'Ingredients',
        question: 'What makes the C-Tide complex different from regular peptides?',
        answer: 'Our proprietary C-Tide complex utilizes advanced encapsulation technology to ensure deeper penetration and superior stability, maximizing collagen-boosting benefits compared to standard free peptides.'
      }
    ];
  } else if (isEbap) {
    productFAQs = [
      {
        id: 'p1',
        category: 'Product',
        question: 'What is the best way to use the E-BAP Powder Cleanser?',
        answer: 'Dispense a dime-sized amount of powder into wet hands. Rub hands together to create a rich, creamy lather, then massage onto your face in circular motions. Rinse thoroughly with lukewarm water.'
      },
      {
        id: 'p2',
        category: 'Product',
        question: 'Is it gentle enough for daily use?',
        answer: 'Yes, the enzyme-based formula provides a mild, non-abrasive exfoliation that is safe and beneficial for daily use, even for sensitive skin.'
      },
      {
        id: 'i1',
        category: 'Ingredients',
        question: 'What enzymes are used in the powder?',
        answer: 'We use a blend of papaya and pineapple-derived enzymes (Papain and Bromelain) that naturally dissolve dead skin cells without the need for harsh physical scrubbing.'
      }
    ];
  } else if (isGalachione) {
    productFAQs = [
      {
        id: 'p1',
        category: 'Product',
        question: 'How does the Galachione Ampoule Pad target hyperpigmentation?',
        answer: 'It combines high-concentration Galactomyces ferment filtrate with Glutathione to visibly brighten the skin tone, inhibit melanin transfer, and gently fade dark spots over time.'
      },
      {
        id: 'p2',
        category: 'Product',
        question: 'Can I layer the Galachione Pads with Retinol or Vitamin C?',
        answer: 'We recommend using the pads in the morning (paired with Vitamin C for an antioxidant boost) and keeping Retinol for your nighttime routine to prevent over-sensitizing the skin.'
      },
      {
        id: 'i1',
        category: 'Ingredients',
        question: 'Are the pads biodegradable?',
        answer: 'Yes, our pads are made from 100% pure, unbleached cotton which is fully biodegradable and gentle on the environment.'
      }
    ];
  } else if (isCica) {
    productFAQs = [
      {
        id: 'p1',
        category: 'Product',
        question: 'How does the Cica Pin Cell Skin Trigger work?',
        answer: 'It uses microscopic, bio-soluble microneedles that create tiny pathways in the skin, allowing the concentrated Cica (Centella Asiatica) serum to penetrate deeper for enhanced soothing and repair.'
      },
      {
        id: 'p2',
        category: 'Product',
        question: 'Does it hurt to apply?',
        answer: 'You may feel a slight, temporary tingling or mild prickly sensation upon application, which is completely normal and indicates the micro-pins are working. It should not be painful.'
      }
    ];
  } else if (isSerum) {
    productFAQs = [
      {
        id: 'p1',
        category: 'Product',
        question: 'When should I apply the Kira 60˚ C-Tide Serum in my routine?',
        answer: 'Apply it after cleansing and toning, but before your moisturizer. For best results, use it both morning and night.'
      },
      {
        id: 'i1',
        category: 'Ingredients',
        question: 'Does the serum contain artificial fragrances?',
        answer: 'No, all ZISU\'C products are completely free of artificial fragrances and dyes. Any subtle scent comes naturally from the botanical extracts.'
      }
    ];
  } else {
    productFAQs = [
      {
        id: 'p1',
        category: 'Product',
        question: 'What are the core active ingredients inside ZISU\'C skincare?',
        answer: 'Our core philosophy centers on potent botanical exosomes, advanced biomimetic peptides, and bio-ferments designed to support the skin\'s natural barrier and cellular energy.'
      },
      {
        id: 'p2',
        category: 'Product',
        question: 'Are your products cruelty-free?',
        answer: 'Yes, all ZISU\'C products are 100% cruelty-free. We never test on animals, nor do we ask third parties to test on our behalf.'
      }
    ];
  }

  return [...productFAQs, ...generalFAQs];
};

export const ProductFAQSection: React.FC<{ product: Product }> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'All Questions' | 'Product' | 'Ingredients' | 'General'>('All Questions');
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs = getProductFAQs(product);
  
  const filteredFaqs = activeTab === 'All Questions' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeTab);

  const tabs = ['All Questions', 'Product', 'Ingredients', 'General'];

  return (
    <section className="w-full bg-[#EBF3F3] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-medium text-stone-900 tracking-tight leading-[1.1] mb-4">
              Still have<br />questions?
            </h2>
            <p className="text-stone-600 text-[15px] sm:text-[17px] leading-relaxed mb-10 max-w-sm">
              Our team is here to answer all your questions about our products.
            </p>

            <div className="bg-white rounded-[24px] p-8 w-full max-w-[340px] shadow-sm">
              <h3 className="text-[19px] font-medium text-stone-900 mb-4">Need help?</h3>
              <p className="text-stone-500 text-[14px] leading-relaxed mb-8">
                Visit our help center, or contact our team Monday to Friday, 9am to 6pm.
              </p>
              <button className="w-full py-3 px-6 rounded-full border border-stone-200 text-stone-900 font-medium text-[14px] hover:bg-stone-50 transition-colors">
                Contact us
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-5 py-2 rounded-full text-[14px] font-medium transition-colors ${
                    activeTab === tab 
                      ? 'bg-stone-900 text-white' 
                      : 'bg-white text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="border-t border-stone-200/60">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="border-b border-stone-200/60">
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <span className="text-[16px] sm:text-[17px] text-stone-800 pr-8 group-hover:text-stone-900 transition-colors">
                      {faq.question}
                    </span>
                    <span className="text-stone-400 shrink-0">
                      {openId === faq.id ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-8 text-stone-500 text-[14px] sm:text-[15px] leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
