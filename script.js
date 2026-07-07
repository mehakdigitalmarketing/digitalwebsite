// MDM MEHAK — shared interactions

// Sticky/solid navbar on scroll
const navbar = document.querySelector('.navbar');
const onScroll = () => {
  if (window.scrollY > 40) navbar?.classList.add('solid');
  else navbar?.classList.remove('solid');
};
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Mobile dropdown toggle (services)
document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 920) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      }
    });
    item.classList.toggle('open', !isOpen);
    a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
  });
});

// Testimonial slider
const track = document.querySelector('.testi-track');
const dots = document.querySelectorAll('.testi-dot');
let testiIndex = 0;
function goToTesti(i) {
  const slides = document.querySelectorAll('.testi-card');
  if (!slides.length) return;
  testiIndex = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${testiIndex * 100}%)`;
  dots.forEach((d, idx) => d.classList.toggle('active', idx === testiIndex));
}
dots.forEach((d, idx) => d.addEventListener('click', () => goToTesti(idx)));
if (track) {
  setInterval(() => goToTesti(testiIndex + 1), 5500);
}

// Animated counters
const counters = document.querySelectorAll('.counter');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

// Simple form handler (demo — wire up to your backend / form service)
document.querySelectorAll('form[data-enquiry]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      btn.textContent = 'Request received ✓';
      form.reset();
      setTimeout(() => (btn.textContent = original), 2600);
    }, 900);
  });
});
