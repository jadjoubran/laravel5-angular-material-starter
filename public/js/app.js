(function(){
	"use strict";

	var app = angular.module('app',
		[
		'app.controllers',
		'app.filters',
		'app.services',
		'app.directives',
		'app.routes',
		'app.config'
		]);

	angular.module('app.routes', []);
	angular.module('app.controllers', ['ui.router', 'ngMaterial', 'ngStorage', 'restangular', 'angular-loading-bar']);
	angular.module('app.filters', []);
	angular.module('app.services', []);
	angular.module('app.directives', []);
	angular.module('app.config', []);

})();

(function(){
	"use strict";

	angular.module('app.routes').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

		var getView = function(viewName){
			return './views/app/' + viewName + '/' + viewName + '.html';
		};

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('app', {
				abstract: true,
				views: {
					sidebar: {
						templateUrl: getView('sidebar')
					},
					header: {
						templateUrl: getView('header')
					},
					main: {}
				}
			})
			.state('app.landing', {
				url: '/',
				data: {pageName: 'Overview'},
				views: {
					'main@': {
						templateUrl: getView('landing')
					}
				}
			})
			.state('app.install', {
				url: '/install',
				data: {pageName: 'Install'},
				views: {
					'main@': {
						templateUrl: getView('install')
					}
				}
			})
			.state('app.tabs', {
				url: '/features',
				data: {pageName: 'Features'},
				views: {
					'main@': {
						templateUrl: getView('tabs')
					}
				}
			})
			.state('app.deploy', {
				url: '/deploy',
				data: {pageName: 'Deploy'},
				views: {
					'main@': {
						templateUrl: getView('deploy')
					}
				}
			})
			.state('app.theme', {
				url: '/theme',
				data: {pageName: 'Theme'},
				views: {
					'main@': {
						templateUrl: getView('theme')
					}
				}
			})
			.state('app.toasts', {
				url: '/toasts',
				data: {pageName: 'Toasts'},
				views: {
					'main@': {
						templateUrl: getView('toasts')
					}
				}
			})
			.state('app.dialogs', {
				url: '/dialogs',
				data: {pageName: 'Dialogs'},
				views: {
					'main@': {
						templateUrl: getView('dialogs')
					}
				}
			})
			.state('app.generators', {
				url: '/generators',
				data: {pageName: 'Artisan generators'},
				views: {
					'main@': {
						templateUrl: getView('generators')
					}
				}
			})
			.state('app.jwt_auth', {
				url: '/jwt_auth',
				data: {pageName: 'JSON Web Token Authentication'},
				views: {
					'main@': {
						templateUrl: getView('jwt_auth')
					}
				}
			})
			.state('app.elixir', {
				url: '/elixir',
				data: {pageName: 'Elixir'},
				views: {
					'main@': {
						templateUrl: getView('elixir')
					}
				}
			})
			.state('app.rest_api', {
				url: '/rest_api',
				data: {pageName: 'REST API'},
				views: {
					'main@': {
						templateUrl: getView('rest_api')
					}
				}
			})
			.state('app.unsupported_browser', {
				url: '/unsupported_browser',
				data: {pageName: 'Unsupported Browser'},
				views: {
					'main@': {
						templateUrl: getView('unsupported_browser')
					}
				}
			})
			.state('app.misc', {
				url: '/misc',
				data: {pageName: 'Miscellaneous features'},
				views: {
					'main@': {
						templateUrl: getView('misc')
					}
				}
			});


	}]);
})();

(function(){
	"use strict";

	angular.module('app.routes').run(["$rootScope", "$mdSidenav", function($rootScope, $mdSidenav){
		$rootScope.$on("$stateChangeStart", function(event, toState){

			if (toState.data && toState.data.pageName){
				$rootScope.current_page = toState.data.pageName;
			}

		});
		$rootScope.$on("$viewContentLoaded", function(event, toState){
			window.Prism.highlightAll();
		});

		$rootScope.$on("$stateChangeSuccess", function(event, toState){
			$mdSidenav('left').close();
		});
	}]);

})();

(function (){
	"use strict";

	angular.module('app.config').config(["cfpLoadingBarProvider", function (cfpLoadingBarProvider){
		cfpLoadingBarProvider.includeSpinner = false;
	}]);

})();

(function(){
	"use strict";

	angular.module('app.config').config(["$mdThemingProvider", function($mdThemingProvider) {
		/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
		$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('grey')
		.warnPalette('red');
	}]);

})();

(function(){
	"use strict";

	angular.module('app.filters').filter( 'capitalize', function(){
		return function(input, all) {
			return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g,function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}) : '';
		};
	});
})();

(function(){
	"use strict";

	angular.module('app.filters').filter( 'humanReadable', function(){
		return function humanize(str) {
			if ( !str ){
				return '';
			}
			var frags = str.split('_');
			for (var i=0; i<frags.length; i++) {
				frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
			}
			return frags.join(' ');
		};
	});
})();
(function(){
    'use strict';

    angular.module('app.filters').filter('truncateCharacters', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) {
                return input;
            }
            if (chars <= 0) {
                return '';
            }
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    // Get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                } else {
                    while (input.charAt(input.length-1) === ' ') {
                        input = input.substr(0, input.length - 1);
                    }
                }
                return input + '...';
            }
            return input;
        };
    });
})();
(function(){
    'use strict';

    angular.module('app.filters').filter('truncateWords', function () {
        return function (input, words) {
            if (isNaN(words)) {
                return input;
            }
            if (words <= 0) {
                return '';
            }
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '...';
                }
            }
            return input;
        };
    });
})();
(function(){
	"use strict";

	angular.module('app.filters').filter( 'trustHtml', ["$sce", function( $sce ){
		return function( html ){
			return $sce.trustAsHtml(html);
		};
	}]);
})();
(function(){
	"use strict";

	angular.module('app.filters').filter('ucfirst', function() {
		return function( input ) {
			if ( !input ){
				return null;
			}
			return input.substring(0, 1).toUpperCase() + input.substring(1);
		};
	});

})();

(function() {
	"use strict";

	angular.module('app.services').factory('API', ["Restangular", "ToastService", "$localStorage", function(Restangular, ToastService, $localStorage) {

		//content negotiation
		var headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/x.laravel.v1+json'
		};

		return Restangular.withConfig(function(RestangularConfigurer) {
			RestangularConfigurer
				.setBaseUrl('/api/')
				.setDefaultHeaders(headers)
				.setErrorInterceptor(function(response) {
					if (response.status === 422) {
						for (var error in response.data.errors) {
							return ToastService.error(response.data.errors[error][0]);
						}
					}
				})
				.addFullRequestInterceptor(function(element, operation, what, url, headers) {
					if ($localStorage.jwt) {
						headers.Authorization = 'Bearer ' + $localStorage.jwt;
					}
				});
		});
	}]);

})();

(function(){
	"use strict";

	angular.module("app.services").factory('DialogService', ["$mdDialog", function($mdDialog){

		return {
			fromTemplate: function(template, $scope){

				var options = {
					templateUrl: './views/dialogs/' + template + '/' + template + '.html'
				};

				if ($scope){
					options.scope = $scope.$new();
				}

				return $mdDialog.show(options);
			},

			hide: function(){
				return $mdDialog.hide();
			},

			alert: function(title, content){
				$mdDialog.show(
					$mdDialog.alert()
						.title(title)
						.content(content)
						.ok('Ok')
				);
			},

			confirm: function(title, content) {
				return $mdDialog.show(
					$mdDialog.confirm()
						.title(title)
						.content(content)
						.ok('Ok')
						.cancel('Cancel')
				);
			}
		};
	}]);
})();
(function(){
	"use strict";

	angular.module("app.services").factory('ToastService', ["$mdToast", function($mdToast){

		var delay = 6000,
			position = 'top right',
			action = 'OK';

		return {
			show: function(content){
				if (!content){
					return false;
				}

				return $mdToast.show(
					$mdToast.simple()
						.content(content)
						.position(position)
						.action(action)
						.hideDelay(delay)
				);
			},
			error: function(content){
				if (!content){
					return false;
				}

				return $mdToast.show(
					$mdToast.simple()
						.content(content)
						.position(position)
						.theme('warn')
						.action(action)
						.hideDelay(delay)
				);
			}
		};
	}]);
})();

(function() {
	"use strict";

	angular.module('app.controllers').controller('DialogsCtrl', ["$scope", "DialogService", function($scope, DialogService) {

		$scope.confirm_message = '';

		$scope.alertDialog = function() {
			DialogService.alert('This is an alert title', 'You can specify some description text in here.');
		};

		$scope.confirmDialog = function() {
			DialogService.confirm('This is a confirm title', 'Are you sure you want to do this?').then(
				function() {
					$scope.confirm_message = 'Confirm Success callback';
				},
				function() {
					$scope.confirm_message = 'Confirm Cancel callback';
				}
			);
		};

		$scope.customDialog = function() {
			DialogService.fromTemplate('add_users', $scope);
		};
	}]);

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('ElixirCtrl', function(){
        //
    });

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('GeneratorsCtrl', function(){
        //
    });

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('HeaderCtrl', ["$scope", "$rootScope", "$mdSidenav", "$log", function($scope, $rootScope, $mdSidenav, $log){

		$scope.$watch(function(){
			return $rootScope.current_page;
		}, function(newPage){
			$scope.current_page = newPage || 'Page Name';
		});

		$scope.openSideNav = function() {
			$mdSidenav('left').open();
		};

	}]);

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('JwtAuthCtrl', ["$scope", "API", "$localStorage", function($scope, API, $localStorage){

		$scope.step = 1;
		$scope.output = null;
		$scope.$localStorage = $localStorage;

		//make sure you run `php artisan db:seed` so that this login works
		$scope.user = {
			email: 'joubran.jad@gmail.com',
			password: 'laravel_angular'
		};

		$scope.requestToken = function(){
			API.all('sample').get('protected').then(function(response){
				$scope.output = response.data.join(' ');
				$scope.outputStatus = {'color': 'green'};
			}, function(error){
				$scope.output = error.data.message;
				$scope.outputStatus = {'color': 'red'};
			});
		};

		$scope.login = function(){
			API.all('users/login').post($scope.user).then(function(response){
				$scope.output = JSON.stringify(response.data);
				$localStorage.jwt = response.data.token;
				$scope.outputStatus = {'color': 'green'};
				$scope.nextStep();
			}, function(error){
				$scope.output = 'Are you sure you have your database setup? Error: '. error.data.message;
				$scope.outputStatus = {'color': 'red'};
			});
		};

		$scope.nextStep = function(){
			$scope.step++;
		};

	}]);

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('LandingCtrl', ["$scope", function($scope){

		$scope.promoImage = 'https://i.imgur.com/ZbLzOPP.jpg';

	}]);

})();

(function (){
    "use strict";

    angular.module('app.controllers').controller('LoginCtrl', function (){

    });

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('MiscCtrl', function(){
        //
    });

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('RestApiCtrl', function(){
        //
    });

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('SidebarCtrl', ["$scope", "$state", function($scope, $state){


	}]);

})();
(function(){
	"use strict";

	angular.module('app.controllers').controller('DashboardCtrl', function(){

	});

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('ToastsCtrl', ["$scope", "ToastService", function($scope, ToastService){

		$scope.toastSuccess = function(){
			ToastService.show('User added successfully!');
		};

		$scope.toastError = function(){
			ToastService.error('Connection interrupted!');
		};

	}]);

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('UnsupportedBrowserCtrl', function(){
        //
    });

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('AddUsersCtrl', ["$scope", "DialogService", function($scope, DialogService){

        $scope.save = function(){
	        //do something useful
            DialogService.hide();
        };

        $scope.hide = function(){
        	DialogService.hide();
        };

    }]);

})();

(function(){
	"use strict";

	angular.module( 'app.controllers' ).controller( 'DataListingCtrl', function(){
		//
    });

})();

(function(){
	"use strict";

	angular.module('app.directives').directive( 'dataListing', function() {

		return {
			restrict: 'EA',
			templateUrl: 'views/directives/data_listing/data_listing.html',
			controller: 'DataListingCtrl',
			link: function( scope, element, attrs ){
				//
			}
		};

	});

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2xvYWRpbmdfYmFyLmpzIiwiY29uZmlnL3RoZW1lLmpzIiwiZmlsdGVycy9jYXBpdGFsaXplLmpzIiwiZmlsdGVycy9odW1hbl9yZWFkYWJsZS5qcyIsImZpbHRlcnMvdHJ1bmNhdGVfY2hhcmFjdGVycy5qcyIsImZpbHRlcnMvdHJ1bmNhdGVfd29yZHMuanMiLCJmaWx0ZXJzL3RydXN0X2h0bWwuanMiLCJmaWx0ZXJzL3VjZmlyc3QuanMiLCJzZXJ2aWNlcy9BUEkuanMiLCJzZXJ2aWNlcy9kaWFsb2cuanMiLCJzZXJ2aWNlcy90b2FzdC5qcyIsImFwcC9kaWFsb2dzL2RpYWxvZ3MuanMiLCJhcHAvZWxpeGlyL2VsaXhpci5qcyIsImFwcC9nZW5lcmF0b3JzL2dlbmVyYXRvcnMuanMiLCJhcHAvaGVhZGVyL2hlYWRlci5qcyIsImFwcC9qd3RfYXV0aC9qd3RfYXV0aC5qcyIsImFwcC9sYW5kaW5nL2xhbmRpbmcuanMiLCJhcHAvbG9naW4vbG9naW4uanMiLCJhcHAvbWlzYy9taXNjLmpzIiwiYXBwL3Jlc3RfYXBpL3Jlc3RfYXBpLmpzIiwiYXBwL3NpZGViYXIvc2lkZWJhci5qcyIsImFwcC90YWJzL3RhYnMuanMiLCJhcHAvdG9hc3RzL3RvYXN0cy5qcyIsImFwcC91bnN1cHBvcnRlZF9icm93c2VyL3Vuc3VwcG9ydGVkX2Jyb3dzZXIuanMiLCJkaWFsb2dzL2FkZF91c2Vycy9hZGRfdXNlcnMuanMiLCJkaXJlY3RpdmVzL2RhdGFfbGlzdGluZy9kYXRhX2xpc3RpbmcuanMiLCJkaXJlY3RpdmVzL2RhdGFfbGlzdGluZy9kZWZpbml0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsVUFBQTtDQUNBOztDQUVBLElBQUEsTUFBQSxRQUFBLE9BQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0NBR0EsUUFBQSxPQUFBLGNBQUE7Q0FDQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxhQUFBLGNBQUEsYUFBQSxlQUFBO0NBQ0EsUUFBQSxPQUFBLGVBQUE7Q0FDQSxRQUFBLE9BQUEsZ0JBQUE7Q0FDQSxRQUFBLE9BQUEsa0JBQUE7Q0FDQSxRQUFBLE9BQUEsY0FBQTs7OztBQ2xCQSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsY0FBQSxnREFBQSxTQUFBLGdCQUFBLG1CQUFBOztFQUVBLElBQUEsVUFBQSxTQUFBLFNBQUE7R0FDQSxPQUFBLGlCQUFBLFdBQUEsTUFBQSxXQUFBOzs7RUFHQSxtQkFBQSxVQUFBOztFQUVBO0lBQ0EsTUFBQSxPQUFBO0lBQ0EsVUFBQTtJQUNBLE9BQUE7S0FDQSxTQUFBO01BQ0EsYUFBQSxRQUFBOztLQUVBLFFBQUE7TUFDQSxhQUFBLFFBQUE7O0tBRUEsTUFBQTs7O0lBR0EsTUFBQSxlQUFBO0lBQ0EsS0FBQTtJQUNBLE1BQUEsQ0FBQSxVQUFBO0lBQ0EsT0FBQTtLQUNBLFNBQUE7TUFDQSxhQUFBLFFBQUE7Ozs7SUFJQSxNQUFBLGVBQUE7SUFDQSxLQUFBO0lBQ0EsTUFBQSxDQUFBLFVBQUE7SUFDQSxPQUFBO0tBQ0EsU0FBQTtNQUNBLGFBQUEsUUFBQTs7OztJQUlBLE1BQUEsWUFBQTtJQUNBLEtBQUE7SUFDQSxNQUFBLENBQUEsVUFBQTtJQUNBLE9BQUE7S0FDQSxTQUFBO01BQ0EsYUFBQSxRQUFBOzs7O0lBSUEsTUFBQSxjQUFBO0lBQ0EsS0FBQTtJQUNBLE1BQUEsQ0FBQSxVQUFBO0lBQ0EsT0FBQTtLQUNBLFNBQUE7TUFDQSxhQUFBLFFBQUE7Ozs7SUFJQSxNQUFBLGFBQUE7SUFDQSxLQUFBO0lBQ0EsTUFBQSxDQUFBLFVBQUE7SUFDQSxPQUFBO0tBQ0EsU0FBQTtNQUNBLGFBQUEsUUFBQTs7OztJQUlBLE1BQUEsY0FBQTtJQUNBLEtBQUE7SUFDQSxNQUFBLENBQUEsVUFBQTtJQUNBLE9BQUE7S0FDQSxTQUFBO01BQ0EsYUFBQSxRQUFBOzs7O0lBSUEsTUFBQSxlQUFBO0lBQ0EsS0FBQTtJQUNBLE1BQUEsQ0FBQSxVQUFBO0lBQ0EsT0FBQTtLQUNBLFNBQUE7TUFDQSxhQUFBLFFBQUE7Ozs7SUFJQSxNQUFBLGtCQUFBO0lBQ0EsS0FBQTtJQUNBLE1BQUEsQ0FBQSxVQUFBO0lBQ0EsT0FBQTtLQUNBLFNBQUE7TUFDQSxhQUFBLFFBQUE7Ozs7SUFJQSxNQUFBLGdCQUFBO0lBQ0EsS0FBQTtJQUNBLE1BQUEsQ0FBQSxVQUFBO0lBQ0EsT0FBQTtLQUNBLFNBQUE7TUFDQSxhQUFBLFFBQUE7Ozs7SUFJQSxNQUFBLGNBQUE7SUFDQSxLQUFBO0lBQ0EsTUFBQSxDQUFBLFVBQUE7SUFDQSxPQUFBO0tBQ0EsU0FBQTtNQUNBLGFBQUEsUUFBQTs7OztJQUlBLE1BQUEsZ0JBQUE7SUFDQSxLQUFBO0lBQ0EsTUFBQSxDQUFBLFVBQUE7SUFDQSxPQUFBO0tBQ0EsU0FBQTtNQUNBLGFBQUEsUUFBQTs7OztJQUlBLE1BQUEsMkJBQUE7SUFDQSxLQUFBO0lBQ0EsTUFBQSxDQUFBLFVBQUE7SUFDQSxPQUFBO0tBQ0EsU0FBQTtNQUNBLGFBQUEsUUFBQTs7OztJQUlBLE1BQUEsWUFBQTtJQUNBLEtBQUE7SUFDQSxNQUFBLENBQUEsVUFBQTtJQUNBLE9BQUE7S0FDQSxTQUFBO01BQ0EsYUFBQSxRQUFBOzs7Ozs7Ozs7QUN6SUEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGNBQUEsaUNBQUEsU0FBQSxZQUFBLFdBQUE7RUFDQSxXQUFBLElBQUEscUJBQUEsU0FBQSxPQUFBLFFBQUE7O0dBRUEsSUFBQSxRQUFBLFFBQUEsUUFBQSxLQUFBLFNBQUE7SUFDQSxXQUFBLGVBQUEsUUFBQSxLQUFBOzs7O0VBSUEsV0FBQSxJQUFBLHNCQUFBLFNBQUEsT0FBQSxRQUFBO0dBQ0EsT0FBQSxNQUFBOzs7RUFHQSxXQUFBLElBQUEsdUJBQUEsU0FBQSxPQUFBLFFBQUE7R0FDQSxXQUFBLFFBQUE7Ozs7OztBQ2hCQSxDQUFBLFdBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsY0FBQSxpQ0FBQSxVQUFBLHNCQUFBO0VBQ0Esc0JBQUEsaUJBQUE7Ozs7O0FDSkEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGNBQUEsOEJBQUEsU0FBQSxvQkFBQTs7RUFFQSxtQkFBQSxNQUFBO0dBQ0EsZUFBQTtHQUNBLGNBQUE7R0FDQSxZQUFBOzs7OztBQ1JBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxlQUFBLFFBQUEsY0FBQSxVQUFBO0VBQ0EsT0FBQSxTQUFBLE9BQUEsS0FBQTtHQUNBLE9BQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxNQUFBLFFBQUEsc0JBQUEsU0FBQSxJQUFBO0lBQ0EsT0FBQSxJQUFBLE9BQUEsR0FBQSxnQkFBQSxJQUFBLE9BQUEsR0FBQTtRQUNBOzs7OztBQ1BBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxlQUFBLFFBQUEsaUJBQUEsVUFBQTtFQUNBLE9BQUEsU0FBQSxTQUFBLEtBQUE7R0FDQSxLQUFBLENBQUEsS0FBQTtJQUNBLE9BQUE7O0dBRUEsSUFBQSxRQUFBLElBQUEsTUFBQTtHQUNBLEtBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLFFBQUEsS0FBQTtJQUNBLE1BQUEsS0FBQSxNQUFBLEdBQUEsT0FBQSxHQUFBLGdCQUFBLE1BQUEsR0FBQSxNQUFBOztHQUVBLE9BQUEsTUFBQSxLQUFBOzs7O0FDWkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGVBQUEsT0FBQSxzQkFBQSxZQUFBO1FBQ0EsT0FBQSxVQUFBLE9BQUEsT0FBQSxhQUFBO1lBQ0EsSUFBQSxNQUFBLFFBQUE7Z0JBQ0EsT0FBQTs7WUFFQSxJQUFBLFNBQUEsR0FBQTtnQkFDQSxPQUFBOztZQUVBLElBQUEsU0FBQSxNQUFBLFNBQUEsT0FBQTtnQkFDQSxRQUFBLE1BQUEsVUFBQSxHQUFBOztnQkFFQSxJQUFBLENBQUEsYUFBQTtvQkFDQSxJQUFBLFlBQUEsTUFBQSxZQUFBOztvQkFFQSxJQUFBLGNBQUEsQ0FBQSxHQUFBO3dCQUNBLFFBQUEsTUFBQSxPQUFBLEdBQUE7O3VCQUVBO29CQUNBLE9BQUEsTUFBQSxPQUFBLE1BQUEsT0FBQSxPQUFBLEtBQUE7d0JBQ0EsUUFBQSxNQUFBLE9BQUEsR0FBQSxNQUFBLFNBQUE7OztnQkFHQSxPQUFBLFFBQUE7O1lBRUEsT0FBQTs7OztBQzNCQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsZUFBQSxPQUFBLGlCQUFBLFlBQUE7UUFDQSxPQUFBLFVBQUEsT0FBQSxPQUFBO1lBQ0EsSUFBQSxNQUFBLFFBQUE7Z0JBQ0EsT0FBQTs7WUFFQSxJQUFBLFNBQUEsR0FBQTtnQkFDQSxPQUFBOztZQUVBLElBQUEsT0FBQTtnQkFDQSxJQUFBLGFBQUEsTUFBQSxNQUFBO2dCQUNBLElBQUEsV0FBQSxTQUFBLE9BQUE7b0JBQ0EsUUFBQSxXQUFBLE1BQUEsR0FBQSxPQUFBLEtBQUEsT0FBQTs7O1lBR0EsT0FBQTs7OztBQ2pCQSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsZUFBQSxRQUFBLHNCQUFBLFVBQUEsTUFBQTtFQUNBLE9BQUEsVUFBQSxNQUFBO0dBQ0EsT0FBQSxLQUFBLFlBQUE7Ozs7QUNMQSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsZUFBQSxPQUFBLFdBQUEsV0FBQTtFQUNBLE9BQUEsVUFBQSxRQUFBO0dBQ0EsS0FBQSxDQUFBLE9BQUE7SUFDQSxPQUFBOztHQUVBLE9BQUEsTUFBQSxVQUFBLEdBQUEsR0FBQSxnQkFBQSxNQUFBLFVBQUE7Ozs7OztBQ1JBLENBQUEsV0FBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLHdEQUFBLFNBQUEsYUFBQSxjQUFBLGVBQUE7OztFQUdBLElBQUEsVUFBQTtHQUNBLGdCQUFBO0dBQ0EsVUFBQTs7O0VBR0EsT0FBQSxZQUFBLFdBQUEsU0FBQSx1QkFBQTtHQUNBO0tBQ0EsV0FBQTtLQUNBLGtCQUFBO0tBQ0Esb0JBQUEsU0FBQSxVQUFBO0tBQ0EsSUFBQSxTQUFBLFdBQUEsS0FBQTtNQUNBLEtBQUEsSUFBQSxTQUFBLFNBQUEsS0FBQSxRQUFBO09BQ0EsT0FBQSxhQUFBLE1BQUEsU0FBQSxLQUFBLE9BQUEsT0FBQTs7OztLQUlBLDBCQUFBLFNBQUEsU0FBQSxXQUFBLE1BQUEsS0FBQSxTQUFBO0tBQ0EsSUFBQSxjQUFBLEtBQUE7TUFDQSxRQUFBLGdCQUFBLFlBQUEsY0FBQTs7Ozs7Ozs7QUN4QkEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGdCQUFBLFFBQUEsK0JBQUEsU0FBQSxVQUFBOztFQUVBLE9BQUE7R0FDQSxjQUFBLFNBQUEsVUFBQSxPQUFBOztJQUVBLElBQUEsVUFBQTtLQUNBLGFBQUEscUJBQUEsV0FBQSxNQUFBLFdBQUE7OztJQUdBLElBQUEsT0FBQTtLQUNBLFFBQUEsUUFBQSxPQUFBOzs7SUFHQSxPQUFBLFVBQUEsS0FBQTs7O0dBR0EsTUFBQSxVQUFBO0lBQ0EsT0FBQSxVQUFBOzs7R0FHQSxPQUFBLFNBQUEsT0FBQSxRQUFBO0lBQ0EsVUFBQTtLQUNBLFVBQUE7T0FDQSxNQUFBO09BQ0EsUUFBQTtPQUNBLEdBQUE7Ozs7R0FJQSxTQUFBLFNBQUEsT0FBQSxTQUFBO0lBQ0EsT0FBQSxVQUFBO0tBQ0EsVUFBQTtPQUNBLE1BQUE7T0FDQSxRQUFBO09BQ0EsR0FBQTtPQUNBLE9BQUE7Ozs7OztBQ3RDQSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsZ0JBQUEsUUFBQSw2QkFBQSxTQUFBLFNBQUE7O0VBRUEsSUFBQSxRQUFBO0dBQ0EsV0FBQTtHQUNBLFNBQUE7O0VBRUEsT0FBQTtHQUNBLE1BQUEsU0FBQSxRQUFBO0lBQ0EsSUFBQSxDQUFBLFFBQUE7S0FDQSxPQUFBOzs7SUFHQSxPQUFBLFNBQUE7S0FDQSxTQUFBO09BQ0EsUUFBQTtPQUNBLFNBQUE7T0FDQSxPQUFBO09BQ0EsVUFBQTs7O0dBR0EsT0FBQSxTQUFBLFFBQUE7SUFDQSxJQUFBLENBQUEsUUFBQTtLQUNBLE9BQUE7OztJQUdBLE9BQUEsU0FBQTtLQUNBLFNBQUE7T0FDQSxRQUFBO09BQ0EsU0FBQTtPQUNBLE1BQUE7T0FDQSxPQUFBO09BQ0EsVUFBQTs7Ozs7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QSxPQUFBLG1CQUFBLFdBQUEsMEJBQUEsVUFBQTs7Ozs7O0FDSEEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLFdBQUEsNENBQUEsU0FBQSxRQUFBLGNBQUE7O1FBRUEsT0FBQSxPQUFBLFVBQUE7O1lBRUEsY0FBQTs7O1FBR0EsT0FBQSxPQUFBLFVBQUE7U0FDQSxjQUFBOzs7Ozs7O0FDWEEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxRQUFBLG9CQUFBLFlBQUEsbUJBQUEsVUFBQTs7Ozs7O0FDSEEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGtCQUFBLFdBQUEsZUFBQSxXQUFBOztFQUVBLE9BQUE7R0FDQSxVQUFBO0dBQ0EsYUFBQTtHQUNBLFlBQUE7R0FDQSxNQUFBLFVBQUEsT0FBQSxTQUFBLE9BQUE7Ozs7Ozs7O0FBUUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyxcblx0XHRbXG5cdFx0J2FwcC5jb250cm9sbGVycycsXG5cdFx0J2FwcC5maWx0ZXJzJyxcblx0XHQnYXBwLnNlcnZpY2VzJyxcblx0XHQnYXBwLmRpcmVjdGl2ZXMnLFxuXHRcdCdhcHAucm91dGVzJyxcblx0XHQnYXBwLmNvbmZpZydcblx0XHRdKTtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycsIFsndWkucm91dGVyJywgJ25nTWF0ZXJpYWwnLCAnbmdTdG9yYWdlJywgJ3Jlc3Rhbmd1bGFyJywgJ2FuZ3VsYXItbG9hZGluZy1iYXInXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycpLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcblxuXHRcdHZhciBnZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUpe1xuXHRcdFx0cmV0dXJuICcuL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XG5cdFx0fTtcblxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuXHRcdCRzdGF0ZVByb3ZpZGVyXG5cdFx0XHQuc3RhdGUoJ2FwcCcsIHtcblx0XHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0c2lkZWJhcjoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ3NpZGViYXInKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0aGVhZGVyOiB7XG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG1haW46IHt9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuc3RhdGUoJ2FwcC5sYW5kaW5nJywge1xuXHRcdFx0XHR1cmw6ICcvJyxcblx0XHRcdFx0ZGF0YToge3BhZ2VOYW1lOiAnT3ZlcnZpZXcnfSxcblx0XHRcdFx0dmlld3M6IHtcblx0XHRcdFx0XHQnbWFpbkAnOiB7XG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnbGFuZGluZycpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LnN0YXRlKCdhcHAuaW5zdGFsbCcsIHtcblx0XHRcdFx0dXJsOiAnL2luc3RhbGwnLFxuXHRcdFx0XHRkYXRhOiB7cGFnZU5hbWU6ICdJbnN0YWxsJ30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2luc3RhbGwnKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5zdGF0ZSgnYXBwLnRhYnMnLCB7XG5cdFx0XHRcdHVybDogJy9mZWF0dXJlcycsXG5cdFx0XHRcdGRhdGE6IHtwYWdlTmFtZTogJ0ZlYXR1cmVzJ30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ3RhYnMnKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5zdGF0ZSgnYXBwLmRlcGxveScsIHtcblx0XHRcdFx0dXJsOiAnL2RlcGxveScsXG5cdFx0XHRcdGRhdGE6IHtwYWdlTmFtZTogJ0RlcGxveSd9LFxuXHRcdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcdCdtYWluQCc6IHtcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdkZXBsb3knKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5zdGF0ZSgnYXBwLnRoZW1lJywge1xuXHRcdFx0XHR1cmw6ICcvdGhlbWUnLFxuXHRcdFx0XHRkYXRhOiB7cGFnZU5hbWU6ICdUaGVtZSd9LFxuXHRcdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcdCdtYWluQCc6IHtcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCd0aGVtZScpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LnN0YXRlKCdhcHAudG9hc3RzJywge1xuXHRcdFx0XHR1cmw6ICcvdG9hc3RzJyxcblx0XHRcdFx0ZGF0YToge3BhZ2VOYW1lOiAnVG9hc3RzJ30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ3RvYXN0cycpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LnN0YXRlKCdhcHAuZGlhbG9ncycsIHtcblx0XHRcdFx0dXJsOiAnL2RpYWxvZ3MnLFxuXHRcdFx0XHRkYXRhOiB7cGFnZU5hbWU6ICdEaWFsb2dzJ30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2RpYWxvZ3MnKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5zdGF0ZSgnYXBwLmdlbmVyYXRvcnMnLCB7XG5cdFx0XHRcdHVybDogJy9nZW5lcmF0b3JzJyxcblx0XHRcdFx0ZGF0YToge3BhZ2VOYW1lOiAnQXJ0aXNhbiBnZW5lcmF0b3JzJ30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2dlbmVyYXRvcnMnKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5zdGF0ZSgnYXBwLmp3dF9hdXRoJywge1xuXHRcdFx0XHR1cmw6ICcvand0X2F1dGgnLFxuXHRcdFx0XHRkYXRhOiB7cGFnZU5hbWU6ICdKU09OIFdlYiBUb2tlbiBBdXRoZW50aWNhdGlvbid9LFxuXHRcdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcdCdtYWluQCc6IHtcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdqd3RfYXV0aCcpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LnN0YXRlKCdhcHAuZWxpeGlyJywge1xuXHRcdFx0XHR1cmw6ICcvZWxpeGlyJyxcblx0XHRcdFx0ZGF0YToge3BhZ2VOYW1lOiAnRWxpeGlyJ30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2VsaXhpcicpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LnN0YXRlKCdhcHAucmVzdF9hcGknLCB7XG5cdFx0XHRcdHVybDogJy9yZXN0X2FwaScsXG5cdFx0XHRcdGRhdGE6IHtwYWdlTmFtZTogJ1JFU1QgQVBJJ30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Jlc3RfYXBpJylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuc3RhdGUoJ2FwcC51bnN1cHBvcnRlZF9icm93c2VyJywge1xuXHRcdFx0XHR1cmw6ICcvdW5zdXBwb3J0ZWRfYnJvd3NlcicsXG5cdFx0XHRcdGRhdGE6IHtwYWdlTmFtZTogJ1Vuc3VwcG9ydGVkIEJyb3dzZXInfSxcblx0XHRcdFx0dmlld3M6IHtcblx0XHRcdFx0XHQnbWFpbkAnOiB7XG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygndW5zdXBwb3J0ZWRfYnJvd3NlcicpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LnN0YXRlKCdhcHAubWlzYycsIHtcblx0XHRcdFx0dXJsOiAnL21pc2MnLFxuXHRcdFx0XHRkYXRhOiB7cGFnZU5hbWU6ICdNaXNjZWxsYW5lb3VzIGZlYXR1cmVzJ30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ21pc2MnKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblxuXHR9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJG1kU2lkZW5hdil7XG5cdFx0JHJvb3RTY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSl7XG5cblx0XHRcdGlmICh0b1N0YXRlLmRhdGEgJiYgdG9TdGF0ZS5kYXRhLnBhZ2VOYW1lKXtcblx0XHRcdFx0JHJvb3RTY29wZS5jdXJyZW50X3BhZ2UgPSB0b1N0YXRlLmRhdGEucGFnZU5hbWU7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0XHQkcm9vdFNjb3BlLiRvbihcIiR2aWV3Q29udGVudExvYWRlZFwiLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSl7XG5cdFx0XHR3aW5kb3cuUHJpc20uaGlnaGxpZ2h0QWxsKCk7XG5cdFx0fSk7XG5cblx0XHQkcm9vdFNjb3BlLiRvbihcIiRzdGF0ZUNoYW5nZVN1Y2Nlc3NcIiwgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUpe1xuXHRcdFx0JG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XG5cdFx0fSk7XG5cdH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoY2ZwTG9hZGluZ0JhclByb3ZpZGVyKXtcblx0XHRjZnBMb2FkaW5nQmFyUHJvdmlkZXIuaW5jbHVkZVNwaW5uZXIgPSBmYWxzZTtcblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnKS5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XG5cdFx0LyogRm9yIG1vcmUgaW5mbywgdmlzaXQgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnLyMvVGhlbWluZy8wMV9pbnRyb2R1Y3Rpb24gKi9cblx0XHQkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxuXHRcdC5wcmltYXJ5UGFsZXR0ZSgnaW5kaWdvJylcblx0XHQuYWNjZW50UGFsZXR0ZSgnZ3JleScpXG5cdFx0Lndhcm5QYWxldHRlKCdyZWQnKTtcblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAnY2FwaXRhbGl6ZScsIGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBhbGwpIHtcblx0XHRcdHJldHVybiAoISFpbnB1dCkgPyBpbnB1dC5yZXBsYWNlKC8oW15cXFdfXStbXlxccy1dKikgKi9nLGZ1bmN0aW9uKHR4dCl7XG5cdFx0XHRcdHJldHVybiB0eHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eHQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9KSA6ICcnO1xuXHRcdH07XG5cdH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICdodW1hblJlYWRhYmxlJywgZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24gaHVtYW5pemUoc3RyKSB7XG5cdFx0XHRpZiAoICFzdHIgKXtcblx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGZyYWdzID0gc3RyLnNwbGl0KCdfJyk7XG5cdFx0XHRmb3IgKHZhciBpPTA7IGk8ZnJhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0ZnJhZ3NbaV0gPSBmcmFnc1tpXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGZyYWdzW2ldLnNsaWNlKDEpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZyYWdzLmpvaW4oJyAnKTtcblx0XHR9O1xuXHR9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd0cnVuY2F0ZUNoYXJhY3RlcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQsIGNoYXJzLCBicmVha09uV29yZCkge1xuICAgICAgICAgICAgaWYgKGlzTmFOKGNoYXJzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGFycyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlucHV0ICYmIGlucHV0Lmxlbmd0aCA+IGNoYXJzKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcoMCwgY2hhcnMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFicmVha09uV29yZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdHNwYWNlID0gaW5wdXQubGFzdEluZGV4T2YoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGxhc3Qgc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RzcGFjZSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyKDAsIGxhc3RzcGFjZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaW5wdXQuY2hhckF0KGlucHV0Lmxlbmd0aC0xKSA9PT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cigwLCBpbnB1dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQgKyAnLi4uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgfTtcbiAgICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd0cnVuY2F0ZVdvcmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0LCB3b3Jkcykge1xuICAgICAgICAgICAgaWYgKGlzTmFOKHdvcmRzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3b3JkcyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0V29yZHMgPSBpbnB1dC5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dFdvcmRzLmxlbmd0aCA+IHdvcmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXRXb3Jkcy5zbGljZSgwLCB3b3Jkcykuam9pbignICcpICsgJy4uLic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9O1xuICAgIH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAndHJ1c3RIdG1sJywgZnVuY3Rpb24oICRzY2UgKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGh0bWwgKXtcblx0XHRcdHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd1Y2ZpcnN0JywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCBpbnB1dCApIHtcblx0XHRcdGlmICggIWlucHV0ICl7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGlucHV0LnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgaW5wdXQuc3Vic3RyaW5nKDEpO1xuXHRcdH07XG5cdH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJykuZmFjdG9yeSgnQVBJJywgZnVuY3Rpb24oUmVzdGFuZ3VsYXIsIFRvYXN0U2VydmljZSwgJGxvY2FsU3RvcmFnZSkge1xuXG5cdFx0Ly9jb250ZW50IG5lZ290aWF0aW9uXG5cdFx0dmFyIGhlYWRlcnMgPSB7XG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0J0FjY2VwdCc6ICdhcHBsaWNhdGlvbi94LmxhcmF2ZWwudjEranNvbidcblx0XHR9O1xuXG5cdFx0cmV0dXJuIFJlc3Rhbmd1bGFyLndpdGhDb25maWcoZnVuY3Rpb24oUmVzdGFuZ3VsYXJDb25maWd1cmVyKSB7XG5cdFx0XHRSZXN0YW5ndWxhckNvbmZpZ3VyZXJcblx0XHRcdFx0LnNldEJhc2VVcmwoJy9hcGkvJylcblx0XHRcdFx0LnNldERlZmF1bHRIZWFkZXJzKGhlYWRlcnMpXG5cdFx0XHRcdC5zZXRFcnJvckludGVyY2VwdG9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDIyKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBlcnJvciBpbiByZXNwb25zZS5kYXRhLmVycm9ycykge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gVG9hc3RTZXJ2aWNlLmVycm9yKHJlc3BvbnNlLmRhdGEuZXJyb3JzW2Vycm9yXVswXSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuYWRkRnVsbFJlcXVlc3RJbnRlcmNlcHRvcihmdW5jdGlvbihlbGVtZW50LCBvcGVyYXRpb24sIHdoYXQsIHVybCwgaGVhZGVycykge1xuXHRcdFx0XHRcdGlmICgkbG9jYWxTdG9yYWdlLmp3dCkge1xuXHRcdFx0XHRcdFx0aGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgJGxvY2FsU3RvcmFnZS5qd3Q7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnRGlhbG9nU2VydmljZScsIGZ1bmN0aW9uKCRtZERpYWxvZyl7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0ZnJvbVRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSwgJHNjb3BlKXtcblxuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4vdmlld3MvZGlhbG9ncy8nICsgdGVtcGxhdGUgKyAnLycgKyB0ZW1wbGF0ZSArICcuaHRtbCdcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoJHNjb3BlKXtcblx0XHRcdFx0XHRvcHRpb25zLnNjb3BlID0gJHNjb3BlLiRuZXcoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAkbWREaWFsb2cuc2hvdyhvcHRpb25zKTtcblx0XHRcdH0sXG5cblx0XHRcdGhpZGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybiAkbWREaWFsb2cuaGlkZSgpO1xuXHRcdFx0fSxcblxuXHRcdFx0YWxlcnQ6IGZ1bmN0aW9uKHRpdGxlLCBjb250ZW50KXtcblx0XHRcdFx0JG1kRGlhbG9nLnNob3coXG5cdFx0XHRcdFx0JG1kRGlhbG9nLmFsZXJ0KClcblx0XHRcdFx0XHRcdC50aXRsZSh0aXRsZSlcblx0XHRcdFx0XHRcdC5jb250ZW50KGNvbnRlbnQpXG5cdFx0XHRcdFx0XHQub2soJ09rJylcblx0XHRcdFx0KTtcblx0XHRcdH0sXG5cblx0XHRcdGNvbmZpcm06IGZ1bmN0aW9uKHRpdGxlLCBjb250ZW50KSB7XG5cdFx0XHRcdHJldHVybiAkbWREaWFsb2cuc2hvdyhcblx0XHRcdFx0XHQkbWREaWFsb2cuY29uZmlybSgpXG5cdFx0XHRcdFx0XHQudGl0bGUodGl0bGUpXG5cdFx0XHRcdFx0XHQuY29udGVudChjb250ZW50KVxuXHRcdFx0XHRcdFx0Lm9rKCdPaycpXG5cdFx0XHRcdFx0XHQuY2FuY2VsKCdDYW5jZWwnKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnVG9hc3RTZXJ2aWNlJywgZnVuY3Rpb24oJG1kVG9hc3Qpe1xuXG5cdFx0dmFyIGRlbGF5ID0gNjAwMCxcblx0XHRcdHBvc2l0aW9uID0gJ3RvcCByaWdodCcsXG5cdFx0XHRhY3Rpb24gPSAnT0snO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHNob3c6IGZ1bmN0aW9uKGNvbnRlbnQpe1xuXHRcdFx0XHRpZiAoIWNvbnRlbnQpe1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAkbWRUb2FzdC5zaG93KFxuXHRcdFx0XHRcdCRtZFRvYXN0LnNpbXBsZSgpXG5cdFx0XHRcdFx0XHQuY29udGVudChjb250ZW50KVxuXHRcdFx0XHRcdFx0LnBvc2l0aW9uKHBvc2l0aW9uKVxuXHRcdFx0XHRcdFx0LmFjdGlvbihhY3Rpb24pXG5cdFx0XHRcdFx0XHQuaGlkZURlbGF5KGRlbGF5KVxuXHRcdFx0XHQpO1xuXHRcdFx0fSxcblx0XHRcdGVycm9yOiBmdW5jdGlvbihjb250ZW50KXtcblx0XHRcdFx0aWYgKCFjb250ZW50KXtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gJG1kVG9hc3Quc2hvdyhcblx0XHRcdFx0XHQkbWRUb2FzdC5zaW1wbGUoKVxuXHRcdFx0XHRcdFx0LmNvbnRlbnQoY29udGVudClcblx0XHRcdFx0XHRcdC5wb3NpdGlvbihwb3NpdGlvbilcblx0XHRcdFx0XHRcdC50aGVtZSgnd2FybicpXG5cdFx0XHRcdFx0XHQuYWN0aW9uKGFjdGlvbilcblx0XHRcdFx0XHRcdC5oaWRlRGVsYXkoZGVsYXkpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG59KSgpOyIsIihmdW5jdGlvbigpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0RpYWxvZ3NDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBEaWFsb2dTZXJ2aWNlKSB7XG5cblx0XHQkc2NvcGUuY29uZmlybV9tZXNzYWdlID0gJyc7XG5cblx0XHQkc2NvcGUuYWxlcnREaWFsb2cgPSBmdW5jdGlvbigpIHtcblx0XHRcdERpYWxvZ1NlcnZpY2UuYWxlcnQoJ1RoaXMgaXMgYW4gYWxlcnQgdGl0bGUnLCAnWW91IGNhbiBzcGVjaWZ5IHNvbWUgZGVzY3JpcHRpb24gdGV4dCBpbiBoZXJlLicpO1xuXHRcdH07XG5cblx0XHQkc2NvcGUuY29uZmlybURpYWxvZyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0RGlhbG9nU2VydmljZS5jb25maXJtKCdUaGlzIGlzIGEgY29uZmlybSB0aXRsZScsICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZG8gdGhpcz8nKS50aGVuKFxuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkc2NvcGUuY29uZmlybV9tZXNzYWdlID0gJ0NvbmZpcm0gU3VjY2VzcyBjYWxsYmFjayc7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCRzY29wZS5jb25maXJtX21lc3NhZ2UgPSAnQ29uZmlybSBDYW5jZWwgY2FsbGJhY2snO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH07XG5cblx0XHQkc2NvcGUuY3VzdG9tRGlhbG9nID0gZnVuY3Rpb24oKSB7XG5cdFx0XHREaWFsb2dTZXJ2aWNlLmZyb21UZW1wbGF0ZSgnYWRkX3VzZXJzJywgJHNjb3BlKTtcblx0XHR9O1xuXHR9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0VsaXhpckN0cmwnLCBmdW5jdGlvbigpe1xuICAgICAgICAvL1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignR2VuZXJhdG9yc0N0cmwnLCBmdW5jdGlvbigpe1xuICAgICAgICAvL1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIZWFkZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkbWRTaWRlbmF2LCAkbG9nKXtcblxuXHRcdCRzY29wZS4kd2F0Y2goZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkcm9vdFNjb3BlLmN1cnJlbnRfcGFnZTtcblx0XHR9LCBmdW5jdGlvbihuZXdQYWdlKXtcblx0XHRcdCRzY29wZS5jdXJyZW50X3BhZ2UgPSBuZXdQYWdlIHx8ICdQYWdlIE5hbWUnO1xuXHRcdH0pO1xuXG5cdFx0JHNjb3BlLm9wZW5TaWRlTmF2ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQkbWRTaWRlbmF2KCdsZWZ0Jykub3BlbigpO1xuXHRcdH07XG5cblx0fSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdKd3RBdXRoQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgQVBJLCAkbG9jYWxTdG9yYWdlKXtcblxuXHRcdCRzY29wZS5zdGVwID0gMTtcblx0XHQkc2NvcGUub3V0cHV0ID0gbnVsbDtcblx0XHQkc2NvcGUuJGxvY2FsU3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG5cblx0XHQvL21ha2Ugc3VyZSB5b3UgcnVuIGBwaHAgYXJ0aXNhbiBkYjpzZWVkYCBzbyB0aGF0IHRoaXMgbG9naW4gd29ya3Ncblx0XHQkc2NvcGUudXNlciA9IHtcblx0XHRcdGVtYWlsOiAnam91YnJhbi5qYWRAZ21haWwuY29tJyxcblx0XHRcdHBhc3N3b3JkOiAnbGFyYXZlbF9hbmd1bGFyJ1xuXHRcdH07XG5cblx0XHQkc2NvcGUucmVxdWVzdFRva2VuID0gZnVuY3Rpb24oKXtcblx0XHRcdEFQSS5hbGwoJ3NhbXBsZScpLmdldCgncHJvdGVjdGVkJykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRcdCRzY29wZS5vdXRwdXQgPSByZXNwb25zZS5kYXRhLmpvaW4oJyAnKTtcblx0XHRcdFx0JHNjb3BlLm91dHB1dFN0YXR1cyA9IHsnY29sb3InOiAnZ3JlZW4nfTtcblx0XHRcdH0sIGZ1bmN0aW9uKGVycm9yKXtcblx0XHRcdFx0JHNjb3BlLm91dHB1dCA9IGVycm9yLmRhdGEubWVzc2FnZTtcblx0XHRcdFx0JHNjb3BlLm91dHB1dFN0YXR1cyA9IHsnY29sb3InOiAncmVkJ307XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKXtcblx0XHRcdEFQSS5hbGwoJ3VzZXJzL2xvZ2luJykucG9zdCgkc2NvcGUudXNlcikudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRcdCRzY29wZS5vdXRwdXQgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhKTtcblx0XHRcdFx0JGxvY2FsU3RvcmFnZS5qd3QgPSByZXNwb25zZS5kYXRhLnRva2VuO1xuXHRcdFx0XHQkc2NvcGUub3V0cHV0U3RhdHVzID0geydjb2xvcic6ICdncmVlbid9O1xuXHRcdFx0XHQkc2NvcGUubmV4dFN0ZXAoKTtcblx0XHRcdH0sIGZ1bmN0aW9uKGVycm9yKXtcblx0XHRcdFx0JHNjb3BlLm91dHB1dCA9ICdBcmUgeW91IHN1cmUgeW91IGhhdmUgeW91ciBkYXRhYmFzZSBzZXR1cD8gRXJyb3I6ICcuIGVycm9yLmRhdGEubWVzc2FnZTtcblx0XHRcdFx0JHNjb3BlLm91dHB1dFN0YXR1cyA9IHsnY29sb3InOiAncmVkJ307XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLm5leHRTdGVwID0gZnVuY3Rpb24oKXtcblx0XHRcdCRzY29wZS5zdGVwKys7XG5cdFx0fTtcblxuXHR9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTGFuZGluZ0N0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuXG5cdFx0JHNjb3BlLnByb21vSW1hZ2UgPSAnaHR0cHM6Ly9pLmltZ3VyLmNvbS9aYkx6T1BQLmpwZyc7XG5cblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24gKCl7XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ01pc2NDdHJsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy9cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1Jlc3RBcGlDdHJsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy9cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignU2lkZWJhckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSl7XG5cblxuXHR9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBmdW5jdGlvbigpe1xuXG5cdH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignVG9hc3RzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVG9hc3RTZXJ2aWNlKXtcblxuXHRcdCRzY29wZS50b2FzdFN1Y2Nlc3MgPSBmdW5jdGlvbigpe1xuXHRcdFx0VG9hc3RTZXJ2aWNlLnNob3coJ1VzZXIgYWRkZWQgc3VjY2Vzc2Z1bGx5IScpO1xuXHRcdH07XG5cblx0XHQkc2NvcGUudG9hc3RFcnJvciA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRUb2FzdFNlcnZpY2UuZXJyb3IoJ0Nvbm5lY3Rpb24gaW50ZXJydXB0ZWQhJyk7XG5cdFx0fTtcblxuXHR9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1Vuc3VwcG9ydGVkQnJvd3NlckN0cmwnLCBmdW5jdGlvbigpe1xuICAgICAgICAvL1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQWRkVXNlcnNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBEaWFsb2dTZXJ2aWNlKXtcblxuICAgICAgICAkc2NvcGUuc2F2ZSA9IGZ1bmN0aW9uKCl7XG5cdCAgICAgICAgLy9kbyBzb21ldGhpbmcgdXNlZnVsXG4gICAgICAgICAgICBEaWFsb2dTZXJ2aWNlLmhpZGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuaGlkZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0RGlhbG9nU2VydmljZS5oaWRlKCk7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSggJ2FwcC5jb250cm9sbGVycycgKS5jb250cm9sbGVyKCAnRGF0YUxpc3RpbmdDdHJsJywgZnVuY3Rpb24oKXtcblx0XHQvL1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSggJ2RhdGFMaXN0aW5nJywgZnVuY3Rpb24oKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFQScsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2RpcmVjdGl2ZXMvZGF0YV9saXN0aW5nL2RhdGFfbGlzdGluZy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdEYXRhTGlzdGluZ0N0cmwnLFxuXHRcdFx0bGluazogZnVuY3Rpb24oIHNjb3BlLCBlbGVtZW50LCBhdHRycyApe1xuXHRcdFx0XHQvL1xuXHRcdFx0fVxuXHRcdH07XG5cblx0fSk7XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
