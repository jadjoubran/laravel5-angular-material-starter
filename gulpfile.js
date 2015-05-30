process.env.DISABLE_NOTIFIER = true;
var elixir = require('laravel-elixir');

require('laravel-elixir-bower');
require('laravel-elixir-angular');
require('laravel-elixir-imagemin');

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

 elixir.config.sourcemaps = false;
 elixir.config.registerWatcher("default");

 elixir(function(mix) {
 	mix
 	.bower()
 	.angular("resources/assets/angular/", "public/js/", "app.js")
	.less('dashboard.less')
	.less('footer.less')
	.less('landing.less')
 	//.less('../../../angular/**/*.less', 'resources/.tmp/')
 	//.copy('angular/app/**/*.html', 'public/views/app/')
 	//.copy('angular/directives/**/*.html', 'public/views/directives/')
 	//.stylesIn('resources/.tmp', 'public/css/')
 	//.imagemin();

 });
