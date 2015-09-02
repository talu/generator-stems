'use strict';

var di = require('di'),
  colors = require('colors/safe'),
  <% if (answers.mongo) { %>
  Models = require('./models'),
  <% } %>
  <% if (answers.publicApp) { %>
  PublicApp = require('./apps/public'),
  <% } %>
  <% if (answers.privateApp) { %>
  PrivateApp = require('./apps/private'),
  <% } %>
  <% if (answers.swf) { %>
  Workflows = require('./workflows'),
  <% } %>
  Logger = require('./common/logger'),
  Health = require('./common/health');


/**
 * <%= answers.name %>
 */
function Main(
  <% if (answers.publicApp) { %>
  publicApp,
  <% } %>
  <% if (answers.privateApp) { %>
  privateApp,
  <% } %>
  <% if (answers.swf) { %>
  workflows,
  <% } %>
  <% if (answers.mongo) { %>
  models,
  <% } %>
  health,
  logger
) {

  <% if (answers.publicApp) { %>
  this.publicApp = publicApp;
  this.publicAppServer = null;
  <% } %>

  <% if (answers.privateApp) { %>
  this.privateApp = privateApp;
  this.privateAppServer = null;
  <% } %>

  <% if (answers.swf) { %>
  this.workflows = workflows;
  <% } %>

  <% if (answers.mongo) { %>
  // Setup mongoose models
  this.models = models;
  <% } %>

  this.logger = logger;
  this.health = health;

}

Main.prototype.commandline = false;

// Set online
Main.prototype.setOnline = function () {
  if (!this.health.online) {
    this.logger.log('info', '<%= answers.name %> is now online');

    <% if (answers.publicApp) { %>
    // Start the public API
    this.publicAppServer = this.publicApp.listen();
    <% } %>

    <% if (answers.privateApp) { %>
    // Start the private API
    this.privateAppServer = this.privateApp.listen();
    <% } %>

    <% if (answers.swf) { %>
    // Start the workflows
    this.workflows.start();
    <% } %>
  }
};

// Set offline
Main.prototype.setOffline = function () {
  if (this.health.online) {
    this.logger.log('warn', '<%= answers.name %> is going offline');

    <% if (answers.publicApp) { %>
    // Stop the public API
    this.publicAppServer.close();
    <% } %>

    <% if (answers.privateApp) { %>
    // Stop the private API
    this.privateAppServer.close();
    <% } %>

    <% if (answers.swf) { %>
    // Stop the workflows
    this.workflows.stop();
    <% } %>
  }
};

// Start
Main.prototype.start = function (done) {
  done = done instanceof Function ? done : function () {};

  var self = this;
  try {

    // Listen when we are online
    this.health.on('online', this.setOnline.bind(this));

    // Stop listening when we are offline
    this.health.on('offline', this.setOffline.bind(this));

    if (this.commandline) {

      // Shutdown handler
      process.on('SIGINT', function () {
        self.logger.log('info', 'Got SIGINT! Stopping all service, please wait...');

        // Shutdown the app
        self.stop();

        // This should be on an event from poller
        setTimeout(function () {
          process.exit();
        }, 1000);

      });
    }

    // Start the application for the first time
    this.setOnline();

  } catch (err) {
    self.logger.error('<%= answers.name %> failed due to: ' + err, err.stack);

    if (this.commandline) {
      process.exit(1);
    }
  }

  <% if (answers.mongo) { %>
  this.health.mongoose.connection.on('open', done);
  <% } %>
};

// Stop
Main.prototype.stop = function () {
  this.setOffline();
};

// Dependencies
di.annotate(Main, new di.Inject(
  <% if (answers.publicApp) { %>
  PublicApp,
  <% } %>
  <% if (answers.privateApp) { %>
  PrivateApp,
  <% } %>
  <% if (answers.swf) { %>
  Workflows,
  <% } %>
  <% if (answers.mongo) { %>
  Models,
  <% } %>
  Health,
  Logger
));

// If run from the command line, start application
if (require.main === module) {
  (function () {

    console.log(colors.cyan('**** <%= answers.name %> ****'));

    var
      injector = new di.Injector([]),
      main = injector.get(Main);

    main.commandline = true;
    main.start();

  }());
}

module.exports = Main;
