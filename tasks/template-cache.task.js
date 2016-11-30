var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var htmlMin = require('gulp-htmlmin');

var Elixir = require('laravel-elixir');

var Task = Elixir.Task;

Elixir.extend('templateCache', function (from, to, fileName, options) {
    options = options || {
            module: 'app',
            root: './views/app'
        };
    fileName = fileName || 'views.js';

    new Task('templateCache', function () {
        return gulp.src(from)
            .pipe(htmlMin({
                collapseWhitespace: true,
                maxLineLength: 120,
                removeComments: true
            }))
            .pipe(templateCache(fileName, options))
            .pipe(gulp.dest(to));
    }).watch(from);
});
