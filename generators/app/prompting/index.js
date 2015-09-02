'use strict';

var
  chalk = require('chalk'),
  yosay = require('yosay'),

  project = require('./project'),
  swf = require('./swf'),
  mongo = require('./mongo'),
  apps = require('./apps');

module.exports = function prompting() {
  var done = this.async();

  // Have Yeoman greet the user.
  this.log(yosay(
    'Welcome to the ' + chalk.red('Node Micro-Service') + ' generator!'
  ));

  var prompts = [].concat(
    project,
    apps,
    swf,
    mongo
  );

  this.prompt(prompts, function (answers) {
    if (answers.publicApp || answers.privateApp) {
      answers.mongo = true;
    }
    this.answers = answers;
    done();
  }.bind(this));
};
