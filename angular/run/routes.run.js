export function RoutesRun($state, $transitions, $auth) {
    'ngInject';

    let requiresAuthCriteria = {
        to: ($state) => $state.data && $state.data.auth
    };

    let redirectToLogin = ($auth) => {
        'ngInject';
        if (!$auth.isAuthenticated()) {
            return $state.target('app.login', undefined, {location: false});
        }
    };

    $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority:10});

}
