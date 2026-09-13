(function () {
  'use strict';

  /* ---------- 主题切换 ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  toggle.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  });

  /* ---------- 站点运行天数（自 2026-03-01 开通） ---------- */
  var opened = new Date('2026-03-01T00:00:00+08:00');
  var days = Math.max(1, Math.floor((Date.now() - opened.getTime()) / 86400000));
  document.getElementById('run-days').textContent = days;

  /* ---------- 页脚年份 ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- 文章计数 ---------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll('.post-card'));
  document.getElementById('post-count').textContent = cards.length;

  /* ---------- 搜索 + 标签过滤 ---------- */
  var searchInput = document.getElementById('search');
  var emptyState = document.getElementById('empty-state');
  var keyword = '';
  var activeTag = '全部';

  function applyFilter() {
    var visible = 0;
    cards.forEach(function (card) {
      var okKeyword = !keyword || card.textContent.toLowerCase().indexOf(keyword) !== -1;
      var tags = card.dataset.tags.split(' ');
      var okTag = activeTag === '全部' || tags.indexOf(activeTag) !== -1;
      var show = okKeyword && okTag;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    emptyState.hidden = visible !== 0;
  }

  searchInput.addEventListener('input', function () {
    keyword = searchInput.value.trim().toLowerCase();
    applyFilter();
  });

  document.getElementById('tag-cloud').addEventListener('click', function (e) {
    var btn = e.target.closest('.tag');
    if (!btn) return;
    document.querySelectorAll('#tag-cloud .tag').forEach(function (t) {
      t.classList.remove('active');
    });
    btn.classList.add('active');
    activeTag = btn.dataset.tag;
    applyFilter();
  });

  /* ---------- 导航滚动阴影 ---------- */
  var header = document.getElementById('site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 演示用：文章卡片点击不跳转 ---------- */
  cards.forEach(function (card) {
    card.querySelector('.post-link').addEventListener('click', function (e) {
      e.preventDefault();
    });
  });
})();
