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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFxcbWFpbi5qcyIsImFwcFxccm91dGVzLmpzIiwiY29uZmlnXFxyZXN0YW5ndWxhci5qcyIsImNvbmZpZ1xcc2F0ZWxsaXplci5qcyIsImNvbmZpZ1xcdGhlbWUuanMiLCJmaWx0ZXJzXFxjYXBpdGFsaXplLmpzIiwiZmlsdGVyc1xcdHJhbnNsYXRpb25zLmpzIiwiZmlsdGVyc1xcdHJ1c3RfaHRtbC5qcyIsImZpbHRlcnNcXHVjZmlyc3QuanMiLCJhcHBcXGRhc2hib2FyZFxcZGFzaGJvYXJkLmpzIiwiYXBwXFxkYXNoYm9hcmQgLSBDb3B5XFxkYXNoYm9hcmQuanMiLCJhcHBcXGZvb3RlclxcZm9vdGVyLmpzIiwiYXBwXFxsYW5kaW5nXFxsYW5kaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyxcclxuXHRcdFtcclxuXHRcdCdhcHAuY29udHJvbGxlcnMnLFxyXG5cdFx0J2FwcC5maWx0ZXJzJyxcclxuXHRcdCdhcHAuc2VydmljZXMnLFxyXG5cdFx0J2FwcC5kaXJlY3RpdmVzJyxcclxuXHRcdCdhcHAucm91dGVzJyxcclxuXHRcdCdhcHAuY29uZmlnJyxcclxuXHRcdF0pO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJywgJ25nU3RvcmFnZScsICdzYXRlbGxpemVyJ10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ3VpLnJvdXRlcicsICduZ01hdGVyaWFsJywgJ25nU3RvcmFnZScsICdyZXN0YW5ndWxhcicsICduZ01kSWNvbnMnXSk7XHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJywgW10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuc2VydmljZXMnLCBbJ3VpLnJvdXRlcicsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInXSk7XHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJywgW10pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XHJcblxyXG5cdFx0dmFyIGdldFZpZXcgPSBmdW5jdGlvbiggdmlld05hbWUgKXtcclxuXHRcdFx0cmV0dXJuICcvdmlld3MvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHZpZXdOYW1lICsgJy5odG1sJztcclxuXHRcdH07XHJcblxyXG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cclxuXHRcdCRzdGF0ZVByb3ZpZGVyXHJcblx0XHQuc3RhdGUoJ2xhbmRpbmcnLCB7XHJcblx0XHRcdHVybDogJy8nLFxyXG5cdFx0XHR2aWV3czoge1xyXG5cdFx0XHRcdG1haW46IHtcclxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdsYW5kaW5nJylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLnN0YXRlKCdkYXNoYm9hcmQnLCB7XHJcblx0XHRcdHVybDogJy9kYXNoYm9hcmQnLFxyXG5cdFx0XHR2aWV3czoge1xyXG5cdFx0XHRcdG1haW46IHtcclxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdkYXNoYm9hcmQnKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Zm9vdGVyOiB7XHJcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fSApO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyggZnVuY3Rpb24oUmVzdGFuZ3VsYXJQcm92aWRlcikge1xyXG5cdFx0UmVzdGFuZ3VsYXJQcm92aWRlclxyXG5cdFx0LnNldEJhc2VVcmwoJy9hcGkvdjEvJylcclxuXHRcdC5zZXREZWZhdWx0SGVhZGVycyh7J1gtQ1NSRi1UT0tFTic6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjc3JmLXRva2VuJykudmFsdWUgfSk7XHJcblx0fSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcclxuICAgICAgICAvLyBTYXRlbGxpemVyIGNvbmZpZ3VyYXRpb24gdGhhdCBzcGVjaWZpZXMgd2hpY2ggQVBJXHJcbiAgICAgICAgLy8gcm91dGUgdGhlIEpXVCBzaG91bGQgYmUgcmV0cmlldmVkIGZyb21cclxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvMS9hdXRoZW50aWNhdGUnO1xyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyggZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcblx0XHQvKiBGb3IgbW9yZSBpbmZvLCB2aXNpdCBodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvIy9UaGVtaW5nLzAxX2ludHJvZHVjdGlvbiAqL1xyXG5cdFx0JG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuXHRcdC5wcmltYXJ5UGFsZXR0ZSgndGVhbCcpXHJcblx0XHQuYWNjZW50UGFsZXR0ZSgnY3lhbicpXHJcblx0XHQud2FyblBhbGV0dGUoJ3JlZCcpO1xyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAnY2FwaXRhbGl6ZScsIGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oaW5wdXQsIGFsbCkge1xyXG5cdFx0XHRyZXR1cm4gKCEhaW5wdXQpID8gaW5wdXQucmVwbGFjZSgvKFteXFxXX10rW15cXHMtXSopICovZyxmdW5jdGlvbih0eHQpe1xyXG5cdFx0XHRcdHJldHVybiB0eHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eHQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdH0pIDogJyc7XHJcblx0XHR9O1xyXG5cdH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICd0JywgZnVuY3Rpb24oICRmaWx0ZXIgKXtcclxuXHRcdHJldHVybiBmdW5jdGlvbiggdGV4dCApe1xyXG5cdFx0XHR0ZXh0ID0gJGZpbHRlcigndHJhbnNsYXRlJykodGV4dCk7XHJcblx0XHRcdHJldHVybiAkZmlsdGVyKCd1Y2ZpcnN0JykodGV4dCk7XHJcblx0XHR9O1xyXG5cdH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICd0cnVzdEh0bWwnLCBmdW5jdGlvbiggJHNjZSApe1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCBodG1sICl7XHJcblx0XHRcdHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xyXG5cdFx0fTtcclxuXHR9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd1Y2ZpcnN0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGlucHV0ICkge1xyXG5cdFx0XHRpZiAoICFpbnB1dCApe1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpbnB1dC5zdWJzdHJpbmcoMCwgMSkudG9VcHBlckNhc2UoKSArIGlucHV0LnN1YnN0cmluZygxKTtcclxuXHRcdH07XHJcblx0fSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBmdW5jdGlvbiggJHNjb3BlLCBSZXN0YW5ndWxhciApe1xyXG5cclxuXHJcblx0XHQkc2NvcGUuc2FtcGxlX3Rlc3QgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHQkc2NvcGUuc2FtcGxlX2RhdGEgPSAnTG9hZGluZy4uJztcclxuXHRcdFx0UmVzdGFuZ3VsYXIuYWxsKCd0ZXN0JykuZG9HRVQoJ3NhbXBsZScpLnRoZW4oZnVuY3Rpb24oIHJlc3BvbnNlICl7XHJcblx0XHRcdFx0JHNjb3BlLnNhbXBsZV9kYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdEYXNoYm9hcmRDdHJsJywgZnVuY3Rpb24oICRzY29wZSwgUmVzdGFuZ3VsYXIgKXtcclxuXHJcblxyXG5cdFx0JHNjb3BlLnNhbXBsZV90ZXN0ID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0JHNjb3BlLnNhbXBsZV9kYXRhID0gJ0xvYWRpbmcuLic7XHJcblx0XHRcdFJlc3Rhbmd1bGFyLmFsbCgndGVzdCcpLmRvR0VUKCdzYW1wbGUnKS50aGVuKGZ1bmN0aW9uKCByZXNwb25zZSApe1xyXG5cdFx0XHRcdCRzY29wZS5zYW1wbGVfZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0fSk7XHJcblxyXG59KSgpOyIsIiIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTGFuZGluZ0N0cmwnLCBmdW5jdGlvbiggJHNjb3BlLCAkbWRUb2FzdCwgJG1kRGlhbG9nLCAkaW50ZXJ2YWwgKXtcclxuXHJcblx0XHQkc2NvcGUucHJvbW9JbWFnZSA9ICdodHRwOi8vaS5pbWd1ci5jb20vWGlNeWtraS5wbmcnO1xyXG5cdFx0JHNjb3BlLmljb24gPSAnc2VuZCc7XHJcblxyXG5cdFx0dmFyIGljb25zID0gW1xyXG5cdFx0J29mZmljZScsICdmYWNlYm9vaycsICd0d2l0dGVyJywgJ2FwcGxlJywgJ3doYXRzYXBwJywgJ2xpbmtlZGluJywgJ3dpbmRvd3MnLCAnYWNjZXNzaWJpbGl0eScsICdhbGFybScsICdhc3BlY3RfcmF0aW8nLFxyXG5cdFx0J2F1dG9yZW5ldycsICdib29rbWFya19vdXRsaW5lJywgJ2Rhc2hib2FyZCcsICdkbnMnLCAnZmF2b3JpdGVfb3V0bGluZScsICdnZXRfYXBwJywgJ2hpZ2hsaWdodF9yZW1vdmUnLCAnaGlzdG9yeScsICdsaXN0JyxcclxuXHRcdCdwaWN0dXJlX2luX3BpY3R1cmUnLCAncHJpbnQnLCAnc2V0dGluZ3NfZXRoZXJuZXQnLCAnc2V0dGluZ3NfcG93ZXInLCAnc2hvcHBpbmdfY2FydCcsICdzcGVsbGNoZWNrJywgJ3N3YXBfaG9yaXonLCAnc3dhcF92ZXJ0JyxcclxuXHRcdCd0aHVtYl91cCcsICd0aHVtYnNfdXBfZG93bicsICd0cmFuc2xhdGUnLCAndHJlbmRpbmdfdXAnLCAndmlzaWJpbGl0eScsICd3YXJuaW5nJywgJ21pYycsICdwbGF5X2NpcmNsZV9vdXRsaW5lJywgJ3JlcGVhdCcsXHJcblx0XHQnc2tpcF9uZXh0JywgJ2NhbGwnLCAnY2hhdCcsICdjbGVhcl9hbGwnLCAnZGlhbHBhZCcsICdkbmRfb24nLCAnZm9ydW0nLCAnbG9jYXRpb25fb24nLCAndnBuX2tleScsICdmaWx0ZXJfbGlzdCcsICdpbmJveCcsXHJcblx0XHQnbGluaycsICdyZW1vdmVfY2lyY2xlX291dGxpbmUnLCAnc2F2ZScsICd0ZXh0X2Zvcm1hdCcsICdhY2Nlc3NfdGltZScsICdhaXJwbGFuZW1vZGVfb24nLCAnYmx1ZXRvb3RoJywgJ2RhdGFfdXNhZ2UnLFxyXG5cdFx0J2dwc19maXhlZCcsICdub3dfd2FsbHBhcGVyJywgJ25vd193aWRnZXRzJywgJ3N0b3JhZ2UnLCAnd2lmaV90ZXRoZXJpbmcnLCAnYXR0YWNoX2ZpbGUnLCAnZm9ybWF0X2xpbmVfc3BhY2luZycsXHJcblx0XHQnZm9ybWF0X2xpc3RfbnVtYmVyZWQnLCAnZm9ybWF0X3F1b3RlJywgJ3ZlcnRpY2FsX2FsaWduX2NlbnRlcicsICd3cmFwX3RleHQnLCAnY2xvdWRfcXVldWUnLCAnZmlsZV9kb3dubG9hZCcsICdmb2xkZXJfb3BlbicsXHJcblx0XHQnY2FzdCcsICdoZWFkc2V0JywgJ2tleWJvYXJkX2JhY2tzcGFjZScsICdtb3VzZScsICdzcGVha2VyJywgJ3dhdGNoJywgJ2F1ZGlvdHJhY2snLCAnZWRpdCcsICdicnVzaCcsICdsb29rcycsICdjcm9wX2ZyZWUnLFxyXG5cdFx0J2NhbWVyYScsICdmaWx0ZXJfdmludGFnZScsICdoZHJfc3Ryb25nJywgJ3Bob3RvX2NhbWVyYScsICdzbGlkZXNob3cnLCAndGltZXInLCAnZGlyZWN0aW9uc19iaWtlJywgJ2hvdGVsJywgJ2xvY2FsX2xpYnJhcnknLFxyXG5cdFx0J2RpcmVjdGlvbnNfd2FsaycsICdsb2NhbF9jYWZlJywgJ2xvY2FsX3BpenphJywgJ2xvY2FsX2Zsb3Jpc3QnLCAnbXlfbG9jYXRpb24nLCAnbmF2aWdhdGlvbicsICdwaW5fZHJvcCcsICdhcnJvd19iYWNrJywgJ21lbnUnLFxyXG5cdFx0J2Nsb3NlJywgJ21vcmVfaG9yaXonLCAnbW9yZV92ZXJ0JywgJ3JlZnJlc2gnLCAncGhvbmVfcGF1c2VkJywgJ3ZpYnJhdGlvbicsICdjYWtlJywgJ2dyb3VwJywgJ21vb2QnLCAncGVyc29uJyxcclxuXHRcdCdub3RpZmljYXRpb25zX25vbmUnLCAncGx1c19vbmUnLCAnc2Nob29sJywgJ3NoYXJlJywgJ3N0YXJfb3V0bGluZSdcclxuXHRcdF0sXHJcblx0XHRjb3VudGVyID0gMDtcclxuXHJcblx0XHQkaW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuXHRcdFx0JHNjb3BlLmljb24gPSBpY29uc1srK2NvdW50ZXJdO1xyXG5cdFx0XHRpZiAoIGNvdW50ZXIgPiAxMTIgKXtcclxuXHRcdFx0XHRjb3VudGVyID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMjAwMCk7XHJcblxyXG5cdFx0JHNjb3BlLnRvYXN0Tm90aWZpY2F0aW9uID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0JG1kVG9hc3Quc2hvdyhcclxuXHRcdFx0XHQkbWRUb2FzdC5zaW1wbGUoKVxyXG5cdFx0XHRcdC5jb250ZW50KCdUaGlzIGlzIGEgdG9hc3Qgbm90aWZpY2F0aW9uIScpXHJcblx0XHRcdFx0LnBvc2l0aW9uKCd0b3AgcmlnaHQnKVxyXG5cdFx0XHRcdC5oaWRlRGVsYXkoMzAwMClcclxuXHRcdFx0XHQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKCBldmVudCApe1xyXG5cdFx0XHQkbWREaWFsb2cuc2hvdyhcclxuXHRcdFx0XHQkbWREaWFsb2cuYWxlcnQoKVxyXG5cdFx0XHRcdC5wYXJlbnQoYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpKVxyXG5cdFx0XHRcdC50aXRsZSgnVGhpcyBpcyBhbiBhbGVydCB0aXRsZScpXHJcblx0XHRcdFx0LmNvbnRlbnQoJ1lvdSBjYW4gc3BlY2lmeSBzb21lIGRlc2NyaXB0aW9uIHRleHQgaW4gaGVyZS4nKVxyXG5cdFx0XHRcdC5hcmlhTGFiZWwoJ0FsZXJ0IERpYWxvZyBEZW1vJylcclxuXHRcdFx0XHQub2soJ0dvdCBpdCEnKVxyXG5cdFx0XHRcdC50YXJnZXRFdmVudChldmVudClcclxuXHRcdFx0XHQpO1xyXG5cdFx0fTtcclxuXHJcblx0fSk7XHJcblxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==