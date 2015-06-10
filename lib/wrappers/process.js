// Dependencies
var fatalExceptionFn = process._fatalException
var chai = require('chai')
var examineEmitter = require('../emitter')

// Modify process method
process._fatalException = function (err) {
  if (err instanceof chai.AssertionError && typeof err.__errorEmitter === 'function') {
    setImmediate(process._tickCallback)
    return examineEmitter.emit('error', err)
  }

  return fatalExceptionFn.apply(this, arguments)
}
