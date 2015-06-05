// Dependencies
var chai = require('chai')
var OriginalAssertionError = chai.AssertionError

function AssertionError (errorEmitter) {
  return function (message, _props, ssf) {
    var self = new OriginalAssertionError(message, _props, ssf)

    // Pass the errorEmitter method to the
    // AssertionError prototype
    self.__errorEmitter = errorEmitter

    return self
  }
}

module.exports = AssertionError
