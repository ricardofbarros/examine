// Object with a diversity of properties to
// be asserted
var types = {
  string: 'hey',
  number: 10,
  fn: function coolName () {},
  error: new Error(),
  date: new Date(),
  boolean: true,
  obj: {},
  array: [],
  buffer: new Buffer(1234)
}

module.exports = types
