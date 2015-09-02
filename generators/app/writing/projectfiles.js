'use strict';

module.exports = function writingProjectfiles() {

  // Direct copy of files
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');

  // Copy files with template rendering and conflict management. Source path to destination path
  this.template('_package.json', 'package.json');
};
