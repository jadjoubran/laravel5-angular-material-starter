/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v0.9.6
 */
(function( window, angular, undefined ){
"use strict";

/**
 * @ngdoc module
 * @name material.components.chips
 */
/*
 * @see js folder for chips implementation
 */
angular.module('material.components.chips', [
  'material.core',
  'material.components.autocomplete'
]);

angular
    .module('material.components.chips')
    .directive('mdChip', MdChip);

/**
 * @ngdoc directive
 * @name mdChip
 * @module material.components.chips
 *
 * @description
 * `<md-chip>` is a component used within `<md-chips>` and is responsible for rendering individual
 * chips.
 *
 *
 * @usage
 * <hljs lang="html">
 *   <md-chip>{{$chip}}</md-chip>
 * </hljs>
 *
 */

// This hint text is hidden within a chip but used by screen readers to
// inform the user how they can interact with a chip.
var DELETE_HINT_TEMPLATE = '\
    <span ng-if="!$mdChipsCtrl.readonly" class="md-visually-hidden">\
      {{$mdChipsCtrl.deleteHint}}\
    </span>';

/**
 * MDChip Directive Definition
 *
 * @param $mdTheming
 * @param $mdInkRipple
 * @ngInject
 */
function MdChip($mdTheming) {
  return {
    restrict: 'E',
    require: '^?mdChips',
    compile:  compile
  };

  function compile(element, attr) {
    element.append(DELETE_HINT_TEMPLATE);
    return function postLink(scope, element, attr, ctrl) {
      element.addClass('md-chip');
      $mdTheming(element);

      if (ctrl) angular.element(element[0].querySelector('.md-chip-content'))
          .on('blur', function () {
            ctrl.selectedChip = -1;
          });
    };
  }
}
MdChip.$inject = ["$mdTheming"];

angular
    .module('material.components.chips')
    .directive('mdChipRemove', MdChipRemove);

/**
 * @ngdoc directive
 * @name mdChipRemove
 * @module material.components.chips
 *
 * @description
 * `<md-chip-remove>`
 * Designates an element to be used as the delete button for a chip. This
 * element is passed as a child of the `md-chips` element.
 *
 * @usage
 * <hljs lang="html">
 *   <md-chips><button md-chip-remove>DEL</button></md-chips>
 * </hljs>
 */


/**
 * MdChipRemove Directive Definition.
 * 
 * @param $compile
 * @param $timeout
 * @returns {{restrict: string, require: string[], link: Function, scope: boolean}}
 * @constructor
 */
function MdChipRemove ($timeout) {
  return {
    restrict: 'A',
    require: '^mdChips',
    scope: false,
    link: postLink
  };

  function postLink(scope, element, attr, ctrl) {
    element.on('click', function(event) {
      scope.$apply(function() {
        ctrl.removeChip(scope.$$replacedScope.$index);
      });
    });

    // Child elements aren't available until after a $timeout tick as they are hidden by an
    // `ng-if`. see http://goo.gl/zIWfuw
    $timeout(function() {
      element.attr({ tabindex: -1, ariaHidden: true });
      element.find('button').attr('tabindex', '-1');
    });
  }
}
MdChipRemove.$inject = ["$timeout"];

angular
    .module('material.components.chips')
    .directive('mdChipTransclude', MdChipTransclude);

function MdChipTransclude ($compile, $mdUtil) {
  return {
    restrict: 'EA',
    terminal: true,
    link: link,
    scope: false
  };
  function link (scope, element, attr) {
    var ctrl = scope.$parent.$mdChipsCtrl,
        newScope = ctrl.parent.$new(false, ctrl.parent);
    newScope.$$replacedScope = scope;
    newScope.$chip = scope.$chip;
    newScope.$mdChipsCtrl = ctrl;
    element.html(ctrl.$scope.$eval(attr.mdChipTransclude));
    $compile(element.contents())(newScope);
  }
}
MdChipTransclude.$inject = ["$compile", "$mdUtil"];

angular
    .module('material.components.chips')
    .controller('MdChipsCtrl', MdChipsCtrl);

/**
 * Controller for the MdChips component. Responsible for adding to and
 * removing from the list of chips, marking chips as selected, and binding to
 * the models of various input components.
 *
 * @param $scope
 * @param $mdConstant
 * @param $log
 * @param $element
 * @constructor
 */
function MdChipsCtrl ($scope, $mdConstant, $log, $element, $timeout) {
  /** @type {$timeout} **/
  this.$timeout = $timeout;

  /** @type {Object} */
  this.$mdConstant = $mdConstant;

  /** @type {angular.$scope} */
  this.$scope = $scope;

  /** @type {angular.$scope} */
  this.parent = $scope.$parent;

  /** @type {$log} */
  this.$log = $log;

  /** @type {$element} */
  this.$element = $element;

  /** @type {angular.NgModelController} */
  this.ngModelCtrl = null;

  /** @type {angular.NgModelController} */
  this.userInputNgModelCtrl = null;

  /** @type {Element} */
  this.userInputElement = null;

  /** @type {Array.<Object>} */
  this.items = [];

  /** @type {number} */
  this.selectedChip = -1;


  /**
   * Hidden hint text for how to delete a chip. Used to give context to screen readers.
   * @type {string}
   */
  this.deleteHint = 'Press delete to remove this chip.';

  /**
   * Hidden label for the delete button. Used to give context to screen readers.
   * @type {string}
   */
  this.deleteButtonLabel = 'Remove';

  /**
   * Model used by the input element.
   * @type {string}
   */
  this.chipBuffer = '';

  /**
   * Whether to use the mdOnAppend expression to transform the chip buffer
   * before appending it to the list.
   * @type {boolean}
   */
  this.useMdOnAppend = false;
}
MdChipsCtrl.$inject = ["$scope", "$mdConstant", "$log", "$element", "$timeout"];

/**
 * Handles the keydown event on the input element: <enter> appends the
 * buffer to the chip list, while backspace removes the last chip in the list
 * if the current buffer is empty.
 * @param event
 */
MdChipsCtrl.prototype.inputKeydown = function(event) {
  var chipBuffer = this.getChipBuffer();
  switch (event.keyCode) {
    case this.$mdConstant.KEY_CODE.ENTER:
      if (this.$scope.requireMatch || !chipBuffer) break;
      event.preventDefault();
      this.appendChip(chipBuffer);
      this.resetChipBuffer();
      break;
    case this.$mdConstant.KEY_CODE.BACKSPACE:
      if (chipBuffer) break;
      event.stopPropagation();
      if (this.items.length) this.selectAndFocusChipSafe(this.items.length - 1);
      break;
  }
};

/**
 * Handles the keydown event on the chip elements: backspace removes the selected chip, arrow
 * keys switch which chips is active
 * @param event
 */
MdChipsCtrl.prototype.chipKeydown = function (event) {
  if (this.getChipBuffer()) return;
  switch (event.keyCode) {
    case this.$mdConstant.KEY_CODE.BACKSPACE:
    case this.$mdConstant.KEY_CODE.DELETE:
      if (this.selectedChip < 0) return;
      event.preventDefault();
      this.removeAndSelectAdjacentChip(this.selectedChip);
      break;
    case this.$mdConstant.KEY_CODE.LEFT_ARROW:
      event.preventDefault();
      if (this.selectedChip < 0) this.selectedChip = this.items.length;
      if (this.items.length) this.selectAndFocusChipSafe(this.selectedChip - 1);
      break;
    case this.$mdConstant.KEY_CODE.RIGHT_ARROW:
      event.preventDefault();
      this.selectAndFocusChipSafe(this.selectedChip + 1);
      break;
    case this.$mdConstant.KEY_CODE.ESCAPE:
    case this.$mdConstant.KEY_CODE.TAB:
      if (this.selectedChip < 0) return;
      event.preventDefault();
      this.onFocus();
      break;
  }
};

/**
 * Get the input's placeholder - uses `placeholder` when list is empty and `secondary-placeholder`
 * when the list is non-empty. If `secondary-placeholder` is not provided, `placeholder` is used
 * always.
 */
MdChipsCtrl.prototype.getPlaceholder = function() {
  // Allow `secondary-placeholder` to be blank.
  var useSecondary = (this.items.length &&
      (this.secondaryPlaceholder == '' || this.secondaryPlaceholder));
  return useSecondary ? this.placeholder : this.secondaryPlaceholder;
};

/**
 * Removes chip at {@code index} and selects the adjacent chip.
 * @param index
 */
MdChipsCtrl.prototype.removeAndSelectAdjacentChip = function(index) {
  var selIndex = this.getAdjacentChipIndex(index);
  this.removeChip(index);
  this.$timeout(angular.bind(this, function () {
      this.selectAndFocusChipSafe(selIndex);
  }));
};

/**
 * Sets the selected chip index to -1.
 */
MdChipsCtrl.prototype.resetSelectedChip = function() {
  this.selectedChip = -1;
};

/**
 * Gets the index of an adjacent chip to select after deletion. Adjacency is
 * determined as the next chip in the list, unless the target chip is the
 * last in the list, then it is the chip immediately preceding the target. If
 * there is only one item in the list, -1 is returned (select none).
 * The number returned is the index to select AFTER the target has been
 * removed.
 * If the current chip is not selected, then -1 is returned to select none.
 */
MdChipsCtrl.prototype.getAdjacentChipIndex = function(index) {
  var len = this.items.length - 1;
  return (len == 0) ? -1 :
      (index == len) ? index -1 : index;
};

/**
 * Append the contents of the buffer to the chip list. This method will first
 * call out to the md-on-append method, if provided
 * @param newChip
 */
MdChipsCtrl.prototype.appendChip = function(newChip) {
  if (this.items.indexOf(newChip) + 1) return;
  if (this.useMdOnAppend && this.mdOnAppend) {
    newChip = this.mdOnAppend({'$chip': newChip});
  }
  this.items.push(newChip);
};

/**
 * Sets whether to use the md-on-append expression. This expression is
 * bound to scope and controller in {@code MdChipsDirective} as
 * {@code mdOnAppend}. Due to the nature of directive scope bindings, the
 * controller cannot know on its own/from the scope whether an expression was
 * actually provided.
 */
MdChipsCtrl.prototype.useMdOnAppendExpression = function() {
  this.useMdOnAppend = true;
};

/**
 * Gets the input buffer. The input buffer can be the model bound to the
 * default input item {@code this.chipBuffer}, the {@code selectedItem}
 * model of an {@code md-autocomplete}, or, through some magic, the model
 * bound to any inpput or text area element found within a
 * {@code md-input-container} element.
 * @return {Object|string}
 */
MdChipsCtrl.prototype.getChipBuffer = function() {
  return !this.userInputElement ? this.chipBuffer :
      this.userInputNgModelCtrl ? this.userInputNgModelCtrl.$viewValue :
          this.userInputElement[0].value;
};

/**
 * Resets the input buffer for either the internal input or user provided input element.
 */
MdChipsCtrl.prototype.resetChipBuffer = function() {
  if (this.userInputElement) {
    if (this.userInputNgModelCtrl) {
      this.userInputNgModelCtrl.$setViewValue('');
      this.userInputNgModelCtrl.$render();
    } else {
      this.userInputElement[0].value = '';
    }
  } else {
    this.chipBuffer = '';
  }
};

/**
 * Removes the chip at the given index.
 * @param index
 */
MdChipsCtrl.prototype.removeChip = function(index) {
  this.items.splice(index, 1);
};

MdChipsCtrl.prototype.removeChipAndFocusInput = function (index) {
  this.removeChip(index);
  this.onFocus();
};
/**
 * Selects the chip at `index`,
 * @param index
 */
MdChipsCtrl.prototype.selectAndFocusChipSafe = function(index) {
  if (!this.items.length) {
    this.selectChip(-1);
    this.onFocus();
    return;
  }
  if (index === this.items.length) return this.onFocus();
  index = Math.max(index, 0);
  index = Math.min(index, this.items.length - 1);
  this.selectChip(index);
  this.focusChip(index);
};

/**
 * Marks the chip at the given index as selected.
 * @param index
 */
MdChipsCtrl.prototype.selectChip = function(index) {
  if (index >= -1 && index <= this.items.length) {
    this.selectedChip = index;
  } else {
    this.$log.warn('Selected Chip index out of bounds; ignoring.');
  }
};

/**
 * Selects the chip at `index` and gives it focus.
 * @param index
 */
MdChipsCtrl.prototype.selectAndFocusChip = function(index) {
  this.selectChip(index);
  if (index != -1) {
    this.focusChip(index);
  }
};

/**
 * Call `focus()` on the chip at `index`
 */
MdChipsCtrl.prototype.focusChip = function(index) {
  this.$element[0].querySelector('md-chip[index="' + index + '"] .md-chip-content').focus();
};

/**
 * Configures the required interactions with the ngModel Controller.
 * Specifically, set {@code this.items} to the {@code NgModelCtrl#$viewVale}.
 * @param ngModelCtrl
 */
MdChipsCtrl.prototype.configureNgModel = function(ngModelCtrl) {
  this.ngModelCtrl = ngModelCtrl;

  var self = this;
  ngModelCtrl.$render = function() {
    // model is updated. do something.
    self.items = self.ngModelCtrl.$viewValue;
  };
};

MdChipsCtrl.prototype.onFocus = function () {
  var input = this.$element[0].querySelector('input');
  input && input.focus();
  this.resetSelectedChip();
};

MdChipsCtrl.prototype.onInputFocus = function () {
  this.inputHasFocus = true;
  this.resetSelectedChip();
};

MdChipsCtrl.prototype.onInputBlur = function () {
  this.inputHasFocus = false;
};

/**
 * Configure event bindings on a user-provided input element.
 * @param inputElement
 */
MdChipsCtrl.prototype.configureUserInput = function(inputElement) {
  this.userInputElement = inputElement;

  // Find the NgModelCtrl for the input element
  var ngModelCtrl = inputElement.controller('ngModel');
  // `.controller` will look in the parent as well.
  if (ngModelCtrl != this.ngModelCtrl) {
    this.userInputNgModelCtrl = ngModelCtrl;
  }

  // Bind to keydown and focus events of input
  var scope = this.$scope;
  var ctrl = this;
  inputElement
      .attr({ tabindex: 0 })
      .on('keydown', function(event) { scope.$apply( angular.bind(ctrl, function() { ctrl.inputKeydown(event); })) })
      .on('focus', angular.bind(ctrl, ctrl.onInputFocus))
      .on('blur', angular.bind(ctrl, ctrl.onInputBlur));
};

MdChipsCtrl.prototype.configureAutocomplete = function(ctrl) {

  ctrl.registerSelectedItemWatcher(angular.bind(this, function (item) {
    if (item) {
      this.appendChip(item);
      this.resetChipBuffer();
    }
  }));

  this.$element.find('input')
      .on('focus',angular.bind(this, this.onInputFocus) )
      .on('blur', angular.bind(this, this.onInputBlur) );
};

MdChipsCtrl.prototype.hasFocus = function () {
  return this.inputHasFocus || this.selectedChip >= 0;
};

  angular
      .module('material.components.chips')
      .directive('mdChips', MdChips);

  /**
   * @ngdoc directive
   * @name mdChips
   * @module material.components.chips
   *
   * @description
   * `<md-chips>` is an input component for building lists of strings or objects. The list items are
   * displayed as 'chips'. This component can make use of an `<input>` element or an
   * `<md-autocomplete>` element.
   *
   * <strong>Custom `<md-chip-template>` template</strong>
   * A custom template may be provided to render the content of each chip. This is achieved by
   * specifying an `<md-chip-template>` element as a child of `<md-chips>`. Note: Any attributes on
   * `<md-chip-template>` will be dropped as only the innerHTML is used for the chip template. The
   * variables `$chip` and `$index` are available in the scope of `<md-chip-template>`, representing
   * the chip object and its index in the list of chips, respectively.
   * To override the chip delete control, include an element (ideally a button) with the attribute
   * `md-chip-remove`. A click listener to remove the chip will be added automatically. The element
   * is also placed as a sibling to the chip content (on which there are also click listeners) to
   * avoid a nested ng-click situation.
   *
   * <h3> Pending Features </h3>
   * <ul style="padding-left:20px;">
   *
   *   <ul>Style
   *     <li>Colours for hover, press states (ripple?).</li>
   *   </ul>
   *
   *   <ul>List Manipulation
   *     <li>delete item via DEL or backspace keys when selected</li>
   *   </ul>
   *
   *   <ul>Validation
   *     <li>de-dupe values (or support duplicates, but fix the ng-repeat duplicate key issue)</li>
   *     <li>allow a validation callback</li>
   *     <li>hilighting style for invalid chips</li>
   *   </ul>
   *
   *   <ul>Item mutation
   *     <li>Support `
   *       <md-chip-edit>` template, show/hide the edit element on tap/click? double tap/double
   *       click?
   *     </li>
   *   </ul>
   *
   *   <ul>Truncation and Disambiguation (?)
   *     <li>Truncate chip text where possible, but do not truncate entries such that two are
   *     indistinguishable.</li>
   *   </ul>
   *
   *   <ul>Drag and Drop
   *     <li>Drag and drop chips between related `<md-chips>` elements.
   *     </li>
   *   </ul>
   * </ul>
   *
   *  <span style="font-size:.8em;text-align:center">
   *    Warning: This component is a WORK IN PROGRESS. If you use it now,
   *    it will probably break on you in the future.
   *  </span>
   *
   * @param {string=|object=} ng-model A model to bind the list of items to
   * @param {string=} placeholder Placeholder text that will be forwarded to the input.
   * @param {string=} secondary-placeholder Placeholder text that will be forwarded to the input,
   *    displayed when there is at least on item in the list
   * @param {boolean=} readonly Disables list manipulation (deleting or adding list items), hiding
   *    the input and delete buttons
   * @param {expression} md-on-append An expression expected to convert the input string into an
   *    object when adding a chip.
   * @param {string=} delete-hint A string read by screen readers instructing users that pressing
   *    the delete key will remove the chip.
   * @param {string=} delete-button-label A label for the delete button. Also hidden and read by
   *    screen readers.
   *
   * @usage
   * <hljs lang="html">
   *   <md-chips
   *       ng-model="myItems"
   *       placeholder="Add an item"
   *       readonly="isReadOnly">
   *   </md-chips>
   * </hljs>
   *
   */


  var MD_CHIPS_TEMPLATE = '\
      <md-chips-wrap\
          ng-if="!$mdChipsCtrl.readonly || $mdChipsCtrl.items.length > 0"\
          ng-keydown="$mdChipsCtrl.chipKeydown($event)"\
          ng-class="{ \'md-focused\': $mdChipsCtrl.hasFocus() }"\
          class="md-chips">\
        <md-chip ng-repeat="$chip in $mdChipsCtrl.items"\
            index="{{$index}}"\
            ng-class="{\'md-focused\': $mdChipsCtrl.selectedChip == $index}">\
          <div class="md-chip-content"\
              tabindex="-1"\
              aria-hidden="true"\
              ng-focus="!$mdChipsCtrl.readonly && $mdChipsCtrl.selectChip($index)"\
              md-chip-transclude="$mdChipsCtrl.chipContentsTemplate"></div>\
          <div class="md-chip-remove-container"\
              md-chip-transclude="$mdChipsCtrl.chipRemoveTemplate"></div>\
        </md-chip>\
        <div ng-if="!$mdChipsCtrl.readonly && $mdChipsCtrl.ngModelCtrl"\
            class="md-chip-input-container"\
            md-chip-transclude="$mdChipsCtrl.chipInputTemplate"></div>\
        </div>\
      </md-chips-wrap>';

  var CHIP_INPUT_TEMPLATE = '\
        <input\
            tabindex="0"\
            placeholder="{{$mdChipsCtrl.getPlaceholder()}}"\
            aria-label="{{$mdChipsCtrl.getPlaceholder()}}"\
            ng-model="$mdChipsCtrl.chipBuffer"\
            ng-focus="$mdChipsCtrl.onInputFocus()"\
            ng-blur="$mdChipsCtrl.onInputBlur()"\
            ng-keydown="$mdChipsCtrl.inputKeydown($event)">';

  var CHIP_DEFAULT_TEMPLATE = '\
      <span>{{$chip}}</span>';

  var CHIP_REMOVE_TEMPLATE = '\
      <button\
          class="md-chip-remove"\
          ng-if="!$mdChipsCtrl.readonly"\
          ng-click="$mdChipsCtrl.removeChipAndFocusInput($$replacedScope.$index)"\
          type="button"\
          aria-hidden="true"\
          tabindex="-1">\
        <md-icon md-svg-icon="md-close"></md-icon>\
        <span class="md-visually-hidden">\
          {{$mdChipsCtrl.deleteButtonLabel}}\
        </span>\
      </button>';

  /**
   * MDChips Directive Definition
   */
  function MdChips ($mdTheming, $mdUtil, $compile, $log, $timeout) {
    return {
      template: function(element, attrs) {
        // Clone the element into an attribute. By prepending the attribute
        // name with '$', Angular won't write it into the DOM. The cloned
        // element propagates to the link function via the attrs argument,
        // where various contained-elements can be consumed.
        var content = attrs['$mdUserTemplate'] = element.clone();
        return MD_CHIPS_TEMPLATE;
      },
      require: ['mdChips'],
      restrict: 'E',
      controller: 'MdChipsCtrl',
      controllerAs: '$mdChipsCtrl',
      bindToController: true,
      compile: compile,
      scope: {
        readonly: '=readonly',
        placeholder: '@',
        secondaryPlaceholder: '@',
        mdOnAppend: '&',
        deleteHint: '@',
        deleteButtonLabel: '@',
        requireMatch: '=?mdRequireMatch'
      }
    };

    /**
     * Builds the final template for `md-chips` and returns the postLink function.
     *
     * Building the template involves 3 key components:
     * static chips
     * chip template
     * input control
     *
     * If no `ng-model` is provided, only the static chip work needs to be done.
     *
     * If no user-passed `md-chip-template` exists, the default template is used. This resulting
     * template is appended to the chip content element.
     *
     * The remove button may be overridden by passing an element with an md-chip-remove attribute.
     *
     * If an `input` or `md-autocomplete` element is provided by the caller, it is set aside for
     * transclusion later. The transclusion happens in `postLink` as the parent scope is required.
     * If no user input is provided, a default one is appended to the input container node in the
     * template.
     *
     * Static Chips (i.e. `md-chip` elements passed from the caller) are gathered and set aside for
     * transclusion in the `postLink` function.
     *
     *
     * @param element
     * @param attr
     * @returns {Function}
     */
    function compile(element, attr) {
      // Grab the user template from attr and reset the attribute to null.
      var userTemplate = attr['$mdUserTemplate'];
      attr['$mdUserTemplate'] = null;

      // Set the chip remove, chip contents and chip input templates. The link function will put
      // them on the scope for transclusion later.
      var chipRemoveTemplate   = getTemplateByQuery('md-chips>*[md-chip-remove]') || CHIP_REMOVE_TEMPLATE,
          chipContentsTemplate = getTemplateByQuery('md-chips>md-chip-template') || CHIP_DEFAULT_TEMPLATE,
          chipInputTemplate    = getTemplateByQuery('md-chips>md-autocomplete')
              || getTemplateByQuery('md-chips>input')
              || CHIP_INPUT_TEMPLATE,
          staticChips = userTemplate.find('md-chip');

      // Warn of malformed template. See #2545
      if (userTemplate[0].querySelector('md-chip-template>*[md-chip-remove]')) {
        $log.warn('invalid placement of md-chip-remove within md-chip-template.');
      }

      function getTemplateByQuery (query) {
        if (!attr.ngModel) return;
        var element = userTemplate[0].querySelector(query);
        return element && element.outerHTML;
      }

      /**
       * Configures controller and transcludes.
       */
      return function postLink(scope, element, attrs, controllers) {

        $mdUtil.initOptionalProperties(scope, attr);

        $mdTheming(element);
        var mdChipsCtrl = controllers[0];
        mdChipsCtrl.chipContentsTemplate = chipContentsTemplate;
        mdChipsCtrl.chipRemoveTemplate   = chipRemoveTemplate;
        mdChipsCtrl.chipInputTemplate    = chipInputTemplate;

        element
            .attr({ ariaHidden: true, tabindex: -1 })
            .on('focus', function () { mdChipsCtrl.onFocus(); });

        if (attr.ngModel) {
          mdChipsCtrl.configureNgModel(element.controller('ngModel'));

          // If an `md-on-append` attribute was set, tell the controller to use the expression
          // when appending chips.
          if (attrs.mdOnAppend) mdChipsCtrl.useMdOnAppendExpression();

          // The md-autocomplete and input elements won't be compiled until after this directive
          // is complete (due to their nested nature). Wait a tick before looking for them to
          // configure the controller.
          if (chipInputTemplate != CHIP_INPUT_TEMPLATE) {
            $timeout(function() {
              if (chipInputTemplate.indexOf('<md-autocomplete') === 0)
                mdChipsCtrl
                    .configureAutocomplete(element.find('md-autocomplete')
                        .controller('mdAutocomplete'));
              mdChipsCtrl.configureUserInput(element.find('input'));
            });
          }
        }

        // Compile with the parent's scope and prepend any static chips to the wrapper.
        if (staticChips.length > 0) {
          var compiledStaticChips = $compile(staticChips)(scope.$parent);
          $timeout(function() { element.find('md-chips-wrap').prepend(compiledStaticChips); });
        }
      };
    }
  }
  MdChips.$inject = ["$mdTheming", "$mdUtil", "$compile", "$log", "$timeout"];

angular
    .module('material.components.chips')
    .controller('MdContactChipsCtrl', MdContactChipsCtrl);



/**
 * Controller for the MdContactChips component
 * @constructor
 */
function MdContactChipsCtrl () {
  /** @type {Object} */
  this.selectedItem = null;

  /** @type {string} */
  this.searchText = '';
}


MdContactChipsCtrl.prototype.queryContact = function(searchText) {
  var results = this.contactQuery({'$query': searchText});
  return this.filterSelected ?
      results.filter(angular.bind(this, this.filterSelectedContacts)) : results;
};


MdContactChipsCtrl.prototype.filterSelectedContacts = function(contact) {
  return this.contacts.indexOf(contact) == -1;
};

  angular
      .module('material.components.chips')
      .directive('mdContactChips', MdContactChips);

  /**
   * @ngdoc directive
   * @name mdContactChips
   * @module material.components.chips
   *
   * @description
   * `<md-contact-chips>` is an input component based on `md-chips` and makes use of an
   *    `md-autocomplete` element. The component allows the caller to supply a query expression
   *    which returns  a list of possible contacts. The user can select one of these and add it to
   *    the list of chips.
   *
   * @param {string=|object=} ng-model A model to bind the list of items to
   * @param {string=} placeholder Placeholder text that will be forwarded to the input.
   * @param {string=} secondary-placeholder Placeholder text that will be forwarded to the input,
   *    displayed when there is at least on item in the list
   * @param {expression} md-contacts An expression expected to return contacts matching the search
   *    test, `$query`.
   * @param {string} md-contact-name The field name of the contact object representing the
   *    contact's name.
   * @param {string} md-contact-email The field name of the contact object representing the
   *    contact's email address.
   * @param {string} md-contact-image The field name of the contact object representing the
   *    contact's image.
   *
   *
   * // The following attribute has been removed but may come back.
   * @param {expression=} filter-selected Whether to filter selected contacts from the list of
   *    suggestions shown in the autocomplete.
   *
   *
   *
   * @usage
   * <hljs lang="html">
   *   <md-contact-chips
   *       ng-model="ctrl.contacts"
   *       md-contacts="ctrl.querySearch($query)"
   *       md-contact-name="name"
   *       md-contact-image="image"
   *       md-contact-email="email"
   *       placeholder="To">
   *   </md-contact-chips>
   * </hljs>
   *
   */


  var MD_CONTACT_CHIPS_TEMPLATE = '\
      <md-chips class="md-contact-chips"\
          ng-model="$mdContactChipsCtrl.contacts"\
          md-require-match="$mdContactChipsCtrl.requireMatch"\
          md-autocomplete-snap>\
          <md-autocomplete\
              md-menu-class="md-contact-chips-suggestions"\
              md-selected-item="$mdContactChipsCtrl.selectedItem"\
              md-search-text="$mdContactChipsCtrl.searchText"\
              md-items="item in $mdContactChipsCtrl.queryContact($mdContactChipsCtrl.searchText)"\
              md-item-text="$mdContactChipsCtrl.mdContactName"\
              md-no-cache="true"\
              md-autoselect\
              placeholder="{{$mdContactChipsCtrl.contacts.length == 0 ?\
                  $mdContactChipsCtrl.placeholder : $mdContactChipsCtrl.secondaryPlaceholder}}">\
            <div class="md-contact-suggestion">\
              <img \
                  ng-src="{{item[$mdContactChipsCtrl.contactImage]}}"\
                  alt="{{item[$mdContactChipsCtrl.contactName]}}" />\
              <span class="md-contact-name" md-highlight-text="$mdContactChipsCtrl.searchText">\
                {{item[$mdContactChipsCtrl.contactName]}}\
              </span>\
              <span class="md-contact-email" >{{item[$mdContactChipsCtrl.contactEmail]}}</span>\
            </div>\
          </md-autocomplete>\
          <md-chip-template>\
            <div class="md-contact-avatar">\
              <img \
                  ng-src="{{$chip[$mdContactChipsCtrl.contactImage]}}"\
                  alt="{{$chip[$mdContactChipsCtrl.contactName]}}" />\
            </div>\
            <div class="md-contact-name">\
              {{$chip[$mdContactChipsCtrl.contactName]}}\
            </div>\
          </md-chip-template>\
      </md-chips>';


  /**
   * MDContactChips Directive Definition
   *
   * @param $mdTheming
   * @returns {*}
   * @ngInject
   */
  function MdContactChips ($mdTheming, $mdUtil) {
    return {
      template: function(element, attrs) {
        return MD_CONTACT_CHIPS_TEMPLATE;
      },
      restrict: 'E',
      controller: 'MdContactChipsCtrl',
      controllerAs: '$mdContactChipsCtrl',
      bindToController: true,
      compile: compile,
      scope: {
        contactQuery: '&mdContacts',
        placeholder: '@',
        secondaryPlaceholder: '@',
        contactName: '@mdContactName',
        contactImage: '@mdContactImage',
        contactEmail: '@mdContactEmail',
        contacts: '=ngModel',
        requireMatch: '=?mdRequireMatch'
      }
    };

    function compile(element, attr) {
      return function postLink(scope, element, attrs, controllers) {

        $mdUtil.initOptionalProperties(scope, attr);
        $mdTheming(element);

        element.attr('tabindex', '-1');
      };
    }
  }
  MdContactChips.$inject = ["$mdTheming", "$mdUtil"];

})(window, window.angular);