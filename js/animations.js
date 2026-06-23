// ===== GSAP + SCROLLTRIGGER ANIMATIONS =====
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero Text Reveal
  const heroLines = document.querySelectorAll('.hero-title .line span');
  if (heroLines.length) {
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl.to(heroLines, {
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out'
    })
    .to('.hero-desc', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .to('.hero-actions', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4');
  }

  // Parallax Effects
  document.querySelectorAll('.parallax-image').forEach(img => {
    const wrapper = img.closest('.parallax-wrapper');
    if (!wrapper) return;
    gsap.to(img, {
      y: () => (img.offsetHeight - wrapper.offsetHeight) * 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Hero Parallax
  const heroBg = document.querySelector('.hero-bg, .page-hero-bg');
  if (heroBg) {
    gsap.to(heroBg, {
      y: '30%',
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: heroBg.parentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Section Fade Ups with Stagger
  document.querySelectorAll('.service-card').forEach((card, i) => {
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Artist Cards Stagger
  document.querySelectorAll('.artist-card').forEach((card, i) => {
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Portfolio Items Stagger
  document.querySelectorAll('.portfolio-item, .portfolio-page-item').forEach((item, i) => {
    gsap.from(item, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Stats Counter Animation
  document.querySelectorAll('.counter-animate').forEach(counter => {
    gsap.from(counter, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Horizontal Scroll Gallery
  const horizontalTrack = document.querySelector('.horizontal-scroll-track');
  if (horizontalTrack) {
    const items = horizontalTrack.querySelectorAll('.horizontal-scroll-item');
    const totalWidth = items.length * 100;

    gsap.to(horizontalTrack, {
      x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '.horizontal-scroll',
        start: 'top top',
        end: () => '+=' + (horizontalTrack.scrollWidth - window.innerWidth),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    // Parallax inside horizontal items
    items.forEach(item => {
      const img = item.querySelector('img');
      if (img) {
        gsap.to(img, {
          x: () => (img.naturalWidth ? -(img.naturalWidth - item.offsetWidth) * 0.2 : -100),
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'left right',
            end: 'right left',
            scrub: true,
            containerAnimation: horizontalTrack._gsap ? null : null
          }
        });
      }
    });
  }

  // Mission Cards Stagger
  document.querySelectorAll('.mission-card').forEach((card, i) => {
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Certificate Items Stagger
  document.querySelectorAll('.cert-item').forEach((item, i) => {
    gsap.from(item, {
      y: 40,
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Service Blocks (Alternating) on Services Page
  document.querySelectorAll('.service-block').forEach((block, i) => {
    const image = block.querySelector('.service-block-image');
    const content = block.querySelector('.service-block-content');

    if (image) {
      gsap.from(image, {
        x: i % 2 === 0 ? -80 : 80,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    if (content) {
      gsap.from(content, {
        x: i % 2 === 0 ? 80 : -80,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });

  // Pricing Cards Stagger
  document.querySelectorAll('.pricing-card').forEach((card, i) => {
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Contact Info Cards
  document.querySelectorAll('.contact-info-card').forEach((card, i) => {
    gsap.from(card, {
      x: 40,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Compare Items
  document.querySelectorAll('.compare-item').forEach((item, i) => {
    gsap.from(item, {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Studio Gallery Images Stagger
  document.querySelectorAll('.studio-gallery img').forEach((img, i) => {
    gsap.from(img, {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: img.closest('.studio-gallery'),
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // CTA Section Parallax
  const ctaBg = document.querySelector('.cta-bg');
  if (ctaBg) {
    gsap.to(ctaBg, {
      y: '20%',
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: ctaBg.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

// ===== SWIPER INITIALIZATION =====
function initSwipers() {
  const testimonialSwiper = document.querySelector('.testimonials-swiper');
  if (testimonialSwiper) {
    new Swiper(testimonialSwiper, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
