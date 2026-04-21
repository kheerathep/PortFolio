const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Update Google Fonts
indexHtml = indexHtml.replace(
  /<link[^>]+family=EB\+Garamond[^>]+>/,
  `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Sarabun:wght@300;400;500;600&display=swap" rel="stylesheet">`
);

// 2. Update tailwind config fonts
indexHtml = indexHtml.replace(
  `            mono: ['"Geist Mono"', 'monospace'],
            serif: ['"EB Garamond"', 'serif'],
            thai: ['Sarabun', 'sans-serif'],`,
  `            mono: ['"JetBrains Mono"', 'monospace'],
            sans: ['"Inter"', 'sans-serif'],
            display: ['"Outfit"', 'sans-serif'],
            thai: ['Sarabun', 'sans-serif'],`
);

// 3. Update Theme vars (Dark and Light mode)
// We specifically target the full block to guarantee exact replacement.
const styleThemeTarget = `    /* ── Theme vars: Dark ── */
    :root {
      --bg: #111110;
      --surf: #161615;
      --bd: #222220;
      --mid: #555552;
      --soft: #888884;
      --dim: #d4d4d0;
      --bright: #f0f0ec;
      --nav: rgba(17, 17, 16, .9);
      --sk: #111110;
      --sk-h: #161615;
      --inv: invert(1) brightness(1.8);
    }

    /* ── Theme vars: Light ── */
    html.light {
      --bg: #f8f8f6;
      --surf: #eeeeea;
      --bd: #ddddd8;
      --mid: #999994;
      --soft: #666662;
      --dim: #2a2a28;
      --bright: #111110;
      --nav: rgba(248, 248, 246, .9);
      --sk: #f8f8f6;
      --sk-h: #eeeeea;
      --inv: none;
    }`;

const styleThemeReplacement = `    /* ── Theme vars: Dark ── */
    :root {
      --bg: #030712;
      --surf: #111827;
      --bd: rgba(255, 255, 255, 0.08);
      --mid: #9ca3af;
      --soft: #d1d5db;
      --dim: #e5e7eb;
      --bright: #ffffff;
      --nav: rgba(3, 7, 18, 0.65);
      --sk: rgba(255, 255, 255, 0.03);
      --sk-h: rgba(255, 255, 255, 0.06);
      --inv: invert(1) brightness(1.8);
      --accent-1: #6366f1;
      --accent-2: #8b5cf6;
    }

    /* ── Theme vars: Light ── */
    html.light {
      --bg: #f9fafb;
      --surf: #ffffff;
      --bd: rgba(0, 0, 0, 0.1);
      --mid: #6b7280;     /* Neutral Gray 500 for secondary text */
      --soft: #4b5563;    /* Gray 600 for soft text */
      --dim: #1f2937;     /* Gray 800 - Highly legible for main body text */
      --bright: #030712;  /* Gray 950 - Pure dark for headings and highlights */
      --nav: rgba(249, 250, 251, 0.75);
      --sk: #ffffff;
      --sk-h: #f3f4f6;
      --inv: none;
      --accent-1: #4f46e5;
      --accent-2: #7c3aed;
    }`;

indexHtml = indexHtml.replace(styleThemeTarget, styleThemeReplacement);

// 4. Update Nav with backdrop-blur
indexHtml = indexHtml.replace(
  `    nav {
      background-color: var(--nav) !important;
    }`,
  `    nav {
      background-color: var(--nav) !important;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }`
);

// 5. Update Fonts by language section
const fontLangTarget = `    /* ── Fonts by language ── */
    html.lang-en body {
      font-family: 'Geist Mono', monospace;
    }

    html.lang-th body {
      font-family: 'Sarabun', sans-serif;
      font-size: 14px;
    }

    html.lang-en .font-display {
      font-family: 'EB Garamond', serif;
    }

    html.lang-th .font-display {
      font-family: 'Sarabun', sans-serif;
      font-weight: 500;
    }

    html.lang-en .nav-link {
      font-family: 'Geist Mono', monospace;
      font-size: 11px;
      letter-spacing: .07em;
      text-transform: uppercase;
    }

    html.lang-th .nav-link {
      font-family: 'Sarabun', sans-serif;
      font-size: 13px;
    }

    html.lang-en .btn-text {
      font-family: 'Geist Mono', monospace;
      font-size: 11px;
      letter-spacing: .07em;
      text-transform: uppercase;
    }

    html.lang-th .btn-text {
      font-family: 'Sarabun', sans-serif;
      font-size: 13px;
      letter-spacing: 0;
      text-transform: none;
    }

    html.lang-en .stat-label {
      font-size: 10px;
      letter-spacing: .09em;
      text-transform: uppercase;
    }

    html.lang-th .stat-label {
      font-family: 'Sarabun', sans-serif;
      font-size: 11px;
    }

    html.lang-en .sec-label {
      font-size: 11px;
      letter-spacing: .06em;
    }

    html.lang-th .sec-label {
      font-family: 'Sarabun', sans-serif;
      font-size: 12px;
    }

    html.lang-th .proj-desc,
    html.lang-th .exp-desc {
      font-size: 13px;
      line-height: 1.9;
    }

    html.lang-th h1 {
      letter-spacing: 0;
      line-height: 1.45;
    }

    html.lang-th h1 em {
      font-style: normal;
    }

    html.lang-en h1 {
      font-family: 'EB Garamond', serif;
    }`;

const fontLangReplacement = `    /* ── Fonts by language ── */
    html.lang-en body {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
    }

    html.lang-th body {
      font-family: 'Sarabun', sans-serif;
      font-size: 15px;
    }

    html.lang-en .font-display {
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    html.lang-th .font-display {
      font-family: 'Sarabun', sans-serif;
      font-weight: 600;
    }

    html.lang-en .nav-link {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      letter-spacing: .05em;
      text-transform: uppercase;
    }

    html.lang-th .nav-link {
      font-family: 'Sarabun', sans-serif;
      font-size: 14px;
      font-weight: 500;
    }

    html.lang-en .btn-text {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      letter-spacing: .02em;
      font-weight: 500;
    }

    html.lang-th .btn-text {
      font-family: 'Sarabun', sans-serif;
      font-size: 15px;
      font-weight: 500;
    }

    html.lang-en .stat-label {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      letter-spacing: .08em;
      text-transform: uppercase;
      font-weight: 500;
    }

    html.lang-th .stat-label {
      font-family: 'Sarabun', sans-serif;
      font-size: 12px;
    }

    html.lang-en .sec-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      letter-spacing: .06em;
    }

    html.lang-th .sec-label {
      font-family: 'Sarabun', sans-serif;
      font-size: 13px;
      font-weight: 600;
    }

    html.lang-th .proj-desc,
    html.lang-th .exp-desc {
      font-size: 14px;
      line-height: 1.8;
    }

    html.lang-th h1 {
      letter-spacing: 0;
      line-height: 1.35;
    }

    html.lang-th h1 em {
      font-style: normal;
    }

    html.lang-en h1 {
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
    }`;

indexHtml = indexHtml.replace(fontLangTarget, fontLangReplacement);

// 6. Update Hero Title
indexHtml = indexHtml.replace(
  `class="font-display text-[clamp(2rem,6vw,4rem)] font-normal leading-[1.15] tracking-tight text-bright mb-7 animate-fade-up-2"`,
  `class="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.15] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-bright to-dim mb-7 animate-fade-up-2"`
);

// 7. Update Hero Buttons
indexHtml = indexHtml.replace(
  `class="btn-text inline-block px-6 py-2.5 bg-bright text-ink border border-bright
               hover:bg-dim hover:border-dim transition-colors duration-150 no-underline"`,
  `class="btn-text inline-block px-7 py-3 rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white hover:opacity-90 hover:scale-[1.02] transform transition-all shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] no-underline"`
);
indexHtml = indexHtml.replace(
  `class="btn-text inline-block px-6 py-2.5 border border-border text-dim
               hover:border-soft hover:text-bright transition-colors duration-150 no-underline"`,
  `class="btn-text inline-block px-7 py-3 rounded-full border border-border text-dim hover:text-bright hover:bg-surface transition-all no-underline"`
);

// 8. Update Contact Button
indexHtml = indexHtml.replace(
  `class="btn-text self-start px-6 py-2.5 bg-bright text-ink border border-bright
                 hover:bg-dim hover:border-dim transition-colors duration-150 cursor-pointer"`,
  `class="btn-text self-start px-7 py-3 rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white hover:opacity-90 hover:scale-[1.02] transform transition-all shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer"`
);

// 9. Extra style logic for contrast: text-bright in light mode should be pure dark.
// But we already updated --bright to #030712 in html.light Theme vars.
// Also, any text using text-mid or text-soft will be much more legible now.
// For the contact options hover styles, we keep hovering the bright color (which is dark in light mode).

fs.writeFileSync('index.html', indexHtml);
console.log('index.html update complete!');

