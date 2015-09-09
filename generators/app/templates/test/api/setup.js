'use strict';

var
  di = require('di'),
  fixtures = require('../fixtures');

var Service;

before(function (done) {
  var injector = fixtures.Service.injector;

  if (!injector) {
    injector = new di.Injector([fixtures.TestLogger, fixtures.SegmentMock]);
    fixtures.Service.injector = injector;
  }

  Service = injector.get(fixtures.Service);

  // Wait for mongoose connection
  Service.start(done);
});

after(function () {
  Service.stop();
});
