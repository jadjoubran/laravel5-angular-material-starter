export function RoutesConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	let getView = (viewName) => {
		return `./views/app/pages/${viewName}/${viewName}.page.html`;
	};
	
	let returnTo = ($transition$) => {
        let redirectedFrom = $transition$.previous();
        // The user was redirected to the login state (via the requiresAuth hook)
        if (redirectedFrom != null) {
            // Follow the current transition's redirect chain all the way back to the original attempted transition
            while (redirectedFrom.previous()) {
                redirectedFrom = redirectedFrom.previous();
            }
            // return to the original attempted "to state"
            return { state: redirectedFrom.to(), params: redirectedFrom.params("to") };
        }
        // The user was not redirected to the login state; they directly activated the login state somehow.
        // Return them to the state they came from.
        let fromState = $transition$.from();
        let fromParams = $transition$.params("from");
        if (fromState.name !== '') {
            return { state: fromState, params: fromParams };
        }
        // If the fromState's name is empty, then this was the initial transition. Just return them to the landing state
        return { state: 'app.landing' };
    }

	$urlRouterProvider.otherwise('/');

    /*
        data: {auth: true} would require JWT auth
        However you can't apply it to the abstract state
        or landing state because you'll enter a redirect loop
    */

	$stateProvider
		.state('app', {
			abstract: true,
            data: {},
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
            views: {
                'main@': {
                    templateUrl: getView('landing')
                }
            }
        })
        .state('app.login', {
			url: '/login',
			views: {
				'main@': {
					templateUrl: getView('login')
				}
			},
            resolve: {returnTo: returnTo}
		})
        .state('app.register', {
            url: '/register',
            views: {
                'main@': {
                    templateUrl: getView('register')
                }
            }
        })
        .state('app.forgot_password', {
            url: '/forgot-password',
            views: {
                'main@': {
                    templateUrl: getView('forgot-password')
                }
            }
        })
        .state('app.reset_password', {
            url: '/reset-password/:email/:token',
            views: {
                'main@': {
                    templateUrl: getView('reset-password')
                }
            }
        });
}
