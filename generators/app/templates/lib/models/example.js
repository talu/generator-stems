'use strict';

var di = require('di'),
    uniqueValidator = require('mongoose-unique-validator'),
    timestamps = require('mongoose-timestamp'),
    Mongoose = require('stems/services/mongoose');


var ExampleModel = function ExampleModel(mongoose) {

  // Model definition
  this.schema = new mongoose.Schema({
    name: {
      familyName: {
        type: String,
        trim: true,
        required: false
      },
      givenName: {
        type: String,
        trim: true,
        required: false
      },
      middleName: {
        trim: true,
        type: String
      }
    },
    primaryEmail: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      index: true
    }
  });

  // Install plugins
  this.schema.plugin(timestamps);
  this.schema.plugin(uniqueValidator, { message: 'Error! Expected {PATH} to be unique.' });

  // Virtual methods
  this.schema.virtual('fullName')
    .get(function () {
      if (!this.name) {
        return '';
      }
      return this.name.givenName + ((this.name.middleName) ? ' ' + this.name.middleName : ' ') + this.name.familyName;
    });

  // Manipulate what to expose to the public
  this.schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    }
  });


  // Define 'Example' model
  this.model = mongoose.model('Example', this.schema);

  // Set baucis properties for Example
  this.model.singular('example');
  this.model.plural('examples');
  this.model.lastModified('updatedAt');

};


ExampleModel.prototype.getSchema = function () {
  return this.schema;
};


ExampleModel.prototype.getModel = function () {
  return this.model;
};


// Setup dependencies
di.annotate(ExampleModel, new di.Inject(Mongoose));


module.exports = ExampleModel;
