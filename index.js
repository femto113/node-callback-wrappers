
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
  if (typeof(callback) === "undefined") {
    callback = exitCode;
    exitCode = undefined;
  }
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

/* for the (error, data, next) style, calls next with error as first argument */
exports.nie = exports.nextIfError = function (callback)
{
  return function (error, data, next) {
    if (error) {
      next(error);
    } else {
      callback(data, next);
    }
  };
}

exports.Function = function () {

  ["logIfError", "lie", "abortIfError", "aie", "throwIfError", "nextIfError", "nie"].forEach(function (method) {
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
