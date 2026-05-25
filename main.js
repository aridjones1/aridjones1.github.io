/* =========================================================
   MAIN.JS — Dark mode toggle, mobile nav,
             scroll-aware header, reveal animations,
             project filtering, footer year, form handler
   ========================================================= */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────
     1. DARK MODE TOGGLE
     Reads system preference on first load.
     Clicking the button cycles light ↔ dark.
  ────────────────────────────────────────────────────── */
  const html   = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');

  // Detect system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme  = prefersDark ? 'dark' : 'light';
  html.setAttribute('data-theme', currentTheme);

  function updateToggleIcon(theme) {
    if (!toggle) return;
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    toggle.innerHTML = isDark
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
           <circle cx="12" cy="12" r="5"/>
           <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
         </svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
         </svg>`;
  }

  updateToggleIcon(currentTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', currentTheme);
      updateToggleIcon(currentTheme);
    });
  }

  /* ──────────────────────────────────────────────────────
     2. MOBILE NAVIGATION TOGGLE
  ────────────────────────────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ──────────────────────────────────────────────────────
     3. SCROLL-AWARE HEADER
     Hides header on scroll-down, shows on scroll-up.
  ────────────────────────────────────────────────────── */
  const header = document.getElementById('site-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    if (!header) return;

    header.classList.toggle('is-scrolled', y > 10);

    // Hide when scrolling down more than 80px from top
    if (y > 80) {
      header.classList.toggle('is-hidden', y > lastScrollY + 2);
    } else {
      header.classList.remove('is-hidden');
    }

    lastScrollY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ──────────────────────────────────────────────────────
     4. INTERSECTION OBSERVER — SCROLL REVEAL
     Adds .is-visible to elements with .reveal when
     they enter the viewport.
  ────────────────────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger children within the same parent
            const siblings = entry.target.parentElement
              ? [...entry.target.parentElement.querySelectorAll('.reveal:not(.is-visible)')]
              : [];
            const delay = siblings.indexOf(entry.target) * 80;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, Math.min(delay, 400));
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately for older browsers
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ──────────────────────────────────────────────────────
     5. PROJECT GALLERY FILTER
     Filters cards by category. Updates aria-selected.
  ────────────────────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button states
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      projectCards.forEach(card => {
        const category = card.dataset.category;
        const visible = filter === 'all' || category === filter;
        card.setAttribute('aria-hidden', String(!visible));
        // Re-trigger reveal animation for newly visible cards
        if (visible && !card.classList.contains('is-visible')) {
          card.classList.add('is-visible');
        }
      });
    });
  });

  /* ──────────────────────────────────────────────────────
     6. FOOTER — DYNAMIC YEAR
  ────────────────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ──────────────────────────────────────────────────────
     7. CONTACT FORM HANDLER
     Uses Formspree by default. Replace the action URL.
     Shows inline success/error feedback without reload.
  ────────────────────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('[type="submit"]');
      const formData  = new FormData(contactForm);

      // Basic client-side validation
      const name    = formData.get('name')?.trim();
      const email   = formData.get('email')?.trim();
      const message = formData.get('message')?.trim();

      if (!name || !email || !message) {
        showFormMessage(contactForm, 'Please fill in all fields.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormMessage(contactForm, 'Please enter a valid email address.', 'error');
        return;
      }

      // Disable button while submitting
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        // Replace with your Formspree endpoint:
        // e.g. https://formspree.io/f/YOUR_FORM_ID
        const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

        const res = await fetch(FORMSPREE_URL, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          contactForm.reset();
          showFormMessage(contactForm, "Thanks! I'll get back to you soon.", 'success');
        } else {
          throw new Error('Server error');
        }
      } catch {
        showFormMessage(
          contactForm,
          'Something went wrong. Email me directly at you@example.com',
          'error'
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }

  function showFormMessage(form, text, type) {
    // Remove any existing message
    form.querySelector('.form-feedback')?.remove();

    const msg = document.createElement('p');
    msg.className = 'form-feedback';
    msg.textContent = text;
    msg.style.cssText = `
      font-size: var(--text-sm);
      font-weight: 500;
      color: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
      text-align: center;
      margin-top: 0;
      max-width: none;
    `;
    form.appendChild(msg);

    // Auto-remove after 6 seconds
    setTimeout(() => msg.remove(), 6000);
  }

  /* ──────────────────────────────────────────────────────
     8. SMOOTH SCROLL — polyfill for Safari / older
  ────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL without scroll jump
        history.pushState(null, '', this.getAttribute('href'));
      }
    });
  });

})();
