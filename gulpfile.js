'use strict';

const elixir = require('laravel-elixir');

require('laravel-elixir-vue');

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

 let assets = [
         'public/js/final.js',
         'public/css/final.css'
     ],
     scripts = [
         './public/js/vendor.js', './public/js/app.js'
     ],
     styles = [
         './public/css/vendor.css', './public/css/app.css'
     ],
     karmaJsDir = [
         'public/js/vendor.js',
         'node_modules/angular-mocks/angular-mocks.js',
         'node_modules/ng-describe/dist/ng-describe.js',
         'public/js/app.js',
         'tests/angular/**/*.spec.js'
     ];

elixir(mix => {
    mix.sass('app.scss')
       .webpack('./angular/index.main.js', 'app.js')
       .sass(['./angular/**/*.scss', '!./angular/critical.scss'], 'public/css')
       .sass('./angular/critical.scss', 'public/css/critical.css')
       .styles(styles, './public/css/final.css')
       .combine(scripts, 'final.js');

       //enable front-end tests by adding the below task
       // .karma({jsDir: karmaJsDir});
});
