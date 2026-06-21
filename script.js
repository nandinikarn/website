// ===== Mobile nav toggle =====
const burger = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Gesture label cycle (hero viewport readout) =====
const gestureLabel = document.getElementById('gestureLabel');
const gestures = ['FORWARD', 'BACKWARD', 'LEFT', 'RIGHT', 'STOP'];
let gestureIndex = 0;

if (gestureLabel) {
  setInterval(() => {
    gestureIndex = (gestureIndex + 1) % gestures.length;
    gestureLabel.textContent = gestures[gestureIndex];
  }, 2200);
}

// ===== Subtle hand-rig drift on mouse move (desktop only) =====
const handRig = document.getElementById('handRig');
if (handRig && window.matchMedia('(pointer: fine)').matches) {
  const viewport = document.getElementById('viewport');
  viewport.addEventListener('mousemove', (e) => {
    const rect = viewport.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    handRig.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
  });
  viewport.addEventListener('mouseleave', () => {
    handRig.style.transform = '';
  });
}

// ===== Contact form -> mailto =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.location.href = `mailto:karnnandini28@gmail.com?subject=${subject}&body=${body}`;
  });
}

// ===== Scroll-triggered reveal for sections =====
const revealTargets = document.querySelectorAll('.section-inner > *');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Respect reduced motion: skip reveal animation entirely
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.transition = 'none';
  });
  observer.disconnect();
}