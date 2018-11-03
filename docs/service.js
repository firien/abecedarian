(function() {
  var $cacheName, $prefix, $urls, clearPreviousCaches, tag;

  tag = 3;

  $prefix = 'ABE';

  $cacheName = `${$prefix}-${tag}`;

  $urls = ['/abecedarian/index.css', '/abecedarian/index.js', '/abecedarian/index.html', '/abecedarian/'];

  self.addEventListener('install', function(event) {
    return event.waitUntil(caches.open($cacheName).then(function(cache) {
      return cache.addAll($urls).then(function() {
        return self.skipWaiting();
      });
    }));
  });

  clearPreviousCaches = async function() {
    var keys;
    keys = (await caches.keys());
    return Promise.all(keys.filter(function(key) {
      return key !== $cacheName && key.startsWith($prefix);
    }).map(function(key) {
      return caches.delete(key);
    }));
  };

  self.addEventListener('activate', function(event) {
    return event.waitUntil(function() {
      return clearPreviousCaches().then(function() {
        return self.clients.claim();
      });
    });
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
