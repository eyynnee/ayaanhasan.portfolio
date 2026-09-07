/**
 * AYAN HASAN : PERSONAL ENGINEERING PORTFOLIO
 * Main Site Orchestrator, Adaptive Header Theme Spy, Lightbox & Media Modal
 */

(function () {
  'use strict';

  // 1. Sticky Navigation, Scroll Spy & Adaptive Header Theme
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function checkHeaderScroll() {
      if (window.scrollY > 25) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', checkHeaderScroll, { passive: true });
    checkHeaderScroll();

    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          menuToggle.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Scroll Spy for Active Navigation Link & Theme Adaptation
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });

          // Check if current active section has a light background (cream or stone)
          const isLightSection = entry.target.classList.contains('section-cream') || entry.target.classList.contains('section-stone');
          if (isLightSection) {
            header?.classList.add('theme-light');
          } else {
            header?.classList.remove('theme-light');
          }
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // 2. Balanced Figure Tabs Switcher (Tsunami FYP)
  function initFigureTabs() {
    const tabBtns = document.querySelectorAll('.figure-tab-btn');
    const figurePanes = document.querySelectorAll('.figure-slide-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetFig = btn.getAttribute('data-figure');

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        figurePanes.forEach(pane => {
          if (pane.getAttribute('data-figure-id') === targetFig) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });
  }

  // 3. Editorial Lightbox & Video Media Modal
  function initLightbox() {
    const lightbox = document.getElementById('editorial-lightbox');
    const stage = document.getElementById('lightbox-content-stage') || document.querySelector('.lightbox-image-stage');
    const lightboxTitle = document.getElementById('lightbox-title');
    const closeBtn = document.querySelector('.lightbox-dismiss-btn');
    const zoomableImages = document.querySelectorAll('[data-zoomable]');

    if (!lightbox || !stage) return;

    function openImage(src, alt, title) {
      if (lightboxTitle) lightboxTitle.textContent = title || alt || 'Engineering Visual';
      stage.innerHTML = `<img id="lightbox-image" src="${src}" alt="${alt}">`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function openVideo(mp4Src, movSrc, title, caption) {
      if (lightboxTitle) lightboxTitle.textContent = title || 'FIELD OBSERVATION FOOTAGE';
      stage.innerHTML = `
        <div style="width: 100%; max-width: 900px; display: flex; flex-direction: column; gap: 0.85rem;">
          <video controls autoplay playsinline style="width: 100%; max-height: 68vh; background: #000; border: 1px solid rgba(244, 239, 230, 0.15);">
            <source src="${mp4Src}" type="video/mp4">
            ${movSrc ? `<source src="${movSrc}" type="video/quicktime">` : ''}
            Your browser does not support the video tag.
          </video>
          <div class="figure-caption-strip" style="background: rgba(20, 20, 19, 0.95); padding: 0.85rem 1rem; border: 1px solid rgba(244, 239, 230, 0.12); margin-top: 0;">
            <span class="fig-badge-num">FIELD EVIDENCE</span>
            <span class="fig-caption-body" style="color: #F4EFE6;">${caption || 'Observed traffic and roadside condition from field survey at Maskan Chowrangi approach: push cart vendor occupying the active carriageway lane.'}</span>
          </div>
        </div>
      `;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    zoomableImages.forEach(img => {
      img.addEventListener('click', () => {
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt') || 'Engineering Visual';
        const title = img.getAttribute('data-title') || alt;
        openImage(src, alt, title);
      });
    });

    // Expose openVideo for field observation hotspots
    window.openVideoModal = openVideo;

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      // Clear inner content to stop any playing videos
      setTimeout(() => {
        stage.innerHTML = '<img id="lightbox-image" src="" alt="Zoomed Engineering Visual">';
      }, 300);
    }

    closeBtn?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 4. Interactive Maskan Field Observation Hotspot Trigger
  function initFieldObservationHotspot() {
    const container = document.querySelector('.cad-hotspot-container');
    const beacon = document.querySelector('.cad-hotspot-beacon');
    const previewStage = document.querySelector('.preview-video-stage');
    const previewVideo = document.querySelector('#hotspot-preview-video');
    const hintBtn = document.querySelector('.preview-action-hint');

    if (!container || !beacon) return;

    // Desktop hover: auto play preview video muted
    container.addEventListener('mouseenter', () => {
      if (previewVideo) {
        previewVideo.play().catch(() => {});
      }
    });

    container.addEventListener('mouseleave', () => {
      if (previewVideo) {
        previewVideo.pause();
        previewVideo.currentTime = 0;
      }
    });

    // Mobile tap toggle
    beacon.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = container.classList.toggle('is-open');
      if (isOpen && previewVideo) {
        previewVideo.play().catch(() => {});
      } else if (previewVideo) {
        previewVideo.pause();
      }
    });

    // Click to open full focused video modal
    function launchFullVideo() {
      if (window.openVideoModal) {
        window.openVideoModal(
          'assets/projects/traffic/push-cart-vendor.mp4',
          'assets/projects/traffic/Push Cart Vendor.mov',
          'FIELD OBSERVATION 01 : PUSH CART VENDOR ENCROACHMENT',
          'Field survey video documentation at Maskan Chowrangi approach: push cart vendor occupying the active roadway lane, causing vehicle swerving and pedestrian crossing impediments.'
        );
      }
    }

    previewStage?.addEventListener('click', launchFullVideo);
    hintBtn?.addEventListener('click', launchFullVideo);

    // Close popover if tapping outside on mobile
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        container.classList.remove('is-open');
        if (previewVideo) previewVideo.pause();
      }
    });
  }

  // 5. Smooth Anchor Scrolling Offset Handling
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 68;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight + 5;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFigureTabs();
    initLightbox();
    initFieldObservationHotspot();
    initSmoothScroll();
  });
})();
