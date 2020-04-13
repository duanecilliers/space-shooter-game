const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')
const pkg = require('../package.json')

module.exports = (env, options) => {
  console.log('options', options)
  return {
    context: __dirname,
    entry: {
      app: `${paths.src}/index.ts`
      // vendors: Object.keys(pkg.dependencies)
    },
    output: {
      filename: '[name].js',
      paths: paths.dist,
      publicPath: '/'
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        phaser: path.resolve(__dirname, '/node_modules/phaser/dist/phaser.js'),
        assets: path.resolve(__dirname, '../src/assets'),
        components: path.resolve(__dirname, '../src/components'),
        configs: path.resolve(__dirname, '../src/configs'),
        core: path.resolve(__dirname, '../src/core'),
        entities: path.resolve(__dirname, '../src/entities'),
        scenes: path.resolve(__dirname, '../src/scenes'),
        utils: path.resolve(__dirname, '../src/utils'),
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /phaser\.js$/,
          loader: 'expose-loader?Phaser'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|mp3|ogg)$/i,
          use: 'file-loader'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        CANVAS_RENDERER: JSON.stringify(true),
        WEBGL_RENDERER: JSON.stringify(true),
        PRODUCTION: JSON.stringify(true),
      }),
      new HtmlWebpackPlugin({
        title: 'My Phaser 3 Boilerplate',
        hash: true,
        meta: [
          // { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
          { viewport: 'user-scalable=0, initial-scale=1,minimum-scale=1, maximum-scale=1, width=device-width, minimal-ui=1' }
        ],
        inject: false,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  }
}
