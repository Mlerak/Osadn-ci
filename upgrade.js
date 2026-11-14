/* upgrade.js – hezčí 3D scéna, vlastní procedurální textury a zvuky.
   Načítá se po hlavním skriptu: <script src="upgrade.js"></script> těsně před </body> */
(()=>{
const CFG=Object.freeze({lockFiles:true,
 textures:Object.freeze({
  // wood:'textures/wood.jpg', brick:'textures/brick.jpg', sheep:'textures/sheep.jpg', wheat:'textures/wheat.jpg',
  // ore:'textures/ore.jpg', desert:'textures/desert.jpg', sea:'textures/sea.jpg', table:'textures/table.jpg'
 }),
 sounds:Object.freeze({
  // roll:'sounds/roll.mp3', build:'sounds/build.mp3', card:'sounds/card.mp3', robber:'sounds/robber.mp3',
  // turn:'sounds/turn.mp3', win:'sounds/win.mp3', music:'sounds/music.mp3'
 })});
for(const k in ART)delete ART[k];
for(const k in CFG.sounds)ART['s_'+k]=CFG.sounds[k];
Object.freeze(ART);
try{showFiles=()=>{}}catch(e){}
try{window.showFiles=()=>{}}catch(e){}
const st=document.createElement('style');
st.textContent='button[onclick*="showFiles"],input[type=file]{display:none!important}';
document.head.appendChild(st);
const RND=Math.random,TAU=Math.PI*2,rs=s=>{s=Math.sin(s*127.1+311.7)*43758.5453;return s-Math.floor(s)};
/* ================= TEXTURY (kreslené do canvasu) ================= */
function mk(k){const S=256,c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');x.scale(2,2);
 const R=(a,b)=>a+RND()*(b-a),fill=o=>{x.globalAlpha=1;x.fillStyle=o;x.fillRect(0,0,S,S)},
 blob=(col,a,r,n)=>{x.fillStyle=col;x.globalAlpha=a;for(let i=0;i<n;i++){x.beginPath();x.arc(R(0,S),R(0,S),R(r/2,r),0,TAU);x.fill()}},
 crack=(col,n)=>{x.strokeStyle=col;x.lineWidth=1.4;x.globalAlpha=.55;for(let i=0;i<n;i++){let X=R(0,S),Y=R(0,S);x.beginPath();x.moveTo(X,Y);for(let j=0;j<4;j++){X+=R(-14,14);Y+=R(-14,14);x.lineTo(X,Y)}x.stroke()}},
 vig=()=>{const g=x.createRadialGradient(S/2,S/2,S*.25,S/2,S/2,S*.72);g.addColorStop(0,'rgba(255,255,220,.12)');g.addColorStop(1,'rgba(0,0,0,.24)');x.globalAlpha=1;x.fillStyle=g;x.fillRect(0,0,S,S)};
 if(k=='wood'){fill('#2d5a2c');blob('#1b3d1c',.5,40,40);blob('#4d8a3c',.35,30,30);
  for(let i=0;i<90;i++){const X=R(0,S),Y=R(0,S),r=R(8,17),g=x.createRadialGradient(X-r*.3,Y-r*.3,1,X,Y,r);g.addColorStop(0,'#6fb04a');g.addColorStop(.6,'#2f6a2c');g.addColorStop(1,'#17381a');x.globalAlpha=.95;x.fillStyle=g;x.beginPath();x.arc(X,Y,r,0,TAU);x.fill()}vig()}
 else if(k=='brick'){fill('#b76a40');for(let i=0;i<14;i++){x.globalAlpha=.5;x.strokeStyle=i%2?'#8a4526':'#d98d5c';x.lineWidth=R(3,9);x.beginPath();for(let a=0;a<=TAU+.1;a+=.2){const rr=18+i*9+Math.sin(a*3+i)*5;x[a?'lineTo':'moveTo'](S/2+Math.cos(a)*rr,S/2+Math.sin(a)*rr)}x.stroke()}
  blob('#6e341b',.35,8,60);blob('#efb07f',.3,6,50);crack('#5a2a14',22);vig()}
 else if(k=='sheep'){fill('#86bb52');blob('#a9d86c',.4,50,25);blob('#5f9a3a',.35,45,25);x.lineWidth=1.3;
  for(let i=0;i<700;i++){const X=R(0,S),Y=R(0,S);x.strokeStyle=RND()<.5?'#4c8a2e':'#c4ee86';x.globalAlpha=.6;x.beginPath();x.moveTo(X,Y);x.lineTo(X+R(-2,2),Y-R(4,9));x.stroke()}
  for(let i=0;i<46;i++){x.globalAlpha=1;x.fillStyle=['#fff','#ffe36b','#ff9fc1','#cfa4ff'][i%4];x.beginPath();x.arc(R(0,S),R(0,S),R(1.6,3),0,TAU);x.fill()}vig()}
 else if(k=='wheat'){fill('#d9b24b');for(let y=-S;y<S*2;y+=16){x.globalAlpha=.5;x.fillStyle=(y/16|0)%2?'#a87f24':'#f4d878';x.beginPath();x.moveTo(-20,y);for(let X=-20;X<=S+20;X+=16)x.lineTo(X,y+X*.5+Math.sin(X/20)*3);x.lineTo(S+20,y+S*.5+8);x.lineTo(-20,y+8);x.fill()}
  for(let i=0;i<500;i++){x.globalAlpha=.7;x.fillStyle=RND()<.5?'#fbe9a0':'#8f6a1c';x.beginPath();x.ellipse(R(0,S),R(0,S),1.3,3.2,.4,0,TAU);x.fill()}vig()}
 else if(k=='ore'){fill('#6d7378');for(let i=0;i<70;i++){const X=R(0,S),Y=R(0,S);x.globalAlpha=.85;x.fillStyle=`hsl(210,${R(2,9)}%,${R(30,62)}%)`;x.beginPath();x.moveTo(X,Y);x.lineTo(X+R(-30,30),Y+R(-30,30));x.lineTo(X+R(-30,30),Y+R(-30,30));x.fill()}
  crack('#2c3034',26);blob('#9fd3ff',.8,2,40);blob('#fff',.7,1.5,50);vig()}
 else if(k=='desert'){fill('#e2cd92');for(let i=0;i<12;i++){x.strokeStyle=i%2?'#c9ae6a':'#f3e4b4';x.globalAlpha=.55;x.lineWidth=R(3,8);x.beginPath();for(let X=-10;X<=S+10;X+=8)x[X<0?'moveTo':'lineTo'](X,i*24+Math.sin(X/28+i)*10+X*.15);x.stroke()}
  blob('#b99a5c',.4,1.6,260);blob('#fff6d6',.5,1.4,160);vig()}
 else if(k=='sea'){const g=x.createLinearGradient(0,0,0,S);g.addColorStop(0,'#1f86c0');g.addColorStop(1,'#2aa6d6');x.fillStyle=g;x.fillRect(0,0,S,S);
  for(let r=0;r<16;r++){x.strokeStyle=r%2?'rgba(255,255,255,.28)':'rgba(10,60,110,.28)';x.lineWidth=R(1.5,3.5);x.beginPath();for(let X=0;X<=S;X+=4){const Y=r*16+8+Math.sin(X/S*TAU*(2+r%3)+r)*5;x[X?'lineTo':'moveTo'](X,Y)}x.stroke()}blob('#fff',.35,1.8,90)}
 else{fill('#6b4423');for(let p=0;p<4;p++){const Y=p*S/4;x.globalAlpha=.5;x.fillStyle=`hsl(26,${R(40,55)}%,${R(22,34)}%)`;x.fillRect(0,Y,S,S/4);x.globalAlpha=.4;x.strokeStyle='#2c1a0a';x.lineWidth=1;
  for(let i=0;i<14;i++){const yy=Y+R(3,S/4-3);x.beginPath();x.moveTo(0,yy);for(let X=0;X<=S;X+=16)x.lineTo(X,yy+Math.sin(X/S*TAU*2+i)*2);x.stroke()}x.globalAlpha=1;x.fillStyle='#24140a';x.fillRect(0,Y,S,2.5)}}
 for(let i=0;i<4000;i++){x.globalAlpha=.07;x.fillStyle=RND()<.5?'#000':'#fff';x.fillRect(R(0,S),R(0,S),.9,.9)}
 x.globalAlpha=1;return c.toDataURL()}
def=function(k){const u=CFG.textures[k]||CFG.textures[k.replace(/^(hex|card)_/,'')];if(u)return u;k=k.replace(/^(hex|card)_/,'');return DEFC[k]||(DEFC[k]=mk(k))};
for(const k in DEFC)delete DEFC[k];

/* ================= 3D: modely na dlaždicích, obloha, částice ================= */
let mt,GM,sky,skyT,part,pos,vel,W2,clouds=[],lastQ=-1;
const init=()=>{if(mt)return;const M=(c,r=.8)=>new THREE.MeshStandardMaterial({color:c,roughness:r});
 mt={trunk:M('#5b3a1e'),p1:M('#1f6b34'),p2:M('#2a8040'),p3:M('#3a9a4c'),clay:M('#c06a3e'),clay2:M('#9c522d'),brk:M('#d98a5a'),fur:M('#b98650'),fur2:M('#8a5e32'),ant:M('#3a2a1a'),bush:M('#3f8a3a'),bush2:M('#5aa84a'),ws:M('#c9a23a'),wh:M('#f0cf5c'),rock:M('#7b8086'),rock2:M('#5f656b'),snow:M('#f3f6fa'),cac:M('#3f8f4a'),sand:M('#dcc58a',.95),plaster:M('#eadcb8',.9),timber:M('#6b4a2b'),stone:M('#8c8f93',.95),stone2:M('#b9b2a2',.9),door:M('#4a2c14'),pole:M('#cfcfd4',.4),win:new THREE.MeshStandardMaterial({color:'#ffd27a',roughness:.4,emissive:'#ffb347',emissiveIntensity:.9}),cry:new THREE.MeshStandardMaterial({color:'#7fd0ff',roughness:.2,emissive:'#2b7fb8',emissiveIntensity:.6})};
 const gab=new THREE.BufferGeometry();gab.setAttribute('position',new THREE.Float32BufferAttribute([-.5,0,-.5,.5,0,-.5,0,1,-.5,-.5,0,.5,.5,0,.5,0,1,.5],3));gab.setIndex([0,1,2,3,5,4,0,2,5,0,5,3,1,4,5,1,5,2]);gab.computeVertexNormals();
 GM={gab,cone8:new THREE.ConeGeometry(1,1,8),cone:new THREE.ConeGeometry(1,1,7),cyl:new THREE.CylinderGeometry(1,1,1,8),sph:new THREE.SphereGeometry(1,10,8),box:new THREE.BoxGeometry(1,1,1),dod:new THREE.DodecahedronGeometry(1,0),oct:new THREE.OctahedronGeometry(1,0)}};
const P=(g,m,x,y,z,sx,sy,sz,p)=>{const o=new THREE.Mesh(GM[g],typeof m=='string'?mt[m]:m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=o.receiveShadow=true;p.add(o);return o};
const MK={
 wood:(g,r)=>{const s=r(1)*.5+.9;P('cyl','trunk',0,1.5,0,.9,3,.9,g);P('cone','p1',0,5,0,5*s,7*s,5*s,g);P('cone','p2',0,8.5*s,0,4*s,6*s,4*s,g);P('cone','p3',0,12*s,0,2.8*s,5*s,2.8*s,g)},
 brick:(g,r)=>{const s=r(2)*.6+.8;P('sph','clay',0,0,0,9*s,5*s,9*s,g);P('sph','clay2',3,2,2,5*s,3*s,5*s,g);for(let i=0;i<3;i++)P('box','brk',-6+i*4.2,.9,6,3.6,1.8,2.2,g)},
 sheep:g=>{P('box','fur',0,6.2,0,7,3.6,3,g);P('cyl','fur',3.6,8.4,0,1,3.2,1,g).rotation.z=-.5;P('sph','fur',5.1,10.1,0,1.7,1.5,1.5,g);
  [[-2.5,-1],[2.5,-1],[-2.5,1],[2.5,1]].forEach(([a,b])=>P('cyl','fur2',a,2.4,b,.45,4.8,.45,g));P('cone','ant',4.8,12.2,-.9,.4,2.6,.4,g);P('cone','ant',4.8,12.2,.9,.4,2.6,.4,g);P('sph','ant',-3.6,6.6,0,.8,.8,.8,g)},
 bush:g=>{P('sph','bush',0,1.8,0,3,2.4,3,g);P('sph','bush2',2,1.2,1,2,1.6,2,g)},
 wheat:(g,r)=>{for(let i=0;i<5;i++)for(let j=0;j<4;j++){const h=5+r(i*9+j)*2,X=i*2.2-4.4,Z=j*2.2-3.3;P('cyl','ws',X,h/2,Z,.18,h,.18,g);P('sph','wh',X,h+.4,Z,.7,1.6,.7,g)}},
 ore:g=>{P('dod','rock',0,3,0,5,4,5,g);P('dod','rock2',4,2,3,3,2.5,3,g);P('cone','rock2',-3,7,-2,3.5,11,3.5,g);P('cone','snow',-3,11.8,-2,1.6,3,1.6,g);P('oct','cry',5,2.5,-4,1.2,3.5,1.2,g)},
 cac:g=>{P('cyl','cac',0,5,0,1.5,10,1.5,g);P('cyl','cac',2.3,6,0,.9,4,.9,g);P('cyl','cac',-2.3,4.4,0,.9,3.4,.9,g)},
 dune:g=>P('sph','sand',0,0,0,8,2.6,6,g)};
const RM={};
const roof=o=>RM[o]||(RM[o]=new THREE.MeshStandardMaterial({color:PC[o],roughness:.7,flatShading:true,side:THREE.DoubleSide}));
function bld(o,city,i){const g=new THREE.Group(),r=roof(o);
 if(!city){P('box','stone',0,1,0,12.5,2,10.5,g);P('box','plaster',0,5,0,10,6,8,g);
  [[-5,-4],[5,-4],[-5,4],[5,4]].forEach(([a,b])=>P('box','timber',a,5,b,.9,6.2,.9,g));P('box','timber',0,7.6,4.05,10,.7,.3,g);P('box','timber',0,3,4.05,10,.5,.3,g);
  P('gab',r,0,8,0,13.5,5.2,11,g);P('box','stone',3.2,11.2,-2,1.7,4,1.7,g);
  P('box','door',-1.8,3.2,4.1,2.2,3.4,.4,g);P('box','win',3,5.4,4.1,1.8,1.8,.4,g);P('box','win',-5.05,5.4,0,.4,1.8,1.8,g);P('box','win',5.05,5.4,0,.4,1.8,1.8,g);P('box','stone',-1.8,.9,5,3,.6,1.6,g)}
 else{P('box','stone',0,1,0,24,2,16,g);P('box','stone2',2,7,0,14,10,10,g);P('gab',r,2,12,0,16.5,6.5,12,g);
  P('box','stone2',-8,12,0,8,20,8,g);for(let a=0;a<4;a++)P('box','stone',-8+(a%2?3.1:-3.1),22.6,(a>1?3.1:-3.1),2,2.4,2,g);P('cone8',r,-8,28,0,6,8.5,6,g);
  P('cyl','pole',-8,35,0,.35,9,.35,g);P('box',r,-5.6,37.6,0,4.8,2.6,.25,g);
  P('box','stone2',12,5,0,7,6,8,g);P('gab',r,12,8,0,8,4,9,g);
  P('box','door',2,3.6,5.1,3.4,4.6,.5,g);[[-2,8],[6,8],[-8,14],[-8,19],[-8.1,9],[12.1,5.6]].forEach(([a,b])=>P('box','win',a,b,5.1,1.7,2.2,.4,g));P('box','win',-8,15,4.1,1.7,2.2,.4,g);P('box','win',-8,20,4.1,1.7,2.2,.4,g);
  g.scale.set(.72,.72,.72)}
 g.rotation.y=rs(i*3.7)*TAU;return g}
const PLAN={wood:[['wood',7]],brick:[['brick',3]],sheep:[['sheep',2],['bush',4]],wheat:[['wheat',3]],ore:[['ore',2]],desert:[['cac',2],['dune',2]]};
const SKY=[['#9fd8ff','#e8f7ff'],['#4aa8f0','#bfe6ff'],['#e8a860','#ffe3b8'],['#7f9fc8','#e8f1fa']];
function paintSky(q){const c=skyT.image,x=c.getContext('2d'),g=x.createLinearGradient(0,0,0,c.height);g.addColorStop(0,SKY[q][0]);g.addColorStop(.55,SKY[q][1]);g.addColorStop(1,SKY[q][1]);x.fillStyle=g;x.fillRect(0,0,c.width,c.height);skyT.needsUpdate=true}
const soft=(n,s)=>{const c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d'),g=x.createRadialGradient(n/2,n/2,n*.03,n/2,n/2,n*.48);g.addColorStop(0,s);g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,n,n);return new THREE.CanvasTexture(c)};
const _b=build3d;
build3d=function(){_b();try{init();for(const t in HM){HM[t].bumpMap=HM[t].map;HM[t].bumpScale=2.2;HM[t].needsUpdate=true}
 ren.setPixelRatio(Math.min(devicePixelRatio||1,2));ren.toneMapping=THREE.ACESFilmicToneMapping;ren.toneMappingExposure=1.15;sun.shadow.mapSize.set(2048,2048);hemi.intensity=.65;
 H.forEach((h,i)=>{const grp=new THREE.Group(),lst=PLAN[h.t],tot=lst.reduce((a,b)=>a+b[1],0);let j=0;grp.position.set(h.x,7,h.y);
  lst.forEach(([k,n])=>{for(let q=0;q<n;q++,j++){const sd=i*37+j*11,a=TAU*j/tot+rs(sd)*.9,rr=19+rs(sd+1)*12,g=new THREE.Group();MK[k](g,o=>rs(sd+o+2));g.position.set(Math.cos(a)*rr,0,Math.sin(a)*rr);g.rotation.y=rs(sd+3)*TAU;grp.add(g)}});
  scene.add(grp);h.props=grp});
 const c=document.createElement('canvas');c.width=4;c.height=256;skyT=new THREE.CanvasTexture(c);paintSky(0);
 sky=new THREE.Mesh(new THREE.SphereGeometry(2500,24,16),new THREE.MeshBasicMaterial({map:skyT,side:THREE.BackSide,fog:false,depthWrite:false}));scene.add(sky);
 const ct=soft(128,'rgba(255,255,255,.85)');
 for(let i=0;i<12;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:ct,transparent:true,opacity:.55,depthWrite:false,fog:false}));s.position.set(rs(i)*1800-900,420+rs(i+5)*160,rs(i+9)*1800-900);s.scale.set(380+rs(i+2)*260,140,1);scene.add(s);clouds.push(s)}
 const N=450;pos=new Float32Array(N*3);vel=new Float32Array(N*2);for(let i=0;i<N;i++){pos[i*3]=rs(i)*700-350;pos[i*3+1]=rs(i+1)*320;pos[i*3+2]=rs(i+2)*700-350;vel[i*2]=.4+rs(i+3)*.8;vel[i*2+1]=rs(i+4)*TAU}
 const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
 part=new THREE.Points(pg,new THREE.PointsMaterial({map:soft(32,'#fff'),size:7,transparent:true,depthWrite:false,fog:false}));part.frustumCulled=false;scene.add(part);
 W2=new THREE.Mesh(new THREE.CircleGeometry(250,6),new THREE.MeshBasicMaterial({map:tex('sea',3),transparent:true,opacity:.22,blending:THREE.AdditiveBlending,depthWrite:false}));W2.rotation.x=-Math.PI/2;W2.position.y=2.1;scene.add(W2)}catch(e){rep(e,'build3d')}};
const _d=draw3d;
draw3d=function(m,c){_d(m,c);try{const q=G.season||0,sn=SEAS[q];
 if(lastQ!=q&&skyT&&part){lastQ=q;paintSky(q);scene.fog.color.set(SKY[q][1]);scene.fog.near=1500;scene.fog.far=3200;ren.setClearColor(SKY[q][1]);
  part.material.color.set([0xffc2d8,0xfff2a0,0xe9893a,0xffffff][q]);part.material.blending=q==1?THREE.AdditiveBlending:THREE.NormalBlending;part.material.size=[7,5,9,6][q];part.material.needsUpdate=true}
 const kk=(x,z)=>Math.round(x*10)+','+Math.round(z*10),vk={};V.forEach(v=>vk[kk(v.x,v.y)]=1);
 dyn.children.filter(ch=>ch.isGroup&&vk[kk(ch.position.x,ch.position.z)]).forEach(ch=>dyn.remove(ch));
 V.forEach(v=>{const o=vo(v);if(o<0)return;const g=bld(o,!!G.vc[v.i],v.i);g.position.set(v.x,7,v.y);dyn.add(g)});
 H.forEach(h=>{const d=sn.down.includes(h.t);if(h.props)h.props.visible=!d;if(d){const o=mesh(gTile,pm('#07070a',.95),h.x,3.7,h.y,dyn);o.scale.set(1.002,1.02,1.002);o.castShadow=false}})}catch(e){rep(e,'draw3d')}};
loop=function(t){requestAnimationFrame(loop);const s=t/1000,w=cv.clientWidth,h=cv.clientHeight;
 if(w!=lw||h!=lh){lw=w;lh=h;ren.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
 HOT.opacity=.35+.3*Math.abs(Math.sin(s*3));torch.intensity=.9+.25*Math.sin(s*9)+.15*Math.sin(s*23);
 try{if(mWater&&mWater.map)mWater.map.offset.x=(s*.004)%1;if(W2&&W2.material.map)W2.material.map.offset.set((-s*.006)%1,(s*.003)%1);
 if(part){const q=G&&G.season||0,a=part.geometry.attributes.position,sp=[10,5,14,22][q],dir=q==3?-1:-.5;
  for(let i=0;i<pos.length/3;i++){pos[i*3+1]+=q==1?Math.sin(s+vel[i*2+1])*.1:dir*vel[i*2]*sp*.016;pos[i*3]+=Math.sin(s*.8+vel[i*2+1])*(q==1?.07:.15);if(pos[i*3+1]<-5)pos[i*3+1]=320;if(pos[i*3+1]>330)pos[i*3+1]=0}a.needsUpdate=true}
 clouds.forEach((c,i)=>{c.position.x+=.05+i*.004;if(c.position.x>1000)c.position.x=-1000});}catch(e){}
 const d=cam.d*Math.max(1,1.25/camera.aspect);camera.position.set(d*Math.sin(cam.ph)*Math.sin(cam.th),d*Math.cos(cam.ph),d*Math.sin(cam.ph)*Math.cos(cam.th));camera.lookAt(0,0,0);ren.render(scene,camera)};

/* ================= ZVUKY (syntéza + dozvuk) ================= */
let MB=null;
const bus=()=>{AC=AC||new AudioContext();if(AC.state=='suspended')AC.resume();if(MB)return MB;
 const g=AC.createGain(),cv2=AC.createConvolver(),n=AC.sampleRate*1.8|0,b=AC.createBuffer(2,n,AC.sampleRate);
 for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<n;i++)d[i]=(RND()*2-1)*Math.pow(1-i/n,2.6)}
 cv2.buffer=b;const w=AC.createGain();w.gain.value=.3;g.connect(AC.destination);g.connect(cv2);cv2.connect(w);w.connect(AC.destination);return MB=g};
const T=(f,d,ty='sine',v=.15,t0=0,f2,lp)=>{const B=bus(),t=AC.currentTime+t0,o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);let n=o;if(lp){const l=AC.createBiquadFilter();l.type='lowpass';l.frequency.value=lp;o.connect(l);n=l}n.connect(g);g.connect(B);o.start(t);o.stop(t+d+.05)};
const Nz=(d,v,t0,f,q=1,ty='bandpass')=>{const B=bus(),t=AC.currentTime+t0,n=AC.sampleRate*d|0,b=AC.createBuffer(1,n,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(RND()*2-1)*Math.pow(1-i/n,2);
 const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=b;fl.type=ty;fl.frequency.value=f;fl.Q.value=q;g.gain.value=v;s.connect(fl);fl.connect(g);g.connect(B);s.start(t)};
const bell=(f,t0=0,v=.12,d=1.4)=>[[1,1],[2.76,.5],[5.4,.25]].forEach(([m,a])=>T(f*m,d/Math.sqrt(m),'sine',v*a,t0));
Object.assign(SYN,{
 roll:()=>{for(let i=0;i<14;i++){const t=i*.065+RND()*.03;Nz(.06,.35*(1-i/18),t,600+RND()*1800,2);if(i%2)T(180+RND()*120,.07,'triangle',.12*(1-i/16),t,90)}Nz(.12,.4,.95,500,1)},
 build:()=>{Nz(.09,.7,0,420,1.5);T(150,.18,'sine',.35,0,55);Nz(.09,.6,.17,520,1.5);T(170,.18,'sine',.3,.17,60);[523,659,784,1047].forEach((f,i)=>bell(f,.32+i*.08,.07,1))},
 card:()=>{Nz(.18,.25,0,6000,.7,'highpass');bell(1175,.08,.07,.7);bell(1568,.18,.06,.7)},
 robber:()=>{T(98,1.2,'sawtooth',.2,0,55,300);T(104,1.2,'sawtooth',.16,0,58,300);Nz(.9,.5,0,120,.6,'lowpass');bell(370,.2,.1,1.8);bell(262,.2,.1,1.8)},
 turn:()=>{bell(523,0,.16,1.6);bell(784,.22,.12,1.6)},
 win:()=>{[[392,523,659],[440,554,659],[523,659,784],[523,659,1047]].forEach((ch,i)=>ch.forEach(f=>{T(f,.7,'sawtooth',.07,i*.32,undefined,1800);T(f*2,.7,'triangle',.05,i*.32)}));bell(1047,1.3,.12,2.4)}});
/* hudba na pozadí: generovaná, mění se s ročním obdobím */
let GT=null,stp=0;const SC=[[0,2,4,7,9],[0,2,4,7,9],[0,3,5,7,10],[0,2,5,7,9]],RT=[261.6,196,220,293.7];
const pad=(f,d)=>{const B=bus(),t=AC.currentTime,l=AC.createBiquadFilter(),g=AC.createGain();l.type='lowpass';l.frequency.value=900;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.045,t+d*.4);g.gain.linearRampToValueAtTime(0,t+d);
 [-6,6].forEach(c=>{const o=AC.createOscillator();o.type='triangle';o.frequency.value=f;o.detune.value=c;o.connect(l);o.start(t);o.stop(t+d+.1)});l.connect(g);g.connect(B)};
const gen=()=>{if(!AC||AC.state!='running'||muted)return;const q=G&&G.season||0,r=RT[q],sc=SC[q],nt=i=>r*Math.pow(2,sc[((i%5)+5)%5]/12);
 if(stp%3==0){const b=stp/3|0;[0,2,4].forEach(i=>pad(nt(b+i)/2,5.2))}
 if(RND()<.75)T(nt(RND()*5|0)*(RND()<.5?2:1),1.3,'triangle',.05,RND()*.8,undefined,2400);
 if(q==3&&RND()<.5)bell(nt(RND()*5|0)*4,RND()*.8,.025,1.8);
 if(q==0&&RND()<.3)T(2200+RND()*1500,.15,'sine',.02,RND(),3000);stp++};
music=function(){if(mus){mus.pause();mus=null}if(GT){clearInterval(GT);GT=null}if(muted)return;
 if(ART.s_music){mus=new Audio(ART.s_music);mus.loop=true;mus.volume=.35;mus.play().catch(()=>0);return}
 try{bus()}catch(e){return}GT=setInterval(gen,1700);gen()};
addEventListener('pointerdown',()=>{if(!GT&&!mus&&!muted)music()},{once:true});
applyArt();
})();
