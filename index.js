
exports.lie = exports.logIfError = function (callback)
{
  return function (error, data) {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  };
}

exports.xie = exports.exitIfError = function (exitCode, callback)
{
  return function (error, data) {
    if (error) {
      console.error(error);
      process.exit(exitCode || 1);
    } else {
      callback(data);
    }
  };
}

exports.aie = exports.abortIfError = function (callback)
{
  return function (error, data) {
    if (error) {
      console.error(error);
      process.abort();
    } else {
      callback(data);
    }
  };
}

exports.tie = exports.throwIfError = function (callback)
{
  return function (error, data) {
    if (error) {
      throw error;
    } else {
      callback(data);
    }
  };
}

exports.Function = function () {

  ["logIfError", "lie", "abortIfError", "aie", "throwIfError"].forEach(function (method) {
    Object.defineProperty(Function.prototype, method, {
      enumerable : false,
      value: function () { return exports[method](this); }
    });
  });

  ["exitIfError", "xie"].forEach(function (method) {
    Object.defineProperty(Function.prototype, method, {
      enumerable : false,
      value: function (exitCode) { return exports[method](exitCode, this); }
    });
  });

  return exports;
}
