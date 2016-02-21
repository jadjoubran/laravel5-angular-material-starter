export function ThemeConfig($mdThemingProvider) {
	'ngInject';
	/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('grey')
		.warnPalette('red');
}
