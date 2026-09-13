// stats.js — the scroll-scrubbed SVG progress ring and the count-up
// stat numbers. Edit STAT_TARGETS to match your real numbers.

const STAT_TARGETS = [6, 1, 4];

export function initStats() {
  const markPath = document.getElementById('markPath');
  if (markPath) {
    const circumference = 2 * Math.PI * 44;
    markPath.setAttribute('d', 'M50 6 A44 44 0 1 1 49.99 6');
    markPath.style.strokeDasharray = circumference;
    markPath.style.strokeDashoffset = circumference;
    ScrollTrigger.create({
      trigger: '.mark-wrap',
      start: 'top 90%',
      end: 'bottom 40%',
      scrub: 0.6,
      onUpdate: self => {
        markPath.style.strokeDashoffset = circumference * (1 - self.progress);
        gsap.set('.mark', { rotation: self.progress * 120 });
      },
    });
    gsap.set('.mark', { transformOrigin: '50% 50%' });
  }

  document.querySelectorAll('.stat .n').forEach((el, i) => {
    const target = STAT_TARGETS[i] || 10;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (el.dataset.counted) return;
        el.dataset.counted = 'true';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val); },
        });
      },
    });
  });

  window.addEventListener('portfolio:reset', () => {
    if (markPath) {
      const circumference = 2 * Math.PI * 44;
      markPath.style.strokeDashoffset = circumference;
      gsap.set('.mark', { rotation: 0 });
    }
    document.querySelectorAll('.stat .n').forEach(el => {
      delete el.dataset.counted;
      el.textContent = '0';
    });
  });
}
