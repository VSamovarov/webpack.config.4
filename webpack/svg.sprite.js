const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = function(path) {
  return {
    plugins: [
      new SVGSpritemapPlugin(path.source + '/svg-icons/*.svg', {
        output: { filename: '/img/images-sprite.svg' },
        styles: true,
        sprite: {
          prefix: false,
        },
      }),
    ],
  };
};
