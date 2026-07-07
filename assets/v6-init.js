// v6 init script — supersedes v5-story-link-patch.js
// Three responsibilities:
//   1) Patch "Read our story" link href="#" -> "/signup" (kept from v5)
//   2) Patch all footer link hrefs based on label text. Links with no
//      destination route are hidden (parent <li> set to display:none).
//   3) Move the GO PRO section's "Pro" badge <span> INTO the "Upgrade now"
//      <a> button, so the badge appears inside the button.
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
  // Links with no destination → hide their parent <li>
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
    // Footer links are <a href="#" class="font-body text-sm text-[#6B7280] ...">
    // inside <li> elements inside <ul class="space-y-3">
    // Href patching runs on ALL viewports (dead links are dead everywhere).
    // HIDING links with no destination is MOBILE-ONLY (on desktop, the footer
    // has room for all 16 links; hiding them would leave ugly gaps).
    var isMobile = window.innerWidth <= 640;
    var links = document.querySelectorAll('a.font-body.text-sm');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var txt = (a.textContent || '').trim();
      if (a.getAttribute('href') !== '#') continue;
      if (txt in FOOTER_LINK_MAP) {
        a.setAttribute('href', FOOTER_LINK_MAP[txt]);
      } else if (isMobile && FOOTER_LINK_HIDE.indexOf(txt) !== -1) {
        // Hide the parent <li> element — mobile only
        var li = a.closest('li');
        if (li) li.style.display = 'none';
        else a.style.display = 'none';
      }
    }
  }

  function moveProBadgeIntoButton() {
    // MOBILE-ONLY. On desktop, the Pro badge sits beside the button (original
    // design, plenty of room). Only move it inside on mobile viewports.
    if (window.innerWidth > 640) return;
    // Find the "Upgrade now" link specifically (NOT the "Pricing" nav links
    // which also point to /tokens). The Upgrade now button lives in the
    // .flex.items-center.gap-4 row inside the GO PRO section.
    var upgradeLink = null;
    var tokenLinks = document.querySelectorAll('a[href="/tokens"]');
    for (var i = 0; i < tokenLinks.length; i++) {
      if (tokenLinks[i].textContent.trim() === 'Upgrade now') {
        upgradeLink = tokenLinks[i];
        break;
      }
    }
    if (!upgradeLink) return;
    // The Pro badge is a sibling <span> in the same flex row
    var parent = upgradeLink.parentElement;
    if (!parent) return;
    // Find the span containing "Pro" text (it's an inline-flex span with the icon)
    var spans = parent.querySelectorAll('span.inline-flex.items-center.gap-2');
    var proBadge = null;
    for (var i = 0; i < spans.length; i++) {
      if (/^\s*Pro\s*$/.test(spans[i].textContent || '')) {
        proBadge = spans[i];
        break;
      }
    }
    if (!proBadge) return;
    // Already moved?
    if (proBadge.parentElement === upgradeLink) return;
    // Move badge inside the link, add some margin between text and badge
    upgradeLink.appendChild(proBadge);
    proBadge.style.marginLeft = '8px';
    proBadge.style.marginRight = '-4px';
    // Ensure the link is flex-aligned so text + badge sit side by side
    // (it already has inline-flex items-center justify-center from JSX)
  }

  function patchAll() {
    patchStoryLink();
    patchFooterLinks();
    moveProBadgeIntoButton();
  }

  // Patch as early as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchAll);
  } else {
    patchAll();
  }

  // Re-patch after window load (after React hydrates)
  window.addEventListener('load', patchAll);

  // Re-patch periodically for the first 5 seconds (catches async React renders)
  var attempts = 0;
  var interval = setInterval(function() {
    patchAll();
    attempts++;
    if (attempts >= 20) clearInterval(interval);
  }, 250);

  // Also re-patch on any DOM mutation (catches late SPA navigations)
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
