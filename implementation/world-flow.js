(() => {
  const work = document.querySelector('#workWorld');
  const flow = document.createElement('div');
  flow.id = 'worldFlow'; flow.hidden = true;
  flow.innerHTML = `<section class="flow-overview" aria-labelledby="flowTitle"><div class="flow-stage"><div class="flow-art" aria-hidden="true"></div><div class="flow-vignette" aria-hidden="true"></div><div class="flow-heading"><p>THE WORLD OF PRI</p><h2 id="flowTitle">My current world<br>revolves around…</h2></div><div class="flow-destinations"><button data-destination="life">Life</button><button data-destination="work">Work</button><button data-destination="speaking">Speaking</button><button data-destination="content">Playground</button></div><div class="flow-orb" aria-hidden="true"></div><div class="flow-signal" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="flow-caption"><span class="flow-count"></span><h3></h3><p></p></div><button class="flow-next">Continue into Work ↓</button><span class="flow-scroll">Keep scrolling to explore ↓</span></div></section>`;
  document.body.append(flow);flow.append(work);
  const overview=flow.querySelector('.flow-overview'), stage=flow.querySelector('.flow-stage');
  const buttons=[...flow.querySelectorAll('[data-destination]')];
  const beats=[['Life','The little things that keep me curious.',15.5,63],['Work','Research, AI, and ideas made real.',42,57],['Speaking','Ideas worth sharing.',59,39],['Playground','Learning, creating, and sharing along the way.',89,50]];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  flow.querySelector('.flow-caption').remove();
  flow.querySelector('.flow-heading > p').remove();
  beats.forEach((beat,i)=>{
    const copy=document.createElement('span');copy.className='island-note';copy.textContent=beat[1];buttons[i].append(copy);
    buttons[i].addEventListener('pointerenter',()=>focusIsland(i));
    buttons[i].addEventListener('focus',()=>focusIsland(i));
    buttons[i].addEventListener('pointerleave',paint);
    buttons[i].addEventListener('blur',paint);
  });
  const reveal=document.createElement('div');reveal.className='flow-work-reveal';reveal.setAttribute('aria-hidden','true');
  reveal.innerHTML='<div class="work-preview-art"></div>';
  stage.append(reveal);
  const lift=document.createElement('div');lift.className='flow-island-lift';lift.setAttribute('aria-hidden','true');
  stage.querySelector('.flow-vignette').after(lift);
  const trail=document.createElementNS('http://www.w3.org/2000/svg','svg');trail.classList.add('flow-flight-trail');trail.setAttribute('aria-hidden','true');
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('pathLength','1');trail.append(path);stage.append(trail);
  const landing=document.createElement('div');landing.className='flow-landing';landing.setAttribute('aria-hidden','true');stage.append(landing);
  let raf=0,lastIsland=-1,orbFlight,trailFlight,liftFlight,landingFlight;


  function focusIsland(index){
    const beat=beats[index];
    if(index!==lastIsland){
      const w=stage.clientWidth,h=stage.clientHeight;
      const ball=stage.querySelector('.flow-orb');
      const box=ball.getBoundingClientRect(),bounds=stage.getBoundingClientRect();
      const sx=lastIsland<0?beat[2]*w/100:box.left+box.width/2-bounds.left;
      const sy=lastIsland<0?beat[3]*h/100:box.top+box.height/2-bounds.top;
      const tx=beat[2]*w/100,ty=beat[3]*h/100;
      [orbFlight,trailFlight,liftFlight,landingFlight].forEach(a=>a?.cancel());
      if(!reduced.matches&&lastIsland>=0){
        const bend=Math.min(h*.12,Math.abs(tx-sx)*.22+25);
        path.setAttribute('d',`M ${sx} ${sy} C ${sx+(tx-sx)*.3} ${sy-bend}, ${sx+(tx-sx)*.7} ${ty-bend}, ${tx} ${ty}`);
        trailFlight=path.animate([{strokeDashoffset:1,opacity:0},{strokeDashoffset:.65,opacity:.65,offset:.25},{strokeDashoffset:0,opacity:.5,offset:.8},{strokeDashoffset:0,opacity:0}],{duration:1500,fill:'forwards'});
        const frames=Array.from({length:35},(_,i)=>{const t=i/34,u=1-t;return {left:(u*u*u*sx+3*u*u*t*(sx+(tx-sx)*.3)+3*u*t*t*(sx+(tx-sx)*.7)+t*t*t*tx)+'px',top:(u*u*u*sy+3*u*u*t*(sy-bend)+3*u*t*t*(ty-bend)+t*t*t*ty)+'px',offset:t}});
        orbFlight=ball.animate(frames,{duration:1100,easing:'cubic-bezier(.25,.65,.25,1)'});
        liftFlight=lift.animate([{opacity:0,transform:'scale(1)'},{opacity:1,transform:innerWidth<=650?'scale(1.08)':'scale(1.13)'}],{duration:1000,easing:'cubic-bezier(.2,.7,.2,1)'});
        landing.style.left=tx+'px';landing.style.top=ty+'px';
        landingFlight=landing.animate([{opacity:0,transform:'translate(-50%,-50%) scale(.4)'},{opacity:.55,offset:.15},{opacity:0,transform:'translate(-50%,-50%) scale(2.8)'}],{delay:900,duration:950,fill:'both'});
      }
      lastIsland=index;
    }
    buttons.forEach((b,i)=>{b.classList.toggle('lit',i===index);b.setAttribute('aria-current',i===index?'true':'false')});
    stage.style.setProperty('--orb-x',beat[2]+'%');stage.style.setProperty('--orb-y',beat[3]+'%');
    stage.style.setProperty('--focus-x',beat[2]+'%');stage.style.setProperty('--focus-y',beat[3]+'%');
  }
  function paint(){
    raf=0;
    const progress=flow.scrollTop/Math.max(1,overview.offsetHeight-flow.clientHeight);
    if(progress>1&&stage.dataset.pastOverview==='true')return;
    stage.dataset.pastOverview=String(progress>1);
    const approach=Math.max(0,Math.min(1,(progress-.78)/.17));
    const index=approach>0?1:Math.min(3,Math.max(0,Math.floor((progress-.08)/.17)));
    stage.classList.remove('orbiting');
    focusIsland(index);
    stage.style.setProperty('--approach',approach);
const eased=approach*approach*(3-2*approach);
    stage.style.setProperty('--camera-scale',String(reduced.matches?1:1+eased*1.5));
    stage.style.setProperty('--work-reveal',String(Math.max(0,Math.min(1,(approach-.4)/.5))));
    stage.style.setProperty('--work-scale',String(reduced.matches?1:1.08-eased*.08));
    stage.classList.toggle('approaching',approach>.01);
  }
  flow.addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(paint)},{passive:true});
  const speaking=document.querySelector('#speakingWorld'),playground=document.querySelector('#contentWorld');
  function bridge(kind,title){
    const section=document.createElement('section');section.className='world-bridge bridge-'+kind;section.setAttribute('aria-label',title);
    section.innerHTML=`<div class="bridge-halo" aria-hidden="true"></div><svg viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true"><path d="M -50 260 C 230 260 260 75 500 170 S 780 320 1050 90"/></svg><span class="bridge-orb" aria-hidden="true"></span><h2>${title}</h2>`;return section;
  }
  const voiceBridge=bridge('voice','Ideas, shared out loud.'),playBridge=bridge('play','Curiosity keeps going.');
  flow.append(voiceBridge,speaking,playBridge,playground);
  const routes={'#world':overview,'#work/journey':work,'#journey':work,'#speaking':speaking,'#content':playground};
  const navs=[['#world','#navWorld'],['#work/journey','#navJourney'],['#speaking','#navSpeaking'],['#content','#navContent']];
  function goTo(hash,push=true){
    if(!routes[hash])return;
    if(push&&location.hash!==hash)history.pushState(null,'',hash);
    document.body.classList.add('entered');
    sync();
    flow.scrollTo({top:routes[hash].offsetTop,behavior:reduced.matches?'instant':'smooth'});
    const title=routes[hash].querySelector('h1,h2');if(title){title.tabIndex=-1;title.focus({preventScroll:true})}
  }
  function goWork(){goTo('#work/journey')}
  flow.querySelector('.flow-next').onclick=goWork;
  document.addEventListener('click',event=>{
    const a=event.target.closest('a');if(!a||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    const hash=a.getAttribute('href');if(!routes[hash])return;
    event.preventDefault();event.stopImmediatePropagation();goTo(hash);
  },true);
  buttons.forEach(b=>b.onclick=()=>{const key=b.dataset.destination;if(key==='life')openStory('life');else goTo(key==='work'?'#work/journey':'#'+key)});
  function sync(){
    const visible=document.body.classList.contains('entered')||['#work/journey','#journey','#speaking','#content'].includes(location.hash);
    flow.hidden=!visible;
    if(document.body.classList.contains('continuous-world')!==visible)document.body.classList.toggle('continuous-world',visible);
    if(!visible)return;
    [work,speaking,playground].forEach(section=>{section.hidden=false;section.inert=false});
    paint();
  }
  addEventListener('hashchange',()=>{sync();if(routes[location.hash])goTo(location.hash,false)});
  addEventListener('popstate',()=>{sync();goTo(location.hash||'#world',false)});
  let pageFrame=0,currentSection='';
  function updatePage(){
    pageFrame=0;if(flow.hidden)return;
    const y=flow.scrollTop+flow.clientHeight*.35;
    const active=y>=playground.offsetTop?'#content':y>=speaking.offsetTop?'#speaking':y>=work.offsetTop?'#work/journey':'#world';
    navs.forEach(([hash,id])=>document.querySelector(id).setAttribute('aria-current',hash===active?'page':'false'));
    if(active!==currentSection){currentSection=active;document.title=active==='#world'?'The World of Pri — Priyanshi Shah':(active==='#work/journey'?'Work':active==='#speaking'?'Speaking':'Playground')+' — Priyanshi Shah';document.body.dataset.scrollSection=active.slice(1);resetPlaygroundPointer();syncClips();}
    if(active==='#speaking')speaking.dispatchEvent(new Event('flow-scroll'));
    if(active==='#work/journey')work.dispatchEvent(new Event('flow-scroll'));
    [voiceBridge,playBridge].forEach(section=>{
      const p=Math.max(0,Math.min(1,(flow.scrollTop+flow.clientHeight-section.offsetTop)/(flow.clientHeight+section.offsetHeight)));
      section.style.setProperty('--bridge-progress',p);
      const path=section.querySelector('path'),point=path.getPointAtLength(path.getTotalLength()*p);
      section.style.setProperty('--bridge-orb-x',(point.x/10)+'%');
      section.style.setProperty('--bridge-orb-y',(point.y/3.6)+'%');
    });
  }
  flow.addEventListener('scroll',()=>{if(!pageFrame)pageFrame=requestAnimationFrame(updatePage)},{passive:true});
  addEventListener('resize',updatePage);
  // Enter and replay controls already own the entrance state.
  new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
  // Avoid observing our own unchanged class writes by syncing only actual changes.
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('chapter-active',e.isIntersecting)),{root:flow,threshold:.12});
  work.querySelectorAll('.work-chapter,.minor-chapter').forEach(el=>observer.observe(el));
  addEventListener('resize',paint);
  sync();
  updatePage();
  if(routes[location.hash]&&location.hash!=='#world')requestAnimationFrame(()=>goTo(location.hash,false));
})();
