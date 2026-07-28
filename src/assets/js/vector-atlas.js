/* ═══════════════════════════════════════════════════════════════════════════
   VECTOR ATLAS — custom D3 orthographic globe (no Mapbox)
   Land + graticule + great-circle corridors + culled site labels, all in one
   SVG that rotates together. Era chips reveal corridors; sites open detail.
   ═══════════════════════════════════════════════════════════════════════════ */

const ERAS = [
  { key: 'antiquity', label: 'Antiquity', date: '430 BCE',
    lens: 'Before maps or microscopes — vectors moved with rivers, caravans, and armies.' },
  { key: 'trade', label: 'Trade age', date: '1300–1800',
    lens: 'Trade routes and ports knit distant reservoirs into shared epidemic geographies.' },
  { key: 'colonial', label: 'Colonial ports', date: '1800–1950',
    lens: 'Colonial shipping and plantations widened corridors and quickened spread.' },
  { key: 'jet', label: 'Jet age', date: '1950–2000',
    lens: 'Air travel collapsed distance — a vector’s range and a flight map diverge.' },
  { key: 'now', label: 'Surveillance', date: '2000–today',
    lens: 'Genomic surveillance now resolves reservoirs and routes in near real time.' }
];

// How many corridors are "known" by each era (index-aligned to ERAS).
const ERA_ROUTES = [1, 1, 2, 3, 3];

const VECTORS = [
  {
    key: 'mosquito', label: 'Mosquito', color: '#e4572e',
    title: 'Mosquito Empire',
    deck: 'Warm-water urbanization, ports, rainfall, and peri-domestic breeding carry malaria, yellow fever, dengue, chikungunya, and Zika.',
    diseases: 'Malaria · Yellow fever · Dengue · Zika · Chikungunya',
    reservoir: 'Aedes & Anopheles mosquitoes',
    transmission: 'Bite of an infected mosquito in warm, wet, urbanizing zones.',
    example: 'Atlantic yellow fever, port cities (18th–19th c.)',
    stat: { n: '~3.9B', k: 'people at risk of dengue' },
    center: [17, 4], scale: 1,
    sites: [
      { name: 'Amazon Basin', place: 'Malaria frontier', pathogen: 'Plasmodium', coord: [-62, -4], note: 'Forest-edge settlement and river mobility keep malaria transmission persistent.' },
      { name: 'West African Coast', place: 'Yellow fever belt', pathogen: 'Yellow fever virus', coord: [-1, 7], note: 'Ports, mosquitoes, and unvaccinated populations shaped repeated urban outbreaks.' },
      { name: 'Southeast Asia', place: 'Dengue urban range', pathogen: 'Dengue virus', coord: [103, 14], note: 'Dense cities and Aedes mosquitoes sustain repeated dengue cycles.' },
      { name: 'Caribbean ports', place: 'Yellow fever corridor', pathogen: 'Yellow fever virus', coord: [-75, 19], note: 'Shipping and Aedes aegypti carried yellow fever through Atlantic port networks.' },
      { name: 'Indian subcontinent', place: 'Dengue burden', pathogen: 'Dengue virus', coord: [78, 21], note: 'Monsoon cycles and dense cities sustain the world’s largest dengue load.' },
      { name: 'US Gulf Coast', place: 'Aedes re-emergence', pathogen: 'Dengue / Zika', coord: [-90, 29], note: 'Warming and travel reintroduce local Aedes transmission to the Gulf.' },
      { name: 'Sahel fringe', place: 'Malaria frontier', pathogen: 'Plasmodium', coord: [10, 13], note: 'Seasonal rains push Anopheles ranges north into the Sahel.' }
    ],
    routes: [
      { name: 'Atlantic yellow fever circuit', from: [-75, 19], to: [-1, 7] },
      { name: 'Dengue urban belt', from: [103, 14], to: [78, 21] },
      { name: 'Amazon river mobility', from: [-72, -8], to: [-49, -1] }
    ]
  },
  {
    key: 'flea', label: 'Flea', color: '#e3b23c',
    title: 'Rodent & Flea',
    deck: 'Rodent-flea-plague systems move through grain storage, caravan corridors, ports, and disturbed rodent ecologies.',
    diseases: 'Plague (Yersinia pestis)',
    reservoir: 'Rodents and their fleas',
    transmission: 'Flea bite from infected rodents; pneumonic form spreads person-to-person.',
    example: 'The Black Death (1347–1353)',
    stat: { n: '~200M', k: 'plague deaths across history' },
    center: [58, 36], scale: 1.05,
    sites: [
      { name: 'Tien Shan', place: 'Plague origin signal', pathogen: 'Y. pestis', coord: [76, 42], note: 'Genomic work points toward Central Asian plague diversity and medieval spread.' },
      { name: 'Black Sea ports', place: 'Second pandemic route', pathogen: 'Y. pestis', coord: [35, 45], note: 'Maritime trade helped carry plague into Mediterranean and European cities.' },
      { name: 'Madagascar highlands', place: 'Modern endemic focus', pathogen: 'Y. pestis', coord: [47, -19], note: 'Seasonal plague persists through rodent and flea cycles.' },
      { name: 'American Southwest', place: 'Sylvatic plague', pathogen: 'Y. pestis', coord: [-107, 35], note: 'Prairie dog and wild rodent systems maintain enzootic plague.' },
      { name: 'Yunnan reservoir', place: 'Enzootic focus', pathogen: 'Y. pestis', coord: [101, 25], note: 'Rodent plague reservoirs persist across southwest China.' },
      { name: 'Ituri / Congo Basin', place: 'Endemic plague', pathogen: 'Y. pestis', coord: [29, 1], note: 'Neighbouring highland zones report recurring human plague.' }
    ],
    routes: [
      { name: 'Silk Road plague corridor', from: [76, 42], to: [35, 45] },
      { name: 'Maritime plague spread', from: [35, 45], to: [12, 43] },
      { name: 'Indian Ocean plague circuit', from: [47, -19], to: [73, 19] }
    ]
  },
  {
    key: 'bat', label: 'Bat', color: '#8a6fc9',
    title: 'Bat Spillover',
    deck: 'Bat-associated spillovers concentrate where roosts, mines, forests, farms, and clinical systems intersect.',
    diseases: 'Ebola · Marburg · Nipah · Rabies · SARS-family',
    reservoir: 'Fruit & insectivorous bats',
    transmission: 'Spillover via forests, caves, farms, and bushmeat contact.',
    example: 'West Africa Ebola (2014–2016)',
    stat: { n: '11,325', k: 'deaths, West Africa Ebola' },
    center: [28, 1], scale: 1.15,
    sites: [
      { name: 'Albertine Rift', place: 'Ebola / Marburg edge', pathogen: 'Filoviruses', coord: [30, 0], note: 'Mines, forests, and cross-border travel shape filovirus response geography.' },
      { name: 'Kitum Cave', place: 'Marburg exposure', pathogen: 'Marburg virus', coord: [35, 0.4], note: 'Historic Marburg cases linked to cave exposure around Mount Elgon.' },
      { name: 'Nipah belt', place: 'Fruit bat interface', pathogen: 'Nipah virus', coord: [90, 23], note: 'Fruit bats, date-palm sap, pigs, and farms form different transmission pathways.' },
      { name: 'West African forest zone', place: 'Ebola emergence', pathogen: 'Ebola virus', coord: [-10, 8], note: 'Forest disturbance and clinical amplification shaped Ebola history.' },
      { name: 'Yunnan caves', place: 'SARS-related CoVs', pathogen: 'Sarbecoviruses', coord: [103, 24], note: 'Horseshoe-bat caves harbour close relatives of SARS coronaviruses.' },
      { name: 'Queensland', place: 'Hendra interface', pathogen: 'Hendra virus', coord: [147, -20], note: 'Flying-fox to horse to human spillover along Australia’s east coast.' },
      { name: 'Amazon roosts', place: 'Rabies / novel CoVs', pathogen: 'Rabies / CoVs', coord: [-60, -3], note: 'Vampire and fruit bats sustain rabies and surveillance interest.' }
    ],
    routes: [
      { name: 'Rift Valley filovirus corridor', from: [30, 0], to: [35, 0.4] },
      { name: 'Nipah agricultural interface', from: [90, 23], to: [101, 3] },
      { name: 'West-to-Central forest belt', from: [-10, 8], to: [12, 0] }
    ]
  },
  {
    key: 'rodent', label: 'Rodent', color: '#33a58a',
    title: 'Rodent Reservoir',
    deck: 'Rodent-borne infections follow food storage, housing quality, field labor, rainfall pulses, and occupational exposure.',
    diseases: 'Lassa · Hantavirus · Arenaviruses',
    reservoir: 'Field & house rodents (Mastomys, deer mouse)',
    transmission: 'Contact with rodent urine, droppings, or nesting material.',
    example: 'Lassa fever, West Africa (endemic)',
    stat: { n: '~300K', k: 'Lassa infections a year' },
    center: [-18, 11], scale: 1.05,
    sites: [
      { name: 'Lassa belt', place: 'Mastomys reservoir', pathogen: 'Lassa virus', coord: [7, 9], note: 'West African rodent-human contact drives persistent Lassa risk.' },
      { name: 'Four Corners', place: 'Hantavirus ecology', pathogen: 'Sin Nombre virus', coord: [-109, 36], note: 'Rainfall and deer-mouse population pulses preceded known hantavirus clusters.' },
      { name: 'Pampas', place: 'Arenavirus range', pathogen: 'Junín virus', coord: [-61, -34], note: 'Agricultural landscapes overlap with rodent-borne hemorrhagic fever risk.' },
      { name: 'Sahel grain belt', place: 'Food storage interface', pathogen: 'Arenaviruses', coord: [1, 14], note: 'Storage, housing, and seasonal rodent movement shape exposure.' },
      { name: 'Fennoscandia', place: 'Puumala hantavirus', pathogen: 'Puumala virus', coord: [20, 61], note: 'Bank-vole population cycles drive northern European hantavirus disease.' },
      { name: 'East African highlands', place: 'Rodent contact zone', pathogen: 'Rodent-borne', coord: [37, -1], note: 'Highland agriculture and housing raise rodent-human contact.' }
    ],
    routes: [
      { name: 'Lassa regional belt', from: [-12, 8], to: [10, 10] },
      { name: 'Southwest rodent pulse', from: [-112, 34], to: [-104, 38] },
      { name: 'Pampas agricultural range', from: [-65, -36], to: [-57, -32] }
    ]
  },
  {
    key: 'livestock', label: 'Livestock', color: '#c2813a',
    title: 'Livestock Interface',
    deck: 'Animal production, markets, slaughter, and herding routes create repeated opportunities for zoonotic exchange.',
    diseases: 'Avian influenza · MERS · Rift Valley fever · Brucellosis',
    reservoir: 'Poultry, camels, cattle, small ruminants',
    transmission: 'Animal markets, slaughter, herding, and dairy contact.',
    example: 'H5N1 avian influenza (ongoing)',
    stat: { n: '>60%', k: 'new diseases are zoonotic' },
    center: [45, 22], scale: 1.05,
    sites: [
      { name: 'Arabian Peninsula', place: 'MERS camel interface', pathogen: 'MERS-CoV', coord: [45, 24], note: 'Camel contact and healthcare amplification shaped MERS geography.' },
      { name: 'Nile Valley', place: 'Rift Valley fever', pathogen: 'RVF virus', coord: [31, 26], note: 'Livestock, floodwater mosquitoes, and markets create outbreak windows.' },
      { name: 'Mekong poultry belt', place: 'Avian influenza', pathogen: 'H5N1', coord: [105, 16], note: 'Live-bird markets and dense poultry production sustain monitoring risk.' },
      { name: 'Sahel pastoral routes', place: 'Herd mobility', pathogen: 'Brucella / RVF', coord: [17, 15], note: 'Seasonal herd movement can link animal and human health signals.' },
      { name: 'Horn of Africa', place: 'Rift Valley fever', pathogen: 'RVF virus', coord: [45, 6], note: 'Floodwater mosquitoes and herds trigger periodic RVF epizootics.' },
      { name: 'European farm belt', place: 'Avian & swine flu', pathogen: 'Influenza A', coord: [8, 50], note: 'Intensive poultry and pig farming create influenza reassortment risk.' }
    ],
    routes: [
      { name: 'Camel trade and care corridor', from: [45, 24], to: [39, 21] },
      { name: 'Nile livestock-floodplain', from: [31, 26], to: [32, 12] },
      { name: 'Mekong poultry market belt', from: [105, 16], to: [107, 10] }
    ]
  },
  {
    key: 'travel', label: 'Human travel', color: '#d9d4c5',
    title: 'Human Travel',
    deck: 'Air routes, migration, displacement, and pilgrimage networks move pathogens faster than ecological ranges alone.',
    diseases: 'Influenza · COVID-19 · Measles · Meningitis',
    reservoir: 'Human hosts in transit',
    transmission: 'Air routes, migration, displacement, and mass gatherings.',
    example: 'COVID-19 pandemic (2020– )',
    stat: { n: '~4.4B', k: 'air passengers a year' },
    center: [5, 30], scale: 0.95,
    sites: [
      { name: 'Global air hubs', place: 'Respiratory spread', pathogen: 'Influenza / SARS-CoV-2', coord: [0, 51], note: 'Dense air networks compress travel time for influenza, COVID-19, and measles sparks.' },
      { name: 'Hajj routes', place: 'Mass gathering health', pathogen: 'N. meningitidis', coord: [39.8, 21.4], note: 'Pilgrimage health systems manage meningitis, respiratory infection, and heat risk.' },
      { name: 'Mediterranean displacement', place: 'Interrupted care', pathogen: 'Measles / VPDs', coord: [20, 36], note: 'Displacement changes vaccine access, surveillance, and outbreak response.' },
      { name: 'Pacific air bridge', place: 'Measles importation', pathogen: 'Measles virus', coord: [-157, 21], note: 'Travel-linked measles sparks reveal local immunity gaps.' },
      { name: 'North American hubs', place: 'Measles importation', pathogen: 'Measles virus', coord: [-95, 40], note: 'Under-vaccinated pockets turn imported sparks into outbreaks.' },
      { name: 'South Asian corridors', place: 'Labour migration', pathogen: 'Multiple', coord: [77, 28], note: 'Migration and mega-cities move respiratory pathogens rapidly.' }
    ],
    routes: [
      { name: 'Transatlantic air route', from: [-74, 40], to: [0, 51] },
      { name: 'Pilgrimage health route', from: [30, 30], to: [39.8, 21.4] },
      { name: 'Pacific importation route', from: [-157, 21], to: [-122, 37] }
    ]
  }
];

let activeVector = VECTORS[0];
let activeEra = ERAS[4];
let activeSite = null;
let hoverVector = null;               // button-hover preview
function displayVector() { return hoverVector || activeVector; }

/* ── Controls ─────────────────────────────────────────────────────────────── */
function renderControls() {
  const vhost = document.getElementById('vectorButtons');
  if (vhost) {
    vhost.innerHTML = VECTORS.map(v => `
      <button type="button" class="vector-btn${v === activeVector ? ' is-active' : ''}" data-key="${v.key}" style="--vc:${v.color}">
        <span class="vb-dot"></span><span class="vb-name">${v.label}</span>
        <span class="vb-count">${v.sites.length} sites</span>
      </button>`).join('');
    vhost.querySelectorAll('.vector-btn').forEach(btn => {
      btn.addEventListener('click', () => selectVector(btn.dataset.key));
      btn.addEventListener('mouseenter', () => {
        const v = VECTORS.find(x => x.key === btn.dataset.key);
        if (v && v !== activeVector) { hoverVector = v; if (globe) globe.refresh(); }
      });
      btn.addEventListener('mouseleave', () => {
        if (hoverVector) { hoverVector = null; if (globe) globe.refresh(); }
      });
    });
  }
  const ehost = document.getElementById('eraButtons');
  if (ehost) {
    ehost.innerHTML = ERAS.map(e => `
      <button type="button" class="era-btn${e === activeEra ? ' is-active' : ''}" data-key="${e.key}">
        <span class="eb-name">${e.label}</span><span class="eb-date">${e.date}</span>
      </button>`).join('');
    ehost.querySelectorAll('.era-btn').forEach(btn => {
      btn.addEventListener('click', () => selectEra(btn.dataset.key));
    });
  }
}

function eraIndex() { return ERAS.indexOf(activeEra); }
function visibleRoutes() {
  return activeVector.routes.slice(0, ERA_ROUTES[eraIndex()]);
}

function selectVector(key) {
  const v = VECTORS.find(x => x.key === key);
  if (!v || v === activeVector) { activeVector = v || activeVector; }
  activeVector = v;
  activeSite = null;
  renderControls();
  updatePanel();
  updateCaption();
  if (globe) globe.setVector(activeVector);
}

function selectEra(key) {
  const e = ERAS.find(x => x.key === key);
  if (!e) return;
  activeEra = e;
  renderControls();
  updatePanel();
  updateCaption();
  if (globe) globe.refresh();
}

function updateCaption() {
  const status = document.getElementById('atlasStatus');
  if (status) status.textContent = `${activeVector.label} layer · ${activeEra.label.toLowerCase()} lens`;
}

/* ── Selected-system / site-detail panel ──────────────────────────────────── */
function html(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

function updatePanel() {
  const card = document.getElementById('selectedCard');
  if (!card) return;
  if (activeSite) {
    card.innerHTML = `
      <button type="button" class="panel-back" id="panelBack">← ${html(activeVector.label)} systems</button>
      <span class="control-label">Field site</span>
      <h2 class="disp">${html(activeSite.name)}</h2>
      <p class="site-place">${html(activeSite.place)}</p>
      <dl class="panel-dl">
        <div><dt>Pathogen</dt><dd>${html(activeSite.pathogen)}</dd></div>
        <div><dt>Era lens</dt><dd>${html(activeEra.label)} · ${html(activeEra.date)}</dd></div>
      </dl>
      <p class="site-note">${html(activeSite.note)}</p>`;
    const back = document.getElementById('panelBack');
    if (back) back.addEventListener('click', () => { activeSite = null; updatePanel(); if (globe) globe.refresh(); });
    return;
  }
  const v = activeVector;
  card.innerHTML = `
    <span class="control-label">Selected system</span>
    <h2 class="disp">${html(v.title)}</h2>
    <p class="panel-deck">${html(v.deck)}</p>
    <div class="panel-stat"><span class="ps-n">${html(v.stat.n)}</span><span class="ps-k">${html(v.stat.k)}</span></div>
    <dl class="panel-dl">
      <div><dt>Key diseases</dt><dd>${html(v.diseases)}</dd></div>
      <div><dt>Reservoir</dt><dd>${html(v.reservoir)}</dd></div>
      <div><dt>Transmission</dt><dd>${html(v.transmission)}</dd></div>
      <div><dt>Example</dt><dd>${html(v.example)}</dd></div>
    </dl>
    <p class="panel-era"><b>${html(activeEra.label)} lens.</b> ${html(activeEra.lens)}</p>`;
}

/* ── Globe (D3 orthographic) ──────────────────────────────────────────────── */
let globe = null;

function buildGlobe(land) {
  const svg = d3.select('#vectorGlobe');
  const shell = document.querySelector('.atlas-map-shell');
  if (svg.empty() || !window.d3) return null;

  let W = 0, H = 0;
  const projection = d3.geoOrthographic().precision(0.4).clipAngle(90);
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule10();

  const defs = svg.append('defs');
  const shade = defs.append('radialGradient').attr('id', 'oceanShade').attr('cx', '38%').attr('cy', '30%').attr('r', '78%');
  shade.append('stop').attr('offset', '0%').attr('stop-color', '#18271f');
  shade.append('stop').attr('offset', '52%').attr('stop-color', '#0b1210');
  shade.append('stop').attr('offset', '100%').attr('stop-color', '#040706');
  const atmo = defs.append('radialGradient').attr('id', 'atmo').attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
  atmo.append('stop').attr('offset', '78%').attr('stop-color', 'rgba(51,165,138,0)');
  atmo.append('stop').attr('offset', '93%').attr('stop-color', 'rgba(51,165,138,.10)');
  atmo.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(51,165,138,0)');

  const gAtmo = svg.append('circle').attr('class', 'globe-atmo');
  const gOcean = svg.append('path').attr('class', 'globe-ocean');
  const gGrat = svg.append('path').attr('class', 'globe-graticule');
  const gLand = svg.append('path').attr('class', 'globe-land');
  const gArcs = svg.append('g').attr('class', 'globe-arcs');
  const gSites = svg.append('g').attr('class', 'globe-sites');

  function size() {
    const r = shell.getBoundingClientRect();
    W = Math.max(320, r.width);
    H = Math.max(420, Math.min(680, r.height || 620));
    svg.attr('viewBox', `0 0 ${W} ${H}`).attr('width', W).attr('height', H);
    projection.fitExtent([[26, 26], [W - 26, H - 26]], { type: 'Sphere' });
    projection.scale(projection.scale() * (activeVector.scale || 1));
    projection.translate([W / 2, H / 2]);
  }

  function centerCoord() {
    const r = projection.rotate();
    return [-r[0], -r[1]];
  }
  // 0 at the limb → 1 facing the viewer; <0 means behind the globe.
  function depth(coord) {
    return (Math.PI / 2 - d3.geoDistance(coord, centerCoord())) / (Math.PI / 2);
  }

  // every vector's sites, so the globe reads dense; inactive ones sit dormant.
  const ALL_SITES = [];
  VECTORS.forEach(v => v.sites.forEach(s => ALL_SITES.push({ site: s, vector: v })));

  function draw() {
    const t = projection.translate();
    const s = projection.scale();
    gAtmo.attr('cx', t[0]).attr('cy', t[1]).attr('r', s * 1.16);
    gOcean.attr('d', path({ type: 'Sphere' }));
    gGrat.attr('d', path(graticule));
    gLand.attr('d', path(land));

    const disp = displayVector();

    // corridors for the displayed vector (great-circle, era-gated)
    const routes = disp.routes.slice(0, ERA_ROUTES[eraIndex()]);
    const arcs = gArcs.selectAll('path').data(routes, d => d.name);
    arcs.exit().remove();
    arcs.enter().append('path').attr('class', 'globe-arc')
      .merge(arcs)
      .attr('stroke', disp.color)
      .attr('d', d => path({ type: 'LineString', coordinates: [d.from, d.to] }));

    // sites — every vector, dormant unless it is the displayed one
    const sel = gSites.selectAll('g.site').data(ALL_SITES, d => d.vector.key + '|' + d.site.name);
    sel.exit().remove();
    const enter = sel.enter().append('g').attr('class', 'site');
    enter.append('circle').attr('class', 'site-ring');
    enter.append('circle').attr('class', 'site-dot');
    enter.append('text').attr('class', 'site-label');
    const all = enter.merge(sel);
    all.each(function (d) {
      const g = d3.select(this);
      const dp = depth(d.site.coord);
      const vis = dp > 0.02;
      g.style('display', vis ? null : 'none');
      g.classed('dormant', d.vector !== disp);
      if (!vis) return;
      const p = projection(d.site.coord);
      const on = d.vector === disp;
      const isActive = on && activeSite && activeSite.name === d.site.name;
      const left = p[0] < W * 0.72;
      const near = 0.35 + 0.65 * dp;                 // depth cue: front larger/brighter
      const color = d.vector.color;
      const ring = g.select('.site-ring');
      const dot = g.select('.site-dot');
      const lbl = g.select('.site-label');
      ring.attr('cx', p[0]).attr('cy', p[1]).attr('r', (isActive ? 15 : 11) * near).attr('fill', color)
        .style('display', on ? null : 'none');
      dot.attr('cx', p[0]).attr('cy', p[1]).attr('fill', color)
        .attr('r', (on ? (isActive ? 6 : 4.5) : 3) * near)
        .style('opacity', on ? 1 : (0.22 + 0.4 * dp));
      if (on) {
        lbl.style('display', null).style('opacity', 0.35 + 0.65 * dp)
          .attr('x', p[0] + (left ? 15 : -15)).attr('y', p[1] - 11)
          .attr('text-anchor', left ? 'start' : 'end')
          .classed('is-active', isActive)
          .text(d.site.name);
      } else {
        lbl.style('display', 'none');
      }
    });
    // displayed vector's sites paint on top of dormant ones
    all.sort((a, b) => (a.vector === disp ? 1 : 0) - (b.vector === disp ? 1 : 0));
    all.style('cursor', 'pointer').on('click', (ev, d) => {
      if (d.vector === disp) { activeSite = d.site; updatePanel(); draw(); }
      else { selectVector(d.vector.key); }
    });
  }

  // interaction: drag to rotate + gentle auto-rotation
  let autoTimer = null, dragging = false, last = null;
  function startAuto() {
    stopAuto();
    autoTimer = d3.timer(() => {
      if (dragging) return;
      const r = projection.rotate();
      projection.rotate([r[0] + 0.14, r[1]]);
      draw();
    });
  }
  function stopAuto() { if (autoTimer) { autoTimer.stop(); autoTimer = null; } }

  svg.call(d3.drag()
    .on('start', (ev) => { dragging = true; last = [ev.x, ev.y]; })
    .on('drag', (ev) => {
      const r = projection.rotate();
      const k = 0.28;
      projection.rotate([r[0] + (ev.x - last[0]) * k, clampPhi(r[1] - (ev.y - last[1]) * k)]);
      last = [ev.x, ev.y];
      draw();
    })
    .on('end', () => { dragging = false; }));

  function clampPhi(p) { return Math.max(-82, Math.min(82, p)); }

  function rotateTo(center, cb) {
    const r0 = projection.rotate();
    const r1 = [-center[0], -center[1]];
    const iv = d3.interpolate(r0, [r1[0], clampPhi(r1[1])]);
    const t = d3.timer((el) => {
      const k = Math.min(1, el / 900);
      projection.rotate(iv(d3.easeCubicInOut(k)));
      draw();
      if (k >= 1) { t.stop(); if (cb) cb(); }
    });
  }

  const api = {
    init() {
      size();
      projection.rotate([-activeVector.center[0], -clampPhi(activeVector.center[1])]);
      draw();
      startAuto();
      if (window.ResizeObserver) new ResizeObserver(() => { size(); draw(); }).observe(shell);
    },
    setVector(v) { size(); rotateTo(v.center); draw(); },
    refresh() { draw(); }
  };
  return api;
}

function showFallback() {
  const fb = document.getElementById('vectorFallback');
  if (fb) fb.hidden = false;
  const svg = document.getElementById('vectorGlobe');
  if (svg) svg.style.display = 'none';
}

/* ── Boot ─────────────────────────────────────────────────────────────────── */
renderControls();
updatePanel();
updateCaption();

(function boot() {
  if (!window.d3 || !window.topojson) { showFallback(); return; }
  const url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json';
  fetch(url)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(topo => {
      const land = topojson.feature(topo, topo.objects.land);
      globe = buildGlobe(land);
      if (globe) globe.init(); else showFallback();
    })
    .catch(() => showFallback());
})();
