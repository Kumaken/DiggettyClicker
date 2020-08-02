const path = require('path');

module.exports = {
	entry: './src/Scripts/app.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jp(e*)g|svg|ogg|mp3)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[hash]-[name].[ext]'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname + '/dist'),
		// this is needed to for live reloading:
		publicPath: '/dist/'
	},
	// this enables live reloading! none else works!
	devServer: {
		watchContentBase: true
	},
	mode: 'development'
};
