(function () {
  const STORAGE_THEME = 'zxy-resume-theme';
  const STORAGE_SECTION = 'zxy-resume-section';

  let content = null;
  let photos = null;

  function getPhotoPath(key) {
    if (!photos || !key) return '';
    return photos[key] || key;
  }

  function showSection(sectionId) {
    document.querySelectorAll('.panel').forEach(function (el) {
      el.classList.remove('active');
      el.setAttribute('aria-hidden', 'true');
    });
    document.querySelectorAll('.tab').forEach(function (el) {
      el.classList.remove('active');
      el.setAttribute('aria-selected', 'false');
    });
    var panel = document.getElementById(sectionId);
    var tab = document.querySelector('.tab[data-section="' + sectionId + '"]');
    if (panel) {
      panel.classList.add('active');
      panel.setAttribute('aria-hidden', 'false');
    }
    if (tab) {
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    }
    try {
      localStorage.setItem(STORAGE_SECTION, sectionId);
    } catch (e) {}
  }

  function setTheme(theme) {
    theme = theme || 'default';
    document.documentElement.setAttribute('data-theme', theme === 'default' ? '' : theme);
    var select = document.getElementById('themeSelect');
    if (select) select.value = theme;
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch (e) {}
  }

  function renderBasicInfo(data) {
    var photoKey = data.photo;
    var photoPath = getPhotoPath(photoKey);
    var img = document.getElementById('basicPhoto');
    if (img) {
      img.src = photoPath;
      img.alt = data.name || '个人照片';
      img.onerror = function () { img.style.display = 'none'; };
    }
    var el = document.getElementById('basicDetail');
    if (!el) return;
    var nameEl = document.createElement('div');
    nameEl.className = 'name';
    nameEl.textContent = data.name || '';
    el.appendChild(nameEl);
    (data.items || []).forEach(function (item) {
      var row = document.createElement('div');
      row.className = 'item';
      row.innerHTML = '<span class="label">' + escapeHtml(item.label) + '</span><span class="value">' + escapeHtml(item.value) + '</span>';
      el.appendChild(row);
    });
  }

  function renderJobIntent(data) {
    var el = document.getElementById('jobIntentContent');
    if (!el) return;
    var linesHtml = '';
    if (data.lines && data.lines.length) {
      data.lines.forEach(function (line) {
        linesHtml += '<p>' + escapeHtml(line) + '</p>';
      });
    } else if (data.content) {
      linesHtml = '<p>' + escapeHtml(data.content) + '</p>';
    }
    el.innerHTML =
      '<h2 class="section-title">' + escapeHtml(data.title) + '</h2>' +
      '<div class="job-intent">' +
      '<p class="position">' + escapeHtml(data.position || '') + '</p>' +
      (data.industry ? '<p><strong>行业：</strong>' + escapeHtml(data.industry) + '</p>' : '') +
      (data.city ? '<p><strong>期望城市：</strong>' + escapeHtml(data.city) + '</p>' : '') +
      (data.salary ? '<p><strong>期望薪资：</strong>' + escapeHtml(data.salary) + '</p>' : '') +
      linesHtml +
      '</div>';
  }

  function renderEducation(data) {
    var el = document.getElementById('educationContent');
    if (!el) return;
    var html = '<h2 class="section-title">' + escapeHtml(data.title) + '</h2><ul class="exp-list">';
    (data.items || []).forEach(function (item) {
      var sub = [item.major, item.degree].filter(Boolean).join(' · ');
      html +=
        '<li class="exp-item">' +
        '<div class="row"><span class="name">' + escapeHtml(item.school) + '</span><span class="time">' + escapeHtml(item.time) + '</span></div>' +
        (sub ? '<div class="row"><span class="position">' + escapeHtml(sub) + '</span></div>' : '') +
        '</li>';
    });
    html += '</ul>';
    el.innerHTML = html;
  }

  function renderSelfEval(data) {
    var el = document.getElementById('selfEvalContent');
    if (!el) return;
    var body = '';
    if (data.points && data.points.length) {
      data.points.forEach(function (p) {
        body += '<p>' + escapeHtml(p) + '</p>';
      });
    } else if (data.content) {
      body = '<p>' + escapeHtml(data.content) + '</p>';
    }
    el.innerHTML =
      '<h2 class="section-title">' + escapeHtml(data.title) + '</h2>' +
      '<div class="self-eval">' + body + '</div>';
  }

  function renderWorkExp(data) {
    var el = document.getElementById('workExpContent');
    if (!el) return;
    var html = '<h2 class="section-title">' + escapeHtml(data.title) + '</h2><ul class="exp-list">';
    (data.items || []).forEach(function (item) {
      var descHtml = '';
      if (item.summary) descHtml += '<p class="desc">' + escapeHtml(item.summary) + '</p>';
      if (item.points && item.points.length) {
        item.points.forEach(function (p) {
          descHtml += '<p class="desc point">' + escapeHtml(p) + '</p>';
        });
      } else if (item.desc) {
        descHtml += '<p class="desc">' + escapeHtml(item.desc) + '</p>';
      }
      html +=
        '<li class="exp-item">' +
        '<div class="row"><span class="company">' + escapeHtml(item.company) + '</span><span class="time">' + escapeHtml(item.time) + '</span></div>' +
        '<div class="row"><span class="position">' + escapeHtml(item.position) + '</span></div>' +
        descHtml +
        '</li>';
    });
    html += '</ul>';
    el.innerHTML = html;
  }

  function renderProjectExp(data) {
    var el = document.getElementById('projectExpContent');
    if (!el) return;
    var html = '<h2 class="section-title">' + escapeHtml(data.title) + '</h2><ul class="exp-list">';
    (data.items || []).forEach(function (item) {
      var descHtml = '';
      if (item.summary) descHtml += '<p class="desc">' + escapeHtml(item.summary) + '</p>';
      if (item.points && item.points.length) {
        item.points.forEach(function (p) {
          descHtml += '<p class="desc point">' + escapeHtml(p) + '</p>';
        });
      } else if (item.desc) {
        descHtml += '<p class="desc">' + escapeHtml(item.desc) + '</p>';
      }
      html +=
        '<li class="exp-item">' +
        '<div class="row"><span class="name">' + escapeHtml(item.name) + '</span>' + (item.time ? '<span class="time">' + escapeHtml(item.time) + '</span>' : '') + '</div>' +
        (item.role ? '<div class="row"><span class="role">' + escapeHtml(item.role) + '</span></div>' : '') +
        (item.tech ? '<p class="tech">' + escapeHtml(item.tech) + '</p>' : '') +
        descHtml +
        '</li>';
    });
    html += '</ul>';
    el.innerHTML = html;
  }

  function escapeHtml(s) {
    if (s == null) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function bindTabs() {
    document.getElementById('navTabs').addEventListener('click', function (e) {
      var tab = e.target.closest('.tab');
      if (!tab || !tab.dataset.section) return;
      showSection(tab.dataset.section);
    });
  }

  function bindTheme() {
    var select = document.getElementById('themeSelect');
    if (select) {
      select.addEventListener('change', function () {
        setTheme(select.value);
      });
    }
  }

  function init() {
    Promise.all([
      fetch('data/content.json').then(function (r) { return r.json(); }),
      fetch('data/photos.json').then(function (r) { return r.json(); })
    ]).then(function (res) {
      content = res[0];
      photos = res[1];
      if (content.basicInfo) renderBasicInfo(content.basicInfo);
      if (content.jobIntent) renderJobIntent(content.jobIntent);
      if (content.education) renderEducation(content.education);
      if (content.selfEval) renderSelfEval(content.selfEval);
      if (content.workExp) renderWorkExp(content.workExp);
      if (content.projectExp) renderProjectExp(content.projectExp);
      var savedSection = '';
      try { savedSection = localStorage.getItem(STORAGE_SECTION); } catch (e) {}
      var sectionId = content[savedSection] ? savedSection : 'basicInfo';
      showSection(sectionId);
    }).catch(function (err) {
      console.error('加载内容失败', err);
      document.body.innerHTML = '<p style="padding:20px">加载简历内容失败，请检查 data/content.json 与 data/photos.json。</p>';
    });

    var savedTheme = '';
    try { savedTheme = localStorage.getItem(STORAGE_THEME) || 'default'; } catch (e) {}
    setTheme(savedTheme);
    bindTabs();
    bindTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
