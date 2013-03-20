var exitIfError = require('./index.js').exitIfError;

function asyncFunction(opts, callback) {
  process.nextTick(function () { callback(opts.error, opts.data); });
}

asyncFunction({ data: "foo" }, exitIfError(1, function (data) {
  console.log("process should now print 'bar' and exit with status 2");
  asyncFunction({ error: "bar" }, exitIfError(2, function (data) {
    console.log("you should not see this message");
  }));
}));
