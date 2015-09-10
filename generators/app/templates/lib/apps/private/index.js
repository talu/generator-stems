'use strict';

var di = require('di'),
  util = require('util'),
  App = require('stems/apps/app'),
  Config = require('stems/services/config'),
  Logger = require('stems/services/logger'),
  Healthcheck = require('stems/middleware/healthcheck'),
  Passport = require('./passport'),
  PrivateRoutes = require('./routes'),
  Segment = require('stems/services/segment');


function PrivateApp(config, logger, passport, routes, healthcheck) {

  // Get our specific config
  this.config = config.get('privateApp');

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
di.annotate(PrivateApp, new di.Inject(Config, Logger, Passport, PrivateRoutes, Healthcheck, Segment));


// Export our service
module.exports = PrivateApp;
