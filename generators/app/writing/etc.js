'use strict';

module.exports = function writingEtc() {

  // Copy directories with template rendering and conflict management. Source path to destination path
  this.directory('etc', 'etc');
};
