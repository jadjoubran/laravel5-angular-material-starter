(function(){
	"use strict";

	angular.module('app.controllers').controller('DashboardCtrl', function( $scope, Restangular ){


		$scope.sample_test = function(){
			$scope.sample_data = 'Loading..';
			Restangular.all('test/sample').post().then(function( response ){
				$scope.sample_data = response.data;
			});
		};

	});

})();