/* ═══ MOBILE NAV ═══ */
(function(){
  var btn = document.querySelector('.menu-toggle'), nav = document.querySelector('.nav-links');
  if(btn && nav){ btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true':'false');
  }); }
})();

/* ═══ SHARED ECHARTS THEME BITS ═══ */
var AX = { color:'#746f61', font:"'Space Mono', monospace" };
var gridSplit = { lineStyle:{ color:'rgba(233,229,217,.05)' } };
function animateCount(el, target, opts){
  opts = opts || {};
  var duration = opts.duration || 950;
  var decimals = opts.decimals || 0;
  var suffix = opts.suffix || '';
  var prefix = opts.prefix || '';
  var t0 = performance.now();
  (function step(now){
    var p = Math.min((now - t0) / duration, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    var value = decimals ? target * eased : Math.round(target * eased);
    var text = value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    el.innerHTML = prefix + text + suffix;
    if(p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ═══ SCROLL-TRIGGERED COUNT-UP FOR STAT CARDS ═══ */
(function(){
  var nodes = document.querySelectorAll('.gap-cards .mv');
  if(!nodes.length) return;
  function parse(raw){
    var m = raw.match(/^([^\d.\-]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if(!m) return null;
    var numStr = m[2].replace(/,/g, '');
    var dot = numStr.indexOf('.');
    return {
      prefix: m[1],
      suffix: m[3],
      target: parseFloat(numStr),
      decimals: dot === -1 ? 0 : numStr.length - dot - 1
    };
  }
  nodes.forEach(function(el){
    var spec = parse(el.textContent.trim());
    if(!spec){ return; }
    el.dataset.final = el.textContent.trim();
    el.innerHTML = spec.prefix + (spec.decimals ? (0).toFixed(spec.decimals) : '0') + spec.suffix;
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            animateCount(el, spec.target, { prefix: spec.prefix, suffix: spec.suffix, decimals: spec.decimals, duration: 1050 });
            io.disconnect();
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -18% 0px' });
      io.observe(el);
    } else {
      el.innerHTML = el.dataset.final;
    }
  });
})();

/* ═══ RISE CHART — cases by year 2000–2025 ═══ */
(function(){
  var el = document.getElementById('rise-chart');
  if(!el || !window.echarts) return;
  var chart = echarts.init(el, null, { renderer:'canvas' });
  var years = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
  var cases = [86,116,44,56,37,66,55,43,140,71,63,220,55,187,667,188,86,120,375,1274,13,49,121,59,285,2289];
  function riseOption(seriesData, showLabels) {
    return {
    animation:true,
    animationDuration:700,
    animationDurationUpdate:1050,
    animationEasingUpdate:'cubicOut',
    grid:{ left:56, right:24, top:28, bottom:46 },
    tooltip:{ trigger:'axis', backgroundColor:'rgba(8,11,10,.96)', borderColor:'rgba(233, 106, 47,.35)', borderWidth:1,
      textStyle:{ color:'#e9e5d9', fontFamily:AX.font, fontSize:11 },
      formatter:function(p){ var d=p[0]; return '<span style="color:#746f61;font-size:9px;letter-spacing:1px">YEAR '+d.name+'</span><br><b style="font-size:15px">'+d.value.toLocaleString()+'</b> confirmed cases'; } },
    xAxis:{ type:'category', data:years, boundaryGap:false,
      axisLine:{ lineStyle:{ color:'rgba(233,229,217,.14)' } },
      axisTick:{ show:false },
      axisLabel:{ color:AX.color, fontFamily:AX.font, fontSize:9, interval:function(i){ return i%5===0 || i===25; } } },
    yAxis:{ type:'value', name:'CASES', nameTextStyle:{ color:'#746f61', fontFamily:AX.font, fontSize:8, letterSpacing:1, padding:[0,0,6,-38] },
      axisLabel:{ color:AX.color, fontFamily:AX.font, fontSize:9 },
      splitLine:gridSplit },
    series:[{
      type:'line', data:seriesData, smooth:false, symbol:'circle', symbolSize:5,
      itemStyle:{ color:'#e96a2f' },
      lineStyle:{ color:'#e96a2f', width:2, shadowColor:'rgba(233, 106, 47,.5)', shadowBlur:12 },
      areaStyle:{ color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(233, 106, 47,.42)'},{offset:1,color:'rgba(233, 106, 47,0)'}]) },
      markLine:{ silent:true, symbol:'none', label:{ show:false },
        lineStyle:{ color:'rgba(43, 143, 150,.5)', type:'dashed', width:1 },
        data:[{ xAxis:'2000', label:{ show:true, formatter:'ELIMINATED 2000', color:'#2b8f96', fontFamily:AX.font, fontSize:8, position:'insideEndTop', letterSpacing:1 } }] },
      markPoint:{ symbol:'pin', symbolSize:0, label:{ color:'#e9e5d9', fontFamily:AX.font, fontSize:9, fontWeight:700 },
        data:showLabels ? [
          { coord:['2014',667], value:'667', itemStyle:{color:'transparent'}, label:{ position:'top', offset:[0,-2] } },
          { coord:['2019',1274], value:'1,274', itemStyle:{color:'transparent'}, label:{ position:'top', offset:[0,-2] } },
          { coord:['2025',2289], value:'2,289', itemStyle:{color:'transparent'}, label:{ position:'top', color:'#e96a2f', offset:[0,-2] } }
        ] : [] }
    }]
    };
  }
  chart.setOption(Object.assign(riseOption(cases.map(function(){ return 0; }), false), { animation: false }));
  var started = false;
  function startRise() {
    if(started) return;
    started = true;
    chart.setOption(riseOption(cases, false));
    window.setTimeout(function(){
      chart.setOption({ series:[{ markPoint: riseOption(cases, true).series[0].markPoint }] });
    }, 1050);
  }
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          startRise();
          io.disconnect();
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    io.observe(el);
  } else {
    window.setTimeout(startRise, 160);
  }
  new ResizeObserver(function(){ chart.resize(); }).observe(el);
})();

/* ═══ COVERAGE CHART — MMR kindergarten coverage vs 95% ═══ */
(function(){
  var el = document.getElementById('cov-chart');
  if(!el || !window.echarts) return;
  var chart = echarts.init(el, null, { renderer:'canvas' });
  var yrs = ['2017–18','2018–19','2019–20','2020–21','2021–22','2022–23','2023–24','2024–25'];
  var cov = [94.3,94.7,95.2,93.9,93.5,93.1,92.7,92.5];
  chart.setOption({
    animation:false,
    grid:{ left:44, right:20, top:34, bottom:40 },
    tooltip:{ trigger:'axis', backgroundColor:'rgba(8,11,10,.96)', borderColor:'rgba(233, 106, 47,.35)', borderWidth:1,
      textStyle:{ color:'#e9e5d9', fontFamily:AX.font, fontSize:11 },
      formatter:function(p){ var d=p[0]; return '<span style="color:#746f61;font-size:9px">'+d.name+'</span><br><b style="font-size:15px">'+d.value+'%</b> MMR coverage'; } },
    xAxis:{ type:'category', data:yrs, axisLine:{ lineStyle:{ color:'rgba(233,229,217,.14)' } }, axisTick:{ show:false },
      axisLabel:{ color:AX.color, fontFamily:AX.font, fontSize:8, interval:1 } },
    yAxis:{ type:'value', min:90, max:96, interval:1,
      axisLabel:{ color:AX.color, fontFamily:AX.font, fontSize:9, formatter:'{value}%' }, splitLine:gridSplit },
    series:[{
      type:'bar', data:cov.map(function(){ return 90; }), barWidth:'46%',
      itemStyle:{ color:function(p){ return p.value>=95 ? '#2b8f96' : (p.value>=93 ? '#edbb2e' : '#e96a2f'); }, borderRadius:[2,2,0,0] },
      markLine:{ silent:true, symbol:'none',
        lineStyle:{ color:'#2b8f96', type:'dashed', width:1.2 },
        label:{ show:true, formatter:'95% HERD-IMMUNITY TARGET', color:'#2b8f96', fontFamily:AX.font, fontSize:8, position:'insideEndTop', letterSpacing:.5 },
        data:[{ yAxis:95 }] }
    }]
  });
  new ResizeObserver(function(){ chart.resize(); }).observe(el);

  // Grow the bars from the baseline only when the chart scrolls into view
  var started = false;
  function grow(){
    if(started) return; started = true;
    chart.setOption({ animation:true, animationDuration:800, animationEasing:'cubicOut', series:[{ data:cov }] });
  }
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ grow(); io.disconnect(); } });
    }, { threshold:0, rootMargin:'0px 0px -12% 0px' });
    io.observe(el);
  } else { grow(); }
})();

/* ═══ US TILE-GRID MAP ═══ */
(function(){
  var host = document.getElementById('us-map');
  if(!host) return;
  // col (x 0-10), row (y 0-7), tier
  var S = {
    AK:[0,0,'none'], ME:[10,0,'none'],
    WI:[5,1,'none'], VT:[9,1,'rep'], NH:[10,1,'none'],
    WA:[0,2,'rep'], ID:[1,2,'none'], MT:[2,2,'none'], ND:[3,2,'rep'], MN:[4,2,'rep'], IL:[5,2,'rep'], MI:[6,2,'rep'], NY:[8,2,'rep'], MA:[9,2,'none'],
    OR:[0,3,'none'], NV:[1,3,'none'], WY:[2,3,'none'], SD:[3,3,'rep'], IA:[4,3,'none'], IN:[5,3,'rep'], OH:[6,3,'out'], PA:[7,3,'rep'], NJ:[8,3,'rep'], CT:[9,3,'none'], RI:[10,3,'rep'],
    CA:[0,4,'rep'], UT:[1,4,'none'], CO:[2,4,'rep'], NE:[3,4,'none'], MO:[4,4,'rep'], KY:[5,4,'rep'], WV:[6,4,'none'], VA:[7,4,'rep'], MD:[8,4,'rep'], DE:[9,4,'none'],
    AZ:[1,5,'rep'], NM:[2,5,'out'], KS:[3,5,'out'], AR:[4,5,'rep'], TN:[5,5,'rep'], NC:[6,5,'none'], SC:[7,5,'none'], DC:[8,5,'none'],
    HI:[0,7,'none'], OK:[3,6,'out'], LA:[4,6,'rep'], MS:[5,6,'rep'], AL:[6,6,'none'], GA:[7,6,'rep'],
    TX:[3,7,'epi'], FL:[8,7,'rep']
  };
  var NAMES = { AK:'Alaska',AL:'Alabama',AR:'Arkansas',AZ:'Arizona',CA:'California',CO:'Colorado',CT:'Connecticut',DC:'District of Columbia',DE:'Delaware',FL:'Florida',GA:'Georgia',HI:'Hawaii',IA:'Iowa',ID:'Idaho',IL:'Illinois',IN:'Indiana',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',MA:'Massachusetts',MD:'Maryland',ME:'Maine',MI:'Michigan',MN:'Minnesota',MO:'Missouri',MS:'Mississippi',MT:'Montana',NC:'North Carolina',ND:'North Dakota',NE:'Nebraska',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NV:'Nevada',NY:'New York',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VA:'Virginia',VT:'Vermont',WA:'Washington',WI:'Wisconsin',WV:'West Virginia',WY:'Wyoming' };
  var FILL = { epi:'#e96a2f', out:'#e96a2f', rep:'#7a3a24', none:'#111815' };
  var TIERLBL = { epi:'Epicenter — largest 2025 outbreak', out:'Active outbreak cluster', rep:'Cases reported in 2025', none:'No reported outbreak' };
  var CELL=48, GAP=5, PAD=4;
  var cols=11, rows=8;
  var W = cols*CELL + PAD*2, H = rows*CELL + PAD*2;
  var svg = '<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" role="img">';
  Object.keys(S).forEach(function(ab){
    var d=S[ab], x=PAD+d[0]*CELL, y=PAD+d[1]*CELL, tier=d[2], f=FILL[tier];
    var glow = tier==='epi' ? ' filter="drop-shadow(0 0 8px rgba(233, 106, 47,.85))"' : '';
    var stroke = tier==='none' ? 'rgba(233,229,217,.1)' : 'rgba(0,0,0,.35)';
    var tx = tier==='none' ? 'rgba(233,229,217,.35)' : 'rgba(233,229,217,.9)';
    svg += '<g class="tile" data-ab="'+ab+'" data-tier="'+tier+'" tabindex="0">'
      +'<rect x="'+x+'" y="'+y+'" width="'+(CELL-GAP)+'" height="'+(CELL-GAP)+'" rx="4" fill="'+f+'" stroke="'+stroke+'" stroke-width="1"'+glow+'/>'
      +'<text x="'+(x+(CELL-GAP)/2)+'" y="'+(y+(CELL-GAP)/2+4)+'" text-anchor="middle" fill="'+tx+'">'+ab+'</text>'
      +'</g>';
  });
  svg += '</svg>';
  host.innerHTML = svg;

  var tip = document.getElementById('tip');
  function show(ab, tier, ev){
    tip.innerHTML = '<span class="tip-t">'+TIERLBL[tier]+'</span><br>'+NAMES[ab];
    tip.style.opacity='1';
    var x = ev.clientX, y = ev.clientY;
    tip.style.left = x+'px'; tip.style.top = (y-8)+'px';
  }
  function hide(){ tip.style.opacity='0'; }
  host.querySelectorAll('.tile').forEach(function(g){
    var ab=g.getAttribute('data-ab'), tier=g.getAttribute('data-tier');
    g.addEventListener('mousemove', function(e){ show(ab,tier,e); });
    g.addEventListener('mouseleave', hide);
    g.addEventListener('focus', function(){
      var r=g.getBoundingClientRect();
      show(ab,tier,{clientX:r.left+r.width/2, clientY:r.top});
    });
    g.addEventListener('blur', hide);
  });
})();

/* ═══ COUNT-UP on hero stats ═══ */
(function(){
  var els = Array.prototype.slice.call(document.querySelectorAll('.stat .val[data-count]'));
  if(!els.length) return;
  var started=false;
  function render(el, value){
    var decimals = +(el.getAttribute('data-decimals') || 0);
    var suffix = el.getAttribute('data-suffix') || '';
    var text = value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    el.innerHTML = text + (suffix ? '<span class="unit">' + suffix + '</span>' : '');
  }
  var io = new IntersectionObserver(function(en){
    en.forEach(function(e){
      if(e.isIntersecting && !started){
        started=true; var t0=performance.now();
        (function step(now){
          var p=Math.min((now-t0)/950,1), eased=1-Math.pow(1-p,3);
          els.forEach(function(el){
            var target = +(el.getAttribute('data-count') || 0);
            var decimals = +(el.getAttribute('data-decimals') || 0);
            var current = decimals ? target * eased : Math.round(target * eased);
            render(el, current);
          });
          if(p<1) requestAnimationFrame(step);
        })(t0);
      }
    });
  },{ threshold:.6 });
  io.observe(els[0].closest('.stats') || els[0]);
})();

/* ═══ LIVE · CDC NNDSS weekly surveillance (provisional) ═══
   Fetches current-year measles YTD (m2 = cumulative) for "U.S. Residents".
   Fully optional: any failure just leaves the strip hidden. */
(function(){
  var strip=document.getElementById('live-strip');
  if(!strip || !window.fetch) return;
  var numEl=document.getElementById('lv-num'),
      labEl=document.getElementById('lv-lab'),
      stampEl=document.getElementById('lv-stamp');
  var BASE='https://data.cdc.gov/resource/x9gk-5huc.json';
  function url(yr){
    var where="(upper(label) like '%MEASLES%') AND year='"+yr+"' AND states='U.S. Residents'";
    return BASE+'?$where='+encodeURIComponent(where)+'&$order=week desc&$limit=24';
  }
  function pick(rows){
    if(!rows || !rows.length) return null;
    var maxWeek=rows.reduce(function(m,r){ var w=+r.week||0; return w>m?w:m; },0);
    var total=rows.filter(function(r){ return (+r.week||0)===maxWeek; })
                  .reduce(function(s,r){ return s+(parseFloat(r.m2)||0); },0);
    return { week:maxWeek, total:Math.round(total) };
  }
  function get(yr){ return fetch(url(yr)).then(function(r){ return r.ok?r.json():Promise.reject(); }); }
  function render(yr,res){
    numEl.textContent='0';
    labEl.textContent='provisional cases · '+yr+' · through MMWR week '+res.week;
    stampEl.textContent='(checked '+new Date().toISOString().slice(0,10)+')';
    strip.style.display='';
    animateCount(numEl, res.total);
  }
  var yr=new Date().getUTCFullYear();
  get(yr).then(function(rows){
    var res=pick(rows);
    if(res && res.total>0){ render(yr,res); return; }
    return get(yr-1).then(function(rows2){ var r2=pick(rows2); if(r2 && r2.total>0) render(yr-1,r2); });
  }).catch(function(){ /* leave strip hidden — page keeps its cited static figures */ });
})();

/* ═══ TIMELINE — wave reveal from the right on scroll ═══ */
(function(){
  var tl = document.querySelector('.timeline');
  if(!tl) return;
  var items = tl.querySelectorAll('.tl');
  items.forEach(function(el, i){ el.style.setProperty('--i', i); });
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce || !('IntersectionObserver' in window)){ tl.classList.add('revealed'); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('revealed'); io.disconnect(); } });
  }, { threshold:0, rootMargin:'0px 0px -12% 0px' });
  io.observe(tl);
})();
