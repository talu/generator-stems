'use strict';


var di = require('di'),
  Baucis = require('stems/services/baucis'),
  Models = require('../../../models');


var BaucisRoutes = function BaucisRoutes(baucis) { // models

  // Make sure we are getting a clean instance of baucis
  return baucis.newInstance();

};


// Setup dependencies
di.annotate(BaucisRoutes, new di.Inject(Baucis, Models));


// Export our service
module.exports = BaucisRoutes;
