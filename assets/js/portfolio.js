/* ============================================================
   PORTFOLIO RENDERER
   Reads window.PORTFOLIO (+ extra-data.js) and builds the page.
   ============================================================ */
(function () {
  'use strict';
  var D = window.PORTFOLIO;
  if (!D) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var tags = function (a) { return a && a.length ? '<div class="tags">' + a.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' : ''; };
  var fmt = function (t) { return Math.floor(t / 60) + ':' + ('0' + Math.floor(t % 60)).slice(-2); };
  var ICON = {
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    l: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    r: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    p: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    a: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ---------- links, copy ---------- */
  $$('[data-link]').forEach(function (a) { a.href = D.links[a.dataset.link] || '#'; });
  var mail = 'mailto:' + D.email;
  $('#mail').href = mail; $('#mail2').href = mail; $('#mail2').textContent = D.email;
  $('#hero-value').textContent = D.value;
  $('#year').textContent = new Date().getFullYear();
  $('#about-text').innerHTML = D.about.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');

  /* avatar: show initials if photo is missing */
  var av = $('#avatar'), img = av && $('img', av);
  if (img) { img.addEventListener('error', function () { av.classList.add('nophoto'); }); if (img.complete && !img.naturalWidth) av.classList.add('nophoto'); }

  function card(inner, cls) { return '<article class="card reveal ' + (cls || '') + '">' + inner + '</article>'; }

  $('#leadership').innerHTML = D.leadership.map(function (l) {
    return card('<p class="card__org">' + esc(l.org) + '</p><h3>' + esc(l.title) + '</h3><p>' + esc(l.text) + '</p>');
  }).join('');

  $('#cap-grid').innerHTML = D.capabilities.map(function (c) {
    return card('<div class="ico">' + esc(c.icon) + '</div><h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + '</p>' + tags(c.tags));
  }).join('');

  $('#skills-grid').innerHTML = D.skills.map(function (g) {
    return card('<div class="skill-g"><h3>' + esc(g.group) + '</h3>' + tags(g.items) + '</div>');
  }).join('');

  /* ======================================================
     MODAL (shared by project details + Albion case study)
     ====================================================== */
  var md = document.createElement('div');
  md.className = 'md'; md.setAttribute('role', 'dialog'); md.setAttribute('aria-modal', 'true'); md.setAttribute('aria-hidden', 'true');
  md.innerHTML = '<div class="md__box" tabindex="-1"><button class="md__x" type="button" aria-label="Close details">' + ICON.x + '</button><div class="md__body"></div></div>';
  document.body.appendChild(md);
  var mdBox = $('.md__box', md), mdBody = $('.md__body', md), lastFocus = null;

  function openModal(html, label) {
    lastFocus = document.activeElement;
    mdBody.innerHTML = html;
    md.setAttribute('aria-label', label || 'Details');
    md.setAttribute('aria-hidden', 'false');
    md.classList.add('open'); document.documentElement.classList.add('md-open');
    mdBox.scrollTop = 0;
    $('.md__x', md).focus({ preventScroll: true });
  }
  function closeModal() {
    if (!md.classList.contains('open')) return;
    $$('video', md).forEach(function (v) { v.pause(); });
    md.classList.remove('open'); md.setAttribute('aria-hidden', 'true'); document.documentElement.classList.remove('md-open');
    setTimeout(function () { if (!md.classList.contains('open')) mdBody.innerHTML = ''; }, 300);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  md.addEventListener('click', function (e) { if (e.target === md || e.target.closest('.md__x')) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (!md.classList.contains('open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {            /* keep focus inside the popup */
      var f = $$('a[href],button:not([disabled]),video[controls],[tabindex="0"]', md).filter(function (n) { return n.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === mdBox)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ======================================================
     ALBION CASE STUDY (spotlight at the top of Projects)
     ====================================================== */
  var S = D.spotlight, spotVideo = null;
  function renderSpotlight() {
    var el = $('#spotlight'); if (!S || !el) return;
    el.innerHTML =
      '<article class="spot reveal" id="albion" aria-labelledby="albion-h">' +
        '<div class="spot__media">' +
          '<div class="spot__player"><span class="spot__tag"><i></i>DEMO · ' + fmt(78) + '</span>' +
            '<video controls playsinline preload="metadata" poster="' + esc(S.video.poster) + '" aria-label="' + esc(S.video.label) + '"><source src="' + esc(S.video.src) + '" type="video/mp4"></video></div>' +
          '<div class="chaps" role="group" aria-label="Jump to a chapter of the demo">' +
            S.chapters.map(function (c, i) { return '<button type="button" class="chap" data-t="' + c.t + '" data-i="' + i + '"><i>' + (i === 0 ? '▶' : i) + '</i>' + esc(c.title) + '</button>'; }).join('') +
          '</div>' +
          '<p class="chap__now" aria-live="polite"><b>CHAPTER</b><span></span></p>' +
        '</div>' +
        '<div class="spot__info">' +
          '<p class="kicker">' + esc(S.kicker) + '</p>' +
          '<h3 id="albion-h">' + esc(S.title) + '</h3>' +
          '<p class="spot__tl">' + esc(S.tagline) + '</p>' +
          '<p class="spot__sum">' + esc(S.summary) + '</p>' +
          '<p class="spot__by">' + esc(S.byline.replace('Ajanta Luhana', '')) + '<b>Ajanta Luhana</b></p>' +
          '<div class="mets">' + S.metrics.map(function (m) { return '<div class="met"><b data-n="' + m.n + '" data-s="' + esc(m.s) + '">0' + esc(m.s) + '</b><span>' + esc(m.l) + '</span></div>'; }).join('') + '</div>' +
          tags(S.chips) +
          '<div class="spot__btns"><button type="button" class="btn" id="albion-case">Read the case study ' + ICON.a.replace('<svg ', '<svg width="16" height="16" ') + '</button>' +
          '<button type="button" class="btn btn--ghost" id="albion-play">▶ Play full demo</button></div>' +
          '<p class="fine">Concept demo — all people, clients and figures are invented sample data.</p>' +
        '</div>' +
      '</article>';

    spotVideo = $('video', el);
    var btns = $$('.chap', el), now = $('.chap__now span', el), nowB = $('.chap__now b', el), cur = -1;
    function mark(i) {
      if (i === cur) return; cur = i;
      btns.forEach(function (b, j) { b.classList.toggle('on', j === i); });
      var c = S.chapters[i]; nowB.textContent = i === 0 ? 'OVERVIEW' : 'SCENE ' + i + ' / ' + (S.chapters.length - 1) + ' · ' + c.title.toUpperCase();
      now.textContent = c.text;
      var on = btns[i]; if (on && on.parentNode.scrollWidth > on.parentNode.clientWidth) on.parentNode.scrollTo({ left: on.offsetLeft - 12, behavior: reduce ? 'auto' : 'smooth' });
    }
    mark(0);
    function at(t) { for (var i = S.chapters.length - 1; i >= 0; i--) if (t >= S.chapters[i].t) return i; return 0; }
    spotVideo.addEventListener('timeupdate', function () { mark(at(spotVideo.currentTime)); });
    spotVideo.addEventListener('seeked', function () { mark(at(spotVideo.currentTime)); });
    btns.forEach(function (b) {
      b.addEventListener('click', function () { seekPlay(+b.dataset.t); });
    });
    $('#albion-play', el).addEventListener('click', function () { seekPlay(0, true); });
    $('#albion-case', el).addEventListener('click', openCase);
  }
  function seekPlay(t, scroll) {
    if (!spotVideo) return;
    var v = spotVideo;
    function go() { try { v.currentTime = t; } catch (e) {} var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    if (v.readyState >= 1) go(); else { v.addEventListener('loadedmetadata', go, { once: true }); v.load(); }
    if (scroll) spotVideo.closest('.spot__player').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }

  function openCase() {
    var h =
      '<div class="md__media"><img src="' + esc(S.video.poster) + '" alt="Albion Workforce command centre and AI agent illustration" loading="lazy"></div>' +
      '<div class="md__in">' +
        '<div class="md__head"><p class="kicker">' + esc(S.kicker) + '</p><h3>' + esc(S.title) + '</h3><p class="md__tl">' + esc(S.tagline) + '</p></div>' +
        '<div class="md__main">' +
          '<div class="md__sec"><h4>Overview</h4><p>' + esc(S.summary) + '</p></div>' +
          '<div class="md__sec"><h4>Design principles</h4><div class="pr3">' + S.principles.map(function (p) { return '<div><i>' + p.k + '</i><b>' + esc(p.h) + '</b><p>' + esc(p.p) + '</p></div>'; }).join('') + '</div></div>' +
          '<div class="md__sec"><h4>Autonomy dial</h4><p>Every agent has its own level of freedom, so the team decides how much to delegate.</p><div class="dial" aria-label="Autonomy levels"><span>Suggest</span><span class="on">Ask first</span><span>Autonomous</span></div></div>' +
        '</div>' +
        '<aside class="md__side">' +
          '<div class="md__sec"><h4>At a glance</h4><dl class="facts">' +
            '<div><dt>Role</dt><dd>' + esc(S.byline) + '</dd></div>' +
            '<div><dt>Domain</dt><dd>HR tech · UK payroll · Sales</dd></div>' +
            '<div><dt>Agents</dt><dd>12 supervised AI agents</dd></div>' +
            '<div><dt>Compliance</dt><dd>UK GDPR audit trail · human sign-off on every financial step</dd></div>' +
          '</dl></div>' +
          '<div class="md__sec"><h4>Integrations shown</h4><ul class="hl">' + S.integrations.map(function (i) { return '<li><b>' + esc(i.h) + '</b> — ' + esc(i.p) + '</li>'; }).join('') + '</ul></div>' +
        '</aside>' +
        '<div class="md__full md__sec"><h4>What the platform covers</h4><div class="mods">' + S.modules.map(function (m) { return '<div><b>' + esc(m.h) + '</b><p>' + esc(m.p) + '</p></div>'; }).join('') + '</div></div>' +
        '<div class="md__full md__sec"><h4>The agents on shift</h4>' + tags(S.agents.map(function (a) { return a + ' Agent'; })) + '</div>' +
        '<div class="md__full md__sec"><h4>Jump into the demo</h4><div class="chlist">' + S.chapters.map(function (c) { return '<button type="button" data-t="' + c.t + '"><time>' + fmt(c.t) + '</time><span><b>' + esc(c.title) + '</b><br>' + esc(c.text) + '</span></button>'; }).join('') + '</div></div>' +
        '<p class="md__note">' + esc(S.disclaimer) + '</p>' +
      '</div>';
    openModal(h, S.title + ' case study');
    $$('.chlist button', md).forEach(function (b) { b.addEventListener('click', function () { var t = +b.dataset.t; closeModal(); setTimeout(function () { seekPlay(t, true); }, 120); }); });
  }

  /* ======================================================
     PROJECTS
     ====================================================== */
  var short = function (t) { return String(t).split(/\s+[—–]\s+/)[0]; };
  var droneSvg = '<svg viewBox="0 0 200 140" fill="none" stroke="#9fd8ff" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><circle cx="40" cy="30" r="20"/><circle cx="160" cy="30" r="20"/><circle cx="40" cy="110" r="20"/><circle cx="160" cy="110" r="20"/><path d="M55 44L85 66M145 44L115 66M55 96L85 74M145 96L115 74"/><rect x="82" y="58" width="36" height="24" rx="6" fill="rgba(122,92,255,.3)"/></svg>';
  var gridProjects = D.projects.filter(function (p) { return !p.spotlight; });
  var cats = ['All'];
  gridProjects.forEach(function (p) { if (cats.indexOf(p.category) < 0) cats.push(p.category); });
  var grid = $('#proj-grid'), filt = $('#filters'), cur = 'All';

  function renderProjects() {
    var list = gridProjects.filter(function (p) { return cur === 'All' || p.category === cur; });
    grid.innerHTML = list.map(function (p) {
      var idx = D.projects.indexOf(p);
      var hasDetail = !!(D.projectDetails && D.projectDetails[short(p.title)]);
      var links = (p.links || []).map(function (l) { return '<a class="lnk" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' →</a>'; }).join('');
      var actions = '<div class="plinks">' + (hasDetail ? '<button type="button" class="btn btn--sm btn--ghost" data-d="' + idx + '">Project details</button>' : '') + links + '</div>';
      var demo = p.video ? '<div class="proj__demo" role="button" tabindex="0" aria-label="' + esc(p.video.label) + ' (click to pause or play)"><video muted loop playsinline preload="none" disablepictureinpicture poster="' + esc(p.video.poster) + '"><source src="' + esc(p.video.src) + '" type="video/mp4"></video><span class="proj__dtag">DEMO</span></div>' : '';
      var body = (p.badge ? '<span class="badge">' + esc(p.badge) + '</span>' : '') + '<p class="card__org">' + (p.period ? esc(p.period) + ' · ' : '') + esc(p.category) + '</p><h3>' + esc(p.title) + '</h3>' + demo + '<p>' + esc(p.description) + '</p>' + (p.meta ? '<p class="meta">' + esc(p.meta) + '</p>' : '') + tags(p.technologies) + actions;
      var ar = p.image && p.image.ar ? p.image.ar : 1.7778;
      var im = p.image ? '<img class="PCLS" src="' + esc(p.image.src) + '" alt="' + esc(p.image.alt) + '" width="1600" height="' + Math.round(1600 / ar) + '" loading="lazy" decoding="async" referrerpolicy="no-referrer"' + (p.image.pos ? ' style="object-position:' + esc(p.image.pos) + '"' : '') + ' onerror="this.' + (p.featured ? 'remove()' : 'parentNode.remove()') + '">' : '';
      var gal = (p.featured && p.gallery) ? '<div class="proj__gal">' + p.gallery.map(function (g) { return '<a class="proj__g" href="#" role="button" style="--ar:' + (g.ar || 1.3333) + '" aria-label="Enlarge: ' + esc(g.caption) + '"><img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" width="400" height="' + Math.round(400 / (g.ar || 1.3333)) + '" loading="lazy" decoding="async"><span>' + esc(g.caption) + '</span></a>'; }).join('') + '</div>' : '';
      return p.featured
        ? '<article class="card proj--feat reveal in"><div class="proj__viz"><div class="proj__main" style="aspect-ratio:' + ar + '">' + droneSvg + im.replace('PCLS', 'proj__img') + '</div>' + gal + '</div><div class="proj__body">' + body + '</div></article>'
        : card((im ? '<figure class="proj__shot" style="aspect-ratio:' + ar + '">' + im.replace('PCLS', 'proj__pic') + '</figure>' : '') + body, 'in');
    }).join('');
    initTilt();
    initDemos();
  }

  var demoIO = null;
  function initDemos() {
    if (demoIO) demoIO.disconnect();
    demoIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var v = en.target.querySelector('video');
        if (en.isIntersecting && !en.target.dataset.paused && !reduce) { var r = v.play(); if (r && r.catch) r.catch(function () {}); } else v.pause();
      });
    }, { threshold: 0.5 }) : null;
    grid.querySelectorAll('.proj__demo').forEach(function (d) {
      if (demoIO) demoIO.observe(d);
      function tog() { var v = d.querySelector('video'); if (v.paused) { delete d.dataset.paused; v.play().catch(function () {}); } else { d.dataset.paused = '1'; v.pause(); } }
      d.addEventListener('click', tog);
      d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
    });
  }

  function openProject(idx) {
    var p = D.projects[idx], dt = (D.projectDetails || {})[short(p.title)] || {};
    var media = p.video
      ? '<div class="md__media"><video controls playsinline preload="metadata" poster="' + esc(p.video.poster) + '" aria-label="' + esc(p.video.label) + '"><source src="' + esc(p.video.src) + '" type="video/mp4"></video></div>'
      : (p.image && !/^data:image\/svg/.test(p.image.src) ? '<div class="md__media"><img src="' + esc(p.image.src) + '" alt="' + esc(p.image.alt || p.title) + '" referrerpolicy="no-referrer" onerror="this.parentNode.remove()"></div>' : '');
    var facts = (dt.facts || []).slice();
    if (p.period) facts.unshift(['Period', p.period]);
    if (p.badge && !dt.facts) facts.push(['Note', p.badge]);
    var links = (p.links || []).map(function (l, i) { return '<a class="btn ' + (i ? 'btn--ghost' : '') + '" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' →</a>'; }).join('');
    var h = media +
      '<div class="md__in">' +
        '<div class="md__head"><p class="kicker">' + esc(p.category.toUpperCase()) + (p.badge ? ' · ' + esc(p.badge.toUpperCase()) : '') + '</p><h3>' + esc(p.title) + '</h3>' + (dt.tagline ? '<p class="md__tl">' + esc(dt.tagline) + '</p>' : '') + '</div>' +
        '<div class="md__main">' +
          '<div class="md__sec"><h4>Overview</h4><p>' + esc(p.description) + '</p></div>' +
          (dt.highlights ? '<div class="md__sec"><h4>Key capabilities</h4><ul class="hl">' + dt.highlights.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' : '') +
        '</div>' +
        '<aside class="md__side">' +
          (facts.length ? '<div class="md__sec"><h4>Project facts</h4><dl class="facts">' + facts.map(function (f) { return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl></div>' : '') +
          '<div class="md__sec"><h4>Tech stack</h4>' + tags(p.technologies) + '</div>' +
          (links ? '<div class="md__sec"><h4>Links</h4><div class="md__links">' + links + '</div></div>' : '') +
        '</aside>' +
      '</div>';
    openModal(h, p.title + ' details');
  }

  if (gridProjects.length >= 3 && cats.length > 2) {
    filt.hidden = false;
    filt.innerHTML = cats.map(function (c) { return '<button type="button" class="' + (c === cur ? 'on' : '') + '" data-c="' + esc(c) + '">' + esc(c) + '</button>'; }).join('');
    filt.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return; cur = b.dataset.c;
      filt.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); renderProjects();
    });
  }
  renderSpotlight();
  renderProjects();

  /* photo lightbox for the drone gallery */
  var lbx = document.createElement('div'); lbx.className = 'lbx'; lbx.hidden = true; lbx.innerHTML = '<img alt="">';
  document.body.appendChild(lbx);
  function closeLbx() { lbx.hidden = true; }
  lbx.addEventListener('click', closeLbx);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLbx(); });
  grid.addEventListener('click', function (e) {
    var d = e.target.closest('[data-d]');
    if (d) { openProject(+d.dataset.d); return; }
    var a = e.target.closest('.proj__g'); if (!a) return; e.preventDefault();
    var im = a.querySelector('img'); lbx.firstChild.src = im.src; lbx.firstChild.alt = im.alt; lbx.hidden = false;
  });
  $('#proj-note').innerHTML = 'More work on <a class="grad" href="' + esc(D.links.github) + '" target="_blank" rel="noopener">GitHub</a> and the <a class="grad" href="' + esc(D.links.site) + '" target="_blank" rel="noopener">project page</a>.';

  /* ======================================================
     EXPERIENCE · CREDENTIALS
     ====================================================== */
  $('#timeline').innerHTML = D.experience.map(function (e) {
    return '<div class="tl reveal' + (e.current ? ' cur' : '') + '"><article class="card"><p class="card__org">' + esc(e.role) + (e.current ? '<span class="pill">CURRENT</span>' : '') + '</p>' + (e.period ? '<p class="when">' + esc(e.period) + (e.type ? ' · ' + esc(e.type) : '') + (e.location ? ' · ' + esc(e.location) : '') + '</p>' : '') + '<h3>' +
      (e.url ? '<a href="' + esc(e.url) + '" target="_blank" rel="noopener">' + esc(e.company) + '</a>' : esc(e.company)) + '</h3><p>' + esc(e.description) + '</p>' + tags(e.tech) + '</article></div>';
  }).join('');

  $('#cred-grid').innerHTML = D.credentials.map(function (c) {
    return card('<p class="card__org">' + esc(c.issuer || 'Certificate') + '</p><h3>' + esc(c.title) + '</h3>' +
      (c.url ? '<a class="lnk" href="' + esc(c.url) + '" target="_blank" rel="noopener">View credential →</a>' : ''));
  }).join('');
  $('#workshops').innerHTML = D.workshops.map(function (w) {
    return card((w.org ? '<p class="card__org">' + esc(w.org) + '</p>' : '') + '<h3>' + esc(w.title) + '</h3><p>' + esc(w.text) + '</p>');
  }).join('');

  /* ======================================================
     REVIEWS
     ====================================================== */
  (function reviews() {
    var host = $('#reviews-app'), R = D.reviews, G = D.reviewGroups; if (!host || !R || !R.length) return;
    var gmap = {}; G.forEach(function (g) { gmap[g.id] = g; });
    var total = R.length, active = 'all', auto = null, touched = false;
    R.forEach(function (r, i) { r.n = i + 1; });
    var sum = $('#rv-sum');
    if (sum) sum.innerHTML = '<div><b data-n="' + total + '">0</b><span>Reviews</span></div><div><b data-n="' + G.length + '">0</b><span>Work areas</span></div>';

    host.innerHTML =
      '<div class="rv-bar"><div class="rv-tabs" id="rv-tabs" role="tablist" aria-label="Filter reviews by work type"></div>' +
      '<div class="rv-nav"><button type="button" id="rv-prev" aria-label="Previous reviews">' + ICON.l + '</button><button type="button" id="rv-next" aria-label="Next reviews">' + ICON.r + '</button></div></div>' +
      '<div class="rv-track" id="rv-track" tabindex="0" role="region" aria-label="Reviews" aria-live="off"></div>' +
      '<div class="rv-prog" aria-hidden="true"><span id="rv-prog"></span></div>';
    var tabs = $('#rv-tabs'), track = $('#rv-track'), prev = $('#rv-prev'), next = $('#rv-next'), prog = $('#rv-prog');

    tabs.innerHTML = [{ id: 'all', tab: 'All reviews' }].concat(G).map(function (g) {
      var n = g.id === 'all' ? total : R.filter(function (r) { return r.g === g.id; }).length;
      return '<button type="button" role="tab" aria-selected="' + (g.id === active) + '" class="' + (g.id === active ? 'on' : '') + '" data-g="' + g.id + '">' + esc(g.tab) + '<small>' + n + '</small></button>';
    }).join('');

    function cardHtml(r) {
      var g = gmap[r.g] || {};
      var by = r.name ? '<b>' + esc(r.name) + '</b>' + (r.role ? esc(r.role) : '') : '<b>Review</b>' + esc(g.tab || '');
      if (r.name && r.url) by = '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + by + '</a>';
      return '<figure class="rv-card" aria-label="Review ' + r.n + ' of ' + total + '">' +
        '<header><div class="ico" aria-hidden="true">' + esc(g.ico || 'AI') + '</div><p>' + esc(g.label || '') + '</p></header>' +
        '<h3>' + esc(r.title) + '</h3>' +
        '<blockquote>“' + esc(r.text) + '”</blockquote>' +
        '<footer><span>' + by + '</span><em>' + ('0' + r.n).slice(-2) + ' / ' + total + '</em></footer></figure>';
    }
    function draw() {
      var list = R.filter(function (r) { return active === 'all' || r.g === active; });
      track.innerHTML = list.map(cardHtml).join('');
      track.scrollLeft = 0; sync();
    }
    function step() { var c = $('.rv-card', track); return c ? c.getBoundingClientRect().width + 17.6 : 300; }
    function sync() {
      var max = track.scrollWidth - track.clientWidth, x = track.scrollLeft;
      prev.disabled = x <= 4; next.disabled = x >= max - 4;
      var w = max > 0 ? track.clientWidth / track.scrollWidth : 1;
      prog.parentNode.style.visibility = max > 4 ? 'visible' : 'hidden';
      prog.style.setProperty('--w', (w * 100) + '%');
      prog.style.setProperty('--l', (max > 0 ? (x / max) * (1 - w) * 100 : 0) + '%');
    }
    function go(dir) { track.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' }); }
    function stop() { touched = true; if (auto) { clearInterval(auto); auto = null; } }
    prev.addEventListener('click', function () { stop(); go(-1); });
    next.addEventListener('click', function () { stop(); go(1); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(sync); }, { passive: true });
    track.addEventListener('pointerdown', stop); track.addEventListener('keydown', stop); track.addEventListener('wheel', stop, { passive: true });
    track.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return; active = b.dataset.g;
      $$('button', tabs).forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); });
      draw();
    });
    window.addEventListener('resize', sync);
    draw();

    /* gentle auto-advance while visible, until the visitor interacts */
    if (!reduce && 'IntersectionObserver' in window) {
      var hover = false;
      host.addEventListener('mouseenter', function () { hover = true; }); host.addEventListener('mouseleave', function () { hover = false; });
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting && !touched && !auto) {
          auto = setInterval(function () {
            if (hover || document.hidden) return;
            var max = track.scrollWidth - track.clientWidth;
            if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' }); else go(1);
          }, 5200);
        } else if (!es[0].isIntersecting && auto) { clearInterval(auto); auto = null; }
      }, { threshold: .35 }).observe(host);
    }
  })();

  /* ======================================================
     METRICS (computed from the data above, never hard-coded)
     ====================================================== */
  var tools = D.skills.reduce(function (n, g) { return n + g.items.length; }, 0);
  var metrics = [
    [D.experience.length, 'Roles held'],
    [D.credentials.length, 'Certifications'],
    [tools, 'Tools & technologies'],
    [D.workshops.length, 'Workshops attended'],
    [D.projects.length, 'Projects built'],
    [(D.reviews || []).length, 'Reviews received']
  ];
  $('#stats').innerHTML = metrics.map(function (m) { return '<div class="stat reveal"><b data-n="' + m[0] + '">0</b><span>' + m[1] + '</span></div>'; }).join('');

  /* terminal (decorative) */
  var lines = ['<span class="dim">$</span> init ai-lab --visual-only', '<span class="ok">✔</span> data pipeline ........ ready', '<span class="ok">✔</span> model training ........ ready', '<span class="ok">✔</span> deployment ............ ready', '<span class="ok">✔</span> monitoring ............ ready', '<span class="dim">$</span> status: <span class="ok">READY</span>'];
  var out = $('#term-out'), started = false;
  function runTerm() {
    if (started) return; started = true; var i = 0;
    (function step() { if (i >= lines.length) return; out.innerHTML += lines[i++] + '\n'; setTimeout(step, reduce ? 0 : 420); })();
  }

  /* ======================================================
     NAV · SCROLL PROGRESS · REVEAL · COUNTERS
     ====================================================== */
  var nav = $('#nav'), burger = $('#burger'), bar = $('#progress');
  function onScroll() {
    nav.classList.toggle('solid', window.scrollY > 30);
    if (bar) { var h = document.documentElement.scrollHeight - innerHeight; bar.style.setProperty('--p', h > 0 ? Math.min(1, window.scrollY / h).toFixed(4) : 0); }
  }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); });
  $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }); });

  var links = $$('#menu a');
  var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function count(el) {
    var n = +el.dataset.n, sfx = el.dataset.s || '', t0 = performance.now();
    if (reduce) { el.textContent = n + sfx; return; }
    (function f(t) { var p = Math.min((t - t0) / 1100, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + sfx; if (p < 1) requestAnimationFrame(f); })(t0);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; e.target.classList.add('in');
        $$('[data-n]', e.target).concat(e.target.matches('[data-n]') ? [e.target] : []).forEach(count);
        if (e.target.id === 'term') runTerm();
        io.unobserve(e.target);
      });
    }, { threshold: .12 });
    $$('.reveal').forEach(function (el) { io.observe(el); });
    secs.forEach(function (sec, i) {
      if (!sec) return;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) links.forEach(function (a, j) { a.classList.toggle('on', j === i); });
      }, { rootMargin: '-45% 0px -50% 0px' }).observe(sec);
    });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
    $$('[data-n]').forEach(function (c) { c.textContent = c.dataset.n + (c.dataset.s || ''); }); runTerm();
  }

  /* ======================================================
     CARD TILT + CURSOR SPOTLIGHT (desktop pointer only)
     ====================================================== */
  function initTilt() {
    if (!finePointer || reduce) return;
    $$('.card:not(.tilt)').forEach(function (c) {
      c.classList.add('tilt');
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = 'perspective(900px) rotateX(' + (-y * 4) + 'deg) rotateY(' + (x * 5) + 'deg) translateY(-3px)';
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });
  }
  initTilt();
  if (finePointer) document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.card,.spot');
    if (!c) return; var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });
})();
