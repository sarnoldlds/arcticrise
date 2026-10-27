/* Arctic RISE — small enhancements only. The site works without JavaScript;
   this file adds the mobile menu, the solid header on scroll, highlighting of
   the current section in the menu, and the configurable contact email. */
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  /* ---- Mobile menu ------------------------------------------------------ */
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    // Close with Escape and return focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });

    // Reset if the window grows past the mobile breakpoint
    window.matchMedia('(min-width: 960px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---- Solid header after scrolling past the top of the hero ------------- */
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Highlight the current section in the navigation ------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  // "Why atmospheric profiles matter" belongs to the About menu item
  var sectionToLink = { top: 'top', why: 'about', about: 'about', vision: 'vision', activities: 'activities', projects: 'projects', contact: 'contact' };

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var target = '#' + sectionToLink[entry.target.id];
        links.forEach(function (a) {
          if (a.getAttribute('href') === target) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(sectionToLink).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  /* ---- Contact email ----------------------------------------------------- */
  // The address is stored in two parts in index.html so that spam bots
  // scanning the page source don't find a complete "name@domain" address:
  //   <section id="contact" data-contact-user="..." data-contact-domain="...">
  // It is only assembled here, in the visitor's browser.
  var contact = document.getElementById('contact');
  if (contact) {
    var user = (contact.getAttribute('data-contact-user') || '').trim();
    var domain = (contact.getAttribute('data-contact-domain') || '').trim();
    if (user && domain) {
      var email = user + String.fromCharCode(64) + domain;   // 64 = "@"
      var link = document.getElementById('contact-email-link');
      link.href = 'mai' + 'lto:' + email;
      document.getElementById('contact-email-text').textContent = email;
      contact.querySelector('.contact__action').hidden = false;
    }
  }

  /* ---- Visitor statistics (Cloudflare Web Analytics) --------------------- */
  // Cookie-free analytics. It only runs on the live site (arcticrise.org), so
  // visits to the preview copy on github.io are not counted.
  // To switch analytics off, delete this block.
  if (/(^|\.)arcticrise\.org$/.test(location.hostname)) {
    var cf = document.createElement('script');
    cf.defer = true;
    cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cf.setAttribute('data-cf-beacon', '{"token": "7cdef5a10cbe434c861561e4de97e644"}');
    document.head.appendChild(cf);
  }
})();
