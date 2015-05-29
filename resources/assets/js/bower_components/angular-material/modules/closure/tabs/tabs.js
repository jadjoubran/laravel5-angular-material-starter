/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v0.9.6
 */
goog.provide('ng.material.components.tabs');
goog.require('ng.material.components.icon');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.tabs
 * @description
 *
 *  Tabs, created with the `<md-tabs>` directive provide *tabbed* navigation with different styles.
 *  The Tabs component consists of clickable tabs that are aligned horizontally side-by-side.
 *
 *  Features include support for:
 *
 *  - static or dynamic tabs,
 *  - responsive designs,
 *  - accessibility support (ARIA),
 *  - tab pagination,
 *  - external or internal tab content,
 *  - focus indicators and arrow-key navigations,
 *  - programmatic lookup and access to tab controllers, and
 *  - dynamic transitions through different tab contents.
 *
 */
/*
 * @see js folder for tabs implementation
 */
angular.module('material.components.tabs', [
  'material.core',
  'material.components.icon'
]);

/**
 * @ngdoc directive
 * @name mdTab
 * @module material.components.tabs
 *
 * @restrict E
 *
 * @description
 * Use the `<md-tab>` a nested directive used within `<md-tabs>` to specify a tab with a **label** and optional *view content*.
 *
 * If the `label` attribute is not specified, then an optional `<md-tab-label>` tag can be used to specify more
 * complex tab header markup. If neither the **label** nor the **md-tab-label** are specified, then the nested
 * markup of the `<md-tab>` is used as the tab header markup.
 *
 * Please note that if you use `<md-tab-label>`, your content **MUST** be wrapped in the `<md-tab-body>` tag.  This
 * is to define a clear separation between the tab content and the tab label.
 *
 * If a tab **label** has been identified, then any **non-**`<md-tab-label>` markup
 * will be considered tab content and will be transcluded to the internal `<div class="md-tabs-content">` container.
 *
 * This container is used by the TabsController to show/hide the active tab's content view. This synchronization is
 * automatically managed by the internal TabsController whenever the tab selection changes. Selection changes can
 * be initiated via data binding changes, programmatic invocation, or user gestures.
 *
 * @param {string=} label Optional attribute to specify a simple string as the tab label
 * @param {boolean=} disabled If present, disabled tab selection.
 * @param {expression=} md-on-deselect Expression to be evaluated after the tab has been de-selected.
 * @param {expression=} md-on-select Expression to be evaluated after the tab has been selected.
 *
 *
 * @usage
 *
 * <hljs lang="html">
 * <md-tab label="" disabled="" md-on-select="" md-on-deselect="" >
 *   <h3>My Tab content</h3>
 * </md-tab>
 *
 * <md-tab >
 *   <md-tab-label>
 *     <h3>My Tab content</h3>
 *   </md-tab-label>
 *   <md-tab-body>
 *     <p>
 *       Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
 *       totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
 *       dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
 *       sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
 *     </p>
 *   </md-tab-body>
 * </md-tab>
 * </hljs>
 *
 */
angular
    .module('material.components.tabs')
    .directive('mdTab', MdTab);

function MdTab () {
  return {
    require: '^?mdTabs',
    terminal: true,
    scope: {
      label:    '@',
      active:   '=?mdActive',
      disabled: '=?ngDisabled',
      select:   '&?mdOnSelect',
      deselect: '&?mdOnDeselect'
    },
    link: postLink
  };

  function postLink (scope, element, attr, ctrl) {
    if (!ctrl) return;
    var tabs = element.parent()[0].getElementsByTagName('md-tab'),
        index = Array.prototype.indexOf.call(tabs, element[0]),
        data = ctrl.insertTab({
          scope:    scope,
          parent:   scope.$parent,
          index:    index,
          template: getTemplate(),
          label:    getLabel()
        }, index);

    scope.select   = scope.select   || angular.noop;
    scope.deselect = scope.deselect || angular.noop;

    scope.$watch('active', function (active) { if (active) ctrl.select(data.getIndex()); });
    scope.$watch('disabled', function () { ctrl.refreshIndex(); });
    scope.$watch(
        function () {
          return Array.prototype.indexOf.call(tabs, element[0]);
        },
        function (newIndex) {
          data.index = newIndex;
          ctrl.updateTabOrder();
        }
    );
    scope.$on('$destroy', function () { ctrl.removeTab(data); });

    function getLabel () {
      var label = attr.label || (element.find('md-tab-label')[0] || element[0]).innerHTML;
      return getLabelAttribute() || getLabelElement() || getElementContents();
      function getLabelAttribute () { return attr.label; }
      function getLabelElement () {
        var label = element.find('md-tab-label');
        if (label.length) return label.remove().html();
      }
      function getElementContents () {
        var html = element.html();
        element.empty();
        return html;
      }
    }

    function getTemplate () {
      var content = element.find('md-tab-body'),
          template = content.length ? content.html() : attr.label ? element.html() : null;
      if (content.length) content.remove();
      else if (attr.label) element.empty();
      return template;
    }
  }
}

angular
    .module('material.components.tabs')
    .directive('mdTabItem', MdTabItem);

function MdTabItem () {
  return {
    require: '^?mdTabs',
    link: function link (scope, element, attr, ctrl) {
      if (!ctrl) return;
      ctrl.attachRipple(scope, element);
    }
  };
}

angular.module('material.components.tabs')
    .directive('mdTabScroll', MdTabScroll);

function MdTabScroll ($parse) {
  return {
    restrict: 'A',
    compile: function ($element, attr) {
      var fn = $parse(attr.mdTabScroll, null, true);
      return function ngEventHandler (scope, element) {
        element.on('mousewheel', function (event) {
          scope.$apply(function () { fn(scope, { $event: event }); });
        });
      };
    }
  }
}
MdTabScroll.$inject = ["$parse"];

angular
    .module('material.components.tabs')
    .controller('MdTabsController', MdTabsController);

/**
 * @ngInject
 */
function MdTabsController ($scope, $element, $window, $timeout, $mdConstant, $mdTabInkRipple,
                           $mdUtil, $animate) {
  var ctrl     = this,
      locked   = false,
      elements = getElements(),
      queue    = [];

  ctrl.scope = $scope;
  ctrl.parent = $scope.$parent;
  ctrl.tabs = [];
  ctrl.lastSelectedIndex = null;
  ctrl.focusIndex = 0;
  ctrl.offsetLeft = 0;
  ctrl.hasContent = false;
  ctrl.hasFocus = false;
  ctrl.lastClick = true;

  ctrl.redirectFocus = redirectFocus;
  ctrl.attachRipple = attachRipple;
  ctrl.shouldStretchTabs = shouldStretchTabs;
  ctrl.shouldPaginate = shouldPaginate;
  ctrl.shouldCenterTabs = shouldCenterTabs;
  ctrl.insertTab = insertTab;
  ctrl.removeTab = removeTab;
  ctrl.select = select;
  ctrl.scroll = scroll;
  ctrl.nextPage = nextPage;
  ctrl.previousPage = previousPage;
  ctrl.keydown = keydown;
  ctrl.canPageForward = canPageForward;
  ctrl.canPageBack = canPageBack;
  ctrl.refreshIndex = refreshIndex;
  ctrl.incrementSelectedIndex = incrementSelectedIndex;
  ctrl.updateInkBarStyles = updateInkBarStyles;
  ctrl.updateTabOrder = $mdUtil.debounce(updateTabOrder, 100);

  init();

  function init () {
    $scope.$watch('selectedIndex', handleSelectedIndexChange);
    $scope.$watch('$mdTabsCtrl.focusIndex', handleFocusIndexChange);
    $scope.$watch('$mdTabsCtrl.offsetLeft', handleOffsetChange);
    $scope.$watch('$mdTabsCtrl.hasContent', handleHasContent);
    angular.element($window).on('resize', function () { $scope.$apply(handleWindowResize); });
    $timeout(updateInkBarStyles, 0, false);
    $timeout(updateHeightFromContent, 0, false);
  }

  function handleHasContent (hasContent) {
    $element[hasContent ? 'removeClass' : 'addClass']('md-no-tab-content');
  }

  function getElements () {
    var elements      = {};

    //-- gather tab bar elements
    elements.wrapper  = $element[0].getElementsByTagName('md-tabs-wrapper')[0];
    elements.canvas   = elements.wrapper.getElementsByTagName('md-tabs-canvas')[0];
    elements.paging   = elements.canvas.getElementsByTagName('md-pagination-wrapper')[0];
    elements.tabs     = elements.paging.getElementsByTagName('md-tab-item');
    elements.dummies  = elements.canvas.getElementsByTagName('md-dummy-tab');
    elements.inkBar   = elements.paging.getElementsByTagName('md-ink-bar')[0];

    //-- gather tab content elements
    elements.contentsWrapper = $element[0].getElementsByTagName('md-tabs-content-wrapper')[0];
    elements.contents = elements.contentsWrapper.getElementsByTagName('md-tab-content');

    return elements;
  }

  function keydown (event) {
    switch (event.keyCode) {
      case $mdConstant.KEY_CODE.LEFT_ARROW:
        event.preventDefault();
        incrementSelectedIndex(-1, true);
        break;
      case $mdConstant.KEY_CODE.RIGHT_ARROW:
        event.preventDefault();
        incrementSelectedIndex(1, true);
        break;
      case $mdConstant.KEY_CODE.SPACE:
      case $mdConstant.KEY_CODE.ENTER:
        event.preventDefault();
        if (!locked) $scope.selectedIndex = ctrl.focusIndex;
        break;
    }
    ctrl.lastClick = false;
  }

  function updateTabOrder () {
    var selectedItem = ctrl.tabs[$scope.selectedIndex],
        focusItem = ctrl.tabs[ctrl.focusIndex];
    ctrl.tabs = ctrl.tabs.sort(function (a, b) {
      return a.index - b.index;
    });
    $scope.selectedIndex = ctrl.tabs.indexOf(selectedItem);
    ctrl.focusIndex = ctrl.tabs.indexOf(focusItem);
    $timeout(updateInkBarStyles, 0, false);
  }

  function incrementSelectedIndex (inc, focus) {
    var newIndex,
        index = focus ? ctrl.focusIndex : $scope.selectedIndex;
    for (newIndex = index + inc;
         ctrl.tabs[newIndex] && ctrl.tabs[newIndex].scope.disabled;
         newIndex += inc) {}
    if (ctrl.tabs[newIndex]) {
      if (focus) ctrl.focusIndex = newIndex;
      else $scope.selectedIndex = newIndex;
    }
  }

  function handleOffsetChange (left) {
    var newValue = shouldCenterTabs() ? '' : '-' + left + 'px';
    angular.element(elements.paging).css('transform', 'translate3d(' + newValue + ', 0, 0)');
    $scope.$broadcast('$mdTabsPaginationChanged');
  }

  function handleFocusIndexChange (newIndex, oldIndex) {
    if (newIndex === oldIndex) return;
    if (!elements.tabs[newIndex]) return;
    adjustOffset();
    redirectFocus();
  }

  function redirectFocus () {
    elements.dummies[ctrl.focusIndex].focus();
  }

  function adjustOffset () {
    if (shouldCenterTabs()) return;
    var tab = elements.tabs[ctrl.focusIndex],
        left = tab.offsetLeft,
        right = tab.offsetWidth + left;
    ctrl.offsetLeft = Math.max(ctrl.offsetLeft, fixOffset(right - elements.canvas.clientWidth));
    ctrl.offsetLeft = Math.min(ctrl.offsetLeft, fixOffset(left));
  }

  function handleWindowResize () {
    ctrl.lastSelectedIndex = $scope.selectedIndex;
    ctrl.offsetLeft = fixOffset(ctrl.offsetLeft);
    $timeout(updateInkBarStyles, 0, false);
  }

  function processQueue () {
    queue.forEach(function (func) { $timeout(func); });
    queue = [];
  }

  function insertTab (tabData, index) {
    var proto = {
          getIndex: function () { return ctrl.tabs.indexOf(tab); },
          isActive: function () { return this.getIndex() === $scope.selectedIndex; },
          isLeft:   function () { return this.getIndex() < $scope.selectedIndex; },
          isRight:  function () { return this.getIndex() > $scope.selectedIndex; },
          hasFocus: function () { return !ctrl.lastClick && ctrl.hasFocus && this.getIndex() === ctrl.focusIndex; },
          id:       $mdUtil.nextUid()
        },
        tab = angular.extend(proto, tabData);
    if (angular.isDefined(index)) {
      ctrl.tabs.splice(index, 0, tab);
    } else {
      ctrl.tabs.push(tab);
    }
    processQueue();
    updateHasContent();
    return tab;
  }

  function updateHasContent () {
    var hasContent = false;
    angular.forEach(ctrl.tabs, function (tab) {
      if (tab.template) hasContent = true;
    });
    ctrl.hasContent = hasContent;
  }

  function removeTab (tabData) {
    ctrl.tabs.splice(tabData.getIndex(), 1);
    refreshIndex();
    $timeout(function () {
      updateInkBarStyles();
      ctrl.offsetLeft = fixOffset(ctrl.offsetLeft);
    });
  }

  function refreshIndex () {
    $scope.selectedIndex = getNearestSafeIndex($scope.selectedIndex);
    ctrl.focusIndex = getNearestSafeIndex(ctrl.focusIndex);
  }

  function handleSelectedIndexChange (newValue, oldValue) {
    if (newValue === oldValue) return;

    $scope.selectedIndex = getNearestSafeIndex(newValue);
    ctrl.lastSelectedIndex = oldValue;
    updateInkBarStyles();
    updateHeightFromContent();
    $scope.$broadcast('$mdTabsChanged');
    ctrl.tabs[oldValue] && ctrl.tabs[oldValue].scope.deselect();
    ctrl.tabs[newValue] && ctrl.tabs[newValue].scope.select();
  }

  function handleResizeWhenVisible () {
    //-- if there is already a watcher waiting for resize, do nothing
    if (handleResizeWhenVisible.watcher) return;
    //-- otherwise, we will abuse the $watch function to check for visible
    handleResizeWhenVisible.watcher = $scope.$watch(function () {
      //-- since we are checking for DOM size, we use $timeout to wait for after the DOM updates
      $timeout(function () {
        //-- if the watcher has already run (ie. multiple digests in one cycle), do nothing
        if (!handleResizeWhenVisible.watcher) return;

        if ($element.prop('offsetParent')) {
          handleResizeWhenVisible.watcher();
          handleResizeWhenVisible.watcher = null;

          //-- we have to trigger our own $apply so that the DOM bindings will update
          $scope.$apply(handleWindowResize);
        }
      }, 0, false);
    });
  }

  function updateHeightFromContent () {
    if (!$scope.dynamicHeight) return $element.css('height', '');
    if (!ctrl.tabs.length) return queue.push(updateHeightFromContent);
    var tabContent    = elements.contents[$scope.selectedIndex],
        contentHeight = tabContent ? tabContent.offsetHeight : 0,
        tabsHeight    = elements.wrapper.offsetHeight,
        newHeight     = contentHeight + tabsHeight,
        currentHeight = $element.prop('clientHeight');
    if (currentHeight === newHeight) return;
    locked = true;
    $animate
        .animate(
          $element,
          { height: currentHeight + 'px' },
          { height: newHeight + 'px'}
        )
        .then(function () {
          $element.css('height', '');
          locked = false;
        });
  }

  function updateInkBarStyles () {
    if (!ctrl.tabs.length) return queue.push(updateInkBarStyles);
    //-- if the element is not visible, we will not be able to calculate sizes until it is
    //-- we should treat that as a resize event rather than just updating the ink bar
    if (!$element.prop('offsetParent')) return handleResizeWhenVisible();
    var index = $scope.selectedIndex,
        totalWidth = elements.paging.offsetWidth,
        tab = elements.tabs[index],
        left = tab.offsetLeft,
        right = totalWidth - left - tab.offsetWidth;
    updateInkBarClassName();
    angular.element(elements.inkBar).css({ left: left + 'px', right: right + 'px' });
  }

  function updateInkBarClassName () {
    var newIndex = $scope.selectedIndex,
        oldIndex = ctrl.lastSelectedIndex,
        ink = angular.element(elements.inkBar);
    ink.removeClass('md-left md-right');
    if (!angular.isNumber(oldIndex)) return;
    if (newIndex < oldIndex) {
      ink.addClass('md-left');
    } else if (newIndex > oldIndex) {
      ink.addClass('md-right');
    }
  }

  function getNearestSafeIndex(newIndex) {
    var maxOffset = Math.max(ctrl.tabs.length - newIndex, newIndex),
        i, tab;
    for (i = 0; i <= maxOffset; i++) {
      tab = ctrl.tabs[newIndex + i];
      if (tab && (tab.scope.disabled !== true)) return tab.getIndex();
      tab = ctrl.tabs[newIndex - i];
      if (tab && (tab.scope.disabled !== true)) return tab.getIndex();
    }
    return newIndex;
  }

  function shouldStretchTabs () {
    switch ($scope.stretchTabs) {
      case 'always': return true;
      case 'never':  return false;
      default:       return !shouldPaginate() && $window.matchMedia('(max-width: 600px)').matches;
    }
  }

  function shouldCenterTabs () {
    return $scope.centerTabs && !shouldPaginate();
  }

  function shouldPaginate () {
    if ($scope.noPagination) return false;
    var canvasWidth = $element.prop('clientWidth');
    angular.forEach(elements.tabs, function (tab) { canvasWidth -= tab.offsetWidth; });
    return canvasWidth < 0;
  }

  function select (index) {
    if (!locked) ctrl.focusIndex = $scope.selectedIndex = index;
    ctrl.lastClick = true;
  }

  function scroll (event) {
    if (!shouldPaginate()) return;
    event.preventDefault();
    ctrl.offsetLeft = fixOffset(ctrl.offsetLeft - event.wheelDelta);
  }

  function fixOffset (value) {
    if (!elements.tabs.length || !shouldPaginate()) return 0;
    var lastTab = elements.tabs[elements.tabs.length - 1],
        totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
    value = Math.max(0, value);
    value = Math.min(totalWidth - elements.canvas.clientWidth, value);
    return value;
  }

  function nextPage () {
    var viewportWidth = elements.canvas.clientWidth,
        totalWidth = viewportWidth + ctrl.offsetLeft,
        i, tab;
    for (i = 0; i < elements.tabs.length; i++) {
      tab = elements.tabs[i];
      if (tab.offsetLeft + tab.offsetWidth > totalWidth) break;
    }
    ctrl.offsetLeft = fixOffset(tab.offsetLeft);
  }

  function previousPage () {
    var i, tab;
    for (i = 0; i < elements.tabs.length; i++) {
      tab = elements.tabs[i];
      if (tab.offsetLeft + tab.offsetWidth >= ctrl.offsetLeft) break;
    }
    ctrl.offsetLeft = fixOffset(tab.offsetLeft + tab.offsetWidth - elements.canvas.clientWidth);
  }

  function canPageBack () {
    return ctrl.offsetLeft > 0;
  }

  function canPageForward () {
    var lastTab = elements.tabs[elements.tabs.length - 1];
    return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth + ctrl.offsetLeft;
  }

  function attachRipple (scope, element) {
    var options = { colorElement: angular.element(elements.inkBar) };
    $mdTabInkRipple.attach(scope, element, options);
  }
}
MdTabsController.$inject = ["$scope", "$element", "$window", "$timeout", "$mdConstant", "$mdTabInkRipple", "$mdUtil", "$animate"];

/**
 * @ngdoc directive
 * @name mdTabs
 * @module material.components.tabs
 *
 * @restrict E
 *
 * @description
 * The `<md-tabs>` directive serves as the container for 1..n `<md-tab>` child directives to produces a Tabs components.
 * In turn, the nested `<md-tab>` directive is used to specify a tab label for the **header button** and a [optional] tab view
 * content that will be associated with each tab button.
 *
 * Below is the markup for its simplest usage:
 *
 *  <hljs lang="html">
 *  <md-tabs>
 *    <md-tab label="Tab #1"></md-tab>
 *    <md-tab label="Tab #2"></md-tab>
 *    <md-tab label="Tab #3"></md-tab>
 *  </md-tabs>
 *  </hljs>
 *
 * Tabs supports three (3) usage scenarios:
 *
 *  1. Tabs (buttons only)
 *  2. Tabs with internal view content
 *  3. Tabs with external view content
 *
 * **Tab-only** support is useful when tab buttons are used for custom navigation regardless of any other components, content, or views.
 * **Tabs with internal views** are the traditional usages where each tab has associated view content and the view switching is managed internally by the Tabs component.
 * **Tabs with external view content** is often useful when content associated with each tab is independently managed and data-binding notifications announce tab selection changes.
 *
 * Additional features also include:
 *
 * *  Content can include any markup.
 * *  If a tab is disabled while active/selected, then the next tab will be auto-selected.
 *
 * ### Explanation of tab stretching
 *
 * Initially, tabs will have an inherent size.  This size will either be defined by how much space is needed to accommodate their text or set by the user through CSS.  Calculations will be based on this size.
 *
 * On mobile devices, tabs will be expanded to fill the available horizontal space.  When this happens, all tabs will become the same size.
 *
 * On desktops, by default, stretching will never occur.
 *
 * This default behavior can be overridden through the `md-stretch-tabs` attribute.  Here is a table showing when stretching will occur:
 *
 * `md-stretch-tabs` | mobile    | desktop
 * ------------------|-----------|--------
 * `auto`            | stretched | ---
 * `always`          | stretched | stretched
 * `never`           | ---       | ---
 *
 * @param {integer=} md-selected Index of the active/selected tab
 * @param {boolean=} md-no-ink If present, disables ink ripple effects.
 * @param {boolean=} md-no-bar If present, disables the selection ink bar.
 * @param {string=}  md-align-tabs Attribute to indicate position of tab buttons: `bottom` or `top`; default is `top`
 * @param {string=} md-stretch-tabs Attribute to indicate whether or not to stretch tabs: `auto`, `always`, or `never`; default is `auto`
 * @param {boolean=} md-dynamic-height When enabled, the tab wrapper will resize based on the contents of the selected tab
 * @param {boolean=} md-center-tabs When enabled, tabs will be centered provided there is no need for pagination
 * @param {boolean=} md-no-pagination When enabled, pagination will remain off
 *
 * @usage
 * <hljs lang="html">
 * <md-tabs md-selected="selectedIndex" >
 *   <img ng-src="img/angular.png" class="centered">
 *   <md-tab
 *       ng-repeat="tab in tabs | orderBy:predicate:reversed"
 *       md-on-select="onTabSelected(tab)"
 *       md-on-deselect="announceDeselected(tab)"
 *       ng-disabled="tab.disabled">
 *     <md-tab-label>
 *       {{tab.title}}
 *       <img src="img/removeTab.png" ng-click="removeTab(tab)" class="delete">
 *     </md-tab-label>
 *     <md-tab-body>
 *       {{tab.content}}
 *     </md-tab-body>
 *   </md-tab>
 * </md-tabs>
 * </hljs>
 *
 */
angular
    .module('material.components.tabs')
    .directive('mdTabs', MdTabs);

function MdTabs ($mdTheming, $mdUtil, $compile) {
  return {
    scope: {
      noPagination:  '=?mdNoPagination',
      dynamicHeight: '=?mdDynamicHeight',
      centerTabs:    '=?mdCenterTabs',
      selectedIndex: '=?mdSelected',
      stretchTabs:   '@?mdStretchTabs'
    },
    template: function (element, attr) {
      var content = attr["$mdTabsTemplate"] = element.html();
      return '\
        <md-tabs-wrapper ng-class="{ \'md-stretch-tabs\': $mdTabsCtrl.shouldStretchTabs() }">\
          <md-tab-data></md-tab-data>\
          <md-prev-button\
              tabindex="-1"\
              role="button"\
              aria-label="Previous Page"\
              aria-disabled="{{!$mdTabsCtrl.canPageBack()}}"\
              ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageBack() }"\
              ng-if="$mdTabsCtrl.shouldPaginate()"\
              ng-click="$mdTabsCtrl.previousPage()">\
            <md-icon md-svg-icon="md-tabs-arrow"></md-icon>\
          </md-prev-button>\
          <md-next-button\
              tabindex="-1"\
              role="button"\
              aria-label="Next Page"\
              aria-disabled="{{!$mdTabsCtrl.canPageForward()}}"\
              ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageForward() }"\
              ng-if="$mdTabsCtrl.shouldPaginate()"\
              ng-click="$mdTabsCtrl.nextPage()">\
            <md-icon md-svg-icon="md-tabs-arrow"></md-icon>\
          </md-next-button>\
          <md-tabs-canvas\
              tabindex="0"\
              aria-activedescendant="tab-item-{{$mdTabsCtrl.tabs[$mdTabsCtrl.focusIndex].id}}"\
              ng-focus="$mdTabsCtrl.redirectFocus()"\
              ng-class="{\
                  \'md-paginated\': $mdTabsCtrl.shouldPaginate(),\
                  \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs()\
              }"\
              ng-keydown="$mdTabsCtrl.keydown($event)"\
              role="tablist">\
            <md-pagination-wrapper\
                ng-class="{ \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs() }"\
                md-tab-scroll="$mdTabsCtrl.scroll($event)">\
              <md-tab-item\
                  tabindex="-1"\
                  class="md-tab"\
                  style="max-width: {{ tabWidth ? tabWidth + \'px\' : \'none\' }}"\
                  ng-repeat="tab in $mdTabsCtrl.tabs"\
                  role="tab"\
                  aria-controls="tab-content-{{tab.id}}"\
                  aria-selected="{{tab.isActive()}}"\
                  aria-disabled="{{tab.scope.disabled || \'false\'}}"\
                  ng-click="$mdTabsCtrl.select(tab.getIndex())"\
                  ng-class="{\
                      \'md-active\':    tab.isActive(),\
                      \'md-focused\':   tab.hasFocus(),\
                      \'md-disabled\':  tab.scope.disabled\
                  }"\
                  ng-disabled="tab.scope.disabled"\
                  md-swipe-left="$mdTabsCtrl.nextPage()"\
                  md-swipe-right="$mdTabsCtrl.previousPage()"\
                  md-template="tab.label"\
                  md-scope="tab.parent"></md-tab-item>\
              <md-ink-bar ng-hide="noInkBar"></md-ink-bar>\
            </md-pagination-wrapper>\
            <div class="md-visually-hidden md-dummy-wrapper">\
              <md-dummy-tab\
                  tabindex="-1"\
                  id="tab-item-{{tab.id}}"\
                  role="tab"\
                  aria-controls="tab-content-{{tab.id}}"\
                  aria-selected="{{tab.isActive()}}"\
                  aria-disabled="{{tab.scope.disabled || \'false\'}}"\
                  ng-focus="$mdTabsCtrl.hasFocus = true"\
                  ng-blur="$mdTabsCtrl.hasFocus = false"\
                  ng-repeat="tab in $mdTabsCtrl.tabs"\
                  md-template="tab.label"\
                  md-scope="tab.parent"></md-dummy-tab>\
            </div>\
          </md-tabs-canvas>\
        </md-tabs-wrapper>\
        <md-tabs-content-wrapper ng-show="$mdTabsCtrl.hasContent">\
          <md-tab-content\
              id="tab-content-{{tab.id}}"\
              role="tabpanel"\
              aria-labelledby="tab-item-{{tab.id}}"\
              md-swipe-left="$mdTabsCtrl.incrementSelectedIndex(1)"\
              md-swipe-right="$mdTabsCtrl.incrementSelectedIndex(-1)"\
              ng-if="$mdTabsCtrl.hasContent"\
              ng-repeat="(index, tab) in $mdTabsCtrl.tabs" \
              md-template="tab.template"\
              md-scope="tab.parent"\
              md-connected-if="tab.isActive()"\
              ng-class="{\
                \'md-no-transition\': $mdTabsCtrl.lastSelectedIndex == null,\
                \'md-active\':        tab.isActive(),\
                \'md-left\':          tab.isLeft(),\
                \'md-right\':         tab.isRight(),\
                \'md-no-scroll\':     dynamicHeight\
              }"></md-tab-content>\
        </md-tabs-content-wrapper>\
      ';
    },
    controller: 'MdTabsController',
    controllerAs: '$mdTabsCtrl',
    link: function (scope, element, attr) {
      compileTabData(attr.$mdTabsTemplate);
      delete attr.$mdTabsTemplate;

      $mdUtil.initOptionalProperties(scope, attr);

      //-- watch attributes
      attr.$observe('mdNoBar', function (value) { scope.noInkBar = angular.isDefined(value); });
      //-- set default value for selectedIndex
      scope.selectedIndex = angular.isNumber(scope.selectedIndex) ? scope.selectedIndex : 0;
      //-- apply themes
      $mdTheming(element);

      function compileTabData (template) {
        var dataElement = element.find('md-tab-data');
        dataElement.html(template);
        $compile(dataElement.contents())(scope.$parent);
      }
    }
  };
}
MdTabs.$inject = ["$mdTheming", "$mdUtil", "$compile"];

angular
    .module('material.components.tabs')
    .directive('mdTemplate', MdTemplate);

function MdTemplate ($compile, $mdUtil, $timeout) {
  return {
    restrict: 'A',
    link: link,
    scope: {
      template: '=mdTemplate',
      compileScope: '=mdScope',
      connected: '=?mdConnectedIf'
    },
    require: '^?mdTabs'
  };
  function link (scope, element, attr, ctrl) {
    if (!ctrl) return;
    var compileScope = scope.compileScope.$new();
    element.html(scope.template);
    $compile(element.contents())(compileScope);
    return $timeout(handleScope);
    function handleScope () {
      scope.$watch('connected', function (value) { value ? reconnect() : disconnect(); });
      scope.$on('$destroy', reconnect);
    }
    function disconnect () {
      $mdUtil.disconnectScope(compileScope);
    }
    function reconnect () {
      $mdUtil.reconnectScope(compileScope);
    }
  }
}
MdTemplate.$inject = ["$compile", "$mdUtil", "$timeout"];

ng.material.components.tabs = angular.module("material.components.tabs");