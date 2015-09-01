'use strict';

module.exports = [{
  type: 'input',
  name: 'name',
  message: 'Project Name:',
  default: 'MyProject'
}, {
  type: 'input',
  name: 'description',
  message: 'Description:',
  default: 'My Project'
}, {
  type: 'input',
  name: 'version',
  message: 'Version:',
  default: '0.0.1'
}, {
  type: 'input',
  name: 'repositoryUrl',
  message: 'Repo URL:',
  default: 'http://github.com'
}, {
  type: 'input',
  name: 'authorName',
  message: 'Author:',
  default: 'John Doe'
}, {
  type: 'input',
  name: 'authorEmail',
  message: 'Author\'s Email',
  default: 'john@doe.com'
}];
