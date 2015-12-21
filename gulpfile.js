var elixir = require('laravel-elixir');
require('./tasks/angular.task.js');
require('./tasks/bower.task.js');
require('./tasks/ngHtml2Js.task.js');
require('laravel-elixir-livereload');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
	mix
		.bower()
		.angular('./angular/')
		.ngHtml2Js('./angular/**/*.html')
		.less('./angular/**/*.less', 'public/css')
		.copy('./angular/app/**/*.html', 'public/views/app/')
		.copy('./angular/directives/**/*.html', 'public/views/directives/')
		.copy('./angular/dialogs/**/*.html', 'public/views/dialogs/')
		.livereload([
			'public/js/vendor.js',
			'public/js/partials.js',
			'public/js/app.js',
			'public/css/vendor.css',
			'public/css/app.css'
		], {
			liveCSS: true
		});

	//.phpUnit();
});
