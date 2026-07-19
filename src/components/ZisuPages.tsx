import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Mail, Users, MapPin, Clock, Phone, Heart, Check, ChevronRight } from 'lucide-react';

interface CustomizerSettings {
  colorBg: string;
  colorBgSecondary: string;
  colorText: string;
  colorAccent: string;
}

interface ZisuPageProps {
  settings: CustomizerSettings;
  onNavigateHome?: () => void;
}

/* 1. ABOUT US PAGE */
export const AboutPage: React.FC<ZisuPageProps> = ({ settings, onNavigateHome }) => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] animate-fade-in select-text">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-left mb-8 font-mono text-[10px] tracking-widest text-stone-500 uppercase">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome?.(); }} className="hover:text-stone-900 transition">Home</a>
          <span className="mx-2 font-serif">&bull;</span>
          <span className="text-stone-900 font-semibold">About Us</span>
        </div>

        {/* Editorial Header */}
        <div className="text-center sm:text-left border-b border-stone-200 pb-10 mb-12">
          <span className="font-mono text-xs tracking-[0.25em] text-[#C0A890] font-bold uppercase block mb-3">The Aesthetics of Purified Botany</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight text-stone-900">
            Formulated in Seoul, <br className="hidden sm:block" />
            <span className="italic font-light">Crafted for Pure Balance</span>
          </h1>
        </div>

        {/* Brand Story Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
          <div className="md:col-span-7 space-y-6 text-stone-800 text-sm sm:text-base leading-relaxed font-body">
            <p className="font-medium text-stone-900 text-base sm:text-lg">
              ZISU'O is a premium aesthetic-grade skincare label born in the heart of Seoul, South Korea. Our mission is simple: to restore your skin's natural balance and original cellular rhythm.
            </p>
            <p>
              Founded by leading Korean dermatological researchers and botanical biochemists, ZISU'O bridges the gap between active natural ingredients and advanced micro-delivery science. We believe that skin health is achieved not by aggressive chemicals, but by supporting the skin's natural lipid barrier with bio-compatible, low-irritant botanical actives.
            </p>
            <p>
              Every formula we create undergoes extensive laboratory testing. We selectively harvest pristine, nutrient-rich botanicals and purify them using cutting-edge cold-extraction techniques. This preserves the delicate bioactive compounds, ensuring maximum potency and safety.
            </p>
            <blockquote className="border-l-2 border-[#C0A890] pl-4 py-1 italic text-stone-700 font-serif my-6 text-base">
              "We formulate products that speak your skin's language—restoring vitality, moisture, and radiance from within."
            </blockquote>
            <p>
              Whether you are healing a compromised skin barrier, treating fine lines with our collagen-enhancing serums, or protecting your complexion from UV damage, ZISU'O provides a luxurious, clinically refined experience tailored to support your skin's long-term beauty.
            </p>
          </div>

          <div className="md:col-span-5 space-y-6">
            {/* Visual Callout Card */}
            <div className="bg-white p-6 sm:p-8 rounded-none border border-stone-200/60 shadow-sm">
              <h3 className="font-serif text-lg font-medium text-stone-950 mb-4 tracking-wide">Our Three Pillars</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#EAE3DB] flex items-center justify-center shrink-0 mt-0.5 text-stone-700">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono tracking-wider text-stone-900 uppercase font-bold">1. Botanical Purity</h4>
                    <p className="text-xs text-stone-600 mt-1">Sustainably harvested herbs and pure plant extracts, free of synthetic chemical fillers.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#EAE3DB] flex items-center justify-center shrink-0 mt-0.5 text-stone-700">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono tracking-wider text-stone-900 uppercase font-bold">2. Clinical Efficacy</h4>
                    <p className="text-xs text-stone-600 mt-1">formulas balanced at optimal pH levels using proven active compounds for active skin repair.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#EAE3DB] flex items-center justify-center shrink-0 mt-0.5 text-stone-700">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono tracking-wider text-stone-900 uppercase font-bold">3. Dermal Sympathy</h4>
                    <p className="text-xs text-stone-600 mt-1">Low-irritant, hypoallergenic bases designed specifically for sensitive or reactive skin barriers.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Clean Manufacturing */}
            <div className="p-6 bg-[#FAF5F0] border border-stone-200/50 rounded-none text-stone-700 text-xs leading-relaxed">
              <span className="font-bold text-stone-900 uppercase tracking-widest block font-mono text-[9px] mb-2">SEOUL LABS</span>
              ZISU'O products are crafted and bottled in ISO-22716 CGMP certified laboratories, conforming to the absolute highest tier of cosmetic purification and safety parameters globally.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* 2. CERTIFICATES PAGE */
export const CertificatesPage: React.FC<ZisuPageProps> = ({ settings, onNavigateHome }) => {
  const certificateImages = Array.from({ length: 11 }).map((_, i) => `/certificate image ${i + 1}.webp`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedImage]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] animate-fade-in select-text">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-left mb-8 font-mono text-[10px] tracking-widest text-stone-500 uppercase">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome?.(); }} className="hover:text-stone-900 transition">Home</a>
          <span className="mx-2 font-serif">&bull;</span>
          <span className="text-stone-900 font-semibold">Certificates</span>
        </div>

        {/* Editorial Header */}
        <div className="text-center sm:text-left border-b border-stone-200 pb-10 mb-12">
          <span className="font-mono text-xs tracking-[0.25em] text-[#C0A890] font-bold uppercase block mb-3">Authentic Standards & Excellence</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight text-stone-900">
            Our Certifications <br />
            <span className="italic font-light">Certified Safety, Guaranteed Pure</span>
          </h1>
        </div>

        {/* Certs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {certificateImages.map((src, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedImage(src)}
              className="bg-white p-2 sm:p-4 rounded-none border border-stone-200/60 shadow-sm flex items-center justify-center hover:shadow-md transition-shadow group relative overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img 
                src={src} 
                alt={`ZISU'O Certificate ${idx + 1}`} 
                className="w-full h-full object-contain transition duration-500 group-hover:scale-105"
              />
              {/* Expand Hint Overlay */}
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-stone-900 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 transition-opacity duration-300 shadow-sm">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/90 backdrop-blur-sm animate-fade-in p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-[#C0A890] transition-colors bg-stone-800/50 hover:bg-stone-800 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          
          <img 
            src={selectedImage} 
            alt="Certificate Fullscreen" 
            className="max-w-full max-h-[90vh] object-contain shadow-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
          />
        </div>
      )}
    </div>
  );
};


/* 3. CONTACT PAGE */
export const ContactPage: React.FC<ZisuPageProps> = ({ settings, onNavigateHome }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Consultation', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] animate-fade-in select-text">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-left mb-8 font-mono text-[10px] tracking-widest text-stone-500 uppercase">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome?.(); }} className="hover:text-stone-900 transition">Home</a>
          <span className="mx-2 font-serif">&bull;</span>
          <span className="text-stone-900 font-semibold">Contact Us</span>
        </div>

        {/* Editorial Header */}
        <div className="text-center sm:text-left border-b border-stone-200 pb-10 mb-12">
          <span className="font-mono text-xs tracking-[0.25em] text-[#C0A890] font-bold uppercase block mb-3">Esthetic Consultations & Inquiries</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight text-stone-900">
            Get in Touch <br />
            <span className="italic font-light">With our Skincare Specialists</span>
          </h1>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
          
          {/* Details Column */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-medium text-stone-950 tracking-wide">ZISU'O Offices</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Whether you have product questions, need a personal skin ritual consultation, or require support with an order, our specialists are available to consult.
              </p>
            </div>

            <div className="space-y-6 font-sans">
              <div className="flex gap-4 items-start">
                <div className="h-9 w-9 rounded-full bg-[#FAF5F0] flex items-center justify-center text-stone-800 border shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest font-bold text-stone-500 uppercase leading-none mb-1">Customer Support</h4>
                  <a href="mailto:support@zisuc.us" className="text-sm font-semibold text-stone-900 hover:underline">support@zisuc.us</a>
                  <p className="text-[11px] text-stone-500 mt-0.5">Response timeframe: 12-24 Hours</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-9 w-9 rounded-full bg-[#FAF5F0] flex items-center justify-center text-stone-800 border shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest font-bold text-stone-500 uppercase leading-none mb-1">Seoul Head Office</h4>
                  <p className="text-sm text-stone-800 leading-relaxed font-semibold">
                    ZISU'O Laboratories Ltd.
                  </p>
                  <p className="text-xs text-stone-500">
                    12-4 Teheran-ro, Gangnam-gu, Seoul, <br />Republic of Korea
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-9 w-9 rounded-full bg-[#FAF5F0] flex items-center justify-center text-stone-800 border shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest font-bold text-stone-500 uppercase leading-none mb-1">US Distribution & Logistics</h4>
                  <p className="text-sm text-stone-800 leading-relaxed font-semibold">
                    ZISU'O USA Depot
                  </p>
                  <p className="text-xs text-stone-500">
                    1948 S. Grand Ave, Los Angeles, CA 90007, USA
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-9 w-9 rounded-full bg-[#FAF5F0] flex items-center justify-center text-stone-800 border shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest font-bold text-stone-500 uppercase leading-none mb-1">Business Hours</h4>
                  <p className="text-xs text-stone-700 font-semibold leading-relaxed">
                    Monday to Friday
                  </p>
                  <p className="text-xs text-stone-500">
                    9:00 AM - 6:00 PM EST (English & Korean)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-none border border-stone-200/60 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900">Message Submitted</h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                  Thank you for reaching out to ZISU'O. An esthetics consultant has received your inquiry and will contact you shortly at <strong>{formData.email}</strong>.
                </p>
                <button 
                  type="button" 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: 'Consultation', message: '' }); }}
                  className="mt-4 px-6 py-2 border border-stone-200 text-xs font-mono tracking-wider hover:bg-stone-50 uppercase text-stone-800 rounded-sm transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-lg font-medium text-stone-950 mb-2 tracking-wide">Send an Inquiry</h3>
                
                <div>
                  <label htmlFor="name" className="block text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs py-2.5 px-3 border border-stone-200 focus:border-stone-500 outline-none bg-stone-50/50 text-stone-900 rounded-none transition" 
                    placeholder="E.g., Charlotte Kim"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs py-2.5 px-3 border border-stone-200 focus:border-stone-500 outline-none bg-stone-50/50 text-stone-900 rounded-none transition" 
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold mb-1">Subject</label>
                  <select 
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs py-2.5 px-3 border border-stone-200 focus:border-stone-500 outline-none bg-stone-50/50 text-stone-900 rounded-none transition"
                  >
                    <option value="Consultation">Personal Skin Consultation</option>
                    <option value="Orders">Order & Tracking Support</option>
                    <option value="Partnerships">Clinic / Wholesale Inquiries</option>
                    <option value="Press">Press & Media PR</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold mb-1">Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs py-2.5 px-3 border border-stone-200 focus:border-stone-500 outline-none bg-stone-50/50 text-stone-900 rounded-none transition resize-none" 
                    placeholder="Describe your skin concerns or request..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-850 text-white text-xs font-mono tracking-widest font-bold uppercase transition rounded-none active:scale-98 cursor-pointer"
                >
                  Send Inquiry &rarr;
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};


/* 4. PARTNERS PAGE */
export const PartnersPage: React.FC<ZisuPageProps> = ({ settings, onNavigateHome }) => {
  const categories = [
    {
      title: "Exclusive Retail Channels",
      subtitle: "Where to purchase ZISU'O products directly offline.",
      partners: [
        { name: "Olive Young", location: "South Korea Flagships", desc: "Available at Gangnam, Myeongdong, and Busan flagship locations, as well as the Olive Young Global online portal." },
        { name: "Sephora Korea", location: "APAC Core Outlets", desc: "Selected ranges of our high-concentration repair serums featured under the Clean Beauty collective." },
        { name: "Shinsegae Duty Free", location: "Incheon Airport T1/T2", desc: "Duty-free boutique outlets carrying our premium skin barrier recovery travel kits." },
        { name: "Nordstrom Online", location: "United States Select", desc: "Exclusive US retail partner hosting active biological oils and hydration collections online." }
      ]
    },
    {
      title: "Aesthetic Clinic Partners",
      subtitle: "Dermatological clinics prescribing ZISU'O in professional skin repair rituals.",
      partners: [
        { name: "Toxnfill Dermatology Network", location: "Seoul, Gangnam flagship", desc: "Utilizes our low-irritant barrier essences as immediate post-treatment relief serums for aesthetic patients." },
        { name: "Muse Premium Skin Care Centers", location: "South Korea (Core Locations)", desc: "Incorporates ZISU'O active peptide formulas during customized professional facial hydrating routines." },
        { name: "Arum Aesthetic Centers", location: "Seoul, Mapo-gu", desc: "Prescribes our calming Centella formulas for patients with sensitive dermal barriers or hyperpigmentation." }
      ]
    },
    {
      title: "Authorized Global Distributors",
      subtitle: "Authorized distribution logistics networks outside South Korea.",
      partners: [
        { name: "Luminous Skin Group", location: "Los Angeles, CA - USA", desc: "Core authorized importer and logistics administrator managing all North American boutique distribution." },
        { name: "Aura Cosmetics GmbH", location: "Munich, Germany - Europe", desc: "European compliance partner and distributor supplying certified retail channels across central EU countries." },
        { name: "Murasaki Wellness Group", location: "Tokyo, Japan - APAC", desc: "Managing authorized distribution for elite Tokyo salons and premium Japanese department stores." }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] animate-fade-in select-text">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-left mb-8 font-mono text-[10px] tracking-widest text-stone-500 uppercase">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome?.(); }} className="hover:text-stone-900 transition">Home</a>
          <span className="mx-2 font-serif">&bull;</span>
          <span className="text-stone-900 font-semibold">Partners</span>
        </div>

        {/* Editorial Header */}
        <div className="text-center sm:text-left border-b border-stone-200 pb-10 mb-12">
          <span className="font-mono text-xs tracking-[0.25em] text-[#C0A890] font-bold uppercase block mb-3">Global Salon, Clinic, and Retail networks</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight text-stone-900">
            Authorized Partners <br />
            <span className="italic font-light">Clinic Grade Sourcing & Distribution</span>
          </h1>
        </div>

        {/* Categories of Partners */}
        <div className="space-y-12 text-left">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              <div className="border-b border-stone-200 pb-2">
                <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-medium tracking-wide">{cat.title}</h2>
                <p className="text-xs text-stone-500 tracking-wide mt-1">{cat.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.partners.map((partner, pIdx) => (
                  <div key={pIdx} className="bg-white p-6 border border-stone-200/50 shadow-sm rounded-none">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-serif text-base font-semibold text-stone-900 tracking-wide">{partner.name}</h3>
                      <span className="font-mono text-[9px] tracking-wider text-[#C0A890] uppercase font-bold">{partner.location}</span>
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {partner.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Wholesale Call to Action */}
          <div className="bg-white p-6 sm:p-8 rounded-none border border-stone-200/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 text-center sm:text-left">
            <div>
              <h3 className="font-serif text-lg font-medium text-stone-950 tracking-wide">Become an Authorized Partner</h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-lg">
                Would you like to feature clinical-grade ZISU'O products in your luxury salon, aesthetic clinic, or upscale cosmetic boutique? Let's discuss partnership opportunities.
              </p>
            </div>
            <a 
              href="mailto:partners@zisuc.us" 
              className="px-6 py-3 bg-stone-900 hover:bg-stone-850 text-white text-xs font-mono tracking-widest font-bold uppercase transition rounded-none shrink-0"
            >
              Contact Wholesale &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
