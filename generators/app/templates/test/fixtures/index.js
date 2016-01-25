'use strict';

var
  _ = require('lodash'),
  fixtures = require('stems/test/fixtures');

module.exports = _.assign({
  Service: require('../../lib'),
  DataImporter: require('./data-importer'),
  data: require('./data')
}, fixtures);
