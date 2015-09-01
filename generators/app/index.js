'use strict';
var
  yeoman = require('yeoman-generator'),

  prompting = require('./prompting'),
  configuring = require('./configuring'),
  writing = require('./writing'),
  install = require('./install');

module.exports = yeoman.generators.Base.extend({
  prompting: prompting,
  configuring: configuring,
  writing: writing,
  install: install
});
