'use strict';


var di = require('di'),
    _ = require('lodash'),
    Aws = require('stems/services/aws'),
    ExampleWorkflow = require('./example-workflow');


function Deciders(exampleWorkflow) {
  this.registry = [];

  this.register(exampleWorkflow);
}


Deciders.prototype.register = function register(workflow) {
  this.registry.push(workflow);
};


Deciders.prototype.start = function start() {

  // Start the deciders
  _.each(this.registry, function (workflow) {
    workflow.start();
  });

};


Deciders.prototype.stop = function stop() {
  _.each(this.registry, function (workflow) {
    workflow.stop();
  });
};


// Setup dependencies
di.annotate(Deciders, new di.Inject(ExampleWorkflow, Aws));


// Export our service
module.exports = Deciders;
