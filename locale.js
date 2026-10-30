/* Interface language only: literary texts are never machine-translated. */
(function () {
  'use strict';
  var params = new URLSearchParams(location.search);
  var inEnglish = /\/en\//.test(location.pathname);
  var stored = null;
  try { stored = localStorage.getItem('tb-ui'); } catch (e) {}
  var explicit = params.get('ui');
  var lang = inEnglish ? 'en' : (explicit === 'en' || explicit === 'ja' ? explicit : (stored === 'en' ? 'en' : 'ja'));
  // Static Japanese information pages retain their authored language.
  var info = /\/(?:index|about|privacy|reading-guide)\.html$/.test(location.pathname) || /\/$/.test(location.pathname);
  if (info && !inEnglish) lang = 'ja';
  window.TBUI = {
    lang: lang,
    english: lang === 'en',
    t: function (ja, en) { return lang === 'en' ? en : ja; },
    home: inEnglish ? 'index.html' : (lang === 'en' ? 'en/index.html' : 'index.html'),
    page: function (name) { return inEnglish ? name : (lang === 'en' ? 'en/' + name : name); }
  };
  if (!info) document.documentElement.lang = lang;
  if (explicit === 'en' || explicit === 'ja') {
    try { localStorage.setItem('tb-ui', explicit); } catch (e) {}
  }
  document.addEventListener('DOMContentLoaded', function () {
    var inner = document.querySelector('.topbar .inner');
    if (inner) {
      var link = inner.querySelector('.language-switch') || document.createElement('a');
      link.className = 'language-switch';
      link.lang = lang === 'en' ? 'ja' : 'en';
      link.hreflang = link.lang;
      link.textContent = lang === 'en' ? '日本語' : 'English';
      if (info) {
        var file = location.pathname.split('/').pop() || 'index.html';
        link.href = inEnglish ? '../' + file : 'en/' + file;
      } else {
        var url = new URL(location.href);
        url.searchParams.set('ui', link.lang);
        link.href = url.href;
      }
      link.addEventListener('click', function () {
        try { localStorage.setItem('tb-ui', link.lang); } catch (e) {}
      });
      if (!link.parentNode) inner.insertBefore(link, document.getElementById('theme-toggle'));
    }
    var reader = document.getElementById('reader');
    if (reader) { reader.setAttribute('translate', 'no'); reader.classList.add('notranslate'); }
    if (lang !== 'en') return;
    var map = {
      '本文へ移動': 'Skip to text', '蔵書へ移動': 'Skip to collection',
      '← 蔵書へ': '← Collection', '蔵書': 'Collection',
      'この文庫について': 'About', 'プライバシー': 'Privacy',
      '文字': 'Text size', '▲ ページの先頭へ': 'Back to top ↑',
      '表示切替': 'Reading view', '文字を小さく': 'Decrease text size',
      '文字を大きく': 'Increase text size', '章': 'Chapters', '広告': 'Advertisement'
    };
    document.querySelectorAll('.skip-link, .topbar a, .controls span, .colophon a').forEach(function (el) {
      if (el.children.length === 0 && map[el.textContent.trim()]) el.textContent = map[el.textContent.trim()];
    });
    document.querySelectorAll('[aria-label]').forEach(function (el) {
      var value = el.getAttribute('aria-label');
      if (map[value]) el.setAttribute('aria-label', map[value]);
    });
    document.querySelectorAll('.brand, .backlink').forEach(function (a) {
      a.href = TBUI.home + (a.classList.contains('backlink') ? '#library' : '');
    });
    if (document.body.classList.contains('reader-page')) {
      var cols = document.querySelector('.colophon .cols');
      if (cols) {
        var links = Array.from(cols.querySelectorAll('a')).map(function (a) { return a.outerHTML; }).join('<br>');
        cols.innerHTML = '<div><strong>Source and rights</strong><br>' + links + '<br>Public-domain source; see the work credits above for the edition.</div><div><strong>Japanese translation</strong><br>Newly prepared for Taiyaku Bunko with AI assistance. Suggestions and corrections are welcome via the About page.</div>';
      }
    }
  });
})();
