(function(){
	"use strict";

	angular.module('app',
		[
		'app.controllers',
		'app.filters',
		'app.services',
		'app.directives',
		'app.routes',
		'app.config',
		'partialsModule'
		]);

	angular.module('app.routes', []);
	angular.module('app.controllers', ['ui.router', 'ngMaterial', 'ngStorage', 'restangular', 'angular-loading-bar', 'satellizer']);
	angular.module('app.filters', []);
	angular.module('app.services', []);
	angular.module('app.directives', []);
	angular.module('app.config', []);

})();

(function(){
	"use strict";

	angular.module('app.routes').config(["$stateProvider", "$urlRouterProvider", "$authProvider", function($stateProvider, $urlRouterProvider, $authProvider){

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

	angular.module('app.config').config(["$authProvider", function($authProvider) {

		/* Configuration file for Satellizer's handling of login authentication */		
		$authProvider.storageType = 'localStorage';
		$authProvider.tokenName = 'token';
		$authProvider.httpInterceptor = false;
	    $authProvider.facebook({
	      clientId: 'Facebook App ID'
	    });

	    $authProvider.google({
	      clientId: 'Google Client ID'
	    });

	    $authProvider.github({
	      clientId: 'GitHub Client ID'
	    });

	    $authProvider.linkedin({
	      clientId: 'LinkedIn Client ID'
	    });

	    $authProvider.instagram({
	      clientId: 'Instagram Client ID'
	    });

	    $authProvider.yahoo({
	      clientId: 'Yahoo Client ID / Consumer Key'
	    });

	    $authProvider.live({
	      clientId: 'Microsoft Client ID'
	    });

	    $authProvider.twitch({
	      clientId: 'Twitch Client ID'
	    });

	    $authProvider.bitbucket({
	      clientId: 'Bitbucket Client ID'
	    });

	    // No additional setup required for Twitter

	    $authProvider.oauth2({
	      name: 'foursquare',
	      url: '/auth/foursquare',
	      clientId: 'Foursquare Client ID',
	      redirectUri: window.location.origin,
	      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
	    });
	
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
		return function(input) {
			return (input) ? input.replace(/([^\W_]+[^\s-]*) */g,function(txt){
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
(function(){
    "use strict";

    angular.module('app.controllers').controller('FooterController', FooterController);

    function FooterController(){
        //
    }

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('HeaderController', HeaderController);

    function HeaderController(){
        //
    }

})();

(function() {
	"use strict";

	angular.module('app.controllers').controller('LandingController', LandingController);

	function LandingController() {
		var vm = this;

		vm.laravel_description = 'Response macros integrated with your Angular app';
		vm.angular_description = 'Query your API without worrying about validations';

		/*
		This is a terrible temporary hack,
		to fix layout issues with flex on iOS (chrome & safari)
		Make sure to remove this when you modify this demo
		*/
		vm.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
	}

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('LoginController', LoginController);

    function LoginController(){
        //
    }

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('RegisterController', RegisterController);

    function RegisterController(){
        //
    }

})();

(function(){
    "use strict";

    angular.module('app.directives').directive('loginForm', loginFormDefinition);

    function loginFormDefinition() {

      var directive = {
        restrict: 'E',
        templateUrl: './views/directives/login-form/login-form.html',
        controller: 'LoginFormController',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
      };

      return directive;
    }
})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('LoginFormController', LoginFormController);

    function LoginFormController($auth, $log, $location, ToastService, $localStorage){
        var vm = this;

	    vm.authenticate = function(provider) {
	      $auth.authenticate(provider);
	    };

		vm.login = function() {
			var user = {
			  email: vm.email,
			  password: vm.password
			};

			$log.info('Logging in...');

			$auth.login(user)
			  .then(function(response) {
$log.info(angular.toJson(response.data.token));
				// $auth.setToken(response.data.token);
$log.info($localStorage.jwt);
			    // Redirect user here after a successful log in.
				ToastService.show('Login successful');
				$location.path('api/sample/protected');
			  })
			  .catch(function(response) {
			    // Handle errors here, such as displaying a notification
			    // for invalid email and/or password.
				ToastService.error(response.data.errors);
			  });
		};
    }
    LoginFormController.$inject = ["$auth", "$log", "$location", "ToastService", "$localStorage"];

})();

(function(){
    "use strict";

    angular.module('app.directives').directive('registerForm', registerFormDefinition);

    function registerFormDefinition() {

      var directive = {
        restrict: 'E',
        templateUrl: './views/directives/register-form/register-form.html',
        controller: 'RegisterFormController',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
      };

      return directive;
    }
})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('RegisterFormController', RegisterFormController);

    function RegisterFormController(){
        var vm = this;

        //
    }

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJjb25maWcvbG9hZGluZ19iYXIuY29uZmlnLmpzIiwiY29uZmlnL2xvZ2luLmNvbmZpZy5qcyIsImNvbmZpZy90aGVtZS5jb25maWcuanMiLCJmaWx0ZXJzL2NhcGl0YWxpemUuZmlsdGVyLmpzIiwiZmlsdGVycy9odW1hbl9yZWFkYWJsZS5maWx0ZXIuanMiLCJmaWx0ZXJzL3RydW5jYXRlX2NoYXJhY3RlcnMuZmlsdGVyLmpzIiwiZmlsdGVycy90cnVuY2F0ZV93b3Jkcy5qcyIsImZpbHRlcnMvdHJ1c3RfaHRtbC5maWx0ZXIuanMiLCJmaWx0ZXJzL3VjZmlyc3QuZmlsdGVyLmpzIiwic2VydmljZXMvQVBJLnNlcnZpY2UuanMiLCJzZXJ2aWNlcy9kaWFsb2cuc2VydmljZS5qcyIsInNlcnZpY2VzL3RvYXN0LnNlcnZpY2UuanMiLCJhcHAvZm9vdGVyL2Zvb3Rlci5jb250cm9sbGVyLmpzIiwiYXBwL2hlYWRlci9oZWFkZXIuY29udHJvbGxlci5qcyIsImFwcC9sYW5kaW5nL2xhbmRpbmcuY29udHJvbGxlci5qcyIsImFwcC9sb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzIiwiYXBwL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbnRyb2xsZXIuanMiLCJkaXJlY3RpdmVzL2xvZ2luLWZvcm0vbG9naW4tZm9ybS5kZWZpbml0aW9uLmpzIiwiZGlyZWN0aXZlcy9sb2dpbi1mb3JtL2xvZ2luLWZvcm0uZGlyZWN0aXZlLmpzIiwiZGlyZWN0aXZlcy9yZWdpc3Rlci1mb3JtL3JlZ2lzdGVyLWZvcm0uZGVmaW5pdGlvbi5qcyIsImRpcmVjdGl2ZXMvcmVnaXN0ZXItZm9ybS9yZWdpc3Rlci1mb3JtLmRpcmVjdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7Q0FHQSxRQUFBLE9BQUEsY0FBQTtDQUNBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGFBQUEsY0FBQSxhQUFBLGVBQUEsdUJBQUE7Q0FDQSxRQUFBLE9BQUEsZUFBQTtDQUNBLFFBQUEsT0FBQSxnQkFBQTtDQUNBLFFBQUEsT0FBQSxrQkFBQTtDQUNBLFFBQUEsT0FBQSxjQUFBOzs7O0FDbkJBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxjQUFBLGlFQUFBLFNBQUEsZ0JBQUEsb0JBQUEsY0FBQTs7RUFFQSxJQUFBLFVBQUEsU0FBQSxTQUFBO0dBQ0EsT0FBQSxpQkFBQSxXQUFBLE1BQUEsV0FBQTs7O0VBR0EsbUJBQUEsVUFBQTs7RUFFQTtJQUNBLE1BQUEsT0FBQTtJQUNBLFVBQUE7SUFDQSxPQUFBO0tBQ0EsUUFBQTtNQUNBLGFBQUEsUUFBQTs7S0FFQSxRQUFBO01BQ0EsYUFBQSxRQUFBOztLQUVBLE1BQUE7OztJQUdBLE1BQUEsZUFBQTtJQUNBLEtBQUE7SUFDQSxNQUFBO0lBQ0EsT0FBQTtLQUNBLFNBQUE7TUFDQSxhQUFBLFFBQUE7Ozs7SUFJQSxNQUFBLGFBQUE7SUFDQSxLQUFBO0lBQ0EsTUFBQTtJQUNBLE9BQUE7S0FDQSxTQUFBO01BQ0EsYUFBQSxRQUFBOzs7O0lBSUEsTUFBQSxnQkFBQTtJQUNBLEtBQUE7SUFDQSxNQUFBO0lBQ0EsT0FBQTtLQUNBLFNBQUE7TUFDQSxhQUFBLFFBQUE7Ozs7Ozs7O0FDL0NBLENBQUEsV0FBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxjQUFBLGlDQUFBLFVBQUEsc0JBQUE7RUFDQSxzQkFBQSxpQkFBQTs7Ozs7QUNKQSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsY0FBQSx5QkFBQSxTQUFBLGVBQUE7OztFQUdBLGNBQUEsY0FBQTtFQUNBLGNBQUEsWUFBQTtFQUNBLGNBQUEsa0JBQUE7S0FDQSxjQUFBLFNBQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLE9BQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLE9BQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLFNBQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLFVBQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLE1BQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLEtBQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLE9BQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLFVBQUE7T0FDQSxVQUFBOzs7OztLQUtBLGNBQUEsT0FBQTtPQUNBLE1BQUE7T0FDQSxLQUFBO09BQ0EsVUFBQTtPQUNBLGFBQUEsT0FBQSxTQUFBO09BQ0EsdUJBQUE7Ozs7Ozs7QUNwREEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGNBQUEsOEJBQUEsU0FBQSxvQkFBQTs7RUFFQSxtQkFBQSxNQUFBO0dBQ0EsZUFBQTtHQUNBLGNBQUE7R0FDQSxZQUFBOzs7OztBQ1JBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxlQUFBLFFBQUEsY0FBQSxVQUFBO0VBQ0EsT0FBQSxTQUFBLE9BQUE7R0FDQSxPQUFBLENBQUEsU0FBQSxNQUFBLFFBQUEsc0JBQUEsU0FBQSxJQUFBO0lBQ0EsT0FBQSxJQUFBLE9BQUEsR0FBQSxnQkFBQSxJQUFBLE9BQUEsR0FBQTtRQUNBOzs7OztBQ1BBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxlQUFBLFFBQUEsaUJBQUEsVUFBQTtFQUNBLE9BQUEsU0FBQSxTQUFBLEtBQUE7R0FDQSxLQUFBLENBQUEsS0FBQTtJQUNBLE9BQUE7O0dBRUEsSUFBQSxRQUFBLElBQUEsTUFBQTtHQUNBLEtBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLFFBQUEsS0FBQTtJQUNBLE1BQUEsS0FBQSxNQUFBLEdBQUEsT0FBQSxHQUFBLGdCQUFBLE1BQUEsR0FBQSxNQUFBOztHQUVBLE9BQUEsTUFBQSxLQUFBOzs7O0FDWkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGVBQUEsT0FBQSxzQkFBQSxZQUFBO1FBQ0EsT0FBQSxVQUFBLE9BQUEsT0FBQSxhQUFBO1lBQ0EsSUFBQSxNQUFBLFFBQUE7Z0JBQ0EsT0FBQTs7WUFF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SUFHQSxPQUFBLFNBQUE7S0FDQSxTQUFBO09BQ0EsUUFBQTtPQUNBLFNBQUE7T0FDQSxPQUFBO09BQ0EsVUFBQTs7O0dBR0EsT0FBQSxTQUFBLFFBQUE7SUFDQSxJQUFBLENBQUEsUUFBQTtLQUNBLE9BQUE7OztJQUdBLE9BQUEsU0FBQTtLQUNBLFNBQUE7T0FDQSxRQUFBO09BQ0EsU0FBQTtPQUNBLE1BQUE7T0FDQSxPQUFBO09BQ0EsVUFBQTs7Ozs7O0FDbENBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLG9CQUFBOztJQUVBLFNBQUEsa0JBQUE7Ozs7OztBQ0xBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLG9CQUFBOztJQUVBLFNBQUEsa0JBQUE7Ozs7OztBQ0xBLENBQUEsV0FBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHFCQUFBOztDQUVBLFNBQUEsb0JBQUE7RUFDQSxJQUFBLEtBQUE7O0VBRUEsR0FBQSxzQkFBQTtFQUNBLEdBQUEsc0JBQUE7Ozs7Ozs7RUFPQSxHQUFBLE1BQUEsbUJBQUEsS0FBQSxVQUFBOzs7OztBQ2hCQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsV0FBQSxtQkFBQTs7SUFFQSxTQUFBLGlCQUFBOzs7Ozs7QUNMQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsV0FBQSxzQkFBQTs7SUFFQSxTQUFBLG9CQUFBOzs7Ozs7QUNMQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsa0JBQUEsVUFBQSxhQUFBOztJQUVBLFNBQUEsc0JBQUE7O01BRUEsSUFBQSxZQUFBO1FBQ0EsVUFBQTtRQUNBLGFBQUE7UUFDQSxZQUFBO1FBQ0EsY0FBQTtRQUNBLE9BQUE7UUFDQSxrQkFBQTs7O01BR0EsT0FBQTs7OztBQ2hCQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsV0FBQSx1QkFBQTs7SUFFQSxTQUFBLG9CQUFBLE9BQUEsTUFBQSxXQUFBLGNBQUEsY0FBQTtRQUNBLElBQUEsS0FBQTs7S0FFQSxHQUFBLGVBQUEsU0FBQSxVQUFBO09BQ0EsTUFBQSxhQUFBOzs7RUFHQSxHQUFBLFFBQUEsV0FBQTtHQUNBLElBQUEsT0FBQTtLQUNBLE9BQUEsR0FBQTtLQUNBLFVBQUEsR0FBQTs7O0dBR0EsS0FBQSxLQUFBOztHQUVBLE1BQUEsTUFBQTtNQUNBLEtBQUEsU0FBQSxVQUFBO0FBQ0EsS0FBQSxLQUFBLFFBQUEsT0FBQSxTQUFBLEtBQUE7O0FBRUEsS0FBQSxLQUFBLGNBQUE7O0lBRUEsYUFBQSxLQUFBO0lBQ0EsVUFBQSxLQUFBOztNQUVBLE1BQUEsU0FBQSxVQUFBOzs7SUFHQSxhQUFBLE1BQUEsU0FBQSxLQUFBOzs7Ozs7OztBQ2hDQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsa0JBQUEsVUFBQSxnQkFBQTs7SUFFQSxTQUFBLHlCQUFBOztNQUVBLElBQUEsWUFBQTtRQUNBLFVBQUE7UUFDQSxhQUFBO1FBQ0EsWUFBQTtRQUNBLGNBQUE7UUFDQSxPQUFBO1FBQ0Esa0JBQUE7OztNQUdBLE9BQUE7Ozs7QUNoQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLFdBQUEsMEJBQUE7O0lBRUEsU0FBQSx3QkFBQTtRQUNBLElBQUEsS0FBQTs7Ozs7O0FBTUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuXHRcdFtcblx0XHQnYXBwLmNvbnRyb2xsZXJzJyxcblx0XHQnYXBwLmZpbHRlcnMnLFxuXHRcdCdhcHAuc2VydmljZXMnLFxuXHRcdCdhcHAuZGlyZWN0aXZlcycsXG5cdFx0J2FwcC5yb3V0ZXMnLFxuXHRcdCdhcHAuY29uZmlnJyxcblx0XHQncGFydGlhbHNNb2R1bGUnXG5cdFx0XSk7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ25nU3RvcmFnZScsICdyZXN0YW5ndWxhcicsICdhbmd1bGFyLWxvYWRpbmctYmFyJywgJ3NhdGVsbGl6ZXInXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycpLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkYXV0aFByb3ZpZGVyKXtcblxuXHRcdHZhciBnZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUpe1xuXHRcdFx0cmV0dXJuICcuL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XG5cdFx0fTtcblxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuXHRcdCRzdGF0ZVByb3ZpZGVyXG5cdFx0XHQuc3RhdGUoJ2FwcCcsIHtcblx0XHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0aGVhZGVyOiB7XG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGZvb3Rlcjoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRtYWluOiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LnN0YXRlKCdhcHAubGFuZGluZycsIHtcblx0XHRcdFx0dXJsOiAnLycsXG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcdCdtYWluQCc6IHtcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdsYW5kaW5nJylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuc3RhdGUoJ2FwcC5sb2dpbicsIHtcblx0XHRcdFx0dXJsOiAnL2xvZ2luJyxcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xvZ2luJylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuc3RhdGUoJ2FwcC5yZWdpc3RlcicsIHtcblx0XHRcdFx0dXJsOiAnL3JlZ2lzdGVyJyxcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ3JlZ2lzdGVyJylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbiAoKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnKS5jb25maWcoZnVuY3Rpb24gKGNmcExvYWRpbmdCYXJQcm92aWRlcil7XG5cdFx0Y2ZwTG9hZGluZ0JhclByb3ZpZGVyLmluY2x1ZGVTcGlubmVyID0gZmFsc2U7XG5cdH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uKCRhdXRoUHJvdmlkZXIpIHtcblxuXHRcdC8qIENvbmZpZ3VyYXRpb24gZmlsZSBmb3IgU2F0ZWxsaXplcidzIGhhbmRsaW5nIG9mIGxvZ2luIGF1dGhlbnRpY2F0aW9uICovXHRcdFxuXHRcdCRhdXRoUHJvdmlkZXIuc3RvcmFnZVR5cGUgPSAnbG9jYWxTdG9yYWdlJztcblx0XHQkYXV0aFByb3ZpZGVyLnRva2VuTmFtZSA9ICd0b2tlbic7XG5cdFx0JGF1dGhQcm92aWRlci5odHRwSW50ZXJjZXB0b3IgPSBmYWxzZTtcblx0ICAgICRhdXRoUHJvdmlkZXIuZmFjZWJvb2soe1xuXHQgICAgICBjbGllbnRJZDogJ0ZhY2Vib29rIEFwcCBJRCdcblx0ICAgIH0pO1xuXG5cdCAgICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG5cdCAgICAgIGNsaWVudElkOiAnR29vZ2xlIENsaWVudCBJRCdcblx0ICAgIH0pO1xuXG5cdCAgICAkYXV0aFByb3ZpZGVyLmdpdGh1Yih7XG5cdCAgICAgIGNsaWVudElkOiAnR2l0SHViIENsaWVudCBJRCdcblx0ICAgIH0pO1xuXG5cdCAgICAkYXV0aFByb3ZpZGVyLmxpbmtlZGluKHtcblx0ICAgICAgY2xpZW50SWQ6ICdMaW5rZWRJbiBDbGllbnQgSUQnXG5cdCAgICB9KTtcblxuXHQgICAgJGF1dGhQcm92aWRlci5pbnN0YWdyYW0oe1xuXHQgICAgICBjbGllbnRJZDogJ0luc3RhZ3JhbSBDbGllbnQgSUQnXG5cdCAgICB9KTtcblxuXHQgICAgJGF1dGhQcm92aWRlci55YWhvbyh7XG5cdCAgICAgIGNsaWVudElkOiAnWWFob28gQ2xpZW50IElEIC8gQ29uc3VtZXIgS2V5J1xuXHQgICAgfSk7XG5cblx0ICAgICRhdXRoUHJvdmlkZXIubGl2ZSh7XG5cdCAgICAgIGNsaWVudElkOiAnTWljcm9zb2Z0IENsaWVudCBJRCdcblx0ICAgIH0pO1xuXG5cdCAgICAkYXV0aFByb3ZpZGVyLnR3aXRjaCh7XG5cdCAgICAgIGNsaWVudElkOiAnVHdpdGNoIENsaWVudCBJRCdcblx0ICAgIH0pO1xuXG5cdCAgICAkYXV0aFByb3ZpZGVyLmJpdGJ1Y2tldCh7XG5cdCAgICAgIGNsaWVudElkOiAnQml0YnVja2V0IENsaWVudCBJRCdcblx0ICAgIH0pO1xuXG5cdCAgICAvLyBObyBhZGRpdGlvbmFsIHNldHVwIHJlcXVpcmVkIGZvciBUd2l0dGVyXG5cblx0ICAgICRhdXRoUHJvdmlkZXIub2F1dGgyKHtcblx0ICAgICAgbmFtZTogJ2ZvdXJzcXVhcmUnLFxuXHQgICAgICB1cmw6ICcvYXV0aC9mb3Vyc3F1YXJlJyxcblx0ICAgICAgY2xpZW50SWQ6ICdGb3Vyc3F1YXJlIENsaWVudCBJRCcsXG5cdCAgICAgIHJlZGlyZWN0VXJpOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuXHQgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2ZvdXJzcXVhcmUuY29tL29hdXRoMi9hdXRoZW50aWNhdGUnLFxuXHQgICAgfSk7XG5cdFxufSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnKS5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XG5cdFx0LyogRm9yIG1vcmUgaW5mbywgdmlzaXQgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnLyMvVGhlbWluZy8wMV9pbnRyb2R1Y3Rpb24gKi9cblx0XHQkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxuXHRcdC5wcmltYXJ5UGFsZXR0ZSgnaW5kaWdvJylcblx0XHQuYWNjZW50UGFsZXR0ZSgnZ3JleScpXG5cdFx0Lndhcm5QYWxldHRlKCdyZWQnKTtcblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAnY2FwaXRhbGl6ZScsIGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0XHRyZXR1cm4gKGlucHV0KSA/IGlucHV0LnJlcGxhY2UoLyhbXlxcV19dK1teXFxzLV0qKSAqL2csZnVuY3Rpb24odHh0KXtcblx0XHRcdFx0cmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0pIDogJyc7XG5cdFx0fTtcblx0fSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ2h1bWFuUmVhZGFibGUnLCBmdW5jdGlvbigpe1xuXHRcdHJldHVybiBmdW5jdGlvbiBodW1hbml6ZShzdHIpIHtcblx0XHRcdGlmICggIXN0ciApe1xuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9XG5cdFx0XHR2YXIgZnJhZ3MgPSBzdHIuc3BsaXQoJ18nKTtcblx0XHRcdGZvciAodmFyIGk9MDsgaTxmcmFncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRmcmFnc1tpXSA9IGZyYWdzW2ldLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZnJhZ3NbaV0uc2xpY2UoMSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZnJhZ3Muam9pbignICcpO1xuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoJ3RydW5jYXRlQ2hhcmFjdGVycycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCwgY2hhcnMsIGJyZWFrT25Xb3JkKSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4oY2hhcnMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoYXJzIDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5wdXQgJiYgaW5wdXQubGVuZ3RoID4gY2hhcnMpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cmluZygwLCBjaGFycyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWJyZWFrT25Xb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0c3BhY2UgPSBpbnB1dC5sYXN0SW5kZXhPZignICcpO1xuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgbGFzdCBzcGFjZVxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdHNwYWNlICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHIoMCwgbGFzdHNwYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpbnB1dC5jaGFyQXQoaW5wdXQubGVuZ3RoLTEpID09PSAnICcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyKDAsIGlucHV0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dCArICcuLi4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9O1xuICAgIH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoJ3RydW5jYXRlV29yZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQsIHdvcmRzKSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4od29yZHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdvcmRzIDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRXb3JkcyA9IGlucHV0LnNwbGl0KC9cXHMrLyk7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0V29yZHMubGVuZ3RoID4gd29yZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dFdvcmRzLnNsaWNlKDAsIHdvcmRzKS5qb2luKCcgJykgKyAnLi4uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICd0cnVzdEh0bWwnLCBmdW5jdGlvbiggJHNjZSApe1xuXHRcdHJldHVybiBmdW5jdGlvbiggaHRtbCApe1xuXHRcdFx0cmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbCk7XG5cdFx0fTtcblx0fSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoJ3VjZmlyc3QnLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGlucHV0ICkge1xuXHRcdFx0aWYgKCAhaW5wdXQgKXtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gaW5wdXQuc3Vic3RyaW5nKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBpbnB1dC5zdWJzdHJpbmcoMSk7XG5cdFx0fTtcblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuc2VydmljZXMnKS5mYWN0b3J5KCdBUEknLCBmdW5jdGlvbihSZXN0YW5ndWxhciwgVG9hc3RTZXJ2aWNlLCAkbG9jYWxTdG9yYWdlKSB7XG5cblx0XHQvL2NvbnRlbnQgbmVnb3RpYXRpb25cblx0XHR2YXIgaGVhZGVycyA9IHtcblx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHQnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL3gubGFyYXZlbC52MStqc29uJ1xuXHRcdH07XG5cblx0XHRyZXR1cm4gUmVzdGFuZ3VsYXIud2l0aENvbmZpZyhmdW5jdGlvbihSZXN0YW5ndWxhckNvbmZpZ3VyZXIpIHtcblx0XHRcdFJlc3Rhbmd1bGFyQ29uZmlndXJlclxuXHRcdFx0XHQuc2V0QmFzZVVybCgnL2FwaS8nKVxuXHRcdFx0XHQuc2V0RGVmYXVsdEhlYWRlcnMoaGVhZGVycylcblx0XHRcdFx0LnNldEVycm9ySW50ZXJjZXB0b3IoZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MjIpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGVycm9yIGluIHJlc3BvbnNlLmRhdGEuZXJyb3JzKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBUb2FzdFNlcnZpY2UuZXJyb3IocmVzcG9uc2UuZGF0YS5lcnJvcnNbZXJyb3JdWzBdKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5hZGRGdWxsUmVxdWVzdEludGVyY2VwdG9yKGZ1bmN0aW9uKGVsZW1lbnQsIG9wZXJhdGlvbiwgd2hhdCwgdXJsLCBoZWFkZXJzKSB7XG5cdFx0XHRcdFx0aWYgKCRsb2NhbFN0b3JhZ2Uuand0KSB7XG5cdFx0XHRcdFx0XHRoZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyAkbG9jYWxTdG9yYWdlLmp3dDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdEaWFsb2dTZXJ2aWNlJywgZnVuY3Rpb24oJG1kRGlhbG9nKXtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRmcm9tVGVtcGxhdGU6IGZ1bmN0aW9uKHRlbXBsYXRlLCAkc2NvcGUpe1xuXG5cdFx0XHRcdHZhciBvcHRpb25zID0ge1xuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAnLi92aWV3cy9kaWFsb2dzLycgKyB0ZW1wbGF0ZSArICcvJyArIHRlbXBsYXRlICsgJy5odG1sJ1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICgkc2NvcGUpe1xuXHRcdFx0XHRcdG9wdGlvbnMuc2NvcGUgPSAkc2NvcGUuJG5ldygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuICRtZERpYWxvZy5zaG93KG9wdGlvbnMpO1xuXHRcdFx0fSxcblxuXHRcdFx0aGlkZTogZnVuY3Rpb24oKXtcblx0XHRcdFx0cmV0dXJuICRtZERpYWxvZy5oaWRlKCk7XG5cdFx0XHR9LFxuXG5cdFx0XHRhbGVydDogZnVuY3Rpb24odGl0bGUsIGNvbnRlbnQpe1xuXHRcdFx0XHQkbWREaWFsb2cuc2hvdyhcblx0XHRcdFx0XHQkbWREaWFsb2cuYWxlcnQoKVxuXHRcdFx0XHRcdFx0LnRpdGxlKHRpdGxlKVxuXHRcdFx0XHRcdFx0LmNvbnRlbnQoY29udGVudClcblx0XHRcdFx0XHRcdC5vaygnT2snKVxuXHRcdFx0XHQpO1xuXHRcdFx0fSxcblxuXHRcdFx0Y29uZmlybTogZnVuY3Rpb24odGl0bGUsIGNvbnRlbnQpIHtcblx0XHRcdFx0cmV0dXJuICRtZERpYWxvZy5zaG93KFxuXHRcdFx0XHRcdCRtZERpYWxvZy5jb25maXJtKClcblx0XHRcdFx0XHRcdC50aXRsZSh0aXRsZSlcblx0XHRcdFx0XHRcdC5jb250ZW50KGNvbnRlbnQpXG5cdFx0XHRcdFx0XHQub2soJ09rJylcblx0XHRcdFx0XHRcdC5jYW5jZWwoJ0NhbmNlbCcpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdUb2FzdFNlcnZpY2UnLCBmdW5jdGlvbigkbWRUb2FzdCl7XG5cblx0XHR2YXIgZGVsYXkgPSA2MDAwLFxuXHRcdFx0cG9zaXRpb24gPSAndG9wIHJpZ2h0Jyxcblx0XHRcdGFjdGlvbiA9ICdPSyc7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0c2hvdzogZnVuY3Rpb24oY29udGVudCl7XG5cdFx0XHRcdGlmICghY29udGVudCl7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuICRtZFRvYXN0LnNob3coXG5cdFx0XHRcdFx0JG1kVG9hc3Quc2ltcGxlKClcblx0XHRcdFx0XHRcdC5jb250ZW50KGNvbnRlbnQpXG5cdFx0XHRcdFx0XHQucG9zaXRpb24ocG9zaXRpb24pXG5cdFx0XHRcdFx0XHQuYWN0aW9uKGFjdGlvbilcblx0XHRcdFx0XHRcdC5oaWRlRGVsYXkoZGVsYXkpXG5cdFx0XHRcdCk7XG5cdFx0XHR9LFxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGNvbnRlbnQpe1xuXHRcdFx0XHRpZiAoIWNvbnRlbnQpe1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAkbWRUb2FzdC5zaG93KFxuXHRcdFx0XHRcdCRtZFRvYXN0LnNpbXBsZSgpXG5cdFx0XHRcdFx0XHQuY29udGVudChjb250ZW50KVxuXHRcdFx0XHRcdFx0LnBvc2l0aW9uKHBvc2l0aW9uKVxuXHRcdFx0XHRcdFx0LnRoZW1lKCd3YXJuJylcblx0XHRcdFx0XHRcdC5hY3Rpb24oYWN0aW9uKVxuXHRcdFx0XHRcdFx0LmhpZGVEZWxheShkZWxheSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRm9vdGVyQ29udHJvbGxlcicsIEZvb3RlckNvbnRyb2xsZXIpO1xuXG4gICAgZnVuY3Rpb24gRm9vdGVyQ29udHJvbGxlcigpe1xuICAgICAgICAvL1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0hlYWRlckNvbnRyb2xsZXInLCBIZWFkZXJDb250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIEhlYWRlckNvbnRyb2xsZXIoKXtcbiAgICAgICAgLy9cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdMYW5kaW5nQ29udHJvbGxlcicsIExhbmRpbmdDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBMYW5kaW5nQ29udHJvbGxlcigpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXG5cdFx0dm0ubGFyYXZlbF9kZXNjcmlwdGlvbiA9ICdSZXNwb25zZSBtYWNyb3MgaW50ZWdyYXRlZCB3aXRoIHlvdXIgQW5ndWxhciBhcHAnO1xuXHRcdHZtLmFuZ3VsYXJfZGVzY3JpcHRpb24gPSAnUXVlcnkgeW91ciBBUEkgd2l0aG91dCB3b3JyeWluZyBhYm91dCB2YWxpZGF0aW9ucyc7XG5cblx0XHQvKlxuXHRcdFRoaXMgaXMgYSB0ZXJyaWJsZSB0ZW1wb3JhcnkgaGFjayxcblx0XHR0byBmaXggbGF5b3V0IGlzc3VlcyB3aXRoIGZsZXggb24gaU9TIChjaHJvbWUgJiBzYWZhcmkpXG5cdFx0TWFrZSBzdXJlIHRvIHJlbW92ZSB0aGlzIHdoZW4geW91IG1vZGlmeSB0aGlzIGRlbW9cblx0XHQqL1xuXHRcdHZtLmlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXHR9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdMb2dpbkNvbnRyb2xsZXInLCBMb2dpbkNvbnRyb2xsZXIpO1xuXG4gICAgZnVuY3Rpb24gTG9naW5Db250cm9sbGVyKCl7XG4gICAgICAgIC8vXG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUmVnaXN0ZXJDb250cm9sbGVyJywgUmVnaXN0ZXJDb250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIFJlZ2lzdGVyQ29udHJvbGxlcigpe1xuICAgICAgICAvL1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdsb2dpbkZvcm0nLCBsb2dpbkZvcm1EZWZpbml0aW9uKTtcblxuICAgIGZ1bmN0aW9uIGxvZ2luRm9ybURlZmluaXRpb24oKSB7XG5cbiAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnLi92aWV3cy9kaXJlY3RpdmVzL2xvZ2luLWZvcm0vbG9naW4tZm9ybS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luRm9ybUNvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTG9naW5Gb3JtQ29udHJvbGxlcicsIExvZ2luRm9ybUNvbnRyb2xsZXIpO1xuXG4gICAgZnVuY3Rpb24gTG9naW5Gb3JtQ29udHJvbGxlcigkYXV0aCwgJGxvZywgJGxvY2F0aW9uLCBUb2FzdFNlcnZpY2UsICRsb2NhbFN0b3JhZ2Upe1xuICAgICAgICB2YXIgdm0gPSB0aGlzO1xuXG5cdCAgICB2bS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuXHQgICAgICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpO1xuXHQgICAgfTtcblxuXHRcdHZtLmxvZ2luID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdXNlciA9IHtcblx0XHRcdCAgZW1haWw6IHZtLmVtYWlsLFxuXHRcdFx0ICBwYXNzd29yZDogdm0ucGFzc3dvcmRcblx0XHRcdH07XG5cblx0XHRcdCRsb2cuaW5mbygnTG9nZ2luZyBpbi4uLicpO1xuXG5cdFx0XHQkYXV0aC5sb2dpbih1c2VyKVxuXHRcdFx0ICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuJGxvZy5pbmZvKGFuZ3VsYXIudG9Kc29uKHJlc3BvbnNlLmRhdGEudG9rZW4pKTtcblx0XHRcdFx0Ly8gJGF1dGguc2V0VG9rZW4ocmVzcG9uc2UuZGF0YS50b2tlbik7XG4kbG9nLmluZm8oJGxvY2FsU3RvcmFnZS5qd3QpO1xuXHRcdFx0ICAgIC8vIFJlZGlyZWN0IHVzZXIgaGVyZSBhZnRlciBhIHN1Y2Nlc3NmdWwgbG9nIGluLlxuXHRcdFx0XHRUb2FzdFNlcnZpY2Uuc2hvdygnTG9naW4gc3VjY2Vzc2Z1bCcpO1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnYXBpL3NhbXBsZS9wcm90ZWN0ZWQnKTtcblx0XHRcdCAgfSlcblx0XHRcdCAgLmNhdGNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHQgICAgLy8gSGFuZGxlIGVycm9ycyBoZXJlLCBzdWNoIGFzIGRpc3BsYXlpbmcgYSBub3RpZmljYXRpb25cblx0XHRcdCAgICAvLyBmb3IgaW52YWxpZCBlbWFpbCBhbmQvb3IgcGFzc3dvcmQuXG5cdFx0XHRcdFRvYXN0U2VydmljZS5lcnJvcihyZXNwb25zZS5kYXRhLmVycm9ycyk7XG5cdFx0XHQgIH0pO1xuXHRcdH07XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ3JlZ2lzdGVyRm9ybScsIHJlZ2lzdGVyRm9ybURlZmluaXRpb24pO1xuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJGb3JtRGVmaW5pdGlvbigpIHtcblxuICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdzL2RpcmVjdGl2ZXMvcmVnaXN0ZXItZm9ybS9yZWdpc3Rlci1mb3JtLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJGb3JtQ29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdSZWdpc3RlckZvcm1Db250cm9sbGVyJywgUmVnaXN0ZXJGb3JtQ29udHJvbGxlcik7XG5cbiAgICBmdW5jdGlvbiBSZWdpc3RlckZvcm1Db250cm9sbGVyKCl7XG4gICAgICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAgICAgLy9cbiAgICB9XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
