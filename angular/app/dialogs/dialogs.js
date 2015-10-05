(function(){
	"use strict";

	angular.module('app.controllers').controller('DialogsCtrl', function($scope, DialogService){
		$scope.alertDialog = function(){
			DialogService.alert('This is an alert title', 'You can specify some description text in here.');
		};

		$scope.confirmDialog = function(){
			DialogService.confirm('This is a confirm title', 'Are you sure you want to do this?').then(
				function (){
					console.log ('Success');
				},
				function (){
					console.error('Fail');
				}
			).finally(function(){
				console.log('Finally');
			});
		};

		$scope.customDialog = function(){
			DialogService.fromTemplate('add_users', $scope);
		};
	});

})();
