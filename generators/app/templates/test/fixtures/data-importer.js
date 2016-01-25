'use strict';

var
  di = require('di'),
  utils = require('mongoose-test-utils'),
  async = require('async'),
  _ = require('lodash'),
  Logger = require('stems/services/logger'),
  Mongoose = require('stems/services/mongoose'),
  Models = require('../../lib/models');

function DataImporter(logger, mongoose, models) {
  this.logger = logger;
  this.models = models;
  this.connection = mongoose.connection;
}

DataImporter.primaryKey = '$key';
DataImporter.referenceKey = '$ref';
DataImporter.delimiter = '-_-';

// Get clean data
DataImporter.getCleanData = function (data) {
  var cleanData = {};
  _.each(data, function (arr, key) {
    cleanData[key] = _.map(arr, function (datum) {
      return _.omit(datum, [DataImporter.referenceKey, DataImporter.primaryKey]);
    });
  });
  return cleanData;
};

// Parse ref link
DataImporter.parseRefLink = function (refLink) {

  var rawLinks = _.isArray(refLink) ? refLink : [refLink];

  return _.map(rawLinks, function (link) {
    var parsedLink = link.replace(/[\[\]]/g, DataImporter.delimiter),
        splitLink = parsedLink.split(DataImporter.delimiter);
    splitLink = _.compact(splitLink);
    return {
      key: splitLink[0],
      index: parseInt(splitLink[1])
    };
  });
};

// Get ref data
DataImporter.getRefData = function (data) {
  var refData = {};
  _.each(data, function (arr, key) {
    refData[key] = _.map(arr, function (datum) {
      return datum[DataImporter.referenceKey] || {};
    });
  });
  return refData;
};

DataImporter.prototype._getDbData = function (match, model, done) {
  var self = this;
  model = _.isString(model) ? self.models[model] : model;
  try {
    model.findOne(match, done);
  } catch (e) {
    done(e);
  }
};

// Add reference links
DataImporter.prototype._addRefLinks = function (importedData, refData, done) {
  var
    self = this,
    series = [];

  // Each model
  _.each(importedData, function (importedArr, modelStr) {
    var
      refArr = refData[modelStr],
      modelSeries = [];

    // Each item of model type
    _.each(importedArr, function (importedDatum, index) {
      var
        refDatum = refArr[index],
        refKeys = _.keys(refDatum),
        refSeries;

      if (_.isEmpty(refDatum)) { return; }

      // Each reference link
      refSeries = _.map(refKeys, function (key) {
        var parsedRefLinks = DataImporter.parseRefLink(refDatum[key]);

        var targetDatum = _.map(parsedRefLinks, function (link) {
          return importedData[link.key][link.index]._id;
        });
        targetDatum = targetDatum.length > 1 ? targetDatum : targetDatum[0];

        return self._addRefLinks.getAsyncFn.call(self, { _id: importedDatum._id }, modelStr, key, targetDatum);
      });

      modelSeries = modelSeries.concat(refSeries);
    });
    series = _.compact(series.concat(_.flatten(modelSeries)));
  });
  async.series(series, done);
};
// Add reference links
DataImporter.prototype._addRefLinks.getAsyncFn = function (match, model, key, val) {
  var self = this;
  return function (next) {
    self._getDbData(match, model, function (err, target) {
      if (err) {
        return next(err);
      }

      target[key] = val;
      target.save(next);
    });
  };
};

// Import data
DataImporter.prototype._importData = function (cleanData, done) {
  utils.import(this.connection, cleanData, done);
  return this;
};

// Get imported data
DataImporter.prototype.getImportedData = function (models, done) {
  var self = this;
  models = _.map(models, function (model) {
    return _.isString(model) ? self.models[model] : model;
  });
  utils.dump(this.connection, models, done);
  return this;
};

// Reset
DataImporter.prototype.reset = function (done) {
  utils.wipe(this.connection, done);
  return this;
};

// Import
DataImporter.prototype.load = function (data, done) {
  var
    self = this,
    cleanData = DataImporter.getCleanData(data),
    refData = DataImporter.getRefData(data);

  this._importData(cleanData, function () {
    self.getImportedData(_.keys(cleanData), function (err, importedData) {

      var normalizedData = {};
      _.each(data, function (arr, key) {
        normalizedData[key] = _.map(arr, function (datum) {
          var pkName = datum[DataImporter.primaryKey],
              pk = datum[pkName];
          return _.find(importedData[key], function (item) {
            return item[pkName] === pk;
          });
        });
      });

      self._addRefLinks(normalizedData, refData, done);
    });
  });
  return this;
};



// Setup dependencies
di.annotate(DataImporter, new di.Inject(Logger, Mongoose, Models));

module.exports = DataImporter;
