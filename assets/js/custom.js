(function () {
  function loadComponent(url, placeholderId, callback) {
    fetch(url)
      .then(function (res) { return res.text(); })
      .then(function (html) {
        var el = document.getElementById(placeholderId);
        if (el) {
          el.outerHTML = html;
        }
        if (typeof callback === 'function') callback();
      });
  }

  function initStickyHeader() {
    if (document.getElementById('header')) {
      window.addEventListener('scroll', function () {
        var headerArea = document.querySelector('.header-area');
        if (!headerArea) return;
        if (window.scrollY < 1) {
          headerArea.classList.remove('sticky');
        } else {
          headerArea.classList.add('sticky');
        }
      });
    }
  }

  function initMobileMenu() {
    var mobileNavOpen = document.querySelector('.mobile-nav-icon');
    var mobileSidebar = document.querySelector('.mobile-sidebar');
    var mobileNavClose = document.querySelector('.menu-close');

    if (mobileNavOpen && mobileSidebar) {
      mobileNavOpen.addEventListener('click', function () {
        mobileSidebar.classList.add('mobile-menu-active');
      });
    }
    if (mobileNavClose && mobileSidebar) {
      mobileNavClose.addEventListener('click', function () {
        mobileSidebar.classList.remove('mobile-menu-active');
      });
    }

    // Submenu toggle for mobile nav
    var navItems = document.querySelectorAll('.mobile-nav li');
    navItems.forEach(function (item) {
      var sub = item.querySelector('ul');
      if (sub && !item.querySelector(':scope > span.submenu-button')) {
        item.classList.add('has-sub');
        var btn = document.createElement('span');
        btn.className = 'submenu-button';
        btn.innerHTML = '';
        item.insertBefore(btn, sub);
        btn.addEventListener('click', function () {
          btn.classList.toggle('submenu-opened');
          sub.classList.toggle('open-sub');
        });
      }
    });
  }

  loadComponent('header.html', 'site-header', function () {
    initStickyHeader();
    initMobileMenu();
  });
  loadComponent('footer.html', 'site-footer');
})();
