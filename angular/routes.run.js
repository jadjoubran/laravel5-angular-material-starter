(function(){
	"use strict";

	angular.module('app.routes').run(function($rootScope, $mdSidenav){
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
	});

})();
