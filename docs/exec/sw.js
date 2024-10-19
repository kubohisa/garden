var CACHE_NAME = 'msx-garden-241020';

var filesToCache = [
  './',
  './sw.js',
  './sw_boot.js',
  './favicon.ico',
  './garden.dsk',
  './index.html',
  './js/wmsx.js',
];

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(filesToCache).then(() => self.skipWaiting());
		})
	);
});

self.addEventListener('activate', function(e) {
	var cacheWhitelist = [CACHE_NAME];

	e.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response ? response : fetch(e.request);
		})
	);
});

