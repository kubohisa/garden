var CACHE_NAME = 'msx-garden';
var filesToCache = [
  '/',
  '/index.html',
  '/js/sw.js',
  '/favicon.ico'
];

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.
		open(CACHE_NAME).
		then(function(cache) {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.
		match(e.request).
		then(function(response) {
			return response ? response : fetch(e.request);
		})
	);
});
