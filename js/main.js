// main.js — entry point. Registers GSAP plugins, checks for
// prefers-reduced-motion, and wires up every module.
//
// This file is loaded as <script type="module" src="js/main.js">,
// so every file it imports must use export/import (already set up).

import { initTheme } from './theme.js';
import { initCursor, initMagnetic, disableCursor } from './cursor.js';
import { initHero, resetHero } from './hero.js';
import { initMarquee, initRevealText, initPinnedGallery } from './gallery.js';
import { initStats } from './stats.js';
import { initTimeline } from './timeline.js';
import { initFooter } from './footer.js';
import { renderProjects } from './projects.js';
gsap.registerPlugin(ScrollTrigger);

function initHomeScroll() {
  const homeLink = document.querySelector('nav > a[href="#top"]');
  if (!homeLink) return;

  let scrollTween;
  homeLink.addEventListener('click', event => {
    event.preventDefault();
    scrollTween?.kill();

    const startY = window.scrollY;
    if (startY <= 1) {
      window.dispatchEvent(new Event('portfolio:reset'));
      return;
    }

    const duration = Math.min(Math.max(startY / 900, 1.2), 2.4);
    const heroDelay = Math.max(duration - 0.7, 0);
    window.dispatchEvent(new CustomEvent('portfolio:reset', { detail: { heroDelay } }));
    scrollTween = gsap.to({ y: startY }, {
      y: 0,
      duration,
      ease: 'power4.inOut',
      onUpdate: function () { window.scrollTo(0, this.targets()[0].y); },
      onComplete: () => {
        history.replaceState(null, '', '#top');
      },
    });
  });
}

// Dark mode toggle works regardless of motion preference.
initTheme();
initHomeScroll();

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduced) {
  // Show everything in its resting state, skip all motion/cursor tricks.
  document.querySelectorAll('.hero-sub, .hero-line, .hero-status, .reveal-inner, [data-beat] h2, [data-beat] p, footer > *')
    .forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  disableCursor();
} else {
  window.addEventListener('portfolio:reset', resetHero);
  initCursor();
  initMagnetic();
  initHero();
  initMarquee();
  initRevealText();
  renderProjects();
  initPinnedGallery(); 
  initStats();
  initTimeline();
  initFooter();
}
