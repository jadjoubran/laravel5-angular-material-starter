(function(){
    "use strict";

    angular.module('app.controllers').controller('AddUsersCtrl', function($scope, DialogService){

        $scope.save = function(){
	        //do something useful
            DialogService.hide();
        };

        $scope.hide = function(){
        	DialogService.hide();
        };

    });

})();
