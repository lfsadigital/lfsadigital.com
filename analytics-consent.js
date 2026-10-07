(() => {
  'use strict';
  const analytics = window.lfsaAnalytics;
  if (!analytics) return;
  const container = document.createElement('div');
  container.className = 'lfsa-consent';
  container.innerHTML = `
    <button type="button" class="lfsa-consent-preferences" aria-expanded="false" aria-controls="lfsa-consent-panel">Analytics preferences</button>
    <section id="lfsa-consent-panel" class="lfsa-consent-panel" aria-labelledby="lfsa-consent-heading" hidden>
      <h2 id="lfsa-consent-heading">Optional analytics</h2>
      <p>Allow Google Analytics to measure visits and contact clicks? <a href="/privacy.html">Privacy</a></p>
      <p class="lfsa-consent-status" aria-live="polite"></p>
      <div class="lfsa-consent-actions">
        <button type="button" data-choice="reject">Reject analytics</button>
        <button type="button" data-choice="accept">Accept analytics</button>
        <button type="button" data-choice="close">Close</button>
      </div>
    </section>`;
  document.body.appendChild(container);
  const trigger = container.querySelector('.lfsa-consent-preferences');
  const panel = container.querySelector('.lfsa-consent-panel');
  const status = container.querySelector('.lfsa-consent-status');
  const first = container.querySelector('[data-choice="reject"]');
  const show = focus => {
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    status.textContent = analytics.preference() === 'accepted' ?
      'Analytics is accepted. Reject analytics to withdraw your choice.' :
      '';
    if (focus) first.focus();
  };
  const hide = focus => {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (focus) trigger.focus();
  };
  trigger.addEventListener('click', () => panel.hidden ? show(true) : hide(true));
  container.addEventListener('click', event => {
    const button = event.target.closest('[data-choice]');
    if (!button) return;
    const choice = button.dataset.choice;
    const wasAccepted = analytics.preference() === 'accepted';
    if (choice === 'accept') analytics.accept();
    if (choice === 'reject') analytics.reject();
    hide(true);
    // Stop the loaded Google runtime completely after withdrawing acceptance.
    if (choice === 'reject' && wasAccepted) location.reload();
  });
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); hide(true); }
  });
  if (analytics.preference() === 'unset') show(false);
})();
