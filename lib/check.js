// Dependencies
var util = require('util')
var EventEmitter = require('events').EventEmitter
var Assert = require('./interfaces')
var Expect = require('./interfaces')

// Make some magic!
require('./wrappers/processMagic')

function Check () {
  var self = this

  Object.defineProperty(this, '__emitError', {
    value: function () {
      return self.emit('error')
    }
  })

  // inherit chai API
  this.assert = new Assert(this.__emitError)
  this.expect = new Expect(this.__emitError)

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
