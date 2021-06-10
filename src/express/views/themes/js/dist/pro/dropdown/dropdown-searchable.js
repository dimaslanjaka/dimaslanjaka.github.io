jQuery(function ($) {
  var DropdownSearchable =
  /*#__PURE__*/
  function () {
    function DropdownSearchable($searchWrappers, options) {
      if (options === void 0) {
        options = {};
      }

      this.$searchWrappers = $searchWrappers;
      this.options = {
        color: this.fallback().or(options.color).or('#000').value(),
        backgroundColor: this.fallback().or(options.backgroundColor).or('').value(),
        fontSize: this.fallback().or(options.fontSize).or('.9rem').value(),
        fontWeight: this.fallback().or(options.fontWeight).or('400').value(),
        borderRadius: this.fallback().or(options.borderRadius).or('').value(),
        borderColor: this.fallback().or(options.borderColor).or('').value(),
        margin: this.fallback().or(options.margin).or('').value()
      };
    }

    var _proto = DropdownSearchable.prototype;

    _proto.init = function init() {
      this.bindSearchEvents();
      return this.$searchWrappers.css({
        color: this.options.color,
        backgroundColor: this.options.backgroundColor,
        fontSize: this.options.fontSize,
        fontWeight: this.options.fontWeight,
        borderRadius: this.options.borderRadius,
        borderColor: this.options.borderColor,
        margin: this.options.margin
      });
    };

    _proto.bindSearchEvents = function bindSearchEvents() {
      this.$searchWrappers.each(function () {
        var $searchInput = $(this).find('input').first();
        $searchInput.on('keyup', function () {
          var $linksInDropMenu = $searchInput.closest('div[id]').find('a, li');
          $linksInDropMenu.each(function () {
            var $this = $(this);

            if ($this.html().toLowerCase().indexOf($searchInput.val().toLowerCase()) > -1) {
              $this.css({
                display: ''
              });
            } else {
              $this.css({
                display: 'none'
              });
            }
          });
        });
      });
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

    return DropdownSearchable;
  }();

  $.fn.mdbDropSearch = function (options) {
    var dropdownSearchable = new DropdownSearchable(this, options);
    return dropdownSearchable.init();
  };
});