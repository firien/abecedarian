if 'serviceWorker' of navigator
  navigator.serviceWorker.register('/abecedarian/service.js', scope: '/abecedarian/').then((registration) ->
    refreshPage = (worker) ->
      if worker.state != 'activated'
        worker.postMessage(action: 'skipWaiting')
      window.location.reload()
    if registration.waiting
      refreshPage(registration.waiting)
    registration.addEventListener('updatefound', ->
      newWorker = registration.installing
      newWorker.addEventListener('statechange', ->
        if newWorker.state == 'installed'
          refreshPage(newWorker)
      )
    )
  )

document.addEventListener('DOMContentLoaded', ->
  if IntersectionObserver?
    document.body.classList.add('draw')
    callback = (entries, observer) ->
      entries.forEach((entry) ->
        if entry.isIntersecting && Math.abs(entry.intersectionRatio) > 0.96
          # github.com/whatwg/html/issues/639
          # history.replaceState(null, null, "##{entry.target.id}")
          location.hash = entry.target.id
      )
    observer = new IntersectionObserver(callback, threshold: 1.0)
    Array::slice.call(document.querySelectorAll('div[id^=letter]')).forEach((element) ->
      observer.observe(element)
    )
)
