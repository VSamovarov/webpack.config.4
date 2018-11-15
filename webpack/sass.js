const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function(env, options) {
  return {
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
                sourceMap: true,
                importLoader: 2,
                //minimize: true,
              },
            },
            //{ loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  };
};
