var path = require('path');
var swPrecache = require('sw-precache');

var Elixir = require('laravel-elixir');

var preCacheConfig = require('./../precache-config.json');

var Task = Elixir.Task;

Elixir.extend('swPrecache', function() {

    new Task('generateServiceWorker', function() {

        return swPrecache.write(path.join('public', 'service-worker.js'), preCacheConfig);

    }).watch('public/build/rev-manifest.json');

});
