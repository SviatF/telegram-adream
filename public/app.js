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

  const revealTargets = document.querySelectorAll(
    '.section-head h2, .locked-copy, .model-card, .inside h2, .why h2, .triple article, .quad article, .footer-content h2, .footer-content p, .footer-btn'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    });

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('reveal'));
  }

  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');

  if (hero && heroBg && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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