function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

jQuery(function ($) {
  $(document).on('click', '.chip .close', function () {
    var $this = $(this);

    if ($this.closest('.chips').data('initialized')) {
      return;
    }

    $this.closest('.chip').remove();
  });

  var MaterialChips =
  /*#__PURE__*/
  function () {
    function MaterialChips($chipsWrapper, options) {
      if (options === void 0) {
        options = {};
      }

      this.$chipsWrapper = $chipsWrapper;
      this.options = typeof options === 'string' ? options : {
        data: this.fallback().or(options.data).or([]).value(),
        // @type { tag: string, image?: string, id?: number }[]
        dataChip: this.fallback().or(options.dataChip).or([]).value(),
        // autocomplete data; @type string[]
        placeholder: this.fallback().or($chipsWrapper.attr('data-placeholder')).or(options.placeholder).or('').value(),
        secondaryPlaceholder: this.fallback().or($chipsWrapper.attr('data-secondary-placeholder')).or(options.secondaryPlaceholder).or('').value(),
        sortAutocompleteData: this.fallback().or($chipsWrapper.attr('data-sort-autocomplete-data')).or(options.sortAutocompleteData).or(true).value(),
        autocompleteDataCompareFn: this.fallback().or(options.autocompleteDataCompareFn).or(undefined).value()
      };
      this.$autocompleteList = $('<ul class="chip-ul z-depth-1" tabindex="0"></ul>');
      this.keyCodes = {
        backspace: 8,
        enter: 13,
        arrowLeft: 37,
        arrowRight: 39,
        delete: 46,
        comma: 188
      };
    }

    var _proto = MaterialChips.prototype;

    _proto.getSelectedChip = function getSelectedChip() {
      return this.$chipsWrapper.find('.chip.selected');
    };

    _proto.returnPublicInterface = function returnPublicInterface() {
      if (this.options === 'data') {
        return this.$chipsWrapper.data('chips');
      }

      if (this.options === 'options') {
        return this.$chipsWrapper.data('options');
      }

      return this.$chipsWrapper;
    };

    _proto.init = function init() {
      if (this.isPublicInterfaceCall) {
        return;
      }

      this.assignOptions();

      if (this.isInitialized) {
        return;
      }

      this.$chipsWrapper.data({
        chips: this.options.data.slice(),
        index: this.$chipsWrapper.index(),
        initialized: true
      });
      this.$chipsWrapper.attr('tabindex', 0);

      if (!this.$chipsWrapper.hasClass('.chips')) {
        this.$chipsWrapper.addClass('chips');
      }

      this.renderChips();
      this.bindEvents();
    };

    _proto.assignOptions = function assignOptions() {
      if (!Array.isArray(this.options.data)) {
        this.options.data = [];
      }

      this.$chipsWrapper.data('options', Object.assign({}, this.options));
    };

    _proto.bindEvents = function bindEvents() {
      this.bindChipsWrapperClick();
      this.bindChipsWrapperBlur();
      this.bindSingleChipClick();
      this.bindChipsWrapperKeydown();
      this.bindChipsInputClick();
      this.bindChipsInputFocusout();
      this.bindChipsInputKeydown();
      this.bindDeleteButtonClick();
      this.bindAutocompleteInputKeyup();
      this.bindAutocompleteOptionClick();
    };

    _proto.bindChipsWrapperClick = function bindChipsWrapperClick() {
      this.$chipsWrapper.on('click', function (e) {
        return $(e.target).find('input').focus().addClass('active');
      });
    };

    _proto.bindChipsWrapperBlur = function bindChipsWrapperBlur() {
      var _this = this;

      this.$chipsWrapper.on('blur', function (e) {
        setTimeout(function () {
          return _this.$autocompleteList.removeClass('active').hide();
        }, 100);
        $(e.target).removeClass('active');

        _this.getSelectedChip().removeClass('selected');
      });
    };

    _proto.bindSingleChipClick = function bindSingleChipClick() {
      var _this2 = this;

      this.$chipsWrapper.on('click', '.chip', function (e) {
        var $this = $(e.target);

        _this2.$chipsWrapper.find('.chip.selected').not($this).removeClass('selected');

        $this.toggleClass('selected');
      });
    };

    _proto.bindChipsWrapperKeydown = function bindChipsWrapperKeydown() {
      var _this3 = this;

      this.$chipsWrapper.on('keydown', function (e) {
        var backspacePressed = e.which === _this3.keyCodes.backspace;
        var deletePressed = e.which === _this3.keyCodes.delete;
        var leftArrowPressed = e.which === _this3.keyCodes.arrowLeft;
        var rightArrowPressed = e.which === _this3.keyCodes.arrowRight;

        if ((backspacePressed || deletePressed) && _this3.getSelectedChip().length) {
          e.preventDefault();

          var nextIndex = _this3.deleteSelectedChip();

          _this3.selectChip(nextIndex);
        } else if (leftArrowPressed) {
          _this3.selectLeftChip();
        } else if (rightArrowPressed) {
          _this3.selectRightChip();
        }
      });
    };

    _proto.bindChipsInputClick = function bindChipsInputClick() {
      var _this4 = this;

      var $chipsInput = this.$chipsWrapper.find('input');
      $chipsInput.on('click', function (e) {
        var $target = $(e.target);
        $target.addClass('active');

        _this4.$chipsWrapper.addClass('focus');

        _this4.$chipsWrapper.find('.chip').removeClass('selected');
      });
    };

    _proto.bindChipsInputFocusout = function bindChipsInputFocusout() {
      var _this5 = this;

      this.$chipsWrapper.on('focusout', 'input', function () {
        return _this5.$chipsWrapper.removeClass('focus');
      });
    };

    _proto.bindChipsInputKeydown = function bindChipsInputKeydown() {
      var _this6 = this;

      this.$chipsWrapper.on('keydown', 'input', function (e) {
        var $chipsInput = $(e.target);
        var enterPressed = e.which === _this6.keyCodes.enter;
        var commaPressed = e.which === _this6.keyCodes.comma;
        var backspacePressed = e.which === _this6.keyCodes.backspace;

        if ((enterPressed || commaPressed) && !_this6.$autocompleteList.find('li').hasClass('selected')) {
          e.preventDefault();

          _this6.addChip({
            tag: $chipsInput.val()
          });

          $chipsInput.val('');
          return;
        }

        var isInputEmpty = $chipsInput.val() === '';

        if (isInputEmpty && backspacePressed && !_this6.$chipsWrapper.find('.chip').hasClass('selected')) {
          var lastChipIndex = _this6.$chipsWrapper.find('.chip-position-wrapper .chip').last().index();

          _this6.deleteChip(lastChipIndex);
        }
      });
    };

    _proto.bindDeleteButtonClick = function bindDeleteButtonClick() {
      var _this7 = this;

      this.$chipsWrapper.on('click', '.chip i.close', function (e) {
        var $deleteButton = $(e.target);
        var chipIndex = $deleteButton.closest('.chip').index();

        _this7.deleteChip(chipIndex);

        _this7.$chipsWrapper.find('input').focus();
      });
    };

    _proto.bindAutocompleteInputKeyup = function bindAutocompleteInputKeyup() {
      var _this8 = this;

      var $input = this.$chipsWrapper.find('.chip-position-wrapper').find('input');
      $input.on('keyup', function (e) {
        var $inputValue = $input.val();

        _this8.$autocompleteList.empty();

        if ($inputValue.length) {
          _this8.options.dataChip.forEach(function (item) {
            if (item.toLowerCase().includes($inputValue.toLowerCase())) {
              _this8.$chipsWrapper.find('.chip-position-wrapper').append(_this8.$autocompleteList.append($("<li>" + item + "</li>")));
            }
          });

          _this8.$autocompleteList.addClass('active').show();
        } else {
          _this8.$autocompleteList.removeClass('active').hide();
        }

        var enterPressed = e.which === _this8.keyCodes.enter;
        var commaPressed = e.which === _this8.keyCodes.comma;

        var lastChipText = _this8.$chipsWrapper.find('.chip-position-wrapper .chip').last().text();

        if ((enterPressed || commaPressed) && !_this8.options.dataChip.includes(lastChipText)) {
          _this8.options.dataChip.push(lastChipText);

          if (_this8.options.sortAutocompleteData) {
            _this8.options.dataChip.sort(_this8.options.autocompleteDataCompareFn);
          }
        } else if (enterPressed || commaPressed) {
          _this8.$autocompleteList.remove();
        }
      });
    };

    _proto.bindAutocompleteOptionClick = function bindAutocompleteOptionClick() {
      var _this9 = this;

      this.$chipsWrapper.on('click', 'li', function (e) {
        e.preventDefault();
        var $li = $(e.target);

        _this9.addChip({
          tag: $li.text()
        });

        _this9.$chipsWrapper.find('.chip-position-wrapper').find('input').val('');

        _this9.$autocompleteList.remove();
      });
    };

    _proto.deleteSelectedChip = function deleteSelectedChip() {
      var $selectedChip = this.getSelectedChip();
      var siblingsLength = $selectedChip.siblings('.chip').length;
      var chipIndex = $selectedChip.index();
      this.deleteChip(chipIndex);
      var selectIndex = -1;

      if (chipIndex < siblingsLength - 1) {
        selectIndex = chipIndex;
      } else if (chipIndex === siblingsLength || chipIndex === siblingsLength - 1) {
        selectIndex = siblingsLength - 1;
      }

      if (!siblingsLength) {
        this.$chipsWrapper.find('input').focus();
      }

      return selectIndex;
    };

    _proto.selectLeftChip = function selectLeftChip() {
      this.selectLeftRightChip(true);
    };

    _proto.selectRightChip = function selectRightChip() {
      this.selectLeftRightChip(false);
    };

    _proto.selectLeftRightChip = function selectLeftRightChip(left) {
      var $selectedChip = this.getSelectedChip();
      var currentIndex = $selectedChip.index();
      var siblingsLength = $selectedChip.siblings('.chip').length;
      var chipIndex = left ? currentIndex - 1 : currentIndex + 1;

      if (left && chipIndex < 0) {
        chipIndex = this.$chipsWrapper.find('.chip').length - 1;
      } else if (!left && chipIndex > siblingsLength) {
        this.$chipsWrapper.find('input').focus();
        return;
      }

      this.$chipsWrapper.find('.chip').removeClass('selected');
      this.selectChip(chipIndex);
    };

    _proto.renderChips = function renderChips() {
      var _this10 = this;

      var html = '';
      this.$chipsWrapper.data('chips').forEach(function (elem) {
        html += _this10.getSingleChipTemplate(elem);
      });

      if (this.$chipsWrapper.hasClass('chips-autocomplete')) {
        html += '<span class="chip-position-wrapper position-relative"><input class="input" placeholder=""></span>';
      } else {
        html += '<input class="input" placeholder="">';
      }

      this.$chipsWrapper.html(html);
      this.setPlaceholder();
    };

    _proto.getSingleChipTemplate = function getSingleChipTemplate(chip) {
      if (!chip.tag) {
        return '';
      }

      var html = "<div class=\"chip\">" + chip.tag;

      if (chip.image) {
        html += " <img src=\"" + chip.image + "\" /> ";
      }

      html += '<i class="close fas fa-times"></i>';
      html += '</div>';
      return html;
    };

    _proto.setPlaceholder = function setPlaceholder() {
      this.$chipsWrapper.find('input').prop('placeholder', this.options.data.length ? this.options.placeholder : this.options.secondaryPlaceholder);
    };

    _proto.addChip = function addChip(chip) {
      if (!this.isValid(chip)) {
        return;
      }

      var $newChip = $(this.getSingleChipTemplate(chip));
      this.$chipsWrapper.data('chips').push(chip);
      this.options.data.push(chip);

      if (this.$chipsWrapper.hasClass('chips-autocomplete') && this.$chipsWrapper.find('.chip').length > 0) {
        $newChip.insertAfter(this.$chipsWrapper.find('.chip').last());
      } else {
        $newChip.insertBefore(this.$chipsWrapper.find('input'));
      }

      this.$chipsWrapper.trigger('chip.add', chip);
      this.setPlaceholder();
    };

    _proto.isValid = function isValid(chip) {
      return chip.tag !== '' && !this.options.data.some(function (c) {
        return c.tag === chip.tag;
      });
    };

    _proto.deleteChip = function deleteChip(chipIndex) {
      var chip = this.$chipsWrapper.data('chips')[chipIndex];
      this.$chipsWrapper.find('.chip').eq(chipIndex).remove();
      this.$chipsWrapper.data('chips').splice(chipIndex, 1);
      this.options.data.splice(chipIndex, 1);
      this.$chipsWrapper.trigger('chip.delete', chip);
      this.setPlaceholder();
    };

    _proto.selectChip = function selectChip(chipIndex) {
      var $chip = this.$chipsWrapper.find('.chip').eq(chipIndex);

      if ($chip && !$chip.hasClass('selected')) {
        $chip.addClass('selected');
        this.$chipsWrapper.trigger('chip.select', this.$chipsWrapper.data('chips')[chipIndex]);
      }
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

    _createClass(MaterialChips, [{
      key: "isPublicInterfaceCall",
      get: function get() {
        return typeof this.options === 'string';
      }
    }, {
      key: "isInitialized",
      get: function get() {
        return this.$chipsWrapper.data('initialized');
      }
    }]);

    return MaterialChips;
  }();

  $.fn.materialChip = function (options) {
    if (this.length > 1) {
      var instances = [];
      this.each(function () {
        var materialChips = new MaterialChips($(this), options);
        materialChips.init();
        instances.push(materialChips.returnPublicInterface());
      });
      return instances;
    }

    var materialChips = new MaterialChips($(this), options);
    materialChips.init();
    return materialChips.returnPublicInterface();
  };
});