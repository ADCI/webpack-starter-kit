'use strict';

var util = require('util');

module.exports = {
  src: './src/img/sprite-png/**/*.{png,gif,jpg}',
  destImage: './src/img/sprite.png',
  destCSS: './src/postcss/sprite-png.css',
  padding: 2,
  algorithm: 'top-down',
  algorithmOpts: { sort: false },
  cssOpts: {
    cssClass: function (item) {
      return util.format('.ic-%s:before', item.name);
    }
  }
};
