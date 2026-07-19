export interface Product {
  id: string;
  shopifyId?: string;
  variantId?: string;
  title: string;
  vendor: string;
  price: string;
  compareAtPrice?: string;
  description: string;
  images: string[];
  tags: string[];
  colors: { name: string; hex: string }[];
  ingredients: string;
  howToUse: string;
  shipping: string;
  rating: number;
  reviewsCount: number;
  variants?: any[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: { name: string; hex: string };
}

export interface CustomizerSettings {
  colorText: string;
  colorBg: string;
  colorBgSecondary: string;
  colorAccent: string;
  colorBorder: string;
  colorButton: string;
  colorButtonText: string;
  colorButtonHover: string;
  
  logoText: string;
  announcementText: string;
  announcementSpeed: number;
  
  heroHeading: string;
  heroSubheading: string;
  heroButtonLabel: string;
  heroAlignment: 'left' | 'center' | 'right';
  heroParallax: boolean;

  bestsellersTitle: string;
  marqueeSpeed: number;
  
  featuredTitle: string;
  promoHeading: string;
  promoSubheading: string;
  promoImagePosition: 'left' | 'right';
  
  animationSpeed: '0.15s' | '0.3s' | '0.5s';
}
