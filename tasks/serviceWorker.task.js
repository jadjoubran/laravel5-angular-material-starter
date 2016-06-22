/*Elixir Task for bower
 * Upgraded from https://github.com/ansata-biz/laravel-elixir-bower
 */
var gulp = require('gulp');
var path = require('path');
var swPrecache = require('sw-precache');

var Elixir = require('laravel-elixir');

var Task = Elixir.Task;

Elixir.extend('serviceWorker', function(jsOutputFile, jsOutputFolder, cssOutputFile, cssOutputFolder) {

    new Task('generateServiceWorker', function() {
        var rootDir = 'public';

        return swPrecache.write(path.join(rootDir, 'service-worker.js'), {
            staticFileGlobs: [
            rootDir + '/build/js/*-*.js',
            rootDir + '/build/css/*-*.css',
            rootDir + '/img/**/*.{png,jpg,gif,svg}'
            // rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'
            ],
            stripPrefix: rootDir,
            maximumFileSizeToCacheInBytes: 5242880,
            runtimeCaching: [{
              urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
              handler: 'cacheFirst'
            }, {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
              handler: 'cacheFirst'
            }]
        });
    }).watch('bower.json');

});
