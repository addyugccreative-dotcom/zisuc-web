import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, Plus, Minus, ShieldCheck, Heart, ShoppingCart, Sparkles, Headphones, Globe, Lock } from 'lucide-react';
import { motion, useInView, animate, AnimatePresence } from 'motion/react';
import { Product, CustomizerSettings } from '../types';
import { SafeImage } from './SafeImage';
import { BundleSection } from './BundleSection';
import { YouMayAlsoLikeSection } from './YouMayAlsoLikeSection';
import { ProductReviewsSection } from './ProductReviewsSection';
import { LuxuryButton } from './LuxuryButton';
import { Currency, convertAndFormatPrice, parseUsdPrice, SUPPORTED_CURRENCIES } from '../lib/currency';
import { ReviewUgcSection } from './ReviewUgcSection';
import { ChromaKeyVideo } from './ChromaKeyVideo';
import { OptimizedVideo } from './OptimizedVideo';
import { getProductBadge, getBadgeConfig } from './ProductCard';

const getBrighteningRightImageForId = (id: string, title?: string): string => {
  const lowercaseId = id.toLowerCase();
  const lowercaseTitle = (title || "").toLowerCase();
  
  if (lowercaseId === "e-bap-powder-cleanser" || lowercaseId.includes("e-bap") || lowercaseTitle.includes("e-bap") || (lowercaseId.includes("powder") && lowercaseId.includes("cleanser"))) {
    return encodeURI("/Brightening support with vitamins section E-BAP Powder Cleanser right side image.png");
  }
  if (lowercaseId === "kira-60-c-tide-cream" || (lowercaseId.includes("kira") && lowercaseId.includes("cream")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("cream"))) {
    return encodeURI("/Brightening support with vitamins section Kira 60\u00cb\u009a C-Tide Cream right side image.png");
  }
  if (lowercaseId === "kira-60-c-tide-serum" || lowercaseId === "kira-60-c-tide-rose-serum" || (lowercaseId.includes("kira") && lowercaseId.includes("serum")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("serum"))) {
    return encodeURI("/Brightening support with vitamins section Kira 60\u00cb\u009a C-Tide Serum right side image.png");
  }
  if (lowercaseId === "kira-60-c-tide-multi-mist" || (lowercaseId.includes("kira") && lowercaseId.includes("mist")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("mist"))) {
    return encodeURI("/Brightening support with vitamins section Kira 60\u00cb\u009a C-Tide Multi Mist right side image.png");
  }
  if (lowercaseId === "cica-pin-cell-skin-trigger" || lowercaseId.includes("cica") || lowercaseTitle.includes("cica")) {
    return encodeURI("/Brightening support with vitamins section Cica Pin Cell Skin Trigger (Set of 2) right side image.png");
  }
  if (lowercaseId === "galachione-ampoule-pad" || lowercaseId.includes("galachione") || lowercaseTitle.includes("galachione") || lowercaseId.includes("ampoule-pad") || lowercaseTitle.includes("ampoule pad")) {
    return encodeURI("/Brightening support with vitamins section Galachione Ampoule Pad right side image.png");
  }
  if (lowercaseId === "volume-shot-eye-cream" || lowercaseId.includes("volume") || lowercaseTitle.includes("volume") || lowercaseId.includes("eye-cream") || lowercaseTitle.includes("eye cream")) {
    return encodeURI("/Brightening support with vitamins section Volume Shot Eye Cream (Set of 2) right side image.jpg");
  }
  
  return "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000";
};

const getBrighteningLeftImageForId = (id: string, title?: string): string => {
  const lowercaseId = id.toLowerCase();
  const lowercaseTitle = (title || "").toLowerCase();
  
  if (lowercaseId === "e-bap-powder-cleanser" || lowercaseId.includes("e-bap") || lowercaseTitle.includes("e-bap") || (lowercaseId.includes("powder") && lowercaseId.includes("cleanser"))) {
    return encodeURI("/E-BAP Powder Cleanser left side image.png");
  }
  if (lowercaseId === "kira-60-c-tide-cream" || (lowercaseId.includes("kira") && lowercaseId.includes("cream")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("cream"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Cream left side image.png");
  }
  if (lowercaseId === "kira-60-c-tide-rose-serum" || lowercaseId === "kira-60-c-tide-serum" || (lowercaseId.includes("kira") && lowercaseId.includes("serum")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("serum"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Serum left side image.png");
  }
  if (lowercaseId === "kira-60-c-tide-multi-mist" || (lowercaseId.includes("kira") && lowercaseId.includes("mist")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("mist"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Multi Mist left side image.png");
  }
  if (lowercaseId === "cica-pin-cell-skin-trigger" || lowercaseId.includes("cica") || lowercaseTitle.includes("cica")) {
    return encodeURI("/Cica Pin Cell Skin Trigger (Set of 2) left side image.png");
  }
  if (lowercaseId === "galachione-ampoule-pad" || lowercaseId.includes("galachione") || lowercaseTitle.includes("galachione") || lowercaseId.includes("ampoule-pad") || lowercaseTitle.includes("ampoule pad")) {
    return encodeURI("/Galachione Ampoule Pad left side image.png");
  }
  if (lowercaseId === "volume-shot-eye-cream" || lowercaseId.includes("volume") || lowercaseTitle.includes("volume") || lowercaseId.includes("eye-cream") || lowercaseTitle.includes("eye cream")) {
    return encodeURI("/Volume Shot Eye Cream (Set of 2) left side image.png");
  }
  
  return "https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?q=80&w=1000";
};

const getSeeTheChangeLaptopImageForId = (id: string, title?: string): string => {
  const lowercaseId = id.toLowerCase();
  const lowercaseTitle = (title || "").toLowerCase();
  
  if (lowercaseId === "e-bap-powder-cleanser" || lowercaseId.includes("e-bap") || lowercaseTitle.includes("e-bap") || (lowercaseId.includes("powder") && lowercaseId.includes("cleanser"))) {
    return encodeURI("/see the change section image laptop version.png");
  }
  if (lowercaseId === "kira-60-c-tide-cream" || (lowercaseId.includes("kira") && lowercaseId.includes("cream")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("cream"))) {
    return encodeURI("/see the change section  Kira 60\u00cb\u009a C-Tide Cream image laptop version.png");
  }
  if (lowercaseId === "kira-60-c-tide-serum" || lowercaseId === "kira-60-c-tide-rose-serum" || (lowercaseId.includes("kira") && lowercaseId.includes("serum")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("serum"))) {
    return encodeURI("/see the change section  Kira 60\u00cb\u009a C-Tide Serum image laptop version.png");
  }
  if (lowercaseId === "kira-60-c-tide-multi-mist" || (lowercaseId.includes("kira") && lowercaseId.includes("mist")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("mist"))) {
    return encodeURI("/see the change section Kira 60\u00cb\u009a C-Tide Multi Mist image laptop version.png");
  }
  if (lowercaseId === "cica-pin-cell-skin-trigger" || lowercaseId.includes("cica") || lowercaseTitle.includes("cica")) {
    return encodeURI("/see the change section Cica Pin Cell Skin Trigger (Set of 2) image laptop version.png");
  }
  if (lowercaseId === "galachione-ampoule-pad" || lowercaseId.includes("galachione") || lowercaseTitle.includes("galachione") || lowercaseId.includes("ampoule-pad") || lowercaseTitle.includes("ampoule pad")) {
    return encodeURI("/see the change section Galachione Ampoule Pad image laptop version.png");
  }
  
  return "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1600";
};

const getSeeTheChangeMobileImageForId = (id: string, title?: string): string => {
  const lowercaseId = id.toLowerCase();
  const lowercaseTitle = (title || "").toLowerCase();
  
  if (lowercaseId === "e-bap-powder-cleanser" || lowercaseId.includes("e-bap") || lowercaseTitle.includes("e-bap") || (lowercaseId.includes("powder") && lowercaseId.includes("cleanser"))) {
    return encodeURI("/see the change section image mobile verison.png");
  }
  if (lowercaseId === "kira-60-c-tide-cream" || (lowercaseId.includes("kira") && lowercaseId.includes("cream")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("cream"))) {
    return encodeURI("/see the change section  Kira 60\u00cb\u009a C-Tide Cream image mobile version.png");
  }
  if (lowercaseId === "kira-60-c-tide-serum" || lowercaseId === "kira-60-c-tide-rose-serum" || (lowercaseId.includes("kira") && lowercaseId.includes("serum")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("serum"))) {
    return encodeURI("/see the change section  Kira 60\u00cb\u009a C-Tide Serum image mobile version.png");
  }
  if (lowercaseId === "kira-60-c-tide-multi-mist" || (lowercaseId.includes("kira") && lowercaseId.includes("mist")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("mist"))) {
    return encodeURI("/see the change section Kira 60\u00cb\u009a C-Tide Multi Mist image mobile version.png");
  }
  if (lowercaseId === "cica-pin-cell-skin-trigger" || lowercaseId.includes("cica") || lowercaseTitle.includes("cica")) {
    return encodeURI("/see the change section Cica Pin Cell Skin Trigger (Set of 2) image mobile version.png");
  }
  if (lowercaseId === "galachione-ampoule-pad" || lowercaseId.includes("galachione") || lowercaseTitle.includes("galachione") || lowercaseId.includes("ampoule-pad") || lowercaseTitle.includes("ampoule pad")) {
    return encodeURI("/see the change section Galachione Ampoule Pad image mobile version.png");
  }
  
  return "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1600";
};

const getCustomProductImage = (productId: string): string | null => {
  if (productId === 'super-retinol-vitamin-a') return '/serum 1.webp';
  if (productId === 'glow-remedy-hydrating-essence') return '/toner 1.webp';
  if (productId === 'overachiever-balm-cleanser') return '/hair care 1.webp';
  if (productId === 'golden-reset-radiance-oil') return '/sun protection 1.png';
  return null;
};

const getProductVideoUrlForId = (id: string, title?: string): string => {
  const lowercaseId = id.toLowerCase();
  const lowercaseTitle = (title || "").toLowerCase();
  
  if (lowercaseId === "e-bap-powder-cleanser" || lowercaseId.includes("e-bap") || lowercaseTitle.includes("e-bap") || (lowercaseId.includes("powder") && lowercaseId.includes("cleanser"))) {
    return encodeURI("/E-BAP Powder Cleanser video.mp4");
  }
  if (lowercaseId === "kira-60-c-tide-cream" || (lowercaseId.includes("kira") && lowercaseId.includes("cream")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("cream"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Cream video.mp4");
  }
  if (lowercaseId === "kira-60-c-tide-rose-serum" || lowercaseId === "kira-60-c-tide-serum" || (lowercaseId.includes("kira") && lowercaseId.includes("serum")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("serum"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Serum video.mp4");
  }
  if (lowercaseId === "kira-60-c-tide-multi-mist" || (lowercaseId.includes("kira") && lowercaseId.includes("mist")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("mist"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Multi Mist video.mp4");
  }
  if (lowercaseId === "cica-pin-cell-skin-trigger" || lowercaseId.includes("cica") || lowercaseTitle.includes("cica")) {
    return encodeURI("/Cica Pin Cell Skin Trigger (Set of 2) video.mp4");
  }
  if (lowercaseId === "galachione-ampoule-pad" || lowercaseId.includes("galachione") || lowercaseTitle.includes("galachione") || lowercaseId.includes("ampoule-pad") || lowercaseTitle.includes("ampoule pad")) {
    return encodeURI("/Galachione Ampoule Pad video.mp4");
  }
  if (lowercaseId === "volume-shot-eye-cream" || lowercaseId.includes("volume") || lowercaseTitle.includes("volume") || lowercaseId.includes("eye-cream") || lowercaseTitle.includes("eye cream")) {
    return encodeURI("/Volume Shot Eye Cream (Set of 2) video.mp4");
  }
  
  return encodeURI("/video frame 1.mp4");
};

const getBeforeImageForId = (id: string, title?: string): string => {
  const lowercaseId = id.toLowerCase();
  const lowercaseTitle = (title || "").toLowerCase();
  
  if (lowercaseId === "e-bap-powder-cleanser" || lowercaseId.includes("e-bap") || lowercaseTitle.includes("e-bap") || (lowercaseId.includes("powder") && lowercaseId.includes("cleanser"))) {
    return encodeURI("/E-BAP Powder Cleanser before image-1.png");
  }
  if (lowercaseId === "kira-60-c-tide-cream" || (lowercaseId.includes("kira") && lowercaseId.includes("cream")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("cream"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Cream before image-1.png");
  }
  if (lowercaseId === "kira-60-c-tide-rose-serum" || lowercaseId === "kira-60-c-tide-serum" || (lowercaseId.includes("kira") && lowercaseId.includes("serum")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("serum"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Serum before image-1.png");
  }
  if (lowercaseId === "kira-60-c-tide-multi-mist" || (lowercaseId.includes("kira") && lowercaseId.includes("mist")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("mist"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Multi Mist before image-1.png");
  }
  if (lowercaseId === "cica-pin-cell-skin-trigger" || lowercaseId.includes("cica") || lowercaseTitle.includes("cica")) {
    return encodeURI("/Cica Pin Cell Skin Trigger (Set of 2) before image-1.png");
  }
  if (lowercaseId === "galachione-ampoule-pad" || lowercaseId.includes("galachione") || lowercaseTitle.includes("galachione") || lowercaseId.includes("ampoule-pad") || lowercaseTitle.includes("ampoule pad")) {
    return encodeURI("/Galachione Ampoule Pad before image-1.png");
  }
  if (lowercaseId === "volume-shot-eye-cream" || lowercaseId.includes("volume") || lowercaseTitle.includes("volume") || lowercaseId.includes("eye-cream") || lowercaseTitle.includes("eye cream")) {
    return encodeURI("/Volume Shot Eye Cream (Set of 2) before image-1.png");
  }
  
  return "/before image.png";
};

const getAfterImageForId = (id: string, title?: string): string => {
  const lowercaseId = id.toLowerCase();
  const lowercaseTitle = (title || "").toLowerCase();
  
  if (lowercaseId === "e-bap-powder-cleanser" || lowercaseId.includes("e-bap") || lowercaseTitle.includes("e-bap") || (lowercaseId.includes("powder") && lowercaseId.includes("cleanser"))) {
    return encodeURI("/E-BAP Powder Cleanser after image-1.png");
  }
  if (lowercaseId === "kira-60-c-tide-cream" || (lowercaseId.includes("kira") && lowercaseId.includes("cream")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("cream"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Cream after image-1.png");
  }
  if (lowercaseId === "kira-60-c-tide-rose-serum" || lowercaseId === "kira-60-c-tide-serum" || (lowercaseId.includes("kira") && lowercaseId.includes("serum")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("serum"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Serum after image-1.png");
  }
  if (lowercaseId === "kira-60-c-tide-multi-mist" || (lowercaseId.includes("kira") && lowercaseId.includes("mist")) || (lowercaseTitle.includes("kira") && lowercaseTitle.includes("mist"))) {
    return encodeURI("/Kira 60\u00cb\u009a C-Tide Multi Mist after image-1.png");
  }
  if (lowercaseId === "cica-pin-cell-skin-trigger" || lowercaseId.includes("cica") || lowercaseTitle.includes("cica")) {
    return encodeURI("/Cica Pin Cell Skin Trigger (Set of 2) after image-1.png");
  }
  if (lowercaseId === "galachione-ampoule-pad" || lowercaseId.includes("galachione") || lowercaseTitle.includes("galachione") || lowercaseId.includes("ampoule-pad") || lowercaseTitle.includes("ampoule pad")) {
    return encodeURI("/Galachione Ampoule Pad after image-1.png");
  }
  if (lowercaseId === "volume-shot-eye-cream" || lowercaseId.includes("volume") || lowercaseTitle.includes("volume") || lowercaseId.includes("eye-cream") || lowercaseTitle.includes("eye cream")) {
    return encodeURI("/Volume Shot Eye Cream (Set of 2) after image-1.png");
  }
  
  return "/after image.png";
};

const getProductBullets = (productId: string): string[] => {
  const idLower = productId.toLowerCase();
  if (idLower.includes('e-bap') || idLower.includes('powder-cleanser')) {
    return [
      "Gently dissolves dead skin cells with active Papain enzymes",
      "Sub-acidic (pH 5.5) formula preserves the skin's protective lipid barrier",
      "Deeply purifies pores of sebum and daily impurities without tightness",
      "Infused with Allantoin and Beta-Glucan to calm and hydrate"
    ];
  }
  if (idLower.includes('kira') || idLower.includes('c-tide') || idLower.includes('tide-cream')) {
    return [
      "Formulated with 60% Centella Asiatica Extract to instantly soothe redness",
      "Marine Peptide Complex reconstructs collagen fibers for youthful elasticity",
      "Ceramides and Squalane deeply nourish and restore weakened skin barriers",
      "Heals dry, irritated, or sensitive skin with a rich, non-greasy velvet finish"
    ];
  }
  if (idLower.includes('galachione') || idLower.includes('ampoule-pad')) {
    return [
      "Galactomyces and Glutathione synergetically fade dark spots and dullness",
      "5% Niacinamide visibly refines enlarged pores and brightens skin tone",
      "Dual-sided pad design acts as both daily exfoliator and intensive sheet mask",
      "Deeply hydrates and plumps to achieve a glazed, glass-skin radiance"
    ];
  }

  switch (productId) {
    case 'super-retinol-vitamin-a':
      return [
        "Retinal works to visibly reduce fine lines & wrinkles",
        "Accelerates skin cell renewal for ultimate smooth texture",
        "Soothes deep skin matrices and hydrates extensively",
        "Perfect lock for dry, dull, or sensitive skin profiles"
      ];
    case 'golden-reset-radiance-oil':
      return [
        "Peptides work to visibly reduce fine lines & wrinkles",
        "Boosts skin elasticity and seals moisture barriers",
        "Willowherb & chamomile soothe skin",
        "Suitable for sensitive skin and leaves a glazed glow"
      ];
    case 'glow-boost-vitamin-c':
      return [
        "15% Vitamin C complex visibly dissolves dark spots",
        "Fades stubborn blemishes and pigment residues",
        "Combats premature aging and pollution stressors",
        "Soft and light hydration daily on clean fresh skin"
      ];
    case 'peaches-peptide-serum':
      return [
        "Sextuple Peptide chain actively lifts sagging areas",
        "Increases healthy elasticity and firmness up to 45%",
        "Feeds direct bio-collagen to skin surface layers",
        "Locks down overnight hydration seamlessly without shine"
      ];
    case 'cloud-whip-barrier-repair':
      return [
        "Airy triple-whipped cream feels like a silk cloud",
        "Replenishes healthy surface lipids and ceramides",
        "Calms and resolves redness or dry patches instantly",
        "Double chamber airtight jars preserve perfect active potency"
      ];
    case 'glow-remedy-hydrating-essence':
      return [
        "Polypeptides work to lock inside ultimate moisture factor",
        "Plumps skin surface cells with hydration complex",
        "Prepares raw skin layer for active daily treatment boost",
        "Feeds vitamins and organic enzymes to deep structures"
      ];
    default:
      return [
        "Provides rich nourishment to skin surface layers",
        "Boosts skin cell renewal and locks in hydration",
        "Calms redness, dry patches, and environmental stress",
        "Suitable for sensitive and dry skin types"
      ];
  }
};

interface ProvenMetric {
  value: number;
  label: string;
}

const getProvenResultsForProduct = (productId: string, productName: string): [ProvenMetric, ProvenMetric] => {
  const id = productId.toLowerCase();
  
  if (id.includes('e-bap') || id.includes('powder-cleanser')) {
    return [
      { value: 96, label: "reported cleaner pores and smoother skin after the first wash" },
      { value: 92, label: "agreed it gently exfoliated without stripping natural moisture" }
    ];
  }
  
  if (id.includes('kira-60-c-tide-cream') || id.includes('tide-cream') || id.includes('kira-c-tide-cream')) {
    return [
      { value: 98, label: "experienced rapid soothing of redness and skin irritation" },
      { value: 95, label: "observed a stronger, deeply restored moisture barrier in 7 days" }
    ];
  }
  
  if (id.includes('galachione') || id.includes('ampoule-pad') || id.includes('pad')) {
    return [
      { value: 94, label: "noticed brighter, glass-like skin radiance within 1 week" },
      { value: 89, label: "saw a visible reduction in dark spots and uneven pigmentation" }
    ];
  }
  
  if (id.includes('kira-60-c-tide-serum') || id.includes('tide-serum')) {
    return [
      { value: 97, label: "reported plumper, more elastic skin with a youthfully bouncy feel" },
      { value: 91, label: "noticed reduced fine lines and significantly smoother skin texture" }
    ];
  }
  
  if (id.includes('kira-60-c-tide-multi-mist') || id.includes('mist')) {
    return [
      { value: 93, label: "felt an instant, refreshing boost of deep hydration on-the-go" },
      { value: 88, label: "observed a continuous, healthy dewy glow throughout the day" }
    ];
  }
  
  if (id.includes('cica-pin-cell') || id.includes('trigger') || id.includes('pin-cell')) {
    return [
      { value: 95, label: "saw dramatic improvement in stubborn acne scars and bumpy texture" },
      { value: 92, label: "experienced highly enhanced absorption of their regular active serums" }
    ];
  }
  
  if (id.includes('volume-shot-eye-cream') || id.includes('eye-cream')) {
    return [
      { value: 89, label: "reported a visible reduction in under-eye hollows and dark circles" },
      { value: 94, label: "agreed skin around eyes felt instantly firmer and visibly lifted" }
    ];
  }

  if (id.includes('super-retinol') || id.includes('retinol')) {
    return [
      { value: 91, label: "noticed a clear reduction in fine lines and deeper set wrinkles" },
      { value: 96, label: "saw smoother, more even-toned skin with refined pores" }
    ];
  }

  if (id.includes('golden-reset') || id.includes('radiance-oil') || id.includes('oil')) {
    return [
      { value: 95, label: "experienced intense overnight moisture retention with a glazed finish" },
      { value: 90, label: "agreed it locks down deep hydration without leaving a greasy residue" }
    ];
  }

  if (id.includes('glow-boost') || id.includes('vitamin-c') || id.includes('vitamin')) {
    return [
      { value: 96, label: "noticed significantly brighter skin and dissolved dark spots" },
      { value: 93, label: "agreed skin tone appeared more uniform and highly revitalized" }
    ];
  }

  if (id.includes('peaches-peptide') || id.includes('peaches') || id.includes('peptide')) {
    return [
      { value: 94, label: "reported skin felt plumper, firmer, and more resilient in 2 weeks" },
      { value: 87, label: "saw a visible lift in sagging areas around jaw and cheeks" }
    ];
  }

  if (id.includes('cloud-whip') || id.includes('barrier-repair') || id.includes('moisturizer')) {
    return [
      { value: 97, label: "experienced instant soothing of dry patches and skin itchiness" },
      { value: 93, label: "agreed their sensitive skin felt fully protected and comfortable" }
    ];
  }

  if (id.includes('glow-remedy') || id.includes('essence') || id.includes('glow')) {
    return [
      { value: 95, label: "felt skin was deeply hydrated, bouncy, and primed for active serums" },
      { value: 91, label: "observed a healthier, glass-skin texture within 10 days" }
    ];
  }

  // Fallback to a fully deterministic result based on the product ID character code sum
  // to guarantee different numbers for any newly added product
  let sum = 0;
  for (let idx = 0; idx < id.length; idx++) {
    sum += id.charCodeAt(idx);
  }
  const val1 = 82 + (sum % 13); // 82 to 94
  const val2 = 85 + ((sum + 7) % 11); // 85 to 95
  
  return [
    { value: val1, label: "reported a dramatic improvement in skin hydration and bounce" },
    { value: val2, label: "agreed skin appeared visibly healthier, smoother, and radiant" }
  ];
};

// Helper component for animated progress metrics
const AnimatedMetric: React.FC<{ value: number; label: string; delay?: number; color: string }> = ({ value, label, delay = 0, color }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = 0;
    const end = value;
    const duration = 1800; // 1.8 seconds for nice visual pacing
    const startTime = performance.now();

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuart(progress);
      
      setCount(Math.floor(easeProgress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  // This strokeDashoffset updates dynamically in absolute lockstep with the count state
  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col text-left">
      <div className="flex items-center gap-4 sm:gap-5">
        <span className="text-[64px] sm:text-[76px] font-heading font-normal text-stone-900 tracking-tighter leading-none select-none">
          {count}%
        </span>
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-stone-100"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke={color}
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <p className="text-stone-850 font-heading font-normal text-[15px] sm:text-[17px] leading-[1.35] mt-3 tracking-tight max-w-[190px]">
        {label}
      </p>
    </div>
  );
};

// Helper component for interactive before & after slider
interface BeforeAfterSliderProps {
  product: Product;
  activeCurrency: Currency;
  themeColor: string;
  onAddToCart: () => void;
  activeColorName?: string;
  activeImageIdx: number;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  product,
  activeCurrency,
  themeColor,
  onAddToCart,
  activeColorName,
  activeImageIdx,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [isAdded, setIsAdded] = useState(false);

  // Self-healing before & after image states to prevent broken images with fallback to default images
  const [beforeImage, setBeforeImage] = useState(getBeforeImageForId(product.id, product.title));
  const [afterImage, setAfterImage] = useState(getAfterImageForId(product.id, product.title));

  useEffect(() => {
    setBeforeImage(getBeforeImageForId(product.id, product.title));
    setAfterImage(getAfterImageForId(product.id, product.title));
  }, [product.id, product.title]);

  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  // Update width dynamically using ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
    setHasUserInteracted(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  // One-time automatic peek animation when in view
  useEffect(() => {
    if (isInView && !hasUserInteracted) {
      let isCancelled = false;
      let activeAnimationId: number;

      const animateSlider = (from: number, to: number, duration: number, onComplete: () => void) => {
        const startTime = performance.now();
        const run = (now: number) => {
          if (isCancelled || hasUserInteracted) return;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          const current = from + (to - from) * ease;
          setSliderPosition(current);
          if (progress < 1) {
            activeAnimationId = requestAnimationFrame(run);
          } else {
            onComplete();
          }
        };
        activeAnimationId = requestAnimationFrame(run);
      };

      const timer = setTimeout(() => {
        if (isCancelled || hasUserInteracted) return;
        animateSlider(50, 25, 500, () => {
          if (isCancelled || hasUserInteracted) return;
          animateSlider(25, 75, 700, () => {
            if (isCancelled || hasUserInteracted) return;
            animateSlider(75, 50, 500, () => {});
          });
        });
      }, 500);

      return () => {
        isCancelled = true;
        clearTimeout(timer);
        if (activeAnimationId) {
          cancelAnimationFrame(activeAnimationId);
        }
      };
    }
  }, [isInView, hasUserInteracted]);

  const handleCardAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const productThumbnail = (activeImageIdx === 0 && getCustomProductImage(product.id)) || product.images[activeImageIdx] || product.images[0];

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-w-5xl mx-auto rounded-[24px] overflow-hidden bg-stone-100 border border-stone-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] cursor-ew-resize select-none"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX);
        }
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Bottom Layer) */}
      <img decoding="async" loading="lazy" 
        src={afterImage} 
        alt="After application" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        onError={() => {
          if (afterImage !== "/after image.png") {
            setAfterImage("/after image.png");
          }
        }}
      />
      
      {/* Before Image (Top Layer, dynamic width) */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img decoding="async" loading="lazy" 
          src={beforeImage} 
          alt="Before application" 
          className="absolute inset-0 h-full object-cover max-w-none pointer-events-none"
          style={{ width: containerWidth }}
          onError={() => {
            if (beforeImage !== "/before image.png") {
              setBeforeImage("/before image.png");
            }
          }}
        />
      </div>

      {/* BEFORE Badge styled exactly like first screenshot */}
      <div className="absolute bottom-5 left-5 bg-stone-900/80 backdrop-blur-md text-stone-100 text-[10px] sm:text-xs font-mono font-medium py-1.5 px-3.5 uppercase tracking-widest rounded-[4px] select-none pointer-events-none z-10">
        BEFORE
      </div>

      {/* AFTER Badge styled exactly like first screenshot */}
      <div className="absolute bottom-5 right-5 bg-stone-900/80 backdrop-blur-md text-stone-100 text-[10px] sm:text-xs font-mono font-medium py-1.5 px-3.5 uppercase tracking-widest rounded-[4px] select-none pointer-events-none z-10">
        AFTER
      </div>
      
      {/* Slider Line and Handle (with vertical double bars "||" instead of "< >" as requested) */}
      <div 
        className="absolute top-0 bottom-0 w-[1.5px] bg-white shadow-lg pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-stone-200/80 shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex items-center justify-center select-none pointer-events-auto cursor-ew-resize hover:scale-105 active:scale-95 transition-transform duration-150">
          <div className="flex gap-[3.5px] items-center justify-center select-none">
            <div className="w-[3px] h-[14px] bg-stone-700 rounded-full opacity-80" />
            <div className="w-[3px] h-[14px] bg-stone-700 rounded-full opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface KeyIngredientsSectionProps {
  product?: Product;
}

// Helper component for key ingredients grid - redesigned as requested (middle product image, 2 ingredients on each side, with rise up fade in animations and responsive same style layout)
const KeyIngredientsSection: React.FC<KeyIngredientsSectionProps> = ({ product }) => {
  let leftIngredients = [
    {
      title: "Tangerine Extract",
      desc: "Deeply nourishes and moisturizes dry skin. Rich in vitamins A, D, and E, it helps improve skin elasticity.",
      image: "https://images.unsplash.com/photo-1597718010486-090c2f3060c1?q=80&w=400"
    },
    {
      title: "Argan Oil",
      desc: "An ultra-rich organic oil that deeply conditions, softens skin texture, and enhances natural radiance.",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=400"
    }
  ];

  let rightIngredients = [
    {
      title: "Aloe Juice",
      desc: "Instantly cools, hydrates, and calms sensitive skin, delivering lightweight botanical hydration.",
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=400"
    },
    {
      title: "Annatto Oil",
      desc: "A rare seed oil packed with beta-carotene that protects skin and restores healthy barrier integrity.",
      image: "https://images.unsplash.com/photo-1511112535125-97d7a701f6ec?q=80&w=400"
    }
  ];

  // Get the product image dynamically, fallback to /cream card image.png if not loaded
  const productImg = product?.images?.[0] || "/cream card image.png";

  const isKiraCream = product?.id === "kira-60-c-tide-cream" || 
                      product?.id?.toLowerCase().includes("kira-60-c-tide-cream") ||
                      (product?.title?.toLowerCase().includes("kira") && product?.title?.toLowerCase().includes("cream")) ||
                      product?.title?.toLowerCase().includes("c-tide cream");

  const isEbapCleanser = product?.title?.toLowerCase().includes("e-bap") ||
                         product?.title?.toLowerCase().includes("powder cleanser") ||
                         product?.id?.toLowerCase().includes("e-bap");

  const isCicaTrigger = product?.title?.toLowerCase().includes("cica pin cell") ||
                        product?.id?.toLowerCase().includes("cica-pin-cell");

  const isGalachionePad = product?.title?.toLowerCase().includes("galachione") ||
                          product?.id?.toLowerCase().includes("galachione") ||
                          product?.title?.toLowerCase().includes("ampoule pad") ||
                          product?.id?.toLowerCase().includes("ampoule-pad");

  const isEyeCream = product?.title?.toLowerCase().includes("volume shot") ||
                     product?.id?.toLowerCase().includes("volume-shot") ||
                     product?.title?.toLowerCase().includes("eye cream") ||
                     product?.id?.toLowerCase().includes("eye-cream");

  const isKiraSerum = product?.id === "kira-60-c-tide-serum" || 
                      product?.id?.toLowerCase().includes("kira-60-c-tide-serum") ||
                      product?.id === "kira-60-c-tide-rose-serum" ||
                      (product?.title?.toLowerCase().includes("kira") && product?.title?.toLowerCase().includes("serum")) ||
                      product?.title?.toLowerCase().includes("c-tide serum");

  const isKiraMist = product?.id === "kira-60-c-tide-multi-mist" || 
                     product?.id?.toLowerCase().includes("kira-60-c-tide-multi-mist") ||
                     (product?.title?.toLowerCase().includes("kira") && product?.title?.toLowerCase().includes("mist")) ||
                     product?.title?.toLowerCase().includes("multi mist");

  if (isCicaTrigger) {
    leftIngredients = [
      {
        title: "Botanical Complex",
        desc: "A synergistic blend of premium botanical extracts that purifies, calms, and fortifies the skin barrier.",
        image: "/Cica Pin Cell Skin Trigger (Set of 2) botanical complex ingredient 1.png"
      },
      {
        title: "Niacinamide",
        desc: "A potent Vitamin B3 that visibly refines skin texture, minimizes pores, and targets post-treatment redness.",
        image: "/Cica Pin Cell Skin Trigger (Set of 2) nicinamide ingredient 2.png"
      }
    ];

    rightIngredients = [
      {
        title: "Peptides",
        desc: "Advanced amino chains that accelerate skin repair, boost natural collagen, and firm micro-treated layers.",
        image: "/Cica Pin Cell Skin Trigger (Set of 2) peptides ingredient 3.png"
      },
      {
        title: "Panthenol & Allantoin",
        desc: "An ultra-soothing duo that locks in essential moisture, alleviates irritation, and speeds up recovery.",
        image: "/Cica Pin Cell Skin Trigger (Set of 2) panthenol & allention ingredient 4.png"
      }
    ];
  } else if (isEbapCleanser) {
    leftIngredients = [
      {
        title: "Exfoliation Complex",
        desc: "Gentle plant enzymes and mild acids that sweep away dead cells and polish skin texture.",
        image: "/E-BAP Powder Cleanser exfoliation complex ingredient 1.png"
      },
      {
        title: "Botanical Complex",
        desc: "A calming herbal blend that deeply purifies pores and balances natural sebum production.",
        image: "/E-BAP Powder Cleanser botanical complex ingredient 2.png"
      }
    ];

    rightIngredients = [
      {
        title: "Hydration Complex",
        desc: "A rich moisture-locking blend that replenishes essential hydration and prevents tightness.",
        image: "/E-BAP Powder Cleanser hydration complex ingredient 3.png"
      },
      {
        title: "Centella & Ginseng",
        desc: "Traditional herbs that soothe active irritation, promote healing, and revitalize the skin.",
        image: "/E-BAP Powder Cleanser centella & ginseng ingredient 4.png"
      }
    ];
  } else if (isKiraCream) {
    leftIngredients = [
      {
        title: "Botanical Complex",
        desc: "A rich collection of premium extracts that naturally fortifies, purifies, and strengthens skin vitality.",
        image: "/Kira 60˚ C-Tide Cream botanical complex ingredient 1.png"
      },
      {
        title: "Ginseng Exosome",
        desc: "An advanced, highly bioavailable extract that enhances cellular energy, elasticity, and youthfulness.",
        image: "/Kira 60˚ C-Tide Cream ginseng exosome ingredient 2.png"
      }
    ];

    rightIngredients = [
      {
        title: "Centella Exosome",
        desc: "A powerful, concentrated active that deeply calms redness, repairs damage, and supports skin barrier restoration.",
        image: "/Kira 60˚ C-Tide Cream centella exosome ingredient 3.png"
      },
      {
        title: "Soothing Hydration",
        desc: "A skin-identical moisture blend that instantly quenches dehydration and locks in comfortable, long-lasting softness.",
        image: "/Kira 60˚ C-Tide Cream soothing hydration ingredient 4.png"
      }
    ];
  } else if (isGalachionePad) {
    leftIngredients = [
      {
        title: "Botanical Extract",
        desc: "A comforting blend of botanical extracts that purifies, deeply hydrates, and balances the skin.",
        image: "/Galachione Ampoule Pad botanical extract  ingredient 1.png"
      },
      {
        title: "Hyaluronic Acid & Betaine",
        desc: "A moisture-binding duo that floods the skin with hydration, leaving it plump and dewy.",
        image: "/Galachione Ampoule Pad hyaluronic acide & betaine ingredient 2.png"
      }
    ];

    rightIngredients = [
      {
        title: "Galactomyces",
        desc: "Rich in vitamins, amino acids, and minerals to visibly brighten, refine texture, and restore healthy radiance.",
        image: "/Galachione Ampoule Pad Galactomyces ingredient 3.png"
      },
      {
        title: "Panthenol & Allantoin",
        desc: "A skin-soothing powerhouse that calms sensitive areas, strengthens the moisture barrier, and accelerates recovery.",
        image: "/Galachione Ampoule Pad panthenol & allentoin ingredient 4.png"
      }
    ];
  } else if (isEyeCream) {
    leftIngredients = [
      {
        title: "Cicasome",
        desc: "A specialized, highly-concentrated centella extract designed to intensively soothe the delicate eye area and support skin recovery.",
        image: "/Volume Shot Eye Cream (Set of 2) cicasome ingredient 1.png"
      },
      {
        title: "Bakuchiol",
        desc: "A gentle, plant-based retinol alternative that targets fine lines and boosts elasticity without causing irritation.",
        image: "/Volume Shot Eye Cream (Set of 2) bakuchiol ingredient 2.png"
      }
    ];

    rightIngredients = [
      {
        title: "Edelweiss",
        desc: "A resilient botanical extract rich in natural antioxidants that works to firm, lift, and protect fragile skin around the eyes.",
        image: "/Volume Shot Eye Cream (Set of 2) edelweiss ingredient 3.png"
      },
      {
        title: "Borfillin",
        desc: "A premium, patented lipid-plumping active that visibly enhances volume and fills in hollow areas for a youthful look.",
        image: "/Volume Shot Eye Cream (Set of 2) borfillin ingredient 4.png"
      }
    ];
  } else if (isKiraSerum) {
    leftIngredients = [
      {
        title: "Peptides",
        desc: "A high-performance peptide complex that boosts collagen production, firms the skin, and targets fine lines and wrinkles.",
        image: "/Kira 60˚ C-Tide Serum peptides ingredient 1.png"
      },
      {
        title: "Botanical Extracts",
        desc: "A selection of pure botanical extracts that deeply nourish, soothe redness, and improve skin elasticity.",
        image: "/Kira 60˚ C-Tide Serum botanical extracts ingredient 2.png"
      }
    ];

    rightIngredients = [
      {
        title: "Panthenol & Allantoin",
        desc: "A calming power duo that strengthens the skin's moisture barrier, minimizes irritation, and speeds up cellular recovery.",
        image: "/Kira 60˚ C-Tide Serum pantheonl & allentoin ingredient 3.png"
      },
      {
        title: "Niacinamide",
        desc: "An ultra-effective form of Vitamin B3 that visibly brightens uneven tone, refines skin texture, and diminishes pores.",
        image: "/Kira 60˚ C-Tide Serum niacinamide ingredient 4.png"
      }
    ];
  } else if (isKiraMist) {
    leftIngredients = [
      {
        title: "Niacinamide",
        desc: "An ultra-effective form of Vitamin B3 that visibly brightens uneven tone, refines skin texture, and diminishes pores.",
        image: "/Kira 60˚ C-Tide Multi Mist niacinamide ingredient 1.png"
      },
      {
        title: "Peptides",
        desc: "A high-performance peptide complex that boosts collagen production, firms the skin, and targets fine lines and wrinkles.",
        image: "/Kira 60˚ C-Tide Multi Mist peptides ingredient 2.png"
      }
    ];

    rightIngredients = [
      {
        title: "Panthenol & Allantoin",
        desc: "A calming power duo that strengthens the skin's moisture barrier, minimizes irritation, and speeds up cellular recovery.",
        image: "/Kira 60˚ C-Tide Multi Mist pantheonl & allentoin ingredient 3.png"
      },
      {
        title: "Botanical Extracts",
        desc: "A selection of pure botanical extracts that deeply nourish, soothe redness, and improve skin elasticity.",
        image: "/Kira 60˚ C-Tide Multi Mist botanical extracts ingredient 4.png"
      }
    ];
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const centerImageVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const ingredientCardVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div id="key-ingredients-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-28 text-center relative overflow-hidden">
      {/* Background soft ambient glow (Subtle, elegant) */}
      <div id="glow-effect" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-100/30 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Heading Animation - Rise up fade in */}
      <motion.div
        id="ingredients-heading-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center mb-10"
      >
        <p className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.25em] text-stone-400 uppercase mb-4">
          KEY INGREDIENTS
        </p>
        
        {/* Massive elegant Serif italic title matching Screenshot 1 */}
        <h2 className="text-3xl sm:text-6xl lg:text-[72px] font-serif font-normal text-stone-900 tracking-tight leading-[1.1] mb-4 max-w-4xl mx-auto px-4">
          Look closer. Glow<br className="hidden sm:block" />
          deeper. Every ingredient<br className="hidden sm:block" />
          is<br className="hidden sm:block" />
          <span className="italic">chosen with intention.</span>
        </h2>

        {/* Styled center-indicator dot under heading to match Screenshot 1 */}
        <div className="w-[30px] h-[30px] rounded-full border border-stone-200 bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] mt-6">
          <div className="w-[6px] h-[6px] bg-stone-900 rounded-full" />
        </div>
      </motion.div>

      {/* Main Layout: Stacked zig-zag on mobile, 3-column on tablet/desktop */}
      <div 
        id="ingredients-grid-container"
        className="flex flex-col md:grid md:grid-cols-[1.2fr_1.6fr_1.2fr] lg:grid-cols-12 gap-8 md:gap-6 lg:gap-8 items-center"
      >
        {/* LEFT COLUMN: 2 ingredients */}
        <div id="left-ingredients-col" className="col-span-1 lg:col-span-3 w-full flex flex-col gap-10 sm:gap-16 order-1">
          {leftIngredients.map((ing, idx) => (
            <motion.div 
              key={idx}
              id={`left-ing-${idx}`}
              variants={ingredientCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              whileHover={{ y: -5 }}
              className={`flex flex-col items-center text-center max-w-[170px] xs:max-w-[200px] sm:max-w-sm group cursor-pointer ${idx === 0 ? 'self-start md:self-center' : 'self-end md:self-center'}`}
            >
              {/* Image Frame */}
              <div className="w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center relative mb-3 sm:mb-5 lg:mb-6 transition-all duration-500 hover:scale-105 rounded-full overflow-hidden bg-white/50 border border-stone-200/40 shadow-sm">
                <img decoding="async" loading="lazy" 
                  src={ing.image} 
                  alt={ing.title} 
                  className="w-full h-full object-cover filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]" 
                />
              </div>
              <h3 className="font-serif text-[15px] sm:text-[22px] text-stone-900 font-normal tracking-tight mb-1 sm:mb-2.5 group-hover:text-stone-950 transition-colors duration-300">
                {ing.title}
              </h3>
              <p className="block text-stone-500 font-sans text-[11px] sm:text-[14px] font-light leading-[1.3] sm:leading-relaxed tracking-wide mt-0.5 sm:mt-0 group-hover:text-stone-800 transition-colors duration-300">
                {ing.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CENTER COLUMN: Large prominent product image or video */}
        <motion.div 
          id="center-product-col"
          variants={centerImageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -25% 0px" }}
          className="col-span-1 lg:col-span-6 w-full flex justify-center items-center order-2 py-4 lg:py-6"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[700px] flex justify-center items-center">
            {/* Elegant luxury floating shadow underneath */}
            <div className="absolute bottom-[-10px] w-4/5 h-6 bg-stone-900/5 blur-xl rounded-full" />

            
            {isKiraCream ? (
              <motion.div 
                id="kira-cream-360-video-container"
                className="w-full aspect-square sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] flex items-center justify-center cursor-pointer scale-[1.3] sm:scale-100"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.4 }
                }}
              >
                <ChromaKeyVideo 
                  src="/360 rotate Kira 60˚ C-Tide Cream.mp4"
                  className="w-full h-full"
                  removeSilverCap={true}
                  zoom={1.35}
                  aboveTheFold={true}
                />
              </motion.div>
            ) : isEbapCleanser ? (
              <motion.div 
                id="ebap-cleanser-360-video-container"
                className="w-full aspect-square sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] flex items-center justify-center cursor-pointer scale-[1.3] sm:scale-100"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.4 }
                }}
              >
                <ChromaKeyVideo 
                  src="/360 rotate E-BAP Powder Cleanser.webm"
                  className="w-full h-full"
                  zoom={1.25}
                  aboveTheFold={true}
                />
              </motion.div>
            ) : isCicaTrigger ? (
              <motion.div 
                id="cica-trigger-360-video-container"
                className="w-full aspect-square sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] flex items-center justify-center cursor-pointer scale-[1.3] sm:scale-100"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.4 }
                }}
              >
                <ChromaKeyVideo 
                  src="/360 rotate Cica Pin Cell Skin Trigger (Set of 2).webm"
                  className="w-full h-full"
                  zoom={1.08}
                  aboveTheFold={true}
                />
              </motion.div>
            ) : isGalachionePad ? (
              <motion.div 
                id="galachione-pad-360-video-container"
                className="w-full aspect-square sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] flex items-center justify-center cursor-pointer scale-[1.3] sm:scale-100"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.4 }
                }}
              >
                <ChromaKeyVideo 
                  src="/360 rotate Galachione Ampoule Pad.webm"
                  className="w-full h-full"
                  zoom={1.25}
                  aboveTheFold={true}
                />
              </motion.div>
            ) : isKiraSerum ? (
              <motion.div 
                id="kira-serum-360-video-container"
                className="w-full aspect-square sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] flex items-center justify-center cursor-pointer scale-[1.3] sm:scale-100"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.4 }
                }}
              >
                <ChromaKeyVideo 
                  src="/360 rotate Kira 60˚ C-Tide Serum.webm"
                  className="w-full h-full"
                  zoom={1.08}
                  aboveTheFold={true}
                />
              </motion.div>
            ) : isKiraMist ? (
              <motion.div 
                id="kira-mist-360-video-container"
                className="w-full aspect-square sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] flex items-center justify-center cursor-pointer scale-[1.3] sm:scale-100"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.4 }
                }}
              >
                <ChromaKeyVideo 
                  src="/360 rotate Kira 60˚ C-Tide Multi Mist.webm"
                  className="w-full h-full"
                  zoom={1.08}
                  aboveTheFold={true}
                />
              </motion.div>
            ) : (
              /* Beautiful slow breathing/floating motion for luxury look */
              <motion.img 
                id="center-product-img"
                decoding="async" 
                loading="lazy"
                src={productImg} 
                alt={product?.title || "Premium Product"} 
                className="w-full h-auto aspect-square sm:w-auto sm:h-[450px] md:h-[550px] lg:h-[720px] object-contain cursor-pointer filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.04)] scale-[1.3] sm:scale-100"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.4 }
                }}
              />
            )}
          </div>
        </motion.div>

        {/* RIGHT COLUMN: 2 ingredients */}
        <div id="right-ingredients-col" className="col-span-1 lg:col-span-3 w-full flex flex-col gap-10 sm:gap-16 order-3">
          {rightIngredients.map((ing, idx) => (
            <motion.div 
              key={idx}
              id={`right-ing-${idx}`}
              variants={ingredientCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              whileHover={{ y: -5 }}
              className={`flex flex-col items-center text-center max-w-[170px] xs:max-w-[200px] sm:max-w-sm group cursor-pointer ${idx === 0 ? 'self-start md:self-center' : 'self-end md:self-center'}`}
            >
              {/* Image Frame */}
              <div className="w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center relative mb-3 sm:mb-5 lg:mb-6 transition-all duration-500 hover:scale-105 rounded-full overflow-hidden bg-white/50 border border-stone-200/40 shadow-sm">
                <img decoding="async" loading="lazy" 
                  src={ing.image} 
                  alt={ing.title} 
                  className="w-full h-full object-cover filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]" 
                />
              </div>
              <h3 className="font-serif text-[15px] sm:text-[22px] text-stone-900 font-normal tracking-tight mb-1 sm:mb-2.5 group-hover:text-stone-950 transition-colors duration-300">
                {ing.title}
              </h3>
              <p className="block text-stone-500 font-sans text-[11px] sm:text-[14px] font-light leading-[1.3] sm:leading-relaxed tracking-wide mt-0.5 sm:mt-0 group-hover:text-stone-800 transition-colors duration-300">
                {ing.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface HowToUseSectionProps {
  product: Product;
  onAddToCart: () => void;
  settings: CustomizerSettings;
  activeCurrency: Currency;
  themeColor: string;
  activeColorName?: string;
}

// Helper component for interactive How To Use section with side-by-side split screen
const HowToUseSection: React.FC<HowToUseSectionProps> = ({
  product,
  onAddToCart,
  settings,
  activeCurrency,
  themeColor,
  activeColorName,
}) => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const baseUsdPrice = parseUsdPrice(product.price);
  const productThumbnail = getCustomProductImage(product.id) || product.images[0];

  const steps = [
    {
      num: "1.",
      title: "Cleanse",
      desc: "Gently wash face with lukewarm water to remove impurities and prepare skin surface.",
      image: "https://images.unsplash.com/photo-1556228578-0cf555a6e031?q=80&w=1000"
    },
    {
      num: "2.",
      title: "Let skin dry",
      desc: "Allow skin to dry completely, ensuring a natural clean canvas for subsequent active ingredients.",
      image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1000"
    },
    {
      num: "3.",
      title: "Apply serum",
      desc: "Apply 3-4 drops of our active essence or serum and press gently into the skin.",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000"
    },
    {
      num: "4.",
      title: "Moisturize",
      desc: "Lock in all nourishing active hydration with our rich moisturizing botanical blend.",
      image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000"
    }
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 bg-[#FCDCB9] overflow-hidden min-h-[640px] relative">
      {/* Center vertical dividing decorative dot matching Image 1 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-stone-950 z-25 pointer-events-none hidden md:block" />

      {/* Left Column: Interactive Steps List */}
      <div className="flex flex-col justify-center px-10 sm:px-16 md:px-20 lg:px-24 py-20 lg:py-28 text-left bg-[#FCDCB9]">
        <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-stone-600/80 uppercase mb-14">
          HOW TO USE
        </p>
        <div className="flex flex-col border-t border-stone-850/10">
          {steps.map((step, idx) => {
            const isActive = activeStepIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStepIdx(idx)}
                className="w-full text-left py-8 sm:py-10 border-b border-stone-850/10 focus:outline-hidden transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className={`font-serif text-lg sm:text-xl md:text-2xl transition-colors duration-300 select-none ${isActive ? 'text-stone-900 font-normal' : 'text-stone-500/60'}`}>
                    {step.num}
                  </span>
                  <h4 className={`transition-all duration-300 tracking-tight ${isActive ? 'font-serif italic font-normal text-stone-900 text-4xl sm:text-5xl lg:text-[54px] leading-tight' : 'font-serif font-light text-stone-600/80 text-3xl sm:text-4xl lg:text-[42px] leading-tight hover:text-stone-900'}`}>
                    {step.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Dynamic image matching active step with smooth crossfade and floating product card */}
      <div className="relative aspect-square md:aspect-auto w-full h-full min-h-[450px] md:min-h-[640px] overflow-hidden bg-stone-100">
        {steps.map((step, idx) => (
          <motion.img
            key={idx}
            src={step.image}
            alt={step.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeStepIdx === idx ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        ))}

        {/* Floating Product Card inside Right Image container matching Image 1 */}
        <div className="absolute bottom-6 right-6 bg-white py-4 px-5 shadow-[0_15px_45px_rgba(0,0,0,0.08)] flex items-center gap-5 z-10 border border-stone-100/50 max-w-sm sm:max-w-md">
          {/* Left: Product Thumbnail */}
          <div className="w-14 h-14 bg-stone-50 overflow-hidden shrink-0 flex items-center justify-center border border-stone-100">
            <img decoding="async" loading="lazy" 
              src={productThumbnail} 
              alt={product.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Middle: Text Details */}
          <div className="text-left flex-1 min-w-0 pr-2">
            <p className="font-sans font-semibold text-stone-900 text-xs sm:text-sm tracking-tight truncate leading-snug">
              {product.title}
            </p>
            <p className="text-stone-400 text-[10px] sm:text-[11px] font-sans font-light mt-0.5">
              {activeColorName || "Turquoise"}
            </p>
            <p className="text-xs sm:text-sm font-bold font-mono text-stone-900 mt-1">
              {convertAndFormatPrice('$' + baseUsdPrice, activeCurrency)}
            </p>
          </div>

          {/* Right: Add To Cart Button with bright teal and black text as in Image 1 */}
          <button
            type="button"
            onClick={onAddToCart}
            className="h-10 px-5 bg-[#00b5b5] hover:bg-[#00a3a3] text-stone-900 hover:text-white font-semibold text-xs tracking-wide transition duration-300 flex items-center justify-center cursor-pointer shrink-0 rounded-none shadow-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProductMainProps {
  product: Product;
  settings: CustomizerSettings;
  onAddToCart: (product: Product, quantity: number, colorIdx: number) => void;
  onNavigateHome: () => void;
  onProductClick?: (productId: string) => void;
  currentCurrency?: Currency;
  products?: Product[];
}

export const ProductMain: React.FC<ProductMainProps> = ({
  product,
  settings,
  onAddToCart,
  onNavigateHome,
  onProductClick,
  currentCurrency,
  products,
}) => {
  const activeCurrency = currentCurrency || SUPPORTED_CURRENCIES[0];
  const baseUsdPrice = parseUsdPrice(product.price);
  
  // Smart dynamic fallback: if no compareAtPrice was fetched, calculate a 15% discount markup
  let finalCompareAtPrice = product.compareAtPrice;
  if (!finalCompareAtPrice || parseUsdPrice(finalCompareAtPrice) <= baseUsdPrice) {
    if (baseUsdPrice === 78) {
      finalCompareAtPrice = "$92.00";
    } else {
      const calculatedCompare = Math.round((baseUsdPrice / 0.85) * 100) / 100;
      finalCompareAtPrice = `$${calculatedCompare.toFixed(2)}`;
    }
  }

  const compareUsdPrice = parseUsdPrice(finalCompareAtPrice);
  const hasDiscount = compareUsdPrice > baseUsdPrice;
  const discountPercent = hasDiscount ? Math.round(((compareUsdPrice - baseUsdPrice) / compareUsdPrice) * 100) : 0;
  
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'shipping'>('details');
  const [openIngredientIdx, setOpenIngredientIdx] = useState<number | null>(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  
  const thumbnailsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumbnail = thumbnailsRef.current.children[activeImageIdx] as HTMLElement;
      if (activeThumbnail) {
        // smooth scroll the thumbnail into view
        activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeImageIdx]);

  // Synchronized rating calculations
  const [customReviewsLength, setCustomReviewsLength] = useState(0);
  const [customReviewsSum, setCustomReviewsSum] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storageKey = `zisu_product_reviews_${product.id}`;
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const customList = parsed.filter((r: any) => r.id && r.id.startsWith('custom-'));
            setCustomReviewsLength(customList.length);
            setCustomReviewsSum(customList.reduce((acc: number, item: any) => acc + (item.rating || 0), 0));
          }
        } else {
          setCustomReviewsLength(0);
          setCustomReviewsSum(0);
        }
      } catch (e) {
        console.error(e);
      }
    };

    handleUpdate();

    // Listen to local storage write events or custom event to keep perfectly in sync!
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('zisu-reviews-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('zisu-reviews-updated', handleUpdate);
    };
  }, [product.id]);

  const baseReviewsCount = product.reviewsCount || 120;
  const globalReviewsCount = baseReviewsCount + customReviewsLength;
  const baseRating = product.rating || 4.8;
  const averageRating = customReviewsLength > 0
    ? ((baseRating * baseReviewsCount + customReviewsSum) / globalReviewsCount)
    : baseRating;

  // Countdown Timer state: Offer ends in 04:12:33
  const [timeLeft, setTimeLeft] = useState<number>(15153);

  // Social Proof Ticker state (listen for custom event from GlobalNotifier)
  const [itemsLeft, setItemsLeft] = useState(10);
  
  useEffect(() => {
    const handleReduceStock = (e: any) => {
      if (e.detail?.productId === product.id) {
        setItemsLeft(prev => Math.max(1, prev - 1));
      }
    };
    window.addEventListener('zisu-reduce-stock', handleReduceStock);
    return () => window.removeEventListener('zisu-reduce-stock', handleReduceStock);
  }, [product.id]);

  // Animated price state
  const [animatedPriceVal, setAnimatedPriceVal] = useState<number>(0);
  const targetUsdValue = parseUsdPrice(product.price);

  useEffect(() => {
    const controls = animate(0, targetUsdValue, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setAnimatedPriceVal(v)
    });
    return () => controls.stop();
  }, [targetUsdValue]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storageKey = `zisu_offer_countdown_${product.id}`;
    let endTimestampStr = localStorage.getItem(storageKey);
    let endTimestamp = endTimestampStr ? parseInt(endTimestampStr, 10) : 0;
    const now = Date.now();

    // If no stored end time, or if the stored end time has already passed,
    // set a new end time for 4 hours, 12 minutes, and 33 seconds from now
    if (!endTimestamp || endTimestamp < now) {
      endTimestamp = now + (4 * 3600 + 12 * 60 + 33) * 1000;
      localStorage.setItem(storageKey, endTimestamp.toString());
    }

    const updateTimer = () => {
      const currentNow = Date.now();
      const remainingMs = endTimestamp - currentNow;
      if (remainingMs <= 0) {
        // Reset to a new 4h 12m 33s cycle so it never stays 00:00:00 forever
        const newEnd = Date.now() + (4 * 3600 + 12 * 60 + 33) * 1000;
        localStorage.setItem(storageKey, newEnd.toString());
        setTimeLeft(4 * 3600 + 12 * 60 + 33);
      } else {
        setTimeLeft(Math.max(0, Math.floor(remainingMs / 1000)));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [product.id]);

  // Format helper
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const colors = [
    { name: "Teal Glow", hex: "#00b5b5" },
    { name: "Mint Dew", hex: "#d0f5e6" },
    { name: "Coral Bloom", hex: "#ffb4ac" },
    { name: "Alabaster", hex: "#fafafa" }
  ];
  const activeColor = colors[activeColorIdx] || colors[0];
  const isLightColor = activeColor.hex === '#fafafa';
  const themeColor = isLightColor ? '#00C4BA' : activeColor.hex;

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isBuyHovered, setIsBuyHovered] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 750) {
            setShowStickyBar(true);
          } else {
            setShowStickyBar(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Immediately preload critical images for the active product
    const criticalImages = [
      getCustomProductImage(product.id) || product.images[0],
      getBrighteningRightImageForId(product.id, product.title),
      getBrighteningLeftImageForId(product.id, product.title),
      getSeeTheChangeLaptopImageForId(product.id, product.title),
      getSeeTheChangeMobileImageForId(product.id, product.title),
      getBeforeImageForId(product.id, product.title),
      getAfterImageForId(product.id, product.title)
    ].filter(Boolean) as string[];

    const activeLinks: HTMLLinkElement[] = [];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      activeLinks.push(link);

      const img = new Image();
      img.src = src;
    });

    // 2. Defer background prefetching of other products so switching feels instant
    const idleTimeout = setTimeout(() => {
      if (!products) return;
      products.forEach(p => {
        if (p.id === product.id) return;
        
        const lazyImages = [
          getCustomProductImage(p.id) || p.images[0],
          getBrighteningRightImageForId(p.id, p.title),
          getBrighteningLeftImageForId(p.id, p.title),
          getSeeTheChangeLaptopImageForId(p.id, p.title),
          getSeeTheChangeMobileImageForId(p.id, p.title),
          getBeforeImageForId(p.id, p.title),
          getAfterImageForId(p.id, p.title)
        ].filter(Boolean) as string[];

        lazyImages.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      });
    }, 1500);

    return () => {
      activeLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
      clearTimeout(idleTimeout);
    };
  }, [product.id, products]);

  const handleAddToCart = () => {
    onAddToCart(product, qty, activeColorIdx);
  };

  const getBrighteningRightImage = () => {
    return getBrighteningRightImageForId(product.id, product.title);
  };

  const getBrighteningLeftImage = () => {
    return getBrighteningLeftImageForId(product.id, product.title);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-5">
      {/* Breadcrumb */}
      <nav className="text-[10px] sm:text-xs uppercase tracking-[0.18em] opacity-50 mb-5 flex items-center space-x-2 font-sans font-medium">
        <button onClick={onNavigateHome} className="hover:opacity-80 transition duration-150">HOME</button>
        <span className="text-[9px] opacity-60">&#62;</span>
        <span className="opacity-95 truncate max-w-[220px] sm:max-w-none" style={{ color: settings.colorText }}>{product.title}</span>
      </nav>

      {/* Main product structure grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-start">
        
        {/* Left Column: Image Gallery (Span 7 on desktop) */}
        <div className="lg:col-span-7 lg:sticky lg:top-28 flex flex-col">
          <div 
            className="main-image-wrapper aspect-square overflow-hidden w-full rounded flex items-center justify-center relative select-none"
            style={{ backgroundColor: settings.colorBgSecondary || '#F5EBE0' }}
          >
            {product.compareAtPrice && (
              <span 
                className="absolute top-4 left-4 px-3 py-1 text-[9px] sm:text-xs uppercase tracking-widest font-bold rounded-sm z-15"
                style={{
                  backgroundColor: settings.colorAccent,
                  color: '#fff',
                }}
              >
                Sale
              </span>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIdx}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -40 || velocity.x < -400) {
                    setActiveImageIdx((activeImageIdx + 1) % product.images.length);
                  } else if (offset.x > 40 || velocity.x > 400) {
                    setActiveImageIdx((activeImageIdx - 1 + product.images.length) % product.images.length);
                  }
                }}
              >
                <SafeImage
                  src={(activeImageIdx === 0 && getCustomProductImage(product.id)) || product.images[activeImageIdx] || product.images[0]}
                  fallbackSrc={product.images[activeImageIdx] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-[600ms] hover:scale-105 pointer-events-none"
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Centered Thumbnails Row flanked by ← and → arrow buttons exactly like 2nd image */}
          <div className="flex items-center justify-center gap-4 mt-3 select-none w-full">
            <button
              type="button"
              onClick={() => {
                const prev = (activeImageIdx - 1 + product.images.length) % product.images.length;
                setActiveImageIdx(prev);
              }}
              className="text-stone-400 hover:text-stone-950 transition duration-200 text-lg sm:text-xl px-2.5 py-1 cursor-pointer select-none font-light"
              aria-label="Previous image"
            >
              ←
            </button>
            <div ref={thumbnailsRef} className="flex items-center gap-2 overflow-x-auto scrollbar-hide snap-x px-1 max-w-[80vw] sm:max-w-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className="shrink-0 snap-center aspect-square w-12 sm:w-[56px] overflow-hidden rounded bg-[#FAF5F0] hover:opacity-100 transition transition-all duration-300 relative border p-[2px]"
                  style={{
                    borderColor: activeImageIdx === idx ? '#4c39fa' : 'transparent',
                    boxShadow: activeImageIdx === idx ? '0 0 0 1px #4c39fa' : 'none',
                    opacity: activeImageIdx === idx ? 1 : 0.85
                  }}
                >
                  <SafeImage 
                    src={(idx === 0 && getCustomProductImage(product.id)) || img} 
                    fallbackSrc={img}
                    alt="thumbnail" 
                    className="w-full h-full object-cover rounded-sm" 
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                const next = (activeImageIdx + 1) % product.images.length;
                setActiveImageIdx(next);
              }}
              className="text-stone-400 hover:text-stone-950 transition duration-200 text-lg sm:text-xl px-2.5 py-1 cursor-pointer select-none font-light"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        </div>

        {/* Right Column: Information Panel (Span 5 on desktop) */}
        <div className="lg:col-span-5 flex flex-col mt-2 lg:mt-0 select-none">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono opacity-65 block">{product.vendor}</span>
          <h1 className="font-heading font-light text-2xl sm:text-3xl lg:text-[36px] leading-[1.12] mt-1 mb-2 tracking-normal no-luxury-underline" style={{ color: settings.colorText }}>
            {product.title}
          </h1>

          {/* Small Star Rating Block (Clickable to redirect/scroll to Reviews Section) */}
          <button
            type="button"
            onClick={() => {
              const reviewsEl = document.getElementById('product-reviews-section');
              if (reviewsEl) {
                reviewsEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1.5 mt-1 mb-3 text-xs text-left group hover:opacity-80 transition cursor-pointer self-start select-none bg-transparent border-none p-0 focus:outline-hidden"
          >
            <span className="text-[12px] font-bold text-stone-850">
              {Number(averageRating).toFixed(1)}
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const isFilled = i < Math.round(Number(averageRating));
                return (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${isFilled ? 'text-[#00C4BA] fill-[#00C4BA]' : 'text-stone-200 fill-stone-100'}`}
                  />
                );
              })}
            </div>
            <span className="text-[12px] text-stone-400 font-normal underline decoration-dashed underline-offset-4 group-hover:text-stone-600 transition">
              ({globalReviewsCount} reviews)
            </span>
          </button>

          {/* Price Container styled EXACTLY like 1st image */}
          <div className="flex items-center gap-3 sm:gap-4 mt-2 mb-6 select-none flex-wrap">
            {finalCompareAtPrice ? (
              <>
                {/* Original Price (Strikethrough in vibrant teal) */}
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#00C4BA] line-through decoration-[2px] decoration-[#00C4BA] opacity-85">
                  {convertAndFormatPrice(finalCompareAtPrice, activeCurrency)}
                </span>
                
                {/* Discounted Actual Price (in vibrant teal) with count-up animation */}
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#00C4BA]"
                >
                  {convertAndFormatPrice(`$${animatedPriceVal.toFixed(2)}`, activeCurrency)}
                </motion.span>

                 {/* Save Percentage Badge */}
                {(() => {
                  const badgeText = getProductBadge(product.id);
                  const { bg, text, icon } = getBadgeConfig(badgeText);
                  return (
                    <div className="flex items-center gap-2 shrink-0 ml-1 flex-wrap">
                      <motion.div 
                        animate={{ rotate: [0, -2, 2, -2, 2, 0], scale: [1, 1.03, 1, 1.03, 1, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
                        className={`inline-flex items-center ${bg} ${text} px-3 py-1.5 rounded-[6px] font-sans font-bold text-xs sm:text-[13px] tracking-wide shadow-xs shrink-0`}
                      >
                        {icon}
                        <span className="uppercase">{badgeText}</span>
                      </motion.div>
                    </div>
                  );
                })()}
              </>
            ) : (
              <span className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#00C4BA]">
                {convertAndFormatPrice(product.price, activeCurrency)}
              </span>
            )}
          </div>

          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed font-body mb-6">
            <p className="mb-4">{product.description}</p>
            <p className="font-semibold text-stone-900 mb-2.5 mt-2">Why you'll love it:</p>
            <ul className="space-y-2.5 pl-0.5">
              {getProductBullets(product.id).map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-[13px] sm:text-sm text-stone-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Red Stock Depletion warning bar exactly like image 3 */}
          {(() => {
            const baseStock = 10;
            const dynamicItemsLeft = Math.max(0, baseStock - qty);
            const isSoldOut = dynamicItemsLeft <= 0;
            return (
              <div className="mt-5 mb-5 select-none space-y-1.5 pt-1.5">
                <div className="flex items-center justify-between gap-3 text-[11px] sm:text-xs font-bold text-[#DC2626] tracking-wide flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0 ${isSoldOut ? 'opacity-40' : 'animate-pulse'}`} />
                    {isSoldOut ? (
                      <span className="uppercase text-stone-900 bg-red-100 px-2.5 py-0.5 rounded-[4px] font-extrabold text-[10px] tracking-wider">SOLD OUT! Maximum stock reached</span>
                    ) : (
                      <span>Hurry, only <span className="font-mono text-sm underline decoration-wavy underline-offset-2">{dynamicItemsLeft}</span> items left in stock!</span>
                    )}
                  </div>
                  {/* Time scarcity indicator */}
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-850 border border-amber-200/60 px-2.5 py-1 rounded-[6px] text-[10.5px] font-semibold tracking-wide shadow-2xs select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                    <span className="text-stone-600 font-sans">Ends in</span>
                    <span className="font-mono font-bold tabular-nums text-stone-900">{formatTime(timeLeft)}</span>
                  </div>
                </div>
                <div className="w-full bg-[#FEE2E2] h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(dynamicItemsLeft / 9) * 100}%` }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    className="bg-[#DC2626] h-full rounded-full" 
                  />
                </div>
              </div>
            );
          })()}

          {/* Quantity and Actions exactly like image 3 */}
          <div className="mt-4 space-y-3">
            {/* Full-width Quantity selector */}
            <div className="flex items-center justify-between rounded-none h-11 bg-stone-50 border border-stone-200 px-5 font-mono text-xs text-stone-900 w-full select-none">
              <motion.button 
                type="button" 
                whileTap={{ scale: 0.85 }}
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="px-4 py-2 text-stone-400 hover:text-stone-800 font-bold text-sm cursor-pointer select-none transition duration-150"
                aria-label="Decrease quantity"
              >
                —
              </motion.button>
              <span className="font-bold text-xs font-mono text-stone-900">{qty}</span>
              <motion.button 
                type="button" 
                whileTap={{ scale: 0.85 }}
                onClick={() => setQty(qty + 1)}
                className="px-4 py-2 text-stone-400 hover:text-stone-800 font-bold text-sm cursor-pointer select-none transition duration-150"
                aria-label="Increase quantity"
              >
                +
              </motion.button>
            </div>

            {/* Solid Active Color Add to Cart Button with rectangular shape exactly like image 3 */}
            <LuxuryButton
              type="button"
              onClick={handleAddToCart}
              label="ADD TO CART"
              showShine={true}
              className="w-full h-[54px] text-center text-sm sm:text-[15px] font-black cursor-pointer rounded-none hover:opacity-95 transition duration-150 flex items-center justify-center gap-2 shadow-md uppercase tracking-wider"
              style={{ backgroundColor: themeColor, color: '#ffffff' }}
            >
              <ShoppingCart className="w-4 h-4 text-white shrink-0" />
            </LuxuryButton>

            {/* Hollow Active Color Buy It Now Button with rectangular shape exactly like image 3 */}
            <button 
              type="button" 
              onMouseEnter={() => setIsBuyHovered(true)}
              onMouseLeave={() => setIsBuyHovered(false)}
              className="relative w-full h-[54px] overflow-hidden group cursor-pointer shadow-md bg-white rounded-none focus:outline-none flex items-center justify-center transition-all duration-300"
              style={{ border: `1px solid ${themeColor}` }}
            >
              <div 
                className="absolute left-1/2 top-[100%] w-[1000px] h-[1000px] -translate-x-1/2 rounded-[45%] transition-all duration-[1800ms] ease-in-out group-hover:duration-[2000ms] group-hover:-translate-y-[600px] group-hover:rotate-[180deg] z-0 pointer-events-none" 
                style={{ backgroundColor: `${themeColor}66` }}
              />
              <div 
                className="absolute left-1/2 top-[120%] w-[1100px] h-[1100px] -translate-x-1/2 rounded-[43%] transition-all duration-[2200ms] ease-in-out group-hover:duration-[2500ms] group-hover:-translate-y-[650px] group-hover:rotate-[150deg] z-0 pointer-events-none" 
                style={{ backgroundColor: themeColor }}
              />
              <span 
                className="relative z-10 font-black transition-colors duration-[800ms] ease-in-out text-sm sm:text-[15px] uppercase tracking-wider pointer-events-none"
                style={{ color: isBuyHovered ? '#ffffff' : themeColor }}
              >
                BUY IT NOW
              </span>
            </button>
          </div>

          {/* Secure checkout row of icons below Buy it now button */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 bg-stone-50 border border-stone-200/50 p-2.5 rounded-sm select-none">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Visa */}
              <div className="px-2 py-0.5 rounded-[2px] bg-[#1429A0] flex items-center justify-center text-[8.5px] font-black text-white tracking-tighter shadow-2xs font-serif italic h-[18px]">
                VISA
              </div>
              {/* Mastercard */}
              <div className="px-1.5 py-0.5 rounded-[2px] bg-[#1a1f36] flex items-center justify-center text-[8.5px] font-black text-white tracking-tighter shadow-2xs font-sans h-[18px]">
                <div className="flex -space-x-1">
                  <div className="w-[8.5px] h-[8.5px] bg-[#EB001B] rounded-full"></div>
                  <div className="w-[8.5px] h-[8.5px] bg-[#F79E1B] rounded-full"></div>
                </div>
              </div>
              {/* PayPal */}
              <div className="px-2 py-0.5 rounded-[2px] bg-white border border-stone-200 flex items-center justify-center text-[8px] font-bold text-[#003087] tracking-tighter shadow-2xs font-sans italic h-[18px]">
                PayPal
              </div>
              {/* Apple Pay */}
              <div className="px-2 py-0.5 rounded-[2px] bg-black flex items-center justify-center text-[8px] font-bold text-white tracking-tight shadow-2xs font-sans h-[18px]">
                Apple Pay
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-stone-500 font-sans text-xs">
              <Lock className="w-3 h-3 text-stone-400" />
              <span className="font-medium text-[11px] tracking-wide">Secure checkout.</span>
            </div>
          </div>

          {/* Bundle & Save Offers card grid underneath exactly like image 3 */}
          <div className="mt-6 space-y-2.5">
            <p className="block font-sans text-xs uppercase tracking-[0.16em] text-stone-500 font-semibold mb-3">Bundle & Save Offers</p>
            {[
              { id: 1, label: 'Buy 1 item', price: convertAndFormatPrice('$' + baseUsdPrice, activeCurrency), orig: convertAndFormatPrice(finalCompareAtPrice || '$150.00', activeCurrency), subtext: 'Explore it risk-free' },
              { id: 2, label: '3-Month Glow Cycle', price: convertAndFormatPrice('$' + ((baseUsdPrice * 2) * 0.8), activeCurrency), orig: convertAndFormatPrice('$' + (baseUsdPrice * 2), activeCurrency), subtext: 'Save 20%', extra: 'Most repurchase after this' },
              { id: 3, label: '6-Month Transformation', price: convertAndFormatPrice('$' + ((baseUsdPrice * 3) * 0.7), activeCurrency), orig: convertAndFormatPrice('$' + (baseUsdPrice * 3), activeCurrency), subtext: 'Save 30%', badge: 'Most Repurchased' },
            ].map((tier, idx) => {
              const isSelected = qty === tier.id;
              return (
                <label 
                  key={idx} 
                  onClick={() => setQty(tier.id)}
                  className="flex justify-between items-center p-3.5 border rounded-none cursor-pointer transition-all duration-300 relative"
                  style={{
                    backgroundColor: isSelected ? `${themeColor}0f` : '#FAF5F0',
                    borderColor: isSelected ? themeColor : '#e6e6e6',
                    boxShadow: isSelected ? `0 0 0 1px ${themeColor}` : 'none'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span 
                      className="w-4 h-4 rounded-full border flex items-center justify-center transition-all"
                      style={{ borderColor: isSelected ? themeColor : '#d6d3d1' }}
                    >
                      {isSelected && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: themeColor }} />}
                    </span>
                    <div>
                      <span className="text-xs font-semibold block text-stone-800">{tier.label}</span>
                      {tier.id === 1 && (
                        <span className="text-[9px] font-mono tracking-tight font-semibold block mt-0.5" style={{ color: isSelected ? themeColor : '#e76f51' }}>
                          {tier.subtext}
                        </span>
                      )}
                      {tier.id === 2 && (
                        <>
                          <span className="text-[9px] font-mono tracking-tight font-semibold block mt-0.5" style={{ color: isSelected ? themeColor : '#e76f51' }}>
                            {tier.subtext}
                          </span>
                          <span className="text-[9.5px] font-sans tracking-normal text-stone-500 block mt-0.5 font-medium">
                            {tier.extra}
                          </span>
                        </>
                      )}
                      {tier.id === 3 && (
                        <div className="flex flex-col gap-0.5 mt-0.5">
                          <span className="text-[9px] font-mono tracking-tight font-semibold block" style={{ color: isSelected ? themeColor : '#e76f51' }}>
                            {tier.subtext}
                          </span>
                          <span 
                            className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-none uppercase tracking-wider self-start"
                            style={{
                              backgroundColor: `${themeColor}22`,
                              color: themeColor
                            }}
                          >
                            {tier.badge}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xs sm:text-sm font-bold font-mono" style={{ color: isSelected ? themeColor : '#1c1917' }}>{tier.price}</span>
                    <span className="text-[10px] line-through text-stone-400 font-mono">{tier.orig}</span>
                  </div>
                </label>
              );
            })}
          </div>



          {/* Product tabs details block as interactive specifications */}
          <div className="mt-8 border-t" style={{ borderColor: `${settings.colorText}1f` }}>
            <div className="flex border-b text-center font-bold tracking-widest uppercase text-[10px] sm:text-xs">
              {(['details', 'ingredients', 'shipping'] as const).map((tab) => (
                <button 
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-3.5 transition duration-200 hover:opacity-100 uppercase"
                  style={{
                    color: settings.colorText,
                    borderBottom: activeTab === tab ? `2px solid ${themeColor}` : '2px solid transparent',
                    opacity: activeTab === tab ? 1 : 0.5
                  }}
                >
                  {tab === 'details' ? 'Product details' : tab === 'ingredients' ? 'Ingredients' : 'Shipping'}
                </button>
              ))}
            </div>

            <div className="py-2 my-2 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-4 text-xs font-subheading py-3">
                      <div className="border-b pb-2" style={{ borderColor: `${settings.colorText}0d` }}>
                        <p className="text-[10px] uppercase tracking-wider opacity-60 font-mono">Skin Type</p>
                        <p className="font-semibold mt-1">All skin types — especially dry, dull, or sensitive</p>
                      </div>
                      <div className="border-b pb-2" style={{ borderColor: `${settings.colorText}0d` }}>
                        <p className="text-[10px] uppercase tracking-wider opacity-60 font-mono">Key Benefits</p>
                        <p className="font-semibold mt-1">Hydration, barrier repair, and glow enhancement</p>
                      </div>
                      <div className="border-b pb-2" style={{ borderColor: `${settings.colorText}0d` }}>
                        <p className="text-[10px] uppercase tracking-wider opacity-60 font-mono">Texture</p>
                        <p className="font-semibold mt-1">Silky gel-cream with a weightless, non-greasy finish</p>
                      </div>
                      <div className="border-b pb-2" style={{ borderColor: `${settings.colorText}0d` }}>
                        <p className="text-[10px] uppercase tracking-wider opacity-60 font-mono">Active Ingredients</p>
                        <p className="font-semibold mt-1">Bio-lipids, Ceramides, Natural Retinal & Oat extracts</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'ingredients' && (
                  <motion.div
                    key="ingredients"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="text-xs leading-relaxed opacity-90 font-body py-3">
                      <p className="font-bold mb-1 uppercase tracking-wider text-[10px] opacity-60">Full Ingredients list:</p>
                      <p className="text-gray-800">{product.ingredients}</p>
                      <p className="mt-3 text-stone-500 font-normal italic">100% gluten-free, vegan certified, cruelty-free, organic compounds sourcing, made with planet-first practices.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'shipping' && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="text-xs leading-relaxed text-gray-700 font-body py-3">
                      {product.shipping}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>

    {/* Section 1: Hero Banner (See the change, feel the difference.) */}
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full relative aspect-[3/4] lg:aspect-[16/9] select-none mt-20 overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img decoding="async" loading="eager" 
          src={getSeeTheChangeLaptopImageForId(product.id, product.title)} 
          alt="See the change background" 
          className="hidden sm:block absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <img decoding="async" loading="eager" 
          src={getSeeTheChangeMobileImageForId(product.id, product.title)} 
          alt="See the change background" 
          className="block sm:hidden absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-stone-900/15 z-5 pointer-events-none" />

      <div className="absolute bottom-16 sm:bottom-20 lg:bottom-28 left-1/2 -translate-x-1/2 z-10 text-center text-white px-6 w-full max-w-4xl">
        <h2 className="font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl leading-[1.1] tracking-tight drop-shadow-md">
          See the change, <span className="font-serif italic font-normal">feel the difference.</span>
        </h2>
        {product.id !== "e-bap-powder-cleanser" && 
         product.id !== "kira-60-c-tide-cream" && 
         product.id !== "kira-60-c-tide-serum" && 
         product.id !== "galachione-ampoule-pad" &&
         product.id !== "cica-pin-cell-skin-trigger" &&
         !(product.id.toLowerCase().includes('cica') && product.id.toLowerCase().includes('trigger')) &&
         !(product.title && product.title.toLowerCase().includes('cica') && product.title.toLowerCase().includes('trigger')) &&
         !(product.id.toLowerCase().includes('kira') && product.id.toLowerCase().includes('serum')) &&
         !(product.id.toLowerCase().includes('kira') && product.id.toLowerCase().includes('mist')) &&
         !(product.title && product.title.toLowerCase().includes('kira') && product.title.toLowerCase().includes('mist')) && (
          <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold mt-5 opacity-95 max-w-2xl mx-auto leading-loose">
            Brightening support with vitamins & clinical active extracts
          </p>
        )}
      </div>

      {/* Infinite Scrolling Ticker Banner at the Bottom of the Image */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#00C4BA] py-3.5 sm:py-4.5 overflow-hidden border-t border-stone-200/10 shadow-sm">
        <div className="relative w-full flex overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-33.3333%" }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
            className="flex whitespace-nowrap gap-12 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase font-bold text-white pr-12 shrink-0"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 shrink-0">
                <span>Brightening support with vitamins & clinical active extracts</span>
                <span className="text-white font-sans">•</span>
                <span>Zisu'c vibe only</span>
                <span className="text-white font-sans">•</span>
                <span>Unfiltered results</span>
                <span className="text-white font-sans">•</span>
                <span>See the change, feel the difference</span>
                <span className="text-white font-sans">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>

    {/* Review UGC Section */}
    <ReviewUgcSection />

    {/* Section 2: Two-column Editorial Section 1 ("Brightening support...") */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Heading and horizontal image */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          <h2 className="font-heading font-light text-3xl sm:text-4.5xl lg:text-[46px] leading-[1.15] text-stone-900 tracking-tight">
            Brightening support with vitamins and antioxidants <span className="font-serif italic font-normal text-stone-700">for a fresh, radiant feel.</span>
          </h2>
          <div className="aspect-[3/2] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/40 shadow-xs">
            <img decoding="async" loading="lazy" 
              src={getBrighteningLeftImage()} 
              alt="Brightening support product formulation" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" 
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Right Column: Tall vertical image with nested floating card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/40 shadow-xs group"
        >
          <img decoding="async" loading="lazy" 
            src={getBrighteningRightImage()} 
            alt="Radiant hair wellness" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" 
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </div>

    {/* Section 3: Two-column Editorial Section 2 ("Curated to nourish...") */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 border-t border-stone-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Heading with teal label */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.2em] font-bold text-[#00b5b5] block uppercase">
            Gentle & Effective
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-4.5xl lg:text-[46px] leading-[1.15] text-stone-900 tracking-tight pr-6">
            Curated to <span className="font-serif italic font-normal text-stone-700">nourish</span> your skin, pamper your body, and elevate your natural beauty, from inside.
          </h2>
        </motion.div>

        {/* Right Column: Horizontal video with nested floating card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/40 shadow-xs group"
          style={{ contain: 'layout paint' }}
        >
          <OptimizedVideo
            key={getProductVideoUrlForId(product.id, product.title)}
            src={getProductVideoUrlForId(product.id, product.title)}
            aspectRatio="4/3"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
          />
        </motion.div>
      </div>
    </div>

    {/* Section 4: Four-column Core Values Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-10">
        {[
          {
            icon: <Sparkles className="w-6 h-6 text-stone-800 stroke-[1.2]" />,
            title: "Nourishing Formulas",
            desc: "Because your skin deserves more than just a routine — it deserves care crafted with purpose."
          },
          {
            icon: <Headphones className="w-6 h-6 text-stone-800 stroke-[1.2]" />,
            title: "Skin Experts On Call",
            desc: "Our team of licensed estheticians is ready to help you personalize your routine and answer all your skincare questions with real, human advice."
          },
          {
            icon: <Globe className="w-6 h-6 text-stone-800 stroke-[1.2]" />,
            title: "Eco-Conscious Beauty",
            desc: "From sustainable sourcing to biodegradable packaging, every step of our process is made with the planet in mind."
          },
          {
            icon: <Heart className="w-6 h-6 text-stone-800 stroke-[1.2]" />,
            title: "Loved by Thousands",
            desc: "Trusted by a growing community of glow-getters — we're committed to creating feel-good experiences, from formula to finish."
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            className="flex flex-col items-start text-left"
          >
            <div className="p-3 bg-[#FAF5F0] border border-stone-200/50 rounded-none mb-5 flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="font-sans font-semibold text-stone-900 text-lg tracking-tight mb-3">
              {item.title}
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm font-body font-light leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Section 5: Proven Results with circular progress counting on view */}
    {(() => {
      const [metric1, metric2] = getProvenResultsForProduct(product.id, product.title);
      return (
        <div className="border-t border-stone-200/60 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-28 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
            {/* Left column title */}
            <div className="md:col-span-5 text-left md:pr-4">
              <p className="text-[10px] sm:text-[11px] font-subheading font-semibold tracking-[0.2em] text-stone-400 uppercase mb-5">
                THE NUMBERS SAY IT ALL
              </p>
              <h2 className="text-[38px] sm:text-[46px] font-heading font-normal text-stone-900 leading-[1.12] tracking-tight">
                Proven results that <br />
                <span className="italic">speak for</span> <br />
                themselves
              </h2>
            </div>

            {/* Right column with 2 metrics side by side */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8 pl-0 md:pl-12">
              <AnimatedMetric
                value={metric1.value}
                label={metric1.label}
                delay={0.15}
                color={themeColor}
              />
              <AnimatedMetric
                value={metric2.value}
                label={metric2.label}
                delay={0.3}
                color={themeColor}
              />
            </div>
          </div>
        </div>
      );
    })()}

    {/* Section 6: Before & After Beauty Comparison Slider */}
    <div className="bg-[#FAF5F0] py-28 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.25em] text-stone-400 uppercase mb-4">
          VISUAL PROGRESS
        </p>
        <h2 className="text-3xl sm:text-[46px] font-serif italic font-normal text-stone-900 tracking-tight leading-[1.15] mb-4">
          Before & after beauty comparison
        </h2>
        <p className="text-stone-500 font-sans text-xs sm:text-[14px] font-light max-w-xl mx-auto leading-relaxed mb-14 tracking-wide">
          Drag the center slider to inspect the visual results after 14 days of application.
        </p>

        <BeforeAfterSlider 
          product={product}
          activeCurrency={activeCurrency}
          themeColor={themeColor}
          onAddToCart={handleAddToCart}
          activeColorName={activeColor?.name}
          activeImageIdx={activeImageIdx}
        />
      </div>
    </div>

    {/* Section 7: Key Ingredients (Hydrators) */}
    <div className="bg-[#FAF5F0] border-t border-b border-stone-200/60">
      <KeyIngredientsSection product={product} />
    </div>

    {/* Section 9: Glow Essentials Bundle (Routine builder) */}
    <BundleSection 
      activeCurrency={activeCurrency}
      onAddToCart={onAddToCart}
      onProductClick={onProductClick}
      themeColor={themeColor}
      products={products}
    />

    {/* Section 11: You May Also Like */}
    <YouMayAlsoLikeSection 
      activeCurrency={activeCurrency}
      onAddToCart={onAddToCart}
      onProductClick={onProductClick}
      themeColor={themeColor}
      products={products}
    />

    {/* Section 12: Product Reviews Section */}
    <ProductReviewsSection 
      product={product}
      activeCurrency={activeCurrency}
      themeColor={themeColor}
    />

      {/* Premium Floating Sticky Action Card with smooth fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ 
          opacity: showStickyBar ? 1 : 0, 
          y: showStickyBar ? 0 : 50,
          scale: showStickyBar ? 1 : 0.95
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-stone-200/80 shadow-[0_12px_32px_rgba(0,0,0,0.15)] p-2 flex items-center gap-4 rounded-full w-[90%] max-w-[340px] xs:max-w-[420px] sm:max-w-md md:max-w-lg select-none"
        style={{ 
          pointerEvents: showStickyBar ? 'auto' : 'none',
          willChange: "transform, opacity"
        }}
      >
        {/* Left: Thumbnail & Name */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1 pl-1.5">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-stone-100 shadow-2xs">
            <img decoding="async" loading="lazy" 
              src={(activeImageIdx === 0 && getCustomProductImage(product.id)) || product.images[activeImageIdx] || product.images[0]} 
              alt={product.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-left min-w-0">
            <p className="font-heading font-semibold text-stone-900 text-[11px] sm:text-xs tracking-tight truncate leading-snug">
              {product.title}
            </p>
            <p className="text-stone-400 text-[9px] font-sans truncate">
              {activeColor?.name || "Curated Essentials"}
            </p>
          </div>
        </div>

        {/* Right: Wide button to Add to Cart with luxury shine */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="relative overflow-hidden h-10 px-5 sm:px-6 text-center text-xs font-bold cursor-pointer rounded-full transition duration-150 flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap bg-black text-white hover:bg-stone-900 border border-black uppercase tracking-wider shrink-0"
          style={{ backgroundColor: themeColor, color: '#ffffff', borderColor: themeColor }}
        >
          <ShoppingCart className="w-3.5 h-3.5 text-white shrink-0 hidden xs:block" />
          <span>ADD TO CART</span>
          <span className="opacity-80 ml-1 font-mono text-[10.5px]">• {convertAndFormatPrice('$' + baseUsdPrice, activeCurrency)}</span>
          
          {/* Continuous luxury white shine */}
          <div className="animate-button-shine" />
        </button>
      </motion.div>
    </>
  );
};
