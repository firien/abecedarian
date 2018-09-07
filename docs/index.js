(function() {
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof IntersectionObserver !== "undefined" && IntersectionObserver !== null) {
      setTimeout(function() {
        var callback, observer;
        callback = function(entries, observer) {
          return entries.forEach(function(entry) {
            if (entry.isIntersecting && entry.intersectionRatio === 1) {
              return location.hash = entry.target.id;
            }
          });
        };
        observer = new IntersectionObserver(callback, {
          threshold: 1.0
        });
        return Array.prototype.slice.call(document.querySelectorAll('div[id^=letter]')).forEach(function(element) {
          return observer.observe(element);
        });
      }, 300);
    }
    return window.requestAnimationFrame(function() {
      var speed;
      speed = 250; //pixels/sec
      return Array.prototype.slice.call(document.querySelectorAll('svg')).forEach(function(svg) {
        var delay;
        delay = 0;
        return Array.prototype.slice.call(svg.querySelectorAll('path')).forEach(function(path, i) {
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
