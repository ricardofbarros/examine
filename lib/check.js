// Dependencies
var util = require('util')
var EventEmitter = require('events').EventEmitter
var assertInterface = require('./interfaces/assert')
var expectInterface = require('./interfaces/expect')

// Make some magic!
require('./wrappers/processMagic')

function Check () {
  var self = this

  Object.defineProperty(this, '__emitError', {
    value: function (err) {
      return self.emit('error', err)
    }
  })

  // inherit chai API
  this.assert = assertInterface(this.__emitError)
  this.expect = expectInterface(this.__emitError)

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

module.exports = Check
