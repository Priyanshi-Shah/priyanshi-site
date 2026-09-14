(()=>{
const world=document.createElement('section');world.id='workWorld';world.className='work-world';world.hidden=true;world.setAttribute('aria-labelledby','workTitle');
const portal=(href,label,cls,scene)=>`<a href="${href}" class="world-portal ${cls}" aria-label="${label}"><span class="portal-scene ${scene}" aria-hidden="true"></span><span class="portal-arc" aria-hidden="true"></span><span class="portal-ground" aria-hidden="true"></span><span class="portal-label">${label}</span></a>`;
world.innerHTML=`<div class="work-backdrop" aria-hidden="true"></div><div class="work-heading"><span class="eyebrow">WORLD / AI & WORK</span><h1 id="workTitle">Research. Products. People.</h1><p>I build AI products, lead technical teams, and turn research into real-world systems.</p></div><div class="work-map"><svg class="work-trail" aria-hidden="true"><path/></svg><span class="work-ball" aria-hidden="true"></span>
<article class="work-card work-ms"><span class="work-orbit" aria-hidden="true"></span><span class="eyebrow">SENIOR APPLIED SCIENTIST</span><h2>Building the next wave of AI.</h2><p>AI agents, language models, and the evaluation that helps us understand them.</p><div class="work-tags"><span>AI agents</span><span>Language models</span><span>Evaluation</span></div></article>
<article class="work-card work-ziva"><span class="eyebrow">HEALTH-TECH STARTUP</span><h2>Head of AI &amp;<br>Product Strategy</h2><span class="work-founding">Founding member</span><p>Led the entire technology function and a team of <strong>15+ engineers</strong>—wearing the AI, engineering, and product strategy hats.</p><div class="work-ownership"><h3>From the ground up</h3><p>Built a connected product ecosystem: Isabella health AI, provider dashboards, patient experience, billing automation, and wearable integrations.</p></div><p class="work-growth">Grew with the startup from 5 to nearly 30 people in 1.5 years.</p></article>
<article class="work-card work-masters"><h2>MS in<br>Data Science</h2><div class="work-columns"><div><h3>Research</h3><p>Exploring machine learning and its real-world applications.</p></div><div><h3>Entrepreneurship</h3><p>Bringing a builder’s perspective to research and ideas.</p></div></div></article>
<article class="work-card work-small work-mba"><span class="eyebrow">UC SAN DIEGO · RADY</span><h2>MicroMBA</h2><p>A business perspective.</p></article>
<article class="work-card work-small work-ige"><span class="eyebrow">UC SAN DIEGO</span><h2>IGE</h2><p>Innovation & entrepreneurship.</p></article>
<article class="work-card work-small work-startr"><span class="eyebrow">StartR Accelerator</span><h2>Ideas into a venture.</h2><p>StartR Demo Day winner.</p></article>
<article class="work-card work-lime"><img class="work-company-logo work-logo-lime" src="assets/brands/lime.svg" alt="Lime"><span class="eyebrow">DATA SCIENCE SUMMER ASSOCIATE · RIDER TEAM</span><h2>Getting riders help.</h2><p>Built an LLM-powered risk reduction framework that helped prioritize urgent rider tickets.</p><p class="work-lime-detail">Partnered with three customer-facing product teams to turn rider feedback into insights for product decisions.</p><div class="work-tags"><span>Rider experience</span><span>LLMs</span><span>Product insights</span></div></article>
<article class="work-card work-asr"><span class="eyebrow">DATA SCIENTIST · OPEN-SOURCE ASR</span><h2>India’s first-ever, largest open-source ASR system.</h2><span class="metric-note">23 Indian languages · Project Vakyansh</span><p>Built speech recognition technology adopted by the government.</p><div class="work-wave" aria-hidden="true">${Array.from({length:40},(_,i)=>`<i style="--h:${10+Math.sin(i*.7)**2*40}px;--d:${-i*.13}s"></i>`).join('')}</div><div class="work-tags"><span>Speech recognition</span><span>Open source</span></div></article></div><div class="work-end">${portal('#world','World','portal-back','portal-world')}${portal('#speaking','Speaking','portal-next','portal-speaking')}</div>`;
document.body.append(world);
const logoFilter=document.createElementNS('http://www.w3.org/2000/svg','svg');logoFilter.setAttribute('width','0');logoFilter.setAttribute('height','0');logoFilter.setAttribute('aria-hidden','true');logoFilter.style.position='absolute';logoFilter.innerHTML='<defs><filter id="work-logo-knockout" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>';world.append(logoFilter);
const whiteFilter=document.createElementNS('http://www.w3.org/2000/svg','svg');whiteFilter.setAttribute('width','0');whiteFilter.setAttribute('height','0');whiteFilter.style.position='absolute';whiteFilter.setAttribute('aria-hidden','true');whiteFilter.innerHTML='<defs><filter id="work-logo-white" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 -1 -1 -1 0 3"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>';world.append(whiteFilter);
const brands={ms:['microsoft.jpg','Microsoft'],ziva:['ziva.png','Ziva Health'],masters:['ucsd.png','UC San Diego'],asr:['thoughtworks.svg','Thoughtworks']};
for(const [key,[file,name]] of Object.entries(brands)){const logo=document.createElement('img');logo.className='work-company-logo work-logo-'+key;logo.src='assets/brands/'+file;logo.alt=name;world.querySelector('.work-'+key).prepend(logo)}
const zivaLogo=world.querySelector('.work-logo-ziva');const zivaWrap=document.createElement('span');zivaWrap.className='work-ziva-brand';zivaLogo.replaceWith(zivaWrap);zivaWrap.append(zivaLogo);const zivaWhite=zivaLogo.cloneNode();zivaWhite.classList.add('ziva-white-word');zivaWhite.alt='';zivaWhite.setAttribute('aria-hidden','true');zivaWrap.append(zivaWhite);
const qualities=document.createElement('section');qualities.className='work-qualities';qualities.setAttribute('aria-label','Research, AI, Product, Entrepreneurship');
qualities.innerHTML=`<p class="qualities-intro">Four perspectives. One way of building.</p><div class="quality-constellation"><svg class="quality-links" viewBox="0 0 640 420" preserveAspectRatio="none" aria-hidden="true"><path d="M320 210 Q180 210 150 90 M320 210 Q450 210 490 90 M320 210 Q180 210 150 335 M320 210 Q450 210 490 335"/><ellipse cx="320" cy="210" rx="200" ry="136"/></svg><div class="quality-heart"><span class="quality-heart-spark" aria-hidden="true">✧</span><strong>Ideas into<br>real-world impact.</strong><span>My connecting thread</span></div><div class="quality-node quality-research"><span class="quality-symbol" aria-hidden="true">⌕</span><strong>Research</strong><span>Ask better questions.</span></div><div class="quality-node quality-ai"><span class="quality-symbol" aria-hidden="true">✧</span><strong>AI</strong><span>Build with depth.</span></div><div class="quality-node quality-product"><span class="quality-symbol" aria-hidden="true">◇</span><strong>Product</strong><span>Make it matter.</span></div><div class="quality-node quality-founder"><span class="quality-symbol" aria-hidden="true">↗</span><strong>Entrepreneurship</strong><span>Take it from zero to one.</span></div><span class="quality-traveller" aria-hidden="true"></span></div>`;
world.querySelector('.work-end').before(qualities);

const oldMap=world.querySelector('.work-map');
const records=[
 ['ms','Microsoft','Senior Applied Scientist','AI agents · Language models · Evaluation'],
 ['ziva','Ziva','Head of AI & Product Strategy','Founding member · 15+ engineers'],
 ['masters','UC San Diego','MS in Data Science',''],
 ['lime','Lime','Data Science Summer Associate','Rider team · Product insights'],
 ['asr','Thoughtworks','Data Scientist','Open-source ASR · 23 Indian languages'],
 ['mba','MicroMBA','',''],['ige','IGE','',''],['startr','StartR','','']
].map(([key,name,role,tags])=>({key,name,role,tags,detail:oldMap.querySelector('.work-'+key).innerHTML}));
const scene=document.createElement('div');scene.className='terrace-scene';
scene.innerHTML='<div class="terrace-art" aria-hidden="true"></div>';
world.querySelector('.work-heading').before(scene);scene.append(world.querySelector('.work-heading'));
const milestones=document.createElement('div');milestones.className='terrace-milestones';milestones.setAttribute('aria-label','Career milestones, most recent first');scene.append(milestones);
const campus=document.createElement('img');campus.className='terrace-campus';campus.src='assets/work-geisel-artifact.png';campus.alt='';campus.setAttribute('aria-hidden','true');milestones.append(campus);
const icons={ms:'<svg viewBox="0 0 100 60"><path d="M10 30L40 8L83 20L68 52L10 30L54 30L83 20M40 8L54 30L68 52"/><circle cx="10" cy="30" r="3"/><circle cx="40" cy="8" r="3"/><circle cx="83" cy="20" r="3"/><circle cx="68" cy="52" r="3"/></svg>',ziva:'<svg viewBox="0 0 100 60"><circle cx="37" cy="25" r="20"/><circle cx="63" cy="25" r="20"/><circle cx="50" cy="40" r="20"/></svg>',asr:'<svg viewBox="0 0 100 60"><path d="M5 27v6m7-14v22m7-29v36m7-21v6m7-17v28m7-37v46m7-28v10m7-20v30m7-38v46m7-32v18m7-24v30m7-20v10m7-8v6"/></svg>'};
records.forEach((r,i)=>{const b=document.createElement('button');b.className='terrace-card terrace-'+r.key+(i>4?' terrace-small':'');b.type='button';b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','terraceDetail');b.innerHTML='<span class="terrace-name">'+r.name+'</span>'+(r.role?'<span class="terrace-role">'+r.role+'</span>':'')+(r.tags?'<span class="terrace-tags">'+r.tags+'</span>':'')+(icons[r.key]?'<span class="terrace-icon" aria-hidden="true">'+icons[r.key]+'</span>':'');milestones.append(b);r.button=b;});
// Keep brand assets in the overview as well as the preserved detail content.
records.forEach(r=>{const source=oldMap.querySelector('.work-'+r.key);const logo=source.querySelector('.work-ziva-brand,.work-company-logo');if(logo){r.button.prepend(logo.cloneNode(true));r.button.querySelector('.terrace-name').classList.add('terrace-brand-name');}});
records.find(r=>r.key==='masters').button.append(campus);
const road=document.createElementNS('http://www.w3.org/2000/svg','svg');road.classList.add('terrace-road');road.setAttribute('aria-hidden','true');road.innerHTML='<path class="road-glow"/><path class="road-edge"/><path class="road-center"/><defs><radialGradient id="road-pearl" cx="30%" cy="25%"><stop stop-color="#fffdf0"/><stop offset=".5" stop-color="#f4c99f"/><stop offset="1" stop-color="#aa766e"/></radialGradient></defs><g class="road-ball"><circle r="11"/><path class="pearl-seam" d="M0 -9 Q9 0 0 9"/></g>';milestones.prepend(road);
const routeOrder=['ms','ziva','mba','ige','startr','lime','masters','asr'];
function drawRoad(){
 const box=milestones.getBoundingClientRect();if(!box.width)return;
 road.setAttribute('viewBox',`0 0 ${box.width} ${box.width>600?1410:1640}`);road.setAttribute('preserveAspectRatio','none');
 const x=n=>box.width*n;
 // A continuous ribbon with broad turns, independent of card edges.
 const d=box.width>600?
 `M ${x(.28)} 0 C ${x(.17)} 45,${x(.83)} 65,${x(.72)} 190 S ${x(.08)} 310,${x(.22)} 425 S ${x(.86)} 510,${x(.73)} 660 S ${x(.12)} 720,${x(.25)} 865 S ${x(.89)} 995,${x(.76)} 1120 S ${x(.2)} 1240,${x(.5)} 1410`:
 `M ${x(.5)} 0 C ${x(.98)} 90,${x(.98)} 220,${x(.5)} 270 S ${x(.02)} 470,${x(.5)} 530 S ${x(.98)} 670,${x(.5)} 730 S ${x(.02)} 940,${x(.5)} 1010 S ${x(.98)} 1250,${x(.5)} 1320 S ${x(.02)} 1500,${x(.5)} 1640`;
 road.querySelectorAll(':scope > path').forEach(p=>p.setAttribute('d',d));moveBall();
}
function moveBall(){if(world.hidden)return;const path=road.querySelector('.road-center');if(!path.getAttribute('d'))return;const b=milestones.getBoundingClientRect(),y=Math.max(0,Math.min(b.height,innerHeight*.5-b.top))*(b.width>600?1410:1640)/b.height;let lo=0,hi=path.getTotalLength();for(let i=0;i<18;i++){const m=(lo+hi)/2;if(path.getPointAtLength(m).y<y)lo=m;else hi=m;}const p=path.getPointAtLength((lo+hi)/2);const ball=road.querySelector('.road-ball');ball.setAttribute('transform',`translate(${p.x} ${p.y}) scale(1 ${(b.width>600?1410:1640)/b.height}) rotate(${lo*2})`);}
new ResizeObserver(drawRoad).observe(milestones);world.addEventListener('scroll',moveBall,{passive:true});world.addEventListener('flow-scroll',moveBall);
oldMap.remove();world.querySelector('.work-backdrop').remove();
const landscape=document.createElement('div');landscape.className='ribbon-landscape';scene.before(landscape);landscape.append(scene,qualities,world.querySelector('.work-end'));
records.forEach(r=>r.button.setAttribute('aria-label',[r.name,r.role,r.tags].filter(Boolean).join(' · ')));
routeOrder.forEach(key=>milestones.append(records.find(r=>r.key===key).button));
// Details stay visible: no hidden state or hover interaction is needed.
records.forEach(r=>{
 const article=document.createElement('article');article.className=r.button.className;article.setAttribute('aria-label',r.name);
 article.innerHTML=r.detail;
 if(r.key==='masters')article.append(campus);
 r.button.replaceWith(article);r.button=article;
});
// Scroll chapters keep the full copy accessible while bringing one composition into focus.
const smallGroup=document.createElement('div');smallGroup.className='chapter-sidequests';
records.find(r=>r.key==='mba').button.before(smallGroup);
const mbaScene=document.createElement('div');mbaScene.className='minor-chapter minor-mba';
const ventureScene=document.createElement('div');ventureScene.className='minor-chapter minor-ventures';
smallGroup.append(mbaScene,ventureScene);
mbaScene.append(records.find(r=>r.key==='mba').button);
['ige','startr'].forEach(key=>ventureScene.append(records.find(r=>r.key===key).button));
records.filter(r=>!['mba','ige','startr'].includes(r.key)).forEach((r,i)=>{
 const title=document.createElement('div');title.className='chapter-title';
 const body=document.createElement('div');body.className='chapter-copy';
 Array.from(r.button.children).forEach(el=>{if(el.matches('.work-company-logo,.work-ziva-brand,.eyebrow,h2'))title.append(el);else body.append(el);});
 if(r.key==='asr'){
 const achievement=title.querySelector('h2');achievement.remove();
 const role=document.createElement('h2');role.textContent='Data Scientist';title.append(role);
 title.querySelector('.eyebrow').textContent='THOUGHTWORKS · OPEN-SOURCE ASR';
 const heading=document.createElement('h3');heading.className='asr-achievement';heading.textContent='Built the first-ever, largest open-source ASR system.';
 const subtitle=body.querySelector('.metric-note');subtitle.textContent='In 23 Indic languages';
 body.prepend(heading);
}
r.button.append(title,body);r.button.classList.add('work-chapter');
 r.button.style.setProperty('--entrance',i%2?'-45px':'45px');
});
const chapters=[...records.filter(r=>r.button.classList.contains('work-chapter')).map(r=>r.button),mbaScene,ventureScene];
const chapterObserver=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('chapter-active',e.isIntersecting)),{root:world,rootMargin:'-16% 0px -16% 0px',threshold:.15});
chapters.forEach(el=>chapterObserver.observe(el));
function sync(){const active=['#work/journey','#journey'].includes(location.hash);world.hidden=!active;if(active){pauseTour();world.scrollTop=0;}}
addEventListener('hashchange',sync);sync();
})();
