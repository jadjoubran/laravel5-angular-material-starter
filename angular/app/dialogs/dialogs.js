(function(){
	"use strict";

	angular.module('app.controllers').controller('DialogsCtrl', function($scope, DialogService){
		$scope.alertDialog = function(){
			DialogService.alert('This is an alert title', 'You can specify some description text in here.');
		};

		$scope.customDialog = function(){
			DialogService.fromTemplate('add_users', $scope);
		};
	});

})();
