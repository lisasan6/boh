const S = {cap:50, charity:0, streak:12, plan:'free', firstResist:false,
  stage:'wk3',   /* 'new' = day one, right after setup · 'wk3' = three weeks in (the demo default) */
  stakes:true};  /* false until "Make it real": opening a shielded app is free in the first days */
let SNAP=null;   /* the three-weeks-in data, kept so the demo can switch back from day one */
/* card fee: shown and added on top, so 100% of the coins arrive. Plus covers it up to $1 a month (L, 2026-10-21). */
const PLUS_FEE_CAP=1;
const cardFee=x=>Math.round((x*0.029+0.30)*100)/100;
/* the demo follows the real calendar, so it never looks out of date: this month, the next tip-out, days ago */
const TODAY=new Date();
const dfmt=(d,o)=>d.toLocaleString('en-GB',o);
const MON3=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH=dfmt(TODAY,{month:'long'});
const NEXT1=MON3[(TODAY.getMonth()+1)%12]+' 1';
const daysAgo=n=>{ const d=new Date(TODAY); d.setDate(d.getDate()-n); return d; };
const dayMon=d=>dfmt(d,{weekday:'short'})+' '+d.getDate()+' '+MON3[d.getMonth()];
const monDay=d=>MON3[d.getMonth()]+' '+d.getDate();
/* this month's coins, newest first — the jar total is always their sum */
const COINS=[
  {p:'The scroll one',amt:5, when:'Today · 9:12pm',    fresh:true},
  {p:'The loud one',  amt:10,when:'Yesterday · 11:40pm',fresh:true},
  {p:'The scroll one',amt:5, when:dayMon(daysAgo(3))+' · 10:05pm'},
  {p:'The scroll one',amt:5, when:dayMon(daysAgo(7))+' · 9:48pm'},
  {p:'The loud one',  amt:10,when:dayMon(daysAgo(12))+' · 11:02pm'},
];
const jarTotal=()=>COINS.reduce((t,c)=>t+c.amt,0);
const CHARITIES=[
  {n:'Doctors Without Borders',l:'Emergency medical care in conflict zones, epidemics and disasters.'},
  {n:'GiveDirectly',l:'Sends cash straight to people living in extreme poverty, to spend as they choose.'},
  {n:'Against Malaria Foundation',l:'Buys and distributes bed nets that protect families from malaria.'},
  {n:'Feeding America',l:'A nationwide network of US food banks and meal programs.'},
  {n:'UNICEF USA',l:'Health, nutrition, clean water and education for children worldwide.'},
];
const charity=()=>CHARITIES[S.charity];
const $=id=>document.getElementById(id);
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('show'),2600)}
function setMode(m){
  document.body.dataset.mode=m;
  $('mN').classList.toggle('on',m==='night');$('mD').classList.toggle('on',m==='day');
  $('cornerIcon').setAttribute('href', m==='night' ? '#i-sun' : '#i-moon');
}
function go(s){
  document.querySelectorAll('.screen').forEach(x=>x.classList.remove('on'));
  $('s-'+s).classList.add('on');
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.dataset.s===s));
}
function closeOv(id){$(id).classList.remove('on')}

/* ── onboarding ── */
/* one counter for the whole setup: 4 intro screens, picking apps, then the 3 questions of the first deal */
const OB_STEPS=8;
const obProg=(n,label='')=>`<div class="obProg" role="progressbar" aria-valuemin="1" aria-valuemax="${OB_STEPS}" aria-valuenow="${n}" aria-label="Step ${n} of ${OB_STEPS}"><div class="obSegs">${Array.from({length:OB_STEPS},(_,i)=>`<i${i<n?' class="on"':''}></i>`).join('')}</div><span>${n} of ${OB_STEPS}${label?' · '+label:''}</span></div>`;
let oi=0;
$('onbProg').innerHTML=obProg(1); $('prepermProg').innerHTML=obProg(5,'your apps');
function onbNext(){
  if(oi===3){$('ov-preperm').classList.add('on');return}
  oi++;
  document.querySelectorAll('.onb').forEach(s=>s.style.display=(+s.dataset.i===oi)?'block':'none');
  $('onbProg').innerHTML=obProg(oi+1);
  $('onbBtn').textContent = oi===3 ? 'Shield my apps' : 'Next';
}
/* Skip only skips the intro: you still pick your apps, because nothing is shielded until you do */
function skipIntro(){ $('ov-preperm').classList.add('on'); }

/* ── jar rendering ── */
/* the pile grows with the money, not the coin count: a full jar = your monthly cap */
/* ── the jar: one drawing for every jar in the app, a natural coin pile and a face that reacts ── */
/* where coins settle, in the order they land: worked out once by a small pouring simulation
   (each coin drops through the neck and slides down the pile until it rests on two others or the glass) */
const POUR=[[60.8, 206.6, 16.4, 13], [85.7, 206.7, 17.1, -8], [72.8, 185.3, 16.5, -13], [43.9, 189.6, 15.9, -16], [55.3, 168.4, 16.3, -16], [111.2, 206.7, 17.1, -8], [135.8, 207.5, 16.0, 16], [98.5, 185.8, 16.0, -17], [86.1, 164.8, 16.5, 12], [68.1, 147.7, 16.6, -18], [124.8, 186.2, 16.2, -15], [112.0, 166.3, 15.8, -21], [154.6, 192.7, 16.3, -8], [100.7, 144.5, 17.3, -13], [82.2, 126.7, 17.4, -20], [143.4, 171.2, 16.1, -10], [43.3, 148.0, 15.6, -9], [129.9, 151.3, 15.8, -13], [120.8, 129.2, 16.5, -24]];
const POS=POUR.map(([x,y])=>[x,y]);
const JAR_BODY='M52 34 h96 v14 c15 12 24 29 24 48 v88 c0 22-17 39-39 39 H67 c-22 0-39-17-39-39 V96 c0-19 9-36 24-48 z';
const NS='http://www.w3.org/2000/svg';
const MOUTH={happy:'M84 114 q16 14 32 0',thanks:'M90 117 q10 7 20 0',rest:'M92 119 q8 3 16 0',wow:'M95 118 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0'};
function buildJar(svg){
  if(svg.dataset.built) return; svg.dataset.built='1';
  const keep=[...svg.querySelectorAll('g[id]')];                       /* coins or lights */
  const oldMouth=[...svg.querySelectorAll('path')].find(p=>/^M8\d 11\d q/.test(p.getAttribute('d')||''));
  const mouthId=oldMouth&&oldMouth.id, baseD=oldMouth?oldMouth.getAttribute('d'):'M88 118 q12 8 24 0';
  svg.innerHTML=`
    <ellipse cx="100" cy="219" rx="60" ry="9" fill="url(#caustic)" filter="url(#soften)" opacity=".75"/>
    <path d="${JAR_BODY}" fill="url(#glass)"/>
    <path d="${JAR_BODY}" fill="url(#innerdark)"/>
    <g class="jarFill"></g>
    <g clip-path="url(#body)" pointer-events="none">
      <rect x="20" y="30" width="160" height="200" fill="url(#cyl)"/>
      <path d="M44 106 C44 86 50 72 59 63 L64 67 C57 76 53 90 53 108 L53 176 C53 185 55 192 60 198 L55 203 C48 196 44 186 44 176 Z" fill="url(#spec)"/>
      <rect x="153" y="112" width="4" height="58" rx="2" fill="#fff" opacity=".16"/>
      <ellipse cx="68" cy="57" rx="7" ry="2.6" fill="#fff" opacity=".5" transform="rotate(-38 68 57)"/>
      <path d="M62 213 Q100 225 138 213" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="2.2" stroke-linecap="round"/>
    </g>
    <path d="${JAR_BODY}" fill="none" stroke="url(#rim)" stroke-width="var(--jar-stroke)"/>
    <path d="${JAR_BODY}" fill="none" stroke="url(#rimlight)" stroke-width="1.2"/>
    <rect class="lid" x="62" y="8" width="76" height="20" rx="9" fill="url(#rim)"/>
    <g class="age" aria-hidden="true">
      <path class="a1" d="M76 15 l13 -2.4 M110 21 l8 -1" stroke="#fff" stroke-opacity=".38" stroke-width="1.3" stroke-linecap="round"/>
      <path class="a3" d="M140 66 l1.6 4.2 4.4 .3 -3.4 2.8 1.1 4.3 -3.7 -2.4 -3.7 2.4 1.1 -4.3 -3.4 -2.8 4.4 -.3z" fill="none" stroke="#fff" stroke-opacity=".32" stroke-width="1.1"/>
      <g class="a6"><rect x="62" y="8" width="76" height="20" rx="9" fill="#FFC94D" opacity=".16"/>
        <path d="M136 120 v-11 M141 120 v-11 M146 120 v-11 M151 120 v-11 M133 111 l21 7" stroke="#fff" stroke-opacity=".22" stroke-width="1.4" stroke-linecap="round"/></g>
      <g class="a12"><path d="M52 40 q48 9 96 0" fill="none" stroke="#C9A46A" stroke-width="3" stroke-linecap="round"/>
        <path d="M128 43 q-7 -9 -12 -1 q5 7 12 1 q7 -9 12 -1 q-5 7 -12 1 M128 43 l-5 13 M128 43 l4 13" fill="none" stroke="#C9A46A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>
    </g>
    <g class="jarFace">
      <g class="eyes">
        <g class="fw" data-x="84"><g class="eyeL blinking"><circle class="eye" cx="84" cy="104" r="4.6" fill="var(--jar-face)"/>
          <path class="eyeArc" d="M79 106 q5 -7 10 0" stroke="var(--jar-face)" stroke-width="3.2" fill="none" stroke-linecap="round"/>
          <path class="eyeRest" d="M79 104 q5 4 10 0" stroke="var(--jar-face)" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>
        <g class="fw" data-x="116"><g class="eyeR blinking"><circle class="eye" cx="116" cy="104" r="4.6" fill="var(--jar-face)"/>
          <path class="eyeArc" d="M111 106 q5 -7 10 0" stroke="var(--jar-face)" stroke-width="3.2" fill="none" stroke-linecap="round"/>
          <path class="eyeRest" d="M111 104 q5 4 10 0" stroke="var(--jar-face)" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>
      </g>
      <g class="fw" data-x="100"><path class="mouth"${mouthId?` id="${mouthId}"`:''} d="${baseD}" stroke="var(--jar-face)" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>
    </g>`;
  svg.dataset.base=baseD;
  const fill=svg.querySelector('.jarFill'); keep.forEach(g=>fill.appendChild(g));
}
document.querySelectorAll('svg[viewBox="0 0 200 226"]').forEach(buildJar);
/* moods: idle (dots, smile) · happy (you stayed) · thanks (a coin landed) · rest ("Your time" is on) · wow (tip-out).
   Never sad, never disappointed: a slip is a gift to the jar, not a letdown. */
function jarMood(svg,mood,ms){
  if(!svg) return;
  clearTimeout(svg._moodT);
  const m=mood||svg.dataset.rest||'idle', mouth=svg.querySelector('.mouth');
  svg.dataset.mood=m;
  if(mouth) mouth.setAttribute('d',MOUTH[m]||svg.dataset.base);
  if(ms) svg._moodT=setTimeout(()=>jarMood(svg),ms);
}
function jarRest(on){ ['homeJarSvg','todayJarSvg'].forEach(id=>{ const s=$(id); if(!s) return; s.dataset.rest=on?'rest':''; if(!s._moodT) jarMood(s); }); }
/* the eyes follow your finger (or pointer) a little, then drift back */
(function(){
  let raf=0, px=0, py=0, back=0;
  function look(){ raf=0;
    document.querySelectorAll('svg[data-built]').forEach(svg=>{
      const eyes=svg.querySelector('.eyes'); if(!eyes||svg.dataset.mood==='rest'||svg._spin) return;
      const r=svg.getBoundingClientRect(); if(!r.width||r.bottom<0||r.top>innerHeight) return;
      const cx=r.left+r.width*.5, cy=r.top+r.height*.46, dx=px-cx, dy=py-cy, d=Math.hypot(dx,dy)||1, k=Math.min(1,d/160)*2.6;
      eyes.style.transform=`translate(${(dx/d*k).toFixed(2)}px,${(dy/d*k).toFixed(2)}px)`;
    });
  }
  function center(){ document.querySelectorAll('svg[data-built] .eyes').forEach(e=>e.style.transform=''); }
  const app=document.querySelector('.app')||document;
  ['pointermove','pointerdown'].forEach(ev=>app.addEventListener(ev,e=>{ px=e.clientX; py=e.clientY; if(!raf) raf=requestAnimationFrame(look); clearTimeout(back); back=setTimeout(center,2600); },{passive:true}));
})();
/* the tip-out: the lid pops open and floats aside, the coins rise out of the mouth one by one
   (money going up, to the cause), the lid goes back on, then the jar spins (the face goes round the glass) and shines with joy.
   onEach(k,n) runs as each coin leaves, for the count-up. */
function tipOutJar(svg,box,group,onEach,done){
  const items=[...group.children], n=items.length;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!n){
    group.innerHTML=''; onEach&&onEach(n,n); jarMood(svg,'happy',2600); stars(box,9,true); done&&done(); return; }
  const br=box.getBoundingClientRect(), r=svg.getBoundingClientRect();
  const s=r.width/200, ox=r.left-br.left, oy=r.top-br.top+(r.height-226*s)/2;
  const mouth=[ox+100*s, oy+30*s];
  /* the lid becomes its own piece so it can pop off, wait to the side, and come back */
  const lid=svg.querySelector('.lid'), lidCopy=document.createElementNS(NS,'svg');
  lidCopy.setAttribute('viewBox','62 8 76 20');
  lidCopy.style.cssText=`position:absolute;left:${ox+62*s}px;top:${oy+8*s}px;width:${76*s}px;height:${20*s}px;z-index:4;overflow:visible;pointer-events:none`;
  lidCopy.innerHTML=`<rect x="62" y="8" width="76" height="20" rx="9" fill="${lid.getAttribute('fill')}"/>`;
  box.appendChild(lidCopy); lid.style.opacity=0;
  const OPEN='translate(-62px,-18px) rotate(-28deg)';
  jarMood(svg,'wow');
  lidCopy.animate([{transform:'none'},{transform:'translate(-4px,-30px) rotate(-8deg)',offset:.4},{transform:OPEN}],
    {duration:560,easing:'cubic-bezier(.3,1.3,.5,1)',fill:'forwards'});
  lidCopy.animate([{translate:'0 0'},{translate:'0 -4px'},{translate:'0 0'}],{duration:1400,delay:560,iterations:Infinity,easing:'ease-in-out',composite:'add'});
  /* coins nearest the top leave first: up through the neck, then out and up into the air */
  const pts=items.map(c=>({c,x:+c.getAttribute('x')+(+c.getAttribute('width'))/2,y:+c.getAttribute('y')+(+c.getAttribute('height'))/2})).sort((a,b)=>a.y-b.y);
  const start=520, step=90, rise=420;
  pts.forEach((p,i)=>{
    const t0=start+i*step;
    p.c.animate([{transform:'translate(0px,0px)'},{transform:`translate(${100-p.x}px,${-16-p.y}px)`}],{duration:rise,delay:t0,easing:'cubic-bezier(.55,0,.7,.5)',fill:'forwards'});
    setTimeout(()=>{
      const f=document.createElement('div'); f.className='flyer';
      f.innerHTML=`<svg viewBox="0 0 40 40" width="22" height="22"><use href="${p.c.getAttribute('href')}"/></svg>`;
      f.style.left=(mouth[0]-11)+'px'; f.style.top=(mouth[1]-11)+'px'; box.appendChild(f);
      const sway=(Math.random()<.5?-1:1)*(10+Math.random()*22), up=150+Math.random()*60, spin=360+Math.random()*360;
      f.animate([{transform:'translate(0,0) rotateY(0) scale(1)',opacity:1},
                 {transform:`translate(${sway}px,${-up*.55}px) rotateY(${spin*.5}deg) scale(.95)`,opacity:1,offset:.5},
                 {transform:`translate(${-sway*.4}px,${-up}px) rotateY(${spin}deg) scale(.7)`,opacity:0}],
        {duration:1100,easing:'cubic-bezier(.25,.6,.35,1)'}).onfinish=()=>f.remove();
      onEach&&onEach(i+1,n);
    },t0+rise*.75);
  });
  const empty=start+(n-1)*step+rise+200;
  setTimeout(()=>{ /* lid back on */
    lidCopy.getAnimations().forEach(a=>a.cancel());
    lidCopy.animate([{transform:OPEN},{transform:'translate(-6px,-24px) rotate(-6deg)',offset:.55},{transform:'none'}],
      {duration:560,easing:'cubic-bezier(.3,1.2,.5,1)',fill:'forwards'}).onfinish=()=>{
      lid.style.opacity=''; lidCopy.remove(); group.innerHTML='';
      /* a joyful spin, a shine across the glass and a warm glow */
      jarMood(svg,'happy',3200);
      spinFace(svg,2,1700);
      svg.animate([{transform:'translateY(0)'},{transform:'translateY(0)',offset:.12},{transform:'translateY(-14px)',offset:.5},{transform:'translateY(0)',offset:.85},{transform:'translateY(0)'}],{duration:1700,easing:'ease-in-out'});
      svg.animate([{filter:'drop-shadow(0 0 0 rgba(255,214,120,0))'},{filter:'drop-shadow(0 0 22px rgba(255,214,120,.85))',offset:.45},{filter:'drop-shadow(0 0 0 rgba(255,214,120,0))'}],{duration:2200,easing:'ease-out'});
      const shine=document.createElementNS(NS,'g'); shine.setAttribute('clip-path','url(#body)');
      shine.innerHTML='<rect x="-70" y="20" width="46" height="230" fill="url(#shineG)" transform="skewX(-18)"/>';
      svg.insertBefore(shine,svg.querySelector('.jarFace'));
      shine.firstChild.animate([{transform:'skewX(-18deg) translateX(0px)'},{transform:'skewX(-18deg) translateX(300px)'}],{duration:850,delay:1250,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'}).onfinish=()=>shine.remove();
      setTimeout(()=>stars(box,11,true),700);
      done&&done();
    };
  },empty);
}
/* the jar turns in place: the glass stays put and the face travels around it, thinning at the edges,
   faint and mirrored on the far side (you see it through the glass), then back to the front.
   A little wind-up first and a small overshoot at the end. */
function spinFace(svg,turns,ms){
  const R=72, parts=[...svg.querySelectorAll('.fw')].map(g=>{ const x0=+g.dataset.x, phi=Math.asin((x0-100)/R); return {g,x0,phi}; });
  const eyes=svg.querySelector('.eyes'); if(eyes) eyes.style.transform='';
  const end=turns*360, inOut=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2, out=t=>1-Math.pow(1-t,2);
  const angle=t=>t<.12?-18*out(t/.12):t<.84?-18+(end+30)*inOut((t-.12)/.72):end+12*(1-out((t-.84)/.16));
  const t0=performance.now(); svg._spin=1;
  (function frame(now){
    const t=Math.min(1,(now-t0)/ms), a=angle(t)*Math.PI/180;
    parts.forEach(p=>{
      const th=p.phi+a, c=Math.cos(th), x=100+R*Math.sin(th), k=c/Math.cos(p.phi);
      p.g.setAttribute('transform',t<1?`translate(${x.toFixed(2)} 0) scale(${k.toFixed(3)} 1) translate(${-p.x0} 0)`:'');
      p.g.setAttribute('opacity',t<1?(c>0?Math.min(1,.2+c*3.2):.2).toFixed(2):'');
    });
    if(t<1) requestAnimationFrame(frame); else svg._spin=0;
  })(t0);
}
/* tap a big jar and it giggles */
['homeJar','famJarBox','coJarBox','crJarBox'].forEach(id=>{ const box=$(id); if(!box) return;
  box.style.cursor='pointer';
  box.addEventListener('click',()=>{ const svg=box.querySelector('svg'); svg.classList.remove('hop'); void svg.getBoundingClientRect(); svg.classList.add('hop'); jarMood(svg,'happy',900); });
});
function renderCoins(target, amount){
  target.innerHTML='';
  const n=amount<=0?0:Math.max(1,Math.round(Math.min(amount/S.cap,1)*POUR.length));
  for(let i=0;i<n;i++){
    const [cx,cy,r,a]=POUR[i];
    const c=document.createElementNS(NS,'use');
    c.setAttribute('href','#coin');c.setAttribute('x',cx-r);c.setAttribute('y',cy-r);
    c.setAttribute('width',2*r);c.setAttribute('height',2*r);
    c.setAttribute('transform',`rotate(${a} ${cx} ${cy})`);
    target.appendChild(c);
  }
}
function stars(box,n,big){
  for(let i=0;i<n;i++){
    const st=document.createElement('div');st.className='star';
    st.innerHTML='<svg viewBox="0 0 24 24" width="13" height="13" style="color:#FFEFC0"><use href="#i-spark"/></svg>';
    const a=-Math.PI/2+(Math.PI*1.6*(i/Math.max(n-1,1))-Math.PI*.8), d=(big?70:46)+(i%3)*12;
    st.style.left='50%';st.style.top=big?'32%':'58%';
    st.style.setProperty('--dx',Math.cos(a)*d+'px');st.style.setProperty('--dy',Math.sin(a)*d+'px');
    st.style.setProperty('--rot',(i%2?200:-200)+'deg');
    st.style.animation=`starOut ${big?.95:.72}s cubic-bezier(.34,1.56,.64,1) forwards`;
    box.appendChild(st);setTimeout(()=>st.remove(),1000);
  }
}
function fanfare(box,txt){const f=document.createElement('div');f.className='fanfare';f.textContent=txt;box.appendChild(f);setTimeout(()=>f.remove(),1400)}

/* ── the moment of choice ── */
/* whichever jar is on screen right now: the big one on the jar screen, or the small one on Today */
function liveJar(){
  return $('s-jar').classList.contains('on')
    ? {box:$('homeJar'),svg:$('homeJarSvg'),mouth:$('mouth')}
    : {box:$('todayJar'),svg:$('todayJarSvg'),mouth:$('mouthT')};
}
function renderJar(){
  const t=jarTotal(), pct=Math.min(t/S.cap,1)*100;
  document.querySelectorAll('[data-bind="jar"]').forEach(e=>e.textContent='$'+t);
  document.querySelectorAll('[data-bind="capfill"]').forEach(e=>e.style.width=pct+'%');
  document.querySelectorAll('[data-bind="capText"]').forEach(e=>e.textContent=
    !S.stakes&&!t?'Empty for now':t>=S.cap?'Full for '+MONTH+' · shields stay on':'$'+t+' of your $'+S.cap+' cap');
  document.querySelectorAll('[data-bind="coinCount"]').forEach(e=>e.textContent=COINS.length+' coin'+(COINS.length===1?'':'s'));
  document.querySelectorAll('[data-bind="charityLine"]').forEach(e=>e.textContent=charity().l);
  document.querySelectorAll('.charityName').forEach(e=>e.textContent=charity().n);
  renderCoins($('coinStack'),t); renderCoins($('todayCoins'),t);
  $('coinList').innerHTML=COINS.length?COINS.map((c,i)=>`<div class="coinRow">
      <svg viewBox="0 0 40 40" width="22" height="22" style="flex:none"><use href="#coin"/></svg>
      <div style="flex:1;min-width:0"><b style="font-size:12.5px">${c.p}</b><div class="tiny">${c.when}</div></div>
      ${c.fresh?`<span class="chip" style="padding:6px 10px;font-size:11px" onclick="refundCoin(${i})">Refund</span>`:''}
      <span class="display num" style="font-size:15px;color:var(--gold-text);min-width:30px;text-align:right">$${c.amt}</span>
    </div>`).join(''):`<div class="tiny" style="padding:10px 0">${S.stakes?'No coins yet this month.':'No coins yet. Opening a shielded app is free for your first days.'}</div>`;
  renderD1();
}
function refundCoin(i){
  const c=COINS.splice(i,1)[0]; renderJar();
  toast('Refunded. $'+c.amt+' goes back to your card, no questions asked.');
}
function renderCharities(){
  if($('charitySpot')) renderSpot();
  $('charityList').innerHTML=CHARITIES.map((c,i)=>`<div class="tierbox${i===S.charity?' sel':''}" onclick="pickCharity(${i})">
    <div class="spread"><b style="font-size:14px">${c.n}</b>${i===S.charity?'<span class="pill mint">Your charity</span>':''}</div>
    <div class="tiny" style="margin-top:5px;line-height:1.5">${c.l}</div></div>`).join('');
}
/* the monthly spotlight: one featured cause, shown once at the top of the list. It shares ScrollJar with its own
   supporters (spec: charity spotlights as distribution). Never a push to switch: picking it is one tap, or nothing. */
function renderSpot(){
  const i=TODAY.getMonth()%CHARITIES.length, c=CHARITIES[i], mine=i===S.charity;
  $('charitySpot').innerHTML=`<div class="eyebrow">THIS MONTH'S SPOTLIGHT · ${MONTH.toUpperCase()}</div>
    <b style="display:block;font-size:15px;margin-top:6px">${c.n}</b><div class="tiny" style="margin-top:4px;line-height:1.5">${c.l}</div>
    ${mine?'<div class="tiny" style="margin-top:9px;color:var(--mint);font-weight:700">Already your charity.</div>'
      :`<button class="btn ghost" style="margin-top:10px" onclick="pickCharity(${i})">Give to them this month</button>`}`;
}
function pickCharity(i){
  S.charity=i; renderCharities(); renderJar();
  toast('Your jar now goes to '+charity().n+' on '+NEXT1+'.');
}
/* You: the monthly cap. Lowering it is instant; raising it waits 24 hours, in cold blood */
let capPending=null;
function toggleCap(){ const b=$('capBox'), open=b.style.display==='none'; b.style.display=open?'':'none'; $('capPill').setAttribute('aria-expanded',open); if(open) renderCap(); }
function renderCap(){
  $('capBox').innerHTML=`<div class="tiny" style="margin-bottom:7px">The most your jar can take in a month. When it's full, the shields stay on and nothing more is charged.</div>
    <div class="row" style="gap:6px;flex-wrap:wrap">${[20,35,50,75,100].map(v=>`<span class="chip${v===S.cap?' on':''}${v===capPending?' soon':''}" onclick="setCap(${v})">$${v}</span>`).join('')}</div>`;
}
function setCap(v){
  if(v===S.cap){ capPending=null; }
  else if(v<S.cap){ S.cap=v; capPending=null; renderJar(); toast('Cap lowered to $'+v+'. That happens straight away.'); }
  else { capPending=v; toast('Your cap goes up to $'+v+' in 24 hours. Raising it waits a day, in cold blood.'); }
  $('capPill').textContent='$'+S.cap+(capPending?' → $'+capPending:'')+' ›'; renderCap();
}
/* You: quiet mode rests the shields for a day, booked 24 hours ahead; cancelling is instant */
let quietOn=false;
function toggleQuiet(){
  quietOn=!quietOn; $('quietPill').textContent=quietOn?'Tomorrow':'Off'; $('quietPill').classList.toggle('mint',quietOn); $('quietPill').classList.toggle('chr',!quietOn);
  toast(quietOn?'Quiet mode is booked for tomorrow: the shields rest for the day. Booking a day ahead makes it a plan, not an impulse.':'Quiet mode cancelled. The shields stay on.');
}
/* the shield's first button, in the user's own words: "Back to my novel". Several things: all of them if short, else the first */
function backTo(d){
  const l=d.forList&&d.forList.length?d.forList:(d.forWhat?[d.forWhat]:[]);
  if(!l.length) return "I'll stay committed";
  const all=listAnd(l); return 'Back to '+(all.length<=24?all:l[0]);
}
/* every "stay" button after the shield says the same thing: "Back to my novel", "Actually, back to my novel" */
function setStayButtons(){
  const t=backTo(COMMITS[0]||{}), own=t.startsWith('Back to');
  document.querySelectorAll('[data-stay]').forEach(b=>{ const pre=b.dataset.stay; b.textContent = pre ? pre+(own?'b'+t.slice(1):t) : t; });
}
function showShield(){
  setStayButtons();
  const d=COMMITS[0]||{}, fw=(d.forWhat||'').replace(/\bmy\b/g,'your');
  $('shieldSub').innerHTML = fw ? `How about <b style="color:#EFEDFF">${fw}</b> instead?` : 'Your first deal. The choice is still yours.';
  $('shieldStreak').textContent = S.stage==='new' ? 'Day 1 · every hour counts from here' : S.streak+' days kept and counting';
  $('shieldOpen').textContent = S.stakes ? 'Open anyway · $'+curPrice(d) : 'Open anyway';
  $('ov-shield').classList.add('on');
}
/* ── the real-iOS bridge: shield → notification → our app ── */
function showBridge(){
  closeOv('ov-shield');
  if(!$('iosGrid').children.length) $('iosGrid').innerHTML=Array.from({length:20},()=>'<i></i>').join('');
  $('iosBanner').classList.remove('in'); $('ov-ios').classList.add('on');
  setTimeout(()=>$('iosBanner').classList.add('in'),550);
}
function tapBridge(){ closeOv('ov-ios'); d1Done('d1Pause'); showBreath(); }
function ignoreBridge(){ closeOv('ov-ios'); resist(); }

/* ── onboarding: our explainer → Apple's prompt → Face ID → Apple's picker ── */
function showSysAlert(){
  $('iosAlertBox').style.display=''; $('iosFaceId').style.display='none';
  $('ov-sysalert').classList.add('on');
}
function allowPerm(){
  $('iosAlertBox').style.display='none'; $('iosFaceId').style.display='flex';
  setTimeout(()=>{ closeOv('ov-sysalert'); openPicker(); },1000);
}
function denyPerm(){ closeOv('ov-sysalert'); $('ov-noperm').classList.add('on'); }
const PICK_CATS=['Social','Games','Entertainment','Creativity','Productivity & Finance','Education','Information & Reading','Health & Fitness','Utilities','Shopping & Food','Travel','Other'];
const pick={apps:new Set(),cats:new Set(),open:new Set(['Social'])};
let pickFor='setup', pickSaved=null;
function openPicker(mode){
  pickFor=mode||'setup';
  if(pickFor==='deal'){
    pickSaved={apps:new Set(pick.apps),cats:new Set(pick.cats)};
    pick.apps=new Set(NEW.picked?NEW.picked.apps:[]); pick.cats=new Set(NEW.picked?NEW.picked.cats:[]);
  }
  renderPicker(); $('ov-picker').classList.add('on');
}
function restorePick(){ if(pickFor==='deal'&&pickSaved){ pick.apps=pickSaved.apps; pick.cats=pickSaved.cats; } pickFor='setup'; pickSaved=null; }
function closePicker(){ restorePick(); closeOv('ov-picker'); }
function renderPicker(){
  const rows=[];
  PICK_CATS.forEach(c=>{
    const apps=c==='Social'?APPS:[], n=apps.filter((a,i)=>pick.apps.has(i)).length;
    const st=pick.cats.has(c)?'on':(n?'part':'');
    rows.push(`<div class="iosRow" onclick="togglePickCat('${c}')"><span class="iosCheck ${st}">${st==='on'?'✓':st==='part'?'–':''}</span>${c}
      ${apps.length?`<span class="iosChev ${pick.open.has(c)?'open':''}" onclick="event.stopPropagation();togglePickOpen('${c}')">›</span>`:''}</div>`);
    if(apps.length&&pick.open.has(c)) apps.forEach((a,i)=>rows.push(`<div class="iosRow sub" onclick="togglePickApp(${i})">
      <span class="iosCheck ${pick.apps.has(i)||pick.cats.has(c)?'on':''}">${pick.apps.has(i)||pick.cats.has(c)?'✓':''}</span>
      <span class="iosMiniIcon" style="background:${a.g}"></span>${a.n}</div>`));
  });
  rows.push(`<div class="iosRow" onclick="toast('Websites are picked here too, so the same app in Safari stays shielded.')"><span class="iosCheck"></span>Websites<span class="iosChev">›</span></div>`);
  $('pickList').innerHTML=rows.join('');
  $('pickDone').disabled=pickCount()===0;
}
const pickCount=()=>pick.apps.size+pick.cats.size;
function togglePickCat(c){ pick.cats.has(c)?pick.cats.delete(c):pick.cats.add(c); if(c==='Social') pick.apps.clear(); renderPicker(); }
function togglePickApp(i){ if(pick.cats.has('Social')){ pick.cats.delete('Social'); APPS.forEach((a,k)=>pick.apps.add(k)); }
  pick.apps.has(i)?pick.apps.delete(i):pick.apps.add(i); renderPicker(); }
function togglePickOpen(c){ pick.open.has(c)?pick.open.delete(c):pick.open.add(c); renderPicker(); }
function pickDone(){
  if(!pickCount()) return;
  if(pickFor==='deal'){ NEW.picked={apps:new Set(pick.apps),cats:new Set(pick.cats)}; restorePick(); closeOv('ov-picker'); renderNew(); return; }
  openFirst();
}
/* ── onboarding: your first deal. Two quick questions after the picker: when scrolling gets you,
   and what you'd rather do with that time. The answers become the first deal, and the shield
   quotes the second one back in the user's own words. ── */
const WHEN=[['mornings','In bed, first thing'],['work','While I work'],['evenings','At night'],['weekend','At the weekend'],['always','All day, honestly']];
const FOR_CHIPS=['sleep','reading','my kids','my partner','my project','moving more'];
const FEEL_CHIPS=['flat','tired','restless','a bit empty','annoyed','like the day slipped away','fine, honestly'];
const WEEK=[['M','Mon','Monday'],['T','Tue','Tuesday'],['W','Wed','Wednesday'],['T','Thu','Thursday'],['F','Fri','Friday'],['S','Sat','Saturday'],['S','Sun','Sunday']];
/* the days of "my own times" in plain words: every day, weekdays, weekends, Mon–Thu, or Mon, Wed and Fri */
function dayWords(d){
  const on=d.map((x,i)=>x?i:-1).filter(i=>i>=0), k=on.join('');
  if(on.length===7) return 'every day'; if(k==='01234') return 'weekdays'; if(k==='56') return 'weekends';
  const runs=[]; on.forEach(i=>{ const r=runs[runs.length-1]; r&&r[1]===i-1?r[1]=i:runs.push([i,i]); });
  return listAnd(runs.flatMap(([a,b])=>b-a>=2?[WEEK[a][1]+'–'+WEEK[b][1]]:b>a?[WEEK[a][1],WEEK[b][1]]:[WEEK[a][1]]));
}
const FIRST={step:0,scheds:[],mine:false,from:'22:00',to:'00:30',days:[1,1,1,1,1,1,1],feels:[],feelOwn:'',fors:[],own:'',v:{},heavy:false};
/* say it instead: on the phone, speech is turned into text and understood on-device, the answers are
   filled in for the user to confirm, and the recording is deleted at once. Here the voice is simulated,
   and a prototype-only row lets a tester pick what was "said" to see every case:
   clear (filled in) · mumbled (nothing filled, try again or tap) · off-topic (nothing filled, a hint)
   · vague (fill what's certain, ask one quick follow-up) · something heavy (a gentle way to support).
   Nothing ever moves on by itself: the user always checks and taps Next. */
const VOICE_DEMO=[
  {clear:{say:'Mostly in bed when I wake up, and then late at night, like after eleven.',
     apply(){ FIRST.scheds=['mornings']; FIRST.mine=true; FIRST.from='23:00'; FIRST.to='01:00'; }},
   off:{say:'Honestly, I just love my dog. He\'s the best.',hint:'We couldn\'t find a time in that. Try something like “in bed in the morning” or “after 11pm”.'},
   vague:{say:'Mostly at night, I guess.',ask:'At night. From about when?',opts:[['9pm','21:00'],['10pm','22:00'],['11pm','23:00'],['midnight','00:00']]}},
  {clear:{say:'Kind of empty, honestly. And a bit annoyed that the evening just went.',
     apply(){ FIRST.feels=['a bit empty','annoyed','like the day slipped away']; FIRST.feelOwn=''; }},
   off:{say:'Is this the thing that blocks apps?',hint:'That doesn\'t sound like a feeling. Try again, or just tap below.'},
   vague:{say:'Meh. I don\'t know.',apply(){ FIRST.feelOwn='meh, not sure'; },note:'We\'ve put that in your own words. Not knowing is an answer too.'},
   heavy:{say:'Honestly, kind of hopeless lately.',apply(){ FIRST.feelOwn='kind of hopeless'; FIRST.heavy=true; },note:'We\'ve put that in your own words.'}},
  {clear:{say:'I want to read more, and actually get some sleep. And play the guitar again.',
     apply(){ FIRST.fors=['sleep','reading']; FIRST.own='playing the guitar'; }},
   off:{say:'Wait, what time is it?',hint:'We couldn\'t find something you\'d rather do in that. Try again, or pick below.'},
   vague:{say:'Just… other stuff, I guess.',note:'That\'s a bit open. Pick anything below that fits, or say it again.'}}];
const SAY_KINDS=[['clear','A clear answer'],['mumble','Mumbled'],['off','Off-topic'],['vague','Too vague'],['heavy','Something heavy']];
/* things that sound heavy, typed or said: answered with support, never a diagnosis */
const HEAVY=/hopeless|worthless|can'?t go on|want to die|kill myself|self.?harm|hurt myself|don'?t want to be here|no point/i;
const isHeavy=()=>FIRST.heavy||HEAVY.test(FIRST.feelOwn);
let micTimer=null;
const vs=()=>FIRST.v[FIRST.step]||(FIRST.v[FIRST.step]={st:null,said:'',misses:0,note:''});
function firstGo(n){ clearTimeout(micTimer); const v=FIRST.v[FIRST.step]; if(v&&v.st==='rec') v.st=null; FIRST.step=n; renderFirst(); }
function firstMic(){
  clearTimeout(micTimer); const v=vs();
  if(v.st==='rec'){ firstSay('clear'); return; }
  v.st='rec'; renderFirst(); micTimer=setTimeout(()=>firstSay('clear'),3200);
}
function firstSay(kind){
  clearTimeout(micTimer); const v=vs(), d=VOICE_DEMO[FIRST.step][kind];
  if(FIRST.step===1&&kind!=='mumble'&&kind!=='off') FIRST.heavy=false;   /* a new answer replaces the last one */
  if(kind==='mumble'){ v.misses++; v.st='miss'; }
  else if(kind==='off'){ v.st='off'; v.said=d.say; v.note=d.hint; }
  else if(kind==='vague'&&d.ask){ v.st='ask'; v.said=d.say; v.note=d.ask; }
  else { d.apply&&d.apply(); v.st='heard'; v.said=d.say; v.note=d.note||'We\'ve filled it in below. Change anything that\'s off.'; }
  renderFirst();
}
function firstAsk(t){
  const v=vs(); FIRST.scheds=FIRST.scheds.filter(x=>x!=='always');
  if(t==='21:00'){ if(!FIRST.scheds.includes('evenings')) FIRST.scheds.push('evenings'); }
  else { FIRST.mine=true; FIRST.from=t; FIRST.to='07:00'; }
  v.st='heard'; v.note='Got it. Change anything that\'s off.'; renderFirst();
}
function firstTap(){ vs().st=null; renderFirst(); }
function micArea(){
  const v=vs(), again=`<button class="firstMicAgain" onclick="firstMic()"><svg width="13" height="13"><use href="#i-mic"/></svg>Try again</button>`,
    tap=`<button class="firstMicAgain plain" onclick="firstTap()">Tap instead</button>`;
  if(v.st==='rec') return `<button class="firstMic rec" onclick="firstMic()" aria-label="Stop recording"><span class="micWave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>Listening… tap when you're done</button>
    <div class="micDemo devNote"><span>Prototype · what you say:</span>${SAY_KINDS.filter(([k])=>VOICE_DEMO[FIRST.step][k]||k==='mumble').map(([k,l])=>`<button onclick="firstSay('${k}')">${l}</button>`).join('')}</div>`;
  if(v.st==='miss') return `<div class="firstHeard"><b style="font-size:13.5px">Sorry, we didn't catch that.</b>
      <div class="tiny" style="margin-top:4px">${v.misses>=2?'Voice isn\'t working out right now. Tapping below is quick too.':'Maybe try again somewhere a little quieter.'}</div>
      <div class="row" style="gap:6px">${again}${tap}</div></div>`;
  if(v.st==='off') return `<div class="firstHeard"><div class="eyebrow">YOU SAID</div><div class="q">“${esc(v.said)}”</div>
      <div class="tiny">${v.note}</div><div class="row" style="gap:6px">${again}${tap}</div></div>`;
  if(v.st==='ask') return `<div class="firstHeard"><div class="eyebrow">YOU SAID</div><div class="q">“${esc(v.said)}”</div>
      <b style="font-size:13.5px">${v.note}</b>
      <div class="firstChips" style="margin:8px 0 0">${VOICE_DEMO[0].vague.opts.map(([l,t])=>`<span class="chip" onclick="firstAsk('${t}')">${l}</span>`).join('')}</div></div>`;
  if(v.st==='heard') return `<div class="firstHeard"><div class="eyebrow">YOU SAID</div><div class="q">“${esc(v.said)}”</div>
      <div class="tiny">${v.note}</div>
      <button class="firstMicAgain" onclick="firstMic()"><svg width="13" height="13"><use href="#i-mic"/></svg>Say it again</button></div>`;
  return `<button class="firstMic" onclick="firstMic()"><svg width="16" height="16"><use href="#i-mic"/></svg>Say it instead</button>
    <div class="tiny firstPriv">Understood on your phone. The recording is deleted straight away.</div>`;
}
/* when: several windows can be picked; "all day" stands alone */
const WHEN_SHORT={mornings:'in the morning (6–10am)',work:'during work (9am–5pm, weekdays)',evenings:'at night (9pm–7am)',weekend:'at the weekend'};
const listAnd=x=>x.length>1?x.slice(0,-1).join(', ')+' and '+x[x.length-1]:(x[0]||'');
function whenParts(){
  const p=WHEN.filter(([k])=>FIRST.scheds.includes(k)).map(([k])=>({k,label:SCHED_LABEL[k],say:SCHED_SAY[k],short:WHEN_SHORT[k]}));
  if(FIRST.mine){ const w=`${hm(FIRST.from)}–${hm(FIRST.to)}`, d=dayWords(FIRST.days), all=d==='every day';
    p.push({k:'mine',label:all?w:`${w} ${d}`,say:(all?'every day':'on '+d)+', '+w,short:`from ${hm(FIRST.from)} to ${hm(FIRST.to)}${all?'':' on '+d}`}); }
  return p;
}
const whenSay=()=>{ const p=whenParts(); return p.length===1?p[0].say:listAnd(p.map(x=>x.short)); };
/* a window always keeps at least one day */
function firstDay(i){ if(FIRST.days[i]&&FIRST.days.filter(Boolean).length===1) return; FIRST.days[i]=FIRST.days[i]?0:1; renderFirst(); }
function firstWhen(k){
  if(k==='always'){ FIRST.scheds=FIRST.scheds.includes('always')?[]:['always']; FIRST.mine=false; }
  else { FIRST.scheds=FIRST.scheds.filter(x=>x!=='always');
    if(k==='mine') FIRST.mine=!FIRST.mine; else { const i=FIRST.scheds.indexOf(k); i<0?FIRST.scheds.push(k):FIRST.scheds.splice(i,1); } }
  renderFirst();
}
/* the feeling is a moment of noticing, not a score: it stays on the phone and is never shown back as a judgement */
const feelSay=()=>{ const f=FIRST.feels, own=FIRST.feelOwn.trim();
  if(isHeavy()) return '';
  if(!f.length&&!own) return 'Take a second. There\'s no wrong answer.';
  if(f.length===1&&f[0]==='fine, honestly'&&!own) return 'Good to hear. ScrollJar is for the times it isn\'t.';
  return 'Lots of people feel that way. It\'s a habit, not who you are, and habits can change.'; };
/* everything picked, in chip order, then the user's own words: "sleep, reading and my kids" */
const firstForList=()=>[...FOR_CHIPS.filter(c=>FIRST.fors.includes(c)),FIRST.own.trim()].filter(Boolean);
const firstFors=()=>{ const x=firstForList(); return x.length>1?x.slice(0,-1).join(', ')+' and '+x[x.length-1]:(x[0]||''); };
function openFirst(){ clearTimeout(micTimer); Object.assign(FIRST,{step:0,scheds:[],mine:false,from:'22:00',to:'00:30',days:[1,1,1,1,1,1,1],feels:[],feelOwn:'',fors:[],own:'',v:{},heavy:false}); renderFirst(); $('ov-first').classList.add('on'); }
function firstSentence(){
  const p=pickedName(pick), n=p.name.charAt(0).toUpperCase()+p.name.slice(1), fw=firstFors();
  return `<b>${esc(n)}</b> shielded ${whenSay()||SCHED_SAY.always}${fw?`, for <b>${esc(fw)}</b>`:''}.`;
}
function renderFirst(){
  const B=$('firstBody'), F=$('firstFoot'), many=pickedName(pick).many;
  $('firstKicker').innerHTML=obProg(FIRST.step+6,'your first deal');
  $('firstBack').style.visibility=FIRST.step?'visible':'hidden';
  if(FIRST.step===0){
    B.innerHTML=`<div class="display firstQ">When does scrolling<br>get you?</div>
      <div class="sub">Pick as many as you like. ${many?'Those apps':'That app'} will be shielded then, and you can change it any time.</div>
      ${micArea()}
      <div class="firstOpts">${WHEN.map(([k,l])=>`<button class="firstOpt${FIRST.scheds.includes(k)?' on':''}" aria-pressed="${FIRST.scheds.includes(k)}" onclick="firstWhen('${k}')"><b>${l}</b><span>${SCHED_NOTE[k]}</span></button>`).join('')}
        <button class="firstOpt${FIRST.mine?' on':''}" aria-pressed="${FIRST.mine}" onclick="firstWhen('mine')"><b>My own times</b><span>${FIRST.mine?hm(FIRST.from)+'–'+hm(FIRST.to)+', '+dayWords(FIRST.days):'pick a window'}</span></button>
        ${FIRST.mine?`<div class="firstTimes"><input class="timeIn" type="time" value="${FIRST.from}" aria-label="From" onchange="FIRST.from=this.value;renderFirst()"><span>to</span><input class="timeIn" type="time" value="${FIRST.to}" aria-label="To" onchange="FIRST.to=this.value;renderFirst()"></div>
          <div class="firstDays" role="group" aria-label="Days">${WEEK.map(([l,,full],i)=>`<button class="${FIRST.days[i]?'on':''}" aria-pressed="${!!FIRST.days[i]}" aria-label="${full}" onclick="firstDay(${i})">${l}</button>`).join('')}</div>`:''}</div>`;
    F.innerHTML=`<button class="btn chrome" ${FIRST.scheds.length||FIRST.mine?'':'disabled'} onclick="firstGo(1)">Next</button>`;
  } else if(FIRST.step===1){
    B.innerHTML=`<div class="display firstQ">When you look up and the time has gone, how do you feel?</div>
      <div class="sub">Pick as many as you like. It stays on your phone.</div>
      ${micArea()}
      <div class="firstChips">${FEEL_CHIPS.map(c=>`<span class="chip${FIRST.feels.includes(c)?' on':''}" role="checkbox" aria-checked="${FIRST.feels.includes(c)}" data-set="feels" data-k="${c}" onclick="firstChip('feels','${c}')">${c}</span>`).join('')}</div>
      <input class="timeIn" maxlength="40" placeholder="or in your own words" aria-label="How you feel, in your own words" value="${esc(FIRST.feelOwn)}" oninput="FIRST.feelOwn=this.value;FIRST.heavy=false;firstUpdate()">
      <div class="firstSay" id="firstFeelSay">${feelSay()}</div>
      <div class="card firstHeavy" id="firstHeavy" style="${isHeavy()?'':'display:none'}"><b>That sounds heavy.</b>
        <div class="tiny" style="margin-top:4px;line-height:1.55">Thank you for saying it. If things feel like too much, talking to someone can help, and you don't need to be in crisis to reach out.</div>
        <a class="btn calm" href="https://findahelpline.com" target="_blank" rel="noopener" style="margin-top:10px">Find someone to talk to</a>
        <div class="tiny" style="margin-top:7px">Free, confidential helplines near you. ScrollJar doesn't share this with anyone.</div></div>`;
    F.innerHTML=`<button class="btn chrome" onclick="firstGo(2)">Next</button>`;
  } else {
    B.innerHTML=`<div class="display firstQ">What would you rather<br>do with that time?</div>
      <div class="sub">Pick as many as you like. If you reach for a shielded app, ScrollJar will suggest them instead.</div>
      ${micArea()}
      <div class="firstChips">${FOR_CHIPS.map(c=>`<span class="chip${FIRST.fors.includes(c)?' on':''}" role="checkbox" aria-checked="${FIRST.fors.includes(c)}" data-set="fors" data-k="${c}" onclick="firstChip('fors','${c}')">${c}</span>`).join('')}</div>
      <input class="timeIn" id="firstIn" maxlength="40" placeholder="or in your own words" aria-label="What you'd rather do with that time" value="${esc(FIRST.own)}" oninput="FIRST.own=this.value;firstUpdate()">
      <div class="card firstDeal"><div class="eyebrow" style="margin-bottom:6px">YOUR DEAL</div><div id="firstLine">${firstSentence()}</div>
        <div class="tiny" style="margin-top:7px;line-height:1.5">Free for now: opening one gets you a pause, never a charge. Easier changes take 24 hours, stricter ones happen at once.</div></div>`;
    F.innerHTML=`<button class="btn mint" onclick="openSign()">Seal the deal</button>`;
  }
}
function firstChip(set,c){ const a=FIRST[set], i=a.indexOf(c); i<0?a.push(c):a.splice(i,1); firstUpdate(); }
function firstUpdate(){
  document.querySelectorAll('.firstChips .chip').forEach(el=>{ const on=FIRST[el.dataset.set].includes(el.dataset.k); el.classList.toggle('on',on); el.setAttribute('aria-checked',on); });
  if($('firstLine')) $('firstLine').innerHTML=firstSentence();
  if($('firstFeelSay')) $('firstFeelSay').textContent=feelSay();
  if($('firstHeavy')) $('firstHeavy').style.display=isHeavy()?'':'none';
}
function sealFirst(){
  setStage('new');
  const wp=whenParts(), one=wp.length===1&&wp[0].k!=='mine';
  const wins=wp.map(x=>x.k==='mine'?{from:FIRST.from,to:FIRST.to,days:[...FIRST.days]}:WIN[x.k]);
  Object.assign(COMMITS[0],{n:pickedName(pick).name,sched:one?wp[0].k:'custom',window:one?undefined:wp.map(x=>x.label).join(' · '),whenSay:whenSay(),wins,forWhat:firstFors(),forList:firstForList()});
  COMMITS[0].sig=FIRST.sig||'';
  S.feelAfter=[...FIRST.feels,FIRST.feelOwn.trim()].filter(Boolean);
  closeOv('ov-first'); $('ov-onb').classList.remove('on');
  renderCommits(); renderD1();
  const seal=$('d1Seal'); seal.classList.remove('stamp'); void seal.offsetWidth; seal.classList.add('stamp');
  setTimeout(()=>$('ov-last').classList.add('on'),900);   /* the last scroll: one last one, on purpose */
}

function pickedName(sel){
  const cats=[...sel.cats], a=sel.apps.size, list=x=>x.length>1?x.slice(0,-1).join(', ')+' and '+x[x.length-1]:x[0];
  if(cats.length) return {name:list(cats)+' apps'+(a?` and ${a} more`:''), many:true};
  return a===1 ? {name:APPS[[...sel.apps][0]].n, many:false} : {name:a+' apps', many:true};
}
/* ── day ~3: "want to make it real?" — stakes, charity, card. Real coins are free; Plus is optional. ── */
let realStep=0, realPrice=5, realCharity=0, realPlan='free', realAgree=false;
function openReal(){ realStep=0; realPrice=5; realCharity=S.charity; realPlan=S.plan; realAgree=false; renderReal(); $('ov-real').classList.add('on'); }
function realGo(n){ realStep=n; renderReal(); }
function renderReal(){
  [...$('realDots').children].forEach((d,i)=>d.classList.toggle('on',i<=realStep));
  const ch=CHARITIES[realCharity].n, K=$('realKicker'), B=$('realBody');
  if(realStep===0){ K.textContent='DAY 3';
    B.innerHTML=`<div class="display" style="font-size:21px;line-height:1.2;margin-bottom:8px">Three days. Five temptations.<br>All yours.</div>
      <div class="sub">Right now, opening a shielded app is free: you get the pause, then you're in. Make it real, and each time costs a coin you price yourself, <b>100% to a charity you pick.</b> Making it real is free too.</div>
      <div class="card" style="margin-top:12px;text-align:left"><b style="font-size:13px">Why money?</b><div class="tiny" style="margin-top:4px;line-height:1.55">A price is friction you can feel. It turns "just a quick look" into a real question: is going further worth it right now? Sometimes it is, and that's fine: the coin still does some good.</div></div>
      <button class="btn mint" style="margin-top:16px" onclick="realGo(1)">Make it real</button>
      <button class="btn ghost" style="margin-top:9px" onclick="closeOv('ov-real');toast('Staying as you are. Everything keeps working exactly as it does now.')">Not yet</button>`;
  } else if(realStep===1){ K.textContent='YOUR STAKES';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:12px">Price it in cold blood</div>
      <div class="card" style="text-align:center"><div class="amount num">$<span id="realP">${realPrice}</span></div>
        <input type="range" min="2" max="25" value="${realPrice}" style="width:100%;accent-color:var(--mint);margin-top:10px" oninput="realPrice=+this.value;$('realP').textContent=this.value">
        <div class="tiny" style="margin-top:4px">high enough to pause you, kind enough to forgive</div></div>
      <div class="eyebrow" style="margin:12px 2px 8px">WHERE IT GOES</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${CHARITIES.map((c,i)=>`<span class="chip${i===realCharity?' on':''}" onclick="realCharity=${i};renderReal()">${c.n}</span>`).join('')}</div>
      <div class="tiny" style="margin-top:12px;line-height:1.5">Your jar is capped at $${S.cap} a month. When it's full, the shields stay on and nothing more is charged.</div>
      <button class="btn mint" style="margin-top:14px" onclick="realGo(2)">Next</button>`;
  } else if(realStep===2){ K.textContent='HOW COINS ARE CHARGED';
    const f=cardFee(35), plus=realPlan!=='free';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">Once a month, by card</div>
      <div class="sub" style="margin-bottom:12px">On the 1st we charge whatever is in your jar. 100% of it goes to ${ch}. We never keep any of it.</div>
      <div class="card"><b style="font-size:13.5px">The card fee</b>
        <div class="tiny" style="margin-top:6px;line-height:1.55">Card companies charge a small fee. ${plus?'<b>Plus covers it, up to $1 a month.</b> Anything above that is added on top, so your coins arrive in full.':'On the free plan it\'s added on top, so your coins arrive in full.'}</div>
        <div class="feeRow"><span>A $35 jar</span><b>$35, all to charity</b></div>
        <div class="feeRow"><span>Card fee</span><b>${plus?(f<=PLUS_FEE_CAP?'covered by Plus':'$1 covered, + about $'+(f-PLUS_FEE_CAP).toFixed(2)):'+ about $'+f.toFixed(2)}</b></div></div>
      <div class="card"><div class="spread"><b style="font-size:13.5px">ScrollJar Plus</b><span class="pill chr">optional · billed by Apple</span></div>
        <div class="tiny" style="margin-top:6px;line-height:1.55">Covers card fees up to $1 a month, plus groups and challenges, a heads-up before your tricky hours, deep stats and unlimited deals. It's how ScrollJar earns money.</div>
        <div class="row" style="gap:7px;margin-top:10px">
          <span class="chip${realPlan==='free'?' on':''}" style="flex:1;text-align:center" onclick="realPlan='free';renderReal()">Not now</span>
          <span class="chip${realPlan==='yr'?' on':''}" style="flex:1;text-align:center" onclick="realPlan='yr';renderReal()">$29.99 / year</span>
          <span class="chip${realPlan==='mo'?' on':''}" style="flex:1;text-align:center" onclick="realPlan='mo';renderReal()">$3.99 / month</span></div></div>
      <button class="btn mint" onclick="realGo(3)">Continue to card</button>`;
  } else if(realStep===3){ K.textContent='YOUR CARD';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:12px">Add a card for your coins</div>
      <div class="fakeField"><span style="flex:1">•••• •••• •••• 4242</span><span class="tiny">12/28 · 123</span></div>
      <div class="mandate" style="margin-top:12px"><b>You allow ScrollJar to charge this card once a month</b>, on the 1st, for the coins in your jar, up to your <b>$${S.cap} cap</b>${realPlan==='free'?', plus the card fee':''}. We email you the amount before every charge. Any coin can be refunded within 48 hours, no questions asked.<br><br>
        Ending a deal is always free, with 24 hours' notice. Switching off Screen Time access, removing this card or deleting the app in the middle of a deal is different: we'll let you know and give you an hour to put things back. After that, it counts as one coin of <b>$${realPrice*5}</b> (5× your price).</div>
      <div class="agree${realAgree?' on':''}" onclick="realAgree=!realAgree;renderReal()"><span class="box">${realAgree?'✓':''}</span><span>I've read this and I agree.</span></div>
      <button class="btn gold" id="realSave" ${realAgree?'':'disabled'} onclick="realSave()">Save card</button>
      <div class="tiny" style="text-align:center;margin-top:9px">Your bank may ask you to confirm. That's normal.</div>`;
  } else { K.textContent='DONE';
    B.innerHTML=`<div style="text-align:center;padding:8px 0 4px">
      <svg viewBox="0 0 40 40" width="52" height="52" style="filter:drop-shadow(0 0 16px rgba(255,201,77,.7))"><use href="#coin"/></svg>
      <div class="display" style="font-size:22px;margin:12px 0 8px">It's real now.</div>
      <div class="sub">Next time you open a shielded app, a $${realPrice} coin drops in your jar. On ${NEXT1} it all goes to ${ch}.${realPlan==='free'?'':' Plus is on, so the card fee is on us.'}</div></div>
      <button class="btn mint" style="margin-top:16px" onclick="closeOv('ov-real')">Got it</button>`;
  }
}
function realSave(){
  if(!realAgree) return;
  const b=$('realSave'); b.disabled=true; b.textContent='Confirming with your bank…';
  setTimeout(()=>{ S.charity=realCharity; S.plan=realPlan; S.stakes=true;
    if(S.stage==='new'&&COMMITS[0]) COMMITS[0].price=realPrice;
    renderPlan(); renderCommits(); renderJar(); renderCharities(); realGo(4); },1200);
}
function resist(){
  ['ov-shield','ov-breath','ov-override'].forEach(closeOv); d1Done('d1Pause');
  const {box,svg,mouth}=liveJar();
  svg.classList.remove('hop');void svg.offsetWidth;svg.classList.add('hop');
  stars(box,7,true);
  jarMood(svg,'happy',1400);
  if(!S.firstResist){
    S.firstResist=true;
    setTimeout(()=>{ $('ov-firstwin').classList.add('on'); stars($('winJarBox'),11,true); },520);
  } else {
    S.streak++; updateGoal();
    toast('The jar smiled. Streak intact.');
  }
}
function showExit(title,sub){ $('exitTitle').textContent=title; $('exitSub').textContent=sub; $('ov-exit').classList.add('on'); }
/* the pause lasts BREATHS full breaths of BREATH_MS each (about 4 s in, 6 s out); the text and the buttons both follow these */
const BREATH_MS=10000, BREATHS=1;
const SEC_WORDS={5:'Five',10:'Ten',15:'Fifteen',20:'Twenty',25:'Twenty-five',30:'Thirty'};
let breathT, breathT2;
function showBreath(){
  closeOv('ov-shield');$('ov-breath').classList.add('on');
  $('breathBtns').style.display='none';
  $('breathTitle').textContent='No rush.';
  const secs=Math.round(BREATH_MS*BREATHS/1000);
  backPauseLine();
  $('breathSub').textContent=`The scroll will wait. ${SEC_WORDS[secs]||secs} seconds, ${BREATHS===1?'one breath':BREATHS===2?'two breaths':BREATHS+' breaths'}, then it's your call.`;
  startBreathCue();
  clearTimeout(breathT); clearTimeout(breathT2);
  cancelAnimationFrame(goRAF); $('breathGo').style.display='none';
  /* "Back to my novel" (the stay button) fades in a second before the breath ends; "Never mind, continue" when it ends */
  breathT=setTimeout(()=>{ const bb=$('breathBtns'); bb.style.display='block';
    bb.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:650,easing:'cubic-bezier(.2,.7,.3,1)'}); },BREATH_MS*BREATHS-1000);
  breathT2=setTimeout(launchContinue,BREATH_MS*BREATHS);
}
/* the orb's label follows its size for two guided breaths: "breathe in" while it grows (first 4 s of
   each 10 s cycle), "breathe out" while it shrinks. Then the orb breathes smaller and the label settles
   on "breathe". The orb restarts from empty each time the pause opens. */
let cueT=0;
function startBreathCue(){
  const orb=$('breathOrb'), cue=$('breathCue');
  orb.style.animation='none'; void orb.offsetWidth; orb.style.animation='';
  clearInterval(cueT); cue.textContent='breathe in';
  const anim=orb.getAnimations()[0]; if(!anim){ cue.textContent='breathe'; return; }
  /* a slow crossfade that starts just before the turn of the breath, so the new word is fully
     there as the ball changes direction: 0.5 s out, swap, 0.7 s in */
  let busy=false;
  cueT=setInterval(()=>{
    if(!$('ov-breath').classList.contains('on')){ clearInterval(cueT); return; }
    const t=anim.playState==='finished'?2*BREATH_MS:anim.currentTime;
    const next=t+500>=2*BREATH_MS?'breathe':((t+500)%BREATH_MS)<4000?'breathe in':'breathe out';
    if(next==='breathe'&&cue.textContent==='breathe'){ clearInterval(cueT); return; }
    if(busy||cue.textContent===next) return;
    busy=true;
    cue.animate([{opacity:1},{opacity:0}],{duration:500,easing:'ease-in',fill:'forwards'}).onfinish=()=>{
      cue.textContent=next;
      cue.animate([{opacity:0},{opacity:1}],{duration:700,easing:'ease-out',fill:'forwards'}).onfinish=()=>{ busy=false; };
    };
  },100);
}
/* "Never mind, continue" bounces like a pinball in the space below the stay button ("Back to my novel") and stops at
   a random moment (7–9 s), always well away from where it stopped last time, so the thumb can't
   learn it. Hard, not mean: it can be tapped while moving, never covers the main button, and with
   reduced motion it just appears in a new spot. */
let goRAF=0, goLastStop=null;
function launchContinue(){
  const b=$('breathGo'), ov=$('ov-breath'), stay=$('breathBtns');
  cancelAnimationFrame(goRAF); b.style.display='';
  /* a soft entrance: fades and grows in while it starts to move */
  b.animate([{opacity:0,transform:'scale(.85)',filter:'blur(3px)'},{opacity:1,transform:'none',filter:'none'}],{duration:650,easing:'cubic-bezier(.2,.7,.3,1)'});
  const W=b.offsetWidth, H=b.offsetHeight, minX=16, maxX=ov.clientWidth-16-W,
        minY=stay.offsetTop+stay.offsetHeight+14, maxY=ov.clientHeight-18-H;
  const far=(x,y)=>!goLastStop||Math.hypot(x-goLastStop[0],y-goLastStop[1])>=70;
  const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
  const rnd=(lo,hi)=>lo+Math.random()*(hi-lo);
  let x=rnd(minX,maxX), y=rnd(minY,maxY);
  const put=()=>{ b.style.left=x+'px'; b.style.top=y+'px'; };
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){
    for(let i=0;i<30&&!far(x,y);i++){ x=rnd(minX,maxX); y=rnd(minY,maxY); }
    goLastStop=[x,y]; put(); return; }
  put();
  const a=rnd(20,55)*Math.PI/180, sp=rnd(170,200);
  let vx=Math.cos(a)*sp*(Math.random()<.5?-1:1), vy=Math.sin(a)*sp*(Math.random()<.5?-1:1);
  const start=performance.now(), stopAt=rnd(7000,9000); let t0=start, braking=false;
  const step=t=>{ if(!ov.classList.contains('on')) return;
    const dt=Math.min(.05,(t-t0)/1000); t0=t; x+=vx*dt; y+=vy*dt;
    if(x<minX){x=minX;vx=Math.abs(vx)} else if(x>maxX){x=maxX;vx=-Math.abs(vx)}
    if(y<minY){y=minY;vy=Math.abs(vy)} else if(y>maxY){y=maxY;vy=-Math.abs(vy)}
    /* brake once it's time and it will come to rest far from the last stop (or after 1.5 s extra) */
    if(!braking && t-start>stopAt && (far(clamp(x+vx/6,minX,maxX),clamp(y+vy/6,minY,maxY))||t-start>stopAt+1500)) braking=true;
    if(braking){ const f=Math.exp(-6*dt); vx*=f; vy*=f; }
    put();
    if(!braking||Math.hypot(vx,vy)>8) goRAF=requestAnimationFrame(step); else goLastStop=[x,y]; };
  goRAF=requestAnimationFrame(step);
}
function showOverride(){
  closeOv('ov-breath');
  const d=COMMITS[0]||{n:'Your deal',price:5}, price=curPrice(d);
  if(S.stakes&&jarTotal()+price>S.cap){
    ['ov-shield','ov-instead'].forEach(closeOv);
    showExit('Your jar is full for '+MONTH+'.','You set a $'+S.cap+' cap, so nothing more can be charged. The shield stays on until the tip-out on '+NEXT1+'.');
    return;
  }
  $('ovrEyebrow').textContent=d.n.toUpperCase()+' · 15 MINUTES';
  $('ovrSub').textContent = S.stakes ? "Totally allowed. It costs the price you set, and every cent goes to charity."
    : 'Totally allowed, and free for your first days. From day 3 you can make each time cost a coin you price yourself, 100% to charity.';
  $('ovrCost').style.display = S.stakes ? '' : 'none'; $('ovrPrice').textContent='$'+price;
  $('ovrPay').textContent = S.stakes ? 'Drop a coin & open' : 'Open for 15 minutes';
  $('ovrPay').className = 'btn '+(S.stakes?'gold':'mint');
  $('ovrNote').textContent = S.stakes ? 'refundable for 48h, no questions' : 'no card, no coin, nothing to undo';
  backCoinLine(); renderPeekRow();
  $('ovrRise').hidden=!(S.stakes&&d.rise);
  if(d.rise) $('ovrRise').textContent=price>d.price?`Rising price: your $${d.price}, plus a bit for each opening this week, never more than $${d.price*2}. Back to $${d.price} on Monday.`
    :`Rising price is on: the next one this week would be $${Math.min(d.price*2,d.price+riseStep(d.price))}. Back to $${d.price} every Monday.`;
  $('ov-override').classList.add('on');
}
let winT;
function payOverride(){
  closeOv('ov-override'); backSlip();
  const d=COMMITS[0]||{n:'Your deal',price:5}, price=curPrice(d);
  if(d.rise) d.opens=(d.opens||0)+1;
  if(!S.stakes){ openWindow(0); return; }
  const {box,svg}=liveJar();
  const f=document.createElement('div');f.className='flyer';
  f.innerHTML='<svg viewBox="0 0 40 40" width="26" height="26"><use href="#coin"/></svg>';
  f.style.left='calc(50% - 12px)';f.style.top='56%';box.appendChild(f);
  f.animate([{transform:'translateY(0) scale(.8) rotateY(0)',opacity:0},
             {transform:'translateY(-86px) scale(1.15) rotateY(360deg)',opacity:1,offset:.42},
             {transform:'translateY(-62px) scale(1.05) rotateY(560deg)',opacity:1,offset:.62},
             {transform:'translateY(6px) scale(.85) rotateY(900deg)',opacity:0}],
            {duration:820,easing:'cubic-bezier(.3,.05,.4,1)'}).onfinish=()=>{
    f.remove();
    svg.classList.remove('squash');void svg.getBoundingClientRect();svg.classList.add('squash');
    stars(box,5,false);
    COINS.unshift({p:d.n,amt:price,when:'Just now',fresh:true}); renderJar();
    jarMood(svg,'thanks',1600);
    openWindow(price);
  };
}
/* the unlock window: with a coin once it's real, without one in the first days */
let winKind='';
function openWindow(coin,peekMin,kind){
  winKind=kind||'';
  $('winCoin').style.display = coin ? '' : 'none';
  $('winTitle').textContent = winKind==='last' ? 'Your last scroll.' : peekMin ? 'Your free peek.' : coin ? 'Coin dropped. Enjoy it.' : "You're in. Enjoy it.";
  $('winSub').innerHTML = winKind==='last' ? 'On purpose this time. Your shield goes on when it ends.'
    : peekMin ? `No coin, and today still counts as kept. The shield comes back in ${peekMin} minutes.`
    : coin ? `Your $${coin} is on its way to <span class="charityName">${charity().n}</span>.`
    : "No coin while you're getting started. The shield comes back when the time is up.";
  $('ov-window').classList.add('on');
  const mins=peekMin||15;
  let sec=mins*60-1;clearInterval(winT); $('winTimer').textContent=String(mins).padStart(2,'0')+':00';
  winT=setInterval(()=>{sec--;if(sec<0){endWindow();return}
    $('winTimer').textContent=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0')},1000);
}
function endWindow(){
  clearInterval(winT);closeOv('ov-window');go('home');
  if(winKind==='last'){ winKind=''; setTimeout(()=>showExit('That was the last unconscious one.','From now on, every scroll is a choice. Your shield is on.'),450); return; }
  setTimeout(()=>$('ov-mood').classList.add('on'), 500);
}
function logMood(k,label){
  MOODLOG.unshift({k,when:'just now'});
  closeOv('ov-mood'); renderMoodLedger();
  const L=MOODLOG.slice(0,10), w=L.filter(m=>m.k==='worse').length;
  if(k==='worse') toast(L.length<5 ? 'Noted. A few more answers and you\'ll see whether it actually helps.' : `Noted. Worse ${w} times out of your last ${L.length} — worth knowing.`);
  else if(k==='better') toast('Noted. Sometimes it genuinely helps — that counts too.');
  else toast('Noted. Fifteen minutes, no change.');
}

/* ── tip-out ceremony ── */
function runSettlement(){
  const SETTLE=['Collecting your coins','Verifying with Every.org','Sending to '+charity().n,'Receipt issued to you'];
  $('settleSteps').innerHTML=SETTLE.map(t=>`<div class="settleRow"><div class="settleDot">✓</div><div class="settleTxt">${t}</div></div>`).join('');
  document.querySelectorAll('#settleSteps .settleRow').forEach((r,i)=>setTimeout(()=>r.classList.add('done'), 1400+i*620));
}
function showTipout(){
  $('ov-tipout').classList.add('on'); runSettlement();
  renderJar();
  const total=jarTotal(), amt=document.querySelector('#ov-tipout [data-bind="jar"]');
  renderCoins($('tipCoins'),total); amt.textContent='$0';
  const svg=$('tipJar'), box=$('tipJarBox'); paintLids();
  setTimeout(()=>tipOutJar(svg,box,$('tipCoins'),(k,n)=>amt.textContent='$'+Math.round(total*k/n),
    ()=>{ amt.textContent='$'+total; }),350);
}
function showRough(){$('ov-rough').classList.add('on')}

/* ── lists ── */
/* ── deals: the apps you shield, when, at what price, and what the time is for ──
   Editing follows "cold blood": anything stricter (a higher price, longer shield hours) applies now;
   anything easier (a lower price, shorter hours) waits 24 hours. Ending a deal is free, with 24 hours' notice.
   Free includes 3 deals; Plus has unlimited. */
const SCHED_HOURS={always:168,mornings:28,evenings:70,work:40,weekend:48,custom:56};
const COMMITS=[
  {g:'linear-gradient(150deg,#FF7AC6,#8B5CF6)',n:'The scroll one',sched:'always',price:5,forWhat:'my novel'},
  {g:'linear-gradient(150deg,#37E2C0,#1E63FF)',n:'The loud one',sched:'evenings',price:10,forWhat:'sleep',rise:true,opens:1},
];
/* rising price (opt-in, chosen in cold blood): each opening in a week adds about a quarter of the price,
   in whole dollars, never more than double. Back to the deal's own price every Monday. */
const riseStep=p=>Math.ceil(p/4);
const curPrice=d=>d.rise?Math.min(d.price*2,d.price+riseStep(d.price)*(d.opens||0)):d.price;
const riseSteps=p=>{ const out=[]; for(let k=1;out[out.length-1]!==p*2;k++) out.push(Math.min(p*2,p+riseStep(p)*k)); return out; };
const riseSay=p=>{ const s=riseSteps(p); return s.length>1?`$${s.slice(0,-1).join(', $')}, then $${s[s.length-1]} at most`:`$${s[0]} at most`; };
const priceLine=c=>c.rise?`$${c.price}, rising${curPrice(c)>c.price?' (next $'+curPrice(c)+')':''}`:'$'+c.price;
const dealLine=c=>c.creator?`feeds shielded · tools open · posting ${CR.windows.map(winLabel).join(', ')} · $${c.price}`:`${c.window||SCHED_LABEL[c.sched]||c.sched} · ${S.stakes?priceLine(c):'free for now'} · ${c.forWhat?'for '+c.forWhat:'tap to say what it\'s for'}`;
function renderCommits(){
  if(typeof setStayButtons==='function') setStayButtons();
  $('commitList').innerHTML=COMMITS.map((c,i)=>`<div class="card spread dealCard" role="button" tabindex="0" style="padding:12px 13px;background:${i%2?'var(--tint-b)':'var(--tint-a)'}" onclick="openDeal(${i})" onkeydown="if(event.key==='Enter')openDeal(${i})">
    <div class="row"><div class="ic token" style="background:${c.g}"><svg width="17" height="17" style="color:rgba(255,255,255,.92)"><use href="#i-app"/></svg></div>
    <div><b style="font-size:13.5px">${c.n}</b><div class="tiny">${dealLine(c)}</div>${c.pending?`<div class="tiny" style="color:var(--gold-text);margin-top:2px">${c.pending}</div>`:''}</div></div>
    <span class="shieldchip"><svg width="15" height="15"><use href="#i-shield"/></svg></span></div>`).join('');
}
const NEW={sched:'always',price:5,forWhat:'',picked:null,rise:false};
const DEAL_COLOURS=['linear-gradient(150deg,#FFB86B,#FF5C8A)','linear-gradient(150deg,#8B7CF6,#5AA9FF)','linear-gradient(150deg,#37E2C0,#1E63FF)','linear-gradient(150deg,#FF7AC6,#8B5CF6)'];
const hm=t=>{ const [h,m]=t.split(':').map(Number); return (h%12||12)+(m?':'+String(m).padStart(2,'0'):'')+(h<12?'am':'pm'); };
const SCHED_NOTE={always:'all day, every day',mornings:'6–10am, every day',evenings:'9pm–7am, every night',work:'9am–5pm, Monday to Friday',weekend:'all day Saturday and Sunday'};
const SCHED_SAY={always:'all day, every day',mornings:'every morning, 6–10am',evenings:'every night, 9pm–7am',work:'on weekdays, 9am–5pm',weekend:'all weekend'};
const esc=t=>t.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function openNew(){
  Object.assign(NEW,{sched:'always',price:5,forWhat:'',picked:null,rise:false});
  $('newFor').value=''; $('newPrice').value=5; $('newLetter').value='';
  document.querySelectorAll('#schedChips .chip').forEach((c,i)=>c.classList.toggle('on',i===0)); $('customWindow').style.display='none';
  $('newLimit').style.display = S.plan==='free'&&COMMITS.length>=3 ? '' : 'none';
  renderNew(); go('new'); $('s-new').scrollTop=0;
}
function renderNew(){
  const custom=NEW.sched==='custom', win=custom?`${hm($('schedFrom').value)}–${hm($('schedTo').value)}`:'';
  $('priceV').textContent=NEW.price;
  $('schedNote').textContent = custom ? win+', every day' : SCHED_NOTE[NEW.sched];
  $('priceNote').textContent = (S.stakes?'each time you open anyway':'each time you open anyway, once you make it real')+' · 100% to '+charity().n;
  $('newRise').classList.toggle('on',NEW.rise); $('newRiseRow').setAttribute('aria-checked',NEW.rise);
  $('riseNote').innerHTML = NEW.rise ? `In a week: ${riseSay(NEW.price)}. Back to $${NEW.price} every Monday.`+riseCapWarn(NEW.price)
    : 'optional · each opening in a week costs a bit more, never more than double';
  const p=NEW.picked&&pickedName(NEW.picked);
  $('newAppsTitle').textContent = p ? p.name : 'Choose apps';
  $('newAppsSub').textContent = p ? 'tap to change · we only ever see anonymous tokens' : 'in Apple\'s own picker · we never see which';
  $('newAppsIcon').style.background = p ? DEAL_COLOURS[COMMITS.length%4] : 'var(--panel-2)';
  $('newAppsIcon').innerHTML = `<svg width="17" height="17" style="color:${p?'rgba(255,255,255,.92)':'var(--ink-2)'}"><use href="#${p?'i-app':'i-plus'}"/></svg>`;
  const fw=NEW.forWhat.trim();
  $('newSummary').innerHTML = !p ? '<div class="tiny" style="line-height:1.55">Choose the apps first. Everything else is ready to go.</div>'
    : `<div class="eyebrow" style="margin-bottom:6px">YOUR DEAL</div><div class="sub" style="color:var(--ink);line-height:1.55">
       <b>${esc(p.name)}</b> ${p.many?'are':'is'} shielded <b>${custom?'every day, '+win:SCHED_SAY[NEW.sched]}</b>.
       ${S.stakes?`Opening ${p.many?'one':'it'} anyway costs <b>$${NEW.price}</b>, 100% to ${charity().n}.`
         :`Opening ${p.many?'one':'it'} anyway is free for now; once you make it real it costs <b>$${NEW.price}</b>, 100% to ${charity().n}.`}
       ${NEW.rise?` If it gets easy, each opening in a week costs a bit more, up to <b>$${NEW.price*2}</b>, and it's back to $${NEW.price} every Monday.`:''}
       ${fw?` This time is for <b>${esc(fw)}</b>.`:''}</div>`;
  $('sealBtn').disabled=!p;
}
/* one coin at the top of a rising price must never fill the whole monthly cap on its own */
function riseCapWarn(p){ return p*2>=S.cap ? `<div class="riseWarn">At its highest, one coin would be $${p*2}: your whole $${S.cap} monthly cap. <span role="button" tabindex="0" onclick="go('you')">Review your cap</span> or pick a lower price.</div>` : ''; }
function sealIt(){
  if(!NEW.picked){ toast('Choose the apps first.'); return; }
  if(S.plan==='free' && COMMITS.length>=3){ toast('The free plan includes 3 deals. Plus has unlimited.'); go('paywall'); return; }
  const custom=NEW.sched==='custom';
  COMMITS.unshift({g:DEAL_COLOURS[COMMITS.length%4],n:pickedName(NEW.picked).name,sched:NEW.sched,price:NEW.price,forWhat:NEW.forWhat.trim(),rise:NEW.rise,opens:0,
    window:custom?`${hm($('schedFrom').value)}–${hm($('schedTo').value)}`:undefined});
  const lt=$('newLetter').value.trim(); if(lt) LETTERS.unshift({text:lt,written:new Date(),deal:COMMITS[0].n,mine:true});
  renderCommits(); go('home'); toast(lt?'Deal sealed, and a letter for '+monDay(daysAgo(-30))+'.':'Deal sealed. Your future self says thanks.');
  const card=$('commitList').firstElementChild; if(card){ card.classList.add('justSealed'); card.scrollIntoView({block:'center'}); }
}
/* editing a deal */
let dealI=0, dealDraft=null;
function tomorrowAt(){ const d=new Date(Date.now()+864e5); return d.toLocaleString('en-US',{weekday:'long'})+' at '+d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}); }
function openDeal(i){ dealI=i; dealDraft={...COMMITS[i]}; renderDeal(); $('ov-deal').classList.add('on'); }
function dealChanges(){
  const o=COMMITS[dealI], d=dealDraft, now=[], later=[];
  if(d.n!==o.n) now.push('name'); if(d.forWhat!==o.forWhat) now.push('what it\'s for'); if(d.charity!==o.charity&&d.charity!==undefined) now.push('charity');
  if(d.price>o.price) now.push('price up to $'+d.price); else if(d.price<o.price) later.push('price down to $'+d.price);
  if(d.sched!==o.sched){ (SCHED_HOURS[d.sched]>SCHED_HOURS[o.sched]?now:later).push('shield '+(SCHED_LABEL[d.sched]||d.sched)); }
  if(!!d.rise!==!!o.rise) (d.rise?now:later).push(d.rise?'rising price on':'rising price off');
  return {now,later};
}
function renderDeal(){
  const d=dealDraft, o=COMMITS[dealI], ch=dealChanges();
  const note=(isStricter,changed)=>!changed?'':`<div class="tiny dealNote ${isStricter?'now':'later'}">${isStricter?'Stricter, so this applies right away.':'Easier, so this applies in 24 hours ('+tomorrowAt()+').'}</div>`;
  $('dealBody').innerHTML=`
    <input class="timeIn" style="font-size:16px;font-family:'Bricolage Grotesque';font-weight:700" value="${d.n.replace(/"/g,'&quot;')}" aria-label="Deal name" oninput="dealDraft.n=this.value;dealSummary()">
    <div class="eyebrow" style="margin:14px 0 8px">WHEN THE SHIELD IS ON</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">${['always','mornings','evenings','work','weekend'].map(k=>`<span class="chip${d.sched===k?' on':''}" onclick="dealDraft.sched='${k}';renderDeal()">${{always:'Always',mornings:'Mornings',evenings:'Nights',work:'Work hours',weekend:'Weekends'}[k]}</span>`).join('')}</div>
    ${note(SCHED_HOURS[d.sched]>SCHED_HOURS[o.sched],d.sched!==o.sched)}
    <div class="eyebrow" style="margin:14px 0 8px">YOUR PRICE TO OPEN ANYWAY</div>
    <div class="card" style="text-align:center;margin-bottom:0"><div class="amount num" style="font-size:38px">$<span id="dealP">${d.price}</span></div>
      <input type="range" min="2" max="25" value="${d.price}" aria-label="Price" style="width:100%;accent-color:var(--mint);margin-top:8px" oninput="dealDraft.price=+this.value;$('dealP').textContent=this.value" onchange="renderDeal()"></div>
    ${note(d.price>o.price,d.price!==o.price)}
    <div class="card spread" style="margin:10px 0 0">
      <div style="flex:1;min-width:0;padding-right:10px"><b style="font-size:13px">Raise it if it gets easy</b>
        <div class="tiny" style="line-height:1.5">${d.rise?`In a week: ${riseSay(d.price)}. Back to $${d.price} every Monday.`:'each opening in a week costs a bit more, never more than double'}</div>${d.rise?riseCapWarn(d.price):''}</div>
      <div class="toggle${d.rise?' on':''}" role="switch" aria-checked="${!!d.rise}" aria-label="Rising price" tabindex="0" onclick="dealDraft.rise=!dealDraft.rise;renderDeal()"></div></div>
    ${note(!!d.rise,!!d.rise!==!!o.rise)}
    <div class="eyebrow" style="margin:14px 0 8px">WHAT THIS TIME IS FOR</div>
    <input class="timeIn" value="${d.forWhat.replace(/"/g,'&quot;')}" aria-label="What this time is for" oninput="dealDraft.forWhat=this.value;dealSummary()">
    <div id="dealSum"></div>
    <button class="btn mint" style="margin-top:12px" onclick="saveDeal()">Save changes</button>
    <button class="btn ghost" style="margin-top:9px" onclick="endDeal()">End this deal</button>
    <div class="tiny" style="text-align:center;margin-top:9px">Ending is always free. It takes 24 hours, so the choice is made in cold blood.</div>`;
  dealSummary();
}
function dealSummary(){
  const {now,later}=dealChanges(), el=$('dealSum'); if(!el) return;
  el.innerHTML=(now.length||later.length)?`<div class="card" style="margin:14px 0 0">
    ${now.length?`<div class="tiny"><b style="color:var(--ink)">Right away:</b> ${now.join(', ')}</div>`:''}
    ${later.length?`<div class="tiny" style="margin-top:${now.length?6:0}px"><b style="color:var(--ink)">${tomorrowAt()}:</b> ${later.join(', ')}</div>`:''}</div>`:'';
}
function saveDeal(){
  const {now,later}=dealChanges(), o=COMMITS[dealI], d=dealDraft;
  if(!now.length&&!later.length){ closeOv('ov-deal'); return; }
  o.n=d.n; o.forWhat=d.forWhat;
  if(d.price>o.price) o.price=d.price;
  if(SCHED_HOURS[d.sched]>SCHED_HOURS[o.sched]) o.sched=d.sched;
  if(d.rise&&!o.rise){ o.rise=true; o.opens=o.opens||0; }
  o.pending=later.length?'From '+tomorrowAt()+': '+later.join(', '):'';
  renderCommits(); closeOv('ov-deal');
  toast(later.length?(now.length?'Saved. The easier part starts in 24 hours.':'Saved. It starts in 24 hours, cold blood.'):'Saved. It applies right away.');
}
function endDeal(){
  const o=COMMITS[dealI]; o.pending='Ends '+tomorrowAt()+'. You can change your mind until then.';
  renderCommits(); closeOv('ov-deal'); toast('Ending in 24 hours. Nothing to pay.');
}
/* plans: Free (real coins, card fee shown on top) or Plus (fees covered, extras). Kindness is in both. */
function selTier(el,plan){ document.querySelectorAll('#s-paywall .tierbox').forEach(t=>t.classList.remove('sel')); el.classList.add('sel'); payPick=plan; }
let payPick='yr';
function payContinue(){
  if(payPick==='free'){ S.plan='free'; renderPlan(); go('you'); toast('You\'re on Free. Real coins still work; the card fee is shown on top.'); return; }
  S.plan=payPick; renderPlan(); go('you'); toast('Plus is on (billed by Apple). Card fees are on us now, up to $1 a month.');
}
function renderPlan(){
  if(typeof renderTricky==='function') renderTricky();
  const c=$('planCard'); if(!c) return;
  const plus=S.plan!=='free';
  c.innerHTML=`<div class="spread"><div><b style="font-size:13px">${plus?'ScrollJar Plus':'Free plan'}</b><div class="tiny">${plus?(S.plan==='creator'?'free while your challenge runs':(S.plan==='yr'?'$29.99 / year':'$3.99 / month'))+' · card fees covered':'real coins · 3 deals · card fee shown on top'}</div></div><span class="pill ${plus?'chr':'mint'}">${plus?'Manage':'See Plus'}</span></div>`;
}
/* ── the feed: outcomes only, never announcements ── */
function scene(kind){
  const S={
    run:`<svg viewBox="0 0 300 150" width="100%"><defs><linearGradient id="sk1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF9E7A"/><stop offset=".55" stop-color="#8B7CF6"/><stop offset="1" stop-color="#2B2153"/></linearGradient></defs>
      <rect width="300" height="150" fill="url(#sk1)"/><circle cx="228" cy="46" r="17" fill="#FFE9A8" opacity=".95"/>
      <path d="M0 108 L64 78 L118 100 L172 68 L232 96 L300 74 V150 H0z" fill="#241C4A" opacity=".85"/>
      <path d="M0 128 L70 112 L140 126 L212 106 L300 122 V150 H0z" fill="#150F30"/></svg>`,
    book:`<svg viewBox="0 0 300 150" width="100%"><rect width="300" height="150" fill="#1A1633"/>
      <rect x="42" y="26" width="216" height="98" rx="7" fill="#F3EEE2"/><rect x="146" y="26" width="8" height="98" fill="#DCD3C0"/>
      ${Array.from({length:6},(_,i)=>`<rect x="58" y="${44+i*12}" width="72" height="4" rx="2" fill="#C9BFA8"/><rect x="170" y="${44+i*12}" width="72" height="4" rx="2" fill="#C9BFA8"/>`).join('')}
      <circle cx="252" cy="120" r="26" fill="#FFC94D" opacity=".22"/></svg>`,
    guitar:`<svg viewBox="0 0 300 150" width="100%"><rect width="300" height="150" fill="#12233A"/>
      <ellipse cx="120" cy="92" rx="52" ry="44" fill="#C9772E"/><ellipse cx="120" cy="92" rx="15" ry="15" fill="#3A2412"/>
      <rect x="160" y="82" width="118" height="14" rx="5" fill="#7A4A1E"/><rect x="266" y="70" width="20" height="38" rx="6" fill="#5C3616"/>
      <circle cx="60" cy="40" r="30" fill="#37E2C0" opacity=".16"/></svg>`,
  };return S[kind];
}
const FEED=[
  {t:'post',a:'M',c:'linear-gradient(150deg,#8B7CF6,#5AA9FF)',n:'Marta',w:'2h ago',
   body:'Ran the long way home instead of scrolling on the sofa.',photo:'run',kudos:4},
  {t:'week',a:'N',c:'linear-gradient(150deg,#37E2C0,#1E63FF)',n:'Noor',w:'5h ago',
   body:"Noor's week held: the deal kept 6 days running.",kudos:7},
  {t:'quiet',a:'G',c:'linear-gradient(150deg,#FFB86B,#FF5C8A)',n:'Giulia',w:'yesterday',
   body:'Giulia regained an hour for herself.',sub:'kept private — she chose the quiet post',kudos:3,supporter:true},
  {t:'jar',a:'C',c:'linear-gradient(150deg,#37E2C0,#8B7CF6)',n:'Casa Jar',w:'this week',
   body:'The jar gained $23 this week.',sub:'from the four of you — never who, never how much each',kudos:6},
  {t:'post',a:'You',c:'linear-gradient(150deg,#FFE9A8,#E0A422)',n:'You',w:'yesterday',
   body:'Finished chapter three. Turns out books still work.',photo:'book',kudos:5},
  {t:'tipout',a:'C',c:'linear-gradient(150deg,#37E2C0,#8B7CF6)',n:'Casa Jar',w:monDay(new Date(TODAY.getFullYear(),TODAY.getMonth(),1)),
   body:'The jar tipped out — $52 to four causes.',sub:'receipt from Every.org',kudos:11},
  {t:'joined',a:'S',c:'linear-gradient(150deg,#FF9E7A,#FFC94D)',n:'Sofia',w:monDay(new Date(TODAY.getFullYear(),TODAY.getMonth(),0)),
   body:'Sofia joined the jar.',sub:'we gave $1 to Noor\'s cause for the invite',kudos:2},
];
function feedCard(f,i,example){ return `
   <div class="fcard${example?' example':''}">
     <div class="fhead">
       <div class="av" style="background:${f.c};font-size:${f.a.length>1?10:14}px">${f.a}</div>
       <div style="flex:1"><div class="fname">${f.n}</div><div class="fwhen">${f.w}</div></div>
       ${f.supporter?'<span class="supporter">SUPPORTER</span>':''}
     </div>
     <div class="fbody">${f.body}</div>
     ${f.sub?`<div class="tiny" style="margin-top:3px">${f.sub}</div>`:''}
     ${f.photo?`<div class="fphoto">${scene(f.photo)}</div>`:''}
     <div class="frow">
       ${example?`<div class="kudos" aria-hidden="true"><svg width="14" height="14"><use href="#i-hifive"/></svg></div><span class="tiny">an example</span>`
       :`<div class="kudos${f.mine?' done':''}" role="button" tabindex="0" onclick="giveKudos(this,${i})" aria-label="High five" aria-pressed="${!!f.mine}"><svg width="14" height="14"><use href="#i-hifive"/></svg><span>${f.mine?'High-fived':'High five'}</span></div>
       <span class="tiny">${f.t==='coin'?'reported, not judged':''}</span>`}
     </div>
   </div>`; }
function renderFeed(){ $('feedList').innerHTML=FEED.map((f,i)=>feedCard(f,i)).join(''); }
/* a high five is a nod, never a number: nobody sees how many a note got */
function giveKudos(el,i){ if(el.classList.contains('done'))return; el.classList.add('done'); FEED[i].mine=true; el.setAttribute('aria-pressed','true'); el.querySelector('span').textContent='High-fived'; }
/* members — per-member settlement, amounts hideable */
const MEMBERS=[
  {a:'N',c:'linear-gradient(150deg,#37E2C0,#1E63FF)',n:'Noor',coins:2,amt:10,note:'9 days kept',cause:'GiveDirectly'},
  {a:'G',c:'linear-gradient(150deg,#FFB86B,#FF5C8A)',n:'Giulia',coins:3,amt:15,note:'supporter — no stakes right now',sup:true,cause:'UNICEF USA'},
  {a:'M',c:'linear-gradient(150deg,#8B7CF6,#5AA9FF)',n:'Marta',coins:1,amt:5,note:'14 days kept',cause:'Against Malaria Foundation'},
  {a:'You',c:'linear-gradient(150deg,#FFE9A8,#E0A422)',n:'You',coins:2,amt:8,note:'12 days kept'},
];
function renderMembers(){
  $('memberList').innerHTML=MEMBERS.map(m=>`
   <div class="memberRow">
     <div class="av" style="background:${m.c};font-size:${m.a.length>1?10:14}px">${m.a}</div>
     <div style="flex:1"><b style="font-size:13px">${m.n}</b><div class="tiny">${m.note} · gives to ${m.cause||charity().n}</div></div>
     ${m.sup?'<span class="supporter">SUPPORTER</span>':''}
   </div>`).join('');
}
/* nobody's coins are shown here: the jar shares its total, never who or how much each */
/* ══ WOBBLE — asking a friend for a hand ══
   Ladder of who speaks: (1) your friend, live  (2) your friend, in advance
   (3) you, in advance.  We only ever speak last, and briefly. */
const BUDDIES=[
  {id:'sofia',a:'S',c:'linear-gradient(150deg,#FF9E7A,#FFC94D)',n:'Sofia',st:'live',
   sub:'around right now'},
  {id:'marta',a:'M',c:'linear-gradient(150deg,#8B7CF6,#5AA9FF)',n:'Marta',st:'away',
   sub:'in her own session until 9:40 · left a note',
   note:"Whatever it is, it will still be there in twenty minutes and you'll be less tired. Put the kettle on. Tell me about it tomorrow. — M",
   when:'she wrote this on 12 June, in her own words, on a calm Tuesday'},
  {id:'noor',a:'N',c:'linear-gradient(150deg,#37E2C0,#1E63FF)',n:'Noor',st:'away',
   sub:'in his own session · no note left yet'},
  {id:'casa',a:'C',c:'linear-gradient(150deg,#37E2C0,#8B7CF6)',n:'Casa Jar',st:'live',
   sub:'3 people · Giulia is around', via:'Giulia', vc:'linear-gradient(150deg,#FFB86B,#FF5C8A)', va:'G'},
];
/* your own words, from your diary — the last rung of the ladder */
const OWNWORDS={t:"I want to be someone who finishes things. Not someone who meant to.",w:'you wrote this on the 14th, after a good day'};
const PULLS=['bored','wired','lonely','anxious','just habit',"can't say"];
let wobPull='', wobOpen=null, standbyNote='';

function openWobble(){
  closeOv('ov-instead');
  if(wobOpen){ wobResolved(wobOpen); $('ov-wobble').classList.add('on'); return; }
  $('wobBody').innerHTML=`
    <div class="spread" style="margin-bottom:8px"><div class="display" style="font-size:19px">Who's around?</div>
      <span class="backBtn" onclick="closeOv('ov-wobble')">✕</span></div>
    <div class="sub" style="margin-bottom:13px">One tap. They get one quiet ping — it can't unlock anything and it won't break their shield.</div>
    <div id="wobList"></div>
    <div class="tiny" style="margin:2px 2px 10px">what's pulling? — optional, and only they see it</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap" id="wobPulls"></div>
    <div class="tiny" style="text-align:center;margin-top:14px">This isn't a hall pass. A coin still costs what you set it at — this is just company.</div>`;
  $('wobList').innerHTML=BUDDIES.map(b=>`
    <div class="memberRow wobRow" onclick="sendWobble('${b.id}')">
      <div class="av" style="background:${b.c};font-size:${b.a.length>1?10:14}px">${b.a}</div>
      <div style="flex:1"><b style="font-size:13px">${b.n}</b><div class="tiny">${b.sub}</div></div>
      <span class="sdot ${b.st}"></span>
    </div>`).join('');
  $('wobPulls').innerHTML=PULLS.map(p=>`<span class="chip" onclick="pickPull(this,'${p}')">${p}</span>`).join('');
  $('ov-wobble').classList.add('on');
}
function pickPull(el,p){
  const on=el.classList.contains('on');
  document.querySelectorAll('#wobPulls .chip').forEach(c=>c.classList.remove('on'));
  if(!on){el.classList.add('on');wobPull=p}else{wobPull=''}
}
function sendWobble(id){
  const b=BUDDIES.find(x=>x.id===id); wobOpen=id;
  $('wobBody').innerHTML=`
    <div style="text-align:center;padding:26px 6px 20px">
      <svg width="34" height="34" style="color:var(--violet)"><use href="#i-wave"/></svg>
      <div class="display" style="font-size:18px;margin-top:14px">Sent to ${b.n}.</div>
      <div class="sub" style="margin-top:7px">Nothing else happens on your side. Stay here or don't.</div>
      <div class="wobDots" style="margin-top:16px"><i></i><i></i><i></i></div>
    </div>`;
  setTimeout(()=>{ if(wobOpen===id) wobResolved(id); },1300);
}
function wobResolved(id){
  const b=BUDDIES.find(x=>x.id===id);
  if(b.st==='live') return wobLive(b);
  if(b.note) return wobStandby(b);
  return wobOwn(b);
}
/* (1) friend is available — a real, small exchange that closes itself */
function wobLive(b){
  const who=b.via||b.n, av=b.va||b.a, col=b.vc||b.c;
  $('wobBody').innerHTML=`
    <div class="spread" style="margin-bottom:10px"><div class="display" style="font-size:19px">${who} is around.</div>
      <span class="backBtn" onclick="closeOv('ov-wobble')">✕</span></div>
    <div class="row" style="gap:9px;margin-bottom:4px">
      <div class="av" style="background:${col};font-size:${av.length>1?10:14}px">${av}</div>
      <div class="tiny">answered in 11 seconds</div></div>
    <div class="wobBubble me">${wobPull?'wobbling — '+wobPull:'wobbling.'}</div>
    <div class="wobBubble">here. don't do anything for a minute, I'm putting the kettle on too.</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:14px" id="wobReplies"></div>
    <button class="btn mint" style="margin-top:14px" onclick="wobEnd('${b.id}',true)">That's enough — I'm alright</button>
    <div class="tiny" style="text-align:center;margin-top:10px">This closes itself in five minutes. It's a hand, not a chat app.</div>`;
  $('wobReplies').innerHTML=['thanks','stay a sec','tell me something dull','I nearly opened it']
    .map(r=>`<span class="chip" onclick="wobReply(this,'${r}')">${r}</span>`).join('');
}
function wobReply(el,r){
  el.parentElement.remove();
  const bod=$('wobBody');
  const me=document.createElement('div'); me.className='wobBubble me'; me.textContent=r;
  bod.insertBefore(me, bod.querySelector('.btn'));
  setTimeout(()=>{
    const them=document.createElement('div'); them.className='wobBubble';
    them.textContent='ok. going to stop typing now so you can go do the thing.';
    bod.insertBefore(them, bod.querySelector('.btn'));
  },700);
}
/* (2) friend is in their own session — their words, written in cold blood */
function wobStandby(b){
  $('wobBody').innerHTML=`
    <div class="spread" style="margin-bottom:8px"><div class="display" style="font-size:19px;line-height:1.2">${b.n} is in her own session.</div>
      <span class="backBtn" onclick="closeOv('ov-wobble')">✕</span></div>
    <div class="sub">We didn't interrupt her — that's the deal we make with everyone, including you.</div>
    <div class="card" style="margin-top:14px">
      <div class="eyebrow">SHE LEFT THIS FOR EXACTLY THIS MOMENT</div>
      <div class="noteQ">${b.note}</div>
      <div class="tiny">${b.when}</div>
    </div>
    <div class="tiny" style="margin:2px 2px 0">She'll see that you reached for her — later, gently, and never as something she missed.</div>
    <button class="btn mint" style="margin-top:14px" onclick="wobEnd('${b.id}',true)">Alright. I'll wait it out</button>
    <button class="btn ghost" style="margin-top:9px" onclick="wobThank('${b.n}')">Tell her it landed</button>`;
}
/* (3) nobody left words — so we hand you your own, and say almost nothing */
function wobOwn(b){
  $('wobBody').innerHTML=`
    <div class="spread" style="margin-bottom:8px"><div class="display" style="font-size:19px;line-height:1.2">${b.n} is in his own session.</div>
      <span class="backBtn" onclick="closeOv('ov-wobble')">✕</span></div>
    <div class="sub">He hasn't left a note yet, and we're not going to write one in his voice.</div>
    <div class="card" style="margin-top:14px">
      <div class="eyebrow">SO HERE ARE YOURS INSTEAD</div>
      <div class="noteQ own">${OWNWORDS.t}</div>
      <div class="tiny">${OWNWORDS.w}</div>
    </div>
    <button class="btn mint" style="margin-top:14px" onclick="wobEnd('${b.id}',true)">Right. Still true</button>
    <button class="btn ghost" style="margin-top:9px" onclick="closeOv('ov-wobble');openStandby()">Write mine, for when it's me</button>`;
}
function wobThank(n){ toast(n+' will see that her words landed. Nothing else — not when, not why.'); }
function wobEnd(id,ok){
  wobOpen=null; wobPull='';
  document.querySelectorAll('#wobPulls .chip').forEach(c=>c.classList.remove('on'));
  closeOv('ov-wobble');
  if(ok) showExit('Go put the kettle on.','Nothing else is being asked of you right now.');
}
/* ══ STANDBY NOTE COMPOSER ══
   The one place we let a model near this feature — and only *before* the moment,
   never during it. It helps you find your words; it never writes them for you and
   it never speaks at delivery time. Delivery is a dumb lookup, by design. */
const SB_Q=[
  {k:'say',   q:"What do you actually say to them when they're like this?", ph:"it's late, it's not urgent"},
  {k:'works', q:"And what works on you, at 11pm?",                          ph:"someone telling me to go outside"},
  {k:'small', q:"One small thing they could do in the next ten minutes",    ph:"put the kettle on"},
];
const SB_EX=[
  "It's late, not urgent. Put the kettle on and text me in the morning — I'll ask.",
  "You're tired. Tired wants an off switch, not content. Go find a better one.",
  "Nothing in there right now is worth the twenty minutes. I'd know.",
  "I'm not around, but I'm on your side. Go outside for four minutes — it usually does it.",
  "Do the boring thing. The boring thing always works and I hate that too.",
  "If it still feels like this tomorrow, call me. It usually doesn't.",
];
const SB_TONES=[
  {k:'warm',      n:'warm'},
  {k:'dry',       n:'dry'},
  {k:'funny',     n:'funny'},
  {k:'practical', n:'practical'},
];
let sbStep=0, sbAns={say:'',works:'',small:''}, sbTone='warm', sbDraft='';

function openStandby(){ sbStep = standbyNote ? 2 : 0; sbRender(); $('ov-standby').classList.add('on'); }
function sbGo(n){ sbStep=n; sbRender(); }
function sbRender(){
  [...$('sbDots').children].forEach((d,i)=>d.classList.toggle('on',i<=sbStep));
  if(sbStep===0) return sbStart();
  if(sbStep===1) return sbQuestions();
  return sbEditor();
}
/* step 0 — start honestly: your words, or someone else's to push off from */
function sbStart(){
  $('sbTitle').textContent='Your standby note';
  $('sbBody').innerHTML=`
    <div class="sub" style="margin-bottom:14px">Write it now, while you're calm. It's only ever sent when a friend reaches for you and you're in your own session — so what they get is you, not us.</div>
    <button class="btn mint" onclick="sbGo(1)">Help me find the words</button>
    <button class="btn ghost" style="margin-top:9px" onclick="sbBlank()">I know what to say</button>
    <div class="eyebrow" style="margin:18px 2px 9px">OR START FROM SOMEONE ELSE'S</div>
    <div id="sbEx"></div>
    <div class="tiny" style="margin-top:4px">Other people let us share these. Take one and make it yours — a borrowed note still beats no note.</div>`;
  $('sbEx').innerHTML=SB_EX.map((x,i)=>`<div class="exNote" onclick="sbUseEx(${i})">${x}</div>`).join('');
}
function sbBlank(){ sbDraft=standbyNote||''; sbGo(2); }
function sbUseEx(i){ sbDraft=SB_EX[i]; sbGo(2); toast("Now change it until it sounds like you."); }
/* step 1 — three questions. every word in the draft comes from these answers. */
function sbQuestions(){
  $('sbTitle').textContent='Three questions';
  $('sbBody').innerHTML=`
    <div class="sub" style="margin-bottom:14px">Answer however you like. Everything in the draft will be built from what you type here — nothing gets invented in your voice.</div>
    ${SB_Q.map(q=>`<div class="sbQ"><label>${q.q}</label>
      <input id="sb-${q.k}" class="timeIn" placeholder="${q.ph}" value="${sbAns[q.k]}"></div>`).join('')}
    <button class="btn mint" style="margin-top:4px" onclick="sbBuild()">Build me some options</button>
    <button class="btn ghost" style="margin-top:9px" onclick="sbGo(0)">Back</button>`;
}
function sbBuild(){
  SB_Q.forEach(q=>sbAns[q.k]=($('sb-'+q.k).value||'').trim().replace(/[.!]+$/,''));
  if(!sbAns.say && !sbAns.works && !sbAns.small){ toast('Give me one line to work from — anything.'); return; }
  sbGo(2);
  if(!sbDraft) sbDraft=sbDrafts()[0].t;
  sbRender();
}
const cap=t=>t?t.charAt(0).toUpperCase()+t.slice(1):'';
function sbDrafts(){
  const say=sbAns.say||"it's late, it's not urgent",
        wor=sbAns.works||"getting away from the screen",
        sml=sbAns.small||"put the kettle on";
  return [
    {k:'warm',      lab:'warm',      t:`${cap(say)}. ${cap(sml)} — I'm not around, but I'm on your side.`},
    {k:'dry',       lab:'dry',       t:`${cap(say)}. ${cap(sml)}. That's the whole plan.`},
    {k:'funny',     lab:'funny',     t:`${cap(say)}. Also ${sml}, which is annoyingly effective.`},
    {k:'practical', lab:'practical', t:`${cap(sml)} — for me it's ${wor}. Tell me tomorrow, I'll ask.`},
  ];
}
/* step 2 — editor: their text, a cold-read check, and the exact card it becomes */
function sbEditor(){
  $('sbTitle').textContent='Read it cold';
  const hasAns = sbAns.say||sbAns.works||sbAns.small;
  $('sbBody').innerHTML=`
    <textarea id="standbyText" class="timeIn" style="height:96px;resize:none;line-height:1.5"
      oninput="sbCheck()" placeholder="Whatever it is, it'll still be there in twenty minutes.">${sbDraft}</textarea>
    ${hasAns?`<div class="eyebrow" style="margin:14px 2px 8px">SAME WORDS, DIFFERENT TEMPERATURE</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap" id="sbTones"></div>`:''}
    <div class="card" style="margin-top:14px">
      <div class="eyebrow">THE COLD READ</div>
      <div id="sbFlags" style="margin-top:7px"></div>
    </div>
    <div class="card" style="background:linear-gradient(150deg,rgba(139,124,246,.14),rgba(55,226,192,.09))">
      <div class="eyebrow">THIS IS WHAT LANDS</div>
      <div class="noteQ" id="sbPrev" style="font-size:13.5px"></div>
      <div class="tiny">you wrote this today, on a calm Thursday</div>
    </div>
    <button class="btn mint" onclick="saveStandby()">Keep it on standby</button>
    <div class="row" style="gap:8px;margin-top:9px">
      <button class="btn ghost" style="flex:1" onclick="sbGo(1)">Rework it</button>
      <button class="btn ghost" style="flex:1" onclick="sbSign()">Sign it — L</button>
    </div>
    <div class="tiny" style="text-align:center;margin-top:10px">stays on your phone · nothing is generated at the moment it's sent · change it any time</div>`;
  if(hasAns) $('sbTones').innerHTML=sbDrafts().map(d=>
    `<span class="chip${d.k===sbTone?' on':''}" onclick="sbSetTone('${d.k}')">${d.lab}</span>`).join('');
  sbCheck();
}
function sbSetTone(k){
  sbTone=k; const d=sbDrafts().find(x=>x.k===k);
  $('standbyText').value=d.t;
  document.querySelectorAll('#sbTones .chip').forEach(c=>c.classList.toggle('on',c.textContent===d.lab));
  sbCheck();
}
function sbSign(){ const t=$('standbyText'); if(/—\s*L$/.test(t.value))return; t.value=t.value.trim()+' — L'; sbCheck(); }
/* the cold read — Voice Law + what actually survives being read at 11pm */
function sbCheck(){
  const t=($('standbyText').value||'').trim();
  const w=t?t.split(/\s+/).filter(Boolean).length:0;
  const f=[];
  const banned=t.match(/\b(failed?|wasted?|addicted?|addict|guilty|guilt|shame(ful)?|broke|violation|weak)\b/i);
  if(banned) f.push(['warn',`“${banned[0]}” is on the banned list. Name what's true, not what's wrong with them.`]);
  if(/^(don'?t|do not|stop|quit|no more)\b/i.test(t)) f.push(['warn',"That opens as an order. Orders bounce at 11pm — an invitation lands."]);
  if(/\b(streaks?|coins?|\$\d|\d+\s*(days?|nights?))\b/i.test(t)) f.push(['warn',"There's a number in here. They don't need a metric from you — they need you."]);
  if(w>40) f.push(['warn',`${w} words. This gets read at the worst possible moment; under 30 lands.`]);
  if(w&&w<5) f.push(['warn',"Very short. Fine if it's the right five words — read it again cold."]);
  if(!/[a-z]/i.test(t)) f.push(['warn',"Nothing to read yet."]);
  else if(!f.length) f.push(['ok',`${w} words, about ${Math.max(3,Math.round(w/3.2))} seconds. Reads clean — it'll land.`]);
  $('sbFlags').innerHTML=f.map(([k,m])=>`<div class="flagRow"><span class="flagDot ${k}"></span><span>${m}</span></div>`).join('');
  $('sbPrev').textContent=t||'—';
  $('sbPrev').style.opacity=t?1:.5;
}
function saveStandby(){
  standbyNote=($('standbyText').value||'').trim(); sbDraft=standbyNote;
  renderStandby(); closeOv('ov-standby');
  toast(standbyNote?'On standby. Only a friend who reaches for you will ever read it.':'Cleared.');
}
function renderStandby(){
  const el=$('standbyPreview'); if(!el)return;
  el.textContent=standbyNote||'Not written yet — so a friend who reaches for you gets their own words back instead of yours.';
  el.style.opacity=standbyNote?1:.62;
}
/* compose */
let pickedPhoto='run';
function openCompose(){
  $('photoPick').innerHTML=['run','book','guitar'].map(k=>`<div class="${k===pickedPhoto?'sel':''}" onclick="pickPhoto(this,'${k}')">${scene(k)}</div>`).join('');
  $('ov-compose').classList.add('on');
}
function pickPhoto(el,k){ pickedPhoto=k; document.querySelectorAll('.photoPick > div').forEach(d=>d.classList.remove('sel')); el.classList.add('sel'); }
let vis='share', pronoun='themselves';
function setVis(v){
  vis=v;
  $('visShare').classList.toggle('on',v==='share'); $('visQuiet').classList.toggle('on',v==='quiet');
  $('shareFields').style.display = v==='share'?'block':'none';
  $('quietFields').style.display = v==='quiet'?'block':'none';
}
function setPronoun(el,p){
  pronoun=p;
  el.parentElement.querySelectorAll('.chip').forEach(c=>c.classList.remove('on')); el.classList.add('on');
  $('quietPreview').textContent='You regained an hour for '+(p==='themselves'?'yourself':'yourself')+'.';
}
function publishPost(){
  if(vis==='quiet'){
    FEED.unshift({t:'quiet',a:'You',c:'linear-gradient(150deg,#FFE9A8,#E0A422)',n:'You',w:'just now',
      body:'You regained an hour for yourself.',sub:'kept private — the quiet post',kudos:0});
    toast('Posted quietly. The hour counts; the details stay yours.');
  } else {
    const txt=$('postText').value.trim()||'Did something better with the hour.';
    FEED.unshift({t:'post',a:'You',c:'linear-gradient(150deg,#FFE9A8,#E0A422)',n:'You',w:'just now',body:txt,photo:pickedPhoto,kudos:0});
    toast('Posted to Casa Jar. Only the people in it can see it.');
  }
  renderFeed(); closeOv('ov-compose'); $('postText').value='';
}
/* charts *//* charts */
const HRS=[{d:'M',v:1.2},{d:'T',v:1.8},{d:'W',v:.9,coin:1},{d:'T',v:2.1},{d:'F',v:1.4},{d:'S',v:.8,coin:1},{d:'S',v:1.5}];
const mx=Math.max(...HRS.map(h=>h.v));
$('hoursChart').innerHTML=HRS.map(h=>`<div class="bar"><div class="b ${h.coin?'coin':''}" style="height:${Math.round(h.v/mx*76)}px"></div><div class="l">${h.d}</div></div>`).join('');
/* the month so far, weeks starting Monday: coin days come from this month's coins, the rest kept the deal, later days stay blank */
(()=>{ const y=TODAY.getFullYear(), m=TODAY.getMonth(), dim=new Date(y,m+1,0).getDate(), lead=(new Date(y,m,1).getDay()+6)%7, td=TODAY.getDate();
  const coinDays=new Set([0,1,3,7,12].map(daysAgo).filter(d=>d.getMonth()===m).map(d=>d.getDate()));
  let cal=['M','T','W','T','F','S','S'].map(l=>`<div class="d-head">${l}</div>`).join('')+'<div class="d-pad"></div>'.repeat(lead);
  for(let d=1;d<=dim;d++) cal+=d>td?`<div class="d-off">${d}</div>`:coinDays.has(d)?`<div class="d-coin">${d}</div>`:`<div class="d-clean">${d}</div>`;
  $('cal').innerHTML=cal; })();
/* ── "Your time" session timers (internal names still say focus) ── */
let focusT, focusTotal=0, focusLeft=0;
const RING=169.6;
function startFocus(min){
  if(min===0){ const v=prompt('How many minutes?','45'); min=parseInt(v||'0',10); if(!min) return; }
  focusTotal=min*60; focusLeft=focusTotal;
  $('focusIdle').style.display='none'; $('focusRun').style.display='block';
  $('focusHint').textContent='ends at '+new Date(Date.now()+min*60000).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  tickFocus(); jarRest(true);
  clearInterval(focusT); focusT=setInterval(tickFocus,1000);
  toast(min+' minutes shielded. Go be somewhere else.');
}
function tickFocus(){
  const m=Math.floor(focusLeft/60), sec=focusLeft%60;
  $('focusTime').textContent=m+':'+String(sec).padStart(2,'0');
  $('focusRing').setAttribute('stroke-dashoffset', RING*(1-focusLeft/focusTotal));
  if(focusLeft<=0){ endFocus(false); return; }
  focusLeft--;
}
function endFocus(early){
  clearInterval(focusT); jarRest(false);
  $('focusIdle').style.display='flex'; $('focusRun').style.display='none';
  $('focusHint').textContent='shield everything, right now';
  if(early){ toast('Session ended. No coin — you set it, you can end it.'); }
  else { const {box,svg}=liveJar(); svg.classList.remove('hop');void svg.offsetWidth;svg.classList.add('hop'); stars(box,9,true);
    setTimeout(()=>showExit('Session complete.','That hour was yours. Now close this and go spend the next one too.'),600); }
}
/* ── schedule picker ── */
function pickSched(el,kind){
  document.querySelectorAll('#schedChips .chip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on'); NEW.sched=kind;
  $('customWindow').style.display = kind==='custom' ? 'block' : 'none';
  renderNew();
}
const SCHED_LABEL={always:'always',mornings:'6–10am',evenings:'9pm–7am',work:'9am–5pm',weekend:'weekends',custom:'custom window'};
function cycleSetting(el,opts){
  const i=(opts.indexOf(el.textContent.trim())+1)%opts.length;
  el.textContent=opts[i]; el.classList.toggle('on', i===1);
  toast(opts[i]==='My people' ? 'The people in your shared jars will see your coins now. Your call, always.' : 'Setting saved.');
}
function renameJar(){
  const n=prompt('What do you call this jar?', $('jarName').textContent);
  if(n && n.trim()){ $('jarName').textContent=n.trim(); document.querySelector('.jarChip b').textContent=n.trim(); toast('Yours to name. That matters more than it sounds.'); }
}
function updateGoal(){
  const marks=[15,30,60,100], next=marks.find(m=>m>S.streak)||S.streak+30;
  const g=$('goalLine'); if(g) g.textContent=(next-S.streak)+' day'+((next-S.streak)===1?'':'s')+' to your '+next+'-day mark';
}
/* ── tips: some are science, some are permission ── */
const TIPS=[
  {i:'i-brain',t:"Why it's so hard at 10pm",b:'Often it isn\'t craving: it\'s the only unclaimed time in the day. Researchers call it bedtime procrastination.',cta:'Discover more ›',go:()=>openRes(3)},
  {i:'i-camera',t:"Sometimes you just want to be entertained",b:"I get it — we don't always want to optimise every hour or do something meaningful. That's completely fine. What about a good film, or the series you keep meaning to start? It ends by itself, which is more than the feed will ever do for you.",cta:'Find something that ends ›',go:()=>{ showInstead(); setInsteadMode('fun',document.getElementById('segFun')); }},
  {i:'i-wave',t:'The pull is usually tiredness, not craving',b:"Your own entries say so four times this month. Tired wants an off switch, not content — and a film is a much better off switch than a feed.",cta:'Read your recap ›',go:()=>go('recap')},
  {i:'i-brain',t:"You didn't decide to open it",b:'Many phone opens are quick checks that begin with no decision at all. The habit is the reach, not the app.',cta:'Discover more ›',go:()=>openRes(4)},
  {i:'i-heart',t:'Boredom is where ideas live',b:"Nothing has gone wrong when you're bored. It's the state most people's best thinking arrives in — the feed just gets there first.",cta:'Sit with it ›',go:()=>openEntry('feeling')},
];
let tipIdx=0;
function renderTip(){
  const t=TIPS[tipIdx];
  $('tipIcon').innerHTML=`<use href="#${t.i}"/>`;
  $('tipTitle').textContent=t.t; $('tipBody').textContent=t.b; $('tipCta').textContent=t.cta;
}
function nextTip(){ tipIdx=(tipIdx+1)%TIPS.length; renderTip(); }
function tipAction(){ TIPS[tipIdx].go(); }
/* ── celebrations ── */
const WINS=[
  {t:'Best week yet',s:'9h 40m returned'},
  {t:'12 days kept',s:'your longest run'},
  {t:'First $50 given',s:'to Doctors Without Borders'},
  {t:'Our Hours finished',s:'with Casa Jar'},
];
/* ── usage report ── */
const APPS=[
  {n:'The scroll one',g:'linear-gradient(150deg,#FF7AC6,#8B5CF6)',h:'6h 20m',pct:82,opens:47,shield:true},
  {n:'The loud one',g:'linear-gradient(150deg,#37E2C0,#1E63FF)',h:'4h 05m',pct:54,opens:38,shield:true},
  {n:'The endless one',g:'linear-gradient(150deg,#FFB86B,#FF5C8A)',h:'3h 12m',pct:42,opens:61,shield:false},
  {n:'The news one',g:'linear-gradient(150deg,#8B7CF6,#5AA9FF)',h:'1h 48m',pct:24,opens:29,shield:false},
];
function renderApps(){
  $('appList').innerHTML=APPS.map((a,i)=>`<div class="appRow">
    <div class="ic token" style="background:${a.g}"><svg width="16" height="16" style="color:rgba(255,255,255,.92)"><use href="#i-app"/></svg></div>
    <div style="flex:1;min-width:0"><b style="font-size:13px">${a.n}</b>
      <div class="appBar"><i style="width:${a.pct}%"></i></div>
      <div class="tiny" style="margin-top:4px"><b style="color:var(--ink-2)">${a.h}</b> · ${a.opens} opens · ${a.opens>40?'mostly without deciding to':'usually on purpose'}</div></div>
    ${a.shield?'<span class="shieldchip"><svg width="14" height="14"><use href="#i-shield"/></svg></span>'
      :`<button class="btn mint" style="width:auto;padding:8px 12px;font-size:11.5px" onclick="suggestBlock(${i})">Shield it</button>`}
  </div>`).join('');
}
function suggestBlock(i){
  if(S.plan==='free' && COMMITS.length>=3){ toast('The free plan includes 3 deals. Plus has unlimited.'); go('paywall'); return; }
  APPS[i].shield=true; renderApps();
  COMMITS.unshift({g:APPS[i].g,n:APPS[i].n,sched:'always',price:5,forWhat:''});
  renderCommits(); toast('Shielded. Tap the deal on Today to set the price and what it\'s for.');
}
/* ── resources ── */
const RES=[
  {k:'INFINITE SCROLL',t:'The feed never ends',hook:'A page with a bottom asks you a question. A feed never does.',
   body:'Stopping cues are what let people leave. Infinite scroll removes every one of them, so the decision to stop has to be generated by you, from nothing, over and over.',
   feels:'You look up and twenty minutes have gone, and you can\'t name a single thing you saw.',
   we:'The shield is an artificial bottom of the page. The breath pause hands the decision back to you before the feed can absorb it.',
   tr:'Next time you finish something, close the app before you look for the next thing. Notice how strange that feels.',
   src:'Schaffner et al., CSCW 2025 (switching off autoplay cut viewing by ~21 min/day); Flayelle et al., Nature Reviews Psychology 2023.'},
  {k:'VARIABLE REWARD',t:'Sometimes it\'s good',hook:'Unpredictable rewards are learned harder than reliable ones.',
   body:'That\'s basic reward learning, and people\'s behaviour on social media follows the same pattern: a feed that\'s occasionally great and usually ordinary keeps you checking.',
   feels:'One more refresh. Not because it\'s good — because it might be.',
   we:'Every reward in ScrollJar is fixed and earned: same coin, same celebration, no surprise boxes. We refuse the mechanism we\'re fighting.',
   tr:'Count the posts before you find one you\'d have missed. Usually it\'s dozens.',
   src:'Lindström et al., Nature Communications 2021; Schüll, Addiction by Design 2012.'},
  {k:'SOCIAL COMPARISON',t:'Everyone else is fine',hook:'The feed shows you outcomes and hides the ordinary hours behind them.',
   body:'When Facebook arrived on US campuses in 2004–06, students\' mental health worsened, most of all for the most vulnerable, and unfavourable social comparison looked like a key reason.',
   feels:'A small flatness afterwards you can\'t quite attribute to anything.',
   we:'Our feed is finite, shows only your own jars, and reports outcomes without ranking anyone. No follower counts, no leaderboards.',
   tr:'After ten minutes on any feed, ask: do I feel closer to these people, or further away?',
   src:'Braghieri, Levy & Makarin, American Economic Review 2022.'},
  {k:'BEDTIME PROCRASTINATION',t:'Revenge hours',hook:'The scroll at 11pm is often not craving. It\'s the only unclaimed time in the day.',
   body:'Researchers call it bedtime procrastination: going to bed later than you meant to, with nothing stopping you. The popular idea that it\'s "revenge" for a day without free time is plausible but barely studied. Either way, the phone is just the easiest way to take the hour back.',
   feels:'Tired but unwilling. Wanting the day to have had something in it.',
   we:'We ask what the hour is *for*, and offer it back to you — a walk, a book, three lines in the diary — instead of just closing the door.',
   tr:'Take the hour deliberately: set a 25-minute session and spend it on something you chose.',
   src:'Kroese et al., Frontiers in Psychology 2014.'},
  {k:'CHOSEN VS DRIFTING',t:'A film ends. A feed doesn\'t.',hook:'The problem was never entertainment. It was media with no edges.',
   body:'Every traditional form of entertainment carries a stopping cue: credits roll, the record finishes, the episode ends. You get a natural moment to decide whether to continue. Feeds removed that moment, so the decision to stop rarely arrives on its own.',
   feels:'Two hours on a film feels like time you had. Two hours scrolling feels like time that happened to you.',
   we:'We never ask you to be productive. We ask you to pick something that ends — and if that\'s a film at 10pm, brilliant, that\'s a choice and we\'ll happily suggest one.',
   tr:'Next time, pick something with a running time. Anything. Just let the thing have an ending.',
   src:'Schaffner et al., CSCW 2025 (switching off autoplay cut Netflix viewing by ~21 min/day).'},
  {k:'CHECKING HABITS',t:'You didn\'t decide to',hook:'Many phone opens are quick checks that start with no decision at all.',
   body:'Habits are cue-driven: context triggers the action before deliberation arrives. In diary studies, about 43% of everyday actions happened almost daily in the same setting, often while thinking about something else. Willpower arrives late to a race it didn\'t know had started.',
   feels:'Finding the app already open in your hand.',
   we:'We change the cue, not your character — friction at the exact moment of the reach, which cut openings by more than half in a published study of a similar tool.',
   tr:'Move the app off your home screen today. Cheapest intervention there is.',
   src:'Wood, Quinn & Kashy 2002; Oulasvirta et al. 2012; Grüning et al., PNAS 2023.'},
];
function renderRes(){
  $('resList').innerHTML=RES.map((r,i)=>`<div class="resCard" onclick="openRes(${i})">
    <div class="eyebrow" style="color:var(--violet)">${r.k}</div>
    <div class="display" style="font-size:16px;margin:7px 0 5px">${r.t}</div>
    <div class="sub">${r.hook}</div>
    <div class="tiny" style="margin-top:9px;color:var(--violet)">Discover more ›</div></div>`).join('');
}
function openRes(i){
  const r=RES[i];
  $('rdTitle').textContent=r.t; $('rdKicker').textContent=r.k; $('rdHook').textContent=r.hook;
  $('rdBody').textContent=r.body; $('rdFeels').textContent=r.feels; $('rdWeDo').textContent=r.we;
  $('rdTry').textContent=r.tr; $('rdSource').textContent=r.src;
  go('resdetail');
}
/* ── mood ledger: does it actually help? ── */
let MOODLOG=[{k:'worse'},{k:'worse'},{k:'same'},{k:'worse'},{k:'better'},{k:'worse'},{k:'worse'},{k:'same'},{k:'worse'},{k:'worse'}];
const MOODC={better:'var(--mint)',same:'var(--ink-3)',worse:'var(--peach)'};
const MOODH={better:34,same:22,worse:34};
function renderMoodLedger(){
  const L=MOODLOG.slice(0,10);
  if(!L.length){ $('moodLedger').innerHTML=''; $('ledgerHead').textContent='No answers yet. After you open an app anyway, we ask how it felt.'; return; }
  $('moodLedger').innerHTML=L.map(m=>`<div style="height:${MOODH[m.k]}px;background:${MOODC[m.k]};opacity:${m.k==='same'?.45:.9}"></div>`).join('');
  const w=L.filter(m=>m.k==='worse').length;
  $('ledgerHead').innerHTML=`You've felt <b>${w>=L.length/2?'worse':'mixed'}</b> after ${w} of your last ${L.length} sessions.`;
}
/* ── reflections: the questions worth sitting with ── */
const REFLECTIONS=[
  {q:"How do you feel when you're in there?",s:'Not afterwards — during. Try to catch it while it\'s happening.'},
  {q:'Do these apps change your mood?',s:'Up, down, flat? Same every time, or does it depend on the day?'},
  {q:'When did you last decide to take a break from your phone?',s:'What happened next? No wrong answers.'},
  {q:'What are you usually looking for when you reach?',s:'News? Company? An off switch? Something to stop the thinking?'},
  {q:'How often do you pick up the phone for one small thing — and stay?',s:'Checking the weather, then twenty minutes gone. That drift is the habit, not the app.'},
  {q:'Is something asking for your attention that the scrolling helps you avoid?',s:'A conversation, a decision, a feeling. No need to solve it here — naming it is enough.',heavy:true},
  {q:'What did the best day of your last month look like?',s:'Was a screen in it?'},
  {q:'If today went well, what would you have done instead?',s:'Be specific. Specific is what your shield will remind you of.'},
];
let reflIdx=0;
let swapsLeft=2;
function renderReflection(){
  const r=REFLECTIONS[reflIdx];
  $('reflQ').textContent=r.q; $('reflSub').textContent=r.s;
  $('reflCount').textContent='one a day';
  $('reflHeavy').style.display = r.heavy ? 'block' : 'none';
  $('reflSwap').textContent = swapsLeft>0 ? 'Another' : 'That\'s today\'s';
  $('reflSwap').style.opacity = swapsLeft>0 ? 1 : .5;
}
function nextReflection(){
  if(swapsLeft<=0){ toast('One a day. Tomorrow brings the next one.'); return; }
  swapsLeft--; reflIdx=(reflIdx+1)%REFLECTIONS.length; renderReflection();
}
function answerReflection(){
  openEntry('feeling');
  setTimeout(()=>{ $('entryText').value=REFLECTIONS[reflIdx].q+'\n\n'; $('entryText').focus(); },120);
}
/* ── diary ── */
const ENTRIES=[
  {tag:'voice',t:'Thursday, 11:05pm',voice:true,dur:48},
  {tag:'impulse',t:'Wednesday, 10:12pm',b:"Reached for it without deciding to. Wasn't even bored — just tired and looking for an off switch.",at:'written at a shield moment'},
  {tag:'feeling',t:'Tuesday, 8:40pm',b:'Read for forty minutes and felt oddly proud. Small thing, but it was mine.'},
  {tag:'goal',t:'Monday, 7:15am',b:'Want this week to have two slow mornings in it. Not productive — just mine.'},
];
const PROMPTS=['What am I actually looking for?','What would make the next hour good?','Is this tiredness or wanting?','What happened today?'];
const INSTEAD_WORTH=[
  {i:'i-book',t:'Twenty pages',s:'you left off at chapter three'},
  {i:'i-sprout',t:'Walk to the end of the street',s:'it\'s 18° and not raining'},
  {i:'i-pen',t:'Write three lines here',s:'for a day that felt heavy'},
];
const INSTEAD_FUN=[
  {i:'i-camera',t:'The film you saved in March',s:'1h 52m · you\'d still be in bed by 11:40'},
  {i:'i-wave',t:'One episode — the good one',s:'42 minutes, and then it stops on its own'},
  {i:'i-heart',t:'A record, start to finish',s:'nothing to look at, which is the point'},
];
const INSTEAD_WORTH_D1=[
  {i:'i-book',t:'Twenty pages',s:'of whatever you\'re reading'},
  {i:'i-sprout',t:'Walk to the end of the street',s:'and back, phone in your pocket'},
  {i:'i-pen',t:'Write three lines here',s:'about what you were looking for'},
];
const INSTEAD_FUN_D1=[
  {i:'i-camera',t:'A film you\'ve been meaning to see',s:'it ends by itself'},
  {i:'i-wave',t:'One episode — the good one',s:'and then it stops on its own'},
  {i:'i-heart',t:'A record, start to finish',s:'nothing to look at, which is the point'},
];
let insteadMode='worth';
function setInsteadMode(m,el){
  insteadMode=m;
  el.parentElement.querySelectorAll('div').forEach(d=>d.classList.remove('on')); el.classList.add('on');
  $('insteadSub').textContent = m==='fun'
    ? "Fair enough — not every hour needs to mean something. Pick something that ends by itself."
    : S.stage==='new' ? 'Three things that fit the twenty minutes you have.' : 'Three things that fit the twenty minutes you have and the mood you logged.';
  paintInstead();
}
function paintInstead(){
  const d1=S.stage==='new', L = insteadMode==='fun' ? (d1?INSTEAD_FUN_D1:INSTEAD_FUN) : (d1?INSTEAD_WORTH_D1:INSTEAD_WORTH);
  $('insteadList').innerHTML=L.map(o=>`<div class="insteadCard" onclick="chooseInstead('${o.t}')">
    <div class="ic" style="background:rgba(255,255,255,.08);color:var(--calm)"><svg width="17" height="17"><use href="#${o.i}"/></svg></div>
    <div style="flex:1"><b style="font-size:13px;color:var(--calm-ink)">${o.t}</b><div class="tiny">${o.s}</div></div>
    <span style="color:var(--calm-soft)">›</span></div>`).join('')
    + (insteadMode==='fun' ? `<div class="tiny" style="text-align:center;margin:2px 0 12px;line-height:1.55">A film ends. An episode ends. A record ends.<br>That's the whole difference — not whether it's worthy.</div>` : '');
}
/* a fixed, gentle waveform per note: it's a picture of the recording, not an analysis of it */
function waveBars(seed,n){
  let x=seed*9301+49297; const out=[];
  for(let i=0;i<n;i++){ x=(x*9301+49297)%233280; out.push(5+Math.round((x/233280)*15*(0.55+0.45*Math.sin(i/2.3)))); }
  return out;
}
const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
function renderEntries(){
  if(!ENTRIES.length){ $('entryList').innerHTML='<div class="card tiny" style="line-height:1.55">Nothing yet. Your first line can be anything, or tap the mic and just talk.</div>'; return; }
  $('entryList').innerHTML=ENTRIES.map((e,i)=>e.voice?`<div class="entryCard">
    <div class="entryMeta"><span class="entryTag tag-voice">VOICE</span><span class="tiny">${e.t}</span></div>
    <div class="voiceRow">
      <button class="playBtn" onclick="playVoice(${i},this)" aria-label="Play"><svg width="14" height="14"><use href="#i-play"/></svg></button>
      <div class="voiceBars" data-i="${i}">${waveBars(e.dur+i,26).map(v=>`<i style="height:${Math.abs(v)}px"></i>`).join('')}</div>
      <span class="tiny num" id="vdur${i}">${fmt(e.dur)}</span>
    </div>
    <div class="tiny" style="margin-top:6px">only you can hear this</div></div>`
  :`<div class="entryCard">
    <div class="entryMeta"><span class="entryTag tag-${e.tag}">${e.tag.toUpperCase()}</span><span class="tiny">${e.t}</span></div>
    <div style="font-size:13px;font-weight:600;line-height:1.5">${e.b}</div>
    ${e.at?`<div class="tiny" style="margin-top:6px">${e.at}</div>`:''}</div>`).join('');
}
let entryKind='free';
function openEntry(kind){
  entryKind=kind;
  const guided = kind!=='free';
  $('entryTitle').textContent = kind==='impulse' ? 'What is the pull about?' : (guided? 'Something to answer' : 'A blank page');
  $('entryTags').style.display = 'flex';
  $('entryTags').innerHTML=['impulse','feeling','goal','free'].map(t=>`<div class="promptChip ${t===kind?'on':''}" onclick="entryKind='${t}';document.querySelectorAll('#entryTags .promptChip').forEach(c=>c.style.borderColor='');this.style.borderColor='var(--mint)'">${t}</div>`).join('');
  $('entryPrompts').style.display='flex';
  $('entryPrompts').innerHTML=PROMPTS.map(p=>`<div class="promptChip" onclick="document.getElementById('entryText').value='${p} '">${p}</div>`).join('');
  $('entryText').placeholder = guided ? REFLECTIONS[reflIdx].q : 'tired, not really wanting the phone — wanting to switch off';
  $('ov-entry').classList.add('on');
}
/* ── voice notes: record, keep, play back. nothing answers. ── */
let vT, vSec=0, vState='idle', playT=null;
function openVoice(){
  vState='idle'; vSec=0; clearInterval(vT);
  $('voiceTime').textContent='0:00'; $('voiceHint').textContent='tap to start · up to 5 minutes';
  $('voiceWave').innerHTML=Array.from({length:32},()=>'<i></i>').join('');
  $('voiceWave').classList.remove('live'); $('recBtn').classList.remove('rec');
  $('recBtn').style.display=''; $('voiceDone').style.display='none';
  $('ov-voice').classList.add('on');
}
function toggleVoice(){
  if(vState==='idle'){
    vState='rec'; $('recBtn').classList.add('rec'); $('voiceWave').classList.add('live');
    $('voiceHint').textContent='recording · tap to stop';
    vT=setInterval(()=>{ vSec++; $('voiceTime').textContent=fmt(vSec); if(vSec>=300) toggleVoice(); },1000);
  } else if(vState==='rec'){
    vState='done'; clearInterval(vT); $('recBtn').classList.remove('rec'); $('voiceWave').classList.remove('live');
    $('recBtn').style.display='none'; $('voiceDone').style.display='block';
    $('voiceHint').textContent='keep it, or let it go';
  }
}
function keepVoice(){
  ENTRIES.unshift({tag:'voice',t:'just now',voice:true,dur:Math.max(vSec,1)});
  closeOv('ov-voice'); renderEntries(); go('diary');
  toast('Kept. Only you will ever hear it.');
}
function discardVoice(){ clearInterval(vT); vState='idle'; closeOv('ov-voice'); }
function playVoice(i,btn){
  const bars=[...document.querySelectorAll(`.voiceBars[data-i="${i}"] i`)], e=ENTRIES[i];
  const stop=()=>{ clearInterval(playT); playT=null; document.querySelectorAll('.playBtn use').forEach(u=>u.setAttribute('href','#i-play'));
    document.querySelectorAll('.voiceBars i').forEach(b=>b.classList.remove('on')); };
  const wasMine=btn.querySelector('use').getAttribute('href')==='#i-pause';
  stop(); if(wasMine) return;
  btn.querySelector('use').setAttribute('href','#i-pause');
  let t=0; playT=setInterval(()=>{ t++; const k=Math.round(t/e.dur*bars.length);
    bars.forEach((b,j)=>b.classList.toggle('on',j<k)); $('vdur'+i).textContent=fmt(e.dur-t);
    if(t>=e.dur){ stop(); $('vdur'+i).textContent=fmt(e.dur); } },1000);
}
let entriesThisSitting=0;
function saveEntry(){
  const b=$('entryText').value.trim(); if(!b){ closeOv('ov-entry'); return; }
  ENTRIES.unshift({tag:entryKind,t:'just now',b,at:entryKind==='impulse'?'written at a shield moment':''});
  renderEntries(); closeOv('ov-entry'); $('entryText').value=''; go('diary');
  entriesThisSitting++;
  if(entriesThisSitting>=2){
    setTimeout(()=>showExit('That\'s enough for now.','The diary did its job. It\'s not somewhere to spend an hour either.'),650);
    entriesThisSitting=0;
  } else { toast('Kept. Only you can read it.'); }
}
/* ── instead-of screen ── */
function showInstead(){
  closeOv('ov-breath');
  const fw=((COMMITS[0]||{}).forWhat||'').replace(/\bmy\b/g,'your');
  $('insteadEyebrow').textContent = fw ? `TIME FOR ${fw.toUpperCase()}?` : 'A FEW IDEAS FOR THE NEXT TWENTY MINUTES';
  setInsteadMode('worth',$('segWorth'));
  paintColleagues();
  $('promptChips').innerHTML=PROMPTS.slice(0,3).map(p=>`<div class="promptChip">${p}</div>`).join('');
  $('ov-instead').classList.add('on');
}
function chooseInstead(t){ closeOv('ov-instead'); resist(); setTimeout(()=>toast('"'+t+'" — go on then.'),700); }
/* ── pronouns ── */
const PRONOUNS=[['she/her','herself'],['he/him','himself'],['they/them','themselves'],['just my name','Luca']];
let pronounIdx=2;
function renderPronouns(){
  $('pronounChips').innerHTML=PRONOUNS.map((p,i)=>`<div class="promptChip" style="${i===pronounIdx?'border-color:var(--mint);color:var(--mint)':''}" onclick="setProfPronoun(${i})">${p[0]}</div>`).join('');
  $('profPronoun').textContent=PRONOUNS[pronounIdx][0]+' ›';
  $('pronounNote').textContent='So the app talks about you correctly: "regained an hour for '+PRONOUNS[pronounIdx][1]+'".';
}
function togglePronouns(open){
  const box=$('pronounBox'), on=open===undefined ? box.style.display==='none' : open;
  box.style.display=on?'block':'none'; $('profPronoun').setAttribute('aria-expanded',on);
}
function setProfPronoun(i){ pronounIdx=i; renderPronouns(); togglePronouns(false); toast('Saved. The app will speak about you correctly.'); }
function toggleWork(el){
  el.classList.toggle('on');
  const on=el.classList.contains('on');
  $('workBody').style.display = on ? 'block' : 'none';
  toast(on ? 'Work mode on. The shield steps aside when you\'re working — and only then.' : 'Work mode off.');
}
/* ══ COMPANY JAR (Teams) ══
   The employer pledges; each scroll-free hour unlocks a fixed amount for a cause the team voted on.
   Everyone picks one hour a day that's theirs, at any time, so shift workers count the same as
   office staff. At most one per person per day. Nobody pays for a slip. Unspent pledge rolls over. */
const DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const CO={pledge:5000,rollover:400,perHour:5,hours:436,joined:false,mine:9,at:'20:00',
  week:null,                  /* null = same time every day; otherwise 7 start times, '' = no hour that day */
  paused:'',                  /* '', 'day' or 'week': on the phone only, never counts against anyone */
  causes:['Feeding America','Against Malaria Foundation','GiveDirectly'],votes:[41,33,26],vote:-1,
  squads:[{n:'Design',k:6},{n:'Platform',k:8},{n:'Ops & People',k:5}],squad:0};
const CO_FEED=[
  {t:'Design squad reached its weekly goal',s:'30 scroll-free hours, a goal the squad set itself'},
  {t:'The jar passed $2,000',s:'week 3 of 6'},
  {t:'Ops & People joined the campaign',s:'5 people'},
  {t:'The vote closed: Feeding America',s:'41% of votes · runner-up gets the next campaign'},
];
const money=n=>'$'+Math.round(n).toLocaleString('en-US');
function renderCompany(animate){
  const unlocked=CO.hours*CO.perHour, total=CO.pledge+CO.rollover, pct=Math.min(1,unlocked/total);
  $('coAmt').textContent=money(unlocked); $('coHours').textContent=CO.hours.toLocaleString('en-US');
  $('coCause').textContent=CO.causes[CO.vote>=0?CO.vote:0]; $('coFill').style.width=(pct*100)+'%';
  $('coInvite').style.display=CO.joined?'none':''; $('coMine').style.display=CO.joined?'':'none';
  $('coMineN').textContent=CO.mine; $('coWin').textContent=hourLabel(CO.at);
  $('coPattern').textContent=CO.week?'your own weekly pattern':'same time every day'; paintPause();
  $('coSquadName').textContent=CO.squads[CO.squad].n+' squad'; $('coSquadSize').textContent=CO.squads[CO.squad].k+' people';
  $('coFeed').innerHTML=CO_FEED.map(f=>`<div class="fcard" style="padding:11px 13px"><div class="row" style="gap:10px">
    <svg width="22" height="22" viewBox="0 0 40 40" style="flex:none"><use href="#glowM"/></svg>
    <div><div class="fbody" style="font-size:13px">${f.t}</div><div class="tiny" style="margin-top:2px">${f.s}</div></div></div></div>`).join('');
  $('coCardLine').textContent=CO.joined?`${CO.hours} scroll-free hours · ${money(unlocked)} unlocked`:"You're invited to the company jar";
  $('coCardSub').textContent=CO.joined?`you: ${CO.mine} · for ${CO.causes[CO.vote>=0?CO.vote:0]}`:'every scroll-free hour unlocks $5 for a cause you vote on';
  drawLights($('coLights'),Math.round(pct*POS.length),animate);
  $('coNotesWrap').style.display=CO.joined?'':'none'; renderNotes();
}
/* small lights rise into the jar (the consumer coins fall; this jar fills with something earned).
   No word for them on purpose: the copy only says "hours", so there's nothing to translate. */
function drawLights(g,n,animate){
  g.innerHTML='';
  for(let i=0;i<n;i++){
    const [cx,cy]=POS[i], u=document.createElementNS('http://www.w3.org/2000/svg','use');
    u.setAttribute('href','#glowM'); u.setAttribute('x',cx-15); u.setAttribute('y',cy-15); u.setAttribute('width',30); u.setAttribute('height',30);
    g.appendChild(u);
    if(animate) u.animate([{transform:'translateY(70px)',opacity:0},{transform:'translateY(-6px)',opacity:1,offset:.7},{transform:'none',opacity:1}],
      {duration:900,delay:i*70,easing:'cubic-bezier(.2,.8,.3,1)',fill:'backwards'});
  }
}
function openCompany(){ go('company'); $('s-company').scrollTop=0; renderCompany(true); }
/* "8–9 PM", "11 PM–12 AM": the same style the time pickers show */
const h12=(h,m)=>((h%12)||12)+(m?':'+String(m).padStart(2,'0'):'');
const hourLabel=t=>{ if(!t) return 'no hour'; const [h,m]=t.split(':').map(Number), e=(h+1)%24, ap=x=>x<12?'AM':'PM';
  return h12(h,m)+(ap(h)===ap(e)?'':' '+ap(h))+'–'+h12(e,m)+' '+ap(e); };
function coPause(k){ CO.paused=CO.paused===k?'':k; paintPause();
  if(CO.paused==='day') toast('Today is paused. It doesn\'t count, and nobody sees it.');
  else if(CO.paused==='week') toast('This week is paused. No gap shows anywhere. Back whenever you like.'); }
function paintPause(){ [['coOnCall','day'],['coWeekOff','week']].forEach(([id,k])=>{ const b=$(id); if(!b) return;
  b.classList.toggle('done',CO.paused===k); b.setAttribute('aria-pressed',CO.paused===k); }); }
function cjPreset(t){ CO.at=t; CO.week=null; renderJoin(); }
function cjWeek(on){ CO.week=on?DAYS.map(()=>CO.at):null; renderJoin(); }

let cjStep=0;
function openJoin(step){ cjStep=step||0; renderJoin(); $('ov-cojoin').classList.add('on'); }
function cjGo(n){ cjStep=n; renderJoin(); }
function renderJoin(){
  [...$('cjDots').children].forEach((d,i)=>d.classList.toggle('on',i<=cjStep));
  const B=$('cjBody');
  if(cjStep===0){ $('cjKicker').textContent='FERNHILL & CO. INVITED YOU';
    B.innerHTML=`<div class="display" style="font-size:21px;line-height:1.2;margin-bottom:8px">Your Hours: an hour a day, funded.</div>
      <div class="sub">Fernhill pledges <b>$5,000</b>. Pick one hour a day that's yours. Each one that stays scroll-free unlocks <b>$5</b> for a cause the team votes on. If you slip, nobody pays. Not you, not anyone.</div>
      <div class="coRule ok" style="margin-top:12px">Any hour works: before a shift, between shifts, or after work</div>
      <div class="coRule ok">Joining is your choice, and you can leave any time</div>
      <div class="coRule no">Fernhill never sees you, your hours or your apps</div>
      <button class="btn violet" style="margin-top:14px" onclick="cjGo(1)">Join</button>
      <button class="btn ghost" style="margin-top:9px" onclick="closeOv('ov-cojoin')">Not now</button>`;
  } else if(cjStep===1){ $('cjKicker').textContent='YOUR HOUR';
    const presets=[['Morning','07:00','7 AM'],['Afternoon','15:00','3 PM'],['Evening','20:00','8 PM'],['Late','23:00','11 PM']];
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">Which hour is yours?</div>
      <div class="sub" style="margin-bottom:12px">Pick a time you're free, whatever your shifts. One hour a day counts, the same for everyone.</div>
      ${CO.week?`<div class="weekGrid">${DAYS.map((d,k)=>`<div class="wkRow"><b>${d}</b>
          <input class="timeIn" type="time" aria-label="${d}" value="${CO.week[k]}" onchange="CO.week[${k}]=this.value">
          <span class="chip${CO.week[k]?'':' on'}" onclick="CO.week[${k}]=CO.week[${k}]?'':CO.at;renderJoin()">${CO.week[k]?'None':'Add'}</span></div>`).join('')}</div>
        <div class="tiny" style="margin:8px 2px 0">A day with no hour simply isn't counted. Squad goals are a share of the hours people could have, so nobody falls behind for working long days.</div>
        <div class="tiny" style="margin:8px 2px 0;color:var(--violet);cursor:pointer;font-weight:700" onclick="cjWeek(false)">Same time every day instead</div>`
      :`<div style="display:flex;gap:6px;flex-wrap:wrap">${presets.map(([l,t,d])=>`<span class="chip${CO.at===t?' on':''}" onclick="cjPreset('${t}')">${l} · ${d}</span>`).join('')}</div>
        <div class="row" style="gap:10px;margin-top:12px"><div style="flex:1"><div class="tiny" style="margin-bottom:5px">STARTS AT</div><input class="timeIn" type="time" id="cjAt" value="${CO.at}" onchange="CO.at=this.value;$('cjAtEnd').textContent=hourLabel(CO.at)"></div>
          <div style="flex:1"><div class="tiny" style="margin-bottom:5px">YOUR HOUR</div><div class="timeIn" id="cjAtEnd">${hourLabel(CO.at)}</div></div></div>
        <div class="tiny" style="margin:10px 2px 0;color:var(--violet);cursor:pointer;font-weight:700" onclick="cjWeek(true)">Shifts change? Set each day</div>`}
      <div class="tiny" style="margin-top:10px">On call, or a hard week? You can pause any time. Fernhill can't see any of this. It stays on your phone.</div>
      <button class="btn violet" style="margin-top:14px" onclick="${CO.joined?"closeOv('ov-cojoin');renderCompany(false);toast('Your hour is updated.')":'cjGo(2)'}">${CO.joined?'Save':'Next'}</button>`;
  } else if(cjStep===2){ $('cjKicker').textContent='VOTE FOR THE CAUSE';
    const tot=CO.votes.reduce((a,b)=>a+b,0);
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">Where should the jar go?</div>
      <div class="sub" style="margin-bottom:12px">People chose the shortlist. Your vote is anonymous.</div>
      ${CO.causes.map((c,i)=>`<div class="tierbox${CO.vote===i?' sel':''}" onclick="CO.vote=${i};renderJoin()">
        <div class="spread"><b style="font-size:13.5px">${c}</b>${CO.vote>=0?`<span class="tiny">${Math.round(CO.votes[i]/tot*100)}%</span>`:''}</div>
        <div class="tiny" style="margin-top:4px;line-height:1.45">${(CHARITIES.find(x=>x.n===c)||{l:''}).l}</div></div>`).join('')}
      <button class="btn violet" style="margin-top:6px" ${CO.vote<0?'disabled':''} onclick="cjGo(3)">Next</button>`;
  } else if(cjStep===3){ $('cjKicker').textContent='YOUR SQUAD';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">Pick a squad</div>
      <div class="sub" style="margin-bottom:12px">Squads set their own weekly goal. They see squad totals, never who.</div>
      ${CO.squads.map((q,i)=>`<div class="tierbox${CO.squad===i?' sel':''}" onclick="CO.squad=${i};renderJoin()"><div class="spread"><b style="font-size:13.5px">${q.n}</b><span class="tiny">${q.k} people</span></div></div>`).join('')}
      <div class="tiny" style="margin:2px 2px 0">Squads need at least 5 people before any number is shown.</div>
      <button class="btn violet" style="margin-top:12px" onclick="cjGo(4)">Join ${CO.squads[CO.squad].n}</button>`;
  } else { $('cjKicker').textContent="YOU'RE IN";
    B.innerHTML=`<div style="text-align:center;padding:6px 0 2px">
      <svg width="54" height="54" viewBox="0 0 40 40" style="filter:drop-shadow(0 0 16px rgba(185,174,255,.7))"><use href="#glowM"/></svg>
      <div class="display" style="font-size:21px;margin:10px 0 8px">Your hour starts counting today.</div>
      <div class="sub">Each scroll-free hour adds a light to the company jar${CO.week?'':`, from ${hourLabel(CO.at)} every day`}.</div></div>
      <div class="card" style="margin-top:12px;background:rgba(60,240,203,.1);border-color:rgba(60,240,203,.3)">
        <b style="font-size:13px">Plus is on Fernhill</b>
        <div class="tiny" style="margin-top:4px;line-height:1.5">Your personal jar, stakes and charity stay private and separate. If you leave Fernhill, you keep a discount.</div></div>
      <button class="btn mint" onclick="CO.joined=true;CO.hours++;closeOv('ov-cojoin');openCompany()">See the company jar</button>`;
  }
}
function showCoTip(){
  const final=4620, g=$('ctLights');
  $('ctCause').textContent=CO.causes[CO.vote>=0?CO.vote:0]; $('ctAmt').textContent='$0';
  drawLights(g,POS.length,false); $('ov-cotip').classList.add('on'); paintLids();
  const box=$('ctJarBox');
  setTimeout(()=>tipOutJar($('ctJar'),box,g,(k,n)=>$('ctAmt').textContent=money(final*k/n),
    ()=>{ $('ctAmt').textContent=money(final); }),350);
}
/* ══ NOTES — what people did instead, shared to inspire others ══
   Anonymous and squad-only by default. High fives carry no count. "I'll try this" saves an idea
   to a private list; the author only learns how many saved it. The privacy check runs on the phone. */
const CO_NOTES=[
  {sq:'Design',t:'Finally went to the theatre. First time in months.',when:'Tuesday',all:true},
  {sq:'Design',t:'Finished that series I kept falling asleep to. It has an ending, who knew.',when:'Monday'},
  {sq:'Design',t:'Cooked a proper dinner. Phones stayed in the other room.',when:'Sunday'},
  {sq:'Platform',t:'Organised the closet. Weirdly satisfying.',when:'Tuesday',all:true},
  {sq:'Customer Care',t:'Walked to the end of the pier and back. Forty minutes, no podcast.',when:'Monday',all:true},
  {sq:'Sales',t:'Called my grandmother. We talked for an hour.',when:'Sunday',all:true},
];
const IDEAS=[]; let notesScope='squad';
const mySquad=()=>CO.squads[CO.squad].n;
function setNotesScope(sc){ notesScope=sc; $('nsSquad').classList.toggle('on',sc==='squad'); $('nsAll').classList.toggle('on',sc==='all');
  $('coNotesScope').textContent=sc==='squad'?'from your squad':'shared with everyone'; renderNotes(); }
function renderNotes(){
  if(!$('coNotes')) return;
  const list=CO_NOTES.map((n,i)=>({...n,i})).filter(n=>notesScope==='squad'?(n.mine||n.sq===mySquad()):n.all);
  $('coNotes').innerHTML=list.length?list.map(n=>{
    const who=n.mine?`You · shown as ${n.signed?'Luca':'Someone in '+n.sq}`:(n.name||'Someone in '+n.sq);
    return `<div class="fcard noteCard"><div class="tiny" style="margin-bottom:5px">${who} · ${n.when}</div><div class="fbody" style="font-size:13.5px">${n.t}</div>
      <div class="row" style="gap:8px;margin-top:10px">
        ${n.mine?`<span class="tiny"><svg width="12" height="12" style="vertical-align:-2px"><use href="#i-lock"/></svg> only you see this: saved by ${n.saves||0} ${n.saves===1?'person':'people'}</span>`
        :`<button class="kudos${n.hf?' done':''}" aria-pressed="${!!n.hf}" onclick="highFive(${n.i})"><svg width="14" height="14"><use href="#i-hifive"/></svg>High five</button>
          <button class="kudos${n.saved?' done':''}" aria-pressed="${!!n.saved}" onclick="tryIdea(${n.i})"><svg width="13" height="13"><use href="#i-save"/></svg>${n.saved?'Saved':"I'll try this"}</button>`}
      </div></div>`}).join(''):`<div class="tiny" style="padding:6px 2px 12px">No notes here yet.</div>`;
  $('ideaCount').textContent=IDEAS.length;
}
function highFive(i){ const n=CO_NOTES[i]; n.hf=!n.hf; renderNotes(); if(n.hf) toast('High five sent. No counts, no names.'); }
function tryIdea(i){ const n=CO_NOTES[i]; n.saved=!n.saved;
  if(n.saved){ IDEAS.unshift(n.t); toast('Saved to your ideas. Only you can see this list.'); }
  else { const k=IDEAS.indexOf(n.t); if(k>=0) IDEAS.splice(k,1); }
  renderNotes(); }
function openIdeas(){
  $('ideasList').innerHTML=IDEAS.length?IDEAS.map((t,k)=>`<div class="insteadCard" style="cursor:default"><div class="ic" style="background:rgba(155,140,255,.14);color:var(--violet)"><svg width="16" height="16"><use href="#i-save"/></svg></div>
      <div style="flex:1;font-size:13px;font-weight:600">${t}</div><span class="tiny" style="cursor:pointer" onclick="IDEAS.splice(${k},1);CO_NOTES.forEach(n=>{if(n.t===${JSON.stringify(t)})n.saved=false});renderNotes();openIdeas()">remove</span></div>`).join('')
    :`<div class="tiny">Nothing saved yet. Tap "I'll try this" on a colleague's note.</div>`;
  $('ov-ideas').classList.add('on');
}
/* colleague ideas appear when they're most useful: on the "Instead, you could…" screen */
function paintColleagues(){
  const box=$('insteadColleagues'); if(!box) return;
  if(!CO.joined){ box.innerHTML=''; return; }
  const picks=(IDEAS.length?IDEAS:CO_NOTES.filter(n=>n.all&&!n.mine).map(n=>n.t)).slice(0,2);
  box.innerHTML=`<div class="eyebrow" style="color:var(--calm-soft);margin:6px 2px 8px">FROM PEOPLE AT FERNHILL</div>`+
    picks.map(t=>`<div class="insteadCard" onclick="chooseInstead(${JSON.stringify(t).replace(/"/g,'&quot;')})">
      <div class="ic" style="background:rgba(255,255,255,.08);color:var(--calm)"><svg width="17" height="17" viewBox="0 0 40 40"><use href="#glowM"/></svg></div>
      <div style="flex:1"><b style="font-size:13px;color:var(--calm-ink)">${t}</b><div class="tiny">a colleague's idea, shared anonymously</div></div>
      <span style="color:var(--calm-soft)">›</span></div>`).join('');
}
/* writing a note */
const NOTE_PROMPTS=['Cooked something','Called someone','Went for a walk','Finished something','Went out','Made something','Just rested'];
function openNote(){
  $('noteText').value=''; $('noteSign').classList.remove('on'); $('noteAll').classList.remove('on');
  $('notePrompts').innerHTML=NOTE_PROMPTS.map(pr=>`<span class="promptChip" onclick="$('noteText').value='${pr}: ';$('noteText').focus();checkNote()">${pr}</span>`).join('');
  checkNote(); $('ov-conote').classList.add('on');
}
/* the privacy check: plain rules, on the phone, nothing sent or stored. It nudges; it never blocks. */
const COLLEAGUES=['Marta','Giulia','Sofia','Marco','Anna','Paolo'];
const NUDGES=[
  {k:'Health',re:/\b(therap(y|ist)|doctor|hospital|clinic|pregnan\w*|diagnos\w*|medication|meds|depress\w*|anxiety|panic attack|surgery|chemo|illness|sick|cancer|rehab|sober)\b/i,
   m:'This mentions health. Colleagues will read it, even without your name. Keep it, say it more generally, or leave that part out.'},
  {k:'Money',re:/\b(debt|loan|rent|salary|bills|overdraft|afford)\b/i,m:'This mentions money. Fine to keep, but colleagues may read more into it than you mean.'},
  {k:"A child's name",re:/\bmy (son|daughter|kid|child|baby|boy|girl)\s+[A-Z][a-z]+/,m:'This includes a child\'s name. "My son" or "my daughter" works just as well.'},
  {k:'An exact place',re:/\b\d+\s+[A-Za-z]+\s+(street|st|road|rd|avenue|ave|lane)\b|\b(my address|i live (at|on))\b/i,m:'This looks like an address or an exact place. Something more general keeps you private.'},
  {k:'Someone else',re:new RegExp('\\b('+COLLEAGUES.join('|')+')\\b'),m:'This names someone. Notes are about your own time, so leave the name out or ask them first.'},
  {k:'Could identify you',re:/\bmy (twins|band|gig|boat|horse|marathon|wedding|bakery)\b|\b\d{2}(st|nd|rd|th) birthday\b/i,anonOnly:true,
   m:'A detail like this might tell people it\'s you. Fine if you don\'t mind, or keep it more general.'},
];
function checkNote(){
  const t=$('noteText').value, signed=$('noteSign').classList.contains('on');
  const hits=NUDGES.filter(n=>!(n.anonOnly&&signed)&&n.re.test(t));
  $('noteNudge').innerHTML=hits.length?`<div class="nudge">${hits.map(h=>`<div class="flagRow"><span class="flagDot warn"></span><span><b>${h.k}.</b> ${h.m}</span></div>`).join('')}
    <div class="tiny" style="margin-top:6px">It's your call. Sharing it as written is fine.</div></div>`:'';
}
function postNote(){
  const t=$('noteText').value.trim(); if(!t){ toast('Write a line first, even a short one.'); return; }
  const signed=$('noteSign').classList.contains('on'), all=$('noteAll').classList.contains('on');
  const n={sq:mySquad(),t,when:'just now',mine:true,signed,all,saves:0}; CO_NOTES.unshift(n);
  closeOv('ov-conote'); setNotesScope(all?'all':'squad');
  toast(signed?'Shared with your name.':(all?'Shared anonymously with everyone at Fernhill.':'Shared anonymously with your squad.'));
  setTimeout(()=>{ n.saves=2; renderNotes(); },5000);
}
/* ══ FAMILY JAR ══
   One jar for the family. Grown-ups' coins (if they choose) and everyone's scroll-free hours fill it.
   Kids are never charged and never paid: a grown-up pledges, and each scroll-free hour a kid keeps
   unlocks part of the pledge for a cause that kid chose, with their name on the receipt. An optional
   family treat is shared and non-cash; everyone's hours count, grown-ups' too. The family sees the jar
   and the totals, never anyone's apps, screens, diary or personal counts. */
const FAM={view:'parent',pledge:20,perHour:1,unlocked:14,coins:22,coinsIn:true,hours:41,treat:'Cinema night',goal:60,
  members:[{n:'You',role:'grown-up',cause:'Doctors Without Borders',c:'linear-gradient(150deg,#FFE9A8,#E0A422)'},
           {n:'Marco',role:'grown-up',cause:'GiveDirectly',c:'linear-gradient(150deg,#8B7CF6,#5AA9FF)'},
           {n:'Mia',role:'kid',age:12,cause:'Ocean cleanup',c:'linear-gradient(150deg,#37E2C0,#1E63FF)'},
           {n:'Leo',role:'kid',age:9,cause:'Local animal shelter',c:'linear-gradient(150deg,#FFB86B,#FF5C8A)'}],
  kidCauses:['Ocean cleanup','Local animal shelter','Trees for the park','Children\'s hospital'],
  mia:{hours:8,at:'16:00'}, treats:['Cinema night','Pizza and a board game','A day out','No treat'], plan:'yr'};
const famKidsHours=()=>FAM.unlocked/FAM.perHour;
function openFamily(){ go('family'); $('s-family').scrollTop=0; renderFamily(true); }
function setFamView(v){ FAM.view=v; $('fvParent').classList.toggle('on',v==='parent'); $('fvKid').classList.toggle('on',v==='kid'); $('s-family').scrollTop=0; renderFamily(true); }
/* coins and lights share the jar: gold for grown-ups' coins, glowing lights for hours */
function drawFamJar(g,coins,lights,animate){
  g.innerHTML='';
  /* it's all money for good, so it's all coins in one natural pile. The kids' coins (unlocked by their
     scroll-free hours) carry a soft glow; the two kinds are mixed evenly through the pile. */
  const n=Math.min(POS.length,coins+lights), lit=Math.round(n*lights/Math.max(1,coins+lights));
  for(let i=0;i<n;i++){
    const isLit=Math.floor((i+1)*lit/n)>Math.floor(i*lit/n), [cx,cy]=POS[i], r=17;
    const u=document.createElementNS('http://www.w3.org/2000/svg','use');
    u.setAttribute('href',isLit?'#coinLit':'#coin'); u.setAttribute('x',cx-r); u.setAttribute('y',cy-r); u.setAttribute('width',2*r); u.setAttribute('height',2*r);
    g.appendChild(u);
    if(animate) u.animate([{transform:'translateY(-70px)',opacity:0},{transform:'none',opacity:1}],{duration:800,delay:i*60,easing:'cubic-bezier(.2,.8,.3,1)',fill:'backwards'});
  }
}
function famKey(coinTxt,lightTxt,icon='#coinLit'){
  return `<div class="famKey">${coinTxt?`<span><svg width="14" height="14" viewBox="0 0 40 40" aria-hidden="true"><use href="#coin"/></svg>${coinTxt}</span>`:''}
    <span>${icon?`<svg width="15" height="15" viewBox="0 0 40 40" aria-hidden="true"><use href="${icon}"/></svg>`:''}${lightTxt}</span></div>`;
}
function famTreatCard(){
  if(FAM.treat==='No treat') return '';
  const pct=Math.min(100,Math.round(FAM.hours/FAM.goal*100));
  return `<div class="card famTreat"><div class="eyebrow" style="color:var(--gold-text)">FAMILY TREAT</div><div class="spread" style="margin-top:5px"><b style="font-size:14px">${FAM.treat}</b><span class="tiny" style="white-space:nowrap">${FAM.hours} of ${FAM.goal} hours</span></div>
    <div class="capBar" style="margin-top:10px;height:8px"><i style="width:${pct}%;background:linear-gradient(90deg,var(--gold),var(--mint))"></i></div>
    <div class="tiny" style="margin-top:8px;line-height:1.5">Everyone's scroll-free hours count, grown-ups' too. Only the family total shows, never who did how many.</div></div>`;
}
function renderFamily(animate){
  const B=$('famBody'), kidsMoney=FAM.unlocked, coins=FAM.coinsIn?FAM.coins:0;
  if(FAM.view==='parent'){
    $('famEyebrow').textContent='THE FAMILY JAR · '+MONTH.toUpperCase();
    $('famAmt').textContent=money(kidsMoney+coins);
    $('famSub').innerHTML=`for good this month`+famKey(coins?`${money(coins)} in grown-ups' coins`:'',`${money(kidsMoney)} from the kids' scroll-free hours`);
    drawFamJar($('famJarG'),Math.floor(coins/4),Math.round(famKidsHours()*0.8),animate);
    B.innerHTML=famTreatCard()+`
    <div class="card"><div class="spread"><b style="font-size:13.5px">Your pledge for the kids</b><span class="pill gold">${money(FAM.pledge)} a month</span></div>
      <div class="capBar" style="margin-top:10px;height:8px"><i style="width:${Math.round(kidsMoney/FAM.pledge*100)}%;background:linear-gradient(90deg,#EDE9FF,#9B8CFF)"></i></div>
      <div class="spread" style="margin-top:6px"><span class="tiny"><b style="color:var(--ink)">${money(kidsMoney)}</b> unlocked so far</span><span class="tiny">$${FAM.perHour} per scroll-free hour</span></div>
      <div class="tiny" style="margin-top:8px;line-height:1.5">Each kid's hours unlock your pledge for the cause they chose. Kids never pay, and nobody is paid for scrolling less. Whatever isn't unlocked rolls into next month.</div></div>
    <div class="spread" style="margin:4px 2px 8px"><div class="display h2">The family</div><span class="tiny">causes, never counts</span></div>
    <div>${FAM.members.map(m=>`<div class="memberRow">
      <div class="av" style="background:${m.c}">${m.n[0]}</div>
      <div style="flex:1"><b style="font-size:13px">${m.n}${m.age?` <span class="tiny">· ${m.age}</span>`:''}</b><div class="tiny">${m.role==='kid'?'picked: ':'gives to: '}${m.cause}</div></div>
      <span class="pill ${m.role==='kid'?'chr':'gold'}">${m.role}</span></div>`).join('')}</div>
    <div class="card lidCard"><b style="font-size:13px">Family lid colour</b><div class="tiny" style="margin-top:2px">anyone in the family can change it</div>
      <div class="swatches" data-lidpick="fam"></div></div>
    <div class="card"><div class="spread"><div><div style="font-size:12.5px;font-weight:700">My coins in the family jar</div><div class="tiny">only the grown-ups' total shows, never whose</div></div>
      <div class="toggle${FAM.coinsIn?' on':''}" role="switch" aria-checked="${FAM.coinsIn}" aria-label="My coins in the family jar" tabindex="0" onclick="FAM.coinsIn=!FAM.coinsIn;renderFamily(false)"></div></div></div>
    <div class="card"><div class="row" style="gap:9px"><svg width="17" height="17" style="color:var(--mint)"><use href="#i-lock"/></svg><b style="font-size:13.5px">What the family sees</b></div>
      <div class="coRule ok">The jar, the treat and everyone's cause</div>
      <div class="coRule ok">Each kid's gift on the tip-out receipt, with their name</div>
      <div class="coRule no">Anyone's apps, screen time or slips</div>
      <div class="coRule no">Anyone's diary or voice notes</div>
      <div class="tiny" style="margin-top:8px">The same for grown-ups and kids. Nobody gets a report on anybody.</div></div>
    <div class="row" style="gap:8px"><button class="btn ghost" style="flex:1" onclick="openFamSetup()">Family settings</button><button class="btn ghost" style="flex:1" onclick="showFamTip()">Preview the tip-out</button></div>`;
    paintLids();
  } else {
    const k=FAM.members.find(m=>m.n==='Mia');
    $('famEyebrow').textContent='YOUR HOURS · '+MONTH.toUpperCase();
    $('famAmt').textContent=FAM.mia.hours+' hours';
    $('famSub').innerHTML=`scroll-free this month · that's ${money(FAM.mia.hours*FAM.perHour)} for ${k.cause}`+famKey('','each glowing coin is one scroll-free hour');
    drawFamJar($('famJarG'),0,FAM.mia.hours,animate);
    B.innerHTML=`<div class="card" style="background:linear-gradient(150deg,rgba(60,240,203,.14),rgba(155,140,255,.1))">
      <b style="font-size:14px">You never pay anything</b>
      <div class="sub" style="margin-top:5px">Every hour you keep scroll-free unlocks $${FAM.perHour} from your family's pledge for the cause you picked. When the jar tips out, the receipt has your name on it.</div></div>
    <div class="card"><div class="spread"><b style="font-size:13.5px">Your hour</b><span class="tiny">you choose it</span></div>
      <div class="sub" style="margin-top:5px">${hourLabel(FAM.mia.at)}, after school</div>
      <div class="row" style="gap:7px;margin-top:10px;flex-wrap:wrap">${['07:00','16:00','19:00'].map(t=>`<span class="chip${FAM.mia.at===t?' on':''}" onclick="FAM.mia.at='${t}';renderFamily(false)">${hourLabel(t)}</span>`).join('')}</div></div>
    <div class="card"><b style="font-size:13.5px">Your cause</b>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">${FAM.kidCauses.map(c=>`<span class="chip${k.cause===c?' on':''}" onclick="FAM.members.find(m=>m.n==='Mia').cause=${JSON.stringify(c).replace(/"/g,'&quot;')};renderFamily(false)">${c}</span>`).join('')}</div></div>
    ${famTreatCard()}
    <div class="card"><div class="row" style="gap:9px"><svg width="17" height="17" style="color:var(--mint)"><use href="#i-lock"/></svg><b style="font-size:13.5px">Private to you</b></div>
      <div class="coRule ok">Your family sees the jar and your cause</div>
      <div class="coRule no">Nobody sees your apps, your hours each day or your diary</div></div>`;
  }
}
function showFamTip(){
  const kids=FAM.members.filter(m=>m.role==='kid'), grown=FAM.members.filter(m=>m.role==='grown-up');
  const split=[8,6], coins=FAM.coinsIn?FAM.coins:0, total=FAM.unlocked+coins, left=FAM.pledge-FAM.unlocked;
  $('ftList').innerHTML=`<div class="eyebrow">WHERE IT WENT</div>`+kids.map((k,i)=>`<div class="spread" style="margin-top:9px"><span class="tiny"><b style="color:var(--ink)">${k.n}</b> → ${k.cause}</span><b class="num">${money(split[i]||0)}</b></div>`).join('')+
    (coins?`<div class="spread" style="margin-top:9px"><span class="tiny"><b style="color:var(--ink)">Grown-ups' coins</b> → ${grown.map(g=>g.cause).join(' and ')}</span><b class="num">${money(coins)}</b></div>`:'')+
    `<div class="spread" style="margin-top:9px"><span class="tiny">rolls into next month's pledge</span><b class="num" style="color:var(--violet)">${money(left)}</b></div>`;
  $('ftTreat').innerHTML=FAM.treat==='No treat'?'<div class="tiny">No family treat this month.</div>':
    `<div class="eyebrow">THE FAMILY TREAT</div><div class="sub" style="margin-top:6px"><b>${FAM.treat}:</b> ${FAM.hours} of ${FAM.goal} hours together. ${FAM.hours>=FAM.goal?'It\'s on!':`${FAM.goal-FAM.hours} hours to go, and they carry on into next month.`}</div>`;
  drawFamJar($('ftJarG'),Math.floor(coins/4),Math.round(famKidsHours()*0.8),false);
  $('ftAmt').textContent='$0'; $('ov-famtip').classList.add('on'); paintLids();
  const box=$('ftJarBox');
  setTimeout(()=>tipOutJar($('ftJarSvg'),box,$('ftJarG'),(k,n)=>$('ftAmt').textContent=money(total*k/n),
    ()=>{ $('ftAmt').textContent=money(total); }),350);
}
/* setting up a family jar */
let fsStep=0;
function openFamSetup(){ fsStep=0; renderFamSetup(); $('ov-famsetup').classList.add('on'); }
function fsGo(n){ fsStep=n; renderFamSetup(); }
function renderFamSetup(){
  [...$('fsDots').children].forEach((d,i)=>d.classList.toggle('on',i<=fsStep));
  const B=$('fsBody'), K=$('fsKicker');
  if(fsStep===0){ K.textContent='A FAMILY JAR';
    B.innerHTML=`<div class="display" style="font-size:21px;line-height:1.2;margin-bottom:8px">A family jar, not a family spy.</div>
      <div class="sub">One jar for the whole family. Everyone's scroll-free hours fill it, and a treat you choose together waits at the top.</div>
      <div class="coRule ok" style="margin-top:12px">Kids never pay a cent. A grown-up pledges instead</div>
      <div class="coRule ok">Each kid picks the cause their hours unlock</div>
      <div class="coRule no">No cash rewards for kids. Their hours become a gift</div>
      <div class="coRule no">Nobody sees anyone's apps, screen or diary</div>
      <button class="btn mint" style="margin-top:14px" onclick="fsGo(1)">Start a family jar</button>`;
  } else if(fsStep===1){ K.textContent="WHO'S IN";
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">Who's in the family?</div>
      <div class="sub" style="margin-bottom:10px">Invites go through Apple Family Sharing. Tap to switch someone between grown-up and kid.</div>
      ${FAM.members.map((m,i)=>`<div class="memberRow"><div class="av" style="background:${m.c}">${m.n[0]}</div><div style="flex:1"><b style="font-size:13px">${m.n}</b></div>
        <span class="chip${m.role==='kid'?' on':''}" onclick="${i===0?"toast('That\\'s you: a grown-up.')":`FAM.members[${i}].role=FAM.members[${i}].role==='kid'?'grown-up':'kid';renderFamSetup()`}">${m.role}</span></div>`).join('')}
      <div class="tiny" style="margin:8px 2px 0">Grown-ups can set their own price on their own apps. Kids only ever have scroll-free hours.</div>
      <button class="btn mint" style="margin-top:12px" onclick="fsGo(2)">Next</button>`;
  } else if(fsStep===2){ K.textContent='THE KIDS\' PLEDGE';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">Your pledge for the kids</div>
      <div class="card" style="text-align:center"><div class="amount num">$<span id="fsP">${FAM.pledge}</span></div><div class="tiny">a month, at most</div>
        <input type="range" min="5" max="50" step="5" value="${FAM.pledge}" aria-label="Monthly pledge" style="width:100%;accent-color:var(--mint);margin-top:10px" oninput="FAM.pledge=+this.value;$('fsP').textContent=this.value"></div>
      <div class="eyebrow" style="margin:12px 2px 8px">EACH SCROLL-FREE HOUR UNLOCKS</div>
      <div class="row" style="gap:7px">${[0.5,1,2].map(v=>`<span class="chip${FAM.perHour===v?' on':''}" style="flex:1;text-align:center" onclick="FAM.perHour=${v};renderFamSetup()">$${v<1?v.toFixed(2):v}</span>`).join('')}</div>
      <div class="tiny" style="margin-top:12px;line-height:1.5">It goes to the cause each kid picks, never to the kid. Whatever isn't unlocked rolls into next month.</div>
      <button class="btn mint" style="margin-top:12px" onclick="fsGo(3)">Next</button>`;
  } else if(fsStep===3){ K.textContent='A FAMILY TREAT';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">Something to look forward to</div>
      <div class="sub" style="margin-bottom:10px">Optional. When the family's hours reach the goal, you do it together. Never cash, never just for one person.</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${FAM.treats.map(t=>`<span class="chip${FAM.treat===t?' on':''}" onclick="FAM.treat=${JSON.stringify(t).replace(/"/g,'&quot;')};renderFamSetup()">${t}</span>`).join('')}</div>
      ${FAM.treat==='No treat'?'':`<div class="card" style="text-align:center;margin-top:12px"><div class="display num" style="font-size:28px"><span id="fsG">${FAM.goal}</span> hours</div><div class="tiny">together, grown-ups' hours included</div>
        <input type="range" min="20" max="120" step="10" value="${FAM.goal}" aria-label="Hours goal" style="width:100%;accent-color:var(--mint);margin-top:10px" oninput="FAM.goal=+this.value;$('fsG').textContent=this.value"></div>`}
      <button class="btn mint" style="margin-top:12px" onclick="fsGo(4)">Next</button>`;
  } else { K.textContent='THE FAMILY PLAN';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">Plus for everyone</div>
      <div class="sub" style="margin-bottom:12px">The Family plan covers Plus for everyone in the family, including card fees up to $1 a month each. Billed by Apple to one grown-up.</div>
      <div class="row" style="gap:7px">
        <span class="chip${FAM.plan==='yr'?' on':''}" style="flex:1;text-align:center" onclick="FAM.plan='yr';renderFamSetup()">$49.99 / year</span>
        <span class="chip${FAM.plan==='mo'?' on':''}" style="flex:1;text-align:center" onclick="FAM.plan='mo';renderFamSetup()">$6.99 / month</span></div>
      <div class="tiny" style="margin-top:12px;line-height:1.5">Your pledge is separate: up to ${money(FAM.pledge)} a month, charged only for hours the kids actually keep.</div>
      <button class="btn mint" style="margin-top:14px" onclick="closeOv('ov-famsetup');openFamily();toast('The family jar is ready. Invites are on their way.')">Create the family jar</button>`;
  }
}
/* ══ CREATORS ══
   For people who post for a living: the feeds get a shield, the tools they post with stay open, and
   short posting windows open the feeds with no pause and no coin. A public challenge lets followers
   join with their own deals; every coin goes 100% to the challenge's cause. The creator never earns
   from followers' coins (nor do we), and everyone sees totals only: no rankings, nobody singled out.
   Apple shows us no app names: the "feeds / tools" split is guidance for the user's own picks. */
const CR={view:'maker',handle:'@maya.makes',name:'30 Days Unplugged',days:30,day:12,cause:'Mental Health America',
  causes:['Mental Health America','Doctors Without Borders','GiveDirectly','Against Malaria Foundation'],
  people:1284,hours:9410,given:6215,
  windows:[{at:'12:00',len:30},{at:'18:00',len:30}],winLen:30,
  feeds:['Instagram','TikTok','YouTube','X'],tools:['Meta Business Suite','Edits','TikTok Studio','YouTube Studio','CapCut'],
  fan:{price:3,hours:9,coins:2}};
const thou=n=>n.toLocaleString('en-US');
const winLabel=w=>{const [h,m]=w.at.split(':').map(Number), e=new Date(0,0,0,h,m+w.len); return h12(h,m)+'–'+h12(e.getHours(),e.getMinutes())+' '+(e.getHours()<12?'AM':'PM');};
function openCreator(){ go('creator'); $('s-creator').scrollTop=0; renderCreator(true); }
function setCrView(v){ CR.view=v; $('cvMaker').classList.toggle('on',v==='maker'); $('cvFan').classList.toggle('on',v==='fan'); $('s-creator').scrollTop=0; renderCreator(true); }
function renderCreator(animate){
  const B=$('crBody');
  drawFamJar($('crJarG'),17,0,animate);
  if(CR.view==='maker'){
    $('crEyebrow').textContent=`CHALLENGE · DAY ${CR.day} OF ${CR.days}`;
    $('crAmt').textContent='$'+thou(CR.given);
    $('crSub').innerHTML=`to ${CR.cause}, 100% · ${thou(CR.people)} people joined you`+famKey(`followers' coins, all to the cause`,`${thou(CR.hours)} scroll-free hours together`,'#glowM');
    B.innerHTML=`
    <div class="card"><div class="spread"><b style="font-size:13.5px">Your posting windows</b><span class="pill mint">open now</span></div>
      <div class="row" style="gap:7px;margin-top:10px;flex-wrap:wrap">${CR.windows.map((w,i)=>`<span class="chip${i===0?' on':''}">${winLabel(w)}</span>`).join('')}</div>
      <div class="tiny" style="margin-top:9px;line-height:1.5">Inside a window your feeds open with no pause and no coin: post, reply, check in. Outside it, your deal applies. Your posting tools stay open all day.</div></div>
    <div class="card crShare">
      <div class="eyebrow">SHARE CARD</div>
      <div class="crCard"><b>I'm doing ${CR.name}.</b><span>My feeds are shielded, my posting tools aren't. Every slip goes to ${CR.cause}. Join me.</span><em>scrolljar.app/c/maya</em></div>
      <button class="btn mint" style="margin-top:10px" onclick="toast('Share card saved to Photos. It shows totals, never a follower.')">Share to your story</button></div>
    <div class="card"><div class="row" style="gap:9px"><svg width="17" height="17" style="color:var(--mint)"><use href="#i-heart"/></svg><b style="font-size:13.5px">Where the money goes</b></div>
      <div class="sub" style="margin-top:5px">Every coin goes 100% to ${CR.cause}. You don't earn from your followers' coins, and neither does ScrollJar. Plus is free for you while the challenge runs.</div></div>
    <div class="card"><div class="row" style="gap:9px"><svg width="17" height="17" style="color:var(--mint)"><use href="#i-lock"/></svg><b style="font-size:13.5px">What everyone sees</b></div>
      <div class="coRule ok">How many joined, the hours together and the total given</div>
      <div class="coRule no">Who slipped, how often, or anyone's apps</div>
      <div class="coRule no">Rankings or a leaderboard, for you or your followers</div></div>
    <div class="row" style="gap:8px"><button class="btn ghost" style="flex:1" onclick="openCrSetup()">Creator settings</button><button class="btn ghost" style="flex:1" onclick="toast('On Oct 1 the jar tips out to ${CR.cause}, with a public receipt.')">How it ends</button></div>`;
  } else {
    $('crEyebrow').textContent=`${CR.handle.toUpperCase()} · DAY 6`;
    $('crAmt').textContent=CR.fan.hours+' hours';
    $('crSub').innerHTML=`scroll-free since you joined`+famKey(`your ${CR.fan.coins} coins, $${CR.fan.price} each`,`your hours, with ${thou(CR.people-1)} others`);
    B.innerHTML=`
    <div class="card" style="background:linear-gradient(150deg,rgba(255,143,102,.14),rgba(155,140,255,.1))">
      <b style="font-size:14px">Your deal, your price</b>
      <div class="sub" style="margin-top:5px">You set your own price when you joined: $${CR.fan.price} a coin. Every coin goes to ${CR.cause}. ${CR.handle} never sees your coins, and doesn't earn from them.</div></div>
    <div class="card"><b style="font-size:13.5px">Together so far</b>
      <div class="spread" style="margin-top:9px"><span class="tiny">people in the challenge</span><b class="num">${thou(CR.people)}</b></div>
      <div class="spread" style="margin-top:6px"><span class="tiny">scroll-free hours</span><b class="num">${thou(CR.hours)}</b></div>
      <div class="spread" style="margin-top:6px"><span class="tiny">given to ${CR.cause}</span><b class="num">$${thou(CR.given)}</b></div>
      <div class="tiny" style="margin-top:9px">No rankings. You'll never be compared with anyone.</div></div>
    <div class="row" style="gap:8px"><button class="btn ghost" style="flex:1" onclick="toast('You can leave any time. Your coins so far still reach the cause.')">Leave the challenge</button><button class="btn ghost" style="flex:1" onclick="go('home')">My deals</button></div>`;
  }
}
/* setting up as a creator */
let crsStep=0;
function openCrSetup(){ crsStep=0; renderCrSetup(); $('ov-crsetup').classList.add('on'); }
function crsGo(n){ crsStep=n; renderCrSetup(); }
function renderCrSetup(){
  [...$('crsDots').children].forEach((d,i)=>d.classList.toggle('on',i<=crsStep));
  const B=$('crsBody'), K=$('crsKicker');
  if(crsStep===0){ K.textContent='FOR CREATORS';
    B.innerHTML=`<div class="display" style="font-size:21px;line-height:1.2;margin-bottom:8px">Keep making. Stop scrolling.</div>
      <div class="sub">Your job lives on these apps, so blocking all of them doesn't work. Creator setup shields the feeds and keeps your tools open.</div>
      <div class="coRule ok" style="margin-top:12px">The feeds get a shield; your posting tools stay open</div>
      <div class="coRule ok">Short posting windows to post and reply, with no coin</div>
      <div class="coRule ok">A public challenge your followers can join</div>
      <div class="coRule no">Nobody earns from followers' coins: not you, not us</div>
      <div class="tiny" style="margin-top:12px;line-height:1.55">And your viewers? ScrollJar stops autopilot, not watching. People who choose what to see can still choose you.</div>
      <button class="btn mint" style="margin-top:14px" onclick="crsGo(1)">Set it up</button>`;
  } else if(crsStep===1){ K.textContent='FEEDS AND TOOLS';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">Shield the feeds, keep the tools</div>
      <div class="sub" style="margin-bottom:12px">You'll pick them in Apple's own screen next. ScrollJar never sees which apps you choose.</div>
      <div class="crSplit">
        <div class="card"><div class="eyebrow" style="color:var(--peach)">SHIELD · THE FEEDS</div>${CR.feeds.map(a=>`<div class="tiny crApp">${a}</div>`).join('')}</div>
        <div class="card"><div class="eyebrow">LEAVE OPEN · YOUR TOOLS</div>${CR.tools.map(a=>`<div class="tiny crApp">${a}</div>`).join('')}</div>
      </div>
      <div class="tiny" style="margin:2px 2px 0;line-height:1.5">Post from your tools when you can. When you need the app itself, that's what posting windows are for.</div>
      <button class="btn mint" style="margin-top:12px" onclick="toast('In the real app, Apple\\'s app picker opens here.');crsGo(2)">Pick in Apple's screen</button>`;
  } else if(crsStep===2){ K.textContent='POSTING WINDOWS';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">When do you post?</div>
      <div class="sub" style="margin-bottom:12px">Up to two windows a day. Inside them the feeds open with no pause and no coin.</div>
      ${CR.windows.map((w,i)=>`<div class="row" style="gap:10px;margin-bottom:8px"><div style="flex:1"><div class="tiny" style="margin-bottom:5px">WINDOW ${i+1} STARTS</div><input class="timeIn" type="time" value="${w.at}" aria-label="Window ${i+1} start" onchange="CR.windows[${i}].at=this.value;renderCrSetup()"></div><div style="flex:1"><div class="tiny" style="margin-bottom:5px">OPEN FOR</div><div class="timeIn">${w.len} min · ${winLabel(w)}</div></div></div>`).join('')}
      <div class="row" style="gap:7px;margin-top:4px">${[15,30,45].map(v=>`<span class="chip${CR.windows[0].len===v?' on':''}" style="flex:1;text-align:center" onclick="CR.windows.forEach(w=>w.len=${v});renderCrSetup()">${v} min</span>`).join('')}</div>
      <div class="tiny" style="margin-top:10px;line-height:1.5">Like any deal: shorter windows apply now, longer ones in 24 hours.</div>
      <button class="btn mint" style="margin-top:12px" onclick="crsGo(3)">Next</button>`;
  } else if(crsStep===3){ K.textContent='A PUBLIC CHALLENGE';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:8px">Invite your followers</div>
      <div class="sub" style="margin-bottom:12px">Optional. Followers join with your link and set their own deal and price. Their coins go 100% to the cause you pick.</div>
      <input class="timeIn" value="${CR.name}" aria-label="Challenge name" oninput="CR.name=this.value">
      <div class="eyebrow" style="margin:12px 2px 8px">HOW LONG</div>
      <div class="row" style="gap:7px">${[7,14,30].map(v=>`<span class="chip${CR.days===v?' on':''}" style="flex:1;text-align:center" onclick="CR.days=${v};renderCrSetup()">${v} days</span>`).join('')}</div>
      <div class="eyebrow" style="margin:12px 2px 8px">THE CAUSE</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${CR.causes.map(c=>`<span class="chip${CR.cause===c?' on':''}" onclick="CR.cause=${JSON.stringify(c).replace(/"/g,'&quot;')};renderCrSetup()">${c}</span>`).join('')}</div>
      <div class="tiny" style="margin-top:12px;line-height:1.5">You never earn from your followers' coins, and nobody is ranked. Everyone sees totals only.</div>
      <button class="btn mint" style="margin-top:12px" onclick="crsGo(4)">Next</button>`;
  } else { K.textContent='READY';
    B.innerHTML=`<div style="text-align:center;padding:6px 0 2px">
      <svg viewBox="0 0 40 40" width="52" height="52" style="filter:drop-shadow(0 0 16px rgba(255,201,77,.7))"><use href="#coin"/></svg>
      <div class="display" style="font-size:21px;margin:10px 0 8px">Your creator setup is on.</div>
      <div class="sub">Feeds shielded, tools open, posting at ${CR.windows.map(winLabel).join(' and ')}.</div></div>
      <div class="card" style="margin-top:12px;background:rgba(60,240,203,.1);border-color:rgba(60,240,203,.3)">
        <b style="font-size:13px">Plus is free while your challenge runs</b>
        <div class="tiny" style="margin-top:4px;line-height:1.5">No public challenge? Creator setup works on Free too, as one of your 3 deals.</div></div>
      <button class="btn mint" onclick="crsFinish()">See your challenge</button>`;
  }
}
function crsFinish(){
  if(!COMMITS.some(c=>c.creator)) COMMITS.unshift({g:'linear-gradient(150deg,#FF8F66,#8B5CF6)',n:'The feeds',sched:'always',price:5,forWhat:'making, not scrolling',creator:true});
  if(S.plan==='free'){ S.plan='creator'; renderPlan(); }
  renderCommits(); closeOv('ov-crsetup'); openCreator(); toast('Creator setup is on. Your link is ready to share.');
}
/* ══ LID COLOURS ══
   Free for everyone and never earned: no colour is unlocked by a streak or sold. Your own jar has
   your colour; each shared jar has its own, so you can tell them apart on the Board. */
const LID_NAMES={silver:'Silver',mint:'Mint',lavender:'Lavender',copper:'Copper',cork:'Cork'};
const LIDS={me:'silver',fam:'cork',co:'lavender',cr:'copper',casa:'mint',wish:'copper'};
const lidFill=k=>k==='silver'?'url(#rim)':`url(#lid-${k})`;
const lidSwatchBg={mint:'linear-gradient(135deg,#B8FFF0,#1FB596 45%,#0C6E5C)',lavender:'linear-gradient(135deg,#E6E0FF,#7C6BE0 45%,#4A3CA8)',
  copper:'linear-gradient(135deg,#F5C6A4,#B0643C 45%,#6E3A1E)',cork:'linear-gradient(135deg,#E8BE86,#A8743E 45%,#7A4E24)',silver:'linear-gradient(135deg,#F2F7FA,#8798A8 45%,#5F6E80)'};
function jarOwner(svg){
  if(svg.querySelector('#coinStack,#todayCoins,#tipCoins')||svg.id==='winJar') return 'me';
  if(svg.querySelector('#famJarG,#ftJarG')) return 'fam';
  if(svg.querySelector('#coLights,#ctLights')) return 'co';
  if(svg.querySelector('#crJarG')) return 'cr';
  return 'me';
}
function paintLids(){
  document.querySelectorAll('svg[data-built]').forEach(svg=>{ const l=svg.querySelector('.lid'); if(l) l.setAttribute('fill',lidFill(LIDS[jarOwner(svg)])); });
  document.querySelectorAll('.lidDot').forEach(d=>d.style.background=lidSwatchBg[LIDS[d.dataset.jar]]);
  document.querySelectorAll('[data-lidpick]').forEach(renderLidPick);
  const me=$('lidPickMe'); if(me){ me.dataset.lidpick='me'; renderLidPick(me); }
}
function renderLidPick(box){
  const who=box.dataset.lidpick;
  box.innerHTML=Object.keys(LID_NAMES).map(k=>`<button class="swatch${LIDS[who]===k?' on':''}" style="background:${lidSwatchBg[k]}" aria-label="${LID_NAMES[k]} lid" aria-pressed="${LIDS[who]===k}" onclick="pickLid('${who}','${k}')"></button>`).join('')
    +`<span class="tiny swatchName">${LID_NAMES[LIDS[who]]}</span>`;
}
function pickLid(who,k){
  LIDS[who]=k; paintLids();
  const svg=who==='me'?$('homeJarSvg'):who==='fam'?$('famJarSvg'):null;
  if(svg){ svg.classList.remove('hop'); void svg.getBoundingClientRect(); svg.classList.add('hop'); jarMood(svg,'happy',900); }
}
function restart(){location.reload()}
/* embed mode (landing page phone): no onboarding, no prototype controls */
const Q=new URLSearchParams(location.search);
if(Q.has('embed')){ document.documentElement.classList.add('embed'); $('ov-onb').classList.remove('on'); }
if(Q.get('mode')==='day') setMode('day');
/* the landing page can ask the embedded app to show a step of the story, as you scroll */
function demoCoin(){
  const box=$('homeJar'), svg=$('homeJarSvg');
  const f=document.createElement('div'); f.className='flyer';
  f.innerHTML='<svg viewBox="0 0 40 40" width="26" height="26"><use href="#coin"/></svg>';
  f.style.left='calc(50% - 12px)'; f.style.top='-30%'; box.appendChild(f);
  f.animate([{transform:'translateY(0) scale(1.1) rotateY(0)',opacity:0},{transform:'translateY(20px) scale(1.1) rotateY(360deg)',opacity:1,offset:.25},
             {transform:'translateY(150px) scale(.85) rotateY(900deg)',opacity:0}],{duration:900,easing:'cubic-bezier(.45,.05,.6,1)'}).onfinish=()=>{
    f.remove(); svg.classList.remove('squash'); void svg.offsetWidth; svg.classList.add('squash'); stars(box,6,false); };
}
function demoStep(step){
  document.querySelectorAll('.ov.on').forEach(o=>o.classList.remove('on'));
  clearTimeout(breathT); clearTimeout(breathT2); clearInterval(winT);
  const top=id=>{ const el=$(id); if(el) el.scrollTop=0; };
  if(step==='today'){ go('home'); top('s-home'); }
  else if(step==='shield'){ go('home'); showShield(); }
  else if(step==='pause'){ go('home'); showBreath(); }
  else if(step==='jar'){ go('jar'); top('s-jar'); setTimeout(demoCoin,450); }
  else if(step==='tipout'){ go('jar'); top('s-jar'); showTipout(); }
}
if(Q.has('embed')) addEventListener('message',e=>{ const d=e.data; if(d&&d.scrolljar==='show') demoStep(d.step); });
paintLids();renderCommits();renderJar();renderCharities();renderFeed();renderMembers();renderStandby();renderEntries();renderPronouns();renderApps();renderRes();renderMoodLedger();renderReflection();renderTip();
$('winStrip').innerHTML=WINS.map(w=>`<div class="winBadge"><b>${w.t}</b><span>${w.s}</span></div>`).join('');
$('usageSpark').innerHTML=[3.1,2.4,3.6,2.9,3.3,2.8,3.1].map(v=>`<div style="height:${Math.round(v/3.6*38)}px;background:var(--peach);opacity:.75"></div>`).join('');
$('weekSpark').innerHTML=HRS.map((h,i)=>{const last=[.7,1.1,.6,1.3,.9,.5,1.0][i];
  return `<div style="position:relative;flex:1;display:flex;align-items:flex-end;gap:2px">
    <div class="ghost" style="height:${Math.round(last/mx*32)}px;flex:1;border-radius:4px 4px 0 0"></div>
    <div class="${h.coin?'coin':''}" style="height:${Math.round(h.v/mx*32)}px;flex:1;border-radius:4px 4px 0 0"></div></div>`}).join('');
$('recapBars').innerHTML=HRS.map(h=>`<div class="bar"><div class="b ${h.coin?'coin':''}" style="height:${Math.round(h.v/mx*60)}px"></div><div class="l">${h.d}</div></div>`).join('');
$('challengeBars').innerHTML=HRS.map(h=>`<div class="bar"><div class="b ${h.coin?'coin':''}" style="height:${Math.round(h.v/mx*60)}px"></div><div class="l">${h.d}</div></div>`).join('');
setInterval(()=>{const {svg}=liveJar();if(!document.hidden&&Math.random()<.4&&!svg.classList.contains('hop')){svg.classList.add('hop');setTimeout(()=>svg.classList.remove('hop'),800)}},11000);
/* ── day one vs three weeks in ──
   After setup the app is honest about being new: no hours yet, an empty jar, free openings until
   "Make it real", nobody on the Board, nothing in the Diary. The demo can switch back to week 3. */
SNAP={coins:COINS.map(c=>({...c})),feed:FEED.map(f=>({...f})),entries:ENTRIES.map(e=>({...e})),commits:COMMITS.map(c=>({...c})),moods:MOODLOG.map(m=>({...m}))};
function setStage(st){
  S.stage=st; document.body.dataset.stage=st;
  $('stD1').classList.toggle('on',st==='new'); $('stW3').classList.toggle('on',st==='wk3');
  const put=(a,b)=>a.splice(0,a.length,...b.map(x=>({...x})));
  document.querySelectorAll('.ov.on').forEach(o=>{ if(o.id!=='ov-onb') o.classList.remove('on'); });
  if(st==='new'){
    S.stakes=false; S.firstResist=false;
    put(COINS,[]); put(FEED,[]); put(ENTRIES,[]); put(MOODLOG,[]);
    put(COMMITS,[{g:'linear-gradient(150deg,#FF7AC6,#8B5CF6)',n:'Your first deal',sched:'always',price:5,forWhat:''}]);
    $('d1Pause').classList.remove('done');
  } else {
    S.stakes=true; put(COINS,SNAP.coins); put(FEED,SNAP.feed); put(ENTRIES,SNAP.entries); put(COMMITS,SNAP.commits); put(MOODLOG,SNAP.moods);
  }
  renderCommits(); renderFeed(); renderEntries(); renderJar(); renderMoodLedger();
  if(typeof renderPeek==='function') renderPeek();
  go('home'); $('s-home').scrollTop=0;
}
function d1Done(id){ const el=$(id); if(el&&S.stage==='new'){ el.classList.add('done'); renderD1Deal(); } }
/* ── day one: the deal at a glance, said in the user's own words, with a live status ──
   The demo clock is the status bar's: Tuesday, 9:41. */
const NOW={day:1,min:9*60+41};
const DAYNAME=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const WIN={mornings:{from:'06:00',to:'10:00',days:[1,1,1,1,1,1,1]},work:{from:'09:00',to:'17:00',days:[1,1,1,1,1,0,0]},
  evenings:{from:'21:00',to:'07:00',days:[1,1,1,1,1,1,1]},weekend:{from:'00:00',to:'24:00',days:[0,0,0,0,0,1,1]},always:{from:'00:00',to:'24:00',days:[1,1,1,1,1,1,1]}};
const mins=t=>{ const [h,m]=t.split(':').map(Number); return h*60+m; };
function shieldStatus(wins){
  if(!wins.length) return {on:true,txt:'Shield on now'};
  if(wins.some(w=>w.from==='00:00'&&w.to==='24:00'&&w.days.every(Boolean))) return {on:true,txt:'Shield on · all day, every day'};
  let best=null;
  for(const w of wins){
    const f=mins(w.from), t=mins(w.to), over=f>t, prev=(NOW.day+6)%7;
    if(!over&&w.days[NOW.day]&&NOW.min>=f&&NOW.min<t) return {on:true,txt:`Shield on now · until ${t===1440?'midnight':hm(w.to)}`};
    if(over&&((w.days[NOW.day]&&NOW.min>=f)||(w.days[prev]&&NOW.min<t))) return {on:true,txt:`Shield on now · until ${hm(w.to)}`};
    for(let d=0;d<8;d++){ const day=(NOW.day+d)%7; if(!w.days[day]) continue; if(d===0&&f<=NOW.min) continue;
      const at=d*1440+f; if(!best||at<best.at) best={at,d,day,f,w}; break; }
  }
  if(!best) return {on:false,txt:'Shield off for now'};
  const time=best.f===0?'':` at ${hm(best.w.from)}`;
  const when=best.d===0?(best.f>=18*60?'tonight':'today'):best.d===1?'tomorrow':DAYNAME[best.day];
  return {on:false,txt:`Starts ${when}${best.d===0&&best.f>=18*60?'':time}${best.d===0&&best.f>=18*60?time:''}`.replace('tonight at','tonight at')};
}
function renderD1Deal(){
  const c=COMMITS[0]||{}, fl=c.forList&&c.forList.length?c.forList:(c.forWhat?[c.forWhat]:[]);
  const yours=x=>x.replace(/\bmy\b/g,'your'), head=fl.length?`Room for ${yours(listAnd(fl))}.`:'Your shield is on.';
  $('d1Title').textContent=head; $('d1Title').classList.toggle('long',head.length>34);
  const p=pickedName(pick); $('d1What').textContent=pick.apps.size||pick.cats.size ? p.name.charAt(0).toUpperCase()+p.name.slice(1) : 'Your apps';
  const sc=c.sched||'always', ws=c.whenSay||SCHED_SAY[sc]||'';
  $('d1WhenRow').textContent = sc==='custom' ? ws.charAt(0).toUpperCase()+ws.slice(1) : (SCHED_NOTE[sc]||'').replace(/^./,m=>m.toUpperCase());
  $('d1ForRow').style.display=fl.length?'':'none';
  $('d1For').innerHTML=fl.map(x=>`<i>${esc(x)}</i>`).join('');
  const st=shieldStatus(c.wins||[WIN[sc]||WIN.always]);
  $('d1Live').classList.toggle('on',st.on); $('d1LiveTxt').textContent=st.txt;
  $('d1SigRow').hidden=!c.sig; if(c.sig) $('d1Sig').src=c.sig;
  const done=document.querySelectorAll('.d1Steps .d1Step.done').length; $('d1Count').textContent=`${done} OF 3`;
}
function renderD1(){
  if(!SNAP) return;
  renderD1Deal();
  $('d1Impact').innerHTML = S.stakes
    ? `It's real. Every coin in this jar goes to <b>${charity().n}</b> on the 1st, with a receipt. ${charity().l}`
    : `Nothing given yet, and nothing owed. Opening a shielded app is free for your first days. Make it real, and every coin goes to <b>${charity().n}</b> on the 1st, with a receipt.`;
  $('d1RealBtn').style.display = S.stakes ? 'none' : '';
  const real=$('d1Real'), price=(COMMITS[0]||{}).price||5;
  real.classList.toggle('done',S.stakes);
  $('d1RealTitle').textContent = S.stakes ? "It's real" : 'Make it real, from day 3';
  real.querySelector('span:not(.d1Tick):not(.d1Go)').textContent = S.stakes ? `done: $${price} a coin, 100% to ${charity().n}` : 'if you want: a coin you price yourself, 100% to charity';
  if(!$('d1Example').innerHTML) $('d1Example').innerHTML=feedCard(SNAP.feed[0],-1,true);
}
document.body.dataset.stage=S.stage;
document.querySelectorAll('[data-date]').forEach(el=>{ const k=el.dataset.date; const mon=daysAgo((TODAY.getDay()+6)%7);
  el.textContent = k==='next1'?NEXT1 : k==='month'?MONTH : k==='week'?monDay(mon) : k==='MONTH'?MONTH.toUpperCase()
    : k==='NEXT15'?(dfmt(new Date(TODAY.getFullYear(),TODAY.getMonth()+1,15),{month:'long'})+' 15').toUpperCase()
    : k==='NEXT1'?(dfmt(new Date(TODAY.getFullYear(),TODAY.getMonth()+1,1),{month:'long'})+' 1').toUpperCase() : el.textContent; });
/* a page embedding the app can open it on one screen: ?embed=1&show=family */
if(Q.get('show')==='family') openFamily();

/* ══ WISH JARS ══
   Something a group wants together (a trip, a dinner out, a concert). It fills with scroll-free time: every hour a
   person's own deals give back adds the agreed amount. Coins are virtual; ScrollJar never touches the money.
   Everyone sees the wish, the total, the date and who's in; nobody sees who slipped or anyone else's share.
   Free with one friend; groups of three or more are Plus. If the date comes first, nothing is owed. */
/* up to 2 scroll-free hours a day count per person, so the best-doing friend never owes the most and nobody keeps deals small to save money */
const WISH_DAY_CAP=2;
const wishMonthMax=rate=>Math.round(rate*WISH_DAY_CAP*30);
const WISH={name:'Lisbon trip',kind:'trip',target:600,rate:1,hours:340,mine:78,days:60,
  people:[{a:'You',c:'linear-gradient(150deg,#FFE9A8,#E0A422)'},{a:'N',c:'linear-gradient(150deg,#37E2C0,#1E63FF)'},{a:'M',c:'linear-gradient(150deg,#8B7CF6,#5AA9FF)'},{a:'S',c:'linear-gradient(150deg,#FF9E7A,#FFC94D)'}]};
const wishBy=()=>{ const d=daysAgo(-WISH.days); return MON3[d.getMonth()]+' '+d.getDate(); };
const usd=v=>'$'+(v%1?v.toFixed(2):v.toLocaleString('en-US'));
function renderWish(animate){
  const got=WISH.hours*WISH.rate, pct=Math.min(1,got/WISH.target);
  $('wishTitle').textContent=WISH.name; document.querySelectorAll('.wishChipName').forEach(e=>e.textContent=WISH.name);
  $('wishEyebrow').textContent='WISH JAR'+(WISH.days?' · BY '+wishBy().toUpperCase():'');
  $('wishAmt').textContent=usd(Math.min(got,WISH.target)); $('wishTarget').textContent=usd(WISH.target);
  $('wishFill').style.width=(pct*100)+'%';
  $('wishAvatars').innerHTML=WISH.people.map(p=>`<div class="av" style="background:${p.c};${p.a==='You'?'color:#3A2A00;font-size:10px':''}">${p.a}</div>`).join('');
  $('wishMine').textContent=usd(WISH.mine*WISH.rate);
  $('wishMineSub').textContent=`${WISH.mine} scroll-free hours in this jar, at ${usd(WISH.rate)} an hour`;
  $('wishHow').textContent=`Every hour your deals give back adds ${usd(WISH.rate)} to the jar, up to ${WISH_DAY_CAP} hours a day each, so the most anyone puts in is about ${usd(wishMonthMax(WISH.rate))} a month. Slips don't count here and cost nothing here: your own deals still send their coins to charity, as always.`;
  drawLights($('wishLights'),Math.round(pct*POS.length),animate);
}
function openWish(){ go('wish'); $('s-wish').scrollTop=0; renderWish(true); }
function wishDone(){
  $('wishDoneTitle').textContent=`You did it: ${WISH.name}.`;
  $('wishDoneSub').textContent=`${usd(WISH.target)} of scroll-free time, together.`;
  $('wishDoneMine').textContent=usd(Math.round(WISH.target*WISH.mine/WISH.hours));
  drawLights($('wishDoneLights'),POS.length,true); $('ov-wishdone').classList.add('on');
}
/* the "+" on the Board: start a wish jar, or invite someone to a jar you're in */
const WISH_KINDS=[['trip','A trip'],['dinner','A dinner out'],['concert','A concert'],['home','Something for home'],['camera','A camera']];
const NJ={step:0,kind:'trip',name:'',target:600,rate:1,days:60,people:2};
function openNewJar(){ Object.assign(NJ,{step:0,kind:'',name:'',target:600,rate:1,days:60,people:2}); renderNewJar(); $('ov-newjar').classList.add('on'); }
function renderNewJar(){
  const B=$('newJarBody');
  if(NJ.step===0){ $('newJarKicker').textContent='NEW JAR';
    B.innerHTML=`<div class="display" style="font-size:21px;margin-bottom:12px">What kind of jar?</div>
      <div class="njPick" role="button" tabindex="0" onclick="NJ.step=1;renderNewJar()"><b>A wish jar</b><span>For something you want together: a trip, a dinner out, a concert. It fills with everyone's scroll-free time, and ScrollJar never touches the money.</span></div>
      <div class="njPick" role="button" tabindex="0" onclick="NJ.step='dinner';renderNewJar()"><b>A dinner jar, for two</b><span>Ready-made deals to share with one person: phones down at dinner, screens out of the bedroom. Same hours for both of you.</span></div>
      <div class="njPick" role="button" tabindex="0" onclick="closeOv('ov-newjar');openBack()"><b>Back a friend</b><span>Back someone's week with $5 to $25: each day they keep their deals becomes a treat for them, the rest goes to their cause.</span></div>
      <div class="njPick" role="button" tabindex="0" onclick="closeOv('ov-newjar');go('invite')"><b>Invite someone to Casa Jar</b><span>Share the deals and give together, each to your own cause.</span></div>`;
    return; }
  if(NJ.step==='dinner'){ renderDinner(); return; }
  $('newJarKicker').textContent='A WISH JAR';
  const nm=NJ.name.trim()||((WISH_KINDS.find(k=>k[0]===NJ.kind)||[])[1]||'');
  const by=NJ.days?(()=>{ const d=daysAgo(-NJ.days); return MON3[d.getMonth()]+' '+d.getDate(); })():'';
  B.innerHTML=`<div class="display" style="font-size:21px;margin-bottom:4px">What are you wishing for?</div>
    <div class="firstChips">${WISH_KINDS.map(([k,l])=>`<span class="chip${NJ.kind===k?' on':''}" onclick="NJ.kind='${k}';NJ.name='';renderNewJar()">${l}</span>`).join('')}</div>
    <input class="timeIn" maxlength="30" placeholder="or name it: Lisbon, Mia's birthday…" aria-label="Name your wish" value="${esc(NJ.name)}" oninput="NJ.name=this.value;njLine()">
    <div class="eyebrow" style="margin:16px 2px 8px">HOW MUCH</div>
    <div class="row" style="gap:6px;flex-wrap:wrap">${[150,300,600,1000,2000].map(v=>`<span class="chip${NJ.target===v?' on':''}" onclick="NJ.target=${v};renderNewJar()">$${v.toLocaleString('en-US')}</span>`).join('')}</div>
    <div class="eyebrow" style="margin:16px 2px 8px">BY WHEN · optional</div>
    <div class="row" style="gap:6px;flex-wrap:wrap">${[[0,'No date'],[30,'In a month'],[90,'In 3 months'],[180,'In 6 months']].map(([v,l])=>`<span class="chip${NJ.days===v?' on':''}" onclick="NJ.days=${v};renderNewJar()">${l}</span>`).join('')}</div>
    <div class="eyebrow" style="margin:16px 2px 8px">EACH SCROLL-FREE HOUR IS WORTH</div>
    <div class="row" style="gap:6px;flex-wrap:wrap">${[.5,1,2].map(v=>`<span class="chip${NJ.rate===v?' on':''}" onclick="NJ.rate=${v};renderNewJar()">${usd(v)} each</span>`).join('')}</div>
    <div class="card firstDeal" id="njLine"></div>
    <div class="tiny" style="margin:2px 2px 12px;line-height:1.5">Free with one friend. Groups of three or more are part of Plus.</div>
    <button class="btn mint" ${nm?'':'disabled'} id="njGo" onclick="makeWish()">Make the wish jar</button>
    <button class="btn ghost" style="margin-top:8px" onclick="NJ.step=0;renderNewJar()">Back</button>`;
  njLine();
}
function njLine(){
  const nm=NJ.name.trim()||((WISH_KINDS.find(k=>k[0]===NJ.kind)||[])[1]||'');
  const by=NJ.days?(()=>{ const d=daysAgo(-NJ.days); return ' by '+MON3[d.getMonth()]+' '+d.getDate(); })():'';
  $('njLine').innerHTML=nm?`<div class="eyebrow" style="margin-bottom:6px">YOUR WISH JAR</div><b>${esc(nm)}</b>: ${usd(NJ.target)}${by}. Every scroll-free hour adds ${usd(NJ.rate)}, up to ${WISH_DAY_CAP} a day each, so the most anyone puts in is about ${usd(wishMonthMax(NJ.rate))} a month. Nothing is owed if the date comes first.`
    :`<div class="tiny">Pick what it's for, or name it.</div>`;
  if($('njGo')) $('njGo').disabled=!nm;
}
function makeWish(){
  const nm=NJ.name.trim()||WISH_KINDS.find(k=>k[0]===NJ.kind)[1];
  Object.assign(WISH,{name:nm,kind:NJ.kind,target:NJ.target,rate:NJ.rate,days:NJ.days,hours:0,mine:0,people:[WISH.people[0]]});
  $('d1WishStrip').hidden=false;   /* on day one the Board has no jar strip yet: this keeps the new wish jar one tap away */
  closeOv('ov-newjar'); openWish(); toast('Wish jar made. Invite someone to fill it with you.');
}

/* ══ BACKING — back a friend's week (L's idea from July, designed 2026-10-19) ══
   Someone you share a jar with backs your deals for 3–14 days with $5–25. Each day you keep your deals,
   that day's share becomes a treat for you: a gift card you pick at the end (books, coffee, cinema) or a
   month of Plus, never cash. A day you open anyway sends that day's share to your own charity. The backer
   pays the whole amount either way and nothing goes back to them, so it's a gift, never a bet. The backer
   sees how many days were kept, never which apps, when, or which days. Once accepted it runs to the end. */
const BACK_PEOPLE=[
  {n:'Noor',a:'N',c:'linear-gradient(150deg,#37E2C0,#1E63FF)'},
  {n:'Marta',a:'M',c:'linear-gradient(150deg,#8B7CF6,#5AA9FF)'},
  {n:'Giulia',a:'G',c:'linear-gradient(150deg,#FFB86B,#FF5C8A)'},
  {n:'Sofia',a:'S',c:'linear-gradient(150deg,#FF9E7A,#FFC94D)'}];
const bPerson=n=>BACK_PEOPLE.find(p=>p.n===n);
const TREATS=[['books','Books'],['coffee','Coffee'],['cinema','Cinema'],['plus','A month of Plus']];
const bShare=(amt,days,n)=>Math.round(amt*n/days*100)/100;
/* someone backing you: Noor, a week, started 5 days ago; today is day 6 */
const BACK_IN={from:'Noor',amt:10,days:7,log:['kept','kept','gave','kept','kept'],note:"You've got this. Book club's on Sunday.",treat:''};
/* someone who'd like to back you next */
const BACK_OFFER={from:'Sofia',amt:5,days:7,note:'For the guitar comeback.',st:'pending'};
/* people you back: the backer sees counts only, never which days */
const BACK_OUT=[{to:'Marta',amt:5,days:3,kept:1,gave:0,st:'on'}];
const BK={step:'new',who:'',amt:10,days:7,note:''};
const bDay=i=>{ const d=daysAgo(BACK_IN.log.length-i); return dfmt(d,{weekday:'short'}).slice(0,1); };
const bState=i=>BACK_IN.log[i]||(i===BACK_IN.log.length?(BACK_IN.todayGave?'gave':'today'):'next');
const bCount=k=>{ let n=0; for(let i=0;i<BACK_IN.days;i++) if(bState(i)===k) n++; return n; };
const bCharity=()=>CHARITIES[S.charity].n;
function backDots(){
  return `<div class="backDots">${Array.from({length:BACK_IN.days},(_,i)=>`<span class="bDot ${bState(i)}"><i></i>${bDay(i)}</span>`).join('')}</div>`;
}
function renderBacking(){
  const p=bPerson(BACK_IN.from), kept=bCount('kept');
  $('backToday').innerHTML=`<div class="row" style="gap:12px;align-items:flex-start">
      <div class="av" style="background:${p.c}">${p.a}</div>
      <div style="flex:1;min-width:0"><div class="eyebrow">BACKED BY ${p.n.toUpperCase()}</div>
        <b style="font-size:13.5px">${kept} days kept · ${usd(bShare(BACK_IN.amt,BACK_IN.days,kept))} toward your treat</b>${backDots()}</div>
      <span style="color:var(--ink-3)">›</span></div>`;
  let h='';
  if(BACK_OFFER.st==='pending'){ const o=bPerson(BACK_OFFER.from);
    h+=`<div class="card backCard offer" role="button" tabindex="0" onclick="openBacking('offer')"><div class="row" style="gap:12px">
      <div class="av" style="background:${o.c}">${o.a}</div><div style="flex:1;min-width:0"><b style="font-size:13.5px">${o.n} wants to back your next week</b>
      <div class="tiny">${usd(BACK_OFFER.amt)} · a treat for you, or your cause</div></div><span class="pill chr">Have a look</span></div></div>`; }
  if(BACK_OFFER.st==='yes'){ const o=bPerson(BACK_OFFER.from);
    h+=`<div class="card backCard"><div class="row" style="gap:12px"><div class="av" style="background:${o.c}">${o.a}</div>
      <div style="flex:1;min-width:0"><b style="font-size:13.5px">${o.n}'s backing starts tomorrow</b><div class="tiny">${usd(BACK_OFFER.amt)} · 7 days</div></div></div></div>`; }
  h+=`<div class="card backCard" role="button" tabindex="0" onclick="openBacking('in')"><div class="row" style="gap:12px">
    <div class="av" style="background:${p.c}">${p.a}</div><div style="flex:1;min-width:0"><b style="font-size:13.5px">${p.n}'s backing your week</b>
    <div class="tiny">${kept} of ${BACK_IN.days} days kept so far</div></div><span style="color:var(--ink-3)">›</span></div></div>`;
  BACK_OUT.forEach((b,i)=>{ const q=bPerson(b.to);
    h+=`<div class="card backCard" role="button" tabindex="0" onclick="openBacking('out',${i})"><div class="row" style="gap:12px">
      <div class="av" style="background:${q.c}">${q.a}</div><div style="flex:1;min-width:0"><b style="font-size:13.5px">You're backing ${q.n}</b>
      <div class="tiny">${b.st==='waiting'?'Waiting for '+q.n+' to say yes':b.st==='no'?'Not this time':b.fresh?`${usd(b.amt)} · ${b.days} days · starts tomorrow`:`${usd(b.amt)} · ${b.kept} of ${b.days} days kept so far`}</div></div>
      <span style="color:var(--ink-3)">›</span></div></div>`; });
  $('backList').innerHTML=h;
}
/* the pause and the coin sheet mention it once, quietly: never a countdown, never guilt */
function backPauseLine(){
  const el=$('breathBack'), on=S.stage==='wk3';
  el.hidden=!on; if(!on) return;
  el.textContent=BACK_IN.todayGave ? `${BACK_IN.from}'s backing your week. Tomorrow's share is still yours.` : `${BACK_IN.from}'s backing your week. Today's share is still yours.`;
}
function backCoinLine(){
  const el=$('ovrBack'), on=S.stage==='wk3'&&!BACK_IN.todayGave;
  el.hidden=!on; if(!on) return;
  el.textContent=`Opening now also sends today's share of ${BACK_IN.from}'s backing, ${usd(bShare(BACK_IN.amt,BACK_IN.days,1))}, to ${bCharity()}.`;
}
function backSlip(){ if(S.stage==='wk3'&&!BACK_IN.todayGave){ BACK_IN.todayGave=true; renderBacking(); } }

function openBack(){ Object.assign(BK,{step:'new',who:'',amt:10,days:7,note:''}); renderBackBody(); $('ov-backing').classList.add('on'); }
function openBacking(mode,i){ BK.step=mode; BK.i=i; renderBackBody(); $('ov-backing').classList.add('on'); }
function renderBackBody(){
  const B=$('backBody'), K=$('backKicker'), m=BK.step;
  if(m==='new'){
    K.textContent='BACK A FRIEND';
    if(S.stage!=='wk3'){
      B.innerHTML=`<div class="display" style="font-size:21px;margin-bottom:6px">Back a friend's week</div>
        <div class="sub" style="margin-bottom:14px">You can back anyone you share a jar with. Nobody's in a jar with you yet.</div>
        <button class="btn mint" onclick="closeOv('ov-backing');go('invite')">Invite someone</button>`;
      return; }
    const busy=n=>BACK_OUT.some(b=>b.to===n&&b.st!=='no');
    const p=bPerson(BK.who), per=bShare(BK.amt,BK.days,1), len=BACK_OPTS_DAYS.find(d=>d[0]===BK.days)[1].toLowerCase();
    B.innerHTML=`<div class="display" style="font-size:21px;margin-bottom:4px">Back a friend's week</div>
      <div class="sub" style="margin-bottom:6px">A gift either way: a treat for them, or their cause.</div>
      <div class="eyebrow" style="margin:14px 2px 8px">WHO</div>
      <div class="row" style="gap:6px;flex-wrap:wrap">${BACK_PEOPLE.map(q=>busy(q.n)
        ?`<span class="chip off" aria-disabled="true">${q.n} · already backing</span>`
        :`<span class="chip${BK.who===q.n?' on':''}" role="radio" aria-checked="${BK.who===q.n}" onclick="BK.who='${q.n}';renderBackBody()">${q.n}</span>`).join('')}</div>
      <div class="eyebrow" style="margin:16px 2px 8px">HOW MUCH</div>
      <div class="row" style="gap:6px;flex-wrap:wrap">${[5,10,15,25].map(v=>`<span class="chip${BK.amt===v?' on':''}" onclick="BK.amt=${v};renderBackBody()">$${v}</span>`).join('')}</div>
      <div class="eyebrow" style="margin:16px 2px 8px">HOW LONG</div>
      <div class="row" style="gap:6px;flex-wrap:wrap">${BACK_OPTS_DAYS.map(([v,l])=>`<span class="chip${BK.days===v?' on':''}" onclick="BK.days=${v};renderBackBody()">${l}</span>`).join('')}</div>
      <div class="eyebrow" style="margin:16px 2px 8px">A NOTE · optional</div>
      <input class="timeIn" maxlength="60" placeholder="in your own words" aria-label="A note for your friend" value="${esc(BK.note)}" oninput="BK.note=this.value">
      <div class="card firstDeal">${p?`<div class="eyebrow" style="margin-bottom:6px">YOUR BACKING</div>
        ${usd(BK.amt)} for ${p.n}, ${len}. Each day ${p.n} keeps their deals, ${usd(per)} becomes a treat for ${p.n}. A day ${p.n} opens anyway, that share goes to ${p.n}'s own charity.
        <div class="tiny" style="margin-top:8px;line-height:1.5">You pay ${usd(BK.amt)} when it ends, plus a ${usd(cardFee(BK.amt))} card fee${isPlus()?' (Plus covers up to $1 a month of card fees)':''}. Nothing comes back to you. You'll see how many days were kept, never ${p.n}'s apps, times or which days.</div>`
        :`<div class="tiny">Pick who you'd like to back.</div>`}</div>
      <div class="tiny" style="margin:2px 2px 12px;line-height:1.5">Only people you share a jar with · one backing per friend at a time · up to five at once.</div>
      <button class="btn mint" ${p?'':'disabled'} onclick="backSend()">Send the offer</button>`;
    return; }
  if(m==='offer'){ const o=bPerson(BACK_OFFER.from), per=bShare(BACK_OFFER.amt,BACK_OFFER.days,1);
    K.textContent='AN OFFER';
    B.innerHTML=`<div class="row" style="gap:12px;margin-bottom:12px"><div class="av" style="background:${o.c}">${o.a}</div>
        <div class="display" style="font-size:20px;line-height:1.2">${o.n} wants to back your next week</div></div>
      <div class="card backNote">“${esc(BACK_OFFER.note)}”<div class="tiny" style="margin-top:4px">${o.n}, in ${o.n}'s own words</div></div>
      <div class="backFacts">
        <div><b>${usd(BACK_OFFER.amt)} · 7 days · from tomorrow</b></div>
        <div>Each day you keep your deals, ${usd(per)} becomes a treat for you: a gift card you pick at the end, or a month of Plus.</div>
        <div>A day you open anyway, that day's share goes to ${bCharity()}.</div>
        <div>${o.n} pays either way, and nothing goes back to ${o.n}.</div>
        <div>${o.n} will see how many days you kept. Never your apps, your times or which days.</div></div>
      <button class="btn mint" onclick="backAccept(true)">Yes, back me</button>
      <button class="btn ghost" style="margin-top:8px" onclick="backAccept(false)">Not now</button>
      <div class="tiny" style="text-align:center;margin-top:9px">No reason needed. ${o.n} sees “not this time”.</div>`;
    return; }
  if(m==='out'){ const b=BACK_OUT[BK.i], q=bPerson(b.to), left=b.days-b.kept-b.gave;
    K.textContent='YOU\'RE BACKING';
    B.innerHTML=`<div class="row" style="gap:12px;margin-bottom:6px"><div class="av" style="background:${q.c}">${q.a}</div>
        <div><div class="display" style="font-size:20px;line-height:1.2">${q.n}</div><div class="tiny">${usd(b.amt)} · ${b.days} days</div></div></div>
      ${b.st==='waiting'?`<div class="sub" style="margin:10px 0 14px">Waiting for ${q.n} to say yes. You can take the offer back until then.</div>
        <button class="btn ghost" onclick="BACK_OUT.splice(BK.i,1);renderBacking();closeOv('ov-backing');toast('Offer taken back.')">Take the offer back</button>`
      :b.fresh?`<div class="sub" style="margin:10px 0 14px">${q.n} said yes. It starts tomorrow and runs ${b.days} days. You'll hear when it ends, not every day.</div>
        <button class="btn mint" onclick="closeOv('ov-backing');toast('High five sent to ${q.n}.')">Send ${q.n} a high five</button>`
      :`<div class="backBar" aria-label="${b.kept} kept, ${b.gave} to ${q.n}'s charity, ${left} to go">${'<i class="kept"></i>'.repeat(b.kept)}${'<i class="gave"></i>'.repeat(b.gave)}${'<i></i>'.repeat(left)}</div>
        <div class="sub" style="margin-bottom:12px">${b.kept} ${b.kept===1?'day':'days'} kept so far: ${usd(bShare(b.amt,b.days,b.kept))} toward ${q.n}'s treat. ${left} to go.</div>
        <div class="tiny" style="line-height:1.55;margin-bottom:14px">You'll hear when it ends, not every day. You see how many days were kept, never ${q.n}'s apps, times or which days.</div>
        <button class="btn mint" onclick="closeOv('ov-backing');toast('High five sent to ${q.n}.')">Send ${q.n} a high five</button>`}`;
    return; }
  if(m==='in'){ const p=bPerson(BACK_IN.from), kept=bCount('kept'), gave=bCount('gave'), per=bShare(BACK_IN.amt,BACK_IN.days,1);
    K.textContent='BACKING YOUR WEEK';
    B.innerHTML=`<div class="row" style="gap:12px;margin-bottom:12px"><div class="av" style="background:${p.c}">${p.a}</div>
        <div><div class="display" style="font-size:20px;line-height:1.2">${p.n}'s backing your week</div><div class="tiny">${usd(BACK_IN.amt)} · ${BACK_IN.days} days</div></div></div>
      <div class="card backNote">“${esc(BACK_IN.note)}”<div class="tiny" style="margin-top:4px">${p.n}, in ${p.n}'s own words</div></div>
      ${backDots()}
      <div class="backLegend"><span><i class="kept"></i>kept</span><span><i class="gave"></i>to ${esc(bCharity())}</span><span><i class="today"></i>today</span></div>
      <div class="sub" style="margin:10px 0 4px">${kept} days kept: ${usd(bShare(BACK_IN.amt,BACK_IN.days,kept))} toward your treat.${gave?` ${gave} ${gave===1?'day':'days'} went to ${bCharity()}: ${usd(bShare(BACK_IN.amt,BACK_IN.days,gave))}.`:''}</div>
      <div class="sub" style="margin-bottom:12px">${BACK_IN.todayGave?"Tomorrow's share is still yours.":`Today's share, ${usd(per)}, is still yours.`}</div>
      <div class="tiny" style="line-height:1.55;margin-bottom:14px">${p.n} sees how many days you kept. Never your apps, your times or which days.</div>
      <button class="btn chrome" onclick="openBacking('done')">Preview the end of the week</button>`;
    return; }
  if(m==='done'){ const p=bPerson(BACK_IN.from), gave=bCount('gave'), kept=BACK_IN.days-gave, treat=bShare(BACK_IN.amt,BACK_IN.days,kept), cause=Math.round((BACK_IN.amt-treat)*100)/100;
    K.textContent=p.n.toUpperCase()+"'S BACKING · DONE";
    B.innerHTML=`<div style="text-align:center"><svg width="44" height="44" style="color:var(--gold);filter:drop-shadow(0 0 16px rgba(255,201,77,.6))"><use href="#i-heart"/></svg>
        <div class="display" style="font-size:22px;margin:8px 0 4px">You kept ${kept} of ${BACK_IN.days} days.</div>
        <div class="sub">${usd(treat)} becomes your treat${gave?` and ${usd(cause)} went to ${bCharity()}`:''}.</div></div>
      <div class="eyebrow" style="margin:16px 2px 8px">PICK YOUR TREAT</div>
      <div class="row" style="gap:6px;flex-wrap:wrap">${TREATS.map(([k,l])=>`<span class="chip${BACK_IN.treat===k?' on':''}" role="radio" aria-checked="${BACK_IN.treat===k}" onclick="BACK_IN.treat='${k}';renderBackBody()">${l}</span>`).join('')}</div>
      <div class="tiny" style="margin:9px 2px 14px;line-height:1.5">A gift card, never cash. Nothing goes back to ${p.n}.</div>
      <button class="btn mint" ${BACK_IN.treat?'':'disabled'} onclick="closeOv('ov-backing');toast('Enjoy it. High five sent to ${p.n}.')">Take it, and thank ${p.n}</button>`;
  }
}
const BACK_OPTS_DAYS=[[3,'3 days'],[7,'A week'],[14,'Two weeks']];
function backSend(){
  const n=BK.who; BACK_OUT.unshift({to:n,amt:BK.amt,days:BK.days,kept:0,gave:0,st:'waiting'});
  closeOv('ov-backing'); renderBacking(); toast(`Sent. ${n} can say yes or not now.`);
  setTimeout(()=>{ const b=BACK_OUT.find(x=>x.to===n&&x.st==='waiting'); if(!b) return; b.st='on'; b.fresh=true; renderBacking(); toast(`${n} said yes. It starts tomorrow.`); },3200);
}
function backAccept(yes){
  BACK_OFFER.st=yes?'yes':'no'; closeOv('ov-backing'); renderBacking();
  toast(yes?`Done. ${BACK_OFFER.from}'s backing starts tomorrow.`:`No problem. ${BACK_OFFER.from} sees “not this time”.`);
}
renderBacking();

/* ══ WIDGETS — what ours would say on the Home Screen and the Lock Screen (iOS draws them) ══
   Home: a medium widget (your time, shield status) and two small ones (the jar; "Your time" buttons, interactive on iOS 17+).
   Lock Screen: inline, rectangular and circular widgets that never show money, plus the Live Activity countdown
   while an app is open after "Open anyway", with an "I'm done" button that brings the shield back. */
let wgT=0;
function openWidgets(tab,live){ wgFill(); wgTab(tab||'home'); wgLive(!!live); $('ov-widgets').classList.add('on'); }
function wgFill(){
  const t=jarTotal(), d1=S.stage==='new', time=d1?'Day 1':$('timeBig').textContent, n=COMMITS.length, sh=`Shield on · ${n} deal${n===1?'':'s'}`;
  $('wgTime').textContent=time; $('wgTimeS').textContent=d1?'every hour counts from here':'back this week';
  $('wgShield').textContent=sh; $('lkInline').textContent=sh;
  $('wgJarAmt').textContent='$'+t; $('wgCharity').textContent=t?'to '+charity().n:'empty for now';
  renderCoins($('wgCoins'),t);
  $('lkDate').textContent=dfmt(TODAY,{weekday:'long',day:'numeric',month:'long'});
  $('lkTime').textContent=time; $('lkTimeS').textContent=d1?'every hour counts':'back this week';
  $('lkDays').textContent=d1?1:S.streak;
  $('lkLiveName').textContent=((COMMITS[0]||{}).n||'Your deal')+' is open';
}
function wgTab(t){
  $('wgHomeView').hidden=t!=='home'; $('wgLockView').hidden=t!=='lock';
  $('wgTabHome').classList.toggle('on',t==='home'); $('wgTabLock').classList.toggle('on',t==='lock');
  $('wgTabHome').setAttribute('aria-selected',t==='home'); $('wgTabLock').setAttribute('aria-selected',t==='lock');
}
function wgLive(on){
  $('wgLiveChk').checked=on; $('lkLive').hidden=!on; $('wgIsland').hidden=!on;
  clearInterval(wgT); if(on){ wgTick(); wgT=setInterval(wgTick,1000); }
}
/* the countdown follows the real access window when one is running */
function wgTick(){
  const t=$('ov-window').classList.contains('on')?$('winTimer').textContent:'12:41', [m,s]=t.split(':').map(Number);
  $('lkLiveT').textContent=t; $('wgIslandT').textContent=t;
  $('lkLiveBar').style.width=Math.max(0,Math.min(100,(m*60+s)/900*100))+'%';
}
function closeWidgets(){ clearInterval(wgT); closeOv('ov-widgets'); }
function wgOpen(where){ closeWidgets(); go(where==='jar'?'jar':'home'); }
function wgStart(min){ closeWidgets(); go('home'); startFocus(min); }
function wgDone(){ const open=$('ov-window').classList.contains('on'); closeWidgets(); if(open) endWindow(); else toast('Done. The shield is back on.'); }

/* ══ DAY 7 — a whole week kept. Earned, fixed and predictable: it comes on the 7th day of a deal, every time,
   never as a surprise reward. Sharing is optional and the card shows no apps and no coins. ══ */
const WK={hours:true,deal:false};
function openWeek(){
  const d=COMMITS[0]||{n:'Your deal'}, first=S.stage==='new';
  document.querySelectorAll('.ov.on').forEach(o=>{ if(o.id!=='ov-onb') o.classList.remove('on'); });
  $('weekTitle').textContent=first?'Your first week, kept.':'A whole week, kept.';
  $('weekSub').textContent=first?`${d.n}: seven days in a row, start to finish. Every hour counted.`
    :`${d.n}: seven days in a row, and ${$('timeBig').textContent} of your time back this week.`;
  Object.assign(WK,{hours:!first,deal:false});
  $('wkHours').hidden=first; $('weekPostBtn').hidden=first;   /* on day 7 of a first deal there are no hours to show and no jar to post to yet */
  weekCard(); renderCoins($('weekCoins'),jarTotal());
  $('ov-week').classList.add('on'); $('ov-week').scrollTop=0;
  const svg=$('weekJarSvg');
  setTimeout(()=>{ jarMood(svg,'happy',2600); svg.classList.remove('hop'); void svg.getBoundingClientRect(); svg.classList.add('hop'); stars($('weekJarBox'),9,true); },350);
}
function weekCard(){
  const d=COMMITS[0]||{n:'Your deal'}, hrs=WK.hours&&S.stage==='wk3';
  $('weekCard').innerHTML=`<div class="wcBrand"><svg width="13" height="13"><use href="#i-jar"/></svg>ScrollJar</div>
    <div class="wcBig">A week,<br>kept.</div>
    ${hrs?`<div class="wcLine"><b class="num">${$('timeBig').textContent}</b> of my time back</div>`:''}
    <div class="wcDeal">${WK.deal?esc(d.n)+' · ':''}7 days in a row</div>`;
  $('wkHours').classList.toggle('on',WK.hours); $('wkHours').setAttribute('aria-checked',WK.hours);
  $('wkDeal').classList.toggle('on',WK.deal); $('wkDeal').setAttribute('aria-checked',WK.deal);
}
function weekOpt(k){ WK[k]=!WK[k]; weekCard(); }
function weekPost(){
  FEED.unshift({t:'week',a:'You',c:'linear-gradient(150deg,#FFE9A8,#E0A422)',n:'You',w:'just now',
    body:'A week kept: 7 days in a row.'+(WK.hours&&S.stage==='wk3'?` ${$('timeBig').textContent} of my time back.`:''),kudos:0});
  renderFeed(); closeOv('ov-week'); toast('Posted to your jars.');
}
function weekSend(){ closeOv('ov-week'); toast('Shared. The link opens a page about Casa Jar: they can see it without the app.'); }

/* ══ PEEK VALVE — one free peek every 48 hours (kindness, in every plan) ══
   For genuine needs, like a work message. It comes after the breathing pause, on the coin sheet, so it's never
   distraction on demand. No coin, no rising price, and it never breaks a kept day (or a friend's backing).
   Length 2, 5 or 10 minutes: shorter applies now, longer waits 24 hours. */
const PEEK={min:5,usedAt:null,pending:null};
const PEEK_EVERY=48*3600e3;
const peekReady=()=>!PEEK.usedAt||Date.now()-PEEK.usedAt>=PEEK_EVERY;
const peekNext=()=>{ const d=new Date(PEEK.usedAt+PEEK_EVERY); return d.toLocaleString('en-US',{weekday:'long'})+' at '+d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}); };
function renderPeekRow(){
  const row=$('ovrPeek'); row.hidden=!S.stakes; if(!S.stakes) return;
  const ok=peekReady(); row.classList.toggle('used',!ok);
  $('ovrPeekT').textContent=ok?'Need to check something real?':'Your free peek is resting';
  $('ovrPeekS').textContent=ok?`Your free peek: ${PEEK.min} minutes, no coin, and today still counts as kept.`:`It's back ${peekNext()}. One every 48 hours.`;
  $('ovrPeekP').hidden=!ok;
}
function usePeek(){
  if(!peekReady()){ toast(`Your next free peek is ${peekNext()}.`); return; }
  PEEK.usedAt=Date.now(); closeOv('ov-override'); renderPeek(); openWindow(0,PEEK.min);
}
function renderPeek(){
  if(!S.stakes){ $('peekState').textContent='From day 3 ›'; $('peekState').classList.remove('mint'); $('peekState').classList.add('chr');
    $('peekSub').textContent='opening is free for now, so no peek needed yet'; return; }
  const ok=peekReady();
  $('peekState').textContent=(ok?'Ready':'Resting')+' ›'; $('peekState').classList.toggle('mint',ok); $('peekState').classList.toggle('chr',!ok);
  $('peekSub').textContent=ok?`one free ${PEEK.min}-minute peek every 48h`:`next one ${peekNext()}`;
  if($('peekBox').style.display!=='none') renderPeekBox();
}
function togglePeek(){ const b=$('peekBox'), open=b.style.display==='none'; b.style.display=open?'':'none'; $('peekState').setAttribute('aria-expanded',open); if(open) renderPeekBox(); }
function renderPeekBox(){
  $('peekBox').innerHTML=`<div class="tiny" style="margin-bottom:7px;line-height:1.5">For something genuine, like a work message. You'll find it after the pause, when you're about to drop a coin: no coin, and the day still counts as kept.</div>
    <div class="row" style="gap:6px;flex-wrap:wrap">${[2,5,10].map(v=>`<span class="chip${v===PEEK.min?' on':''}${v===PEEK.pending?' soon':''}" onclick="setPeek(${v})">${v} min</span>`).join('')}</div>
    ${PEEK.pending?`<div class="tiny" style="margin-top:7px;color:var(--gold-text)">${PEEK.pending} minutes from tomorrow.</div>`:''}`;
}
function setPeek(v){
  if(v===PEEK.min){ PEEK.pending=null; }
  else if(v<PEEK.min){ PEEK.min=v; PEEK.pending=null; toast(`Peeks are ${v} minutes now. Shorter applies straight away.`); }
  else { PEEK.pending=v; toast(`Peeks become ${v} minutes in 24 hours. Longer waits a day, in cold blood.`); }
  renderPeek(); renderPeekBox();
}
renderPeek();

/* ══ SIGN YOUR DEAL — the first deal, signed with a finger (optional). The signature stays on the phone ══ */
let signDrawn=false;
function openSign(){
  $('signDeal').innerHTML=firstSentence(); $('ov-sign').classList.add('on');
  requestAnimationFrame(()=>{ const c=$('signCanvas'), r=c.getBoundingClientRect(), k=devicePixelRatio||1;
    c.width=r.width*k; c.height=r.height*k; signClear(); });
}
function signClear(){ const c=$('signCanvas'), x=c.getContext('2d'); x.clearRect(0,0,c.width,c.height); signDrawn=false; $('signGo').disabled=true; $('signHint').hidden=false; }
(function(){
  const c=$('signCanvas'); let last=null;
  const pt=e=>{ const r=c.getBoundingClientRect(), k=c.width/r.width; return [(e.clientX-r.left)*k,(e.clientY-r.top)*k]; };
  c.addEventListener('pointerdown',e=>{ c.setPointerCapture(e.pointerId); last=pt(e); $('signHint').hidden=true; });
  c.addEventListener('pointermove',e=>{ if(!last) return; const p=pt(e), x=c.getContext('2d'), k=c.width/c.getBoundingClientRect().width;
    x.strokeStyle=getComputedStyle(document.body).getPropertyValue('--violet').trim()||'#8B7CF6'; x.lineWidth=2.6*k; x.lineCap='round'; x.lineJoin='round';
    x.beginPath(); x.moveTo(last[0],last[1]); x.lineTo(p[0],p[1]); x.stroke(); last=p;
    if(!signDrawn){ signDrawn=true; $('signGo').disabled=false; } });
  ['pointerup','pointercancel','pointerleave'].forEach(t=>c.addEventListener(t,()=>{ last=null; }));
})();
function signSeal(signed){ FIRST.sig=signed&&signDrawn?$('signCanvas').toDataURL('image/png'):''; closeOv('ov-sign'); sealFirst(); }

/* ══ THE LAST SCROLL — before the first shield goes on: one last scroll, five minutes, on purpose ══ */
function lastScroll(yes){
  closeOv('ov-last');
  if(yes) openWindow(0,5,'last');
  else toast('Shield on. Try opening one of your apps.');
}

/* ══ LETTERS TO YOUR FUTURE SELF — written when you make a deal, back as a letter in 30 days.
   On the phone only; nothing reads, sorts or answers them. When it arrives it's kept in the diary. ══ */
const LETTERS=[{text:"Hey. If you're reading this, a month has gone by. I hope you got back to the novel, even a page a day. And if it was a hard month, that's okay too. You're still here, choosing.",written:daysAgo(30),deal:'The scroll one'}];
function openLetter(){ $('letterText').value=''; $('letterWhen').textContent=monDay(daysAgo(-30)); letterCount(); $('ov-letter').classList.add('on'); }
function letterCount(){ const n=$('letterText').value.length; $('letterLeft').textContent=(280-n)+' left'; $('letterGo').disabled=!$('letterText').value.trim(); }
function sealLetter(){
  const t=$('letterText').value.trim(); if(!t) return;
  LETTERS.unshift({text:t,written:new Date(),deal:(COMMITS[0]||{}).n,mine:true}); closeOv('ov-letter'); renderLetterRow();
  toast('Sealed. It comes back on '+monDay(daysAgo(-30))+'.');
}
function renderLetterRow(){
  const L=LETTERS.find(l=>l.mine), row=$('d1Letter'); row.classList.toggle('done',!!L);
  $('d1LetterT').textContent=L?'Letter sealed':'Write to yourself, 30 days from now';
  $('d1LetterS').textContent=L?'it comes back on '+monDay(daysAgo(-30)):'optional · it comes back as a letter';
}
function openLetterRead(){
  document.querySelectorAll('.ov.on').forEach(o=>{ if(o.id!=='ov-onb') o.classList.remove('on'); });
  const L=LETTERS[0], w=L.mine?daysAgo(30):L.written;   /* the demo jumps a month ahead */
  $('letterFrom').textContent='Written on '+monDay(w)+', for today';
  $('letterBody').textContent=L.text;
  $('ov-letterread').classList.add('on'); $('ov-letterread').scrollTop=0;
  const env=$('letterEnv'); env.classList.remove('open'); void env.offsetWidth; env.classList.add('open');
  if(!L.kept){ L.kept=true; ENTRIES.unshift({tag:'letter',t:'Today',b:esc(L.text),at:'a letter from you, written on '+monDay(w)}); renderEntries(); }
}

/* ══ TRICKY-HOURS HEADS-UP (Plus) — when the pull tends to come, and a heads-up before it ══
   Built only from our own events: the moments someone reached for a shielded app (the shield's buttons).
   We never see apps or usage. Reactive support (the pause, rough-day check-ins) stays free; this proactive
   part is Plus. Heads-ups are rare: at most two a week, 15 minutes before, and "We noticed" counts within that. */
const TBANDS=['6–9am','9–noon','noon–3','3–6pm','6–9pm','9–12','late'];
const TDAYS=['M','T','W','T','F','S','S'];
const TGRID=[[2,0,0,0,1,2,1],[2,0,0,0,1,2,0],[1,0,0,1,1,2,1],[1,0,0,0,1,2,0],[0,0,0,1,2,2,1],[0,1,1,1,1,2,2],[1,1,0,1,2,3,2]];
const TRICKY={headsUp:true,perWeek:2};
const isPlus=()=>S.plan!=='free';
function renderTricky(){
  const C=$('trickyCard'); if(!C) return;
  if(!isPlus()){
    C.innerHTML=`<div class="row" style="gap:10px;align-items:flex-start"><svg width="18" height="18" style="color:var(--violet);flex:none;margin-top:1px"><use href="#i-clock"/></svg>
      <div style="flex:1"><b style="font-size:13px">Your tricky hours</b><div class="tiny" style="margin-top:3px;line-height:1.5">With Plus, see when the pull tends to come and get a gentle heads-up before it. The pause and rough-day support stay free, always.</div>
      <div class="row" style="gap:12px;margin-top:9px"><span class="pill chr" role="button" tabindex="0" style="cursor:pointer" onclick="go('paywall')">See Plus</span>
      <span class="tiny devNote" role="button" tabindex="0" style="cursor:pointer;text-decoration:underline" onclick="S.plan='yr';renderPlan()">Prototype: preview it with Plus</span></div></div></div>`;
    return; }
  C.innerHTML=`<div class="spread"><b style="font-size:13.5px">Your tricky hours</b><span class="pill mint">PLUS</span></div>
    <div class="tiny" style="margin-top:3px;line-height:1.5">When the pull came, these last 3 weeks: built only from the moments you reached for a shielded app. We never see which apps.</div>
    <div class="heat" role="img" aria-label="Heat map of tricky hours. Trickiest: Sunday, 9pm to midnight; weeknights after 9 come close.">
      <span></span>${TBANDS.map(b=>`<span class="hb">${b}</span>`).join('')}
      ${TGRID.map((r,d)=>`<span class="hd">${TDAYS[d]}</span>${r.map(v=>`<i class="h${v}"></i>`).join('')}`).join('')}
    </div>
    <div class="sub" style="margin:10px 0 2px"><b style="color:var(--ink)">Trickiest: Sunday, 9pm–midnight.</b> Weeknights after 9 come close.</div>
    <div class="spread" style="margin-top:12px;cursor:pointer" onclick="TRICKY.headsUp=!TRICKY.headsUp;renderTricky()">
      <div style="flex:1;padding-right:10px"><b style="font-size:13px">Heads-up before them</b><div class="tiny">15 minutes before · up to ${TRICKY.perWeek} a week</div></div>
      <div class="toggle${TRICKY.headsUp?' on':''}" role="switch" aria-checked="${TRICKY.headsUp}" aria-label="Heads-up before tricky hours" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click()}"></div></div>
    ${TRICKY.headsUp?`<div class="eyebrow" style="margin:14px 2px 6px">WHAT IT LOOKS LIKE</div>
    <div class="notePrev"><div class="spread"><span>SCROLLJAR</span><span>Sunday, 8:45pm</span></div><b>Sunday nights tend to get tricky around 9.</b>Want to line something up? Your time can start at 9, shields on everything.
      <div class="noteActs"><span role="button" tabindex="0" onclick="toast('Booked: your time starts Sunday at 9pm.')">Start my time at 9</span><span role="button" tabindex="0" onclick="toast('No heads-up this week.')">Not this week</span></div></div>
    <div class="notePrev quiet"><div class="spread"><span>SCROLLJAR · RARELY</span><span>Monday, 8:30am</span></div><b>We noticed.</b>Sunday 9pm came and went, and you kept it.</div>`:''}
    <div class="tiny" style="margin-top:10px;line-height:1.5">Never late at night, never more than ${TRICKY.perWeek} a week, and never a countdown.</div>`;
}

renderTricky();

/* the jar's impact card follows the demo's own story: three weeks in, coins real since day 3.
   If no 1st of the month has passed since then, nothing has been given yet and the first tip-out is next. */
(function(){
  const realSince=daysAgo(18); let tips=0;
  for(let d=new Date(realSince); d<=TODAY; d.setDate(d.getDate()+1)) if(d.getDate()===1&&d>realSince) tips++;
  if(!tips){ $('impA').textContent=NEXT1; $('impAL').textContent='your first tip-out'; $('impB').textContent='$'+jarTotal(); $('impBL').textContent='on its way so far'; $('impA').style.color='var(--ink)'; $('impB').style.color='var(--gold-text)'; }
})();

/* ══ THE BELL — once a day, a jar goes quiet together, at a time the jar picks (not always 9pm: shift workers fit).
   Each person opts in. When it rings: an hour of shields for those in, and a count of how many are off-screen,
   never who. Skipping costs nothing and it's not a deal. ══ */
const BELL={time:'21:00',in:true,n:3};
function renderBell(){
  const C=$('bellCard'); if(!C) return;
  C.innerHTML=`<div class="spread"><div class="row" style="gap:9px"><svg width="17" height="17" style="color:var(--calm)"><use href="#i-bell"/></svg>
      <div><b style="font-size:13.5px">The Bell</b><div class="tiny">once a day, Casa Jar goes quiet together</div></div></div>
      <div class="toggle${BELL.in?' on':''}" role="switch" aria-checked="${BELL.in}" aria-label="I'm in" tabindex="0" onclick="bellToggle()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click()}"></div></div>
    <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:10px">${[['19:00','7pm'],['20:00','8pm'],['21:00','9pm'],['22:00','10pm'],['07:00','7am']].map(([v,l])=>`<span class="chip${BELL.time===v?' on':''}" onclick="BELL.time='${v}';renderBell()">${l}</span>`).join('')}</div>
    <div class="tiny" style="margin-top:8px;line-height:1.5">The jar picks the time together. When it rings, an hour of shields for whoever's in. You'll see how many are off-screen, never who.</div>
    <div class="tiny devNote" role="button" tabindex="0" style="margin-top:8px;cursor:pointer;text-decoration:underline" onclick="openBell()">Prototype: ring the Bell now</div>`;
}
function bellToggle(){ BELL.in=!BELL.in; renderBell(); toast(BELL.in?"You're in. Nobody sees who is.":"You're out. Nobody sees that either."); }
function openBell(){
  $('bellKicker').textContent='CASA JAR · '+hm(BELL.time).toUpperCase(); $('bellN').textContent=BELL.n;
  $('ov-bell').classList.add('on'); const b=$('bellIcon'); b.classList.remove('ring'); void b.offsetWidth; b.classList.add('ring');
}
renderBell();

/* ══ DINNER JARS — ready-made shared deals for two. Both get the same shield hours; each person's coins
   still go to their own charity. An offer the other person accepts. ══ */
const DINNER_T=[['dinner','Phones down at dinner','7–8:30pm, every day'],['bed','Screens out of the bedroom','10:30pm–7am, every night']];
const DN={t:['dinner'],who:''};
function renderDinner(){
  $('newJarKicker').textContent='A DINNER JAR';
  const people=BACK_PEOPLE.map(p=>p.n);
  $('newJarBody').innerHTML=`<div class="display" style="font-size:21px;margin-bottom:4px">A jar for two</div>
    <div class="sub" style="margin-bottom:12px">Pick what you'd like to share. You both get the same shield hours.</div>
    ${DINNER_T.map(([k,t,w])=>`<div class="njPick${DN.t.includes(k)?' on':''}" role="checkbox" aria-checked="${DN.t.includes(k)}" tabindex="0" onclick="const i=DN.t.indexOf('${k}');i<0?DN.t.push('${k}'):DN.t.splice(i,1);renderDinner()"><b>${t}</b><span>${w}</span></div>`).join('')}
    <div class="eyebrow" style="margin:14px 2px 8px">WITH</div>
    <div class="row" style="gap:6px;flex-wrap:wrap">${people.map(n=>`<span class="chip${DN.who===n?' on':''}" onclick="DN.who='${n}';renderDinner()">${n}</span>`).join('')}<span class="chip" onclick="closeOv('ov-newjar');go('invite')">Someone else</span></div>
    <div class="tiny" style="margin:12px 2px;line-height:1.5">Each of you keeps your own price and charity. Changing the hours works like any deal: stricter now, easier in 24 hours.</div>
    <button class="btn mint" ${DN.who&&DN.t.length?'':'disabled'} onclick="dinnerSend()">Send to ${DN.who||'…'}</button>
    <button class="btn ghost" style="margin-top:8px" onclick="NJ.step=0;renderNewJar()">Back</button>`;
}
function dinnerSend(){
  const n=DN.who, what=DN.t.map(k=>DINNER_T.find(x=>x[0]===k)[1].toLowerCase()).join(' and ');
  closeOv('ov-newjar'); toast(`Sent. ${n} can say yes or not now.`);
  setTimeout(()=>{
    const strip=document.querySelector('.jarStrip.wk3'), plus=strip&&strip.querySelector('.jarChip.ghost');
    if(plus){ const c=document.createElement('div'); c.className='jarChip'; c.setAttribute('role','button'); c.tabIndex=0;
      c.innerHTML=`<b>Dinner jar</b><span>with ${n}</span>`; c.onclick=()=>toast(`Your dinner jar with ${n}: ${what}. Same hours for both of you.`); strip.insertBefore(c,plus); }
    toast(`${n} said yes. ${what.charAt(0).toUpperCase()+what.slice(1)}, together from tonight.`);
  },3000);
}

/* ══ ACCESSIBILITY — anything with a click handler that isn't a real button or link becomes one for keyboards
   and screen readers (role, tab stop, Enter/Space), and controls under 24 points tall get a bigger hit area.
   Runs on load and whenever something is redrawn. In the iOS app these are native Buttons. ══ */
(function(){
  const NATIVE=['BUTTON','A','INPUT','SELECT','TEXTAREA','LABEL'];
  function fix(root){
    (root.querySelectorAll?root:document).querySelectorAll('[onclick]').forEach(el=>{
      if(el.dataset.a11y) return; el.dataset.a11y='1';
      if(NATIVE.includes(el.tagName)) return;
      if(el.classList.contains('toggle')&&!el.hasAttribute('role')){
        el.setAttribute('role','switch'); el.setAttribute('aria-checked',el.classList.contains('on'));
        const box=el.closest('.spread,.card'), lab=box&&box.querySelector('b'); if(lab&&!el.hasAttribute('aria-label')) el.setAttribute('aria-label',lab.textContent.trim());
        el.addEventListener('click',()=>setTimeout(()=>el.setAttribute('aria-checked',el.classList.contains('on'))));
      }
      if(!el.hasAttribute('role')) el.setAttribute('role','button');
      if(el.textContent.trim()==='‹'&&!el.hasAttribute('aria-label')) el.setAttribute('aria-label','Back');
      if(!el.hasAttribute('tabindex')) el.tabIndex=0;
      if(!el.getAttribute('onkeydown')) el.addEventListener('keydown',e=>{ if((e.key==='Enter'||e.key===' ')&&e.target===el){ e.preventDefault(); el.click(); } });
      requestAnimationFrame(()=>{ const r=el.getBoundingClientRect(); if(r.height&&r.height<24&&getComputedStyle(el,'::after').content==='none') el.classList.add('hitPad'); });
    });
    document.querySelectorAll('.winStrip,.jarStrip').forEach(s=>{ if(!s.hasAttribute('tabindex')){ s.tabIndex=0; s.setAttribute('role','region'); s.setAttribute('aria-label',s.classList.contains('jarStrip')?'Your jars':'Your wins this week'); } });
  }
  fix(document);
  new MutationObserver(ms=>{ for(const m of ms) m.addedNodes.forEach(n=>{ if(n.nodeType===1) fix(n.parentElement||n); }); }).observe(document.querySelector('.phone')||document.body,{childList:true,subtree:true});
})();

/* ══ THE JAR GROWS UP — slowly, silently: a scratch on the lid after a month, a small etched star at 3 months,
   a warmer lid and a few tally marks at 6, a bit of twine at a year. Only on your own jar. Never announced,
   no progress bar, nothing to chase (brainstorm #7, L 2026-10-21). The demo button steps through the ages. ══ */
const JAR_AGES=[0,6,12];
function setJarAge(m){ document.body.dataset.jarage=m; const b=$('ageBtn'); if(b) b.textContent=m===0?'Month 6':m===6?'Month 12':'Now'; }
function cycleJarAge(){ const cur=+(document.body.dataset.jarage||0), next=JAR_AGES[(JAR_AGES.indexOf(cur)+1)%JAR_AGES.length]; setJarAge(next); go('jar'); }
setJarAge(0);
