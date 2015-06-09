/* global describe, it */
// Dependencies
var chai = require('chai')
var expect = chai.expect

// Build a examine
var Examine = require('../index')

// errorHandler that is going to
// be put to subject
function errorHandler () {}

describe('examine constructor', function () {
  var examine = new Examine()

  describe('examine.__emitError', function () {
    it('should be a function', function () {
      expect(examine.__emitError).to.be.a('function')
    })
  })

  describe('examine.subject', function () {
    examine.subject(errorHandler)

    it('should have a function named errorHandler', function () {
      expect(examine.__callback).to.be.a('function')
      expect(examine.__callback.name).to.equal('errorHandler')
    })
  })
})
