(function() {
	"use strict";

	angular.module('app.controllers').controller('LandingController', LandingController);

	function LandingController() {
		var vm = this;

		vm.laravel_description = 'Response macros integrated with your Angular app';
		vm.angular_description = 'Query your API without worrying about validations';
	}

})();
