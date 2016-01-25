'use strict';

module.exports = [{
  type: 'confirm',
  name: 'mongo',
  message: 'Will this project use MongoDB?',
  default: true,
  when: function (answers) {
    return !answers.publicApp && !answers.privateApp;
  }
}];
