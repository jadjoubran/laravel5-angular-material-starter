(function(){
    "use strict";

    angular.module('app.directives').directive('registerForm', registerFormDefinition);

    function registerFormDefinition() {

      var directive = {
        restrict: 'E',
        templateUrl: './views/directives/register-form/register-form.html',
        controller: 'RegisterFormController',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
      };

      return directive;
    }
})();
