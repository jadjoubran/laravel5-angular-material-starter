(function(){
	"use strict";

	angular.module('app.controllers').controller('JwtAuthCtrl', function($scope, API, $localStorage){

		$scope.step = 1;
		$scope.output = null;
		$scope.$localStorage = $localStorage;

		//make sure you run `php artisan db:seed` so that this login works
		$scope.user = {
			email: 'joubran.jad@gmail.com',
			password: 'laravel_angular'
		};

		$scope.requestToken = function(){
			API.all('sample').get('protected').then(function(response){
				$scope.output = response.data.join(' ');
				$scope.outputStatus = {'color': 'green'};
			}, function(error){
				$scope.output = error.data.message;
				$scope.outputStatus = {'color': 'red'};
			});
		};

		$scope.login = function(){
			API.all('users/login').post($scope.user).then(function(response){
				$scope.output = JSON.stringify(response.data);
				$localStorage.jwt = response.data.token;
				$scope.outputStatus = {'color': 'green'};
				$scope.nextStep();
			}, function(error){
				$scope.output = 'Are you sure you have your database setup? Error: '. error.data.message;
				$scope.outputStatus = {'color': 'red'};
			});
		};

		$scope.nextStep = function(){
			$scope.step++;
		};

	});

})();
