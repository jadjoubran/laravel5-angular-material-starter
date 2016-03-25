module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'jasmine'],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-messages/angular-messages.js',
            'bower_components/lodash/dist/lodash.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/ngstorage/ngStorage.js',
            'bower_components/satellizer/**/*.js',
            'bower_components/angular-loading-bar/src/loading-bar.js',
            'bower_components/restangular/src/restangular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'public/js/partials.js',
            'angular/index.main.js',
            'angular/**/*.js',
            'tests/angular/**/*test.js'

        ],
        browsers: ['PhantomJS'],

        exclude: [],

        preprocessors: {
            'angular/**/*.js': ['browserify'],
            'tests/angular/**/*test.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify', 'stringify']
        },

        plugins : [

            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-browserify',
        ]

        // define reporters, port, logLevel, browsers etc.
    });
};

