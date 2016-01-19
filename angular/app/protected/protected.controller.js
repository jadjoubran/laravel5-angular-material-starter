(function(){
    "use strict";

    angular.module('app.controllers').controller('ProtectedController', ProtectedController);

    function ProtectedController(API){
        var vm = this;

        API.one('sample/protected').get().then(function(data) {
          vm.loggedin = angular.fromJson(data.data);
		});
		
    }

})();
