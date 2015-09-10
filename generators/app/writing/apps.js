'use strict';

module.exports = function writingApp() {

  if (this.answers.publicApp) {
    this.directory('lib/apps/public', 'lib/apps/public');
  }

  if (this.answers.privateApp) {
    this.directory('lib/apps/private', 'lib/apps/private');
  }
};
