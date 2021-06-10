jQuery(function ($) {
  var Sticky =
  /*#__PURE__*/
  function () {
    function Sticky(element, options) {
      this.defaults = {
        topSpacing: 0,
        zIndex: false,
        stopper: '#footer',
        stickyClass: false,
        startScrolling: 'top',
        minWidth: false
      };
      this.$element = element;
      this.options = this.assignOptions(options);
      this.$window = $(window);
      this.stopper = this.options.stopper;
      this.elementWidth = this.$element.outerWidth();
      this.elementHeight = this.$element.outerHeight(true);
      this.initialScrollTop = this.$element.offset().top;
      this.$placeholder = $('<div class="sticky-placeholder"></div>');
      this.scrollTop = 0;
      this.setPushPoint();
      this.setStopperPosition();
      this.bindEvents();
    }

    var _proto = Sticky.prototype;

    _proto.hasZIndex = function hasZIndex() {
      return typeof this.options.zIndex === 'number';
    };

    _proto.hasStopper = function hasStopper() {
      return $(this.options.stopper).length || typeof this.options.stopper === 'number';
    };

    _proto.isScreenHeightEnough = function isScreenHeightEnough() {
      return this.$element.outerHeight() + this.options.topSpacing < this.$window.height();
    };

    _proto.assignOptions = function assignOptions(options) {
      return $.extend({}, this.defaults, options);
    };

    _proto.setPushPoint = function setPushPoint() {
      if (this.options.startScrolling === 'bottom' && !this.isScreenHeightEnough()) {
        this.$pushPoint = this.initialScrollTop + this.$element.outerHeight(true) - this.$window.height();
      } else {
        this.$pushPoint = this.initialScrollTop - this.options.topSpacing;
      }
    };

    _proto.setStopperPosition = function setStopperPosition() {
      if (typeof this.options.stopper === 'string') {
        this.stopPoint = $(this.stopper).offset().top - this.options.topSpacing;
      } else if (typeof this.options.stopper === 'number') {
        this.stopPoint = this.options.stopper;
      }
    };

    _proto.bindEvents = function bindEvents() {
      this.$window.on('resize', this.handleResize.bind(this));
      this.$window.on('scroll', this.init.bind(this));
    };

    _proto.handleResize = function handleResize() {
      var $parent = this.$element.parent();
      this.elementWidth = $parent.width();
      this.elementHeight = this.$element.outerHeight(true);
      this.setPushPoint();
      this.setStopperPosition();
      this.init();
    } // eslint-disable-next-line consistent-return
    ;

    _proto.init = function init() {
      if (this.options.minWidth && this.options.minWidth > this.$window.innerWidth()) {
        return false;
      }

      if (this.options.startScrolling === 'bottom' && !this.isScreenHeightEnough()) {
        this.scrollTop = this.$window.scrollTop() + this.$window.height();
      } else {
        this.scrollTop = this.$window.scrollTop();
      }

      if (this.$pushPoint < this.scrollTop) {
        this.appendPlaceholder();
        this.stickyStart();
      } else {
        this.stickyEnd();
      }

      if (this.$window.scrollTop() > this.$pushPoint) {
        this.stop();
      } else {
        this.stickyEnd();
      }
    };

    _proto.appendPlaceholder = function appendPlaceholder() {
      this.$element.after(this.$placeholder);
      this.$placeholder.css({
        width: this.elementWidth,
        height: this.elementHeight
      });
    };

    _proto.stickyStart = function stickyStart() {
      if (this.options.stickyClass) {
        this.$element.addClass(this.options.stickyClass);
      } // @see: https://stackoverflow.com/a/4370047


      this.$element.get(0).style.overflow = 'scroll';
      var scrollHeight = this.$element.get(0).scrollHeight;
      this.$element.get(0).style.overflow = '';
      this.$element.css({
        position: 'fixed',
        width: this.elementWidth,
        height: scrollHeight
      });

      if (this.options.startScrolling === 'bottom' && !this.isScreenHeightEnough()) {
        this.$element.css({
          bottom: 0,
          top: ''
        });
      } else {
        this.$element.css({
          top: this.options.topSpacing
        });
      }

      if (this.hasZIndex()) {
        this.$element.css({
          zIndex: this.options.zIndex
        });
      }
    };

    _proto.stickyEnd = function stickyEnd() {
      if (this.options.stickyClass) {
        this.$element.removeClass(this.options.stickyClass);
      }

      this.$placeholder.remove();
      this.$element.css({
        position: 'static',
        top: this.options.topSpacing,
        width: '',
        height: ''
      });
    };

    _proto.stop = function stop() {
      if (this.stopPoint < $(this.$element).offset().top + this.$element.outerHeight(true)) {
        this.$element.css({
          position: 'absolute',
          bottom: 0,
          top: ''
        });
      }
    };

    return Sticky;
  }();

  $.fn.sticky = function (options) {
    $(this).each(function () {
      var sticky = new Sticky($(this), options);
      sticky.init();
    });
  };
});