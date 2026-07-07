// v5 init script: patch the About section's "Read our story" link.
(function() {
  window.__v5Patched = window.__v5Patched || 0;
  function patchStoryLink() {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var txt = (links[i].textContent || '').trim();
      if (/read our story/i.test(txt) && links[i].getAttribute('href') === '#') {
        links[i].setAttribute('href', '/signup');
        window.__v5Patched++;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchStoryLink);
  } else {
    patchStoryLink();
  }

  window.addEventListener('load', patchStoryLink);

  var attempts = 0;
  var interval = setInterval(function() {
    patchStoryLink();
    attempts++;
    if (attempts >= 20) clearInterval(interval);
  }, 250);

  if (document.body) {
    var observer = new MutationObserver(function() { patchStoryLink(); });
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      var observer = new MutationObserver(function() { patchStoryLink(); });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
