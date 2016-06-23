var elixir = require('laravel-elixir');
require('./tasks/angular.task.js');
require('./tasks/bower.task.js');
require('./tasks/ngHtml2Js.task.js');
require('./tasks/swPrecache.task.js');
require('laravel-elixir-karma');

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

    var assets = [
            'public/js/final.js',
            'public/css/final.css'
        ],
        karmaJsDir = [
            'public/js/vendor.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/ng-describe/dist/ng-describe.js',
            'public/js/partials.js',
            'public/js/app.js',
            'tests/angular/**/*.spec.js'
        ];

    mix
        .bower()
        .angular('./angular/')
        .ngHtml2Js('./angular/**/*.html')
        .scripts(['./public/js/vendor.js', './public/js/partials.js', './public/js/app.js'], 'public/js/final.js')
        .less('./angular/**/*.less', 'public/css')
        .styles(['./public/css/vendor.css', './public/css/app.css'], './public/css/final.css')
        .version(assets)
        .swPrecache()
        .browserSync({
            proxy: 'localhost:8000'
        })
        .karma({
            jsDir: karmaJsDir
        });
});
