'use strict';

var
  chalk = require('chalk'),
  yosay = require('yosay'),
  kebabCase = require('lodash.kebabcase'),

  project = require('./project'),
  swf = require('./swf'),
  mongo = require('./mongo'),
  apps = require('./apps');

module.exports = function prompting() {
  var done = this.async();

  // Have Yeoman greet the user.
  this.log(yosay(
    'Welcome to the ' + chalk.cyan('STEMS micro-service') + ' generator!'
  ));

  var prompts = [].concat(
    project,
    apps,
    swf,
    mongo
  );

  this.prompt(prompts, function (answers) {

    // Generate slug from name
    answers.nameSlug = kebabCase(answers.name);

    // Generage all caps from name
    answers.nameCaps = kebabCase(answers.name).replace(/\-/g, '_').toUpperCase();

    // Mongo is required in apps
    if (answers.publicApp || answers.privateApp) {
      answers.mongo = true;
    }
    this.answers = answers;
    done();
  }.bind(this));
};
