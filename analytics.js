/* Production analytics; no website consent UI. */
(() => {
  'use strict';
  const ID = 'G-K9PDC74QVJ';
  const production = location.protocol === 'https:' && location.hostname === 'lfsadigital.com';
  const pages = new Set(['/', '/index.html', '/ai-employees', '/ai-employees.html',
    '/work/', '/world/', '/report.html', '/privacy.html', '/terms.html', '/sms.html']);
  let active = false;
  let loaded = false;

  const ga = function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  };
  const safeLocation = () => 'https://lfsadigital.com' +
    (pages.has(location.pathname) ? location.pathname : '/');
  const safeReferrer = () => {
    try { return new URL(document.referrer).origin + '/'; } catch (_) { return ''; }
  };
  const start = () => {
    if (!production || active) return;
    active = true;
    window['ga-disable-' + ID] = false;
    if (!loaded) {
      ga('consent', 'default', {analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied'});
      ga('consent', 'update', {analytics_storage: 'granted'});
      ga('js', new Date());
      ga('config', ID, {send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false, page_location: safeLocation(),
        page_referrer: safeReferrer(), page_title: 'LFSA Digital'});
      loaded = true;
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
      document.head.appendChild(script);
      ga('event', 'page_view', {page_location: safeLocation(),
        page_referrer: safeReferrer(), page_title: 'LFSA Digital'});
    } else {
      ga('consent', 'update', {analytics_storage: 'granted'});
    }
  };
  document.addEventListener('click', event => {
    if (!active) return;
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    let url;
    try { url = new URL(link.href, location.href); } catch (_) { return; }
    const method = url.protocol === 'mailto:' ? 'email' :
      url.protocol === 'https:' && url.hostname === 'wa.me' ? 'whatsapp' :
      url.protocol === 'https:' && url.hostname === 'cal.com' ? 'booking' : null;
    if (!method) return;
    // Never include href, link text, user input or a claimed lead/revenue value.
    ga('event', 'contact_intent', {contact_method: method,
      page_location: safeLocation(), page_referrer: safeReferrer(), page_title: 'LFSA Digital'});
  });
  start();
})();
