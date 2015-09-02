'use strict';

module.exports = function writingWorkflows() {

  if (this.answers.swf) {
    this.directory('lib/workflows', 'lib/workflows');
  }
};
