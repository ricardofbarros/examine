/* global describe, it */
// Dependencies
var chai = require('chai')
var expect = chai.expect
var AssertionError = chai.AssertionError

// Build a examine
var Examine = require('../index')

describe('examine constructor', function () {

  describe('examine.__emitError(err)', function () {
    var examine = new Examine()

    it('should be a function', function () {
      expect(examine.__emitError).to.be.a('function')
    })

    it('should call the subject with the error', function (next) {
      function nextHandler (err) {
        expect(err).to.be.an.instanceof(Error)
        expect(err.message).to.be.equal('test')

        return next()
      }

      examine.subject(nextHandler)

      examine.__emitError(new Error('test'))

      setTimeout(function () {
        return next(new Error('didnt call subject'))
      }, 500)
    })
  })

  describe('examine.__callback (default)', function () {
    var examine = new Examine()

    it('should throw an error', function (next) {
      var err = new Error('test')

      try {
        examine.__callback(err)
      } catch (e) {
        if (e.message === 'test') {
          return next()
        }

        return next(new Error('error message wasn\'t passed properly'))
      }

      return next(new Error('didn\'t thrown an error'))
    })

    it('should delete err.__errorEmitter to avoid infinite loop', function (next) {
      var err = new Error()

      // Extend error
      err.__errorEmitter = function () {}
      err.checkProp = true

      try {
        examine.__callback(err)
      } catch(e) {
        if (e.__errorEmitter) {
          return next(new Error('didn\'t delete err.__errorEmitter, infinite loop is possible'))
        }

        if (!e.checkProp) {
          return next(new Error('unexpected error thrown'))
        }

        return next()
      }

      return next(new Error('didn\'t thrown an error'))
    })
  })

  describe('examine.subject', function () {
    var examine = new Examine()

    function errorHandler () {}

    it('should have a function named errorHandler', function () {
      examine.subject(errorHandler)

      expect(examine.__callback).to.be.a('function')
      expect(examine.__callback.name).to.equal('errorHandler')
    })

    describe('try to pass an argument that is not a function', function () {
      var test = 'hello'

      it('should throw an error', function (next) {
        try {
          examine.subject(test)
        } catch(err) {
          if (err instanceof Error && err.message.length > 1) {
            return next()
          }

          return next(new Error('unexpected throw'))
        }

        return next(new Error('didn\'t thrown an error'))
      })
    })
  })

  describe('examine.emit(\'error\', err)', function () {
    var examine = new Examine()

    it('should emit an error and subject handler called', function (next) {
      function nextHandler () {
        return next()
      }

      examine.subject(nextHandler)

      var err = new Error()

      examine.emit('error', err)

      setTimeout(function () {
        return next(new Error('didnt call subject'))
      }, 500)
    })
  })
})
