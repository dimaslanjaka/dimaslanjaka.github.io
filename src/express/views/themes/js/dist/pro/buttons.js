jQuery(function ($) {
  var isTouchDevice = 'ontouchstart' in document.documentElement;

  var toggleOpen = function toggleOpen(btn, open) {
    if (open && !btn.hasClass('active') || !open && btn.hasClass('active')) {
      btn[open ? 'addClass' : 'removeClass']('active');
      var btnList = document.querySelectorAll('ul .btn-floating');
      btnList.forEach(function (el) {
        return el.classList[open ? 'add' : 'remove']('shown');
      });
    }
  };

  var handleClick = function handleClick(btn) {
    if (btn.hasClass('active')) {
      toggleOpen(btn, false);
    } else {
      toggleOpen(btn, true);
    }
  };

  var $btn = $('.fixed-action-btn:not(.smooth-scroll) > .btn-floating');
  $btn.on('mouseenter', function (e) {
    if (!isTouchDevice) {
      toggleOpen($(e.currentTarget).parent(), true);
    }
  });
  $btn.parent().on('mouseleave', function (e) {
    return toggleOpen($(e.currentTarget), false);
  });
  $btn.on('click', function (e) {
    e.preventDefault();
    handleClick($(e.currentTarget).parent());
  });
  $.fn.extend({
    openFAB: function openFAB() {
      toggleOpen($(this), true);
    },
    closeFAB: function closeFAB() {
      toggleOpen($(this), false);
    }
  });
});