(()=>{
const root=document.querySelector('#workWorld'),map=root.querySelector('.work-map'),cards=[...map.querySelectorAll('.work-card')];
const track=document.createElement('div');track.className='voyage-track';map.before(track);track.append(map);
const camera=document.createElement('div');camera.className='voyage-camera';map.append(camera);cards.forEach((card,i)=>{camera.append(card);card.style.setProperty('--depth',i*900+'px');card.style.setProperty('--side',(i%2?1:-1));});
const sea=document.createElement('div');sea.className='voyage-sea';sea.setAttribute('aria-hidden','true');camera.prepend(sea);
const status=document.createElement('div');status.className='voyage-status';status.innerHTML='<span>THE JOURNEY</span><span class="voyage-count"></span><span>Scroll to explore</span>';map.append(status);
const media=matchMedia('(min-width: 760px) and (prefers-reduced-motion: no-preference)');let raf=0;
function paint(){raf=0;if(root.hidden)return;const enabled=media.matches;root.classList.toggle('voyage-enabled',enabled);if(!enabled)return;
const distance=Math.max(0,Math.min((cards.length-1)*900,root.scrollTop-track.offsetTop));camera.style.transform=`translateZ(${-distance}px)`;
const active=Math.min(cards.length-1,Math.floor(distance/900));status.querySelector('.voyage-count').textContent=String(active+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
cards.forEach((card,i)=>{const z=i*900-distance;const visible=z<100&&z>-3600;card.style.visibility=visible?'visible':'hidden';card.style.opacity=z>0?Math.max(0,1-z/100):Math.max(.45,1+z/6000);card.style.pointerEvents=i===active?'auto':'none';card.setAttribute('aria-hidden',String(!visible));});
}
function update(){if(!raf)raf=requestAnimationFrame(paint)}
function reset(){root.classList.toggle('voyage-enabled',media.matches);cards.forEach(c=>{c.style.visibility='';c.style.opacity='';c.style.pointerEvents='';c.removeAttribute('aria-hidden')});update()}
root.addEventListener('scroll',update,{passive:true});addEventListener('hashchange',update);addEventListener('resize',reset);media.addEventListener('change',reset);reset();
})();
