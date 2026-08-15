/* ============================================================
   site.js — small progressive enhancements. The page works without it.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- current year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- sticky header shadow ---------- */
  var head = document.getElementById('siteHead');
  if (head) {
    var onScroll = function () {
      head.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById('burger');
  var mnav = document.getElementById('mobileNav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mnav.classList.toggle('is-open', !open);
      mnav.hidden = open;
    });
    mnav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      burger.setAttribute('aria-expanded', 'false');
      mnav.classList.remove('is-open');
      mnav.hidden = true;
    });
  }

  /* ---------- reveal on scroll ---------- */
  var targets = document.querySelectorAll(
    '.sec-head, .card, .stats, .split__copy, .split__fig, .timeline > li, .figure-wide, .ticks, .creds__col, .contact__copy'
  );

  function showAll() {
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.remove('reveal');
      el.classList.remove('is-in');
      el.style.transitionDelay = '';
    });
  }

  if (!reduce && 'IntersectionObserver' in window) {
    try {
      Array.prototype.forEach.call(targets, function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
    } catch (err) {
      /* if anything about the observer fails, content must never stay hidden */
      showAll();
    }
  }

  /* Nothing on this page is allowed to be permanently invisible. If a tool,
     crawler, or printer never fires a scroll event, show everything anyway. */
  window.addEventListener('beforeprint', showAll);

  /* ---------- email: assembled in the browser, not sitting in the HTML ---------- */
  var parts = ['silverramtruck', 'gmail', 'com'];
  var address = parts[0] + '@' + parts[1] + '.' + parts[2];
  Array.prototype.forEach.call(document.querySelectorAll('[data-mail]'), function (a) {
    var slot = a.querySelector('[data-mail-text]');
    a.setAttribute('href', 'mailto:' + address);
    a.removeAttribute('rel');
    if (slot) slot.textContent = address;
  });

  /* ---------- deep link: #terminal?cmd=hire  or  /#hire ---------- */
  function runFromHash() {
    var h = decodeURIComponent(window.location.hash || '');
    var m = h.match(/[?&]cmd=([^&]+)/);
    if (m && window.SJDTerminal) {
      setTimeout(function () { window.SJDTerminal.run(m[1]); }, 900);
    }
  }
  window.addEventListener('load', runFromHash);
})();
