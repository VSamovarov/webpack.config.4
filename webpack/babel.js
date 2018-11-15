module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                sourceMap: true,
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
