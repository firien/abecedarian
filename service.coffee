tag = 2
$cacheName = "ABE-#{tag}"

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

self.addEventListener('activate', (event) ->
  event.waitUntil(self.clients.claim())
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
