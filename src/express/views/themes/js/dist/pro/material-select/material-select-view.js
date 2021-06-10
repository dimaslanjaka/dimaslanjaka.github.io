function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MaterialSelectView =
/*#__PURE__*/
function () {
  // eslint-disable-next-line object-curly-newline
  function MaterialSelectView($nativeSelect, _ref) {
    var options = _ref.options,
        id = _ref.properties.id;
    this.properties = {
      id: id,
      isMultiple: Boolean($nativeSelect.attr('multiple')),
      isSearchable: Boolean($nativeSelect.attr('searchable')),
      isRequired: Boolean($nativeSelect.attr('required')),
      isEditable: Boolean($nativeSelect.attr('editable'))
    };
    this.options = this._copyOptions(options);
    this.$nativeSelect = $nativeSelect;
    this.$selectWrapper = $('<div class="select-wrapper"></div>');
    this.$materialOptionsList = $("<ul id=\"select-options-" + this.properties.id + "\" class=\"dropdown-content select-dropdown w-100 " + (this.properties.isMultiple ? 'multiple-select-dropdown' : '') + "\"></ul>");
    this.$materialSelectInitialOption = $nativeSelect.find('option:selected').text() || $nativeSelect.find('option:first').text() || '';
    this.$nativeSelectChildren = this.$nativeSelect.children('option, optgroup');
    this.$materialSelect = $("<input type=\"text\" class=\"" + (this.options.defaultMaterialInput ? 'browser-default custom-select multi-bs-select select-dropdown form-control' : 'select-dropdown form-control') + "\" " + (!this.options.validate && 'readonly="true"') + " required=\"" + (this.options.validate ? 'true' : 'false') + "\" " + (this.$nativeSelect.is(' :disabled') ? 'disabled' : '') + " data-activates=\"select-options-" + this.properties.id + "\" value=\"\"/>");
    this.$dropdownIcon = this.options.defaultMaterialInput ? '' : $('<span class="caret">&#9660;</span>');
    this.$searchInput = null;
    this.$noSearchResultsInfo = $("<li><span><i>" + this.options.labels.noSearchResults + "</i></span></li>");
    this.$toggleAll = $("<li class=\"select-toggle-all\"><span><input type=\"checkbox\" class=\"form-check-input\"><label>" + this.options.labels.selectAll + "</label></span></li>");
    this.$addOptionBtn = $('<i class="select-add-option fas fa-plus"></i>');
    this.$mainLabel = this._jQueryFallback(this.$nativeSelect.next('label.mdb-main-label'), $("label[for='" + this.properties.id + "']"));
    this.$customTemplateParts = this._jQueryFallback(this.$nativeSelect.nextUntil('select', '.mdb-select-template-part'), $("[data-mdb-select-template-part-for='" + this.properties.id + "']"));
    this.$btnSave = this.$nativeSelect.nextUntil('select', '.btn-save'); // @Depreciated

    this.$btnReset = $('<span class="reset-select-btn">&times;</span>');
    this.$validFeedback = $("<div class=\"valid-feedback\">" + this.options.labels.validFeedback + "</div>");
    this.$invalidFeedback = $("<div class=\"invalid-feedback\">" + this.options.labels.invalidFeedback + "</div>");
    this.keyCodes = {
      tab: 9,
      enter: 13,
      shift: 16,
      alt: 18,
      esc: 27,
      space: 32,
      end: 35,
      home: 36,
      arrowUp: 38,
      arrowDown: 40
    }; // eslint-disable-next-line no-undef

    this.renderer = new MaterialSelectViewRenderer(this);
    this.dropdown = null;
  }

  var _proto = MaterialSelectView.prototype;

  _proto.destroy = function destroy() {
    this.renderer.destroy();
  };

  _proto.render = function render() {
    this.renderer.render();
  };

  _proto.selectPreselectedOptions = function selectPreselectedOptions(handler) {
    var _this = this;

    if (this.isMultiple) {
      this.$nativeSelect.find('option:selected:not(:disabled)').each(function (i, element) {
        var index = element.index;

        _this.$materialOptionsList.find('li:not(.optgroup):not(.select-toggle-all)').eq(index).addClass('selected active').find(':checkbox').prop('checked', true);

        handler(index);
      });
    } else {
      var $preselectedOption = this.$nativeSelect.find('option:selected').first();
      var indexOfPreselectedOption = this.$nativeSelect.find('option').index($preselectedOption.get(0));

      if ($preselectedOption.get(0) && $preselectedOption.attr('disabled') !== 'disabled') {
        handler(indexOfPreselectedOption);
      }
    }
  };

  _proto.bindResetButtonClick = function bindResetButtonClick(handler) {
    var _this2 = this;

    this.$btnReset.on('click', function (e) {
      e.preventDefault();

      if (!_this2.$nativeSelect.find('option[value=""][selected][disabled][data-mdb-novalue]').length) {
        _this2._toggleResetButton(true);

        _this2.$materialSelect.val(_this2.isMultiple ? [] : '');

        _this2.$materialSelect.trigger('close');

        _this2.$mainLabel.removeClass('active');

        _this2.$materialOptionsList.find('li.active, li.selected').removeClass('active').removeClass('selected');

        _this2.$materialOptionsList.find('li[aria-selected="true"]').attr('aria-selected', 'false');

        _this2.$materialOptionsList.find('input[type="checkbox"]').prop('checked', false);

        handler();
      }
    });
  };

  _proto.bindAddNewOptionClick = function bindAddNewOptionClick() {
    this.$addOptionBtn.on('click', this.renderer.addNewOption.bind(this.renderer));
  };

  _proto.bindMaterialSelectFocus = function bindMaterialSelectFocus() {
    var _this3 = this;

    this.$materialSelect.on('focus', function (e) {
      var $this = $(e.target);
      $this.parent().addClass('active');

      if ($('ul.select-dropdown').not(_this3.$materialOptionsList.get(0)).is(':visible')) {
        $('input.select-dropdown').trigger('close');
      }

      _this3.$mainLabel.addClass('active');

      if (!_this3.$materialOptionsList.is(':visible')) {
        var label = $this.val();

        var $selectedOption = _this3.$materialOptionsList.find('li').filter(function () {
          return $(this).text().toLowerCase() === label.toLowerCase();
        }).get(0);

        _this3._selectSingleOption($selectedOption);
      }

      if (!_this3.isMultiple) {
        _this3.$mainLabel.addClass('active');
      }
    });
  };

  _proto.bindMaterialSelectClick = function bindMaterialSelectClick() {
    var _this4 = this;

    this.$materialSelect.on('mousedown', function (e) {
      if (e.which === 3) {
        e.preventDefault();
      }
    });
    this.$materialSelect.on('click', function (e) {
      e.stopPropagation();

      _this4.$mainLabel.addClass('active');

      _this4._updateDropdownScrollTop();
    });
  };

  _proto.bindMaterialSelectBlur = function bindMaterialSelectBlur() {
    var _this5 = this;

    this.$materialSelect.on('blur', function (e) {
      var $this = $(e.target);
      $this.parent().removeClass('active');

      if (!_this5.isMultiple && !_this5.isSearchable) {
        $this.trigger('close');
      }

      _this5.$materialOptionsList.find('li.selected').removeClass('selected');
    });
  };

  _proto.bindMaterialOptionsListTouchstart = function bindMaterialOptionsListTouchstart() {
    this.$materialOptionsList.on('touchstart', function (e) {
      return e.stopPropagation();
    });
  };

  _proto.bindMaterialSelectKeydown = function bindMaterialSelectKeydown() {
    var _this6 = this;

    // eslint-disable-next-line complexity
    this.$materialSelect.on('keydown', function (e) {
      var $this = $(e.target);
      var isTab = e.which === _this6.keyCodes.tab;
      var isArrowUp = e.which === _this6.keyCodes.arrowUp;
      var isArrowDown = e.which === _this6.keyCodes.arrowDown;
      var isEnter = e.which === _this6.keyCodes.enter;
      var isEsc = e.which === _this6.keyCodes.esc;
      var isAltWithArrowDown = isArrowDown && e.altKey;
      var isAltWithArrowUp = isArrowUp && e.altKey;
      var isHome = e.which === _this6.keyCodes.home;
      var isEnd = e.which === _this6.keyCodes.end;
      var isSpace = e.which === _this6.keyCodes.space;

      var isDropdownExpanded = _this6.$materialOptionsList.is(':visible');

      switch (true) {
        case isTab:
          return _this6._handleTabKey($this);

        case !isDropdownExpanded && (isEnter || isAltWithArrowDown):
        case _this6.isMultiple && !isDropdownExpanded && (isArrowDown || isArrowUp):
          $this.trigger('open');
          return _this6._updateDropdownScrollTop();

        case isDropdownExpanded && (isEsc || isAltWithArrowUp):
          return $this.trigger('close');

        case !isDropdownExpanded && (isArrowDown || isArrowUp):
          return _this6._handleClosedArrowUpDownKey(e.which);

        case isDropdownExpanded && (isArrowDown || isArrowUp):
          return _this6._handleArrowUpDownKey(e.which);

        case isDropdownExpanded && isHome:
          return _this6._handleHomeKey();

        case isDropdownExpanded && isEnd:
          return _this6._handleEndKey();

        case isDropdownExpanded && (isEnter || isSpace):
          return _this6._handleEnterKey($this);

        default:
          return _this6._handleLetterKey(e);
      }
    });
  };

  _proto.bindMaterialSelectDropdownToggle = function bindMaterialSelectDropdownToggle() {
    var _this7 = this;

    this.$materialSelect.on('open', function () {
      return _this7.$materialSelect.attr('aria-expanded', 'true');
    });
    this.$materialSelect.on('close', function () {
      return _this7.$materialSelect.attr('aria-expanded', 'false');
    });
  };

  _proto.bindToggleAllClick = function bindToggleAllClick(handler) {
    var _this8 = this;

    this.$toggleAll.on('click', function (e) {
      var checkbox = $(_this8.$toggleAll).find('input[type="checkbox"]').first();
      var currentState = Boolean($(checkbox).prop('checked'));
      var isToggleChecked = !currentState;
      $(checkbox).prop('checked', !currentState);

      _this8.$materialOptionsList.find('li:not(.optgroup):not(.select-toggle-all)').each(function (materialOptionIndex, materialOption) {
        var $materialOption = $(materialOption);
        var $optionCheckbox = $materialOption.find('input[type="checkbox"]');
        $materialOption.attr('aria-selected', isToggleChecked);

        if (isToggleChecked && $optionCheckbox.is(':checked') || !isToggleChecked && !$optionCheckbox.is(':checked') || $(materialOption).is(':hidden') || $(materialOption).is('.disabled')) {
          return;
        }

        $optionCheckbox.prop('checked', isToggleChecked);

        _this8.$nativeSelect.find('option').eq(materialOptionIndex).prop('selected', isToggleChecked);

        $materialOption.toggleClass('active');

        _this8._selectOption(materialOption);

        handler(materialOptionIndex);
      });

      _this8.$nativeSelect.data('stop-refresh', true);

      _this8._triggerChangeOnNativeSelect();

      _this8.$nativeSelect.removeData('stop-refresh');

      e.stopPropagation();
    });
  };

  _proto.bindMaterialOptionMousedown = function bindMaterialOptionMousedown() {
    var _this9 = this;

    this.$materialOptionsList.on('mousedown', function (e) {
      var option = e.target;
      var inModal = $('.modal-content').find(_this9.$materialOptionsList).length;

      if (inModal && option.scrollHeight > option.offsetHeight) {
        e.preventDefault();
      }
    });
  };

  _proto.bindMaterialOptionClick = function bindMaterialOptionClick(handler) {
    var _this10 = this;

    this.$materialOptionsList.find('li:not(.optgroup)').not(this.$toggleAll).each(function (materialOptionIndex, materialOption) {
      $(materialOption).on('click', function (e) {
        e.stopPropagation();

        _this10._toggleResetButton(false);

        var $this = $(materialOption);

        if ($this.hasClass('disabled') || $this.hasClass('optgroup')) {
          return;
        }

        var selected = true;

        if (_this10.isMultiple) {
          $this.find('input[type="checkbox"]').prop('checked', function (index, oldPropertyValue) {
            return !oldPropertyValue;
          });
          var hasOptgroup = Boolean(_this10.$nativeSelect.find('optgroup').length);
          var thisIndex = _this10._isToggleAllPresent() ? $this.index() - 1 : $this.index();
          /* eslint-disable max-statements-per-line */

          switch (true) {
            case _this10.isSearchable && hasOptgroup:
              selected = handler(thisIndex - $this.prevAll('.optgroup').length - 1);
              break;

            case _this10.isSearchable:
              selected = handler(thisIndex - 1);
              break;

            case hasOptgroup:
              selected = handler(thisIndex - $this.prevAll('.optgroup').length);
              break;

            default:
              selected = handler(thisIndex);
              break;
          }
          /* eslint-enable max-statements-per-line */


          if (_this10._isToggleAllPresent()) {
            _this10._updateToggleAllOption();
          }

          _this10.$materialSelect.trigger('focus');
        } else {
          _this10.$materialOptionsList.find('li').removeClass('active').attr('aria-selected', 'false');

          var $selectedOption = $this.children().last()[0].childNodes[0];

          _this10.$materialSelect.val($($selectedOption).text().replace(/  +/g, ' ').trim());

          _this10.$materialSelect.trigger('close');
        }

        $this.toggleClass('active');
        var ariaSelected = $this.attr('aria-selected');
        $this.attr('aria-selected', ariaSelected === 'true' ? 'false' : 'true');

        _this10._selectSingleOption($this);

        _this10.$nativeSelect.data('stop-refresh', true);

        var selectedOptionIndex = _this10.$nativeSelect.attr('data-placeholder') ? materialOptionIndex + 1 : materialOptionIndex;

        _this10.$nativeSelect.find('option').eq(selectedOptionIndex).prop('selected', selected);

        _this10.$nativeSelect.removeData('stop-refresh');

        _this10._triggerChangeOnNativeSelect();

        if (_this10.$materialSelect.val()) {
          _this10.$mainLabel.addClass('active');
        }

        if ($this.hasClass('li-added')) {
          _this10.renderer.buildSingleOption($this, '');
        }
      });
    });
  };

  _proto.bindSingleMaterialOptionClick = function bindSingleMaterialOptionClick() {
    var _this11 = this;

    this.$materialOptionsList.find('li').on('click', function () {
      _this11.$materialSelect.trigger('close');
    });
  };

  _proto.bindSearchInputKeyup = function bindSearchInputKeyup() {
    var _this12 = this;

    this.$searchInput.find('.search').on('keyup', function (e) {
      var $this = $(e.target);
      var isTab = e.which === _this12.keyCodes.tab;
      var isEsc = e.which === _this12.keyCodes.esc;
      var isEnter = e.which === _this12.keyCodes.enter;
      var isEnterWithShift = isEnter && e.shiftKey;
      var isArrowUp = e.which === _this12.keyCodes.arrowUp;
      var isArrowDown = e.which === _this12.keyCodes.arrowDown;

      if (isArrowDown || isTab || isEsc || isArrowUp) {
        _this12.$materialSelect.focus();

        _this12._handleArrowUpDownKey(e.which);

        return;
      }

      var $ul = $this.closest('ul');
      var searchValue = $this.val();
      var $options = $ul.find('li span.filtrable');
      var isOptionInList = false;
      $options.each(function () {
        var $option = $(this);

        if (typeof this.outerHTML === 'string') {
          var liValue = this.textContent.toLowerCase();

          if (liValue.includes(searchValue.toLowerCase())) {
            $option.show().parent().show();
          } else {
            $option.hide().parent().hide();
          }

          if (liValue.trim() === searchValue.toLowerCase()) {
            isOptionInList = true;
          }
        }
      });

      if (isEnter) {
        if (_this12.isEditable && !isOptionInList) {
          _this12.renderer.addNewOption();

          return;
        }

        if (isEnterWithShift) {
          _this12._handleEnterWithShiftKey($this);
        }

        _this12.$materialSelect.trigger('open');

        return;
      }

      _this12.$addOptionBtn[searchValue && _this12.isEditable && !isOptionInList ? 'show' : 'hide']();

      var anyOptionMatch = $options.filter(function (_, e) {
        return $(e).is(':visible') && !$(e).parent().hasClass('disabled');
      }).length !== 0;

      if (!anyOptionMatch) {
        _this12.$toggleAll.hide();

        _this12.$materialOptionsList.append(_this12.$noSearchResultsInfo);
      } else {
        _this12.$toggleAll.show();

        _this12.$materialOptionsList.find(_this12.$noSearchResultsInfo).remove();

        _this12._updateToggleAllOption();
      }

      _this12.dropdown.updatePosition(_this12.$materialSelect, _this12.$materialOptionsList);
    });
  };

  _proto.bindHtmlClick = function bindHtmlClick() {
    var _this13 = this;

    $('html').on('click', function (e) {
      if (!$(e.target).closest("#select-options-" + _this13.properties.id).length && !$(e.target).hasClass('mdb-select') && $("#select-options-" + _this13.properties.id).hasClass('active')) {
        _this13.$materialSelect.trigger('close');

        if (!_this13.$materialSelect.val() && !_this13.options.placeholder) {
          _this13.$mainLabel.removeClass('active');
        }
      }

      if (_this13.isSearchable && _this13.$searchInput !== null && _this13.$materialOptionsList.hasClass('active')) {
        _this13.$materialOptionsList.find('.search-wrap input.search').focus();
      }
    });
  };

  _proto.bindMobileDevicesMousedown = function bindMobileDevicesMousedown() {
    $('select').siblings('input.select-dropdown', 'input.multi-bs-select').on('mousedown', function (e) {
      if (MaterialSelectView.isMobileDevice && (e.clientX >= e.target.clientWidth || e.clientY >= e.target.clientHeight)) {
        e.preventDefault();
      }
    });
  };

  _proto.bindSaveBtnClick = function bindSaveBtnClick() {
    var _this14 = this;

    // @Depreciated
    this.$btnSave.on('click', function () {
      _this14.$materialSelect.trigger('close');
    });
  };

  _proto._toggleResetButton = function _toggleResetButton(hide) {
    var previousValue = this.$nativeSelect.data('stop-refresh');
    this.$nativeSelect.attr('data-stop-refresh', 'true');

    if (hide) {
      this.$nativeSelect.prepend('<option value="" selected disabled data-mdb-novalue></option>');
    } else {
      this.$nativeSelect.find('option[data-mdb-novalue]').remove();
    }

    this.$nativeSelect.attr('data-stop-refresh', previousValue);
    this.$btnReset[hide ? 'hide' : 'show']();
  };

  _proto._isToggleAllPresent = function _isToggleAllPresent() {
    return this.$materialOptionsList.find(this.$toggleAll).length;
  };

  _proto._updateToggleAllOption = function _updateToggleAllOption() {
    var $allOptionsButToggleAll = this.$materialOptionsList.find('li').not('.select-toggle-all, .disabled, :hidden').find('[type=checkbox]');
    var $checkedOptionsButToggleAll = $allOptionsButToggleAll.filter(':checked');
    var isToggleAllChecked = this.$toggleAll.find('[type=checkbox]').is(':checked');

    if ($checkedOptionsButToggleAll.length === $allOptionsButToggleAll.length && !isToggleAllChecked) {
      this.$toggleAll.find('[type=checkbox]').prop('checked', true);
    } else if ($checkedOptionsButToggleAll.length < $allOptionsButToggleAll.length && isToggleAllChecked) {
      this.$toggleAll.find('[type=checkbox]').prop('checked', false);
    }
  };

  _proto._handleTabKey = function _handleTabKey($materialSelect) {
    this._handleEscKey($materialSelect);
  };

  _proto._handleEnterWithShiftKey = function _handleEnterWithShiftKey($materialSelect) {
    if (!this.isMultiple) {
      this._handleEnterKey($materialSelect);
    } else {
      this.$toggleAll.trigger('click');
    }
  };

  _proto._handleEnterKey = function _handleEnterKey($materialSelect) {
    var $activeOption = this.$materialOptionsList.find('li.selected:not(.disabled)');
    $activeOption.trigger('click').addClass('active');

    this._removeKeyboardActiveClass();

    if (!this.isMultiple) {
      $materialSelect.trigger('close');
    }
  };

  _proto._handleArrowUpDownKey = function _handleArrowUpDownKey(keyCode) {
    // eslint-disable-next-line object-curly-newline
    var _this$_getArrowMatche = this._getArrowMatchedActiveOptions(keyCode, false),
        $matchedMaterialOption = _this$_getArrowMatche.$matchedMaterialOption,
        $activeOption = _this$_getArrowMatche.$activeOption;

    this._selectSingleOption($matchedMaterialOption);

    this._removeKeyboardActiveClass();

    if (!$matchedMaterialOption.find('input').is(':checked')) {
      $matchedMaterialOption.removeClass(this.options.keyboardActiveClass);
    }

    if (!$activeOption.hasClass('selected') && !$activeOption.find('input').is(':checked') && this.isMultiple) {
      $activeOption.removeClass('active', this.options.keyboardActiveClass);
    }

    $matchedMaterialOption.addClass(this.options.keyboardActiveClass);

    if ($matchedMaterialOption.position()) {
      this.$materialOptionsList.scrollTop(this.$materialOptionsList.scrollTop() + $matchedMaterialOption.position().top);
    }
  };

  _proto._handleClosedArrowUpDownKey = function _handleClosedArrowUpDownKey(keyCode) {
    // eslint-disable-next-line object-curly-newline
    var _this$_getArrowMatche2 = this._getArrowMatchedActiveOptions(keyCode, true),
        $matchedMaterialOption = _this$_getArrowMatche2.$matchedMaterialOption;

    $matchedMaterialOption.trigger('click').addClass('active');

    this._updateDropdownScrollTop();

    this._selectSingleOption($matchedMaterialOption);
  };

  _proto._getArrowMatchedActiveOptions = function _getArrowMatchedActiveOptions(keyCode, closedDropdown) {
    var _this15 = this;

    var visible = closedDropdown ? '' : ':visible';
    var $availableOptions = this.$materialOptionsList.find("li" + visible).not('.disabled, .select-toggle-all');
    var $firstOption = $availableOptions.first();
    var $lastOption = $availableOptions.last();
    var anySelected = this.$materialOptionsList.find('li.selected').length > 0;
    var $matchedMaterialOption = null;
    var $activeOption = null;
    var isArrowUp = keyCode === this.keyCodes.arrowUp;

    if (isArrowUp) {
      var $currentOption = anySelected ? this.$materialOptionsList.find('li.selected').first() : $lastOption;
      var $prevOption = $currentOption.prev("li" + visible + ":not(.disabled, .select-toggle-all)");
      $activeOption = $prevOption;
      $availableOptions.each(function (key, el) {
        if ($(el).hasClass(_this15.options.keyboardActiveClass)) {
          $prevOption = $availableOptions.eq(key - 1);
          $activeOption = $availableOptions.eq(key);
        }
      });
      $matchedMaterialOption = $currentOption.is($firstOption) || !anySelected ? $currentOption : $prevOption;
    } else {
      var _$currentOption = anySelected ? this.$materialOptionsList.find('li.selected').first() : $firstOption;

      var $nextOption = _$currentOption.next("li" + visible + ":not(.disabled, .select-toggle-all)");

      $activeOption = $nextOption;
      $availableOptions.each(function (key, el) {
        if ($(el).hasClass(_this15.options.keyboardActiveClass)) {
          $nextOption = $availableOptions.eq(key + 1);
          $activeOption = $availableOptions.eq(key);
        }
      });
      $matchedMaterialOption = _$currentOption.is($lastOption) || !anySelected ? _$currentOption : $nextOption;
    }

    return {
      $matchedMaterialOption: $matchedMaterialOption,
      $activeOption: $activeOption
    };
  };

  _proto._handleHomeKey = function _handleHomeKey() {
    this._selectBoundaryOption('first');
  };

  _proto._handleEndKey = function _handleEndKey() {
    this._selectBoundaryOption('last');
  };

  _proto._selectBoundaryOption = function _selectBoundaryOption(firstOrLast) {
    if (firstOrLast === void 0) {
      firstOrLast = '';
    }

    var $boundaryOption = this.$materialOptionsList.find('li:visible').not('.disabled, .select-toggle-all')[firstOrLast]();

    this._selectSingleOption($boundaryOption);

    this._removeKeyboardActiveClass();

    if (!$boundaryOption.find('input').is(':checked')) {
      $boundaryOption.removeClass(this.options.keyboardActiveClass);
    }

    $boundaryOption.addClass(this.options.keyboardActiveClass);

    if ($boundaryOption.position()) {
      this.$materialOptionsList.scrollTop(this.$materialOptionsList.scrollTop() + $boundaryOption.position().top);
    }
  };

  _proto._handleEscKey = function _handleEscKey($materialSelect) {
    this._removeKeyboardActiveClass();

    $materialSelect.trigger('close');
  };

  _proto._handleLetterKey = function _handleLetterKey(e) {
    var _this16 = this;

    this._removeKeyboardActiveClass();

    if (this.isSearchable) {
      var isLetter = e.which > 46 && e.which < 91;
      var isNumber = e.which > 93 && e.which < 106;
      var isBackspace = e.which === 8;

      if (isLetter || isNumber) {
        this.$searchInput.find('input').val(e.key).focus();
      }

      if (isBackspace) {
        this.$searchInput.find('input').val('').focus();
      }
    } else {
      var filterQueryString = '';
      var letter = String.fromCharCode(e.which).toLowerCase();
      var nonLetters = Object.keys(this.keyCodes).map(function (key) {
        return _this16.keyCodes[key];
      });
      var isLetterSearchable = letter && nonLetters.indexOf(e.which) === -1;

      if (isLetterSearchable) {
        filterQueryString += letter;
        var $matchedMaterialOption = this.$materialOptionsList.find('li').filter(function (index, element) {
          return $(element).text().toLowerCase().includes(filterQueryString);
        }).first();

        if (!this.isMultiple) {
          this.$materialOptionsList.find('li').removeClass('active');
        }

        $matchedMaterialOption.addClass('active');

        this._selectSingleOption($matchedMaterialOption);

        this._updateDropdownScrollTop();
      }
    }
  };

  _proto._removeKeyboardActiveClass = function _removeKeyboardActiveClass() {
    this.$materialOptionsList.find('li').removeClass(this.options.keyboardActiveClass);
  };

  _proto._triggerChangeOnNativeSelect = function _triggerChangeOnNativeSelect() {
    var keyboardEvt = new KeyboardEvent('change', {
      bubbles: true,
      cancelable: true
    });
    this.$nativeSelect.get(0).dispatchEvent(keyboardEvt);
  };

  _proto._selectSingleOption = function _selectSingleOption(newOption) {
    this.$materialOptionsList.find('li.selected').removeClass('selected');

    this._selectOption(newOption);
  };

  _proto._updateDropdownScrollTop = function _updateDropdownScrollTop() {
    var $preselected = this.$materialOptionsList.find('li.active').not('.disabled').first();

    if ($preselected.length) {
      this.$materialOptionsList.scrollTo($preselected);
    } else {
      this.$materialOptionsList.scrollTop(0);
    }
  };

  _proto._selectOption = function _selectOption(newOption) {
    var option = $(newOption);
    option.addClass('selected');
  };

  _proto._copyOptions = function _copyOptions(options) {
    return $.extend({}, options);
  };

  _proto._jQueryFallback = function _jQueryFallback() {
    var $lastElem = null;

    for (var i = 0; i < arguments.length; i++) {
      $lastElem = i < 0 || arguments.length <= i ? undefined : arguments[i];

      if ($lastElem.length) {
        return $lastElem;
      }
    }

    return $lastElem;
  };

  _createClass(MaterialSelectView, [{
    key: "isMultiple",
    get: function get() {
      return this.properties.isMultiple;
    }
  }, {
    key: "isSearchable",
    get: function get() {
      return this.properties.isSearchable;
    }
  }, {
    key: "isRequired",
    get: function get() {
      return this.properties.isRequired;
    }
  }, {
    key: "isEditable",
    get: function get() {
      return this.properties.isEditable;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this.$nativeSelect.is(':disabled');
    }
  }], [{
    key: "isMobileDevice",
    get: function get() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  }]);

  return MaterialSelectView;
}();