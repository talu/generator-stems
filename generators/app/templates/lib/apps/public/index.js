'use strict';

var di = require('di'),
  util = require('util'),
  App = require('stems/apps/app'),
  Config = require('stems/services/config'),
  Logger = require('stems/services/logger'),
  Healthcheck = require('stems/middleware/healthcheck'),
  Passport = require('./passport'),
  PublicRoutes = require('./routes'),
  Segment = require('stems/services/segment');


function PublicApp(config, logger, passport, routes, healthcheck) {

  // Get our specific config
  this.config = config.get('publicApp');

  // Invoke our parent constructor
  PublicApp.super_.apply(this, arguments);

  // Healthcheck
  this.app.use('/healthcheck', healthcheck);

  // Register our specific routes
  this.app.use(routes);
}


// Extend from App
util.inherits(PublicApp, App);


// Setup dependencies
di.annotate(PublicApp, new di.Inject(Config, Logger, Passport, PublicRoutes, Healthcheck, Segment));


// Export our service
module.exports = PublicApp;
