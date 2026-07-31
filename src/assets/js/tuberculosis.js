/* ═══════════════════════════════════════════════════════════════════════════
   TUBERCULOSIS — "The world consumption created"
   Mapbox burden map · top-burden list · milestone wave-in · resistance ladder
   All data animates in on scroll; map bubbles oscillate.
   Figures are approximate WHO Global TB Report estimates.
   ═══════════════════════════════════════════════════════════════════════════ */

const TB_TOKEN = "pk.eyJ1Ijoicm9uZG9taW5ndWUiLCJhIjoiYTM4ODdRdyJ9.jcyNgQQolgrKfs6SKBXNJw";

const BURDEN = [
  { c: 'India',        cases: 2800000, deaths: 315000, coord: [79, 22],  mdr: true },
  { c: 'Indonesia',    cases: 1090000, deaths: 130000, coord: [113, -1] },
  { c: 'China',        cases: 740000,  deaths: 27000,  coord: [104, 35] },
  { c: 'Philippines',  cases: 740000,  deaths: 55000,  coord: [122, 12], mdr: true },
  { c: 'Pakistan',     cases: 660000,  deaths: 51000,  coord: [69, 30],  mdr: true },
  { c: 'Nigeria',      cases: 500000,  deaths: 125000, coord: [8, 9] },
  { c: 'Bangladesh',   cases: 380000,  deaths: 42000,  coord: [90, 24] },
  { c: 'DR Congo',     cases: 340000,  deaths: 44000,  coord: [23, -3] },
  { c: 'South Africa', cases: 270000,  deaths: 56000,  coord: [25, -29], mdr: true },
  { c: 'Myanmar',      cases: 180000,  deaths: 22000,  coord: [96, 21] },
  { c: 'Vietnam',      cases: 170000,  deaths: 12000,  coord: [106, 16] },
  { c: 'Brazil',       cases: 100000,  deaths: 6500,   coord: [-51, -10] },
  { c: 'Russia',       cases: 50000,   deaths: 5500,   coord: [90, 61],  mdr: true },
  { c: 'Ukraine',      cases: 32000,   deaths: 4000,   coord: [31, 49],  mdr: true }
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

// Count meaningful magnitudes only (skip trivial 1-of-8 style flips)
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

/* ── Hero + Mumbai stat count-ups ─────────────────────────────────────────── */
(function () {
  const hero = document.querySelector('.tb-hero-stats');
  if (hero) animateStatGroup(hero, '.n');
  const facts = document.querySelector('.tb-mumbai-facts');
  if (facts) animateStatGroup(facts, '.n');
})();

/* ── Highest-burden list: wave in, bars grow, numbers count ───────────────── */
(function () {
  const host = document.getElementById('tbTopList');
  if (!host) return;
  const max = BURDEN[0].cases;
  host.innerHTML = BURDEN.slice(0, 8).map((d, i) => `
    <div class="tb-row${d.mdr ? ' is-mdr' : ''}" style="--i:${i}">
      <span class="tb-row-c">${esc(d.c)}</span>
      <span class="tb-row-track"><span class="tb-row-fill" data-w="${(d.cases / max * 100).toFixed(1)}"></span></span>
      <span class="tb-row-n">${fmt(d.cases)}</span>
    </div>`).join('');

  const fills = [...host.querySelectorAll('.tb-row-fill')];
  const nums = [...host.querySelectorAll('.tb-row-n')];
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
  const tl = document.getElementById('tbTimeline');
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
    // only sync the mini-nav's own scroll — never let this drag the page's vertical
    // scroll to reveal a section the visitor hasn't scrolled to yet
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

/* ── The descent into resistance — steps reveal, bars grow, pct count ─────── */
(function () {
  const host = document.getElementById('tbLadder');
  if (!host) return;
  const STEPS = [
    { tier: 'Drug-susceptible TB', tag: 'DS-TB', lost: 'Nothing — all four first-line drugs still work.', success: 85, dur: '6 months', c: 'teal' },
    { tier: 'Isoniazid-resistant', tag: 'Hr-TB', lost: 'Isoniazid, the fastest killer of the four.', success: 78, dur: '6–9 months', c: 'teal' },
    { tier: 'Multidrug-resistant', tag: 'MDR-TB', lost: 'Isoniazid + rifampicin — the two best drugs.', success: 63, dur: '9–20 months', c: 'gold' },
    { tier: 'Pre-extensively resistant', tag: 'Pre-XDR', lost: '…and the fluoroquinolones.', success: 52, dur: '18+ months', c: 'gold' },
    { tier: 'Extensively resistant', tag: 'XDR-TB', lost: '…and bedaquiline or linezolid, the last good options.', success: 40, dur: '18–24 months', c: 'red' },
    { tier: '“Totally drug-resistant”', tag: 'Mumbai · 2011', lost: 'Every drug on the shelf.', success: 14, dur: 'no reliable cure*', c: 'severe' }
  ];
  host.innerHTML = STEPS.map((s, i) => `
    <div class="tb-step tb-step-${s.c}" style="--i:${i};--indent:${i}" tabindex="0">
      <div class="tb-step-head">
        <span class="tb-step-tag">${esc(s.tag)}</span>
        <b class="tb-step-tier disp">${esc(s.tier)}</b>
      </div>
      <div class="tb-step-bar"><span class="tb-step-fill" data-w="${s.success}"></span><span class="tb-step-pct" data-pct="${s.success}">${i === STEPS.length - 1 ? '0*' : '0'}%</span></div>
      <div class="tb-step-meta"><span class="tb-step-lost">Lost: ${esc(s.lost)}</span><span class="tb-step-dur">${esc(s.dur)}</span></div>
    </div>`).join('') +
    `<p class="tb-ladder-foot">Cure rates are historical and approximate; the last step reflects outcomes <em>before</em> the bedaquiline-based BPaLM regimen, which now cures many once-untreatable cases in six months.</p>`;

  const steps = [...host.querySelectorAll('.tb-step')];
  const fills = [...host.querySelectorAll('.tb-step-fill')];
  const pcts = [...host.querySelectorAll('.tb-step-pct')];
  if (REDUCE) { fills.forEach(f => f.style.width = f.dataset.w + '%'); pcts.forEach(p => p.textContent = p.dataset.pct + (p.textContent.includes('*') ? '%*' : '%')); }
  inView(host, () => {
    host.classList.add('revealed');
    fills.forEach((f, i) => setTimeout(() => { f.style.width = f.dataset.w + '%'; }, 140 + i * 90));
    pcts.forEach((p, i) => {
      const star = p.textContent.includes('*');
      const target = +p.dataset.pct;
      setTimeout(() => countUp(p, { prefix: '', suffix: '%' + (star ? '*' : ''), target, decimals: 0 }, 850), 140 + i * 90);
    });
  });
})();

/* ── Mapbox burden map (bubbles oscillate) ────────────────────────────────── */
(function () {
  const el = document.getElementById('tbMap');
  const fallback = document.getElementById('tbMapFallback');
  if (!el) return;
  function showFallback() { if (fallback) fallback.hidden = false; el.style.display = 'none'; }
  if (!window.mapboxgl) { showFallback(); return; }

  let map;
  try {
    mapboxgl.accessToken = TB_TOKEN;
    map = new mapboxgl.Map({
      container: 'tbMap', style: 'mapbox://styles/mapbox/dark-v11',
      center: [64, 16], zoom: 1.35, minZoom: 1, maxZoom: 6,
      projection: 'mercator', attributionControl: true
    });
  } catch (err) { showFallback(); return; }

  map.on('error', () => { if (!document.querySelector('#tbMap canvas')) showFallback(); });
  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

  // Scroll/drag/pinch stay off until the visitor clicks or taps into the map —
  // otherwise scrolling the page over it hijacks the gesture to zoom/pan instead.
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
    properties: { c: d.c, cases: d.cases, deaths: d.deaths, mdr: d.mdr ? 1 : 0 }
  }));
  const glowR = k => ['interpolate', ['linear'], ['sqrt', ['get', 'cases']], 0, 6 * k, 1673, 62 * k];
  const dotR = k => ['interpolate', ['linear'], ['sqrt', ['get', 'cases']], 0, 3 * k, 1673, 30 * k];

  map.on('load', () => {
    map.addSource('tb', { type: 'geojson', data: { type: 'FeatureCollection', features } });
    map.addLayer({ id: 'tb-glow', type: 'circle', source: 'tb',
      paint: { 'circle-radius': glowR(1), 'circle-color': '#e4572e', 'circle-opacity': 0.10, 'circle-blur': 1 } });
    map.addLayer({ id: 'tb-dot', type: 'circle', source: 'tb',
      paint: {
        'circle-radius': dotR(1),
        'circle-color': ['case', ['==', ['get', 'mdr'], 1], '#e3b23c', '#e4572e'],
        'circle-opacity': 0.30,
        'circle-stroke-color': ['case', ['==', ['get', 'mdr'], 1], '#e3b23c', '#e4572e'],
        'circle-stroke-width': 1.4, 'circle-stroke-opacity': 0.9
      } });
    map.addLayer({ id: 'tb-label', type: 'symbol', source: 'tb',
      filter: ['>', ['get', 'cases'], 320000],
      layout: { 'text-field': ['get', 'c'], 'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size': 11, 'text-offset': [0, 1.5], 'text-anchor': 'top', 'text-allow-overlap': false },
      paint: { 'text-color': 'rgba(233,229,217,.82)', 'text-halo-color': 'rgba(6,9,8,.9)', 'text-halo-width': 1.4 } });

    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 10, className: 'tb-popup' });
    const enter = e => {
      map.getCanvas().style.cursor = 'pointer';
      const p = e.features[0].properties;
      const cfr = Math.round(p.deaths / p.cases * 100);
      popup.setLngLat(e.features[0].geometry.coordinates)
        .setHTML(`<span class="tb-pop-c">${esc(p.c)}</span><b class="tb-pop-n">${fmt(p.cases)}</b><span class="tb-pop-k">estimated cases / year</span><span class="tb-pop-d">~${fmt(p.deaths)} deaths · ${cfr}% ${p.mdr ? '· drug-resistant hotspot' : ''}</span>`)
        .addTo(map);
    };
    const leave = () => { map.getCanvas().style.cursor = ''; popup.remove(); };
    ['tb-dot', 'tb-glow'].forEach(id => { map.on('mouseenter', id, enter); map.on('mouseleave', id, leave); });

    // gentle oscillation — the burden "breathes"
    if (!REDUCE) {
      const t0 = performance.now();
      (function pulse(now) {
        const phase = (now - t0) / 1600;
        const gk = 1 + 0.16 * Math.sin(phase);
        const dk = 1 + 0.06 * Math.sin(phase);
        map.setPaintProperty('tb-glow', 'circle-radius', glowR(gk));
        map.setPaintProperty('tb-glow', 'circle-opacity', 0.08 + 0.07 * (0.5 + 0.5 * Math.sin(phase)));
        map.setPaintProperty('tb-dot', 'circle-radius', dotR(dk));
        requestAnimationFrame(pulse);
      })(t0);
    }
  });
})();
