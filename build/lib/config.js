'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appiumSupport = require('appium-support');

var _teen_process = require('teen_process');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _packageJson = require('../../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var APPIUM_VER = _packageJson2['default'].version;

function getNodeVersion() {
  // expect v<major>.<minor>.<patch>
  // we will pull out `major` and `minor`
  var version = process.version.match(/^v(\d+)\.(\d+)/);
  return [Number(version[1]), Number(version[2])];
}

function getGitRev() {
  var cwd, rev, _ref, stdout;

  return _regeneratorRuntime.async(function getGitRev$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cwd = _path2['default'].resolve(__dirname, "..", "..");
        rev = null;
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)("git", ["rev-parse", "HEAD"], { cwd: cwd }));

      case 5:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;

        rev = stdout.trim();
        context$1$0.next = 12;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](2);

      case 12:
        return context$1$0.abrupt('return', rev);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 10]]);
}

function getAppiumConfig() {
  var stat, built, config;
  return _regeneratorRuntime.async(function getAppiumConfig$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.stat(_path2['default'].resolve(__dirname, '..')));

      case 2:
        stat = context$1$0.sent;
        built = stat.mtime.getTime();
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(getGitRev());

      case 6:
        context$1$0.t0 = context$1$0.sent;
        context$1$0.t1 = built;
        context$1$0.t2 = APPIUM_VER;
        config = {
          'git-sha': context$1$0.t0,
          'built': context$1$0.t1,
          'version': context$1$0.t2
        };
        return context$1$0.abrupt('return', config);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function checkNodeOk() {
  var _getNodeVersion = getNodeVersion();

  var _getNodeVersion2 = _slicedToArray(_getNodeVersion, 2);

  var major = _getNodeVersion2[0];
  var minor = _getNodeVersion2[1];

  if (major === 0 && minor < 12) {
    var msg = 'Node version must be >= 0.12. Currently ' + major + '.' + minor;
    _logger2['default'].errorAndThrow(msg);
  }
}

function warnNodeDeprecations() {
  var _getNodeVersion3 = getNodeVersion();

  var _getNodeVersion32 = _slicedToArray(_getNodeVersion3, 2);

  var major = _getNodeVersion32[0];
  var minor = _getNodeVersion32[1];

  if (major === 0 && minor < 12) {
    _logger2['default'].warn("Appium support for versions of node < 0.12 has been " + "deprecated and will be removed in a future version. Please " + "upgrade!");
  }
}

function showConfig() {
  var config;
  return _regeneratorRuntime.async(function showConfig$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getAppiumConfig());

      case 2:
        config = context$1$0.sent;

        console.log(JSON.stringify(config));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getNonDefaultArgs(parser, args) {
  var nonDefaults = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(parser.rawArgs), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var rawArg = _step.value;

      var arg = rawArg[1].dest;
      if (args[arg] !== rawArg[1].defaultValue) {
        nonDefaults[arg] = args[arg];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return nonDefaults;
}

function getDeprecatedArgs(parser, args) {
  // go through the server command line arguments and figure
  // out which of the ones used are deprecated
  var deprecated = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(parser.rawArgs), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var rawArg = _step2.value;

      var arg = rawArg[1].dest;
      var defaultValue = rawArg[1].defaultValue;
      var isDeprecated = !!rawArg[1].deprecatedFor;
      if (args[arg] !== defaultValue && isDeprecated) {
        deprecated[rawArg[0]] = rawArg[1].deprecatedFor;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return deprecated;
}

function checkValidPort(port, portName) {
  if (port > 0 && port < 65536) return true;
  _logger2['default'].error('Port \'' + portName + '\' must be greater than 0 and less than 65536. Currently ' + port);
  return false;
}

function validateServerArgs(parser, args) {
  // arguments that cannot both be set
  var exclusives = [['noReset', 'fullReset'], ['ipa', 'safari'], ['app', 'safari'], ['forceIphone', 'forceIpad'], ['deviceName', 'defaultDevice']];

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(exclusives), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var exSet = _step3.value;

      var numFoundInArgs = 0;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = _getIterator(exSet), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var opt = _step5.value;

          if (_lodash2['default'].has(args, opt) && args[opt]) {
            numFoundInArgs++;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5['return']) {
            _iterator5['return']();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      if (numFoundInArgs > 1) {
        throw new Error('You can\'t pass in more than one argument from the ' + ('set ' + JSON.stringify(exSet) + ', since they are ') + 'mutually exclusive');
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var validations = {
    port: checkValidPort,
    callbackPort: checkValidPort,
    bootstrapPort: checkValidPort,
    selendroidPort: checkValidPort,
    chromedriverPort: checkValidPort,
    robotPort: checkValidPort,
    backendRetries: function backendRetries(r) {
      return r >= 0;
    }
  };

  var nonDefaultArgs = getNonDefaultArgs(parser, args);

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(_lodash2['default'].toPairs(validations)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = _slicedToArray(_step4.value, 2);

      var arg = _step4$value[0];
      var validator = _step4$value[1];

      if (_lodash2['default'].has(nonDefaultArgs, arg)) {
        if (!validator(args[arg], arg)) {
          throw new Error('Invalid argument for param ' + arg + ': ' + args[arg]);
        }
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4['return']) {
        _iterator4['return']();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}

function validateTmpDir(tmpDir) {
  return _regeneratorRuntime.async(function validateTmpDir$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _appiumSupport.mkdirp)(tmpDir));

      case 3:
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.t0 = context$1$0['catch'](0);
        throw new Error('We could not ensure that the temp dir you specified ' + ('(' + tmpDir + ') exists. Please make sure it\'s writeable.'));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 5]]);
}

exports.getAppiumConfig = getAppiumConfig;
exports.validateServerArgs = validateServerArgs;
exports.checkNodeOk = checkNodeOk;
exports.showConfig = showConfig;
exports.warnNodeDeprecations = warnNodeDeprecations;
exports.validateTmpDir = validateTmpDir;
exports.getNonDefaultArgs = getNonDefaultArgs;
exports.getDeprecatedArgs = getDeprecatedArgs;
exports.getGitRev = getGitRev;
exports.checkValidPort = checkValidPort;
exports.APPIUM_VER = APPIUM_VER;
//# sourceMappingURL=data:application/json;base64,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QUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDOUIsZ0JBQU0sSUFBSSxLQUFLLGlDQUErQixHQUFHLFVBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFHLENBQUM7U0FDcEU7T0FDRjtLQUNGOzs7Ozs7Ozs7Ozs7Ozs7Q0FDRjs7QUFFRCxTQUFlLGNBQWMsQ0FBRSxNQUFNOzs7Ozs7eUNBRTNCLDJCQUFPLE1BQU0sQ0FBQzs7Ozs7Ozs7O2NBRWQsSUFBSSxLQUFLLENBQUMsZ0VBQ0ksTUFBTSxpREFBNEMsQ0FBQzs7Ozs7OztDQUUxRTs7UUFFUSxlQUFlLEdBQWYsZUFBZTtRQUFFLGtCQUFrQixHQUFsQixrQkFBa0I7UUFBRSxXQUFXLEdBQVgsV0FBVztRQUFFLFVBQVUsR0FBVixVQUFVO1FBQzVELG9CQUFvQixHQUFwQixvQkFBb0I7UUFBRSxjQUFjLEdBQWQsY0FBYztRQUFFLGlCQUFpQixHQUFqQixpQkFBaUI7UUFDdkQsaUJBQWlCLEdBQWpCLGlCQUFpQjtRQUFFLFNBQVMsR0FBVCxTQUFTO1FBQUUsY0FBYyxHQUFkLGNBQWM7UUFBRSxVQUFVLEdBQVYsVUFBVSIsImZpbGUiOiJsaWIvY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgbWtkaXJwLCBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgcGtnT2JqIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5cblxuY29uc3QgQVBQSVVNX1ZFUiA9IHBrZ09iai52ZXJzaW9uO1xuXG5mdW5jdGlvbiBnZXROb2RlVmVyc2lvbiAoKSB7XG4gIC8vIGV4cGVjdCB2PG1ham9yPi48bWlub3I+LjxwYXRjaD5cbiAgLy8gd2Ugd2lsbCBwdWxsIG91dCBgbWFqb3JgIGFuZCBgbWlub3JgXG4gIGxldCB2ZXJzaW9uID0gcHJvY2Vzcy52ZXJzaW9uLm1hdGNoKC9edihcXGQrKVxcLihcXGQrKS8pO1xuICByZXR1cm4gW051bWJlcih2ZXJzaW9uWzFdKSwgTnVtYmVyKHZlcnNpb25bMl0pXTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0R2l0UmV2ICgpIHtcbiAgbGV0IGN3ZCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi5cIiwgXCIuLlwiKTtcbiAgbGV0IHJldiA9IG51bGw7XG4gIHRyeSB7XG4gICAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyhcImdpdFwiLCBbXCJyZXYtcGFyc2VcIiwgXCJIRUFEXCJdLCB7Y3dkfSk7XG4gICAgcmV2ID0gc3Rkb3V0LnRyaW0oKTtcbiAgfSBjYXRjaCAoaWduKSB7fVxuICByZXR1cm4gcmV2O1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBcHBpdW1Db25maWcgKCkge1xuICBsZXQgc3RhdCA9IGF3YWl0IGZzLnN0YXQocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJykpO1xuICBsZXQgYnVpbHQgPSBzdGF0Lm10aW1lLmdldFRpbWUoKTtcbiAgbGV0IGNvbmZpZyA9IHtcbiAgICAnZ2l0LXNoYSc6IGF3YWl0IGdldEdpdFJldigpLFxuICAgICdidWlsdCc6IGJ1aWx0LFxuICAgICd2ZXJzaW9uJzogQVBQSVVNX1ZFUixcbiAgfTtcbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuZnVuY3Rpb24gY2hlY2tOb2RlT2sgKCkge1xuICBsZXQgW21ham9yLCBtaW5vcl0gPSBnZXROb2RlVmVyc2lvbigpO1xuICBpZiAobWFqb3IgPT09IDAgJiYgbWlub3IgPCAxMikge1xuICAgIGxldCBtc2cgPSBgTm9kZSB2ZXJzaW9uIG11c3QgYmUgPj0gMC4xMi4gQ3VycmVudGx5ICR7bWFqb3J9LiR7bWlub3J9YDtcbiAgICBsb2dnZXIuZXJyb3JBbmRUaHJvdyhtc2cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdhcm5Ob2RlRGVwcmVjYXRpb25zICgpIHtcbiAgbGV0IFttYWpvciwgbWlub3JdID0gZ2V0Tm9kZVZlcnNpb24oKTtcbiAgaWYgKG1ham9yID09PSAwICYmIG1pbm9yIDwgMTIpIHtcbiAgICBsb2dnZXIud2FybihcIkFwcGl1bSBzdXBwb3J0IGZvciB2ZXJzaW9ucyBvZiBub2RlIDwgMC4xMiBoYXMgYmVlbiBcIiArXG4gICAgICAgICAgICAgICAgXCJkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvbi4gUGxlYXNlIFwiICtcbiAgICAgICAgICAgICAgICBcInVwZ3JhZGUhXCIpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dDb25maWcgKCkge1xuICBsZXQgY29uZmlnID0gYXdhaXQgZ2V0QXBwaXVtQ29uZmlnKCk7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNvbmZpZykpO1xufVxuXG5mdW5jdGlvbiBnZXROb25EZWZhdWx0QXJncyAocGFyc2VyLCBhcmdzKSB7XG4gIGxldCBub25EZWZhdWx0cyA9IHt9O1xuICBmb3IgKGxldCByYXdBcmcgb2YgcGFyc2VyLnJhd0FyZ3MpIHtcbiAgICBsZXQgYXJnID0gcmF3QXJnWzFdLmRlc3Q7XG4gICAgaWYgKGFyZ3NbYXJnXSAhPT0gcmF3QXJnWzFdLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgbm9uRGVmYXVsdHNbYXJnXSA9IGFyZ3NbYXJnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vbkRlZmF1bHRzO1xufVxuXG5mdW5jdGlvbiBnZXREZXByZWNhdGVkQXJncyAocGFyc2VyLCBhcmdzKSB7XG4gIC8vIGdvIHRocm91Z2ggdGhlIHNlcnZlciBjb21tYW5kIGxpbmUgYXJndW1lbnRzIGFuZCBmaWd1cmVcbiAgLy8gb3V0IHdoaWNoIG9mIHRoZSBvbmVzIHVzZWQgYXJlIGRlcHJlY2F0ZWRcbiAgbGV0IGRlcHJlY2F0ZWQgPSB7fTtcbiAgZm9yIChsZXQgcmF3QXJnIG9mIHBhcnNlci5yYXdBcmdzKSB7XG4gICAgbGV0IGFyZyA9IHJhd0FyZ1sxXS5kZXN0O1xuICAgIGxldCBkZWZhdWx0VmFsdWUgPSByYXdBcmdbMV0uZGVmYXVsdFZhbHVlO1xuICAgIGxldCBpc0RlcHJlY2F0ZWQgPSAhIXJhd0FyZ1sxXS5kZXByZWNhdGVkRm9yO1xuICAgIGlmIChhcmdzW2FyZ10gIT09IGRlZmF1bHRWYWx1ZSAmJiBpc0RlcHJlY2F0ZWQpIHtcbiAgICAgIGRlcHJlY2F0ZWRbcmF3QXJnWzBdXSA9IHJhd0FyZ1sxXS5kZXByZWNhdGVkRm9yO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn1cblxuZnVuY3Rpb24gY2hlY2tWYWxpZFBvcnQgKHBvcnQsIHBvcnROYW1lKSB7XG4gIGlmIChwb3J0ID4gMCAmJiBwb3J0IDwgNjU1MzYpIHJldHVybiB0cnVlO1xuICBsb2dnZXIuZXJyb3IoYFBvcnQgJyR7cG9ydE5hbWV9JyBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwIGFuZCBsZXNzIHRoYW4gNjU1MzYuIEN1cnJlbnRseSAke3BvcnR9YCk7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVTZXJ2ZXJBcmdzIChwYXJzZXIsIGFyZ3MpIHtcbiAgLy8gYXJndW1lbnRzIHRoYXQgY2Fubm90IGJvdGggYmUgc2V0XG4gIGxldCBleGNsdXNpdmVzID0gW1xuICAgIFsnbm9SZXNldCcsICdmdWxsUmVzZXQnXSxcbiAgICBbJ2lwYScsICdzYWZhcmknXSxcbiAgICBbJ2FwcCcsICdzYWZhcmknXSxcbiAgICBbJ2ZvcmNlSXBob25lJywgJ2ZvcmNlSXBhZCddLFxuICAgIFsnZGV2aWNlTmFtZScsICdkZWZhdWx0RGV2aWNlJ11cbiAgXTtcblxuICBmb3IgKGxldCBleFNldCBvZiBleGNsdXNpdmVzKSB7XG4gICAgbGV0IG51bUZvdW5kSW5BcmdzID0gMDtcbiAgICBmb3IgKGxldCBvcHQgb2YgZXhTZXQpIHtcbiAgICAgIGlmIChfLmhhcyhhcmdzLCBvcHQpICYmIGFyZ3Nbb3B0XSkge1xuICAgICAgICBudW1Gb3VuZEluQXJncysrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobnVtRm91bmRJbkFyZ3MgPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFlvdSBjYW4ndCBwYXNzIGluIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQgZnJvbSB0aGUgYCArXG4gICAgICAgICAgICAgICAgICAgICAgYHNldCAke0pTT04uc3RyaW5naWZ5KGV4U2V0KX0sIHNpbmNlIHRoZXkgYXJlIGAgK1xuICAgICAgICAgICAgICAgICAgICAgIGBtdXR1YWxseSBleGNsdXNpdmVgKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCB2YWxpZGF0aW9ucyA9IHtcbiAgICBwb3J0OiBjaGVja1ZhbGlkUG9ydCxcbiAgICBjYWxsYmFja1BvcnQ6IGNoZWNrVmFsaWRQb3J0LFxuICAgIGJvb3RzdHJhcFBvcnQ6IGNoZWNrVmFsaWRQb3J0LFxuICAgIHNlbGVuZHJvaWRQb3J0OiBjaGVja1ZhbGlkUG9ydCxcbiAgICBjaHJvbWVkcml2ZXJQb3J0OiBjaGVja1ZhbGlkUG9ydCxcbiAgICByb2JvdFBvcnQ6IGNoZWNrVmFsaWRQb3J0LFxuICAgIGJhY2tlbmRSZXRyaWVzOiAocikgPT4geyByZXR1cm4gciA+PSAwOyB9XG4gIH07XG5cbiAgY29uc3Qgbm9uRGVmYXVsdEFyZ3MgPSBnZXROb25EZWZhdWx0QXJncyhwYXJzZXIsIGFyZ3MpO1xuXG4gIGZvciAobGV0IFthcmcsIHZhbGlkYXRvcl0gb2YgXy50b1BhaXJzKHZhbGlkYXRpb25zKSkge1xuICAgIGlmIChfLmhhcyhub25EZWZhdWx0QXJncywgYXJnKSkge1xuICAgICAgaWYgKCF2YWxpZGF0b3IoYXJnc1thcmddLCBhcmcpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhcmd1bWVudCBmb3IgcGFyYW0gJHthcmd9OiAke2FyZ3NbYXJnXX1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVUbXBEaXIgKHRtcERpcikge1xuICB0cnkge1xuICAgIGF3YWl0IG1rZGlycCh0bXBEaXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBXZSBjb3VsZCBub3QgZW5zdXJlIHRoYXQgdGhlIHRlbXAgZGlyIHlvdSBzcGVjaWZpZWQgYCArXG4gICAgICAgICAgICAgICAgICAgIGAoJHt0bXBEaXJ9KSBleGlzdHMuIFBsZWFzZSBtYWtlIHN1cmUgaXQncyB3cml0ZWFibGUuYCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgZ2V0QXBwaXVtQ29uZmlnLCB2YWxpZGF0ZVNlcnZlckFyZ3MsIGNoZWNrTm9kZU9rLCBzaG93Q29uZmlnLFxuICAgICAgICAgd2Fybk5vZGVEZXByZWNhdGlvbnMsIHZhbGlkYXRlVG1wRGlyLCBnZXROb25EZWZhdWx0QXJncyxcbiAgICAgICAgIGdldERlcHJlY2F0ZWRBcmdzLCBnZXRHaXRSZXYsIGNoZWNrVmFsaWRQb3J0LCBBUFBJVU1fVkVSIH07XG4iXX0=