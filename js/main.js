// ===== LOADING SCREEN =====
class Loader {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.progress = document.querySelector('.loader-progress');
    this.barFill = document.querySelector('.loader-bar-fill');
    this.counter = document.querySelector('.loader-counter');
    if (!this.loader) return;
    this.init();
  }

  init() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => this.hide(), 400);
      }
      if (this.barFill) this.barFill.style.width = progress + '%';
      if (this.counter) this.counter.textContent = Math.floor(progress) + '%';
    }, 200);
  }

  hide() {
    this.loader.classList.add('hidden');
    document.body.style.overflow = '';
    setTimeout(() => {
      this.loader.style.display = 'none';
    }, 600);
  }
}

// ===== CUSTOM CURSOR =====
class CustomCursor {
  constructor() {
    this.dot = document.querySelector('.cursor-dot');
    this.ring = document.querySelector('.cursor-ring');
    if (!this.dot || !this.ring) return;
    this.pos = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };
    this.speed = 0.15;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.dot.style.left = e.clientX + 'px';
      this.dot.style.top = e.clientY + 'px';
    });

    const animate = () => {
      this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
      this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
      this.ring.style.left = this.pos.x + 'px';
      this.ring.style.top = this.pos.y + 'px';
      requestAnimationFrame(animate);
    };
    animate();

    const hoverTargets = document.querySelectorAll('a, button, .service-card, .portfolio-item, .artist-card, .filter-btn, .portfolio-page-item');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }
}

// ===== NAVIGATION =====
class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.toggle = document.querySelector('.nav-toggle');
    this.mobileMenu = document.querySelector('.mobile-menu');
    if (!this.nav) return;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
    });

    if (this.toggle && this.mobileMenu) {
      this.toggle.addEventListener('click', () => {
        this.toggle.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
      });

      const closeBtn = this.mobileMenu.querySelector('.mobile-menu-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.toggle.classList.remove('active');
          this.mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      }

      this.mobileMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          this.toggle.classList.remove('active');
          this.mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  }
}

// ===== SMOOTH SCROLL (Lenis) =====
class SmoothScroll {
  constructor() {
    if (typeof Lenis === 'undefined') return;
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    this.lenis.on('scroll', (e) => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
      }
    });

    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }
}

// ===== SCROLL REVEAL (Intersection Observer) =====
class ScrollReveal {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .skew-reveal, .stagger-children, .counter-animate').forEach(el => {
      this.observer.observe(el);
    });
  }
}

// ===== COUNTER ANIMATION =====
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('.stat-number');
    if (!this.counters.length) return;
    this.animated = new Set();
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated.has(entry.target)) {
          this.animated.add(entry.target);
          this.animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target')) || 0;
    const suffix = el.getAttribute('data-suffix') || '+';
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(update);
  }
}

// ===== PORTFOLIO FILTER =====
class PortfolioFilter {
  constructor() {
    this.buttons = document.querySelectorAll('.filter-btn');
    this.items = document.querySelectorAll('.portfolio-item, .portfolio-page-item');
    if (!this.buttons.length) return;
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.items.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            item.style.opacity = '0';
            setTimeout(() => { item.style.opacity = '1'; }, 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}

// ===== LIGHTBOX =====
class Lightbox {
  constructor() {
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.items = [];
    this.currentIndex = 0;
    if (!this.lightbox) return;
    this.init();
  }

  init() {
    const galleryItems = document.querySelectorAll('.portfolio-item, .portfolio-page-item');
    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        this.items.push(img.src);
        item.addEventListener('click', () => this.open(index));
      }
    });

    document.querySelector('.lightbox-close')?.addEventListener('click', () => this.close());
    document.querySelector('.lightbox-prev')?.addEventListener('click', () => this.prev());
    document.querySelector('.lightbox-next')?.addEventListener('click', () => this.next());

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  open(index) {
    this.currentIndex = index;
    this.lightboxImg.src = this.items[index];
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.lightboxImg.src = this.items[this.currentIndex];
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.lightboxImg.src = this.items[this.currentIndex];
  }
}

// ===== FAQ ACCORDION =====
class FAQ {
  constructor() {
    this.items = document.querySelectorAll('.faq-item');
    if (!this.items.length) return;
    this.init();
  }

  init() {
    this.items.forEach(item => {
      const question = item.querySelector('.faq-question');
      question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        this.items.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }
}

// ===== MAGNETIC BUTTON =====
class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('.magnetic-wrap');
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }
}

// ===== FORM HANDLING =====
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    if (!this.form) return;
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = this.form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';
        this.form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
}

// ===== ACTIVE NAV LINK =====
class ActiveNav {
  constructor() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  }
}

// ===== BEFORE/AFTER COMPARISON SLIDER =====
class CompareSlider {
  constructor() {
    this.containers = document.querySelectorAll('.img-compare');
    if (!this.containers.length) return;
    this.init();
  }

  init() {
    this.containers.forEach(container => {
      const wrap = container.querySelector('.img-compare-after-wrap');
      const handle = container.querySelector('.img-compare-handle');
      const images = container.querySelector('.img-compare-images');
      const afterImg = container.querySelector('.img-compare-after');
      if (!wrap || !handle || !images || !afterImg) return;

      const syncImgWidth = () => {
        afterImg.style.width = images.offsetWidth + 'px';
      };
      syncImgWidth();
      window.addEventListener('resize', syncImgWidth);

      const setPos = (clientX) => {
        const rect = images.getBoundingClientRect();
        let pos = (clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        wrap.style.width = (pos * 100) + '%';
        handle.style.left = (pos * 100) + '%';
      };

      images.addEventListener('mousedown', (e) => {
        setPos(e.clientX);
        const onMove = (e) => setPos(e.clientX);
        const onUp = () => {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });

      images.addEventListener('touchstart', (e) => {
        setPos(e.touches[0].clientX);
        const onMove = (e) => {
          e.preventDefault();
          setPos(e.touches[0].clientX);
        };
        const onUp = () => {
          document.removeEventListener('touchmove', onMove);
          document.removeEventListener('touchend', onUp);
        };
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);
      });
    });
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  new Loader();
  new CustomCursor();
  new Navigation();
  new ActiveNav();
  new ScrollReveal();
  new CounterAnimation();
  new PortfolioFilter();
  new Lightbox();
  new FAQ();
  new MagneticButtons();
  new ContactForm();
  new CompareSlider();

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    initGSAPAnimations();
  }

  if (typeof Swiper !== 'undefined') {
    try {
      initSwipers();
    } catch (e) {
      console.error('Swiper initialization failed:', e);
    }
  }
});
