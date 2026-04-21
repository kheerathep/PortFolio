/* ═══════════════════════════════════════
   portfolio.js
   ═══════════════════════════════════════ */

'use strict';

// ── State ──────────────────────────────
let lang = 'th';
let theme = 'dark';      // 'dark' | 'light'
let appData = null;
let io = null;

// ── Fetch data.json ────────────────────
async function loadData() {
  const res = await fetch('data.json');
  appData = await res.json();
  init();
}

// ══════════════════════════════════════
// THEME
// ══════════════════════════════════════
function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  localStorage.setItem('portfolio-theme', theme);
}

function applyTheme() {
  const html = document.documentElement;
  if (theme === 'light') {
    html.classList.add('light');
  } else {
    html.classList.remove('light');
  }
}

// ══════════════════════════════════════
// RENDER
// ══════════════════════════════════════

// ── Skills (grouped icon grid) ─────────
function renderSkills(l) {
  const list = document.getElementById('skillsList');
  const groups = appData.skillGroups;
  const gi18n = appData.i18n.skillGroups;

  const darkIcons = ['github', 'nextjs'];

  list.innerHTML = groups.map(g => `
    <div class="mb-12 last:mb-0 anim-row">
      <p class="text-[11px] font-bold tracking-[0.15em] uppercase text-accent-1 mb-6 opacity-90"
         data-key="${g.key}">
        ${gi18n[g.key][l]}
      </p>
      <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-4">
        ${g.skills.map(s => {
          const needsInvert = darkIcons.some(k => s.icon.includes(k));
          return `
          <div class="skill-card flex flex-col items-center justify-center gap-4 py-8 px-3 rounded-2xl border border-border bg-surface shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-accent-1 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 group cursor-default">
            <img
              src="${s.icon}"
              alt="${s.label[l]}"
              class="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110
                     transition-all duration-300${needsInvert ? ' icon-auto-invert' : ''}"
              loading="lazy"
            />
            <span class="text-[12px] font-bold text-mid group-hover:text-bright transition-colors duration-200 text-center leading-tight skill-label"
                  data-label-en="${s.label.en}"
                  data-label-th="${s.label.th}">
              ${s.label[l]}
            </span>
          </div>`;
        }).join('')}
      </div>
    </div>
  `).join('');
}

// ── Projects ───────────────────────────
function renderProjects(l) {
  const { i18n, projects } = appData;
  document.getElementById('projectsList').innerHTML = projects[l].map(p => `
    <div class="anim-row vis p-8 mb-8 rounded-3xl border border-border bg-surface shadow-sm hover:border-accent-1 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
      <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4">
        <span class="font-display text-[1.4rem] font-bold text-bright tracking-tight group-hover:text-accent-1 transition-colors">${p.name}</span>
        <div class="flex gap-6">
          <a href="${p.github}" target="_blank"
             class="text-[12px] font-bold text-mid no-underline border-b-2 border-transparent pb-1
                    hover:text-bright hover:border-accent-1 transition-all duration-200">
            ${i18n.githubLbl[l]}
          </a>
          <a href="${p.live}" target="_blank"
             class="text-[12px] font-bold text-mid no-underline border-b-2 border-transparent pb-1
                    hover:text-bright hover:border-accent-1 transition-all duration-200">
            ${i18n.liveLbl[l]}
          </a>
        </div>
      </div>
      <div class="flex gap-2 flex-wrap mb-5">
        ${p.tags.map(t =>
          `<span class="font-mono text-[10px] font-bold tracking-wider uppercase text-accent-1 bg-accent-1/10 px-3 py-1 rounded-full">${t}</span>`
        ).join('')}
      </div>
      <p class="proj-desc text-[15px] text-soft leading-[1.8] max-w-[600px]">${p.desc}</p>
    </div>
  `).join('');
}

// ── Experience ─────────────────────────
function renderExperience(l) {
  document.getElementById('expList').innerHTML = appData.experience[l].map(e => `
    <div class="anim-row vis flex flex-col sm:flex-row gap-8 p-8 mb-8 rounded-3xl border border-border bg-surface shadow-sm hover:shadow-lg transition-all duration-500">
      <div class="sm:w-32 flex-shrink-0">
        <span class="font-mono text-[12px] font-bold text-accent-1 opacity-80">${e.date}</span>
      </div>
      <div>
        <div class="font-display text-[1.25rem] font-bold text-bright mb-2">${e.role}</div>
        <div class="text-[14px] font-semibold text-mid mb-4 opacity-80">${e.company}</div>
        <div class="exp-desc text-[15px] text-soft leading-[1.8]">${e.desc}</div>
      </div>
    </div>
  `).join('');
}

// ── Stats labels ────────────────────────
function renderStats(l) {
  document.querySelectorAll('[data-stat-key]').forEach(el => {
    el.textContent = appData.i18n.stats[el.dataset.statKey][l];
  });
}

// ── Static translated text ─────────────
function updateStatic(l) {
  const { i18n, contact, footer } = appData;

  document.getElementById('heroTitle').innerHTML = i18n.hero[l].title;
  document.getElementById('heroDesc').textContent = i18n.hero[l].desc;
  document.getElementById('contactHeading').innerHTML = i18n.contactHeading[l];

  const f = i18n.form[l];
  document.getElementById('fName').placeholder = f.name;
  document.getElementById('fEmail').placeholder = f.email;
  document.getElementById('fMsg').placeholder = f.msg;

  document.getElementById('contactEmail').textContent = contact.email;
  document.getElementById('contactGithub').textContent = contact.github;
  document.getElementById('contactLinkedin').textContent = contact.linkedin;

  document.getElementById('footerCopy').textContent = footer.copy;
  document.getElementById('footerGithub').textContent = i18n.footer.github[l];
  document.getElementById('footerLinkedin').textContent = i18n.footer.linkedin[l];
  document.getElementById('footerResume').textContent = i18n.footer.resume[l];

  document.getElementById('navSkills').textContent = i18n.nav.skills[l];
  document.getElementById('navWork').textContent = i18n.nav.work[l];
  document.getElementById('navExperience').textContent = i18n.nav.experience[l];
  document.getElementById('navContact').textContent = i18n.nav.contact[l];

  document.getElementById('btnWork').textContent = i18n.btnWork[l];
  document.getElementById('btnContact').textContent = i18n.btnContact[l];
  document.getElementById('heroStatus').textContent = i18n.status[l];

  document.getElementById('secSkills').textContent = i18n.secSkills[l];
  document.getElementById('secWork').textContent = i18n.secWork[l];
  document.getElementById('secExp').textContent = i18n.secExp[l];
  document.getElementById('secContact').textContent = i18n.secContact[l];

  document.getElementById('labelName').textContent = i18n.form[l].labelName || (l === 'th' ? 'ชื่อ' : 'Name');
  document.getElementById('labelEmail').textContent = i18n.form[l].labelEmail || (l === 'th' ? 'อีเมล' : 'Email');
  document.getElementById('labelMsg').textContent = i18n.form[l].labelMsg || (l === 'th' ? 'ข้อความ' : 'Message');

  document.getElementById('submitBtn').textContent = i18n.btnSend[l];

  renderStats(l);
}

// ══════════════════════════════════════
// LANGUAGE TOGGLE
// ══════════════════════════════════════
function setLang(l) {
  lang = l;
  const html = document.documentElement;
  // Preserve current theme class
  const isLight = html.classList.contains('light');
  html.className = `scroll-smooth lang-${l}${isLight ? ' light' : ''}`;

  const btnTh = document.getElementById('btnTh');
  const btnEn = document.getElementById('btnEn');

  if (l === 'th') {
    btnTh.classList.add('bg-bright', 'text-ink');
    btnTh.classList.remove('bg-transparent', 'text-mid');
    btnEn.classList.add('bg-transparent', 'text-mid');
    btnEn.classList.remove('bg-bright', 'text-ink');
  } else {
    btnEn.classList.add('bg-bright', 'text-ink');
    btnEn.classList.remove('bg-transparent', 'text-mid');
    btnTh.classList.add('bg-transparent', 'text-mid');
    btnTh.classList.remove('bg-bright', 'text-ink');
  }

  updateStatic(l);
  renderProjects(l);
  renderExperience(l);

  // Update skill labels + group headers in-place
  const gi18n = appData.i18n.skillGroups;
  document.querySelectorAll('.skill-label').forEach(el => {
    el.textContent = el.dataset[`label${l.charAt(0).toUpperCase() + l.slice(1)}`];
  });
  document.querySelectorAll('.group-label[data-key]').forEach(el => {
    el.textContent = gi18n[el.dataset.key][l];
  });

  // Re-observe new rows
  document.querySelectorAll('.anim-row').forEach((el, i) => {
    el.style.transitionDelay = (i % 5 * 0.05) + 's';
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) el.classList.add('vis');
    else io.observe(el);
  });
}

// ══════════════════════════════════════
// COUNTER ANIMATION
// ══════════════════════════════════════
function animateCounter(el, target) {
  let startTime = null;
  const duration = 1100;
  function step(ts) {
    if (!startTime) startTime = ts;
    const p = Math.min((ts - startTime) / duration, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
    p < 1 ? requestAnimationFrame(step) : (el.textContent = target);
  }
  requestAnimationFrame(step);
}

// ══════════════════════════════════════
// INTERSECTION OBSERVER
// ══════════════════════════════════════
function setupObserver() {
  io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;

      if (el.dataset.count !== undefined) {
        animateCounter(el, +el.dataset.count);
        io.unobserve(el);
      }

      if (el.classList.contains('anim-row')) {
        el.classList.add('vis');
      }
    });
  }, { threshold: 0.12 });
}

// ══════════════════════════════════════
// FORM
// ══════════════════════════════════════
function setupForm() {
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const orig = btn.textContent;
    btn.textContent = appData.i18n.btnSent[lang];
    btn.style.opacity = '0.5';
    setTimeout(() => {
      btn.textContent = appData.i18n.btnSend[lang];
      btn.style.opacity = '';
    }, 3000);
  });
}

// ══════════════════════════════════════
// INIT
// ══════════════════════════════════════
function init() {
  // Restore saved theme
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) { theme = saved; applyTheme(); }

  setupObserver();
  renderSkills('th');
  setLang('th');

  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
  document.querySelectorAll('.anim-row').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
    io.observe(el);
  });

  setupForm();
}

// ── Boot ───────────────────────────────
loadData();