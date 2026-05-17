// ── NAV SCROLL EFFECT ────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── ACTIVE NAV LINK ───────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');
const current = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  link.classList.remove('active');
  const href = link.getAttribute('href') || '';
  if (href === current || (current === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── HAMBURGER ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });
}

// ── PORTFOLIO FILTERS ─────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const pfCards = document.querySelectorAll('.pf-card');
if (filterBtns.length && pfCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      pfCards.forEach(card => {
        if (cat === 'All' || card.dataset.cat === cat) {
          card.removeAttribute('data-hidden');
          card.style.display = '';
        } else {
          card.setAttribute('data-hidden', 'true');
          card.style.display = 'none';
        }
      });
    });
  });

  // Handle URL param on page load (e.g. templates.html?cat=Fitness)
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat');
  if (catParam) {
    const matchBtn = [...filterBtns].find(b => b.dataset.filter === catParam);
    if (matchBtn) matchBtn.click();
  }
}

// ── CONTACT FORM ───────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    setTimeout(() => {
      contactForm.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if (success) success.style.display = 'block';
    }, 1200);
  });
}

// ── SCROLL REVEAL ──────────────────────────────────────────────
const revealEls = document.querySelectorAll('.service-card, .pf-card, .review-card, .process-step, .pricing-card, .pf-card, .client-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity .5s ${i * 0.07}s ease, transform .5s ${i * 0.07}s ease`;
    observer.observe(el);
  });
}
