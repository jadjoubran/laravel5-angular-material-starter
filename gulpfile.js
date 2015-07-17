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
 elixir.config.registerWatcher("default", "angular/**");

 elixir(function(mix) {
 	mix
 	//.bower() //uncomment it when you add a new bower component (it's commented now because it messes up the other watchers)
 	.angular('angular/')
 	.less('../../../angular/**/*.less')
 	.copy('angular/app/**/*.html', 'public/views/app/')
 	.copy('angular/directives/**/*.html', 'public/views/directives/');
 	// .imagemin();

 });
