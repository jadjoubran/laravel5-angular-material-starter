export function SatellizerConfig($authProvider) {
	'ngInject';

	$authProvider.httpInterceptor = function() {
		return true;
	}

	$authProvider.loginUrl = '/api/auth/login';
	$authProvider.signupUrl = '/api/auth/register';

}
