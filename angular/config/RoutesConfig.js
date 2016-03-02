export function RoutesConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	var getView = function(viewName) {
		return './views/app/pages/' + viewName + '/' + viewName + '.page.html';
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
		});
}
