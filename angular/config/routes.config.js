export function RoutesConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	var getView = (viewName) => {
		return `./views/app/pages/${viewName}/${viewName}.page.html`;
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
			url: '/login',
			data: {},
			views: {
				'main@': {
					templateUrl: getView('login')
				}
			}
		})
        .state('app.register', {
            url: '/register',
            data: {},
            views: {
                'main@': {
                    templateUrl: getView('register')
                }
            }
        })
        .state('app.forgot_password', {
            url: '/forgot-password',
            data: {},
            views: {
                'main@': {
                    templateUrl: getView('forgot-password')
                }
            }
        });
}
