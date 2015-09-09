'use strict';

var
  _ = require('lodash'),
  fixtures = require('stems/test/fixtures');

module.exports = _.assign({
  Service: require('../../lib'),
  data: require('./data')
}, fixtures);
