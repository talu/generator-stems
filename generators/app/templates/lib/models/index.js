'use strict';


var di = require('di'),
    Mongoose = require('stems/services/mongoose'),
    ExampleModel = require('./example');


var Models = function Models(mongoose, exampleModel) {

  // Define 'ExampleModel' model
  this.ExampleModel = exampleModel.getModel();

};


// Setup dependencies
di.annotate(Models, new di.Inject(Mongoose, ExampleModel));


// Export our service
module.exports = Models;
