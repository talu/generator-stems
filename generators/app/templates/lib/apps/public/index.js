'use strict';

var di = require('di'),
  util = require('util'),
  App = require('stems/apps/app'),
  Config = require('stems/services/config'),
  Logger = require('stems/services/logger'),
  Healthcheck = require('stems/middleware/healthcheck'),
  Datadog = require('stems/services/datadog'),
  Passport = require('./passport'),
  PublicRoutes = require('./routes');


function PublicApp(config, logger, passport, routes, healthcheck, datadog) {

  // Get our specific config
  this.config = config.get('publicApp');

  // Invoke our parent constructor
  PublicApp.super_.apply(this, arguments);

  // Wire in datadog statsd logging
  this.app.use(datadog.middleware());

  // Healthcheck
  this.app.use('/healthcheck', healthcheck);

  // Register our specific routes
  this.app.use(routes);
}


// Extend from App
util.inherits(PublicApp, App);


// Setup dependencies
di.annotate(PublicApp, new di.Inject(Config, Logger, Passport, PublicRoutes, Healthcheck, Datadog));


// Export our service
module.exports = PublicApp;
