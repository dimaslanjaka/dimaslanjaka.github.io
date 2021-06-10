function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jQuery(function ($) {
  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown($activator, options) {
      if (options === void 0) {
        options = {};
      }

      this.$activator = $activator;
      this.$activates = $("#" + $activator.attr('data-activates'));
      /* eslint-disable newline-per-chained-call */

      this.options = {
        inDuration: this.fallback().or($activator.data('induration')).or($activator.attr('data-in-duration')).or(options.inDuration).or(300).value(),
        outDuration: this.fallback().or($activator.data('outduration')).or($activator.attr('data-out-duration')).or(options.outDuration).or(225).value(),
        easingEffectIn: this.fallback().or($activator.data('easingeffectin')).or($activator.attr('data-easing-effect-in')).or(options.easingEffectIn).or('easeOutCubic').value(),
        easingEffectOut: this.fallback().or($activator.data('easingeffectout')).or($activator.attr('data-easing-effect-out')).or(options.easingEffectOut).or('swing').value(),
        constrainWidth: this.fallback().or($activator.data('constrainwidth')).or($activator.attr('data-constrain-width')).or(options.constrainWidth).or(true).value(),
        hover: this.fallback().or($activator.data('hover')).or($activator.attr('data-hover')).or(options.hover).or(false).value(),
        gutter: this.fallback().or($activator.data('gutter')).or($activator.attr('data-gutter')).or(options.gutter).or(0).value(),
        belowOrigin: this.fallback().or($activator.data('beloworigin')).or($activator.attr('data-below-origin')).or(options.belowOrigin).or(false).value(),
        alignment: this.fallback().or($activator.data('alignment')).or($activator.attr('data-alignment')).or(options.alignment).or('left').value(),
        maxHeight: this.fallback().or($activator.data('maxheight')).or($activator.attr('data-max-height')).or(options.maxHeight).or('').value(),
        resetScroll: this.fallback().or($activator.data('resetscroll')).or($activator.attr('data-reset-scroll')).or(options.resetScroll).or(true).value()
      };
      /* eslint-enable newline-per-chained-call */

      this.isFocused = false;
    }

    Dropdown.mdbDropdownAutoInit = function mdbDropdownAutoInit() {
      $('.dropdown-button').dropdown();
      this.bindMultiLevelDropdownEvents();
      this.bindBootstrapEvents();
    };

    Dropdown.bindMultiLevelDropdownEvents = function bindMultiLevelDropdownEvents() {
      var $multiLevelDropdown = $('.multi-level-dropdown');
      $multiLevelDropdown.find('.dropdown-submenu > a').on('mouseenter', function (e) {
        var $submenu = $(this);
        $multiLevelDropdown.find('.dropdown-submenu .dropdown-menu').removeClass('show');
        $submenu.next('.dropdown-menu').addClass('show');
        e.stopPropagation();
      });
      $multiLevelDropdown.find('.dropdown').on('hidden.bs.dropdown', function () {
        $multiLevelDropdown.find('.dropdown-menu.show').removeClass('show');
      });
    };

    Dropdown.bindBootstrapEvents = function bindBootstrapEvents() {
      var _this = this;

      var $dropdowns = $('.dropdown, .dropup');
      $dropdowns.on({
        'show.bs.dropdown': function showBsDropdown(e) {
          var $dropdown = $(e.target);

          var effects = _this._getDropdownEffects($dropdown);

          _this._dropdownEffectStart($dropdown, effects.effectIn);
        },
        'shown.bs.dropdown': function shownBsDropdown(e) {
          var $dropdown = $(e.target);

          var effects = _this._getDropdownEffects($dropdown);

          if (effects.effectIn && effects.effectOut) {
            _this._dropdownEffectEnd($dropdown, effects);
          }
        },
        'hide.bs.dropdown': function hideBsDropdown(e) {
          var $dropdown = $(e.target);

          var effects = _this._getDropdownEffects($dropdown);

          if (effects.effectOut) {
            e.preventDefault();

            _this._dropdownEffectStart($dropdown, effects.effectOut);

            _this._dropdownEffectEnd($dropdown, effects, function () {
              $dropdown.removeClass('show');
              $dropdown.find('.dropdown-menu').removeClass('show');
            });
          }
        }
      });
    };

    Dropdown._getDropdownEffects = function _getDropdownEffects($dropdown) {
      var defaultInEffect = 'fadeIn';
      var defaultOutEffect = 'fadeOut';
      var $dropdownMenu = $dropdown.find('.dropdown-menu');
      var $parentUl = $dropdown.parents('ul.nav');

      if ($parentUl.height > 0) {
        defaultInEffect = $parentUl.data('dropdown-in') || null;
        defaultOutEffect = $parentUl.data('dropdown-out') || null;
      }

      return {
        effectIn: $dropdownMenu.data('dropdown-in') || defaultInEffect,
        effectOut: $dropdownMenu.data('dropdown-out') || defaultOutEffect
      };
    };

    Dropdown._dropdownEffectStart = function _dropdownEffectStart($dropdown, effectToStart) {
      if (effectToStart) {
        $dropdown.addClass('dropdown-animating');
        $dropdown.find('.dropdown-menu').addClass(['animated', effectToStart].join(' '));
      }
    };

    Dropdown._dropdownEffectEnd = function _dropdownEffectEnd($dropdown, effects, callback) {
      $dropdown.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $dropdown.removeClass('dropdown-animating');
        $dropdown.find('.dropdown-menu').removeClass(['animated', effects.effectIn, effects.effectOut].join(' '));

        if (typeof callback === 'function') {
          callback();
        }
      });
    };

    var _proto = Dropdown.prototype;

    _proto.returnPublicInterface = function returnPublicInterface() {
      return {
        $activator: this.$activator,
        $activates: this.$activates,
        updatePosition: this.updatePosition.bind(this)
      };
    };

    _proto.init = function init() {
      this.appendDropdownToActivator();

      if (this.options.hover) {
        this.handleHoverableDropdown();
      } else {
        this.handleClickableDropdown();
      }

      this.bindEvents();
    };

    _proto.appendDropdownToActivator = function appendDropdownToActivator() {
      this.$activator.after(this.$activates);
    };

    _proto.handleHoverableDropdown = function handleHoverableDropdown() {
      var _this2 = this;

      var opened = false;
      this.$activator.unbind("click." + this.$activator.attr('id'));
      this.$activator.on('mouseenter', function () {
        if (opened === false) {
          _this2.placeDropdown();

          opened = true;
        }
      });
      this.$activator.on('mouseleave', function (e) {
        var toEl = e.toElement || e.relatedTarget;
        var mouseHoversDropdown = $(toEl).closest('.dropdown-content').is(_this2.$activates);

        if (!mouseHoversDropdown) {
          _this2.$activates.stop(true, true);

          _this2.hideDropdown();

          opened = false;
        }
      });
      this.$activates.on('mouseleave', function (e) {
        var toEl = e.toElement || e.relatedTarget;
        var mouseHoversActivator = $(toEl).closest('.dropdown-button').is(_this2.$activator);

        if (!mouseHoversActivator) {
          _this2.$activates.stop(true, true);

          _this2.hideDropdown();

          opened = false;
        }
      });
    };

    _proto.handleClickableDropdown = function handleClickableDropdown() {
      var _this3 = this;

      this.$activator.unbind("click." + this.$activator.attr('id'));
      this.$activator.bind("click." + this.$activator.attr('id'), function (e) {
        if (_this3.isFocused) {
          return;
        }

        var activatorClicked = _this3.$activator.get(0) === e.currentTarget;

        var activatorActive = _this3.$activator.hasClass('active');

        var dropdownContentClicked = $(e.target).closest('.dropdown-content').length !== 0;

        if (activatorClicked && !activatorActive && !dropdownContentClicked) {
          e.preventDefault();

          _this3.placeDropdown('click');
        } else if (activatorActive) {
          _this3.hideDropdown();

          $(document).unbind("click." + _this3.$activates.attr('id') + " touchstart." + _this3.$activates.attr('id'));
        }

        if (_this3.$activates.hasClass('active')) {
          $(document).bind("click." + _this3.$activates.attr('id') + " touchstart." + _this3.$activates.attr('id'), function (e) {
            var clickedOutsideDropdown = !_this3.$activates.is(e.target) && !_this3.$activator.is(e.target) && !_this3.$activator.find(e.target).length;

            if (clickedOutsideDropdown) {
              _this3.hideDropdown();

              $(document).unbind("click." + _this3.$activates.attr('id') + " touchstart." + _this3.$activates.attr('id'));
            }
          });
        }
      });
    };

    _proto.bindEvents = function bindEvents() {
      var _this4 = this;

      this.$activator.on('open', function (e, eventType) {
        _this4.placeDropdown(eventType);
      });
      this.$activator.on('close', this.hideDropdown.bind(this));
    };

    _proto.placeDropdown = function placeDropdown(eventType) {
      if (eventType === 'focus') {
        this.isFocused = true;
      }

      this.$activates.addClass('active');
      this.$activator.addClass('active');

      if (this.options.constrainWidth === true) {
        this.$activates.css('width', this.$activator.outerWidth());
      } else {
        this.$activates.css('white-space', 'nowrap');
      }

      this.updatePosition();
      this.showDropdown();
    };

    _proto.showDropdown = function showDropdown() {
      this.$activates.stop(true, true).css('opacity', 0).slideDown({
        queue: false,
        duration: this.options.inDuration,
        easing: this.options.easingEffectIn,
        complete: function complete() {
          $(this).css('height', '');
        }
      }).animate(_objectSpread({
        opacity: 1
      }, this.options.resetScroll && {
        scrollTop: 0
      }), {
        queue: false,
        duration: this.options.inDuration,
        easing: 'easeOutSine'
      });
    };

    _proto.hideDropdown = function hideDropdown() {
      var _this5 = this;

      this.isFocused = false;
      this.$activates.fadeOut({
        durations: this.options.outDuration,
        easing: this.options.easingEffectOut
      });
      this.$activates.removeClass('active');
      this.$activator.removeClass('active');
      setTimeout(function () {
        _this5.$activates.css('max-height', _this5.options.maxHeight);
      }, this.options.outDuration);
    };

    _proto.updatePosition = function updatePosition() {
      var windowHeight = window.innerHeight;
      var originHeight = this.$activator.innerHeight();
      var offsetTop = this.$activator.offset().top - $(window).scrollTop();

      var currAlignment = this._getHorizontalAlignment();

      var gutterSpacing = 0;
      var leftPosition = 0;
      var $wrapper = this.$activator.parent();
      var verticalOffset = this.options.belowOrigin ? originHeight : 0;
      var scrollOffset = !$wrapper.is('body') && $wrapper.get(0).scrollHeight > $wrapper.get(0).clientHeight ? $wrapper.get(0).scrollTop : 0;
      var doesNotFitFromBottom = offsetTop + this.$activates.innerHeight() > windowHeight;
      var doesNotFitFromTop = offsetTop + originHeight - this.$activates.innerHeight() < 0;

      if (doesNotFitFromBottom && doesNotFitFromTop) {
        var adjustedHeight = windowHeight - offsetTop - verticalOffset;
        this.$activates.css('max-height', adjustedHeight);
      } else if (doesNotFitFromBottom) {
        if (!verticalOffset) {
          verticalOffset += originHeight;
        }

        verticalOffset -= this.$activates.innerHeight();
      }

      if (currAlignment === 'left') {
        gutterSpacing = this.options.gutter;
        leftPosition = this.$activator.position().left + gutterSpacing;
      } else if (currAlignment === 'right') {
        var offsetRight = this.$activator.position().left + this.$activator.outerWidth() - this.$activates.outerWidth();
        gutterSpacing = -this.options.gutter;
        leftPosition = offsetRight + gutterSpacing;
      }

      this.$activates.css({
        position: 'absolute',
        top: this.$activator.position().top + verticalOffset + scrollOffset,
        left: leftPosition
      });
    };

    _proto._getHorizontalAlignment = function _getHorizontalAlignment() {
      var offsetLeft = this.$activator.offset().left;

      if (offsetLeft + this.$activates.innerWidth() > $(window).width()) {
        return 'right';
      } else if (offsetLeft - this.$activates.innerWidth() + this.$activator.innerWidth() < 0) {
        return 'left';
      }

      return this.options.alignment;
    };

    _proto.fallback = function fallback() {
      return {
        _value: undefined,
        or: function or(value) {
          if (typeof value !== 'undefined' && typeof this._value === 'undefined') {
            this._value = value;
          }

          return this;
        },
        value: function value() {
          return this._value;
        }
      };
    };

    return Dropdown;
  }();

  $.fn.scrollTo = function (elem) {
    this.scrollTop(this.scrollTop() - this.offset().top + $(elem).offset().top);
    return this;
  };

  $.fn.dropdown = function (options) {
    if (this.length > 1) {
      var instances = [];
      this.each(function () {
        var dropdown = new Dropdown(this, options);
        dropdown.init();
        instances.push(dropdown.returnPublicInterface());
      });
      return instances;
    }

    var dropdown = new Dropdown(this, options);
    dropdown.init();
    return dropdown.returnPublicInterface();
  };

  Dropdown.mdbDropdownAutoInit();
});