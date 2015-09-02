'use strict';


var di = require('di'),
  Aws = require('../../common/aws');


function Deciders(aws) {
  // We need to ensure AWS is properly configures
  this.aws = aws;
}

Deciders.prototype.start = function start() {
};

Deciders.prototype.stop = function stop() {
};


// Setup dependencies
di.annotate(Deciders, new di.Inject(Aws));


// Export our service
module.exports = Deciders;
