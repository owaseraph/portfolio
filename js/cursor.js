// cursor.js — custom cursor ring + dot, and magnetic hover elements.
// Call disable() instead of init() when prefers-reduced-motion is set.

export function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' });
  const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' });
  const dotX = gsap.quickTo(cursorDot, 'x', { duration: 0.12, ease: 'power3.out' });
  const dotY = gsap.quickTo(cursorDot, 'y', { duration: 0.12, ease: 'power3.out' });

  window.addEventListener('mousemove', e => {
    cursorX(e.clientX); cursorY(e.clientY);
    dotX(e.clientX); dotY(e.clientY);
  });

  document.querySelectorAll('[data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

export function initMagnetic() {
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.5);
    });
    el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
  });
}

export function disableCursor() {
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  document.body.style.cursor = 'auto';
  if (cursor) cursor.style.display = 'none';
  if (cursorDot) cursorDot.style.display = 'none';
}
