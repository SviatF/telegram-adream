(() => {
  const buttons = document.querySelectorAll('[data-telegram-cta]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const placement = button.getAttribute('data-telegram-cta') || 'unknown';

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'telegram_click',
        telegram_placement: placement,
        destination: 'https://t.me/adreamua'
      });
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll(
    '.section-head h2, .locked-copy, .model-card, .inside h2, .why h2, .triple article, .quad article, .footer-content h2, .footer-content p, .footer-btn'
  );

  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach((el) => el.classList.add('will-reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('will-reveal');
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 80px 0px'
    });

    revealTargets.forEach((el) => observer.observe(el));

    // Safety fallback: content must never remain hidden if observer misfires.
    window.setTimeout(() => {
      revealTargets.forEach((el) => {
        el.classList.remove('will-reveal');
        el.classList.add('reveal');
      });
    }, 1400);
  } else {
    revealTargets.forEach((el) => el.classList.add('reveal'));
  }

  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');

  if (hero && heroBg && window.matchMedia('(pointer:fine)').matches && !reduceMotion) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      heroBg.style.transform = `scale(1.015) translate3d(${x * 10}px,${y * 7}px,0)`;
    });

    hero.addEventListener('pointerleave', () => {
      heroBg.style.transform = 'scale(1)';
    });
  }
})();