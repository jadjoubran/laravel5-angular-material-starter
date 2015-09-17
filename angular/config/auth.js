(function (){
    "use strict";

    angular.module('app.config').config(function ($authProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = '/api/authenticate/auth';
    });

})();
