(function(){
	"use strict";

	angular.module('app.filters').filter( 't', function( $filter ){
		return function( text ){
			text = $filter('translate')(text);
			return $filter('ucfirst')(text);
		};
	});
})();