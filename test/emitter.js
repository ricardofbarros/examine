/* global describe, it */
var examineEmitter = require('../lib/emitter')

describe('examineEmitter', function () {
  it('should proceed without causing any mess', function () {
    var err = new Error()
    examineEmitter.emit('error', err)
  })
})
