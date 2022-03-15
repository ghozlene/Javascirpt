const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
module.exports = {
	mode: 'production',

	entry: './src/app.js',
	output: {
		filename: '[contenthash].js',
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
	plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
