// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Destination filter
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.dest-grid .card');

filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filters.forEach((b) => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    cards.forEach((card) => {
      card.hidden = f !== 'all' && !card.dataset.cat.split(' ').includes(f);
    });
  });
});

// Image fallback: hide broken images so the gradient background shows instead
document.querySelectorAll('.card img').forEach((img) => {
  img.addEventListener('error', () => {
    img.removeAttribute('src');
    img.alt = '';
  });
});

// Lightbox
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.innerHTML = '<button aria-label="Close">&times;</button><img alt="">';
document.body.appendChild(lightbox);
const lbImg = lightbox.querySelector('img');

const closeLightbox = () => lightbox.classList.remove('open');

document.querySelectorAll('.card img').forEach((img) => {
  img.addEventListener('click', () => {
    if (!img.src) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.querySelector('button').focus();
  });
});
lightbox.addEventListener('click', (e) => {
  if (e.target !== lbImg) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Contact form (demo only: nothing is sent anywhere)
const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    status.textContent = 'Please enter your name and a valid email address.';
    status.classList.add('error');
    return;
  }
  status.classList.remove('error');
  status.textContent = `Thanks, ${form.name.value.trim()}! We'll be in touch soon.`;
  form.reset();
});
