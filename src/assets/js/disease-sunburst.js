/* ════ DATA ═════════════════════════════════════════════════════════════════ */
const DATA = [
  {
    name:'VIRAL', itemStyle:{color:'#c84038'},
    children:[
      { name:'Smallpox', deaths:'300–500 million', period:'900s–1980',
        note:'The single deadliest infectious disease in recorded history. Killed an estimated 300M in the 20th century alone. Declared eradicated by WHO in 1980 — the only human disease deliberately eliminated by science.',
        cfr:'30% (major)', vax:'Yes — 1796 (Jenner)', first:'Ancient Egypt', status:'Eradicated 1980',
        children:[{name:'Medieval\n900–1500',value:20},{name:'Early Modern\n1500–1800',value:28},{name:'Industrial\n1800–1900',value:16},{name:'20th Century\n1900–1980',value:26}]},
      { name:'Measles', deaths:'~200 million', period:'1000s–present',
        note:'R₀ of 12–18 — the most contagious pathogen known. Responsible for a significant portion of deaths during European colonisation of the Americas. The 1963 vaccine is among the highest-impact public health interventions in history.',
        cfr:'<1% (vaccinated)\n30% (malnourished)', vax:'Yes — 1963 (Enders)', first:'~900 CE (Rhazes)', status:'Endemic · vaccine-preventable',
        children:[{name:'Pre-1500',value:10},{name:'Colonial\n1500–1800',value:18},{name:'Pre-vaccine\n1800–1963',value:22},{name:'Post-vaccine\n1963–present',value:8}]},
      { name:'Influenza', deaths:'~100 million', period:'14th century–present',
        note:'The 1918 Spanish Flu killed 50–100M in 18 months — more than four years of WWI combat. Novel strains emerge when avian or swine viruses reassort with human strains.',
        cfr:'<0.1% (seasonal)\n2.5% (1918)', vax:'Yes — 1945 (updated annually)', first:'1580 (probable)', status:'Endemic + pandemic risk',
        children:[{name:'Spanish Flu\n1918',value:26},{name:'Asian Flu\n1957',value:8},{name:'Hong Kong\n1968',value:8},{name:'H1N1 2009',value:5},{name:'Seasonal\n(cumulative)',value:14}]},
      { name:'HIV/AIDS', deaths:'~43 million', period:'1980–present',
        note:'Zoonotic origin: SIV from chimpanzees in central Africa, first human infection ~1920s. Antiretroviral therapy transformed a terminal diagnosis into a chronic manageable condition.',
        cfr:'~100% (untreated)\n~0% (ART)', vax:'None approved', first:'~1920s · 1981 (identified)', status:'Global pandemic · ongoing',
        children:[{name:'1980s',value:6},{name:'1990s',value:13},{name:'2000s peak',value:11},{name:'2010s–present',value:5}]},
      { name:'COVID-19', deaths:'7–20 million', period:'2019–present',
        note:'SARS-CoV-2, a betacoronavirus. Official toll ~7M; excess mortality studies suggest 15–20M. The fastest vaccine development in history — under 12 months to authorization via mRNA platform.',
        cfr:'~1% overall\n~20% elderly, unvax', vax:'Yes — 2020 (mRNA)', first:'Late 2019 (Wuhan)', status:'Endemic globally',
        children:[{name:'2020 First Wave',value:7},{name:'2021 Delta',value:9},{name:'2022–present',value:6}]},
      { name:'Yellow Fever', deaths:'~2 million', period:'17th century–present',
        note:'The 1793 Philadelphia epidemic killed 10% of the city. The 17D vaccine (1937) is one of the most effective ever developed, providing lifelong immunity from a single dose.',
        cfr:'3–7.5% (severe)', vax:'Yes — 1937 (17D)', first:'1648 (Yucatán)', status:'Endemic · vaccine-preventable',
        children:[{name:'Caribbean\n1648–1800',value:7},{name:'Americas/Africa\n1800–1900',value:5},{name:'Contemporary',value:5}]},
      { name:'Polio', deaths:'~1 million', period:'19th–20th century',
        note:'The 1952 US epidemic paralysed 57,628 people in one year. Salk\'s 1955 vaccine was greeted with almost religious national celebration. Near-eradication: only 2 countries retain wild poliovirus.',
        cfr:'<1% mortality\n~1% paralysis', vax:'Yes — 1955 (Salk IPV)', first:'1789 (first clinical)', status:'Near-eradication · 2 countries',
        children:[{name:'Pre-vaccine\n1894–1955',value:8},{name:'Post-vaccine\n1955–present',value:3}]},
      { name:'Ebola', deaths:'~16,000', period:'1976–present',
        note:'Orthoebolavirus. The 2014–16 West Africa outbreak (28,600 cases, 11,300 deaths) was the largest in history. Current PHEIC is Bundibugyo virus — no vaccine, no approved treatment.',
        cfr:'25–90% (species)', vax:'Yes — but Zaire only', first:'1976 (Yambuku, DRC)', status:'PHEIC 2025–26 (BDBV)',
        children:[{name:'1976–2013',value:5},{name:'West Africa\n2014–16',value:5},{name:'DRC/Uganda\n2018–present',value:5}]},
      { name:'Marburg', deaths:'~1,000', period:'1967–present',
        note:'Orthomarburgvirus. Reservoir: Egyptian fruit bat — the only filovirus with a confirmed reservoir. Deadliest outbreak: Angola 2004–05 (374 cases, 88% CFR). No licensed vaccine.',
        cfr:'24–88%', vax:'None approved', first:'1967 (Marburg, Germany)', status:'Ongoing · Ethiopia 2025–26',
        children:[{name:'1967–2004',value:5},{name:'2004–2026',value:5}]},
      { name:'Dengue', deaths:'~500,000', period:'18th century–present',
        note:'Four serotypes; second infection can trigger severe haemorrhagic disease. ~400M infections annually. Climate change is actively expanding the Aedes mosquito\'s range northward.',
        cfr:'<1% treated\n~20% severe untreated', vax:'Qdenga · Dengvaxia (restricted)', first:'1779 (Cairo/Jakarta)', status:'Global endemic · expanding',
        children:[{name:'Pre-2000',value:5},{name:'2000–present',value:6}]},
      { name:'Rabies', deaths:'~2 million', period:'1000–present',
        note:'>99.9% CFR once symptomatic without treatment. ~59,000 people die annually, almost all from dog bites in Asia and Africa — a 100% preventable death in every case.',
        cfr:'>99% symptomatic\nuntreated', vax:'Yes — 1885 (Pasteur, PEP)', first:'Antiquity', status:'Endemic · fully preventable',
        children:[{name:'Historical\n1000–1900',value:8},{name:'Modern era',value:5}]},
    ]
  },
  {
    name:'BACTERIAL', itemStyle:{color:'#b87818'},
    children:[
      { name:'Tuberculosis', deaths:'~200 million', period:'1000–present',
        note:'"The White Plague." M. tuberculosis infects ~25% of the global population latently. Peaked in the 19th-century Industrial Revolution. Streptomycin (1943) was the first effective treatment. Drug-resistant TB (MDR/XDR) is a growing crisis.',
        cfr:'50–80% (untreated)', vax:'BCG (partial, variable)', first:'Ancient — 9,000-year-old DNA', status:'~1.6M deaths/yr · ongoing',
        children:[{name:'Medieval\n1000–1600',value:12},{name:'Industrial\n1700–1900',value:22},{name:'Pre-antibiotic\n1900–1950',value:18},{name:'Drug-resistant\n1950–present',value:10}]},
      { name:'Plague\n(Y. pestis)', deaths:'150–250 million', period:'541 CE–1950s',
        note:'Three great plague pandemics, all caused by Yersinia pestis, confirmed by ancient DNA. The First Pandemic (Justinian\'s, 541 CE) killed 25–50M and weakened the Byzantine Empire. The Black Death (1347–53) killed 30–60% of Europe. The Third Pandemic (1855–1959) was the source of modern plague science. Treatable today with doxycycline.',
        cfr:'30–100% (form)', vax:'None for general use', first:'541 CE (Byzantine Empire, Justinian)', status:'Endemic rodents · ~2K cases/yr',
        children:[{name:'Justinian\'s Plague\n541–750 CE',value:19},{name:'Black Death\n1347–1353',value:22},{name:'Recurring\n1353–1800',value:14},{name:'Third Pandemic\n1855–1959',value:10}]},
      { name:'Cholera', deaths:'~40 million', period:'1817–present',
        note:'Seven pandemics since 1817. John Snow\'s 1854 investigation founded epidemiology. Oral rehydration salts cut case fatality from 50% to under 1% — one of the most cost-effective interventions in medicine.',
        cfr:'50% untreated\n<1% (ORS)', vax:'Yes (oral, moderate)', first:'1817 (India)', status:'7th pandemic ongoing',
        children:[{name:'Pandemics 1–3\n1817–1866',value:12},{name:'Pandemics 4–6\n1881–1923',value:12},{name:'7th Pandemic\n1961–present',value:10}]},
      { name:'Typhus', deaths:'~15 million', period:'15th century–present',
        note:'Rickettsia prowazekii, spread by body lice. A war disease: killed more soldiers than combat. Napoleon\'s 1812 retreat from Moscow was largely a typhus rout. Anne Frank died of typhus in Bergen-Belsen, February 1945.',
        cfr:'10–40% (untreated)', vax:'No longer used', first:'1489 (Granada, Spain)', status:'Sporadic · conflict zones',
        children:[{name:'Pre-1800',value:9},{name:'Napoleonic & WWI',value:8},{name:'WWII & post-war',value:8}]},
      { name:'Typhoid', deaths:'~25 million', period:'1000–present',
        note:'Salmonella typhi via contaminated water. "Typhoid Mary" Mallon was an asymptomatic carrier who infected 51 people in New York. The disease killed Prince Albert (1861) and possibly Lincoln\'s son Willie (1862).',
        cfr:'10–30% (untreated)', vax:'Yes (moderate efficacy)', first:'430 BCE (Athens, probable)', status:'Endemic in low-income countries',
        children:[{name:'Medieval\n1000–1800',value:12},{name:'Industrial\n1800–1950',value:10},{name:'Contemporary',value:7}]},
      { name:'Syphilis', deaths:'~15 million', period:'1495–present',
        note:'First epidemic in Europe recorded 1495, after Columbus\'s return. A driving force behind early STI research and Salvarsan (1910) — the first modern chemotherapeutic drug.',
        cfr:'8–58% (tertiary\nuntreated)', vax:'None', first:'1495 (Naples)', status:'Rising globally · treatable',
        children:[{name:'Great Pox\n1495–1600',value:8},{name:'18th–19th century',value:8},{name:'Modern era',value:9}]},
      { name:'Leprosy', deaths:'~10 million', period:'1000–present',
        note:'Medieval societies built networks of dedicated leprosaria across Europe. Stigmatised for millennia. Multi-drug therapy (1982) can cure it; ~200,000 new cases annually — the lowest in recorded history.',
        cfr:'<1% (direct mortality)', vax:'BCG (partial)', first:'4th century BCE (India)', status:'Declining · near elimination',
        children:[{name:'Medieval peak\n1000–1350',value:10},{name:'Modern era',value:6}]},
    ]
  },
  {
    name:'PARASITIC', itemStyle:{color:'#1e7860'},
    children:[
      { name:'Malaria', deaths:'~500 million', period:'1000–present',
        note:'The single largest killer of humans in recorded history. Estimated 1–3 million annual deaths as recently as the 1990s. The RTS,S vaccine, approved by WHO in 2021 after 30 years of development, showed 75% efficacy in children.',
        cfr:'0.1–20% (P. falciparum)', vax:'Yes — RTS,S 2021 (first)', first:'~70,000 BCE', status:'~600K deaths/yr · ongoing',
        children:[{name:'Medieval\n1000–1600',value:20},{name:'Colonial\n1600–1850',value:22},{name:'Industrial\n1850–1950',value:26},{name:'Contemporary\n1950–present',value:18}]},
      { name:'Sleeping Sickness', deaths:'~1 million', period:'19th–20th century',
        note:'Trypanosoma brucei, tsetse fly. A colonial epidemic in Uganda (1900–1906) killed ~60% of the population along lake shores. Treatment remained arsenic-based until the 21st century.',
        cfr:'Near 100% (untreated)', vax:'None', first:'1902 (first confirmed)', status:'Near-elimination in progress',
        children:[{name:'Colonial\n1900–1920',value:7},{name:'Later waves',value:6}]},
      { name:'Leishmaniasis', deaths:'~2 million', period:'1000–present',
        note:'Three clinical forms; visceral (kala-azar) is near-universally fatal untreated. Endemic in 98 countries. Disproportionately affects the poorest populations with the least access to treatment.',
        cfr:'Near 100% (visceral)', vax:'None for humans', first:'7th century BCE tablets', status:'Neglected tropical disease',
        children:[{name:'Historical\n1000–1900',value:7},{name:'Modern era',value:6}]},
      { name:'Schistosomiasis', deaths:'~1 million', period:'1000–present',
        note:'Second most widespread parasitic disease after malaria. ~200M currently infected. Chronic infection causes organ damage, anaemia, and cognitive impairment in children.',
        cfr:'<1% acute', vax:'None', first:'Ancient Egypt (mummies)', status:'~240M infected · endemic',
        children:[{name:'Historical',value:6},{name:'Modern era',value:5}]},
    ]
  },
  {
    name:'OTHER', itemStyle:{color:'#504898'},
    children:[
      { name:'Antonine Plague', deaths:'5–10 million', period:'165–180 CE',
        note:'Struck the Roman Empire under Marcus Aurelius, arriving with troops returning from Parthia. Likely smallpox or measles meeting a fully susceptible population. Killed co-emperor Lucius Verus. Marcus Aurelius wrote the Meditations during this plague.',
        cfr:'Est. 25–30%', vax:'N/A', first:'165 CE (Seleucia, Mesopotamia)', status:'Historical · likely smallpox or measles',
        children:[{name:'Roman Empire\n165–180 CE',value:14}]},
      { name:'Plague of Cyprian', deaths:'~15 million', period:'249–262 CE',
        note:'Up to 5,000 deaths per day in Rome at its peak. Possibly the deadliest per-capita epidemic in Roman history. Etiology unknown — proposed candidates include viral hemorrhagic fever. Hastened the Crisis of the Third Century.',
        cfr:'Unknown · catastrophic', vax:'N/A', first:'249 CE (Alexandria, Egypt)', status:'Historical · etiology unresolved',
        children:[{name:'Roman Empire\n249–262 CE',value:17}]},
      { name:'Sweating Sickness', deaths:'~100,000', period:'1485–1551',
        note:'"Merry at dinner, dead at supper." Five epidemic waves; vanished after 1551 without explanation. Unknown etiology. Primarily affected England. Killed thousands of aristocrats and clergy.',
        cfr:'Est. 30–50%', vax:'N/A', first:'1485 (England)', status:'Extinct — cause unknown',
        children:[{name:'Five epidemics\n1485–1551',value:7}]},
      { name:'Ergotism', deaths:'~100,000', period:'857–1800',
        note:'"St. Anthony\'s Fire." Caused by Claviceps purpurea fungus on rye. Historians have connected ergot outbreaks to the Salem witch trials and medieval dancing plagues.',
        cfr:'Est. 10–40%', vax:'N/A', first:'857 CE (Rhine Valley)', status:'Eliminated (food inspection)',
        children:[{name:'Medieval\n857–1500',value:7},{name:'Early Modern\n1500–1800',value:5}]},
      { name:'Plague of Athens', deaths:'~75,000', period:'430–426 BCE',
        note:'Thucydides\' account is the earliest clinical pandemic description in history. A 2006 aDNA study found evidence consistent with typhoid. Killed ~25% of Athens including Pericles.',
        cfr:'Est. 25%', vax:'N/A', first:'430 BCE', status:'Historical · etiology debated',
        children:[{name:'Athens\n430–426 BCE',value:6}]},
      { name:'Prion Diseases', deaths:'~50,000', period:'20th century–present',
        note:'Kuru spread through funerary cannibalism; studied by Gajdusek (Nobel 1976). The vCJD/BSE crisis (1990s UK) killed 178 people but triggered global panic.',
        cfr:'100%', vax:'None', first:'Kuru described 1957', status:'Rare · CJD ~1/million/yr',
        children:[{name:'Kuru\n1950s–2000s',value:5},{name:'vCJD/BSE\n1990s–2000s',value:5}]},
    ]
  }
];

function equalizeData(n){ if(!n.children) return {...n,value:10}; return {...n,children:n.children.map(equalizeData)}; }
const DATA_EQUAL = DATA.map(equalizeData);

/* Subtle per-leaf color variants so the outer ring isn't a single flat band.
   Shifts are small — hue ±8°, lightness ±10% — enough to be visible, not garish. */
const LEAF_SHADES = {
  VIRAL:     ['#d44838','#c84040','#be3848','#c84838','#d05040','#b83048','#c44040','#d44030','#bc3840','#c85040','#b83848'],
  BACTERIAL: ['#cc8e20','#b87818','#c27820','#a86810','#d09020','#b06018','#c08020','#aa7010'],
  PARASITIC: ['#24886a','#1e7860','#187058','#226870','#2a8068','#1a7050','#208868'],
  OTHER:     ['#5848a8','#4838a8','#604898','#5040b0','#6850a0'],
};

// Convert hex color to "r,g,b" string for rgba() use
function hexRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

function colorizeData(data) {
  const counters = {VIRAL:0, BACTERIAL:0, PARASITIC:0, OTHER:0};
  return data.map(classNode => {
    const cls = classNode.name.replace(/\n.*/,'');
    const shades = LEAF_SHADES[cls] || [];
    const newDiseases = (classNode.children||[]).map(disease => {
      const diseaseColor = shades[counters[cls] % shades.length];
      counters[cls]++;
      const newEras = (disease.children||[]).map((era, i) => {
        const shade = shades[(counters[cls] + i) % shades.length];
        if (!shade) return era;
        const rgb = hexRgb(shade);
        // Older eras = more transparent, newer = slightly more visible
        // Creates a temporal gradient reading oldest→newest within each disease
        const timeAlpha = [0.04, 0.08, 0.13, 0.19];
        const alpha = timeAlpha[Math.min(i, timeAlpha.length - 1)];
        return {
          ...era,
          itemStyle: {
            color: `rgba(${rgb},${alpha})`,
          },
          emphasis: {
            itemStyle: {
              opacity: 1,
              color: `rgba(${rgb},0.52)`,
            }
          }
        };
      });
      return diseaseColor
        ? {...disease, itemStyle:{color:diseaseColor}, children: newEras}
        : {...disease, children: newEras};
    });
    return {...classNode, children: newDiseases};
  });
}

const DATA_COLORED  = colorizeData(DATA);
const DATA_EQUAL_C  = colorizeData(DATA_EQUAL);

/* ════ CHART INIT ════════════════════════════════════════════════════════════ */
const chartEl = document.getElementById('chart');
const chart = echarts.init(chartEl, null, {renderer:'canvas'});

const CLASS_COLORS = {VIRAL:'#c84038', BACTERIAL:'#b87818', PARASITIC:'#1e7860', OTHER:'#504898'};
const DATA_FONT = "'DIN Condensed', 'DIN Alternate', Bahnschrift, 'Aptos Narrow', 'Roboto Condensed', 'Arial Narrow', sans-serif";
const DATA_FONT_LIGHT = "'DIN Condensed Light', 'DIN Alternate Light', Bahnschrift Light, 'Aptos Narrow', 'Roboto Condensed', 'Arial Narrow', sans-serif";
let activeData = DATA_COLORED;

function buildOption(data) {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      show: false  // we use our own panel
    },
    series:[{
      type:'sunburst',
      data,
      z: 3,
      radius:['24%','76%'],
      center:['50%','50%'],
      sort:null,
      nodeClick: false,
      animationDuration: 600,
      animationEasing: 'cubicOut',
      animationDurationUpdate: 480,
      animationEasingUpdate: 'cubicInOut',
      emphasis:{
        focus:'relative',
        scale:false,
        label:{
          fontSize:8,
          textBorderWidth:0,
          textShadowBlur:0,
        },
        itemStyle:{
          shadowBlur:18,
          shadowOffsetX:5,
          shadowOffsetY:9,
          shadowColor:'rgba(0,0,0,.42)',
        }
      },
      label:{
        fontFamily:DATA_FONT_LIGHT,
        fontWeight:300,
        textBorderWidth:0,
        silent:false,
      },
      itemStyle:{
        borderColor:'rgba(255,255,255,.08)',
        borderWidth:0,
      },
      levels:[
        {},
        { // Class ring
          r0:'24%', r:'37%',
          label:{ show:false },
          emphasis:{
            itemStyle:{color:'rgba(3,5,7,0)', opacity:0}
          },
          itemStyle:{color:'rgba(3,5,7,0)', opacity:0, borderWidth:0}
        },
        { // Disease ring
          r0:'37%', r:'61%',
          label:{
            show:true,
            rotate:'radial',
            fontSize:10,
            fontFamily:DATA_FONT_LIGHT,
            fontWeight:300,
            letterSpacing:0.2,
            color:'rgba(248,250,255,.96)',
            align:'right',
            overflow:'none',
            textShadowBlur:0,
            textBorderWidth:0,
          },
          emphasis:{
            label:{
              show:true,
              color:'rgba(255,255,255,1)',
              fontWeight:500,
              textBorderWidth:0,
            }
          },
          itemStyle:{opacity:.9, borderWidth:0}
        },
        { // Era ring — transparent fill, year labels pushed inside the ring
          r0:'61%', r:'82%',
          label:{
            show:true,
            position:'inside',
            rotate:'radial',
            fontSize:8,
            fontFamily:DATA_FONT_LIGHT,
            fontWeight:300,
            letterSpacing:0.2,
            color:'rgba(210,220,248,.78)',
            minAngle:3,
            overflow:'truncate',
            width:100,
            textBorderWidth:0,
            textShadowBlur:0,
            formatter: params => ((params.data && params.data.name) || params.name || '').replace(/\n/g,' '),
          },
          emphasis:{
            label:{
              show:true,
              position:'inside',
              rotate:'radial',
              fontSize:8.5,
              fontFamily:DATA_FONT_LIGHT,
              fontWeight:400,
              color:'rgba(235,240,255,.92)',
              overflow:'truncate',
              width:110,
              textBorderWidth:0,
              textShadowBlur:0,
            }
          },
          labelLine:{
            show:false,
          },
          itemStyle:{color:'rgba(3,5,7,0)', opacity:1, borderWidth:0}
        }
      ]
    }]
  };
}

chart.setOption(buildOption(activeData));

/* ════ DECORATIVE GRAPHIC LAYER ══════════════════════════════════════════════ */
function nodeValue(node) {
  if (!node.children || !node.children.length) return node.value || 0;
  return node.children.reduce((sum, child) => sum + nodeValue(child), 0);
}

function segmentBoundaries(data, depth) {
  const total = data.reduce((sum, node) => sum + nodeValue(node), 0);
  let cursor = -90;
  const boundaries = [];

  data.forEach(classNode => {
    const classValue = nodeValue(classNode);
    const classStart = cursor;
    const classEnd = cursor + (classValue / total) * 360;
    boundaries.push({deg: classStart, depth: 1, color: CLASS_COLORS[classNode.name] || 'rgba(180,200,255,.4)'});

    if (depth > 1) {
      let diseaseCursor = classStart;
      (classNode.children || []).forEach(disease => {
        const diseaseValue = nodeValue(disease);
        boundaries.push({deg: diseaseCursor, depth: 2, color: CLASS_COLORS[classNode.name] || 'rgba(180,200,255,.4)'});
        diseaseCursor += (diseaseValue / classValue) * (classEnd - classStart);
      });
    }

    cursor = classEnd;
  });

  return boundaries;
}

function eraClusters(data) {
  const total = data.reduce((sum, node) => sum + nodeValue(node), 0);
  let classCursor = -90;
  const clusters = [];

  data.forEach(classNode => {
    const cls = classNode.name.replace(/\n.*/,'');
    const classValue = nodeValue(classNode);
    const classStart = classCursor;
    const classEnd = classStart + (classValue / total) * 360;
    let diseaseCursor = classStart;

    (classNode.children || []).forEach(disease => {
      const diseaseValue = nodeValue(disease);
      const diseaseStart = diseaseCursor;
      const diseaseEnd = diseaseStart + (diseaseValue / classValue) * (classEnd - classStart);
      let eraCursor = diseaseStart;
      const eras = [];

      (disease.children || []).forEach(era => {
        const eraValue = nodeValue(era);
        const eraSpan = (eraValue / diseaseValue) * (diseaseEnd - diseaseStart);
        eras.push({
          deg: eraCursor + eraSpan / 2,
          span: eraSpan,
          name: era.name.replace(/\n/g, ' ')
        });
        eraCursor += eraSpan;
      });

      clusters.push({
        className: cls,
        classStart,
        classEnd,
        deg: diseaseStart + (diseaseEnd - diseaseStart) / 2,
        span: diseaseEnd - diseaseStart,
        name: disease.name.replace(/\n/g, ' '),
        color: CLASS_COLORS[cls] || 'rgba(180,200,255,.5)',
        eras
      });

      diseaseCursor = diseaseEnd;
    });

    classCursor = classEnd;
  });

  return clusters;
}

function truncateLabel(text, max = 24) {
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

function threadCurve(x1, y1, x2, y2, bend = 18) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.max(1, Math.hypot(dx, dy));
  const nx = -dy / len;
  const ny = dx / len;
  return {
    x1, y1, x2, y2,
    cpx1: mx + nx * bend,
    cpy1: my + ny * bend
  };
}

function classCollectors(clusters) {
  const byClass = new Map();
  clusters.forEach(cluster => {
    if (!byClass.has(cluster.className)) byClass.set(cluster.className, []);
    byClass.get(cluster.className).push(cluster);
  });

  return [...byClass.entries()].map(([className, items], i) => {
    const first = items[0];
    const deg = first.classStart + (first.classEnd - first.classStart) / 2;
    return {
      className,
      deg,
      offsetDir: i % 2 ? -1 : 1,
      color: CLASS_COLORS[className] || first.color,
      clusters: items
    };
  });
}

function buildDecorGraphics() {
  const w = chart.getWidth(), h = chart.getHeight();
  const cx = w * 0.50, cy = h * 0.50;  // must match ECharts center:['50%','50%']
  const base = Math.min(w,h)/2;
  const els = [];

  // Concentric rings and the center medallion live inside ECharts' graphic layer.
  // Keeping these in the same coordinate system as the sunburst avoids live/local
  // drift caused by DOM overlay sizing, browser chrome, or late font/layout passes.
  [{r:0.24, col:'rgba(180,200,255,.16)', sw:1.1},
   {r:0.37, col:'rgba(180,200,255,.07)', sw:0.7},
   {r:0.61, col:'rgba(180,200,255,.06)', sw:0.7},
   {r:0.82, col:'rgba(180,200,255,.10)', sw:0.8},
   {r:0.90, col:'rgba(180,200,255,.055)',sw:1},
   {r:0.94, col:'rgba(180,200,255,.03)', sw:0.8},
  ].forEach(({r,col,sw}) => {
    els.push({type:'circle',silent:true,z:0,
      shape:{cx, cy, r:base*r},
      style:{fill:'rgba(0,0,0,0)', stroke:col, lineWidth:sw}
    });
  });

  const medR = Math.max(54, Math.min(86, base * 0.092));
  [
    {r:medR, fill:'rgba(3,5,7,.88)', stroke:'rgba(180,200,255,.08)', lw:.8},
    {r:medR*.76, fill:'rgba(3,5,7,.42)', stroke:'rgba(180,200,255,.08)', lw:.8},
    {r:medR*.55, fill:'rgba(3,5,7,.72)', stroke:'rgba(180,200,255,.07)', lw:.8},
  ].forEach(ring => {
    els.push({type:'circle',silent:true,z:4,
      shape:{cx, cy, r:ring.r},
      style:{fill:ring.fill, stroke:ring.stroke, lineWidth:ring.lw}
    });
  });
  [
    {deg:-44, color:'rgba(200,64,56,.06)'},
    {deg:38, color:'rgba(200,64,56,.045)'},
    {deg:124, color:'rgba(184,120,24,.045)'},
    {deg:210, color:'rgba(30,120,96,.045)'},
    {deg:292, color:'rgba(80,72,152,.05)'}
  ].forEach(({deg,color}) => {
    const rad = deg * Math.PI/180;
    els.push({type:'sector',silent:true,z:4,
      shape:{cx, cy, r0:0, r:medR*.98, startAngle:rad, endAngle:rad + Math.PI*.38, clockwise:true},
      style:{fill:color}
    });
  });
  els.push({type:'circle',silent:true,z:5,
    shape:{cx, cy, r:medR*.64},
    style:{fill:'rgba(3,5,7,.34)', stroke:'rgba(180,200,255,.1)', lineWidth:.6, lineDash:[2,3]}
  });
  els.push({type:'text',silent:true,z:6,
    style:{text:'EPIDEMIC', x:cx, y:cy-medR*.18, fill:'rgba(140,155,190,.52)', font:"400 7.5px 'Space Mono', monospace", textAlign:'center', textVerticalAlign:'middle', letterSpacing:2}
  });
  els.push({type:'text',silent:true,z:6,
    style:{text:'record', x:cx, y:cy+medR*.02, fill:'rgba(208,216,238,.86)', font:"italic 300 16px 'Fraunces', serif", textAlign:'center', textVerticalAlign:'middle'}
  });
  els.push({type:'line',silent:true,z:6,
    shape:{x1:cx-medR*.18, y1:cy+medR*.2, x2:cx+medR*.18, y2:cy+medR*.2},
    style:{stroke:'rgba(200,64,56,.38)', lineWidth:.65}
  });
  els.push({type:'text',silent:true,z:6,
    style:{text:'430 BCE - 2026', x:cx, y:cy+medR*.34, fill:'rgba(100,115,150,.58)', font:"400 6.5px 'Space Mono', monospace", textAlign:'center', textVerticalAlign:'middle', letterSpacing:1.2}
  });

  // Data-driven spokes. Top-level class borders are bright; disease borders are fine wire.
  segmentBoundaries(activeData, 2).forEach(({deg, depth, color}) => {
    const rad = deg * Math.PI/180;
    const inner = base * (depth === 1 ? 0.155 : 0.245);
    const outer = base * (depth === 1 ? 0.88 : 0.78);
    const op = depth === 1 ? 0.36 : 0.105;
    els.push({type:'line',silent:true,z:1,
      shape:{x1:cx+inner*Math.cos(rad), y1:cy+inner*Math.sin(rad),
             x2:cx+outer*Math.cos(rad), y2:cy+outer*Math.sin(rad)},
      style:{stroke:depth === 1 ? color : 'rgba(180,200,255,1)', opacity:op, lineWidth:depth === 1 ? 1.1 : 0.55}
    });
    if (depth === 1) {
      [0.24, 0.37, 0.61, 0.76].forEach(r => {
        els.push({type:'circle',silent:true,z:2,
          shape:{cx:cx+base*r*Math.cos(rad), cy:cy+base*r*Math.sin(rad), r:2.4},
          style:{fill:color, opacity:.62, stroke:'rgba(3,5,7,.9)', lineWidth:1}
        });
      });
    }
  });

  const clusters = eraClusters(activeData);
  const collectors = classCollectors(clusters);
  const collectorPoints = new Map();

  collectors.forEach((collector, i) => {
    const rad = collector.deg * Math.PI/180;
    const tangent = rad + Math.PI / 2;
    const nodeR = base * 0.975;
    const offset = base * 0.034 * collector.offsetDir;
    const x = cx + nodeR * Math.cos(rad) + offset * Math.cos(tangent);
    const y = cy + nodeR * Math.sin(rad) + offset * Math.sin(tangent);
    collectorPoints.set(collector.className, {x, y});

    els.push({type:'circle',silent:true,z:3,
      shape:{cx:x, cy:y, r:2.8},
      style:{fill:collector.color, opacity:.74, stroke:'rgba(255,255,255,.18)', lineWidth:.6}
    });

    const labelR = base * 1.02;
    const labelX = cx + labelR * Math.cos(rad) + offset * Math.cos(tangent);
    const labelY = cy + labelR * Math.sin(rad) + offset * Math.sin(tangent);
    const normalized = (collector.deg + 360) % 360;
    const flip = normalized > 90 && normalized < 270;
    els.push({type:'line',silent:true,z:2,
      shape:{x1:x, y1:y, x2:labelX, y2:labelY},
      style:{stroke:collector.color, opacity:.36, lineWidth:.8}
    });
    els.push({type:'text',silent:true,z:3,
      style:{
        text:collector.className,
        fill:'rgba(240,245,255,1)',
        font:`700 14px 'Space Mono', monospace`,
        x:labelX,
        y:labelY,
        textAlign:'center',
        textVerticalAlign:'middle',
        rotation: rad + Math.PI / 2 + (flip ? Math.PI : 0),
        shadowBlur:0
      }
    });
  });

  const clusterLayouts = clusters.map((cluster, i) => {
    const rad = cluster.deg * Math.PI/180;
    const sourceR = base * 0.61;
    const hubR = base * (i % 2 ? 0.888 : 0.915);
    const labelR = base * (i % 2 ? 0.932 : 0.958);
    const normalized = (cluster.deg + 360) % 360;
    const flip = normalized > 90 && normalized < 270;
    const rotation = rad + Math.PI / 2 + (flip ? Math.PI : 0);
    const tangent = rad + Math.PI / 2;
    const hubOffset = base * 0.022 * (i % 2 ? -1 : 1);
    const hx = cx + hubR * Math.cos(rad) + hubOffset * Math.cos(tangent);
    const hy = cy + hubR * Math.sin(rad) + hubOffset * Math.sin(tangent);
    const collector = collectorPoints.get(cluster.className);
    return {cluster, i, rad, sourceR, labelR, rotation, tangent, hubOffset, hx, hy, collector};
  });

  collectors.forEach(collector => {
    const layouts = clusterLayouts.filter(layout => layout.cluster.className === collector.className);
    for (let a = 0; a < layouts.length; a++) {
      for (let b = a + 1; b < layouts.length; b++) {
        const start = layouts[a], end = layouts[b];
        els.push({type:'bezierCurve',silent:true,z:0,
          shape:threadCurve(start.hx, start.hy, end.hx, end.hy, base * (a % 2 ? -0.07 : 0.07)),
          style:{stroke:collector.color, fill:null, opacity:.16, lineWidth:.86}
        });
      }
    }
  });

  clusterLayouts.forEach(({cluster, i, rad, sourceR, labelR, rotation, tangent, hubOffset, hx, hy, collector}) => {
    const siblingHubs = clusterLayouts
      .filter(layout => layout.cluster.className === cluster.className && layout.i !== i)
      .sort((a, b) => Math.abs(a.cluster.deg - cluster.deg) - Math.abs(b.cluster.deg - cluster.deg))
      .slice(0, 2);

    cluster.eras.forEach((era, eraIndex) => {
      const eraRad = era.deg * Math.PI/180;
      const sx = cx + sourceR * Math.cos(eraRad);
      const sy = cy + sourceR * Math.sin(eraRad);

      els.push({type:'bezierCurve',silent:true,z:2,
        shape:threadCurve(sx, sy, hx, hy, base * (eraIndex % 2 ? -0.072 : 0.072)),
        style:{
          stroke:cluster.color,
          fill:null,
          opacity:eraIndex === 0 ? .58 : .38,
          lineWidth:eraIndex === 0 ? 1.38 : .98,
        }
      });
      siblingHubs.forEach((sibling, siblingIndex) => {
        els.push({type:'bezierCurve',silent:true,z:1,
          shape:threadCurve(sx, sy, sibling.hx, sibling.hy, base * (siblingIndex ? -0.065 : 0.065)),
          style:{stroke:cluster.color, fill:null, opacity:siblingIndex === 0 ? .22 : .14, lineWidth:.82}
        });
      });
      if (collector) {
        els.push({type:'bezierCurve',silent:true,z:1,
          shape:threadCurve(sx, sy, collector.x, collector.y, base * (eraIndex % 2 ? -0.07 : 0.07)),
          style:{stroke:cluster.color, fill:null, opacity:.2, lineWidth:.78}
        });
      }
      els.push({type:'circle',silent:true,z:3,
        shape:{cx:sx, cy:sy, r:1.05},
        style:{fill:cluster.color, opacity:.6}
      });
    });

    if (collector) {
      els.push({type:'bezierCurve',silent:true,z:1,
        shape:threadCurve(hx, hy, collector.x, collector.y, base * (i % 2 ? -0.068 : 0.068)),
        style:{stroke:cluster.color, fill:null, opacity:.5, lineWidth:1.24}
      });
    }

    els.push({type:'circle',silent:true,z:3,
      shape:{cx:hx, cy:hy, r:cluster.eras.length > 2 ? 2.35 : 1.95},
      style:{
        fill:cluster.color,
        opacity:.88,
        stroke:'rgba(255,255,255,.22)',
        lineWidth:.45
      }
    });
    const labelX = cx+labelR*Math.cos(rad) + hubOffset * Math.cos(tangent);
    const labelY = cy+labelR*Math.sin(rad) + hubOffset * Math.sin(tangent);
    els.push({type:'line',silent:true,z:2,
      shape:{x1:hx, y1:hy, x2:labelX, y2:labelY},
      style:{stroke:cluster.color, opacity:.38, lineWidth:.78}
    });
    els.push({type:'text',silent:true,z:2,
      style:{
        text:truncateLabel(cluster.name, 20),
        fill:'rgba(178,190,220,.82)',
        font:`300 8px ${DATA_FONT_LIGHT}`,
        x:labelX,
        y:labelY,
        textAlign:'center',
        textVerticalAlign:'middle',
        rotation,
        shadowBlur:0
      }
    });
  });

  // Tick marks around the outer ring (5° intervals)
  const outerR = base * 0.90;
  for(let deg=0; deg<360; deg+=5){
    const rad = (deg - 90) * Math.PI/180;
    const major = deg % 90===0, med = deg % 30===0 && !major;
    const tl = base * (major?0.048 : med?0.028 : 0.014);
    const op = major?0.45 : med?0.24 : 0.1;
    const lw = major?1.3 : med?0.8 : 0.5;
    els.push({type:'line',silent:true,z:1,
      shape:{x1:cx+outerR*Math.cos(rad),y1:cy+outerR*Math.sin(rad),
             x2:cx+(outerR+tl)*Math.cos(rad),y2:cy+(outerR+tl)*Math.sin(rad)},
      style:{stroke:`rgba(180,200,255,${op})`,lineWidth:lw}
    });
  }

  chart.setOption({graphic: els});
}

requestAnimationFrame(() => {
  buildDecorGraphics();
});
window.addEventListener('resize',()=>{
  chart.resize();
  requestAnimationFrame(() => {
    buildDecorGraphics();
  });
});

/* ════ INFO PANEL ════════════════════════════════════════════════════════════ */
const panel = document.getElementById('info-panel');
const empty = document.getElementById('info-empty');
const filled = document.getElementById('info-filled');
const hoverHint = document.getElementById('hover-hint');

/* ════ PATHOGEN IMAGE MAP ════════════════════════════════════════════════════
   Curated Wikimedia Commons EM / microscopy images for each pathogen.
   Uses Special:FilePath which is a stable redirect even if storage paths change.
   Only pathogens with a genuine electron-micrograph / microscopy image are listed.
   Ancient/unknown-etiology diseases are intentionally omitted.
══════════════════════════════════════════════════════════════════════════════ */
const IMG_BASE = 'https://commons.wikimedia.org/wiki/Special:FilePath/';

const PATHOGEN_IMGS = {
  // ── VIRAL ──────────────────────────────────────────────────────────────────
  'Smallpox':
    'Smallpox_virus_virions_EM_PHIL_1849_lores.jpg',
  'Measles':
    'Measles_virus.jpg',
  'Influenza':
    'Influenza_virus_particle_color.jpg',
  'HIV/AIDS':
    'HIV-budding-Color.jpg',
  'COVID-19':
    'Novel_Coronavirus_SARS-CoV-2.jpg',
  'Yellow Fever':
    'Colorized_transmission_electron_micrograph_of_yellow_fever_virus_particles_(green)_found_within_enlarged_cytoplasmic_vesicles_of_a_C6-36_cell_(red).jpg',
  'Polio':
    'Polio_EM_PHIL_1875_lores.jpg',
  'Ebola':
    'Ebola_virus_virion.jpg',
  'Marburg':
    'Marburg_virus_EM_PHIL_1858.jpg',
  'Dengue':
    'Dengue_virus_TEM_lores.jpg',
  'Rabies':
    'Rabies_lyssavirus_EM_PHIL_6096.jpg',
  // ── BACTERIAL ──────────────────────────────────────────────────────────────
  'Tuberculosis':
    'Mycobacterium_tuberculosis_8438_lores.jpg',
  'Plague\n(Y. pestis)':
    'Yersinia_pestis_fluorescent.jpeg',
  'Cholera':
    'SEM_Vibrio_cholerae.jpg',
  'Typhus':
    'Rickettsia_rickettsii.jpg',
  'Typhoid':
    'Salmonella_typhi_typhoid.jpg',
  'Syphilis':
    'Treponema_pallidum.jpg',
  'Leprosy':
    'Mycobacterium_leprae.jpeg',
  // ── PARASITIC ──────────────────────────────────────────────────────────────
  'Malaria':
    'Plasmodium_falciparum_in_blood.jpg',
  'Sleeping Sickness':
    'Trypanosoma_brucei_brucei_bloodstream.png',
  'Leishmaniasis':
    'Leishmania_donovani_LD_bodies.jpg',
  'Schistosomiasis':
    'Schistosoma_mansoni_couple.jpg',
  // ── OTHER (only where a scientific image exists) ───────────────────────────
  'Ergotism':
    'Claviceps_purpurea_fungus.jpg',
  'Prion Diseases':
    'CJD_prion.jpg',
};

function getPathogenImg(name) {
  const key = name?.replace(/\n/g,' ').trim();
  // Try exact match first, then normalised name
  const file = PATHOGEN_IMGS[name] || PATHOGEN_IMGS[key];
  return file ? IMG_BASE + encodeURIComponent(file) + '?width=600' : null;
}

function openPanel(data, pathInfo){
  if(!data || !data.name) return;
  const classNode = pathInfo?.find(p=>CLASS_COLORS[p.name.replace(/\n.*/,'').trim()]);
  const cls = classNode?.name?.replace(/\n.*/,'').trim() || '';
  const col = CLASS_COLORS[cls] || '#606878';

  empty.style.display='none';
  filled.style.display='flex';

  const badge = document.getElementById('info-class-badge');
  badge.style.borderColor=col; badge.style.color=col;
  document.getElementById('info-class-dot').style.background=col;
  document.getElementById('info-class-name').textContent=cls||'CLASS';
  document.getElementById('info-name').textContent=(data.name||'').replace(/\n/g,' ');
  document.getElementById('info-deaths-val').textContent=data.deaths||'—';
  document.getElementById('info-deaths-val').style.color=col;
  document.getElementById('info-period').textContent=data.period||'';
  document.getElementById('info-note').textContent=data.note||'';
  document.getElementById('is-cfr').textContent=data.cfr||'—';
  document.getElementById('is-vax').textContent=data.vax||'—';
  document.getElementById('is-first').textContent=data.first||'—';
  document.getElementById('is-status').textContent=data.status||'—';

  // Resize font if content is long
  ['is-cfr','is-vax','is-first','is-status'].forEach(id=>{
    const el=document.getElementById(id);
    el.style.fontSize = el.textContent.length>12?'11px':el.textContent.length>8?'12px':'14px';
  });

  // Load curated pathogen image (EM / microscopy only)
  const imgWrap = document.getElementById('info-img-wrap');
  const imgEl   = document.getElementById('info-img');
  const credit  = document.getElementById('info-img-credit');
  imgEl.classList.remove('loaded');
  imgWrap.style.display = 'none';

  const src = getPathogenImg(data.name);
  if(src) {
    imgEl.onload  = () => { imgWrap.style.display='block'; imgEl.classList.add('loaded'); };
    imgEl.onerror = () => { imgWrap.style.display='none'; };
    imgEl.src = src;
    credit.textContent = 'Wikimedia Commons';
  }

  panel.classList.add('open');
  hoverHint.style.opacity='0';
}

/* ════ AUDIO ENGINE ═══════════════════════════════════════════════════════════
   All sounds synthesised with Web Audio API — no external files.
   AudioContext is created lazily on first interaction to satisfy browser policy.
══════════════════════════════════════════════════════════════════════════════ */
let _actx = null;
let _noiseBuffer = null;
let _audioUnlocked = false;

function getAudioCtx() {
  if (!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)();
  if (_actx.state === 'running') _audioUnlocked = true;
  return _actx;
}

function unlockAudio() {
  try {
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        _audioUnlocked = ctx.state === 'running';
      }).catch(() => {});
    } else {
      _audioUnlocked = true;
    }
  } catch(e) {}
}

['pointerdown', 'touchstart', 'keydown'].forEach(type => {
  window.addEventListener(type, unlockAudio, { once: true, passive: true });
});

function getNoiseBuf(ctx) {
  if (_noiseBuffer) return _noiseBuffer;
  const len = Math.floor(ctx.sampleRate * 0.4);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return (_noiseBuffer = buf);
}

function playShutter() {
  try {
    unlockAudio();
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    const noise = getNoiseBuf(ctx);

    // — Phase 1: shutter opening — sharp, mid-range crack
    const s1 = ctx.createBufferSource(); s1.buffer = noise;
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass'; bp1.frequency.value = 2000; bp1.Q.value = 0.8;
    const hp1 = ctx.createBiquadFilter();
    hp1.type = 'highpass'; hp1.frequency.value = 900;
    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0, t);
    g1.gain.linearRampToValueAtTime(0.26, t + 0.006);
    g1.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
    s1.connect(bp1); bp1.connect(hp1); hp1.connect(g1); g1.connect(ctx.destination);
    s1.start(t); s1.stop(t + 0.07);

    // — Phase 2: shutter closing — softer, fractionally higher pitch, 55ms later
    const s2 = ctx.createBufferSource(); s2.buffer = noise;
    const bp2 = ctx.createBiquadFilter();
    bp2.type = 'bandpass'; bp2.frequency.value = 2400; bp2.Q.value = 1.0;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0, t + 0.055);
    g2.gain.linearRampToValueAtTime(0.13, t + 0.060);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.092);
    s2.connect(bp2); bp2.connect(g2); g2.connect(ctx.destination);
    s2.start(t + 0.055); s2.stop(t + 0.1);
  } catch(e) {}
}

// Rollover: high-freq whisper tick, throttled to 60ms minimum between sounds
let _lastHoverName = null, _lastRolloverT = 0;
function playRollover() {
  const now = Date.now();
  if (!_audioUnlocked) return;
  if (now - _lastRolloverT < 60) return;
  _lastRolloverT = now;
  try {
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    const noise = getNoiseBuf(ctx);
    const src = ctx.createBufferSource(); src.buffer = noise;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 5200;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 9500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.038, t + 0.0008);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.013);
    src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(ctx.destination);
    src.start(t); src.stop(t + 0.018);
  } catch(e) {}
}

chart.on('click', params=>{
  if(params.data && (params.data.deaths||params.data.note)){
    playShutter();
    openPanel(params.data, params.treePathInfo);
  }
});

chart.on('mouseover', params=>{
  if(params.data && params.name !== _lastHoverName){
    _lastHoverName = params.name;
    playRollover();
  }
});

chart.on('mouseout', ()=>{ _lastHoverName = null; });

// Slide: bandpass sweeps downward as the panel retreats, very soft
function playSlide() {
  try {
    unlockAudio();
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    const noise = getNoiseBuf(ctx);
    const src = ctx.createBufferSource(); src.buffer = noise;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.Q.value = 0.55;
    bp.frequency.setValueAtTime(1800, t);
    bp.frequency.exponentialRampToValueAtTime(480, t + 0.19);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2800;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.10, t + 0.018);
    g.gain.linearRampToValueAtTime(0.065, t + 0.13);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    src.connect(bp); bp.connect(lp); lp.connect(g); g.connect(ctx.destination);
    src.start(t); src.stop(t + 0.24);
  } catch(e) {}
}

document.getElementById('info-close').addEventListener('click',()=>{
  playSlide();
  panel.classList.remove('open');
  hoverHint.style.opacity='1';
  empty.style.display='flex';
  filled.style.display='none';
});

/* ════ MODE TOGGLE ════════════════════════════════════════════════════════════ */
document.getElementById('btn-proportional').addEventListener('click',function(){
  this.classList.add('active');
  document.getElementById('btn-equal').classList.remove('active');
  activeData = DATA_COLORED;
  chart.setOption(buildOption(activeData),true);
  requestAnimationFrame(() => {
    buildDecorGraphics();
  });
});
document.getElementById('btn-equal').addEventListener('click',function(){
  this.classList.add('active');
  document.getElementById('btn-proportional').classList.remove('active');
  activeData = DATA_EQUAL_C;
  chart.setOption(buildOption(activeData),true);
  requestAnimationFrame(() => {
    buildDecorGraphics();
  });
});

(function(){
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('.nav-links');
  if (!toggle || !nav) return;
  const close = () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
  });
})();
