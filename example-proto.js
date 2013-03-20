// this example shows using Function.prototype and short names

require('./index.js').Function();

function asyncFunction(opts, callback) {
  process.nextTick(function () { callback(opts.error, opts.data); });
}

asyncFunction({ data: "foo" }, function (data) {
  console.log("process should now print 'bar' and exit with status 2");
  asyncFunction({ error: "bar" }, function (data) {
    console.log("you should not see this message");
  }.xie(2));
}.xie(1));
