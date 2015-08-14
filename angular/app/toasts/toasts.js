(function(){
	"use strict";

	angular.module('app.controllers').controller('ToastsCtrl', function($scope, ToastService){

		$scope.toastSuccess = function(){
			ToastService.show('User added successfully!');
		};

		$scope.toastError = function(){
			ToastService.error('Connection interrupted!');
		};

	});

})();
