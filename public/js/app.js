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

    angular.module('app.controllers').controller('LoginFormController', LoginFormController);

    function LoginFormController(){
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
          restrict: 'EA',
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

    function LoginFormController(){
        var vm = this;
        
	    vm.authenticate = function(provider) {
	      $authProvider.authenticate(provider);
	    };
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

	angular.module( 'app.controllers' ).controller( 'LoginController', ["$authProvider", function($authProvider){
		var vm = this;

	    vm.authenticate = function(provider) {
	      $authProvider.authenticate(provider);
	    };
    }]);

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJjb25maWcvbG9hZGluZ19iYXIuY29uZmlnLmpzIiwiY29uZmlnL2xvZ2luLmNvbmZpZy5qcyIsImNvbmZpZy90aGVtZS5jb25maWcuanMiLCJmaWx0ZXJzL2NhcGl0YWxpemUuZmlsdGVyLmpzIiwiZmlsdGVycy9odW1hbl9yZWFkYWJsZS5maWx0ZXIuanMiLCJmaWx0ZXJzL3RydW5jYXRlX2NoYXJhY3RlcnMuZmlsdGVyLmpzIiwiZmlsdGVycy90cnVuY2F0ZV93b3Jkcy5qcyIsImZpbHRlcnMvdHJ1c3RfaHRtbC5maWx0ZXIuanMiLCJmaWx0ZXJzL3VjZmlyc3QuZmlsdGVyLmpzIiwic2VydmljZXMvQVBJLnNlcnZpY2UuanMiLCJzZXJ2aWNlcy9kaWFsb2cuc2VydmljZS5qcyIsInNlcnZpY2VzL3RvYXN0LnNlcnZpY2UuanMiLCJhcHAvZm9vdGVyL2Zvb3Rlci5jb250cm9sbGVyLmpzIiwiYXBwL2hlYWRlci9oZWFkZXIuY29udHJvbGxlci5qcyIsImFwcC9sYW5kaW5nL2xhbmRpbmcuY29udHJvbGxlci5qcyIsImFwcC9sb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzIiwiYXBwL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbnRyb2xsZXIuanMiLCJkaXJlY3RpdmVzL2xvZ2luLWZvcm0vbG9naW4tZm9ybS5kZWZpbml0aW9uLmpzIiwiZGlyZWN0aXZlcy9sb2dpbi1mb3JtL2xvZ2luLWZvcm0uZGlyZWN0aXZlLmpzIiwiZGlyZWN0aXZlcy9sb2dpbi1mb3JtLm9sZC9sb2dpbi1mb3JtLmRlZmluaXRpb24uanMiLCJkaXJlY3RpdmVzL2xvZ2luLWZvcm0ub2xkL2xvZ2luLWZvcm0uanMiLCJkaXJlY3RpdmVzL3JlZ2lzdGVyLWZvcm0vcmVnaXN0ZXItZm9ybS5kZWZpbml0aW9uLmpzIiwiZGlyZWN0aXZlcy9yZWdpc3Rlci1mb3JtL3JlZ2lzdGVyLWZvcm0uZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztDQUdBLFFBQUEsT0FBQSxjQUFBO0NBQ0EsUUFBQSxPQUFBLG1CQUFBLENBQUEsYUFBQSxjQUFBLGFBQUEsZUFBQSx1QkFBQTtDQUNBLFFBQUEsT0FBQSxlQUFBO0NBQ0EsUUFBQSxPQUFBLGdCQUFBO0NBQ0EsUUFBQSxPQUFBLGtCQUFBO0NBQ0EsUUFBQSxPQUFBLGNBQUE7Ozs7QUNuQkEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGNBQUEsaUVBQUEsU0FBQSxnQkFBQSxvQkFBQSxjQUFBOztFQUVBLElBQUEsVUFBQSxTQUFBLFNBQUE7R0FDQSxPQUFBLGlCQUFBLFdBQUEsTUFBQSxXQUFBOzs7RUFHQSxtQkFBQSxVQUFBOztFQUVBO0lBQ0EsTUFBQSxPQUFBO0lBQ0EsVUFBQTtJQUNBLE9BQUE7S0FDQSxRQUFBO01BQ0EsYUFBQSxRQUFBOztLQUVBLFFBQUE7TUFDQSxhQUFBLFFBQUE7O0tBRUEsTUFBQTs7O0lBR0EsTUFBQSxlQUFBO0lBQ0EsS0FBQTtJQUNBLE1BQUE7SUFDQSxPQUFBO0tBQ0EsU0FBQTtNQUNBLGFBQUEsUUFBQTs7OztJQUlBLE1BQUEsYUFBQTtJQUNBLEtBQUE7SUFDQSxNQUFBO0lBQ0EsT0FBQTtLQUNBLFNBQUE7TUFDQSxhQUFBLFFBQUE7Ozs7SUFJQSxNQUFBLGdCQUFBO0lBQ0EsS0FBQTtJQUNBLE1BQUE7SUFDQSxPQUFBO0tBQ0EsU0FBQTtNQUNBLGFBQUEsUUFBQTs7Ozs7Ozs7QUMvQ0EsQ0FBQSxXQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGNBQUEsaUNBQUEsVUFBQSxzQkFBQTtFQUNBLHNCQUFBLGlCQUFBOzs7OztBQ0pBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxjQUFBLHlCQUFBLFNBQUEsZUFBQTs7O0VBR0EsY0FBQSxjQUFBOztLQUVBLGNBQUEsU0FBQTtPQUNBLFVBQUE7OztLQUdBLGNBQUEsT0FBQTtPQUNBLFVBQUE7OztLQUdBLGNBQUEsT0FBQTtPQUNBLFVBQUE7OztLQUdBLGNBQUEsU0FBQTtPQUNBLFVBQUE7OztLQUdBLGNBQUEsVUFBQTtPQUNBLFVBQUE7OztLQUdBLGNBQUEsTUFBQTtPQUNBLFVBQUE7OztLQUdBLGNBQUEsS0FBQTtPQUNBLFVBQUE7OztLQUdBLGNBQUEsT0FBQTtPQUNBLFVBQUE7OztLQUdBLGNBQUEsVUFBQTtPQUNBLFVBQUE7Ozs7O0tBS0EsY0FBQSxPQUFBO09BQ0EsTUFBQTtPQUNBLEtBQUE7T0FDQSxVQUFBO09BQ0EsYUFBQSxPQUFBLFNBQUE7T0FDQSx1QkFBQTs7Ozs7OztBQ25EQSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsY0FBQSw4QkFBQSxTQUFBLG9CQUFBOztFQUVBLG1CQUFBLE1BQUE7R0FDQSxlQUFBO0dBQ0EsY0FBQTtHQUNBLFlBQUE7Ozs7O0FDUkEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGVBQUEsUUFBQSxjQUFBLFVBQUE7RUFDQSxPQUFBLFNBQUEsT0FBQTtHQUNBLE9BQUEsQ0FBQSxTQUFBLE1BQUEsUUFBQSxzQkFBQSxTQUFBLElBQUE7SUFDQSxPQUFBLElBQUEsT0FBQSxHQUFBLGdCQUFBLElBQUEsT0FBQSxHQUFBO1FBQ0E7Ozs7O0FDUEEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGVBQUEsUUFBQSxpQkFBQSxVQUFBO0VBQ0EsT0FBQSxTQUFBLFNBQUEsS0FBQTtHQUNBLEtBQUEsQ0FBQSxLQUFBO0lBQ0EsT0FBQTs7R0FFQSxJQUFBLFFBQUEsSUFBQSxNQUFBO0dBQ0EsS0FBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsUUFBQSxLQUFBO0lBQ0EsTUFBQSxLQUFBLE1BQUEsR0FBQSxPQUFBLEdBQUEsZ0JBQUEsTUFBQSxHQUFBLE1BQUE7O0dBRUEsT0FBQSxNQUFBLEtBQUE7Ozs7QUNaQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsZUFBQSxPQUFBLHNCQUFBLFlBQUE7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QTs7RUFFQSxPQUFBO0dBQ0EsTUFBQSxTQUFBLFFBQUE7SUFDQSxJQUFBLENBQUEsUUFBQTtLQUNBLE9BQUE7OztJQUdBLE9BQUEsU0FBQTtLQUNBLFNBQUE7T0FDQSxRQUFBO09BQ0EsU0FBQTtPQUNBLE9BQUE7T0FDQSxVQUFBOzs7R0FHQSxPQUFBLFNBQUEsUUFBQTtJQUNBLElBQUEsQ0FBQSxRQUFBO0tBQ0EsT0FBQTs7O0lBR0EsT0FBQSxTQUFBO0tBQ0EsU0FBQTtPQUNBLFFBQUE7T0FDQSxTQUFBO09BQ0EsTUFBQTtPQUNBLE9BQUE7T0FDQSxVQUFBOzs7Ozs7QUNsQ0EsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLFdBQUEsb0JBQUE7O0lBRUEsU0FBQSxrQkFBQTs7Ozs7O0FDTEEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG1CQUFBLFdBQUEsb0JBQUE7O0lBRUEsU0FBQSxrQkFBQTs7Ozs7O0FDTEEsQ0FBQSxXQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLG1CQUFBLFdBQUEscUJBQUE7O0NBRUEsU0FBQSxvQkFBQTtFQUNBLElBQUEsS0FBQTs7RUFFQSxHQUFBLHNCQUFBO0VBQ0EsR0FBQSxzQkFBQTs7Ozs7OztFQU9BLEdBQUEsTUFBQSxtQkFBQSxLQUFBLFVBQUE7Ozs7O0FDaEJBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHVCQUFBOztJQUVBLFNBQUEscUJBQUE7Ozs7OztBQ0xBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHNCQUFBOztJQUVBLFNBQUEsb0JBQUE7Ozs7OztBQ0xBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxrQkFBQSxVQUFBLGFBQUE7O0lBRUEsU0FBQSxzQkFBQTs7UUFFQSxJQUFBLFlBQUE7VUFDQSxVQUFBO1VBQ0EsYUFBQTtVQUNBLFlBQUE7VUFDQSxjQUFBO1VBQ0EsT0FBQTtVQUNBLGtCQUFBOzs7SUFHQSxPQUFBOzs7O0FDaEJBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHVCQUFBOztJQUVBLFNBQUEscUJBQUE7UUFDQSxJQUFBLEtBQUE7O0tBRUEsR0FBQSxlQUFBLFNBQUEsVUFBQTtPQUNBLGNBQUEsYUFBQTs7Ozs7O0FDVEEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGtCQUFBLFVBQUEsYUFBQTs7Q0FFQSxTQUFBLHNCQUFBOztFQUVBLElBQUEsWUFBQTtJQUNBLFVBQUE7SUFDQSxhQUFBO0lBQ0EsWUFBQTtJQUNBLGNBQUE7VUFDQSxPQUFBO1VBQ0Esa0JBQUE7OztJQUdBLE9BQUE7Ozs7QUNoQkEsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxRQUFBLG9CQUFBLFlBQUEscUNBQUEsU0FBQSxjQUFBO0VBQ0EsSUFBQSxLQUFBOztLQUVBLEdBQUEsZUFBQSxTQUFBLFVBQUE7T0FDQSxjQUFBLGFBQUE7Ozs7OztBQ1BBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxrQkFBQSxVQUFBLGdCQUFBOztJQUVBLFNBQUEseUJBQUE7O1FBRUEsSUFBQSxZQUFBO1VBQ0EsVUFBQTtVQUNBLGFBQUE7VUFDQSxZQUFBO1VBQ0EsY0FBQTtVQUNBLE9BQUE7VUFDQSxrQkFBQTs7O0lBR0EsT0FBQTs7OztBQ2hCQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsV0FBQSwwQkFBQTs7SUFFQSxTQUFBLHdCQUFBO1FBQ0EsSUFBQSxLQUFBOzs7Ozs7QUFNQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcCcsXG5cdFx0W1xuXHRcdCdhcHAuY29udHJvbGxlcnMnLFxuXHRcdCdhcHAuZmlsdGVycycsXG5cdFx0J2FwcC5zZXJ2aWNlcycsXG5cdFx0J2FwcC5kaXJlY3RpdmVzJyxcblx0XHQnYXBwLnJvdXRlcycsXG5cdFx0J2FwcC5jb25maWcnLFxuXHRcdCdwYXJ0aWFsc01vZHVsZSdcblx0XHRdKTtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycsIFsndWkucm91dGVyJywgJ25nTWF0ZXJpYWwnLCAnbmdTdG9yYWdlJywgJ3Jlc3Rhbmd1bGFyJywgJ2FuZ3VsYXItbG9hZGluZy1iYXInLCAnc2F0ZWxsaXplciddKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJywgW10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJywgW10pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJykuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRhdXRoUHJvdmlkZXIpe1xuXG5cdFx0dmFyIGdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSl7XG5cdFx0XHRyZXR1cm4gJy4vdmlld3MvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHZpZXdOYW1lICsgJy5odG1sJztcblx0XHR9O1xuXG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG5cdFx0JHN0YXRlUHJvdmlkZXJcblx0XHRcdC5zdGF0ZSgnYXBwJywge1xuXHRcdFx0XHRhYnN0cmFjdDogdHJ1ZSxcblx0XHRcdFx0dmlld3M6IHtcblx0XHRcdFx0XHRoZWFkZXI6IHtcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Zm9vdGVyOiB7XG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG1haW46IHt9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuc3RhdGUoJ2FwcC5sYW5kaW5nJywge1xuXHRcdFx0XHR1cmw6ICcvJyxcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5zdGF0ZSgnYXBwLmxvZ2luJywge1xuXHRcdFx0XHR1cmw6ICcvJyxcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdHZpZXdzOiB7XG5cdFx0XHRcdFx0J21haW5AJzoge1xuXHRcdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xvZ2luJylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuc3RhdGUoJ2FwcC5yZWdpc3RlcicsIHtcblx0XHRcdFx0dXJsOiAnLycsXG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHR2aWV3czoge1xuXHRcdFx0XHRcdCdtYWluQCc6IHtcblx0XHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdyZWdpc3RlcicpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHR9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uIChjZnBMb2FkaW5nQmFyUHJvdmlkZXIpe1xuXHRcdGNmcExvYWRpbmdCYXJQcm92aWRlci5pbmNsdWRlU3Bpbm5lciA9IGZhbHNlO1xuXHR9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbigkYXV0aFByb3ZpZGVyKSB7XG5cblx0XHQvKiBDb25maWd1cmF0aW9uIGZpbGUgZm9yIFNhdGVsbGl6ZXIncyBoYW5kbGluZyBvZiBsb2dpbiBhdXRoZW50aWNhdGlvbiAqL1x0XHRcblx0XHQkYXV0aFByb3ZpZGVyLnN0b3JhZ2VUeXBlID0gJ2xvY2FsU3RvcmFnZSc7XG5cdFx0XG5cdCAgICAkYXV0aFByb3ZpZGVyLmZhY2Vib29rKHtcblx0ICAgICAgY2xpZW50SWQ6ICdGYWNlYm9vayBBcHAgSUQnXG5cdCAgICB9KTtcblxuXHQgICAgJGF1dGhQcm92aWRlci5nb29nbGUoe1xuXHQgICAgICBjbGllbnRJZDogJ0dvb2dsZSBDbGllbnQgSUQnXG5cdCAgICB9KTtcblxuXHQgICAgJGF1dGhQcm92aWRlci5naXRodWIoe1xuXHQgICAgICBjbGllbnRJZDogJ0dpdEh1YiBDbGllbnQgSUQnXG5cdCAgICB9KTtcblxuXHQgICAgJGF1dGhQcm92aWRlci5saW5rZWRpbih7XG5cdCAgICAgIGNsaWVudElkOiAnTGlua2VkSW4gQ2xpZW50IElEJ1xuXHQgICAgfSk7XG5cblx0ICAgICRhdXRoUHJvdmlkZXIuaW5zdGFncmFtKHtcblx0ICAgICAgY2xpZW50SWQ6ICdJbnN0YWdyYW0gQ2xpZW50IElEJ1xuXHQgICAgfSk7XG5cblx0ICAgICRhdXRoUHJvdmlkZXIueWFob28oe1xuXHQgICAgICBjbGllbnRJZDogJ1lhaG9vIENsaWVudCBJRCAvIENvbnN1bWVyIEtleSdcblx0ICAgIH0pO1xuXG5cdCAgICAkYXV0aFByb3ZpZGVyLmxpdmUoe1xuXHQgICAgICBjbGllbnRJZDogJ01pY3Jvc29mdCBDbGllbnQgSUQnXG5cdCAgICB9KTtcblxuXHQgICAgJGF1dGhQcm92aWRlci50d2l0Y2goe1xuXHQgICAgICBjbGllbnRJZDogJ1R3aXRjaCBDbGllbnQgSUQnXG5cdCAgICB9KTtcblxuXHQgICAgJGF1dGhQcm92aWRlci5iaXRidWNrZXQoe1xuXHQgICAgICBjbGllbnRJZDogJ0JpdGJ1Y2tldCBDbGllbnQgSUQnXG5cdCAgICB9KTtcblxuXHQgICAgLy8gTm8gYWRkaXRpb25hbCBzZXR1cCByZXF1aXJlZCBmb3IgVHdpdHRlclxuXG5cdCAgICAkYXV0aFByb3ZpZGVyLm9hdXRoMih7XG5cdCAgICAgIG5hbWU6ICdmb3Vyc3F1YXJlJyxcblx0ICAgICAgdXJsOiAnL2F1dGgvZm91cnNxdWFyZScsXG5cdCAgICAgIGNsaWVudElkOiAnRm91cnNxdWFyZSBDbGllbnQgSUQnLFxuXHQgICAgICByZWRpcmVjdFVyaTogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcblx0ICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9mb3Vyc3F1YXJlLmNvbS9vYXV0aDIvYXV0aGVudGljYXRlJyxcblx0ICAgIH0pO1xuXHRcbn0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xuXHRcdC8qIEZvciBtb3JlIGluZm8sIHZpc2l0IGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhcmpzLm9yZy8jL1RoZW1pbmcvMDFfaW50cm9kdWN0aW9uICovXG5cdFx0JG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0Jylcblx0XHQucHJpbWFyeVBhbGV0dGUoJ2luZGlnbycpXG5cdFx0LmFjY2VudFBhbGV0dGUoJ2dyZXknKVxuXHRcdC53YXJuUGFsZXR0ZSgncmVkJyk7XG5cdH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ2NhcGl0YWxpemUnLCBmdW5jdGlvbigpe1xuXHRcdHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xuXHRcdFx0cmV0dXJuIChpbnB1dCkgPyBpbnB1dC5yZXBsYWNlKC8oW15cXFdfXStbXlxccy1dKikgKi9nLGZ1bmN0aW9uKHR4dCl7XG5cdFx0XHRcdHJldHVybiB0eHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eHQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9KSA6ICcnO1xuXHRcdH07XG5cdH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICdodW1hblJlYWRhYmxlJywgZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24gaHVtYW5pemUoc3RyKSB7XG5cdFx0XHRpZiAoICFzdHIgKXtcblx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGZyYWdzID0gc3RyLnNwbGl0KCdfJyk7XG5cdFx0XHRmb3IgKHZhciBpPTA7IGk8ZnJhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0ZnJhZ3NbaV0gPSBmcmFnc1tpXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGZyYWdzW2ldLnNsaWNlKDEpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZyYWdzLmpvaW4oJyAnKTtcblx0XHR9O1xuXHR9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd0cnVuY2F0ZUNoYXJhY3RlcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQsIGNoYXJzLCBicmVha09uV29yZCkge1xuICAgICAgICAgICAgaWYgKGlzTmFOKGNoYXJzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGFycyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlucHV0ICYmIGlucHV0Lmxlbmd0aCA+IGNoYXJzKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcoMCwgY2hhcnMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFicmVha09uV29yZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdHNwYWNlID0gaW5wdXQubGFzdEluZGV4T2YoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGxhc3Qgc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RzcGFjZSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyKDAsIGxhc3RzcGFjZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaW5wdXQuY2hhckF0KGlucHV0Lmxlbmd0aC0xKSA9PT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cigwLCBpbnB1dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQgKyAnLi4uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgfTtcbiAgICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd0cnVuY2F0ZVdvcmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0LCB3b3Jkcykge1xuICAgICAgICAgICAgaWYgKGlzTmFOKHdvcmRzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3b3JkcyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0V29yZHMgPSBpbnB1dC5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dFdvcmRzLmxlbmd0aCA+IHdvcmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXRXb3Jkcy5zbGljZSgwLCB3b3Jkcykuam9pbignICcpICsgJy4uLic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9O1xuICAgIH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAndHJ1c3RIdG1sJywgZnVuY3Rpb24oICRzY2UgKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGh0bWwgKXtcblx0XHRcdHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd1Y2ZpcnN0JywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCBpbnB1dCApIHtcblx0XHRcdGlmICggIWlucHV0ICl7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGlucHV0LnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgaW5wdXQuc3Vic3RyaW5nKDEpO1xuXHRcdH07XG5cdH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJykuZmFjdG9yeSgnQVBJJywgZnVuY3Rpb24oUmVzdGFuZ3VsYXIsIFRvYXN0U2VydmljZSwgJGxvY2FsU3RvcmFnZSkge1xuXG5cdFx0Ly9jb250ZW50IG5lZ290aWF0aW9uXG5cdFx0dmFyIGhlYWRlcnMgPSB7XG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0J0FjY2VwdCc6ICdhcHBsaWNhdGlvbi94LmxhcmF2ZWwudjEranNvbidcblx0XHR9O1xuXG5cdFx0cmV0dXJuIFJlc3Rhbmd1bGFyLndpdGhDb25maWcoZnVuY3Rpb24oUmVzdGFuZ3VsYXJDb25maWd1cmVyKSB7XG5cdFx0XHRSZXN0YW5ndWxhckNvbmZpZ3VyZXJcblx0XHRcdFx0LnNldEJhc2VVcmwoJy9hcGkvJylcblx0XHRcdFx0LnNldERlZmF1bHRIZWFkZXJzKGhlYWRlcnMpXG5cdFx0XHRcdC5zZXRFcnJvckludGVyY2VwdG9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDIyKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBlcnJvciBpbiByZXNwb25zZS5kYXRhLmVycm9ycykge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gVG9hc3RTZXJ2aWNlLmVycm9yKHJlc3BvbnNlLmRhdGEuZXJyb3JzW2Vycm9yXVswXSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuYWRkRnVsbFJlcXVlc3RJbnRlcmNlcHRvcihmdW5jdGlvbihlbGVtZW50LCBvcGVyYXRpb24sIHdoYXQsIHVybCwgaGVhZGVycykge1xuXHRcdFx0XHRcdGlmICgkbG9jYWxTdG9yYWdlLmp3dCkge1xuXHRcdFx0XHRcdFx0aGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgJGxvY2FsU3RvcmFnZS5qd3Q7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnRGlhbG9nU2VydmljZScsIGZ1bmN0aW9uKCRtZERpYWxvZyl7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0ZnJvbVRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSwgJHNjb3BlKXtcblxuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJy4vdmlld3MvZGlhbG9ncy8nICsgdGVtcGxhdGUgKyAnLycgKyB0ZW1wbGF0ZSArICcuaHRtbCdcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoJHNjb3BlKXtcblx0XHRcdFx0XHRvcHRpb25zLnNjb3BlID0gJHNjb3BlLiRuZXcoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAkbWREaWFsb2cuc2hvdyhvcHRpb25zKTtcblx0XHRcdH0sXG5cblx0XHRcdGhpZGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybiAkbWREaWFsb2cuaGlkZSgpO1xuXHRcdFx0fSxcblxuXHRcdFx0YWxlcnQ6IGZ1bmN0aW9uKHRpdGxlLCBjb250ZW50KXtcblx0XHRcdFx0JG1kRGlhbG9nLnNob3coXG5cdFx0XHRcdFx0JG1kRGlhbG9nLmFsZXJ0KClcblx0XHRcdFx0XHRcdC50aXRsZSh0aXRsZSlcblx0XHRcdFx0XHRcdC5jb250ZW50KGNvbnRlbnQpXG5cdFx0XHRcdFx0XHQub2soJ09rJylcblx0XHRcdFx0KTtcblx0XHRcdH0sXG5cblx0XHRcdGNvbmZpcm06IGZ1bmN0aW9uKHRpdGxlLCBjb250ZW50KSB7XG5cdFx0XHRcdHJldHVybiAkbWREaWFsb2cuc2hvdyhcblx0XHRcdFx0XHQkbWREaWFsb2cuY29uZmlybSgpXG5cdFx0XHRcdFx0XHQudGl0bGUodGl0bGUpXG5cdFx0XHRcdFx0XHQuY29udGVudChjb250ZW50KVxuXHRcdFx0XHRcdFx0Lm9rKCdPaycpXG5cdFx0XHRcdFx0XHQuY2FuY2VsKCdDYW5jZWwnKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnVG9hc3RTZXJ2aWNlJywgZnVuY3Rpb24oJG1kVG9hc3Qpe1xuXG5cdFx0dmFyIGRlbGF5ID0gNjAwMCxcblx0XHRcdHBvc2l0aW9uID0gJ3RvcCByaWdodCcsXG5cdFx0XHRhY3Rpb24gPSAnT0snO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHNob3c6IGZ1bmN0aW9uKGNvbnRlbnQpe1xuXHRcdFx0XHRpZiAoIWNvbnRlbnQpe1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAkbWRUb2FzdC5zaG93KFxuXHRcdFx0XHRcdCRtZFRvYXN0LnNpbXBsZSgpXG5cdFx0XHRcdFx0XHQuY29udGVudChjb250ZW50KVxuXHRcdFx0XHRcdFx0LnBvc2l0aW9uKHBvc2l0aW9uKVxuXHRcdFx0XHRcdFx0LmFjdGlvbihhY3Rpb24pXG5cdFx0XHRcdFx0XHQuaGlkZURlbGF5KGRlbGF5KVxuXHRcdFx0XHQpO1xuXHRcdFx0fSxcblx0XHRcdGVycm9yOiBmdW5jdGlvbihjb250ZW50KXtcblx0XHRcdFx0aWYgKCFjb250ZW50KXtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gJG1kVG9hc3Quc2hvdyhcblx0XHRcdFx0XHQkbWRUb2FzdC5zaW1wbGUoKVxuXHRcdFx0XHRcdFx0LmNvbnRlbnQoY29udGVudClcblx0XHRcdFx0XHRcdC5wb3NpdGlvbihwb3NpdGlvbilcblx0XHRcdFx0XHRcdC50aGVtZSgnd2FybicpXG5cdFx0XHRcdFx0XHQuYWN0aW9uKGFjdGlvbilcblx0XHRcdFx0XHRcdC5oaWRlRGVsYXkoZGVsYXkpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Zvb3RlckNvbnRyb2xsZXInLCBGb290ZXJDb250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIEZvb3RlckNvbnRyb2xsZXIoKXtcbiAgICAgICAgLy9cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgSGVhZGVyQ29udHJvbGxlcik7XG5cbiAgICBmdW5jdGlvbiBIZWFkZXJDb250cm9sbGVyKCl7XG4gICAgICAgIC8vXG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTGFuZGluZ0NvbnRyb2xsZXInLCBMYW5kaW5nQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gTGFuZGluZ0NvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblxuXHRcdHZtLmxhcmF2ZWxfZGVzY3JpcHRpb24gPSAnUmVzcG9uc2UgbWFjcm9zIGludGVncmF0ZWQgd2l0aCB5b3VyIEFuZ3VsYXIgYXBwJztcblx0XHR2bS5hbmd1bGFyX2Rlc2NyaXB0aW9uID0gJ1F1ZXJ5IHlvdXIgQVBJIHdpdGhvdXQgd29ycnlpbmcgYWJvdXQgdmFsaWRhdGlvbnMnO1xuXG5cdFx0Lypcblx0XHRUaGlzIGlzIGEgdGVycmlibGUgdGVtcG9yYXJ5IGhhY2ssXG5cdFx0dG8gZml4IGxheW91dCBpc3N1ZXMgd2l0aCBmbGV4IG9uIGlPUyAoY2hyb21lICYgc2FmYXJpKVxuXHRcdE1ha2Ugc3VyZSB0byByZW1vdmUgdGhpcyB3aGVuIHlvdSBtb2RpZnkgdGhpcyBkZW1vXG5cdFx0Ki9cblx0XHR2bS5pT1MgPSAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblx0fVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTG9naW5Gb3JtQ29udHJvbGxlcicsIExvZ2luRm9ybUNvbnRyb2xsZXIpO1xuXG4gICAgZnVuY3Rpb24gTG9naW5Gb3JtQ29udHJvbGxlcigpe1xuICAgICAgICAvL1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ29udHJvbGxlcicsIFJlZ2lzdGVyQ29udHJvbGxlcik7XG5cbiAgICBmdW5jdGlvbiBSZWdpc3RlckNvbnRyb2xsZXIoKXtcbiAgICAgICAgLy9cbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSgnbG9naW5Gb3JtJywgbG9naW5Gb3JtRGVmaW5pdGlvbik7XG5cbiAgICBmdW5jdGlvbiBsb2dpbkZvcm1EZWZpbml0aW9uKCkge1xuXG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgcmVzdHJpY3Q6ICdFQScsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdzL2RpcmVjdGl2ZXMvbG9naW4tZm9ybS9sb2dpbi1mb3JtLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkZvcm1Db250cm9sbGVyJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcbiAgICAgICAgfTtcblxuICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0xvZ2luRm9ybUNvbnRyb2xsZXInLCBMb2dpbkZvcm1Db250cm9sbGVyKTtcblxuICAgIGZ1bmN0aW9uIExvZ2luRm9ybUNvbnRyb2xsZXIoKXtcbiAgICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgICAgXG5cdCAgICB2bS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbihwcm92aWRlcikge1xuXHQgICAgICAkYXV0aFByb3ZpZGVyLmF1dGhlbnRpY2F0ZShwcm92aWRlcik7XG5cdCAgICB9O1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoJ2xvZ2luRm9ybScsIGxvZ2luRm9ybURlZmluaXRpb24pOyBcblxuXHRmdW5jdGlvbiBsb2dpbkZvcm1EZWZpbml0aW9uKCkge1xuXG5cdFx0dmFyIGRpcmVjdGl2ZSA9IHtcblx0XHQgIHJlc3RyaWN0OiAnRScsXG5cdFx0ICB0ZW1wbGF0ZVVybDogJy4vdmlld3MvZGlyZWN0aXZlcy9sb2dpbi1mb3JtL2xvZ2luLWZvcm0uaHRtbCcsXG5cdFx0ICBjb250cm9sbGVyOiAnTG9naW5Gb3JtQ29udHJvbGxlcicsXG5cdFx0ICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcblx0XHR9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblx0fVxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSggJ2FwcC5jb250cm9sbGVycycgKS5jb250cm9sbGVyKCAnTG9naW5Db250cm9sbGVyJywgZnVuY3Rpb24oJGF1dGhQcm92aWRlcil7XG5cdFx0dmFyIHZtID0gdGhpcztcblxuXHQgICAgdm0uYXV0aGVudGljYXRlID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcblx0ICAgICAgJGF1dGhQcm92aWRlci5hdXRoZW50aWNhdGUocHJvdmlkZXIpO1xuXHQgICAgfTtcbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJykuZGlyZWN0aXZlKCdyZWdpc3RlckZvcm0nLCByZWdpc3RlckZvcm1EZWZpbml0aW9uKTtcblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyRm9ybURlZmluaXRpb24oKSB7XG5cbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi92aWV3cy9kaXJlY3RpdmVzL3JlZ2lzdGVyLWZvcm0vcmVnaXN0ZXItZm9ybS5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJGb3JtQ29udHJvbGxlcicsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdSZWdpc3RlckZvcm1Db250cm9sbGVyJywgUmVnaXN0ZXJGb3JtQ29udHJvbGxlcik7XG5cbiAgICBmdW5jdGlvbiBSZWdpc3RlckZvcm1Db250cm9sbGVyKCl7XG4gICAgICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAgICAgLy9cbiAgICB9XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
