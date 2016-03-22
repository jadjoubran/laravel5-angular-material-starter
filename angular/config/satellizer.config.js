export function SatellizerConfig($authProvider) {
	'ngInject';

	$authProvider.httpInterceptor = function() {
		return true;
	}

	$authProvider.loginUrl = '/auth/login';
	$authProvider.signupUrl = '/auth/signup';

}
