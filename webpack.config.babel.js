var path = require('path')
var webpack = require('webpack')

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
const isProduction = LAUNCH_COMMAND === 'build';
const buildInfoPlugin =
	new webpack.DefinePlugin({
		"build.info": {
			version: JSON.stringify(require(path.resolve(__dirname, 'package.json')).version),
			date: JSON.stringify(`${new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}`),
			environment: JSON.stringify((isProduction) ? 'PRODUCTION' : 'DEVELOPMENT'),
			name: JSON.stringify(require(path.resolve(__dirname, 'package.json')).name),
		}
	});

const consoleRainbowPlugin =
	new webpack.DefinePlugin({
		'console.rainbow': function (color, input) {
			console.log(`%c${input}`, `color:${color};`);
		}
	});

console.log('isprod', isProduction)

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'build.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this necessary.
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					},
					query: {
						// cacheDirectory: true,
						presets: ['es2015', 'stage-0']
					}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				// query: {
				// 	// cacheDirectory: true,
				// 	presets: ['es2015', 'stage-0']
				// }
			},
			// {
			// 	test: /\.svg$/,
			// 	loader: 'file-loader'
			// },
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				// loader: 'file?name=/public/fonts/[name].[ext]',
				loaders: ['url-loader']
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
			},
			{
				test: /\.styl$/,
				// loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
				loader: ['style-loader', 'css-loader', 'stylus-loader']
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'masonry': 'masonry-layout',
			'isotope': 'isotope-layout'
		}
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		// noInfo: true
		// historyApiFallback: {
		//     index: path.resolve(PATHS.views, 'index.html'),
		// },

	},
	plugins: [consoleRainbowPlugin, buildInfoPlugin],
	// performance: 'warning',
	devtool: '#eval-source-map'
}



if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
