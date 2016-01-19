(function(){
    "use strict";

    angular.module('app.controllers').controller('LoginFormController', LoginFormController);

    function LoginFormController($log, $auth, $state, ToastService){
        var vm = this;

	    vm.authenticate = function(provider) {
	      $auth.authenticate(provider);
	    };

		vm.login = function() {
			var user = {
			  email: vm.email,
			  password: vm.password
			};

			$log.info('Logging in...');

			$auth.login(user)
			  .then(function(response) { // What to do after a successful logged in
				ToastService.show('Login successful');
				$state.go('app.loggedin');
			  })
			  .catch(function(response) { // Handle errors here
				$log.info('Error Response: '+angular.toJson(response.data));
				ToastService.error(response.data.errors);
			  });
		};
    }

})();
