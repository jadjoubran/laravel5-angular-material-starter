/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v0.9.6
 */
goog.provide('ng.material.components.swipe');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.swipe
 * @description Swipe module!
 */
/**
 * @ngdoc directive
 * @module material.components.swipe
 * @name mdSwipeLeft
 *
 * @restrict A
 *
 * @description
 * The md-swipe-left directives allows you to specify custom behavior when an element is swiped
 * left.
 *
 * @usage
 * <hljs lang="html">
 * <div md-swipe-left="onSwipeLeft()">Swipe me left!</div>
 * </hljs>
 */
/**
 * @ngdoc directive
 * @module material.components.swipe
 * @name mdSwipeRight
 *
 * @restrict A
 *
 * @description
 * The md-swipe-right directives allows you to specify custom behavior when an element is swiped
 * right.
 *
 * @usage
 * <hljs lang="html">
 * <div md-swipe-right="onSwipeRight()">Swipe me right!</div>
 * </hljs>
 */

angular.module('material.components.swipe', ['material.core'])
    .directive('mdSwipeLeft', getDirective('SwipeLeft'))
    .directive('mdSwipeRight', getDirective('SwipeRight'));

function getDirective(name) {
  var directiveName = 'md' + name;
  var eventName = '$md.' + name.toLowerCase();

    DirectiveFactory.$inject = ["$parse"];
  return DirectiveFactory;

  /* @ngInject */
  function DirectiveFactory($parse) {
      return { restrict: 'A', link: postLink };
      function postLink(scope, element, attr) {
        var fn = $parse(attr[directiveName]);
        element.on(eventName, function(ev) {
          scope.$apply(function() { fn(scope, { $event: ev }); });
        });
      }
    }
}



ng.material.components.swipe = angular.module("material.components.swipe");