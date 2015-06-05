// Object with a diversity of properties to
// be asserted
var types = {
  string: 'hey',
  number: 10,
  fn: function () {},
  error: new Error(),
  date: new Date(),
  boolean: true,
  obj: {},
  array: []
}

module.exports = types
