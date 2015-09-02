'use strict';


var di = require('di'),
//usher = require('usher'),
  Config = require('../../common/config'),
  Aws = require('../../common/aws');


function Activities(config, aws) {

  // We need to ensure AWS is properly configures
  this.aws = aws;

  // Define our activity poller
  /*this.activities =
   usher.activities('XXXXXXXXX',
   config.get('swf:domain'),
   { taskList: config.get('swf:tasklist') }
   );*/
}

Activities.prototype.start = function start() {

  // Start the activity poller
  //this.activities.start();

};

Activities.prototype.stop = function stop() {
  // Stop the activity poller
  //this.activities.stop();
};


// Setup dependencies
di.annotate(Activities, new di.Inject(Config, Aws));


// Export our service
module.exports = Activities;
