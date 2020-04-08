const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: '[name].bundle.js',
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new Dotenv({
			path: './.env',
			safe: true,
			systemvars: true,
			silent: true,
			defaults: false,
    	}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
});
