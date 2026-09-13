// theme.js — dark mode toggle + keeps the scroll-driven background
// shift in sync with whichever theme (light/dark) is currently active.

export function initTheme() {
  document.documentElement.classList.add('dark');

  const themeVarNames = { paper: '--paper', dim: '--paper-dim' };

  function currentThemeColor(key) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(themeVarNames[key])
      .trim();
  }

  function syncBackgroundToActiveSection() {
    const activeSection = [...document.querySelectorAll('[data-theme]')]
      .reverse()
      .find(sec => sec.getBoundingClientRect().top <= window.innerHeight * 0.6);
    if (activeSection) {
      gsap.to('body', {
        backgroundColor: currentThemeColor(activeSection.dataset.theme),
        duration: 0.5,
      });
    }
  }

  document.querySelectorAll('[data-theme]').forEach(sec => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => gsap.to('body', { backgroundColor: currentThemeColor(sec.dataset.theme), duration: 0.8 }),
      onEnterBack: () => gsap.to('body', { backgroundColor: currentThemeColor(sec.dataset.theme), duration: 0.8 }),
    });
  });
}
