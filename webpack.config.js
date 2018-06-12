const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin
const log = require('@ff0000-ad-tech/debug').debug('webpack.config.js')

const DM = require('@ff0000-ad-tech/wp-deploy-manager')

// prettier-ignore
const babelOptions = {
	"presets": [
		[
			"env",
			{
				"loose": true,
				"modules":false
			}
		]
	],
	"plugins": [ "transform-class-properties" ]
}

module.exports = {
	entry: path.resolve(__dirname, `./dist-entry.js`),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'ad-dates.min.js'
		// libraryTarget: 'umd'
	},
	resolve: {
		alias: DM.aliases.getTopLevel(path.resolve(__dirname, 'node_modules/@ff0000-ad-tech'))
	},
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				drop_console: true
			}
		})
	],
	module: {
		rules: [
			{
				test: request => {
					log('test()', request.includes('ad-dates'), request.endsWith('index.js'), '|', request)
					return request.includes('ad-dates') && request.endsWith('index.js')
				},
				use: [
					{
						loader: '@ff0000-ad-tech/webpack-rollup-babel-loader',
						options: {
							babelOptions: {
								presets: babelOptions.presets
							}
						}
					}
				]
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: babelOptions.plugins
						}
					}
				]
			}
		]
	}
}
