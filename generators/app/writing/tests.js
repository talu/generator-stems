'use strict';

module.exports = function writingApp() {

  this.directory('test/fixtures', 'test/fixtures');
  this.directory('test/integration', 'test/integration');

  if (this.answers.publicApp || this.answers.privateApp) {
    this.template('test/api/setup.js', 'test/api/setup.js');
  }

  if (this.answers.publicApp) {
    this.directory('test/api/public', 'test/api/public');
  }

  if (this.answers.privateApp) {
    this.directory('test/api/private', 'test/api/private');
  }

  if (this.answers.swf) {
    this.directory('test/unit/services/workflows', 'test/unit/services/workflows');
  }
};
