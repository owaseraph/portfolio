// hero.js — editorial hero timeline, scramble-text effect for the
// eyebrow label, and a mouse-reactive grid background in the hero.

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·/\\_';

export function scrambleIn(el, final, duration = 1.1) {
  let frame = 0;
  const totalFrames = Math.round(duration * 60);
  el.style.opacity = 1;
  const iv = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    el.textContent = final.split('').map((ch, i) => {
      if (ch === ' ' || ch === '·') return ch;
      if (i / final.length < progress) return ch;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }).join('');
    if (frame >= totalFrames) { clearInterval(iv); el.textContent = final; }
  }, 1000 / 60);
}

export function initHero() {
  const heroTitle = document.getElementById('heroTitle');
  const heroMedia = document.getElementById('heroMedia');
  const heroSub = document.getElementById('heroSub');
  const scrambleEl = document.getElementById('scrambleText');
  const heroStatus = document.getElementById('heroStatus');
  const finalText = scrambleEl?.textContent || '';
  if (scrambleEl) scrambleEl.dataset.finalText = finalText;

  playHeroIntro({ heroTitle, heroMedia, heroSub, scrambleEl, heroStatus, finalText });

  // Mouse-reactive grid background
  const gridBg = document.getElementById('gridBg');
  const heroEl = document.querySelector('.hero');
  if (gridBg && heroEl) {
    const gridLines = 14;
    for (let i = 0; i < gridLines; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', (i / (gridLines - 1)) * 100 + '%');
      line.setAttribute('y1', '0');
      line.setAttribute('x2', (i / (gridLines - 1)) * 100 + '%');
      line.setAttribute('y2', '100%');
      line.setAttribute('stroke', 'var(--ink)');
      line.setAttribute('stroke-opacity', '0.06');
      gridBg.appendChild(line);
    }
    heroEl.addEventListener('mousemove', e => {
      const r = heroEl.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      gsap.to(gridBg, { x: px * -20, duration: 0.6, ease: 'power2.out' });
    });
  }
}

function playHeroIntro({ heroTitle, heroMedia, heroSub, scrambleEl, heroStatus, finalText, delay = 0 }) {
  const timeline = gsap.timeline({ delay });
  if (heroMedia) timeline.to(heroMedia, { opacity: 0.2, scale: 1, duration: 0.9, ease: 'power3.out' });
  if (scrambleEl) {
    timeline.call(() => scrambleIn(scrambleEl, finalText, 0.85), [], '-=0.15');
  }
  if (heroTitle) {
    timeline.to('#heroTitle .hero-line', { y: '0%', opacity: 1, duration: 0.95, stagger: 0.12, ease: 'power4.out' }, '-=0.35');
  }
  if (heroSub) timeline.to(heroSub, { opacity: 0.85, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.35');
  if (heroStatus) timeline.to(heroStatus, { opacity: 0.65, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.3');
  return timeline;
}

export function resetHero(event) {
  const heroTitle = document.getElementById('heroTitle');
  const heroMedia = document.getElementById('heroMedia');
  const heroSub = document.getElementById('heroSub');
  const scrambleEl = document.getElementById('scrambleText');
  const heroStatus = document.getElementById('heroStatus');
  const heroDelay = event.detail?.heroDelay || 0;

  if (scrambleEl) {
    const finalText = scrambleEl.dataset.finalText || scrambleEl.textContent;
    scrambleEl.dataset.finalText = finalText;
    gsap.set(scrambleEl, { opacity: 0 });
    gsap.set('#heroTitle .hero-line', { y: '110%', opacity: 0 });
    gsap.set(heroMedia, { opacity: 0, scale: 1.12 });
    gsap.set([heroSub, heroStatus], { opacity: 0, y: 10 });
    playHeroIntro({ heroTitle, heroMedia, heroSub, scrambleEl, heroStatus, finalText, delay: heroDelay });
  }
}
