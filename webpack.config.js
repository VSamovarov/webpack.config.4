const devMode = process.env.NODE_ENV !== 'production';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const images = require('./webpack/images');
const babel = require('./webpack/babel');
const babelUglify = require('./webpack/babel.uglify');
const devserver = require('./webpack/devserver');
const favicon = require('./webpack/favicon');
const extractCSS = require('./webpack/css.extract');
const sass = require('./webpack/sass');
const fonts = require('./webpack/fonts');
const svgsprite = require('./webpack/svg.sprite');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  source: path.join(__dirname, 'assets'),
  build: path.join(__dirname, 'dist'),
};

const common = merge([
  {
    entry: {
      main: PATHS.source + '/index.js',
    },
    output: {
      path: PATHS.build,
      filename: 'js/[name].js',
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery/dist/jquery.min.js',
        jQuery: 'jquery/dist/jquery.min.js',
        'window.jQuery': 'jquery/dist/jquery.min.js',
        svg4everybody: 'svg4everybody/dist/svg4everybody.min.js',
      }),
      new FriendlyErrorsWebpackPlugin(),
      //Опции dry и verbose для того, чтобы не выводить и не тереть для dev режима
      new CleanWebpackPlugin(PATHS.build, { dry: !devMode, verbose: devMode }),
    ],
  },
  images(),
  fonts(),
  svgsprite(PATHS),
]);

module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    //return merge([common, favicon()]);
    common.devtool = false;
    return merge([common, extractCSS(), babelUglify()]);
  }
  if (argv.mode === 'development') {
    common.devtool = 'source-map';
    return merge([common, sass(), babel()]);
  }
};
