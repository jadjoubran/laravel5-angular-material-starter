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
			})
			.state('app.loggedin', {
				url: '/protected',
				data: {},
				views: {
					'main@': {
						templateUrl: getView('protected')
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

	angular.module('app.services').factory('API', ["Restangular", "ToastService", "$auth", function(Restangular, ToastService, $auth) {

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
					if ($auth.getToken()) {
						headers.Authorization = 'Bearer ' + $auth.getToken();
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

    ProtectedController.$inject = ["API"];
    angular.module('app.controllers').controller('ProtectedController', ProtectedController);

    function ProtectedController(API){
        var vm = this;

        API.one('sample/protected').get().then(function(data) {
          vm.loggedin = angular.fromJson(data.data);
		});
		
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

    LoginFormController.$inject = ["$log", "$auth", "$state", "ToastService"];
    angular.module('app.controllers').controller('LoginFormController', LoginFormController);

    function LoginFormController($log, $auth, $state, ToastService){
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
			  .then(function(response) { // What to do after a successful logged in
				ToastService.show('Login successful');
				$state.go('app.loggedin');
			  })
			  .catch(function(response) { // Handle errors here
				$log.info('Error Response: '+angular.toJson(response.data));
				ToastService.error(response.data.errors);
			  });
		};
    }

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJjb25maWcvbG9hZGluZ19iYXIuY29uZmlnLmpzIiwiY29uZmlnL2xvZ2luLmNvbmZpZy5qcyIsImNvbmZpZy90aGVtZS5jb25maWcuanMiLCJmaWx0ZXJzL2NhcGl0YWxpemUuZmlsdGVyLmpzIiwiZmlsdGVycy9odW1hbl9yZWFkYWJsZS5maWx0ZXIuanMiLCJmaWx0ZXJzL3RydW5jYXRlX2NoYXJhY3RlcnMuZmlsdGVyLmpzIiwiZmlsdGVycy90cnVuY2F0ZV93b3Jkcy5qcyIsImZpbHRlcnMvdHJ1c3RfaHRtbC5maWx0ZXIuanMiLCJmaWx0ZXJzL3VjZmlyc3QuZmlsdGVyLmpzIiwic2VydmljZXMvQVBJLnNlcnZpY2UuanMiLCJzZXJ2aWNlcy9kaWFsb2cuc2VydmljZS5qcyIsInNlcnZpY2VzL3RvYXN0LnNlcnZpY2UuanMiLCJhcHAvZm9vdGVyL2Zvb3Rlci5jb250cm9sbGVyLmpzIiwiYXBwL2hlYWRlci9oZWFkZXIuY29udHJvbGxlci5qcyIsImFwcC9sYW5kaW5nL2xhbmRpbmcuY29udHJvbGxlci5qcyIsImFwcC9sb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzIiwiYXBwL3Byb3RlY3RlZC9wcm90ZWN0ZWQuY29udHJvbGxlci5qcyIsImFwcC9yZWdpc3Rlci9yZWdpc3Rlci5jb250cm9sbGVyLmpzIiwiZGlyZWN0aXZlcy9sb2dpbi1mb3JtL2xvZ2luLWZvcm0uZGVmaW5pdGlvbi5qcyIsImRpcmVjdGl2ZXMvbG9naW4tZm9ybS9sb2dpbi1mb3JtLmRpcmVjdGl2ZS5qcyIsImRpcmVjdGl2ZXMvcmVnaXN0ZXItZm9ybS9yZWdpc3Rlci1mb3JtLmRlZmluaXRpb24uanMiLCJkaXJlY3RpdmVzL3JlZ2lzdGVyLWZvcm0vcmVnaXN0ZXItZm9ybS5kaXJlY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0NBR0EsUUFBQSxPQUFBLGNBQUE7Q0FDQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxhQUFBLGNBQUEsYUFBQSxlQUFBLHVCQUFBO0NBQ0EsUUFBQSxPQUFBLGVBQUE7Q0FDQSxRQUFBLE9BQUEsZ0JBQUE7Q0FDQSxRQUFBLE9BQUEsa0JBQUE7Q0FDQSxRQUFBLE9BQUEsY0FBQTs7OztBQ25CQSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsY0FBQSxpRUFBQSxTQUFBLGdCQUFBLG9CQUFBLGNBQUE7O0VBRUEsSUFBQSxVQUFBLFNBQUEsU0FBQTtHQUNBLE9BQUEsaUJBQUEsV0FBQSxNQUFBLFdBQUE7OztFQUdBLG1CQUFBLFVBQUE7O0VBRUE7SUFDQSxNQUFBLE9BQUE7SUFDQSxVQUFBO0lBQ0EsT0FBQTtLQUNBLFFBQUE7TUFDQSxhQUFBLFFBQUE7O0tBRUEsUUFBQTtNQUNBLGFBQUEsUUFBQTs7S0FFQSxNQUFBOzs7SUFHQSxNQUFBLGVBQUE7SUFDQSxLQUFBO0lBQ0EsTUFBQTtJQUNBLE9BQUE7S0FDQSxTQUFBO01BQ0EsYUFBQSxRQUFBOzs7O0lBSUEsTUFBQSxhQUFBO0lBQ0EsS0FBQTtJQUNBLE1BQUE7SUFDQSxPQUFBO0tBQ0EsU0FBQTtNQUNBLGFBQUEsUUFBQTs7OztJQUlBLE1BQUEsZ0JBQUE7SUFDQSxLQUFBO0lBQ0EsTUFBQTtJQUNBLE9BQUE7S0FDQSxTQUFBO01BQ0EsYUFBQSxRQUFBOzs7O0lBSUEsTUFBQSxnQkFBQTtJQUNBLEtBQUE7SUFDQSxNQUFBO0lBQ0EsT0FBQTtLQUNBLFNBQUE7TUFDQSxhQUFBLFFBQUE7Ozs7Ozs7O0FDeERBLENBQUEsV0FBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxjQUFBLGlDQUFBLFVBQUEsc0JBQUE7RUFDQSxzQkFBQSxpQkFBQTs7Ozs7QUNKQSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsY0FBQSx5QkFBQSxTQUFBLGVBQUE7OztFQUdBLGNBQUEsY0FBQTtFQUNBLGNBQUEsWUFBQTtFQUNBLGNBQUEsa0JBQUE7S0FDQSxjQUFBLFNBQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLE9BQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLE9BQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLFNBQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLFVBQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLE1BQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLEtBQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLE9BQUE7T0FDQSxVQUFBOzs7S0FHQSxjQUFBLFVBQUE7T0FDQSxVQUFBOzs7OztLQUtBLGNBQUEsT0FBQTtPQUNBLE1BQUE7T0FDQSxLQUFBO09BQ0EsVUFBQTtPQUNBLGFBQUEsT0FBQSxTQUFBO09BQ0EsdUJBQUE7Ozs7Ozs7QUNwREEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGNBQUEsOEJBQUEsU0FBQSxvQkFBQTs7RUFFQSxtQkFBQSxNQUFBO0dBQ0EsZUFBQTtHQUNBLGNBQUE7R0FDQSxZQUFBOzs7OztBQ1JBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxlQUFBLFFBQUEsY0FBQSxVQUFBO0VBQ0EsT0FBQSxTQUFBLE9BQUE7R0FDQSxPQUFBLENBQUEsU0FBQSxNQUFBLFFBQUEsc0JBQUEsU0FBQSxJQUFBO0lBQ0EsT0FBQSxJQUFBLE9BQUEsR0FBQSxnQkFBQSxJQUFBLE9BQUEsR0FBQTtRQUNBOzs7OztBQ1BBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxlQUFBLFFBQUEsaUJBQUEsVUFBQTtFQUNBLE9BQUEsU0FBQSxTQUFBLEtBQUE7R0FDQSxLQUFBLENBQUEsS0FBQTtJQUNBLE9BQUE7O0dBRUEsSUFBQSxRQUFBLElBQUEsTUFBQTtHQUNBLEtBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLFFBQUEsS0FBQTtJQUNBLE1BQUEsS0FBQSxNQUFBLEdBQUEsT0FBQSxHQUFBLGdCQUFBLE1BQUEsR0FBQSxNQUFBOztHQUVBLE9BQUEsTUFBQSxLQUFBOzs7O0FDWkEsQ0FB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QkFBQSxTQUFBLFNBQUE7O0VBRUEsSUFBQSxRQUFBO0dBQ0EsV0FBQTtHQUNBLFNBQUE7O0VBRUEsT0FBQTtHQUNBLE1BQUEsU0FBQSxRQUFBO0lBQ0EsSUFBQSxDQUFBLFFBQUE7S0FDQSxPQUFBOzs7SUFHQSxPQUFBLFNBQUE7S0FDQSxTQUFBO09BQ0EsUUFBQTtPQUNBLFNBQUE7T0FDQSxPQUFBO09BQ0EsVUFBQTs7O0dBR0EsT0FBQSxTQUFBLFFBQUE7SUFDQSxJQUFBLENBQUEsUUFBQTtLQUNBLE9BQUE7OztJQUdBLE9BQUEsU0FBQTtLQUNBLFNBQUE7T0FDQSxRQUFBO09BQ0EsU0FBQTtPQUNBLE1BQUE7T0FDQSxPQUFBO09BQ0EsVUFBQTs7Ozs7O0FDbENBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLG9CQUFBOztJQUVBLFNBQUEsa0JBQUE7Ozs7OztBQ0xBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLG9CQUFBOztJQUVBLFNBQUEsa0JBQUE7Ozs7OztBQ0xBLENBQUEsV0FBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHFCQUFBOztDQUVBLFNBQUEsb0JBQUE7RUFDQSxJQUFBLEtBQUE7O0VBRUEsR0FBQSxzQkFBQTtFQUNBLEdBQUEsc0JBQUE7Ozs7Ozs7RUFPQSxHQUFBLE1BQUEsbUJBQUEsS0FBQSxVQUFBOzs7OztBQ2hCQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsV0FBQSxtQkFBQTs7SUFFQSxTQUFBLGlCQUFBOzs7Ozs7QUNMQSxDQUFBLFVBQUE7SUFDQTs7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLFdBQUEsdUJBQUE7O0lBRUEsU0FBQSxvQkFBQSxJQUFBO1FBQ0EsSUFBQSxLQUFBOztRQUVBLElBQUEsSUFBQSxvQkFBQSxNQUFBLEtBQUEsU0FBQSxNQUFBO1VBQ0EsR0FBQSxXQUFBLFFBQUEsU0FBQSxLQUFBOzs7Ozs7O0FDVEEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLFdBQUEsc0JBQUE7O0lBRUEsU0FBQSxvQkFBQTs7Ozs7O0FDTEEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGtCQUFBLFVBQUEsYUFBQTs7SUFFQSxTQUFBLHNCQUFBOztNQUVBLElBQUEsWUFBQTtRQUNBLFVBQUE7UUFDQSxhQUFBO1FBQ0EsWUFBQTtRQUNBLGNBQUE7UUFDQSxPQUFBO1FBQ0Esa0JBQUE7OztNQUdBLE9BQUE7Ozs7QUNoQkEsQ0FBQSxVQUFBO0lBQ0E7OztJQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHVCQUFBOztJQUVBLFNBQUEsb0JBQUEsTUFBQSxPQUFBLFFBQUEsYUFBQTtRQUNBLElBQUEsS0FBQTs7S0FFQSxHQUFBLGVBQUEsU0FBQSxVQUFBO09BQ0EsTUFBQSxhQUFBOzs7RUFHQSxHQUFBLFFBQUEsV0FBQTtHQUNBLElBQUEsT0FBQTtLQUNBLE9BQUEsR0FBQTtLQUNBLFVBQUEsR0FBQTs7O0dBR0EsS0FBQSxLQUFBOztHQUVBLE1BQUEsTUFBQTtNQUNBLEtBQUEsU0FBQSxVQUFBO0lBQ0EsYUFBQSxLQUFBO0lBQ0EsT0FBQSxHQUFBOztNQUVBLE1BQUEsU0FBQSxVQUFBO0lBQ0EsS0FBQSxLQUFBLG1CQUFBLFFBQUEsT0FBQSxTQUFBO0lBQ0EsYUFBQSxNQUFBLFNBQUEsS0FBQTs7Ozs7OztBQzNCQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsa0JBQUEsVUFBQSxnQkFBQTs7SUFFQSxTQUFBLHlCQUFBOztNQUVBLElBQUEsWUFBQTtRQUNBLFVBQUE7UUFDQSxhQUFBO1FBQ0EsWUFBQTtRQUNBLGNBQUE7UUFDQSxPQUFBO1FBQ0Esa0JBQUE7OztNQUdBLE9BQUE7Ozs7QUNoQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLFdBQUEsMEJBQUE7O0lBRUEsU0FBQSx3QkFBQTtRQUNBLElBQUEsS0FBQTs7Ozs7O0FBTUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuXHRcdFtcblx0XHQnYXBwLmNvbnRyb2xsZXJzJyxcblx0XHQnYXBwLmZpbHRlcnMnLFxuXHRcdCdhcHAuc2VydmljZXMnLFxuXHRcdCdhcHAuZGlyZWN0aXZlcycsXG5cdFx0J2FwcC5yb3V0ZXMnLFxuXHRcdCdhcHAuY29uZmlnJyxcblx0XHQncGFydGlhbHNNb2R1bGUnXG5cdFx0XSk7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ25nU3RvcmFnZScsICdyZXN0YW5ndWxhcicsICdhbmd1bGFyLWxvYWRpbmctYmFyJywgJ3NhdGVsbGl6ZXInXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycpLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkYXV0aFByb3ZpZGVyKXtcblxuXHRcdHZhciBnZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUpe1xuXHRcdFx0cmV0dXJuICcuL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XG5cdFx0fTtcblxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuXHRcdCRzdGF0ZVByb3ZpZGVyXG5cdFx0XHQuc3RhdGUoJ2FwcCcsIHtcblx0XHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0aGVhZGVyOiB7XG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGZvb3Rlcjoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRtYWluOiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LnN0YXRlKCdhcHAubGFuZGluZycsIHtcblx0XHRcdFx0dXJsOiAnLycsXG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcdCdtYWluQCc6IHtcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdsYW5kaW5nJylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuc3RhdGUoJ2FwcC5sb2dpbicsIHtcblx0XHRcdFx0dXJsOiAnL2xvZ2luJyxcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xvZ2luJylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuc3RhdGUoJ2FwcC5yZWdpc3RlcicsIHtcblx0XHRcdFx0dXJsOiAnL3JlZ2lzdGVyJyxcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ3JlZ2lzdGVyJylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuc3RhdGUoJ2FwcC5sb2dnZWRpbicsIHtcblx0XHRcdFx0dXJsOiAnL3Byb3RlY3RlZCcsXG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcdCdtYWluQCc6IHtcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdwcm90ZWN0ZWQnKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0fSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoY2ZwTG9hZGluZ0JhclByb3ZpZGVyKXtcblx0XHRjZnBMb2FkaW5nQmFyUHJvdmlkZXIuaW5jbHVkZVNwaW5uZXIgPSBmYWxzZTtcblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnKS5jb25maWcoZnVuY3Rpb24oJGF1dGhQcm92aWRlcikge1xuXG5cdFx0LyogQ29uZmlndXJhdGlvbiBmaWxlIGZvciBTYXRlbGxpemVyJ3MgaGFuZGxpbmcgb2YgbG9naW4gYXV0aGVudGljYXRpb24gKi9cdFx0XG5cdFx0JGF1dGhQcm92aWRlci5zdG9yYWdlVHlwZSA9ICdsb2NhbFN0b3JhZ2UnO1xuXHRcdCRhdXRoUHJvdmlkZXIudG9rZW5OYW1lID0gJ3Rva2VuJztcblx0XHQkYXV0aFByb3ZpZGVyLmh0dHBJbnRlcmNlcHRvciA9IGZhbHNlO1xuXHQgICAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG5cdCAgICAgIGNsaWVudElkOiAnRmFjZWJvb2sgQXBwIElEJ1xuXHQgICAgfSk7XG5cblx0ICAgICRhdXRoUHJvdmlkZXIuZ29vZ2xlKHtcblx0ICAgICAgY2xpZW50SWQ6ICdHb29nbGUgQ2xpZW50IElEJ1xuXHQgICAgfSk7XG5cblx0ICAgICRhdXRoUHJvdmlkZXIuZ2l0aHViKHtcblx0ICAgICAgY2xpZW50SWQ6ICdHaXRIdWIgQ2xpZW50IElEJ1xuXHQgICAgfSk7XG5cblx0ICAgICRhdXRoUHJvdmlkZXIubGlua2VkaW4oe1xuXHQgICAgICBjbGllbnRJZDogJ0xpbmtlZEluIENsaWVudCBJRCdcblx0ICAgIH0pO1xuXG5cdCAgICAkYXV0aFByb3ZpZGVyLmluc3RhZ3JhbSh7XG5cdCAgICAgIGNsaWVudElkOiAnSW5zdGFncmFtIENsaWVudCBJRCdcblx0ICAgIH0pO1xuXG5cdCAgICAkYXV0aFByb3ZpZGVyLnlhaG9vKHtcblx0ICAgICAgY2xpZW50SWQ6ICdZYWhvbyBDbGllbnQgSUQgLyBDb25zdW1lciBLZXknXG5cdCAgICB9KTtcblxuXHQgICAgJGF1dGhQcm92aWRlci5saXZlKHtcblx0ICAgICAgY2xpZW50SWQ6ICdNaWNyb3NvZnQgQ2xpZW50IElEJ1xuXHQgICAgfSk7XG5cblx0ICAgICRhdXRoUHJvdmlkZXIudHdpdGNoKHtcblx0ICAgICAgY2xpZW50SWQ6ICdUd2l0Y2ggQ2xpZW50IElEJ1xuXHQgICAgfSk7XG5cblx0ICAgICRhdXRoUHJvdmlkZXIuYml0YnVja2V0KHtcblx0ICAgICAgY2xpZW50SWQ6ICdCaXRidWNrZXQgQ2xpZW50IElEJ1xuXHQgICAgfSk7XG5cblx0ICAgIC8vIE5vIGFkZGl0aW9uYWwgc2V0dXAgcmVxdWlyZWQgZm9yIFR3aXR0ZXJcblxuXHQgICAgJGF1dGhQcm92aWRlci5vYXV0aDIoe1xuXHQgICAgICBuYW1lOiAnZm91cnNxdWFyZScsXG5cdCAgICAgIHVybDogJy9hdXRoL2ZvdXJzcXVhcmUnLFxuXHQgICAgICBjbGllbnRJZDogJ0ZvdXJzcXVhcmUgQ2xpZW50IElEJyxcblx0ICAgICAgcmVkaXJlY3RVcmk6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG5cdCAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vZm91cnNxdWFyZS5jb20vb2F1dGgyL2F1dGhlbnRpY2F0ZScsXG5cdCAgICB9KTtcblx0XG59KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcblx0XHQvKiBGb3IgbW9yZSBpbmZvLCB2aXNpdCBodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvIy9UaGVtaW5nLzAxX2ludHJvZHVjdGlvbiAqL1xuXHRcdCRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXG5cdFx0LnByaW1hcnlQYWxldHRlKCdpbmRpZ28nKVxuXHRcdC5hY2NlbnRQYWxldHRlKCdncmV5Jylcblx0XHQud2FyblBhbGV0dGUoJ3JlZCcpO1xuXHR9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICdjYXBpdGFsaXplJywgZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRcdHJldHVybiAoaW5wdXQpID8gaW5wdXQucmVwbGFjZSgvKFteXFxXX10rW15cXHMtXSopICovZyxmdW5jdGlvbih0eHQpe1xuXHRcdFx0XHRyZXR1cm4gdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSkgOiAnJztcblx0XHR9O1xuXHR9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAnaHVtYW5SZWFkYWJsZScsIGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGh1bWFuaXplKHN0cikge1xuXHRcdFx0aWYgKCAhc3RyICl7XG5cdFx0XHRcdHJldHVybiAnJztcblx0XHRcdH1cblx0XHRcdHZhciBmcmFncyA9IHN0ci5zcGxpdCgnXycpO1xuXHRcdFx0Zm9yICh2YXIgaT0wOyBpPGZyYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGZyYWdzW2ldID0gZnJhZ3NbaV0uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBmcmFnc1tpXS5zbGljZSgxKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmcmFncy5qb2luKCcgJyk7XG5cdFx0fTtcblx0fSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlcigndHJ1bmNhdGVDaGFyYWN0ZXJzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0LCBjaGFycywgYnJlYWtPbldvcmQpIHtcbiAgICAgICAgICAgIGlmIChpc05hTihjaGFycykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hhcnMgPD0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnB1dCAmJiBpbnB1dC5sZW5ndGggPiBjaGFycykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyaW5nKDAsIGNoYXJzKTtcblxuICAgICAgICAgICAgICAgIGlmICghYnJlYWtPbldvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RzcGFjZSA9IGlucHV0Lmxhc3RJbmRleE9mKCcgJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBsYXN0IHNwYWNlXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0c3BhY2UgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cigwLCBsYXN0c3BhY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGlucHV0LmNoYXJBdChpbnB1dC5sZW5ndGgtMSkgPT09ICcgJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHIoMCwgaW5wdXQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0ICsgJy4uLic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlcigndHJ1bmNhdGVXb3JkcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCwgd29yZHMpIHtcbiAgICAgICAgICAgIGlmIChpc05hTih3b3JkcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod29yZHMgPD0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dFdvcmRzID0gaW5wdXQuc3BsaXQoL1xccysvKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRXb3Jkcy5sZW5ndGggPiB3b3Jkcykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0V29yZHMuc2xpY2UoMCwgd29yZHMpLmpvaW4oJyAnKSArICcuLi4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgfTtcbiAgICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ3RydXN0SHRtbCcsIGZ1bmN0aW9uKCAkc2NlICl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCBodG1sICl7XG5cdFx0XHRyZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sKTtcblx0XHR9O1xuXHR9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlcigndWNmaXJzdCcsIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBmdW5jdGlvbiggaW5wdXQgKSB7XG5cdFx0XHRpZiAoICFpbnB1dCApe1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBpbnB1dC5zdWJzdHJpbmcoMCwgMSkudG9VcHBlckNhc2UoKSArIGlucHV0LnN1YnN0cmluZygxKTtcblx0XHR9O1xuXHR9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycpLmZhY3RvcnkoJ0FQSScsIGZ1bmN0aW9uKFJlc3Rhbmd1bGFyLCBUb2FzdFNlcnZpY2UsICRhdXRoKSB7XG5cblx0XHQvL2NvbnRlbnQgbmVnb3RpYXRpb25cblx0XHR2YXIgaGVhZGVycyA9IHtcblx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHQnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL3gubGFyYXZlbC52MStqc29uJ1xuXHRcdH07XG5cblx0XHRyZXR1cm4gUmVzdGFuZ3VsYXIud2l0aENvbmZpZyhmdW5jdGlvbihSZXN0YW5ndWxhckNvbmZpZ3VyZXIpIHtcblx0XHRcdFJlc3Rhbmd1bGFyQ29uZmlndXJlclxuXHRcdFx0XHQuc2V0QmFzZVVybCgnL2FwaS8nKVxuXHRcdFx0XHQuc2V0RGVmYXVsdEhlYWRlcnMoaGVhZGVycylcblx0XHRcdFx0LnNldEVycm9ySW50ZXJjZXB0b3IoZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MjIpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGVycm9yIGluIHJlc3BvbnNlLmRhdGEuZXJyb3JzKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBUb2FzdFNlcnZpY2UuZXJyb3IocmVzcG9uc2UuZGF0YS5lcnJvcnNbZXJyb3JdWzBdKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5hZGRGdWxsUmVxdWVzdEludGVyY2VwdG9yKGZ1bmN0aW9uKGVsZW1lbnQsIG9wZXJhdGlvbiwgd2hhdCwgdXJsLCBoZWFkZXJzKSB7XG5cdFx0XHRcdFx0aWYgKCRhdXRoLmdldFRva2VuKCkpIHtcblx0XHRcdFx0XHRcdGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArICRhdXRoLmdldFRva2VuKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnRGlhbG9nU2VydmljZScsIGZ1bmN0aW9uKCRtZERpYWxvZyl7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0ZnJvbVRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSwgJHNjb3BlKXtcblxuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4vdmlld3MvZGlhbG9ncy8nICsgdGVtcGxhdGUgKyAnLycgKyB0ZW1wbGF0ZSArICcuaHRtbCdcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoJHNjb3BlKXtcblx0XHRcdFx0XHRvcHRpb25zLnNjb3BlID0gJHNjb3BlLiRuZXcoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAkbWREaWFsb2cuc2hvdyhvcHRpb25zKTtcblx0XHRcdH0sXG5cblx0XHRcdGhpZGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybiAkbWREaWFsb2cuaGlkZSgpO1xuXHRcdFx0fSxcblxuXHRcdFx0YWxlcnQ6IGZ1bmN0aW9uKHRpdGxlLCBjb250ZW50KXtcblx0XHRcdFx0JG1kRGlhbG9nLnNob3coXG5cdFx0XHRcdFx0JG1kRGlhbG9nLmFsZXJ0KClcblx0XHRcdFx0XHRcdC50aXRsZSh0aXRsZSlcblx0XHRcdFx0XHRcdC5jb250ZW50KGNvbnRlbnQpXG5cdFx0XHRcdFx0XHQub2soJ09rJylcblx0XHRcdFx0KTtcblx0XHRcdH0sXG5cblx0XHRcdGNvbmZpcm06IGZ1bmN0aW9uKHRpdGxlLCBjb250ZW50KSB7XG5cdFx0XHRcdHJldHVybiAkbWREaWFsb2cuc2hvdyhcblx0XHRcdFx0XHQkbWREaWFsb2cuY29uZmlybSgpXG5cdFx0XHRcdFx0XHQudGl0bGUodGl0bGUpXG5cdFx0XHRcdFx0XHQuY29udGVudChjb250ZW50KVxuXHRcdFx0XHRcdFx0Lm9rKCdPaycpXG5cdFx0XHRcdFx0XHQuY2FuY2VsKCdDYW5jZWwnKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnVG9hc3RTZXJ2aWNlJywgZnVuY3Rpb24oJG1kVG9hc3Qpe1xuXG5cdFx0dmFyIGRlbGF5ID0gNjAwMCxcblx0XHRcdHBvc2l0aW9uID0gJ3RvcCByaWdodCcsXG5cdFx0XHRhY3Rpb24gPSAnT0snO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHNob3c6IGZ1bmN0aW9uKGNvbnRlbnQpe1xuXHRcdFx0XHRpZiAoIWNvbnRlbnQpe1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAkbWRUb2FzdC5zaG93KFxuXHRcdFx0XHRcdCRtZFRvYXN0LnNpbXBsZSgpXG5cdFx0XHRcdFx0XHQuY29udGVudChjb250ZW50KVxuXHRcdFx0XHRcdFx0LnBvc2l0aW9uKHBvc2l0aW9uKVxuXHRcdFx0XHRcdFx0LmFjdGlvbihhY3Rpb24pXG5cdFx0XHRcdFx0XHQuaGlkZURlbGF5KGRlbGF5KVxuXHRcdFx0XHQpO1xuXHRcdFx0fSxcblx0XHRcdGVycm9yOiBmdW5jdGlvbihjb250ZW50KXtcblx0XHRcdFx0aWYgKCFjb250ZW50KXtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gJG1kVG9hc3Quc2hvdyhcblx0XHRcdFx0XHQkbWRUb2FzdC5zaW1wbGUoKVxuXHRcdFx0XHRcdFx0LmNvbnRlbnQoY29udGVudClcblx0XHRcdFx0XHRcdC5wb3NpdGlvbihwb3NpdGlvbilcblx0XHRcdFx0XHRcdC50aGVtZSgnd2FybicpXG5cdFx0XHRcdFx0XHQuYWN0aW9uKGFjdGlvbilcblx0XHRcdFx0XHRcdC5oaWRlRGVsYXkoZGVsYXkpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Zvb3RlckNvbnRyb2xsZXInLCBGb290ZXJDb250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIEZvb3RlckNvbnRyb2xsZXIoKXtcbiAgICAgICAgLy9cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgSGVhZGVyQ29udHJvbGxlcik7XG5cbiAgICBmdW5jdGlvbiBIZWFkZXJDb250cm9sbGVyKCl7XG4gICAgICAgIC8vXG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTGFuZGluZ0NvbnRyb2xsZXInLCBMYW5kaW5nQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gTGFuZGluZ0NvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblxuXHRcdHZtLmxhcmF2ZWxfZGVzY3JpcHRpb24gPSAnUmVzcG9uc2UgbWFjcm9zIGludGVncmF0ZWQgd2l0aCB5b3VyIEFuZ3VsYXIgYXBwJztcblx0XHR2bS5hbmd1bGFyX2Rlc2NyaXB0aW9uID0gJ1F1ZXJ5IHlvdXIgQVBJIHdpdGhvdXQgd29ycnlpbmcgYWJvdXQgdmFsaWRhdGlvbnMnO1xuXG5cdFx0Lypcblx0XHRUaGlzIGlzIGEgdGVycmlibGUgdGVtcG9yYXJ5IGhhY2ssXG5cdFx0dG8gZml4IGxheW91dCBpc3N1ZXMgd2l0aCBmbGV4IG9uIGlPUyAoY2hyb21lICYgc2FmYXJpKVxuXHRcdE1ha2Ugc3VyZSB0byByZW1vdmUgdGhpcyB3aGVuIHlvdSBtb2RpZnkgdGhpcyBkZW1vXG5cdFx0Ki9cblx0XHR2bS5pT1MgPSAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblx0fVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTG9naW5Db250cm9sbGVyJywgTG9naW5Db250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIExvZ2luQ29udHJvbGxlcigpe1xuICAgICAgICAvL1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1Byb3RlY3RlZENvbnRyb2xsZXInLCBQcm90ZWN0ZWRDb250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIFByb3RlY3RlZENvbnRyb2xsZXIoQVBJKXtcbiAgICAgICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgICBBUEkub25lKCdzYW1wbGUvcHJvdGVjdGVkJykuZ2V0KCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgdm0ubG9nZ2VkaW4gPSBhbmd1bGFyLmZyb21Kc29uKGRhdGEuZGF0YSk7XG5cdFx0fSk7XG5cdFx0XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUmVnaXN0ZXJDb250cm9sbGVyJywgUmVnaXN0ZXJDb250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIFJlZ2lzdGVyQ29udHJvbGxlcigpe1xuICAgICAgICAvL1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdsb2dpbkZvcm0nLCBsb2dpbkZvcm1EZWZpbml0aW9uKTtcblxuICAgIGZ1bmN0aW9uIGxvZ2luRm9ybURlZmluaXRpb24oKSB7XG5cbiAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnLi92aWV3cy9kaXJlY3RpdmVzL2xvZ2luLWZvcm0vbG9naW4tZm9ybS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luRm9ybUNvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTG9naW5Gb3JtQ29udHJvbGxlcicsIExvZ2luRm9ybUNvbnRyb2xsZXIpO1xuXG4gICAgZnVuY3Rpb24gTG9naW5Gb3JtQ29udHJvbGxlcigkbG9nLCAkYXV0aCwgJHN0YXRlLCBUb2FzdFNlcnZpY2Upe1xuICAgICAgICB2YXIgdm0gPSB0aGlzO1xuXG5cdCAgICB2bS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuXHQgICAgICAkYXV0aC5hdXRoZW50aWNhdGUocHJvdmlkZXIpO1xuXHQgICAgfTtcblxuXHRcdHZtLmxvZ2luID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdXNlciA9IHtcblx0XHRcdCAgZW1haWw6IHZtLmVtYWlsLFxuXHRcdFx0ICBwYXNzd29yZDogdm0ucGFzc3dvcmRcblx0XHRcdH07XG5cblx0XHRcdCRsb2cuaW5mbygnTG9nZ2luZyBpbi4uLicpO1xuXG5cdFx0XHQkYXV0aC5sb2dpbih1c2VyKVxuXHRcdFx0ICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkgeyAvLyBXaGF0IHRvIGRvIGFmdGVyIGEgc3VjY2Vzc2Z1bCBsb2dnZWQgaW5cblx0XHRcdFx0VG9hc3RTZXJ2aWNlLnNob3coJ0xvZ2luIHN1Y2Nlc3NmdWwnKTtcblx0XHRcdFx0JHN0YXRlLmdvKCdhcHAubG9nZ2VkaW4nKTtcblx0XHRcdCAgfSlcblx0XHRcdCAgLmNhdGNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vIEhhbmRsZSBlcnJvcnMgaGVyZVxuXHRcdFx0XHQkbG9nLmluZm8oJ0Vycm9yIFJlc3BvbnNlOiAnK2FuZ3VsYXIudG9Kc29uKHJlc3BvbnNlLmRhdGEpKTtcblx0XHRcdFx0VG9hc3RTZXJ2aWNlLmVycm9yKHJlc3BvbnNlLmRhdGEuZXJyb3JzKTtcblx0XHRcdCAgfSk7XG5cdFx0fTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgncmVnaXN0ZXJGb3JtJywgcmVnaXN0ZXJGb3JtRGVmaW5pdGlvbik7XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckZvcm1EZWZpbml0aW9uKCkge1xuXG4gICAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy4vdmlld3MvZGlyZWN0aXZlcy9yZWdpc3Rlci1mb3JtL3JlZ2lzdGVyLWZvcm0uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckZvcm1Db250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyRm9ybUNvbnRyb2xsZXInLCBSZWdpc3RlckZvcm1Db250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIFJlZ2lzdGVyRm9ybUNvbnRyb2xsZXIoKXtcbiAgICAgICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgICAvL1xuICAgIH1cblxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
