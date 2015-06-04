// Dependencies
var chai = require('chai')
var util = chai.util
var AssertionError = require('./chai/AssertionError')
var assertionModule = require('../../node_modules/chai/lib/chai/assertion')
var coreAssertionModule = require('../../node_modules/chai/lib/chai/core/assertions')

function chaiWrapper (errorEmitter) {
  var chaiMock = {
    AssertionError: AssertionError(errorEmitter)
  }

  // This will inject Assertion class into
  // chaiMock
  assertionModule(chaiMock, util)

  // This will modify Assertion class so
  // expect and assert API's may work
  coreAssertionModule(chaiMock, util)

  return chaiMock
}

module.exports = chaiWrapper
