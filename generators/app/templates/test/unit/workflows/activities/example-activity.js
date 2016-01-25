'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    fixtures = require('../../../fixtures'),
    ExampleActivity = require('../../../../lib/workflows/activities/example-activity');

chai.use(require('chai-things'));

var
  injector,
  activityRunner,
  exampleActivity;

describe('Workflow - Activity - ExampleActivity', function () {

  before(function () {
    injector = fixtures.Service.injector;
    activityRunner = injector.get(fixtures.ActivityRunner);
    exampleActivity = injector.get(ExampleActivity);
  });

  beforeEach(function (done) {
    // fixtures._runtime.dataImporter.getImportedData(['Example'], function (err, data) {
      // Do something with data
      done();
    // })
  });

  it('should test activity', function (done) {

    activityRunner(exampleActivity, {}, function (err, response) {
      expect(err).to.be.null;
      expect(response).to.have.deep.property('test', 'test');
      done();
    });
  });

});
