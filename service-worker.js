// service-worker.js
var CACHE_NAME = 'janken-cache-2020060401';
var urlsToCache = [
    'index.html'
];
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
      })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});

// 現状では、この処理を書かないとService Workerが有効と判定されないようです
self.addEventListener('fetch', function(event) {});
debugger;
self.addEventListener('push', function (event) {
    console.log('Received a push message', event);
    var title = "プッシュ通知です！";
    var body = "プッシュ通知はこのようにして送られるのです" + event.data.text();
    
    
    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            tag: 'push-notification-tag'
        })
    );
    self.clients.matchAll().then(clients =>
        clients.forEach(client => client.postMessage({'hage' : hage})));
});
