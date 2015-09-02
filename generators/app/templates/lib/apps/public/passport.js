/*!
 * Talu Payment Service
 * Copyright(c) 2015 meltmedia <mike@meltmedia.com>
 */

'use strict';


var passport = require('passport');


var Passport = function() {
  return new passport.Passport();
};


// Export our service
module.exports = Passport;
