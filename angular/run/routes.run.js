export function RoutesRun($rootScope, $state, $auth) {
    'ngInject';


    let deregisterationCallback =  $rootScope.$on("$stateChangeStart", function(event, toState) {

        if (toState.data && toState.data.auth) {
            /*Cancel going to the authenticated state and go back to the login page*/
            if (!$auth.isAuthenticated()) {
                event.preventDefault();
                return $state.go('app.login');
            }
        }

    });
    $rootScope.$on('$destroy', deregisterationCallback)
}
