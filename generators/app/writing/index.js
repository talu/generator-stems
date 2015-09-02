'use strict';

var
  main = require('./main'),
  etc = require('./etc'),
  apps = require('./apps'),
  common = require('./common'),
  //middleware = require('./middleware'),
  models = require('./models'),
  services = require('./services'),
  workflows = require('./workflows'),
  projectfiles = require('./projectfiles');

module.exports = {
  main: main,
  etc: etc,
  apps: apps,
  common: common,
  //middleware: middleware,
  models: models,
  services: services,
  workflows: workflows,
  projectfiles: projectfiles
};
