// Object with a diversity of properties to
// be asserted
var types = {
  string: 'hey',
  number: 10,
  fn: function coolName () {},
  boolean: true,
  obj: {},
  array: [],
  nulz: null,
  undf: undefined,
  regexp: /regexp/,

  // Types of common objects
  buffer: new Buffer(1234),
  error: new Error(),
  date: new Date()
}

module.exports = types
