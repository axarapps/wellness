const BASE = document.currentScript.src.replace(/support\.js.*$/, '');
const WALLET = '8x1G15KgVzHdTeVhULGPThfVfP68FeLiuTEy4AFmJRrT';
const $ = (id) => document.getElementById(id);
const ICON = { chev: '<svg class="chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>' };
function toast(t) { const el = $('toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => el.classList.remove('show'), 1800); }
const TOKENS = {
  sol: { coin: 'S', name: 'Solana', ticker: 'SOL', network: 'Solana', min: '0.001 SOL', qr: BASE + 'icons/qr-sol.png', note: 'SOL addresses are case sensitive.' },
  usdc: { coin: '$', name: 'USD Coin', ticker: 'USDC', network: 'Solana', min: '0.001 USDC', qr: BASE + 'icons/qr-usdc.png', note: 'Send USDC on the Solana network. Case sensitive.' },
};
function supportHtml() {
  const tab = (id) => `<button type="button" class="tab" data-token="${id}" role="tab"><i class="coin ${id}">${TOKENS[id].coin}</i>${TOKENS[id].ticker}</button>`;
  const hl = (t) => `<b>${t}</b>`;
  return `<div class="support" id="support">
    <button type="button" class="head" aria-expanded="false"><span class="heart"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 2.7 4.5 6.3 4.5c2 0 3.7 1.1 4.6 2.7h2.2c.9-1.6 2.6-2.7 4.6-2.7 3.6 0 5.4 3.7 3.9 7.2C19.5 16.4 12 21 12 21z"/></svg></span>
      <span class="t"><b>Support our work</b><span>Free, no ads. A tip keeps it running.</span></span>${ICON.chev}</button>
    <div class="body"><div class="dep">
      <div class="tabs" role="tablist">${tab('sol')}${tab('usdc')}</div>
      <div class="dcard">
        <div class="qrbox"><img id="dep-qr" src="${BASE}icons/qr-sol.png" alt="QR code of the wallet address" width="132" height="132"></div>
        <div class="k">Wallet address</div>
        <div class="addrrow">
          <div class="addr3" title="${WALLET}"><span><i>${WALLET.slice(0, 6)}</i>${WALLET.slice(6, 22)}</span><span>${WALLET.slice(22, -6)}<i>${WALLET.slice(-6)}</i></span></div>
          <button type="button" class="cbtn" aria-label="Copy address"><svg class="i-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg><svg class="i-ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></button>
        </div>
        <p class="redn" id="dep-note"></p>
        <hr>
        <div class="grid2">
          <div><span class="k">Token</span><span class="v" id="dep-token"></span></div>
          <div><span class="k">Minimum</span><span class="v" id="dep-min"></span></div>
        </div>
        <p class="fine">Same address for SOL and USDC, on the Solana network. Double-check every character: crypto transfers cannot be reversed.</p>
      </div>
    </div></div></div>`;
}
function wireSupport() {
  const root = $('support');
  root.querySelector('.head').addEventListener('click', (e) => { const o = root.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', String(o)); });
  const pick = (id) => {
    const t = TOKENS[id];
    root.querySelectorAll('.tab').forEach((b) => { const on = b.dataset.token === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', String(on)); });
    $('dep-qr').src = t.qr;
    $('dep-note').textContent = t.note;
    $('dep-token').textContent = t.name + ' (' + t.ticker + ')';
    $('dep-min').textContent = '>' + t.min;
  };
  root.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => pick(b.dataset.token)));
  pick('sol');
  const copy = root.querySelector('.cbtn');
  copy.addEventListener('click', () => {
    const done = () => {
      toast('Address copied');
      copy.classList.add('ok');
      setTimeout(() => copy.classList.remove('ok'), 1800);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(WALLET).then(done, done); else done();
  });
}


const host = $('support-host');
if (host) { host.innerHTML = supportHtml(); wireSupport(); }
