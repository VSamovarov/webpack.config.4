const devMode = process.env.NODE_ENV !== 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = function() {
  return {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: devMode,
          uglifyOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                sourceMap: devMode,
                presets: ['@babel/preset-env'],
                plugins: [],
              },
            },
          ],
        },
      ],
    },
  };
};
