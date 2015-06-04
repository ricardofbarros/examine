// Dependencies
var chai = require('chai')
var util = chai.util
var expectModule = require('../../node_modules/chai/lib/chai/interface/expect')
var chaiWrapper = require('../wrappers/chai')

module.exports = function (errorEmitter) {
  // Wrap chai and inject errorEmitter to
  // Assertion and AssertionError
  var chaiWrapped = chaiWrapper(errorEmitter)

  // This will inject expect API into
  // chaiWrapped
  expectModule(chaiWrapped, util)

  return chaiWrapped.expect
}
