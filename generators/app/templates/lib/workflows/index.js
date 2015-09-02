'use strict';


var di = require('di'),
  Logger = require('../common/logger'),
  Deciders = require('./deciders'),
  Activities = require('./activities');


function Workflows(logger, deciders, activities) {
  this.logger = logger;
  this.deciders = deciders;
  this.activities = activities;
}

Workflows.prototype.start = function start() {

  // Start the activities
  this.activities.start();

  // Start the deciders
  this.deciders.start();

  this.logger.log('info', 'Workflow application started');

};

Workflows.prototype.stop = function stop() {
  // Stop activity polling
  this.activities.stop();

  // Stop schedule reports decider
  this.deciders.stop();
};


// Setup dependencies
di.annotate(Workflows, new di.Inject(Logger, Deciders, Activities));


// Export our service
module.exports = Workflows;
