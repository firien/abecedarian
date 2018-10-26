(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var callback, observer;
    if (typeof IntersectionObserver !== "undefined" && IntersectionObserver !== null) {
      // setTimeout( ->
      callback = function(entries, observer) {
        return entries.forEach(function(entry) {
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            // github.com/whatwg/html/issues/639
            // history.replaceState(null, null, "##{entry.target.id}")
            return location.hash = entry.target.id;
          }
        });
      };
      observer = new IntersectionObserver(callback, {
        threshold: 1.0
      });
      Array.prototype.slice.call(document.querySelectorAll('div[id^=letter]')).forEach(function(element) {
        return observer.observe(element);
      });
    }
    // , 300)
    return window.requestAnimationFrame(function() {
      var speed;
      speed = 250; //pixels/sec
      return Array.prototype.slice.call(document.querySelectorAll('svg')).forEach(function(svg) {
        var delay;
        delay = 0;
        return Array.prototype.slice.call(svg.querySelectorAll('path')).reverse().forEach(function(path, i) {
          var css, length, time;
          length = path.getTotalLength();
          path.setAttribute('stroke-dasharray', length);
          path.setAttribute('stroke-dashoffset', length);
          time = length / speed;
          css = `animation-duration:${time.toFixed(2)}s;`;
          if (i > 0) {
            css += `animation-delay:${delay.toFixed(2)}s`;
          }
          delay += time;
          return path.setAttribute('style', css);
        });
      });
    });
  });

}).call(this);
