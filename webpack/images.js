module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|gif|png|svg)$/i,
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            publicPath: '../',
          },
        },
      ],
    },
  };
};
