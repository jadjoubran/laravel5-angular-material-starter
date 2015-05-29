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
 * @name material.components.autocomplete
 */
/*
 * @see js folder for autocomplete implementation
 */
angular.module('material.components.autocomplete', [
  'material.core',
  'material.components.icon'
]);

angular
    .module('material.components.autocomplete')
    .controller('MdAutocompleteCtrl', MdAutocompleteCtrl);

var ITEM_HEIGHT = 41,
    MAX_HEIGHT = 5.5 * ITEM_HEIGHT,
    MENU_PADDING = 8;

function MdAutocompleteCtrl ($scope, $element, $mdUtil, $mdConstant, $timeout, $mdTheming, $window, $animate, $rootElement) {

  //-- private variables

  var self      = this,
      itemParts = $scope.itemsExpr.split(/ in /i),
      itemExpr  = itemParts[1],
      elements  = null,
      promise   = null,
      cache     = {},
      noBlur    = false,
      selectedItemWatchers = [],
      hasFocus  = false;

  //-- public variables

  self.scope    = $scope;
  self.parent   = $scope.$parent;
  self.itemName = itemParts[0];
  self.matches  = [];
  self.loading  = false;
  self.hidden   = true;
  self.index    = null;
  self.messages = [];
  self.id       = $mdUtil.nextUid();

  //-- public methods

  self.keydown  = keydown;
  self.blur     = blur;
  self.focus    = focus;
  self.clear    = clearValue;
  self.select   = select;
  self.getCurrentDisplayValue         = getCurrentDisplayValue;
  self.registerSelectedItemWatcher    = registerSelectedItemWatcher;
  self.unregisterSelectedItemWatcher  = unregisterSelectedItemWatcher;

  self.listEnter = function () { noBlur = true; };
  self.listLeave = function () {
    noBlur = false;
    if (!hasFocus) self.hidden = true;
  };
  self.mouseUp   = function () { elements.input.focus(); };

  return init();

  //-- initialization methods

  function init () {
    configureWatchers();
    $timeout(function () {
      gatherElements();
      focusElement();
      moveDropdown();
    });
  }

  function positionDropdown () {
    if (!elements) return $timeout(positionDropdown, 0, false);
    var hrect  = elements.wrap.getBoundingClientRect(),
        vrect  = elements.snap.getBoundingClientRect(),
        root   = elements.root.getBoundingClientRect(),
        top    = vrect.bottom - root.top,
        bot    = root.bottom - vrect.top,
        left   = hrect.left - root.left,
        width  = hrect.width,
        styles = {
          left:     left + 'px',
          minWidth: width + 'px',
          maxWidth: Math.max(hrect.right - root.left, root.right - hrect.left) - MENU_PADDING + 'px'
        };
    if (top > bot && root.height - hrect.bottom - MENU_PADDING < MAX_HEIGHT) {
      styles.top = 'auto';
      styles.bottom = bot + 'px';
      styles.maxHeight = Math.min(MAX_HEIGHT, hrect.top - root.top - MENU_PADDING) + 'px';
    } else {
      styles.top = top + 'px';
      styles.bottom = 'auto';
      styles.maxHeight = Math.min(MAX_HEIGHT, root.bottom - hrect.bottom - MENU_PADDING) + 'px';
    }
    elements.$.ul.css(styles);
    $timeout(correctHorizontalAlignment, 0, false);

    function correctHorizontalAlignment () {
      var dropdown = elements.ul.getBoundingClientRect(),
          styles   = {};
      if (dropdown.right > root.right - MENU_PADDING) {
        styles.left = (hrect.right - dropdown.width) + 'px';
      }
      elements.$.ul.css(styles);
    }
  }

  function moveDropdown () {
    if (!elements.$.root.length) return;
    $mdTheming(elements.$.ul);
    elements.$.ul.detach();
    elements.$.root.append(elements.$.ul);
    if ($animate.pin) $animate.pin(elements.$.ul, $rootElement);
  }

  function focusElement () {
    if ($scope.autofocus) elements.input.focus();
  }

  function configureWatchers () {
    var wait = parseInt($scope.delay, 10) || 0;
    $scope.$watch('searchText', wait
        ? $mdUtil.debounce(handleSearchText, wait)
        : handleSearchText);
    registerSelectedItemWatcher(selectedItemChange);
    $scope.$watch('selectedItem', handleSelectedItemChange);
    $scope.$watch('$mdAutocompleteCtrl.hidden', function (hidden, oldHidden) {
      if (!hidden && oldHidden) positionDropdown();
    });
    angular.element($window).on('resize', positionDropdown);
  }

  function gatherElements () {
    elements = {
      main:  $element[0],
      ul:    $element.find('ul')[0],
      input: $element.find('input')[0],
      wrap:  $element.find('md-autocomplete-wrap')[0],
      root:  document.body
    };
    elements.li = elements.ul.getElementsByTagName('li');
    elements.snap = getSnapTarget();
    elements.$ = getAngularElements(elements);
  }

  function getSnapTarget () {
    for (var element = $element; element.length; element = element.parent()) {
      if (angular.isDefined(element.attr('md-autocomplete-snap'))) return element[0];
    }
    return elements.wrap;
  }

  function getAngularElements (elements) {
    var obj = {};
    for (var key in elements) {
      obj[key] = angular.element(elements[key]);
    }
    return obj;
  }

  //-- event/change handlers

  function selectedItemChange (selectedItem, previousSelectedItem) {
    if (selectedItem) {
      $scope.searchText = getDisplayValue(selectedItem);
    }
    if ($scope.itemChange && selectedItem !== previousSelectedItem)
      $scope.itemChange(getItemScope(selectedItem));
  }

  function handleSelectedItemChange(selectedItem, previousSelectedItem) {
    for (var i = 0; i < selectedItemWatchers.length; ++i) {
      selectedItemWatchers[i](selectedItem, previousSelectedItem);
    }
  }

  /**
   * Register a function to be called when the selected item changes.
   * @param cb
   */
  function registerSelectedItemWatcher(cb) {
    if (selectedItemWatchers.indexOf(cb) == -1) {
      selectedItemWatchers.push(cb);
    }
  }

  /**
   * Unregister a function previously registered for selected item changes.
   * @param cb
   */
  function unregisterSelectedItemWatcher(cb) {
    var i = selectedItemWatchers.indexOf(cb);
    if (i != -1) {
      selectedItemWatchers.splice(i, 1);
    }
  }

  function handleSearchText (searchText, previousSearchText) {
    self.index = getDefaultIndex();
    //-- do nothing on init
    if (searchText === previousSearchText) return;
    //-- clear selected item if search text no longer matches it
    if (searchText !== getDisplayValue($scope.selectedItem)) $scope.selectedItem = null;
    else return;
    //-- trigger change event if available
    if ($scope.textChange && searchText !== previousSearchText)
      $scope.textChange(getItemScope($scope.selectedItem));
    //-- cancel results if search text is not long enough
    if (!isMinLengthMet()) {
      self.loading = false;
      self.matches = [];
      self.hidden = shouldHide();
      updateMessages();
    } else {
      handleQuery();
    }
  }

  function blur () {
    hasFocus = false;
    if (!noBlur) self.hidden = true;
  }

  function focus () {
    hasFocus = true;
    //-- if searchText is null, let's force it to be a string
    if (!angular.isString($scope.searchText)) $scope.searchText = '';
    if ($scope.minLength > 0) return;
    self.hidden = shouldHide();
    if (!self.hidden) handleQuery();
  }

  function keydown (event) {
    switch (event.keyCode) {
      case $mdConstant.KEY_CODE.DOWN_ARROW:
        if (self.loading) return;
        event.preventDefault();
        self.index = Math.min(self.index + 1, self.matches.length - 1);
        updateScroll();
        updateSelectionMessage();
        break;
      case $mdConstant.KEY_CODE.UP_ARROW:
        if (self.loading) return;
        event.preventDefault();
        self.index = self.index < 0 ? self.matches.length - 1 : Math.max(0, self.index - 1);
        updateScroll();
        updateSelectionMessage();
        break;
      case $mdConstant.KEY_CODE.TAB:
      case $mdConstant.KEY_CODE.ENTER:
        if (self.hidden || self.loading || self.index < 0 || self.matches.length < 1) return;
        event.preventDefault();
        select(self.index);
        break;
      case $mdConstant.KEY_CODE.ESCAPE:
        self.matches = [];
        self.hidden = true;
        self.index = getDefaultIndex();
        break;
      default:
    }
  }

  //-- getters

  function getMinLength () {
    return angular.isNumber($scope.minLength) ? $scope.minLength : 1;
  }

  function getDisplayValue (item) {
    return (item && $scope.itemText) ? $scope.itemText(getItemScope(item)) : item;
  }

  function getItemScope (item) {
    if (!item) return;
    var locals = {};
    if (self.itemName) locals[self.itemName] = item;
    return locals;
  }

  function getDefaultIndex () {
    return $scope.autoselect ? 0 : -1;
  }

  function shouldHide () {
    if (!isMinLengthMet()) return true;
  }

  function getCurrentDisplayValue () {
    return getDisplayValue(self.matches[self.index]);
  }

  function isMinLengthMet () {
    return $scope.searchText.length >= getMinLength();
  }

  //-- actions

  function select (index) {
    $scope.selectedItem = self.matches[index];
    $scope.searchText = getDisplayValue($scope.selectedItem) || $scope.searchText;
    self.hidden = true;
    self.index = 0;
    self.matches = [];
  }

  function clearValue () {
    $scope.searchText = '';
    select(-1);

    // Per http://www.w3schools.com/jsref/event_oninput.asp
    var eventObj = document.createEvent('CustomEvent');
    eventObj.initCustomEvent('input', true, true, {value: $scope.searchText});
    elements.input.dispatchEvent(eventObj);

    elements.input.focus();
  }

  function fetchResults (searchText) {
    var items = $scope.$parent.$eval(itemExpr),
        term = searchText.toLowerCase();
    if (angular.isArray(items)) {
      handleResults(items);
    } else {
      self.loading = true;
      if (items.success) items.success(handleResults);
      if (items.then)    items.then(handleResults);
      if (items.error)   items.error(function () { self.loading = false; });
    }
    function handleResults (matches) {
      cache[term] = matches;
      self.loading = false;
      if (searchText !== $scope.searchText) return; //-- just cache the results if old request
      promise = null;
      self.matches = matches;
      self.hidden = shouldHide();
      updateMessages();
      positionDropdown();
    }
  }

  function updateMessages () {
    if (self.hidden) return;
    switch (self.matches.length) {
      case 0:  return self.messages.splice(0);
      case 1:  return self.messages.push({ display: 'There is 1 match available.' });
      default: return self.messages.push({ display: 'There are '
          + self.matches.length
          + ' matches available.' });
    }
  }

  function updateSelectionMessage () {
    self.messages.push({ display: getCurrentDisplayValue() });
  }

  function updateScroll () {
    var li  = elements.li[self.index],
        top = li.offsetTop,
        bot = top + li.offsetHeight,
        hgt = elements.ul.clientHeight;
    if (top < elements.ul.scrollTop) {
      elements.ul.scrollTop = top;
    } else if (bot > elements.ul.scrollTop + hgt) {
      elements.ul.scrollTop = bot - hgt;
    }
  }

  function handleQuery () {
    var searchText = $scope.searchText,
        term = searchText.toLowerCase();
    //-- cancel promise if a promise is in progress
    if (promise && promise.cancel) {
      promise.cancel();
      promise = null;
    }
    //-- if results are cached, pull in cached results
    if (!$scope.noCache && cache[term]) {
      self.matches = cache[term];
      updateMessages();
    } else {
      fetchResults(searchText);
    }
    self.hidden = shouldHide();
  }

}
MdAutocompleteCtrl.$inject = ["$scope", "$element", "$mdUtil", "$mdConstant", "$timeout", "$mdTheming", "$window", "$animate", "$rootElement"];

angular
    .module('material.components.autocomplete')
    .directive('mdAutocomplete', MdAutocomplete);

/**
 * @ngdoc directive
 * @name mdAutocomplete
 * @module material.components.autocomplete
 *
 * @description
 * `<md-autocomplete>` is a special input component with a drop-down of all possible matches to a custom query.
 * This component allows you to provide real-time suggestions as the user types in the input area.
 *
 * To start, you will need to specify the required parameters and provide a template for your results.
 * The content inside `md-autocomplete` will be treated as a template.
 *
 * In more complex cases, you may want to include other content such as a message to display when
 * no matches were found.  You can do this by wrapping your template in `md-item-template` and adding
 * a tag for `md-not-found`.  An example of this is shown below.
 *
 * @param {expression} md-items An expression in the format of `item in items` to iterate over matches for your search.
 * @param {expression} md-selected-item-change An expression to be run each time a new item is selected
 * @param {expression} md-search-text-change An expression to be run each time the search text updates
 * @param {string=} md-search-text A model to bind the search query text to
 * @param {object=} md-selected-item A model to bind the selected item to
 * @param {string=} md-item-text An expression that will convert your object to a single string.
 * @param {string=} placeholder Placeholder text that will be forwarded to the input.
 * @param {boolean=} md-no-cache Disables the internal caching that happens in autocomplete
 * @param {boolean=} ng-disabled Determines whether or not to disable the input field
 * @param {number=} md-min-length Specifies the minimum length of text before autocomplete will make suggestions
 * @param {number=} md-delay Specifies the amount of time (in milliseconds) to wait before looking for results
 * @param {boolean=} md-autofocus If true, will immediately focus the input element
 * @param {boolean=} md-autoselect If true, the first item will be selected by default
 * @param {string=} md-menu-class This will be applied to the dropdown menu for styling
 *
 * @usage
 * ###Basic Example
 * <hljs lang="html">
 *   <md-autocomplete
 *       md-selected-item="selectedItem"
 *       md-search-text="searchText"
 *       md-items="item in getMatches(searchText)"
 *       md-item-text="item.display">
 *     <span md-highlight-text="searchText">{{item.display}}</span>
 *   </md-autocomplete>
 * </hljs>
 *
 * ###Example with "not found" message
 * <hljs lang="html">
 * <md-autocomplete
 *     md-selected-item="selectedItem"
 *     md-search-text="searchText"
 *     md-items="item in getMatches(searchText)"
 *     md-item-text="item.display">
 *   <md-item-template>
 *     <span md-highlight-text="searchText">{{item.display}}</span>
 *   </md-item-template>
 *   <md-not-found>
 *     No matches found.
 *   </md-not-found>
 * </md-autocomplete>
 * </hljs>
 *
 * In this example, our code utilizes `md-item-template` and `md-not-found` to specify the different
 * parts that make up our component.
 */

function MdAutocomplete ($mdTheming, $mdUtil) {
  return {
    controller:   'MdAutocompleteCtrl',
    controllerAs: '$mdAutocompleteCtrl',
    link:         link,
    scope:        {
      name:          '@',
      searchText:    '=?mdSearchText',
      selectedItem:  '=?mdSelectedItem',
      itemsExpr:     '@mdItems',
      itemText:      '&mdItemText',
      placeholder:   '@placeholder',
      noCache:       '=?mdNoCache',
      itemChange:    '&?mdSelectedItemChange',
      textChange:    '&?mdSearchTextChange',
      minLength:     '=?mdMinLength',
      delay:         '=?mdDelay',
      autofocus:     '=?mdAutofocus',
      floatingLabel: '@?mdFloatingLabel',
      autoselect:    '=?mdAutoselect',
      menuClass:     '@?mdMenuClass'
    },
    template: function (element, attr) {
      return '\
        <md-autocomplete-wrap ng-class="{ \'md-whiteframe-z1\': !floatingLabel }" role="listbox">\
          ' + getInputElement() + '\
          <button\
              type="button"\
              tabindex="-1"\
              ng-if="$mdAutocompleteCtrl.scope.searchText && !isDisabled"\
              ng-click="$mdAutocompleteCtrl.clear()">\
            <md-icon md-svg-icon="md-cancel"></md-icon>\
            <span class="md-visually-hidden">Clear</span>\
          </button>\
          <md-progress-linear\
              ng-if="$mdAutocompleteCtrl.loading"\
              md-mode="indeterminate"></md-progress-linear>\
          <ul role="presentation"\
              class="md-autocomplete-suggestions md-whiteframe-z1 {{menuClass || \'\'}}"\
              id="ul-{{$mdAutocompleteCtrl.id}}"\
              ng-mouseenter="$mdAutocompleteCtrl.listEnter()"\
              ng-mouseleave="$mdAutocompleteCtrl.listLeave()"\
              ng-mouseup="$mdAutocompleteCtrl.mouseUp()">\
            <li ng-repeat="(index, item) in $mdAutocompleteCtrl.matches"\
                ng-class="{ selected: index === $mdAutocompleteCtrl.index }"\
                ng-hide="$mdAutocompleteCtrl.hidden"\
                ng-click="$mdAutocompleteCtrl.select(index)"\
                md-autocomplete-list-item="$mdAutocompleteCtrl.itemName">\
                ' + getItemTemplate() + '\
            </li>\
            ' + getNoItemsTemplate() + '\
          </ul>\
        </md-autocomplete-wrap>\
        <aria-status\
            class="md-visually-hidden"\
            role="status"\
            aria-live="assertive">\
          <p ng-repeat="message in $mdAutocompleteCtrl.messages">{{message.display}}</p>\
        </aria-status>';

      function getItemTemplate() {
        var templateTag = element.find('md-item-template').remove();
        return templateTag.length ? templateTag.html() : element.html();
      }

      function getNoItemsTemplate() {
        var templateTag = element.find('md-not-found').remove(),
            template = templateTag.length ? templateTag.html() : '';
        return template
            ? '<li ng-if="!$mdAutocompleteCtrl.matches.length && !$mdAutocompleteCtrl.loading\
                         && !$mdAutocompleteCtrl.hidden"\
                         ng-hide="$mdAutocompleteCtrl.hidden"\
                         md-autocomplete-parent-scope>' + template + '</li>'
            : '';

      }

      function getInputElement() {
        if (attr.mdFloatingLabel) {
          return '\
            <md-input-container ng-if="floatingLabel">\
              <label>{{floatingLabel}}</label>\
              <input type="search"\
                  id="fl-input-{{$mdAutocompleteCtrl.id}}"\
                  name="{{name}}"\
                  autocomplete="off"\
                  ng-disabled="isDisabled"\
                  ng-model="$mdAutocompleteCtrl.scope.searchText"\
                  ng-keydown="$mdAutocompleteCtrl.keydown($event)"\
                  ng-blur="$mdAutocompleteCtrl.blur()"\
                  ng-focus="$mdAutocompleteCtrl.focus()"\
                  aria-owns="ul-{{$mdAutocompleteCtrl.id}}"\
                  aria-label="{{floatingLabel}}"\
                  aria-autocomplete="list"\
                  aria-haspopup="true"\
                  aria-activedescendant=""\
                  aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"/>\
            </md-input-container>';
        } else {
          return '\
            <input type="search"\
                id="input-{{$mdAutocompleteCtrl.id}}"\
                name="{{name}}"\
                ng-if="!floatingLabel"\
                autocomplete="off"\
                ng-disabled="isDisabled"\
                ng-model="$mdAutocompleteCtrl.scope.searchText"\
                ng-keydown="$mdAutocompleteCtrl.keydown($event)"\
                ng-blur="$mdAutocompleteCtrl.blur()"\
                ng-focus="$mdAutocompleteCtrl.focus()"\
                placeholder="{{placeholder}}"\
                aria-owns="ul-{{$mdAutocompleteCtrl.id}}"\
                aria-label="{{placeholder}}"\
                aria-autocomplete="list"\
                aria-haspopup="true"\
                aria-activedescendant=""\
                aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"/>';
        }
      }
    }
  };

  function link (scope, element, attr) {
    attr.$observe('disabled', function (value) { scope.isDisabled = value; });

    $mdUtil.initOptionalProperties(scope, attr, {searchText:null, selectedItem:null} );

    $mdTheming(element);
  }
}
MdAutocomplete.$inject = ["$mdTheming", "$mdUtil"];

angular
    .module('material.components.autocomplete')
    .controller('MdHighlightCtrl', MdHighlightCtrl);

function MdHighlightCtrl ($scope, $element, $interpolate) {
  this.init = init;

  return init();

  function init (term) {
    var unsafeText = $interpolate($element.html())($scope),
        text = angular.element('<div>').text(unsafeText).html(),
        flags = $element.attr('md-highlight-flags') || '',
        watcher = $scope.$watch(term, function (term) {
          var regex = getRegExp(term, flags),
              html = text.replace(regex, '<span class="highlight">$&</span>');
          $element.html(html);
        });
    $element.on('$destroy', function () { watcher(); });
  }

  function sanitize (term) {
    if (!term) return term;
    return term.replace(/[\\\^\$\*\+\?\.\(\)\|\{\}\[\]]/g, '\\$&');
  }

  function getRegExp (text, flags) {
    var str = '';
    if (flags.indexOf('^') >= 1) str += '^';
    str += text;
    if (flags.indexOf('$') >= 1) str += '$';
    return new RegExp(sanitize(str), flags.replace(/[\$\^]/g, ''));
  }
}
MdHighlightCtrl.$inject = ["$scope", "$element", "$interpolate"];

angular
    .module('material.components.autocomplete')
    .directive('mdHighlightText', MdHighlight);

/**
 * @ngdoc directive
 * @name mdHighlightText
 * @module material.components.autocomplete
 *
 * @description
 * The `md-highlight-text` directive allows you to specify text that should be highlighted within
 * an element.  Highlighted text will be wrapped in `<span class="highlight"></span>` which can
 * be styled through CSS.  Please note that child elements may not be used with this directive.
 *
 * @param {string} md-highlight-text A model to be searched for
 * @param {string=} md-highlight-flags A list of flags (loosely based on JavaScript RexExp flags).
 *    #### **Supported flags**:
 *    - `g`: Find all matches within the provided text
 *    - `i`: Ignore case when searching for matches
 *    - `$`: Only match if the text ends with the search term
 *    - `^`: Only match if the text begins with the search term
 *
 * @usage
 * <hljs lang="html">
 * <input placeholder="Enter a search term..." ng-model="searchTerm" type="text" />
 * <ul>
 *   <li ng-repeat="result in results" md-highlight-text="searchTerm">
 *     {{result.text}}
 *   </li>
 * </ul>
 * </hljs>
 */

function MdHighlight () {
  return {
    terminal: true,
    scope: false,
    controller: 'MdHighlightCtrl',
    link: function (scope, element, attr, ctrl) {
      ctrl.init(attr.mdHighlightText);
    }
  };
}

angular
    .module('material.components.autocomplete')
    .directive('mdAutocompleteListItem', MdAutocompleteListItem);

function MdAutocompleteListItem ($compile, $mdUtil) {
  return {
    terminal: true,
    link: postLink,
    scope: false
  };
  function postLink (scope, element, attr) {
    var ctrl     = scope.$parent.$mdAutocompleteCtrl,
        newScope = ctrl.parent.$new(false, ctrl.parent),
        itemName = ctrl.scope.$eval(attr.mdAutocompleteListItem);
    newScope[itemName] = scope.item;
    $compile(element.contents())(newScope);
    element.attr({
      role: 'option',
      id: 'item_' + $mdUtil.nextUid()
    });
  }
}
MdAutocompleteListItem.$inject = ["$compile", "$mdUtil"];

angular
    .module('material.components.autocomplete')
    .directive('mdAutocompleteParentScope', MdAutocompleteParentScope);

function MdAutocompleteParentScope ($compile, $mdUtil) {
  return {
    restrict: 'A',
    terminal: true,
    link: postLink,
    scope: false
  };
  function postLink (scope, element, attr) {
    var ctrl     = scope.$parent.$mdAutocompleteCtrl;
    $compile(element.contents())(ctrl.parent);
  }
}
MdAutocompleteParentScope.$inject = ["$compile", "$mdUtil"];

})(window, window.angular);