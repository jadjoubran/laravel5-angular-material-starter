(function(){
    "use strict";

    angular.module('app.directives').directive('loginForm', loginFormDefinition);

    function loginFormDefinition() {

        var directive = {
          restrict: 'EA',
          templateUrl: './views/directives/login-form/login-form.html',
          controller: 'LoginFormController',
          controllerAs: 'vm',
          scope: {},
          bindToController: true
        };

    return directive;
    }
})();
