tag = 2
$prefix = 'ABC'
$cacheName = "#{$prefix}-#{tag}"

$urls = [
  '/abecedarian/index.css'
  '/abecedarian/index.js'
  '/abecedarian/index.html'
  '/abecedarian/'
]

self.addEventListener('install', (event) ->
  event.waitUntil(caches.open($cacheName).then((cache) ->
    cache.addAll($urls)
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
  event.waitUntil(clearPreviousCaches)
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

self.addEventListener('message', (event) ->
  if event.data.action == 'skipWaiting'
    self.skipWaiting()
)
