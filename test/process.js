/* global describe, it */
// Dependencies
var chai = require('chai')
var AssertionError = chai.AssertionError

// Build a examine
var Examine = require('../lib/examine')

// Modify process._fatalException
require('../lib/wrappers/process')

describe('process._fatalException', function () {
  describe('exec with Error as first argument', function () {
    process.on('uncaughtException', function (err) {
      if (err && typeof err.next === 'function') {
        if (err.message === 'test') {
          return err.next()
        }

        return err.next(new Error('unexpected error message'))
      }
    })

    it('should throw an Error', function (next) {
      var err = new Error('test')

      err.next = next
      process._fatalException(err)
    })
  })

  describe('exec with custom AssertionError as first argument', function () {
    var examine = new Examine()

    it('should call subject and cleanup error', function (next) {
      function checkError (err) {
        if (!err.__propCheck) {
          return next(new Error('unexpected error'))
        }

        if (err.__errorEmitter) {
          return next(new Error('unexpected behaviour, .__errorEmitter should have been deleted'))
        }

        return next()
      }

      examine.subject(checkError)

      // Create custom AssertionError
      // this is a mock of the custom AssertionError
      // of Examine
      var assertionError = new AssertionError()
      assertionError.__errorEmitter = examine.__emitError

      // This is just to be sure the error
      // that checkError will recieve is this
      // one!
      assertionError.__propCheck = true

      process._fatalException(assertionError)
    })
  })
})
