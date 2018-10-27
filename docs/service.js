(function() {
  var $cacheName, $urls, tag;

  tag = 1;

  $cacheName = `ABE-${tag}`;

  $urls = ['/abecedarian/index.css', '/abecedarian/index.js', '/abecedarian/index.html', '/abecedarian/'];

  self.addEventListener('install', function(event) {
    return event.waitUntil(caches.open($cacheName).then(function(cache) {
      return cache.addAll($urls).then(function() {
        return self.skipWaiting();
      });
    }));
  });

  self.addEventListener('activate', function(event) {
    return event.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', function(event) {
    return event.respondWith(caches.open($cacheName).then(function(cache) {
      return cache.match(event.request, {
        ignoreSearch: true
      });
    }).then(function(response) {
      return response || fetch(event.request);
    }));
  });

}).call(this);
