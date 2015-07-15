(function(){
	"use strict";

	angular.module('app.config').config( function($locationProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	});

})();