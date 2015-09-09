'use strict';

var
  di = require('di'),
  request = require('request'),
  chai = require('chai'),
  expect = chai.expect,
  fixtures = require('../../fixtures');

var
  injector,
  service,
  port,
  host,
  basePath;

before(function () {
  injector = fixtures.Service.injector;
  service = injector.get(fixtures.Service);
  port = service.privateApp.config.port;
  host = 'http://127.0.0.1:' + port;
  basePath = host + '/healthcheck';
});

describe('Private - GET /healthcheck', function () {

  it('should verify the private app\'s health', function (done) {

    var requestObj = {
      url: basePath,
      json: true
    };
    request.get(requestObj, function (err, res) {
      expect(res).to.have.property('statusCode', 200);
      done();
    });
  });

});
