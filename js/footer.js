// footer.js — simple staggered fade-in for the contact footer.

export function initFooter() {
  gsap.fromTo('footer > *', { opacity: 0, y: 16 }, {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.1,
    scrollTrigger: { trigger: 'footer', start: 'top 85%' },
  });
  gsap.fromTo('footer h2', { opacity: 0, y: 36, clipPath: 'inset(100% 0 0 0)' }, {
    opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power4.out',
    scrollTrigger: { trigger: 'footer', start: 'top 78%' },
  });
}
