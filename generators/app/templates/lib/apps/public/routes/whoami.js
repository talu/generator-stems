'use strict';


var di = require('di'),
    express = require('express'),
    Logger = require('stems/services/logger');


var WhoAmI = function WhoAmI(/*logger*/) {

  var router = express.Router();

  router.get('/', function (/*req, res*/) {

  });

  return router;

};


// Setup dependencies
di.annotate(WhoAmI, new di.Inject(Logger));


module.exports = WhoAmI;
