module.exports = {
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				use: ['babel-loader'],
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[hash].[ext]',
						outputPath: 'images',
					},
				},
			},
		],
	},
	devServer: {
		historyApiFallback: true,
	  },
	  node: {fs: 'empty'}
};
