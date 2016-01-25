'use strict';

var usher = require('usher'),
    di = require('di'),
    Config = require('stems/services/config');


/**
 * # Example Workflow
 */
var ExampleWorkflow = function ExampleWorkflow(config) {

  this.config = config.get('swf:workflows:example');

  this.workflow = usher.workflow(
      this.config.name,
      config.get('swf:domain'),
      {
        taskList: this.config.tasklist,
        defaultExecutionStartToCloseTimeout: this.config.executionStartToCloseTimeout,
        defaultTaskStartToCloseTimeout: this.config.taskStartToCloseTimeout,
        defaultChildPolicy: this.config.childPolicy,
        defaultTaskPriority: this.config.taskPriority
      }
    )
    .register(this.config.name, this.config.version);

  this.workflow
    .version('*')
      .activity('example-activity');

};


// Start polling
ExampleWorkflow.prototype.start = function () {
  this.workflow.start();
};


// Stop polling
ExampleWorkflow.prototype.stop = function () {
  this.workflow.stop();
};


ExampleWorkflow.prototype.execute = function execute(input, cb) {
  if (!this.config.enabled) {
    return cb();
  }

  this.workflow.execute(
    input,
    this.config.version,
    [ 'some-tag:' + input.name ],
    cb);
};


// Setup dependencies
di.annotate(ExampleWorkflow, new di.Inject(Config));


// Export
module.exports = ExampleWorkflow;
