'use strict';

module.exports = [{
  type: 'confirm',
  name: 'mongo',
  message: 'Will this project MongoDB?',
  default: true,
  when: function (answers) {
    return !answers.publicApp && !answers.privateApp;
  }
}];
