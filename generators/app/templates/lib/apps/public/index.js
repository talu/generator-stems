'use strict';

var di = require('di'),
  util = require('util'),
  App = require('stems/apps/app'),
  Config = require('stems/services/config'),
  Logger = require('stems/services/logger'),
  Healthcheck = require('stems/middleware/healthcheck'),
  Metrics = require('stems/services/metrics'),
  Passport = require('./passport'),
  PublicRoutes = require('./routes');


function PublicApp(config, logger, passport, routes, healthcheck, metrics) {

  // Save passport
  this.passport = passport;

  // Get our specific config
  this.config = config.get('publicApp');

  // Invoke our parent constructor
  PublicApp.super_.apply(this, arguments);

  // trust first proxy
  this.app.set('trust proxy', 1);

  // Initialize passport
  // Note: This must come after session cookie init
  this.app.use(this.passport.initialize());

  // Wire in datadog statsd logging
  this.app.use(metrics.expressMiddleware());

  // Healthcheck
  this.app.use('/healthcheck', healthcheck);

  // Register our specific routes
  this.app.use(routes);
}


// Extend from App
util.inherits(PublicApp, App);


// Setup dependencies
di.annotate(PublicApp, new di.Inject(Config, Logger, Passport, PublicRoutes, Healthcheck, Metrics));


// Export our service
module.exports = PublicApp;
