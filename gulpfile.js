var elixir = require('laravel-elixir');
require('laravel-elixir-angular');

process.env.DISABLE_NOTIFIER = true;

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

var bower_js = ['./bower_components/angular/angular.js',
	'./bower_components/angular-material/angular-material.js',
	'./bower_components/angular-animate/angular-animate.js',
	'./bower_components/angular-aria/angular-aria.js',
	'./bower_components/angular-ui-router/release/angular-ui-router.js',
	'./bower_components/restangular/dist/restangular.js',
	'./bower_components/lodash/lodash.js',
	'./bower_components/ngstorage/ngStorage.js',
	'./bower_components/svg-morpheus/compile/unminified/svg-morpheus.js',
	'./bower_components/angular-material-icons/angular-material-icons.js',
	'./bower_components/satellizer/satellizer.js',
	'./bower_components/angular-loading-bar/build/loading-bar.js',
];
var bower_css = ['./bower_components/angular-material/angular-material.css',
	'./bower_components/angular-material-icons/angular-material-icons.css',
	'./bower_components/angular-loading-bar/build/loading-bar.css',
];

elixir(function(mix){
	mix
		.scripts(bower_js, 'public/js/vendor.js')
		.styles(bower_css, 'public/css/vendor.css')
		.angular('./angular/', 'public/js')
		.less('./angular/**/*.less')
		.copy('./angular/app/**/*.html', 'public/views/app/')
		.copy('./angular/directives/**/*.html', 'public/views/directives/')
		.copy('./angular/dialogs/**/*.html', 'public/views/dialogs/');
});
