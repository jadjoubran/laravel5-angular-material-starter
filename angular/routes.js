(function(){
	"use strict";

	angular.module('app.routes').config(function($stateProvider, $urlRouterProvider, $authProvider){

		var getView = function(viewName){
			return './views/app/' + viewName + '/' + viewName + '.html';
		};

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('app', {
				abstract: true,
				views: {
					header: {
						templateUrl: getView('header')
					},
					footer: {
						templateUrl: getView('footer')
					},
					main: {}
				}
			})
			.state('app.landing', {
				url: '/',
				data: {},
				views: {
					'main@': {
						templateUrl: getView('landing')
					}
				}
			})
			.state('app.login', {
				url: '/',
				data: {},
				views: {
					'main@': {
						templateUrl: getView('login')
					}
				}
			})
			.state('app.register', {
				url: '/',
				data: {},
				views: {
					'main@': {
						templateUrl: getView('register')
					}
				}
			});

	});
})();
