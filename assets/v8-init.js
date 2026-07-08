// v8 init script — supersedes v7-init.js
// CRITICAL FIX: All patch functions now have idempotency guards to prevent
// infinite MutationObserver loops. The previous version re-set attributes
// on every observer callback, causing the browser to freeze on /tokens.
(function() {
  var FOOTER_LINK_MAP = {
    'Styles': '/styles',
    'How it works': '/#steps',
    'Community': '/community',
    'Pricing': '/tokens',
    'Privacy': '/legal/privacy',
    'Terms': '/legal/terms',
    'Privacy Policy': '/legal/privacy',
    'Terms of Service': '/legal/terms',
    'Cookie Policy': '/legal/cookies/'
  };
  var FOOTER_LINK_HIDE = ['About', 'Careers', 'Press', 'Contact',
                          'Help Center', 'Cookies'];

  function absUrl(path) {
    return window.location.origin + path;
  }

  function patchStoryLink() {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var txt = (a.textContent || '').trim();
      if (!/read our story/i.test(txt)) continue;
      var cur = a.getAttribute('href') || '';
      // GUARD: skip if already patched to an absolute /signup URL
      if (cur === absUrl('/signup')) continue;
      if (cur === '#') {
        a.setAttribute('href', absUrl('/signup'));
      }
    }
  }

  function patchFooterLinks() {
    var isMobile = window.innerWidth <= 640;
    var links = document.querySelectorAll('a.font-body.text-sm');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var txt = (a.textContent || '').trim();
      var cur = a.getAttribute('href') || '';
      // GUARD: skip if already an absolute URL (already patched)
      if (cur.indexOf('http') === 0) continue;
      // Only patch links with href="#" (un-patched) or relative paths
      if (cur !== '#' && cur.charAt(0) !== '/') continue;
      if (txt in FOOTER_LINK_MAP) {
        a.setAttribute('href', absUrl(FOOTER_LINK_MAP[txt]));
      } else if (isMobile && FOOTER_LINK_HIDE.indexOf(txt) !== -1) {
        var li = a.closest('li');
        if (li) li.style.display = 'none';
        else a.style.display = 'none';
      }
    }
  }

  function moveProBadgeIntoButton() {
    if (window.innerWidth > 640) return;
    var upgradeLink = null;
    var tokenLinks = document.querySelectorAll('a');
    for (var i = 0; i < tokenLinks.length; i++) {
      if (tokenLinks[i].textContent.trim() === 'Upgrade now') {
        var h = tokenLinks[i].getAttribute('href') || '';
        if (h.indexOf('/tokens') !== -1) {
          upgradeLink = tokenLinks[i];
          break;
        }
      }
    }
    if (!upgradeLink) return;
    var parent = upgradeLink.parentElement;
    if (!parent) return;
    var spans = parent.querySelectorAll('span.inline-flex.items-center.gap-2');
    var proBadge = null;
    for (var i = 0; i < spans.length; i++) {
      if (/^\s*Pro\s*$/.test(spans[i].textContent || '')) {
        proBadge = spans[i];
        break;
      }
    }
    if (!proBadge) return;
    if (proBadge.parentElement === upgradeLink) return;
    upgradeLink.appendChild(proBadge);
    proBadge.style.marginLeft = '8px';
    proBadge.style.marginRight = '-4px';
  }

  function patchEmDashes() {
    var paragraphs = document.querySelectorAll('p, h1, h2, h3, h4, span');
    for (var i = 0; i < paragraphs.length; i++) {
      var el = paragraphs[i];
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, null);
      var nodes = [];
      var node;
      while (node = walker.nextNode()) nodes.push(node);
      for (var j = 0; j < nodes.length; j++) {
        var text = nodes[j].nodeValue;
        if (text.indexOf('\u2014') === -1) continue;
        var newText = text
          .replace(/\s*\u2014\s*/g, ', ')
          .replace(/,\s*,/g, ',')
          .replace(/,\s*\./g, '.');
        if (newText !== text) {
          nodes[j].nodeValue = newText;
        }
      }
    }
  }

  function patchBackToAppLink() {
    var targetHref = absUrl('/signup');
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var txt = (a.textContent || '').trim();
      var href = a.getAttribute('href') || '';

      // GUARD: If already fully patched (correct text, correct href,
      // correct className, has data-v8-pill), skip ALL modifications
      // to avoid triggering MutationObserver in a loop.
      var pillClass = 'glow-btn-primary';
      if (txt === 'Get started' &&
          href === targetHref &&
          a.getAttribute('data-v8-pill') === '1' &&
          a.className === pillClass) {
        continue;
      }

      // Match original "Back to app" (href contains /app)
      var isOriginal = txt === 'Back to app' && href.indexOf('/app') !== -1;
      // Match partially-patched (text changed but not all attributes)
      var isPartial = txt === 'Get started' && a.getAttribute('data-v8-pill') === '1';
      if (!isOriginal && !isPartial) continue;

      a.setAttribute('href', targetHref);
      a.textContent = 'Get started';
      a.setAttribute('data-v8-pill', '1');
      a.className = pillClass;
      a.style.textDecoration = 'none';
      a.style.display = 'inline-flex';
      a.style.alignItems = 'center';
      a.style.justifyContent = 'center';
      a.style.gap = '0.5rem';
    }
  }

  function gateCommunityButtons() {
    var path = window.location.pathname || '';
    var onCommunity = path === '/community' || path === '/community/';
    if (!onCommunity) return;

    var targetHref = absUrl('/signup');
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var href = a.getAttribute('href') || '';
      var txt = (a.textContent || '').trim();
      var cls = a.className || '';

      // GUARD: skip if already pointing to /signup (absolute URL)
      if (href === targetHref) continue;

      var pointsToApp = href === '/app' || href.indexOf('/app') !== -1;
      if (!pointsToApp) continue;

      if (txt === 'Submit Look') {
        a.setAttribute('href', targetHref);
        continue;
      }
      if (txt === '' && cls.indexOf('fixed') !== -1 && cls.indexOf('bottom-6') !== -1) {
        a.setAttribute('href', targetHref);
        continue;
      }
    }
  }

  function setupScrollToTop() {
    if (window.__v7_scroll_patched) return;
    window.__v7_scroll_patched = true;

    var origPushState = history.pushState;
    var origReplaceState = history.replaceState;

    history.pushState = function() {
      var ret = origPushState.apply(this, arguments);
      setTimeout(function() { window.scrollTo(0, 0); }, 0);
      return ret;
    };
    history.replaceState = function() {
      var ret = origReplaceState.apply(this, arguments);
      setTimeout(function() { window.scrollTo(0, 0); }, 0);
      return ret;
    };
    window.addEventListener('popstate', function() {
      setTimeout(function() { window.scrollTo(0, 0); }, 0);
    });

    document.addEventListener('click', function(e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) === '#') return;
      var isSameOriginAbs = href.indexOf(window.location.origin + '/') === 0;
      var isRelPath = href.charAt(0) === '/' && href.charAt(1) !== '/';
      if (!isSameOriginAbs && !isRelPath) return;
      try { sessionStorage.setItem('v7_scroll_top', '1'); } catch(e) {}
    }, true);

    if (sessionStorage.getItem('v7_scroll_top') === '1') {
      sessionStorage.removeItem('v7_scroll_top');
      window.scrollTo(0, 0);
      window.addEventListener('load', function() {
        window.scrollTo(0, 0);
      });
    }
  }

  // Throttle patchAll to prevent rapid-fire calls from MutationObserver
  var patchTimer = null;
  function patchAll() {
    if (patchTimer !== null) return;
    patchTimer = setTimeout(function() {
      patchTimer = null;
      patchStoryLink();
      patchFooterLinks();
      moveProBadgeIntoButton();
      patchBackToAppLink();
      patchEmDashes();
      gateCommunityButtons();
    }, 50);
  }

  setupScrollToTop();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchAll);
  } else {
    patchAll();
  }

  window.addEventListener('load', patchAll);

  var attempts = 0;
  var interval = setInterval(function() {
    patchAll();
    attempts++;
    if (attempts >= 20) clearInterval(interval);
  }, 250);

  if (document.body) {
    var observer = new MutationObserver(function() { patchAll(); });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href', 'class'] });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      var observer = new MutationObserver(function() { patchAll(); });
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href', 'class'] });
    });
  }
})();
