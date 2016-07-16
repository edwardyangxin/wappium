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
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQzlCLGdCQUFNLElBQUksS0FBSyxpQ0FBK0IsR0FBRyxVQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBRyxDQUFDO1NBQ3BFO09BQ0Y7S0FDRjs7Ozs7Ozs7Ozs7Ozs7O0NBQ0Y7O0FBRUQsU0FBZSxjQUFjLENBQUUsTUFBTTs7Ozs7O3lDQUUzQiwyQkFBTyxNQUFNLENBQUM7Ozs7Ozs7OztjQUVkLElBQUksS0FBSyxDQUFDLGdFQUNJLE1BQU0saURBQTRDLENBQUM7Ozs7Ozs7Q0FFMUU7O1FBRVEsZUFBZSxHQUFmLGVBQWU7UUFBRSxrQkFBa0IsR0FBbEIsa0JBQWtCO1FBQUUsV0FBVyxHQUFYLFdBQVc7UUFBRSxVQUFVLEdBQVYsVUFBVTtRQUM1RCxvQkFBb0IsR0FBcEIsb0JBQW9CO1FBQUUsY0FBYyxHQUFkLGNBQWM7UUFBRSxpQkFBaUIsR0FBakIsaUJBQWlCO1FBQ3ZELGlCQUFpQixHQUFqQixpQkFBaUI7UUFBRSxTQUFTLEdBQVQsU0FBUztRQUFFLGNBQWMsR0FBZCxjQUFjO1FBQUUsVUFBVSxHQUFWLFVBQVUiLCJmaWxlIjoibGliXFxjb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBta2RpcnAsIGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCBwa2dPYmogZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcblxuXG5jb25zdCBBUFBJVU1fVkVSID0gcGtnT2JqLnZlcnNpb247XG5cbmZ1bmN0aW9uIGdldE5vZGVWZXJzaW9uICgpIHtcbiAgLy8gZXhwZWN0IHY8bWFqb3I+LjxtaW5vcj4uPHBhdGNoPlxuICAvLyB3ZSB3aWxsIHB1bGwgb3V0IGBtYWpvcmAgYW5kIGBtaW5vcmBcbiAgbGV0IHZlcnNpb24gPSBwcm9jZXNzLnZlcnNpb24ubWF0Y2goL152KFxcZCspXFwuKFxcZCspLyk7XG4gIHJldHVybiBbTnVtYmVyKHZlcnNpb25bMV0pLCBOdW1iZXIodmVyc2lvblsyXSldO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRHaXRSZXYgKCkge1xuICBsZXQgY3dkID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLlwiLCBcIi4uXCIpO1xuICBsZXQgcmV2ID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKFwiZ2l0XCIsIFtcInJldi1wYXJzZVwiLCBcIkhFQURcIl0sIHtjd2R9KTtcbiAgICByZXYgPSBzdGRvdXQudHJpbSgpO1xuICB9IGNhdGNoIChpZ24pIHt9XG4gIHJldHVybiByZXY7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFwcGl1bUNvbmZpZyAoKSB7XG4gIGxldCBzdGF0ID0gYXdhaXQgZnMuc3RhdChwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nKSk7XG4gIGxldCBidWlsdCA9IHN0YXQubXRpbWUuZ2V0VGltZSgpO1xuICBsZXQgY29uZmlnID0ge1xuICAgICdnaXQtc2hhJzogYXdhaXQgZ2V0R2l0UmV2KCksXG4gICAgJ2J1aWx0JzogYnVpbHQsXG4gICAgJ3ZlcnNpb24nOiBBUFBJVU1fVkVSLFxuICB9O1xuICByZXR1cm4gY29uZmlnO1xufVxuXG5mdW5jdGlvbiBjaGVja05vZGVPayAoKSB7XG4gIGxldCBbbWFqb3IsIG1pbm9yXSA9IGdldE5vZGVWZXJzaW9uKCk7XG4gIGlmIChtYWpvciA9PT0gMCAmJiBtaW5vciA8IDEyKSB7XG4gICAgbGV0IG1zZyA9IGBOb2RlIHZlcnNpb24gbXVzdCBiZSA+PSAwLjEyLiBDdXJyZW50bHkgJHttYWpvcn0uJHttaW5vcn1gO1xuICAgIGxvZ2dlci5lcnJvckFuZFRocm93KG1zZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2Fybk5vZGVEZXByZWNhdGlvbnMgKCkge1xuICBsZXQgW21ham9yLCBtaW5vcl0gPSBnZXROb2RlVmVyc2lvbigpO1xuICBpZiAobWFqb3IgPT09IDAgJiYgbWlub3IgPCAxMikge1xuICAgIGxvZ2dlci53YXJuKFwiQXBwaXVtIHN1cHBvcnQgZm9yIHZlcnNpb25zIG9mIG5vZGUgPCAwLjEyIGhhcyBiZWVuIFwiICtcbiAgICAgICAgICAgICAgICBcImRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uLiBQbGVhc2UgXCIgK1xuICAgICAgICAgICAgICAgIFwidXBncmFkZSFcIik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0NvbmZpZyAoKSB7XG4gIGxldCBjb25maWcgPSBhd2FpdCBnZXRBcHBpdW1Db25maWcoKTtcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY29uZmlnKSk7XG59XG5cbmZ1bmN0aW9uIGdldE5vbkRlZmF1bHRBcmdzIChwYXJzZXIsIGFyZ3MpIHtcbiAgbGV0IG5vbkRlZmF1bHRzID0ge307XG4gIGZvciAobGV0IHJhd0FyZyBvZiBwYXJzZXIucmF3QXJncykge1xuICAgIGxldCBhcmcgPSByYXdBcmdbMV0uZGVzdDtcbiAgICBpZiAoYXJnc1thcmddICE9PSByYXdBcmdbMV0uZGVmYXVsdFZhbHVlKSB7XG4gICAgICBub25EZWZhdWx0c1thcmddID0gYXJnc1thcmddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9uRGVmYXVsdHM7XG59XG5cbmZ1bmN0aW9uIGdldERlcHJlY2F0ZWRBcmdzIChwYXJzZXIsIGFyZ3MpIHtcbiAgLy8gZ28gdGhyb3VnaCB0aGUgc2VydmVyIGNvbW1hbmQgbGluZSBhcmd1bWVudHMgYW5kIGZpZ3VyZVxuICAvLyBvdXQgd2hpY2ggb2YgdGhlIG9uZXMgdXNlZCBhcmUgZGVwcmVjYXRlZFxuICBsZXQgZGVwcmVjYXRlZCA9IHt9O1xuICBmb3IgKGxldCByYXdBcmcgb2YgcGFyc2VyLnJhd0FyZ3MpIHtcbiAgICBsZXQgYXJnID0gcmF3QXJnWzFdLmRlc3Q7XG4gICAgbGV0IGRlZmF1bHRWYWx1ZSA9IHJhd0FyZ1sxXS5kZWZhdWx0VmFsdWU7XG4gICAgbGV0IGlzRGVwcmVjYXRlZCA9ICEhcmF3QXJnWzFdLmRlcHJlY2F0ZWRGb3I7XG4gICAgaWYgKGFyZ3NbYXJnXSAhPT0gZGVmYXVsdFZhbHVlICYmIGlzRGVwcmVjYXRlZCkge1xuICAgICAgZGVwcmVjYXRlZFtyYXdBcmdbMF1dID0gcmF3QXJnWzFdLmRlcHJlY2F0ZWRGb3I7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXByZWNhdGVkO1xufVxuXG5mdW5jdGlvbiBjaGVja1ZhbGlkUG9ydCAocG9ydCwgcG9ydE5hbWUpIHtcbiAgaWYgKHBvcnQgPiAwICYmIHBvcnQgPCA2NTUzNikgcmV0dXJuIHRydWU7XG4gIGxvZ2dlci5lcnJvcihgUG9ydCAnJHtwb3J0TmFtZX0nIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAgYW5kIGxlc3MgdGhhbiA2NTUzNi4gQ3VycmVudGx5ICR7cG9ydH1gKTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVNlcnZlckFyZ3MgKHBhcnNlciwgYXJncykge1xuICAvLyBhcmd1bWVudHMgdGhhdCBjYW5ub3QgYm90aCBiZSBzZXRcbiAgbGV0IGV4Y2x1c2l2ZXMgPSBbXG4gICAgWydub1Jlc2V0JywgJ2Z1bGxSZXNldCddLFxuICAgIFsnaXBhJywgJ3NhZmFyaSddLFxuICAgIFsnYXBwJywgJ3NhZmFyaSddLFxuICAgIFsnZm9yY2VJcGhvbmUnLCAnZm9yY2VJcGFkJ10sXG4gICAgWydkZXZpY2VOYW1lJywgJ2RlZmF1bHREZXZpY2UnXVxuICBdO1xuXG4gIGZvciAobGV0IGV4U2V0IG9mIGV4Y2x1c2l2ZXMpIHtcbiAgICBsZXQgbnVtRm91bmRJbkFyZ3MgPSAwO1xuICAgIGZvciAobGV0IG9wdCBvZiBleFNldCkge1xuICAgICAgaWYgKF8uaGFzKGFyZ3MsIG9wdCkgJiYgYXJnc1tvcHRdKSB7XG4gICAgICAgIG51bUZvdW5kSW5BcmdzKys7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChudW1Gb3VuZEluQXJncyA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWW91IGNhbid0IHBhc3MgaW4gbW9yZSB0aGFuIG9uZSBhcmd1bWVudCBmcm9tIHRoZSBgICtcbiAgICAgICAgICAgICAgICAgICAgICBgc2V0ICR7SlNPTi5zdHJpbmdpZnkoZXhTZXQpfSwgc2luY2UgdGhleSBhcmUgYCArXG4gICAgICAgICAgICAgICAgICAgICAgYG11dHVhbGx5IGV4Y2x1c2l2ZWApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHZhbGlkYXRpb25zID0ge1xuICAgIHBvcnQ6IGNoZWNrVmFsaWRQb3J0LFxuICAgIGNhbGxiYWNrUG9ydDogY2hlY2tWYWxpZFBvcnQsXG4gICAgYm9vdHN0cmFwUG9ydDogY2hlY2tWYWxpZFBvcnQsXG4gICAgc2VsZW5kcm9pZFBvcnQ6IGNoZWNrVmFsaWRQb3J0LFxuICAgIGNocm9tZWRyaXZlclBvcnQ6IGNoZWNrVmFsaWRQb3J0LFxuICAgIHJvYm90UG9ydDogY2hlY2tWYWxpZFBvcnQsXG4gICAgYmFja2VuZFJldHJpZXM6IChyKSA9PiB7IHJldHVybiByID49IDA7IH1cbiAgfTtcblxuICBjb25zdCBub25EZWZhdWx0QXJncyA9IGdldE5vbkRlZmF1bHRBcmdzKHBhcnNlciwgYXJncyk7XG5cbiAgZm9yIChsZXQgW2FyZywgdmFsaWRhdG9yXSBvZiBfLnRvUGFpcnModmFsaWRhdGlvbnMpKSB7XG4gICAgaWYgKF8uaGFzKG5vbkRlZmF1bHRBcmdzLCBhcmcpKSB7XG4gICAgICBpZiAoIXZhbGlkYXRvcihhcmdzW2FyZ10sIGFyZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGFyZ3VtZW50IGZvciBwYXJhbSAke2FyZ306ICR7YXJnc1thcmddfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiB2YWxpZGF0ZVRtcERpciAodG1wRGlyKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgbWtkaXJwKHRtcERpcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFdlIGNvdWxkIG5vdCBlbnN1cmUgdGhhdCB0aGUgdGVtcCBkaXIgeW91IHNwZWNpZmllZCBgICtcbiAgICAgICAgICAgICAgICAgICAgYCgke3RtcERpcn0pIGV4aXN0cy4gUGxlYXNlIG1ha2Ugc3VyZSBpdCdzIHdyaXRlYWJsZS5gKTtcbiAgfVxufVxuXG5leHBvcnQgeyBnZXRBcHBpdW1Db25maWcsIHZhbGlkYXRlU2VydmVyQXJncywgY2hlY2tOb2RlT2ssIHNob3dDb25maWcsXG4gICAgICAgICB3YXJuTm9kZURlcHJlY2F0aW9ucywgdmFsaWRhdGVUbXBEaXIsIGdldE5vbkRlZmF1bHRBcmdzLFxuICAgICAgICAgZ2V0RGVwcmVjYXRlZEFyZ3MsIGdldEdpdFJldiwgY2hlY2tWYWxpZFBvcnQsIEFQUElVTV9WRVIgfTtcbiJdfQ==