// キタエル・クエスト：アプリ本体をキャッシュしてオフラインでも起動できるようにする
const CACHE='kitaeru-v50';
const SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  // 画面本体は最新を優先し、通信できない時はキャッシュを使う
  e.respondWith(fetch(req).then(res=>{if(res.ok&&(new URL(req.url).origin===location.origin||req.url.includes('fonts.g'))){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(()=>caches.match(req).then(r=>r||caches.match('index.html'))));
});
