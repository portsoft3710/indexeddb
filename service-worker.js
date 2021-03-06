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
event.waitUntil(async function() {
    // クライアントにアクセスできない場合は、早期に終了します。
    // 例えば、クロスオリジンの場合。
    if (!event.clientId) return;

    // クライアントを取得します。
    const client = await clients.get(event.clientId);
    // クライアントを取得できない場合は、早期に終了します。
    // 例えば、閉じている場合。
    if (!client) return;

    // クライアントにメッセージを送信します。
    client.postMessage({
      msg: "私はあなたからフェッチされましたよ！",
      url: event.request.url
    });
   
  }());    
});
importScripts('https://unpkg.com/dexie@2.0.3/dist/dexie.js');

var db = new Dexie("testDB");
db.version(1).stores({
    storage: "storageKey, storageValue"
});
var tmp = 0;
const data = db.storage.toArray().then(function(storage){
	for(let data of storage){
		if(data.storageValue){
			//localStorage.setItem(data.storageKey, data.storageValue);
			tmp = data.storageValue;
		}
	}
});
var log = function(){
    tmp = tmp * 1 + 7;
  db.storage.put({storageKey: 'indexedDTest', storageValue: tmp});
};

setInterval(log, 5000);
var gps = function(){
	if (navigator.geolocation) {
		debugger;
	} else {
		debugger;
	}
}
setInterval(gps, 3000);
