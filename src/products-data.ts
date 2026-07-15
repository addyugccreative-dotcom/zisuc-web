import { Product } from './types';

export const mockProducts: Product[] = [
  // ==================== ZISU'C SPECIALTIES ====================
  {
    id: "e-bap-powder-cleanser",
    title: "E-BAP Powder Cleanser",
    vendor: "ZISU'C",
    price: "$78.00",
    compareAtPrice: "$92.00",
    description: "A sub-acidic, hypoallergenic enzyme powder cleanser that activates with water to gently exfoliate dead skin cells, clear impurities, and melt away excess sebum. Powered by Papain enzymes, natural Corn Starch, and soothing Allantoin to leave your skin feeling completely smooth, hydrated, and perfectly balanced without any tightness.",
    images: [
      "/cleanser card image.png",
      "/E-BAP Powder Cleanser left side image.png",
      "/E-BAP Powder Cleanser before image-1.png",
      "/E-BAP Powder Cleanser after image-1.png"
    ],
    tags: ["Skincare", "Toners", "Cleansers"],
    colors: [
      { name: "Powder Fresh", hex: "#fafaf9" }
    ],
    ingredients: "Zea Mays (Corn) Starch, Sodium Cocoyl Isethionate, Sodium Lauroyl Glutamate, Sodium Palmitate, Diglycerin, Allantoin, Papain, Maltodextrin, Beta-Glucan, Water, Butylene Glycol, Centella Asiatica Extract.",
    howToUse: "Dispense a dime-sized amount of powder onto wet palms. Rub hands together with lukewarm water to create a rich, creamy lather. Gently massage onto face in circular motions, then rinse thoroughly.",
    shipping: "Freshly small-batched and shipped in eco-friendly packaging. Delivery within 2-5 business days.",
    rating: 4.8,
    reviewsCount: 184
  },
  {
    id: "kira-60-c-tide-cream",
    title: "Kira 60 C-Tide Cream",
    vendor: "ZISU'C",
    price: "$112.00",
    compareAtPrice: "$132.00",
    description: "An intensive restorative barrier cream that deeply nourishes and repairs dry, irritated, or weakened skin. Formulated with 60% Centella Asiatica Extract to rapidly soothe redness, paired with a potent Marine Peptide Complex ('C-Tide') to reconstruct healthy collagen and seal in long-lasting moisture. Enriched with Ceramides and Squalane for a velvety-smooth, resilient, and youthful complexion.",
    images: [
      "/cream card image.png",
      "/Kira 60\u00cb\u009a C-Tide Cream left side image.png",
      "/Kira 60\u00cb\u009a C-Tide Cream before image-1.png",
      "/Kira 60\u00cb\u009a C-Tide Cream after image-1.png"
    ],
    tags: ["Skincare", "Serums", "Moisturizers"],
    colors: [
      { name: "Ocean Breeze", hex: "#e0f2fe" }
    ],
    ingredients: "Centella Asiatica Extract (60%), Glycerin, Water, Caprylic/Capric Triglyceride, Hydrogenated Lecithin, Squalane, Ceramide NP, Hexapeptide-9, Tripeptide-1, Copper Tripeptide-1, Acetyl Hexapeptide-8, Adenosine, Panthenol, Allantoin, Shea Butter, Macadamia Seed Oil.",
    howToUse: "Apply a moderate amount evenly onto the face and neck as the final step of your skincare routine. Gently press and pat with your palms to maximize absorption. Ideal for morning and evening use.",
    shipping: "Double-checked and shipped from our high-performance warehouse. Delivery within 2-5 days.",
    rating: 4.8,
    reviewsCount: 245
  },
  {
    id: "galachione-ampoule-pad",
    title: "Galachione Ampoule Pad",
    vendor: "ZISU'C",
    price: "$78.00",
    compareAtPrice: "$92.00",
    description: "Premium brightening and texture-refining pads pre-saturated in an active Galachione Ampoule. Combining Galactomyces Ferment Filtrate and Glutathione, it targets stubborn dark spots, hyperpigmentation, and overall dullness. Featuring a dual-sided 100% cotton pad design, it allows you to gently exfoliate (embossed side) or use as an intensive 3-minute brightening mask (smooth side) to reveal glassy, radiant 'glass skin'.",
    images: [
      "/pad card image.png",
      "/Galachione Ampoule Pad left side image.png",
      "/Galachione Ampoule Pad before image-1.png",
      "/Galachione Ampoule Pad after image-1.png"
    ],
    tags: ["Skincare", "Toners", "Brightening"],
    colors: [
      { name: "Glazed Radiance", hex: "#fbcfe8" }
    ],
    ingredients: "Galactomyces Ferment Filtrate (50%), Water, Niacinamide (5%), Glutathione, Adenosine, Sodium Hyaluronate, Centella Asiatica Extract, Licorice Root Extract, Allantoin, Panthenol, Salicylic Acid, Glycerin, Butylene Glycol.",
    howToUse: "After cleansing, wipe the embossed side gently across the face to refine texture. Turn over to the smooth side and place on cheeks or forehead for 3-5 minutes as a quick intensive sheet mask. Pat remaining essence to absorb.",
    shipping: "Packaged in an airtight jar with a sanitary tweezer included. Ships within 24-48 hours.",
    rating: 4.7,
    reviewsCount: 162
  },
  {
    id: "kira-60-c-tide-serum",
    title: "Kira 60 C-Tide Serum",
    vendor: "ZISU'C",
    price: "$105.00",
    compareAtPrice: "$125.00",
    description: "A high-performance restorative serum enriched with 60% Centella Asiatica and our proprietary Marine Peptide Complex. Penetrates deeply to rapidly soothe sensitive skin, fade discoloration, and plump up fine lines for an ultra-smooth, resilient glow.",
    images: [
      "/serum card image.png",
      "/Kira 60\u00cb\u009a C-Tide Serum left side image.png",
      "/Kira 60\u00cb\u009a C-Tide Serum before image-1.png",
      "/Kira 60\u00cb\u009a C-Tide Serum after image-1.png"
    ],
    tags: ["Skincare", "Serums", "Brightening"],
    colors: [
      { name: "Serum Pearl", hex: "#fdf2f8" }
    ],
    ingredients: "Centella Asiatica Extract (60%), Glycerin, Water, Niacinamide (5%), Peptide Complex, Adenosine, Panthenol, Allantoin, Squalane.",
    howToUse: "Apply 2-3 drops to clean skin after toning. Gently pat into face and neck until fully absorbed, followed by moisturizer.",
    shipping: "Ships with protective premium glass bottle and dropper. Delivery in 2-5 days.",
    rating: 4.9,
    reviewsCount: 128
  },
  {
    id: "kira-60-c-tide-multi-mist",
    title: "Kira 60 C-Tide Multi Mist",
    vendor: "ZISU'C",
    price: "$68.00",
    compareAtPrice: "$82.00",
    description: "A superfine, dual-phase treatment mist featuring 60% Centella Asiatica and nourishing lipids. Refreshes skin instantly, resets natural pH balance, and adds a micro-shield of hydration to preserve your youthful radiance all day.",
    images: [
      "/eye cream card image.png",
      "/Kira 60\u00cb\u009a C-Tide Multi Mist left side image.png",
      "/Kira 60\u00cb\u009a C-Tide Multi Mist before image-1.png",
      "/Kira 60\u00cb\u009a C-Tide Multi Mist after image-1.png"
    ],
    tags: ["Skincare", "Toners", "Mist"],
    colors: [
      { name: "Mist Breeze", hex: "#ecfeff" }
    ],
    ingredients: "Centella Asiatica Extract (60%), Butylene Glycol, Caprylic/Capric Triglyceride, Hydrogenated Lecithin, Adenosine, Glycerin, Water.",
    howToUse: "Shake well to mix the dual phases. Close eyes and spray 3-4 pumps onto face from a 6-inch distance. Tap lightly to absorb.",
    shipping: "Comes in an advanced leak-proof fine-mist pump dispenser. Ships in 24-48 hours.",
    rating: 4.8,
    reviewsCount: 94
  },
  {
    id: "cica-pin-cell-skin-trigger",
    title: "Cica Pin Cell Skin Trigger (Set of 2)",
    vendor: "ZISU'C",
    price: "$138.00",
    compareAtPrice: "$160.00",
    description: "An advanced professional-grade microneedle home care system. Formulated with premium Cicasome (Centella Asiatica liposome micro-spicules) that penetrate the outer skin layer to trigger cellular renewal, dramatically improve absorption of active ingredients, and resurface bumpy texture.",
    images: [
      "/pad card image.png",
      "/Cica Pin Cell Skin Trigger (Set of 2) left side image.png",
      "/Cica Pin Cell Skin Trigger (Set of 2) before image-1.png",
      "/Cica Pin Cell Skin Trigger (Set of 2) after image-1.png"
    ],
    tags: ["Skincare", "Serums", "Peel"],
    colors: [
      { name: "Trigger Active", hex: "#f5f5f4" }
    ],
    ingredients: "Centella Asiatica Extract, Hydrolyzed Sponge (Cicasome Micro-spicules), Niacinamide, Macadamia Seed Oil, Squalane, Water.",
    howToUse: "Use in your evening routine. After cleansing, apply a small amount to specific areas of concern. Massage in circular motions with firm pressure to activate the spicules. A slight tingling sensation is normal.",
    shipping: "Shipped in sterile double-vials with detailed microneedle instructions. Delivery within 2-5 days.",
    rating: 4.9,
    reviewsCount: 154
  },
  {
    id: "volume-shot-eye-cream",
    title: "Volume Shot Eye Cream (Set of 2)",
    vendor: "ZISU'C",
    price: "$124.00",
    compareAtPrice: "$145.00",
    description: "A dual-action, clinically proven eye treatment targeting deep wrinkles, loss of volume, and under-eye hollows. Powered by Volufiline, French Edelweiss Stem Cells, and five botanical complexes to instantly lift, firm, and plump the delicate eye area.",
    images: [
      "/eye cream card image.png",
      "/Volume Shot Eye Cream (Set of 2) left side image.png",
      "/Volume Shot Eye Cream (Set of 2) before image-1.png",
      "/Volume Shot Eye Cream (Set of 2) after image-1.png"
    ],
    tags: ["Skincare", "Moisturizers", "Brightening"],
    colors: [
      { name: "Volume Gold", hex: "#fef3c7" }
    ],
    ingredients: "Volufiline, Edelweiss Stem Cells, Botanical Complex, Sodium Hyaluronate, Shea Butter, Glycerin, Water.",
    howToUse: "Gently pat a pea-sized amount around both eye areas using your ring finger. Apply morning and night after serums.",
    shipping: "Comes in dual-active airless-shield pump jars. Ships within 24 hours.",
    rating: 4.8,
    reviewsCount: 112
  },

  // ==================== SERUMS (4 Products) ====================
  {
    id: "super-retinol-vitamin-a",
    title: "Super Retinol Vitamin A Serum",
    vendor: "XO WAVE",
    price: "$128.00",
    compareAtPrice: "$150.00",
    description: "Our signature advanced clinical retinal complex. Strengthens skin elasticity, reduces redness, and smooths wrinkles with minimal irritation. Formulated with soothing bio-lipids and prebiotics.",
    images: [
      "/serum card image.png",
      "/eye cream card image.png"
    ],
    tags: ["Skincare", "Serums", "Retinol"],
    colors: [
      { name: "Clear Essence", hex: "#f0fdf4" }
    ],
    ingredients: "0.1% Pure Encapsulated Retinal, Niacinamide (Vitamin B3), Panthenol (Pro-Vitamin B5), Licorice Root extract.",
    howToUse: "Apply a pea-sized amount onto dry face at night. Limit initial usage to twice a week, gradually increasing frequency as tolerated.",
    shipping: "Free express shipping applies automatically at checkout page.",
    rating: 4.7,
    reviewsCount: 204
  },
  {
    id: "glow-boost-vitamin-c",
    title: "Glow Boost Vitamin C Brightening Serum",
    vendor: "XO WAVE",
    price: "$85.00",
    compareAtPrice: undefined,
    description: "A potent 15% Vitamin C complex combined with Ferulic Acid and Vitamin E to visibly brighten dullness, fade stubborn dark spots, and defend against biological skin aging stressors.",
    images: [
      "/cream card image.png",
      "/serum card image.png"
    ],
    tags: ["Skincare", "Serums", "Vitamin C"],
    colors: [
      { name: "Citrus Nectar", hex: "#fef3c7" }
    ],
    ingredients: "15% L-Ascorbic Acid, Ferulic Acid, Vitamin E, Hyaluronic Acid, Orange Peel extract.",
    howToUse: "Apply 4-5 drops in the morning to clean face and neck prior to moisturizer. Always follow with sun protection.",
    shipping: "Freshly small-batched for absolute maximal potency.",
    rating: 4.8,
    reviewsCount: 96
  },
  {
    id: "peaches-peptide-serum",
    title: "Peaches Collagen Peptide Face Lift Serum",
    vendor: "XO WAVE",
    price: "$98.00",
    compareAtPrice: "$120.00",
    description: "An ultra-rich, dynamic peptide serum that naturally rebuilds structural cellular collagen, smoothing fine expression lines and promoting plump, resilient, bouncy skin.",
    images: [
      "/serum card image.png"
    ],
    tags: ["Skincare", "Serums", "Peptides"],
    colors: [
      { name: "Dewy Lilac", hex: "#f5f3ff" }
    ],
    ingredients: "Sextuple Peptide Complex, Hydrolyzed Collagen, Vegan Squalane, Green Tea Polyphenols.",
    howToUse: "Massage 2 pumps onto clean skin both morning and night. Press gently into areas showing fine lines.",
    shipping: "Recycled luxury glass packaging.",
    rating: 4.8,
    reviewsCount: 135
  },
  {
    id: "cloud-whip-barrier-repair",
    title: "Cloud Whip Barrier Repair Moisturizer",
    vendor: "XO WAVE",
    price: "$78.00",
    compareAtPrice: "$110.00",
    description: "An airy, triple-whipped restorative facial cream. Strengthens skin protective barrier with advanced biocompatible ceramides, lipids, and skin calming botanicals.",
    images: [
      "/cream card image.png"
    ],
    tags: ["Skincare", "Serums", "Barrier"],
    colors: [
      { name: "Cloud White", hex: "#fafaf9" }
    ],
    ingredients: "Ceramide NP, Ceramide AP, Phytosphingosine, Squalane, Vitamin B3 (Niacinamide), Oat kernel flour, Shea butter, Aloe vera juice.",
    howToUse: "Apply a dime-sized amount of cream evenly onto clean face and neck in upward sweeping motions daily.",
    shipping: "Packaged in airless-shield double chamber jars to prevent compound degradation.",
    rating: 4.8,
    reviewsCount: 142
  },

  // ==================== TONERS (4 Products) ====================
  {
    id: "glow-remedy-hydrating-essence",
    title: "Glow Remedy Hydrating Essence",
    vendor: "XO WAVE",
    price: "$78.00",
    compareAtPrice: "$90.00",
    description: "An intensely hydrating and priming liquid skin essence that delivers multi-level skin plumbing, balance, and prepare skin for active treatments.",
    images: [
      "/cleanser card image.png",
      "/cleanser card image.png"
    ],
    tags: ["Skincare", "Toners", "Hydration"],
    colors: [
      { name: "Dewy Peach", hex: "#ffedd5" },
      { name: "Soft Clover", hex: "#ecfccb" }
    ],
    ingredients: "Fermented Yeast filtrate, Triple Molecular Weight Hyaluronic Acid, Rosewater distillate, Aloe Leaf liquid.",
    howToUse: "Splash 4-5 drops onto palms and press gently into clean face and neck after cleansing.",
    shipping: "Made-to-order small batch bottling guarantees maximum bio-potency.",
    rating: 4.7,
    reviewsCount: 75
  },
  {
    id: "clean-canvas-gel-cleanser",
    title: "Clean Canvas Gel Cleanser",
    vendor: "XO WAVE",
    price: "$78.00",
    compareAtPrice: undefined,
    description: "A purifying, non-stripping daily pH-balanced gel facial cleanser. Refreshes skin while preserving protective moisture factors.",
    images: [
      "/eye cream card image.png"
    ],
    tags: ["Skincare", "Toners", "Daily"],
    colors: [
      { name: "Ice Blue", hex: "#e0f2fe" },
      { name: "Cream Peach", hex: "#fff7ed" }
    ],
    ingredients: "Amino acid surfactants, Green Tea, Centella Asiatica (Cica), Glycerin, Zinc PCA.",
    howToUse: "Massage gently onto damp face. Work into a creamy micro-foam, then rinse with lukewarm water.",
    shipping: "Ships internationally within 48h.",
    rating: 4.7,
    reviewsCount: 86
  },
  {
    id: "peach-balancing-mist",
    title: "Peach Blossom Balancing Toner Mist",
    vendor: "XO WAVE",
    price: "$52.00",
    compareAtPrice: undefined,
    description: "A superfine, organic botanical face mist loaded with live peach cell active water to instantly feed vitamins, refresh makeup, and balance raw skin pH layers.",
    images: [
      "/eye cream card image.png"
    ],
    tags: ["Skincare", "Toners", "Mist"],
    colors: [
      { name: "Peach Petal", hex: "#ffe4e6" }
    ],
    ingredients: "Organic Peach Extract, Witch Hazel, Rose Geranim water, Licorice active extract, Glycerin.",
    howToUse: "Mist generously over clean skin face or throughout the day on top of makeup whenever a hydration boost is needed.",
    shipping: "Travel safe leakproof glass spray container.",
    rating: 4.8,
    reviewsCount: 110
  },
  {
    id: "pore-refine-exfoliating-toner",
    title: "Pore-Refining AHA BHA Exfoliating Toner",
    vendor: "XO WAVE",
    price: "$64.00",
    compareAtPrice: "$80.00",
    description: "A sweep-on exfoliating treatment powered by a 5% AHA (Glycolic Acid) and 1% BHA (Salicylic Acid) liquid blend that melts skin buildup, clean deep pores, and refines uneven textures.",
    images: [
      "/cleanser card image.png"
    ],
    tags: ["Skincare", "Toners", "Peel"],
    colors: [
      { name: "Pure Liquid", hex: "#fafaf9" }
    ],
    ingredients: "5% Glycolic Acid, 1% Salicylic Acid, Willow Bark water, Ginseng extract, Panthenol.",
    howToUse: "Saturate a cotton pad and sweep across face and neck after cleansing at night. Apply 3 times weekly.",
    shipping: "Ships globally with Eco-protective packaging.",
    rating: 4.6,
    reviewsCount: 42
  },

  // ==================== SUN PROTECTIONS (4 Products) ====================
  {
    id: "golden-reset-radiance-oil",
    title: "Golden Reset Radiance Oil",
    vendor: "XO WAVE",
    price: "$78.00",
    compareAtPrice: "$100.00",
    description: "An ultra-nourishing golden facial oil loaded with cold-pressed superfood botanical lipids, design to quickly restore skin moisture barrier, lock hydration, and leave a non-greasy natural glow.",
    images: [
      "/cream card image.png",
      "/cleanser card image.png"
    ],
    tags: ["Skincare", "Sun Protections", "Hydration"],
    colors: [
      { name: "Golden Glow", hex: "#fed7aa" },
      { name: "Satin Peach", hex: "#fbcfe8" }
    ],
    ingredients: "Organic Jojoba Oil, Argan Oil, Rosehip Seed Lipids, Evening Primrose, Vitamin C (Ascorbic Acid), Citrus Bergamot.",
    howToUse: "Gently press 3 drops onto clean, damp skin morning and night. Can be mixed directly into your favorite moisturizer for an extra plumpness boost.",
    shipping: "Custom wrapped and shipped in environment-friendly paper packs. Delivery within 2-5 days.",
    rating: 4.8,
    reviewsCount: 92
  },
  {
    id: "peaches-daily-spf-50",
    title: "Peach Matte Daily Sun Shield SPF 50+",
    vendor: "XO WAVE",
    price: "$48.00",
    compareAtPrice: undefined,
    description: "A lightweight, featherweight mineral sunscreen that shields completely against harmful UVA/UVB rays with absolute zero greasy residue, white cast, or clogged facial pores.",
    images: [
      "/serum card image.png"
    ],
    tags: ["Skincare", "Sun Protections", "SPF"],
    colors: [
      { name: "Matte Nude", hex: "#ffedd5" }
    ],
    ingredients: "Zinc Oxide 12.5%, Titanium Dioxide 5%, Peach fruit enzyme water, Green tea active leaf complex, Squalane.",
    howToUse: "Apply generously as the final step of your daytime skincare ritual. Reapply every 2 hours if active outdoors.",
    shipping: "Ocean reef-safe and biodegradably sourced formulation.",
    rating: 4.8,
    reviewsCount: 154
  },
  {
    id: "dewy-glow-sun-fluid",
    title: "Glaze Dewy Sun Fluid SPF 50 PA++++",
    vendor: "XO WAVE",
    price: "$54.00",
    compareAtPrice: "$65.00",
    description: "An ultra-fluid chemical hybrid sunscreen that melts into skin, yielding a high-intensity dewy glazed finish. Fully hydrates skin cell structures while locking down complete broad sun protection.",
    images: [
      "/cream card image.png"
    ],
    tags: ["Skincare", "Sun Protections", "SPF"],
    colors: [
      { name: "Glaze Finish", hex: "#fee2e2" }
    ],
    ingredients: "Hyaluronic Acid, Centella Asiatica, Niacinamide, Clean organic Chemical filters protection.",
    howToUse: "Shake well. Apply a liberal amount onto fingertips and blend uniformly over entire face, ears, and neck.",
    shipping: "Double checked and packaged in UV-protective air-tight squeeze bottles.",
    rating: 4.7,
    reviewsCount: 108
  },
  {
    id: "mineral-sheer-spf-30",
    title: "Mineral Sheer Hydrating SPF 30",
    vendor: "XO WAVE",
    price: "$45.00",
    compareAtPrice: undefined,
    description: "A clean moisturizing daily protective cream with 100% zinc mineral filter, designed to feed calming hydration to extremely dry skin types while keeping rays blocked.",
    images: [
      "/serum card image.png"
    ],
    tags: ["Skincare", "Sun Protections"],
    colors: [
      { name: "Sheer Tint", hex: "#fef3c7" }
    ],
    ingredients: "Pure Zinc Oxide, Organic Shea Butter, Evening primrose extract, Chamomile soothing active.",
    howToUse: "Apply daily onto face and neck after moisturizer. Works exceptionally well as a primer under makeup.",
    shipping: "Safe for kids and ultra-sensitive skin profiles.",
    rating: 4.7,
    reviewsCount: 38
  },

  // ==================== HAIR CARE (4 Products) ====================
  {
    id: "overachiever-balm-cleanser",
    title: "Velvet Hour Nourishing Night Cream",
    vendor: "XO WAVE",
    price: "$78.00",
    compareAtPrice: "$100.00",
    description: "A powerful, nourishing balm cleanser that deep cleanses skin while moisturizing the hair follicles and offering rich hydration directly.",
    images: [
      "/serum card image.png"
    ],
    tags: ["Skincare", "Hair Care", "Cleanser"],
    colors: [
      { name: "Sweet Rose", hex: "#fda4af" }
    ],
    ingredients: "Natural Retinal, Chamomile extract, Squalane, Vitamin E, Avocado oil.",
    howToUse: "Gently run onto hair strands or face context, massage to clear outer deposits, then thoroughly wash.",
    shipping: "Eco priority post wrapping.",
    rating: 4.8,
    reviewsCount: 111
  },
  {
    id: "dr-plex-hair-bond-conditioner",
    title: "Dr. Plex Bond-Repair Hair Conditioner",
    vendor: "XO WAVE",
    price: "$68.00",
    compareAtPrice: "$85.00",
    description: "A maximum clinical strength deep conditioning treatment designed to rebuild broken hydrogen disulfide bonds of damaged, bleached, or split hair fiber strands.",
    images: [
      "/cleanser card image.png"
    ],
    tags: ["Hair", "Hair Care", "Repair"],
    colors: [
      { name: "Plex Green", hex: "#bef264" },
      { name: "Cream Silk", hex: "#fafaf9" }
    ],
    ingredients: "Hydrolyzed Keratin, Indian Gooseberry (Amla), Cold Pressed Avocado Lipids, Silk Amino Acids, Ceramide complex.",
    howToUse: "Apply generous amount to towel-dried wet hair, starting from mid-shaft to ends. Leave in for 5-8 minutes, then rinse fully.",
    shipping: "Recyclable carbon-neutral pump bottle.",
    rating: 4.8,
    reviewsCount: 184
  },
  {
    id: "botanical-shine-hair-oil",
    title: "Botanical Shine Intense Liquid Silk Hair Oil",
    vendor: "XO WAVE",
    price: "$58.00",
    compareAtPrice: undefined,
    description: "A superlight, non-thick dry hair treatment oil that locks down complete frizz, shields from heat styling, and restores breathtaking glassy brilliance.",
    images: [
      "/cleanser card image.png"
    ],
    tags: ["Hair", "Hair Care", "Shine"],
    colors: [
      { name: "Liquid Silk", hex: "#fef08a" }
    ],
    ingredients: "Argan Oil, Camellia Seed Extract, Sweet Almond Oil, Jasmine flower active essence.",
    howToUse: "Apply 2 drops onto hands, rub together, and smooth evenly through dry or damp hair strands.",
    shipping: "Sourced sustainably from organic Moroccan co-operatives.",
    rating: 4.8,
    reviewsCount: 78
  },
  {
    id: "silk-amino-repair-shampoo",
    title: "Silk Amino Acid Strengthening Shampoo",
    vendor: "XO WAVE",
    price: "$55.00",
    compareAtPrice: "$70.00",
    description: "A luxurious gentle lathering shampoo packed with 18 key amino acids to repair cellular structural scales of weak, limp, thin or processed hair follicles.",
    images: [
      "/eye cream card image.png"
    ],
    tags: ["Hair", "Hair Care", "Shampoo"],
    colors: [
      { name: "Pure Silk", hex: "#fef3c7" }
    ],
    ingredients: "Silk Amino Acids, Rice Water ferment, Biotin (Vitamin B7), Panthenol.",
    howToUse: "Lather a small amount into wet scalp, massage thoroughly to trigger blood circulation, and rinse.",
    shipping: "Dispatched same business day internationally.",
    rating: 4.8,
    reviewsCount: 95
  },

  // ==================== OTHER PRODUCTS (LIPS ETC, backup or supplementary) ====================
  {
    id: "berry-boost-lip-conditioning-oil",
    title: "Berry Boost Lip Conditioning Oil",
    vendor: "XO WAVE",
    price: "$78.00",
    compareAtPrice: undefined,
    description: "An ultra-nourishing, non-sticky lip oil that drenches lips in high-shine moisture. Infused with natural berry extracts and jojoba seed oil for a naturally plump, rosy pout.",
    images: [
      "/cleanser card image.png",
      "/serum card image.png"
    ],
    tags: ["Makeup", "Lip", "Care"],
    colors: [
      { name: "Cream Peach", hex: "#ffe5d9" },
      { name: "Soft Pink", hex: "#ffcad4" },
      { name: "Minty Fresh", hex: "#d8f3dc" },
      { name: "Crystal White", hex: "#fafafa" }
    ],
    ingredients: "Jojoba Seed Oil, Raspberry Seed Oil, Cranberry Extract, Vitamin E, Squalane.",
    howToUse: "Glide over bare lips for a sheer hint of color and shine, or layer over your favorite lipstick for a juicy finish.",
    shipping: "Ships with standard eco-friendly packaging.",
    rating: 4.8,
    reviewsCount: 185
  },
  {
    id: "peachy-dreams-lip-mask",
    title: "Peachy Dreams Lip Mask",
    vendor: "XO WAVE",
    price: "$78.00",
    compareAtPrice: undefined,
    description: "An overnight leave-on moisture lip treatment that melts away dead skin cells, leaving lips incredibly soft, smooth, and plump.",
    images: [
      "/serum card image.png"
    ],
    tags: ["Makeup", "Lip", "Care"],
    colors: [
      { name: "Peach Swirl", hex: "#fbcfe8" }
    ],
    ingredients: "Shea butter, Peach extract, Honey wax, Royal jelly peptides, Jojoba oil, Hyaluronic acid.",
    howToUse: "Apply a generous layer onto dry lips before sleeping using the custom spatula applicator.",
    shipping: "Included in standard domestic shipping envelopes.",
    rating: 4.7,
    reviewsCount: 310
  }
];
