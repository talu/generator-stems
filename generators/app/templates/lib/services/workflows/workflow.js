'use strict';

var
  di = require('di'),
  _ = require('lodash'),
  AWS = require('aws-sdk'),
  swf = require('aws-swf'),
  Logger = require('stems/services/logger'),
  Config = require('stems/services/config');

/**
 * Base class to easily config workflows on top of
 *
 * @class WorkflowBase
 * @param {Object} config Global config; Looks in `config.swf.workflows[this.key]` for workflow specific configs
 * @param {Object} logger Logging util
 * @constructor
 */
function WorkflowBase(config, logger) {
  this.config = config.get('swf');
  this.logger = logger;

  // Set workflow settings
  this.description = this.description || 'This';
  this.key = this.key || 'key';
  this.workflow = null;

  var
    workflowConfig = _.get(this.config, 'workflows.' + this.key),
    swfWorkflowConfig;

  // If we have workflow config and it's enabled
  if (workflowConfig && workflowConfig.enabled) {

    // Compile final SWF workflow config
    swfWorkflowConfig = {
      domain: this.config.domain,
      workflowType: {
        name: workflowConfig.name,
        version: workflowConfig.version
      },
      taskList: { name: workflowConfig.tasklist },
      executionStartToCloseTimeout: workflowConfig.executionStartToCloseTimeout,
      taskStartToCloseTimeout: workflowConfig.taskStartToCloseTimeout,
      childPolicy: workflowConfig.childPolicy
    };

    this.logger.log('debug', 'Configuring ' + this.description + ' workflow using: %j', swfWorkflowConfig);

    // Generage SWF workflow
    this.workflow = new swf.Workflow(swfWorkflowConfig, new AWS.SimpleWorkflow());
  }
}

/**
 * Generic workflow execution method
 *
 * @method execute
 * @param {*} input Any desired input for workflow execution
 * @param {Array} tagList List of tags describing workflow execution details (Array of Strings)
 * @param {Function} done Callback
 * @returns {*}
 */
WorkflowBase.prototype.execute = function (input, tagList, done) {
  done = done || function () {};
  tagList = tagList || [];

  // Abort if SWF workflow doesn't exist
  if (!this.workflow) {
    this.logger.log('debug', this.description + ' workflow is not configured or disabled, skipping execution');
    return done(null, null);
  }

  // Abort if no input exists
  if (!input) {
    this.logger.log('warn', 'Input is required to execute the ' + this.description + ' workflow, skipping.');
    return done(null, null);
  }

  var
    self = this,
    options = {
      input: JSON.stringify(input),
      tagList: tagList
    };


  // Start workflow
  this.workflow.start(options, function (err, runId) {
    if (err) {
      self.logger.log('error', 'Cannot start ' + self.description + ' workflow: ', err);
      return done(err);
    }
    self.logger.log('debug', self.description + ' workflow started with id: %s', runId);
    done(null, runId);
  });
};

// Load dependencies
di.annotate(WorkflowBase, new di.Inject(Config, Logger));

module.exports = WorkflowBase;
