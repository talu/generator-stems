'use strict';

var
  di = require('di'),
  fixtures = require('../fixtures');

var Service, dataImporter;

before(function (done) {
  var injector = fixtures.Service.injector;

  if (!injector) {
    injector = new di.Injector([fixtures.TestLogger, fixtures.SegmentMock]);
    fixtures.Service.injector = injector;
  }

  Service = fixtures._runtime = injector.get(fixtures.Service);
  dataImporter = fixtures._runtime.dataImporter = injector.get(fixtures.DataImporter);

  // Wait for mongoose connection
  Service.start(done);
});

beforeEach(function (done) {
  dataImporter.reset(done);
});

beforeEach(function (done) {
  dataImporter.load(fixtures.data, done);
});

after(function () {
  Service.stop();
});
