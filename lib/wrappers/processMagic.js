// Dependencies
var fatalExceptionFn = process._fatalException
var chai = require('chai')
var util = require('util')
var EventEmitter = require('events').EventEmitter

// Modify process method
process._fatalException = function (err) {
  if (err instanceof chai.AssertionError && typeof err.__errorEmitter === 'function') {
    return examineEmitter.emit('error', err)
  }

  fatalExceptionFn.apply(this, arguments)
}

// Create a global examine emitter
function ExamineEmitter () {}
util.inherits(ExamineEmitter, EventEmitter)

var examineEmitter = new ExamineEmitter()

// Start listening on error
examineEmitter.on('error', function (err) {
  return err.__errorEmitter(err)
})
