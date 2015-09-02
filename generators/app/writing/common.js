'use strict';

module.exports = function writingApp() {
  this.template('lib/common/config.js', 'lib/common/config.js');
  this.template('lib/common/krypt.js', 'lib/common/krypt.js');
  this.template('lib/common/logger.js', 'lib/common/logger.js');
  this.template('lib/common/health.js', 'lib/common/health.js');
  this.directory('lib/common/middleware', 'lib/common/middleware');

  if (this.answers.mongo || this.answers.publicApp || this.answers.privateApp) {
    this.template('lib/common/mongoose.js', 'lib/common/mongoose.js');
  }

  if (this.answers.swf) {
    this.template('lib/common/aws.js', 'lib/common/aws.js');
  }
};
