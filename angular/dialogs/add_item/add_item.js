(function(){
	"use strict";

	angular.module('app.controllers').controller('AddItemCtrl', function($scope, DialogService){

		$scope.hide = function(){
			DialogService.hide();
		};

	});

})();
