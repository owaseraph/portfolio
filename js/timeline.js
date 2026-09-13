// timeline.js — the vertical spine that draws itself on scroll, and the
// per-beat reveal + active-dot highlighting.

export function initTimeline() {
  const spineProgress = document.getElementById('spineProgress');
  if (spineProgress) {
    ScrollTrigger.create({
      trigger: '.timeline',
      start: 'top center',
      end: 'bottom center',
      onUpdate: self => { spineProgress.style.height = (self.progress * 100) + '%'; },
    });
  }

  document.querySelectorAll('[data-beat]').forEach(beat => {
    gsap.fromTo(beat.querySelectorAll('h2, p'), { opacity: 0, x: -16 }, {
      opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.06,
      scrollTrigger: { trigger: beat, start: 'top 75%' },
    });
    ScrollTrigger.create({
      trigger: beat,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => beat.classList.add('is-active'),
      onLeave: () => beat.classList.remove('is-active'),
      onEnterBack: () => beat.classList.add('is-active'),
      onLeaveBack: () => beat.classList.remove('is-active'),
    });
  });
}
