(function(){
	"use strict";

	angular.module('app.routes').run(function($rootScope){
		$rootScope.$on("$stateChangeStart", function(event, toState){

			if (toState.data && toState.data.pageName){
				$rootScope.current_page = toState.data.pageName;
			};


		});
		$rootScope.$on("$viewContentLoaded", function(event, toState){
			Prism.highlightAll();
		});
	});

})();
