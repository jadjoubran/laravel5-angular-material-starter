(function(){
	"use strict";

	var app = angular.module('app',
		[
		'app.controllers',
		'app.filters',
		'app.services',
		'app.directives',
		'app.routes',
		'app.config',
		]);

	angular.module('app.routes', ['ui.router', 'ngStorage']);
	angular.module('app.controllers', ['ui.router', 'ngMaterial', 'ngStorage', 'restangular']);
	angular.module('app.filters', []);
	angular.module('app.services', ['ui.router', 'ngStorage', 'restangular']);
	angular.module('app.directives', []);
	angular.module('app.config', []);

})();
(function(){
	"use strict";

	angular.module('app.routes').config( ["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider ) {

		var getView = function( viewName ){
			return '/views/app/' + viewName + '/' + viewName + '.html';
		};

		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('landing', {
			url: '/',
			views: {
				main: {
					templateUrl: getView('landing')
				}
			}
		}).state('dashboard', {
			url: '/dashboard',
			views: {
				main: {
					templateUrl: getView('dashboard')
				},
				footer: {
					templateUrl: getView('footer')
				}
			}
		});


	}] );
})();
(function(){
	"use strict";

	angular.module('app.config').config( ["RestangularProvider", function(RestangularProvider) {
		RestangularProvider
		.setBaseUrl('/api/v1/')
		.setDefaultHeaders({'X-CSRF-TOKEN': document.getElementById('csrf-token').value });
	}]);

})();
(function(){
	"use strict";

	angular.module('app.config').config( ["$mdThemingProvider", function($mdThemingProvider) {
		/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
		$mdThemingProvider.theme('default')
		.primaryPalette('teal')
		.accentPalette('cyan')
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

	angular.module('app.filters').filter( 't', ["$filter", function( $filter ){
		return function( text ){
			text = $filter('translate')(text);
			return $filter('ucfirst')(text);
		};
	}]);
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

(function(){
	"use strict";

	angular.module('app.controllers').controller('DashboardCtrl', ["$scope", "Restangular", function( $scope, Restangular ){


		$scope.sample_test = function(){
			$scope.sample_data = 'Loading..';
			Restangular.all('test').doGET('sample').then(function( response ){
				$scope.sample_data = response.data;
			});
		};

	}]);

})();
(function(){
	"use strict";

	angular.module('app.controllers').controller('LandingCtrl', ["$scope", "$mdToast", "$mdDialog", function( $scope, $mdToast, $mdDialog ){

		$scope.promoImage = 'http://i.imgur.com/XiMykki.png';

		$scope.toastNotification = function(){
			$mdToast.show(
				$mdToast.simple()
				.content('This is a toast notification!')
				.position('top right')
				.hideDelay(3000)
				);
		};

		$scope.showDialog = function( event ){
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.body))
				.title('This is an alert title')
				.content('You can specify some description text in here.')
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(event)
				);
		};

	}]);

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFxcbWFpbi5qcyIsImFwcFxccm91dGVzLmpzIiwiY29uZmlnXFxyZXN0YW5ndWxhci5qcyIsImNvbmZpZ1xcdGhlbWUuanMiLCJmaWx0ZXJzXFxjYXBpdGFsaXplLmpzIiwiZmlsdGVyc1xcdHJhbnNsYXRpb25zLmpzIiwiZmlsdGVyc1xcdHJ1c3RfaHRtbC5qcyIsImZpbHRlcnNcXHVjZmlyc3QuanMiLCJhcHBcXGRhc2hib2FyZFxcZGFzaGJvYXJkLmpzIiwiYXBwXFxsYW5kaW5nXFxsYW5kaW5nLmpzIiwiYXBwXFxmb290ZXJcXGZvb3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0dmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxyXG5cdFx0W1xyXG5cdFx0J2FwcC5jb250cm9sbGVycycsXHJcblx0XHQnYXBwLmZpbHRlcnMnLFxyXG5cdFx0J2FwcC5zZXJ2aWNlcycsXHJcblx0XHQnYXBwLmRpcmVjdGl2ZXMnLFxyXG5cdFx0J2FwcC5yb3V0ZXMnLFxyXG5cdFx0J2FwcC5jb25maWcnLFxyXG5cdFx0XSk7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJywgWyd1aS5yb3V0ZXInLCAnbmdTdG9yYWdlJ10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ25nU3RvcmFnZScsICdyZXN0YW5ndWxhciddKTtcclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFsndWkucm91dGVyJywgJ25nU3RvcmFnZScsICdyZXN0YW5ndWxhciddKTtcclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycpLmNvbmZpZyggZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciApIHtcclxuXHJcblx0XHR2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKCB2aWV3TmFtZSApe1xyXG5cdFx0XHRyZXR1cm4gJy92aWV3cy9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgdmlld05hbWUgKyAnLmh0bWwnO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcblxyXG5cdFx0JHN0YXRlUHJvdmlkZXJcclxuXHRcdC5zdGF0ZSgnbGFuZGluZycsIHtcclxuXHRcdFx0dXJsOiAnLycsXHJcblx0XHRcdHZpZXdzOiB7XHJcblx0XHRcdFx0bWFpbjoge1xyXG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSkuc3RhdGUoJ2Rhc2hib2FyZCcsIHtcclxuXHRcdFx0dXJsOiAnL2Rhc2hib2FyZCcsXHJcblx0XHRcdHZpZXdzOiB7XHJcblx0XHRcdFx0bWFpbjoge1xyXG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Rhc2hib2FyZCcpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmb290ZXI6IHtcclxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHR9ICk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKCBmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKSB7XHJcblx0XHRSZXN0YW5ndWxhclByb3ZpZGVyXHJcblx0XHQuc2V0QmFzZVVybCgnL2FwaS92MS8nKVxyXG5cdFx0LnNldERlZmF1bHRIZWFkZXJzKHsnWC1DU1JGLVRPS0VOJzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NzcmYtdG9rZW4nKS52YWx1ZSB9KTtcclxuXHR9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKCBmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuXHRcdC8qIEZvciBtb3JlIGluZm8sIHZpc2l0IGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhcmpzLm9yZy8jL1RoZW1pbmcvMDFfaW50cm9kdWN0aW9uICovXHJcblx0XHQkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG5cdFx0LnByaW1hcnlQYWxldHRlKCd0ZWFsJylcclxuXHRcdC5hY2NlbnRQYWxldHRlKCdjeWFuJylcclxuXHRcdC53YXJuUGFsZXR0ZSgncmVkJyk7XHJcblx0fSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICdjYXBpdGFsaXplJywgZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBmdW5jdGlvbihpbnB1dCwgYWxsKSB7XHJcblx0XHRcdHJldHVybiAoISFpbnB1dCkgPyBpbnB1dC5yZXBsYWNlKC8oW15cXFdfXStbXlxccy1dKikgKi9nLGZ1bmN0aW9uKHR4dCl7XHJcblx0XHRcdFx0cmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0fSkgOiAnJztcclxuXHRcdH07XHJcblx0fSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ3QnLCBmdW5jdGlvbiggJGZpbHRlciApe1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCB0ZXh0ICl7XHJcblx0XHRcdHRleHQgPSAkZmlsdGVyKCd0cmFuc2xhdGUnKSh0ZXh0KTtcclxuXHRcdFx0cmV0dXJuICRmaWx0ZXIoJ3VjZmlyc3QnKSh0ZXh0KTtcclxuXHRcdH07XHJcblx0fSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ3RydXN0SHRtbCcsIGZ1bmN0aW9uKCAkc2NlICl7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGh0bWwgKXtcclxuXHRcdFx0cmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbCk7XHJcblx0XHR9O1xyXG5cdH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoJ3VjZmlyc3QnLCBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiggaW5wdXQgKSB7XHJcblx0XHRcdGlmICggIWlucHV0ICl7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGlucHV0LnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgaW5wdXQuc3Vic3RyaW5nKDEpO1xyXG5cdFx0fTtcclxuXHR9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRGFzaGJvYXJkQ3RybCcsIGZ1bmN0aW9uKCAkc2NvcGUsIFJlc3Rhbmd1bGFyICl7XHJcblxyXG5cclxuXHRcdCRzY29wZS5zYW1wbGVfdGVzdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRzY29wZS5zYW1wbGVfZGF0YSA9ICdMb2FkaW5nLi4nO1xyXG5cdFx0XHRSZXN0YW5ndWxhci5hbGwoJ3Rlc3QnKS5kb0dFVCgnc2FtcGxlJykudGhlbihmdW5jdGlvbiggcmVzcG9uc2UgKXtcclxuXHRcdFx0XHQkc2NvcGUuc2FtcGxlX2RhdGEgPSByZXNwb25zZS5kYXRhO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0xhbmRpbmdDdHJsJywgZnVuY3Rpb24oICRzY29wZSwgJG1kVG9hc3QsICRtZERpYWxvZyApe1xyXG5cclxuXHRcdCRzY29wZS5wcm9tb0ltYWdlID0gJ2h0dHA6Ly9pLmltZ3VyLmNvbS9YaU15a2tpLnBuZyc7XHJcblxyXG5cdFx0JHNjb3BlLnRvYXN0Tm90aWZpY2F0aW9uID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0JG1kVG9hc3Quc2hvdyhcclxuXHRcdFx0XHQkbWRUb2FzdC5zaW1wbGUoKVxyXG5cdFx0XHRcdC5jb250ZW50KCdUaGlzIGlzIGEgdG9hc3Qgbm90aWZpY2F0aW9uIScpXHJcblx0XHRcdFx0LnBvc2l0aW9uKCd0b3AgcmlnaHQnKVxyXG5cdFx0XHRcdC5oaWRlRGVsYXkoMzAwMClcclxuXHRcdFx0XHQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKCBldmVudCApe1xyXG5cdFx0XHQkbWREaWFsb2cuc2hvdyhcclxuXHRcdFx0XHQkbWREaWFsb2cuYWxlcnQoKVxyXG5cdFx0XHRcdC5wYXJlbnQoYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpKVxyXG5cdFx0XHRcdC50aXRsZSgnVGhpcyBpcyBhbiBhbGVydCB0aXRsZScpXHJcblx0XHRcdFx0LmNvbnRlbnQoJ1lvdSBjYW4gc3BlY2lmeSBzb21lIGRlc2NyaXB0aW9uIHRleHQgaW4gaGVyZS4nKVxyXG5cdFx0XHRcdC5hcmlhTGFiZWwoJ0FsZXJ0IERpYWxvZyBEZW1vJylcclxuXHRcdFx0XHQub2soJ0dvdCBpdCEnKVxyXG5cdFx0XHRcdC50YXJnZXRFdmVudChldmVudClcclxuXHRcdFx0XHQpO1xyXG5cdFx0fTtcclxuXHJcblx0fSk7XHJcblxyXG59KSgpOyIsIiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==