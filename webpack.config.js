module.exports = {
    // configuration
    entry: "./angular/index.main.js",
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['ng-annotate','babel?presets[]=es2015'],
            exclude: /node_modules/,
        }]
    }
};
