
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

  Function.prototype.lie = Function.prototype.logIfError = function () {
    return exports.logIfError(this);
  };

  Function.prototype.xie = Function.prototype.exitIfError = function (exitCode) {
    return exports.exitIfError(exitCode, this);
  };

  Function.prototype.aie = Function.prototype.abortIfError = function () {
    return exports.abortIfError(this);
  };

  Function.prototype.tie = Function.prototype.throwIfError = function () {
    return exports.throwIfError(this);
  };

  return exports;
}
