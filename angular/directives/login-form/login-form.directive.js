(function(){
    "use strict";

    angular.module('app.controllers').controller('LoginFormController', LoginFormController);

    function LoginFormController($auth, $log, ToastService){
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
$log.info(angular.toJson(response));
			    // Redirect user here after a successful log in.
			  })
			  .catch(function(response) {
$log.error(angular.toJson(response));
			    // Handle errors here, such as displaying a notification
			    // for invalid email and/or password.
ToastService.error(angular.toJson(response));
			  });
		};
    }

})();
