/* ═══ MOBILE NAV ═══ */
(function(){
  var btn = document.querySelector('.menu-toggle'), nav = document.querySelector('.nav-links');
  if(btn && nav){ btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true':'false');
  }); }
})();

/* ═══ SHARED ECHARTS THEME BITS ═══ */
var AX = { color:'#4a5468', font:"'Space Mono', monospace" };
var gridSplit = { lineStyle:{ color:'rgba(180,200,255,.05)' } };

/* ═══ RISE CHART — cases by year 2000–2025 ═══ */
(function(){
  var el = document.getElementById('rise-chart');
  if(!el || !window.echarts) return;
  var chart = echarts.init(el, null, { renderer:'canvas' });
  var years = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
  var cases = [86,116,44,56,37,66,55,43,140,71,63,220,55,187,667,188,86,120,375,1274,13,49,121,59,285,2289];
  chart.setOption({
    grid:{ left:56, right:24, top:28, bottom:46 },
    tooltip:{ trigger:'axis', backgroundColor:'rgba(6,9,13,.96)', borderColor:'rgba(200,64,56,.35)', borderWidth:1,
      textStyle:{ color:'#d0d8ee', fontFamily:AX.font, fontSize:11 },
      formatter:function(p){ var d=p[0]; return '<span style="color:#4a5468;font-size:9px;letter-spacing:1px">YEAR '+d.name+'</span><br><b style="font-size:15px">'+d.value.toLocaleString()+'</b> confirmed cases'; } },
    xAxis:{ type:'category', data:years, boundaryGap:false,
      axisLine:{ lineStyle:{ color:'rgba(180,200,255,.14)' } },
      axisTick:{ show:false },
      axisLabel:{ color:AX.color, fontFamily:AX.font, fontSize:9, interval:function(i){ return i%5===0 || i===25; } } },
    yAxis:{ type:'value', name:'CASES', nameTextStyle:{ color:'#4a5468', fontFamily:AX.font, fontSize:8, letterSpacing:1, padding:[0,0,6,-38] },
      axisLabel:{ color:AX.color, fontFamily:AX.font, fontSize:9 },
      splitLine:gridSplit },
    series:[{
      type:'line', data:cases, smooth:false, symbol:'circle', symbolSize:5,
      itemStyle:{ color:'#ef4130' },
      lineStyle:{ color:'#ef4130', width:2, shadowColor:'rgba(239,65,48,.5)', shadowBlur:12 },
      areaStyle:{ color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(239,65,48,.42)'},{offset:1,color:'rgba(239,65,48,0)'}]) },
      markLine:{ silent:true, symbol:'none', label:{ show:false },
        lineStyle:{ color:'rgba(46,138,110,.5)', type:'dashed', width:1 },
        data:[{ xAxis:'2000', label:{ show:true, formatter:'ELIMINATED 2000', color:'#2e8a6e', fontFamily:AX.font, fontSize:8, position:'insideEndTop', letterSpacing:1 } }] },
      markPoint:{ symbol:'pin', symbolSize:0, label:{ color:'#d0d8ee', fontFamily:AX.font, fontSize:9, fontWeight:700 },
        data:[
          { coord:['2014',667], value:'667', itemStyle:{color:'transparent'}, label:{ position:'top', offset:[0,-2] } },
          { coord:['2019',1274], value:'1,274', itemStyle:{color:'transparent'}, label:{ position:'top', offset:[0,-2] } },
          { coord:['2025',2289], value:'2,289', itemStyle:{color:'transparent'}, label:{ position:'top', color:'#ef4130', offset:[0,-2] } }
        ] }
    }]
  });
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
    grid:{ left:44, right:20, top:34, bottom:40 },
    tooltip:{ trigger:'axis', backgroundColor:'rgba(6,9,13,.96)', borderColor:'rgba(200,64,56,.35)', borderWidth:1,
      textStyle:{ color:'#d0d8ee', fontFamily:AX.font, fontSize:11 },
      formatter:function(p){ var d=p[0]; return '<span style="color:#4a5468;font-size:9px">'+d.name+'</span><br><b style="font-size:15px">'+d.value+'%</b> MMR coverage'; } },
    xAxis:{ type:'category', data:yrs, axisLine:{ lineStyle:{ color:'rgba(180,200,255,.14)' } }, axisTick:{ show:false },
      axisLabel:{ color:AX.color, fontFamily:AX.font, fontSize:8, interval:1 } },
    yAxis:{ type:'value', min:90, max:96, interval:1,
      axisLabel:{ color:AX.color, fontFamily:AX.font, fontSize:9, formatter:'{value}%' }, splitLine:gridSplit },
    series:[{
      type:'bar', data:cov, barWidth:'46%',
      itemStyle:{ color:function(p){ return p.value>=95 ? '#2e8a6e' : (p.value>=93 ? '#b8781a' : '#c0382e'); }, borderRadius:[2,2,0,0] },
      markLine:{ silent:true, symbol:'none',
        lineStyle:{ color:'#2e8a6e', type:'dashed', width:1.2 },
        label:{ show:true, formatter:'95% HERD-IMMUNITY TARGET', color:'#2e8a6e', fontFamily:AX.font, fontSize:8, position:'insideEndTop', letterSpacing:.5 },
        data:[{ yAxis:95 }] }
    }]
  });
  new ResizeObserver(function(){ chart.resize(); }).observe(el);
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
  var FILL = { epi:'#ef4130', out:'#c0382e', rep:'#743331', none:'#161c25' };
  var TIERLBL = { epi:'Epicenter — largest 2025 outbreak', out:'Active outbreak cluster', rep:'Cases reported in 2025', none:'No reported outbreak' };
  var CELL=48, GAP=5, PAD=4;
  var cols=11, rows=8;
  var W = cols*CELL + PAD*2, H = rows*CELL + PAD*2;
  var svg = '<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" role="img">';
  Object.keys(S).forEach(function(ab){
    var d=S[ab], x=PAD+d[0]*CELL, y=PAD+d[1]*CELL, tier=d[2], f=FILL[tier];
    var glow = tier==='epi' ? ' filter="drop-shadow(0 0 8px rgba(239,65,48,.85))"' : '';
    var stroke = tier==='none' ? 'rgba(180,200,255,.1)' : 'rgba(0,0,0,.35)';
    var tx = tier==='none' ? 'rgba(180,200,255,.35)' : 'rgba(240,244,252,.9)';
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

/* ═══ COUNT-UP on hero headline stat ═══ */
(function(){
  var el = document.querySelector('.stat .val[data-count]');
  if(!el) return;
  var target = +el.getAttribute('data-count'), started=false;
  var io = new IntersectionObserver(function(en){
    en.forEach(function(e){
      if(e.isIntersecting && !started){
        started=true; var t0=performance.now();
        (function step(now){
          var p=Math.min((now-t0)/900,1), v=Math.round(target*(1-Math.pow(1-p,3)));
          el.textContent = v.toLocaleString();
          if(p<1) requestAnimationFrame(step);
        })(t0);
      }
    });
  },{ threshold:.6 });
  io.observe(el);
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
    numEl.textContent=res.total.toLocaleString();
    labEl.textContent='provisional cases · '+yr+' · through MMWR week '+res.week;
    stampEl.textContent='(checked '+new Date().toISOString().slice(0,10)+')';
    strip.style.display='';
  }
  var yr=new Date().getUTCFullYear();
  get(yr).then(function(rows){
    var res=pick(rows);
    if(res && res.total>0){ render(yr,res); return; }
    return get(yr-1).then(function(rows2){ var r2=pick(rows2); if(r2 && r2.total>0) render(yr-1,r2); });
  }).catch(function(){ /* leave strip hidden — page keeps its cited static figures */ });
})();
