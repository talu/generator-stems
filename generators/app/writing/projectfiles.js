'use strict';

module.exports = function writingProjectfiles() {
  var config = this.config.getAll();
  this.template('editorconfig', '.editorconfig', config);
  this.template('jshintrc', '.jshintrc', config);
};
