const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = function(path) {
  console.log(path);
  return {
    plugins: [new CleanWebpackPlugin(path)],
  };
};
