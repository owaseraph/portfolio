// gallery.js — the infinite marquee ticker, the masked h2 line reveals,
// and the pinned horizontal-scroll project gallery.

export function initMarquee() {
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (!marqueeTrack) return;

  let marqueeTween;
  let speedReset;

  function buildMarquee() {
    marqueeTween?.kill();
    gsap.set(marqueeTrack, { x: 0 });
    const firstGroup = marqueeTrack.querySelector('.marquee-group');
    if (!firstGroup) return;

    marqueeTrack.querySelectorAll('.marquee-group.is-clone').forEach(group => group.remove());
    while (marqueeTrack.scrollWidth < window.innerWidth + firstGroup.offsetWidth) {
      const clone = firstGroup.cloneNode(true);
      clone.classList.add('is-clone');
      clone.setAttribute('aria-hidden', 'true');
      marqueeTrack.appendChild(clone);
    }

    marqueeTween = gsap.to(marqueeTrack, {
      x: () => -firstGroup.offsetWidth,
      duration: 14,
      ease: 'none',
      repeat: -1,
    });
  }

  buildMarquee();

  ScrollTrigger.create({
    onUpdate: self => {
      const speed = Math.min(Math.abs(self.getVelocity()) / 1200, 1.5);
      gsap.to(marqueeTween, { timeScale: 1 + speed, duration: 0.2, overwrite: true });
      speedReset?.kill();
      speedReset = gsap.delayedCall(0.35, () => {
        gsap.to(marqueeTween, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
      });
    },
  });

  window.addEventListener('resize', buildMarquee);

  window.addEventListener('portfolio:reset', () => {
    speedReset?.kill();
    gsap.to(marqueeTween, { timeScale: 1, duration: 0.5, ease: 'power2.out' });
  });
}

export function initRevealText() {
  gsap.utils.toArray('.reveal-inner').forEach(el => {
    gsap.to(el, { y: '0%', duration: 0.9, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  gsap.utils.toArray('#work p.lead').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 14 }, {
      opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

export function initPinnedGallery() {
  const track = document.getElementById('track');
  const pinSection = document.getElementById('pinSection');
  if (!track || !pinSection) return;
  const originalCards = [...track.querySelectorAll('.panel')];
  if (originalCards.length < 2) return;

  const total = originalCards.length;
  const pinCurrent = document.getElementById('pinCurrent');
  const pinTotal = document.getElementById('pinTotal');
  const carouselHint = document.getElementById('carouselHint');
  const cloneCards = [
    ...originalCards.map(card => card.cloneNode(true)),
    ...originalCards,
    ...originalCards.map(card => card.cloneNode(true)),
  ];
  track.replaceChildren(...cloneCards);

  let index = total;
  let reelWidth = window.innerWidth;
  let isAnimating = false;
  let counterDirection = 1;
  let displayedCurrent = '01';
  let initialReveal;

  if (pinTotal) pinTotal.textContent = String(total).padStart(2, '0');

  function updateCards() {
    track.querySelectorAll('.panel').forEach((card, cardIndex) => {
      const distance = Math.abs(cardIndex - index);
      const isActive = distance === 0;
      gsap.set(card, {
        opacity: isActive ? 1 : 0.98,
      });
      card.classList.toggle('is-active', isActive);
    });
    if (pinCurrent) {
      const nextCurrent = String(((index - total) % total + total) % total + 1).padStart(2, '0');
      if (nextCurrent !== displayedCurrent) {
        displayedCurrent = nextCurrent;
        pinCurrent.textContent = nextCurrent;
        gsap.fromTo(pinCurrent, { y: counterDirection > 0 ? '100%' : '-100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.35, ease: 'power3.out' });
      }
    }
  }

  function prepareCard(card, direction) {
    if (!card) return;
    const image = card.querySelector('img');
    const content = card.querySelectorAll('.p-num, .p-meta, h3, p, .p-action');
    gsap.killTweensOf([image, ...content]);
    gsap.set(image, { opacity: 0.45, scale: 1.1 });
    gsap.set(content, { opacity: 0.2, x: direction * 36, y: 10 });
  }

  function settleActiveCard() {
    const activeCard = track.querySelector('.panel.is-active');
    if (!activeCard) return;
    const image = activeCard.querySelector('img');
    const content = activeCard.querySelectorAll('.p-num, .p-meta, h3, p, .p-action');
    gsap.to(image, {
      opacity: 1,
      scale: 1.04,
      duration: 1,
      ease: 'power3.out',
      onComplete: () => gsap.to(image, { scale: 1.08, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' }),
    });
    gsap.to(content, { opacity: 1, x: 0, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.04, delay: 0.08 });
  }

  function positionCarousel(nextIndex, animate = true, direction = 1) {
    index = nextIndex;
    counterDirection = direction;
    if (animate) prepareCard(track.children[index], direction);
    const offset = -(index * reelWidth);
    gsap.to(track, {
      x: offset,
      duration: animate ? 0.82 : 0,
      ease: 'power4.inOut',
      overwrite: true,
      onStart: () => { isAnimating = animate; },
      onUpdate: updateCards,
      onComplete: () => {
        if (index >= total * 2) {
          prepareCard(track.children[index - total], counterDirection);
          positionCarousel(index - total, false);
        } else if (index < total) {
          prepareCard(track.children[index + total], counterDirection);
          positionCarousel(index + total, false);
        } else {
          isAnimating = false;
          settleActiveCard();
        }
      },
    });
    updateCards();
  }

  function measure() {
    reelWidth = pinSection.clientWidth;
    track.querySelectorAll('.panel').forEach(card => {
      card.style.flexBasis = `${reelWidth}px`;
      card.style.width = `${reelWidth}px`;
    });
    gsap.set(track, { x: -(index * reelWidth) });
    updateCards();
  }

  function move(direction) {
    if (isAnimating) return;
    initialReveal?.kill();
    positionCarousel(index + direction, true, direction);
  }

  const cursor = document.getElementById('cursor');
  function setCursorLabel(label) {
    if (!cursor) return;
    cursor.dataset.label = label;
    cursor.classList.toggle('has-label', Boolean(label));
  }

  if (carouselHint) {
    gsap.to(carouselHint, {
      opacity: 0.8,
      letterSpacing: '0.2em',
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  let pointerStartX = 0;
  pinSection.addEventListener('pointermove', event => {
    setCursorLabel(event.target.closest('.panel') ? '' : 'DRAG');
  });
  pinSection.addEventListener('pointerleave', () => setCursorLabel(''));
  pinSection.addEventListener('pointerdown', event => {
    pointerStartX = event.clientX;
  });
  pinSection.addEventListener('pointerup', event => {
    const distance = event.clientX - pointerStartX;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
  });
  pinSection.addEventListener('wheel', event => {
    if (Math.abs(event.deltaX) + Math.abs(event.deltaY) < 12) return;
    event.preventDefault();
    move((event.deltaX || event.deltaY) > 0 ? 1 : -1);
  }, { passive: false });
  pinSection.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  });

  gsap.fromTo(pinSection, { opacity: 0, y: 36, scale: 0.985 }, {
    opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: pinSection, start: 'top 88%', once: true },
  });
  prepareCard(track.children[index], 1);
  measure();
  initialReveal = gsap.delayedCall(0.82, settleActiveCard);
  window.addEventListener('resize', measure);
  window.addEventListener('portfolio:reset', () => {
    gsap.set('.reveal-inner', { y: '105%' });
    gsap.set('#work p.lead', { opacity: 0, y: 14 });
    isAnimating = false;
    positionCarousel(total, false);
  });
}
