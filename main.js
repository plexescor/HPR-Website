/* ============================================================
   HPR Website — Main JavaScript
   Mobile nav, scroll animations, tab switching, nav active state
   ============================================================ */

(function () {
  'use strict';

  // --- Mobile Navigation ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      // Animate hamburger
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- Scroll-triggered fade-in ---
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Tab Switching ---
  const tabBtns = document.querySelectorAll('.tab-btn');

  if (tabBtns.length > 0) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetTab = this.getAttribute('data-tab');

        // Deactivate all
        tabBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        document.querySelectorAll('.tab-panel').forEach(function (panel) {
          panel.classList.remove('active');
        });

        // Activate clicked
        this.classList.add('active');
        var targetPanel = document.getElementById('tab-' + targetTab);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // --- Nav scroll shadow ---
  const nav = document.getElementById('nav');

  if (nav) {
    var lastScroll = 0;
    window.addEventListener(
      'scroll',
      function () {
        var scrollY = window.scrollY;
        if (scrollY > 16) {
          nav.style.borderBottomColor = 'rgba(30, 30, 34, 0.9)';
        } else {
          nav.style.borderBottomColor = '';
        }
        lastScroll = scrollY;
      },
      { passive: true }
    );
  }

  // --- Stagger animation for cards ---
  const cards = document.querySelectorAll('.feature-grid .card, .stats-row .stat-card');
  cards.forEach(function (card, index) {
    card.style.transitionDelay = (index % 4) * 0.08 + 's';
  });
})();
