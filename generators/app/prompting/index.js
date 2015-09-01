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
    swf,
    mongo,
    apps
  );

  this.prompt(prompts, function (props) {
    this.config.set(props);
    // To access props later use this.props.someOption;
    done();
  }.bind(this));
};
