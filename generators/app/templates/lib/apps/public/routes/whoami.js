/*!
 * Talu Payment Service
 * Copyright(c) 2015 meltmedia <mike@meltmedia.com>
 */

'use strict';


var di = require('di'),
    express = require('express'),
    Logger = require('../../../common/logger');


var WhoAmI = function WhoAmI(logger) {

  var router = express.Router();

  router.get('/', function (req, res) {

  });

  return router;

};


// Setup dependencies
di.annotate(WhoAmI, new di.Inject(Logger));


module.exports = WhoAmI;
