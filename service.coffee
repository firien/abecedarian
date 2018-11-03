tag = 3
$prefix = 'ABE'
$cacheName = "#{$prefix}-#{tag}"

$urls = [
  '/abecedarian/index.css'
  '/abecedarian/index.js'
  '/abecedarian/index.html'
  '/abecedarian/'
]
self.addEventListener('install', (event) ->
  event.waitUntil(caches.open($cacheName).then((cache) ->
    cache.addAll($urls).then( ->
      self.skipWaiting()
    )
  ))
)

clearPreviousCaches = ->
  keys = await caches.keys()
  Promise.all(keys.filter((key) ->
    key != $cacheName and key.startsWith($prefix)
  ).map((key) ->
    caches.delete(key)
  ))

self.addEventListener('activate', (event) ->
  event.waitUntil( ->
    clearPreviousCaches().then( ->
      self.clients.claim()
    )
  )
)

self.addEventListener('fetch', (event) ->
  event.respondWith(
    caches.open($cacheName).then((cache) ->
      cache.match(event.request, ignoreSearch: true)
    ).then((response) ->
      response || fetch(event.request)
    )
  )
)
