module.exports = {
    // configuration
    entry: "./angular/index.main.js",
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['ng-annotate', 'babel'],
            exclude: /node_modules/
        }]
    }
};
