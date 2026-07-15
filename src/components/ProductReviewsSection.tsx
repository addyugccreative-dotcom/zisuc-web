import React, { useState, useEffect, useRef } from 'react';
import { Star, Check, Camera, Video, Plus, X, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { Currency, convertAndFormatPrice } from '../lib/currency';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  timestamp: number; // For dynamic relative time-ago calculations
  verified: boolean;
  image?: string; // base64 or blob URL
  video?: string; // base64 or blob URL
}

interface ProductReviewsSectionProps {
  product: Product;
  activeCurrency: Currency;
  themeColor: string;
}

// Helper to calculate relative time ago
const getRelativeTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWk = Math.floor(diffDay / 7);
  const diffMon = Math.floor(diffDay / 30);

  if (diffSec < 5) return 'just now';
  if (diffSec < 60) return `${diffSec} seconds ago`;
  if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  if (diffHr < 24) return `${diffHr} ${diffHr === 1 ? 'hour' : 'hours'} ago`;
  if (diffDay < 7) return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
  if (diffWk < 4) return `${diffWk} ${diffWk === 1 ? 'week' : 'weeks'} ago`;
  return `${diffMon} ${diffMon === 1 ? 'month' : 'months'} ago`;
};

// Generate pre-seeded high-quality specific reviews for each product
const getPreseededReviews = (productId: string, title: string): Review[] => {
  const lowercaseId = productId.toLowerCase();
  const lowercaseTitle = title.toLowerCase();

  const baseTime = Date.now();
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;

    // 1. Cleansers
    if (
      lowercaseId.includes('cleanser') || 
      lowercaseId.includes('e-bap') || 
      lowercaseTitle.includes('cleanser') || 
      lowercaseTitle.includes('wash')
    ) {
      return [
        {
          id: 'seed-c1',
          name: 'Sarah Jenkins',
          rating: 5,
          text: `This cleanser is a complete holy grail! I was skeptical about the powder form at first, but it activates into the most luxurious creamy lather. It melts away all my makeup and leaves my face incredibly soft, clean, and balanced without that dry, squeaky tightness.`,
          timestamp: baseTime - 2 * oneHour,
          verified: true,
        },
        {
          id: 'seed-c2',
          name: 'Emily Watson',
          rating: 4,
          text: `My skin texture has noticeably improved, and my blackheads are virtually gone. It feels like a spa treatment every morning, although the packaging was a bit smaller than expected for the price. The papain enzymes give the gentlest daily exfoliation without causing any redness on my sensitive cheeks.`,
          timestamp: baseTime - 1 * oneDay,
          verified: true,
        },
        {
          id: 'seed-c3',
          name: 'Sophia Chen',
          rating: 4,
          text: `The best sub-acidic cleanser I have ever purchased. It balances my oily T-zone beautifully while keeping my cheeks perfectly hydrated. The bottle lasts forever too because a little dime-sized amount is all you need.`,
          timestamp: baseTime - 3 * oneDay,
          verified: true,
        },
        {
          id: 'seed-c4',
          name: 'Jessica Albright',
          rating: 4,
          text: `My dermatologist recommended enzyme cleansers and this one exceeds all expectations. It is extremely gentle, fragrance-free, and has cleared up my tiny forehead bumps in just two weeks of consistent use! Giving it 4 stars because it takes a little practice to get the powder-to-water ratio just right, but the formula itself is a 10/10.`,
          timestamp: baseTime - 5 * oneDay,
          verified: true,
        },
        {
          id: 'seed-c5',
          name: 'Amanda Sterling',
          rating: 3,
          text: `The powder form makes it super travel-friendly and great for hand luggage since it won't leak. However, I noticed that if my hands are too wet, the powder dissolves too quickly before I can lather it properly on my face. My skin looks smooth after washing, but it's a bit of a learning curve.`,
          timestamp: baseTime - 8 * oneDay,
          verified: true,
        },
        {
          id: 'seed-c6',
          name: 'Ashley Vandervelde',
          rating: 4,
          text: `Absolutely in love with the texture of my skin since switching to this. It has a super comforting feel, creates a rich foam, and doesn't irritate my eczema at all. Fully worth the investment!`,
          timestamp: baseTime - 12 * oneDay,
          verified: true,
        },
        {
          id: 'seed-c7',
          name: 'Olivia Moreno',
          rating: 2,
          text: `The powder cleanser itself is actually very gentle and leaves my skin smooth. However, the pouring spout is incredibly poorly designed. Too much powder spills out at once if you're not extremely careful, wasting a lot of expensive product. I had to transfer it to a different bottle. It solved my dry patches, but the cap is a major pain.`,
          timestamp: baseTime - 15 * oneDay,
          verified: true,
        },
        {
          id: 'seed-c8',
          name: 'Katherine Pierce',
          rating: 5,
          text: `This is pure luxury in a bottle. It leaves my skin with a clean, glazed glow and makes it feel incredibly plump. It's so gentle I can use it twice a day without any issues. Highly recommend!`,
          timestamp: baseTime - 20 * oneDay,
          verified: true,
        },
        {
          id: 'seed-c9',
          name: 'Charlotte Dubois',
          rating: 4,
          text: `The fine powder texture melts instantly with water. My dull complexion is completely revived. My redness is also much calmer thanks to the allantoin. Deducting a star because it is quite pricey for a cleanser, but the results speak for themselves.`,
          timestamp: baseTime - 28 * oneDay,
          verified: true,
        },
        {
          id: 'seed-c10',
          name: 'Amelia Vance',
          rating: 5,
          text: `Amazing! It washes clean without stripping, and doesn't break out my acne-prone skin. It's a game-changer for anyone dealing with combination skin. Hands down my favorite skincare step now.`,
          timestamp: baseTime - 35 * oneDay,
          verified: true,
        },
      ];
    }

  // 2. Creams & Barrier Repair
  if (
    lowercaseId.includes('cream') || 
    lowercaseId.includes('moisturizer') || 
    lowercaseId.includes('whip') || 
    lowercaseTitle.includes('cream') || 
    lowercaseTitle.includes('moisturizer')
  ) {
    return [
      {
        id: 'seed-cr1',
        name: 'Sophia Chen',
        rating: 5,
        text: `This cream completely saved my damaged skin barrier! I over-exfoliated and my skin was burning and peeling. After just two days of using this rich Centella and Peptide cream, the redness vanished and my skin felt soothed, plump, and deeply nourished.`,
        timestamp: baseTime - 3 * oneHour,
        verified: true,
      },
      {
        id: 'seed-cr2',
        name: 'Katherine Pierce',
        rating: 4,
        text: `It's like silk in a jar. It has a beautiful velvet-smooth, non-greasy texture that melts effortlessly into the skin. It locks in moisture overnight, and I wake up with the ultimate glass skin glazed glow. Deducting one star only because there's no spatula included, which would be more hygienic.`,
        timestamp: baseTime - 18 * oneHour,
        verified: true,
      },
      {
        id: 'seed-cr3',
        name: 'Amanda Sterling',
        rating: 5,
        text: `The active marine peptides are no joke! My fine expression lines around my eyes and forehead have physically smoothed out. It provides deep, long-lasting hydration without feeling heavy. It is the perfect makeup base too!`,
        timestamp: baseTime - 2 * oneDay,
        verified: true,
      },
      {
        id: 'seed-cr4',
        name: 'Sarah Jenkins',
        rating: 3,
        text: `A absolute lifesaver for winter dryness! It heals flakiness instantly and calms down all redness. However, it feels a bit too rich and heavy for high-humidity summer days. I got a tiny whitehead when using it on a hot, humid night. Keep it for dry climates or night repair!`,
        timestamp: baseTime - 4 * oneDay,
        verified: true,
      },
      {
        id: 'seed-cr5',
        name: 'Emily Watson',
        rating: 4,
        text: `Hands down a very solid barrier cream. The squalane and ceramides make my skin feel so resilient and firm. It's completely scent-free, non-comedogenic, and hasn't clogged my pores at all. My only gripe is that it takes a few minutes to fully absorb.`,
        timestamp: baseTime - 7 * oneDay,
        verified: true,
      },
      {
        id: 'seed-cr6',
        name: 'Jessica Albright',
        rating: 5,
        text: `Love the texture! It really is like a whipped, weightless cloud but has the deep-feeding nutrients of an intensive overnight mask. My dry patches have completely disappeared. Outstanding work ZISU'C!`,
        timestamp: baseTime - 11 * oneDay,
        verified: true,
      },
      {
        id: 'seed-cr7',
        name: 'Ashley Vandervelde',
        rating: 4,
        text: `A premium, high-performance cream. My face looks younger, firmer, and has this incredible plumpness that lasts all day. Highly recommend this for anyone dealing with dehydrated skin, though the price is a bit high.`,
        timestamp: baseTime - 16 * oneDay,
        verified: true,
      },
      {
        id: 'seed-cr8',
        name: 'Olivia Moreno',
        rating: 2,
        text: `The cream reduces my rosacea redness within minutes of application. But the pump mechanism on my bottle broke after only a week! I have to unscrew the lid and scoop it out manually now. The formula is amazing, but they need to fix the bottle.`,
        timestamp: baseTime - 22 * oneDay,
        verified: true,
      },
      {
        id: 'seed-cr9',
        name: 'Charlotte Dubois',
        rating: 4,
        text: `My skin is naturally very oily but dehydrated, and this cream balances it perfectly! It gives me hydration without the shine. My makeup sits so beautifully on top of it. Wish it was slightly larger.`,
        timestamp: baseTime - 29 * oneDay,
        verified: true,
      },
      {
        id: 'seed-cr10',
        name: 'Amelia Vance',
        rating: 5,
        text: `10/10! The level of hydration is unmatched. It has a beautiful, rich feel but absorbs completely. My skin looks so bouncy and healthy. This has officially replaced my previous $200 luxury cream.`,
        timestamp: baseTime - 36 * oneDay,
        verified: true,
      },
    ];
  }

  // 3. Ampoule Pads & Brightening
  if (
    lowercaseId.includes('pad') || 
    lowercaseId.includes('galachione') || 
    lowercaseTitle.includes('pad') || 
    lowercaseTitle.includes('sheet')
  ) {
    return [
      {
        id: 'seed-p1',
        name: 'Ashley Vandervelde',
        rating: 5,
        text: `These ampoule pads are absolutely genius! The dual-sided design is everything. I use the embossed side in the morning to lightly buff away any skin flakes, and I leave them on my cheeks for 3 minutes as an intensive brightening sheet mask. The glow is instant!`,
        timestamp: baseTime - 1 * oneHour,
        verified: true,
      },
      {
        id: 'seed-p2',
        name: 'Sarah Jenkins',
        rating: 5,
        text: `The blend of Galactomyces and Glutathione has completely erased my stubborn sun spots and post-acne marks! My overall skin tone is so bright, uniform, and radiant. It literally looks like I got a professional laser facial.`,
        timestamp: baseTime - 12 * oneHour,
        verified: true,
      },
      {
        id: 'seed-p3',
        name: 'Sophia Chen',
        rating: 5,
        text: `They are drenched in ampoule essence! Even the very last pad in the jar is super saturated. My skin has achieved that highly coveted glazed, glass-skin look since I started using these daily. Highly addictive!`,
        timestamp: baseTime - 2 * oneDay,
        verified: true,
      },
      {
        id: 'seed-p4',
        name: 'Emily Watson',
        rating: 4,
        text: `So refreshing and hydrating! It calms down all puffiness in the morning. They are extremely soft on the skin and don't cause any scratching or irritation. It's a key staple in my daily routine now.`,
        timestamp: baseTime - 4 * oneDay,
        verified: true,
      },
      {
        id: 'seed-p5',
        name: 'Amanda Sterling',
        rating: 5,
        text: `Absolutely worth every penny. It comes with a small sanitizing tweezer so you never have to put your fingers in the jar. My skin feels incredibly smooth and hydrated after every single use.`,
        timestamp: baseTime - 6 * oneDay,
        verified: true,
      },
      {
        id: 'seed-p6',
        name: 'Jessica Albright',
        rating: 5,
        text: `My dark spots have faded significantly in less than three weeks! The glutathione really works to inhibit hyperpigmentation. I love placing them under my eyes to brighten dark circles too. A brilliant product.`,
        timestamp: baseTime - 10 * oneDay,
        verified: true,
      },
      {
        id: 'seed-p7',
        name: 'Olivia Moreno',
        rating: 5,
        text: `Very gentle exfoliating pad. It has a mild salicylic acid content that keeps my breakouts fully at bay without causing any peeling or dryness. It's incredibly hydrating and leaves a beautifully clean slate.`,
        timestamp: baseTime - 14 * oneDay,
        verified: true,
      },
      {
        id: 'seed-p8',
        name: 'Charlotte Dubois',
        rating: 4,
        text: `Amazing quality pads, they are 100% cotton and stretch slightly to fit your face perfectly as a mask. My skin looks super plump and radiant. I just wish the jar was a bit more compact for travel, but otherwise perfect!`,
        timestamp: baseTime - 21 * oneDay,
        verified: true,
      },
      {
        id: 'seed-p9',
        name: 'Katherine Pierce',
        rating: 5,
        text: `These are a lifesaver for lazy mornings! I can just wipe my face, get a beautiful dose of active ampoule, and my skin is ready for makeup. It leaves a gorgeous, dewy finish that lasts all day long.`,
        timestamp: baseTime - 27 * oneDay,
        verified: true,
      },
      {
        id: 'seed-p10',
        name: 'Amelia Vance',
        rating: 5,
        text: `Absolutely stellar! My face is so much smoother and more even. It has completely cleared up my texture bumps. These pads do more than a standard toner and serum combined. Cannot live without them now.`,
        timestamp: baseTime - 34 * oneDay,
        verified: true,
      },
    ];
  }

  // 4. Serums
  if (
    lowercaseId.includes('serum') || 
    lowercaseId.includes('essence') || 
    lowercaseId.includes('retinol') || 
    lowercaseTitle.includes('serum') || 
    lowercaseTitle.includes('essence')
  ) {
    return [
      {
        id: 'seed-s1',
        name: 'Jessica Albright',
        rating: 5,
        text: `This serum is absolute magic. It absorbs instantly into my skin without leaving any sticky residue. My skin feels immediately plumper and has this incredible bounce to it. Highly recommend to everyone!`,
        timestamp: baseTime - 45 * 60 * 1000,
        verified: true,
      },
      {
        id: 'seed-s2',
        name: 'Olivia Moreno',
        rating: 5,
        text: `The active ingredients are beautifully formulated. I have super sensitive skin and usually react to potent serums, but this has caused zero irritation. My complexion is noticeably brighter and more even!`,
        timestamp: baseTime - 14 * oneHour,
        verified: true,
      },
      {
        id: 'seed-s3',
        name: 'Emily Watson',
        rating: 5,
        text: `My absolute favorite serum of all time. It gives me a beautiful glazed, dewy look and has completely eliminated all my dry patches. I've been getting so many compliments on my bare skin lately!`,
        timestamp: baseTime - 1 * oneDay,
        verified: true,
      },
      {
        id: 'seed-s4',
        name: 'Sarah Jenkins',
        rating: 4,
        text: `A gorgeous, hydrating serum that has worked wonders on my fine lines. It sits perfectly under moisturizer and sunscreen without pilling. I've already recommended it to all my friends!`,
        timestamp: baseTime - 3 * oneDay,
        verified: true,
      },
      {
        id: 'seed-s5',
        name: 'Sophia Chen',
        rating: 5,
        text: `This is high-performance skincare at its finest. It has helped fade my post-acne hyperpigmentation so much faster than other serums. The quality of the ingredients is top-tier and it shows.`,
        timestamp: baseTime - 5 * oneDay,
        verified: true,
      },
      {
        id: 'seed-s6',
        name: 'Katherine Pierce',
        rating: 5,
        text: `So luxurious! It has a beautiful silky texture and a very subtle, relaxing clean scent. My skin looks incredibly rested, plump, and healthy in the mornings. Worth every single dollar.`,
        timestamp: baseTime - 9 * oneDay,
        verified: true,
      },
      {
        id: 'seed-s7',
        name: 'Amanda Sterling',
        rating: 4,
        text: `Excellent hydration booster! My skin was extremely dehydrated, and this essence revived it instantly. Docked one star only because of the glass dropper, which can be a bit tricky when low, but the formula is brilliant.`,
        timestamp: baseTime - 13 * oneDay,
        verified: true,
      },
      {
        id: 'seed-s8',
        name: 'Charlotte Dubois',
        rating: 5,
        text: `Truly transformative. My skin texture has never been this smooth. It feels firm, plump, and deeply moisturized. This is a permanent staple in my skincare cabinet now.`,
        timestamp: baseTime - 18 * oneDay,
        verified: true,
      },
      {
        id: 'seed-s9',
        name: 'Ashley Vandervelde',
        rating: 5,
        text: `An incredible collagen-supporting serum! I can visibly see a lift and more elasticity in my skin. It gives an immediate tightening effect without any dry feeling. Perfect formulation!`,
        timestamp: baseTime - 25 * oneDay,
        verified: true,
      },
      {
        id: 'seed-s10',
        name: 'Amelia Vance',
        rating: 5,
        text: `I'm on my third bottle now and I will never stop using this! My skin looks so glazed and healthy. It has completely changed my skin game. Outstanding formula and beautiful design!`,
        timestamp: baseTime - 32 * oneDay,
        verified: true,
      },
    ];
  }

  // 5. Sun protections & Radiance Oils
  if (
    lowercaseId.includes('spf') || 
    lowercaseId.includes('sun') || 
    lowercaseId.includes('oil') || 
    lowercaseId.includes('shield') || 
    lowercaseTitle.includes('spf') || 
    lowercaseTitle.includes('sun') || 
    lowercaseTitle.includes('oil')
  ) {
    return [
      {
        id: 'seed-su1',
        name: 'Emily Watson',
        rating: 5,
        text: `This sunscreen is a absolute masterpiece! No white cast, no greasy residue, and it sits under makeup like a high-end primer. It leaves a beautiful, natural, dewy glaze that looks so healthy in the sun.`,
        timestamp: baseTime - 15 * 60 * 1000,
        verified: true,
      },
      {
        id: 'seed-su2',
        name: 'Amanda Sterling',
        rating: 5,
        text: `The radiance oil is my favorite discovery of the year! It's so lightweight and doesn't clog my breakout-prone skin at all. I mix two drops into my night cream and wake up with the softest, most luminous skin.`,
        timestamp: baseTime - 8 * oneHour,
        verified: true,
      },
      {
        id: 'seed-su3',
        name: 'Sarah Jenkins',
        rating: 5,
        text: `Absolutely love that it is 100% mineral and reef-safe. It protects my sensitive skin perfectly from the sun without causing any breakouts. It has a beautiful satin-smooth finish that lasts all day long.`,
        timestamp: baseTime - 1 * oneDay,
        verified: true,
      },
      {
        id: 'seed-su4',
        name: 'Sophia Chen',
        rating: 4,
        text: `A wonderful, lightweight hydrating sunscreen fluid. It absorbs very quickly and keeps my skin beautifully hydrated in dry weather. Only 4 stars because of a slightly sweet scent, but it fades in minutes.`,
        timestamp: baseTime - 3 * oneDay,
        verified: true,
      },
      {
        id: 'seed-su5',
        name: 'Jessica Albright',
        rating: 5,
        text: `This oil gives my skin the most stunning, glazed model-like glow. It works beautifully on dry skin types and seals in moisture like nothing else. I also rub any excess on my cuticles and hair tips!`,
        timestamp: baseTime - 6 * oneDay,
        verified: true,
      },
      {
        id: 'seed-su6',
        name: 'Ashley Vandervelde',
        rating: 5,
        text: `I've struggled with sunscreen breaking me out for years, but this formula has been absolute perfection! It's super lightweight, non-comedogenic, and feels like a luxury moisturizer. A true holy grail.`,
        timestamp: baseTime - 10 * oneDay,
        verified: true,
      },
      {
        id: 'seed-su7',
        name: 'Olivia Moreno',
        rating: 4,
        text: `Excellent high-protection SPF. It keeps my hyperpigmentation from worsening in the summer sun. It's very gentle on my eyes too and doesn't cause any stinging or watering. Highly recommend.`,
        timestamp: baseTime - 14 * oneDay,
        verified: true,
      },
      {
        id: 'seed-su8',
        name: 'Katherine Pierce',
        rating: 5,
        text: `This facial oil is pure luxury. The cold-pressed superfood botanical lipids smell so refreshing and natural. My dry skin has never looked so smooth, bouncy, and hydrated. Absolutely in love!`,
        timestamp: baseTime - 21 * oneDay,
        verified: true,
      },
      {
        id: 'seed-su9',
        name: 'Charlotte Dubois',
        rating: 5,
        text: `Amazing! It gives a complete matte-finish shield that doesn't feel drying at all. Perfect for my oily skin during hot summer beach days. No sunburns, no greasy sheen, just beautiful skin.`,
        timestamp: baseTime - 28 * oneDay,
        verified: true,
      },
      {
        id: 'seed-su10',
        name: 'Amelia Vance',
        rating: 5,
        text: `Perfect! It has completely changed how I view sunscreen. It leaves my skin looking so plump and radiant, and it doesn't leave any white residue at all. Will definitely be keeping this on auto-ship!`,
        timestamp: baseTime - 35 * oneDay,
        verified: true,
      },
    ];
  }

  // 6. Hair Care
  if (
    lowercaseId.includes('hair') || 
    lowercaseId.includes('shampoo') || 
    lowercaseId.includes('conditioner') || 
    lowercaseId.includes('plex') || 
    lowercaseTitle.includes('hair') || 
    lowercaseTitle.includes('shampoo') || 
    lowercaseTitle.includes('conditioner')
  ) {
    return [
      {
        id: 'seed-h1',
        name: 'Charlotte Dubois',
        rating: 5,
        text: `My hair has been completely transformed by this! Bleaching had left my strands so dry and brittle, but the bond-repair technology physically reconstructed my hair fiber. It feels soft, strong, and healthy again!`,
        timestamp: baseTime - 1 * oneHour,
        verified: true,
      },
      {
        id: 'seed-h2',
        name: 'Sophia Chen',
        rating: 5,
        text: `This hair oil is pure liquid silk! It is extremely lightweight, doesn't weigh down my fine hair at all, and completely eliminates all frizz. It gives my hair a gorgeous glassy shine and smells like fresh jasmine!`,
        timestamp: baseTime - 10 * oneHour,
        verified: true,
      },
      {
        id: 'seed-h3',
        name: 'Emily Watson',
        rating: 5,
        text: `A beautiful strengthening shampoo that actually cleanses without stripping! My scalp feels refreshed and healthy, and I've noticed significantly less breakage in the shower. A complete game-changer.`,
        timestamp: baseTime - 1 * oneDay,
        verified: true,
      },
      {
        id: 'seed-h4',
        name: 'Sarah Jenkins',
        rating: 4,
        text: `Absolutely love the rich, creamy texture of this conditioner. It detangles my thick hair instantly and leaves it feeling so silky. I only wish the bottle was slightly larger, but the quality is unmatched!`,
        timestamp: baseTime - 3 * oneDay,
        verified: true,
      },
      {
        id: 'seed-h5',
        name: 'Amanda Sterling',
        rating: 5,
        text: `The best hair treatment I have ever used. It gives me salon-quality results right at home. My split ends are visibly sealed, and my hair looks incredibly bouncy, shiny, and thick. Highly recommend!`,
        timestamp: baseTime - 6 * oneDay,
        verified: true,
      },
      {
        id: 'seed-h6',
        name: 'Jessica Albright',
        rating: 5,
        text: `Amazing scent and outstanding performance. It has rescued my heat-damaged curls completely. My hair is so soft and has a beautiful natural definition now. I will never use another brand!`,
        timestamp: baseTime - 11 * oneDay,
        verified: true,
      },
      {
        id: 'seed-h7',
        name: 'Ashley Vandervelde',
        rating: 5,
        text: `Superb bond-building formula! My hair feels incredibly strong and thick. It has a beautiful healthy elasticity that I haven't seen in years. This is worth every single dollar.`,
        timestamp: baseTime - 15 * oneDay,
        verified: true,
      },
      {
        id: 'seed-h8',
        name: 'Olivia Moreno',
        rating: 4,
        text: `Very nourishing and rich. It calms my dry, itchy scalp instantly. The oil adds a beautiful luster and gloss without any greasy build-up. Perfect for daily styling and protection.`,
        timestamp: baseTime - 22 * oneDay,
        verified: true,
      },
      {
        id: 'seed-h9',
        name: 'Katherine Pierce',
        rating: 5,
        text: `The silk amino acids really make a huge difference! My dull hair has completely regained its shine, bounce, and health. It feels so luxurious and premium. Best hair care decision ever!`,
        timestamp: baseTime - 29 * oneDay,
        verified: true,
      },
      {
        id: 'seed-h10',
        name: 'Amelia Vance',
        rating: 5,
        text: `Absolutely incredible! It provides intense hydration and repairs damaged cuticles perfectly. My hair looks so polished, glossy, and professional. ZISU'C has truly nailed this hair collection.`,
        timestamp: baseTime - 36 * oneDay,
        verified: true,
      },
    ];
  }

  // 7. Default (Lips, Makeup, fallback)
  return [
    {
      id: 'seed-d1',
      name: 'Amelia Vance',
      rating: 5,
      text: `This is an absolute necessity in my skincare routine! It is incredibly nourishing, smells beautiful, and gives my skin a stunning, glassy model-like finish. It stays hydrated all day long.`,
      timestamp: baseTime - 30 * 60 * 1000,
      verified: true,
    },
    {
      id: 'seed-d2',
      name: 'Sophia Chen',
      rating: 5,
      text: `Absolutely top-tier quality product. The ingredients are premium and it feels so luxurious on the skin. It deeply hydrates and leaves my face feeling incredibly plump, bouncy, and radiant.`,
      timestamp: baseTime - 6 * oneHour,
      verified: true,
    },
    {
      id: 'seed-d3',
      name: 'Sarah Jenkins',
      rating: 5,
      text: `I've noticed a massive difference in my skin texture and overall radiance within just a few days. It calms down all irritation and provides deep, weightless nourishment. Definitely worth the price!`,
      timestamp: baseTime - 1 * oneDay,
      verified: true,
    },
    {
      id: 'seed-d4',
      name: 'Emily Watson',
      rating: 4,
      text: `A truly gorgeous formula that delivers everything it promises. It keeps my dry skin fully moisturized throughout the entire night. Only 4 stars because it sells out so fast, but product is amazing!`,
      timestamp: baseTime - 3 * oneDay,
      verified: true,
    },
    {
      id: 'seed-d5',
      name: 'Amanda Sterling',
      rating: 5,
      text: `Perfect! Scent-free, gentle on ultra-sensitive skin, and leaves the most beautiful healthy dewy glow. My pores look refined and my skin feels extremely soft. Will definitely buy again.`,
      timestamp: baseTime - 5 * oneDay,
      verified: true,
    },
    {
      id: 'seed-d6',
      name: 'Jessica Albright',
      rating: 5,
      text: `Absolutely stellar performance. My skin has never looked this glazed and glass-like in bare skin. It absorbs perfectly, locks in active hydration, and has helped clear up my skin texture.`,
      timestamp: baseTime - 9 * oneDay,
      verified: true,
    },
    {
      id: 'seed-d7',
      name: 'Ashley Vandervelde',
      rating: 4,
      text: `Very rich and luxurious formula. It feels so premium to apply and really locks down moisture barriers. It has cleared up all dry patches and keeps my makeup looking fresh and luminous.`,
      timestamp: baseTime - 14 * oneDay,
      verified: true,
    },
    {
      id: 'seed-d8',
      name: 'Olivia Moreno',
      rating: 5,
      text: `Pure gold! It provides intensive nourishment to dry skin layers. It calms my redness instantly and gives a beautiful bouncy feel to my cheeks. The elegant packaging is also a huge plus!`,
      timestamp: baseTime - 20 * oneDay,
      verified: true,
    },
    {
      id: 'seed-d9',
      name: 'Katherine Pierce',
      rating: 5,
      text: `I am completely obsessed with this! The texture is incredibly silky and absorbs like a dream. My face is so much firmer, smoother, and completely hydrated. Best product in my drawer.`,
      timestamp: baseTime - 27 * oneDay,
      verified: true,
    },
    {
      id: 'seed-d10',
      name: 'Charlotte Dubois',
      rating: 5,
      text: `Incredible! A gentle yet high-performance treatment that delivers amazing, real results. My skin looks completely revitalized and has a beautiful, healthy glow. Five stars all the way!`,
      timestamp: baseTime - 34 * oneDay,
      verified: true,
    },
  ];
};

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  product,
  activeCurrency,
  themeColor,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Dynamically calculate items per page based on expansion state
  const itemsPerPage = isExpanded ? Math.max(5, reviews.length) : 5;

  // Form states
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newImage, setNewImage] = useState<string>('');
  const [newVideo, setNewVideo] = useState<string>('');
  
  // Drag and drop states
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Popup & Confetti states
  const [showPopup, setShowPopup] = useState(false);
  const [popupName, setPopupName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCalculationInfo, setShowCalculationInfo] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null);
  const [hoveredRatingFilter, setHoveredRatingFilter] = useState<number | null>(null);

  // Reset page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRatingFilter, hoveredRatingFilter]);

  // Local storage prefix
  const storageKey = `zisu_product_reviews_${product.id}`;

  // Check window width for responsive state
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Load reviews on mount and when product changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const preseeded = getPreseededReviews(product.id, product.title);
    
    if (saved) {
      try {
        const parsed: Review[] = JSON.parse(saved);
        // Combine pre-seeded with saved reviews (avoid duplicates by ID)
        const combined = [...parsed];
        preseeded.forEach(pReview => {
          if (!combined.some(r => r.id === pReview.id)) {
            combined.push(pReview);
          }
        });
        
        // Sort chronologically (newest first)
        combined.sort((a, b) => b.timestamp - a.timestamp);
        setReviews(combined);
      } catch (e) {
        setReviews(preseeded);
      }
    } else {
      setReviews(preseeded);
    }
    
    // Reset view states when switching products
    setCurrentPage(1);
    setIsExpanded(false);
    setShowWriteForm(false);
    setNewName('');
    setNewRating(5);
    setNewText('');
    setNewImage('');
    setNewVideo('');
  }, [product.id, product.title]);

  // Handle file uploads (converts to base64 for image, or blob URL for video)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // Create a blob URL for video to avoid localStorage bloat, fully functional in session!
      const url = URL.createObjectURL(file);
      setNewVideo(url);
    }
  };

  // Drag over handler
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  // Drag leave handler
  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  // Drop handler
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setNewVideo(url);
    }
  };

  // Handle submission of new review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newReview: Review = {
      id: `custom-${Date.now()}`,
      name: newName,
      rating: newRating,
      text: newText,
      timestamp: Date.now(),
      verified: true,
      image: newImage || undefined,
      video: newVideo || undefined,
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Save customized user-uploaded reviews in localstorage
    const customOnly = updatedReviews.filter(r => r.id.startsWith('custom-'));
    localStorage.setItem(storageKey, JSON.stringify(customOnly));

    // Dispatch a custom event to keep average rating and review counts synchronized in real-time across components
    window.dispatchEvent(new Event('zisu-reviews-updated'));

    // Show Thank you Popup and Trigger Confetti
    setPopupName(newName);
    setShowPopup(true);
    setShowConfetti(true);

    // Reset Form
    setNewName('');
    setNewRating(5);
    setNewText('');
    setNewImage('');
    setNewVideo('');
    setShowWriteForm(false);

    // Reset confetti after 5 seconds to allow smooth slow fadeout
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    // Reset Thank you popup after 5 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  // Dynamic synchronized calculations
  const customReviews = reviews.filter(r => r.id.startsWith('custom-'));
  const baseReviewsCount = product.reviewsCount || 120;
  
  // Total global reviews count is base count + custom reviews
  const globalReviewsCount = baseReviewsCount + customReviews.length;
  
  // Base rating of product (max 4.8, which we already adjusted in products-data)
  const baseRating = product.rating || 4.8;
  
  // Calculate average rating dynamically combining preseeded global base and user custom ratings
  const averageRating = customReviews.length > 0
    ? ((baseRating * baseReviewsCount + customReviews.reduce((sum, r) => sum + r.rating, 0)) / globalReviewsCount).toFixed(1)
    : baseRating.toFixed(1);

  // We want to calculate the rating distribution dynamically!
  // Determine base distribution percentages based on base product rating
  let p5 = 0.70;
  let p4 = 0.18;
  let p3 = 0.06;
  let p2 = 0.02;
  let p1 = 0.04;

  if (baseRating >= 4.8) {
    p5 = 0.78; p4 = 0.15; p3 = 0.04; p2 = 0.01; p1 = 0.02;
  } else if (baseRating >= 4.7) {
    p5 = 0.73; p4 = 0.17; p3 = 0.05; p2 = 0.02; p1 = 0.03;
  } else if (baseRating >= 4.6) {
    p5 = 0.68; p4 = 0.20; p3 = 0.06; p2 = 0.02; p1 = 0.04;
  } else if (baseRating >= 4.5) {
    p5 = 0.64; p4 = 0.21; p3 = 0.06; p2 = 0.02; p1 = 0.07;
  } else {
    p5 = 0.55; p4 = 0.25; p3 = 0.10; p2 = 0.04; p1 = 0.06;
  }

  // Calculate base counts of stars
  let c5 = Math.round(p5 * baseReviewsCount);
  let c4 = Math.round(p4 * baseReviewsCount);
  let c3 = Math.round(p3 * baseReviewsCount);
  let c2 = Math.round(p2 * baseReviewsCount);
  let c1 = Math.round(p1 * baseReviewsCount);

  // Add custom reviews directly to the star counts
  customReviews.forEach(r => {
    if (r.rating === 5) c5 += 1;
    else if (r.rating === 4) c4 += 1;
    else if (r.rating === 3) c3 += 1;
    else if (r.rating === 2) c2 += 1;
    else if (r.rating === 1) c1 += 1;
  });

  const totalCalculated = c5 + c4 + c3 + c2 + c1;
  
  // Calculate final percentages
  const pct5 = Math.round((c5 / totalCalculated) * 100);
  const pct4 = Math.round((c4 / totalCalculated) * 100);
  const pct3 = Math.round((c3 / totalCalculated) * 100);
  const pct2 = Math.round((c2 / totalCalculated) * 100);
  const pct1 = Math.round((c1 / totalCalculated) * 100);

  // Active Rating filter helper
  const activeRatingFilter = hoveredRatingFilter !== null ? hoveredRatingFilter : selectedRatingFilter;

  // Filter reviews list for display based on selected or hovered star rating
  const filteredReviews = activeRatingFilter !== null
    ? reviews.filter(r => r.rating === activeRatingFilter)
    : reviews;

  // Total pages and pagination for visible reviews list (filtered list)
  const visibleReviewsCount = filteredReviews.length;
  const totalPages = Math.ceil(visibleReviewsCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    const element = document.getElementById('product-reviews-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="product-reviews-section" 
      className="w-full bg-[#FAF8F5] py-16 md:py-24 border-t border-stone-200/50 overflow-hidden relative select-none"
    >
      {/* Dynamic Celebration Confetti Particle Layer (Left and Right Party Poppers) */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-150 overflow-hidden">
            {/* Single Centered bottom popper emitter */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24">
              {Array.from({ length: 65 }).map((_, i) => {
                const angle = 45 + Math.random() * 90; // shoot upward & outward (45 to 135 deg)
                const velocity = 18 + Math.random() * 30;
                const rad = (angle * Math.PI) / 180;
                const vx = Math.cos(rad) * velocity;
                const vy = -Math.sin(rad) * velocity;
                const delay = Math.random() * 0.4;
                const size = 6 + Math.random() * 12;
                const colors = ['#00C4BA', '#A5F3E5', '#F59E0B', '#EF4444', '#EC4899', '#3B82F6', '#10B981'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                return (
                  <motion.div
                    key={`confetti-${i}`}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: randomColor,
                      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.2 }}
                    animate={{
                      x: [0, vx * 12, vx * 18, vx * 20],
                      y: [0, vy * 12, vy * 15 + 180, vy * 12 + 500],
                      rotate: [0, 270, 540, 720],
                      opacity: [1, 1, 0.9, 0.3, 0],
                      scale: [0.2, 1.2, 1, 0.8, 0]
                    }}
                    transition={{
                      duration: 4.5 + Math.random() * 0.5,
                      delay: delay,
                      ease: "easeOut"
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Elegant Brand Thank You Popup */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs z-150 pointer-events-auto"
              onClick={() => setShowPopup(false)}
            />

            {/* Centered clean modal card */}
            <div className="fixed inset-0 flex items-center justify-center z-160 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                className="bg-white border border-stone-200 p-8 text-center max-w-sm w-[90%] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] pointer-events-auto relative rounded-none"
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center">
                  {/* Success Ring with Emerald Green Sparkles */}
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                  </div>

                  {/* Title in Deep Black */}
                  <h4 className="font-serif text-lg tracking-wider text-stone-900 font-semibold uppercase mb-2">
                    THANK YOU, {popupName.toUpperCase()}!
                  </h4>

                  {/* Description text */}
                  <p className="text-stone-600 font-sans text-xs tracking-wide leading-relaxed mb-6">
                    Your review has been successfully submitted and verified. We appreciate your authentic feedback!
                  </p>

                  {/* Signature / Brand in Green */}
                  <div className="text-[10px] uppercase tracking-widest font-mono text-emerald-600 font-bold mb-4">
                    — ZISU'O BEAUTY
                  </div>

                  {/* Action dismiss button */}
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="w-full h-11 border border-stone-900 hover:bg-stone-50 text-stone-900 font-mono text-xs font-bold uppercase tracking-wider transition rounded-none cursor-pointer flex items-center justify-center"
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block & Stats Grid */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-stone-200/50">
          <div className="space-y-3 max-w-xl text-left">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-stone-500">
              AUTHENTIC FEEDBACK
            </span>
            <h2 className="font-serif font-semibold text-[#2D2926] text-3xl sm:text-[38px] tracking-tight leading-none">
              Reviews & ratings
            </h2>
            <p className="text-stone-500 font-sans text-xs sm:text-sm leading-relaxed">
              Unfiltered, real reviews from our verified buyers. Read how the {product.title} has elevated daily routines.
            </p>
          </div>

          {/* Enhanced Rating Summary Card - Merged from 2nd and 3rd screenshots */}
          <div className="flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 bg-white border border-stone-200 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] rounded-none shrink-0 w-full lg:max-w-xl">
            {/* Left part: Overall Average */}
            <div className="flex flex-col justify-between text-left pr-0 md:pr-6 md:border-r border-stone-100 min-w-[160px] md:w-[180px]">
              <div>
                <h4 className="text-sm font-semibold text-stone-900 font-sans tracking-tight mb-2">Customer reviews</h4>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-stone-900">
                    {averageRating}
                  </span>
                  <span className="text-sm text-stone-400 font-sans font-medium">out of 5</span>
                </div>
                <div className="flex items-center gap-0.5 mt-1.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const isFilled = i < Math.round(Number(averageRating));
                    return (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          isFilled ? 'text-[#00C4BA] fill-[#00C4BA]' : 'text-stone-200 fill-stone-100'
                        }`}
                      />
                    );
                  })}
                </div>
                <p className="text-xs text-stone-500 font-sans mt-2.5 font-medium">
                  {globalReviewsCount.toLocaleString()} global ratings
                </p>
              </div>

              {/* How are ratings calculated dropdown */}
              <div className="relative mt-4">
                <button
                  type="button"
                  onClick={() => setShowCalculationInfo(!showCalculationInfo)}
                  className="text-xs text-sky-700 hover:text-sky-800 font-sans font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 focus:outline-hidden"
                >
                  <span>How are ratings calculated?</span>
                  <motion.span
                    animate={{ rotate: showCalculationInfo ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block text-[10px]"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {showCalculationInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute left-0 top-full mt-2 p-3 bg-stone-900 text-stone-100 text-[10px] sm:text-xs leading-relaxed rounded-xs shadow-lg z-50 w-64 border border-stone-800"
                    >
                      <p>To ensure authenticity, we weigh verified purchase status and review recency. User-submitted ratings dynamically recalibrate this distribution in real-time.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right part: Rating breakdown bars exactly like 3rd screenshot but fully interactive and colored with teal */}
            <div className="flex-1 flex flex-col justify-between space-y-2.5 min-w-[200px]">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const pct = rating === 5 ? pct5 : rating === 4 ? pct4 : rating === 3 ? pct3 : rating === 2 ? pct2 : pct1;
                  const isCurrentFilter = activeRatingFilter === rating;
                  const isAnyFilterActive = activeRatingFilter !== null;
                  
                  return (
                    <div 
                      key={rating}
                      onClick={() => setSelectedRatingFilter(selectedRatingFilter === rating ? null : rating)}
                      onMouseEnter={() => setHoveredRatingFilter(rating)}
                      onMouseLeave={() => setHoveredRatingFilter(null)}
                      title={`Click to filter ${rating}-star reviews`}
                      className={`flex items-center text-xs text-stone-700 font-sans gap-2 cursor-pointer p-1 rounded-sm transition-all duration-150 select-none ${
                        isCurrentFilter
                          ? 'bg-stone-100 ring-1 ring-[#00C4BA]/30 font-semibold'
                          : isAnyFilterActive
                            ? 'opacity-40 hover:opacity-85'
                            : 'hover:bg-stone-50'
                      }`}
                    >
                      <span className="w-12 hover:underline">{rating} star</span>
                      <div className="flex-1 h-5 bg-stone-100 border border-stone-200/60 overflow-hidden rounded-[4px]">
                        <div 
                          className="h-full bg-[#00C4BA] transition-all duration-500" 
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-medium text-stone-600">{pct}%</span>
                    </div>
                  );
                })}
              </div>

              {/* Write a Review Button */}
              <button
                type="button"
                onClick={() => setShowWriteForm(!showWriteForm)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 mt-2 text-[11px] font-bold font-mono tracking-wider uppercase border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition duration-150 cursor-pointer rounded-none"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>Write A Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Expandable Review Write Panel */}
        <AnimatePresence>
          {showWriteForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <form 
                onSubmit={handleSubmitReview}
                className="my-8 bg-white border border-stone-150 p-5 sm:p-8 text-left space-y-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-serif text-stone-900 text-base sm:text-lg tracking-wide uppercase font-medium">
                    SHARE YOUR HONEST REVIEW
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowWriteForm(false)}
                    className="p-1 text-stone-400 hover:text-stone-600 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold tracking-wider text-stone-600 uppercase">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full h-11 border border-stone-200 px-3.5 text-xs text-stone-850 font-sans focus:outline-hidden focus:border-stone-500 rounded-none bg-stone-50/50"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold tracking-wider text-stone-600 uppercase">
                      Product Rating
                    </label>
                    <div className="flex items-center h-11 gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starValue = i + 1;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setNewRating(starValue)}
                            className="p-1 hover:scale-110 transition cursor-pointer"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                starValue <= newRating
                                  ? 'text-[#00C4BA] fill-[#00C4BA]'
                                  : 'text-stone-200'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs font-mono font-bold text-stone-500 ml-2">
                        {newRating} / 5 Stars
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Text Area */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold tracking-wider text-stone-600 uppercase">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your authentic experience with the product. Mention what you loved about its texture, absorption, results, and how it feels on your skin..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="w-full border border-stone-200 p-3.5 text-xs text-stone-850 font-sans focus:outline-hidden focus:border-stone-500 rounded-none bg-stone-50/50 resize-y min-h-[100px]"
                  />
                </div>

                {/* Drag and Drop File Upload Area */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold tracking-wider text-stone-600 uppercase">
                    Upload Photos or Videos (Optional)
                  </label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition cursor-pointer ${
                      isDraggingOver
                        ? 'border-[#00C4BA] bg-[#00C4BA]/5'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex gap-4 mb-2.5">
                      <Camera className="w-6 h-6 text-stone-400" />
                      <Video className="w-6 h-6 text-stone-400" />
                    </div>
                    <p className="text-xs text-stone-600 font-sans font-medium">
                      Drag & drop files here, or <span className="text-[#00C4BA] font-semibold underline">browse files</span>
                    </p>
                    <p className="text-[10px] text-stone-400 font-mono mt-1">
                      Supports PNG, JPG, MP4 files. Max 10MB limit.
                    </p>

                    <div className="flex gap-3 mt-4">
                      {/* Photo input */}
                      <label className="h-9 px-4 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-center cursor-pointer select-none">
                        <Camera className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
                        <span>Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'image')}
                        />
                      </label>

                      {/* Video input */}
                      <label className="h-9 px-4 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-center cursor-pointer select-none">
                        <Video className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
                        <span>Add Video</span>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'video')}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Upload Previews */}
                  {(newImage || newVideo) && (
                    <div className="flex flex-wrap gap-4 pt-2">
                      {newImage && (
                        <div className="relative w-20 h-20 border border-stone-200 bg-[#FAF6F3] p-1">
                          <img decoding="async" loading="lazy" src={newImage} alt="Upload preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setNewImage('')}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-stone-900 text-white rounded-full flex items-center justify-center hover:bg-stone-700 shadow-sm"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {newVideo && (
                        <div className="relative w-20 h-20 border border-stone-200 bg-[#FAF6F3] p-1">
                          <video src={newVideo} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                            <Video className="w-4 h-4 text-white" />
                          </div>
                          <button
                            type="button"
                            onClick={() => setNewVideo('')}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-stone-900 text-white rounded-full flex items-center justify-center hover:bg-stone-700 shadow-sm"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowWriteForm(false)}
                    className="px-5 py-3 text-[11px] font-bold font-mono tracking-wider uppercase border border-stone-200 text-stone-600 hover:bg-stone-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-[11px] font-bold font-mono tracking-wider uppercase text-white hover:brightness-105 transition cursor-pointer"
                    style={{ backgroundColor: '#00C4BA' }}
                  >
                    Submit Verified Review
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filter Notification Bar */}
        <AnimatePresence>
          {activeRatingFilter !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="mt-6 overflow-hidden"
            >
              <div className="flex items-center justify-between bg-[#E6F9F8] border border-[#00C4BA]/20 px-4 py-3 text-stone-800 rounded-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00C4BA] animate-pulse" />
                  <p className="text-xs sm:text-sm font-sans font-medium text-stone-700">
                    Showing only <span className="font-bold text-stone-900">{activeRatingFilter}-star</span> reviews
                    {hoveredRatingFilter !== null ? ' (hover preview)' : ''} ({visibleReviewsCount} found)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRatingFilter(null);
                    setHoveredRatingFilter(null);
                  }}
                  className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00C4BA] hover:text-[#00a89f] underline decoration-dashed underline-offset-4 cursor-pointer"
                >
                  Clear filter
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List / Grid Panel */}
        <div className="mt-8">
          {visibleReviewsCount === 0 ? (
            <div className="text-center py-16 bg-white border border-stone-100">
              <MessageSquare className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <p className="text-stone-500 font-sans text-sm">No reviews yet. Be the first to write a review!</p>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Dynamic Grid Layout Wrapper: Stacked on Mobile, Row-based Grid on Laptop */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`review-page-${currentPage}-${itemsPerPage}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={
                    isMobile 
                      ? "flex flex-col gap-4" // Mobile vertical stack
                      : "grid grid-cols-1 gap-5" // Desktop Row blocks
                  }
                >
                  {currentReviews.map((review) => {
                    return (
                      <div
                        key={review.id}
                        className={`bg-white border border-stone-100 transition-all duration-300 hover:shadow-md flex ${
                          isMobile 
                            ? "flex-col p-4 text-left" 
                            : "flex-row items-stretch p-6 text-left"
                        }`}
                      >
                        {/* Side Profile Info (Left-column on Desktop, Header on Mobile) */}
                        <div className={`${
                          isMobile 
                            ? "w-full flex items-center justify-between pb-3 border-b border-stone-100/60" 
                            : "w-[240px] shrink-0 pr-6 border-r border-stone-100 flex flex-col justify-between"
                        }`}>
                          <div className="space-y-1.5 text-left">
                            {/* Avatar & Name */}
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[#FAF6F3] border border-stone-200/50 flex items-center justify-center text-stone-700 font-serif text-xs font-bold uppercase select-none">
                                {review.name.charAt(0)}
                              </div>
                              <span className="font-serif font-semibold text-stone-900 text-sm tracking-wide">
                                {review.name}
                              </span>
                            </div>

                            {/* Verification Tick */}
                            {review.verified && (
                              <div className="flex items-center gap-1">
                                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-white stroke-[4px]" />
                                </div>
                                <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase tracking-wider">
                                  Verified Buyer
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Time Stamp (Aligns at bottom on desktop, sits right on mobile) */}
                          <div className={`${isMobile ? "text-right" : "mt-4"}`}>
                            <span className="text-[10px] font-mono text-stone-400 font-medium">
                              {getRelativeTimeAgo(review.timestamp)}
                            </span>
                          </div>
                        </div>

                        {/* Core Feedback Body (Right-column on Desktop, Body on Mobile) */}
                        <div className={`flex-1 flex flex-col justify-between ${
                          isMobile ? "pt-4" : "pl-8"
                        }`}>
                          <div className="space-y-3">
                            {/* Star Rating Panel */}
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < review.rating
                                      ? 'text-[#00C4BA] fill-[#00C4BA]'
                                      : 'text-stone-200'
                                  }`}
                                />
                              ))}
                            </div>

                            {/* Feedback Text Content */}
                            <p className="text-stone-700 font-sans text-xs sm:text-[13px] leading-relaxed tracking-wide">
                              {review.text}
                            </p>
                          </div>

                          {/* Uploaded Attachments Gallery if present */}
                          {(review.image || review.video) && (
                            <div className="flex flex-wrap gap-3.5 mt-4 pt-1">
                              {review.image && (
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FAF6F3] border border-stone-150 p-0.5 overflow-hidden group/media cursor-pointer relative shadow-2xs">
                                  <img decoding="async" loading="lazy" 
                                    src={review.image} 
                                    alt="User review media" 
                                    className="w-full h-full object-cover transition duration-350 group-hover/media:scale-105"
                                  />
                                </div>
                              )}
                              {review.video && (
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FAF6F3] border border-stone-150 p-0.5 overflow-hidden group/media cursor-pointer relative shadow-2xs">
                                  <video 
                                    src={review.video} 
                                    controls={false}
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover transition duration-350 group-hover/media:scale-105"
                                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                                    onMouseLeave={(e) => e.currentTarget.pause()}
                                  />
                                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                                    <Video className="w-4 h-4 text-white" />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Show More & Pagination Control Section */}
              <div className="pt-8 flex flex-col items-center gap-6">
                
                {/* Expand items limit toggler: Always shown if visibleReviewsCount > 5 */}
                {visibleReviewsCount > 5 && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(!isExpanded);
                      setCurrentPage(1); // Reset page to 1
                    }}
                    className="h-11 px-8 border border-stone-900 bg-transparent hover:bg-stone-50 text-stone-900 font-mono font-bold text-xs uppercase tracking-wider transition duration-150 cursor-pointer rounded-none flex items-center justify-center gap-2"
                  >
                    <span>{isExpanded ? 'Show Less Reviews' : 'Show More Reviews'}</span>
                    {isExpanded ? (
                      <X className="w-3.5 h-3.5 text-stone-800" />
                    ) : (
                      <Plus className="w-4 h-4 text-stone-800" />
                    )}
                  </button>
                )}

                {/* Pagination Controls (Pages number): Only shown if not expanded and total pages > 1 */}
                {!isExpanded && totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    {/* Previous Arrow */}
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 transition rounded-none cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 font-mono text-xs font-bold transition flex items-center justify-center cursor-pointer rounded-none border ${
                            isActive
                              ? 'border-stone-900 bg-stone-900 text-white'
                              : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Next Arrow */}
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 transition rounded-none cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6 6-6"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};
