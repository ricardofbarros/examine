// Dependencies
var util = require('util')
var EventEmitter = require('events').EventEmitter
var assertInterface = require('./interfaces/assert')
var expectInterface = require('./interfaces/expect')

// Make some magic!
require('./wrappers/processMagic')

function Examine () {
  var self = this

  Object.defineProperty(this, '__emitError', {
    value: function (err) {
      return self.emit('error', err)
    }
  })

  Object.defineProperty(this, '__callback', {
    value: throwError,
    writable: true
  })

  // inherit chai API
  this.assert = assertInterface(this.__emitError)
  this.expect = expectInterface(this.__emitError)

  this.on('error', function (err) {
    var currentCallback = self.__callback

    // Set the callback to the default
    // behaviour
    self.__callback = throwError

    // Call the current callback with the error
    // immediately after this event
    //
    // NOTE: you can't throw exceptions
    // inside EventEmitter, so we need to setup a
    // setImmediate to call the callback outside
    // the EventEmitter.on(), so if the callback
    // throws an exception it will be handled by
    // process._fatalException like it should
    setImmediate(function () {
      currentCallback(err)
      currentCallback = null
    })
  })
}

util.inherits(Examine, EventEmitter)

var throwError = function (err) {
  // We don't want a infinite loop!
  if (typeof err.__errorEmitter === 'function') {
    delete err.__errorEmitter
  }

  throw err
}

Examine.prototype.subject = function (fn) {
  if (typeof fn !== 'function') {
    throw new Error('The argument of examine.subject must be a function')
  }

  this.__callback = fn
}

module.exports = Examine
