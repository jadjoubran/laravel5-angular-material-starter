var gulp = require('gulp');
var concat = require('gulp-concat');

var Elixir = require('laravel-elixir');

var Task = Elixir.Task;

Elixir.extend('concatScripts', function(scripts, dest) {

    new Task('concat-scripts', function() {

    return gulp.src(scripts)
    .pipe(concat(dest))
    .pipe(gulp.dest(Elixir.config.js.outputFolder));

    }).watch(scripts);

});
