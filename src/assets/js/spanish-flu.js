/* ═══════════════════════════════════════════════════════════════════════════
   1918 INFLUENZA — "The pandemic that outkilled the war"
   Mapbox burden map · top-toll list · milestone wave-in · St. Louis vs Philadelphia
   All data animates in on scroll; map bubbles oscillate.
   Figures are approximate, drawn from CDC and published historical estimates.
   ═══════════════════════════════════════════════════════════════════════════ */

const FLU_TOKEN = "pk.eyJ1Ijoicm9uZG9taW5ndWUiLCJhIjoiYTM4ODdRdyJ9.jcyNgQQolgrKfs6SKBXNJw";

const BURDEN = [
  { c: 'India',              deaths: 14000000, coord: [79, 22] },
  { c: 'China',              deaths: 4000000,  coord: [104, 35] },
  { c: 'Dutch East Indies',  deaths: 1500000,  coord: [113, -2] },
  { c: 'Persia',             deaths: 1000000,  coord: [53, 32] },
  { c: 'United States',      deaths: 675000,   coord: [-98, 39] },
  { c: 'Japan',              deaths: 400000,   coord: [138, 37] },
  { c: 'Spain',              deaths: 260000,   coord: [-4, 40] },
  { c: 'Western Samoa',      deaths: 7500,     coord: [-172, -13.8], severe: true },
  { c: 'Brevig Mission, AK', deaths: 72,       coord: [-166, 65.3], severe: true }
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

/* ── Hero + spotlight + compare stat count-ups ────────────────────────────── */
(function () {
  const hero = document.querySelector('.flu-hero-stats');
  if (hero) animateStatGroup(hero, '.n');
  const facts = document.querySelector('.flu-spotlight-facts');
  if (facts) animateStatGroup(facts, '.n');
  const compare = document.getElementById('fluCompare');
  if (compare) animateStatGroup(compare, '.flu-compare-stat .n');
})();

/* ── Highest-toll list: wave in, bars grow, numbers count ─────────────────── */
(function () {
  const host = document.getElementById('fluTopList');
  if (!host) return;
  const rows = [...BURDEN].sort((a, b) => b.deaths - a.deaths);
  const max = rows[0].deaths;
  host.innerHTML = rows.map((d, i) => `
    <div class="flu-row${d.severe ? ' is-severe' : ''}" style="--i:${i}">
      <span class="flu-row-c">${esc(d.c)}</span>
      <span class="flu-row-track"><span class="flu-row-fill" data-w="${Math.max(1, (d.deaths / max * 100)).toFixed(1)}"></span></span>
      <span class="flu-row-n">${fmt(d.deaths)}</span>
    </div>`).join('');

  const fills = [...host.querySelectorAll('.flu-row-fill')];
  const nums = [...host.querySelectorAll('.flu-row-n')];
  const specs = nums.map(n => armCount(n));
  if (REDUCE) { fills.forEach(f => f.style.width = f.dataset.w + '%'); }
  inView(host, () => {
    host.classList.add('revealed');
    fills.forEach((f, i) => setTimeout(() => { f.style.width = f.dataset.w + '%'; }, 120 + i * 70));
    nums.forEach((n, i) => { if (specs[i]) setTimeout(() => countUp(n, specs[i]), 120 + i * 70); });
  });
})();

/* ── The fourteen-day gap: reveal the two cards ───────────────────────────── */
(function () {
  const grid = document.getElementById('fluCompare');
  if (!grid) return;
  [...grid.querySelectorAll('.flu-compare-card')].forEach((c, i) => c.style.setProperty('--i', i));
  inView(grid, () => grid.classList.add('revealed'));
})();

/* ── Milestone timeline — horizontal coverflow ────────────────────────────── */
(function () {
  const tl = document.getElementById('fluTimeline');
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

/* ── Mapbox burden map (bubbles oscillate) ────────────────────────────────── */
(function () {
  const el = document.getElementById('fluMap');
  const fallback = document.getElementById('fluMapFallback');
  if (!el) return;
  function showFallback() { if (fallback) fallback.hidden = false; el.style.display = 'none'; }
  if (!window.mapboxgl) { showFallback(); return; }

  let map;
  try {
    mapboxgl.accessToken = FLU_TOKEN;
    map = new mapboxgl.Map({
      container: 'fluMap', style: 'mapbox://styles/mapbox/dark-v11',
      center: [40, 20], zoom: 1.15, minZoom: 1, maxZoom: 6,
      projection: 'mercator', attributionControl: true
    });
  } catch (err) { showFallback(); return; }

  map.on('error', () => { if (!document.querySelector('#fluMap canvas')) showFallback(); });
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
    properties: { c: d.c, deaths: d.deaths, severe: d.severe ? 1 : 0 }
  }));
  const glowR = k => ['interpolate', ['linear'], ['sqrt', ['get', 'deaths']], 0, 6 * k, 3742, 62 * k];
  const dotR = k => ['interpolate', ['linear'], ['sqrt', ['get', 'deaths']], 0, 3 * k, 3742, 30 * k];

  map.on('load', () => {
    map.addSource('flu', { type: 'geojson', data: { type: 'FeatureCollection', features } });
    map.addLayer({ id: 'flu-glow', type: 'circle', source: 'flu',
      paint: { 'circle-radius': glowR(1), 'circle-color': '#e96a2f', 'circle-opacity': 0.10, 'circle-blur': 1 } });
    map.addLayer({ id: 'flu-dot', type: 'circle', source: 'flu',
      paint: {
        'circle-radius': dotR(1),
        'circle-color': ['case', ['==', ['get', 'severe'], 1], '#c84038', '#e96a2f'],
        'circle-opacity': 0.30,
        'circle-stroke-color': ['case', ['==', ['get', 'severe'], 1], '#c84038', '#e96a2f'],
        'circle-stroke-width': 1.4, 'circle-stroke-opacity': 0.9
      } });
    map.addLayer({ id: 'flu-label', type: 'symbol', source: 'flu',
      filter: ['>', ['get', 'deaths'], 300000],
      layout: { 'text-field': ['get', 'c'], 'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size': 11, 'text-offset': [0, 1.5], 'text-anchor': 'top', 'text-allow-overlap': false },
      paint: { 'text-color': 'rgba(233,229,217,.82)', 'text-halo-color': 'rgba(6,9,8,.9)', 'text-halo-width': 1.4 } });

    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 10, className: 'flu-popup' });
    const enter = e => {
      map.getCanvas().style.cursor = 'pointer';
      const p = e.features[0].properties;
      popup.setLngLat(e.features[0].geometry.coordinates)
        .setHTML(`<span class="flu-pop-c">${esc(p.c)}</span><b class="flu-pop-n">${fmt(p.deaths)}</b><span class="flu-pop-k">estimated deaths, 1918–1920</span>${p.severe ? '<span class="flu-pop-d">among the highest death rates per capita</span>' : ''}`)
        .addTo(map);
    };
    const leave = () => { map.getCanvas().style.cursor = ''; popup.remove(); };
    ['flu-dot', 'flu-glow'].forEach(id => { map.on('mouseenter', id, enter); map.on('mouseleave', id, leave); });

    if (!REDUCE) {
      const t0 = performance.now();
      (function pulse(now) {
        const phase = (now - t0) / 1600;
        const gk = 1 + 0.16 * Math.sin(phase);
        const dk = 1 + 0.06 * Math.sin(phase);
        map.setPaintProperty('flu-glow', 'circle-radius', glowR(gk));
        map.setPaintProperty('flu-glow', 'circle-opacity', 0.08 + 0.07 * (0.5 + 0.5 * Math.sin(phase)));
        map.setPaintProperty('flu-dot', 'circle-radius', dotR(dk));
        requestAnimationFrame(pulse);
      })(t0);
    }
  });
})();
