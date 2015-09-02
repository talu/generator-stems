'use strict';


var di = require('di'),
  baucis = require('baucis'),
  Models = require('../../../models');


var BaucisRoutes = function BaucisRoutes() { // models

  // Make sure we are getting a clean instance of baucis
  baucis.empty();

  return baucis();

};


// Setup dependencies
di.annotate(BaucisRoutes, new di.Inject(Models));


// Export our service
module.exports = BaucisRoutes;
