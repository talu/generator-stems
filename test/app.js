'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('stems:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        publicApp: true,
        privateApp: true,
        swf: true
      })
      .on('end', done);
  });

  it('creates apps files', function () {
    assert.file([
      'lib/apps/public/index.js',
      'lib/apps/private/index.js'
    ]);
  });

  it('creates etc files', function () {
    assert.file([
      'etc/defaults.json'
    ]);
  });

  it('creates main files', function () {
    assert.file([
      'lib/index.js'
    ]);
  });

  it('creates models files', function () {
    assert.file([
      'lib/models/index.js'
    ]);
  });

  it('creates project files', function () {
    assert.file([
      'Dockerfile',
      'newrelic.js',
      'README.md',
      'gulpfile.js',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      '.travis.yml'
    ]);
  });

  it('creates services files', function () {
    assert.file([
      'lib/services/workflows/index.js'
    ]);
  });

  it('creates tests files', function () {
    assert.file([
      'test/fixtures/index.js',
      'test/api/setup.js',
      'test/api/public/healthcheck.js',
    ]);
  });

  it('creates workflows files', function () {
    assert.file([
      'lib/workflows/index.js',
      'lib/workflows/activities/index.js',
      'lib/workflows/deciders/index.js'
    ]);
  });
});
