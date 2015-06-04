// Dependencies
var chai = require('chai')
var OriginalAssertionError = chai.AssertionError

function AssertionError (errorEmitter, message, _props, ssf) {
  var self = new OriginalAssertionError(message, _props, ssf)

  // Pass the errorEmitter method to the
  // AssertionError prototype
  self.__checkEmitter = errorEmitter

  return self
}

module.exports = AssertionError
