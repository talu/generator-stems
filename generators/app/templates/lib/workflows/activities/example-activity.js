'use strict';

var di = require('di'),
    Logger = require('stems/services/logger');


/**
 * # Example Activity
 */
function ExampleActivity(logger) {

  return function execute(task) {
    var input = task.input;

    logger.log('info', 'Example activity execute with input:', input);

    task.success({ input: input });
  };

}


// Setup dependencies
di.annotate(ExampleActivity, new di.Inject(Logger));


module.exports = ExampleActivity;
