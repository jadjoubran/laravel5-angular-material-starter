(function(){
    "use strict";

    angular.module('app.controllers').controller('LoginFormController', LoginFormController);

    function LoginFormController(){
        var vm = this;

	    vm.authenticate = function(provider) {
	      $authProvider.authenticate(provider);
	    };
	    
		var user = {
		  email: $scope.email,
		  password: $scope.password
		};

		vm.login = function() {
console.log('Logging in...');
			$auth.login(user)
			  .then(function(response) {
			    // Redirect user here after a successful log in.
			  })
			  .catch(function(response) {
			    // Handle errors here, such as displaying a notification
			    // for invalid email and/or password.
			  });
		};
    }

})();
