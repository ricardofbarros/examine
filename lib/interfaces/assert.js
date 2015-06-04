// Dependencies
var chai = require('chai')
var util = chai.util
var assertModule = require('../../node_modules/chai/lib/chai/interface/assert')
var chaiWrapper = require('../wrappers/chai')

module.exports = function (errorEmitter) {
  // Wrap chai and inject errorEmitter to AssertionError
  var chaiWrapped = chaiWrapper(errorEmitter)

  // This will inject assert API into chaiWrapped
  assertModule(chaiWrapped, util)

  return chaiWrapped.assert
}
