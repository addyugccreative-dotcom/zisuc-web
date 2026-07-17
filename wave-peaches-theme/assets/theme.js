// Shopify Wave Theme JavaScript core
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
      track.style.transform = `translateX(-${position}px)`;
    });
    prevButton.addEventListener('click', () => {
      position = Math.max(position - 320, 0);
      track.style.transform = `translateX(-${position}px)`;
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
});