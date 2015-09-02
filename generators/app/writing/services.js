'use strict';

module.exports = function writingServices() {

  if (this.answers.swf) {
    this.directory('lib/services/workflows', 'lib/services/workflows');
  }
};
