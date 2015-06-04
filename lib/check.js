// Dependencies
var util = require('util')
var EventEmitter = require('events').EventEmitter
var chai = require('chai')
var Assert = require('./interfaces')
var Expect = require('./interfaces')

function Check () {
  var self = this

  Object.defineProperty(this, '__emitError', {
    value: function () {
      return self.emit('error')
    }
  })

  // inherit chai API
  this.assert = new Assert()
  this.expect = new Expect()

  this.once('error', function (err) {
    return self.callback(err)
  })
}

util.inherits(Check, EventEmitter)

Check.prototype.callback = function (err) {
  throw err
}

Check.prototype.use = function (fn) {
  if (typeof fn !== 'function') {
    throw new Error('The argument of check.use must be a function')
  }

  this.callback = fn
}

process.on('uncaughtException', function (err) {
  var listeners = process.listeners('uncaughtException')

  if (listeners.length === 1 && !(err instanceof chai.AssertionError)) {
    throw err
  }

  if (typeof err.__checkEmitter === 'function') {
    return err.__checkEmitter()
  }
})
