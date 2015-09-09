'use strict';

module.exports = function writingProjectfiles() {

  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');

  this.template('_README.md', 'README.md');
  this.template('_gulpfile.js', 'gulpfile.js');
  this.template('_package.json', 'package.json');
};
