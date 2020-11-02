'use strict';

import webpack from 'webpack';
import path from 'path';

const frontendConfig = {
	entry: path.join(__dirname, 'resources/frontend/scripts/main'),
	output: {
		path: path.resolve(__dirname, 'scripts/frontend/js'),
		filename: 'main.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	optimization: {
		minimize: true
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			jquery: 'jquery'
		})
	]
};
const backendConfig = {
	entry: path.join(__dirname, 'resources/backend/scripts/main'),
	output: {
		path: path.resolve(__dirname, 'scripts/backend/js'),
		filename: 'main.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	optimization: {
		minimize: true
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			jquery: 'jquery'
		})
	]
};
if (process.env.NODE_ENV === 'development') {
	frontendConfig.optimization.minimize = false;
	backendConfig.optimization.minimize = false;
}
export {
	backendConfig,
	frontendConfig
};