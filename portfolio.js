/* ═══════════════════════════════════════
   portfolio.js
   ═══════════════════════════════════════ */

'use strict';

// ── State ──────────────────────────────
let lang    = 'th';
let theme   = 'dark';      // 'dark' | 'light'
let appData = null;
let io      = null;

// ── Fetch data.json ────────────────────
async function loadData() {
  const res = await fetch('data.json');
  appData   = await res.json();
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
  const list   = document.getElementById('skillsList');
  const groups = appData.skillGroups;
  const gi18n  = appData.i18n.skillGroups;

  // icons that are dark-colored SVGs — need CSS invert in light mode
  const darkIcons = ['github', 'nextjs'];

  list.innerHTML = groups.map(g => `
    <div class="mb-8 last:mb-0 anim-row">
      <p class="text-[10px] tracking-widest uppercase text-mid mb-3 sec-label group-label"
         data-key="${g.key}">
        ${gi18n[g.key][l]}
      </p>
      <div class="grid grid-cols-3 sm:grid-cols-6 gap-px bg-border border border-border">
        ${g.skills.map(s => {
          const needsInvert = darkIcons.some(k => s.icon.includes(k));
          return `
          <div class="skill-card flex flex-col items-center gap-2.5 py-5 px-3
                      hover:bg-surface transition-colors duration-200 group cursor-default">
            <img
              src="${s.icon}"
              alt="${s.label[l]}"
              class="w-9 h-9 object-contain opacity-60 group-hover:opacity-100
                     transition-opacity duration-200${needsInvert ? ' icon-auto-invert' : ''}"
              loading="lazy"
            />
            <span class="text-[10px] text-mid group-hover:text-dim transition-colors duration-200
                         text-center leading-tight skill-label"
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
    <div class="anim-row vis py-8 border-b border-border first:border-t">
      <div class="flex items-baseline justify-between gap-4 mb-2">
        <span class="font-display text-[1.1rem] font-medium text-bright tracking-tight">${p.name}</span>
        <div class="flex gap-5 flex-shrink-0">
          <a href="${p.github}"
             class="text-[11px] text-mid no-underline border-b border-transparent pb-px
                    hover:text-bright hover:border-soft transition-colors duration-150 whitespace-nowrap">
            ${i18n.githubLbl[l]}
          </a>
          <a href="${p.live}"
             class="text-[11px] text-mid no-underline border-b border-transparent pb-px
                    hover:text-bright hover:border-soft transition-colors duration-150 whitespace-nowrap">
            ${i18n.liveLbl[l]}
          </a>
        </div>
      </div>
      <div class="flex gap-1.5 flex-wrap mb-2.5">
        ${p.tags.map(t =>
          `<span class="font-mono text-[10px] tracking-widest uppercase text-mid border border-border px-1.5 py-0.5">${t}</span>`
        ).join('')}
      </div>
      <p class="proj-desc text-[12px] text-soft leading-[1.85] max-w-[520px]">${p.desc}</p>
    </div>
  `).join('');
}

// ── Experience ─────────────────────────
function renderExperience(l) {
  document.getElementById('expList').innerHTML = appData.experience[l].map(e => `
    <div class="anim-row vis grid gap-8 py-8 border-b border-border first:border-t"
         style="grid-template-columns:130px 1fr">
      <span class="text-[11px] text-mid pt-0.5">${e.date}</span>
      <div>
        <div class="font-display text-[1.05rem] font-medium text-bright mb-0.5">${e.role}</div>
        <div class="text-[11px] text-mid mb-2.5">${e.company}</div>
        <div class="exp-desc text-[12px] text-soft leading-[1.85]">${e.desc}</div>
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

  document.getElementById('heroTitle').innerHTML      = i18n.hero[l].title;
  document.getElementById('heroDesc').textContent     = i18n.hero[l].desc;
  document.getElementById('contactHeading').innerHTML = i18n.contactHeading[l];

  const f = i18n.form[l];
  document.getElementById('fName').placeholder  = f.name;
  document.getElementById('fEmail').placeholder = f.email;
  document.getElementById('fMsg').placeholder   = f.msg;

  document.getElementById('contactEmail').textContent    = contact.email;
  document.getElementById('contactGithub').textContent   = contact.github;
  document.getElementById('contactLinkedin').textContent = contact.linkedin;

  document.getElementById('footerCopy').textContent     = footer.copy;
  document.getElementById('footerGithub').textContent   = i18n.footer.github[l];
  document.getElementById('footerLinkedin').textContent = i18n.footer.linkedin[l];
  document.getElementById('footerResume').textContent   = i18n.footer.resume[l];

  document.getElementById('navSkills').textContent     = i18n.nav.skills[l];
  document.getElementById('navWork').textContent       = i18n.nav.work[l];
  document.getElementById('navExperience').textContent = i18n.nav.experience[l];
  document.getElementById('navContact').textContent    = i18n.nav.contact[l];

  document.getElementById('btnWork').textContent    = i18n.btnWork[l];
  document.getElementById('btnContact').textContent = i18n.btnContact[l];
  document.getElementById('heroStatus').textContent = i18n.status[l];

  document.getElementById('secSkills').textContent  = i18n.secSkills[l];
  document.getElementById('secWork').textContent    = i18n.secWork[l];
  document.getElementById('secExp').textContent     = i18n.secExp[l];
  document.getElementById('secContact').textContent = i18n.secContact[l];

  document.getElementById('labelName').textContent  = i18n.form[l].labelName  || (l === 'th' ? 'ชื่อ'     : 'Name');
  document.getElementById('labelEmail').textContent = i18n.form[l].labelEmail || (l === 'th' ? 'อีเมล'    : 'Email');
  document.getElementById('labelMsg').textContent   = i18n.form[l].labelMsg   || (l === 'th' ? 'ข้อความ'  : 'Message');

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
    const btn  = document.getElementById('submitBtn');
    const orig = btn.textContent;
    btn.textContent   = appData.i18n.btnSent[lang];
    btn.style.opacity = '0.5';
    setTimeout(() => {
      btn.textContent   = appData.i18n.btnSend[lang];
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