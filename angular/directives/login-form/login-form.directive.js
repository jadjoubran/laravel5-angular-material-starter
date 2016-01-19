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
			  .then(function(response) {
			    // What to do after a successful logged in
				ToastService.show('Login successful');
				$state.go('app.loggedin');
			  })
			  .catch(function(response) {
			    // Handle errors here, such as displaying a notification
			    // for invalid email and/or password.
				ToastService.error(response.data.errors);
			  });
		};
    }

})();
