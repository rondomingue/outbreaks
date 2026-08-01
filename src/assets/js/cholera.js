/* ═══════════════════════════════════════════════════════════════════════════
   CHOLERA — "Curable in hours, never eradicated"
   Mapbox burden map · top-outbreak list · milestone wave-in · dehydration ladder
   All data animates in on scroll; map bubbles oscillate.
   Figures are approximate, drawn from WHO and GTFCC reporting.
   ═══════════════════════════════════════════════════════════════════════════ */

const CHO_TOKEN = "pk.eyJ1Ijoicm9uZG9taW5ndWUiLCJhIjoiYTM4ODdRdyJ9.jcyNgQQolgrKfs6SKBXNJw";

const BURDEN = [
  { c: 'Yemen',        cases: 2500000, coord: [48, 15.5], severe: true },
  { c: 'Haiti',        cases: 820000,  coord: [-72.3, 18.9], severe: true },
  { c: 'DR Congo',     cases: 340000,  coord: [23, -3] },
  { c: 'Nigeria',      cases: 220000,  coord: [8, 9] },
  { c: 'Somalia',      cases: 130000,  coord: [45.3, 5] },
  { c: 'Mozambique',   cases: 100000,  coord: [35, -18] },
  { c: 'Malawi',       cases: 59000,   coord: [34, -13.5], severe: true },
  { c: 'Syria',        cases: 130000,  coord: [38.5, 35] }
];

const REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.?0+$/, '') + 'M'
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
  const hero = document.querySelector('.cho-hero-stats');
  if (hero) animateStatGroup(hero, '.n');
  const facts = document.querySelector('.cho-spotlight-facts');
  if (facts) animateStatGroup(facts, '.n');
})();

/* ── Largest recent outbreaks: wave in, bars grow, numbers count ─────────── */
(function () {
  const host = document.getElementById('choTopList');
  if (!host) return;
  const rows = [...BURDEN].sort((a, b) => b.cases - a.cases);
  const max = rows[0].cases;
  host.innerHTML = rows.map((d, i) => `
    <div class="cho-row${d.severe ? ' is-severe' : ''}" style="--i:${i}">
      <span class="cho-row-c">${esc(d.c)}</span>
      <span class="cho-row-track"><span class="cho-row-fill" data-w="${(d.cases / max * 100).toFixed(1)}"></span></span>
      <span class="cho-row-n">${fmt(d.cases)}</span>
    </div>`).join('');

  const fills = [...host.querySelectorAll('.cho-row-fill')];
  const nums = [...host.querySelectorAll('.cho-row-n')];
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
  const tl = document.getElementById('choTimeline');
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
    const miniRect = mini.getBoundingClientRect();
    const onScreen = miniRect.bottom > 0 && miniRect.top < (window.innerHeight || document.documentElement.clientHeight);
    if (activeNode && onScreen) activeNode.scrollIntoView({ block: 'nearest', inline: 'center', behavior: REDUCE ? 'auto' : 'smooth' });
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

/* ── The race against dehydration — steps reveal, bars grow, pct count ────── */
(function () {
  const host = document.getElementById('choLadder');
  if (!host) return;
  const STEPS = [
    { tier: 'Mild dehydration', tag: '<5% fluid loss', note: 'Thirst and restlessness — oral rehydration alone is enough.', fatal: 1, dur: 'early hours', c: 'teal' },
    { tier: 'Moderate dehydration', tag: '5–9% fluid loss', note: 'Sunken eyes, low blood pressure, rapid pulse — still reversible with ORS or IV fluids.', fatal: 10, dur: 'within a day', c: 'gold' },
    { tier: 'Severe dehydration', tag: '≥10% fluid loss', note: 'Hypovolemic shock begins; without rapid IV fluids, organs start failing.', fatal: 50, dur: 'hours, untreated', c: 'red' },
    { tier: 'Untreated, historically', tag: 'no care reached', note: 'In outbreaks with no access to care at all, roughly half of severe cases have died.', fatal: 70, dur: 'if no care at all', c: 'severe' },
    { tier: 'With oral rehydration therapy', tag: 'any stage, treated in time', note: 'Clean water, sugar, and salt — costing pennies — collapse that same fatality rate below 1%.', fatal: 1, dur: 'if treated in time', c: 'teal' }
  ];
  host.innerHTML = STEPS.map((s, i) => `
    <div class="cho-step cho-step-${s.c}" style="--i:${i};--indent:${i < 4 ? i : 0}" tabindex="0">
      <div class="cho-step-head">
        <span class="cho-step-tag">${esc(s.tag)}</span>
        <b class="cho-step-tier disp">${esc(s.tier)}</b>
      </div>
      <div class="cho-step-bar"><span class="cho-step-fill" data-w="${s.fatal}"></span><span class="cho-step-pct" data-pct="${s.fatal}">0%</span></div>
      <div class="cho-step-meta"><span class="cho-step-lost">${esc(s.note)}</span><span class="cho-step-dur">${esc(s.dur)}</span></div>
    </div>`).join('') +
    `<p class="cho-ladder-foot">Fatality figures are illustrative, drawn from historical outbreak literature on untreated vs. treated cholera — actual rates vary by outbreak, age, and underlying health.</p>`;

  const fills = [...host.querySelectorAll('.cho-step-fill')];
  const pcts = [...host.querySelectorAll('.cho-step-pct')];
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
  const el = document.getElementById('choMap');
  const fallback = document.getElementById('choMapFallback');
  if (!el) return;
  function showFallback() { if (fallback) fallback.hidden = false; el.style.display = 'none'; }
  if (!window.mapboxgl) { showFallback(); return; }

  let map;
  try {
    mapboxgl.accessToken = CHO_TOKEN;
    map = new mapboxgl.Map({
      container: 'choMap', style: 'mapbox://styles/mapbox/dark-v11',
      center: [30, 10], zoom: 1.35, minZoom: 1, maxZoom: 6,
      projection: 'mercator', attributionControl: true
    });
  } catch (err) { showFallback(); return; }

  map.on('error', () => { if (!document.querySelector('#choMap canvas')) showFallback(); });
  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

  map.scrollZoom.disable();
  map.dragPan.disable();
  map.touchZoomRotate.disable();
  map.doubleClickZoom.disable();
  const activateMap = () => { map.scrollZoom.enable(); map.dragPan.enable(); map.touchZoomRotate.enable(); map.doubleClickZoom.enable(); };
  const deactivateMap = () => { map.scrollZoom.disable(); map.dragPan.disable(); map.touchZoomRotate.disable(); map.doubleClickZoom.disable(); };
  el.addEventListener('click', activateMap);
  el.addEventListener('touchstart', activateMap, { passive: true });
  el.addEventListener('mouseleave', deactivateMap);

  const features = BURDEN.map(d => ({
    type: 'Feature', geometry: { type: 'Point', coordinates: d.coord },
    properties: { c: d.c, cases: d.cases, severe: d.severe ? 1 : 0 }
  }));
  const glowR = k => ['interpolate', ['linear'], ['sqrt', ['get', 'cases']], 0, 6 * k, 1581, 62 * k];
  const dotR = k => ['interpolate', ['linear'], ['sqrt', ['get', 'cases']], 0, 3 * k, 1581, 30 * k];

  map.on('load', () => {
    map.addSource('cho', { type: 'geojson', data: { type: 'FeatureCollection', features } });
    map.addLayer({ id: 'cho-glow', type: 'circle', source: 'cho',
      paint: { 'circle-radius': glowR(1), 'circle-color': '#2b8f96', 'circle-opacity': 0.12, 'circle-blur': 1 } });
    map.addLayer({ id: 'cho-dot', type: 'circle', source: 'cho',
      paint: {
        'circle-radius': dotR(1),
        'circle-color': ['case', ['==', ['get', 'severe'], 1], '#c84038', '#2b8f96'],
        'circle-opacity': 0.32,
        'circle-stroke-color': ['case', ['==', ['get', 'severe'], 1], '#c84038', '#2b8f96'],
        'circle-stroke-width': 1.4, 'circle-stroke-opacity': 0.9
      } });
    map.addLayer({ id: 'cho-label', type: 'symbol', source: 'cho',
      filter: ['>', ['get', 'cases'], 90000],
      layout: { 'text-field': ['get', 'c'], 'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size': 11, 'text-offset': [0, 1.5], 'text-anchor': 'top', 'text-allow-overlap': false },
      paint: { 'text-color': 'rgba(233,229,217,.82)', 'text-halo-color': 'rgba(6,9,8,.9)', 'text-halo-width': 1.4 } });

    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 10, className: 'cho-popup' });
    const enter = e => {
      map.getCanvas().style.cursor = 'pointer';
      const p = e.features[0].properties;
      popup.setLngLat(e.features[0].geometry.coordinates)
        .setHTML(`<span class="cho-pop-c">${esc(p.c)}</span><b class="cho-pop-n">${fmt(p.cases)}</b><span class="cho-pop-k">estimated cases, recent major outbreak</span>${p.severe ? '<span class="cho-pop-d">among the largest on record</span>' : ''}`)
        .addTo(map);
    };
    const leave = () => { map.getCanvas().style.cursor = ''; popup.remove(); };
    ['cho-dot', 'cho-glow'].forEach(id => { map.on('mouseenter', id, enter); map.on('mouseleave', id, leave); });

    if (!REDUCE) {
      const t0 = performance.now();
      (function pulse(now) {
        const phase = (now - t0) / 1600;
        const gk = 1 + 0.16 * Math.sin(phase);
        const dk = 1 + 0.06 * Math.sin(phase);
        map.setPaintProperty('cho-glow', 'circle-radius', glowR(gk));
        map.setPaintProperty('cho-glow', 'circle-opacity', 0.09 + 0.07 * (0.5 + 0.5 * Math.sin(phase)));
        map.setPaintProperty('cho-dot', 'circle-radius', dotR(dk));
        requestAnimationFrame(pulse);
      })(t0);
    }
  });
})();
