const S = {cap:50, charity:0, streak:12, tier:'Ghost Jar', firstResist:false};
/* this month's coins, newest first — the jar total is always their sum */
const COINS=[
  {p:'The scroll one',amt:5, when:'Today · 9:12pm',    fresh:true},
  {p:'The loud one',  amt:10,when:'Yesterday · 11:40pm',fresh:true},
  {p:'The scroll one',amt:5, when:'Sun 20 Jul · 10:05pm'},
  {p:'The scroll one',amt:5, when:'Wed 16 Jul · 9:48pm'},
  {p:'The loud one',  amt:10,when:'Fri 11 Jul · 11:02pm'},
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
let oi=0;
$('onbDots').innerHTML=[0,1,2,3].map(i=>`<span style="width:${i===0?18:7}px;height:7px;border-radius:99px;background:${i===0?'var(--mint)':'var(--line)'};display:inline-block"></span>`).join('');
function onbNext(){
  if(oi===3){$('ov-preperm').classList.add('on');return}
  oi++;
  document.querySelectorAll('.onb').forEach(s=>s.style.display=(+s.dataset.i===oi)?'block':'none');
  $('onbDots').innerHTML=[0,1,2,3].map(i=>`<span style="width:${i===oi?18:7}px;height:7px;border-radius:99px;background:${i===oi?'var(--mint)':'var(--line)'};display:inline-block"></span>`).join('');
  $('onbBtn').textContent = oi===3 ? 'Shield my apps' : 'Next';
}
function closeOnb(){$('ov-onb').classList.remove('on');toast('Both apps are shielded. Try opening one.')}

/* ── jar rendering ── */
/* the pile grows with the money, not the coin count: a full jar = your monthly cap */
const POS=[];
[[190,5],[171,4],[152,5],[133,4]].forEach(([y,n])=>{
  const xs=n===5?[56,78,100,122,144]:[67,89,111,133];
  [2,1,3,0,4].filter(i=>i<n).forEach(i=>POS.push([xs[i],y]));
});
function renderCoins(target, amount){
  target.innerHTML='';
  const n=amount<=0?0:Math.max(1,Math.round(Math.min(amount/S.cap,1)*POS.length));
  for(let i=0;i<n;i++){
    const [cx,cy]=POS[i];
    const c=document.createElementNS('http://www.w3.org/2000/svg','use');
    c.setAttribute('href','#coin');c.setAttribute('x',cx-17);c.setAttribute('y',cy-17);
    c.setAttribute('width',34);c.setAttribute('height',34);
    c.setAttribute('transform',`rotate(${(i%3-1)*11} ${cx} ${cy})`);
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
    t>=S.cap?'Full for July · shields stay on':'$'+t+' of your $'+S.cap+' cap');
  document.querySelectorAll('[data-bind="coinCount"]').forEach(e=>e.textContent=COINS.length+' coin'+(COINS.length===1?'':'s'));
  document.querySelectorAll('[data-bind="charityLine"]').forEach(e=>e.textContent=charity().l);
  document.querySelectorAll('.charityName').forEach(e=>e.textContent=charity().n);
  renderCoins($('coinStack'),t); renderCoins($('todayCoins'),t);
  $('coinList').innerHTML=COINS.length?COINS.map((c,i)=>`<div class="coinRow">
      <svg viewBox="0 0 40 40" width="22" height="22" style="flex:none"><use href="#coin"/></svg>
      <div style="flex:1;min-width:0"><b style="font-size:12.5px">${c.p}</b><div class="tiny">${c.when}</div></div>
      ${c.fresh?`<span class="chip" style="padding:6px 10px;font-size:11px" onclick="refundCoin(${i})">Refund</span>`:''}
      <span class="display num" style="font-size:15px;color:var(--gold-text);min-width:30px;text-align:right">$${c.amt}</span>
    </div>`).join(''):'<div class="tiny" style="padding:10px 0">No coins yet this month.</div>';
}
function refundCoin(i){
  const c=COINS.splice(i,1)[0]; renderJar();
  toast('Refunded. $'+c.amt+' goes back to your card, no questions asked.');
}
function renderCharities(){
  $('charityList').innerHTML=CHARITIES.map((c,i)=>`<div class="tierbox${i===S.charity?' sel':''}" onclick="pickCharity(${i})">
    <div class="spread"><b style="font-size:14px">${c.n}</b>${i===S.charity?'<span class="pill mint">Your charity</span>':''}</div>
    <div class="tiny" style="margin-top:5px;line-height:1.5">${c.l}</div></div>`).join('');
}
function pickCharity(i){
  S.charity=i; renderCharities(); renderJar();
  toast('Your jar now goes to '+charity().n+' on Aug 1.');
}
function showShield(){$('ov-shield').classList.add('on')}
/* ── the real-iOS bridge: shield → notification → our app ── */
function showBridge(){
  closeOv('ov-shield');
  if(!$('iosGrid').children.length) $('iosGrid').innerHTML=Array.from({length:20},()=>'<i></i>').join('');
  $('iosBanner').classList.remove('in'); $('ov-ios').classList.add('on');
  setTimeout(()=>$('iosBanner').classList.add('in'),550);
}
function tapBridge(){ closeOv('ov-ios'); showBreath(); }
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
function openPicker(){ renderPicker(); $('ov-picker').classList.add('on'); }
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
  const parts=[]; if(pick.apps.size) parts.push(pick.apps.size+' app'+(pick.apps.size>1?'s':''));
  if(pick.cats.size) parts.push(pick.cats.size+' categor'+(pick.cats.size>1?'ies':'y'));
  closeOv('ov-picker'); closeOv('ov-preperm'); $('ov-onb').classList.remove('on');
  toast(parts.join(' and ')+' shielded. Try opening one.');
}

/* ── day ~3: "want to make it real?" — stakes, charity, membership, card ── */
let realStep=0, realPrice=5, realCharity=0, realPlan='yr', realAgree=false;
function openReal(){ realStep=0; realPrice=5; realCharity=S.charity; realPlan='yr'; realAgree=false; renderReal(); $('ov-real').classList.add('on'); }
function realGo(n){ realStep=n; renderReal(); }
function renderReal(){
  [...$('realDots').children].forEach((d,i)=>d.classList.toggle('on',i<=realStep));
  const ch=CHARITIES[realCharity].n, K=$('realKicker'), B=$('realBody');
  if(realStep===0){ K.textContent='DAY 3';
    B.innerHTML=`<div class="display" style="font-size:21px;line-height:1.2;margin-bottom:8px">Three nights. Five temptations.<br>All yours.</div>
      <div class="sub">Right now, opening a shielded app is free: you get the pause, then you're in. Make it real, and each time costs a coin you price yourself, <b>100% to a charity you pick.</b></div>
      <button class="btn mint" style="margin-top:16px" onclick="realGo(1)">Make it real</button>
      <button class="btn ghost" style="margin-top:9px" onclick="closeOv('ov-real');toast('Staying free. Ghost Jar keeps working exactly as it does now.')">Not yet, stay free</button>`;
  } else if(realStep===1){ K.textContent='YOUR STAKES';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:12px">Price it in cold blood</div>
      <div class="card" style="text-align:center"><div class="amount num">$<span id="realP">${realPrice}</span></div>
        <input type="range" min="2" max="25" value="${realPrice}" style="width:100%;accent-color:var(--mint);margin-top:10px" oninput="realPrice=+this.value;$('realP').textContent=this.value">
        <div class="tiny" style="margin-top:4px">high enough to pause you, kind enough to forgive</div></div>
      <div class="eyebrow" style="margin:12px 2px 8px">WHERE IT GOES</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${CHARITIES.map((c,i)=>`<span class="chip${i===realCharity?' on':''}" onclick="realCharity=${i};renderReal()">${c.n}</span>`).join('')}</div>
      <div class="tiny" style="margin-top:12px;line-height:1.5">Your jar is capped at $${S.cap} a month. When it's full, the shields stay on and nothing more is charged.</div>
      <button class="btn mint" style="margin-top:14px" onclick="realGo(2)">Next</button>`;
  } else if(realStep===2){ K.textContent='TWO THINGS, IN PLAIN WORDS';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:12px">Two separate payments</div>
      <div class="card"><div class="spread"><b style="font-size:13.5px">1 · Jar Hero membership</b><span class="pill chr">billed by Apple</span></div>
        <div class="row" style="gap:7px;margin-top:10px">
          <span class="chip${realPlan==='yr'?' on':''}" style="flex:1;text-align:center" onclick="realPlan='yr';renderReal()">$49.99 / year</span>
          <span class="chip${realPlan==='mo'?' on':''}" style="flex:1;text-align:center" onclick="realPlan='mo';renderReal()">$5.99 / month</span></div>
        <div class="tiny" style="margin-top:9px;line-height:1.5">This is how ScrollJar earns money. Cancel any time in your Apple account; promises you've made still run to their honest end.</div></div>
      <div class="card"><div class="spread"><b style="font-size:13.5px">2 · Your coins</b><span class="pill gold">charged by card</span></div>
        <div class="tiny" style="margin-top:7px;line-height:1.5">Once a month, on the 1st, for whatever is in your jar. 100% goes to ${ch}. We never keep any of it.</div></div>
      <button class="btn mint" onclick="realGo(3)">Continue to card</button>`;
  } else if(realStep===3){ K.textContent='YOUR CARD';
    B.innerHTML=`<div class="display" style="font-size:19px;margin-bottom:12px">Add a card for your coins</div>
      <div class="fakeField"><span style="flex:1">•••• •••• •••• 4242</span><span class="tiny">12/28 · 123</span></div>
      <div class="mandate" style="margin-top:12px"><b>You allow ScrollJar to charge this card once a month</b>, on the 1st, for the coins in your jar, up to your <b>$${S.cap} cap</b>. We email you before every charge. Any coin can be refunded within 48 hours, no questions asked.<br><br>
        Ending a promise honestly is always free, with 24 hours' notice. Switching off Screen Time access, removing this card or deleting the app in the middle of a promise counts as breaking the jar: <b>$${realPrice*5}</b> (5× your price), after a one-hour grace period to put things back.</div>
      <div class="agree${realAgree?' on':''}" onclick="realAgree=!realAgree;renderReal()"><span class="box">${realAgree?'✓':''}</span><span>I've read this and I agree.</span></div>
      <button class="btn gold" id="realSave" ${realAgree?'':'disabled'} onclick="realSave()">Save card</button>
      <div class="tiny" style="text-align:center;margin-top:9px">Your bank may ask you to confirm. That's normal.</div>`;
  } else { K.textContent='DONE';
    B.innerHTML=`<div style="text-align:center;padding:8px 0 4px">
      <svg viewBox="0 0 40 40" width="52" height="52" style="filter:drop-shadow(0 0 16px rgba(255,201,77,.7))"><use href="#coin"/></svg>
      <div class="display" style="font-size:22px;margin:12px 0 8px">It's real now.</div>
      <div class="sub">Next time you open a shielded app, a $${realPrice} coin drops in your jar. On Aug 1 it all goes to ${ch}.</div></div>
      <button class="btn mint" style="margin-top:16px" onclick="closeOv('ov-real')">Got it</button>`;
  }
}
function realSave(){
  if(!realAgree) return;
  const b=$('realSave'); b.disabled=true; b.textContent='Confirming with your bank…';
  setTimeout(()=>{ S.charity=realCharity; renderJar(); renderCharities(); realGo(4); },1200);
}
function resist(){
  ['ov-shield','ov-breath','ov-override'].forEach(closeOv);
  const {box,svg,mouth}=liveJar();
  svg.classList.remove('hop');void svg.offsetWidth;svg.classList.add('hop');
  stars(box,7,true);
  mouth.setAttribute('d','M84 114 q16 13 32 0');setTimeout(()=>mouth.setAttribute('d','M88 118 q12 8 24 0'),1000);
  if(!S.firstResist){
    S.firstResist=true;
    setTimeout(()=>{ $('ov-firstwin').classList.add('on'); stars($('winJarBox'),11,true); },520);
  } else {
    S.streak++; updateGoal();
    toast('The jar smiled. Streak intact.');
  }
}
function showExit(title,sub){ $('exitTitle').textContent=title; $('exitSub').textContent=sub; $('ov-exit').classList.add('on'); }
let breathT;
function showBreath(){
  closeOv('ov-shield');$('ov-breath').classList.add('on');
  $('breathBtns').style.display='none';
  $('breathTitle').textContent='No rush.';
  $('breathSub').textContent='The scroll will wait. Six seconds, then it\'s your call.';
  clearTimeout(breathT);
  cancelAnimationFrame(goRAF); $('breathGo').style.display='none';
  breathT=setTimeout(()=>{$('breathBtns').style.display='block'; launchContinue();},3200);
}
/* "Never mind, continue" bounces like a pinball in the space below "I'll stay committed" and stops at
   a random moment (2.2–3.8 s), always well away from where it stopped last time, so the thumb can't
   learn it. Hard, not mean: it can be tapped while moving, never covers the main button, and with
   reduced motion it just appears in a new spot. */
let goRAF=0, goLastStop=null;
function launchContinue(){
  const b=$('breathGo'), ov=$('ov-breath'), stay=$('breathBtns');
  cancelAnimationFrame(goRAF); b.style.display='';
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
  const a=rnd(20,55)*Math.PI/180, sp=rnd(480,560);
  let vx=Math.cos(a)*sp*(Math.random()<.5?-1:1), vy=Math.sin(a)*sp*(Math.random()<.5?-1:1);
  const start=performance.now(), stopAt=rnd(2200,3800); let t0=start, braking=false;
  const step=t=>{ if(!ov.classList.contains('on')) return;
    const dt=Math.min(.05,(t-t0)/1000); t0=t; x+=vx*dt; y+=vy*dt;
    if(x<minX){x=minX;vx=Math.abs(vx)} else if(x>maxX){x=maxX;vx=-Math.abs(vx)}
    if(y<minY){y=minY;vy=Math.abs(vy)} else if(y>maxY){y=maxY;vy=-Math.abs(vy)}
    /* brake once it's time and it will come to rest far from the last stop (or after 1.5 s extra) */
    if(!braking && t-start>stopAt && (far(clamp(x+vx/9,minX,maxX),clamp(y+vy/9,minY,maxY))||t-start>stopAt+1500)) braking=true;
    if(braking){ const f=Math.exp(-9*dt); vx*=f; vy*=f; }
    put();
    if(!braking||Math.hypot(vx,vy)>8) goRAF=requestAnimationFrame(step); else goLastStop=[x,y]; };
  goRAF=requestAnimationFrame(step);
}
function showOverride(){
  closeOv('ov-breath');
  if(jarTotal()+5>S.cap){
    ['ov-shield','ov-instead'].forEach(closeOv);
    showExit('Your jar is full for July.','You set a $'+S.cap+' cap, so nothing more can be charged. The shield stays on until the tip-out on Aug 1.');
    return;
  }
  $('ov-override').classList.add('on');
}
let winT;
function payOverride(){
  closeOv('ov-override');
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
    svg.classList.remove('squash');void svg.offsetWidth;svg.classList.add('squash');
    stars(box,5,false);
    COINS.unshift({p:'The scroll one',amt:5,when:'Just now',fresh:true}); renderJar();
    $('ov-window').classList.add('on');
    let sec=899;clearInterval(winT);
    winT=setInterval(()=>{sec--;if(sec<0){endWindow();return}
      $('winTimer').textContent=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0')},1000);
  };
}
function endWindow(){
  clearInterval(winT);closeOv('ov-window');go('home');
  setTimeout(()=>{ $('moodBefore').textContent = pullState==='strong'?'pulled hard':(pullState==='itchy'?'itchy':'tired'); $('ov-mood').classList.add('on'); }, 500);
}
function logMood(k,label){
  MOODLOG.unshift({k,when:'just now'});
  closeOv('ov-mood'); renderMoodLedger();
  if(k==='worse') toast('Noted. That\'s the eighth time out of ten — worth knowing.');
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
  renderCoins($('tipCoins'),jarTotal());
  const svg=$('tipJar'), box=$('tipJarBox');
  setTimeout(()=>{
    svg.animate([{transform:'rotate(0)'},{transform:'rotate(-11deg)',offset:.2},{transform:'rotate(40deg)',offset:.6},
                 {transform:'rotate(40deg)',offset:.78},{transform:'rotate(0)'}],{duration:1900,easing:'cubic-bezier(.4,.1,.3,1)'});
    setTimeout(()=>{[...$('tipCoins').children].forEach((c,i)=>setTimeout(()=>{
      c.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate(70px,58px) scale(.4)',opacity:0}],
                {duration:600,easing:'cubic-bezier(.3,.05,.5,1)',fill:'forwards'})},i*90));stars(box,7,false)},620);
    setTimeout(()=>{$('tipCoins').innerHTML='';stars(box,11,true);fanfare(box,'$'+jarTotal()+' GIVEN!')},1950);
  },400);
}
function showRough(){$('ov-rough').classList.add('on')}

/* ── lists ── */
const COMMITS=[
  {g:'linear-gradient(150deg,#FF7AC6,#8B5CF6)',n:'The scroll one',m:'always · $5 · for my novel'},
  {g:'linear-gradient(150deg,#37E2C0,#1E63FF)',n:'The loud one',m:'9pm–7am · $10 · for sleep'},
];
function renderCommits(){
  $('commitList').innerHTML=COMMITS.map((c,i)=>`<div class="card spread" style="padding:12px 13px;background:${i%2?'var(--tint-b)':'var(--tint-a)'}">
    <div class="row"><div class="ic token" style="background:${c.g}"><svg width="17" height="17" style="color:rgba(255,255,255,.92)"><use href="#i-app"/></svg></div>
    <div><b style="font-size:13.5px">${c.n}</b><div class="tiny">${c.m}</div></div></div>
    <span class="shieldchip"><svg width="15" height="15"><use href="#i-shield"/></svg></span></div>`).join('');
}
function sealIt(){
  const when = sched==='custom' ? ($('schedFrom').value+'–'+$('schedTo').value) : SCHED_LABEL[sched];
  COMMITS.unshift({g:'linear-gradient(150deg,#FFB86B,#FF5C8A)',n:'New promise',m:when+' · $'+$('priceV').textContent+' · for my novel'});
  renderCommits();go('home');toast('Sealed. Your future self says thanks.');
}
function selTier(el,name){document.querySelectorAll('.tierbox').forEach(t=>t.classList.remove('sel'));el.classList.add('sel');S.tier=name}
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
  {t:'week',a:'L',c:'linear-gradient(150deg,#37E2C0,#1E63FF)',n:'Luca',w:'5h ago',
   body:"Luca's week held — 6 clean nights.",kudos:7},
  {t:'quiet',a:'G',c:'linear-gradient(150deg,#FFB86B,#FF5C8A)',n:'Giulia',w:'yesterday',
   body:'Giulia regained an hour for herself.',sub:'kept private — she chose the quiet post',kudos:3,supporter:true},
  {t:'jar',a:'C',c:'linear-gradient(150deg,#37E2C0,#8B7CF6)',n:'Casa Jar',w:'this week',
   body:'The jar gained $23 this week.',sub:'from the four of you — never who, never how much each',kudos:6},
  {t:'post',a:'You',c:'linear-gradient(150deg,#FFE9A8,#E0A422)',n:'You',w:'yesterday',
   body:'Finished chapter three. Turns out books still work.',photo:'book',kudos:5},
  {t:'tipout',a:'C',c:'linear-gradient(150deg,#37E2C0,#8B7CF6)',n:'Casa Jar',w:'Jul 1',
   body:'The jar tipped out — $52 to UNICEF.',sub:'receipt from Every.org',kudos:11},
  {t:'joined',a:'S',c:'linear-gradient(150deg,#FF9E7A,#FFC94D)',n:'Sofia',w:'Jun 28',
   body:'Sofia joined the jar.',sub:'we donated $1 to UNICEF for the invite',kudos:2},
];
function renderFeed(){
  $('feedList').innerHTML=FEED.map((f,i)=>`
   <div class="fcard">
     <div class="fhead">
       <div class="av" style="background:${f.c};font-size:${f.a.length>1?10:14}px">${f.a}</div>
       <div style="flex:1"><div class="fname">${f.n}</div><div class="fwhen">${f.w}</div></div>
       ${f.supporter?'<span class="supporter">SUPPORTER</span>':''}
     </div>
     <div class="fbody">${f.body}</div>
     ${f.sub?`<div class="tiny" style="margin-top:3px">${f.sub}</div>`:''}
     ${f.photo?`<div class="fphoto">${scene(f.photo)}</div>`:''}
     <div class="frow">
       <div class="kudos" onclick="giveKudos(this,${i})" aria-label="High five"><svg width="14" height="14"><use href="#i-hifive"/></svg><span>${f.kudos}</span></div>
       <span class="tiny">${f.t==='coin'?'reported, not judged':''}</span>
     </div>
   </div>`).join('');
}
function giveKudos(el,i){ if(el.classList.contains('done'))return; el.classList.add('done'); FEED[i].kudos++; el.querySelector('span').textContent=FEED[i].kudos; }
/* members — per-member settlement, amounts hideable */
let showDollars=true;
const MEMBERS=[
  {a:'L',c:'linear-gradient(150deg,#37E2C0,#1E63FF)',n:'Luca',coins:2,amt:10,note:'9 clean nights'},
  {a:'G',c:'linear-gradient(150deg,#FFB86B,#FF5C8A)',n:'Giulia',coins:3,amt:15,note:'supporter — no stakes right now',sup:true},
  {a:'M',c:'linear-gradient(150deg,#8B7CF6,#5AA9FF)',n:'Marta',coins:1,amt:5,note:'14 clean nights'},
  {a:'You',c:'linear-gradient(150deg,#FFE9A8,#E0A422)',n:'You',coins:2,amt:8,note:'12 clean nights'},
];
function renderMembers(){
  $('memberList').innerHTML=MEMBERS.map(m=>`
   <div class="memberRow">
     <div class="av" style="background:${m.c};font-size:${m.a.length>1?10:14}px">${m.a}</div>
     <div style="flex:1"><b style="font-size:13px">${m.n}</b><div class="tiny">${m.note}</div></div>
     ${m.sup?'<span class="supporter">SUPPORTER</span>':
       `<span class="pill gold">${showDollars?'$'+m.amt:m.coins+' coins'}</span>`}
   </div>`).join('');
}
function toggleAmounts(el){ showDollars=!showDollars; el.textContent=showDollars?'Showing $':'Showing coins'; renderMembers(); }
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
  {id:'luca',a:'L',c:'linear-gradient(150deg,#37E2C0,#1E63FF)',n:'Luca',st:'away',
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
  if(ok) showExit('Go put the kettle on.','Nothing else is being asked of you tonight.');
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
  "Nothing in there tonight is worth the twenty minutes. I'd know.",
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
let cal='';for(let d=1;d<=31;d++){cal+=d>26?`<div class="d-off">${d}</div>`:([11,16,20,25,26].includes(d)?`<div class="d-coin">${d}</div>`:`<div class="d-clean">${d}</div>`)}
$('cal').innerHTML=cal;
/* ── focus session timers ── */
let focusT, focusTotal=0, focusLeft=0;
const RING=169.6;
function startFocus(min){
  if(min===0){ const v=prompt('How many minutes?','45'); min=parseInt(v||'0',10); if(!min) return; }
  focusTotal=min*60; focusLeft=focusTotal;
  $('focusIdle').style.display='none'; $('focusRun').style.display='block';
  $('focusHint').textContent='ends at '+new Date(Date.now()+min*60000).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  tickFocus();
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
  clearInterval(focusT);
  $('focusIdle').style.display='flex'; $('focusRun').style.display='none';
  $('focusHint').textContent='shield everything, right now';
  if(early){ toast('Session ended. No coin — you set it, you can end it.'); }
  else { const {box,svg}=liveJar(); svg.classList.remove('hop');void svg.offsetWidth;svg.classList.add('hop'); stars(box,9,true);
    setTimeout(()=>showExit('Session complete.','That hour was yours. Now close this and go spend the next one too.'),600); }
}
/* ── schedule picker ── */
let sched='always';
function pickSched(el,kind){
  document.querySelectorAll('#schedChips .chip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on'); sched=kind;
  $('customWindow').style.display = kind==='custom' ? 'block' : 'none';
}
const SCHED_LABEL={always:'always',evenings:'9pm–7am',work:'9am–5pm',weekend:'weekends',custom:'custom window'};
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
  const g=$('goalLine'); if(g) g.textContent=(next-S.streak)+' night'+((next-S.streak)===1?'':'s')+' to your '+next+'-night mark';
}
/* ── tips: some are science, some are permission ── */
const TIPS=[
  {i:'i-brain',t:"Why it's so hard at 10pm",b:'Tiredness lowers the effort your brain will spend on deciding. The feed never asks you to decide.',cta:'Discover more ›',go:()=>openRes(3)},
  {i:'i-camera',t:"Some nights you just want to be entertained",b:"I get it — we don't always want to optimise the evening or do something meaningful. That's completely fine. What about a good film, or the series you keep meaning to start? It ends by itself, which is more than the feed will ever do for you.",cta:'Find something that ends ›',go:()=>{ showInstead(); setInsteadMode('fun',document.getElementById('segFun')); }},
  {i:'i-wave',t:'The pull is usually tiredness, not craving',b:"Your own entries say so four times this month. Tired wants an off switch, not content — and a film is a much better off switch than a feed.",cta:'Read your recap ›',go:()=>go('recap')},
  {i:'i-brain',t:"You didn't decide to open it",b:'Most phone opens last under 30 seconds and begin with no decision at all. The habit is the reach, not the app.',cta:'Discover more ›',go:()=>openRes(4)},
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
  {t:'12 clean nights',s:'your longest run'},
  {t:'First $50 given',s:'to Doctors Without Borders'},
  {t:'Focus Week finished',s:'with Casa Jar'},
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
    <div style="flex:1"><div class="spread"><b style="font-size:13px">${a.n}</b><span class="tiny">${a.h}</span></div>
      <div class="appBar"><i style="width:${a.pct}%"></i></div>
      <div class="tiny" style="margin-top:4px">${a.opens} opens · ${a.opens>40?'mostly without deciding to':'usually on purpose'}</div></div>
    ${a.shield?'<span class="shieldchip"><svg width="14" height="14"><use href="#i-shield"/></svg></span>'
      :`<button class="btn mint" style="width:auto;padding:8px 12px;font-size:11.5px" onclick="suggestBlock(${i})">Shield it</button>`}
  </div>`).join('');
}
function suggestBlock(i){
  APPS[i].shield=true; renderApps();
  COMMITS.unshift({g:APPS[i].g,n:APPS[i].n,m:'always · $5 · name it later'});
  renderCommits(); toast('Shielded. You can set the price and the reason any time.');
}
/* ── resources ── */
const RES=[
  {k:'INFINITE SCROLL',t:'The feed never ends',hook:'A page with a bottom asks you a question. A feed never does.',
   body:'Stopping cues are what let people leave. Infinite scroll removes every one of them, so the decision to stop has to be generated by you, from nothing, over and over.',
   feels:'You look up and twenty minutes have gone, and you can\'t name a single thing you saw.',
   we:'The shield is an artificial bottom of the page. The breath pause hands the decision back to you before the feed can absorb it.',
   tr:'Tonight, when you finish something, close the app before you look for the next thing. Notice how strange that feels.',
   src:'Stopping cues & consumption research (Wansink); attention capture literature.'},
  {k:'VARIABLE REWARD',t:'Sometimes it\'s good',hook:'Unpredictable rewards are learned harder than reliable ones.',
   body:'Dopamine neurons respond to reward *prediction error* — surprise, not pleasure. A feed that is occasionally great and usually mediocre is the most compelling schedule there is. A Meta data scientist put it plainly in an internal note: "intermittent rewards are most effective (think slot machines)."',
   feels:'One more refresh. Not because it\'s good — because it might be.',
   we:'Every reward in ScrollJar is fixed and earned: same coin, same celebration, no surprise boxes. We refuse the mechanism we\'re fighting.',
   tr:'Count the posts before you find one you\'d have missed. Usually it\'s dozens.',
   src:'Schultz, Dayan & Montague, Science 1997; Schüll, Addiction by Design.'},
  {k:'SOCIAL COMPARISON',t:'Everyone else is fine',hook:'The feed shows you outcomes and hides the ordinary hours behind them.',
   body:'Facebook\'s staggered college rollout let researchers measure this causally: severe depression rose about 7% and anxiety about 20%, and the mechanism was unfavourable social comparison — not screen time as such.',
   feels:'A small flatness afterwards you can\'t quite attribute to anything.',
   we:'Our feed is finite, shows only your own jars, and reports outcomes without ranking anyone. No follower counts, no leaderboards.',
   tr:'After ten minutes on any feed, ask: do I feel closer to these people, or further away?',
   src:'Braghieri, Levy & Makarin, American Economic Review 2022.'},
  {k:'BEDTIME PROCRASTINATION',t:'Revenge hours',hook:'The scroll at 11pm is often not craving. It\'s the only unclaimed time in the day.',
   body:'People with little autonomy during the day reclaim it at night by refusing to sleep — documented as bedtime procrastination. The phone isn\'t the cause; it\'s the easiest available way to take the hour back.',
   feels:'Tired but unwilling. Wanting the day to have had something in it.',
   we:'We ask what the hour is *for*, and offer it back to you — a walk, a book, three lines in the diary — instead of just closing the door.',
   tr:'Take the hour deliberately: set a 25-minute session and spend it on something you chose.',
   src:'Kroese et al., bedtime procrastination literature.'},
  {k:'CHOSEN VS DRIFTING',t:'A film ends. A feed doesn\'t.',hook:'The problem was never entertainment. It was media with no edges.',
   body:'Every traditional form of entertainment carries a stopping cue: credits roll, the record finishes, the episode ends. You get a natural moment to decide whether to continue. Feeds deliberately removed that moment — not to entertain you better, but to keep the decision from ever arriving.',
   feels:'Two hours on a film feels like an evening you had. Two hours scrolling feels like an evening that happened to you.',
   we:'We never ask you to be productive. We ask you to pick something that ends — and if that\'s a film at 10pm, brilliant, that\'s a choice and we\'ll happily suggest one.',
   tr:'Tonight, pick something with a running time. Anything. Just let the thing have an ending.',
   src:'Stopping-cue research; Wansink on consumption without cues.'},
  {k:'CHECKING HABITS',t:'You didn\'t decide to',hook:'Most phone opens are under 30 seconds and start with no decision at all.',
   body:'Habits are cue-driven: context triggers the action before deliberation arrives. Roughly 43% of daily behaviour runs this way. Willpower arrives late to a race it didn\'t know had started.',
   feels:'Finding the app already open in your hand.',
   we:'We change the cue, not your character — friction at the exact moment of the reach, which cut openings by more than half in the published trial of a similar tool.',
   tr:'Move the app off your home screen tonight. Cheapest intervention there is.',
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
  $('moodLedger').innerHTML=L.map(m=>`<div style="height:${MOODH[m.k]}px;background:${MOODC[m.k]};opacity:${m.k==='same'?.45:.9}"></div>`).join('');
  const w=L.filter(m=>m.k==='worse').length;
  $('ledgerHead').innerHTML=`You've felt <b>${w>=L.length/2?'worse':'mixed'}</b> after ${w} of your last ${L.length} sessions.`;
}
/* ── reflections: the questions worth sitting with ── */
const REFLECTIONS=[
  {q:"How do you feel when you're in there?",s:'Not afterwards — during. Try to catch it while it\'s happening.'},
  {q:'Do these apps change your mood?',s:'Up, down, flat? Same every time, or does it depend on the day?'},
  {q:'How many times have you told yourself you need a detox?',s:'And what happened the last few times you said it?'},
  {q:'What are you usually looking for when you reach?',s:'News? Company? An off switch? Something to stop the thinking?'},
  {q:'How often do you pick up the phone for one small thing — and stay?',s:'Checking the weather, then twenty minutes gone. That drift is the habit, not the app.'},
  {q:'Is something asking for your attention that the scrolling helps you avoid?',s:'A conversation, a decision, a feeling. No need to solve it here — naming it is enough.',heavy:true},
  {q:'What did the best evening of your last month look like?',s:'Was a screen in it?'},
  {q:'If tonight went well, what would you have done instead?',s:'Be specific. Specific is what your shield will remind you of.'},
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
/* ── the detox counter ── */
let detoxCount=4;
function addDetox(){ detoxCount++; $('detoxN').textContent=detoxCount;
  toast(detoxCount>=5?'Five times now. The difference is you did something about it.':'Counted. Saying it out loud is a start.'); }
/* ── diary ── */
const GOALS=[
  {t:'Finish the novel',c:'var(--mint)',n:'4 evenings this week'},
  {t:'Be present at dinner',c:'var(--peach)',n:'6 of 7 nights'},
  {t:'Sleep before midnight',c:'var(--violet)',n:'holding'},
];
const ENTRIES=[
  {tag:'voice',t:'Thursday, 11:05pm',voice:true,dur:48},
  {tag:'impulse',t:'Wednesday, 10:12pm',b:"Reached for it without deciding to. Wasn't even bored — just tired and looking for an off switch.",at:'written at a shield moment'},
  {tag:'feeling',t:'Tuesday, 8:40pm',b:'Read for forty minutes and felt oddly proud. Small thing, but it was mine.'},
  {tag:'goal',t:'Monday, 7:15am',b:'Want this week to have two real evenings in it. Not productive — just mine.'},
];
const PROMPTS=['What am I actually looking for?','What would make this evening good?','Is this tiredness or wanting?','What happened today?'];
const INSTEAD_WORTH=[
  {i:'i-book',t:'Twenty pages',s:'you left off at chapter three'},
  {i:'i-sprout',t:'Walk to the end of the street',s:'it\'s 18° and not raining'},
  {i:'i-pen',t:'Write three lines here',s:'you said tonight felt heavy'},
];
const INSTEAD_FUN=[
  {i:'i-camera',t:'The film you saved in March',s:'1h 52m · you\'d still be in bed by 11:40'},
  {i:'i-wave',t:'One episode — the good one',s:'42 minutes, and then it stops on its own'},
  {i:'i-heart',t:'A record, start to finish',s:'nothing to look at, which is the point'},
];
let insteadMode='worth';
function setInsteadMode(m,el){
  insteadMode=m;
  el.parentElement.querySelectorAll('div').forEach(d=>d.classList.remove('on')); el.classList.add('on');
  $('insteadSub').textContent = m==='fun'
    ? "Fair enough — not every evening needs to mean something. Pick something that ends by itself."
    : 'Three things that fit the twenty minutes you have and the mood you logged.';
  paintInstead();
}
function paintInstead(){
  const L = insteadMode==='fun' ? INSTEAD_FUN : INSTEAD_WORTH;
  $('insteadList').innerHTML=L.map(o=>`<div class="insteadCard" onclick="chooseInstead('${o.t}')">
    <div class="ic" style="background:rgba(255,255,255,.08);color:var(--calm)"><svg width="17" height="17"><use href="#${o.i}"/></svg></div>
    <div style="flex:1"><b style="font-size:13px;color:var(--calm-ink)">${o.t}</b><div class="tiny">${o.s}</div></div>
    <span style="color:var(--calm-soft)">›</span></div>`).join('')
    + (insteadMode==='fun' ? `<div class="tiny" style="text-align:center;margin:2px 0 12px;line-height:1.55">A film ends. An episode ends. A record ends.<br>That's the whole difference — not whether it's worthy.</div>` : '');
}
function renderGoals(){
  $('goalList').innerHTML=GOALS.map(g=>`<div class="goalRow"><span class="goalDot" style="background:${g.c}"></span>
    <div style="flex:1"><b style="font-size:12.5px">${g.t}</b><div class="tiny">${g.n}</div></div></div>`).join('');
}
function addGoal(){ const t=prompt('What is this time for?'); if(t&&t.trim()){ GOALS.unshift({t:t.trim(),c:'var(--blue)',n:'just set'}); renderGoals(); toast('Named. That\'s what the shield will remind you of.'); } }
/* a fixed, gentle waveform per note: it's a picture of the recording, not an analysis of it */
function waveBars(seed,n){
  let x=seed*9301+49297; const out=[];
  for(let i=0;i<n;i++){ x=(x*9301+49297)%233280; out.push(5+Math.round((x/233280)*15*(0.55+0.45*Math.sin(i/2.3)))); }
  return out;
}
const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
function renderEntries(){
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
let pullState=null;
function logPull(el,k,label){
  document.querySelectorAll('.pullChip').forEach(c=>c.classList.remove('on')); el.classList.add('on'); pullState=k;
  toast(k==='strong'?'Logged. Want to write a line about it?':'Logged. The app will remember the weather.');
}
let entryKind='free';
let diaryMode='both';
function setDiaryMode(m,el){
  diaryMode=m;
  el.parentElement.querySelectorAll('div').forEach(d=>d.classList.remove('on')); el.classList.add('on');
  const notes={both:'Prompts when you want them, an empty page when you don\'t.',
    blank:'No questions, no tags, no structure. Just the page.',
    guided:'A question every time — and the app follows what you write.'};
  $('diaryModeNote').textContent=notes[m];
  document.querySelectorAll('#s-diary .card')[2].style.display = m==='blank' ? 'none' : '';
  toast(m==='blank'?'Blank page it is.':m==='guided'?'Guided. We\'ll always open with a question.':'Both — you choose in the moment.');
}
function openEntry(kind){
  entryKind=kind;
  const guided = diaryMode==='guided' || (diaryMode==='both' && kind!=='free');
  $('entryTitle').textContent = kind==='impulse' ? 'What is the pull about?' : (guided? 'Something to answer' : 'A blank page');
  $('entryTags').style.display = diaryMode==='blank' ? 'none' : 'flex';
  $('entryTags').innerHTML=['impulse','feeling','goal','free'].map(t=>`<div class="promptChip ${t===kind?'on':''}" onclick="entryKind='${t}';document.querySelectorAll('#entryTags .promptChip').forEach(c=>c.style.borderColor='');this.style.borderColor='var(--mint)'">${t}</div>`).join('');
  if(diaryMode==='blank'){
    $('entryPrompts').style.display='none';
    $('entryText').placeholder='';
  } else {
    $('entryPrompts').style.display='flex';
    $('entryPrompts').innerHTML=PROMPTS.map(p=>`<div class="promptChip" onclick="document.getElementById('entryText').value='${p} '">${p}</div>`).join('');
    $('entryText').placeholder = guided ? REFLECTIONS[reflIdx].q : 'tired, not really wanting the phone — wanting to switch off';
  }
  if(diaryMode==='guided') setTimeout(()=>{ $('entryText').value=REFLECTIONS[reflIdx].q+'\n\n'; },80);
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
    setTimeout(()=>showExit('That\'s enough for tonight.','The diary did its job. It\'s not somewhere to spend an evening either.'),650);
    entriesThisSitting=0;
  } else { toast('Kept. Only you can read it.'); }
}
/* ── instead-of screen ── */
function showInstead(){
  closeOv('ov-breath');
  paintInstead(); paintColleagues();
  $('promptChips').innerHTML=PROMPTS.slice(0,3).map(p=>`<div class="promptChip">${p}</div>`).join('');
  $('ov-instead').classList.add('on');
}
function chooseInstead(t){ closeOv('ov-instead'); resist(); setTimeout(()=>toast('"'+t+'" — go on then.'),700); }
/* ── pronouns ── */
const PRONOUNS=[['she/her','herself'],['he/him','himself'],['they/them','themselves'],['just my name','Luca']];
let pronounIdx=2;
function renderPronouns(){
  $('pronounChips').innerHTML=PRONOUNS.map((p,i)=>`<div class="promptChip" style="${i===pronounIdx?'border-color:var(--mint);color:var(--mint)':''}" onclick="setProfPronoun(${i})">${p[0]}</div>`).join('');
  $('profPronoun').textContent=PRONOUNS[pronounIdx][0]+' · shown as "'+PRONOUNS[pronounIdx][1]+'" in quiet posts';
}
function setProfPronoun(i){ pronounIdx=i; renderPronouns(); toast('Saved. The app will speak about you correctly.'); }
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
  {t:'The vote closed: Feeding America',s:'41% of votes · runner-up gets the autumn campaign'},
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
    B.innerHTML=`<div class="display" style="font-size:21px;line-height:1.2;margin-bottom:8px">Summer Hours: an hour a day, funded.</div>
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
  drawLights(g,POS.length,false); $('ov-cotip').classList.add('on');
  setTimeout(()=>{ [...g.children].forEach((m,i)=>m.animate([{transform:'none',opacity:1},{transform:'translateY(-120px)',opacity:0}],
      {duration:900,delay:i*60,easing:'cubic-bezier(.4,.1,.6,1)',fill:'forwards'}));
    const t0=performance.now(), dur=1800;
    (function tick(t){const k=Math.min((t-t0)/dur,1); $('ctAmt').textContent=money(final*(1-Math.pow(1-k,3))); if(k<1) requestAnimationFrame(tick);
      else { stars($('ctJarBox'),11,true); fanfare($('ctJarBox'),money(final)+' GIVEN'); }})(t0);
  },700);
}
/* ══ NOTES — what people did instead, shared to inspire others ══
   Anonymous and squad-only by default. High fives carry no count. "I'll try this" saves an idea
   to a private list; the author only learns how many saved it. The privacy check runs on the phone. */
const CO_NOTES=[
  {sq:'Design',t:'Finally went to the theatre. First time since spring.',when:'Tuesday',all:true},
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
  clearTimeout(breathT); clearInterval(winT);
  const top=id=>{ const el=$(id); if(el) el.scrollTop=0; };
  if(step==='today'){ go('home'); top('s-home'); }
  else if(step==='shield'){ go('home'); showShield(); }
  else if(step==='pause'){ go('home'); showBreath(); }
  else if(step==='jar'){ go('jar'); top('s-jar'); setTimeout(demoCoin,450); }
  else if(step==='tipout'){ go('jar'); top('s-jar'); showTipout(); }
}
if(Q.has('embed')) addEventListener('message',e=>{ const d=e.data; if(d&&d.scrolljar==='show') demoStep(d.step); });
renderCommits();renderJar();renderCharities();renderFeed();renderMembers();renderStandby();renderGoals();renderEntries();renderPronouns();renderApps();renderRes();renderMoodLedger();renderReflection();renderTip();
$('winStrip').innerHTML=WINS.map(w=>`<div class="winBadge"><b>${w.t}</b><span>${w.s}</span></div>`).join('');
$('usageSpark').innerHTML=[3.1,2.4,3.6,2.9,3.3,2.8,3.1].map(v=>`<div style="height:${Math.round(v/3.6*38)}px;background:var(--peach);opacity:.75"></div>`).join('');
$('weekSpark').innerHTML=HRS.map((h,i)=>{const last=[.7,1.1,.6,1.3,.9,.5,1.0][i];
  return `<div style="position:relative;flex:1;display:flex;align-items:flex-end;gap:2px">
    <div class="ghost" style="height:${Math.round(last/mx*32)}px;flex:1;border-radius:4px 4px 0 0"></div>
    <div class="${h.coin?'coin':''}" style="height:${Math.round(h.v/mx*32)}px;flex:1;border-radius:4px 4px 0 0"></div></div>`}).join('');
$('recapBars').innerHTML=HRS.map(h=>`<div class="bar"><div class="b ${h.coin?'coin':''}" style="height:${Math.round(h.v/mx*60)}px"></div><div class="l">${h.d}</div></div>`).join('');
$('challengeBars').innerHTML=HRS.map(h=>`<div class="bar"><div class="b ${h.coin?'coin':''}" style="height:${Math.round(h.v/mx*60)}px"></div><div class="l">${h.d}</div></div>`).join('');
setInterval(()=>{const {svg}=liveJar();if(!document.hidden&&Math.random()<.4&&!svg.classList.contains('hop')){svg.classList.add('hop');setTimeout(()=>svg.classList.remove('hop'),800)}},11000);
