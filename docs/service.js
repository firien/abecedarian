(function() {
  var $cacheName, $prefix, $urls, clearPreviousCaches, tag;

  tag = 8;

  $prefix = 'ABC';

  $cacheName = `${$prefix}-${tag}`;

  $urls = ['/abecedarian/icon-192.png', '/abecedarian/icon-512.png', '/abecedarian/touch-icon-ipad.png', '/abecedarian/touch-icon-ipad-retina.png', '/abecedarian/touch-icon-iphone-retina.png', '/abecedarian/index.css', '/abecedarian/index.js', '/abecedarian/index.html', '/abecedarian/'];

  self.addEventListener('install', function(event) {
    return event.waitUntil(caches.open($cacheName).then(function(cache) {
      return cache.addAll($urls);
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
    return event.waitUntil(clearPreviousCaches);
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

  self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
      return self.skipWaiting();
    }
  });

}).call(this);
