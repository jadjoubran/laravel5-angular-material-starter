export function ThemeConfig($mdThemingProvider) {
	'ngInject';
	/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
	$mdThemingProvider.theme('default')
		.primaryPalette('light-blue', {
            default: '600'
        })
		.accentPalette('grey')
		.warnPalette('red');

    $mdThemingProvider.theme('warn');
}
