const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = function() {
  return {
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessor: cssnano,
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // filename: 'css/[name].[hash].css',
        // chunkFilename: 'css/[id].[hash].css',
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s?[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                //minimize: true,
              },
            },
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: [
                  autoprefixer({
                    browsers: ['ie >= 8', 'last 4 version'],
                  }),
                  mqpacker({
                    sort: true,
                  }),
                ],
                sourceMap: false,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
              },
            },
          ],
        },
      ],
    },
  };
};
