/* global describe, it */

// Dependencies
var Examine = require('../index')
var async = require('async')
var chai = require('chai')
var AssertionError = chai.AssertionError

// Build a examine
var examine = new Examine()
var expect = examine.expect

// Helper to test throws
function testThrow (msgFlag, fn, cb) {
  if (typeof msgFlag === 'function') {
    cb = fn
    fn = msgFlag
    msgFlag = true
  }

  try {
    fn()
  } catch(err) {
    if (!(err instanceof AssertionError)) {
      return cb(new Error('error is not from AssertionError, could be syntax error'))
    }

    if (msgFlag) {
      if (!(/prefix testing/.test(err.message))) {
        return cb(new Error('error message wasn\'t passed properly'))
      }
    }

    return cb()
  }

  return cb(new Error('didn\'t thrown an error'))
}

function testChain (apiChain) {
  if (typeof apiChain === 'undefined') {
    throw new Error('Invalid expect chain')
  }
}

describe('examine.expect # full API test', function () {
  describe('expect chains', function () {
    // Expect chains:
    var chains = [
      'to',
      'be',
      'been',
      'is',
      'that',
      'which',
      'and',
      'has',
      'have',
      'with',
      'at',
      'of',
      'same'
    ]

    var s = 'hey'

    // Generate tests for all chains
    // lazy way ftw!
    chains.forEach(function (describeChain) {
      describe('expect.' + describeChain, function () {
        it('should not true an error', function () {
          chains.forEach(function (chain) {
            testChain(expect(s)[describeChain][chain])
          })
        })
      })
    })
  })

  describe('expect.not', function () {
    var foo = 'foo'
    var bar = 'bar'
    var goodFn = function () { return 'happy!' }
    var badFn = function () { throw new Error('bad function!') }
    var obj = { foo: 'baz' }

    it('should assert successfuly', function () {
      expect(foo).to.not.equal('bar')
      expect(goodFn).to.not.throw(Error)
      expect(obj).to.have.property('foo')
        .and.not.equal('bar')
    })

    it('should throw an error', function (next) {
      // Tests that should fail
      var tests = {
        '1': function () {
          expect(bar, 'prefix testing').to.not.equal('bar')
        },
        '2': function () {
          expect(badFn, 'prefix testing').to.not.throw(Error)
        },
        '3': function () {
          expect(obj, 'prefix testing').to.have.property('foo')
            .and.not.equal('baz')
        }
      }

      // Run failing tests
      return async.waterfall([
        testThrow.bind(null, tests['1']),
        testThrow.bind(null, tests['2']),
        testThrow.bind(null, tests['3'])
      ], next)
    })
  })

  describe('expect.deep', function () {
    var barObj = { bar: 'baz' }
    var fooObj = { foo: 'foz' }
    var veryDeepObj = {
      foo: {
        bar: {
          baz: 'quux'
        }
      }
    }

    it('should assert successfuly', function () {
      expect(barObj).to.deep.equal({ bar: 'baz' })
      expect(veryDeepObj).to.have.deep.property('foo.bar.baz', 'quux')
    })

    it('should throw an error', function (next) {
      // Tests that should fail
      var tests = {
        '1': function () {
          expect(fooObj, 'prefix testing').to.deep.equal({ bar: 'baz' })
        },
        '2': function () {
          expect(veryDeepObj, 'prefix testing').to.have.deep.property('foo.bar.baz', 'nop')
        },
        '3': function () {
          expect(veryDeepObj, 'prefix testing').to.have.deep.property('foo.bar.nop', 'quux')
        }
      }

      // Run failing tests
      return async.waterfall([
        testThrow.bind(null, tests['1']),
        testThrow.bind(null, tests['2']),
        testThrow.bind(null, tests['3'])
      ], next)
    })
  })
})
