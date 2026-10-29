/* 対訳文庫 共通UI — theme, catalog search, progressive enhancements */
(function () {
  "use strict";

  var root = document.documentElement;
  var UI = window.TBUI || { english: false, t: function (ja) { return ja; }, home: 'index.html', page: function (name) { return name; } };
  var savedTheme = safeGet("tb-theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", savedTheme || (prefersDark ? "dark" : "light"));

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    initThemeToggle();
    initCatalog();
    initReaderFooter();
    document.documentElement.classList.add("js-ready");
  }

  function initThemeToggle() {
    var button = document.getElementById("theme-toggle");
    if (!button) return;
    updateThemeButton(button);
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      safeSet("tb-theme", next);
      updateThemeButton(button);
    });
  }

  function updateThemeButton(button) {
    var isDark = root.getAttribute("data-theme") === "dark";
    button.setAttribute("aria-label", isDark ? UI.t("ライトモードに切り替える", "Switch to light mode") : UI.t("ダークモードに切り替える", "Switch to dark mode"));
    button.setAttribute("title", isDark ? UI.t("ライトモード", "Light mode") : UI.t("ダークモード", "Dark mode"));
    button.setAttribute("aria-pressed", isDark ? "true" : "false");
    var icon = button.querySelector(".theme-icon");
    if (icon) icon.textContent = isDark ? "☀" : "☾";
  }

  function initCatalog() {
    var list = document.getElementById("library-list");
    var search = document.getElementById("library-search");
    if (!list || !search) return;

    var cards = Array.prototype.slice.call(list.querySelectorAll(".work-entry"));
    var author = document.getElementById("author-filter");
    var sort = document.getElementById("sort-order");
    var clear = document.getElementById("search-clear");
    var status = document.getElementById("catalog-status");
    var empty = document.getElementById("catalog-empty");

    var params = new URLSearchParams(window.location.search);
    if (params.get("q")) search.value = params.get("q");
    if (params.get("author") && author) author.value = params.get("author");

    [search, author, sort].forEach(function (control) {
      if (!control) return;
      control.addEventListener(control === search ? "input" : "change", render);
    });
    if (clear) {
      clear.addEventListener("click", function () {
        search.value = "";
        search.focus();
        render();
      });
    }

    render();

    function render() {
      var query = normalize(search.value);
      var selectedAuthor = author ? author.value : "";
      var visible = cards.filter(function (card) {
        var haystack = normalize(card.getAttribute("data-search") || card.textContent);
        var cardAuthor = card.getAttribute("data-author") || "";
        return (!query || haystack.indexOf(query) !== -1) && (!selectedAuthor || cardAuthor === selectedAuthor);
      });

      var order = sort ? sort.value : "newest";
      visible.sort(function (a, b) {
        if (order === "title") return (a.getAttribute(UI.english ? "data-title-en" : "data-title") || "").localeCompare(b.getAttribute(UI.english ? "data-title-en" : "data-title") || "", UI.lang || "ja");
        if (order === "author") return (a.getAttribute(UI.english ? "data-author-en" : "data-author") || "").localeCompare(b.getAttribute(UI.english ? "data-author-en" : "data-author") || "", UI.lang || "ja");
        return Number(a.getAttribute("data-order")) - Number(b.getAttribute("data-order"));
      });

      cards.forEach(function (card) { card.hidden = true; });
      visible.forEach(function (card) {
        card.hidden = false;
        list.appendChild(card);
      });

      if (clear) clear.hidden = !search.value;
      if (status) status.textContent = UI.english ? visible.length + (visible.length === 1 ? " work shown" : " works shown") : visible.length + "作品を表示";
      if (empty) empty.hidden = visible.length !== 0;
    }
  }

  function initReaderFooter() {
    if (!document.body.classList.contains("reader-page")) return;
    var inner = document.querySelector(".colophon .inner");
    if (!inner || inner.querySelector(".reader-footer-nav")) return;
    var nav = document.createElement("nav");
    nav.className = "reader-footer-nav";
    nav.setAttribute("aria-label", UI.t("文庫案内", "Library information"));
    nav.innerHTML = '<a href="' + UI.home + '#library">' + UI.t('蔵書', 'Collection') + '</a><a href="' + UI.page('about.html') + '">' + UI.t('この文庫について', 'About') + '</a><a href="' + UI.page('privacy.html') + '">' + UI.t('プライバシー', 'Privacy') + '</a>';
    inner.appendChild(nav);
  }

  function normalize(value) {
    return String(value || "").normalize("NFKC").toLocaleLowerCase("ja").replace(/\s+/g, " ").trim();
  }

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  }

  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (error) {}
  }
})();
