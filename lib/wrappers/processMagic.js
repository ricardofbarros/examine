// Dependencies
var fatalExceptionFn = process._fatalException
var chai = require('chai')
var util = require('util')
var EventEmitter = require('events').EventEmitter

// Modify process method
process._fatalException = function (err) {
  if (err instanceof chai.AssertionError) {
    return globalCheckEmitter.emit('error', err)
  }

  fatalExceptionFn.apply(this, arguments)
}

// Create a global check emitter
function GlobalCheckEmitter () {}
util.inherits(GlobalCheckEmitter, EventEmitter)

var globalCheckEmitter = new GlobalCheckEmitter()

// Start listening on error
globalCheckEmitter.on('error', function (err) {
  if (typeof err.__checkEmitter === 'function') {
    return err.__checkEmitter()
  }

  throw err
})
