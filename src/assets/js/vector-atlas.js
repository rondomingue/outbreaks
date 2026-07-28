const VECTOR_MAPBOX_TOKEN = "pk.eyJ1Ijoicm9uZG9taW5ndWUiLCJhIjoiYTM4ODdRdyJ9.jcyNgQQolgrKfs6SKBXNJw";

const ERAS = [
  { key: 'antiquity', label: 'Antiquity', date: '430 BCE' },
  { key: 'trade', label: 'Trade age', date: '1300-1800' },
  { key: 'colonial', label: 'Colonial ports', date: '1800-1950' },
  { key: 'jet', label: 'Jet age', date: '1950-2000' },
  { key: 'now', label: 'Surveillance', date: '2000-today' }
];

const VECTORS = [
  {
    key: 'mosquito',
    label: 'Mosquito',
    color: '#e4572e',
    deck: 'Warm-water urbanization, ports, rainfall, and peri-domestic breeding sites carry malaria, yellow fever, dengue, chikungunya, and Zika.',
    center: [17, 4],
    zoom: 1.58,
    sites: [
      { name: 'Amazon Basin', place: 'Malaria frontier', coord: [-62, -4], note: 'Forest edge settlement and river mobility keep malaria transmission persistent.' },
      { name: 'West African Coast', place: 'Yellow fever belt', coord: [-1, 7], note: 'Ports, mosquitoes, and unvaccinated populations shaped repeated urban outbreaks.' },
      { name: 'Southeast Asia', place: 'Dengue urban range', coord: [103, 14], note: 'Dense cities and Aedes mosquitoes sustain repeated dengue cycles.' },
      { name: 'Caribbean ports', place: 'Yellow fever corridor', coord: [-75, 19], note: 'Shipping and Aedes aegypti carried yellow fever through Atlantic port networks.' }
    ],
    routes: [
      { name: 'Atlantic yellow fever circuit', from: [-75, 19], to: [-1, 7] },
      { name: 'Dengue urban belt', from: [103, 14], to: [78, 21] },
      { name: 'Amazon river mobility', from: [-72, -8], to: [-49, -1] }
    ]
  },
  {
    key: 'flea',
    label: 'Flea',
    color: '#e3b23c',
    deck: 'Rodent-flea-plague systems move through grain storage, caravan corridors, ports, and disturbed rodent ecologies.',
    center: [58, 36],
    zoom: 1.65,
    sites: [
      { name: 'Tien Shan', place: 'Plague origin signal', coord: [76, 42], note: 'Genomic work points toward Central Asian plague diversity and medieval spread.' },
      { name: 'Black Sea ports', place: 'Second pandemic route', coord: [35, 45], note: 'Maritime trade helped carry plague into Mediterranean and European cities.' },
      { name: 'Madagascar highlands', place: 'Modern endemic focus', coord: [47, -19], note: 'Seasonal plague persists through rodent and flea cycles.' },
      { name: 'American Southwest', place: 'Sylvatic plague', coord: [-107, 35], note: 'Prairie dog and wild rodent systems maintain enzootic plague.' }
    ],
    routes: [
      { name: 'Silk Road plague corridor', from: [76, 42], to: [35, 45] },
      { name: 'Maritime plague spread', from: [35, 45], to: [12, 43] },
      { name: 'Indian Ocean plague circuit', from: [47, -19], to: [73, 19] }
    ]
  },
  {
    key: 'bat',
    label: 'Bat',
    color: '#7565bd',
    deck: 'Bat-associated spillovers concentrate where roosts, mines, forests, farms, and clinical systems intersect.',
    center: [28, 1],
    zoom: 2.05,
    sites: [
      { name: 'Albertine Rift', place: 'Ebola / Marburg edge', coord: [30, 0], note: 'Mines, forests, and cross-border travel shape filovirus response geography.' },
      { name: 'Kitum Cave', place: 'Marburg exposure', coord: [35, 0.4], note: 'Historic Marburg cases linked to cave exposure around Mount Elgon.' },
      { name: 'Nipah belt', place: 'Fruit bat interface', coord: [90, 23], note: 'Fruit bats, date palm sap, pigs, and farms form different transmission pathways.' },
      { name: 'West African forest zone', place: 'Ebola emergence', coord: [-10, 8], note: 'Forest disturbance and clinical amplification shaped Ebola history.' }
    ],
    routes: [
      { name: 'Rift Valley filovirus corridor', from: [30, 0], to: [35, 0.4] },
      { name: 'Nipah agricultural interface', from: [90, 23], to: [101, 3] },
      { name: 'West-to-Central forest belt', from: [-10, 8], to: [12, 0] }
    ]
  },
  {
    key: 'rodent',
    label: 'Rodent',
    color: '#33a58a',
    deck: 'Rodent-borne infections follow food storage, housing quality, field labor, rainfall pulses, and occupational exposure.',
    center: [-18, 11],
    zoom: 1.9,
    sites: [
      { name: 'Lassa belt', place: 'Mastomys reservoir', coord: [7, 9], note: 'West African rodent-human contact drives persistent Lassa risk.' },
      { name: 'Four Corners', place: 'Hantavirus ecology', coord: [-109, 36], note: 'Rainfall and deer mouse population pulses preceded known hantavirus clusters.' },
      { name: 'Pampas', place: 'Arenavirus range', coord: [-61, -34], note: 'Agricultural landscapes overlap with rodent-borne hemorrhagic fever risk.' },
      { name: 'Sahel grain belt', place: 'Food storage interface', coord: [1, 14], note: 'Storage, housing, and seasonal rodent movement shape exposure.' }
    ],
    routes: [
      { name: 'Lassa regional belt', from: [-12, 8], to: [10, 10] },
      { name: 'Southwest rodent pulse', from: [-112, 34], to: [-104, 38] },
      { name: 'Pampas agricultural range', from: [-65, -36], to: [-57, -32] }
    ]
  },
  {
    key: 'livestock',
    label: 'Livestock',
    color: '#c2813a',
    deck: 'Animal production, markets, slaughter, and herding routes create repeated opportunities for zoonotic exchange.',
    center: [45, 22],
    zoom: 1.65,
    sites: [
      { name: 'Arabian Peninsula', place: 'MERS camel interface', coord: [45, 24], note: 'Camel contact and healthcare amplification shaped MERS geography.' },
      { name: 'Nile Valley', place: 'Rift Valley fever', coord: [31, 26], note: 'Livestock, floodwater mosquitoes, and markets create outbreak windows.' },
      { name: 'Mekong poultry belt', place: 'Avian influenza', coord: [105, 16], note: 'Live bird markets and dense poultry production sustain monitoring risk.' },
      { name: 'Sahel pastoral routes', place: 'Herd mobility', coord: [17, 15], note: 'Seasonal herd movement can link animal and human health signals.' }
    ],
    routes: [
      { name: 'Camel trade and care corridor', from: [45, 24], to: [39, 21] },
      { name: 'Nile livestock-floodplain', from: [31, 26], to: [32, 12] },
      { name: 'Mekong poultry market belt', from: [105, 16], to: [107, 10] }
    ]
  },
  {
    key: 'travel',
    label: 'Human travel',
    color: '#d9d4c5',
    deck: 'Air routes, migration, displacement, and pilgrimage networks move pathogens faster than ecological ranges alone.',
    center: [5, 24],
    zoom: 1.42,
    sites: [
      { name: 'Global air hubs', place: 'Respiratory spread', coord: [0, 51], note: 'Dense air networks compress travel time for influenza, COVID-19, and measles sparks.' },
      { name: 'Hajj routes', place: 'Mass gathering health', coord: [39.8, 21.4], note: 'Pilgrimage health systems manage meningitis, respiratory infection, and heat risk.' },
      { name: 'Mediterranean displacement', place: 'Interrupted care', coord: [20, 36], note: 'Displacement changes vaccine access, surveillance, and outbreak response.' },
      { name: 'Pacific air bridge', place: 'Measles importation', coord: [-157, 21], note: 'Travel-linked measles sparks reveal local immunity gaps.' }
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
let map;

function arcLine(from, to) {
  const steps = 48;
  const coords = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const lng = from[0] + (to[0] - from[0]) * t;
    const lat = from[1] + (to[1] - from[1]) * t + Math.sin(Math.PI * t) * 10;
    coords.push([lng, lat]);
  }
  return coords;
}

function featuresFor(vector) {
  const points = vector.sites.map(site => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: site.coord },
    properties: { kind: 'site', name: site.name, place: site.place, note: site.note, vector: vector.label }
  }));
  const routes = vector.routes.map(route => ({
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: arcLine(route.from, route.to) },
    properties: { kind: 'route', name: route.name, vector: vector.label }
  }));
  return { points, routes };
}

function renderControls() {
  const vectorHost = document.getElementById('vectorButtons');
  const eraHost = document.getElementById('eraButtons');
  vectorHost.innerHTML = VECTORS.map(vector => `
    <button class="vector-btn${vector.key === activeVector.key ? ' is-active' : ''}" type="button" data-vector="${vector.key}">
      <span class="vector-dot" style="color:${vector.color};background:${vector.color}"></span>
      <span class="vector-name">${vector.label}</span>
      <span class="vector-count">${vector.sites.length} sites</span>
    </button>
  `).join('');
  eraHost.innerHTML = ERAS.map(era => `
    <button class="era-btn${era.key === activeEra.key ? ' is-active' : ''}" type="button" data-era="${era.key}">
      <span class="era-name">${era.label}</span>
      <span class="era-date">${era.date}</span>
    </button>
  `).join('');

  vectorHost.querySelectorAll('[data-vector]').forEach(button => {
    button.addEventListener('click', () => {
      activeVector = VECTORS.find(vector => vector.key === button.dataset.vector) || activeVector;
      updateAtlas();
    });
  });
  eraHost.querySelectorAll('[data-era]').forEach(button => {
    button.addEventListener('click', () => {
      activeEra = ERAS.find(era => era.key === button.dataset.era) || activeEra;
      updateAtlas();
    });
  });
}

function updatePanel() {
  const card = document.getElementById('selectedCard');
  const status = document.getElementById('atlasStatus');
  card.innerHTML = `
    <span class="control-label">Selected system</span>
    <h2 class="disp">${activeVector.label} systems</h2>
    <p>${activeVector.deck}</p>
  `;
  status.textContent = `${activeVector.label} layer · ${activeEra.label.toLowerCase()} lens`;
}

function updateMap() {
  if (!map) return;
  const data = featuresFor(activeVector);
  const pointSource = map.getSource('vector-sites');
  const routeSource = map.getSource('vector-routes');
  if (pointSource) pointSource.setData({ type: 'FeatureCollection', features: data.points });
  if (routeSource) routeSource.setData({ type: 'FeatureCollection', features: data.routes });
  if (map.getLayer('vector-routes')) map.setPaintProperty('vector-routes', 'line-color', activeVector.color);
  if (map.getLayer('vector-sites')) {
    map.setPaintProperty('vector-sites', 'circle-color', activeVector.color);
    map.setPaintProperty('vector-sites', 'circle-stroke-color', activeVector.color);
  }
  map.easeTo({ center: activeVector.center, zoom: activeVector.zoom, duration: 700 });
}

function updateAtlas() {
  renderControls();
  updatePanel();
  updateMap();
}

function popupHTML(props) {
  return `
    <div class="atlas-pop">
      <span>${props.vector} ${props.kind === 'route' ? 'route' : 'site'}</span>
      <h3>${props.name}</h3>
      <p>${props.note || props.place || 'Transmission corridor'}</p>
    </div>
  `;
}

function initMap() {
  const fallback = document.getElementById('vectorFallback');
  if (typeof mapboxgl === 'undefined' || !/^pk\./.test(VECTOR_MAPBOX_TOKEN)) {
    fallback.hidden = false;
    return;
  }

  mapboxgl.accessToken = VECTOR_MAPBOX_TOKEN;
  map = new mapboxgl.Map({
    container: 'vectorMap',
    style: 'mapbox://styles/mapbox/dark-v11',
    projection: 'globe',
    center: activeVector.center,
    zoom: activeVector.zoom,
    minZoom: 1,
    maxZoom: 8,
    attributionControl: true
  });
  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

  map.on('style.load', () => {
    try {
      map.setFog({
        color: 'rgba(18,26,23,0.72)',
        'high-color': 'rgba(51,165,138,0.12)',
        'horizon-blend': 0.22,
        'space-color': '#080b0a',
        'star-intensity': 0.05
      });
    } catch (err) {}
  });

  map.on('load', () => {
    const data = featuresFor(activeVector);
    map.addSource('vector-routes', { type: 'geojson', data: { type: 'FeatureCollection', features: data.routes } });
    map.addSource('vector-sites', { type: 'geojson', data: { type: 'FeatureCollection', features: data.points } });
    map.addLayer({
      id: 'vector-routes',
      type: 'line',
      source: 'vector-routes',
      paint: {
        'line-color': activeVector.color,
        'line-width': 2,
        'line-opacity': .56,
        'line-blur': .4
      }
    });
    map.addLayer({
      id: 'vector-sites',
      type: 'circle',
      source: 'vector-sites',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 5, 5, 10],
        'circle-color': activeVector.color,
        'circle-opacity': .34,
        'circle-stroke-color': activeVector.color,
        'circle-stroke-width': 1.5,
        'circle-stroke-opacity': .9
      }
    });

    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 12 });
    map.on('mouseenter', 'vector-sites', event => {
      map.getCanvas().style.cursor = 'pointer';
      const feature = event.features && event.features[0];
      if (!feature) return;
      popup.setLngLat(feature.geometry.coordinates).setHTML(popupHTML(feature.properties)).addTo(map);
    });
    map.on('mouseleave', 'vector-sites', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
    map.on('click', 'vector-sites', event => {
      const feature = event.features && event.features[0];
      if (!feature) return;
      document.getElementById('selectedCard').innerHTML = `
        <span class="control-label">${feature.properties.vector} site</span>
        <h2 class="disp">${feature.properties.name}</h2>
        <p>${feature.properties.note}</p>
      `;
    });
  });
}

renderControls();
updatePanel();
initMap();
