'use strict';

var di = require('di'),
  util = require('util'),
  App = require('../app'),
  Config = require('../../common/config'),
  Logger = require('../../common/logger'),
  Healthcheck = require('../../common/middleware/healthcheck'),
  Passport = require('./passport'),
  PublicRoutes = require('./routes');


function PublicApp(config, logger, passport, routes, healthcheck) {

  // Get our specific config
  this.config = config.get('public-app');

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
di.annotate(PublicApp, new di.Inject(Config, Logger, Passport, PublicRoutes, Healthcheck));


// Export our service
module.exports = PublicApp;
