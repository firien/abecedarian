if 'serviceWorker' of navigator
  navigator.serviceWorker.register('/abecedarian/service.js', scope: '/abecedarian/')

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
