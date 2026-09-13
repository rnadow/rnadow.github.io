(function () {
  'use strict';

  /* ---------- 主题切换 ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- 页脚年份 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 站点运行天数（自 2026-03-01 开通），仅首页 ---------- */
  var runDaysEl = document.getElementById('run-days');
  if (runDaysEl) {
    var opened = new Date('2026-03-01T00:00:00+08:00');
    var days = Math.max(1, Math.floor((Date.now() - opened.getTime()) / 86400000));
    runDaysEl.textContent = days;
  }

  /* ---------- 首页：文章计数 + 搜索 / 标签过滤 ---------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll('.post-card'));
  if (cards.length) {
    var countEl = document.getElementById('post-count');
    if (countEl) countEl.textContent = cards.length;

    var searchInput = document.getElementById('search');
    var emptyState = document.getElementById('empty-state');
    var tagCloud = document.getElementById('tag-cloud');
    var keyword = '';
    var activeTag = '全部';

    var applyFilter = function () {
      var visible = 0;
      cards.forEach(function (card) {
        var okKeyword = !keyword || card.textContent.toLowerCase().indexOf(keyword) !== -1;
        var tags = card.dataset.tags.split(' ');
        var okTag = activeTag === '全部' || tags.indexOf(activeTag) !== -1;
        var show = okKeyword && okTag;
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      if (emptyState) emptyState.hidden = visible !== 0;
    };

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        keyword = searchInput.value.trim().toLowerCase();
        applyFilter();
      });
    }

    if (tagCloud) {
      tagCloud.addEventListener('click', function (e) {
        var btn = e.target.closest('.tag');
        if (!btn) return;
        document.querySelectorAll('#tag-cloud .tag').forEach(function (t) {
          t.classList.remove('active');
        });
        btn.classList.add('active');
        activeTag = btn.dataset.tag;
        applyFilter();
      });
    }
  }

  /* ---------- 顶栏滚动阴影 + 文章页阅读进度条 ---------- */
  var header = document.getElementById('site-header');
  var bar = document.getElementById('progress-bar');

  var onScroll = function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    if (bar) {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      var pct = total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0;
      bar.style.width = pct + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
