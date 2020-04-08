const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();
module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: '[name].[contentHash].bundle.js',
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/',
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				BACKEND_BASE_URL: JSON.stringify(process.env.BACKEND_BASE_URL),
				CLOUDINARY_URL: JSON.stringify(process.env.CLOUDINARY_URL),
				PROFILE_UPLOADER_URL: JSON.stringify(process.env.PROFILE_UPLOADER_URL),
				DEFAULT_PROFILE_IMAGE_URL: JSON.stringify(
					process.env.DEFAULT_PROFILE_IMAGE_URL,
				),
			},
		}),
		new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
		new CleanWebpackPlugin(),
		new Dotenv({
			path: './.env',
			safe: true,
			systemvars: true,
			silent: true,
			defaults: false,
		}),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
});
