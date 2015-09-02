'use strict';

var di = require('di'),
    express = require('express'),
    BaucisRoutes = require('./baucis');


var PublicRoutes = function PublicRoutes(baucisRoutes) {

  var router = express.Router();

  router.use('/', baucisRoutes);

  return router;

};


// Setup dependencies
di.annotate(PublicRoutes, new di.Inject(BaucisRoutes));


// Export our service
module.exports = PublicRoutes;
