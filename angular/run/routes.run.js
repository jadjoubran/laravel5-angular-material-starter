export function RoutesRun($state, $transitions) {
    'ngInject';

    let requiresAuthCriteria = {
        to: ($state) => $state.data && $state.data.auth
    };

    let redirectToLogin = ['$auth', '$transition$', ($auth) => {
        /*Cancel going to the authenticated state and go back to the login page*/
        if (!$auth.isAuthenticated()) {
            return $state.target('app.login', undefined, {location: false});
        }
    }];

    $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority:10});

}
