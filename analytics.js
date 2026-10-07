/* Optional production analytics. Review enhanced measurement before deployment. */
(() => {
  'use strict';
  const ID = 'G-K9PDC74QVJ';
  const KEY = 'lfsa.analytics.preference.v1';
  const production = location.protocol === 'https:' && location.hostname === 'lfsadigital.com';
  const pages = new Set(['/', '/index.html', '/ai-employees', '/ai-employees.html',
    '/work/', '/world/', '/report.html', '/privacy.html', '/terms.html', '/sms.html']);
  let active = false;
  let loaded = false;
  let preference = 'unset';
  try { preference = localStorage.getItem(KEY) || 'unset'; } catch (_) {}

  const ga = function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  };
  const safeLocation = () => 'https://lfsadigital.com' +
    (pages.has(location.pathname) ? location.pathname : '/');
  const safeReferrer = () => {
    try { return new URL(document.referrer).origin + '/'; } catch (_) { return ''; }
  };
  const remember = value => {
    preference = value;
    try { localStorage.setItem(KEY, value); } catch (_) {}
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
  const stop = () => {
    active = false;
    window['ga-disable-' + ID] = true;
    if (loaded) ga('consent', 'update', {analytics_storage: 'denied'});
    // Clear GA cookies visible to this origin; browser validation still required.
    for (const part of document.cookie.split(';')) {
      const name = part.split('=')[0].trim();
      if (name !== '_ga' && !name.startsWith('_ga_')) continue;
      for (const domain of ['', '; domain=lfsadigital.com', '; domain=.lfsadigital.com']) {
        document.cookie = name + '=; Max-Age=0; path=/' + domain + '; Secure; SameSite=Lax';
      }
    }
  };
  window.lfsaAnalytics = Object.freeze({
    preference: () => preference,
    accept: () => { remember('accepted'); start(); },
    reject: () => { remember('rejected'); stop(); },
    withdraw: () => { remember('rejected'); stop(); }
  });
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
  window.addEventListener('storage', event => {
    if (event.key !== KEY && event.key !== null) return;
    preference = event.newValue === 'accepted' ? 'accepted' : 'rejected';
    if (preference === 'accepted') start();
    else {
      stop();
      // End the already loaded runtime in other tabs after withdrawal.
      if (loaded) location.reload();
    }
  });
  if (preference === 'accepted') start();
})();
