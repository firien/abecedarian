document.addEventListener('DOMContentLoaded', ->
  if IntersectionObserver?
    setTimeout( ->
      callback = (entries, observer) ->
        entries.forEach((entry) ->
          if entry.isIntersecting && entry.intersectionRatio == 1
            location.hash = entry.target.id
        )
      observer = new IntersectionObserver(callback, threshold: 1.0)
      Array::slice.call(document.querySelectorAll('div[id^=letter]')).forEach((element) ->
        observer.observe(element)
      )
    , 300)
  window.requestAnimationFrame( ->
    speed = 250#pixels/sec
    Array::slice.call(document.querySelectorAll('svg')).forEach((svg) ->
      delay = 0
      Array::slice.call(svg.querySelectorAll('path')).forEach((path, i) ->
        length = path.getTotalLength()
        path.setAttribute('stroke-dasharray', length)
        path.setAttribute('stroke-dashoffset', length)
        time = (length / speed)
        css = "animation-duration:#{time.toFixed(2)}s;"
        if i > 0
          css += "animation-delay:#{delay.toFixed(2)}s"
        delay += time
        path.setAttribute('style', css)
      )
    )
  )
)
