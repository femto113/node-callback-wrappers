var wrappers = require('./');

// call something asynchronously
function asyncFunction(opts, callback) {
  process.nextTick(function () { callback(opts.error, opts.data, opts.next); });
}

// couple simple guys to wrap
function dontCallMe(data) { console.log("you should NOT see this message"); }
function doCallMe(data, next) { console.log("you should see something good here:", data); }

asyncFunction({ error: "this should print to log" }, wrappers.logIfError(dontCallMe));
asyncFunction({ data: "good data" }, wrappers.logIfError(doCallMe));
asyncFunction({ error: "good error", next: doCallMe }, wrappers.nextIfError(dontCallMe));
asyncFunction({ data: "good data", next: dontCallMe }, wrappers.nextIfError(doCallMe));
asyncFunction({ data: "good data" }, wrappers.exitIfError(1, doCallMe));
process.nextTick(function () { asyncFunction({ error: "this should print to log, then exit" }, wrappers.exitIfError(2, dontCallMe)); });
