(() => {
'use strict';
const DATA = window.ONE_SEKAI_DATA;
const ORGS = DATA.organizations;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- filter definitions ---------- */
const has = (...tags) => o => tags.some(t => o.tags.includes(t));
const regions = o => {
  const l = o.location, r = new Set();
  if (/Tokyo|Kanto|Saitama/i.test(l)) r.add('tokyo');
  if (/Kansai|Osaka|Kyoto|Hyogo/i.test(l)) r.add('kansai');
  if (/Japan|Nationwide/i.test(l)) r.add('japan');
  return r;
};
ORGS.forEach(o => { o._regions = regions(o); });

const GROUPS = {
  give: [
    {id: 'time', label: 'Time', test: has('volunteer'),
      hint: ['Join an organizer-led activity', 'Register first. Check the language, insurance and physical demands before you travel.']},
    {id: 'money', label: 'Money', test: has('donate'),
      hint: ['Give through the official donation page', 'Check the recipient’s legal status. Ask for a receipt. Read the tax guide before you assume a deduction.']},
    {id: 'things', label: 'Things', test: has('goods'),
      hint: ['Give only what is requested', 'Follow the current wishlist or food rules. Unrequested items cost the organization storage and disposal work.']},
    {id: 'skills', label: 'Skills', test: has('skills'),
      hint: ['Offer one defined skill', 'Say what you can do, when, and in which language. Reliable delivery matters more than a broad offer.']},
  ],
  lang: [
    {id: 'basic', label: 'Basic — show English info', test: has('english')},
  ],
  where: [
    {id: 'tokyo', label: 'Tokyo area', test: o => o._regions.has('tokyo') || o._regions.has('japan')},
    {id: 'kansai', label: 'Kansai', test: o => o._regions.has('kansai') || o._regions.has('japan')},
    {id: 'japan', label: 'Elsewhere in Japan', test: o => o._regions.has('japan')},
    {id: 'home', label: 'From home', test: has('remote')},
  ],
  cause: [
    {id: 'children', label: 'Children & education', test: has('children', 'education', 'family')},
    {id: 'food', label: 'Food & poverty', test: has('food', 'poverty')},
    {id: 'housing', label: 'Housing', test: has('housing')},
    {id: 'refugees', label: 'Refugees & rights', test: has('refugees', 'human-rights')},
    {id: 'animals', label: 'Animals', test: has('animals')},
    {id: 'environment', label: 'Environment', test: has('environment')},
    {id: 'disaster', label: 'Disaster relief', test: has('disaster')},
    {id: 'disability', label: 'Disability', test: has('disability')},
    {id: 'community', label: 'Local community', test: has('community', 'local')},
  ],
};
const ANY = {give: 'Anything', lang: 'Any level', where: 'Anywhere', cause: 'Any cause'};
const state = {give: '', lang: '', where: '', cause: '', q: '', saved: false};

/* ---------- saved (kept in this browser only) ---------- */
const SAVE_KEY = 'one-sekai-saved';
let saved = new Set();
try { saved = new Set(JSON.parse(localStorage.getItem(SAVE_KEY) || '[]')); } catch {}
const persist = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify([...saved])); } catch {} };
function toggleSaved(id) {
  saved.has(id) ? saved.delete(id) : saved.add(id);
  persist(); paintSaved();
  if (state.saved) renderList();
}
function paintSaved() {
  $('#saved-count').textContent = saved.size;
  $$('.heart').forEach(b => {
    const on = saved.has(b.dataset.id);
    b.classList.toggle('on', on);
    b.textContent = on ? '♥' : '♡';
    b.setAttribute('aria-pressed', String(on));
  });
}

/* ---------- helpers ---------- */
const fmtDate = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
const CHECKED = fmtDate(DATA.verifiedOn);
const iconUrl = o => { try { return new URL('/favicon.ico', o.url).href; } catch { return ''; } };
const logo = o => `<div class="org-logo ${esc(o.color)}"><span>${esc(o.initials)}</span><img src="${esc(iconUrl(o))}" alt="" loading="lazy" onload="this.parentNode.classList.add('loaded')" onerror="this.remove()"></div>`;
const pill = o => o.participation ? `<span class="pill ${esc(o.participation.tone)}">${esc(o.participation.status)}</span>` : '';
const heart = o => `<button type="button" class="heart" data-id="${esc(o.id)}" aria-label="Save ${esc(o.name)}" aria-pressed="false">♡</button>`;

const JA_TERMS = {children:'子ども支援・学習支援',food:'フードバンク・子ども食堂',animals:'動物保護ボランティア',disaster:'災害ボランティア',refugees:'難民支援',environment:'環境ボランティア',community:'地域ボランティア','human-rights':'人権支援',language:'日本語学習支援',skills:'プロボノ募集',disability:'障害者支援ボランティア',housing:'居住支援',poverty:'生活困窮者支援',workcamp:'国際ワークキャンプ',employment:'就労支援'};
const jaTerm = o => JA_TERMS[o.tags.find(t => JA_TERMS[t])] || 'ボランティア募集';

function taxNote(o) {
  if (o.tax) return `<b class="tax-state ${esc(o.tax.status)}">${esc(o.tax.label)}</b>${esc(o.tax.detail)} <a href="${esc(o.tax.sourceUrl)}" target="_blank" rel="noopener">Tax source ↗</a>`;
  if (/Certified NPO/i.test(o.kind)) return 'This organization says it is a Certified NPO. A donation may get Japanese tax treatment. Confirm your specific donation and ask for the official receipt.';
  if (/Public interest/i.test(o.kind)) return 'This organization says it is a public-interest body. Some donations may qualify. Confirm the gift and the documents with them.';
  return 'Tax eligibility is not confirmed here. Ask the organization whether your donation qualifies and which receipt it issues.';
}

/* ---------- finder ---------- */
function renderChips() {
  for (const [group, opts] of Object.entries(GROUPS)) {
    const box = $(`.chips[data-group="${group}"]`);
    box.innerHTML = [{id: '', label: ANY[group]}, ...opts].map(o =>
      `<button type="button" class="chip" data-value="${o.id}" aria-pressed="${state[group] === o.id}">${esc(o.label)}</button>`).join('');
  }
}
function matches(o) {
  for (const group of Object.keys(GROUPS)) {
    const opt = GROUPS[group].find(x => x.id === state[group]);
    if (opt && !opt.test(o)) return false;
  }
  if (state.saved && !saved.has(o.id)) return false;
  const q = state.q.trim().toLowerCase();
  if (!q) return true;
  const text = [o.name, o.kind, o.cause, o.location, o.language, o.commitment, o.summary, o.detail, ...o.tags, ...o.ways].join(' ').toLowerCase();
  return q.split(/\s+/).every(w => text.includes(w));
}
function row(o) {
  return `<article class="org-row">
    ${logo(o)}
    <div class="org-main">
      <p class="org-kind">${esc(o.kind)}</p>
      <h2><a href="#/org/${esc(o.id)}">${esc(o.name)}</a> ${pill(o)}</h2>
      <p class="org-summary">${esc(o.summary)}</p>
      <dl class="org-facts">
        <div><dt>Language</dt><dd>${esc(o.language)}</dd></div>
        <div><dt>Time</dt><dd>${esc(o.commitment)}</dd></div>
        <div><dt>Where</dt><dd>${esc(o.location)}</dd></div>
      </dl>
    </div>
    ${heart(o)}
  </article>`;
}
function renderList() {
  const items = ORGS.filter(matches);
  const filtered = state.saved || state.q || Object.keys(GROUPS).some(g => state[g]);
  $('#org-list').innerHTML = items.length ? items.map(row).join('') :
    (state.saved && !saved.size
      ? '<div class="empty"><b>Nothing saved yet.</b><p>Tap ♡ on an organization to keep it here. Saved items stay in this browser only.</p></div>'
      : '<div class="empty"><b>No match.</b><p>Try fewer filters or a broader word. This list is small on purpose.</p></div>');
  $('#result-count').textContent = state.saved
    ? `${items.length} saved`
    : filtered ? `${items.length} of ${ORGS.length} starting points` : `${ORGS.length} starting points`;
  $('#clear').hidden = !filtered;
  const give = GROUPS.give.find(x => x.id === state.give), hint = $('#hint');
  hint.hidden = !give;
  if (give) hint.innerHTML = `<b>${esc(give.hint[0])}</b><span>${esc(give.hint[1])}</span>`;
  paintSaved();
}

/* ---------- detail ---------- */
const dialog = $('#org-dialog');
function openDetail(o) {
  const p = o.participation;
  const route = p
    ? `<section><h3>How to join now</h3>${pill(o)}<p>${esc(p.note)}</p><ul>${p.requirements.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>`
    : `<section><h3>How to join now</h3><p>Not profiled yet. Open the official page for current openings and steps.</p></section>`;
  const sources = [...(o.sources || [{label: o.sourceLabel || 'Official page', url: o.url}])];
  $('#dialog-content').innerHTML = `
    <div class="dialog-head">${logo(o)}<div>
      <p class="org-kind">${esc(o.kind)} · ${esc(o.cause)}</p>
      <h2 id="dialog-title">${esc(o.name)}</h2>
    </div></div>
    <p class="dialog-summary">${esc(o.detail)}</p>
    <div class="dialog-grid">
      ${route}
      <section><h3>Before you contact them</h3><dl class="fact-list">
        <div><dt>Language</dt><dd>${esc(o.language)}</dd></div>
        <div><dt>Time</dt><dd>${esc(o.commitment)}</dd></div>
        <div><dt>Where</dt><dd>${esc(o.location)}</dd></div>
      </dl></section>
      <section><h3>Ways to take part</h3><div class="ways">${o.ways.map(x => `<span>${esc(x)}</span>`).join('')}</div>
        <button type="button" class="copy-term" data-copy="${esc(jaTerm(o))}"><span lang="ja">${esc(jaTerm(o))}</span><small>Copy this Japanese search phrase</small></button></section>
      <section><h3>Donations and tax</h3><p>${taxNote(o)}</p></section>
    </div>
    <p class="dialog-sources"><b>Checked ${fmtDate(o.checked || DATA.verifiedOn)} against</b> ${sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}</p>
    <p class="dialog-trust">One Sekai is a guide, not the organizer. Details change. Confirm openings, eligibility and costs with the organization before you act.</p>
    <div class="dialog-actions">
      <a class="primary" href="${esc(o.volunteerUrl || o.url)}" target="_blank" rel="noopener">${o.volunteerUrl ? 'Open participation page' : 'Open official page'} ↗</a>
      ${o.donateUrl ? `<a href="${esc(o.donateUrl)}" target="_blank" rel="noopener">Donation page ↗</a>` : ''}
      ${o.goodsUrl ? `<a href="${esc(o.goodsUrl)}" target="_blank" rel="noopener">Goods guidance ↗</a>` : ''}
      <button type="button" class="copy-link">Copy link</button>
      ${heart(o)}
    </div>`;
  paintSaved();
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}
async function copy(text, label, done) {
  try { await navigator.clipboard.writeText(text); label.textContent = done; }
  catch { label.textContent = 'Copy failed. Select the text instead.'; }
}
dialog.addEventListener('click', e => {
  if (e.target === dialog || e.target.closest('.dialog-close')) return dialog.close();
  const term = e.target.closest('.copy-term');
  if (term) return copy(term.dataset.copy, $('small', term), 'Copied');
  const link = e.target.closest('.copy-link');
  if (link) return copy(location.href, link, 'Link copied');
});
dialog.addEventListener('close', () => { if (location.hash.startsWith('#/org/')) location.hash = findHash(); });

/* ---------- routing: the address always reflects the view and filters ---------- */
function findHash() {
  const p = new URLSearchParams();
  for (const k of ['give', 'lang', 'where', 'cause', 'q']) if (state[k]) p.set(k, state[k]);
  if (state.saved) p.set('saved', '1');
  const s = p.toString();
  return '#/find' + (s ? '?' + s : '');
}
function show(view) {
  $$('.view').forEach(v => { v.hidden = v.id !== 'view-' + view; });
  const nav = view === 'find' && state.saved ? 'saved' : view;
  $$('[data-nav]').forEach(a => a.toggleAttribute('aria-current', a.dataset.nav === nav));
}
function route() {
  const [path, query = ''] = location.hash.replace(/^#\/?/, '').split('?');
  const [view, id] = path.split('/');
  if (view === 'org') {
    const o = ORGS.find(x => x.id === id);
    if (!o) { location.replace('#/find'); return; }
    if ($('#view-find').hidden) show('find');
    openDetail(o);
    return;
  }
  if (dialog.open) dialog.close();
  if (view === 'guides' || view === 'about') { show(view); scrollTo(0, 0); return; }
  const p = new URLSearchParams(query);
  for (const g of Object.keys(GROUPS)) {
    const v = p.get(g) || '';
    state[g] = GROUPS[g].some(x => x.id === v) ? v : '';
  }
  state.q = p.get('q') || '';
  state.saved = p.get('saved') === '1';
  $('#q').value = state.q;
  renderChips(); renderList(); show('find');
}
const setFind = () => { history.replaceState(null, '', findHash()); renderList(); show('find'); };

$('#finder').addEventListener('click', e => {
  const chip = e.target.closest('.chip'); if (!chip) return;
  state[chip.parentNode.dataset.group] = chip.dataset.value;
  renderChips(); setFind();
});
$('#finder').addEventListener('submit', e => e.preventDefault());
$('#q').addEventListener('input', e => { state.q = e.target.value; setFind(); });
$('#clear').addEventListener('click', () => {
  Object.assign(state, {give: '', lang: '', where: '', cause: '', q: '', saved: false});
  $('#q').value = ''; renderChips(); setFind();
});
document.addEventListener('click', e => {
  const h = e.target.closest('.heart');
  if (h) { e.preventDefault(); toggleSaved(h.dataset.id); }
});

/* ---------- static parts ---------- */
$('#guide-grid').innerHTML = DATA.guides.map(g =>
  `<article><span class="kicker">${esc(g.type.split(' · ')[0])}</span><h2>${esc(g.title)}</h2><p>${esc(g.text)}</p></article>`).join('');
$$('[data-checked]').forEach(el => { el.textContent = CHECKED; });
const profiled = ORGS.filter(o => o.participation).length;
$('#about-status').innerHTML = `<b>Where the list stands</b><p>${ORGS.length} organizations. ${profiled} have a full profile with joining steps and sources. The rest link to the official page. Each entry shows the date it was checked.</p>`;
if (DATA.contactUrl) { $('#corrections').hidden = false; $('#contact-link').href = DATA.contactUrl; }

addEventListener('hashchange', route);
renderChips(); renderList(); route();
})();
