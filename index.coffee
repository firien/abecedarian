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

window.addEventListener('beforeinstallprompt', (e) ->
  # necessary?
  e.preventDefault()
  deferredInstall = e
  button = document.createElement('button')
  button.setAttribute('id', 'installer')
  button.addEventListener('click', ->
    deferredInstall.prompt()
    deferredInstall.userChoice.finally( ->
      deferredInstall = null
      document.body.removeChild(button)
    )
  )
  document.body.appendChild(button)
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
