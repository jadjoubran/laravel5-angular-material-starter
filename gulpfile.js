var elixir = require('laravel-elixir');
require('./tasks/angular.task.js');
require('./tasks/bower.task.js');

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

elixir(function(mix){
	mix
		.bower()
		.angular('./angular/')
		.less('./angular/**/*.less', 'public/css')
		.copy('./angular/app/**/*.html', 'public/views/app/')
		.copy('./angular/directives/**/*.html', 'public/views/directives/')
		.copy('./angular/dialogs/**/*.html', 'public/views/dialogs/');
});
