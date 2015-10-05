'use strict';


var passport = require('passport');


var Passport = function() {
  return new passport.Passport();
};


// Export our service
module.exports = Passport;
