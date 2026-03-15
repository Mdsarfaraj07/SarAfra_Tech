/* ============================================================
   DevCraft Studio — main.js
   UI rendering, scroll effects, contact form, toasts.
   ============================================================ */

// ── DOM Ready ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderTicker();
  renderServices();
  renderPortfolio();
  renderPricing();
  renderTestimonials();
  renderContact();
  initNavbar();
  initScrollReveal();
  initMobileMenu();
  initAgent();
});

// ── Tech Ticker ───────────────────────────────────────────────
function renderTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  // Double the list so the seamless loop works
  const allItems = [...TECH_TICKER, ...TECH_TICKER];
  track.innerHTML = allItems
    .map(t => `<div class="ticker-item"><span>◆</span>${t}</div>`)
    .join('');
}

// ── Services ──────────────────────────────────────────────────
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = SERVICES.map(s => `
    <div class="service-card reveal">
      <div class="service-icon">${s.icon}</div>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.desc}</div>
      <div class="service-tags">${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>`).join('');
}

// ── Portfolio ─────────────────────────────────────────────────
function renderPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  grid.innerHTML = PORTFOLIO.map(p => `
    <div class="portfolio-card reveal">
      <div class="portfolio-thumb" style="background:${p.color}">${p.emoji}</div>
      <div class="portfolio-body">
        <div class="portfolio-meta">
          ${p.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('')}
        </div>
        <div class="portfolio-name">${p.name}</div>
        <div class="portfolio-desc">${p.desc}</div>
        <div class="portfolio-stats">
          ${p.stats.map(s => `
            <div class="p-stat">
              <strong>${s.val}</strong>
              <span>${s.label}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>`).join('');
}

// ── Pricing ───────────────────────────────────────────────────
function renderPricing() {
  const grid = document.getElementById('pricingGrid');
  if (!grid) return;
  grid.innerHTML = PLANS.map(p => `
    <div class="pricing-card ${p.featured ? 'featured' : ''} reveal">
      ${p.badge ? `<div class="pricing-badge">${p.badge}</div>` : ''}
      <div class="pricing-name">${p.name}</div>
      <div class="pricing-price">${p.price === 'Custom' ? 'Custom' : '<sup>₹</sup>' + p.price.replace('₹','')}</div>
      <div class="pricing-period">${p.period}</div>
      <div class="pricing-features">
        ${p.features.map(f => {
          if (typeof f === 'string') return `<div class="pricing-feature">${f}</div>`;
          return `<div class="pricing-feature no">${f.text}</div>`;
        }).join('')}
      </div>
      <button class="btn-${p.featured ? 'primary' : p.price === 'Custom' ? 'outline' : 'outline'}"
        style="width:100%"
        onclick="scrollToSection('ai-agent')">
        ${p.price === 'Custom' ? 'Contact Us' : 'Get Started →'}
      </button>
    </div>`).join('');
}

// ── Testimonials ──────────────────────────────────────────────
function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card reveal">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <div class="testimonial-text">"${t.text}"</div>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.avatar}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>`).join('');
}

// ── Contact ───────────────────────────────────────────────────
function renderContact() {
  const items = document.getElementById('contactItems');
  if (!items) return;
  items.innerHTML = CONTACT_INFO.map(c => `
    <div class="contact-item">
      <div class="contact-icon">${c.icon}</div>
      <div>
        <div class="contact-item-label">${c.label}</div>
        <div class="contact-item-val">${c.value}</div>
      </div>
    </div>`).join('');
}

// ── Contact Form Submit ───────────────────────────────────────
async function submitContact() {
  const name    = document.getElementById('cfName')?.value.trim();
  const email   = document.getElementById('cfEmail')?.value.trim();
  const budget  = document.getElementById('cfBudget')?.value.trim();
  const message = document.getElementById('cfMessage')?.value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Sending...';

  await saveContact({ name, email, budget, message });

  btn.disabled = false;
  btn.innerHTML = 'Send Message →';

  document.getElementById('contactFormWrap').innerHTML = `
    <div class="success-state">
      <div class="check-icon">✅</div>
      <h3>Message Received!</h3>
      <p>Thanks ${name}! We'll get back to you within 4 business hours.</p>
    </div>`;

  showToast('Message sent successfully!', 'success');
}

// ── Navbar scroll effect ──────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ── Mobile menu ───────────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
}

// ── Scroll to section ─────────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
  closeMobileMenu();
}

// ── Scroll reveal ─────────────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  // Observe after render with small delay
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, 100);
}

// ── Toast notifications ───────────────────────────────────────
function showToast(message, type = 'info') {
  // Remove existing
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || 'ℹ️'}</div>
    <div class="toast-text">${message}</div>
    <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>`;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ── Smooth anchor links ───────────────────────────────────────
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  if (!id) return;
  e.preventDefault();
  scrollToSection(id);
});
