(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/abecedarian/service.js', {
      scope: '/abecedarian/'
    }).then(function(registration) {
      var refreshPage;
      refreshPage = function(worker) {
        if (worker.state !== 'activated') {
          worker.postMessage({
            action: 'skipWaiting'
          });
        }
        return window.location.reload();
      };
      if (registration.waiting) {
        refreshPage(registration.waiting);
      }
      return registration.addEventListener('updatefound', function() {
        var newWorker;
        newWorker = registration.installing;
        return newWorker.addEventListener('statechange', function() {
          if (newWorker.state === 'installed') {
            return refreshPage(newWorker);
          }
        });
      });
    });
  }

  window.addEventListener('beforeinstallprompt', function(e) {
    var button, deferredInstall;
    // necessary?
    e.preventDefault();
    deferredInstall = e;
    button = document.createElement('button');
    button.setAttribute('id', 'installer');
    button.addEventListener('click', function() {
      deferredInstall.prompt();
      return deferredInstall.userChoice.finally(function() {
        deferredInstall = null;
        return document.body.removeChild(button);
      });
    });
    return document.body.appendChild(button);
  });

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
