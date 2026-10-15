/* ScrollJar website: shared behaviour for every page (waitlist forms, reveals, count-ups). */
document.documentElement.classList.add('js');
/* Waitlist → Formspree. Replace YOURFORMID. Demo mode until then. */
const FORM_ID='YOURFORMID';
let signed=false, joinVis=false;
document.querySelectorAll('form[data-wl]').forEach(f=>{
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    const email=f.querySelector('input[type=email]').value.trim();
    if(!email)return;
    /* a bot filled the hidden field: look done, send nothing */
    const trap=f.querySelector('[name=_gotcha]');
    if(trap&&trap.value){f.style.display='none';f.parentElement.querySelector('[data-ok]').style.display='flex';return}
    const btn=f.querySelector('button');btn.disabled=true;btn.textContent='One second…';
    let sent=false;
    if(FORM_ID!=='YOURFORMID'){
      try{
        const r=await fetch('https://formspree.io/f/'+FORM_ID,{method:'POST',
          headers:{'Accept':'application/json','Content-Type':'application/json'},
          body:JSON.stringify({email,list:f.dataset.wl||'launch'})});
        sent=r.ok;
      }catch(_){sent=false}
    }else{sent=true;console.warn('ScrollJar: demo mode — set FORM_ID to capture real emails.')}
    if(sent){f.style.display='none';f.parentElement.querySelector('[data-ok]').style.display='flex';signed=true;stickCheck()}
    else{btn.disabled=false;btn.textContent='Try again'}
  });
});
/* the bottom join bar (home page only) */
const stick=document.getElementById('stick'), joinEl=document.getElementById('join');
if(stick&&joinEl){ new IntersectionObserver(es=>{joinVis=es[0].isIntersecting;stickCheck()},{threshold:.2}).observe(joinEl);
  addEventListener('scroll',stickCheck,{passive:true}); }
function stickCheck(){ if(stick) stick.classList.toggle('on',scrollY>700&&!joinVis&&!signed) }

const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* reveal on scroll; a safety net shows everything if the observer never fires */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.rev').forEach(el=>io.observe(el));
setTimeout(()=>document.querySelectorAll('.rev').forEach(el=>el.classList.add('in')),4000);
const playIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('play');playIO.unobserve(e.target)}}),{threshold:.3});
document.querySelectorAll('[data-play]').forEach(el=>playIO.observe(el));
/* science figures count up once */
const countIO=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return; countIO.unobserve(e.target);
  const el=e.target, to=+el.dataset.count, suf=el.dataset.suffix||'';
  if(calm){el.textContent=to+suf;return}
  const t0=performance.now(), dur=1400;
  (function tick(t){const k=Math.min((t-t0)/dur,1), v=Math.round(to*(1-Math.pow(1-k,3)));el.textContent=v+suf;if(k<1)requestAnimationFrame(tick)})(t0);
}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>countIO.observe(el));
/* cursor light on glass cards */
if(matchMedia('(hover: hover)').matches&&!calm){
  document.querySelectorAll('.spot').forEach(el=>el.addEventListener('pointermove',e=>{
    const r=el.getBoundingClientRect(); el.style.setProperty('--mx',(e.clientX-r.left)+'px'); el.style.setProperty('--my',(e.clientY-r.top)+'px');
  }));
}
