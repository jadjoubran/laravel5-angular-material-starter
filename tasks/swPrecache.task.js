var path = require('path');
var swPrecache = require('sw-precache');

var Elixir = require('laravel-elixir');

var Task = Elixir.Task;

Elixir.extend('swPrecache', function() {

    new Task('generateServiceWorker', function() {

        /*
          always read the latest config. Allows changing
          precache-config.json without reloading gulp
        */
        delete require.cache[require.resolve('./../precache-config.json')]
        var preCacheConfig = require('./../precache-config.json');

        return swPrecache.write(path.join('public', 'service-worker.js'), preCacheConfig);

    }).watch('public/build/rev-manifest.json');

});
