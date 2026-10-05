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
})();