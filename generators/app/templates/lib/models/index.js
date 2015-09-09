'use strict';


var di = require('di'),
  Mongoose = require('stems/services/mongoose');


var Models = function Models(/*mongoose*/) {};


// Setup dependencies
di.annotate(Models, new di.Inject(Mongoose));


// Export our service
module.exports = Models;
