/* ═══════════════════════════════════════
   AMS TECH — التفاعلات
═══════════════════════════════════════ */

// شريط التنقل عند التمرير
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// قائمة الجوال
const burger = document.getElementById('navBurger');
const links = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('is-open');
  links.classList.toggle('is-open');
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    burger.classList.remove('is-open');
    links.classList.remove('is-open');
  })
);

// حركات الظهور عند التمرير
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// عدّادات الإحصائيات (بأرقام عربية مشرقية)
const toArabicDigits = (n) =>
  String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);

const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = toArabicDigits(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll('.stat__num').forEach((el) => countObserver.observe(el));

// توهج يتبع المؤشر على بطاقات الخدمات
document.querySelectorAll('.service').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

// نموذج التواصل
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.hidden = false;
  form.querySelector('.form__submit').disabled = true;
  form.querySelector('.form__submit').style.opacity = '0.6';
  setTimeout(() => {
    form.reset();
    form.querySelector('.form__submit').disabled = false;
    form.querySelector('.form__submit').style.opacity = '';
  }, 800);
});
