// Dependencies
var chai = require('chai')
var expect = chai.expect
var Assertion = require('../wrappers/Assertion')

 /**
 * Constructor for expect API
 *
 * NOTE: This constructor must accompany the changes on chai
 *
 * @param {Function} errorEmitter
 * @version chai@2.3.0
 */
function Expect (errorEmitter) {
  return function (val, message) {
    return new Assertion(errorEmitter, val, message)
  }
}

// Make expect methods into prototype methods
for (var method in expect) {
  if (expect.hasOwnProperty(method)) {
    Expect.prototype[method] = expect[method]
  }
}

module.exports = Expect
