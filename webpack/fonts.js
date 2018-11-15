module.exports = function() {
  return {
    module: {
      rules: [
        {
          //test: /\.(jpg|jpeg|gif|png|svg)$/,
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          exclude: /images/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name][hash].[ext]',
            publicPath: '../',
          },
        },
      ],
    },
  };
};
