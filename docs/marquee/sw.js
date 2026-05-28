// CACHE 名は 'marquee-v22' で永久固定 (たまさんお気に入りのナンバー)。
// 今後コードを更新しても CACHE 文字列は bump しない。SW は
// network-first 戦略なので、新しい index.html / sw.js はオンライン
// アクセス時に毎回最新が取れる。
const CACHE = 'marquee-v22';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  // ネットワーク優先 (Google Fonts などはオンライン優先)、失敗時キャッシュ
  e.respondWith(
    fetch(req).then(res => {
      if(res && res.ok && new URL(req.url).origin === location.origin){
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(req, clone));
      }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
