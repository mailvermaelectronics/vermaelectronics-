// script.js — interactions: nav toggle, form handling, FAB, reveal-on-scroll, smooth scroll

document.addEventListener('DOMContentLoaded', () => {
  // set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // NAV: mobile toggle
  const navToggle = document.getElementById('navToggle');
  const mainMenu = document.getElementById('mainMenu');
  if (navToggle && mainMenu) {
    navToggle.addEventListener('click', () => {
      const open = mainMenu.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (mainMenu && mainMenu.classList.contains('show')) {
          mainMenu.classList.remove('show');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // FAB menu
  const fabBtn = document.getElementById('fabBtn');
  const fabMenu = document.getElementById('fabMenu');
  if (fabBtn && fabMenu) {
    fabBtn.addEventListener('click', () => {
      const open = fabMenu.style.display === 'block';
      fabMenu.style.display = open ? 'none' : 'block';
      fabBtn.setAttribute('aria-expanded', String(!open));
      fabMenu.setAttribute('aria-hidden', String(open));
    });

    // close on outside click
    document.addEventListener('click', (e) => {
      if (!fabMenu.contains(e.target) && !fabBtn.contains(e.target)) {
        fabMenu.style.display = 'none';
        fabBtn.setAttribute('aria-expanded', 'false');
        fabMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Contact form handling with validation
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const clearBtn = document.getElementById('clearForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // basic validation
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !phone || !message) {
        formMessage.textContent = 'Please complete all required fields.';
        formMessage.style.color = 'var(--accent-1)';
        return;
      }

      // simulate sending
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        formMessage.textContent = `Thanks ${name.split(' ')[0]} — we received your request and will contact you shortly.`;
        formMessage.style.color = 'green';
        form.reset();
      }, 900);
    });
  }
  if (clearBtn && form) {
    clearBtn.addEventListener('click', () => {
      form.reset();
      if (formMessage) formMessage.textContent = '';
    });
  }

  // Intersection Observer for reveal animations
  const revealElems = document.querySelectorAll('.service-card, .media-card, .about-image, .contact-card, .icon-card, .testimonial');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElems.forEach(el => revealObserver.observe(el));

  // Parallax effect on hero background (lightweight)
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      hero.style.backgroundPosition = `center ${Math.max(-40, scrolled * 0.12)}px`;
    }, { passive: true });
  }

});
