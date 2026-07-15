import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ArrowRight, RefreshCw, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { Currency, convertAndFormatPrice } from '../lib/currency';
import { mockProducts } from '../products-data';

interface SkinQuizSectionProps {
  activeCurrency: Currency;
  onAddToCart: (product: Product, quantity: number, colorIdx: number) => void;
  themeColor: string;
  products?: Product[];
}

export const SkinQuizSection: React.FC<SkinQuizSectionProps> = ({
  activeCurrency,
  onAddToCart,
  themeColor,
  products,
}) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Quiz answers state
  const [skinType, setSkinType] = useState<string | null>(null);
  const [skinConcern, setSkinConcern] = useState<string | null>(null);
  const [texturePref, setTexturePref] = useState<string | null>(null);
  
  // Results recommendation
  const [recommendation, setRecommendation] = useState<Product | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const startQuiz = () => {
    setIsQuizOpen(true);
    setCurrentStep(1);
    setSkinType(null);
    setSkinConcern(null);
    setTexturePref(null);
    setRecommendation(null);
    setIsAdded(false);
  };

  const handleNextStep = (answer: string) => {
    if (currentStep === 1) {
      setSkinType(answer);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setSkinConcern(answer);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setTexturePref(answer);
      // Calculate recommendation based on answers
      calculateRecommendation(skinType || '', skinConcern || '', answer);
      setCurrentStep(4);
    }
  };

  const calculateRecommendation = (type: string, concern: string, texture: string) => {
    const list = products || mockProducts;
    // Elegant rules to match products dynamically
    let selected: Product;
    if (concern === 'Aging & Fine Lines') {
      selected = list.find(p => p.id === 'super-retinol-vitamin-a') || list[0];
    } else if (concern === 'Dullness & Dark Spots') {
      selected = list.find(p => p.id === 'glow-boost-vitamin-c') || list[Math.min(1, list.length - 1)];
    } else if (concern === 'Dryness & Dehydration') {
      selected = list.find(p => p.id === 'glow-remedy-hydrating-essence') || list[Math.min(4, list.length - 1)];
    } else {
      selected = list.find(p => p.id === 'golden-reset-radiance-oil') || list[Math.min(2, list.length - 1)];
    }
    setRecommendation(selected);
  };

  const handleAddRecommended = () => {
    if (!recommendation) return;
    onAddToCart(recommendation, 1, 0);
    setIsAdded(true);
    setTimeout(() => {
      setIsQuizOpen(false);
    }, 1500);
  };

  return (
    <>
      {/* Quiz Banner Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full relative min-h-[500px] sm:min-h-[560px] bg-cover bg-center flex items-center justify-center select-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1600')`
        }}
      >
        {/* Shadow Overlay Scrim */}
        <div className="absolute inset-0 bg-stone-900/40 z-0" />
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl flex flex-col items-center">
          <h2 className="font-serif font-light text-white text-3xl sm:text-5xl md:text-[54px] leading-[1.2] tracking-tight text-center">
            What does your skin need?
          </h2>
          <h2 className="font-serif italic font-normal text-white text-3xl sm:text-5xl md:text-[54px] leading-[1.2] tracking-tight text-center mt-2">
            — Take our quiz.
          </h2>
          
          <motion.button
            type="button"
            onClick={startQuiz}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 px-9 py-4 bg-white text-stone-900 font-sans font-semibold text-xs tracking-[0.25em] uppercase rounded-none shadow-md hover:shadow-xl cursor-pointer select-none relative overflow-hidden group"
          >
            {/* Background luxury transition overlay */}
            <span className="absolute inset-0 bg-stone-950 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
            
            {/* Button label & sliding icon */}
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
              Start quiz
              <ArrowRight className="w-3.5 h-3.5 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
            </span>
          </motion.button>
        </div>
      </motion.section>

      {/* Quiz Modal Container */}
      <AnimatePresence>
        {isQuizOpen && (
          <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-lg w-full p-8 md:p-10 shadow-2xl relative border border-stone-100 rounded-none text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsQuizOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-full font-sans font-normal text-lg cursor-pointer transition-colors"
              >
                &times;
              </button>

              {/* Progress Indicator */}
              {currentStep < 4 && (
                <div className="mb-8">
                  <div className="flex justify-between text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest mb-2.5">
                    <span>Skin Advisor Quiz</span>
                    <span>Step {currentStep} of 3</span>
                  </div>
                  <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-stone-900 transition-all duration-300"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Step 1: Skin Type */}
              {currentStep === 1 && (
                <div className="animate-fade-in">
                  <h3 className="font-serif text-2xl text-stone-900 mb-6 font-normal">
                    Describe your primary skin type:
                  </h3>
                  <div className="flex flex-col gap-3">
                    {['Dry & Flaky', 'Oily & Shiny', 'Combination', 'Highly Sensitive'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleNextStep(option)}
                        className="w-full text-left py-4 px-5 border border-stone-200 hover:border-stone-850 hover:bg-stone-50 transition-all duration-200 font-sans text-xs font-semibold uppercase tracking-wider text-stone-800 cursor-pointer"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Skin Concern */}
              {currentStep === 2 && (
                <div className="animate-fade-in">
                  <h3 className="font-serif text-2xl text-stone-900 mb-6 font-normal">
                    What is your chief skin concern?
                  </h3>
                  <div className="flex flex-col gap-3">
                    {['Aging & Fine Lines', 'Dullness & Dark Spots', 'Dryness & Dehydration', 'Redness & Irritation'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleNextStep(option)}
                        className="w-full text-left py-4 px-5 border border-stone-200 hover:border-stone-850 hover:bg-stone-50 transition-all duration-200 font-sans text-xs font-semibold uppercase tracking-wider text-stone-800 cursor-pointer"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Texture Preference */}
              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h3 className="font-serif text-2xl text-stone-900 mb-6 font-normal">
                    Which product texture do you love most?
                  </h3>
                  <div className="flex flex-col gap-3">
                    {['A Silk Fluid Serum', 'An Airy Cloud Gel-Cream', 'A Luxurious Hydrating Essence', 'An Ultra-Nourishing Oil'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleNextStep(option)}
                        className="w-full text-left py-4 px-5 border border-stone-200 hover:border-stone-850 hover:bg-stone-50 transition-all duration-200 font-sans text-xs font-semibold uppercase tracking-wider text-stone-800 cursor-pointer"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Results */}
              {currentStep === 4 && recommendation && (
                <div className="animate-fade-in text-center">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-[10px] font-mono font-bold text-[#3B4BEF] tracking-widest uppercase mb-1">
                    YOUR PERFECT MATCH
                  </p>
                  <h3 className="font-serif text-3xl text-stone-900 mb-6 font-normal">
                    We found your match!
                  </h3>

                  {/* Recommendation Card */}
                  <div className="bg-[#FAF6F3] border border-stone-100 p-5 flex items-center gap-5 text-left mb-8">
                    <img
                      src={recommendation.images[0]}
                      alt={recommendation.title}
                      className="w-20 h-20 object-cover border border-stone-100 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">{recommendation.vendor}</span>
                      <h4 className="font-serif text-stone-900 text-lg leading-tight truncate mt-0.5">{recommendation.title}</h4>
                      <p className="text-sm font-mono font-bold text-stone-900 mt-2">
                        {convertAndFormatPrice(recommendation.price, activeCurrency)}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-500 font-light leading-relaxed mb-8 max-w-sm mx-auto">
                    Based on your dry profile and dullness concern, this formula feeds highly bio-active complexes to optimize moisture layers and unlock deep radiant clarity.
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleAddRecommended}
                      disabled={isAdded}
                      className="flex-1 py-4 text-xs font-semibold tracking-widest uppercase transition-colors rounded-none cursor-pointer flex items-center justify-center gap-2 text-stone-900"
                      style={{ backgroundColor: '#00C4BA' }}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-stone-900" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 text-stone-900" />
                          <span>Add Match to Cart</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={startQuiz}
                      className="py-4 px-6 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none border border-stone-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retake</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
