'use strict';

module.exports = [{
  type: 'confirm',
  name: 'apps',
  message: 'Will this project have any apps?',
  default: true
}, {
  type: 'input',
  name: 'app1Name',
  message: 'Name your first app.',
  default: 'App #1',
  when: function (answers) {
    return answers.apps;
  }
}, {
  type: 'confirm',
  name: 'app2',
  message: 'Need a second app?',
  default: true,
  when: function (answers) {
    return answers.apps;
  }
}, {
  type: 'input',
  name: 'app2Name',
  message: 'Name your second app.',
  default: 'App #2',
  when: function (answers) {
    return answers.app2
  }
}, {
  type: 'confirm',
  name: 'app3',
  message: 'Need one more app?',
  default: true,
  when: function (answers) {
    return answers.app2;
  }
}, {
  type: 'input',
  name: 'app3Name',
  message: 'Name your last app.',
  default: 'App #3',
  when: function (answers) {
    return answers.app3
  }
}];
