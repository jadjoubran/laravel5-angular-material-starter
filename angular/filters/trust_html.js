(function(){
	"use strict";

	angular.module('app.filters').filter( 'trustHtml', function( $sce ){
		return function( html ){
			return $sce.trustAsHtml(html);
		};
	});
})();