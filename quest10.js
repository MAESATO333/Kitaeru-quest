// ===== キタエル・クエスト v146：10の新しい冒険 =====
// ①通いのリズム ②ヨガの森への招待状 ③おかえり作戦 ④冒険の地図 ⑤週刊ミドリ座 ⑥冒険の書
// ⑦畑のなかま ⑧ミドリ村まつり ⑨たねまき招待 ⑩今日のミドリ村（SNS下書き）
// index.html の S / me() / gain() / render() などを使う。金額は出さない（MITSUさん）。
(function(){
if(typeof S==='undefined'||typeof render!=='function')return;
const D=864e5,E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const say=t=>{try{toast(t)}catch(e){}};
const tn=()=>{try{return TN()}catch(e){return ''}};
const Q=()=>{S.q10=S.q10||{};const q=S.q10;q.events=q.events||[];q.shows=q.shows||[];q.farms=q.farms||[];q.farmMsg=q.farmMsg||{};q.sns=q.sns||{};if(q.mapW0==null)q.mapW0=weekNo();return q};
const guests=()=>S.members.filter(m=>!m.tr&&!m.left);
const HN=k=>(HEROES.find(h=>h.key===k)||HEROES[0]);
const now0=()=>Date.now()+((S.dayShift||0)*D);
const dOf=k=>{const [y,mo,d]=String(k).split('-').map(Number);return new Date(y,mo-1,d)};
const todayK=()=>ymd(new Date(now0()));
const monday=(t)=>{const d=new Date(t);d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return d};
const wkKey=(off=0)=>{const d=monday(now0()-off*7*D);return ymd(d)};
const COMBO=new Set(['lift','machine']);
// ---- 来館した日（入室の記録＋今週の印）----
function vdays(m){const s=new Set((m.visits||[]).filter(Boolean));const mon=monday(now0()),td=(new Date(now0()).getDay()+6)%7;(m.streak||[]).forEach((x,i)=>{if(x&&i<=td){const d=new Date(mon);d.setDate(d.getDate()+i);s.add(ymd(d))}});return s}
function weekCount(m,off=0){const a=monday(now0()-off*7*D).getTime(),b=a+7*D;let n=0;vdays(m).forEach(k=>{const t=dOf(k).getTime();if(t>=a&&t<b)n++});return n}
function lastVisit(m,exceptToday){const tk=todayK();let mx=0;vdays(m).forEach(k=>{if(exceptToday&&k===tk)return;const t=dOf(k).getTime();if(t>mx)mx=t});return mx}
function daysAway(m){const l=lastVisit(m);return l?Math.floor((monday(now0()).getTime()+((new Date(now0()).getDay()+6)%7)*D-l)/D):null}
function satList(m){return S.feed.filter(f=>f.who===m.id&&/満足度(\d+)%/.test(f.text||'')).sort((a,b)=>a.t-b.t).map(f=>+/満足度(\d+)%/.exec(f.text)[1])}
// ================= ① 通いのリズム =================
function rhyCheck(m){if(!m||m.tr)return;const wk=wkKey(),c=weekCount(m);m.rhy=m.rhy&&m.rhy.wk===wk?m.rhy:{wk,got:[]};m.rhyH=m.rhyH||{};m.rhyH[wk]=c;
  if(c>=2&&!m.rhy.got.includes(2)){m.rhy.got.push(2);gain(m,'grit',50,'🍅 通いのリズム：今週2回目！ 相棒の木に実がなった')}
  if(c>=3&&!m.rhy.got.includes(3)){m.rhy.got.push(3);gain(m,'grit',120,'✨ 通いのリズム：今週3回目！ 金の実がなった')}
  // 週2を4週つづけたら「旬の姿」
  if(c>=2&&[1,2,3].every(o=>(m.rhyH[wkKey(o)]||weekCount(m,o))>=2)&&!m.titles.includes('旬の冒険者')){m.titles.push('旬の冒険者');S.feed.unshift({id:S.nextId++,who:m.id,text:'🌾 週2回を4週つづけて、称号「旬の冒険者」になりました！',xp:0,stat:'grit',t:Date.now(),cheers:[]})}
  // 二刀流コンボ：同じ週に 加圧/マシン と ヨガ
  if(!m.rhy.got.includes('combo')){const a=monday(now0()).getTime();const ks=new Set(S.feed.filter(f=>f.who===m.id&&f.t>=a).map(f=>myKind(f.text||'')));if([...ks].some(k=>COMBO.has(k))&&ks.has('yoga')){m.rhy.got.push('combo');gain(m,'grit',60,'⚔🧘 二刀流コンボ！ 今週は鍛えて、整えた');if(!m.titles.includes('二刀流の冒険者'))m.titles.push('二刀流の冒険者')}}
  save()}
function treeCv(cv,c){const x=cv.getContext('2d');cv.width=160;cv.height=110;x.imageSmoothingEnabled=false;const R=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a,b,w,h)};
  R(0,0,160,110,'#cfe9f7');R(0,86,160,24,'#9ccc3c');for(let i=0;i<160;i+=6)R(i,86,3,2,'#b8dc5a');R(76,46,8,42,'#6a4a2a');
  const disc=(cx,cy,r,col)=>{for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++)if(i*i+j*j<=r*r)R(cx+i,cy+j,1,1,col)};
  disc(80,36,26,'#3f8a2a');disc(62,46,14,'#3f8a2a');disc(98,46,14,'#3f8a2a');disc(74,30,10,'#5aa83a');
  if(c>=1){disc(64,40,4,'#ffffff');R(64,40,1,1,'#ffe600');disc(96,30,4,'#ffffff');R(96,30,1,1,'#ffe600')}
  if(c>=2){disc(70,52,5,'#e8452c');R(69,50,1,1,'#fff');disc(96,48,5,'#e8452c');R(95,46,1,1,'#fff')}
  if(c>=3){disc(80,18,6,'#ffcf20');disc(79,17,3,'#fff3a0');R(88,10,1,5,'#fff');R(86,12,5,1,'#fff')}}
function rhyCard(m){const c=weekCount(m),wd=['月','火','水','木','金','土','日'],mon=monday(now0()),vs=vdays(m),td=(new Date(now0()).getDay()+6)%7;
  const next=c<1?'今週1回来ると、花が咲きます🌼':c<2?'あと1回で <b>実🍅</b>（+50EXP）':c<3?'あと1回で <b>金の実✨</b>（+120EXP）':'今週は<b>金の実</b>までなりました！';
  const h=HN(m.buddy||'tomato');
  return `<section class="q10c rhy"><div class="q10h">🌳 通いのリズム <small>今週 ${c}回</small></div>
   <div class="rhyb"><canvas class="rhycv" data-c="${c}"></canvas><div class="rhyw">${wd.map((w,i)=>{const d=new Date(mon);d.setDate(d.getDate()+i);const on=vs.has(ymd(d)),off=i===1||i===2;return `<span class="${on?'on':off?'off':''}${i===td?' td':''}">${w}</span>`}).join('')}</div></div>
   <p class="q10p">${next}<br><small>週1回＝花🌼 ／ 週2回＝実🍅 ／ 週3回＝金の実✨（火・水は定休日）。週2回を4週つづけると称号「旬の冒険者」。</small></p>
   ${c>=1&&c<3&&!ADMIN?`<div class="q10msg"><canvas data-hero="${h.key}" class="q10mini"></canvas><span>${E(h.name)}：「${c<2?'あと1回で実がなるよ！ 次はいつ来られそう？':'あと1回で金色になるよ！'}」</span></div>
   <button type="button" class="q10btn" data-want="rhy">${m.yWant&&!m.yWant.done?'✅ 予約の希望をトレーナーに送りました':'📅 次の予約をしたい（トレーナーに届く）'}</button>`:''}
   ${m.planInfo&&!m.planInfoSeen?`<div class="q10note">📈 <b>週2回・週3回のご案内</b>がトレーナーから届いています。くわしくは担当トレーナーに聞いてみてね。 <button type="button" data-plok>わかった</button></div>`:''}
  </section>`}
// ================= ② 招待状（加圧→ヨガ など） =================
const INV={yoga:{hero:'cabbage',place:'ヨガの森',prog:'YOGA',msg:'いつもがんばっているのね。体が少し固くなっていない？ ヨガの森で、呼吸といっしょに ゆっくり整えましょう。鍛える力と、整える力。二つそろうと、もっと強くなれるわ。'},
  lift:{hero:'pumpkin',place:'力の山',prog:'加圧トレ',msg:'しなやかな体ができてきたな！ 次は力の山で、短い時間でしっかり鍛える「加圧」に挑戦してみないか？ おいらが一緒に登るぞ。'},
  meal:{hero:'onion',place:'台所の塔',prog:'食事セラピー',msg:'体を動かしたあとは、食べるものも大切なの。台所の塔で、あなたに合う食べ方を一緒に見つけましょう。'}};
function invCard(m){const v=m.inv;if(!v||v.st==='no'||v.st==='trial-end')return '';const I=INV[v.k];if(!I)return '';
  if(v.st==='trial')return `<section class="q10c inv"><div class="q10h">🌿 ${I.place}のお試し中</div><p class="q10p">${E(I.prog)}の記録が <b>${new Date(v.until).getMonth()+1}月${new Date(v.until).getDate()}日</b> まで使えます。同じ週に「鍛える」と「整える」をすると <b>二刀流コンボ</b>！</p></section>`;
  if(v.st==='want')return `<section class="q10c inv"><div class="q10h">🌿 ${I.place}への招待状</div><p class="q10p">✅ 体験の希望をトレーナーに送りました。日時はトレーナーから連絡があります。</p></section>`;
  return `<section class="q10c inv"><div class="q10h">💌 ${I.place}への招待状 <small>${E(HN(I.hero).name)}より</small></div>
   <div class="q10msg"><canvas data-hero="${I.hero}" class="q10mini"></canvas><span>「${E(I.msg)}」</span></div>
   <p class="q10p">🎟 <b>${E(I.prog)} 体験 1回のご招待</b>（${E(v.by||'')}トレーナーから）</p>
   <div class="q10row"><button type="button" class="q10btn g" data-inv="want">体験を予約したい</button><button type="button" class="q10btn w" data-inv="no">今はやめておく</button></div></section>`}
function trialTick(){const t=now0();S.members.forEach(m=>{const v=m.inv;if(v&&v.st==='trial'&&v.until<t){if(v.added)m.allow=(m.allow||[]).filter(k=>k!==v.k);v.st='trial-end'}})}
// ================= ③ おかえり作戦 =================
function okLevel(m){const a=daysAway(m),r=[],s=satList(m).slice(-3);
  if(a!=null&&a>=14)r.push(['r',`${a}日 来ていません`]);else if(a!=null&&a>=7)r.push(['y',`${a}日 来ていません`]);
  if(s.length>=3&&s[2]<s[1]&&s[1]<s[0])r.push(['y',`満足度が2回つづけて下がりました（${s.join('→')}%）`]);
  const bk=(window._bkf||[]).filter(b=>b.uid===m.uid&&b.st==='tori').length;if(bk>=2)r.push(['y',`予約の取り消しが${bk}回`]);
  return r}
const PLAN=(m,r)=>r.some(x=>x[0]==='r')?'担当トレーナーから電話かメッセージで一言。責めずに「待ってるよ」。':r.some(x=>/満足度/.test(x[1]))?'健康メモと今日の気持ちを見て、メニューを軽くする相談を。':'30分くらいの短い予約を提案してみる。';
function letterCard(m){const a=daysAway(m),show=(m.letter&&!m.letter.read)||(a!=null&&a>=7);if(!show)return '';const h=HN(m.buddy||'carrot');const done=m.q10min===dayKey();
  return `<section class="q10c okr"><div class="q10h">💌 ${E(h.name)}からのお手紙</div>
   <div class="q10msg"><canvas data-hero="${h.key}" class="q10mini"></canvas><span>「最近いそがしいのかな？ 畑でずっと待ってるよ。今日は10分だけ、いっしょに体を動かさない？ 来られる日が決まったら、また会おうね。」</span></div>
   <div class="q10row"><button type="button" class="q10btn g" data-min ${done?'disabled':''}>${done?'✅ 今日の10分クエスト クリア':'🏠 10分だけクエスト（+30EXP）'}</button><button type="button" class="q10btn w" data-want="okaeri">ジムの予約をしたい</button></div>
   <p class="q10p"><small>10分だけクエスト：足踏み3分 → スクワット10回 → 深呼吸1分 → ストレッチ。家でOK。<br>ひさしぶりにジムに来た日は <b>おかえりの実（+200EXP）</b>！</small></p></section>`}
// ---- 入室のとき：おかえりの実・通いのリズム ----
{const _d=doCheckin;doCheckin=function(m){const before=lastVisit(m,true),already=vdays(m).has(todayK());const r=_d.apply(this,arguments);
  try{if(!already&&before&&now0()-before>=7*D){gain(m,'grit',200,'🏡 おかえりの実！ ひさしぶりの来館');if(m.letter)m.letter.read=true;m.okBack=Date.now()}rhyCheck(m);placeCheck(m)}catch(e){console.warn(e)}return r}}
// ================= ④ 冒険の地図 =================
const PLACES=[
 ['ミドリ座',0,'carrot','','絵本映画館。ここから村の外への冒険が始まる。'],
 ['夜明けの森',2,'carrot','carrot','キャロットが霧の魔物モヤモヤンを切りさき、朝日を呼んだ森。暗い道も、一歩ずつなら進める。'],
 ['ピーマン砦',4,'piman','piman','ピッピマンが大きな盾でみんなを守った砦。苦いものほど、体を守ってくれる。'],
 ['玉ねぎの塔',6,'onion','onion','玉ちゃんが涙の魔法で村を救った塔。てっぺんからは村じゅうが見わたせる。'],
 ['キャベツの泉',9,'cabbage','cabbage','キャベリンがけが人を癒した泉。ここで休むと、心と体がふわっと軽くなる。'],
 ['ナマケ沼',12,'daikon','daikon','ナマケ竜が寝ている沼。ダイコンタの矢で、竜は「動くって気持ちいい」と目を覚ました。'],
 ['トマトの丘',15,'tomato','tomato','リコピンちゃんが夏の太陽と勝負した丘。赤い実が、日差しから体を守る。'],
 ['かぼちゃ谷',18,'pumpkin','pumpkin','カボッチャが冬至の夜に村を温めた谷。甘い香りがただよう。'],
 ['ブロッコの砦',22,'broccoli','broccoli','ブロッコ将軍が兵たちに「毎日の小さな稽古」を教えた砦。'],
 ['生姜の隠れ里',26,'shoga','shoga','ジンジャー忍者の里。体をぽかぽか温める秘伝が眠る。'],
 ['潮風の浜',30,'shoga','wakame','海の向こうから海藻と魚が届く浜。十勇士が初めて海を見た場所。'],
 ['さつまいも村',34,'imo','satsuma','イモ吉が応援団をつくった村。秋の運動会の会場でもある。'],
 ['雲の茶畑',38,'onion','shimeji','雲の上の茶畑。ゆっくり呼吸すると、遠くの山まで見える。'],
 ['黄金の田んぼ',43,'broccoli','genmai','秋に黄金色にかがやく田んぼ。続けた人だけが、この景色に会える。'],
 ['海の幸の港',48,'piman','salmon','たくさんの船が帰ってくる港。村のごちそうはここから。'],
 ['ミドリ村の大樹',54,'imo','apple','村でいちばん古い大樹。ここまで来た冒険者の名前が、葉っぱにきざまれるという。']];
const openN=()=>Math.min(PLACES.length,6+Math.max(0,weekNo()-Q().mapW0));
function steps(m){const v=vdays(m).size;const h=m.rhyH||{};const short=Object.values(h).filter(c=>c>=2).length;return v+short}
function placeIdx(m){const s=steps(m),n=openN();let i=0;PLACES.forEach((p,j)=>{if(j<n&&s>=p[1])i=j});return i}
function placeCheck(m){if(!m||m.tr)return;const i=placeIdx(m);m.mapGot=m.mapGot||0;if(i>m.mapGot){for(let j=m.mapGot+1;j<=i;j++){const f=PLACES[j][3];if(f&&FOODS[f])giveFood(m,f)}m.mapGot=i;m.mapNew=i;S.feed.unshift({id:S.nextId++,who:m.id,text:`🗺 冒険の地図：「${PLACES[i][0]}」に着いた！`,xp:0,stat:'grit',t:Date.now(),cheers:[]});save()}}
function drawMap(cv,m){const W=320,H=230;cv.width=W;cv.height=H;const x=cv.getContext('2d');x.imageSmoothingEnabled=false;const R=(a,b,w,h,c)=>{x.fillStyle=c;x.fillRect(Math.round(a),Math.round(b),Math.round(w),Math.round(h))};
  R(0,0,W,H,'#e9dcb0');let sd=7;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;for(let i=0;i<500;i++)R(rnd()*W,rnd()*H,1,1,'#dccb98');
  R(0,196,W,34,'#7ac8f0');for(let i=0;i<40;i++)R(rnd()*W,198+rnd()*30,5,1,'#bfe6fa');
  const ov=(cx,cy,rx,ry,c)=>{for(let j=-ry;j<=ry;j++)for(let i=-rx;i<=rx;i++)if(i*i/(rx*rx)+j*j/(ry*ry)<=1)R(cx+i,cy+j,1,1,c)};
  ov(160,110,150,84,'#9ccc3c');ov(120,120,70,40,'#8fc04a');
  const n=openN(),cur=placeIdx(m),pts=PLACES.map((p,i)=>{const row=Math.floor(i/4),col=i%4,lr=row%2?3-col:col;return [40+lr*80,180-row*44]});
  for(let i=1;i<pts.length;i++){const [a,b]=pts[i-1],[c,d]=pts[i];for(let t=0;t<1;t+=.08)R(a+(c-a)*t,b+(d-b)*t,2,2,i<=cur?'#e8452c':'#c8a060')}
  pts.forEach(([a,b],i)=>{const lock=i>=n,c=lock?'#b8b0a0':i<=cur?'#e8452c':'#fffdf3';R(a-6,b-6,13,13,'#6a4a2a');R(a-5,b-5,11,11,c);if(lock){x.fillStyle='#6a5a4a';x.font='bold 10px sans-serif';x.fillText('?',a-3,b+4)}else if(i===0){R(a-4,b-4,9,7,'#9b2f5e');R(a-1,b,3,3,'#ffe600')}});
  const h=HN(m.buddy||'carrot'),off=document.createElement('canvas');drawHero(off,h);const [hx,hy]=pts[cur];x.drawImage(off,hx-27,hy-46,off.width*2,off.height*2)}
function roadPct(){const now=new Date(now0()),ym=now.getFullYear()+'-'+(now.getMonth()+1)+'-';const g=guests();if(!g.length)return 0;let n=0;g.forEach(m=>vdays(m).forEach(k=>{if(k.startsWith(ym))n++}));return Math.min(100,Math.round(n/(g.length*6)*100))}
function vMap(){const m=me(),s=steps(m),cur=placeIdx(m),n=openN(),nx=PLACES[cur+1];placeCheck(m);const P=PLACES[cur];const nw=m.mapNew!=null&&!ADMIN;
  return `<h2>🗺 冒険の地図「ミドリ村のそと」</h2>
  <div class="card q10map"><canvas id="mapcv"></canvas>
   <div class="q10row" style="justify-content:space-between"><b>いま：${E(P[0])}</b><span class="q10pill">${s}歩</span></div>
   ${nx?`<div class="q10bar"><i style="width:${Math.min(100,Math.round((s-P[1])/(nx[1]-P[1])*100))}%"></i></div><p class="q10p">${cur+1<n?`次の場所「${E(nx[0])}」まで あと <b>${nx[1]-s}</b> 歩`:`次の場所はまだ霧の中…。<b>毎週土曜の朝4時</b>に、地図の先に新しい場所が現れます。`}</p>`:'<p class="q10p">🎉 地図の最後まで来ました！</p>'}
   <p class="q10p"><small>ジムに来て、トレーナーが「入室」を押すと1歩。週2回来た週は「近道」で+1歩。</small></p></div>
  ${nw?`<div class="card q10arr"><b>🎉 到着！「${E(PLACES[m.mapNew][0])}」</b><div class="q10msg"><canvas data-hero="${PLACES[m.mapNew][2]}" class="q10mini"></canvas><span>案内人 ${E(TRAINERS[m.mapNew%TRAINERS.length])}トレーナー：「よく来たね！ ${E(PLACES[m.mapNew][4])}」</span></div>${PLACES[m.mapNew][3]&&FOODS[PLACES[m.mapNew][3]]?`<p class="q10p">🥕 図鑑に「${E(FOODS[PLACES[m.mapNew][3]].name)}」が入りました</p>`:''}<button type="button" class="q10btn" data-mapok>次の場所へ進む</button></div>`:''}
  <div class="card"><b>🌉 村の道づくり</b><p class="q10p">みんなの来館を合わせて、海に橋をかけています。今月 <b>${roadPct()}%</b> 完成！</p><div class="q10bar"><i style="width:${roadPct()}%"></i></div></div>
  <h2>場所の一覧</h2><div class="q10plist">${PLACES.map((p,i)=>i<n?`<div class="${i<=cur?'got':''}"><b>${i<=cur?'✅':'・'} ${E(p[0])}</b><small>${i<=cur?E(p[4]):`${p[1]}歩で到着`}</small></div>`:`<div class="lock"><b>❔ ？？？</b><small>${i===n?'次の土曜に現れます':'まだ霧の中'}</small></div>`).join('')}</div>`}
// ================= ⑤ 週刊ミドリ座 =================
function showsCard(m){const sh=Q().shows.slice().sort((a,b)=>b.t-a.t).slice(0,2),t=todayK();const cast=m.cast&&m.cast.st==='ask'?m.cast:null;
  if(!sh.length&&!cast)return '';
  return `<section class="q10c sho"><div class="q10h">🎬 今週のミドリ座 新作</div>
   ${cast?`<div class="q10note">🎬 <b>あなたが出演します！</b> 「${E(cast.title)}」に村人として登場。名前はニックネームだけ、顔写真は使いません（YouTubeにも出ます。いつでも取り消しできます）。<div class="q10row"><button type="button" class="q10btn g" data-cast="yes">出る！</button><button type="button" class="q10btn w" data-cast="no">今回は出ない</button></div></div>`:''}
   ${sh.map(s=>{const pre=s.pub&&dOf(s.pub)>new Date(now0());return `<button type="button" class="q10show" data-show="${s.id}"><span class="q10pill ${s.kind==='ショート'?'r':''}">${E(s.kind)}</span><b>${E(s.title)}</b>${pre?'<span class="q10pill p">会員だけ・先行上映</span>':''}<small>${E(s.desc||'')}</small></button>`}).join('')}</section>`}
// ================= ⑥ 冒険の書 =================
function ymOf(off=0){const d=new Date(now0());d.setDate(1);d.setMonth(d.getMonth()-off);return [d.getFullYear(),d.getMonth()+1]}
function bookData(m,y,mo){const pre=y+'-'+mo+'-',days=[...vdays(m)].filter(k=>k.startsWith(pre));let hrs=0;days.forEach(k=>{const tt=m.times&&m.times[k];if(tt){const [a,b]=tt.map(s=>{const [h,mi]=s.split(':').map(Number);return h*60+mi});hrs+=Math.max(0,b-a)/60}else hrs+=1.5});
  const a=new Date(y,mo-1,1).getTime(),b=new Date(y,mo,1).getTime(),fd=S.feed.filter(f=>f.who===m.id&&f.t>=a&&f.t<b);
  const sat=fd.filter(f=>/満足度(\d+)%/.test(f.text||'')).sort((p,q)=>p.t-q.t).map(f=>+/満足度(\d+)%/.exec(f.text)[1]);
  const msg=(m.book||{})[y+'-'+mo];return {days:days.length,hrs:Math.round(hrs*10)/10,rec:fd.length,xp:fd.reduce((s,f)=>s+(f.xp||0),0),sat,msg}}
function vBook(){const m=me();window._bkOff=window._bkOff||0;const [y,mo]=ymOf(window._bkOff),d=bookData(m,y,mo),L=levelOf(total(m));
  const gr=d.sat.length>=2?(()=>{const w=280,h=80,st=(w-12)/(d.sat.length-1);return `<svg viewBox="0 0 ${w} ${h+10}" class="q10gr" role="img" aria-label="満足度の変化"><polyline fill="none" stroke="#e8452c" stroke-width="3" points="${d.sat.map((v,i)=>`${6+i*st},${h-v*h/100+5}`).join(' ')}"/>${d.sat.map((v,i)=>`<circle cx="${6+i*st}" cy="${h-v*h/100+5}" r="4" fill="#f39a1e"/>`).join('')}</svg>`})():`<p class="q10p"><small>記録の「今日の気持ち」で満足度を入れると、ここにグラフが出ます。</small></p>`;
  return `<h2>📖 冒険の書</h2>
  <div class="q10row" style="justify-content:space-between"><button type="button" class="q10btn w sm" data-bk="1">‹ 前の月</button><b class="q10ym">${y}年${mo}月号</b><button type="button" class="q10btn w sm" data-bk="-1" ${window._bkOff<=0?'disabled':''}>次の月 ›</button></div>
  <div class="card q10book"><div class="q10g4"><div>来た日<b>${d.days}日</b></div><div>時間<b>${d.hrs}h</b></div><div>記録<b>${d.rec}</b></div><div>EXP<b>${d.xp}</b></div></div>
   <div><b>😊 満足度の変化</b>${gr}</div>
   <div class="q10msg"><canvas data-hero="${m.buddy||'carrot'}" class="q10mini"></canvas><span>${d.msg?`✍ ${E(d.msg.tn)}トレーナー：「${E(d.msg.text)}」`:'担当トレーナーからのひとことは、月末〜1日ごろに届きます。'}</span></div>
   <p class="q10p">🗺 地図：<b>${E(PLACES[placeIdx(m)][0])}</b> ／ Lv <b>${L.lv}</b> ／ 称号 ${m.titles.length?m.titles.slice(-3).map(t=>`<span class="q10pill">${E(t)}</span>`).join(' '):'まだなし'}</p>
   <button type="button" class="q10btn o" data-card>🖼 成長カードをつくる（数字なし・SNS用）</button><div id="q10cardout"></div></div>
  <p class="q10p"><small>冒険の書は毎月1冊ふえます。辞めようか迷ったときも、ここまでの冒険を見返してみてね。</small></p>`}
function growCard(m){const c=document.createElement('canvas');c.width=1080;c.height=1350;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,0,1350);g.addColorStop(0,'#d6ec6e');g.addColorStop(1,'#f3f9dc');x.fillStyle=g;x.fillRect(0,0,1080,1350);
  ['#d6ec6e','#ffe600','#4f7d2a','#e8452c','#f39a1e','#9b2f5e'].forEach((col,i)=>{x.fillStyle=col;x.fillRect(i*180,0,180,26)});
  x.imageSmoothingEnabled=false;const off=document.createElement('canvas');drawHero(off,HN(m.buddy||'carrot'));x.drawImage(off,240,300,off.width*22,off.height*22);
  x.fillStyle='#33501a';x.textAlign='center';x.font='900 72px "Zen Maru Gothic",sans-serif';x.fillText('キタエル・クエスト',540,150);x.font='700 46px "Zen Maru Gothic",sans-serif';const [y,mo]=ymOf(window._bkOff||0);x.fillText(`冒険の書 ${mo}月号`,540,230);
  x.fillStyle='#e8452c';x.font='900 64px "Zen Maru Gothic",sans-serif';x.fillText(`${m.name}`,540,1050);x.fillStyle='#33501a';x.font='700 44px "Zen Maru Gothic",sans-serif';x.fillText(`Lv${levelOf(total(m)).lv} ・ ${m.titles.slice(-1)[0]||'冒険者'}`,540,1130);
  x.font='700 36px "Zen Maru Gothic",sans-serif';x.fillText(`相棒：${HN(m.buddy||'carrot').name}`,540,1200);x.fillText('#キタエルクエスト #333GYM',540,1290);return c}
// ================= ⑦ 畑のなかま =================
function farmOf(m){return Q().farms.find(f=>f.ids.includes(m.id))}
function farmWeek(f){return f.ids.reduce((s,id)=>{const x=byId(id);return s+(x?weekCount(x):0)},0)}
const FARM_GOAL=8,STAMPS4=['おつかれ🌱','ナイス💪','また会おう👋','がんばろう🔥','ありがとう🙏'];
function farmTick(f){const wk=wkKey();f.got=f.got||{};if(farmWeek(f)>=FARM_GOAL&&!f.got[wk]){f.got[wk]=1;f.ids.forEach(id=>{const x=byId(id);if(x)gain(x,'grit',80,`🌱 ${f.name}：4人で今週${FARM_GOAL}回！ 畑に野菜が実った`)});save()}}
function vFarm(){const m=me(),f=farmOf(m);
  if(!f)return `<h2>🌱 畑のなかま</h2><div class="card stack"><p class="q10p">同じ時間帯に来る<b>4人</b>で、ひとつの畑を育てます。4人合わせて<b>週${FARM_GOAL}回</b>来ると、畑に野菜が実って全員 +80EXP。</p><p class="q10p"><small>・入るかどうかは自分で決められます。入らなくても何も変わりません。<br>・同じ畑の4人には、おたがいの<b>名前</b>と今週の来館回数が見えます。<br>・送れるのは決まったスタンプだけ（安心のため）。<br>・組み合わせはトレーナーが決めます。1か月ごとに「つづける・組みなおす」を選べます。</small></p>
   ${ADMIN?'<p class="q10p">（管理ページの「🌱 畑のなかま」で組み分けします）</p>':m.farmWant?'<p class="q10p">✅ 申しこみました。トレーナーが組み分けするまで待っててね。 <button type="button" class="q10btn w sm" data-farm="off">やめる</button></p>':'<button type="button" class="q10btn g" data-farm="on">畑のなかまに入る</button>'}</div>`;
  farmTick(f);const msgs=(Q().farmMsg[f.id]||[]).slice(-8).reverse(),n=farmWeek(f);
  return `<h2>🌱 ${E(f.name)} <small style="font-size:13px;color:var(--muted)">4人の畑</small></h2>
  <div class="card stack"><div class="q10row" style="justify-content:space-between"><b>今週 4人で ${n}/${FARM_GOAL}回</b><span class="q10pill">${n>=FARM_GOAL?'🎉 実った！':'あと'+(FARM_GOAL-n)+'回'}</span></div><div class="q10bar"><i style="width:${Math.min(100,n/FARM_GOAL*100)}%"></i></div>
   <div class="q10mem">${f.ids.map(id=>{const x=byId(id);return x?`<div><canvas data-hero="${x.buddy||HEROES[hashStr(id)%10].key}" class="q10mini"></canvas><span>${E(x.name)}${x.id===m.id?'（あなた）':''}</span><b>${weekCount(x)}回</b></div>`:''}).join('')}</div>
   ${ADMIN?'':`<div class="q10row" style="flex-wrap:wrap">${STAMPS4.map(s=>`<button type="button" class="q10btn w sm" data-st4="${E(s)}">${E(s)}</button>`).join('')}</div>`}
   <div class="q10log">${msgs.map(x=>`<div><b>${E(x.from)}</b> ${E(x.s)} <small>${ago(x.t)}</small></div>`).join('')||'<small class="muted">まだスタンプはありません</small>'}</div>
   ${ADMIN?'':'<button type="button" class="q10btn w sm" data-farm="leave">畑をぬける</button>'}</div>`}
// ================= ⑧ ミドリ村まつり =================
function seedEvent(){const q=Q();if(q.evSeeded)return;q.evSeeded=1;const d=new Date(now0());d.setDate(d.getDate()+((6-d.getDay()+7)%7||7)+7);
  q.events.push({id:Date.now(),title:'収穫祭と絵本上映会（例）',date:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,time:'10:00〜12:00',place:'3Bスタジオ',cap:24,items:'ヨガマット・お水',desc:'朝ヨガのあと、ミドリ座の絵本をみんなで観ます。野菜スープつき。（これは見本です。管理ページで直したり消したりできます）',joins:[],friends:{},by:tn()});save()}
function evDate(e){const d=dOf(e.date);return `${d.getMonth()+1}月${d.getDate()}日（${'日月火水木金土'[d.getDay()]}）`}
function upEvents(){const t=new Date(now0());t.setHours(0,0,0,0);return Q().events.filter(e=>dOf(e.date)>=t).sort((a,b)=>a.date<b.date?-1:1)}
function vMatsuri(){const m=me(),up=upEvents(),past=Q().events.filter(e=>!up.includes(e)).slice(-4).reverse();
  const card=e=>{const j=e.joins.includes(m.id),left=Math.max(0,(e.cap||0)-e.joins.length-Object.values(e.friends||{}).reduce((s,n)=>s+n,0));return `<div class="card stack q10ev"><b class="q10evt">🏮 ${E(e.title)}</b><p class="q10p">${evDate(e)} ${E(e.time||'')} ／ ${E(e.place||'')}<br>定員 ${e.cap||'—'}人 ／ のこり <b style="color:var(--accent)">${left}</b></p>${e.items?`<p class="q10p">持ち物：${E(e.items)}</p>`:''}${e.desc?`<p class="q10p">${E(e.desc)}</p>`:''}
   ${ADMIN?`<p class="q10p"><small>参加 ${e.joins.length}人＋お友だち ${Object.values(e.friends||{}).reduce((s,n)=>s+n,0)}人：${e.joins.map(id=>E((byId(id)||{}).name||'')).join('・')}</small></p>`:j?`<p class="q10p">✅ 参加します！ ${(e.friends||{})[m.id]?`（お友だち ${(e.friends||{})[m.id]}人）`:''}</p><div class="q10row"><button type="button" class="q10btn w sm" data-evf="${e.id}">お友だちも連れていく</button><button type="button" class="q10btn w sm" data-evx="${e.id}">参加をやめる</button></div>`:`<button type="button" class="q10btn" data-evj="${e.id}" ${left<=0?'disabled':''}>${left<=0?'満員です':'参加する（+100EXP）'}</button>`}</div>`};
  return `<h2>🏮 ミドリ村まつり</h2><p class="q10p" style="margin:-4px 2px 8px">アプリの物語が、ジムの外で本物のお祭りになります。参加すると <b>+100EXP</b> と、おまつり限定の図鑑カード。お友だちも連れてこられます。</p>
  ${up.length?up.map(card).join(''):'<div class="card muted">次のおまつりは準備中です。お楽しみに！</div>'}
  ${past.length?`<h2>これまでのおまつり</h2>${past.map(e=>`<div class="card q10p">🏮 ${E(e.title)} <small>${evDate(e)}・${e.joins.length}人参加</small></div>`).join('')}`:''}`}
// ================= ⑨ たねまき招待 =================
const seedCode=m=>String(1000+hashStr('seed'+m.id)%9000);
const seedUrl=m=>`https://kitaeru-quest.web.app/taiken?seed=${seedCode(m)}`;
function seedBox(m){const s=m.seeds||{};const pl=['🌷'.repeat(s.flower||0),'🌱'.repeat(s.sprout||0),'🌰'.repeat(Math.max(0,(s.sent||0)-(s.sprout||0)-(s.flower||0)))].join('')||'🌰';
  return `<section class="card stack q10seed" id="q10seed"><h3 style="margin:0">🌰 たねまき招待</h3><p class="q10p">お友だちに「たね」をわたすと、体験に来たら<b>芽🌱（+100EXP）</b>、入会したら<b>花🌷（+300EXP）</b>があなたの畑に。お友だちには、キャロットが333GYMを案内します。</p>
   <div class="q10row"><span style="font-size:22px">${pl}</span><span class="q10pill">たねの番号 ${seedCode(m)}</span></div>
   <button type="button" class="q10btn" data-seed>🌰 たねをわたす（LINEなど）</button><button type="button" class="q10btn w" data-seedcp>リンクをコピー</button>
   <p class="q10p"><small>お友だちが電話で「たねの番号 ${seedCode(m)}」と伝えると、トレーナーがあなたの畑に芽をつけます。</small></p></section>`}
// ================= ⑩ 今日のミドリ村（SNS） =================
const SNSW=[['月','新作の予告',()=>{const s=Q().shows.slice(-1)[0];return `今週のミドリ座、新作は「${s?s.title:'お野菜十勇士の新しい冒険'}」！ 333GYMの会員さんはアプリで一足先に観られます🎬`}],
 ['火','ショート劇場',()=>{const h=HEROES[weekNo()%10];return `${h.name}の栄養ミニ劇場🎭 ${h.veg}は${h.role}のパワーのもと！ 今日のごはんに${h.veg}をひとつ。`}],
 ['水','トレーナー紹介',()=>{const t=TRAINERS[weekNo()%TRAINERS.length];return `333GYMのトレーナー紹介📣 今週は${t}トレーナー。加圧・YOGA・食事セラピー・カパラバティで、あなたの毎日を応援します。`}],
 ['木','健康管理室',()=>'333GYMには健康管理室があり、看護師が常駐しています🩺 体調管理や体調の相談がいつでもできるジムです。はじめての方も安心してどうぞ。'],
 ['金','今週の番付',()=>'今週もたくさんの冒険者がジムに来ました💪 番付の上位はアプリで！ 来週も一歩ずつ、いっしょにキタエル。'],
 ['土','チーム発表',()=>{try{return `今週のチーム対抗が始まりました！ ${teamKeys().map(k=>tName(k)).join('・')} 🏆 1位のチームにはプレゼントがあります。`}catch(e){return '今週のチーム対抗が始まりました！🏆'}}],
 ['日','絵本の1ページ',()=>'日曜の夜は絵本の時間📖 お野菜十勇士の冒険は、絵本映画館「ミドリ座」で上映中。']];
function snsDrafts(){const fk=foodOfDay(),f=FOODS[fk]||{name:'野菜',eff:''},wd=(new Date(now0()).getDay()+6)%7,ev=SNSW[wd];const tags='#キタエルクエスト #333GYM #神楽坂 #加圧トレーニング #ヨガ';
  return [{k:'am',time:'朝 7:00',title:'十勇士の朝ごはん',food:fk,text:`おはようございます☀ 今日の十勇士の朝ごはんは「${f.name}」。${f.eff?f.eff+'！':''} 今日も一歩ずつ、いっしょにキタエル。\n${tags} #朝ごはん`},
    {k:'pm',time:'夜 20:00',title:`${ev[0]}曜：${ev[1]}`,food:null,text:`${ev[2]()}\n体験のご予約は → kitaeru-quest.web.app/taiken\n${tags}`}]}
function snsImg(d){const c=document.createElement('canvas');c.width=1080;c.height=1350;const x=c.getContext('2d');x.fillStyle=d.k==='am'?'#fff3c8':'#2a2464';x.fillRect(0,0,1080,1350);
  ['#d6ec6e','#ffe600','#4f7d2a','#e8452c','#f39a1e','#9b2f5e'].forEach((col,i)=>{x.fillStyle=col;x.fillRect(i*180,1324,180,26)});x.imageSmoothingEnabled=false;
  if(d.food){const fc=document.createElement('canvas');paintFood(fc,d.food);x.drawImage(fc,290,330,500,500)}else{const off=document.createElement('canvas');drawHero(off,HEROES[weekNo()%10]);x.drawImage(off,250,330,off.width*20,off.height*20)}
  x.textAlign='center';x.fillStyle=d.k==='am'?'#33501a':'#ffe600';x.font='900 70px "Zen Maru Gothic",sans-serif';x.fillText(d.title,540,200);x.font='700 40px "Zen Maru Gothic",sans-serif';x.fillStyle=d.k==='am'?'#4f7d2a':'#d6ec6e';x.fillText('キタエル・クエスト ／ 333GYM',540,1240);
  const body=d.text.split('\n')[0];x.font='700 38px "Zen Maru Gothic",sans-serif';x.fillStyle=d.k==='am'?'#22300f':'#ffffff';let line='',y=980;for(const ch of body){if(x.measureText(line+ch).width>900){x.fillText(line,540,y);y+=54;line=''}line+=ch;if(y>1180)break}if(line&&y<=1180)x.fillText(line,540,y);return c}
async function shareCanvas(c,text,name){try{const bl=await new Promise(r=>c.toBlob(r,'image/png'));const fl=new File([bl],name,{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[fl]})){await navigator.share({files:[fl],text});return}if(navigator.share){await navigator.share({text});return}const a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download=name;a.click();try{await navigator.clipboard.writeText(text)}catch(e){}say('画像を保存し、文章をコピーしました')}catch(e){if(e&&e.name!=='AbortError')say('共有できませんでした')}}
// ================= 冒険者ページ（ゲスト） =================
function heroBlock(){if(tab!=='hero'||document.getElementById('q10hero'))return;const v=document.getElementById('view'),sc=v&&v.querySelector('.scene');if(!sc)return;const m=me();if(!m||m.tr&&!ADMIN)return;trialTick();
  const ev=upEvents()[0],f=farmOf(m);
  const d=document.createElement('div');d.id='q10hero';d.className='q10wrap';
  d.innerHTML=letterCard(m)+invCard(m)+rhyCard(m)+showsCard(m)+`<section class="q10c"><div class="q10h">🧭 冒険のメニュー</div><div class="q10menu">
    <button type="button" data-go="map"><b>🗺</b>冒険の地図<small>${E(PLACES[placeIdx(m)][0])}</small></button>
    <button type="button" data-go="matsuri"><b>🏮</b>ミドリ村まつり<small>${ev?evDate(ev):'準備中'}</small></button>
    <button type="button" data-go="book"><b>📖</b>冒険の書<small>${ymOf()[1]}月号</small></button>
    <button type="button" data-go="farm"><b>🌱</b>畑のなかま<small>${f?E(f.name):m.farmWant?'組み分け待ち':'4人で育てる'}</small></button></div></section>`;
  const after=document.getElementById('bmsg')||v.querySelector('.snapbtn')||sc;after.after(d);
  d.querySelectorAll('canvas.rhycv').forEach(c=>treeCv(c,+c.dataset.c));bindCommon(d,m)}
function bindCommon(d,m){
  d.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
  d.querySelectorAll('[data-want]').forEach(b=>b.onclick=()=>{m.yWant={t:Date.now(),why:b.dataset.want==='okaeri'?'おかえり':'通いのリズム',done:false};save();say('予約の希望をトレーナーに送りました！');render()});
  const pl=d.querySelector('[data-plok]');if(pl)pl.onclick=()=>{m.planInfoSeen=1;save();render()};
  d.querySelectorAll('[data-inv]').forEach(b=>b.onclick=()=>{m.inv.st=b.dataset.inv;m.inv.at=Date.now();save();say(b.dataset.inv==='want'?'体験の希望をトレーナーに送りました！':'またいつでも声をかけてね');render()});
  const mn=d.querySelector('[data-min]');if(mn)mn.onclick=()=>{m.q10min=dayKey();if(m.letter)m.letter.read=true;gain(m,'end',30,'🏠 10分だけクエスト クリア');save();render()};
  d.querySelectorAll('[data-cast]').forEach(b=>b.onclick=()=>{m.cast.st=b.dataset.cast;save();say(b.dataset.cast==='yes'?'出演ありがとう！ 上映をお楽しみに🎬':'了解です。また次の機会に！');render()});
  d.querySelectorAll('[data-show]').forEach(b=>b.onclick=()=>{const s=Q().shows.find(x=>x.id==b.dataset.show);if(s&&s.url)window.open(s.url,'_blank','noopener');else go('cinema')})}
function go(t){tab=t;render();window.scrollTo(0,0)}
// ================= サブページ（地図・まつり・冒険の書・畑） =================
const PAGES={map:vMap,matsuri:vMatsuri,book:vBook,farm:vFarm};
function drawPage(){const v=document.getElementById('view');if(!v)return;const m=me();v.innerHTML=`<button type="button" class="subback" id="q10back">‹ もどる</button>`+PAGES[tab]();
  document.querySelectorAll('#entrow .on,#tabs2 .on,#tabs .on').forEach(b=>b.classList.remove('on'));
  document.getElementById('q10back').onclick=()=>{const l=(window.KQ_SUB&&KQ_SUB.last())||'hero';go(PAGES[l]?'hero':l)};
  const mc=document.getElementById('mapcv');if(mc)drawMap(mc,m);
  const mo=v.querySelector('[data-mapok]');if(mo)mo.onclick=()=>{delete m.mapNew;save();drawPage()};
  v.querySelectorAll('[data-bk]').forEach(b=>b.onclick=()=>{window._bkOff=Math.max(0,Math.min(11,(window._bkOff||0)+ +b.dataset.bk));drawPage()});
  const cd=v.querySelector('[data-card]');if(cd)cd.onclick=()=>{const c=growCard(m),o=document.getElementById('q10cardout');o.innerHTML='';const im=new Image();im.src=c.toDataURL('image/png');im.alt='成長カード';im.className='q10cardimg';o.appendChild(im);const b=document.createElement('button');b.type='button';b.className='q10btn';b.textContent='📤 共有・保存する';b.onclick=()=>shareCanvas(c,`${ymOf(window._bkOff||0)[1]}月の冒険の書 #キタエルクエスト #333GYM`,'kitaeru-card.png');o.appendChild(b)};
  v.querySelectorAll('[data-farm]').forEach(b=>b.onclick=()=>{const k=b.dataset.farm;if(k==='on')m.farmWant=true;else if(k==='off')m.farmWant=false;else if(k==='leave'){if(!confirm('畑をぬけますか？'))return;const f=farmOf(m);if(f)f.ids=f.ids.filter(i=>i!==m.id);m.farmWant=false}save();drawPage()});
  v.querySelectorAll('[data-st4]').forEach(b=>b.onclick=()=>{const f=farmOf(m);if(!f)return;const a=Q().farmMsg[f.id]=Q().farmMsg[f.id]||[];a.push({from:m.name,s:b.dataset.st4,t:Date.now()});if(a.length>40)a.splice(0,a.length-40);save();say('スタンプを送りました');drawPage()});
  v.querySelectorAll('[data-evj]').forEach(b=>b.onclick=()=>{const e=Q().events.find(x=>x.id==b.dataset.evj);if(!e||e.joins.includes(m.id))return;e.joins.push(m.id);e.paid=e.paid||[];if(!e.paid.includes(m.id)){e.paid.push(m.id);giveFood(m,'pumpkin');gain(m,'grit',100,`🏮 ミドリ村まつり「${e.title}」に参加します`)}save();drawPage()});
  v.querySelectorAll('[data-evx]').forEach(b=>b.onclick=()=>{const e=Q().events.find(x=>x.id==b.dataset.evx);e.joins=e.joins.filter(i=>i!==m.id);delete (e.friends||{})[m.id];save();say('参加をやめました');drawPage()});
  v.querySelectorAll('[data-evf]').forEach(b=>b.onclick=()=>{const e=Q().events.find(x=>x.id==b.dataset.evf);const n=prompt('何人連れてきますか？（0〜3人）',String((e.friends||{})[m.id]||1));if(n==null)return;e.friends=e.friends||{};e.friends[m.id]=Math.max(0,Math.min(3,parseInt(n,10)||0));save();say('お友だちには、マイページの「たねをわたす」で案内を送れます');drawPage()})}
// ================= マイページ（たねまき・冒険の書） =================
function myBlock(){if(tab!=='mypage'||ADMIN||document.getElementById('q10seed'))return;const v=document.getElementById('view');if(!v)return;const m=me();
  const w=document.createElement('div');w.innerHTML=`<div class="card q10row" style="justify-content:space-between;margin:10px 0"><span>📖 <b>冒険の書</b> ${ymOf()[1]}月号</span><button type="button" class="q10btn sm" data-go="book">ひらく</button></div>`+seedBox(m);
  const h=v.querySelector('h2');if(h)h.before(w);else v.appendChild(w);bindCommon(w,m);
  const sb=w.querySelector('[data-seed]');if(sb)sb.onclick=async()=>{m.seeds=m.seeds||{};m.seeds.sent=(m.seeds.sent||0)+1;save();const t=`333GYMの体験に来てみない？ アプリ「キタエル・クエスト」の仲間になろう🥕 たねの番号：${seedCode(m)}`;try{if(navigator.share)await navigator.share({text:t,url:seedUrl(m)});else{await navigator.clipboard.writeText(t+'\n'+seedUrl(m));say('案内文をコピーしました')}}catch(e){}render()};
  const cp=w.querySelector('[data-seedcp]');if(cp)cp.onclick=async()=>{try{await navigator.clipboard.writeText(seedUrl(m));say('リンクをコピーしました')}catch(e){prompt('このリンクを送ってください',seedUrl(m))}}}
// ================= 管理ページ（トレーナー） =================
function adminBlock(){if(!ADMIN||tab!=='guild'||document.getElementById('q10adm'))return;const v=document.getElementById('view');if(!v)return;trialTick();seedEvent();
  const G=guests(),me0=tn();const d=document.createElement('section');d.id='q10adm';d.className='q10adm';
  // おかえり作戦
  const ok=G.filter(m=>!(m.okDone>Date.now())).map(m=>({m,r:okLevel(m)})).filter(x=>x.r.length).sort((a,b)=>(b.r.some(z=>z[0]==='r'))-(a.r.some(z=>z[0]==='r')));
  // あと1回の人・予約の希望・週2×4
  const one=G.map(m=>({m,c:weekCount(m)})).filter(x=>x.c===1||x.c===2);
  const want=G.filter(m=>m.yWant&&!m.yWant.done);
  const four=G.filter(m=>[0,1,2,3].every(o=>weekCount(m,o)>=2)&&!m.planInfo);
  // 招待状
  window._invK=window._invK||'yoga';const ik=window._invK;
  const cand=G.filter(m=>m.course&&m.course!==ik&&!(m.allow||[]).includes(ik)&&!(m.inv&&['new','want','trial'].includes(m.inv.st))).map(m=>({m,v:vdays(m).size,h:(m.health||[]).map(x=>x.text).join(' ').match(/腰|肩|膝|眠|固|むくみ|冷え|ストレス/g)})).sort((a,b)=>(!!b.h)-(!!a.h)||b.v-a.v);
  const invs=G.filter(m=>m.inv);const cnt=k=>invs.filter(m=>k==='sent'||m.inv.st===k||(k==='open'&&m.inv.st!=='new')).length;
  // 冒険の書
  const [y,mo]=ymOf(),ymk=y+'-'+mo,cur=byId(S.current),bookMiss=G.filter(m=>!((m.book||{})[ymk])&&coachOfQ(m)===me0);
  const farms=Q().farms,fw=G.filter(m=>m.farmWant&&!farmOf(m));
  const sns=snsDrafts(),sd=Q().sns[dayKey()]||{};
  const sec=(id,ttl,n,body,open)=>`<details class="q10d" id="q10-${id}" ${open?'open':''}><summary>${ttl}${n?` <span class="q10pill r">${n}</span>`:''}</summary><div class="q10db">${body}</div></details>`;
  d.innerHTML=`<h3 class="q10adh">🌟 10の新しい冒険（トレーナー用）</h3>
  ${sec('ok','🏡 おかえり作戦',ok.length,ok.length?`<p class="q10p"><small>🟡＝7日来ていない・満足度が2回つづけて下がった・予約取り消しが続く ／ 🔴＝14日以上。おすすめの一手をして「やった」を押すと7日かくれます。</small></p><ul class="q10ul">${ok.map(({m,r})=>`<li><div><span class="q10pill ${r.some(z=>z[0]==='r')?'r':''}">${r.some(z=>z[0]==='r')?'🔴':'🟡'}</span> <b>${E(m.name)}さん</b> <small>担当：${E(coachOfQ(m)||'未設定')}</small><br><small>${r.map(z=>E(z[1])).join(' ／ ')}</small><br><small>👉 作戦：${PLAN(m,r)}</small></div><div class="q10row"><button type="button" class="q10btn sm g" data-letter="${m.id}" ${m.letter&&!m.letter.read?'disabled':''}>${m.letter&&!m.letter.read?'💌 送りずみ':'💌 相棒の手紙'}</button><button type="button" class="q10btn sm o" data-okd="${m.id}">やった</button></div></li>`).join('')}</ul>`:'<p class="q10p">今は気になる人はいません🌿</p>',ok.some(x=>x.r.some(z=>z[0]==='r')))}
  ${sec('rhy','🍅 通いのリズム（あと1回の人・予約の希望）',want.length,`${want.length?`<b>📅 予約の希望</b><ul class="q10ul">${want.map(m=>`<li><div><b>${E(m.name)}さん</b> <small>${E(m.yWant.why)}から ・ ${ago(m.yWant.t)}</small></div><button type="button" class="q10btn sm" data-ywd="${m.id}">対応した</button></li>`).join('')}</ul>`:''}
    <b>今週あと1回で 実🍅・金の実✨</b>${one.length?`<ul class="q10ul">${one.sort((a,b)=>(coachOfQ(b.m)===me0)-(coachOfQ(a.m)===me0)||b.c-a.c).slice(0,window._oneAll?999:12).map(({m,c})=>`<li><div><span class="q10pill">${c}/${c+1}</span> <b>${E(m.name)}さん</b> <small>担当：${E(coachOfQ(m)||'未設定')}</small></div></li>`).join('')}</ul>${one.length>12?`<button type="button" class="q10lnk" data-oneall>${window._oneAll?'少なく表示':'ぜんぶ見る（'+one.length+'人）'}</button>`:''}`:'<p class="q10p"><small>いません</small></p>'}
    <b>📈 週2回を4週つづけた人</b>${four.length?`<ul class="q10ul">${four.map(m=>`<li><div><b>${E(m.name)}さん</b></div><button type="button" class="q10btn sm o" data-plan="${m.id}">週2・週3のご案内を出す</button></li>`).join('')}</ul>`:'<p class="q10p"><small>いません</small></p>'}<p class="q10p"><small>ご案内を出すと、ゲストの冒険者ページに「くわしくは担当トレーナーへ」と出ます（金額は出ません）。</small></p>`)}
  ${sec('inv','💌 招待状（加圧→ヨガ など）',invs.filter(m=>m.inv.st==='want').length,`<div class="q10row" style="flex-wrap:wrap">${Object.entries(INV).map(([k,I])=>`<button type="button" class="q10btn sm ${k===ik?'':'w'}" data-invk="${k}">${I.place}（${I.prog}）</button>`).join('')}</div>
    <p class="q10p"><small>「${INV[ik].prog}」をまだしていない人です。健康メモに腰・肩などがある人が上に出ます。送る人を選んで送ってください（押し売りにならないよう、人が決めます）。</small></p>
    <ul class="q10ul">${cand.slice(0,30).map(({m,v,h})=>`<li><label class="q10chk"><input type="checkbox" data-ic="${m.id}"> <b>${E(m.name)}さん</b> <small>${E(cName(m.course))}・来館${v}回${h?`・メモ:${E([...new Set(h)].join('/'))}`:''}</small></label></li>`).join('')||'<li><small>候補はいません</small></li>'}</ul>
    ${cand.length?`<button type="button" class="q10btn g" data-isend>選んだ人に招待状を送る</button>`:''}
    ${invs.filter(m=>m.inv.st==='want').length?`<b>🙋 体験したい人</b><ul class="q10ul">${invs.filter(m=>m.inv.st==='want').map(m=>`<li><div><b>${E(m.name)}さん</b> <small>${E(INV[m.inv.k].prog)}の体験希望</small></div><button type="button" class="q10btn sm g" data-trial="${m.id}">1か月お試しを開く</button></li>`).join('')}</ul>`:''}
    <div class="q10g4"><div>送った<b>${cnt('sent')}</b></div><div>開いた<b>${cnt('open')}</b></div><div>体験希望<b>${cnt('want')}</b></div><div>お試し中<b>${cnt('trial')}</b></div></div>`)}
  ${sec('show','🎬 週刊ミドリ座の新作',0,`<p class="q10p"><small>新作（本編・ショート）をのせると、ゲストの冒険者ページに出ます。「YouTube公開日」より前は「会員だけ・先行上映」と表示されます。</small></p>
    <div class="q10form"><input id="shT" placeholder="題名（例：第11話 潮風の浜のナマケ竜）"><select id="shK"><option>本編</option><option>ショート</option></select><input id="shU" placeholder="動画のURL（あれば）"><input id="shD" placeholder="ひとこと説明"><label>YouTube公開日 <input id="shP" type="date"></label><button type="button" class="q10btn" data-shadd>のせる</button></div>
    <ul class="q10ul">${Q().shows.slice().reverse().map(s=>`<li><div><span class="q10pill">${E(s.kind)}</span> <b>${E(s.title)}</b> <small>${s.pub?'公開 '+E(s.pub):''}</small></div><button type="button" class="q10btn sm w" data-shdel="${s.id}">消す</button></li>`).join('')}</ul>
    <b>🎭 ゲスト出演のお願い</b><div class="q10form"><select id="caM">${G.map(m=>`<option value="${m.id}">${E(m.name)}</option>`).join('')}</select><select id="caS">${Q().shows.slice().reverse().map(s=>`<option value="${s.id}">${E(s.title)}</option>`).join('')||'<option value="">（先に新作をのせてください）</option>'}</select><button type="button" class="q10btn sm" data-cast>お願いを送る</button></div>
    <ul class="q10ul">${G.filter(m=>m.cast).map(m=>`<li><div><b>${E(m.name)}さん</b> <small>「${E(m.cast.title)}」 ${m.cast.st==='yes'?'✅ 出る':m.cast.st==='no'?'🙅 出ない':'⌛ 返事待ち'}</small></div></li>`).join('')}</ul>`)}
  ${sec('ev','🏮 ミドリ村まつり',0,`<div class="q10form"><input id="evT" placeholder="名前（例：春のピクニックヨガ）"><input id="evD" type="date"><input id="evH" placeholder="時間（例：10:00〜12:00）"><input id="evP" placeholder="場所（例：3Bスタジオ）"><input id="evC" type="number" min="1" placeholder="定員"><input id="evI" placeholder="持ち物"><input id="evX" placeholder="ひとこと"><button type="button" class="q10btn" data-evadd>おまつりを出す</button></div>
    <ul class="q10ul">${Q().events.slice().sort((a,b)=>a.date<b.date?1:-1).map(e=>`<li><div><b>${E(e.title)}</b> <small>${evDate(e)}・参加${e.joins.length}人＋お友だち${Object.values(e.friends||{}).reduce((s,n)=>s+n,0)}人</small></div><div class="q10row"><button type="button" class="q10btn sm w" data-evsee>見る</button><button type="button" class="q10btn sm w" data-evdel="${e.id}">消す</button></div></li>`).join('')}</ul>`)}
  ${sec('farm','🌱 畑のなかま（4人組）',fw.length,`<p class="q10p"><small>「入る」を選んだ人を、来る時間帯が近い4人ずつで組みます。</small></p>
    <p class="q10p">組み分け待ち：${fw.map(m=>E(m.name)).join('・')||'いません'}</p>${fw.length>=2?'<button type="button" class="q10btn g" data-fmake>おまかせで組む</button>':''}
    <ul class="q10ul">${farms.map(f=>`<li><div><b>${E(f.name)}</b> <small>今週${farmWeek(f)}/${FARM_GOAL}回：${f.ids.map(id=>E((byId(id)||{}).name||'')).join('・')}</small></div><button type="button" class="q10btn sm w" data-fdel="${f.id}">解散</button></li>`).join('')}</ul>`)}
  ${sec('seed','🌰 たねまき招待（紹介）',0,`<p class="q10p"><small>体験の電話で「たねの番号」を言われたら、ここに入れて押してください。紹介した人の畑に芽・花がつきます。</small></p>
    <div class="q10form"><input id="sdC" inputmode="numeric" placeholder="たねの番号（4けた）"><button type="button" class="q10btn sm g" data-sd="sprout">🌱 体験に来た</button><button type="button" class="q10btn sm o" data-sd="flower">🌷 入会した</button></div>
    <ul class="q10ul">${G.filter(m=>m.seeds&&(m.seeds.sprout||m.seeds.flower)).map(m=>`<li><div><b>${E(m.name)}さん</b> <small>番号${seedCode(m)}・芽${m.seeds.sprout||0}・花${m.seeds.flower||0}</small></div></li>`).join('')}</ul>`)}
  ${sec('book','📖 冒険の書のひとこと',bookMiss.length,`<p class="q10p"><small>担当ゲストに、月に1回ひとこと。ゲストの「冒険の書 ${mo}月号」にのります。今えらんでいるゲスト：<b>${E(cur&&!cur.tr?cur.name:'（上でゲストをえらんでください）')}</b></small></p>
    ${cur&&!cur.tr?`<textarea id="bkT" rows="3" placeholder="例：月の後半、スクワットのフォームが安定しました。来月は片足に挑戦しましょう！">${E(((cur.book||{})[ymk]||{}).text||'')}</textarea><div class="q10row" style="flex-wrap:wrap">${['今月もよく来てくれました！','フォームがとても安定してきました','来月はひとつ新しいことに挑戦しましょう','無理せず、自分のペースで大丈夫です'].map(t=>`<button type="button" class="q10btn sm w" data-bkt="${E(t)}">${E(t)}</button>`).join('')}</div><button type="button" class="q10btn" data-bksave>${mo}月号にのせる</button>`:''}
    <p class="q10p"><small>まだの担当ゲスト：${bookMiss.map(m=>`<button type="button" class="q10lnk" data-bksel="${m.id}">${E(m.name)}</button>`).join('・')||'いません🎉'}</small></p>`)}
  ${sec('sns','📣 今日のミドリ村（SNSの下書き）',(!sd.am?1:0)+(!sd.pm?1:0),`<p class="q10p"><small>毎日、朝と夜の投稿の下書きができます。見て「📤 共有」を押すと、Instagram・TikTok・X・LINE・noteなどを選べます。勝手には投稿しません。出したら「出した」を押してください。</small></p>
    ${sns.map(s=>`<div class="q10sns"><div class="q10row"><span class="q10pill ${s.k==='pm'?'p':''}">${s.time}</span><b>${E(s.title)}</b>${sd[s.k]?`<span class="q10pill g">出した（${E(sd[s.k])}）</span>`:''}</div><img alt="投稿の画像" class="q10snsimg" data-snsimg="${s.k}"><textarea rows="4" data-snst="${s.k}">${E(s.text)}</textarea><div class="q10row"><button type="button" class="q10btn sm" data-snssh="${s.k}">📤 共有する</button><button type="button" class="q10btn sm w" data-snscp="${s.k}">文章をコピー</button><button type="button" class="q10btn sm g" data-snsok="${s.k}">出した</button></div></div>`).join('')}`)}`;
  const anchor=document.getElementById('stag')||document.getElementById('nyu');if(anchor)anchor.after(d);else v.insertBefore(d,v.firstChild);
  bindAdmin(d,sns)}
function coachOfQ(m){if(m.coach)return m.coach;const h=(m.homework||[]).slice().reverse().find(x=>x.tn||x.stT);return h?(h.tn||h.stT):''}
function reAdmin(open){const o=[...document.querySelectorAll('#q10adm details[open]')].map(x=>x.id);const d=document.getElementById('q10adm');if(d)d.remove();adminBlock();o.concat(open?['q10-'+open]:[]).forEach(id=>{const x=document.getElementById(id);if(x)x.open=true})}
function bindAdmin(d,sns){const val=id=>{const e=d.querySelector('#'+id);return e?e.value.trim():''};const q=Q();
  d.querySelectorAll('[data-letter]').forEach(b=>b.onclick=()=>{const m=byId(b.dataset.letter);m.letter={t:Date.now(),by:tn(),read:false};save();say(`${m.name}さんに相棒の手紙を送りました`);reAdmin()});
  d.querySelectorAll('[data-okd]').forEach(b=>b.onclick=()=>{const m=byId(b.dataset.okd);m.okDone=Date.now()+7*D;save();say(`${m.name}さん：対応しました`);reAdmin()});
  const oa=d.querySelector('[data-oneall]');if(oa)oa.onclick=()=>{window._oneAll=!window._oneAll;reAdmin('rhy')};
  d.querySelectorAll('[data-ywd]').forEach(b=>b.onclick=()=>{const m=byId(b.dataset.ywd);m.yWant.done=true;save();reAdmin()});
  d.querySelectorAll('[data-plan]').forEach(b=>b.onclick=()=>{const m=byId(b.dataset.plan);m.planInfo=Date.now();m.planInfoSeen=0;save();say(`${m.name}さんにご案内を出しました`);reAdmin()});
  d.querySelectorAll('[data-invk]').forEach(b=>b.onclick=()=>{window._invK=b.dataset.invk;reAdmin('inv')});
  const is=d.querySelector('[data-isend]');if(is)is.onclick=()=>{const ids=[...d.querySelectorAll('[data-ic]:checked')].map(c=>c.dataset.ic);if(!ids.length){say('送る人を選んでください');return}ids.forEach(id=>{byId(id).inv={k:window._invK,st:'new',t:Date.now(),by:tn()}});save();say(`${ids.length}人に招待状を送りました`);reAdmin('inv')};
  d.querySelectorAll('[data-trial]').forEach(b=>b.onclick=()=>{const m=byId(b.dataset.trial),k=m.inv.k;m.allow=m.allow||[];if(!m.allow.includes(k)){m.allow.push(k);m.inv.added=true}m.inv.st='trial';m.inv.until=now0()+30*D;save();say(`${m.name}さん：${INV[k].prog}を1か月お試しで開きました`);reAdmin('inv')});
  const sa=d.querySelector('[data-shadd]');if(sa)sa.onclick=()=>{const t=val('shT');if(!t){say('題名を入れてください');return}q.shows.push({id:Date.now(),title:t,kind:val('shK')||'本編',url:/^https?:\/\//.test(val('shU'))?val('shU'):'',desc:val('shD'),pub:val('shP'),t:Date.now(),by:tn()});save();say('新作をのせました');reAdmin('show')};
  d.querySelectorAll('[data-shdel]').forEach(b=>b.onclick=()=>{q.shows=q.shows.filter(s=>s.id!=b.dataset.shdel);save();reAdmin('show')});
  const ca=d.querySelector('[data-cast]');if(ca)ca.onclick=()=>{const m=byId(val('caM')),s=q.shows.find(x=>x.id==val('caS'));if(!m||!s){say('ゲストと作品を選んでください');return}m.cast={sid:s.id,title:s.title,st:'ask',t:Date.now()};save();say(`${m.name}さんに出演のお願いを送りました`);reAdmin('show')};
  const ea=d.querySelector('[data-evadd]');if(ea)ea.onclick=()=>{const t=val('evT'),dt=val('evD');if(!t||!dt){say('名前と日にちを入れてください');return}q.events.push({id:Date.now(),title:t,date:dt,time:val('evH'),place:val('evP'),cap:+val('evC')||20,items:val('evI'),desc:val('evX'),joins:[],friends:{},by:tn()});save();say('おまつりを出しました');reAdmin('ev')};
  d.querySelectorAll('[data-evdel]').forEach(b=>b.onclick=()=>{if(!confirm('このおまつりを消しますか？'))return;q.events=q.events.filter(e=>e.id!=b.dataset.evdel);save();reAdmin('ev')});
  d.querySelectorAll('[data-evsee]').forEach(b=>b.onclick=()=>go('matsuri'));
  const fm=d.querySelector('[data-fmake]');if(fm)fm.onclick=()=>{const w=guests().filter(m=>m.farmWant&&!farmOf(m)).map(m=>({m,h:parseInt((visitTime(m,new Date())[0]||'12').split(':')[0],10)})).sort((a,b)=>a.h-b.h).map(x=>x.m);const gs=[];for(let i=0;i<w.length;i+=4)gs.push(w.slice(i,i+4));if(gs.length>1&&gs[gs.length-1].length<2)gs[gs.length-2].push(...gs.pop());
    gs.forEach(g=>{const used=q.farms.map(f=>f.hero),hk=(HEROES.find(h=>!used.includes(h.key))||HEROES[q.farms.length%10]).key;q.farms.push({id:Date.now()+Math.random(),hero:hk,name:HN(hk).name+'畑',ids:g.map(m=>m.id),t:Date.now()});g.forEach(m=>m.farmWant=false)});save();say(`${gs.length}つの畑ができました`);reAdmin('farm')};
  d.querySelectorAll('[data-fdel]').forEach(b=>b.onclick=()=>{if(!confirm('この畑を解散しますか？'))return;q.farms=q.farms.filter(f=>f.id!=b.dataset.fdel);save();reAdmin('farm')});
  d.querySelectorAll('[data-sd]').forEach(b=>b.onclick=()=>{const c=val('sdC'),m=guests().find(x=>seedCode(x)===c);if(!m){say('その番号のゲストが見つかりません');return}const k=b.dataset.sd;m.seeds=m.seeds||{};m.seeds[k]=(m.seeds[k]||0)+1;if(k==='sprout')gain(m,'grit',100,'🌱 たねまき：お友だちが体験に来てくれた！');else{gain(m,'grit',300,'🌷 たねまき：お友だちが入会！ 花が咲いた');if(m.seeds.flower>=3&&!m.titles.includes('たねまき名人'))m.titles.push('たねまき名人')}save();say(`${m.name}さんの畑に${k==='sprout'?'芽🌱':'花🌷'}がつきました`);reAdmin('seed')});
  d.querySelectorAll('[data-bkt]').forEach(b=>b.onclick=()=>{const t=d.querySelector('#bkT');t.value=(t.value?t.value+' ':'')+b.dataset.bkt});
  const bs=d.querySelector('[data-bksave]');if(bs)bs.onclick=()=>{const m=byId(S.current),[y,mo]=ymOf(),t=val('bkT');if(!t){say('ひとことを入れてください');return}m.book=m.book||{};m.book[y+'-'+mo]={tn:tn(),text:t.slice(0,300),t:Date.now()};save();say(`${m.name}さんの冒険の書にのせました`);reAdmin('book')};
  d.querySelectorAll('[data-bksel]').forEach(b=>b.onclick=()=>{S.current=b.dataset.bksel;save();render();setTimeout(()=>{const x=document.getElementById('q10-book');if(x){x.open=true;x.scrollIntoView({block:'start'})}},50)});
  const imgs={};sns.forEach(s=>{const c=snsImg(s);imgs[s.k]=c;const im=d.querySelector(`[data-snsimg="${s.k}"]`);if(im)im.src=c.toDataURL('image/jpeg',.8)});
  const txt=k=>(d.querySelector(`[data-snst="${k}"]`)||{}).value||'';
  d.querySelectorAll('[data-snssh]').forEach(b=>b.onclick=()=>shareCanvas(imgs[b.dataset.snssh],txt(b.dataset.snssh),`kitaeru-${dayKey()}-${b.dataset.snssh}.png`));
  d.querySelectorAll('[data-snscp]').forEach(b=>b.onclick=async()=>{try{await navigator.clipboard.writeText(txt(b.dataset.snscp));say('文章をコピーしました')}catch(e){say('コピーできませんでした')}});
  d.querySelectorAll('[data-snsok]').forEach(b=>b.onclick=()=>{const k=dayKey();q.sns[k]=q.sns[k]||{};q.sns[k][b.dataset.snsok]=tn();save();reAdmin('sns')})}
// ================= スタイル =================
const st=document.createElement('style');st.textContent=`
.q10wrap{display:grid;gap:10px;margin:10px 0}
.q10c{background:#fff;border:2px solid var(--line,#dcebaa);border-radius:16px;padding:10px 12px;display:grid;gap:6px}
.q10c.okr{border-color:#f39a1e;background:#fff8ee}.q10c.inv{border-color:#4f9a2a;background:#f4fbef}.q10c.sho{background:#2a1830;color:#fff;border-color:#9b2f5e}.q10c.sho .q10h{color:#ffe600}
.q10h{font-weight:900;color:#33501a;font-size:15px}.q10h small{font-weight:700;color:var(--muted,#7a8460);font-size:12px;margin-left:4px}
.q10p{margin:0;line-height:1.65;font-size:13.5px}.q10p small{color:var(--muted,#7a8460)}.sho .q10p small{color:#d8c8e0}
.q10btn{display:block;width:100%;border:0;border-radius:999px;background:#e8452c;color:#fff;font-weight:900;padding:9px 12px;font-size:14px;cursor:pointer;font-family:inherit}
.q10btn.g{background:#4f7d2a}.q10btn.o{background:#f39a1e}.q10btn.w{background:#fff;color:#33501a;border:2px solid #33501a}.q10btn.sm{width:auto;display:inline-block;padding:5px 12px;font-size:12.5px}.q10btn:disabled{opacity:.55;cursor:default}
.q10btn:focus-visible,.q10menu button:focus-visible{outline:3px solid #ffe600;outline-offset:2px}
.q10row{display:flex;gap:8px;align-items:center}.q10row>.q10btn{flex:1}.q10row>.q10btn.sm{flex:0 1 auto}
.q10pill{display:inline-block;white-space:nowrap;background:#ffe600;color:#33501a;font-weight:900;border-radius:999px;padding:0 8px;font-size:11.5px}.q10pill.r{background:#e8452c;color:#fff}.q10pill.p{background:#9b2f5e;color:#fff}.q10pill.g{background:#4f7d2a;color:#fff}
.q10msg{display:flex;gap:8px;align-items:flex-start;background:#fffbe0;border:2px solid #ffe600;border-radius:12px;padding:6px 8px;font-size:13px;line-height:1.6;color:#22300f}
.q10mini{width:40px;height:33px;flex:none;image-rendering:pixelated}
.q10note{background:#fff3e6;border:2px dashed #f39a1e;border-radius:12px;padding:8px;font-size:13px;line-height:1.6;color:#22300f}.q10note button{font-size:12px}
.rhyb{display:grid;grid-template-columns:120px 1fr;gap:8px;align-items:center}.rhycv{width:120px;image-rendering:pixelated;border-radius:10px}
.rhyw{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;text-align:center;font-size:12px}.rhyw span{border-radius:6px;padding:4px 0;background:#eef4d6}.rhyw .on{background:#4f7d2a;color:#fff;font-weight:900}.rhyw .off{background:#eee;color:#aaa}.rhyw .td{outline:2px solid #f39a1e}
.q10menu{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.q10menu button{border:2px solid var(--line,#dcebaa);background:#f3f9dc;border-radius:12px;padding:6px 2px;font-weight:900;font-size:12px;color:#33501a;display:grid;gap:1px;cursor:pointer;font-family:inherit}.q10menu b{font-size:20px}.q10menu small{font-weight:700;color:var(--muted,#7a8460);font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media(max-width:380px){.q10menu{grid-template-columns:repeat(2,1fr)}}
.q10show{display:grid;gap:2px;text-align:left;background:#3a2442;border:0;border-radius:10px;padding:8px;color:#fff;cursor:pointer;font-family:inherit}.q10show b{font-size:14px}.q10show small{color:#d8c8e0}
.q10bar{height:10px;border-radius:10px;background:#e7efcd;overflow:hidden}.q10bar i{display:block;height:100%;background:linear-gradient(90deg,#f39a1e,#e8452c)}
.q10map canvas{width:100%;image-rendering:pixelated;border-radius:12px;display:block;margin-bottom:8px}.q10arr{border-color:#ffe600;display:grid;gap:8px}
.q10plist{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px}.q10plist div{background:#fff;border:2px solid var(--line,#dcebaa);border-radius:12px;padding:6px 8px;display:grid;font-size:12.5px}.q10plist .got{border-color:#4f7d2a}.q10plist .lock{background:#f1efe8;color:#8a8270}.q10plist small{color:var(--muted,#7a8460);line-height:1.45}
.q10g4{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;text-align:center;font-size:11.5px}.q10g4 div{background:#f3f9dc;border-radius:10px;padding:5px 0;display:grid}.q10g4 b{font-size:17px;color:#e8452c}
.q10book{display:grid;gap:10px}.q10gr{width:100%;height:auto}.q10ym{font-size:16px}.q10cardimg{width:100%;max-width:320px;border-radius:12px;display:block;margin:8px auto}
.q10mem{display:grid;gap:4px}.q10mem div{display:flex;align-items:center;gap:6px;border-bottom:1px dashed #d6ec6e;padding-bottom:3px}.q10mem span{flex:1}
.q10log{display:grid;gap:3px;font-size:12.5px;max-height:160px;overflow:auto}.q10log small{color:var(--muted,#7a8460)}
.q10ev{border-color:#9b2f5e}.q10evt{font-size:16px;color:#9b2f5e}
.q10adm{display:grid;gap:8px;margin:0 0 12px;background:#fbfdf2;border:3px solid #4f7d2a;border-radius:16px;padding:10px}.q10adh{margin:0;color:#33501a;font-size:16px}
.q10d{background:#fff;border:2px solid var(--line,#dcebaa);border-radius:12px}.q10d summary{cursor:pointer;font-weight:900;padding:9px 10px;color:#33501a}.q10db{padding:0 10px 10px;display:grid;gap:8px}
.q10ul{list-style:none;margin:0;padding:0;display:grid;gap:6px}.q10ul li{display:flex;gap:8px;align-items:center;justify-content:space-between;border-bottom:1px dashed #dcebaa;padding-bottom:5px;font-size:13px;flex-wrap:wrap}.q10ul li>div:first-child{min-width:0;flex:1}.q10ul small{color:var(--muted,#7a8460)}
.q10chk{display:flex;gap:6px;align-items:center;cursor:pointer}
.q10form{display:flex;flex-wrap:wrap;gap:6px}.q10form input,.q10form select{flex:1 1 140px;min-width:0;padding:6px 8px;border:2px solid #dcebaa;border-radius:10px;font:inherit;font-size:13px}.q10form label{font-size:12px;display:flex;gap:4px;align-items:center;flex:1 1 200px}
.q10db textarea{width:100%;box-sizing:border-box;border:2px solid #dcebaa;border-radius:10px;padding:6px 8px;font:inherit;font-size:13px}
.q10sns{display:grid;gap:6px;border:2px solid #dcebaa;border-radius:12px;padding:8px}.q10snsimg{width:100%;max-width:260px;border-radius:10px;display:block}
.q10lnk{background:none;border:0;color:#e8452c;text-decoration:underline;cursor:pointer;font:inherit;padding:0}
`;document.head.appendChild(st);
// ================= つなぐ =================
const _rq=render;render=function(){if(PAGES[tab]){const t=tab;tab='photo';try{_rq.apply(this,arguments)}catch(e){console.warn(e)}tab=t;try{drawPage()}catch(e){console.warn(e)}return}
  const r=_rq.apply(this,arguments);try{heroBlock();myBlock();adminBlock()}catch(e){console.warn(e)}return r};
try{const p=(location.pathname.match(/^\/(map|matsuri|book|farm)\/?$/)||[])[1];if(p)tab=p}catch(e){}
try{Q();seedEvent();trialTick();const m=me();if(m&&!m.tr){rhyCheck(m);placeCheck(m)}save()}catch(e){console.warn(e)}
render();
window.KQ10={PLACES,weekCount,vdays,seedCode};
})();
