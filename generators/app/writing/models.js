'use strict';

module.exports = function writingModels() {

  if (this.answers.mongo || this.answers.publicApp || this.answers.privateApp) {
    this.directory('lib/models', 'lib/models');
  }
};
