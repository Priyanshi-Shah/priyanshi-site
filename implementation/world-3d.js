import * as T from './vendor/three.module.js';
const flow=document.querySelector('#worldFlow'),stage=flow?.querySelector('.flow-stage');
if(stage){
 try { init(); } catch(error){ console.warn('3D overview unavailable; keeping illustrated overview.',error); }
}
function init(){
 const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor('#30263f');
 renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.85;
 renderer.domElement.className='world-canvas';renderer.domElement.setAttribute('aria-hidden','true');stage.prepend(renderer.domElement);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(44,1,.1,220);
 scene.fog=new T.FogExp2('#786077',.011);
 scene.add(new T.HemisphereLight('#eee0fa','#302136',1.6));
 const sun=new T.DirectionalLight('#ffd3ab',4.2);sun.position.set(-8,12,7);scene.add(sun);
 const rim=new T.DirectionalLight('#bba6f1',3);rim.position.set(8,5,-12);scene.add(rim);
 const sky=new T.Mesh(new T.SphereGeometry(130,48,24),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{},vertexShader:'varying vec3 v; void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 v;void main(){vec3 d=normalize(v);float h=smoothstep(-.2,.7,d.y);vec3 c=mix(vec3(.26,.18,.30),vec3(.07,.06,.14),h);float glow=pow(max(0.,dot(d,normalize(vec3(-.7,.07,-.8)))),10.);c+=vec3(.20,.10,.07)*glow;gl_FragColor=vec4(c,1.);}'}));scene.add(sky);
 const materials={rock:new T.MeshStandardMaterial({color:'#63516b',roughness:.95,flatShading:false}),top:new T.MeshStandardMaterial({color:'#b997a0',roughness:.8}),metal:new T.MeshStandardMaterial({color:'#81758f',metalness:.75,roughness:.27}),dark:new T.MeshStandardMaterial({color:'#252334',metalness:.5,roughness:.3}),cream:new T.MeshStandardMaterial({color:'#e8cbb4',roughness:.5}),peach:new T.MeshStandardMaterial({color:'#ffd8b2',emissive:'#f9b77f',emissiveIntensity:1.8})};
 function mesh(g,m,parent,pos=[0,0,0]){const o=new T.Mesh(g,m);o.position.set(...pos);parent.add(o);return o;}
 function box(w,h,d,m,p,pos){return mesh(new T.BoxGeometry(w,h,d),m,p,pos)}
 function cylinder(a,b,h,m,p,pos){return mesh(new T.CylinderGeometry(a,b,h,48),m,p,pos)}
 function island(x,y,z,size){const g=new T.Group();g.position.set(x,y,z);scene.add(g);
  const verts=[],idx=[],segments=64,rings=18;
  for(let j=0;j<=rings;j++){const f=j/rings;for(let k=0;k<=segments;k++){const a=k/segments*Math.PI*2;const n=1+.08*Math.sin(a*7+f*14)+.04*Math.cos(a*17-f*22);const r=size*.91*Math.pow(1-f,.6)*n;verts.push(Math.cos(a)*r,-.05-f*size*1.35,Math.sin(a)*r*.82)}}
  for(let j=0;j<rings;j++)for(let k=0;k<segments;k++){const a=j*(segments+1)+k,b=a+segments+1;idx.push(a,a+1,b,a+1,b+1,b)}
  const geom=new T.BufferGeometry();geom.setAttribute('position',new T.Float32BufferAttribute(verts,3));geom.setIndex(idx);geom.computeVertexNormals();
  mesh(geom,materials.rock,g);
  cylinder(size*.88,size*.92,.16,materials.top,g,[0,0,0]);
  const edge=mesh(new T.TorusGeometry(size*.82,.012,6,96),materials.peach,g,[0,.09,0]);edge.rotation.x=Math.PI/2;
  return g;
 }
 const islands=[island(-6.5,0,0,1.65),island(-2.25,.25,-.6,2),island(2.5,.9,-1.6,1.55),island(6.6,.1,0,1.75)];
 // Ceramic matcha cup: open rim, green surface, and a dimensional handle.
 const cup=new T.Group();islands[0].add(cup);cup.position.y=.13;
 cylinder(.53,.39,.8,materials.cream,cup,[0,.4,0]);
 const lip=mesh(new T.TorusGeometry(.5,.045,12,64),materials.cream,cup,[0,.81,0]);lip.rotation.x=Math.PI/2;
 const tea=mesh(new T.CircleGeometry(.455,64),new T.MeshStandardMaterial({color:'#6c8050',roughness:.25}),cup,[0,.807,0]);tea.rotation.x=-Math.PI/2;
 const handle=mesh(new T.TorusGeometry(.25,.07,12,32),materials.cream,cup,[.53,.47,0]);handle.scale.x=.8;
 // Laptop geometry stays sharp at any camera distance; screen is a live shader.
 const laptop=new T.Group();islands[1].add(laptop);laptop.position.set(0,.16,0);
 box(2.15,.09,1.35,materials.metal,laptop,[0,0,.12]);
 for(let row=0;row<5;row++)for(let col=0;col<13;col++)box(.105,.015,.095,materials.dark,laptop,[-.86+col*.144,.055,-.34+row*.135]);
 box(.65,.009,.29,materials.dark,laptop,[0,.06,.51]);
 const lid=new T.Group();lid.position.set(0,.06,-.5);lid.rotation.x=-.09;laptop.add(lid);
 box(2.16,1.4,.085,materials.dark,lid,[0,.68,0]);
 const screenMaterial=new T.ShaderMaterial({uniforms:{time:{value:0}},vertexShader:'varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`varying vec2 v;uniform float time;void main(){vec3 c=vec3(.025,.018,.055);float grid=step(.985,fract(v.x*28.))+step(.985,fract(v.y*18.));c+=grid*.025;for(int i=0;i<7;i++){float f=float(i);float y=.5+sin(v.x*8.+time*.45+f*.22)*(.10+f*.021);float line=exp(-abs(v.y-y)*330.);c+=line*mix(vec3(.65,.4,.8),vec3(1.,.69,.44),v.x)*.65;}gl_FragColor=vec4(c,1.);}`});
 mesh(new T.PlaneGeometry(1.98,1.23),screenMaterial,lid,[0,.68,.046]);
 const screenTarget=new T.Object3D();screenTarget.position.set(0,.68,.05);lid.add(screenTarget);
 const eyeTarget=new T.Object3D();eyeTarget.position.set(0,.68,1.23);lid.add(eyeTarget);
 // Speaking lectern, microphone and softly lit platform.
 const podium=islands[2];cylinder(.4,.5,.13,materials.cream,podium,[0,.19,0]);box(.47,1.2,.4,materials.cream,podium,[0,.84,0]);box(.85,.13,.62,materials.metal,podium,[0,1.48,0]);
 const stem=cylinder(.017,.017,.49,materials.dark,podium,[.12,1.78,0]);stem.rotation.z=.32;const mic=mesh(new T.SphereGeometry(.055,16,12),materials.dark,podium,[.04,2.01,0]);mic.scale.y=1.5;
 // Camera body, concentric lens and viewfinder.
 const photo=islands[3];box(1.3,.8,.5,materials.metal,photo,[0,.62,0]);box(.4,.22,.35,materials.dark,photo,[.08,1.09,0]);
 const lens=cylinder(.34,.38,.43,materials.dark,photo,[0,.66,.42]);lens.rotation.x=Math.PI/2;
 const lensRing=mesh(new T.TorusGeometry(.29,.03,10,48),materials.cream,photo,[0,.66,.65]);
 mesh(new T.CircleGeometry(.265,48),new T.MeshStandardMaterial({color:'#595071',metalness:1,roughness:.12}),photo,[0,.66,.654]);
 // Distant floating landforms surround the visitor for the complete orbit.
 for(let i=0;i<20;i++){const angle=i*2.39996,r=35+(i%5)*9;const shard=mesh(new T.IcosahedronGeometry(1+(i%4)*.3,0),materials.rock,scene,[Math.cos(angle)*r,-6+(i%5)*1.1,Math.sin(angle)*r]);shard.scale.set(1.6,1.1,1);}
 const hazeCanvas=document.createElement('canvas');hazeCanvas.width=hazeCanvas.height=128;const ctx=hazeCanvas.getContext('2d');const gr=ctx.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(218,188,207,.25)');gr.addColorStop(1,'rgba(218,188,207,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,128,128);const cloudMap=new T.CanvasTexture(hazeCanvas);
 for(let i=0;i<38;i++){const a=i*2.4,r=10+i%8*3;const cloud=new T.Sprite(new T.SpriteMaterial({map:cloudMap,transparent:true,depthWrite:false,opacity:.65}));cloud.position.set(Math.cos(a)*r,-3.5-i%3,Math.sin(a)*r);cloud.scale.set(14,5,1);scene.add(cloud)}
 const orb=mesh(new T.SphereGeometry(.11,24,16),materials.peach,scene);const light=new T.PointLight('#ffd2a0',3,5);orb.add(light);
 const trailCount=40,trailData=new Float32Array(trailCount*3),trailGeo=new T.BufferGeometry();trailGeo.setAttribute('position',new T.BufferAttribute(trailData,3));const trail=new T.Line(trailGeo,new T.LineBasicMaterial({color:'#ffcea5',transparent:true,opacity:.7}));scene.add(trail);
 const anchors=islands.map((g,i)=>new T.Vector3(g.position.x,g.position.y+(i===2?2.15:1.55),g.position.z+.3));
 const labels=[...stage.querySelectorAll('[data-destination]')];const projected=new T.Vector3();
 let width=1,height=1,previousIndex=-1,flightStart=0,from=anchors[0].clone(),to=anchors[0].clone(),hover=-1,frame=0,last=0;
 labels.forEach((b,i)=>{b.addEventListener('pointerenter',()=>hover=i);b.addEventListener('pointerleave',()=>hover=-1);b.addEventListener('focus',()=>hover=i);b.addEventListener('blur',()=>hover=-1)});
 function resize(){width=stage.clientWidth;height=stage.clientHeight;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix()}
 new ResizeObserver(resize).observe(stage);resize();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function render(now){frame=0;if(flow.hidden||document.hidden)return;
  const time=now*.001,dt=Math.min(.05,(now-last)*.001||.016);last=now;
  const p=flow.scrollTop/Math.max(1,flow.querySelector('.flow-overview').offsetHeight-height);
  const spin=Math.min(1,Math.max(0,p/.2)),approach=Math.max(0,Math.min(1,(p-.78)/.17));
  const index=approach>0?1:hover>=0?hover:Math.min(3,Math.max(0,Math.floor((p-.2)/.14)));
  if(index!==previousIndex){from.copy(orb.position.length()?orb.position:anchors[0]);to.copy(anchors[index]);flightStart=time;previousIndex=index;}
  const t=reduced.matches?1:Math.min(1,(time-flightStart)/1.15),ease=t*t*(3-2*t);
  orb.position.lerpVectors(from,to,ease);orb.position.y+=Math.sin(t*Math.PI)*2.3;
  if(t===1)orb.position.y+=reduced.matches?0:Math.sin(time*2)*.08;
  for(let i=trailCount-1;i>0;i--){trailData[i*3]=trailData[(i-1)*3];trailData[i*3+1]=trailData[(i-1)*3+1];trailData[i*3+2]=trailData[(i-1)*3+2];}orb.position.toArray(trailData,0);trailGeo.attributes.position.needsUpdate=true;trail.visible=t<1&&!reduced.matches;
  islands.forEach((g,i)=>{g.rotation.y=reduced.matches?0:Math.sin(time*.2+i)*.035;g.children[2].material= i===index?materials.peach:materials.metal;});
  const radius=width<650?25:18,theta=reduced.matches?0:spin*Math.PI*2;
  const eye=new T.Vector3(Math.sin(theta)*radius,4.6,Math.cos(theta)*radius),look=new T.Vector3(0,.2,0);
  if(spin>=1){eye.x=(anchors[index].x)*.07;look.x=anchors[index].x*.06;}
  scene.updateMatrixWorld(true);
  const screenPos=screenTarget.getWorldPosition(new T.Vector3()),screenEye=eyeTarget.getWorldPosition(new T.Vector3());
  const zoom=approach*approach*(3-2*approach);eye.lerp(screenEye,zoom);look.lerp(screenPos,zoom);
  camera.position.copy(eye);camera.lookAt(look);camera.updateMatrixWorld();
  labels.forEach((b,i)=>{projected.set(islands[i].position.x,islands[i].position.y-.55,islands[i].position.z+.4).project(camera);b.style.left=((projected.x*.5+.5)*width)+'px';b.style.top=((-projected.y*.5+.5)*height)+'px';b.style.visibility=projected.z>1||spin<1||approach>.12?'hidden':'visible';b.querySelector('.island-note').style.visibility=spin<1||approach>.12?'hidden':'';});
  screenMaterial.uniforms.time.value=time;renderer.render(scene,camera);frame=requestAnimationFrame(render);
 }
 function wake(){if(!frame&&!flow.hidden&&!document.hidden)frame=requestAnimationFrame(render)}
 new MutationObserver(wake).observe(flow,{attributes:true,attributeFilter:['hidden']});document.addEventListener('visibilitychange',wake);flow.addEventListener('scroll',wake,{passive:true});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();stage.classList.remove('has-webgl');cancelAnimationFrame(frame);frame=0});
 stage.classList.add('has-webgl');wake();
}
