(function(){
    "use strict";

    angular.module('app.directives').directive('loginForm', loginFormDefinition);

    function loginFormDefinition() {

      var directive = {
        restrict: 'E',
        templateUrl: './views/directives/login-form/login-form.html',
        controller: 'LoginFormController',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
      };

      return directive;
    }
})();
