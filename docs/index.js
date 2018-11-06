(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/abecedarian/service.js', {
      scope: '/abecedarian/'
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var callback, observer;
    if (typeof IntersectionObserver !== "undefined" && IntersectionObserver !== null) {
      document.body.classList.add('draw');
      callback = function(entries, observer) {
        return entries.forEach(function(entry) {
          if (entry.isIntersecting && Math.abs(entry.intersectionRatio) > 0.96) {
            // github.com/whatwg/html/issues/639
            // history.replaceState(null, null, "##{entry.target.id}")
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
    }
  });

}).call(this);
