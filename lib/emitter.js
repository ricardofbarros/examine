// Dependencies
var util = require('util')
var EventEmitter = require('events').EventEmitter

// Create a global examine emitter
function ExamineEmitter () {}

// extend with EventEmitter
util.inherits(ExamineEmitter, EventEmitter)

var examineEmitter = new ExamineEmitter()

// Start listening on error
examineEmitter.on('error', function (err) {
  if (typeof err.__errorEmitter === 'function') {
    return err.__errorEmitter(err)
  }
})

module.exports = examineEmitter
