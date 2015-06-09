/* global describe, it */
// Dependencies
var Examine = require('../index')
var chai = require('chai')
var AssertionError = chai.AssertionError

// Build a examine
var examine = new Examine()
var assert = examine.assert

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

describe('examine.assert # full API test', function () {

  describe('assert(exp, msg)', function () {
    // Avoid to the maximum the
    // annoying lint errors
    var str = 'foo'
    var bool = true

    it('should assert successfuly', function () {
      assert(str !== 'bar', 'foo is not bar')
      assert(Array.isArray([]), 'empty arrays are arrays')
      assert(bool == 1, '1 can be true')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert(bool === 1, 'prefix testing')
      }, next)
    })
  })

  describe('assert.ok(object, [message])', function () {
    it('should assert successfuly', function () {
      assert.ok('everything')
    })

    it('should throw an error', function (next) {
      try {
        assert.ok(null, 'prefix testing')
      } catch(err) {
        if (!(/prefix testing/.test(err.message))) {
          return next(new Error('error message wasn\'t passed properly'))
        }

        return next()
      }

      return next(new Error('didn\'t thrown an error'))
    })
  })

  describe('assert.notOk(object, [message])', function () {
    // To be asserted
    var undf

    it('should assert successfuly', function () {
      assert.notOk(false)
      assert.notOk(null)
      assert.notOk(undf)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.notOk('some string', 'prefix testing')
      }, next)
    })
  })

  describe('assert.equal(actual, expected, [message])', function () {
    it('should assert successfuly', function () {
      assert.equal(3, '3')
      assert.equal(true, 1)
      assert.equal(false, 0)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.equal({}, {}, 'prefix testing')
      }, next)
    })
  })

  describe('assert.notEqual(actual, expected, [message])', function () {
    it('should assert successfuly', function () {
      assert.notEqual({}, {})
      assert.notEqual(3, 4)
      assert.notEqual('hey', 'another string')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.notEqual(true, 1, 'prefix testing')
      }, next)
    })

  })

  describe('assert.strictEqual(actual, expected, [message])', function () {
    it('should assert successfuly', function () {
      assert.strictEqual(true, true)
      assert.strictEqual('hey', 'hey')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.strictEqual(true, 1, 'prefix testing')
      }, next)
    })
  })

  describe('assert.notStrictEqual(actual, expected, [message])', function () {
    it('should assert successfuly', function () {
      assert.notStrictEqual(3, '3')
      assert.notStrictEqual(false, 0)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.notStrictEqual(false, false, 'prefix testing')
      }, next)
    })
  })

  describe('assert.deepEqual(actual, expected, [message])', function () {
    it('should assert successfuly', function () {
      assert.deepEqual({ tea: 'green' }, { tea: 'green' })
      assert.deepEqual(['1', '2'], ['1', '2'])
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.deepEqual({ tea: 'green' }, { tea: 'jasmine' }, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isTrue(value, [message])', function () {
    it('should assert successfuly', function () {
      assert.isTrue(true)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isTrue(1, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isAbove(valueToCheck, valueToBeAbove, [message])', function () {
    it('should assert successfuly', function () {
      assert.isAbove(5, 2)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isAbove(2, 2, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isBelow(valueToCheck, valueToBeBelow, [message])', function () {
    it('should assert successfuly', function () {
      assert.isBelow(2, 5)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isBelow(5, 2, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isFalse(value, [message])', function () {
    it('should assert successfuly', function () {
      assert.isFalse(false)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isFalse(true, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isNull(value, [message])', function () {
    it('should assert successfuly', function () {
      var err = null
      assert.isNull(err)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        var err = new Error()
        assert.isNull(err, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isNotNull(value, [message])', function () {
    it('should assert successfuly', function () {
      var err = new Error()
      assert.isNotNull(err)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        var err = null
        assert.isNotNull(err, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isUndefined(value, [message])', function () {
    var err = null
    var undf

    it('should assert successfuly', function () {
      assert.isUndefined(undf)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isUndefined(err, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isFunction(value, [message])', function () {
    // To be asserted
    var obj = {}
    var fn = function () {}

    it('should assert successfuly', function () {
      assert.isFunction(fn)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isFunction(obj, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isNotFunction(value, [message])', function () {
    var fn = function () {}
    var obj = {}

    it('should assert successfuly', function () {
      assert.isNotFunction(obj)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isNotFunction(fn, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isObject(value, [message])', function () {
    var obj = {}
    var fn = function () {}

    it('should assert successfuly', function () {
      assert.isObject(obj)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isObject(fn, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isNotObject(value, [message])', function () {
    // To be asserted
    var obj = {}
    var fn = function () {}

    it('should assert successfuly', function () {
      assert.isNotObject(fn)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isNotObject(obj, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isArray(value, [message])', function () {
    // To be asserted
    var arr = []
    var obj = {}

    it('should assert successfuly', function () {
      assert.isArray(arr)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isArray(obj, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isNotArray(value, [message])', function () {
    // To be asserted
    var fn = function () {}
    var arr = []

    it('should assert successfuly', function () {
      assert.isNotArray(fn)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isNotArray(arr, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isString(value, [message])', function () {
    // To be asserted
    var str = 'test'
    var obj = {}

    it('should assert successfuly', function () {
      assert.isString(str)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isString(obj, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isNotString(value, [message])', function () {
    // To be asserted
    var str = 'test'
    var fn = function () {}

    it('should assert successfuly', function () {
      assert.isNotString(fn)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isNotString(str, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isNumber(value, [message])', function () {
    // To be asserted
    var str = 'test'
    var num = 4

    it('should assert successfuly', function () {
      assert.isNumber(num)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isNumber(str, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isNotNumber(value, [message])', function () {
    // To be asserted
    var str = 'test'
    var num = 4

    it('should assert successfuly', function () {
      assert.isNotNumber(str)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isNotNumber(num, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isBoolean(value, [message])', function () {
    // To be asserted
    var bool = true
    var num = 4

    it('should assert successfuly', function () {
      assert.isBoolean(bool)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isBoolean(num, 'prefix testing')
      }, next)
    })
  })

  describe('assert.isNotBoolean(value, [message])', function () {
    // To be asserted
    var bool = true
    var num = 4

    it('should assert successfuly', function () {
      assert.isNotBoolean(num)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.isNotBoolean(bool, 'prefix testing')
      }, next)
    })
  })

  describe('assert.typeOf(value, name, [message])', function () {
    it('should assert successfuly', function () {
      assert.typeOf({ tea: 'chai' }, 'object')
      assert.typeOf(['chai', 'jasmine'], 'array')
      assert.typeOf('tea', 'string')
      assert.typeOf(/tea/, 'regexp')
      assert.typeOf(null, 'null')
      assert.typeOf(undefined, 'undefined')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.typeOf('tea', 'number', 'prefix testing')
      }, next)
    })
  })

  describe('assert.notTypeOf(value, name, [message])', function () {
    it('should assert successfuly', function () {
      assert.notTypeOf({ tea: 'chai' }, 'array')
      assert.notTypeOf(['chai', 'jasmine'], 'object')
      assert.notTypeOf('tea', 'regexp')
      assert.notTypeOf(/tea/, 'string')
      assert.notTypeOf(null, 'number')
      assert.notTypeOf(undefined, 'null')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.notTypeOf({ tea: 'chai' }, 'object', 'prefix testing')
      }, next)
    })
  })

  describe('assert.instanceOf(object, constructor, [message])', function () {
    var Tea = function (name) { this.name = name }
    var Sup = function (name) { this.name = name }

    it('should assert successfuly', function () {
      var test = new Tea('test')

      assert.instanceOf(test, Tea)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        var test = new Sup('test')

        assert.instanceOf(test, Tea, 'prefix testing')
      }, next)
    })
  })

  describe('assert.notInstanceOf(object, constructor, [message])', function () {
    var Tea = function (name) { this.name = name }
    var Sup = function (name) { this.name = name }

    it('should assert successfuly', function () {
      var test = new Sup('test')

      assert.notInstanceOf(test, Tea)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        var test = new Tea('test')

        assert.notInstanceOf(test, Tea, 'prefix testing')
      }, next)
    })
  })

  describe('assert.include(haystack, needle, [message])', function () {
    it('should assert successfuly', function () {
      assert.include('foobar', 'bar')
      assert.include([ 1, 2, 3 ], 3)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.include([ 1, 2, 3 ], 4, 'prefix testing')
      }, next)
    })
  })

  describe('assert.notInclude(haystack, needle, [message])', function () {
    it('should assert successfuly', function () {
      assert.notInclude('foobar', 'foot')
      assert.notInclude([ 1, 2, 3 ], 4)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.notInclude([ 1, 2, 3 ], 3, 'prefix testing')
      }, next)
    })
  })

  describe('assert.match(value, regexp, [message])', function () {
    it('should assert successfuly', function () {
      assert.match('foobar', /^foo/)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.match('foobar', /^foo$/, 'prefix testing')
      }, next)
    })
  })

  describe('assert.notMatch(value, regexp, [message])', function () {
    it('should assert successfuly', function () {
      assert.notMatch('foobar', /^foo$/)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.notMatch('foobar', /^foo/, 'prefix testing')
      }, next)
    })
  })

  describe('assert.property(object, property, [message])', function () {
    it('should assert successfuly', function () {
      assert.property({ tea: { green: 'matcha' }}, 'tea')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.property({ tea: { green: 'matcha' }}, 'coffee', 'prefix testing')
      }, next)
    })
  })

  describe('assert.notProperty(object, property, [message])', function () {
    it('should assert successfuly', function () {
      assert.notProperty({ tea: { green: 'matcha' }}, 'coffee')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.notProperty({ tea: { green: 'matcha' }}, 'tea', 'prefix testing')
      }, next)
    })
  })

  describe('assert.deepProperty(object, property, [message])', function () {
    it('should assert successfuly', function () {
      assert.deepProperty({ tea: { green: 'matcha' }}, 'tea.green')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.deepProperty({ tea: { green: 'matcha' }}, 'tea.black', 'prefix testing')
      }, next)
    })
  })

  describe('assert.notDeepProperty(object, property, [message])', function () {
    it('should assert successfuly', function () {
      assert.notDeepProperty({ tea: { green: 'matcha' }}, 'tea.black')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.notDeepProperty({ tea: { green: 'matcha' }}, 'tea.green', 'prefix testing')
      }, next)
    })
  })

  describe('assert.propertyVal(object, property, value, [message])', function () {
    it('should assert successfuly', function () {
      assert.propertyVal({ tea: 'is good' }, 'tea', 'is good')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.propertyVal({ tea: 'is good' }, 'tea', 'is bad', 'prefix testing')
      }, next)
    })
  })

  describe('assert.propertyNotVal(object, property, value, [message])', function () {
    it('should assert successfuly', function () {
      assert.propertyNotVal({ tea: 'is good' }, 'tea', 'is bad')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.propertyNotVal({ tea: 'is good' }, 'tea', 'is good', 'prefix testing')
      }, next)
    })
  })

  describe('assert.deepPropertyVal(object, property, value, [message])', function () {
    it('should assert successfuly', function () {
      assert.deepPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.deepPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'nop', 'prefix testing')
      }, next)
    })
  })

  describe('assert.propertyNotVal(object, property, value, [message])', function () {
    it('should assert successfuly', function () {
      assert.deepPropertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha')
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.deepPropertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha', 'prefix testing')
      }, next)
    })
  })

  describe('assert.lengthOf(object, length, [message])', function () {
    it('should assert successfuly', function () {
      assert.lengthOf([1, 2, 3], 3)
      assert.lengthOf('foobar', 6)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.lengthOf([1, 2, 3], 4, 'prefix testing')
      }, next)
    })
  })

  describe('assert.throws(function, [constructor/string/regexp], [string/regexp], [message])', function () {
    var throwFn = function () {
      throw new Error('test error')
    }

    it('should assert successfuly', function () {
      assert.throws(throwFn, Error)
      assert.throws(throwFn, /test error/)
      assert.throws(throwFn, Error, /test error/)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.throws(throwFn, Error, /nice error/, 'prefix testing')
      }, next)
    })
  })

  describe('assert.doesNotThrow(function, [constructor/regexp], [message])', function () {
    function TestError () {}

    var throwFn = function () {
      throw new Error('test error')
    }

    it('should assert successfuly', function () {
      assert.doesNotThrow(throwFn, TestError)
      assert.doesNotThrow(throwFn, /nice error/)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.doesNotThrow(throwFn, Error, 'prefix testing')
      }, function (err) {
        if (err) {
          return next(err)
        }

        return testThrow(function () {
          assert.doesNotThrow(throwFn, /test error/, 'prefix testing')
        }, next)
      })
    })
  })

  describe('assert.operator(val1, operator, val2, [message])', function () {
    it('should assert successfuly', function () {
      assert.operator(1, '<', 2)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.operator(1, '>', 2, 'prefix testing')
      }, next)
    })
  })

  describe('assert.closeTo(actual, expected, delta, [message])', function () {
    it('should assert successfuly', function () {
      assert.closeTo(1.5, 1, 0.5)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.closeTo(1.5, 1, 0.4, 'prefix testing')
      }, next)
    })
  })

  describe('assert.sameMembers(set1, set2, [message])', function () {
    it('should assert successfuly', function () {
      assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ])
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 4 ], 'prefix testing')
      }, next)
    })
  })

  describe('assert.sameDeepMembers(set1, set2, [message])', function () {
    var objSample1 = [
      { b: 3 },
      { a: 2 },
      { c: 5 }
    ]

    var objSample2 = [
      { c: 5 },
      { b: 3 },
      { a: 2 }
    ]

    var objSample3 = [
      { c: 4 },
      { b: 3 },
      { a: 2 }
    ]

    it('should assert successfuly', function () {
      assert.sameDeepMembers(objSample1, objSample2)
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.sameDeepMembers(objSample1, objSample3, 'prefix testing')
      }, next)
    })
  })

  describe('assert.includeMembers(superset, subset, [message])', function () {
    it('should assert successfuly', function () {
      assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ])
    })

    it('should throw an error', function (next) {
      return testThrow(function () {
        assert.includeMembers([ 1, 2, 3 ], [ 2, 4 ], 'prefix testing')
      }, next)
    })
  })

  describe('assert.changes(function, object, property)', function () {
    var obj = { val: 10, greeting: 'hello' }
    var fnVal = function (val) { obj.val = 22 }
    var fnGreeting = function (val) { obj.greeting = 'bye' }

    it('should assert successfuly', function () {
      assert.changes(fnVal, obj, 'val')
      assert.changes(fnGreeting, obj, 'greeting')
    })

    it('should throw an error', function (next) {
      return testThrow(false, function () {
        assert.changes(fnVal, obj, 'greeting')
      }, next)
    })
  })
})
