# examine
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Coverage Status](https://coveralls.io/repos/ricardofbarros/examine/badge.svg)](https://coveralls.io/r/ricardofbarros/examine)

examine is a utility module that provides a powerful yet simple API to assert code in production.
Using an [assertion framework](https://github.com/chaijs/chai) wrapped inside this package you will be able
to use the assertion framework APIs without the fear of uncaught exceptions.

Errors thrown by the `assert` and `expect` APIs are caught and handled by the callback you bind to examine.

Imagine a big invisible and smart `try-catch` block wrapped around your app that only catches specific errors. That's what this is.


## Quick Example

```js
var examine = new Examine()
var assert = examine.assert

function errorHandler (err) {
  console.log('Caught it!', err)
}

examine.subject(errorHandler)

var string = 'Hello :)'

assert.typeOf(string, 'boolean')

console.log('This wont be executed')
```

## API

### examine.subject(handler)
Bind a handler to the `examine` instance.
The handler will be called when an error is thrown from the `.expect` or `.assert` APIs and it can
be switched during the execution order.

### examine.assert and examine.expect
The assert and the expect APIs belong to the assertion library **chai.js**. They have a very good [documentation](http://chaijs.com/api/) if you don't know how to use these APIs.

## Known Pitfalls

### try-catch
If you use a `try-catch` block be careful to not put a examine `expect/assert` statement inside it, because it
can have behaviour that is not wanted.
If you do the error that is thrown will be caught by the `try-catch` block and the subject handler won't be called.

Take the following example:

```js
var examine = new Examine()
var assert = examine.assert

function errorHandler (err) {
  console.log('This wont be called')
}

examine.subject(errorHandler)

try {
  assert.ok(null)
} catch (e) {
  console.log('Caught it here!', e)
}

```

## Questions

### Does `throw` still work as expected if I use this package?
Of course yes, the only throws that are caught and handled are the `examine` errors, everything else that you `throw` is your responsibility to
catch it.

### Are you using process.on('uncaughtException', handle) to caught the thrown errors?
No, and you can still use it without affecting the functionality of this package.

### Is this [*black magic*](http://en.wikipedia.org/wiki/Magic_%28programming%29)?
I don't consider this to be *black magic*, just a clever hack. You can see the source of the mystery [here](https://github.com/ricardofbarros/examine/blob/master/lib/wrappers/process.js).

### Where is `should` style?
`should` is not supported because of the following reasons:
- It is considered bad practice to modify the prototype of `String`, `Object`, `Number`, `Boolean`, etc.
- It is not possible to know which subject handler should be called


## TODO
- Finish `assert` and `expect` APIs tests
- Add some examples

## License
MIT
