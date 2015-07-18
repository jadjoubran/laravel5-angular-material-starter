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

	angular.module('app.routes', ['ui.router', 'ngStorage', 'satellizer']);
	angular.module('app.controllers', ['ui.router', 'ngMaterial', 'ngStorage', 'restangular', 'ngMdIcons']);
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
(function (){
    "use strict";

    angular.module('app.config').config(["$authProvider", function ($authProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = '/api/1/authenticate';
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

	angular.module('app.controllers').controller('LandingCtrl', ["$scope", "$mdToast", "$mdDialog", "$interval", function( $scope, $mdToast, $mdDialog, $interval ){

		$scope.promoImage = 'http://i.imgur.com/XiMykki.png';
		$scope.icon = 'send';

		var icons = [
		'office', 'facebook', 'twitter', 'apple', 'whatsapp', 'linkedin', 'windows', 'accessibility', 'alarm', 'aspect_ratio',
		'autorenew', 'bookmark_outline', 'dashboard', 'dns', 'favorite_outline', 'get_app', 'highlight_remove', 'history', 'list',
		'picture_in_picture', 'print', 'settings_ethernet', 'settings_power', 'shopping_cart', 'spellcheck', 'swap_horiz', 'swap_vert',
		'thumb_up', 'thumbs_up_down', 'translate', 'trending_up', 'visibility', 'warning', 'mic', 'play_circle_outline', 'repeat',
		'skip_next', 'call', 'chat', 'clear_all', 'dialpad', 'dnd_on', 'forum', 'location_on', 'vpn_key', 'filter_list', 'inbox',
		'link', 'remove_circle_outline', 'save', 'text_format', 'access_time', 'airplanemode_on', 'bluetooth', 'data_usage',
		'gps_fixed', 'now_wallpaper', 'now_widgets', 'storage', 'wifi_tethering', 'attach_file', 'format_line_spacing',
		'format_list_numbered', 'format_quote', 'vertical_align_center', 'wrap_text', 'cloud_queue', 'file_download', 'folder_open',
		'cast', 'headset', 'keyboard_backspace', 'mouse', 'speaker', 'watch', 'audiotrack', 'edit', 'brush', 'looks', 'crop_free',
		'camera', 'filter_vintage', 'hdr_strong', 'photo_camera', 'slideshow', 'timer', 'directions_bike', 'hotel', 'local_library',
		'directions_walk', 'local_cafe', 'local_pizza', 'local_florist', 'my_location', 'navigation', 'pin_drop', 'arrow_back', 'menu',
		'close', 'more_horiz', 'more_vert', 'refresh', 'phone_paused', 'vibration', 'cake', 'group', 'mood', 'person',
		'notifications_none', 'plus_one', 'school', 'share', 'star_outline'
		],
		counter = 0;

		$interval(function(){
			$scope.icon = icons[++counter];
			if ( counter > 112 ){
				counter = 0;
			}
		}, 2000);

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
(function (){
    "use strict";

    angular.module('app.controllers').controller('LoginCtrl', ["$scope", "Restangular", "$auth", "$state", function ($scope, Restangular, $auth, $state){

        // Use Satellizer's $auth service to login because it'll automatically save the JWT in localStorage
        $auth.login(credentials).then(function (data){
            // If login is successful, redirect to the users state
            $state.go('dashboard');
        });


        // This request will hit the getData method in the AuthenticateController
        // on the Laravel side and will return your data that require authentication
        Restangular.all('api/authenticate/data').get().then(function (response){

        }, function (error){

        });

    }]);

})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFxcbWFpbi5qcyIsImFwcFxccm91dGVzLmpzIiwiY29uZmlnXFxyZXN0YW5ndWxhci5qcyIsImNvbmZpZ1xcc2F0ZWxsaXplci5qcyIsImNvbmZpZ1xcdGhlbWUuanMiLCJmaWx0ZXJzXFxjYXBpdGFsaXplLmpzIiwiZmlsdGVyc1xcdHJhbnNsYXRpb25zLmpzIiwiZmlsdGVyc1xcdHJ1c3RfaHRtbC5qcyIsImZpbHRlcnNcXHVjZmlyc3QuanMiLCJhcHBcXGRhc2hib2FyZFxcZGFzaGJvYXJkLmpzIiwiYXBwXFxmb290ZXJcXGZvb3Rlci5qcyIsImFwcFxcbGFuZGluZ1xcbGFuZGluZy5qcyIsImFwcFxcbG9naW5cXGxvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyxcclxuXHRcdFtcclxuXHRcdCdhcHAuY29udHJvbGxlcnMnLFxyXG5cdFx0J2FwcC5maWx0ZXJzJyxcclxuXHRcdCdhcHAuc2VydmljZXMnLFxyXG5cdFx0J2FwcC5kaXJlY3RpdmVzJyxcclxuXHRcdCdhcHAucm91dGVzJyxcclxuXHRcdCdhcHAuY29uZmlnJyxcclxuXHRcdF0pO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJywgJ25nU3RvcmFnZScsICdzYXRlbGxpemVyJ10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ25nU3RvcmFnZScsICdyZXN0YW5ndWxhcicsICduZ01kSWNvbnMnXSk7XHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJywgW10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuc2VydmljZXMnLCBbJ3VpLnJvdXRlcicsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInXSk7XHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJywgW10pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XHJcblxyXG5cdFx0dmFyIGdldFZpZXcgPSBmdW5jdGlvbiggdmlld05hbWUgKXtcclxuXHRcdFx0cmV0dXJuICcvdmlld3MvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHZpZXdOYW1lICsgJy5odG1sJztcclxuXHRcdH07XHJcblxyXG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cclxuXHRcdCRzdGF0ZVByb3ZpZGVyXHJcblx0XHQuc3RhdGUoJ2xhbmRpbmcnLCB7XHJcblx0XHRcdHVybDogJy8nLFxyXG5cdFx0XHR2aWV3czoge1xyXG5cdFx0XHRcdG1haW46IHtcclxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdsYW5kaW5nJylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLnN0YXRlKCdkYXNoYm9hcmQnLCB7XHJcblx0XHRcdHVybDogJy9kYXNoYm9hcmQnLFxyXG5cdFx0XHR2aWV3czoge1xyXG5cdFx0XHRcdG1haW46IHtcclxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdkYXNoYm9hcmQnKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Zm9vdGVyOiB7XHJcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fSApO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyggZnVuY3Rpb24oUmVzdGFuZ3VsYXJQcm92aWRlcikge1xyXG5cdFx0UmVzdGFuZ3VsYXJQcm92aWRlclxyXG5cdFx0LnNldEJhc2VVcmwoJy9hcGkvdjEvJylcclxuXHRcdC5zZXREZWZhdWx0SGVhZGVycyh7J1gtQ1NSRi1UT0tFTic6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjc3JmLXRva2VuJykudmFsdWUgfSk7XHJcblx0fSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcclxuICAgICAgICAvLyBTYXRlbGxpemVyIGNvbmZpZ3VyYXRpb24gdGhhdCBzcGVjaWZpZXMgd2hpY2ggQVBJXHJcbiAgICAgICAgLy8gcm91dGUgdGhlIEpXVCBzaG91bGQgYmUgcmV0cmlldmVkIGZyb21cclxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvMS9hdXRoZW50aWNhdGUnO1xyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyggZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcblx0XHQvKiBGb3IgbW9yZSBpbmZvLCB2aXNpdCBodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvIy9UaGVtaW5nLzAxX2ludHJvZHVjdGlvbiAqL1xyXG5cdFx0JG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuXHRcdC5wcmltYXJ5UGFsZXR0ZSgndGVhbCcpXHJcblx0XHQuYWNjZW50UGFsZXR0ZSgnY3lhbicpXHJcblx0XHQud2FyblBhbGV0dGUoJ3JlZCcpO1xyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAnY2FwaXRhbGl6ZScsIGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oaW5wdXQsIGFsbCkge1xyXG5cdFx0XHRyZXR1cm4gKCEhaW5wdXQpID8gaW5wdXQucmVwbGFjZSgvKFteXFxXX10rW15cXHMtXSopICovZyxmdW5jdGlvbih0eHQpe1xyXG5cdFx0XHRcdHJldHVybiB0eHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eHQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdH0pIDogJyc7XHJcblx0XHR9O1xyXG5cdH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICd0JywgZnVuY3Rpb24oICRmaWx0ZXIgKXtcclxuXHRcdHJldHVybiBmdW5jdGlvbiggdGV4dCApe1xyXG5cdFx0XHR0ZXh0ID0gJGZpbHRlcigndHJhbnNsYXRlJykodGV4dCk7XHJcblx0XHRcdHJldHVybiAkZmlsdGVyKCd1Y2ZpcnN0JykodGV4dCk7XHJcblx0XHR9O1xyXG5cdH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICd0cnVzdEh0bWwnLCBmdW5jdGlvbiggJHNjZSApe1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCBodG1sICl7XHJcblx0XHRcdHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xyXG5cdFx0fTtcclxuXHR9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd1Y2ZpcnN0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGlucHV0ICkge1xyXG5cdFx0XHRpZiAoICFpbnB1dCApe1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpbnB1dC5zdWJzdHJpbmcoMCwgMSkudG9VcHBlckNhc2UoKSArIGlucHV0LnN1YnN0cmluZygxKTtcclxuXHRcdH07XHJcblx0fSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBmdW5jdGlvbiggJHNjb3BlLCBSZXN0YW5ndWxhciApe1xyXG5cclxuXHJcblx0XHQkc2NvcGUuc2FtcGxlX3Rlc3QgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHQkc2NvcGUuc2FtcGxlX2RhdGEgPSAnTG9hZGluZy4uJztcclxuXHRcdFx0UmVzdGFuZ3VsYXIuYWxsKCd0ZXN0JykuZG9HRVQoJ3NhbXBsZScpLnRoZW4oZnVuY3Rpb24oIHJlc3BvbnNlICl7XHJcblx0XHRcdFx0JHNjb3BlLnNhbXBsZV9kYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKCk7IiwiIiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdMYW5kaW5nQ3RybCcsIGZ1bmN0aW9uKCAkc2NvcGUsICRtZFRvYXN0LCAkbWREaWFsb2csICRpbnRlcnZhbCApe1xyXG5cclxuXHRcdCRzY29wZS5wcm9tb0ltYWdlID0gJ2h0dHA6Ly9pLmltZ3VyLmNvbS9YaU15a2tpLnBuZyc7XHJcblx0XHQkc2NvcGUuaWNvbiA9ICdzZW5kJztcclxuXHJcblx0XHR2YXIgaWNvbnMgPSBbXHJcblx0XHQnb2ZmaWNlJywgJ2ZhY2Vib29rJywgJ3R3aXR0ZXInLCAnYXBwbGUnLCAnd2hhdHNhcHAnLCAnbGlua2VkaW4nLCAnd2luZG93cycsICdhY2Nlc3NpYmlsaXR5JywgJ2FsYXJtJywgJ2FzcGVjdF9yYXRpbycsXHJcblx0XHQnYXV0b3JlbmV3JywgJ2Jvb2ttYXJrX291dGxpbmUnLCAnZGFzaGJvYXJkJywgJ2RucycsICdmYXZvcml0ZV9vdXRsaW5lJywgJ2dldF9hcHAnLCAnaGlnaGxpZ2h0X3JlbW92ZScsICdoaXN0b3J5JywgJ2xpc3QnLFxyXG5cdFx0J3BpY3R1cmVfaW5fcGljdHVyZScsICdwcmludCcsICdzZXR0aW5nc19ldGhlcm5ldCcsICdzZXR0aW5nc19wb3dlcicsICdzaG9wcGluZ19jYXJ0JywgJ3NwZWxsY2hlY2snLCAnc3dhcF9ob3JpeicsICdzd2FwX3ZlcnQnLFxyXG5cdFx0J3RodW1iX3VwJywgJ3RodW1ic191cF9kb3duJywgJ3RyYW5zbGF0ZScsICd0cmVuZGluZ191cCcsICd2aXNpYmlsaXR5JywgJ3dhcm5pbmcnLCAnbWljJywgJ3BsYXlfY2lyY2xlX291dGxpbmUnLCAncmVwZWF0JyxcclxuXHRcdCdza2lwX25leHQnLCAnY2FsbCcsICdjaGF0JywgJ2NsZWFyX2FsbCcsICdkaWFscGFkJywgJ2RuZF9vbicsICdmb3J1bScsICdsb2NhdGlvbl9vbicsICd2cG5fa2V5JywgJ2ZpbHRlcl9saXN0JywgJ2luYm94JyxcclxuXHRcdCdsaW5rJywgJ3JlbW92ZV9jaXJjbGVfb3V0bGluZScsICdzYXZlJywgJ3RleHRfZm9ybWF0JywgJ2FjY2Vzc190aW1lJywgJ2FpcnBsYW5lbW9kZV9vbicsICdibHVldG9vdGgnLCAnZGF0YV91c2FnZScsXHJcblx0XHQnZ3BzX2ZpeGVkJywgJ25vd193YWxscGFwZXInLCAnbm93X3dpZGdldHMnLCAnc3RvcmFnZScsICd3aWZpX3RldGhlcmluZycsICdhdHRhY2hfZmlsZScsICdmb3JtYXRfbGluZV9zcGFjaW5nJyxcclxuXHRcdCdmb3JtYXRfbGlzdF9udW1iZXJlZCcsICdmb3JtYXRfcXVvdGUnLCAndmVydGljYWxfYWxpZ25fY2VudGVyJywgJ3dyYXBfdGV4dCcsICdjbG91ZF9xdWV1ZScsICdmaWxlX2Rvd25sb2FkJywgJ2ZvbGRlcl9vcGVuJyxcclxuXHRcdCdjYXN0JywgJ2hlYWRzZXQnLCAna2V5Ym9hcmRfYmFja3NwYWNlJywgJ21vdXNlJywgJ3NwZWFrZXInLCAnd2F0Y2gnLCAnYXVkaW90cmFjaycsICdlZGl0JywgJ2JydXNoJywgJ2xvb2tzJywgJ2Nyb3BfZnJlZScsXHJcblx0XHQnY2FtZXJhJywgJ2ZpbHRlcl92aW50YWdlJywgJ2hkcl9zdHJvbmcnLCAncGhvdG9fY2FtZXJhJywgJ3NsaWRlc2hvdycsICd0aW1lcicsICdkaXJlY3Rpb25zX2Jpa2UnLCAnaG90ZWwnLCAnbG9jYWxfbGlicmFyeScsXHJcblx0XHQnZGlyZWN0aW9uc193YWxrJywgJ2xvY2FsX2NhZmUnLCAnbG9jYWxfcGl6emEnLCAnbG9jYWxfZmxvcmlzdCcsICdteV9sb2NhdGlvbicsICduYXZpZ2F0aW9uJywgJ3Bpbl9kcm9wJywgJ2Fycm93X2JhY2snLCAnbWVudScsXHJcblx0XHQnY2xvc2UnLCAnbW9yZV9ob3JpeicsICdtb3JlX3ZlcnQnLCAncmVmcmVzaCcsICdwaG9uZV9wYXVzZWQnLCAndmlicmF0aW9uJywgJ2Nha2UnLCAnZ3JvdXAnLCAnbW9vZCcsICdwZXJzb24nLFxyXG5cdFx0J25vdGlmaWNhdGlvbnNfbm9uZScsICdwbHVzX29uZScsICdzY2hvb2wnLCAnc2hhcmUnLCAnc3Rhcl9vdXRsaW5lJ1xyXG5cdFx0XSxcclxuXHRcdGNvdW50ZXIgPSAwO1xyXG5cclxuXHRcdCRpbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0XHQkc2NvcGUuaWNvbiA9IGljb25zWysrY291bnRlcl07XHJcblx0XHRcdGlmICggY291bnRlciA+IDExMiApe1xyXG5cdFx0XHRcdGNvdW50ZXIgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAyMDAwKTtcclxuXHJcblx0XHQkc2NvcGUudG9hc3ROb3RpZmljYXRpb24gPSBmdW5jdGlvbigpe1xyXG5cdFx0XHQkbWRUb2FzdC5zaG93KFxyXG5cdFx0XHRcdCRtZFRvYXN0LnNpbXBsZSgpXHJcblx0XHRcdFx0LmNvbnRlbnQoJ1RoaXMgaXMgYSB0b2FzdCBub3RpZmljYXRpb24hJylcclxuXHRcdFx0XHQucG9zaXRpb24oJ3RvcCByaWdodCcpXHJcblx0XHRcdFx0LmhpZGVEZWxheSgzMDAwKVxyXG5cdFx0XHRcdCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oIGV2ZW50ICl7XHJcblx0XHRcdCRtZERpYWxvZy5zaG93KFxyXG5cdFx0XHRcdCRtZERpYWxvZy5hbGVydCgpXHJcblx0XHRcdFx0LnBhcmVudChhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSkpXHJcblx0XHRcdFx0LnRpdGxlKCdUaGlzIGlzIGFuIGFsZXJ0IHRpdGxlJylcclxuXHRcdFx0XHQuY29udGVudCgnWW91IGNhbiBzcGVjaWZ5IHNvbWUgZGVzY3JpcHRpb24gdGV4dCBpbiBoZXJlLicpXHJcblx0XHRcdFx0LmFyaWFMYWJlbCgnQWxlcnQgRGlhbG9nIERlbW8nKVxyXG5cdFx0XHRcdC5vaygnR290IGl0IScpXHJcblx0XHRcdFx0LnRhcmdldEV2ZW50KGV2ZW50KVxyXG5cdFx0XHRcdCk7XHJcblx0XHR9O1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIFJlc3Rhbmd1bGFyLCAkYXV0aCwgJHN0YXRlKXtcclxuXHJcbiAgICAgICAgLy8gVXNlIFNhdGVsbGl6ZXIncyAkYXV0aCBzZXJ2aWNlIHRvIGxvZ2luIGJlY2F1c2UgaXQnbGwgYXV0b21hdGljYWxseSBzYXZlIHRoZSBKV1QgaW4gbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgJGF1dGgubG9naW4oY3JlZGVudGlhbHMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgICAgICAvLyBJZiBsb2dpbiBpcyBzdWNjZXNzZnVsLCByZWRpcmVjdCB0byB0aGUgdXNlcnMgc3RhdGVcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdkYXNoYm9hcmQnKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIFRoaXMgcmVxdWVzdCB3aWxsIGhpdCB0aGUgZ2V0RGF0YSBtZXRob2QgaW4gdGhlIEF1dGhlbnRpY2F0ZUNvbnRyb2xsZXJcclxuICAgICAgICAvLyBvbiB0aGUgTGFyYXZlbCBzaWRlIGFuZCB3aWxsIHJldHVybiB5b3VyIGRhdGEgdGhhdCByZXF1aXJlIGF1dGhlbnRpY2F0aW9uXHJcbiAgICAgICAgUmVzdGFuZ3VsYXIuYWxsKCdhcGkvYXV0aGVudGljYXRlL2RhdGEnKS5nZXQoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XHJcblxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcil7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=