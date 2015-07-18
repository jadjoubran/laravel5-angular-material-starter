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
		.setBaseUrl('/api/1/');
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
			Restangular.all('test/sample').post().then(function( response ){
				$scope.sample_data = response.data;
			});
		};

	}]);

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('LandingCtrl', ["$scope", "$mdToast", "$mdDialog", "$interval", function( $scope, $mdToast, $mdDialog, $interval ){

		$scope.promoImage = 'https://i.imgur.com/XiMykki.png';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFxcbWFpbi5qcyIsImFwcFxccm91dGVzLmpzIiwiY29uZmlnXFxyZXN0YW5ndWxhci5qcyIsImNvbmZpZ1xcc2F0ZWxsaXplci5qcyIsImNvbmZpZ1xcdGhlbWUuanMiLCJmaWx0ZXJzXFxjYXBpdGFsaXplLmpzIiwiZmlsdGVyc1xcdHJhbnNsYXRpb25zLmpzIiwiZmlsdGVyc1xcdHJ1c3RfaHRtbC5qcyIsImZpbHRlcnNcXHVjZmlyc3QuanMiLCJhcHBcXGRhc2hib2FyZFxcZGFzaGJvYXJkLmpzIiwiYXBwXFxmb290ZXJcXGZvb3Rlci5qcyIsImFwcFxcbGFuZGluZ1xcbGFuZGluZy5qcyIsImFwcFxcbG9naW5cXGxvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHR2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXHJcblx0XHRbXHJcblx0XHQnYXBwLmNvbnRyb2xsZXJzJyxcclxuXHRcdCdhcHAuZmlsdGVycycsXHJcblx0XHQnYXBwLnNlcnZpY2VzJyxcclxuXHRcdCdhcHAuZGlyZWN0aXZlcycsXHJcblx0XHQnYXBwLnJvdXRlcycsXHJcblx0XHQnYXBwLmNvbmZpZycsXHJcblx0XHRdKTtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbJ3VpLnJvdXRlcicsICduZ1N0b3JhZ2UnLCAnc2F0ZWxsaXplciddKTtcclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInLCAnbmdNZEljb25zJ10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgWyd1aS5yb3V0ZXInLCAnbmdTdG9yYWdlJywgJ3Jlc3Rhbmd1bGFyJ10pO1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycsIFtdKTtcclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJykuY29uZmlnKCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyICkge1xyXG5cclxuXHRcdHZhciBnZXRWaWV3ID0gZnVuY3Rpb24oIHZpZXdOYW1lICl7XHJcblx0XHRcdHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XHJcblx0XHR9O1xyXG5cclxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuXHJcblx0XHQkc3RhdGVQcm92aWRlclxyXG5cdFx0LnN0YXRlKCdsYW5kaW5nJywge1xyXG5cdFx0XHR1cmw6ICcvJyxcclxuXHRcdFx0dmlld3M6IHtcclxuXHRcdFx0XHRtYWluOiB7XHJcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnbGFuZGluZycpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KS5zdGF0ZSgnZGFzaGJvYXJkJywge1xyXG5cdFx0XHR1cmw6ICcvZGFzaGJvYXJkJyxcclxuXHRcdFx0dmlld3M6IHtcclxuXHRcdFx0XHRtYWluOiB7XHJcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnZGFzaGJvYXJkJylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZvb3Rlcjoge1xyXG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH0gKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnKS5jb25maWcoIGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpIHtcclxuXHRcdFJlc3Rhbmd1bGFyUHJvdmlkZXJcclxuXHRcdC5zZXRCYXNlVXJsKCcvYXBpLzEvJyk7XHJcblx0fSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcclxuICAgICAgICAvLyBTYXRlbGxpemVyIGNvbmZpZ3VyYXRpb24gdGhhdCBzcGVjaWZpZXMgd2hpY2ggQVBJXHJcbiAgICAgICAgLy8gcm91dGUgdGhlIEpXVCBzaG91bGQgYmUgcmV0cmlldmVkIGZyb21cclxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvMS9hdXRoZW50aWNhdGUnO1xyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyggZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcblx0XHQvKiBGb3IgbW9yZSBpbmZvLCB2aXNpdCBodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvIy9UaGVtaW5nLzAxX2ludHJvZHVjdGlvbiAqL1xyXG5cdFx0JG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuXHRcdC5wcmltYXJ5UGFsZXR0ZSgndGVhbCcpXHJcblx0XHQuYWNjZW50UGFsZXR0ZSgnY3lhbicpXHJcblx0XHQud2FyblBhbGV0dGUoJ3JlZCcpO1xyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAnY2FwaXRhbGl6ZScsIGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oaW5wdXQsIGFsbCkge1xyXG5cdFx0XHRyZXR1cm4gKCEhaW5wdXQpID8gaW5wdXQucmVwbGFjZSgvKFteXFxXX10rW15cXHMtXSopICovZyxmdW5jdGlvbih0eHQpe1xyXG5cdFx0XHRcdHJldHVybiB0eHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eHQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdH0pIDogJyc7XHJcblx0XHR9O1xyXG5cdH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICd0JywgZnVuY3Rpb24oICRmaWx0ZXIgKXtcclxuXHRcdHJldHVybiBmdW5jdGlvbiggdGV4dCApe1xyXG5cdFx0XHR0ZXh0ID0gJGZpbHRlcigndHJhbnNsYXRlJykodGV4dCk7XHJcblx0XHRcdHJldHVybiAkZmlsdGVyKCd1Y2ZpcnN0JykodGV4dCk7XHJcblx0XHR9O1xyXG5cdH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICd0cnVzdEh0bWwnLCBmdW5jdGlvbiggJHNjZSApe1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCBodG1sICl7XHJcblx0XHRcdHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xyXG5cdFx0fTtcclxuXHR9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd1Y2ZpcnN0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGlucHV0ICkge1xyXG5cdFx0XHRpZiAoICFpbnB1dCApe1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpbnB1dC5zdWJzdHJpbmcoMCwgMSkudG9VcHBlckNhc2UoKSArIGlucHV0LnN1YnN0cmluZygxKTtcclxuXHRcdH07XHJcblx0fSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBmdW5jdGlvbiggJHNjb3BlLCBSZXN0YW5ndWxhciApe1xyXG5cclxuXHJcblx0XHQkc2NvcGUuc2FtcGxlX3Rlc3QgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHQkc2NvcGUuc2FtcGxlX2RhdGEgPSAnTG9hZGluZy4uJztcclxuXHRcdFx0UmVzdGFuZ3VsYXIuYWxsKCd0ZXN0L3NhbXBsZScpLnBvc3QoKS50aGVuKGZ1bmN0aW9uKCByZXNwb25zZSApe1xyXG5cdFx0XHRcdCRzY29wZS5zYW1wbGVfZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0fSk7XHJcblxyXG59KSgpOyIsIiIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTGFuZGluZ0N0cmwnLCBmdW5jdGlvbiggJHNjb3BlLCAkbWRUb2FzdCwgJG1kRGlhbG9nLCAkaW50ZXJ2YWwgKXtcclxuXHJcblx0XHQkc2NvcGUucHJvbW9JbWFnZSA9ICdodHRwczovL2kuaW1ndXIuY29tL1hpTXlra2kucG5nJztcclxuXHRcdCRzY29wZS5pY29uID0gJ3NlbmQnO1xyXG5cclxuXHRcdHZhciBpY29ucyA9IFtcclxuXHRcdCdvZmZpY2UnLCAnZmFjZWJvb2snLCAndHdpdHRlcicsICdhcHBsZScsICd3aGF0c2FwcCcsICdsaW5rZWRpbicsICd3aW5kb3dzJywgJ2FjY2Vzc2liaWxpdHknLCAnYWxhcm0nLCAnYXNwZWN0X3JhdGlvJyxcclxuXHRcdCdhdXRvcmVuZXcnLCAnYm9va21hcmtfb3V0bGluZScsICdkYXNoYm9hcmQnLCAnZG5zJywgJ2Zhdm9yaXRlX291dGxpbmUnLCAnZ2V0X2FwcCcsICdoaWdobGlnaHRfcmVtb3ZlJywgJ2hpc3RvcnknLCAnbGlzdCcsXHJcblx0XHQncGljdHVyZV9pbl9waWN0dXJlJywgJ3ByaW50JywgJ3NldHRpbmdzX2V0aGVybmV0JywgJ3NldHRpbmdzX3Bvd2VyJywgJ3Nob3BwaW5nX2NhcnQnLCAnc3BlbGxjaGVjaycsICdzd2FwX2hvcml6JywgJ3N3YXBfdmVydCcsXHJcblx0XHQndGh1bWJfdXAnLCAndGh1bWJzX3VwX2Rvd24nLCAndHJhbnNsYXRlJywgJ3RyZW5kaW5nX3VwJywgJ3Zpc2liaWxpdHknLCAnd2FybmluZycsICdtaWMnLCAncGxheV9jaXJjbGVfb3V0bGluZScsICdyZXBlYXQnLFxyXG5cdFx0J3NraXBfbmV4dCcsICdjYWxsJywgJ2NoYXQnLCAnY2xlYXJfYWxsJywgJ2RpYWxwYWQnLCAnZG5kX29uJywgJ2ZvcnVtJywgJ2xvY2F0aW9uX29uJywgJ3Zwbl9rZXknLCAnZmlsdGVyX2xpc3QnLCAnaW5ib3gnLFxyXG5cdFx0J2xpbmsnLCAncmVtb3ZlX2NpcmNsZV9vdXRsaW5lJywgJ3NhdmUnLCAndGV4dF9mb3JtYXQnLCAnYWNjZXNzX3RpbWUnLCAnYWlycGxhbmVtb2RlX29uJywgJ2JsdWV0b290aCcsICdkYXRhX3VzYWdlJyxcclxuXHRcdCdncHNfZml4ZWQnLCAnbm93X3dhbGxwYXBlcicsICdub3dfd2lkZ2V0cycsICdzdG9yYWdlJywgJ3dpZmlfdGV0aGVyaW5nJywgJ2F0dGFjaF9maWxlJywgJ2Zvcm1hdF9saW5lX3NwYWNpbmcnLFxyXG5cdFx0J2Zvcm1hdF9saXN0X251bWJlcmVkJywgJ2Zvcm1hdF9xdW90ZScsICd2ZXJ0aWNhbF9hbGlnbl9jZW50ZXInLCAnd3JhcF90ZXh0JywgJ2Nsb3VkX3F1ZXVlJywgJ2ZpbGVfZG93bmxvYWQnLCAnZm9sZGVyX29wZW4nLFxyXG5cdFx0J2Nhc3QnLCAnaGVhZHNldCcsICdrZXlib2FyZF9iYWNrc3BhY2UnLCAnbW91c2UnLCAnc3BlYWtlcicsICd3YXRjaCcsICdhdWRpb3RyYWNrJywgJ2VkaXQnLCAnYnJ1c2gnLCAnbG9va3MnLCAnY3JvcF9mcmVlJyxcclxuXHRcdCdjYW1lcmEnLCAnZmlsdGVyX3ZpbnRhZ2UnLCAnaGRyX3N0cm9uZycsICdwaG90b19jYW1lcmEnLCAnc2xpZGVzaG93JywgJ3RpbWVyJywgJ2RpcmVjdGlvbnNfYmlrZScsICdob3RlbCcsICdsb2NhbF9saWJyYXJ5JyxcclxuXHRcdCdkaXJlY3Rpb25zX3dhbGsnLCAnbG9jYWxfY2FmZScsICdsb2NhbF9waXp6YScsICdsb2NhbF9mbG9yaXN0JywgJ215X2xvY2F0aW9uJywgJ25hdmlnYXRpb24nLCAncGluX2Ryb3AnLCAnYXJyb3dfYmFjaycsICdtZW51JyxcclxuXHRcdCdjbG9zZScsICdtb3JlX2hvcml6JywgJ21vcmVfdmVydCcsICdyZWZyZXNoJywgJ3Bob25lX3BhdXNlZCcsICd2aWJyYXRpb24nLCAnY2FrZScsICdncm91cCcsICdtb29kJywgJ3BlcnNvbicsXHJcblx0XHQnbm90aWZpY2F0aW9uc19ub25lJywgJ3BsdXNfb25lJywgJ3NjaG9vbCcsICdzaGFyZScsICdzdGFyX291dGxpbmUnXHJcblx0XHRdLFxyXG5cdFx0Y291bnRlciA9IDA7XHJcblxyXG5cdFx0JGludGVydmFsKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRzY29wZS5pY29uID0gaWNvbnNbKytjb3VudGVyXTtcclxuXHRcdFx0aWYgKCBjb3VudGVyID4gMTEyICl7XHJcblx0XHRcdFx0Y291bnRlciA9IDA7XHJcblx0XHRcdH1cclxuXHRcdH0sIDIwMDApO1xyXG5cclxuXHRcdCRzY29wZS50b2FzdE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRtZFRvYXN0LnNob3coXHJcblx0XHRcdFx0JG1kVG9hc3Quc2ltcGxlKClcclxuXHRcdFx0XHQuY29udGVudCgnVGhpcyBpcyBhIHRvYXN0IG5vdGlmaWNhdGlvbiEnKVxyXG5cdFx0XHRcdC5wb3NpdGlvbigndG9wIHJpZ2h0JylcclxuXHRcdFx0XHQuaGlkZURlbGF5KDMwMDApXHJcblx0XHRcdFx0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLnNob3dEaWFsb2cgPSBmdW5jdGlvbiggZXZlbnQgKXtcclxuXHRcdFx0JG1kRGlhbG9nLnNob3coXHJcblx0XHRcdFx0JG1kRGlhbG9nLmFsZXJ0KClcclxuXHRcdFx0XHQucGFyZW50KGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSlcclxuXHRcdFx0XHQudGl0bGUoJ1RoaXMgaXMgYW4gYWxlcnQgdGl0bGUnKVxyXG5cdFx0XHRcdC5jb250ZW50KCdZb3UgY2FuIHNwZWNpZnkgc29tZSBkZXNjcmlwdGlvbiB0ZXh0IGluIGhlcmUuJylcclxuXHRcdFx0XHQuYXJpYUxhYmVsKCdBbGVydCBEaWFsb2cgRGVtbycpXHJcblx0XHRcdFx0Lm9rKCdHb3QgaXQhJylcclxuXHRcdFx0XHQudGFyZ2V0RXZlbnQoZXZlbnQpXHJcblx0XHRcdFx0KTtcclxuXHRcdH07XHJcblxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgUmVzdGFuZ3VsYXIsICRhdXRoLCAkc3RhdGUpe1xyXG5cclxuICAgICAgICAvLyBVc2UgU2F0ZWxsaXplcidzICRhdXRoIHNlcnZpY2UgdG8gbG9naW4gYmVjYXVzZSBpdCdsbCBhdXRvbWF0aWNhbGx5IHNhdmUgdGhlIEpXVCBpbiBsb2NhbFN0b3JhZ2VcclxuICAgICAgICAkYXV0aC5sb2dpbihjcmVkZW50aWFscykudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgICAgIC8vIElmIGxvZ2luIGlzIHN1Y2Nlc3NmdWwsIHJlZGlyZWN0IHRvIHRoZSB1c2VycyBzdGF0ZVxyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gVGhpcyByZXF1ZXN0IHdpbGwgaGl0IHRoZSBnZXREYXRhIG1ldGhvZCBpbiB0aGUgQXV0aGVudGljYXRlQ29udHJvbGxlclxyXG4gICAgICAgIC8vIG9uIHRoZSBMYXJhdmVsIHNpZGUgYW5kIHdpbGwgcmV0dXJuIHlvdXIgZGF0YSB0aGF0IHJlcXVpcmUgYXV0aGVudGljYXRpb25cclxuICAgICAgICBSZXN0YW5ndWxhci5hbGwoJ2FwaS9hdXRoZW50aWNhdGUvZGF0YScpLmdldCgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcclxuXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKXtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==