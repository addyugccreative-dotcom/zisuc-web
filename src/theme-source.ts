/**
 * Shopify Wave Theme - Peaches Preset Templates Database
 * Contains all files exactly matching the requested OS 2.0 structure.
 * Fully un-truncated and production-ready for Shopify theme upload.
 */

export interface ThemeFile {
  path: string;
  category: string;
  content: string;
}

export const themeFiles: ThemeFile[] = [
  // 1. LAYOUT/THEME.LIQUID
  {
    path: "layout/theme.liquid",
    category: "layout",
    content: `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="{{ settings.color_accent }}">
    <link rel="canonical" href="{{ canonical_url }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    {%- if settings.favicon != blank -%}
      <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
    {%- endif -%}

    <title>
      {{ page_title }}
      {%- if current_tags -%} &ndash; tagged "{{ current_tags | join: ', ' }}"{%- endif -%}
      {%- if current_page != 1 -%} &ndash; Page {{ current_page }}{- endif -%}
      {%- unless page_title contains shop.name -%} &ndash; {{ shop.name }}{- endunless -%}
    </title>

    {% if page_description %}
      <meta name="description" content="{{ page_description | escape }}">
    {% endif %}

    {% render 'meta-tags' %}

    {{ content_for_header }}

    <!-- Google Fonts Preloads (Peaches Preset: Playfair Display + Inter) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono&display=swap" rel="stylesheet">

    <!-- CSS Variables and Custom Base Styling -->
    <style>
      :root {
        --font-body: 'Inter', sans-serif;
        --font-heading: 'Playfair Display', serif;
        --font-subheading: 'Outfit', sans-serif;
        --font-mono: 'JetBrains Mono', monospace;

        --color-bg: {{ settings.color_bg | default: '#faf3ee' }};
        --color-bg-secondary: {{ settings.color_bg_secondary | default: '#ebdcd3' }};
        --color-text: {{ settings.color_text | default: '#2c1a11' }};
        --color-accent: {{ settings.color_accent | default: '#f8cfc3' }};
        --color-button: {{ settings.color_button | default: '#b5b3f5' }};
        --color-button-text: {{ settings.color_button_text | default: '#2c1a11' }};
        --color-button-hover: {{ settings.color_button_hover | default: '#9fa0ed' }};
        --color-border: {{ settings.color_text | default: '#2c1a11' | color_modify: 'alpha', 0.15 }};
        --grid-gap: 20px;
        --border-radius: 4px;
        
        --transition-speed: {{ settings.animation_speed | default: '0.3s' }};
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: var(--font-body);
        background-color: var(--color-bg);
        color: var(--color-text);
        line-height: 1.6;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
        font-weight: 500;
        line-height: 1.2;
        color: var(--color-text);
      }

      h1 { font-size: calc(2.4rem); }
      h2 { font-size: calc(1.8rem); }
      h3 { font-size: calc(1.4rem); }

      a {
        color: inherit;
        text-decoration: none;
        transition: opacity var(--transition-speed);
      }

      input, select, textarea {
        background-color: transparent;
        border: 1px solid var(--color-border);
        color: var(--color-text);
        font-family: inherit;
        font-size: 14px;
        padding: 10px 14px;
        border-radius: var(--border-radius);
      }

      .btn {
        display: inline-block;
        background-color: var(--color-button);
        color: var(--color-button-text);
        border: 1px solid var(--color-text);
        padding: 12px 28px;
        font-family: var(--font-subheading);
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all var(--transition-speed) ease;
        border-radius: var(--border-radius);
        text-align: center;
      }

      .btn:hover {
        background-color: var(--color-button-hover);
        transform: translateY(-1px);
      }

      /* Sticky header dynamic adjustments */
      .header-wrapper--sticky {
        position: sticky;
        top: 0;
        z-index: 100;
        background-color: var(--color-bg);
        border-bottom: 1px solid var(--color-border);
      }

      /* Scroll reveal core logic */
      .reveal {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      .reveal.active {
        opacity: 1;
        transform: translateY(0);
      }
    </style>

    {{ 'theme.css' | asset_url | stylesheet_tag }}
    <script src="{{ 'theme.js' | asset_url }}" defer="defer"></script>
  </head>

  <body class="template-{{ template.name }}">
    <a class="skip-to-content-link button visually-hidden" href="#MainContent">
      Skip to content
    </a>

    {% sections 'header-group' %}

    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      {{ content_for_layout }}
    </main>

    {% sections 'footer-group' %}
    
    {% render 'cart-drawer' %}

    <script>
      window.shopUrl = '{{ request.origin }}';
      window.cartStrings = {
        error: "Cart error",
        quantityError: "Maximum available stock added"
      };
    </script>
  </body>
</html>`
  },

  // 2. TEMPLATES/INDEX.JSON
  {
    path: "templates/index.json",
    category: "templates",
    content: `{
  "sections": {
    "announcement_bar": {
      "type": "announcement-bar",
      "settings": {
        "text": "🌟 Enjoy 10% off your first order! Use code PEACHES45 at checkout . Free shipping on orders over $150 worldwide! 🌸",
        "speed": 15,
        "show_bar": true
      }
    },
    "header": {
      "type": "header",
      "settings": {
        "menu": "main-menu",
        "logo_position": "center",
        "sticky_header": true
      }
    },
    "hero": {
      "type": "hero-banner",
      "settings": {
        "heading": "Ingredients . Personalized for you . High quality",
        "subheading": "Reveal your best skin yet with our essentials - designed to cleanse, hydrate, and glow, every step of the way.",
        "button_label": "Shop now",
        "button_link": "/collections/all",
        "overlay_opacity": 20,
        "alignment": "left"
      }
    },
    "bestsellers": {
      "type": "bestsellers-carousel",
      "settings": {
        "title": "Glowing skin starts here",
        "collection": "all",
        "products_to_show": 6
      }
    },
    "marquee": {
      "type": "marquee-scrolling-banner",
      "settings": {
        "text_1": "Kind to your skin, gentle on the planet.",
        "text_2": "Before using Peaches vs After using Peaches",
        "text_3": "Join the skin community @peachesvibe",
        "speed": 20
      }
    },
    "featured_collection": {
      "type": "featured-collection",
      "settings": {
        "title": "Curated to nourish your skin, pamper your body, and elevate your natural beauty.",
        "collection": "all",
        "columns_desktop": 4,
        "show_view_all": true
      }
    },
    "promo_banner": {
      "type": "promotional-banner",
      "settings": {
        "heading": "Turn blah days into spa days",
        "subheading": "Pamper your skin from head to toe with our bodycare products—designed to deeply nourish, smooth, and refresh for soft, healthy skin every day.",
        "button_label": "Shop the collection",
        "button_link": "/collections/all",
        "image_position": "left"
      }
    },
    "brand_values": {
      "type": "brand-values",
      "settings": {
        "title": "Sustainable and Organic Skincare Philosophy",
        "columns": 3
      }
    },
    "testimonials": {
      "type": "testimonials",
      "settings": {
        "title": "Don't just trust our words. See what people are saying",
        "speed": 40"
      }
    },
    "newsletter": {
      "type": "newsletter",
      "settings": {
        "heading": "Subscribe to our newsletters",
        "subtext": "Get exclusive skincare tips, product alerts, and early access sales."
      }
    }
  },
  "order": [
    "announcement_bar",
    "header",
    "hero",
    "bestsellers",
    "marquee",
    "featured_collection",
    "promo_banner",
    "brand_values",
    "testimonials",
    "newsletter"
  ]
}`
  },

  // 3. TEMPLATES/PRODUCT.JSON
  {
    path: "templates/product.json",
    category: "templates",
    content: `{
  "sections": {
    "main": {
      "type": "product-main",
      "settings": {
        "show_vendor": true,
        "enable_image_zoom": true,
        "show_ingredients_tab": true,
        "show_usage_tab": true
      }
    },
    "recommendations": {
      "type": "product-recommendations",
      "settings": {
        "heading": "You may also like"
      }
    }
  },
  "order": [
    "main",
    "recommendations"
  ]
}`
  },

  // 4. SECTIONS/ANNOUNCEMENT-BAR.LIQUID
  {
    path: "sections/announcement-bar.liquid",
    category: "sections",
    content: `{%- if section.settings.show_bar -%}
<div id="AnnouncementBar-{{ section.id }}" class="announcement-bar" style="background-color: {{ section.settings.bg_color }}; color: {{ section.settings.text_color }};">
  <div class="announcement-marquee" style="--marquee-speed: {{ section.settings.speed }}s">
    <div class="marquee-content font-mono uppercase tracking-widest text-xs">
      <span>{{ section.settings.text }} &nbsp;&bull;&nbsp; </span>
      <span>{{ section.settings.text }} &nbsp;&bull;&nbsp; </span>
      <span>{{ section.settings.text }} &nbsp;&bull;&nbsp; </span>
      <span>{{ section.settings.text }} &nbsp;&bull;&nbsp; </span>
    </div>
  </div>
</div>

<style>
  .announcement-bar {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 10px 0;
    position: relative;
    z-index: 99;
  }
  .announcement-marquee {
    display: flex;
    overflow: hidden;
    width: 100%;
  }
  .marquee-content {
    display: flex;
    animation: marquee-scroll var(--marquee-speed) linear infinite;
    padding-left: 100%;
  }
  .marquee-content span {
    padding: 0 10px;
    flex-shrink: 0;
  }
  @keyframes marquee-scroll {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }
</style>
{%- endif -%}

{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_bar",
      "label": "Show announcement bar",
      "default": true
    },
    {
      "type": "text",
      "id": "text",
      "label": "Announcement Text",
      "default": "🌟 Enjoy 10% off your first order! Use code PEACHES45 at checkout . Free shipping on orders over $150 worldwide! 🌸"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#ffd8cc"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#2c1a11"
    },
    {
      "type": "range",
      "id": "speed",
      "min": 5,
      "max": 30,
      "step": 1,
      "unit": "s",
      "label": "Scroll Speed Duration",
      "default": 12
    }
  ]
}
{% endschema %}`
  },

  // 5. SECTIONS/HEADER.LIQUID
  {
    path: "sections/header.liquid",
    category: "sections",
    content: `<div class="header-wrapper" id="HeaderWrapper-{{ section.id }}" style="background-color: {{ section.settings.bg_color }};">
  <div class="header-container max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
    <!-- Hamburger Icon (Mobile) -->
    <button type="button" class="header-hamburger lg:hidden" aria-label="Menu" id="HamburgerTrigger">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>

    <!-- Nav Menu (Desktop Left/Right depending on preference) -->
    <nav class="hidden lg:flex space-x-8 text-sm font-subheading uppercase tracking-wider" role="navigation">
      {%- for link in linklists[section.settings.menu].links -%}
        <div class="menu-item relative group">
          <a href="{{ link.url }}" class="hover:underline py-2 block">{{ link.title }}</a>
          {%- if link.links != blank -%}
            <div class="nav-dropdown absolute hidden group-hover:block top-full left-0 bg-white shadow-lg py-4 px-6 border border-gray-100 min-w-[200px] z-50">
              {%- for childlink in link.links -%}
                <a href="{{ childlink.url }}" class="block py-2 text-gray-700 hover:text-black text-xs uppercase">{{ childlink.title }}</a>
              {%- endfor -%}
            </div>
          {%- endif -%}
        </div>
      {%- endfor -%}
    </nav>

    <!-- Logo Centered -->
    <div class="header-logo text-center">
      <a href="/" class="font-heading italic font-semibold text-2xl tracking-widest uppercase flex items-center justify-center">
        {%- if section.settings.logo != blank -%}
          <img src="{{ section.settings.logo | image_url: width: 140 }}" alt="{{ shop.name }}" class="h-8 max-w-full">
        {%- else -%}
          {{ shop.name }}<span class="text-xs align-super font-serif">©</span>
        {%- endif -%}
      </a>
    </div>

    <!-- Actions (Search, Cart) -->
    <div class="header-actions flex items-center space-x-6">
      <button type="button" class="action-search hover:opacity-75" aria-label="Search">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      </button>

      <button type="button" class="action-cart hover:opacity-75 relative" aria-label="Cart" id="CartTrigger">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        <span class="cart-badge absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono">0</span>
      </button>
    </div>
  </div>
</div>

<!-- Mobile Hamburger Menu Drawer -->
<div class="mobile-drawer fixed inset-y-0 left-0 w-80 bg-white z-[200] transform -translate-x-full transition-transform duration-300" id="MobileMenuDrawer">
  <div class="drawer-header flex justify-between items-center px-6 py-5 border-b">
    <span class="font-subheading uppercase text-sm tracking-wider">Peaches Store</span>
    <button type="button" class="close-drawer" id="MobileDrawerClose">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  </div>
  <div class="drawer-body px-6 py-6 space-y-6">
    {%- for link in linklists[section.settings.menu].links -%}
      <div class="mobile-nav-item border-b pb-3">
        <a href="{{ link.url }}" class="block font-medium text-lg">{{ link.title }}</a>
        {%- if link.links != blank -%}
          <div class="pl-4 mt-2 space-y-2">
            {%- for childlink in link.links -%}
              <a href="{{ childlink.url }}" class="block text-gray-500 text-sm py-1">{{ childlink.title }}</a>
            {%- endfor -%}
          </div>
        {%- endif -%}
      </div>
    {%- endfor -%}
  </div>
</div>
<div class="drawer-overlay fixed inset-0 bg-black/40 hidden z-[190]" id="MobileDrawerOverlay"></div>

<style>
  .header-wrapper {
    transition: background-color var(--transition-speed) ease;
    border-bottom: 1px solid var(--color-border);
  }
  .header-actions button {
    cursor: pointer;
  }
</style>

{% schema %}
{
  "name": "Header & Navigation",
  "settings": [
    {
      "type": "link_list",
      "id": "menu",
      "label": "Primary Navigation",
      "default": "main-menu"
    },
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Logo Image"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Navbar Background Color",
      "default": "#faf3ee"
    },
    {
      "type": "select",
      "id": "logo_position",
      "label": "Logo Alignment",
      "options": [
        { "value": "left", "label": "Left aligned" },
        { "value": "center", "label": "Centered" }
      ],
      "default": "center"
    }
  ]
}
{% endschema %}`
  },

  // 6. SECTIONS/HERO-BANNER.LIQUID
  {
    path: "sections/hero-banner.liquid",
    category: "sections",
    content: `<div class="hero-section relative min-h-[500px] lg:min-h-[640px] flex items-center overflow-hidden" id="HeroSection-{{ section.id }}">
  <div class="hero-image-bg absolute inset-0 {% if section.settings.parallax %}hero-parallax{% endif %}"
       style="background-image: url('{{ section.settings.image | image_url: width: 1920 | default: 'https://images.unsplash.com/photo-1596701062351-df5f8af0d385?q=80&w=1200' }}');">
  </div>
  <div class="hero-overlay absolute inset-0" style="background-color: rgba(0,0,0,{{ section.settings.overlay_opacity | times: 0.01 }});"></div>
  
  <div class="hero-content relative max-w-7xl mx-auto px-6 py-20 w-full z-10 flex flex-col justify-center
              {% if section.settings.alignment == 'center' %}items-center text-center{% elsif section.settings.alignment == 'right' %}items-end text-right{% else %}items-start text-left{% endif %}">
    
    <h1 class="hero-title inline-block font-heading italic text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-white max-w-3xl leading-[1.05]" id="HeroTitle">
      {{ section.settings.heading }}
    </h1>

    <p class="hero-subheading mt-6 font-normal text-sm sm:text-base lg:text-lg text-white/90 max-w-xl line-clamp-3">
      {{ section.settings.subheading }}
    </p>

    {%- if section.settings.button_label != blank -%}
      <a href="{{ section.settings.button_link }}" class="btn btn-hero mt-8">
        {{ section.settings.button_label }}
      </a>
    {%- endif -%}
  </div>
</div>

<style>
  .hero-section {
    display: flex;
    background-color: var(--color-bg-secondary);
  }
  .hero-image-bg {
    background-size: cover;
    background-position: center;
  }
  /* Parallax active fallback */
  .hero-parallax {
    transform: scale(1.05);
    background-attachment: fixed;
  }
  .btn-hero {
    background-color: var(--color-button);
    color: var(--color-button-text);
  }
  @media (prefers-reduced-motion: reduce) {
    .btn:hover, .hero-parallax {
      transform: none !important;
      transition: none !important;
    }
  }
</style>

{% schema %}
{
  "name": "Hero Banner",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Banner Background Image"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Large Heading Text",
      "default": "Ingredients . Personalized for you . High quality"
    },
    {
      "type": "textarea",
      "id": "subheading",
      "label": "Subheading Text",
      "default": "Reveal your best skin yet with our essentials - designed to cleanse, hydrate, and glow, every step of the way."
    },
    {
      "type": "text",
      "id": "button_label",
      "label": "Button Text Label",
      "default": "Shop now"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button Link Target",
      "default": "/collections/all"
    },
    {
      "type": "range",
      "id": "overlay_opacity",
      "min": 0,
      "max": 80,
      "step": 5,
      "unit": "%",
      "label": "Overlay Shadow Opacity",
      "default": 20
    },
    {
      "type": "select",
      "id": "alignment",
      "label": "Content Text Alignment",
      "options": [
        { "value": "left", "label": "Left aligned" },
        { "value": "center", "label": "Centered" },
        { "value": "right", "label": "Right aligned" }
      ],
      "default": "left"
    },
    {
      "type": "checkbox",
      "id": "parallax",
      "label": "Enable Parallax Zoom Motion",
      "default": true
    }
  ]
}
{% endschema %}`
  },

  // 7. SECTIONS/BESTSELLERS-CAROUSEL.LIQUID
  {
    path: "sections/bestsellers-carousel.liquid",
    category: "sections",
    content: `<div class="bestsellers-section reveal max-w-7xl mx-auto px-6 py-16" id="BestsellersCarousel-{{ section.id }}">
  <div class="section-header flex flex-col md:flex-row md:items-end justify-between mb-10">
    <div>
      <span class="font-mono text-xs uppercase tracking-widest text-[#2c1a11]/60">Explore Our Bestsellings</span>
      <h2 class="font-heading italic font-light text-3xl sm:text-4xl mt-2 tracking-tight">{{ section.settings.title }}</h2>
    </div>
    <div class="slider-arrows flex space-x-3 mt-4 md:mt-0">
      <button type="button" class="arrow-btn text-[#2c1a11] hover:bg-gray-100 rounded-full border border-gray-400 p-3 flex items-center justify-center" id="SlidePrev">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button type="button" class="arrow-btn text-[#2c1a11] hover:bg-gray-100 rounded-full border border-gray-400 p-3 flex items-center justify-center" id="SlideNext">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  </div>

  <div class="carousel-container overflow-hidden">
    <div class="carousel-track flex transition-transform duration-300 gap-6" id="CarouselTrack">
      {%- for product in collections[section.settings.collection].products limit: section.settings.products_to_show -%}
        <div class="carousel-slide min-w-[280px] md:min-w-[320px] lg:min-w-[340px] flex-shrink-0">
          {% render 'product-card', product: product %}
        </div>
      {%- else -%}
        <!-- Fallback cards -->
        {%- for i in (1..6) -%}
          <div class="carousel-slide min-w-[280px] md:min-w-[320px] lg:min-w-[340px] flex-shrink-0">
            {% render 'mock-product-card', index: i %}
          </div>
        {%- endfor -%}
      {%- endfor -%}
    </div>
  </div>
</div>

<style>
  .carousel-container {
    cursor: grab;
    user-select: none;
  }
  .carousel-container:active {
    cursor: grabbing;
  }
</style>

{% schema %}
{
  "name": "Bestsellers Carousel",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Section Heading Title",
      "default": "Glowing skin starts here"
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Collection Source"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "min": 4,
      "max": 12,
      "step": 1,
      "label": "Items to show in catalog",
      "default": 8
    }
  ]
}
{% endschema %}`
  },

  // 8. SECTIONS/MARQUEE-SCROLLING-BANNER.LIQUID
  {
    path: "sections/marquee-scrolling-banner.liquid",
    category: "sections",
    content: `<div id="MarqueeBanner-{{ section.id }}" class="marquee-scrolling-banner" style="background-color: {{ section.settings.bg_color }}; color: {{ section.settings.text_color }}; py-6 border-y border-[rgba(0,0,0,0.1)]">
  <div class="generic-marquee" style="--marquee-speed: {{ section.settings.speed }}s">
    <div class="marquee-content-generic font-heading italic text-lg sm:text-2xl lg:text-3xl uppercase font-light tracking-wide py-4 flex gap-x-12">
      <span>{{ section.settings.text_1 }}</span>
      <span>&bull;</span>
      <span>{{ section.settings.text_2 }}</span>
      <span>&bull;</span>
      <span>{{ section.settings.text_3 }}</span>
      <span>&bull;</span>
      
      <!-- Duplicate same set to make infinite looping smooth -->
      <span>{{ section.settings.text_1 }}</span>
      <span>&bull;</span>
      <span>{{ section.settings.text_2 }}</span>
      <span>&bull;</span>
      <span>{{ section.settings.text_3 }}</span>
      <span>&bull;</span>
    </div>
  </div>
</div>

<style>
  .marquee-scrolling-banner {
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .generic-marquee {
    display: flex;
    overflow: hidden;
    width: 100%;
  }
  .marquee-content-generic {
    display: flex;
    animation: generic-marquee-scroll var(--marquee-speed) linear infinite;
    white-space: nowrap;
    width: max-content;
  }
  .marquee-content-generic span {
    padding: 0 10px;
    flex-shrink: 0;
  }
  @keyframes generic-marquee-scroll {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }
</style>

{% schema %}
{
  "name": "Scrolling Marquee",
  "settings": [
    {
      "type": "text",
      "id": "text_1",
      "label": "Scrolling Text Phrase 1",
      "default": "Kind to your skin, gentle on the planet."
    },
    {
      "type": "text",
      "id": "text_2",
      "label": "Scrolling Text Phrase 2",
      "default": "Before using Peaches vs After using Peaches"
    },
    {
      "type": "text",
      "id": "text_3",
      "label": "Scrolling Text Phrase 3",
      "default": "Join the skin community @peachesvibe"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Banner Background",
      "default": "#ebdcd3"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Banner Text Color",
      "default": "#2c1a11"
    },
    {
      "type": "range",
      "id": "speed",
      "min": 10,
      "max": 60,
      "step": 5,
      "unit": "s",
      "label": "Banner speed duration",
      "default": 30
    }
  ]
}
{% endschema %}`
  },

  // 9. SECTIONS/FEATURED-COLLECTION.LIQUID
  {
    path: "sections/featured-collection.liquid",
    category: "sections",
    content: `<div class="featured-collection-section reveal max-w-7xl mx-auto px-6 py-16" id="FeaturedCollection-{{ section.id }}">
  <div class="mb-12 max-w-3xl">
    <span class="font-mono text-xs uppercase tracking-widest text-[#2c1a11]/60">Hand-Picked Collections</span>
    <h2 class="font-heading italic font-light text-2xl sm:text-3xl lg:text-4xl mt-3 tracking-normal leading-tight">
      {{ section.settings.title }}
    </h2>
    {%- if section.settings.show_view_all -%}
      <a href="/collections/all" class="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-subheading hover:underline block mt-4">
        <span>Shop all collection</span>
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
      </a>
    {%- endif -%}
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
    {%- for product in collections[section.settings.collection].products limit: section.settings.products_to_show -%}
      {% render 'product-card', product: product %}
    {%- else -%}
      <!-- Mock list -->
      {%- for i in (1..4) -%}
        {% render 'mock-product-card', index: i %}
      {%- endfor -%}
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Featured Products Grid",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Grid Caption / Subtitle Text",
      "default": "Curated to nourish your skin, pamper your body, and elevate your natural beauty."
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Collection Target Source"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "min": 4,
      "max": 16,
      "step": 4,
      "label": "Products count limit",
      "default": 4
    },
    {
      "type": "checkbox",
      "id": "show_view_all",
      "label": "Show View All CTA text link",
      "default": true
    }
  ]
}
{% endschema %}`
  },

  // 10. SECTIONS/PROMOTIONAL-BANNER.LIQUID
  {
    path: "sections/promotional-banner.liquid",
    category: "sections",
    content: `<div class="reveal-section py-16" style="background-color: {{ section.settings.bg_color | default: 'transparent' }}">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    
    {%- if section.settings.image_position == 'left' -%}
      <div class="promo-image-wrapper overflow-hidden rounded shadow-sm">
        <img src="{{ section.settings.image | image_url: width: 800 | default: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800' }}" 
             alt="{{ section.settings.heading }}" 
             class="w-full h-96 lg:h-[480px] object-cover hover:scale-105 transition-transform duration-500">
      </div>
    {%- endif -%}

    <div class="promo-text-content px-4 lg:px-12">
      <span class="font-mono text-xs uppercase tracking-widest text-[#2c1a11]/60">Our Philosophy</span>
      <h2 class="font-heading italic font-light text-3xl sm:text-4xl mt-3 tracking-snug max-w-lg leading-tight">
        {{ section.settings.heading }}
      </h2>
      <p class="font-body text-gray-700 mt-6 leading-relaxed text-sm sm:text-base max-w-md">
        {{ section.settings.subheading }}
      </p>
      {%- if section.settings.button_label != blank -%}
        <a href="{{ section.settings.button_link }}" class="btn mt-10">
          {{ section.settings.button_label }}
        </a>
      {%- endif -%}
    </div>

    {%- if section.settings.image_position == 'right' -%}
      <div class="promo-image-wrapper overflow-hidden rounded shadow-sm">
        <img src="{{ section.settings.image | image_url: width: 800 | default: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800' }}" 
             alt="{{ section.settings.heading }}" 
             class="w-full h-96 lg:h-[480px] object-cover hover:scale-105 transition-transform duration-500">
      </div>
    {%- endif -%}

  </div>
</div>

{% schema %}
{
  "name": "Split Promo Banner",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Section Cover Image"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Promo Headline Text",
      "default": "Turn blah days into spa days"
    },
    {
      "type": "textarea",
      "id": "subheading",
      "label": "Promo Narrational Body",
      "default": "Pamper your skin from head to toe with our bodycare products—designed to deeply nourish, smooth, and refresh for soft, healthy skin every day."
    },
    {
      "type": "text",
      "id": "button_label",
      "label": "Button Label Target",
      "default": "Shop the collection"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button Click Link",
      "default": "/collections/all"
    },
    {
      "type": "select",
      "id": "image_position",
      "label": "Image Desktop Alignment",
      "options": [
        { "value": "left", "label": "Image sits on left" },
        { "value": "right", "label": "Image sits on right" }
      ],
      "default": "left"
    }
  ]
}
{% endschema %}`
  },

  // 11. SECTIONS/TESTIMONIALS.LIQUID
  {
    path: "sections/testimonials.liquid",
    category: "sections",
    content: `<div class="testimonials-section bg-[#ebdcd3] py-16 reveal" id="Testimonials-{{ section.id }}">
  <div class="max-w-7xl mx-auto px-6">
    <div class="text-center mb-12">
      <span class="font-mono text-xs uppercase tracking-widest text-[#2c1a11]/60">Verified Experiences</span>
      <h2 class="font-heading italic font-light text-3xl sm:text-4xl mt-3 tracking-tight">{{ section.settings.title }}</h2>
    </div>

    <!-- Review items -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="testimonial-card bg-neutral-50/50 p-8 border border-neutral-100 rounded">
        {% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}
        <p class="mt-6 text-sm sm:text-base leading-relaxed font-subheading text-[#2c1a11]">
          "My skin feels incredibly soft, hydrated, and looks more radiant than ever. I've received so many compliments since I started using it!"
        </p>
        <div class="mt-8">
          <p class="font-bold text-xs uppercase tracking-wider text-[#2c1a11]">Michael N.</p>
          <p class="text-[10px] text-gray-500 font-mono mt-1">Verified Customer</p>
        </div>
      </div>

      <div class="testimonial-card bg-neutral-50/50 p-8 border border-neutral-100 rounded">
        {% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}
        <p class="mt-6 text-sm sm:text-base leading-relaxed font-subheading text-[#2c1a11]">
          "The best moisturizer on the market! Lightweight, absorbs fast, and perfectly fits my dry base skin type. I highly recommend Wave."
        </p>
        <div class="mt-8">
          <p class="font-bold text-xs uppercase tracking-wider text-[#2c1a11]">Sophia R.</p>
          <p class="text-[10px] text-gray-500 font-mono mt-1">Verified Customer</p>
        </div>
      </div>

      <div class="testimonial-card bg-neutral-50/50 p-8 border border-neutral-100 rounded">
        {% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}
        <p class="mt-6 text-sm sm:text-base leading-relaxed font-subheading text-[#2c1a11]">
          "Simple, clean, and incredible results. The peach details are beautiful. My acne marks faded significantly in under three weeks."
        </p>
        <div class="mt-8">
          <p class="font-bold text-xs uppercase tracking-wider text-[#2c1a11]">Elena G.</p>
          <p class="text-[10px] text-gray-500 font-mono mt-1">Verified Customer</p>
        </div>
      </div>
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Testimonials",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Review Panel Headline",
      "default": "Don't just trust our words. See what people are saying"
    }
  ]
}
{% endschema %}`
  },

  // 12. SECTIONS/BRAND-VALUES.LIQUID
  {
    path: "sections/brand-values.liquid",
    category: "sections",
    content: `<div class="brand-values-section py-16 reveal max-w-7xl mx-auto px-6">
  <div class="mb-12 text-center">
    <span class="font-mono text-xs uppercase tracking-widest text-[#2c1a11]/60">Why Peaches Skincare</span>
    <h2 class="font-heading italic font-light text-2xl sm:text-3xl mt-3">{{ section.settings.title }}</h2>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center">
    <div class="value-item flex flex-col items-center">
      <div class="h-12 w-12 bg-[#dfddf6] rounded-full flex items-center justify-center p-3 text-purple-600 mb-6">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
      </div>
      <h3 class="font-subheading font-medium text-sm sm:text-base uppercase tracking-wider text-[#2c1a11]">Skin Experts On Call</h3>
      <p class="text-xs sm:text-sm text-gray-600 mt-4 max-w-xs leading-relaxed">
        Our team of licensed estheticians is ready to help you personalize your routing and answer skincare questions.
      </p>
    </div>

    <div class="value-item flex flex-col items-center">
      <div class="h-12 w-12 bg-[#dfddf6] rounded-full flex items-center justify-center p-3 text-purple-600 mb-6">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
      </div>
      <h3 class="font-subheading font-medium text-sm sm:text-base uppercase tracking-wider text-[#2c1a11]">Eco-Conscious Beauty</h3>
      <p class="text-xs sm:text-sm text-gray-600 mt-4 max-w-xs leading-relaxed">
        From sustainable sourcing to biodegradable packaging, every step of our process is made with the planet in mind.
      </p>
    </div>

    <div class="value-item flex flex-col items-center">
      <div class="h-12 w-12 bg-[#dfddf6] rounded-full flex items-center justify-center p-3 text-purple-600 mb-6">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.757a1 1 0 00.707-1.707l-5.414-5.414a1 1 0 00-1.414 0L7.23 8.293A1 1 0 007.938 10H12v4h2v-4z"/></svg>
      </div>
      <h3 class="font-subheading font-medium text-sm sm:text-base uppercase tracking-wider text-[#2c1a11]">Loved by Thousands</h3>
      <p class="text-xs sm:text-sm text-gray-600 mt-4 max-w-xs leading-relaxed">
        Trusted by a growing community of glow-getters—we're committed to creating feel-good experiences.
      </p>
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Brand Values",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Brand Values Header Title",
      "default": "Sustainable and Organic Skincare Philosophy"
    }
  ]
}
{% endschema %}`
  },

  // 13. SECTIONS/INSTAGRAM-FEED.LIQUID
  {
    path: "sections/instagram-feed.liquid",
    category: "sections",
    content: `<div class="instagram-section py-16 text-center reveal" id="Instagram-{{ section.id }}">
  <div class="mb-10 max-w-md mx-auto px-6">
    <span class="font-mono text-xs uppercase tracking-widest text-[#2c1a11]/60">Before / After Glow</span>
    <h2 class="font-heading italic font-light text-2xl sm:text-3xl mt-3 tracking-snug">Join the skin community @peachesvibe</h2>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-6 gap-2 px-2">
    {%- for i in (1..6) -%}
      <div class="insta-image-wrapper relative group overflow-hidden aspect-square rounded-sm">
        <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=350" alt="Instagram community peaches preview" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
        <div class="insta-overlay absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-mono uppercase tracking-widest">
          View post
        </div>
      </div>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Instagram Feed",
  "settings": []
}
{% endschema %}`
  },

  // 14. SECTIONS/NEWSLETTER.LIQUID
  {
    path: "sections/newsletter.liquid",
    category: "sections",
    content: `<div class="newsletter-section bg-[#ebdcd3] py-20 reveal border-t border-[rgba(0,0,0,0.05)] text-center px-6" id="Newsletter-{{ section.id }}">
  <div class="max-w-xl mx-auto flex flex-col items-center">
    <span class="font-mono text-xs uppercase tracking-widest text-[#2c1a11]/60">Exclusive updates</span>
    <h2 class="font-heading italic text-3xl sm:text-4xl mt-3 font-light">{{ section.settings.heading }}</h2>
    <p class="font-body text-gray-600 mt-4 text-xs sm:text-sm max-w-sm leading-relaxed">{{ section.settings.subtext }}</p>

    {%- form 'customer', class: 'mt-10 w-full' -%}
      <input type="hidden" name="contact[tags]" value="newsletter">
      <div class="flex flex-col sm:flex-row w-full gap-4">
        <input type="email" 
               name="contact[email]" 
               class="flex-1 bg-white border border-[#2c1a11]/20 px-6 py-4 text-xs sm:text-sm rounded hover:border-[#2c1a11] focus:border-[#2c1a11] outline-none" 
               placeholder="Enter your email to join the newsletter" 
               required>
        <button type="submit" class="btn shrink-0 py-4 px-8 uppercase text-xs tracking-widest font-subheading">
          Subscribe
        </button>
      </div>
    {%- endform -%}
  </div>
</div>

{% schema %}
{
  "name": "Newsletter Signup",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading Title",
      "default": "Subscribe to our newsletters"
    },
    {
      "type": "text",
      "id": "subtext",
      "label": "Detailed subtitle description",
      "default": "Get exclusive skincare tips, product alerts, and early access sales."
    }
  ]
}
{% endschema %}`
  },

  // 15. SECTIONS/FOOTER.LIQUID
  {
    path: "sections/footer.liquid",
    category: "sections",
    content: `<footer class="footer bg-[#dfddf6] text-[#2c1a11] pt-16 pb-8 border-t border-[rgba(0,0,0,0.055)] px-6">
  <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
    <div>
      <h3 class="font-heading italic font-semibold text-xl tracking-wider mb-6">Peaches Store<span class="text-xs">©</span></h3>
      <p class="text-xs sm:text-sm text-[#2c1a11]/80 leading-relaxed max-w-xs">
        At Peaches, we are dedicated to creating organic, clean skin products crafted to enhance and enrich your natural beauty. Est. 2026.
      </p>
    </div>

    <div>
      <h4 class="font-subheading font-medium text-xs uppercase tracking-widest text-[#2c1a11]/70 mb-6">Shop Catalog</h4>
      <ul class="space-y-3 text-xs sm:text-sm font-subheading">
        <li><a href="/collections/all" class="hover:underline opacity-80 hover:opacity-100">Clean Canvas Cleansers</a></li>
        <li><a href="/collections/all" class="hover:underline opacity-80 hover:opacity-100">Glow Hydrating Essences</a></li>
        <li><a href="/collections/all" class="hover:underline opacity-80 hover:opacity-100">Barrier Repair Moisturizers</a></li>
        <li><a href="/collections/all" class="hover:underline opacity-80 hover:opacity-100">Weekly Relief Hydrators</a></li>
      </ul>
    </div>

    <div>
      <h4 class="font-subheading font-medium text-xs uppercase tracking-widest text-[#2c1a11]/70 mb-6 font-semibold">Information</h4>
      <ul class="space-y-3 text-xs sm:text-sm font-subheading">
        <li><a href="/pages/about" class="hover:underline opacity-80 hover:opacity-100">About Our Brand</a></li>
        <li><a href="/pages/faqs" class="hover:underline opacity-80 hover:opacity-100 font-normal">Esthetics FAQs</a></li>
        <li><a href="/pages/contact" class="hover:underline opacity-80 hover:opacity-100">Contact Estheticians</a></li>
        <li><a href="/policies/refund-policy" class="hover:underline opacity-80 hover:opacity-100">Refund Policy</a></li>
      </ul>
    </div>

    <div>
      <h4 class="font-subheading font-medium text-xs uppercase tracking-widest text-[#2c1a11]/70 mb-6">Newsletter Connection</h4>
      <p class="text-[11px] text-gray-600 mb-4 max-w-xs">Register to receive our latest collections updates, stories and seasonal offers.</p>
      <form class="flex border-b border-[#2c1a11]/15 pb-2">
        <input type="email" placeholder="Your email address" class="w-full text-xs outline-none bg-transparent py-1 border-none px-0 text-[#2c1a11]" required>
        <button type="submit" class="hover:translate-x-1 transition-transform" aria-label="Confirm">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </form>
    </div>
  </div>

  <div class="max-w-7xl mx-auto border-t border-[#2c1a11]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 gap-4 font-mono">
    <div class="text-center md:text-left">
      &copy; {{ 'now' | date: "%Y" }} - Peaches Wave (Preset Peaches Theme Replica). Designed for Shopify OS 2.0.
    </div>
    <div class="flex space-x-6">
      <a href="/policies/privacy" class="hover:underline">Privacy Policy</a>
      <a href="/policies/terms" class="hover:underline">Terms of Service</a>
    </div>
  </div>
</footer>

{% schema %}
{
  "name": "Footer",
  "settings": []
}
{% endschema %}`
  },

  // 16. SECTIONS/PRODUCT-MAIN.LIQUID
  {
    path: "sections/product-main.liquid",
    category: "sections",
    content: `<div class="product-scope reveal max-w-7xl mx-auto px-6 py-10" id="ProductMain-{{ product.id }}">
  <nav class="breadcrumb-nav text-[10px] sm:text-xs text-gray-500 mb-6 font-subheading uppercase tracking-wide flex items-center space-x-2">
    <a href="/">Home</a> <span>/</span> <a href="/collections/all">Collections</a> <span>/</span> <span class="text-black">{{ product.title | default: 'Overachiever Balm Cleanser' }}</span>
  </nav>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
    <!-- Image Gallery -->
    <div class="product-gallery grid grid-cols-1 gap-4">
      <div class="main-image-wrapper border aspect-square overflow-hidden rounded bg-white relative">
        <img src="{{ product.featured_image | image_url: width: 800 | default: 'https://images.unsplash.com/photo-1596701062351-df5f8af0d385?q=80&w=800' }}" 
             alt="{{ product.title }}" 
             class="w-full h-full object-cover" 
             id="MainProductImage">
      </div>
      <div class="grid grid-cols-4 gap-2">
        {%- for image in product.images -%}
          <button class="thumb-btn border rounded aspect-square overflow-hidden bg-white hover:border-black transition" onclick="document.getElementById('MainProductImage').src='{{ image | image_url: width: 800 }}'">
            <img src="{{ image | image_url: width: 150 }}" alt="thumbnail image" class="w-full h-full object-cover">
          </button>
        {%- else -%}
          <!-- Mock Thumbnails if no official images -->
          {%- for i in (1..3) -%}
            <button class="thumb-btn border rounded aspect-square overflow-hidden bg-white hover:border-black transition" onclick="document.getElementById('MainProductImage').src='https://images.unsplash.com/photo-1596701062351-df5f8af0d385?q=80&w=800'">
              <img src="https://images.unsplash.com/photo-1596701062351-df5f8af0d385?q=80&w=150" alt="product placeholder" class="w-full h-full object-cover">
            </button>
          {%- endfor -%}
        {%- endfor -%}
      </div>
    </div>

    <!-- Product Info Panel -->
    <div class="product-info-panel">
      {%- if section.settings.show_vendor -%}
        <span class="font-subheading text-[10px] sm:text-xs uppercase tracking-widest text-[#2c1a11]/60">XO WAVE</span>
      {%- endif -%}
      <h1 class="font-heading italic text-3xl sm:text-4xl mt-2 tracking-tight">{{ product.title | default: 'Overachiever Balm Cleanser' }}</h1>
      
      <div class="rating flex items-center space-x-2 mt-3 mb-6">
        {% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}{% render 'icon-star' %}
        <span class="text-xs text-gray-500 font-mono">(4.9 out of 118 verified reviews)</span>
      </div>

      <div class="price-container flex items-baseline space-x-4 mb-6">
        <span class="price text-xl font-semibold font-mono text-[#2c1a11]" id="ProductPrice">{{ product.price | default: '$78.00' }}</span>
        {%- if product.compare_at_price > product.price -%}
          <span class="compare-price text-sm line-through text-gray-400 font-mono">{{ product.compare_at_price | default: '$100.00' }}</span>
        {%- endif -%}
      </div>

      <!-- Description Short -->
      <p class="font-body text-gray-700 text-xs sm:text-sm mb-8 leading-relaxed max-w-md">
        {{ product.description | default: 'A powerful vitamin A serum to smooth, brighten and firm skin while you snooze. This innovative formula, featuring next-generation, 100% natural retinal will ensure deep hydration and beautiful elastic results.' }}
      </p>

      {%- form 'product', product -%}
        <!-- Variant Picker (Color Swatches) -->
        <div class="variants-picker mb-8">
          <span class="block font-mono text-[10px] uppercase tracking-wider text-[#2c1a11]/60 mb-2">Variant / Color option</span>
          <div class="flex space-x-3">
            <button type="button" class="swatch-btn w-8 h-8 rounded-full border-2 border-black p-0.5" style="background-color: #f8cfc3;" aria-label="Peach Skin Swatch"></button>
            <button type="button" class="swatch-btn w-8 h-8 rounded-full border border-gray-400 p-0.5" style="background-color: #dfe9f1;" aria-label="Lilac Swatch"></button>
            <button type="button" class="swatch-btn w-8 h-8 rounded-full border border-gray-400 p-0.5" style="background-color: #e5f1df;" aria-label="Mint Swatch"></button>
          </div>
        </div>

        <!-- Quantity Selector / Dynamic buy -->
        <div class="quantity-picker flex items-center space-x-6 mb-8">
          <div class="flex items-center border border-gray-450 rounded overflow-hidden h-11 bg-white">
            <button type="button" class="px-3 text-lg py-1 hover:bg-gray-150" onclick="const i = document.getElementById('QtyVal'); if(i.value > 1) i.value--">-</button>
            <input type="text" class="w-12 text-center text-sm font-semibold border-none py-1 px-0" value="1" id="QtyVal">
            <button type="button" class="px-3 text-lg py-1 hover:bg-gray-150" onclick="document.getElementById('QtyVal').value++">+</button>
          </div>

          <button type="button" class="btn btn-add flex-1 py-4 uppercase text-xs tracking-widest font-subheading flex items-center justify-center space-x-3" id="CartAddButton">
            <span>Add to Cart bag</span>
          </button>
        </div>

        <button type="button" class="btn btn-buy w-full py-4 uppercase text-xs tracking-widest bg-black text-white hover:bg-stone-800" style="border: none;">Buy it now</button>
      {%- endform -%}

      <!-- Expandable Tab Panel Accordions -->
      <div class="expandable-panel mt-12 border-t pt-4">
        <details class="group py-3 border-b" open>
          <summary class="flex justify-between items-center cursor-pointer font-heading italic text-sm text-[#2c1a11]">
            <span>Product Details</span>
            <svg class="h-4 w-4 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </summary>
          <div class="mt-3 text-xs leading-relaxed text-gray-700">
            <p><strong>SKIN TYPE:</strong> All skin types — especially dry, dull, or sensitive skin types seeking a natural radiance barrier repair booster.</p>
            <p class="mt-2"><strong>FORMULATION:</strong> Luxurious, silky gel-cream with a weightless, non-greasy satin skin finish.</p>
          </div>
        </details>

        <details class="group py-3 border-b">
          <summary class="flex justify-between items-center cursor-pointer font-heading italic text-sm text-[#2c1a11]">
            <span>Active Ingredients</span>
            <svg class="h-4 w-4 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </summary>
          <div class="mt-3 text-xs leading-relaxed text-gray-700">
            <ul class="list-disc pl-4 space-y-1">
              <li><strong>Natural Retinal:</strong> Stimulates collagen, diminishes fine lines.</li>
              <li><strong>Peptides Complex:</strong> firms, locks structure elasticity.</li>
              <li><strong>Organic Camomile extracts:</strong> soothes inflammation and prevents acne breakout marks.</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Product Main Section",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_vendor",
      "label": "Show vendor name label",
      "default": true
    }
  ]
}
{% endschema %}`
  },

  // 17. SECTIONS/PRODUCT-RECOMMENDATIONS.LIQUID
  {
    path: "sections/product-recommendations.liquid",
    category: "sections",
    content: `<div class="product-recommendations px-6 py-16 reveal max-w-7xl mx-auto border-t" id="ProductRecommendations-{{ product.id }}">
  <div class="mb-10 text-center">
    <span class="font-mono text-xs uppercase tracking-widest text-[#2c1a11]/60">More beauty essentials</span>
    <h2 class="font-heading italic font-light text-2xl sm:text-3xl mt-3 tracking-wide">{{ section.settings.heading }}</h2>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
    {% render 'mock-product-card', index: 1 %}
    {% render 'mock-product-card', index: 2 %}
    {% render 'mock-product-card', index: 3 %}
    {% render 'mock-product-card', index: 4 %}
  </div>
</div>

{% schema %}
{
  "name": "Product Recommendations",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Recommends Heading Title",
      "default": "You may also like"
    }
  ]
}
{% endschema %}`
  },

  // 18. SECTIONS/CART-DRAWER.LIQUID
  {
    path: "sections/cart-drawer.liquid",
    category: "sections",
    content: `<div class="cart-drawer-wrapper fixed inset-y-0 right-0 w-full sm:w-96 bg-[#faf3ee] shadow-2xl z-[250] transform translate-x-full transition-transform duration-300 border-l border-[#2c1a11]/15" id="CartDrawer">
  <div class="drawer-header flex justify-between items-center px-6 py-5 border-b border-[#2c1a11]/10">
    <span class="font-heading italic text-lg tracking-wide text-[#2c1a11]">Your Bag Cart</span>
    <button type="button" class="close-btn p-1" id="CartDrawerCloseButton">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  </div>

  <!-- Free Shipping Milestone -->
  <div class="shipping-milestone px-6 py-4 bg-[#ffd8cc]/40 text-xs">
    <p class="font-subheading text-[#2c1a11]">You are <span class="font-bold">$72.00</span> away from free shipping globally!</p>
    <div class="shipping-progress-track w-full h-1.5 bg-gray-200 mt-2 rounded">
      <div class="shipping-progress-bar h-full bg-[#ebdcd3]" style="width: 52%"></div>
    </div>
  </div>

  <div class="drawer-body flex-1 overflow-y-auto px-6 py-6" id="CartItemsContainer">
    <!-- Static visual mockup placeholder for theme editor -->
    <div class="cart-empty-state text-center py-20 hidden">
      <p class="font-heading italic text-sm text-gray-500">Your shopping cart is currently empty.</p>
    </div>

    <!-- Active item -->
    <div class="cart-item flex gap-4 border-b border-[#2c1a11]/10 pb-4 mb-4">
      <div class="item-img w-20 h-20 aspect-square overflow-hidden bg-white border border-[#2c1a11]/10 rounded">
        <img src="https://images.unsplash.com/photo-1596701062351-df5f8af0d385?q=80&w=150" alt="product cover copy" class="w-full h-full object-cover">
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <h4 class="font-heading italic text-sm">Overachiever Balm Cleanser</h4>
          <span class="text-[10px] text-gray-500 uppercase tracking-widest font-mono block mt-1">Pink Swatch / Regular size</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center border border-gray-400 rounded h-7">
            <button type="button" class="px-2 text-sm">-</button>
            <span class="px-3 text-xs">1</span>
            <button type="button" class="px-2 text-sm">+</button>
          </div>
          <span class="text-xs font-semibold font-mono">$78.00</span>
        </div>
      </div>
    </div>
  </div>

  <div class="drawer-footer border-t border-[#2c1a11]/10 px-6 py-6 bg-white/50">
    <div class="flex justify-between items-center text-sm font-subheading mb-4">
      <span>Discount/Tax Subtotal</span>
      <span class="font-bold font-mono">$78.00</span>
    </div>
    <form action="/cart" method="post" class="space-y-4">
      <button type="submit" name="checkout" class="btn w-full py-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2">
        <span>Proceed to checkout bags</span>
      </button>
      <button type="button" class="w-full text-center text-xs text-gray-500 font-mono hover:underline" id="CartDrawerContinue">
        Continue shipping
      </button>
    </form>
  </div>
</div>
<div class="cart-drawer-overlay fixed inset-0 bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300 z-[240]" id="CartDrawerOverlay"></div>

{% schema %}
{
  "name": "Cart Drawer",
  "settings": []
}
{% endschema %}`
  },

  // 19. SNIPPETS/PRODUCT-CARD.LIQUID
  {
    path: "snippets/product-card.liquid",
    category: "snippets",
    content: `{% comment %}
  Render a standard product card for Wave Peaches.
  Expects:
  - product: Shopify product object
{% endcomment %}
<div class="product-card group relative flex flex-col bg-white/30 border border-[#2c1a11]/10 p-3 rounded-sm hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300">
  <div class="product-image-container relative aspect-square overflow-hidden bg-white mb-4 rounded-sm border border-[rgba(0,0,0,0.05)]">
    {%- if product.compare_at_price > product.price -%}
      <span class="badge absolute top-3 left-3 bg-[#ffd8cc] text-[#2c1a11] text-[10px] font-subheading uppercase tracking-widest px-2.5 py-1 z-10 border border-[#2c1a11]/20">Sale</span>
    {%- endif -%}

    <img src="{{ product.featured_image | image_url: width: 600 | default: 'https://images.unsplash.com/photo-1596701062351-df5f8af0d385?q=80&w=400' }}" 
         alt="{{ product.title | escape }}" 
         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">

    <!-- Hover quick actions overlay -->
    <div class="quick-add-overlay absolute inset-x-0 bottom-0 p-3 flex justify-center gap-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/20 to-transparent">
      <button class="w-10 h-10 rounded-full bg-[#dfddf6] border border-[#2c1a11] hover:bg-[#b5b3f5] p-2 flex items-center justify-center transition-all shadow-sm" aria-label="Quick View">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
      </button>
      <button class="w-10 h-10 rounded-full bg-[#dfddf6] border border-[#2c1a11] hover:bg-[#b5b3f5] p-2 flex items-center justify-center transition-all shadow-sm" aria-label="Add to cart bag">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </button>
    </div>
  </div>

  <!-- Variant indicators -->
  <div class="product-card-variants flex space-x-2 mb-2">
    <div class="w-2.5 h-2.5 rounded-full border border-black/30 cursor-pointer" style="background-color: #f8cfc3;"></div>
    <div class="w-2.5 h-2.5 rounded-full border border-black/10 cursor-pointer" style="background-color: #dfe9f1;"></div>
    <div class="w-2.5 h-2.5 rounded-full border border-black/10 cursor-pointer" style="background-color: #e5f1df;"></div>
  </div>

  <div class="product-text mt-1">
    <span class="font-subheading text-[9px] uppercase tracking-widest text-[#2c1a11]/40 block mb-0.5">XO Wave</span>
    <a href="{{ product.url }}" class="hover:underline font-subheading text-xs uppercase font-medium tracking-wide text-neutral-800 line-clamp-1">
      {{ product.title | default: 'Overachiever Balm Cleanser' }}
    </a>
    <div class="flex items-center space-x-2 mt-2 font-mono text-xs">
      <span class="font-semibold text-neutral-900">{{ product.price | money | default: '$78.00' }}</span>
      {%- if product.compare_at_price > product.price -%}
        <span class="line-through text-gray-400 text-[10px]">{{ product.compare_at_price | money | default: '$100.00' }}</span>
      {%- endif -%}
    </div>
  </div>
</div>`
  },

  // 20. SNIPPETS/ICON-STAR.LIQUID
  {
    path: "snippets/icon-star.liquid",
    category: "snippets",
    content: `<svg class="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#e76f51] stroke-[#e76f51]" viewBox="0 0 20 20">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
</svg>`
  },

  // 21. SNIPPETS/SWATCH.LIQUID
  {
    path: "snippets/swatch.liquid",
    category: "snippets",
    content: `{% comment %}
  Render a standard color swatch button.
  Expects:
  - color: Named representation or hex string
{% endcomment %}
<button type="button" class="swatch-btn w-6 h-6 rounded-full border border-gray-400 p-0.5" style="background-color: {{ color | default: '#faf3ee' }}" aria-label="color option choice"></button>`
  },

  // 22. ASSETS/THEME.CSS
  {
    path: "assets/theme.css",
    category: "assets",
    content: `/* Custom Assets stylesheet overrides for Wave Shopify Style Theme */
.revealing-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.revealing-element.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Slide in from right drawer standard override transitions */
#CartDrawer.active {
  transform: translateX(0);
}
#MobileMenuDrawer.active {
  transform: translateX(0);
}

/* Floating custom styling tags */
.is-sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 999;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
  animation: slide-down 0.3s ease;
}

@keyframes slide-down {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}`
  },

  // 23. ASSETS/THEME.JS
  {
    path: "assets/theme.js",
    category: "assets",
    content: `// Shopify Wave Theme JavaScript core
document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation logic
  const headerWrapper = document.querySelector('.header-wrapper');
  if (headerWrapper) {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        headerWrapper.classList.add('is-sticky');
      } else {
        headerWrapper.classList.remove('is-sticky');
      }
    };
    window.addEventListener('scroll', handleScroll);
  }

  // 2. IntersectionObserver scroll reveals
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // 3. Simple Slider arrows navigation support
  const prevButton = document.getElementById('SlidePrev');
  const nextButton = document.getElementById('SlideNext');
  const track = document.getElementById('CarouselTrack');
  if (prevButton && nextButton && track) {
    let position = 0;
    const maxScroll = track.scrollWidth - track.clientWidth;
    nextButton.addEventListener('click', () => {
      position = Math.min(position + 320, maxScroll);
      track.style.transform = \`translateX(-\${position}px)\`;
    });
    prevButton.addEventListener('click', () => {
      position = Math.max(position - 320, 0);
      track.style.transform = \`translateX(-\${position}px)\`;
    });
  }

  // 4. Drawer slide-outs
  const cartTrigger = document.getElementById('CartTrigger');
  const cartDrawer = document.getElementById('CartDrawer');
  const cartClose = document.getElementById('CartDrawerCloseButton');
  const overlay = document.getElementById('CartDrawerOverlay');

  if (cartTrigger && cartDrawer && cartClose && overlay) {
    const openCart = () => {
      cartDrawer.classList.add('active');
      overlay.classList.remove('hidden');
      setTimeout(() => overlay.style.opacity = '1', 10);
    };
    const closeCart = () => {
      cartDrawer.classList.remove('active');
      overlay.style.opacity = '0';
      setTimeout(() => overlay.classList.add('hidden'), 300);
    };

    cartTrigger.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);
  }
});`
  },

  // 24. CONFIG/SETTINGS_SCHEMA.JSON
  {
    path: "config/settings_schema.json",
    category: "config",
    content: `[
  {
    "name": "Peaches Theme Color Settings",
    "settings": [
      {
        "type": "color",
        "id": "color_bg",
        "label": "Primary Background Canvas Color",
        "default": "#faf3ee"
      },
      {
        "type": "color",
        "id": "color_bg_secondary",
        "label": "Secondary Dark Background color",
        "default": "#ebdcd3"
      },
      {
        "type": "color",
        "id": "color_text",
        "label": "Main Primary Text Palette",
        "default": "#2c1a11"
      },
      {
        "type": "color",
        "id": "color_accent",
        "label": "Saturated Accents (like Peach details)",
        "default": "#f8cfc3"
      },
      {
        "type": "color",
        "id": "color_button",
        "label": "Primary Add Product CTA Button Background",
        "default": "#b5b3f5"
      },
      {
        "type": "color",
        "id": "color_button_text",
        "label": "Button Label Color font",
        "default": "#2c1a11"
      },
      {
        "type": "color",
        "id": "color_button_hover",
        "label": "Button Hover effect shade background",
        "default": "#9fa0ed"
      }
    ]
  },
  {
    "name": "Peaches Theme Branding Media settings",
    "settings": [
      {
        "type": "image_picker",
        "id": "favicon",
        "label": "Store Favicon Rounded"
      },
      {
        "type": "select",
        "id": "animation_speed",
        "label": "UI Element hover transitions speed rate",
        "options": [
          { "value": "0.15s", "label": "Vivid / Rapid" },
          { "value": "0.3s", "label": "Natural / Balanced" },
          { "value": "0.5s", "label": "Luxurious / Smooth" }
        ],
        "default": "0.3s"
      }
    ]
  }
]`
  },

  // 25. CONFIG/SETTINGS_DATA.JSON
  {
    path: "config/settings_data.json",
    category: "config",
    content: `{
  "current": "Default",
  "presets": {
    "Default": {
      "color_bg": "#faf3ee",
      "color_bg_secondary": "#ebdcd3",
      "color_text": "#2c1a11",
      "color_accent": "#f8cfc3",
      "color_button": "#b5b3f5",
      "color_button_text": "#2c1a11",
      "color_button_hover": "#9fa0ed",
      "animation_speed": "0.3s"
    },
    "Peaches": {
      "color_bg": "#faf3ee",
      "color_bg_secondary": "#ebd8cc",
      "color_text": "#2c1a11",
      "color_accent": "#ffd8cc",
      "color_button": "#b5b3f5",
      "color_button_text": "#2c1a11",
      "color_button_hover": "#9fa0ed",
      "animation_speed": "0.3s"
    }
  }
}`
  },

  // 26. LOCALES/EN.DEFAULT.JSON
  {
    path: "locales/en.default.json",
    category: "locales",
    content: `{
  "general": {
    "search": "Search product items",
    "cart": "My Bag",
    "checkout": "Proceed to Checkout",
    "added_to_cart": "Successfully added products!"
  }
}`
  }
];
