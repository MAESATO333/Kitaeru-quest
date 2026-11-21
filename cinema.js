// キタエル・クエスト ミドリ座（映画館）と絵本「畑の国の お野菜十勇士」全10話
// 元ファイル: project-files kitaeru-quest/ehon/src（art.js・ep01〜10.js・cinema-app.js）
// ===== 絵本のドット絵ツール（256x144 のキャンバスに描く） =====
const ART=(()=>{
let x,seed=1;
const W=256,H=144;
function use(ctx,s){x=ctx;x.imageSmoothingEnabled=false;seed=s||1;x.globalAlpha=1}
const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
const R=(a,b,w,h,c)=>{x.fillStyle=c;x.fillRect(Math.round(a),Math.round(b),Math.round(w),Math.round(h))};
const P=(a,b,c)=>R(a,b,1,1,c);
const disc=(cx,cy,r,c)=>{for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++)if(i*i+j*j<=r*r+r*.6)P(cx+i,cy+j,c)};
const oval=(cx,cy,rx,ry,c)=>{for(let j=-ry;j<=ry;j++)for(let i=-rx;i<=rx;i++)if((i*i)/(rx*rx)+(j*j)/(ry*ry)<=1.05)P(cx+i,cy+j,c)};
const alpha=(a,f)=>{x.globalAlpha=a;f();x.globalAlpha=1};
const glow=(cx,cy,r,c,a=.3)=>alpha(a,()=>{disc(cx,cy,r,c);disc(cx,cy,Math.round(r*.7),c)});
function sky(cols,h=H){const bh=Math.ceil(h/cols.length);cols.forEach((c,i)=>R(0,i*bh,W,bh,c));
  // バンドの境目をディザでなじませる
  cols.forEach((c,i)=>{if(!i)return;for(let k=0;k<W;k+=2)P(k+(i%2),i*bh-1,c)})}
function stars(n,h,cols=['#fff3a0','#ffffff']){for(let i=0;i<n;i++)P(rnd()*W,rnd()*h,cols[i%cols.length])}
function sun(cx,cy,r,c1='#ffe600',c2='#fff3a0'){glow(cx,cy,r+8,c1,.25);disc(cx,cy,r,c1);disc(cx,cy,Math.max(1,r-4),c2)}
function moon(cx,cy,r,bg){disc(cx,cy,r,'#fff3c8');disc(cx+Math.round(r*.5),cy-Math.round(r*.3),r,bg)}
function pine(tx,base,h,c,c2,trunk='#3a2a1a'){R(tx+5,base-h*.3,3,h*.3,trunk);const th=h*.78;for(let j=0;j<th;j++){const w=Math.max(1,(j/th)*9|0);R(tx+6-w,base-h+j,w*2+1,1,j%3?c:c2)}}
function bush(cx,cy,r,c,c2){disc(cx,cy,r,c);disc(cx-r*.6|0,cy+2,r*.7|0,c);disc(cx+r*.6|0,cy+2,r*.7|0,c);for(let i=0;i<r*2;i++)P(cx-r+rnd()*r*2,cy-r*.5+rnd()*r,c2)}
function roundTree(tx,base,r,c,c2,trunk='#6a4a2a'){R(tx-2,base-r*1.6,4,r*1.6,trunk);bush(tx,base-r*1.8|0,r,c,c2)}
function hills(y,amp,c,ph=0,f=.03){for(let i=0;i<W;i++){const h=y-Math.sin(i*f+ph)*amp-Math.sin(i*f*2.3+ph)*amp*.4;R(i,h,1,H-h,c)}}
function ground(y,c,c2,n=120){R(0,y,W,H-y,c);for(let i=0;i<n;i++)P(rnd()*W,y+1+rnd()*(H-y),c2)}
function field(y0,y1,c,leaf){for(let y=y0;y<y1;y+=4){R(0,y,W,2,c);for(let i=(y/4%2)*6;i<W;i+=12){P(i,y-1,leaf);P(i+1,y-2,leaf);P(i-1,y-2,leaf)}}}
function house(hx,hy,w,h,wall,roof,win='#ffe9a0'){R(hx,hy,w,h,wall);for(let j=0;j<=w/2+2;j++)R(hx-2+j,hy-j*.7-1,w+4-j*2,1,roof);R(hx+w/2-2,hy+h-6,4,6,'#6a4a2a');R(hx+2,hy+3,4,4,win);R(hx+w-6,hy+3,4,4,win)}
function fence(y,c='#c8a060'){for(let i=0;i<W;i+=6){R(i,y,1,6,c)}R(0,y+1,W,1,c);R(0,y+4,W,1,c)}
function path(cx,y0,y1,c,c2,top=6,grow=1.6,lean=0){for(let j=0;j<y1-y0;j++){const w=top+j*grow;R(cx-w/2+j*lean,y0+j,w,1,j%4?c:c2)}}
function sparkle(sx,sy,c='#ffffff'){P(sx,sy,c);P(sx-1,sy,c);P(sx+1,sy,c);P(sx,sy-1,c);P(sx,sy+1,c);P(sx-2,sy,'#fff3a0');P(sx+2,sy,'#fff3a0');P(sx,sy-2,'#fff3a0');P(sx,sy+2,'#fff3a0')}
function heart(hx,hy,c='#e8456a'){['.x.x.','xxxxx','xxxxx','.xxx.','..x..'].forEach((r,j)=>[...r].forEach((ch,i)=>{if(ch==='x')P(hx+i,hy+j,c)}))}
function shake(sx,sy,h,c='#ffffff'){for(let j=0;j<h;j+=3){P(sx,sy+j,c);P(sx+1,sy+j+1,c)}}
function speedLines(cx,cy,n,len,c,a=.6){alpha(a,()=>{x.fillStyle=c;for(let i=0;i<n;i++){const t=i/n*Math.PI*2,r0=len*.4;for(let k=0;k<len*.6;k++)P(cx+Math.cos(t)*(r0+k),cy+Math.sin(t)*(r0+k),c)}})}
// 十勇士（アプリと同じドット絵）
const cache={};
function heroImg(key){if(cache[key])return cache[key];const c=document.createElement('canvas');drawHero(c,HEROES.find(h=>h.key===key));return cache[key]=c}
function hero(key,hx,hy,s=2,flip=false){const im=heroImg(key);x.save();if(flip){x.translate(Math.round(hx)+27*s,Math.round(hy));x.scale(-1,1);x.drawImage(im,0,0,27*s,22*s)}else x.drawImage(im,Math.round(hx),Math.round(hy),27*s,22*s);x.restore()}
function blush(hx,hy,s=2){alpha(.8,()=>{R(hx,hy,3*s,s,'#ff5a7a')})}
// 子うさぎ（k=ピョン太の葉っぱスカーフ）
const BUN=['.w..w.','.wp.wp','.w..w.','wwwwww','wewwew','wwnnww','.wwww.','.w..w.'];
const BUNP=['.w..w.','.wp.wp','.w..w.','wwwwww','wewwew','wwnnww','kkkkkk','.wwww.','.w..w.'];
function bunny(bx,by,c='#ffffff',s=2,flip=false,pyon=false,face='e'){s=Math.max(1,Math.round(s));bx=Math.round(bx);by=Math.round(by);const m=pyon?BUNP:BUN;m.forEach((r,j)=>[...r].forEach((ch,i)=>{if(ch==='.')return;let col={w:c,p:'#ff8fa8',e:'#1f1a14',n:'#e8456a',k:'#4f9a2a'}[ch];if(ch==='e'&&face==='x')col=c;R(bx+(flip?5-i:i)*s,by+j*s,s,s,col)}));if(face==='x'){/* ぎゅっと目 */R(bx+0*s,by+4*s,2*s,s*.5,'#1f1a14');R(bx+4*s,by+4*s,2*s,s*.5,'#1f1a14')}if(pyon){P(bx+(flip?0:5)*s+s,by+6*s,'#9ccc3c')}}
// 霧の魔物 モヤモヤン（mood: smile / sly / sleep / small）
function moya(mx,my,s=1,mood='sly',cols=['#b8aed0','#cfc6e2','#e4def0','#d9d2ea']){
  const blobs=[[0,0,16],[-14,8,13],[16,10,12],[-26,18,9],[29,22,8]];
  blobs.forEach(([a,b,r],i)=>disc(mx+a*s,my+b*s,Math.round(r*s),cols[i%3]));
  [[0,0,12],[-12,8,9],[14,10,8]].forEach(([a,b,r])=>disc(mx+a*s,my+b*s,Math.round(r*s),cols[3]||cols[2]));
  const e=Math.max(1,Math.round(2*s)),ex=Math.round(6*s),ey=Math.round(-4*s);
  const ink='#3a2758';
  if(mood==='sleep'){R(mx-ex-e,my+ey+e,e*2,1,ink);R(mx+ex-e,my+ey+e,e*2,1,ink)}
  else{R(mx-ex-e,my+ey,e+1,e+1,ink);R(mx+ex-1,my+ey,e+1,e+1,ink);P(mx-ex-e,my+ey,'#ffffff');P(mx+ex-1,my+ey,'#ffffff')}
  if(mood==='sly'){R(mx-ex-e-1,my+ey-2,e+3,1,'#8a7aa8');R(mx+ex-2,my+ey-2,e+3,1,'#8a7aa8');R(mx-3*s,my+4*s,6*s,1,ink);P(mx-3*s-1,my+4*s-1,ink);P(mx+3*s,my+4*s-1,ink)}
  else{R(mx-2*s,my+4*s,4*s,1,ink);P(mx-2*s-1,my+4*s-1,ink);P(mx+2*s,my+4*s-1,ink)}
  R(mx-ex-e-3*s,my+ey+3*s,2*s,s,'#ff8fa8');R(mx+ex+2*s,my+ey+3*s,2*s,s,'#ff8fa8');
}
function mist(x0,y0,x1,y1,c,d=.25){for(let j=y0;j<y1;j++)for(let i=x0;i<x1;i++)if((i+j)%3===0&&rnd()<d)P(i,j,c)}
function sign(sx,sy,w,h,board='#c8a060',post='#6a4a2a'){R(sx+w/2-1,sy+h,2,10,post);R(sx,sy,w,h,board);R(sx,sy,w,1,'#e8c890');R(sx,sy+h-1,w,1,'#8a6a3a')}
function lantern(lx,ly){R(lx,ly-6,1,6,'#6a4a2a');glow(lx,ly+2,7,'#ffe600',.25);R(lx-2,ly,5,5,'#f39a1e');R(lx-1,ly+1,3,3,'#ffe600')}
function footprints(pts,c){pts.forEach(([a,b])=>{P(a,b,c);P(a+1,b,c);P(a,b-1,c)})}

// ---- 追加の 小道具 ----
function snow(n,c='#ffffff',y0=0,y1=H){for(let i=0;i<n;i++){const a=rnd()*W,b=y0+rnd()*(y1-y0);P(a,b,c);if(i%4==0){P(a+1,b,c);P(a,b+1,c)}}}
function snowGround(y,c='#f4f8ff',c2='#dfe8f4'){R(0,y,W,H-y,c);for(let i=0;i<W;i+=3){const h=Math.sin(i*.08)*2;R(i,y+h-1,3,2,c)}for(let i=0;i<80;i++)P(rnd()*W,y+3+rnd()*(H-y),c2)}
function castle(cx,base,w,h,wall='#cfd8e8',roof='#5a6aa8',win='#ffe9a0'){R(cx-w/2,base-h,w,h,wall);for(let i=0;i<w;i+=6)R(cx-w/2+i,base-h-3,3,3,wall);
  [[-w/2-6,1.3],[w/2-2,1.3]].forEach(([dx,k])=>{R(cx+dx,base-h*k,8,h*k,wall);for(let j=0;j<8;j++)R(cx+dx+j*.5,base-h*k-j*1.2-1,8-j,1.2,roof)});
  R(cx-5,base-12,10,12,'#5a3a2a');R(cx-5,base-13,10,2,'#8a6a4a');[[-w/2+6,-h+8],[w/2-12,-h+8],[-4,-h+6]].forEach(([a,b])=>R(cx+a,base+b,5,6,win))}
function crow(cx,cy,s=1,flip=false){const m=['..kk...','.kkkk..','kkWkkyy','kkkkk..','.kkkkk.','..kkkkk','...k.k.'];m.forEach((r,j)=>[...r].forEach((ch,i)=>{if(ch==='.')return;R(cx+(flip?6-i:i)*s,cy+j*s,s,s,{k:'#2a2a3a',W:'#ffffff',y:'#f5d63d'}[ch])}))}
function person(px,py,s=2,body='#e8452c',hair='#4a3020',crown=false){s=Math.max(1,Math.round(s));px=Math.round(px);py=Math.round(py);// 村の人・王さま（シンプル）
  const m=['..hhh..','.hhhhh.','.hfffh.','.fefef.','..fff..','.bbbbb.','bbbbbbb','b.bbb.b','..b.b..','..d.d..'];
  m.forEach((r,j)=>[...r].forEach((ch,i)=>{if(ch==='.')return;R(px+i*s,py+j*s,s,s,{h:hair,f:'#ffd8b0',e:'#1f1a14',b:body,d:'#4a3a2a'}[ch])}));
  if(crown){[[1,-2],[3,-3],[5,-2],[1,-1],[2,-1],[3,-1],[4,-1],[5,-1],[3,-2]].forEach(([a,b])=>R(px+a*s,py+b*s,s,s,'#f5d63d'));R(px+3*s,py-3*s,s,s,'#e8452c')}}
function bed(bx,by,w,c='#9fb4e8'){R(bx,by,w,10,'#8a6a4a');R(bx+2,by-2,w-4,6,c);R(bx+2,by-4,10,4,'#ffffff');R(bx,by-8,3,18,'#6a4a2a')}
function pot(px,py,c='#3a3a4a',steam=true){R(px,py,18,10,c);R(px-2,py,22,2,'#5a5a6a');R(px+1,py+10,16,2,c);if(steam)alpha(.6,()=>{for(let k=0;k<3;k++)for(let j=0;j<10;j++)P(px+4+k*5+Math.round(Math.sin(j*.8+k)*1.5),py-2-j,'#ffffff')})}
function bowl(bx,by,c='#f39a1e'){R(bx,by,10,1,'#ffffff');R(bx+1,by+1,8,3,c);R(bx+2,by+4,6,1,c);alpha(.6,()=>{P(bx+3,by-2,'#ffffff');P(bx+6,by-3,'#ffffff');P(bx+4,by-4,'#ffffff')})}
function bug(bx,by,c='#7a9a3a',s=1){[[1,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2],[1,3],[3,3]].forEach(([a,b])=>R(bx+a*s,by+b*s,s,s,c));R(bx+1*s,by+1*s,s,s,'#1f1a14');R(bx+3*s,by+1*s,s,s,'#1f1a14');alpha(.6,()=>{R(bx-s,by,s,s,'#ffffff');R(bx+5*s,by,s,s,'#ffffff')})}
function wind(n,c='#ffffff',a=.6){alpha(a,()=>{for(let i=0;i<n;i++){const y=rnd()*H,x0=rnd()*W,l=10+rnd()*30;R(x0,y,l,1,c);R(x0+l,y-1,3,1,c)}})}
function blob(mx,my,s,cols,mood='sly',horns=null){moya(mx,my,s,mood,cols);if(horns){R(mx-10*s,my-16*s,3*s,5*s,horns);R(mx+7*s,my-16*s,3*s,5*s,horns)}}
function dragon(dx,dy,s=2,c='#8acf9a',c2='#5aa86a',sleepy=true){const m=['....ggg.....','...gGGGg....','..gGGGGGg...','..gGeGGeg...','..gGGGGGGgg.','...gGmmGGGGg','....gggGGGGg','..gggGGGGGg.','.gGGGGGGGg..','gGGGGGGGGg..','.gg.gg.gg...'];m.forEach((r,j)=>[...r].forEach((ch,i)=>{if(ch==='.')return;let col={g:c2,G:c,e:'#1f1a14',m:'#e8456a'}[ch];if(ch==='e'&&sleepy){R(dx+i*s,dy+j*s,s,s,c);R(dx+i*s-s*.3,dy+j*s+s*.6,s*1.6,Math.max(1,s*.3),'#1f1a14');return}R(dx+i*s,dy+j*s,s,s,col)}));R(dx+4*s,dy-s,s,s,'#f5d63d');R(dx+6*s,dy-s,s,s,'#f5d63d')}
function oni(ox,oy,s=2,c='#8a8ab8'){const m=['.h.....h.','.hh...hh.','..ccccc..','.ccccccc.','ccecccecc','ccccccccc','cccmmmccc','.ccccccc.','.ccccccc.','..c...c..'];m.forEach((r,j)=>[...r].forEach((ch,i)=>{if(ch==='.')return;R(ox+i*s,oy+j*s,s,s,{h:'#f5d63d',c,e:'#1f1a14',m:'#5a3a6a'}[ch])}));alpha(.6,()=>{R(ox+2*s,oy+5*s,s*1.5,s*.6,'#5a5a8a');R(ox+6*s,oy+5*s,s*1.5,s*.6,'#5a5a8a')})}
function table(tx,ty,w){R(tx,ty,w,3,'#c8a060');R(tx,ty+3,w,1,'#8a6a3a');R(tx+2,ty+4,2,10,'#8a6a3a');R(tx+w-4,ty+4,2,10,'#8a6a3a')}
function letter(lx,ly){R(lx,ly,10,7,'#fffdf3');R(lx,ly,10,1,'#c8a060');P(lx+2,ly+2,'#c8a060');P(lx+3,ly+3,'#c8a060');P(lx+4,ly+4,'#e8452c');P(lx+5,ly+3,'#c8a060');P(lx+6,ly+2,'#c8a060');R(lx+1,ly+5,6,1,'#c8c0a0')}
function jar(jx,jy){R(jx,jy,6,7,'#f5b030');R(jx+1,jy-2,4,2,'#c8803a');P(jx+1,jy+1,'#fff3a0')}
function flagLine(y,cols=['#e8452c','#ffe600','#4f9a2a','#f39a1e','#9b2f5e']){R(0,y,W,1,'#8a6a3a');for(let i=0;i<W;i+=10){const c=cols[(i/10)%cols.length];for(let j=0;j<5;j++)R(i+2+j*.5,y+1+j,6-j,1,c)}}
function track(y,h){R(0,y,W,h,'#d8a878');for(let k=1;k<4;k++)for(let i=0;i<W;i+=4)R(i,y+k*h/4,2,1,'#ffffff')}
function sea(y,c='#3a9ad8',c2='#7ac8f0'){R(0,y,W,H-y,c);for(let i=0;i<60;i++)R(rnd()*W,y+2+rnd()*(H-y),4,1,c2)}
function umbrella(ux,uy,c='#e8452c'){for(let j=0;j<6;j++)R(ux-j*2,uy+j,j*4+1,1,c);R(ux,uy+6,1,12,'#6a4a2a')}
function sweat(sx,sy){P(sx,sy,'#9fd8ff');P(sx,sy+1,'#9fd8ff');P(sx-1,sy+2,'#9fd8ff');P(sx,sy+2,'#9fd8ff')}
function zz(zx,zy,c='#ffffff'){[[0,0],[1,0],[2,0],[1,1],[0,2],[1,2],[2,2]].forEach(([a,b])=>P(zx+a,zy+b,c));[[0,0],[1,0],[1,1],[0,2],[1,2]].forEach(([a,b])=>P(zx+5+a,zy-4+b,c))}
return {snow,snowGround,castle,crow,person,bed,pot,bowl,bug,wind,blob,dragon,oni,table,letter,jar,flagLine,track,sea,umbrella,sweat,zz,W,H,use,rnd,R,P,disc,oval,alpha,glow,sky,stars,sun,moon,pine,bush,roundTree,hills,ground,field,house,fence,path,sparkle,heart,shake,speedLines,hero,blush,bunny,moya,mist,sign,lantern,footprints,get x(){return x}};
})();

const EPISODES=[];
// ===== 第1話 くらやみ森の夜明け =====
EPISODES.push({no:1,hero:'carrot',title:'くらやみ森の夜明け',season:'秋の終わり',
lesson:'怖くても、一歩踏み出せば、道は見えてくる。',
power:{veg:'人参',items:[['β-カロテン','体の中でビタミンAに変わって、目・お肌・喉や鼻の粘膜を守るよ。暗い所で物を見る力も助けるんだ。'],['一口メモ','油と一緒に食べると、体に吸収されやすくなるよ。']]},
pages:[
{text:'ここは畑の国、ミドリ村。\n秋の終わりのある夕方、子うさぎのピョン太たちは、隣の森へ遊びに行きました。',
draw(A){const{R,P}=A;
 A.sky(['#5a7ac8','#7a8ad0','#a890c8','#d8909a','#f3a070','#f9c060']);
 A.sun(196,70,10,'#ffd040','#fff0a0');
 A.hills(78,5,'#7fae3a',0.4,.025);
 // 右おくの 森（すこし くらい）
 for(let i=0;i<7;i++)A.pine(170+i*13,96,30+A.rnd()*10,'#2f4a2a','#3a5a30');
 A.ground(92,'#9ccc3c','#b8dc5a');
 A.field(100,140,'#8a6a3a','#4f9a2a');
 // 村の いえ
 A.house(18,70,22,16,'#f3e2c0','#e8452c');A.house(50,74,18,13,'#f3e2c0','#9b2f5e');A.house(80,72,20,15,'#fff0d0','#f39a1e');
 A.roundTree(112,90,7,'#f39a1e','#ffc070');A.roundTree(130,92,6,'#e8452c','#ff9a80');
 A.path(150,92,144,'#d8b878','#c8a060',4,1.3,.9);
 A.fence(86);
 // 子うさぎ3びき（ピョン太は はっぱの スカーフ）
 A.bunny(150,104,'#ffffff',2,false,true);A.bunny(134,112,'#f4efe4',2);A.bunny(166,114,'#e8dcc0',2);
 [[146,124],[160,126]].forEach(([a,b])=>{P(a,b,'#ffffff');P(a+1,b-1,'#ffffff')});
 for(let i=0;i<10;i++)P(20+A.rnd()*200,10+A.rnd()*40,'#ffffff');
}},
{text:'そこへ、霧の魔物「モヤモヤン」が現れました。\n森は真っ暗。子うさぎたちは、お家に帰れなくなってしまいました。',
draw(A){const{R,P}=A;
 A.sky(['#141028','#1d1838','#241e44','#2a2450','#2a2450']);A.stars(25,40);
 for(let i=0;i<16;i++)A.pine(i*17-8,104,52+A.rnd()*20,'#1a2438','#202c42','#120e1a');
 A.ground(100,'#141e1a','#1c2a22');
 A.mist(0,40,256,144,'#8a80a8',.18);
 A.moya(160,52,1.6,'sly',['#9a90b8','#b0a6cc','#c8c0dc']);
 A.mist(80,60,256,120,'#b0a6cc',.22);
 // 根っこの かげで ふるえる 子うさぎ
 A.bunny(58,108,'#ffffff',2,false,true,'x');A.bunny(44,114,'#f4efe4',2,false,false,'x');A.bunny(72,116,'#e8dcc0',2,true,false,'x');
 A.shake(40,106,10);A.shake(88,108,10);
 for(let i=0;i<5;i++)R(30+i*14,132,10,2,'#2a1f1a');
}},
{text:'村のみんなは「夜が明けるまで待とう」と言いました。\nでも、キャロットは一人、剣を握りました。「待ってたら、あの子たちが寒いだろ！」\n本当は、暗い所が大の苦手。足はガクガク。でも、心は真っすぐでした。',
draw(A){const{R,P}=A;
 A.sky(['#1d2448','#26305a','#2e3a66','#36446e']);A.stars(40,50);A.moon(214,26,10,'#26305a');
 A.hills(90,6,'#24402a',1,.02);A.ground(100,'#2a4a24','#335a2a');
 A.house(8,72,26,20,'#a89878','#8a2f2a','#ffe9a0');A.house(200,76,24,18,'#a89878','#6a2a4a','#ffe9a0');
 A.lantern(48,62);A.lantern(186,64);
 // うしろで 心配そうな なかまたち
 A.hero('piman',40,64,1.5);A.hero('pumpkin',68,68,1.5);A.hero('cabbage',150,64,1.5);A.hero('broccoli',176,60,1.5);
 // まえに キャロット
 A.glow(128,108,18,'#f39a1e',.25);
 A.hero('carrot',101,82,2);
 A.shake(108,124,10,'#ffe600');A.shake(140,124,10,'#ffe600');
 // 汗
 P(102,90,'#9fd8ff');P(102,91,'#9fd8ff');P(101,92,'#9fd8ff');
}},
{text:'森の中で、キャロットは気付きました。\n体にたっぷり蓄えた“β-カロテン”のおかげで、暗い中でも目がよく見える！\n木の根っこも、子うさぎの小さな足跡も、ちゃんと見えました。',
draw(A){const{R,P}=A;
 A.sky(['#141028','#1a1634','#201c3e','#241f44']);A.stars(20,30);
 for(let i=0;i<15;i++)A.pine(i*18-6,100,56+A.rnd()*16,'#1a2438','#202c42','#120e1a');
 A.ground(98,'#141e1a','#1c2a22');
 A.mist(0,30,256,100,'#6a6088',.12);
 // 見える ところだけ あかるく
 A.alpha(.35,()=>{A.x.fillStyle='#f39a1e';A.x.beginPath();A.x.moveTo(70,92);A.x.lineTo(256,96);A.x.lineTo(256,144);A.x.lineTo(110,144);A.x.fill()});
 // 根っこ（オレンジの ふちどりで 見える）
 [[140,112,40],[190,124,46],[120,132,30]].forEach(([a,b,w])=>{R(a,b,w,3,'#5a3a1a');R(a,b-1,w,1,'#ffc070');R(a+w-4,b+3,3,3,'#5a3a1a')});
 A.footprints([[150,106],[162,110],[174,106],[186,110],[198,106],[212,110],[226,106]],'#fff3a0');
 A.hero('carrot',46,78,2);
 // 目が キラッ
 A.sparkle(62,93,'#ffffff');A.sparkle(74,93,'#ffffff');
 A.alpha(.4,()=>{R(76,94,60,1,'#ffe600');R(76,96,70,1,'#ffe600')});
 // とおくに ピョン太の しっぽ
 A.bunny(238,102,'#ffffff',1,true,true);
}},
{text:'モヤモヤンが囁きます。「どうせ迷うぞ〜」\nキャロットは叫びました。「迷ったら、取りあえず一歩！」',
draw(A){const{R,P}=A;
 A.sky(['#1d1838','#2a1f4a','#3a2758','#56306a','#7a3d6e','#a8526a','#d8705a','#f39a1e'],72);
 A.stars(40,30);A.sun(200,74,14);
 A.alpha(.3,()=>{for(let k=0;k<6;k++){A.x.fillStyle=k%2?'#ffe600':'#f39a1e';A.x.beginPath();A.x.moveTo(98,62);A.x.lineTo(256,40+k*14);A.x.lineTo(256,48+k*14);A.x.fill()}});
 for(let i=0;i<14;i++)A.pine(i*20-6,98,46+A.rnd()*14,'#24304a','#2c3a56');
 A.ground(98,'#1f3a1a','#2f5a22');
 A.path(118,98,144,'#5a7a2a','#4f6a24',8,1.6,.6);
 for(let i=0;i<4;i++)A.pine([2,30,214,238][i],144,80+A.rnd()*20,'#1a2a20','#203424');
 A.moya(176,64,1,'sly');A.mist(120,55,230,100,'#cfc6e2',.25);
 [[130,44],[136,40],[142,44]].forEach(([a,b])=>A.disc(a,b,2,'#e4def0'));
 A.glow(84,96,26,'#ffe600',.2);A.glow(84,96,18,'#f39a1e',.3);
 A.hero('carrot',58,74,2);
 A.sparkle(98,52);
 A.bunny(16,112,'#ffffff',2,false,true);A.bunny(30,116,'#f4efe4',2);A.bunny(43,113,'#e8dcc0',2);
}},
{text:'キャロットが剣を振ると――\n「キャロット・スラッシュ！」\nオレンジの光が霧を切り裂き、森に朝の光が差し込みました。',
draw(A){const{R,P}=A;
 A.sky(['#f9c060','#ffd878','#ffe8a0','#fff3c0'],100);
 A.sun(190,58,22,'#ffe600','#fff8d0');
 A.speedLines(190,58,24,90,'#ffffff',.35);
 for(let i=0;i<14;i++)A.pine(i*20-6,100,46+A.rnd()*14,'#3f7a2a','#4f8a2a','#5a3a1a');
 A.ground(98,'#7fbf2a','#9ccc3c');
 // 切りさかれた きり（左右に ちぎれて にげていく）
 A.moya(232,40,.55,'sleep');A.moya(250,86,.4,'smile');
 A.alpha(.6,()=>{for(let k=0;k<5;k++)A.disc(230+k*6,60+k*5,4,'#e4def0')});
 // 剣の 光の 大きな ななめ線
 A.alpha(.85,()=>{A.x.fillStyle='#f39a1e';A.x.beginPath();A.x.moveTo(40,130);A.x.lineTo(250,10);A.x.lineTo(256,22);A.x.lineTo(56,140);A.x.fill()});
 A.alpha(.9,()=>{A.x.fillStyle='#fff3a0';A.x.beginPath();A.x.moveTo(52,132);A.x.lineTo(252,16);A.x.lineTo(254,20);A.x.lineTo(56,136);A.x.fill()});
 A.hero('carrot',20,88,2);
 for(let i=0;i<8;i++)A.sparkle(80+i*22,96-i*12);
 A.bunny(150,118,'#ffffff',2,false,true);A.heart(166,112);
}},
{text:'子うさぎたちを背中に乗せて、村へ帰ったキャロット。\n「ありがとう！」と言われると、真っ赤になって――\n「べ、別に、ちょっと散歩してただけだ！」',
draw(A){const{R,P}=A;
 A.sky(['#9fd8ff','#b8e4ff','#d0eeff','#e8f8ff'],80);A.sun(40,30,10);
 A.hills(80,6,'#9ccc3c',2,.03);
 A.ground(96,'#b8dc5a','#9ccc3c');
 A.house(176,72,24,18,'#fff0d0','#e8452c');A.house(212,76,20,15,'#f3e2c0','#f39a1e');
 A.path(128,96,144,'#e8c890','#d8b878',30,3,0);
 A.hero('carrot',104,82,2);
 // せなかの 子うさぎ
 A.bunny(110,84,'#f4efe4',1.5);A.bunny(124,80,'#ffffff',1.5,false,true);A.bunny(138,84,'#e8dcc0',1.5,true);
 // まっか！
 A.alpha(.8,()=>{R(119,110,6,2,'#ff3a5a');R(135,110,6,2,'#ff3a5a')});
 [[152,92],[156,88],[160,92]].forEach(([a,b])=>{P(a,b,'#e8452c');P(a+1,b,'#e8452c')});
 // 村の ひとたち（ほかの 勇士）が むかえに
 A.hero('cabbage',186,94,1.5,true);A.hero('imo',30,96,1.5);
 A.heart(60,90);A.heart(210,86);
}},
{text:'その日から、くらやみ森は「夜明けの森」と呼ばれています。\nモヤモヤンも今では、朝の森を綺麗に見せる「朝もや」の仕事をしています。\nそしてピョン太は、お野菜十勇士の大ファンになりました。',
draw(A){const{R,P}=A;
 A.sky(['#ffd878','#ffe8a0','#d8f0b0','#c8ecff'],90);
 A.sun(128,60,16,'#ffe600','#fff8d0');
 for(let i=0;i<14;i++)A.pine(i*20-6,100,46+A.rnd()*14,'#4f8a2a','#6aa83a','#6a4a2a');
 A.alpha(.55,()=>{for(let i=0;i<30;i++)A.disc(A.rnd()*256,80+A.rnd()*20,3+A.rnd()*3|0,'#ffffff')});
 A.ground(98,'#9ccc3c','#b8dc5a');
 A.path(128,98,144,'#e8c890','#d8b878',10,2.2,0);
 // かんばん「夜明けの森」
 A.sign(150,100,34,14);R(156,104,6,6,'#f39a1e');R(164,106,14,2,'#6a4a2a');R(164,104,10,1,'#6a4a2a');R(164,109,12,1,'#6a4a2a');
 A.moya(214,42,.6,'smile');
 // ピョン太、キャロットの まねっこ（にんじんの 葉っぱを かかげる）
 A.hero('carrot',70,92,2);
 A.bunny(122,108,'#ffffff',2,true,true);
 R(122,98,2,10,'#6a4a2a');A.disc(123,96,3,'#7fbf2a');A.disc(121,94,2,'#4f9a2a');
 A.heart(136,100);A.sparkle(100,82);
}},
]});

// ===== 第2話 ひえひえ城の、秘密の任務（ジンジャー忍者） =====
(()=>{const ICE=['#9fd0e8','#bfe2f0','#dff2fa'];
const castleNight=(A)=>{A.sky(['#1a2440','#22304e','#2a3a5c','#34466a'],100);A.stars(30,50);A.moon(40,24,9,'#22304e');
 A.castle(150,104,70,40,'#b8c4dc','#4a5a98','#3a4a6a');A.snowGround(102);A.snow(70,'#ffffff',0,100)};
EPISODES.push({no:2,hero:'shoga',title:'ひえひえ城の、秘密の任務',season:'冬の初め',
lesson:'人知れず頑張る優しさも、ちゃんと誰かを温めている。',
power:{veg:'生姜',items:[['ジンゲロール','生の生姜に多い辛み成分。すっきりした香りで、食欲や消化を助けるよ。'],['ショウガオール','加熱したり乾かしたりすると増える成分。体を内側から温めるんだ。'],['一口メモ','少しの量で料理の香りと味がぐんと変わるから、塩を減らす工夫にもなるよ。']]},
pages:[
{text:'ある冬、北の「ひえひえ城」に住む人たちが、みんな手足が冷たくて、外に出られなくなっていました。',
draw(A){const{R,P}=A;castleNight(A);
 [[118,72],[178,72],[146,74]].forEach(([a,b])=>{A.person(a,b-2,1.2,'#5a6aa8','#4a3020');A.sweat(a+10,b-2)});
 A.wind(12,'#dff2fa',.7);
 A.bunny(30,112,'#ffffff',2,false,true);A.shake(26,110,8);
}},
{text:'城の地下では、冷気の妖怪「ヒエラ」が、毎晩冷たい息を吐いていたのです。',
draw(A){const{R,P}=A;
 R(0,0,256,144,'#1c2436');for(let j=0;j<144;j+=8)for(let i=(j/8%2)*8;i<256;i+=16)R(i,j,15,7,'#222c42');
 A.ground(116,'#2a3448','#344058');
 A.blob(150,64,1.5,ICE,'sly');
 A.alpha(.7,()=>{for(let k=0;k<40;k++){const t=k/40;R(130-t*120,74+Math.sin(k)*6+t*20,4,2,'#dff2fa')}});
 A.snow(50,'#dff2fa',40,140);
 for(let i=0;i<12;i++){const a=10+i*20;R(a,0,2,4+i%3*3,'#bfe2f0');P(a,4+i%3*3,'#ffffff')}
}},
{text:'この任務を任されたのは、ジンジャー忍者。\n誰にも見つからず、そっと城に忍び込みます。「ニンニン！」',
draw(A){const{R,P}=A;castleNight(A);
 A.hero('shoga',94,40,1.6);
 A.alpha(.5,()=>{R(80,52,14,1,'#ffffff');R(84,56,10,1,'#ffffff')});
 A.bunny(220,114,'#ffffff',1.5,true,true);
}},
{text:'（実は三日間、ずっと天井に張り付いていました。誰も気付きませんでした。）',
draw(A){const{R,P}=A;
 R(0,0,256,144,'#e8dcc0');R(0,0,256,18,'#8a6a4a');for(let i=0;i<256;i+=32)R(i,0,4,18,'#6a4a2a');
 R(0,104,256,40,'#b89a70');for(let i=0;i<256;i+=24)R(i,104,1,40,'#a08a60');
 R(20,40,40,30,'#9fb4e8');R(22,42,36,26,'#cfe0ff');A.snow(10,'#ffffff',42,68);
 A.table(150,92,60);A.bowl(162,86,'#cfd8e8');A.person(110,72,2,'#5a6aa8','#4a3020');A.sweat(124,72);
 A.x.save();A.x.translate(0,2*22+2*18);A.x.scale(1,-1);A.hero('shoga',140,18,2);A.x.restore();
 A.zz(196,24,'#8a6a4a');
 A.bunny(30,52,'#ffffff',1.5,false,true);
}},
{text:'地下でヒエラと向かい合います。\nまずは生のままの“ジンゲロールの術”！すっとする香りで、ヒエラの詰まった鼻をすっきりさせました。',
draw(A){const{R,P}=A;
 R(0,0,256,144,'#1c2436');for(let j=0;j<144;j+=8)for(let i=(j/8%2)*8;i<256;i+=16)R(i,j,15,7,'#222c42');A.ground(116,'#2a3448','#344058');
 A.blob(176,66,1.3,ICE,'smile');
 A.hero('shoga',40,74,2);
 A.alpha(.8,()=>{for(let k=0;k<26;k++){const t=k/26;A.disc(96+t*60,86-Math.sin(t*6)*6,1,k%2?'#fff3a0':'#e8c27a')}});
 for(let i=0;i<4;i++)A.sparkle(150+i*8,52+i%2*6);
 A.bunny(10,120,'#ffffff',1,false,true);
}},
{text:'次に、竈で自分を炙って“ショウガオールの術”。\n熱で力を変えるのが、忍びの極意でござる。',
draw(A){const{R,P}=A;
 R(0,0,256,144,'#2a1e1a');for(let j=0;j<144;j+=8)for(let i=(j/8%2)*8;i<256;i+=16)R(i,j,15,7,'#33241e');
 A.ground(116,'#3a2a22','#4a3428');
 R(80,80,90,36,'#7a5a4a');R(84,84,82,4,'#8a6a5a');R(104,96,42,20,'#1a1010');
 A.glow(125,104,30,'#f39a1e',.35);A.glow(125,104,18,'#ffe600',.4);
 for(let i=0;i<14;i++){const a=108+i*3,h=6+(i*7)%10;R(a,114-h,2,h,i%2?'#ffe600':'#e8452c')}
 A.hero('shoga',98,40,2);A.speedLines(125,60,18,40,'#ffc070',.4);
 A.bunny(220,118,'#ffffff',1.5,true,true);
}},
{text:'ぽかぽかの湯気が城じゅうに広がり、人々の手足に、ふわっと温かさが戻ってきました。\nヒエラも「温かいって、気持ちいい……」と、ふにゃっと溶けてしまいました。',
draw(A){const{R,P}=A;
 A.sky(['#3a3a6a','#5a4a7a','#8a5a7a','#c87a6a'],100);A.stars(10,30);
 A.castle(128,104,80,44,'#e8d8c0','#c8603a','#ffe9a0');
 A.alpha(.55,()=>{for(let i=0;i<40;i++)A.disc(40+A.rnd()*180,20+A.rnd()*70,3+(A.rnd()*4|0),'#fff0e0')});
 A.ground(104,'#e8e0d0','#d8d0c0');
 A.blob(214,110,.8,['#cfe8f8','#e4f2fa','#f4faff'],'sleep');R(196,124,40,4,'#dff2fa');
 [[60,108],[86,110],[150,110]].forEach(([a,b],i)=>{A.person(a,b,1.6,['#e8452c','#f39a1e','#9b2f5e'][i],'#4a3020');A.heart(a+3,b-9)});
 A.bunny(120,118,'#ffffff',1.6,false,true);
}},
{text:'朝、城の人たちは「誰が助けてくれたんだろう」と不思議がりました。\nテーブルの上には、蜂蜜生姜湯と小さな手紙。「お仕事、お疲れ様でござる。――J」\nその頃ジンジャー忍者は、窓の外で耳まで真っ赤にしていました。',
draw(A){const{R,P}=A;
 R(0,0,256,144,'#f3e2c0');R(0,104,256,40,'#c8a878');
 R(170,20,70,60,'#6a4a2a');R(174,24,62,52,'#bfe8ff');R(204,24,2,52,'#6a4a2a');R(174,48,62,2,'#6a4a2a');
 A.sun(226,34,6);
 A.hero('shoga',186,36,1.4);A.alpha(.85,()=>{R(194,58,4,2,'#ff3a5a');R(212,58,4,2,'#ff3a5a')});
 A.table(30,90,110);A.bowl(46,84,'#f5b030');A.bowl(66,84,'#f5b030');A.jar(90,80);A.letter(104,84);
 A.person(40,62,1.6,'#5a6aa8','#4a3020');A.person(126,62,1.6,'#e8452c','#6a4020');
 A.bunny(140,112,'#ffffff',1.6,false,true);
}},
]});})();

// ===== 第3話 一番長い冬の夜（カボッチャ） =====
(()=>{const KOGO=['#5a6a9a','#6a7aaa','#8a9ac0'];
const winter=(A,dark)=>{A.sky(dark?['#141a30','#1c2440','#24304e','#2c3a5a']:['#8a94a8','#9aa4b8','#aab4c4','#bcc4d0'],100);A.hills(92,5,'#c8d0dc',1,.03);A.snowGround(100)};
EPISODES.push({no:3,hero:'pumpkin',title:'一番長い冬の夜',season:'冬至',
lesson:'焦らず、じっくり。続けた人が、最後に春を連れてくる。',
power:{veg:'南瓜',items:[['β-カロテン','とても多いよ。目・お肌・粘膜を守るんだ。'],['ビタミンエース','β-カロテン（A）・C・Eが揃う野菜。ビタミンEは体のサビを防ぐよ。'],['一口メモ','採ってから少し置くと、甘みが増すんだ。']]},
pages:[
{text:'昔、畑の国に、春がなかなか来ない年がありました。\n冬の大魔物「コゴエール」が、空に居座ってしまったのです。\n畑は凍り、野菜たちはどんどん元気を無くしていきました。',
draw(A){const{R,P}=A;winter(A);
 A.blob(128,36,1.6,KOGO,'sly','#dff2fa');A.snow(90);
 A.bunny(40,112,'#ffffff',2,false,true);A.shake(36,110,8,'#5a6a9a');
}},
{text:'みんなが「もう駄目だ」と下を向く中、カボッチャはどっしりと立っていました。\n「おいら、夏に採れて、冬まで元気でいられるんだ。だから大丈夫。一緒に待とう」',
draw(A){const{R,P}=A;winter(A,true);A.stars(20,40);A.snow(50);
 A.house(20,74,24,20,'#a89878','#5a3a2a');A.house(210,76,24,18,'#a89878','#5a3a2a');
 A.hero('piman',36,90,1.4);A.hero('cabbage',64,92,1.4);A.hero('imo',170,92,1.4);A.hero('onion',196,92,1.4);
 A.glow(128,100,24,'#f39a1e',.25);A.hero('pumpkin',100,74,2);
 A.bunny(150,114,'#ffffff',1.6,true,true);
}},
{text:'カボッチャは毎晩、凍える皆の所を回って、ほくほくのスープを作りました。',
draw(A){const{R,P}=A;
 R(0,0,256,144,'#3a2a24');R(0,100,256,44,'#5a4030');for(let i=0;i<256;i+=20)R(i,100,1,44,'#4a3428');
 R(20,20,40,30,'#24304e');A.snow(12,'#ffffff',20,50);R(18,18,44,2,'#6a4a2a');R(18,50,44,2,'#6a4a2a');
 A.glow(150,96,34,'#f39a1e',.3);
 R(130,104,40,10,'#5a4a4a');for(let i=0;i<10;i++){R(134+i*3,98+(i%3),2,6,i%2?'#ffe600':'#e8452c')}
 A.pot(141,86,'#3a3a4a');
 A.hero('pumpkin',86,70,2);
 A.person(196,82,1.6,'#5a6aa8','#4a3020');A.person(220,84,1.6,'#9b2f5e','#6a4020');
 A.bunny(176,108,'#ffffff',1.6,true,true);A.bowl(172,100,'#f39a1e');
}},
{text:'β-カロテン、ビタミンC、ビタミンE。\n“ビタミンエース”のスープを飲んだ村の人たちは、風邪も引かずに冬を越えていきました。',
draw(A){const{R,P}=A;
 R(0,0,256,144,'#4a3428');R(0,96,256,48,'#6a4a34');
 A.table(30,92,196);
 [[50,'#f39a1e'],[100,'#f5b030'],[150,'#f39a1e'],[200,'#f5b030']].forEach(([a,c])=>A.bowl(a,86,c));
 [[44,58,'#e8452c'],[94,58,'#5a6aa8'],[144,58,'#f39a1e'],[194,58,'#9b2f5e']].forEach(([a,b,c])=>{A.person(a,b,2,c,'#4a3020');A.heart(a+6,b-10)});
 [['A','#f39a1e'],['C','#ffe600'],['E','#9ccc3c']].forEach(([t,c],i)=>{A.glow(80+i*48,20,8,c,.5);A.disc(80+i*48,20,5,c)});
 A.bunny(120,112,'#ffffff',1.6,false,true);
}},
{text:'一年で一番夜が長い「冬至」の日。\nコゴエールが、最後の大吹雪を起こしました。',
draw(A){const{R,P}=A;winter(A,true);
 A.blob(150,40,2,KOGO,'sly','#dff2fa');
 A.wind(40,'#dff2fa',.8);A.snow(220);
 A.hero('pumpkin',40,82,2);
 A.bunny(14,120,'#ffffff',1.4,false,true,'x');
}},
{text:'カボッチャはハンマーを振り上げました。\n「ホクホク・インパクト！」\n温かい光が弾けて、空の魔物は溶けて消えていきました。',
draw(A){const{R,P}=A;
 A.sky(['#f39a1e','#f5b030','#ffd060','#ffe8a0'],100);
 A.speedLines(128,60,32,120,'#ffffff',.5);
 A.glow(128,60,40,'#ffe600',.35);A.glow(128,60,24,'#ffffff',.4);
 A.blob(220,24,.7,['#cfd8f0','#dfe6f6','#eff3fa'],'sleep');
 A.snowGround(104,'#fff6e0','#f3e2c0');
 A.hero('pumpkin',92,46,2.6);
 for(let i=0;i<10;i++)A.sparkle(20+A.rnd()*216,20+A.rnd()*80);
 A.bunny(30,118,'#ffffff',1.6,false,true);A.heart(46,112);
}},
{text:'次の日から、昼が少しずつ、少しずつ長くなり始めました。',
draw(A){const{R,P}=A;
 A.sky(['#9fd8ff','#b8e4ff','#d0eeff','#e8f8ff'],96);A.sun(200,40,12);
 A.hills(90,6,'#dff0d0',0,.03);
 A.ground(96,'#e8f0e0','#d0e4b8');
 for(let i=0;i<20;i++){const a=A.rnd()*256,b=100+A.rnd()*40;R(a,b,1,3,'#7fbf2a');P(a-1,b,'#9ccc3c')}
 A.blob(60,30,.5,['#ffffff','#f4f8ff','#ffffff'],'smile');
 A.hero('pumpkin',100,82,2);A.bunny(160,114,'#ffffff',1.6,true,true);
}},
{text:'それから畑の国では、冬至の日に南瓜を食べるようになった――と、村では言い伝えられています。\nカボッチャは「おいらのお陰ってわけじゃないよ〜」と照れるけれど、その日は一番の人気者です。',
draw(A){const{R,P}=A;
 A.sky(['#1c2440','#2a3458','#3a4468'],90);A.stars(30,50);
 A.flagLine(18);
 A.snowGround(96,'#f4f8ff','#dfe8f4');
 for(let i=0;i<6;i++)A.lantern(20+i*44,30);
 A.table(60,100,136);[76,104,132,160].forEach(a=>A.bowl(a,94,'#f39a1e'));
 A.hero('pumpkin',100,52,2);A.alpha(.85,()=>{R(116,80,6,2,'#ff3a5a');R(134,80,6,2,'#ff3a5a')});
 A.hero('carrot',30,72,1.3);A.hero('daikon',200,70,1.3);
 [[60,80,'#e8452c'],[180,80,'#5a6aa8']].forEach(([a,b,c])=>{A.person(a,b,1.6,c,'#4a3020');A.heart(a+3,b-9)});
 A.bunny(150,116,'#ffffff',1.6,false,true);A.heart(166,110);
}},
]});})();

// ===== 第4話 ズッシリ大ゴロンの大合戦（ダイコンタ） =====
(()=>{const GORO=['#9a7a5a','#b08a68','#c8a080'];
const winterDay=(A)=>{A.sky(['#9fc8f0','#b8d8f4','#d0e6f8','#e8f2fc'],96);A.hills(88,5,'#e4ecf4',2,.03);A.snowGround(96,'#f4f8ff','#dfe8f4')};
const mochi=(A,mx,my)=>{A.oval(mx,my+4,9,4,'#ffffff');A.oval(mx,my-2,6,3,'#fffdf3');A.disc(mx,my-7,3,'#f39a1e');A.R(mx-9,my+8,18,2,'#e8452c')};
EPISODES.push({no:4,hero:'daikon',title:'ズッシリ大ゴロンの大合戦',season:'お正月明け',
lesson:'言い返さなくても、真っすぐな行動が一番伝わる。',
power:{veg:'大根',items:[['ジアスターゼ','澱粉の消化を助ける酵素。熱に弱いから、大根おろしなど生で取るのがお勧めだよ。'],['イソチオシアネート','擦り下ろすと出る辛み成分。先っぽの方ほど辛いんだ。'],['葉っぱの栄養','β-カロテン、カルシウム、鉄などがたっぷり。葉も捨てないで！']]},
pages:[
{text:'お正月明け、畑の国は大変なことになっていました。\nみんなお餅やご馳走を食べ過ぎて、お腹が重たく、全然動けません。',
draw(A){const{R,P}=A;
 R(0,0,256,144,'#f3e2c0');R(0,100,256,44,'#c8a060');for(let i=0;i<256;i+=16)R(i,100,1,44,'#b8904a');
 R(0,0,256,10,'#8a4a2a');A.flagLine(10,['#e8452c','#ffffff']);
 mochi(A,40,84);A.table(110,88,90);[120,140,160,180].forEach((a,i)=>A.bowl(a,82,i%2?'#e8452c':'#f39a1e'));
 [[70,108],[130,112],[190,108]].forEach(([a,b],i)=>{A.person(a,b,1.6,['#5a6aa8','#e8452c','#9b2f5e'][i],'#4a3020');A.zz(a+14,b-6,'#8a6a4a')});
 A.bunny(226,118,'#ffffff',1.6,true,true);A.zz(240,110,'#8a6a4a');
}},
{text:'そこへ、眠気とダルさの塊「ズッシリ大ゴロン」が、のしのしやって来ました。',
draw(A){const{R,P}=A;winterDay(A);
 A.blob(150,62,2.1,GORO,'sleep');
 A.alpha(.5,()=>{for(let i=0;i<6;i++)R(70+i*20,124,12,3,'#8a6a4a')});
 A.house(16,74,24,20,'#f3e2c0','#e8452c');
 A.bunny(40,112,'#ffffff',1.8,false,true,'x');A.shake(34,110,8,'#8a6a4a');
}},
{text:'「ダイコンタ、頼む！」とみんなが言います。\nでも、木の上のカラスがからかいました。「大根役者に何が出来る〜」',
draw(A){const{R,P}=A;winterDay(A);
 A.R(186,40,6,58,'#6a4a2a');[[178,46,22],[196,40,16],[204,56,10]].forEach(([a,b,w])=>A.R(a,b,w,3,'#6a4a2a'));
 A.crow(196,26,2.2,true);
 [[214,30],[220,26],[226,30]].forEach(([a,b])=>{P(a,b,'#2a2a3a');P(a+1,b-1,'#2a2a3a')});
 A.hero('daikon',70,66,2);
 A.hero('carrot',20,84,1.4);A.hero('onion',134,86,1.4);
 A.bunny(110,118,'#ffffff',1.6,false,true);
}},
{text:'ダイコンタは何も言い返さず、ただ静かに弓を引きました。\n「狙いは決まった。後は放つだけ」',
draw(A){const{R,P}=A;
 A.sky(['#dfeefa','#eaf4fc','#f4faff'],144);
 for(let r=60;r>0;r-=12)A.alpha(.15,()=>A.disc(190,72,r,'#9fc8f0'));
 A.disc(190,72,6,'#e8452c');A.disc(190,72,3,'#ffffff');
 A.hero('daikon',30,40,3);
 A.alpha(.6,()=>{for(let i=0;i<110;i+=3)P(110+i,72,'#9fc8f0')});
 A.bunny(226,118,'#ffffff',1.4,true,true);
}},
{text:'ダイコンタの矢は、白く光る“ジアスターゼ”。\nご飯やお餅の澱粉を、すーっと消化しやすくしてくれます。\n矢はズッシリ大ゴロンに、一つ残らず命中しました。',
draw(A){const{R,P}=A;winterDay(A);
 A.blob(176,62,1.8,GORO,'smile');
 for(let k=0;k<7;k++){const y=30+k*10,x0=40+k*6;A.alpha(.9,()=>{R(x0,y,110-k*4,1,'#ffffff');R(x0+106-k*4,y-1,4,3,'#fff3a0')});A.sparkle(x0+112-k*4,y)}
 A.hero('daikon',8,74,2);
 A.bunny(80,120,'#ffffff',1.4,false,true);A.heart(94,114);
}},
{text:'ただし、この矢には弱点があります。火で炙ると力が無くなってしまうのです。\nだからダイコンタは、矢をいつも「擦り下ろし立て」で放ちます。手間が掛かっても、絶対に手を抜きません。',
draw(A){const{R,P}=A;
 R(0,0,256,144,'#f3e2c0');R(0,100,256,44,'#c8a878');
 A.table(60,96,140);
 R(120,70,24,26,'#a8b4c4');for(let j=72;j<94;j+=3)for(let i=122;i<142;i+=3)P(i,j,'#dfe8f0');R(126,96,12,6,'#8a6a3a');
 A.oval(166,90,12,5,'#ffffff');A.oval(166,87,8,3,'#fffdf3');A.sparkle(166,80);
 A.hero('daikon',60,52,2);
 A.bunny(30,114,'#ffffff',1.6,false,true);
}},
{text:'戦いの後、さっきのカラスがもじもじしながらやって来ました。\n「……さっきはごめん。格好良かった」',
draw(A){const{R,P}=A;winterDay(A);
 A.blob(220,30,.6,['#e8dcc8','#f0e8d8','#f8f4ec'],'sleep');
 A.hero('daikon',70,74,2);
 A.crow(150,96,2.6,true);
 A.alpha(.8,()=>{R(160,104,4,2,'#ff5a7a')});
 A.bunny(30,116,'#ffffff',1.6,false,true);
}},
{text:'ダイコンタはちょっとだけ笑って、自分の葉っぱを一枚あげました。\n「これ、栄養たっぷりなんだ。食べて」',
draw(A){const{R,P}=A;
 A.sky(['#ffd878','#ffe8a0','#fff3c0'],96);A.sun(200,50,14);A.hills(88,4,'#e4ecf4',1,.03);A.snowGround(96,'#f8f4ec','#e8e0d0');
 A.hero('daikon',70,70,2);
 A.crow(150,92,2.6,true);
 R(132,90,2,10,'#3f8a2a');A.disc(133,88,3,'#7fbf2a');A.disc(131,85,2,'#4f9a2a');
 A.heart(146,74);A.heart(124,66);
 A.bunny(30,116,'#ffffff',1.6,false,true);A.heart(44,110);
}},
]});})();

// ===== 第5話 ハックション大嵐の七日間（ピッピマン） =====
(()=>{
const storm=(A)=>{A.sky(['#4a5468','#5a6478','#6a7488','#7a8498'],100);A.hills(96,4,'#8a94a0',1,.03);A.snowGround(100,'#dfe6ee','#c8d0dc');A.wind(30,'#ffffff',.6)};
const school=(A,sx,base)=>{const{R}=A;R(sx,base-44,80,44,'#e8d8c0');for(let j=0;j<=10;j++)R(sx-4+j*2,base-44-j*1.5,88-j*4,2,'#4f8a2a');R(sx+34,base-18,12,18,'#6a4a2a');[[8,-34],[24,-34],[52,-34],[68,-34]].forEach(([a,b])=>R(sx+a,base+b,8,8,'#bfe8ff'));R(sx+38,base-60,4,8,'#8a6a3a');A.disc(sx+40,base-62,3,'#f5d63d')};
const bugs=(A,n,x0,x1,y0,y1)=>{for(let i=0;i<n;i++)A.bug(x0+A.rnd()*(x1-x0),y0+A.rnd()*(y1-y0),'#8aa83a',2)};
EPISODES.push({no:5,hero:'piman',title:'ハックション大嵐の七日間',season:'冬の終わり',
lesson:'自分のちょっと苦手な所も、ちゃんと誰かを守る力になる。',
power:{veg:'ピーマン',items:[['ビタミンC','体を守る力や、お肌のハリを助けるよ。ピーマンのビタミンCは、加熱しても比較的壊れにくいんだ。'],['β-カロテン','目やお肌を守るよ。油で炒めると吸収アップ。'],['一口メモ','細く切ってさっと加熱すると、苦みが和らぐよ。']]},
pages:[
{text:'ある冬、畑の国に「ハックション大嵐」がやって来ました。\n冷たい風に乗って、風邪引き虫たちが村中に飛んで来ます。',
draw(A){storm(A);school(A,150,100);bugs(A,14,10,240,10,90);
 A.bunny(30,114,'#ffffff',1.8,false,true,'x');A.shake(26,112,8,'#5a6478');
}},
{text:'村の子どもたちは、前の日まで「ピーマン、苦ーい！」と言っていた子たちでした。',
draw(A){const{R}=A;R(0,0,256,144,'#f3e2c0');R(0,100,256,44,'#c8a878');
 A.table(50,88,156);[80,128,176].forEach(a=>{A.R(a,82,14,2,'#ffffff');A.R(a+2,80,4,2,'#4f9a2a');A.R(a+7,80,4,2,'#4f9a2a')});
 [[70,60,'#e8452c'],[118,60,'#f39a1e'],[166,60,'#9b2f5e']].forEach(([a,b,c])=>A.person(a,b,2,c,'#4a3020'));
 A.alpha(.7,()=>{R(70,52,24,3,'#5a3a2a')});
 A.hero('piman',10,74,1.6);A.sweat(20,74);
 A.bunny(220,112,'#ffffff',1.6,true,true);
}},
{text:'ピッピマンは少しだけ迷いました。でも、すぐに盾を構えました。\n「苦いって言われても、守りたい気持ちは苦くないもん！」',
draw(A){storm(A);school(A,150,100);bugs(A,8,140,250,10,60);
 A.glow(80,96,28,'#9ccc3c',.3);A.hero('piman',44,62,2.6);
 A.bunny(14,118,'#ffffff',1.6,false,true);
}},
{text:'ピッピマンの盾は、“ビタミンC”の光で出来ています。\nしかも、火の側でも、なかなか壊れません。',
draw(A){const{R,P}=A;storm(A);
 A.alpha(.4,()=>{A.disc(84,84,34,'#c8ec8a')});A.alpha(.6,()=>{for(let a=0;a<6.28;a+=.06)P(84+Math.cos(a)*34,84+Math.sin(a)*34,'#ffffff')});
 A.hero('piman',56,62,2);
 for(let i=0;i<10;i++){const a=i/10*3.2-1.6;A.bug(84+Math.cos(a)*48,84+Math.sin(a)*48,'#8aa83a',2);A.sparkle(84+Math.cos(a)*38,84+Math.sin(a)*38)}
 A.R(190,110,30,6,'#5a4a4a');for(let i=0;i<8;i++)A.R(194+i*3,100+i%3,2,10,i%2?'#ffe600':'#e8452c');
 A.bunny(226,118,'#ffffff',1.4,true,true);
}},
{text:'七日七晩、ピッピマンは学校の入口に立ち続け、風邪引き虫を跳ね返しました。',
draw(A){const{R}=A;
 for(let k=0;k<7;k++){const c=k%2?['#1c2440','#2a3458']:['#6a7488','#8a94a8'];R(k*36.6,0,37,100,c[0]);R(k*36.6,0,37,40,c[1]);if(k%2)A.moon(k*36.6+18,16,5,c[1]);else A.sun(k*36.6+18,16,4,'#dfe6ee','#ffffff')}
 A.snowGround(100,'#dfe6ee','#c8d0dc');school(A,88,100);
 A.hero('piman',100,78,1.6);A.wind(14,'#ffffff',.5);bugs(A,6,10,240,50,95);
 A.bunny(30,116,'#ffffff',1.4,false,true);
}},
{text:'八日目の朝、嵐がやみました。\nふらふらのピッピマンに、一人の女の子が近づいて来ます。',
draw(A){A.sky(['#bfe2ff','#d0eaff','#e4f4ff','#f4faff'],100);A.sun(40,30,10);A.snowGround(100,'#f4f8ff','#dfe8f4');school(A,150,100);
 A.hero('piman',110,80,1.8);A.zz(150,78,'#8a94a8');A.sweat(112,82);
 A.person(60,86,2,'#e8452c','#6a4020');
 A.bunny(220,116,'#ffffff',1.4,true,true);
}},
{text:'女の子は小さな声で言いました。\n「……ピーマン、ちょっとだけ食べてみたよ。細く切って、炒めたら食べられた」\nピッピマンの目から、ぽろっと涙が零れました。',
draw(A){const{R,P}=A;R(0,0,256,144,'#e8f4c8');for(let i=0;i<24;i++)R(i*12,0,6,144,'#dcecb0');
 A.hero('piman',40,40,3.2);
 [[78,96],[78,100],[77,104]].forEach(([a,b])=>{P(a,b,'#9fd8ff');P(a+1,b,'#9fd8ff')});
 A.person(170,60,3,'#e8452c','#6a4020');
 R(176,98,24,3,'#ffffff');R(180,96,4,2,'#4f9a2a');R(186,96,4,2,'#4f9a2a');R(192,96,4,2,'#4f9a2a');
 A.heart(150,40);A.bunny(220,118,'#ffffff',1.4,true,true);
}},
{text:'「苦くてもいいんだ。ボクはボクのまま、みんなを守ればいいんだ」\nそれからピッピマンは、苦いと言われても笑って「いつか好きになってね！」と言えるようになりました。',
draw(A){A.sky(['#9fd8ff','#b8e4ff','#d0eeff','#e8f8ff'],96);A.sun(200,34,12);A.hills(90,5,'#b8dc5a',1,.03);A.ground(96,'#9ccc3c','#b8dc5a');
 school(A,10,96);
 A.hero('piman',110,72,2);
 [[160,92,'#e8452c'],[184,94,'#5a6aa8'],[208,92,'#f39a1e']].forEach(([a,b,c])=>{A.person(a,b,1.6,c,'#4a3020');A.heart(a+3,b-9)});
 A.bunny(90,116,'#ffffff',1.6,false,true);A.heart(104,110);
}},
]});})();

// ===== 第6話 キリキリ大王と、千枚の葉っぱ（キャベリン） =====
(()=>{
const room=(A,night=true)=>{const{R}=A;R(0,0,256,144,night?'#3a3058':'#f3e8d8');for(let i=0;i<256;i+=24)R(i,0,12,100,night?'#40365e':'#f8eee0');R(0,100,256,44,night?'#5a3a4a':'#c89a78');
 R(170,14,52,40,night?'#1c2440':'#bfe8ff');R(170,14,52,2,'#8a6a3a');R(195,14,2,40,'#8a6a3a');R(166,10,4,50,'#9b2f5e');R(222,10,4,50,'#9b2f5e');if(night){A.moon(206,30,6,'#1c2440');A.R(180,24,1,1,'#fff')}else A.sun(206,30,6)};
const king=(A,kx,ky,s=2,sad=true)=>{A.person(kx,ky,s,'#9b2f5e','#8a6a4a',true);if(sad){A.sweat(kx+7*s,ky+2*s)}};
const inBed=(A,sad=true)=>{king(A,92,72,3,sad);A.R(70,96,110,8,'#9fb4e8');A.R(70,96,110,1,'#cfe0ff');A.R(70,104,110,10,'#8a6a4a');A.R(66,84,4,30,'#6a4a2a');A.R(180,90,4,24,'#6a4a2a')};
const kiri=(A,kx,ky,s=1,sleep=false)=>{const{R,P}=A;const c='#8a5aa8',c2='#b07ac8';
 [[2,0],[5,0],[8,0],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1]].forEach(([a,b])=>R(kx+a*s,ky+b*s,s,s,'#f5d63d'));
 for(let j=2;j<9;j++)for(let i=1;i<10;i++)if(!((j===2||j===8)&&(i===1||i===9)))R(kx+i*s,ky+j*s,s,s,c);
 R(kx+2*s,ky+3*s,6*s,s,c2);
 if(sleep){R(kx+3*s,ky+5*s,2*s,s,'#2a1a3a');R(kx+6*s,ky+5*s,2*s,s,'#2a1a3a')}else{R(kx+3*s,ky+4*s,s,2*s,'#2a1a3a');R(kx+7*s,ky+4*s,s,2*s,'#2a1a3a');R(kx+2*s,ky+3*s,2*s,s,'#2a1a3a');R(kx+7*s,ky+3*s,2*s,s,'#2a1a3a')}
 R(kx+4*s,ky+7*s,3*s,s,'#2a1a3a');R(kx+10*s,ky+5*s,4*s,s,'#c8c8d8');R(kx+13*s,ky+4*s,s,3*s,'#c8c8d8')};
const leaf=(A,lx,ly,s=1)=>{A.oval(lx,ly,6*s,3*s,'#9ccc3c');A.oval(lx,ly,4*s,2*s,'#c8ec8a');A.R(lx-5*s,ly,10*s,1,'#7fbf2a')};
EPISODES.push({no:6,hero:'cabbage',title:'キリキリ大王と、千枚の葉っぱ',season:'春',
lesson:'優しさは、ちゃんと自分にも向けてあげよう。',
power:{veg:'キャベツ',items:[['ビタミンU（キャベジン）','胃の粘膜を守る成分として知られているよ。'],['ビタミンC','外側の葉や芯の周りにも多いよ。生で食べると取りやすいんだ。'],['ビタミンK・食物繊維','骨作りを助けて、お腹の調子も整えるよ。']]},
pages:[
{text:'お城の王様が、毎晩お腹を抱えて苦しんでいました。\n原因は「キリキリ大王」。心配事を餌にして、王様の胃をチクチク苛める、小さな大王でした。',
draw(A){room(A);inBed(A);kiri(A,124,76,2);
 A.speedLines(134,86,10,30,'#ffffff',.5);
 A.bunny(226,118,'#ffffff',1.4,true,true);
}},
{text:'国中のお医者さんも、剣士も、どうにも出来ませんでした。\nそこへ呼ばれたのが、キャベリンです。',
draw(A){room(A);king(A,40,74,2);A.bed(30,104,60,'#9fb4e8');
 A.person(140,80,2,'#ffffff','#5a4a3a');A.person(170,80,2,'#5a6aa8','#2a2a3a');A.sweat(152,80);A.sweat(184,80);
 A.glow(220,96,22,'#c8ec8a',.35);A.hero('cabbage',196,76,1.8);
 A.bunny(130,118,'#ffffff',1.4,false,true);
}},
{text:'キャベリンは戦いませんでした。代わりに、王様の話を一晩中聞きました。\n「本当は、毎日怖かったんですね」',
draw(A){room(A);inBed(A,false);kiri(A,140,60,1);
 A.hero('cabbage',24,72,2);A.heart(80,64);
 A.lantern(200,78);A.bunny(220,120,'#ffffff',1.4,true,true);
}},
{text:'話を聞きながら、キャベリンは葉っぱを一枚ずつ、王様のお腹にそっと重ねました。\nキャベリンの葉には、胃を優しく守る“ビタミンU”の力が詰まっています。一枚、また一枚。',
draw(A){room(A);inBed(A,false);
 for(let i=0;i<14;i++)leaf(A,130+((i*7)%22)-6,98-i*1.6,1.2);
 for(let i=0;i<6;i++)A.sparkle(100+i*14,56+(i%2)*8,'#ffffff');
 A.hero('cabbage',24,72,2);A.bunny(220,120,'#ffffff',1.4,true,true);
}},
{text:'千枚目を重ねた時、キリキリ大王は「こんなに優しくされたら、苛められないよ〜」と、ころんと眠ってしまいました。',
draw(A){room(A);inBed(A,false);
 for(let i=0;i<24;i++)leaf(A,130+((i*7)%26)-8,98-i*1.4,1.2);
 kiri(A,124,52,2,true);A.zz(152,44);A.zz(158,34);
 A.hero('cabbage',24,72,2);A.bunny(220,120,'#ffffff',1.4,true,true);
}},
{text:'朝、王様は久しぶりにぐっすり眠れた顔で言いました。「何でも褒美を取らせよう」\nキャベリンは首を振りました。「じゃあ、王様も、ちゃんと休んでくださいね」',
draw(A){room(A,false);A.bed(130,104,100,'#cfe0ff');
 A.person(90,62,3,'#9b2f5e','#8a6a4a',true);A.heart(104,48);
 A.hero('cabbage',24,72,2);
 A.R(150,40,30,18,'#f5d63d');A.R(150,40,30,2,'#c8a03a');A.sparkle(165,48);
 A.bunny(210,120,'#ffffff',1.4,true,true);
}},
{text:'帰り道、キャベリンはふらっと倒れそうになりました。自分のことを忘れて、一晩中頑張っていたからです。\nそれを支えたのは、こっそり付いて来たキャロットでした。「お前も休め！」',
draw(A){A.sky(['#f9b070','#fbc890','#fde0b0','#fff0d0'],96);A.sun(200,70,14,'#f39a1e','#ffd060');
 A.castle(220,96,40,26,'#e8d8c0','#9b2f5e');A.ground(94,'#9ccc3c','#b8dc5a');A.path(110,94,144,'#e8c890','#d8b878',14,2,0);
 for(let i=0;i<14;i++)A.R(A.rnd()*256,96+A.rnd()*44,2,2,['#ffb0c8','#ffffff','#ffe600'][i%3]);
 A.x.save();A.x.translate(112,96);A.x.rotate(-.25);A.hero('cabbage',-27,-44,2);A.x.restore();
 A.hero('carrot',112,72,2);A.sweat(96,70);
 A.bunny(30,116,'#ffffff',1.6,false,true);
}},
{text:'キャベリンは初めて「ありがとう」を言う側になって、少し照れました。',
draw(A){A.sky(['#f9b070','#fbc890','#fde0b0','#fff0d0'],96);A.sun(128,74,16,'#f39a1e','#ffd060');
 A.ground(94,'#9ccc3c','#b8dc5a');for(let i=0;i<18;i++)A.R(A.rnd()*256,96+A.rnd()*44,2,2,['#ffb0c8','#ffffff','#ffe600'][i%3]);
 A.hero('cabbage',70,72,2);A.hero('carrot',130,72,2,true);
 A.alpha(.85,()=>{A.R(84,98,5,2,'#ff3a5a');A.R(102,98,5,2,'#ff3a5a')});
 A.heart(122,62);A.bunny(200,116,'#ffffff',1.6,true,true);A.heart(214,110);
}},
]});})();

// ===== 第7話 つぼみ千人隊と、ナマケ竜（ブロッコ将軍） =====
(()=>{
const meadow=(A)=>{A.sky(['#9fd8ff','#b8e4ff','#d0eeff','#e8f8ff'],96);A.sun(220,24,9);
 A.hills(70,14,'#7fae6a',0,.02);A.hills(86,6,'#9ccc3c',2,.03);A.ground(96,'#9ccc3c','#b8dc5a')};
const bud=(A,bx,by,s=1,sleep=false)=>{const{R,P}=A;A.disc(bx,by,2*s,'#3f8a2a');A.disc(bx-s,by-s,s,'#8fcf3a');R(bx-s,by+2*s,2*s,2*s,'#c8e48a');if(sleep){R(bx-s,by,s,1,'#1f1a14');R(bx+s*.5,by,s,1,'#1f1a14')}else{P(bx-1,by,'#1f1a14');P(bx+1,by,'#1f1a14')}};
const squad=(A,x0,y0,cols,rows,gap,sleepy=0)=>{for(let j=0;j<rows;j++)for(let i=0;i<cols;i++)bud(A,x0+i*gap+(j%2)*gap/2,y0+j*gap*.8,1,A.rnd()<sleepy)};
EPISODES.push({no:7,hero:'broccoli',title:'つぼみ千人隊と、ナマケ竜',season:'初夏',
lesson:'小さな一歩も、毎日集まれば大きな森になる。',
power:{veg:'ブロッコリー',items:[['ビタミンC','野菜の中でもトップクラスの多さだよ。'],['スルフォラファン','体を守る力を引き出す成分。新芽（ブロッコリースプラウト）に特に多いんだ。'],['葉酸・たんぱく質','新しい細胞作りに欠かせない葉酸に、野菜の中では多めのたんぱく質。茹でるより、蒸す・電子レンジの方が栄養が残りやすいよ。']]},
pages:[
{text:'山の麓に「ナマケ竜」が住み着きました。',
draw(A){meadow(A);A.dragon(150,46,4);A.zz(204,34);A.zz(212,24);
 A.house(20,76,22,18,'#fff0d0','#e8452c');A.bunny(50,116,'#ffffff',2,false,true);
}},
{text:'竜の欠伸を浴びると、誰でも「今日はいっか〜」と寝転んでしまいます。\nとうとう村中の人が、ゴロゴロし始めました。',
draw(A){const{R}=A;meadow(A);A.dragon(170,40,3.5,'#8acf9a','#5aa86a',false);
 A.alpha(.45,()=>{for(let k=0;k<5;k++)A.disc(150-k*24,70+k*8,8+k*2,'#ffffff')});
 [[20,112],[60,118],[100,112]].forEach(([a,b],i)=>{A.x.save();A.x.translate(a+10,b+10);A.x.rotate(-1.4);A.person(-10,-10,2,['#e8452c','#5a6aa8','#f39a1e'][i],'#4a3020');A.x.restore();A.zz(a+16,b-12,'#ffffff')});
 A.bunny(140,122,'#ffffff',2,false,true,'x');A.zz(154,114,'#ffffff');
}},
{text:'ブロッコ将軍は、頭の小さなつぼみたちに号令を掛けました。\n「つぼみ千人隊、整列じゃ！」',
draw(A){meadow(A);A.hero('broccoli',20,52,2.6);
 squad(A,110,100,14,4,9);
 A.bunny(226,80,'#ffffff',2,true,true);
}},
{text:'一つ一つは小さな房。でも、千人が並ぶと、それは大きな緑の森になります。',
draw(A){A.sky(['#b8e4ff','#d0eeff','#e8f8ff'],60);A.ground(60,'#9ccc3c','#b8dc5a');
 squad(A,6,66,28,10,9);
 A.hero('broccoli',100,10,2);A.bunny(230,40,'#ffffff',2,true,true);
}},
{text:'ナマケ竜の大欠伸が、つぼみ隊を襲います。何人かが、うとうと……。',
draw(A){meadow(A);A.dragon(170,30,3.5,'#8acf9a','#5aa86a',false);
 A.alpha(.5,()=>{for(let k=0;k<6;k++)A.disc(160-k*22,66+k*8,10+k*2,'#ffffff')});
 squad(A,10,96,16,4,9,.5);A.zz(60,84);A.zz(110,88);
 A.hero('broccoli',8,40,1.8);A.sweat(14,44);
}},
{text:'将軍は叫びました。「一回でよい！一歩でよい！昨日の己に勝つのじゃ！」\nつぼみたちは一人、また一人と立ち上がりました。ビタミンCと葉酸を力に、みんなの元気が戻っていきます。',
draw(A){meadow(A);A.speedLines(60,60,24,80,'#ffe600',.4);
 A.hero('broccoli',30,30,2.8);
 squad(A,100,90,16,5,9);
 for(let i=0;i<8;i++)A.sparkle(110+i*18,82-(i%2)*6,'#ffffff');
 A.bunny(226,60,'#ffffff',2,true,true);A.heart(220,52);
}},
{text:'とうとう、ナマケ竜の方が目を丸くしました。「何でそんなに、毎日頑張れるの……？」\n将軍は槍を下ろして言いました。「頑張るのではない。毎日少しずつ、楽しんでおるだけじゃ」',
draw(A){meadow(A);A.dragon(140,40,3.5,'#8acf9a','#5aa86a',false);
 A.hero('broccoli',30,70,2);squad(A,90,120,10,2,9);
 A.bunny(14,120,'#ffffff',2,false,true);
}},
{text:'ナマケ竜はそれから、毎朝こっそり将軍の朝礼に参加しています。\nただし、将軍のお話が長過ぎて、時々やっぱり寝てしまうらしい。',
draw(A){A.sky(['#ffe8a0','#fff3c0','#e8f8ff'],96);A.sun(40,40,12);A.hills(86,6,'#9ccc3c',2,.03);A.ground(96,'#9ccc3c','#b8dc5a');
 A.R(18,74,40,6,'#c8a060');A.R(22,80,4,16,'#8a6a3a');A.R(50,80,4,16,'#8a6a3a');
 A.hero('broccoli',24,30,1.8);
 squad(A,80,104,12,3,9);
 A.dragon(196,52,3,'#8acf9a','#5aa86a',true);A.zz(232,42);
 A.bunny(150,74,'#ffffff',2,false,true);
}},
]});})();

// ===== 第8話 ぐったり鬼と、一粒の涙（玉ちゃん） =====
(()=>{
const classroom=(A)=>{const{R}=A;R(0,0,256,144,'#f3e8d8');R(0,100,256,44,'#c89a78');R(30,14,120,50,'#2f5a3a');R(30,14,120,3,'#8a6a3a');for(let i=0;i<6;i++)R(40+i*18,26+(i%2)*10,10,1,'#dfe8d8')};
const summer=(A)=>{A.sky(['#ffd060','#ffe080','#fff0b0','#fff8d8'],96);A.sun(210,30,14,'#ffb020','#ffe080');A.hills(88,5,'#b8c870',1,.03);A.ground(96,'#c8c870','#b0b060')};
const tears=(A,tx,ty)=>{[[0,0],[0,1],[1,2],[0,2]].forEach(([a,b])=>A.P(tx+a,ty+b,'#9fd8ff'))};
EPISODES.push({no:8,hero:'onion',title:'ぐったり鬼と、一粒の涙',season:'夏',
lesson:'弱点だと思っていたことが、誰かを助ける力になることもある。',
power:{veg:'玉ねぎ',items:[['硫化アリル（アリシンなど）','切ると目に染みる成分。ビタミンB1の吸収を助けて、疲れにくい体作りをサポートするよ。'],['ケルセチン','皮の近くに多いポリフェノール。体のサビ（酸化）から守るんだ。'],['一口メモ','じっくり加熱すると、甘さが引き立つよ。']]},
pages:[
{text:'玉ちゃんは小さい頃、魔法学校で「泣き虫さん」と呼ばれていました。\n玉ちゃんが魔法を使うと、なぜか周りの人の目から涙が出てしまうからです。',
draw(A){classroom(A);A.hero('onion',30,64,2);A.sparkle(80,60,'#fff3a0');
 [[130,66,'#5a6aa8'],[170,66,'#e8452c'],[210,66,'#f39a1e']].forEach(([a,b,c])=>{A.person(a,b,2,c,'#4a3020');tears(A,a+3,b+8);tears(A,a+11,b+8)});
 A.bunny(226,116,'#ffffff',2,true,true);
}},
{text:'「私の魔法は、人を泣かせるだけなのかな……」',
draw(A){const{R}=A;A.sky(['#f9b070','#fbc890','#fde0b0'],96);A.hills(90,5,'#b8c870',1,.03);A.ground(96,'#9ccc3c','#b8dc5a');
 A.roundTree(196,96,16,'#7fbf2a','#9ccc3c');
 A.hero('onion',110,74,2);A.R(170,100,40,3,'#6a4a2a');
 A.alpha(.4,()=>A.disc(136,96,30,'#5a4a6a'));A.hero('onion',110,74,2);
 A.bunny(30,116,'#ffffff',2,false,true);
}},
{text:'ある夏、村に「ぐったり鬼」が現れました。\n畑の人たちはみんな、体が重くて動けません。鬼が、みんなの疲れをどんどん集めていたのです。',
draw(A){summer(A);A.oni(150,36,5);
 A.alpha(.6,()=>{for(let i=0;i<14;i++)A.disc(40+A.rnd()*200,90+A.rnd()*30,2,'#8a8ab8')});
 [[30,110],[80,114],[120,108]].forEach(([a,b],i)=>{A.person(a,b,2,['#e8452c','#5a6aa8','#9b2f5e'][i],'#4a3020');A.sweat(a+14,b)});
 A.bunny(226,120,'#ffffff',2,true,true,'x');
}},
{text:'玉ちゃんは図書館で、古い本を見つけました。\n「涙の魔法の正体は“硫化アリル”。お豆や玄米に含まれるビタミンB1という“元気の素”を、体にしっかり届ける力がある」\n玉ちゃんの魔法は、泣かせるためのものじゃなかった！',
draw(A){const{R}=A;R(0,0,256,144,'#5a3a2a');
 for(let j=0;j<4;j++){R(0,10+j*24,256,2,'#3a2418');for(let i=0;i<256;i+=6)R(i,12+j*24,5,20,['#e8452c','#4f9a2a','#f39a1e','#5a6aa8','#9b2f5e','#f5d63d'][(i/6+j)%6])}
 R(0,106,256,38,'#7a5a3a');A.table(70,100,120);
 R(100,90,52,10,'#fffdf3');R(125,90,2,10,'#c8a060');for(let k=0;k<4;k++){R(104,92+k*2,18,1,'#8a7a6a');R(130,92+k*2,18,1,'#8a7a6a')}
 A.glow(126,90,22,'#ffe600',.35);for(let i=0;i<5;i++)A.sparkle(110+i*8,80-(i%2)*6);
 A.hero('onion',40,62,2);A.bunny(210,84,'#ffffff',2,true,true);
}},
{text:'玉ちゃんは、村の人たちのお豆ご飯や、お味噌汁に、そっと魔法を掛けて回りました。\n「出来る、出来る、出来る！」',
draw(A){const{R}=A;R(0,0,256,144,'#f3e2c0');R(0,100,256,44,'#c8a878');A.table(40,90,176);
 [[60,'#fffdf3'],[100,'#c87a3a'],[140,'#fffdf3'],[180,'#c87a3a']].forEach(([a,c],i)=>{A.bowl(a,84,c);if(i%2==0)for(let k=0;k<4;k++)A.P(a+2+k*2,84,'#c8803a')});
 A.hero('onion',100,34,2);
 for(let i=0;i<12;i++)A.sparkle(50+i*14,74-(i%3)*6,'#fff3a0');
 A.bunny(220,112,'#ffffff',2,true,true);
}},
{text:'みんなの体に元気が戻り、ぐったり鬼は、しゅるしゅると小さくなって逃げて行きました。',
draw(A){A.sky(['#9fd8ff','#b8e4ff','#d0eeff','#e8f8ff'],96);A.sun(40,30,10);A.hills(88,5,'#9ccc3c',1,.03);A.ground(96,'#9ccc3c','#b8dc5a');
 A.oni(210,90,1.6);A.alpha(.5,()=>{A.R(196,100,12,1,'#ffffff');A.R(192,104,14,1,'#ffffff')});
 [[30,90,'#e8452c'],[64,86,'#5a6aa8'],[98,90,'#9b2f5e']].forEach(([a,b,c])=>{A.person(a,b,2,c,'#4a3020');A.heart(a+4,b-9)});
 A.hero('onion',130,72,2);A.bunny(170,116,'#ffffff',2,false,true);
}},
{text:'その夜、村の人たちは玉ちゃんにお礼を言いながら、嬉し涙を流しました。\n「この涙は、いい涙だね」',
draw(A){A.sky(['#1c2440','#2a3458','#3a4468'],96);A.stars(40,60);A.moon(220,24,8,'#2a3458');A.ground(96,'#2a4a24','#335a2a');
 for(let i=0;i<5;i++)A.lantern(30+i*50,40);
 A.glow(128,104,30,'#ffe600',.2);A.hero('onion',100,72,2);
 [[40,90,'#e8452c'],[70,92,'#5a6aa8'],[170,92,'#9b2f5e'],[200,90,'#f39a1e']].forEach(([a,b,c])=>{A.person(a,b,2,c,'#4a3020');tears(A,a+3,b+8);tears(A,a+11,b+8);A.heart(a+4,b-9)});
 A.bunny(140,118,'#ffffff',2,false,true);
}},
{text:'玉ちゃんは、初めて自分の魔法が好きになりました。',
draw(A){const{R}=A;R(0,0,256,144,'#fff3d0');for(let i=0;i<24;i++)R(i*12,0,6,144,'#ffe9b8');
 A.glow(128,80,46,'#ffe600',.25);A.hero('onion',90,30,2.8);
 for(let i=0;i<10;i++)A.sparkle(30+A.rnd()*196,20+A.rnd()*100,'#f5d63d');
 A.heart(176,40);A.bunny(200,112,'#ffffff',2,true,true);A.heart(214,104);
}},
]});})();

// ===== 第9話 サビサビ団と、真夏の太陽（リコピンちゃん） =====
(()=>{
const beach=(A)=>{A.sky(['#4ab0f0','#6ac0f4','#8ad0f8','#b0e0fa'],80);A.sun(200,26,14,'#ffe600','#fff8d0');
 A.sea(80,'#3a9ad8','#7ac8f0');A.R(0,104,256,40,'#f3d8a0');for(let i=0;i<60;i++)A.P(A.rnd()*256,106+A.rnd()*38,'#e8c890');
 for(let i=0;i<256;i+=8)A.R(i,102+(i/8%2),8,2,'#ffffff')};
const sabi=(A,sx,sy,s=2,shiny=false)=>{const m=['..rrr..','.rRRRr.','rRedeRr','rRRRRRr','rRmmmRr','.rRRRr.','..r.r..'];
 const c=shiny?{r:'#c8c8d8',R:'#eef2f8',e:'#1f1a14',d:'#eef2f8',m:'#e8456a'}:{r:'#7a4a2a',R:'#b06a3a',e:'#1f1a14',d:'#b06a3a',m:'#4a2a1a'};
 m.forEach((r,j)=>[...r].forEach((ch,i)=>{if(ch==='.')return;A.R(sx+i*s,sy+j*s,s,s,c[ch])}));
 if(!shiny){A.P(sx+s,sy+3*s,'#d89060');A.P(sx+5*s,sy+2*s,'#5a3a1a')}else A.sparkle(sx+6*s,sy)};
EPISODES.push({no:9,hero:'tomato',title:'サビサビ団と、真夏の太陽',season:'真夏',
lesson:'一人で頑張るより、仲間と組むともっと強くなれる。',
power:{veg:'トマト',items:[['リコピン','赤い色の素。体のサビ（酸化）を防ぐ力がとても強いよ。油と一緒、加熱すると吸収アップ。'],['ビタミンC・カリウム','お肌のハリを助けて、余分な塩分を外に出すのも助けるよ。'],['旨味（グルタミン酸）','料理を美味しくして、塩を減らすのにも役立つんだ。']]},
pages:[
{text:'真夏のある日、海辺の町に「サビサビ団」がやって来ました。\n強い日差しに紛れて、人々の体を少しずつサビさせてしまう、困った奴らです。',
draw(A){beach(A);for(let i=0;i<7;i++)sabi(A,20+i*32,40+(i%2)*14,2);
 A.bunny(226,116,'#ffffff',2,true,true,'x');
}},
{text:'町の人はみんな、日傘の下でしょんぼり。',
draw(A){beach(A);[[50,'#e8452c'],[120,'#f39a1e'],[190,'#9b2f5e']].forEach(([a,c],i)=>{A.umbrella(a,84,c);A.person(a-8,104,2,['#5a6aa8','#e8452c','#4f9a2a'][i],'#4a3020');A.sweat(a+8,104)});
 sabi(A,90,50,1);sabi(A,160,56,1);A.bunny(14,124,'#ffffff',2,false,true);
}},
{text:'リコピンちゃんは腕まくりをしました。\n「あたしの出番ね！太陽の下でこそ、赤く輝くのがトマトなんだから！」',
draw(A){beach(A);A.speedLines(128,70,24,90,'#ffffff',.35);A.glow(128,80,34,'#e8452c',.25);
 A.hero('tomato',92,48,2.8);A.bunny(220,118,'#ffffff',2,true,true);A.heart(234,110);
}},
{text:'リコピンちゃんの赤いパンチには、体のサビを防ぐ“リコピン”が詰まっています。\nでもサビサビ団は数が多い。段々息が切れてきました。',
draw(A){beach(A);A.hero('tomato',40,70,2);A.sweat(44,72);A.sweat(96,72);
 for(let i=0;i<9;i++)sabi(A,110+(i%3)*44,30+Math.floor(i/3)*24+(i%2)*6,2);
 A.bunny(10,120,'#ffffff',2,false,true);
}},
{text:'その時――ジンジャー忍者が、そっとオリーブオイルを投げてくれました。\n「油と組めば、力がもっと体に届くでござる」',
draw(A){beach(A);A.hero('tomato',40,70,2);
 A.hero('shoga',190,20,1.6,true);
 A.R(150,46,8,12,'#8aa83a');A.R(152,42,4,4,'#c8c8a0');A.R(151,50,6,4,'#e8e8a0');A.sparkle(160,44);
 A.alpha(.6,()=>{for(let k=0;k<14;k++)A.P(158+k*2,44-Math.sin(k/4)*6,'#ffffff')});
 for(let i=0;i<5;i++)sabi(A,120+(i%3)*40,90+Math.floor(i/3)*14,1);
 A.bunny(10,120,'#ffffff',2,false,true);
}},
{text:'オイルを纏ったリコピンちゃんは、更に真っ赤にパワーアップ！\n「リコピン・ストレート！」',
draw(A){beach(A);A.speedLines(70,80,32,120,'#ffe600',.45);A.glow(70,80,36,'#e8452c',.35);A.glow(70,80,22,'#ffe600',.35);
 A.hero('tomato',30,56,2.8);
 A.alpha(.9,()=>{A.R(110,82,140,6,'#e8452c');A.R(110,84,140,2,'#ffe600')});
 for(let i=0;i<6;i++)A.sparkle(130+i*20,74+(i%2)*16);
}},
{text:'サビサビ団はピカピカに磨かれて、ただの良い人たちに戻ってしまいました。',
draw(A){beach(A);for(let i=0;i<7;i++)sabi(A,20+i*32,70+(i%2)*10,2,true);
 [[30,'#e8452c'],[120,'#f39a1e'],[210,'#9b2f5e']].forEach(([a,c])=>A.heart(a,50));
 A.hero('tomato',100,20,1.6);A.bunny(226,122,'#ffffff',2,true,true);
}},
{text:'戦いの後、リコピンちゃんはジンジャー忍者に言いました。\n「……あ、ありがと。あたし一人でも勝てたけどね！」\nそう言いながら、ちゃんと自分のトマトスープを半分分けてあげました。',
draw(A){A.sky(['#f39a1e','#f8b860','#fcd890','#fff0c0'],80);A.sun(128,80,18,'#e8452c','#ffb070');A.sea(80,'#e88a5a','#f8b890');A.R(0,104,256,40,'#f3d8a0');
 A.hero('tomato',60,64,2);A.hero('shoga',140,64,2,true);
 A.alpha(.85,()=>{A.R(74,90,5,2,'#ff3a5a');A.R(92,90,5,2,'#ff3a5a');A.R(152,86,5,2,'#ff3a5a');A.R(168,86,5,2,'#ff3a5a')});
 A.bowl(112,104,'#e8452c');A.bowl(126,104,'#e8452c');A.heart(122,56);
 A.bunny(220,118,'#ffffff',2,true,true);
}},
]});})();

// ===== 第10話 ツマリンボと、秋の大運動会（イモ吉）― 最終話 =====
(()=>{const TSUMA=['#8a6a4a','#a07a58','#b89070','#c8a888'];
const autumn=(A)=>{A.sky(['#8ac8f0','#a8d8f4','#c8e8f8','#e8f4fc'],90);A.hills(80,8,'#e8a040',0,.03);A.hills(88,5,'#c87a2a',2,.04);A.ground(92,'#b8c870','#a8b860')};
const stadium=(A)=>{autumn(A);A.flagLine(14);A.track(100,30);A.R(0,92,256,8,'#9ccc3c');A.R(0,130,256,14,'#9ccc3c')};
const imoyaki=(A,ix,iy)=>{A.oval(ix,iy,5,3,'#9b2f5e');A.oval(ix,iy,3,2,'#f5c040');A.alpha(.6,()=>{A.P(ix-1,iy-5,'#ffffff');A.P(ix+1,iy-7,'#ffffff')})};
EPISODES.push({no:10,hero:'imo',title:'ツマリンボと、秋の大運動会',season:'秋',
lesson:'応援する人も、ちゃんとチームの主役。',
power:{veg:'薩摩芋',items:[['食物繊維','たっぷり入っていて、お腹の調子を整えるよ。'],['ヤラピン','切った時に出る白い蜜。お腹の動きを助けるんだ。'],['ビタミンC・カリウム','澱粉に守られて、加熱しても残りやすいビタミンC。じっくり加熱すると、甘みがアップするよ。']]},
pages:[
{text:'ある秋、村一番の運動会の前の日。\n選手たちがみんな、お腹の調子を崩してしまいました。\n犯人は、お腹のトンネルを詰まらせる「ツマリンボ」。このままでは運動会は中止です。',
draw(A){stadium(A);A.blob(170,52,1.4,TSUMA,'sly');
 [[20,98],[50,100],[80,98]].forEach(([a,b],i)=>{A.person(a,b,2,['#e8452c','#5a6aa8','#f39a1e'][i],'#4a3020');A.sweat(a+14,b)});
 A.bunny(112,110,'#ffffff',2,false,true,'x');
}},
{text:'「おらに任せるっぺ！」\n応援団長のイモ吉は、旗を担いで立ち上がりました。\nでも本当は、膝がガクガク。大きなことを言った後で、こっそりお腹が「グ〜」と鳴りました。',
draw(A){autumn(A);A.glow(110,96,26,'#9b2f5e',.2);A.hero('imo',80,48,2.6);
 A.shake(92,108,10,'#5a1e3a');A.shake(130,108,10,'#5a1e3a');
 A.R(160,40,24,10,'#fffdf3');A.R(160,48,4,4,'#fffdf3');[[164,44],[170,44],[176,44]].forEach(([a,b])=>A.R(a,b,4,2,'#9b2f5e'));
 A.bunny(220,112,'#ffffff',2,true,true);
}},
{text:'イモ吉は選手のみんなの所を回って、ほくほくの焼き芋を配りました。\n“食物繊維”と、白い蜜“ヤラピン”の力で、詰まったトンネルがすーっと通っていきます。ツマリンボは、慌てて逃げ出しました。',
draw(A){autumn(A);A.R(30,100,40,8,'#5a4a4a');for(let i=0;i<8;i++)A.R(34+i*4,94+(i%2),2,6,i%2?'#ffe600':'#e8452c');
 for(let i=0;i<4;i++)imoyaki(A,40+i*8,92);
 A.hero('imo',70,62,2);
 [[140,96,'#e8452c'],[170,98,'#5a6aa8']].forEach(([a,b,c])=>{A.person(a,b,2,c,'#4a3020');A.heart(a+4,b-9)});
 A.blob(232,40,.5,TSUMA,'sly');A.alpha(.6,()=>{A.R(214,44,8,1,'#ffffff');A.R(212,48,8,1,'#ffffff')});
 A.bunny(110,114,'#ffffff',2,false,true);imoyaki(A,124,112);
}},
{text:'運動会の当日。会場には、お野菜十勇士がみんな集まりました。\nモヤモヤンも、ヒエラも、ナマケ竜も、カラスも、仲直りした皆が応援に来ています。',
draw(A){stadium(A);
 A.moya(30,40,.6,'smile');A.blob(80,34,.6,['#9fd0e8','#bfe2f0','#dff2fa'],'smile');A.dragon(196,22,2,'#8acf9a','#5aa86a',false);A.crow(140,30,2);
 ['carrot','shoga','pumpkin','daikon','piman','cabbage','broccoli','onion','tomato','imo'].forEach((k,i)=>A.hero(k,4+i*25,62+(i%2)*6,1.3));
 A.bunny(120,114,'#ffffff',2,false,true);
}},
{text:'イモ吉は誰よりも大きな声で旗を振りました。\n「フレー！フレー！みんなー！」\n勝った子にも、転んだ子にも、同じくらい大きな声で。',
draw(A){stadium(A);A.speedLines(60,60,20,70,'#ffffff',.4);A.hero('imo',30,40,2.4);
 [[120,102],[160,106],[200,102]].forEach(([a,b],i)=>A.bunny(a,b,['#f4efe4','#e8dcc0','#ffffff'][i],2,true));
 for(let i=0;i<4;i++)A.heart(110+i*30,90);
}},
{text:'転んで泣いたピョン太が、もう一度走り出した時、会場中から拍手が湧きました。',
draw(A){stadium(A);
 A.bunny(150,104,'#ffffff',3,true,true);A.alpha(.6,()=>{A.R(172,110,20,1,'#ffffff');A.R(176,116,16,1,'#ffffff')});
 [[148,112],[148,113]].forEach(([a,b])=>A.P(a,b,'#9fd8ff'));
 for(let i=0;i<10;i++)A.sparkle(20+A.rnd()*216,30+A.rnd()*50,'#ffffff');
 A.hero('imo',30,54,1.8);A.hero('carrot',80,58,1.4);A.hero('cabbage',210,56,1.4);
 for(let i=0;i<6;i++)A.heart(20+i*40,40);
}},
{text:'閉会式で「MVPはイモ吉！」と呼ばれました。\nイモ吉はぽかんとして言いました。「おら、走ってないっぺよ？」\nみんなは笑って答えました。「一番走ってたのは、イモ吉の声だよ！」',
draw(A){stadium(A);A.R(98,74,60,26,'#c8a060');A.R(98,74,60,2,'#e8c890');A.R(120,62,16,12,'#f5d63d');A.R(124,56,8,6,'#f5d63d');A.sparkle(128,52);
 A.hero('imo',100,30,2);
 ['carrot','piman','pumpkin','broccoli'].forEach((k,i)=>A.hero(k,4+i*24,82+(i%2)*4,1.3));
 ['daikon','tomato','onion','shoga','cabbage'].forEach((k,i)=>A.hero(k,160+i*19,84+(i%2)*4,1.3));
 A.bunny(122,112,'#ffffff',2,false,true);A.heart(136,106);
}},
{text:'こうして、ミドリ村の一年が巡りました。\n明日もきっと、どこかで誰かが、小さな一歩を踏み出しています。\nお野菜十勇士は、いつでも、あなたの側で応援しています。',
draw(A){A.sky(['#f39a1e','#f8b860','#fcd890','#fff0c0'],96);A.sun(128,70,22,'#ffb020','#ffe080');A.speedLines(128,70,28,100,'#ffffff',.3);
 A.hills(92,5,'#9ccc3c',1,.03);A.ground(98,'#7fbf2a','#9ccc3c');A.field(110,144,'#8a6a3a','#4f9a2a');
 ['carrot','shoga','pumpkin','daikon','piman','cabbage','broccoli','onion','tomato','imo'].forEach((k,i)=>A.hero(k,4+i*25,76+(i%2)*4,1.3));
 A.moya(36,24,.5,'smile');A.dragon(204,16,1.5,'#8acf9a','#5aa86a',false);
 A.bunny(118,118,'#ffffff',2,false,true);A.heart(132,112);
}},
]});})();

// ===== ミドリ座（v140）：アプリの中の映画館 =====
// 外観 → ロビー（上映会・絵本コーナー）→ 場内（キャベツの幕が開いて上映）。
// 上映会はトレーナーが日時を決める（Firestore screenings）。時間になると、入場した人みんなが同じ場面を一緒に見る（開演時刻からの経過時間でページが決まる）。
(function(){
const PAGE_MS=12000,OPEN_EARLY=30*60000;
const HN={carrot:'キャロット',piman:'ピッピマン',onion:'玉ちゃん',cabbage:'キャベリン',daikon:'ダイコンタ',tomato:'リコピンちゃん',pumpkin:'カボッチャ',broccoli:'ブロッコ将軍',shoga:'ジンジャー忍者',imo:'イモ吉'};
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const say=t=>{try{toast(t)}catch(e){}};
const isTr=()=>ADMIN||(window.AUTH&&AUTH.role==='trainer');
const WD='日月火水木金土',P2=n=>String(n).padStart(2,'0');
const when=t=>{const d=new Date(t);return `${d.getMonth()+1}月${d.getDate()}日（${WD[d.getDay()]}）${P2(d.getHours())}:${P2(d.getMinutes())}`};
const EP=n=>EPISODES.find(e=>e.no===n);
const css=`
.mz{max-width:var(--maxw,720px);margin:0 auto;display:flex;flex-direction:column;gap:12px;padding-bottom:10px}
.mz h2.mzh{margin:6px 0 0;font-size:22px;color:#33501a;display:flex;align-items:center;gap:8px}
.mz .mzc{width:100%;aspect-ratio:16/9;image-rendering:pixelated;border:5px solid #33501a;border-radius:18px;box-shadow:0 6px 0 #c8dc8a;display:block;box-sizing:border-box;background:#1a1420}
.mz .mzgo{border:3px solid #33501a;background:#e8452c;color:#fff;font-weight:900;font-size:17px;border-radius:14px;padding:12px;box-shadow:0 4px 0 #33501a;cursor:pointer}
.mz .mzgo:active{transform:translateY(3px);box-shadow:0 1px 0 #33501a}
.mz .mzbox{background:#fffdf3;border:3px solid #d6ec6e;border-radius:16px;padding:12px 14px}
.mz .mzbox h3{margin:0 0 8px;font-size:16px;color:#9b2f5e}
.mz .mzlead{font-size:14px;line-height:1.8;margin:0;color:#4a5a2a}
.mzshow{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.mzshow li{display:flex;align-items:center;gap:10px;border:2px solid #f3e2c0;border-radius:12px;padding:8px 10px;background:#fff}
.mzshow li canvas{width:44px;height:36px;image-rendering:pixelated;flex:0 0 auto}
.mzshow li div{flex:1;min-width:0;font-size:13px;line-height:1.5}.mzshow li b{display:block;font-size:14px}
.mzshow li .live{color:#e8452c;font-weight:900}
.mzshow button{border:2px solid #33501a;background:#ffe600;color:#33501a;font-weight:900;border-radius:10px;padding:6px 10px;cursor:pointer;white-space:nowrap}
.mzshow button.del{background:#fff;color:#a8221c;border-color:#e8b0a8;font-size:12px}
.mzform{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:10px}
.mzform select,.mzform input{min-width:0;font-size:14px;padding:6px;border:2px solid #d6ec6e;border-radius:8px}
.mzform button{grid-column:1/-1;border:2px solid #33501a;background:#4f7d2a;color:#fff;font-weight:900;border-radius:10px;padding:8px;cursor:pointer}
.mzbooks{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.mzbooks button{display:flex;flex-direction:column;align-items:center;gap:3px;border:3px solid #ffe600;background:#fffbe0;border-radius:12px;padding:8px 6px;cursor:pointer;font-weight:800;color:#33501a;position:relative}
.mzbooks canvas{width:64px;height:52px;image-rendering:pixelated}
.mzvoice{border-color:#e8452c!important}.mzbooks .vo{background:#e8452c;color:#fff;border-radius:999px;padding:1px 8px;font-size:12px}
.mzvov{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.82);display:flex;align-items:center;justify-content:center;padding:12px}.mzvin{width:100%;max-width:960px;background:#1b2a12;border-radius:14px;padding:10px;color:#fff}.mzvh{display:flex;align-items:center;gap:8px;margin-bottom:8px}.mzvh b{flex:1;font-size:15px}.mzvx{font:inherit;font-weight:800;border:0;border-radius:999px;padding:6px 12px;background:#fff;color:#333;cursor:pointer}.mzvin video{width:100%;aspect-ratio:16/9;background:#000;border-radius:8px;display:block}.mzvin .mzlead{color:#dfe9cf;margin:6px 0 0}
.mzbooks small{font-size:11px;color:#6a7a4a}.mzbooks b{font-size:13px;line-height:1.35}
.mzbooks .seen{position:absolute;top:4px;right:6px;font-size:11px;background:#4f9a2a;color:#fff;border-radius:999px;padding:1px 6px}
.mzfull{position:fixed;inset:0;z-index:300;background:#1a1420;display:flex;flex-direction:column;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px);overscroll-behavior:contain;touch-action:manipulation}
.mzfull .mztop{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;background:#33501a;color:#ffe600;font-weight:900;font-size:16px;flex:0 0 auto}
.mzfull .mztop button{border:2px solid #ffe600;background:#e8452c;color:#fff;font-weight:900;border-radius:10px;padding:6px 12px;cursor:pointer;font-size:14px}
.mzfull .mzhall{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:center;max-width:900px;width:100%;margin:0 auto;box-sizing:border-box;padding-bottom:10px}
.mzhall{background:#1a1420;overflow:hidden;position:relative}
.mzval{height:22px;background:radial-gradient(circle at 10px 0,#7fbf2a 9px,transparent 10px) 0 6px/20px 20px repeat-x,#4f9a2a}
.mzscr{position:relative;flex:0 0 auto;width:min(calc(100% - 24px),calc((100dvh - 330px) * 16 / 9));margin:10px auto 0;box-sizing:border-box;border:5px solid #ffe600;border-radius:6px;overflow:hidden;background:#000}
.mzscr canvas{display:block;width:100%;aspect-ratio:16/9;image-rendering:pixelated}
.mzcur{position:absolute;top:0;bottom:0;width:51%;background:repeating-linear-gradient(90deg,#9ccc3c 0 14px,#7fbf2a 14px 28px);transition:transform 1.6s cubic-bezier(.6,.05,.3,1);z-index:3;box-shadow:inset 0 -8px 0 #4f9a2a}
.mzcur.l{left:0}.mzcur.r{right:0}
.mzhall.open .mzcur.l{transform:translateX(-102%)}.mzhall.open .mzcur.r{transform:translateX(102%)}
.mzov{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:5%;gap:4px;text-align:center;z-index:2;pointer-events:none}
.mzov .big{font-family:"DotGothic16",var(--font,system-ui),sans-serif;font-size:clamp(20px,5.4vw,40px);color:#ffe600;-webkit-text-stroke:1.5px #33501a;paint-order:stroke fill;text-shadow:0 3px 0 #33501a;line-height:1.2}
.mzov .sm{font-weight:900;font-size:clamp(12px,2.6vw,16px);color:#fff;background:#e8452c;border:2px solid #33501a;border-radius:999px;padding:2px 12px}
.mzwait{position:absolute;inset:0;z-index:4;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:900;text-shadow:0 2px 0 #33501a;gap:4px;text-align:center}
.mzwait b{font-size:clamp(22px,6vw,40px);color:#ffe600;font-variant-numeric:tabular-nums}
.mzsub{margin:10px 12px 0;background:#fffdf3;border-radius:12px;padding:10px 14px;font-size:clamp(15px,2.4vw,19px);line-height:1.9;height:6.4em;flex:0 0 auto;overflow-y:auto;white-space:pre-line;color:#2c3a18}
.mzsub .q{color:#e8452c;font-weight:900}
.mzend{display:grid;grid-template-columns:1fr 1fr;gap:8px}.mzend>div{background:#fff;border-radius:10px;padding:8px 10px;min-width:0}
.mzend h4{margin:0 0 4px;font-size:13px;color:#9b2f5e}.mzend dt{font-weight:900;color:#f39a1e;font-size:13px}.mzend dd{margin:0 0 4px;font-size:13px;line-height:1.6}
.mzseat{flex:0 0 auto;display:block;width:100%;aspect-ratio:256/30;image-rendering:pixelated;margin-top:8px}
.mzctl{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:8px;margin:10px 12px 0;flex-wrap:wrap}
.mzctl button{border:2px solid #ffe600;background:#33501a;color:#ffe600;font-weight:900;border-radius:10px;padding:8px 14px;cursor:pointer}
.mzctl button:disabled{opacity:.4}
.mzctl span{color:#f3f9dc;font-size:13px;font-weight:700;font-variant-numeric:tabular-nums}
.mzbadge{font-size:11px;background:#e8452c;color:#fff;border-radius:999px;padding:1px 6px;margin-left:4px}
.entrow.e4{grid-template-columns:repeat(4,1fr)}
.entrow button[data-ent="cinema"]{border-color:#9b2f5e;color:#9b2f5e;background:linear-gradient(#fff,#fff6e8)}
.hbook{display:block;width:100%;margin-top:10px;border:3px solid #33501a;background:#ffe600;color:#33501a;font-weight:900;font-size:16px;border-radius:14px;padding:10px;cursor:pointer;box-shadow:0 3px 0 #33501a}
@media (max-width:560px){.mzend{grid-template-columns:1fr}.mzform{grid-template-columns:1fr 1fr}.mzform select{grid-column:1/-1}}
@media (prefers-reduced-motion:reduce){.mzcur{transition:none}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

// ---------- 上映会データ（Firestore screenings。使えない時はこの端末だけ） ----------
let SCR=[],scrAt=0,scrErr=null;
const fdb=()=>{try{return window.firebase&&firebase.apps&&firebase.apps.length&&firebase.firestore()}catch(e){return null}};
const LKEY='kq-screenings';
const lget=()=>{try{return JSON.parse(localStorage.getItem(LKEY)||'[]')}catch(e){return[]}};
const lset=a=>{try{localStorage.setItem(LKEY,JSON.stringify(a))}catch(e){}};
async function loadScr(force){if(!force&&Date.now()-scrAt<25000)return;scrAt=Date.now();const d=fdb();let a=null;
  if(d&&window.AUTH&&AUTH.user){try{const q=await d.collection('screenings').get();a=[];q.forEach(x=>a.push(Object.assign({id:x.id},x.data())));scrErr=null}catch(e){scrErr=String(e&&e.code||e);a=null}}
  SCR=(a||lget()).filter(x=>x&&x.ep&&x.at).sort((x,y)=>x.at-y.at);if(tab==='cinema'&&C.scene==='lobby')drawShows();try{entMark()}catch(e){}}
const dur=s=>(EP(s.ep)?EP(s.ep).pages.length+2:10)*PAGE_MS;
// v162（MITSUさん 2026-11-21）：日時を決める上映会はやめて、いつでも観られる形だけにする
const NO_SHOWS=true;
const upcoming=()=>NO_SHOWS?[]:SCR.filter(s=>s.at+dur(s)>Date.now());
async function addScr(ep,at){const it={ep,at,by:(()=>{try{return TN()}catch(e){return''}})(),t:Date.now()};const d=fdb();
  if(d&&window.AUTH&&AUTH.user){try{await d.collection('screenings').doc(String(at)+'_'+ep).set(it);say('上映会を予約しました');await loadScr(true);return}catch(e){say('保存できませんでした（ルールの更新が必要かもしれません）：'+(e&&e.code||e));return}}
  const a=lget();a.push(Object.assign({id:'l'+Date.now()},it));lset(a);say('上映会を予約しました（この端末だけ）');loadScr(true)}
async function delScr(id){const d=fdb();if(String(id)[0]!=='l'&&d){try{await d.collection('screenings').doc(id).delete()}catch(e){say('消せませんでした：'+(e&&e.code||e));return}}else lset(lget().filter(x=>x.id!==id));say('上映会を取り消しました');loadScr(true)}

// ---------- 画面 ----------
const C={scene:'out',ep:1,pi:0,mode:'free',show:null,auto:false,timer:null,done:{}};
function seenMap(){const m=me();return (m&&m.ehon)||{}}
function reward(ep){if(ADMIN)return;const m=me();if(!m)return;m.ehon=m.ehon||{};if(m.ehon[ep.no])return;m.ehon[ep.no]=Date.now();
  const h=HEROES.find(x=>x.key===ep.hero);const stat=(typeof BUDDY_ST!=='undefined'&&h&&BUDDY_ST[h.stat])||'grit';
  try{gain(m,stat,20,`🎬 ミドリ座で 第${ep.no}話「${ep.title}」を観た！`)}catch(e){console.warn(e)}try{save()}catch(e){}say(`🎬 観たよスタンプ！ 第${ep.no}話（+20EXP）`)}
function stopT(){if(C.timer){clearInterval(C.timer);C.timer=null}}
function heroCv(k,w=27,h=22){return `<canvas width="${w}" height="${h}" data-hero="${k}"></canvas>`}
function back(){const b=document.createElement('button');b.type='button';b.id='subback';b.className='subback';
  if(C.scene==='out'){b.textContent='‹ もどる';b.onclick=()=>{stopT();try{tab=(window.KQ_SUB&&KQ_SUB.last())||'hero'}catch(e){tab='hero'}render();scrollTo(0,0)}}
  else if(C.scene==='lobby'){b.textContent='‹ 外に出る';b.onclick=()=>{C.scene='out';render();scrollTo(0,0)}}
  else{b.textContent='‹ ロビーへ';b.onclick=()=>{stopT();C.scene='lobby';render();scrollTo(0,0)}}
  return b}
window.vCinema=function(){if(!document.getElementById('mzfull'))stopT();if(C.scene==='hall')C.scene='lobby';const v=document.getElementById('view');v.innerHTML='';v.appendChild(back());
  const w=document.createElement('div');w.className='mz';v.appendChild(w);
  if(C.scene==='out')vOut(w);else if(C.scene==='lobby')vLobby(w);else vHall(w);
  loadScr(false)};
function vOut(w){const nx=upcoming()[0];
  w.innerHTML=`<h2 class="mzh">🎬 絵本映画館 ミドリ座</h2><canvas class="mzc" id="mzc" width="256" height="144" aria-label="ミドリ座の外観"></canvas>
  ${nx?`<div class="mzbox"><h3>🎟 次の上映会</h3><p class="mzlead"><b>${when(nx.at)}</b>〜 第${nx.ep}話「${E(EP(nx.ep).title)}」</p></div>`:''}
  <button type="button" class="mzgo" id="mzin">🚪 扉を開けて、中へ入る</button>
  <p class="mzlead">畑の真ん中に建つ、南瓜の形の小さな映画館。「畑の国の お野菜十勇士」の絵本を、映画のように上映しています。</p>`;
  drawOut(w.querySelector('#mzc').getContext('2d'));w.querySelector('#mzin').onclick=()=>{C.scene='lobby';render();scrollTo(0,0)}}
function vLobby(w){const sm=seenMap();
  w.innerHTML=`<h2 class="mzh">🎬 ミドリ座 ロビー</h2><canvas class="mzc" id="mzc" width="256" height="144" aria-label="ロビー"></canvas>
  <div class="mzbox" ${NO_SHOWS?'hidden':''}><h3>🎟 上映会のスケジュール</h3><ul class="mzshow" id="mzshows"></ul>${isTr()?`<div class="mzform"><select id="mzep" aria-label="上映する話">${EPISODES.map(e=>`<option value="${e.no}">第${e.no}話 ${E(e.title)}</option>`).join('')}</select><input type="date" id="mzd" aria-label="日にち"><input type="time" id="mzt" step="900" value="20:00" aria-label="時刻"><button type="button" id="mzadd">🎬 この日時で上映会を予約する</button></div><p class="mzlead" style="font-size:12px;margin-top:6px">時間になると、入場した人みんなが同じ場面を一緒に見られます（1話 約2分）。</p>`:''}</div>
  <div class="mzbox"><h3>📚 絵本コーナー（いつでも上映）</h3><p class="mzlead" style="margin-bottom:8px">いつでも好きな話を観られます。最後まで観ると「観たよスタンプ」とEXPがもらえます（1話1回）。</p>
  <div class="mzbooks">${EPISODES.map(e=>`<button type="button" data-mzep="${e.no}">${sm[e.no]?'<span class="seen">観た！</span>':''}${heroCv(e.hero)}<small>第${e.no}話・${HN[e.hero]}</small><b>${E(e.title)}</b></button>`).join('')}</div></div>
  ${Object.keys(VOICE).length?`<div class="mzbox mzvoice"><h3>🎙 声つき絵本（動画）</h3><p class="mzlead" style="margin-bottom:8px">声と音楽つきの絵本です。音が出るので、まわりに気をつけて観てね。</p><div class="mzbooks">${EPISODES.filter(e=>VOICE[e.no]).map(e=>`<button type="button" data-mzvo="${e.no}"><span class="vo">▶ 声つき</span>${heroCv(e.hero)}<small>第${e.no}話・${HN[e.hero]}</small><b>${E(e.title)}</b></button>`).join('')}</div></div>`:''}`;
  drawLobby(w.querySelector('#mzc').getContext('2d'));drawShows();
  w.querySelectorAll('[data-mzep]').forEach(b=>b.onclick=()=>openFree(+b.dataset.mzep));
  w.querySelectorAll('[data-mzvo]').forEach(b=>b.onclick=()=>openVoice(+b.dataset.mzvo));
  const add=w.querySelector('#mzadd');if(add){const d=new Date();d.setDate(d.getDate()+1);w.querySelector('#mzd').value=`${d.getFullYear()}-${P2(d.getMonth()+1)}-${P2(d.getDate())}`;
    add.onclick=()=>{const ds=w.querySelector('#mzd').value,ts=w.querySelector('#mzt').value;if(!ds||!ts){say('日にちと時刻を入れてください');return}const at=new Date(ds+'T'+ts).getTime();if(!(at>Date.now())){say('これからの日時を選んでください');return}addScr(+w.querySelector('#mzep').value,at)}}}
function drawShows(){const ul=document.getElementById('mzshows');if(!ul)return;const now=Date.now(),a=upcoming();
  ul.innerHTML=a.length?a.map(s=>{const e=EP(s.ep);if(!e)return'';const live=now>=s.at,soon=now>=s.at-OPEN_EARLY;
    return `<li>${heroCv(e.hero)}<div><b>第${e.no}話「${E(e.title)}」</b>${live?'<span class="live">● 上映中</span>':when(s.at)+' 開演'}${s.by?` ・${E(s.by)}`:''}</div>${soon?`<button type="button" data-mzshow="${E(s.id)}">${live?'入場する':'早めに入場'}</button>`:''}${isTr()?`<button type="button" class="del" data-mzdel="${E(s.id)}">取消</button>`:''}</li>`}).join('')
   :`<li><div>いまは予定がありません。${isTr()?'下から上映会を予約できます。':'絵本コーナーで、いつでも観られます。'}</div></li>`;
  ul.querySelectorAll('[data-mzshow]').forEach(b=>b.onclick=()=>{const s=SCR.find(x=>String(x.id)===b.dataset.mzshow);if(s)openShow(s)});
  ul.querySelectorAll('[data-mzdel]').forEach(b=>b.onclick=()=>{if(b.dataset.c){delScr(b.dataset.mzdel)}else{b.dataset.c=1;b.textContent='本当に取消'}})}
// 🎙 声つき絵本（動画）v168：第1話（MITSUさん 2026-11-21 完成OK）
const VOICE={1:'https://videocdn.pollo.ai/web-cdn/pollo/production/cmuzbvtiq0b4fub7xas00yf9z/ori/a79f42da-cb5f-4442-b2ad-9371969e3ddd-0-07df684b7400299f.mp4'};
function openVoice(n){const ep=EP(n),src=VOICE[n];if(!ep||!src)return;let o=document.getElementById('mzvov');if(o)o.remove();o=document.createElement('div');o.id='mzvov';o.className='mzvov';
  o.innerHTML=`<div class="mzvin"><div class="mzvh"><b>🎙 第${ep.no}話「${E(ep.title)}」</b><button type="button" class="mzvx" aria-label="とじる">✕ とじる</button></div><video controls playsinline autoplay preload="metadata" src="${src}"></video><p class="mzlead" style="font-size:12px">最後まで観ると「観たよスタンプ」がもらえます（1話1回）。</p></div>`;
  document.body.appendChild(o);const v=o.querySelector('video');const close=()=>{try{v.pause()}catch(e){}o.remove();try{render()}catch(e){}};
  o.querySelector('.mzvx').onclick=close;o.onclick=e=>{if(e.target===o)close()};v.onended=()=>{reward(ep)};v.onerror=()=>{say('動画を読みこめませんでした。通信のよいところで、もう一度ためしてね')}}
function openFree(n){C.mode='free';C.ep=n;C.pi=0;C.auto=true;C.show=null;if(tab!=='cinema'){tab='cinema';C.scene='lobby';render()}openHall()}
function openShow(s){C.mode='show';C.ep=s.ep;C.show=s;C.pi=0;openHall()}
function hallOpen(){return !!document.getElementById('mzfull')}
function closeHall(){stopT();const o=document.getElementById('mzfull');if(o)o.remove();document.documentElement.style.overflow='';document.body.style.overflow='';if(tab==='cinema'&&C.scene==='lobby')render()}
function openHall(){stopT();let o=document.getElementById('mzfull');if(!o){o=document.createElement('div');o.id='mzfull';o.className='mzfull';o.setAttribute('role','dialog');o.setAttribute('aria-label','ミドリ座 上映室');document.body.appendChild(o)}
  document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';vHall(o)}
addEventListener('keydown',ev=>{if(ev.key==='Escape'&&hallOpen())closeHall()});
window.KQ_openEhon=openFree;
function pagesOf(e){return [{kind:'title'},...e.pages,{kind:'end'}]}
function vHall(w){const e=EP(C.ep),pages=pagesOf(e);
  w.innerHTML=`<div class="mztop"><span>🎬 ミドリ座 ${C.mode==='show'?'上映会':'自由上映'}：第${e.no}話</span><button type="button" id="mzx">✕ ロビーへ</button></div>
  <div class="mzhall" id="mzhall"><div class="mzval"></div><div class="mzscr"><canvas id="mzsc" width="256" height="144" aria-label="場面の絵"></canvas><div class="mzov" id="mzov" hidden></div><div class="mzcur l"></div><div class="mzcur r"></div><div class="mzwait" id="mzwait" hidden></div></div>
  <div class="mzsub" id="mzsub"></div>
  <div class="mzctl">${C.mode==='free'?`<button type="button" id="mzpv">‹ 前へ</button><button type="button" id="mzau"></button><span id="mzpg"></span><button type="button" id="mznx">次へ ›</button>`:`<span id="mzpg"></span><span>みんなで同じ場面を観ています</span>`}</div>
  <canvas class="mzseat" id="mzseat" width="256" height="30" aria-hidden="true"></canvas></div>`;
  drawSeats(w.querySelector('#mzseat').getContext('2d'));w.querySelector('#mzx').onclick=closeHall;
  const hall=w.querySelector('#mzhall'),cv=w.querySelector('#mzsc'),ctx=cv.getContext('2d');let shown=-2;
  function paint(i){if(i===shown)return;shown=i;const p=pages[i],ov=w.querySelector('#mzov'),sub=w.querySelector('#mzsub');ART.use(ctx,e.no*100+i);ctx.clearRect(0,0,256,144);
    if(p.kind==='title'||p.kind==='end'){epCover(e);ov.hidden=false;ov.innerHTML=p.kind==='title'?`<div class="big">${E(e.title)}</div><div class="sm">第${e.no}話・${HN[e.hero]}</div>`:`<div class="big">お仕舞い</div><div class="sm">第${e.no}話「${E(e.title)}」</div>`}
    else{p.draw(ART);ov.hidden=true}
    if(p.kind==='title')sub.innerHTML=hl(`季節は${e.season}。\n今日の主役は、${HN[e.hero]}です。`);
    else if(p.kind==='end'){sub.innerHTML=`<div class="mzend"><div><h4>今日の大切なこと</h4><b>${hl(e.lesson)}</b></div><div><h4>${E(e.power.veg)}の力</h4><dl>${e.power.items.map(([t,d])=>`<dt>${E(t)}</dt><dd>${E(d)}</dd>`).join('')}</dl></div></div>`;reward(e)}
    else sub.innerHTML=hl(p.text);
    const pg=w.querySelector('#mzpg');if(pg)pg.textContent=`${i+1} / ${pages.length}`;
    if(C.mode==='free'){w.querySelector('#mzpv').disabled=i===0;w.querySelector('#mznx').textContent=i===pages.length-1?(EP(e.no+1)?'次の話 ›':'ロビーへ ›'):'次へ ›'}}
  if(C.mode==='free'){
    const au=w.querySelector('#mzau'),setAu=()=>{au.textContent=C.auto?'⏸ 止める':'▶ 自動で進む'};setAu();
    const go=d=>{if(d>0&&C.pi===pages.length-1){const n=EP(e.no+1);if(n){C.ep=n.no;C.pi=0;openHall()}else closeHall();return}C.pi=Math.max(0,Math.min(pages.length-1,C.pi+d));tick=Date.now();paint(C.pi)};
    let tick=Date.now();w.querySelector('#mzpv').onclick=()=>{C.auto=false;setAu();go(-1)};w.querySelector('#mznx').onclick=()=>{go(1)};au.onclick=()=>{C.auto=!C.auto;tick=Date.now();setAu()};
    let sx=null;const sc=w.querySelector('.mzscr');sc.addEventListener('touchstart',ev=>sx=ev.touches[0].clientX,{passive:true});sc.addEventListener('touchend',ev=>{if(sx==null)return;const dx=ev.changedTouches[0].clientX-sx;if(Math.abs(dx)>40){C.auto=false;setAu();go(dx<0?1:-1)}sx=null});
    paint(C.pi);setTimeout(()=>hall.classList.add('open'),250);
    C.timer=setInterval(()=>{if(!hallOpen()){stopT();return}if(C.auto&&C.pi<pages.length-1&&Date.now()-tick>=PAGE_MS)go(1)},400);
  }else{
    const s=C.show,wait=w.querySelector('#mzwait');
    const step=()=>{if(!hallOpen()){stopT();return}const el=Date.now()-s.at;
      if(el<0){hall.classList.remove('open');wait.hidden=false;const r=Math.ceil(-el/1000);wait.innerHTML=`<span>開演まで</span><b>${r>=3600?Math.floor(r/3600)+'時間'+P2(Math.floor(r%3600/60))+'分':P2(Math.floor(r/60))+':'+P2(r%60)}</b><span>${when(s.at)}</span>`;paint(0);return}
      wait.hidden=true;hall.classList.add('open');const i=Math.min(pages.length-1,Math.floor(el/PAGE_MS));paint(i);
      if(i===pages.length-1){const pg=w.querySelector('#mzpg');if(pg)pg.textContent='上映終了。ご来場ありがとうございました！'}};
    step();C.timer=setInterval(step,500)}}
function hl(s){return E(s).replace(/「([^」]*)」/g,'<span class="q">「$1」</span>')}
// ---------- 絵（ドット絵） ----------
function epCover(e){const A=ART;A.sky(['#f3f9dc','#e8f4c0','#d6ec6e'],144);for(let i=0;i<24;i++)A.R(i*12,0,6,144,'#eaf5c8');A.glow(128,92,40,'#ffe600',.25);A.hero(e.hero,92,58,2.7);A.bunny(206,110,'#ffffff',2,true,true);A.heart(220,100)}
function drawSeats(ctx){const A=ART;A.use(ctx,5);A.R(0,0,256,30,'#1a1420');for(let i=0;i<11;i++){const x=4+i*23;A.oval(x+10,18,10,6,'#c8321c');A.oval(x+10,15,9,4,'#e8452c');A.P(x+5,13,'#ff9a80')}
  ['carrot','piman','cabbage','imo','broccoli','tomato'].forEach((k,i)=>A.hero(k,10+i*42,-4,0.9));A.bunny(236,8,'#ffffff',1,true,true)}
function drawOut(ctx){const A=ART;A.use(ctx,11);
 A.sky(['#1c2440','#2a3458','#3a4468','#5a5a7a','#8a6a7a'],100);A.stars(40,50);A.moon(30,22,8,'#2a3458');
 A.hills(92,5,'#2a4a24',1,.03);A.ground(100,'#33501a','#4f7d2a');A.field(112,144,'#5a4a2a','#4f9a2a');
 const {R,oval,disc}=A,cx=128,cy=70;A.glow(cx,cy,60,'#f39a1e',.18);
 oval(cx,cy,62,34,'#c86a1a');for(let k=-3;k<=3;k++)oval(cx+k*16,cy,10,33,k%2?'#f39a1e':'#e8841e');oval(cx-40,cy+2,8,28,'#f5a83a');
 R(cx-3,cy-44,6,12,'#4f7d2a');R(cx+2,cy-48,10,4,'#4f7d2a');disc(cx+14,cy-46,4,'#7fbf2a');
 R(cx+1,cy-62,1,16,'#6a4a2a');R(cx+2,cy-62,12,7,'#e8452c');R(cx+4,cy-60,8,1,'#ffe600');R(cx+4,cy-58,6,1,'#ffe600');
 R(cx-46,cy-20,92,12,'#33501a');R(cx-44,cy-18,88,8,'#ffe600');[-38,-26,-14,-2,10,22,34].forEach((a,i)=>R(cx+a,cy-16,6,4,i%2?'#e8452c':'#9b2f5e'));
 R(cx-14,cy+8,28,26,'#5a2a1a');R(cx-12,cy+10,24,24,'#8a3a1a');R(cx,cy+10,1,24,'#5a2a1a');disc(cx-3,cy+22,1,'#ffe600');disc(cx+3,cy+22,1,'#ffe600');A.glow(cx,cy+22,14,'#ffe9a0',.2);
 [-40,30].forEach(a=>{R(cx+a,cy+2,10,10,'#ffe9a0');R(cx+a+4,cy+2,1,10,'#c86a1a');R(cx+a,cy+6,10,1,'#c86a1a')});
 for(let i=0;i<8;i++)A.lantern(cx-56+i*16,cy-30+Math.abs(i-3.5)*2);A.path(cx,104,144,'#e8c890','#d8b878',24,1.6,0);
 A.bunny(150,92,'#ffffff',2,true,true);R(146,98,6,4,'#ffe600');A.hero('carrot',40,98,1.4);A.hero('cabbage',196,98,1.4,true)}
function drawLobby(ctx){const A=ART;A.use(ctx,22);const {R}=A;R(0,0,256,144,'#5a2a3a');for(let i=0;i<256;i+=16)R(i,0,8,96,'#64303f');R(0,96,256,48,'#c8a060');for(let j=96;j<144;j+=8)for(let i=(j/8%2)*8;i<256;i+=16)R(i,j,8,8,'#b8904a');R(0,92,256,4,'#33501a');
 const keys=['carrot','shoga','pumpkin','daikon','piman','cabbage','broccoli','onion','tomato','imo'],bg=['#ffd878','#bfe2f0','#2a3458','#dfeefa','#6a7488','#fde0b0','#b8e4ff','#fff3d0','#4ab0f0','#e8a040'];
 keys.forEach((k,i)=>{const y=i<5?12:52,px=8+(i%5)*24;R(px-2,y-2,22,30,'#ffe600');R(px,y,18,26,bg[i]);A.hero(k,px-5,y+4,0.95)});
 R(150,40,100,52,'#9b2f5e');R(150,40,100,6,'#e8452c');for(let i=0;i<100;i+=10)R(150+i,46,5,6,'#ffffff');R(156,62,88,30,'#fff0d0');R(160,70,20,12,'#5a4a4a');for(let i=0;i<5;i++)A.oval(164+i*3,68,2,1,'#9b2f5e');
 for(let i=0;i<4;i++){R(190+i*12,70,8,12,['#f39a1e','#e8452c','#9ccc3c','#ffe600'][i]);R(191+i*12,68,6,2,'#ffffff')}A.glow(200,56,30,'#ffe9a0',.12);A.bunny(204,52,'#ffffff',2,false,true);
 R(20,104,60,12,'#e8452c');R(18,100,4,16,'#a8221c');R(78,100,4,16,'#a8221c');A.hero('onion',30,80,1.2);A.hero('tomato',54,80,1.2);A.person(110,104,2,'#5a6aa8','#4a3020');A.person(130,104,2,'#f39a1e','#6a4020');A.heart(124,96);A.lantern(140,10);A.lantern(240,10)}
// ---------- 入口ボタンの「上映会」マーク・十勇士の物語から絵本へ ----------
function entMark(){const b=document.querySelector('#entrow [data-ent="cinema"] small');if(!b)return;const nx=upcoming()[0];const t=nx?(Date.now()>=nx.at?'● 上映中':`上映会 ${new Date(nx.at).getMonth()+1}/${new Date(nx.at).getDate()}`):'絵本の映画館';if(b.textContent!==t)b.textContent=t}
new MutationObserver(()=>{const hs=document.getElementById('hsheet');if(hs&&!hs.querySelector('.hbook')){const c=hs.querySelector('canvas[data-hero]'),st=hs.querySelector('.hsst');if(!c||!st)return;const k=c.dataset.hero,e=EPISODES.find(x=>x.hero===k);if(!e)return;
  const b=document.createElement('button');b.type='button';b.className='hbook';b.textContent=`📚 ${HN[k]}の絵本を読む（第${e.no}話）`;b.onclick=()=>{hs.remove();openFree(e.no)};st.after(b)}
  try{entMark()}catch(e){}}).observe(document.body,{childList:true,subtree:true});
setInterval(()=>{if(document.visibilityState==='visible')loadScr(false)},30000);
const boot=()=>{loadScr(true);if(tab==='cinema')render()};
if(window.AUTH&&AUTH.on)setTimeout(boot,1500);boot();
})();
