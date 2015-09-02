'use strict';

var di = require('di'),
    express = require('express'),
    BaucisRoutes = require('./baucis');


var PrivateRoutes = function PrivateRoutes(baucisRoutes) {

  var router = express.Router();

  router.use('/', baucisRoutes);

  return router;

};


// Setup dependencies
di.annotate(PrivateRoutes, new di.Inject(BaucisRoutes));


// Export our service
module.exports = PrivateRoutes;
