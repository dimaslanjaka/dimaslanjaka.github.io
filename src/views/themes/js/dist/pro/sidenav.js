jQuery(function ($) {
  var SideNav =
  /*#__PURE__*/
  function () {
    function SideNav(element, options) {
      this.settings = {
        menuLeftMinBorder: 0.3,
        menuLeftMaxBorder: -0.5,
        menuRightMinBorder: -0.3,
        menuRightMaxBorder: 0.5,
        menuVelocityOffset: 10
      };
      this.defaults = {
        menuWidth: 240,
        edge: 'left',
        closeOnClick: false,
        breakpoint: 1440,
        timeDurationOpen: 300,
        timeDurationClose: 200,
        timeDurationOverlayOpen: 50,
        timeDurationOverlayClose: 200,
        easingOpen: 'easeOutQuad',
        easingClose: 'easeOutCubic',
        showOverlay: true,
        showCloseButton: false,
        slim: false
      };
      this.$element = element;
      this.$elementCloned = element.clone().css({
        display: 'inline-block',
        lineHeight: '24px'
      });
      this.options = this.assignOptions(options);
      this.menuOut = false;
      this.lastTouchVelocity = {
        x: {
          startPosition: 0,
          startTime: 0,
          endPosition: 0,
          endTime: 0
        }
      };
      this.$body = $('body');
      this.$menu = $("#" + this.$element.attr('data-activates'));
      this.$sidenavOverlay = $('#sidenav-overlay');
      this.$dragTarget = $('<div class="drag-target"></div>');
      this.$body.append(this.$dragTarget);
    }

    var _proto = SideNav.prototype;

    _proto.assignOptions = function assignOptions(newOptions) {
      return $.extend({}, this.defaults, newOptions);
    };

    _proto.init = function init() {
      this.setMenuWidth();
      this.setMenuTranslation();
      this.closeOnClick();
      this.openOnClick();
      this.bindTouchEvents();
      this.showCloseButton();
      this.inputOnClick();

      if (this.options.slim === true) {
        this.handleSlim();
      }
    };

    _proto.setMenuWidth = function setMenuWidth() {
      var $sidenavBg = $("#" + this.$menu.attr('id')).find('> .sidenav-bg');
      this.$menu.css('width', this.options.menuWidth);
      $sidenavBg.css('width', this.options.menuWidth);
    };

    _proto.setMenuTranslation = function setMenuTranslation() {
      var _this = this;

      if (this.options.edge === 'left') {
        this.$menu.css('transform', 'translateX(-100%)');
        this.$dragTarget.css({
          left: 0
        });
      } else {
        this.$menu.addClass('right-aligned').css('transform', 'translateX(100%)');
        this.$dragTarget.css({
          right: 0
        });
      }

      if (!this.$menu.hasClass('fixed')) {
        return;
      }

      if (window.innerWidth > this.options.breakpoint) {
        this.$menu.css('transform', 'translateX(0)');
      }

      this.$menu.find('input[type=text]').on('touchstart', function () {
        _this.$menu.addClass('transform-fix-input');
      });
      $(window).on('resize', function () {
        if (window.innerWidth > _this.options.breakpoint) {
          if (_this.$sidenavOverlay.length) {
            _this.removeMenu(true);
          } else {
            _this.$menu.css('transform', 'translateX(0%)');
          }
        } else if (_this.menuOut === false) {
          var xValue = _this.options.edge === 'left' ? '-100' : '100';

          _this.$menu.css('transform', "translateX(" + xValue + "%)");
        }
      });
    };

    _proto.closeOnClick = function closeOnClick() {
      var _this2 = this;

      if (this.options.closeOnClick === true) {
        this.$menu.on('click', 'a:not(.collapsible-header)', function () {
          return _this2.removeMenu();
        });

        if (this.$menu.css('transform') === 'translateX(0)') {
          this.$menu.on('click', function () {
            return _this2.removeMenu();
          });
        }
      }
    };

    _proto.openOnClick = function openOnClick() {
      var _this3 = this;

      // eslint-disable-next-line consistent-return
      this.$element.on('click', function (e) {
        e.preventDefault();

        if (_this3.menuOut === true) {
          return _this3.removeMenu();
        }

        if (_this3.options.showOverlay === true) {
          if (!$('#sidenav-overlay').length) {
            _this3.$sidenavOverlay = $('<div id="sidenav-overlay"></div>');

            _this3.$body.append(_this3.$sidenavOverlay);
          }
        } else {
          _this3.showCloseButton();
        }

        var translateX = [];

        if (_this3.options.edge === 'left') {
          translateX = [0, -1 * _this3.options.menuWidth];
        } else {
          translateX = [0, _this3.options.menuWidth];
        }

        if (_this3.$menu.css('transform') !== 'matrix(1, 0, 0, 1, 0, 0)') {
          _this3.$menu.velocity({
            translateX: translateX
          }, {
            duration: _this3.options.timeDurationOpen,
            queue: false,
            easing: _this3.options.easingOpen
          });
        }

        _this3.$sidenavOverlay.on('click', function () {
          return _this3.removeMenu();
        });

        _this3.$sidenavOverlay.on('touchmove', _this3.touchmoveEventHandler.bind(_this3));

        _this3.$menu.on('touchmove', function (e) {
          e.preventDefault();

          _this3.$menu.find('.custom-scrollbar').css('padding-bottom', '30px');
        });

        _this3.menuOut = true;
      });
    };

    _proto.bindTouchEvents = function bindTouchEvents() {
      var _this4 = this;

      this.$dragTarget.on('click', function () {
        return _this4.removeMenu();
      });
      this.$dragTarget.on('touchstart', function (e) {
        _this4.lastTouchVelocity.x.startPosition = e.touches[0].clientX;
        _this4.lastTouchVelocity.x.startTime = Date.now();
      });
      this.$dragTarget.on('touchmove', this.touchmoveEventHandler.bind(this));
      this.$dragTarget.on('touchend', this.touchendEventHandler.bind(this));
    };

    _proto.showCloseButton = function showCloseButton() {
      if (this.options.showCloseButton === true) {
        this.$menu.prepend(this.$elementCloned);
        this.$menu.find('.logo-wrapper').css({
          borderTop: '1px solid rgba(153,153,153,.3)'
        });
      }
    };

    _proto.inputOnClick = function inputOnClick() {
      var _this5 = this;

      this.$menu.find('input[type=text]').on('touchstart', function () {
        return _this5.$menu.css('transform', 'translateX(0)');
      });
    };

    _proto.removeMenu = function removeMenu(restoreMenu) {
      var _this6 = this;

      this.$body.css({
        overflow: '',
        width: ''
      });
      this.$menu.velocity({
        translateX: this.options.edge === 'left' ? '-100%' : '100%'
      }, {
        duration: this.options.timeDurationClose,
        queue: false,
        easing: this.options.easingClose,
        complete: function complete() {
          if (restoreMenu === true) {
            _this6.$menu.removeAttr('style');

            _this6.$menu.css('width', _this6.options.menuWidth);
          }
        }
      });
      this.$menu.removeClass('transform-fix-input');
      this.hideSidenavOverlay();
      this.menuOut = false;
    };

    _proto.handleSlim = function handleSlim() {
      var _this7 = this;

      var $toggle = $('#toggle');
      $toggle.on('click', function () {
        if (_this7.$menu.hasClass('slim')) {
          _this7.$menu.removeClass('slim');

          $('.sv-slim-icon').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
          $('.fixed-sn .double-nav').css({
            transition: 'all .3s ease-in-out',
            'padding-left': '15.9rem'
          });
          $('.fixed-sn main, .fixed-sn footer').css({
            transition: 'all .3s ease-in-out',
            'padding-left': '15rem'
          });
        } else {
          _this7.$menu.addClass('slim');

          $('.sv-slim-icon').removeClass('fa-angle-double-left').addClass('fa-angle-double-right');
          $('.fixed-sn .double-nav').css('padding-left', '4.6rem');
          $('.fixed-sn main, .fixed-sn footer').css({
            'padding-left': '3.7rem'
          });
        }
      });
    };

    _proto.touchmoveEventHandler = function touchmoveEventHandler(e) {
      if (e.type !== 'touchmove') {
        return;
      }

      var _e$touches = e.touches,
          touch = _e$touches[0];
      var touchX = touch.clientX; // calculate velocity every 20ms

      if (Date.now() - this.lastTouchVelocity.x.startTime > 20) {
        this.lastTouchVelocity.x.startPosition = touch.clientX;
        this.lastTouchVelocity.x.startTime = Date.now();
      }

      this.disableScrolling();
      var overlayExists = this.$sidenavOverlay.length !== 0;

      if (!overlayExists) {
        this.buildSidenavOverlay();
      } // Keep within boundaries


      if (this.options.edge === 'left') {
        if (touchX > this.options.menuWidth) {
          touchX = this.options.menuWidth;
        } else if (touchX < 0) {
          touchX = 0;
        }
      }

      this.translateSidenavX(touchX);
      this.updateOverlayOpacity(touchX);
    };

    _proto.calculateTouchVelocityX = function calculateTouchVelocityX() {
      var distance = Math.abs(this.lastTouchVelocity.x.endPosition - this.lastTouchVelocity.x.startPosition);
      var time = Math.abs(this.lastTouchVelocity.x.endTime - this.lastTouchVelocity.x.startTime);
      return distance / time;
    };

    _proto.touchendEventHandler = function touchendEventHandler(e) {
      if (e.type !== 'touchend') {
        return;
      }

      var touch = e.changedTouches[0];
      this.lastTouchVelocity.x.endTime = Date.now();
      this.lastTouchVelocity.x.endPosition = touch.clientX;
      var velocityX = this.calculateTouchVelocityX();
      var touchX = touch.clientX;
      var leftPos = touchX - this.options.menuWidth;
      var rightPos = touchX - this.options.menuWidth / 2;

      if (leftPos > 0) {
        leftPos = 0;
      }

      if (rightPos < 0) {
        rightPos = 0;
      }

      if (this.options.edge === 'left') {
        // If velocityX <= 0.3 then the user is flinging the menu closed so ignore this.menuOut
        if (this.menuOut || velocityX <= this.settings.menuLeftMinBorder || velocityX < this.options.menuLeftMaxBorder) {
          if (leftPos !== 0) {
            this.translateMenuX([0, leftPos], '300');
          }

          this.showSidenavOverlay();
        } else if (!this.menuOut || velocityX > this.settings.menuLeftMinBorder) {
          this.enableScrolling();
          this.translateMenuX([-1 * this.options.menuWidth - this.options.menuVelocityOffset, leftPos], '200');
          this.hideSidenavOverlay();
        }

        this.$dragTarget.css({
          width: '10px',
          right: '',
          left: 0
        });
      } else if (this.menuOut && velocityX >= this.settings.menuRightMinBorder || velocityX > this.settings.menuRightMaxBorder) {
        this.translateMenuX([0, rightPos], '300');
        this.showSidenavOverlay();
        this.$dragTarget.css({
          width: '50%',
          right: '',
          left: 0
        });
      } else if (!this.menuOut || velocityX < this.settings.menuRightMinBorder) {
        this.enableScrolling();
        this.translateMenuX([this.options.menuWidth + this.options.menuVelocityOffset, rightPos], '200');
        this.hideSidenavOverlay();
        this.$dragTarget.css({
          width: '10px',
          right: 0,
          left: ''
        });
      }
    };

    _proto.buildSidenavOverlay = function buildSidenavOverlay() {
      var _this8 = this;

      if (this.options.showOverlay === true) {
        this.$sidenavOverlay = $('<div id="sidenav-overlay"></div>');
        this.$sidenavOverlay.css('opacity', 0).on('click', function () {
          return _this8.removeMenu();
        });
        this.$body.append(this.$sidenavOverlay);
      }
    };

    _proto.disableScrolling = function disableScrolling() {
      var oldWidth = this.$body.innerWidth();
      this.$body.css('overflow', 'hidden');
      this.$body.width(oldWidth);
    };

    _proto.enableScrolling = function enableScrolling() {
      this.$body.css({
        overflow: '',
        width: ''
      });
    };

    _proto.translateMenuX = function translateMenuX(fromTo, duration) {
      this.$menu.velocity({
        translateX: fromTo
      }, {
        duration: typeof duration === 'string' ? Number(duration) : duration,
        queue: false,
        easing: this.options.easingOpen
      });
    };

    _proto.translateSidenavX = function translateSidenavX(touchX) {
      if (this.options.edge === 'left') {
        var isRightDirection = touchX >= this.options.menuWidth / 2;
        this.menuOut = isRightDirection;
        this.$menu.css('transform', "translateX(" + (touchX - this.options.menuWidth) + "px)");
      } else {
        var isLeftDirection = touchX < window.innerWidth - this.options.menuWidth / 2;
        this.menuOut = isLeftDirection;
        var rightPos = touchX - this.options.menuWidth / 2;

        if (rightPos < 0) {
          rightPos = 0;
        }

        this.$menu.css('transform', "translateX(" + rightPos + "px)");
      }
    };

    _proto.updateOverlayOpacity = function updateOverlayOpacity(touchX) {
      var overlayPercentage;

      if (this.options.edge === 'left') {
        overlayPercentage = touchX / this.options.menuWidth;
      } else {
        overlayPercentage = Math.abs((touchX - window.innerWidth) / this.options.menuWidth);
      }

      this.$sidenavOverlay.velocity({
        opacity: overlayPercentage
      }, {
        duration: 10,
        queue: false,
        easing: this.options.easingOpen
      });
    };

    _proto.showSidenavOverlay = function showSidenavOverlay() {
      if (this.options.showOverlay === true && !$('#sidenav-overlay').length) {
        this.buildSidenavOverlay();
      }

      this.$sidenavOverlay.velocity({
        opacity: 1
      }, {
        duration: this.options.timeDurationOverlayOpen,
        queue: false,
        easing: this.options.easingOpen
      });
    };

    _proto.hideSidenavOverlay = function hideSidenavOverlay() {
      this.$sidenavOverlay.velocity({
        opacity: 0
      }, {
        duration: this.options.timeDurationOverlayClose,
        queue: false,
        easing: this.options.easingOpen,
        complete: function complete() {
          $(this).remove();
        }
      });
    };

    return SideNav;
  }();

  $.fn.sideNav = function (options) {
    $(this).each(function () {
      var sidenav = new SideNav($(this), options);
      sidenav.init();
    });
  };

  $('.side-nav').on('touchmove', function (e) {
    e.stopPropagation();
  }, false);
});