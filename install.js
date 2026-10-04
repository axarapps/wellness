(function () {
  var base = document.currentScript.src.replace(/install\.js.*$/, '');
  if ('serviceWorker' in navigator) navigator.serviceWorker.register(base + 'sw.js').catch(function () {});
  var box = document.getElementById('install'), text = document.getElementById('install-text'), go = document.getElementById('install-go');
  if (!box) return;
  var standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var snoozed = false;
  try { snoozed = Date.now() < parseInt(localStorage.getItem('wg.installSnooze') || '0', 10); } catch (e) {}
  var deferred = null;
  function show(mode) {
    if (standalone || snoozed) return;
    if (mode === 'ios') {
      box.classList.add('ios');
      text.innerHTML = '<b>Install Wellness Guides</b><span>Tap Share, then <b class="inl">Add to Home Screen</b>.</span>';
      go.style.display = 'none';
    } else {
      text.innerHTML = '<b>Install Wellness Guides</b><span>Open it from your home screen, even offline.</span>';
    }
    box.classList.add('show');
  }
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; setTimeout(function () { show('android'); }, 8000); });
  if (ios && !standalone) setTimeout(function () { show('ios'); }, 8000);
  go.addEventListener('click', function () {
    box.classList.remove('show');
    if (!deferred) return;
    deferred.prompt();
    deferred.userChoice.catch(function () {}).then(function () { deferred = null; });
  });
  document.getElementById('install-later').addEventListener('click', function () {
    box.classList.remove('show');
    try { localStorage.setItem('wg.installSnooze', String(Date.now() + 5 * 86400000)); } catch (e) {}
  });
  window.addEventListener('appinstalled', function () { box.classList.remove('show'); });
})();
