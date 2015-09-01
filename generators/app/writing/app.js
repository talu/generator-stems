'use strict';

module.exports = function writingApp() {
  this.template('_package.json', 'package.json', this.config.getAll());
};
