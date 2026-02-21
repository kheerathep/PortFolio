/* ═══════════════════════════════════════
   portfolio.js
   All interactivity — lang toggle,
   render functions, IntersectionObserver
   ═══════════════════════════════════════ */

'use strict';

// ── State ──────────────────────────────
let lang = 'th';
let appData = null;       // filled after JSON fetch
let io = null;            // IntersectionObserver instance

// ── Fetch data.json ────────────────────
async function loadData() {
  const res  = await fetch('data.json');
  appData    = await res.json();
  init();
}

// ── Render: Skills ─────────────────────
function renderSkills() {
  const list = document.getElementById('skillsList');
  list.innerHTML = appData.skills.map(s => `
    <div class="anim-row grid items-center gap-6 py-4 border-b border-border first:border-t"
         style="grid-template-columns:180px 1fr 28px">
      <span class="text-[12px] text-dim">${s.name}</span>
      <div class="h-px bg-border relative overflow-hidden">
        <div class="sk-fill absolute top-0 left-0 h-full bg-soft" data-w="${s.pct}"></div>
      </div>
      <span class="text-[11px] text-mid text-right">${s.pct}</span>
    </div>
  `).join('');
}

// ── Render: Projects ───────────────────
function renderProjects(l) {
  const { i18n, projects } = appData;
  const ghLbl = i18n.githubLbl[l];
  const lvLbl = i18n.liveLbl[l];

  document.getElementById('projectsList').innerHTML = projects[l].map(p => `
    <div class="anim-row vis py-8 border-b border-border first:border-t">
      <div class="flex items-baseline justify-between gap-4 mb-2">
        <span class="font-display text-[1.1rem] font-medium text-bright tracking-tight">${p.name}</span>
        <div class="flex gap-5 flex-shrink-0">
          <a href="${p.github}"
             class="text-[11px] text-mid no-underline border-b border-transparent pb-px
                    hover:text-bright hover:border-soft transition-colors duration-150 whitespace-nowrap">
            ${ghLbl}
          </a>
          <a href="${p.live}"
             class="text-[11px] text-mid no-underline border-b border-transparent pb-px
                    hover:text-bright hover:border-soft transition-colors duration-150 whitespace-nowrap">
            ${lvLbl}
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

// ── Render: Experience ─────────────────
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

// ── Render: Stats bar ──────────────────
function renderStats(l) {
  const { stats, i18n } = appData;
  const statEls = document.querySelectorAll('[data-stat-key]');
  statEls.forEach(el => {
    const key = el.dataset.statKey;
    el.textContent = i18n.stats[key][l];
  });
}

// ── Update static translated text ──────
function updateStatic(l) {
  const { i18n, contact, footer } = appData;

  // Hero
  document.getElementById('heroTitle').innerHTML  = i18n.hero[l].title;
  document.getElementById('heroDesc').textContent = i18n.hero[l].desc;

  // Contact section
  document.getElementById('contactHeading').innerHTML = i18n.contactHeading[l];

  // Form placeholders
  const f = i18n.form[l];
  document.getElementById('fName').placeholder  = f.name;
  document.getElementById('fEmail').placeholder = f.email;
  document.getElementById('fMsg').placeholder   = f.msg;

  // Contact links text
  document.getElementById('contactEmail').textContent    = contact.email;
  document.getElementById('contactGithub').textContent   = contact.github;
  document.getElementById('contactLinkedin').textContent = contact.linkedin;

  // Footer
  document.getElementById('footerCopy').textContent     = footer.copy;
  document.getElementById('footerGithub').textContent   = i18n.footer.github[l];
  document.getElementById('footerLinkedin').textContent = i18n.footer.linkedin[l];
  document.getElementById('footerResume').textContent   = i18n.footer.resume[l];

  // Nav links
  document.getElementById('navSkills').textContent     = i18n.nav.skills[l];
  document.getElementById('navWork').textContent       = i18n.nav.work[l];
  document.getElementById('navExperience').textContent = i18n.nav.experience[l];
  document.getElementById('navContact').textContent    = i18n.nav.contact[l];

  // Hero buttons
  document.getElementById('btnWork').textContent    = i18n.btnWork[l];
  document.getElementById('btnContact').textContent = i18n.btnContact[l];

  // Status
  document.getElementById('heroStatus').textContent = i18n.status[l];

  // Section headings
  document.getElementById('secSkills').textContent  = i18n.secSkills[l];
  document.getElementById('secWork').textContent    = i18n.secWork[l];
  document.getElementById('secExp').textContent     = i18n.secExp[l];
  document.getElementById('secContact').textContent = i18n.secContact[l];

  // Submit button
  document.getElementById('submitBtn').textContent = i18n.btnSend[l];

  // Stats labels
  renderStats(l);
}

// ── Language toggle ─────────────────────
function setLang(l) {
  lang = l;
  const html = document.documentElement;
  html.lang       = l;
  html.className  = `scroll-smooth lang-${l}`;

  // Toggle button styles
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

  // Re-observe newly rendered rows
  document.querySelectorAll('.anim-row').forEach((el, i) => {
    el.style.transitionDelay = (i % 5 * 0.05) + 's';
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('vis');
    } else {
      io.observe(el);
    }
  });

  // Re-trigger skill bars
  document.querySelectorAll('.sk-fill').forEach(el => io.observe(el));
}

// ── Counter animation ───────────────────
function animateCounter(el, target) {
  let startTime = null;
  const duration = 1100;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

// ── IntersectionObserver setup ──────────
function setupObserver() {
  io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;

      // Stat counters
      if (el.dataset.count !== undefined) {
        animateCounter(el, +el.dataset.count);
        io.unobserve(el);
      }

      // Skill bar fills
      if (el.dataset.w) {
        el.style.width = el.dataset.w + '%';
        io.unobserve(el);
      }

      // Scroll-reveal rows
      if (el.classList.contains('anim-row')) {
        el.classList.add('vis');
      }
    });
  }, { threshold: 0.15 });
}

// ── Contact form ────────────────────────
function setupForm() {
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn  = document.getElementById('submitBtn');
    const orig = btn.textContent;
    btn.textContent  = appData.i18n.btnSent[lang];
    btn.style.opacity = '0.5';
    setTimeout(() => {
      btn.textContent   = appData.i18n.btnSend[lang];
      btn.style.opacity = '';
    }, 3000);
  });
}

// ── Init (called after data loads) ─────
function init() {
  setupObserver();
  renderSkills();
  setLang('th');    // default language

  // Observe stat counters
  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));

  // Observe skill bar fills (after renderSkills)
  document.querySelectorAll('.sk-fill').forEach(el => io.observe(el));

  // Observe reveal rows with staggered delay
  document.querySelectorAll('.anim-row').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
    io.observe(el);
  });

  setupForm();
}

// ── Boot ────────────────────────────────
loadData();
