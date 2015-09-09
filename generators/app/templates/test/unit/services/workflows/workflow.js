'use strict';

var
  di = require('di'),
  sinon = require('sinon'),
  chai = require('chai'),
  expect = chai.expect,
  fixtures = require('../../../fixtures'),
  Config = require('stems/services/config'),
  Workflow = require('../../../../lib/services/workflows/workflow');

var
  injector,
  config,
  workflow,
  workflowStartStub;

before(function () {
  injector = new di.Injector([fixtures.TestLogger]);
});

beforeEach(function () {
  config = injector.get(Config);
  config.set('swf:workflows:key', {
    'enabled': true,
    'name': 'key-workflow',
    'version': '1.0.0',
    'tasklist': 'key-workflow-tasklist',
    'executionStartToCloseTimeout': '1800',
    'taskStartToCloseTimeout': '1800',
    'childPolicy': 'TERMINATE'
  });
  workflow = injector.get(Workflow);
  workflowStartStub = sinon.stub(workflow.workflow, 'start', function (options, cb) {
    cb(null, 'testRunId');
  });
});

afterEach(function () {
  workflowStartStub.restore();
});

describe('Workflow Base', function () {

  // .execute
  describe('execution', function () {

    it('should abort without input', function (done) {
      workflow.execute(null, null, function (err, data) {
        expect(err).to.be.null;
        expect(data).to.be.null;
        expect(workflow.workflow.start.called).to.be.false;
        done();
      });
    });

    it('should start workflow', function (done) {
      workflow.execute({
        id: 'my-id'
      }, [
        'userId:my-id'
      ], function (err, data) {
        expect(err).to.be.null;
        expect(data).to.equal('testRunId');
        expect(workflow.workflow.start.called).to.be.true;
        done();
      });
    });

  });

});
