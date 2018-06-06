const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const IndexPlugin = require('@ff0000-ad-tech/wp-plugin-index')
const log = require('@ff0000-ad-tech/debug').debug('webpack.config.js')

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
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'ad-dates.umd.js',
		library: 'adDates',
		libraryTarget: 'umd'
	},
	resolve: {
		alias: {
			'ad-utils': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-utils')
		}
	},
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				drop_console: false
			}
		}),
		new IndexPlugin(null, {
			source: {
				path: `./tmpl/ad-dates.js`
			},
			inject: {
				'ad-dates': './dist/ad-dates.umd.js'
			},
			output: {
				path: `./dist/ad-dates.inline.js`
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
			// {
			// 	test: request => {
			// 		log('test2()', request.includes('ad-dates'), request.endsWith('index.js'), '|', request)
			// 		return request.includes('ad-dates') && request.endsWith('index.js')
			// 	},
			// 	use: 'exports-loader?TzDate,RecurringSchedule,DateSchedule,spanish,DateFormatter,DateManager,DateUtils,Timezone'
			// },
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
