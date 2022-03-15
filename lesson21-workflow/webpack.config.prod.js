const path = require('path');
module.exports = {
	mode: 'production',

	entry: './src/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'scripts'),
		publicPath: 'scripts/',
	},
	devServer: {
		static: {
			directory: path.join(__dirname, './'),
		},
		compress: true,
		port: 9000,
	},
	devtool: 'nosources-source-map',
};
