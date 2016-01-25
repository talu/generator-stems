'use strict';


var di = require('di'),
    usher = require('usher'),
    Config = require('stems/services/config'),
    Aws = require('stems/services/aws'),
    Metrics = require('stems/services/metrics'),
    ExampleActivity = require('./example-activity');


function Activities(config, aws, metrics, exampleActivity) {

  // We need to ensure AWS is properly configured
  this.aws = aws;

  // Track usher activities via statsd
  metrics.usher();

  this.config = config.get('swf:activities');

  // Define our activity poller
  this.activities =
    usher.activities('activities',
      config.get('swf:domain'),
      {
        taskList: this.config.tasklist,
        defaultTaskPriority: this.config.taskPriority,
        defaultTaskScheduleToCloseTimeout: this.config.taskScheduleToCloseTimeout,
        defaultTaskScheduleToStartTimeout: this.config.taskScheduleToStartTimeout,
        defaultTaskStartToCloseTimeout: this.config.taskStartToCloseTimeout
      }
    );

  // Register activities
  this.activities

    .register('example-activity', '1.0.0')
    .activity('example-activity', '*', exampleActivity);

}

Activities.prototype.start = function start() {

  // Start the activity poller
  this.activities.start();

};

Activities.prototype.stop = function stop() {
  // Stop the activity poller
  this.activities.stop();
};


// Setup dependencies
di.annotate(Activities, new di.Inject(Config, Aws, Metrics, ExampleActivity));


// Export our service
module.exports = Activities;
