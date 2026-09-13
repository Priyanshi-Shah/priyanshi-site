(()=>{
const root=document.querySelector('#speakingWorld');
const events=[
 {name:'KM World 2025',photos:['km-world-2025-01.jpg','km-world-2025-02.jpg','km-world-2025-03.jpg','km-world-2025-04.jpg']},
 {name:'Girls in STEM',photos:['girls-in-stem-01.jpg']},
 {name:'UCSD Student Perspective',photos:['ucsd-student-perspective-02.jpg','ucsd-student-perspective-01.jpg','ucsd-student-perspective-03.jpg','ucsd-student-perspective-04.jpg']},
 {name:'HDSC Ribbon-cutting Speaker',photos:['hdsc-ribbon-cutting.png']},
 {name:"Chancellor's Scholars Alumni Panel Speaker",photos:['chancellors-alumni-panel.png']},
 {name:'StartR Accelerator Demo Day',photos:['startr-speaker.png','startr-demo-day-01.jpg','startr-demo-day-02.jpg']}
];
const viewer=document.querySelector('#speakingViewer');let selected=0,photo=0;
function renderPhoto(){const event=events[selected];viewer.querySelector('img').src='assets/speaking/'+event.photos[photo];viewer.querySelector('img').alt=event.name+' — photo '+(photo+1);viewer.querySelector('h2').textContent=event.uncaptioned?'':event.name;viewer.querySelector('output').textContent=(photo+1)+' / '+event.photos.length;viewer.querySelectorAll('[data-direction]').forEach(b=>b.hidden=event.photos.length<2)}
events.forEach((event,i)=>{
 const island=document.createElement('article');island.className='speaking-island';
 const card=document.createElement(event.photos?'button':'div');card.className='speaker-card';
 if(event.photos){card.innerHTML='<img '+(i?'loading="lazy"':'fetchpriority="high"')+' src="assets/speaking/'+event.photos[0]+'" alt="'+event.name+'"><span class="speaker-caption">'+event.name+'</span>';card.setAttribute('aria-label','View photos from '+event.name);card.onclick=()=>{selected=i;photo=0;renderPhoto();viewer.showModal()}}
 else card.innerHTML='<div class="speaker-placeholder" aria-label="Event photo coming soon"><svg viewBox="0 0 64 64" aria-hidden="true">'+event.icon+'</svg></div><span class="speaker-caption">'+event.name+'</span>';
 island.append(card);document.querySelector(i?'.speaking-gallery':'.speaking-hero').append(island);
});
// Add future events here: one cover, a short visible description, and an album.
const gatherings=[
 {name:'CVPR 2024',description:'Computer vision, fresh research, and reconnecting with the AI community in Seattle.',photos:['cvpr-2024-01.jpg','cvpr-2024-02.jpg']},
 {name:'HackMIT',description:'Meeting the next generation of builders as a hackathon judge.',photos:['hackmit-01.jpg']},
 {name:'TreeHacks 2024 · Stanford',description:'Judging student-built ideas at Stanford’s hackathon.',badge:'JUDGE / STANFORD',photos:['treehacks-2024.jpg']},
 {name:'NeurIPS 2023',description:'Connecting with researchers and exchanging ideas across machine learning.',badge:'RESEARCH / CONNECTIONS',photos:['neurips-2023.jpg']}
];
const uploadCaptions={
 3:'GHC',
 5:'Grace Hopper Conference 2024',
 6:'HackMIT 2024',
 8:'GenAI Summit 2024 · San Francisco',
 10:'Women in AI Meetup · Bellevue',
 11:'GHC · Women',
 12:'CTO Talks · San Diego'
};
gatherings.push(...Array.from({length:12},(_,i)=>({name:uploadCaptions[i+1]||'Event photo '+(i+1),uncaptioned:!uploadCaptions[i+1],uploaded:true,photos:['event-upload-'+String(i+1).padStart(2,'0')+'.jpg?v=2']})));
gatherings.push(
 {name:'Hackathon',description:'Built with large local models on NVIDIA DGX Spark, running on local edge compute.',uploaded:true,photos:['hackathon-dgx-spark.jpg']},
 {name:'Microsoft',uploaded:true,photos:['microsoft-event.jpg']}
);
gatherings.forEach((event,i)=>{
 const index=events.push(event)-1;
 const card=document.createElement(event.photos.length?'button':'article');card.className='event-node speaker-card';card.style.setProperty('--tilt',[-2,2,-1][i%3]+'deg');
 card.setAttribute('aria-label',event.photos.length?'View '+event.name+' photos':event.name);
 let img;
 if(event.photos.length){img=document.createElement('img');img.src='assets/speaking/'+event.photos[0];img.alt=event.name;img.loading='lazy'}
 else{img=document.createElement('div');img.className='event-placeholder';const badge=document.createElement('span');badge.textContent=event.badge;const name=document.createElement('strong');name.textContent=event.name;img.append(badge,name)}
 const caption=document.createElement('span');caption.className='speaker-caption';
 const title=document.createElement('strong');title.textContent=event.name;
 const brief=document.createElement('span');brief.textContent=event.description;
 caption.append(title);if(event.description)caption.append(brief);card.append(img);if(event.uploaded)card.classList.add('event-upload');if(!event.uncaptioned)card.append(caption);else card.classList.add('event-photo-only');
 if(event.photos.length>1){const count=document.createElement('span');count.className='event-count';count.textContent=event.photos.length+' photos';card.append(count)}
 if(event.photos.length)card.onclick=()=>{selected=index;photo=0;renderPhoto();viewer.showModal()};
 root.querySelector('.event-constellation').append(card);
});
viewer.querySelector('[data-close]').onclick=()=>viewer.close();
viewer.querySelectorAll('[data-direction]').forEach(b=>b.onclick=()=>{photo=(photo+Number(b.dataset.direction)+events[selected].photos.length)%events[selected].photos.length;renderPhoto()});
viewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();photo=(photo+(e.key==='ArrowRight'?1:-1)+events[selected].photos.length)%events[selected].photos.length;renderPhoto()}});
viewer.addEventListener('click',e=>{if(e.target===viewer){const b=viewer.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)viewer.close()}});
const stage=root.querySelector('.speaking-stage'),path=root.querySelector('path'),ball=root.querySelector('#speakingBall'),islands=[...root.querySelectorAll('.speaking-island, .event-node')],reduced=matchMedia('(prefers-reduced-motion: reduce)');
let points=[],length=0,raf=0,current=null,targetLength=0,lastFrame=0;
function layout(){
 if(root.hidden)return;
 const s=stage.getBoundingClientRect();
 root.querySelector('.speaking-landscape').style.height=(stage.offsetHeight*1.06)+'px';
 points=islands.map(el=>{const r=el.getBoundingClientRect();return{x:r.left-s.left+r.width*.5,y:r.bottom-s.top+25,index:islands.indexOf(el)}});
 points.sort((a,b)=>a.y-b.y);
 const end=root.querySelector('.speaking-end').getBoundingClientRect();points.push({x:s.width*.5,y:end.top-s.top});
 let d='M '+points[0].x+' '+points[0].y;
 for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],mid=(a.y+b.y)/2;d+=' C '+a.x+' '+mid+', '+b.x+' '+mid+', '+b.x+' '+b.y}
 path.setAttribute('d',d);length=path.getTotalLength();current=null;update();
}
function animateBall(time){
 raf=0;
 if(root.hidden||document.hidden){lastFrame=0;return}
 const dt=lastFrame?Math.min(time-lastFrame,40):16;lastFrame=time;
 current=current===null||reduced.matches?targetLength:current+(targetLength-current)*(1-Math.exp(-dt/110));
 const p=path.getPointAtLength(current);
 ball.style.transform='translate3d('+p.x+'px,'+p.y+'px,0) translate(-50%,-50%)';
 if(Math.abs(targetLength-current)>.1)raf=requestAnimationFrame(animateBall);
 else lastFrame=0;
}
function update(){
 if(root.hidden||!length)return;
 const target=root.scrollTop+root.clientHeight*.54;
 let lo=0,hi=length;
 for(let i=0;i<18;i++){const m=(lo+hi)/2;if(path.getPointAtLength(m).y<target)lo=m;else hi=m}
 targetLength=(lo+hi)/2;
 if(!raf)raf=requestAnimationFrame(animateBall);
 let closest=0;points.slice(0,-1).forEach((v,i)=>{if(Math.abs(v.y-target)<Math.abs(points[closest].y-target))closest=i});
 islands.forEach((el,i)=>el.classList.toggle('is-current',i===points[closest].index));
 root.querySelector('.speaking-landscape').style.transform=reduced.matches?'':'translateY('+root.scrollTop*.045+'px)';
}
root.addEventListener('scroll',update,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;lastFrame=0}else update()});
new ResizeObserver(layout).observe(stage);
root.querySelectorAll('img').forEach(img=>img.addEventListener('load',layout));
function sync(){if(location.hash==='#speaking'){requestAnimationFrame(layout);root.querySelector('h1').focus({preventScroll:true})}else viewer.close()}
addEventListener('hashchange',sync);reduced.addEventListener('change',update);sync();
})();
