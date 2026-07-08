// v7 init script — supersedes v6-init.js
// Six responsibilities:
//   1) Patch "Read our story" link href="#" -> "/signup" (kept from v5)
//   2) Patch all footer link hrefs based on label text. Links with no
//      destination route are hidden (parent <li> set to display:none).
//   3) Move the GO PRO section's "Pro" badge <span> INTO the "Upgrade now"
//      <a> button, so the badge appears inside the button.
//   4) NEW v7: Replace "Back to app" link text with "Get started" and
//      point it to /signup (was /app). User wants authentication entry.
//   5) NEW v7: Scroll-to-top on SPA route change. The React app uses
//      history.pushState/replaceState for navigation and doesn't reset
//      scroll, so users land mid-page after clicking footer links.
//   6) NEW v7: On plain <a href="/route"> clicks (full page navigation
//      via Cloudflare Pages SPA fallback), also reset scroll to top.
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
    'Cookie Policy': '/legal/privacy'
  };
  var FOOTER_LINK_HIDE = ['About', 'Careers', 'Press', 'Contact',
                          'Help Center', 'Cookies'];

  function patchStoryLink() {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var txt = (links[i].textContent || '').trim();
      if (/read our story/i.test(txt) && links[i].getAttribute('href') === '#') {
        links[i].setAttribute('href', '/signup');
      }
    }
  }

  function patchFooterLinks() {
    var isMobile = window.innerWidth <= 640;
    var links = document.querySelectorAll('a.font-body.text-sm');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var txt = (a.textContent || '').trim();
      if (a.getAttribute('href') !== '#') continue;
      if (txt in FOOTER_LINK_MAP) {
        a.setAttribute('href', FOOTER_LINK_MAP[txt]);
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
    var tokenLinks = document.querySelectorAll('a[href="/tokens"]');
    for (var i = 0; i < tokenLinks.length; i++) {
      if (tokenLinks[i].textContent.trim() === 'Upgrade now') {
        upgradeLink = tokenLinks[i];
        break;
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
    // NEW v7: Replace em-dash "—" with ", " (comma + space) in paragraph
    // text. The em-dash was causing a visual "dash at end of line" effect
    // on narrow mobile containers ("out—\nexplore"). Replacing with a
    // comma preserves the sentence meaning while eliminating the dangling
    // dash. The comma allows natural line breaking at word boundaries.
    // Runs on ALL viewports (em-dash issue is most visible on mobile but
    // affects desktop too on narrow containers).
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
        // Replace "X—Y" with "X, Y" (comma + space instead of em-dash)
        // Also handle "X— Y" and "X —Y" (em-dash with one space)
        var newText = text
          .replace(/\s*\u2014\s*/g, ', ')
          // Clean up double commas (e.g., "word,, word" → "word, word")
          .replace(/,\s*,/g, ',')
          // Clean up ", ." (comma before period) → "."
          .replace(/,\s*\./g, '.');
        if (newText !== text) {
          nodes[j].nodeValue = newText;
        }
      }
    }
  }

  function patchBackToAppLink() {
    // NEW v7: Replace "Back to app" link text with "Get started" and
    // point it to /signup (was /app). The "Back to app" link appears on
    // the /tokens page header. User wants it to be an auth entry point.
    // Runs on ALL viewports (text change applies everywhere).
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var txt = (a.textContent || '').trim();
      if (txt === 'Back to app') {
        var href = a.getAttribute('href') || '';
        if (href === '/app') {
          a.setAttribute('href', '/signup');
          a.textContent = 'Get started';
        }
      }
    }
  }

  function setupScrollToTop() {
    // NEW v7: Scroll-to-top on SPA route change.
    // React Router uses history.pushState under the hood. We monkey-patch
    // pushState/replaceState to call window.scrollTo(0,0) after each nav.
    // Also listen for popstate (back/forward button).
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

    // Also intercept clicks on internal <a href="/..."> links (full page
    // navigation via Cloudflare Pages SPA fallback). When the new page
    // loads, scroll should start at top, not preserved.
    document.addEventListener('click', function(e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '/' || href.charAt(1) === '/') return;
      if (href.charAt(0) === '#') return;
      try { sessionStorage.setItem('v7_scroll_top', '1'); } catch(e) {}
    }, true);

    // On page load, check the flag and scroll to top
    if (sessionStorage.getItem('v7_scroll_top') === '1') {
      sessionStorage.removeItem('v7_scroll_top');
      window.scrollTo(0, 0);
      window.addEventListener('load', function() {
        window.scrollTo(0, 0);
      });
    }
  }

  function patchAll() {
    patchStoryLink();
    patchFooterLinks();
    moveProBadgeIntoButton();
    patchBackToAppLink();
    patchEmDashes();
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
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      var observer = new MutationObserver(function() { patchAll(); });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
