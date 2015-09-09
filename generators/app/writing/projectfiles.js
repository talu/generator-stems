'use strict';

module.exports = function writingProjectfiles() {

  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('travis.yml', '.travis.yml');

  this.template('_Dockerfile', 'Dockerfile');
  this.template('_gulpfile.js', 'gulpfile.js');
  this.template('_newrelic.js', 'newrelic.js');
  this.template('_package.json', 'package.json');
  this.template('_README.md', 'README.md');
};
