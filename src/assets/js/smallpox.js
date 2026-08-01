/* ═══════════════════════════════════════════════════════════════════════════
   SMALLPOX — "The one disease we ever beat"
   Mapbox retreat map · last-stand ledger · milestone wave-in · ring-vaccination climb
   All data animates in on scroll; map markers oscillate gently.
   Figures are approximate, drawn from WHO eradication records.
   ═══════════════════════════════════════════════════════════════════════════ */

const SP_TOKEN = "pk.eyJ1Ijoicm9uZG9taW5ndWUiLCJhIjoiYTM4ODdRdyJ9.jcyNgQQolgrKfs6SKBXNJw";

const LASTSTAND = [
  { c: 'Brazil',          yr: 1971, note: 'Last case anywhere in the Americas', coord: [-51, -10] },
  { c: 'India',           yr: 1975, note: "The world's largest endemic reservoir, cleared", coord: [79, 22] },
  { c: 'Bangladesh',      yr: 1975, note: 'Rahima Banu, age two — last case of Variola major on Earth', coord: [90, 24] },
  { c: 'Ethiopia',        yr: 1976, note: 'Among the last African holdouts', coord: [40, 9] },
  { c: 'Somalia',         yr: 1977, note: 'Ali Maow Maalin — the last natural case anywhere', coord: [45.3, 2.3] },
  { c: 'Birmingham, UK',  yr: 1978, note: 'Janet Parker — laboratory-acquired, the last death', coord: [-1.9, 52.5], lab: true }
];

const REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
  const hero = document.querySelector('.sp-hero-stats');
  if (hero) animateStatGroup(hero, '.n');
  const facts = document.querySelector('.sp-spotlight-facts');
  if (facts) animateStatGroup(facts, '.n');
})();

/* ── The retreat, in order: wave-in ledger ────────────────────────────────── */
(function () {
  const host = document.getElementById('spTopList');
  if (!host) return;
  const rows = [...LASTSTAND].sort((a, b) => a.yr - b.yr);
  host.innerHTML = rows.map((d, i) => `
    <div class="sp-row${d.lab ? ' is-lab' : ''}" style="--i:${i}">
      <span class="sp-row-yr">${d.yr}</span>
      <span><span class="sp-row-c">${esc(d.c)}</span><span class="sp-row-note">${esc(d.note)}</span></span>
      <span class="sp-row-tag">${d.lab ? 'Lab-acquired' : 'Last natural case'}</span>
    </div>`).join('');

  inView(host, () => host.classList.add('revealed'));
})();

/* ── Milestone timeline — horizontal coverflow ────────────────────────────── */
(function () {
  const tl = document.getElementById('spTimeline');
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

/* ── The ring that beat it — steps reveal, bars climb, pct count ─────────── */
(function () {
  const host = document.getElementById('spRing');
  if (!host) return;
  const STEPS = [
    { tier: 'Case detected & reported', tag: 'Day 0', note: 'Surveillance teams and local reward systems replaced waiting for patients to come to a clinic.', conf: 15, dur: 'within hours', c: 'teal' },
    { tier: 'Patient isolated', tag: 'Day 0–1', note: 'The infectious case is contained before any contact is missed.', conf: 35, dur: '1 day', c: 'teal' },
    { tier: 'Contact ring vaccinated', tag: 'Day 1–2', note: 'Household and face-to-face contacts are vaccinated within 24–48 hours — before their own incubation period could end.', conf: 75, dur: '1–2 days', c: 'gold' },
    { tier: 'Ring widened if needed', tag: 'Day 2–7', note: 'Neighbors, co-workers, and travel contacts are added and vaccinated in turn.', conf: 90, dur: 'up to a week', c: 'gold' },
    { tier: 'Ring closes', tag: 'Day 32', note: 'Two incubation periods pass with zero new cases. The outbreak is declared over — without ever vaccinating the whole country.', conf: 100, dur: '32 days', c: 'teal' }
  ];
  host.innerHTML = STEPS.map((s, i) => `
    <div class="sp-step sp-step-${s.c}" style="--i:${i};--indent:${i}" tabindex="0">
      <div class="sp-step-head">
        <span class="sp-step-tag">${esc(s.tag)}</span>
        <b class="sp-step-tier disp">${esc(s.tier)}</b>
      </div>
      <div class="sp-step-bar"><span class="sp-step-fill" data-w="${s.conf}"></span><span class="sp-step-pct" data-pct="${s.conf}">0%</span></div>
      <div class="sp-step-meta"><span class="sp-step-lost">${esc(s.note)}</span><span class="sp-step-dur">${esc(s.dur)}</span></div>
    </div>`).join('') +
    `<p class="sp-ring-foot">Percentages illustrate rising confidence that the chain of transmission is broken, not a measured statistic. The protocol, refined in Nigeria in 1966 by a CDC team under William Foege, needed to vaccinate only a fraction of a population that mass campaigns would have required to reach the same result.</p>`;

  const fills = [...host.querySelectorAll('.sp-step-fill')];
  const pcts = [...host.querySelectorAll('.sp-step-pct')];
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

/* ── Mapbox retreat map (markers pulse gently) ────────────────────────────── */
(function () {
  const el = document.getElementById('spMap');
  const fallback = document.getElementById('spMapFallback');
  if (!el) return;
  function showFallback() { if (fallback) fallback.hidden = false; el.style.display = 'none'; }
  if (!window.mapboxgl) { showFallback(); return; }

  let map;
  try {
    mapboxgl.accessToken = SP_TOKEN;
    map = new mapboxgl.Map({
      container: 'spMap', style: 'mapbox://styles/mapbox/dark-v11',
      center: [30, 18], zoom: 1.35, minZoom: 1, maxZoom: 6,
      projection: 'mercator', attributionControl: true
    });
  } catch (err) { showFallback(); return; }

  map.on('error', () => { if (!document.querySelector('#spMap canvas')) showFallback(); });
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

  const features = LASTSTAND.map(d => ({
    type: 'Feature', geometry: { type: 'Point', coordinates: d.coord },
    properties: { c: d.c, yr: d.yr, note: d.note, lab: d.lab ? 1 : 0 }
  }));

  map.on('load', () => {
    map.addSource('sp', { type: 'geojson', data: { type: 'FeatureCollection', features } });
    map.addLayer({ id: 'sp-glow', type: 'circle', source: 'sp',
      paint: {
        'circle-radius': 26,
        'circle-color': ['case', ['==', ['get', 'lab'], 1], '#c84038', '#2b8f96'],
        'circle-opacity': 0.14, 'circle-blur': 1
      } });
    map.addLayer({ id: 'sp-dot', type: 'circle', source: 'sp',
      paint: {
        'circle-radius': 9,
        'circle-color': ['case', ['==', ['get', 'lab'], 1], '#c84038', '#2b8f96'],
        'circle-opacity': 0.32,
        'circle-stroke-color': ['case', ['==', ['get', 'lab'], 1], '#c84038', '#2b8f96'],
        'circle-stroke-width': 1.4, 'circle-stroke-opacity': 0.9
      } });
    map.addLayer({ id: 'sp-label', type: 'symbol', source: 'sp',
      layout: { 'text-field': ['concat', ['get', 'c'], '  ·  ', ['to-string', ['get', 'yr']]],
        'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size': 11, 'text-offset': [0, 1.5], 'text-anchor': 'top', 'text-allow-overlap': false },
      paint: { 'text-color': 'rgba(233,229,217,.82)', 'text-halo-color': 'rgba(6,9,8,.9)', 'text-halo-width': 1.4 } });

    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 10, className: 'sp-popup' });
    const enter = e => {
      map.getCanvas().style.cursor = 'pointer';
      const p = e.features[0].properties;
      popup.setLngLat(e.features[0].geometry.coordinates)
        .setHTML(`<span class="sp-pop-c">${esc(p.c)}</span><b class="sp-pop-n">${p.yr}</b><span class="sp-pop-k">${p.lab ? 'laboratory-acquired' : 'last natural case in region'}</span><span class="sp-pop-d">${esc(p.note)}</span>`)
        .addTo(map);
    };
    const leave = () => { map.getCanvas().style.cursor = ''; popup.remove(); };
    ['sp-dot', 'sp-glow'].forEach(id => { map.on('mouseenter', id, enter); map.on('mouseleave', id, leave); });

    if (!REDUCE) {
      const t0 = performance.now();
      (function pulse(now) {
        const phase = (now - t0) / 1600;
        const gk = 1 + 0.18 * Math.sin(phase);
        map.setPaintProperty('sp-glow', 'circle-radius', 26 * gk);
        map.setPaintProperty('sp-glow', 'circle-opacity', 0.10 + 0.08 * (0.5 + 0.5 * Math.sin(phase)));
        requestAnimationFrame(pulse);
      })(t0);
    }
  });
})();
