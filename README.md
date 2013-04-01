# callback-wrappers

Function wrappers for async callbacks that implement common, simple error handling scenarios.

## Install

```bash
    npm install callback-wrappers
```

## Description

Most async methods in the node world expect a callback with an `(error, data)` signature.
In programming scenarios where complex error handling is impossible or unneccessary (for
example you can simply log the error and exit the process) this can generate a lot
of repetitive, boilerplate, error-handling code that can obscure your real logic, e.g.

```javascript
asyncFunction1({ ... }, function (error, data) {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    // some real logic here
    asyncFunction2({ ... }, function (error, data) {
      if (error) {
        console.error(error);
        process.exit(2);
      } else {
        // some more real logic here
      }
    });
  }
});
```

This module provides a bunch of wrappers that take a function with just `(data)` signature
and produce a function with the `(error, data)` signature and the boiler plate logic in place.
For example the `exitIfError` wrapper has the exact logic shown above, allowing for us to 
collapse that example down to

```javascript
var exitIfError = require("callback-wrappers").exitIfError;

asyncFunction1({ ... }, exitIfError(1, function (data) {
  // some real logic here
  asyncFunction2({ ... }, exitIfError(2, function (data) {
    // some more real logic here
  });
});
```

There's also a `nextIfError` wrapper that takes a function with a `(data, next)`
signature (where `next` is a callback of the `(error, ...)` variety).  This simply
passes `error` to `next` (and, unlike the other methods, does not log).

### Function.prototype option

If messing with built-in objects' prototypes doesn't skeeve you out, you can use
the `Function()` export to get Function.prototype decorated with all of the wrappers
and our example can look like

```javascript
require("callback-wrappers").Function();

asyncFunction1({ ... }, function (data) {
  // some real logic here
  asyncFunction2({ ... }, function (data) {
    // some more real logic here
  }.exitIfError(2));
}.exitIfError(1));
```

### long & short wrapper names

The wrappers all follow a naming convention of `actionIfError`, where
action is one of `log`, `abort`, `exit`, `throw` or `next`.  For brevity these
can be referenced by the initials `l`, `a`, `x`, `t` and `n`, followed by `ie` 
(for "If Error").  Note that in all cases the error is logged, and in no case,
including `logIfError`, will the wrapped function be called if the 
`error` parameter isn't empty.

## Change Log

- 0.2.0: using Object.defineProperty to make the Function.prototype extensions not enumerable
- 0.1.0: created

## Acknowledgements

Thanks go to the [nodejs group](https://groups.google.com/forum/?fromgroups#!forum/nodejs) for comments and suggestions.

## License

MIT
