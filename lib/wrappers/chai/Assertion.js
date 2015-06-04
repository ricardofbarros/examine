var AssertionError = require('./AssertionError')
var util = chai.util
var config = chai.config
var flag = util.flag

function Assertion (errorEmitter) {
  this.__errorEmitter = errorEmitter
}


/**
* When throwing the error inject checkup listener function
*
* NOTE: This method must accompany the changes on chai
*
* @version chai@2.3.0
*/
Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
  var ok = util.test(this, arguments)
  if (showDiff !== true) showDiff = false
  if (config.showDiff !== true) showDiff = false

  if (!ok) {
    msg = util.getMessage(this, arguments)
    var actual = util.getActual(this, arguments)

    throw new AssertionError(this.__errorEmitter, msg, {
      actual: actual,
      expected: expected,
      showDiff: showDiff
    }, (config.includeStack) ? this.assert : flag(this, 'ssfi'))
  }
}

module.exports = Assertion
