module.exports = {
	// configuration
	entry: "./angular/index.main.js",
	output: {
		filename: "app.js"
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel', // 'babel-loader' is also a legal name to reference
			query: {
				presets: ['es2015'],
				cacheDirectory: true
			}
		}]
	}
};
