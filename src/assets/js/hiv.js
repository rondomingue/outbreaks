/* ═══════════════════════════════════════════════════════════════════════════
   HIV/AIDS — "The disease they wouldn't name"
   Mapbox burden map · top-burden list · milestone coverflow · cascade of care
   All data animates in on scroll; map bubbles oscillate.
   Figures are approximate UNAIDS estimates.
   ═══════════════════════════════════════════════════════════════════════════ */

const HIV_TOKEN = "pk.eyJ1Ijoicm9uZG9taW5ndWUiLCJhIjoiYTM4ODdRdyJ9.jcyNgQQolgrKfs6SKBXNJw";

const BURDEN = [
  { c: 'South Africa', cases: 7700000, deaths: 51000, coord: [24, -29] },
  { c: 'India',        cases: 2500000, deaths: 42000, coord: [79, 22] },
  { c: 'Mozambique',   cases: 2400000, deaths: 54000, coord: [35, -18] },
  { c: 'Nigeria',      cases: 2100000, deaths: 71000, coord: [8, 9] },
  { c: 'Tanzania',     cases: 1700000, deaths: 24000, coord: [35, -6] },
  { c: 'Kenya',        cases: 1400000, deaths: 22000, coord: [38, -1] },
  { c: 'Uganda',       cases: 1400000, deaths: 17000, coord: [32, 1] },
  { c: 'Zambia',       cases: 1300000, deaths: 12000, coord: [27, -13] },
  { c: 'Zimbabwe',     cases: 1300000, deaths: 17000, coord: [30, -19] },
  { c: 'Malawi',       cases: 1000000, deaths: 13000, coord: [34, -13] },
  { c: 'Russia',       cases: 1100000, deaths: 30000, coord: [90, 61],  rising: true },
  { c: 'Indonesia',    cases: 540000,  deaths: 24000, coord: [113, -1] },
  { c: 'Brazil',       cases: 960000,  deaths: 11000, coord: [-51, -10], rising: true },
  { c: 'Philippines',  cases: 190000,  deaths: 4700,  coord: [122, 12], rising: true }
];

const REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 2).replace(/\.?0+$/, '') + 'M'
              : n >= 1e3 ? Math.round(n / 1e3) + 'K' : String(n);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ── shared helpers ───────────────────────────────────────────────────────── */
function inView(el, cb, opts) {
  if (!el) return;
  if (REDUCE || !('IntersectionObserver' in window)) { cb(); return; }
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { cb(); io.disconnect(); } });
  }, Object.assign({ threshold: 0, rootMargin: '0px 0px -12% 0px' }, opts));
  io.observe(el);
}

function parseNum(raw) {
  const m = String(raw).trim().match(/^([^\d.\-]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const numStr = m[2].replace(/,/g, '');
  const dot = numStr.indexOf('.');
  return { prefix: m[1], suffix: m[3], target: parseFloat(numStr), decimals: dot === -1 ? 0 : numStr.length - dot - 1 };
}

function countUp(el, spec, duration) {
  const t0 = performance.now();
  (function step(now) {
    const p = Math.min((now - t0) / (duration || 1050), 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = (spec.decimals ? spec.target * eased : Math.round(spec.target * eased))
      .toLocaleString(undefined, { minimumFractionDigits: spec.decimals, maximumFractionDigits: spec.decimals, useGrouping: false });
    el.innerHTML = spec.prefix + v + spec.suffix;
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

// Count meaningful magnitudes only (skip trivial small flips)
function armCount(el) {
  const raw = el.textContent.trim();
  const spec = parseNum(raw);
  if (!spec || (spec.target < 5 && !/[MK%]/.test(spec.suffix))) return null;
  el.dataset.final = raw;
  if (!REDUCE) el.innerHTML = spec.prefix + (spec.decimals ? (0).toFixed(spec.decimals) : '0') + spec.suffix;
  return spec;
}

function animateStatGroup(container, sel) {
  const nodes = [...container.querySelectorAll(sel)];
  const specs = nodes.map(n => armCount(n));
  inView(container, () => nodes.forEach((n, i) => { if (specs[i]) countUp(n, specs[i]); }));
}

/* ── Hero + spotlight stat count-ups ──────────────────────────────────────── */
(function () {
  const hero = document.querySelector('.hiv-hero-stats');
  if (hero) animateStatGroup(hero, '.n');
  const facts = document.querySelector('.hiv-spotlight-facts');
  if (facts) animateStatGroup(facts, '.n');
})();

/* ── Highest-burden list: wave in, bars grow, numbers count ───────────────── */
(function () {
  const host = document.getElementById('hivTopList');
  if (!host) return;
  const max = BURDEN[0].cases;
  host.innerHTML = BURDEN.slice(0, 8).map((d, i) => `
    <div class="hiv-row${d.rising ? ' is-rising' : ''}" style="--i:${i}">
      <span class="hiv-row-c">${esc(d.c)}</span>
      <span class="hiv-row-track"><span class="hiv-row-fill" data-w="${(d.cases / max * 100).toFixed(1)}"></span></span>
      <span class="hiv-row-n">${fmt(d.cases)}</span>
    </div>`).join('');

  const fills = [...host.querySelectorAll('.hiv-row-fill')];
  const nums = [...host.querySelectorAll('.hiv-row-n')];
  const specs = nums.map(n => armCount(n));
  if (REDUCE) { fills.forEach(f => f.style.width = f.dataset.w + '%'); }
  inView(host, () => {
    host.classList.add('revealed');
    fills.forEach((f, i) => setTimeout(() => { f.style.width = f.dataset.w + '%'; }, 120 + i * 70));
    nums.forEach((n, i) => { if (specs[i]) setTimeout(() => countUp(n, specs[i]), 120 + i * 70); });
  });
})();

/* ── Milestone timeline — horizontal coverflow ────────────────────────────── */
(function () {
  const tl = document.getElementById('hivTimeline');
  const mini = document.getElementById('tlMini');
  const prevBtn = document.getElementById('tlPrev');
  const nextBtn = document.getElementById('tlNext');
  if (!tl || !mini) return;

  const cards = [...tl.querySelectorAll('.tl-ev')];

  mini.innerHTML = cards.map((c, i) => {
    const yr = c.querySelector('.yr').textContent;
    const cls = c.classList.contains('sev') ? ' sev' : c.classList.contains('ok') ? ' ok' : '';
    return `<button type="button" class="tl-mini-node${cls}" data-i="${i}"><span class="dot"></span><span class="yr">${esc(yr)}</span></button>`;
  }).join('');
  const nodes = [...mini.querySelectorAll('.tl-mini-node')];

  let active = -1;
  function setActive(i) {
    if (i === active) return;
    active = i;
    cards.forEach((c, j) => c.classList.toggle('is-active', j === i));
    nodes.forEach((n, j) => n.classList.toggle('is-active', j === i));
    const activeNode = nodes[i];
    if (activeNode) activeNode.scrollIntoView({ block: 'nearest', inline: 'center', behavior: REDUCE ? 'auto' : 'smooth' });
  }

  function closestIndex() {
    const mid = tl.scrollLeft + tl.clientWidth / 2;
    let best = 0, bestD = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs((c.offsetLeft + c.offsetWidth / 2) - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }

  let raf = null;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      const mid = tl.scrollLeft + tl.clientWidth / 2;
      cards.forEach(c => {
        const d = Math.abs((c.offsetLeft + c.offsetWidth / 2) - mid);
        const t = Math.max(0, 1 - d / (tl.clientWidth * .55));
        c.style.opacity = String(.32 + .68 * t);
        c.style.transform = `scale(${(.9 + .1 * t).toFixed(3)})`;
      });
      setActive(closestIndex());
    });
  }

  function goTo(i, instant) {
    i = Math.max(0, Math.min(cards.length - 1, i));
    const c = cards[i];
    tl.scrollTo({ left: c.offsetLeft - (tl.clientWidth - c.offsetWidth) / 2, behavior: (instant || REDUCE) ? 'auto' : 'smooth' });
  }

  tl.addEventListener('scroll', onScroll, { passive: true });
  nodes.forEach(n => n.addEventListener('click', () => goTo(+n.dataset.i)));
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(closestIndex() - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(closestIndex() + 1));
  tl.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(closestIndex() + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(closestIndex() - 1); }
  });

  requestAnimationFrame(() => requestAnimationFrame(() => { goTo(0, true); onScroll(); }));
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { if (active <= 0) goTo(0, true); onScroll(); });
  }
  window.addEventListener('resize', onScroll);
})();

/* ── The cascade of care — steps reveal, bars grow, pct count ─────────────── */
(function () {
  const host = document.getElementById('hivCascade');
  if (!host) return;
  const STEPS = [
    { tier: 'Living with HIV worldwide', tag: 'All PLHIV', lost: 'The baseline — roughly 39.9 million people, 2023.', success: 100, dur: 'Baseline', c: 'teal' },
    { tier: 'Know they have HIV', tag: 'Diagnosed', lost: 'Testing gaps hit children and men hardest.', success: 86, dur: '86% of PLHIV', c: 'teal' },
    { tier: 'Receiving antiretroviral therapy', tag: 'On ART', lost: 'Of those diagnosed, about 89% start and stay on treatment.', success: 77, dur: '77% of PLHIV', c: 'gold' },
    { tier: 'Virally suppressed — cannot transmit', tag: 'Suppressed · U=U', lost: 'Of those on treatment, about 93% reach an undetectable load.', success: 71, dur: '71% of PLHIV', c: 'teal' },
    { tier: 'Not yet suppressed', tag: 'The remaining gap', lost: 'Undiagnosed, untreated, or unsuppressed — roughly 11.5 million people.', success: 29, dur: '~11.5M people', c: 'severe' }
  ];
  host.innerHTML = STEPS.map((s, i) => `
    <div class="hiv-step hiv-step-${s.c}" style="--i:${i};--indent:${i}" tabindex="0">
      <div class="hiv-step-head">
        <span class="hiv-step-tag">${esc(s.tag)}</span>
        <b class="hiv-step-tier disp">${esc(s.tier)}</b>
      </div>
      <div class="hiv-step-bar"><span class="hiv-step-fill" data-w="${s.success}"></span><span class="hiv-step-pct" data-pct="${s.success}">0%</span></div>
      <div class="hiv-step-meta"><span class="hiv-step-lost">${esc(s.lost)}</span><span class="hiv-step-dur">${esc(s.dur)}</span></div>
    </div>`).join('') +
    `<p class="hiv-cascade-foot">Figures reflect approximate 2023 UNAIDS global "95-95-95" progress. The last step is the mirror image of the first three — the share of all people with HIV still outside viral suppression, <em>for any reason</em>.</p>`;

  const steps = [...host.querySelectorAll('.hiv-step')];
  const fills = [...host.querySelectorAll('.hiv-step-fill')];
  const pcts = [...host.querySelectorAll('.hiv-step-pct')];
  if (REDUCE) { fills.forEach(f => f.style.width = f.dataset.w + '%'); pcts.forEach(p => p.textContent = p.dataset.pct + '%'); }
  inView(host, () => {
    host.classList.add('revealed');
    fills.forEach((f, i) => setTimeout(() => { f.style.width = f.dataset.w + '%'; }, 140 + i * 90));
    pcts.forEach((p, i) => {
      const target = +p.dataset.pct;
      setTimeout(() => countUp(p, { prefix: '', suffix: '%', target, decimals: 0 }, 850), 140 + i * 90);
    });
  });
})();

/* ── Mapbox burden map (bubbles oscillate) ────────────────────────────────── */
(function () {
  const el = document.getElementById('hivMap');
  const fallback = document.getElementById('hivMapFallback');
  if (!el) return;
  function showFallback() { if (fallback) fallback.hidden = false; el.style.display = 'none'; }
  if (!window.mapboxgl) { showFallback(); return; }

  let map;
  try {
    mapboxgl.accessToken = HIV_TOKEN;
    map = new mapboxgl.Map({
      container: 'hivMap', style: 'mapbox://styles/mapbox/dark-v11',
      center: [30, 4], zoom: 1.35, minZoom: 1, maxZoom: 6,
      projection: 'mercator', attributionControl: true, cooperativeGestures: true
    });
  } catch (err) { showFallback(); return; }

  map.on('error', () => { if (!document.querySelector('#hivMap canvas')) showFallback(); });
  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

  const features = BURDEN.map(d => ({
    type: 'Feature', geometry: { type: 'Point', coordinates: d.coord },
    properties: { c: d.c, cases: d.cases, deaths: d.deaths, rising: d.rising ? 1 : 0 }
  }));
  const glowR = k => ['interpolate', ['linear'], ['sqrt', ['get', 'cases']], 0, 6 * k, 1673, 62 * k];
  const dotR = k => ['interpolate', ['linear'], ['sqrt', ['get', 'cases']], 0, 3 * k, 1673, 30 * k];

  map.on('load', () => {
    map.addSource('hiv', { type: 'geojson', data: { type: 'FeatureCollection', features } });
    map.addLayer({ id: 'hiv-glow', type: 'circle', source: 'hiv',
      paint: { 'circle-radius': glowR(1), 'circle-color': '#e4572e', 'circle-opacity': 0.10, 'circle-blur': 1 } });
    map.addLayer({ id: 'hiv-dot', type: 'circle', source: 'hiv',
      paint: {
        'circle-radius': dotR(1),
        'circle-color': ['case', ['==', ['get', 'rising'], 1], '#e3b23c', '#e4572e'],
        'circle-opacity': 0.30,
        'circle-stroke-color': ['case', ['==', ['get', 'rising'], 1], '#e3b23c', '#e4572e'],
        'circle-stroke-width': 1.4, 'circle-stroke-opacity': 0.9
      } });
    map.addLayer({ id: 'hiv-label', type: 'symbol', source: 'hiv',
      filter: ['>', ['get', 'cases'], 900000],
      layout: { 'text-field': ['get', 'c'], 'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size': 11, 'text-offset': [0, 1.5], 'text-anchor': 'top', 'text-allow-overlap': false },
      paint: { 'text-color': 'rgba(233,229,217,.82)', 'text-halo-color': 'rgba(6,9,8,.9)', 'text-halo-width': 1.4 } });

    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 10, className: 'hiv-popup' });
    const enter = e => {
      map.getCanvas().style.cursor = 'pointer';
      const p = e.features[0].properties;
      const cfr = Math.round(p.deaths / p.cases * 100);
      popup.setLngLat(e.features[0].geometry.coordinates)
        .setHTML(`<span class="hiv-pop-c">${esc(p.c)}</span><b class="hiv-pop-n">${fmt(p.cases)}</b><span class="hiv-pop-k">people living with HIV</span><span class="hiv-pop-d">~${fmt(p.deaths)} AIDS-related deaths/yr · ${cfr}% ${p.rising ? '· new infections rising' : ''}</span>`)
        .addTo(map);
    };
    const leave = () => { map.getCanvas().style.cursor = ''; popup.remove(); };
    ['hiv-dot', 'hiv-glow'].forEach(id => { map.on('mouseenter', id, enter); map.on('mouseleave', id, leave); });

    // gentle oscillation — the burden "breathes"
    if (!REDUCE) {
      const t0 = performance.now();
      (function pulse(now) {
        const phase = (now - t0) / 1600;
        const gk = 1 + 0.16 * Math.sin(phase);
        const dk = 1 + 0.06 * Math.sin(phase);
        map.setPaintProperty('hiv-glow', 'circle-radius', glowR(gk));
        map.setPaintProperty('hiv-glow', 'circle-opacity', 0.08 + 0.07 * (0.5 + 0.5 * Math.sin(phase)));
        map.setPaintProperty('hiv-dot', 'circle-radius', dotR(dk));
        requestAnimationFrame(pulse);
      })(t0);
    }
  });
})();
