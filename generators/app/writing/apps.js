'use strict';

module.exports = function writingApp() {

  if (this.answers.publicApp || this.answers.privateApp) {
    this.template('lib/apps/app.js', 'lib/apps/app.js');
  }

  if (this.answers.publicApp) {
    this.directory('lib/apps/public', 'lib/apps/public');
  }

  if (this.answers.privateApp) {
    this.directory('lib/apps/private', 'lib/apps/private');
  }
};
