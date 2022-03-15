const path = require('path');
module.exports = {
	mode: 'development',

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
		port: 9000,
	},
};
