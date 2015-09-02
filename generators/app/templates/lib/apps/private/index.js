'use strict';

var di = require('di'),
  util = require('util'),
  App = require('../app'),
  Config = require('../../common/config'),
  Logger = require('../../common/logger'),
  Healthcheck = require('../../common/middleware/healthcheck'),
  Passport = require('./passport'),
  PrivateRoutes = require('./routes');


function PrivateApp(config, logger, passport, routes, healthcheck) {

  // Get our specific config
  this.config = config.get('private-app');

  // Invoke our parent constructor
  PrivateApp.super_.apply(this, arguments);

  // Healthcheck
  this.app.use('/healthcheck', healthcheck);

  // Register our specific routes
  this.app.use(routes);
}


// Extend from App
util.inherits(PrivateApp, App);


// Setup dependencies
di.annotate(PrivateApp, new di.Inject(Config, Logger, Passport, PrivateRoutes, Healthcheck));


// Export our service
module.exports = PrivateApp;
