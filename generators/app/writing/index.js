'use strict';

var
  main = require('./main'),
  etc = require('./etc'),
  apps = require('./apps'),
  models = require('./models'),
  tests = require('./tests'),
  workflows = require('./workflows'),
  projectfiles = require('./projectfiles');

module.exports = {
  main: main,
  etc: etc,
  apps: apps,
  models: models,
  tests: tests,
  workflows: workflows,
  projectfiles: projectfiles
};
