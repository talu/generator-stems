'use strict';

var
  di = require('di');

function Workflows() {
}

// Load dependencies
di.annotate(Workflows, new di.Inject());

module.exports = Workflows;
