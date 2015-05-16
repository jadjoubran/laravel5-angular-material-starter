(function(){
	"use strict";

	angular.module('app.routes').config( function($stateProvider, $urlRouterProvider ) {

		var getView = function( viewName ){
			return '/views/app/' + viewName + '/' + viewName + '.html';
		};

		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('landing',{
			url: '/',
			templateUrl: getView('landing')
		});


	} );
})();