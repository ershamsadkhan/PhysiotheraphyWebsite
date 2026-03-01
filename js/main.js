/* ================================================
   PhysioKhan — Physeo-Inspired Theme
   main.js — Topbar hide · Pill Nav · Carousel · Scroll
   ================================================ */

'use strict';

/* ---- Constants ---- */
const SLIDE_INTERVAL = 5000; // ms
const TOPBAR_SCROLL_HIDE = 80; // px scroll before topbar hides

document.addEventListener('DOMContentLoaded', () => {
  initTopbar();
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initCarousel();
  initScrollAnimations();
  initActiveNavLinks();
  initCounters();
});

/* ================================================
   1. TOPBAR — hide on scroll, reappear at top
   ================================================ */
function initTopbar() {
  const topbar = document.getElementById('topbar');
  const navOuter = document.getElementById('navbar-outer');
  if (!topbar || !navOuter) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > TOPBAR_SCROLL_HIDE) {
      topbar.classList.add('hidden');
      navOuter.classList.add('topbar-hidden');
    } else {
      topbar.classList.remove('hidden');
      navOuter.classList.remove('topbar-hidden');
    }

    navOuter.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* ================================================
   2. NAVBAR scroll shadow
   ================================================ */
function initNavbar() {
  const navOuter = document.getElementById('navbar-outer');
  if (!navOuter) return;
  navOuter.classList.toggle('scrolled', window.scrollY > 10);
}

/* ================================================
   3. HAMBURGER MENU
   ================================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  const close = () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ================================================
   4. SMOOTH SCROLL
   ================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      // account for topbar + navbar height
      const topbarH = document.getElementById('topbar')?.offsetHeight || 0;
      const navH    = document.getElementById('navbar-outer')?.offsetHeight || 82;
      const offset  = window.scrollY > TOPBAR_SCROLL_HIDE ? navH : topbarH + navH;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
}

/* ================================================
   5. HERO CAROUSEL
   ================================================ */
function initCarousel() {
  const slides  = document.querySelectorAll('.hero .slide');
  const dots    = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');

  if (!slides.length) return;

  let current = 0;
  let timer   = null;

  const goTo = (idx) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(next, SLIDE_INTERVAL);
  };

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  // Arrow clicks
  nextBtn?.addEventListener('click', () => { next(); startTimer(); });
  prevBtn?.addEventListener('click', () => { prev(); startTimer(); });

  // Keyboard arrows when hero is visible
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { next(); startTimer(); }
    if (e.key === 'ArrowLeft')  { prev(); startTimer(); }
  });

  // Touch swipe support
  let touchStartX = 0;
  const hero = document.querySelector('.hero');
  hero?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  hero?.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); startTimer(); }
  }, { passive: true });

  startTimer();
}

/* ================================================
   6. SCROLL ANIMATIONS
   ================================================ */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ================================================
   7. ACTIVE NAV LINKS
   ================================================ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const update = () => {
    const navH = document.getElementById('navbar-outer')?.offsetHeight || 82;
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - navH - 80) current = '#' + s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === current));
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ================================================
   8. ANIMATED COUNTERS
   ================================================ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target   = parseInt(el.getAttribute('data-count'), 10);
    const duration = 2000;
    const start    = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); observer.unobserve(e.target); } });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}
