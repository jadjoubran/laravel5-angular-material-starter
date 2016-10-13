module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'jasmine'],
        files: [
            'public/js/vendor.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/ng-describe/dist/ng-describe.js',
            'public/js/app.js',
            'tests/angular/**/*.spec.js'
        ],
        browsers: ['PhantomJS'],

        exclude: [],

        preprocessors: {
            'tests/angular/**/*.spec.js': ['browserify']
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

