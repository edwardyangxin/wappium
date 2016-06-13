#!/usr/bin/env node

require('source-map-support').install();

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logsink = require('./logsink');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

// logger needs to remain first of imports

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var _asyncbox = require('asyncbox');

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _config = require('./config');

var _appium = require('./appium');

var _appium2 = _interopRequireDefault(_appium);

var _gridRegister = require('./grid-register');

var _gridRegister2 = _interopRequireDefault(_gridRegister);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function preflightChecks(parser, args) {
  return _regeneratorRuntime.async(function preflightChecks$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        (0, _config.checkNodeOk)();
        if (args.asyncTrace) {
          require('longjohn').async_trace_limit = -1;
        }

        if (!args.showConfig) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _config.showConfig)());

      case 6:
        process.exit(0);

      case 7:
        (0, _config.warnNodeDeprecations)();
        (0, _config.validateServerArgs)(parser, args);

        if (!args.tmpDir) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 12;
        return _regeneratorRuntime.awrap((0, _config.validateTmpDir)(args.tmpDir));

      case 12:
        context$1$0.next = 18;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0['catch'](0);

        _logger2['default'].error(context$1$0.t0.message.red);
        process.exit(1);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 14]]);
}

function logDeprecationWarning(deprecatedArgs) {
  _logger2['default'].warn('Deprecated server args:');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(_lodash2['default'].toPairs(deprecatedArgs)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var arg = _step$value[0];
      var realArg = _step$value[1];

      _logger2['default'].warn('  ' + arg.red + ' => ' + realArg);
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
}

function logNonDefaultArgsWarning(args) {
  _logger2['default'].info('Non-default server args:');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(_lodash2['default'].toPairs(args)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2);

      var arg = _step2$value[0];
      var value = _step2$value[1];

      _logger2['default'].info('  ' + arg + ': ' + _util2['default'].inspect(value));
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
}

function logDefaultCapabilitiesWarning(caps) {
  _logger2['default'].info('Default capabilities, which will be added to each request ' + 'unless overridden by desired capabilities:');
  _util2['default'].inspect(caps);
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(_lodash2['default'].toPairs(caps)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = _slicedToArray(_step3.value, 2);

      var cap = _step3$value[0];
      var value = _step3$value[1];

      _logger2['default'].info('  ' + cap + ': ' + _util2['default'].inspect(value));
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
}

function logStartupInfo(parser, args) {
  var welcome, appiumRev, showArgs, deprecatedArgs;
  return _regeneratorRuntime.async(function logStartupInfo$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        welcome = 'Welcome to Appium v' + _config.APPIUM_VER;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _config.getGitRev)());

      case 3:
        appiumRev = context$1$0.sent;

        if (appiumRev) {
          welcome += ' (REV ' + appiumRev + ')';
        }
        _logger2['default'].info(welcome);

        showArgs = (0, _config.getNonDefaultArgs)(parser, args);

        if (_lodash2['default'].size(showArgs)) {
          logNonDefaultArgsWarning(showArgs);
        }
        deprecatedArgs = (0, _config.getDeprecatedArgs)(parser, args);

        if (_lodash2['default'].size(deprecatedArgs)) {
          logDeprecationWarning(deprecatedArgs);
        }
        if (!_lodash2['default'].isEmpty(args.defaultCapabilities)) {
          logDefaultCapabilitiesWarning(args.defaultCapabilities);
        }
        // TODO: bring back loglevel reporting below once logger is flushed out
        //logger.info('Console LogLevel: ' + logger.transports.console.level);
        //if (logger.transports.file) {
        //logger.info('File LogLevel: ' + logger.transports.file.level);
        //}

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function logServerPort(address, port) {
  var logMessage = 'Appium REST http interface listener started on ' + (address + ':' + port);
  _logger2['default'].info(logMessage);
}

function main() {
  var args = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var parser, router, server;
  return _regeneratorRuntime.async(function main$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        parser = (0, _parser2['default'])();

        if (!args) {
          args = parser.parseArgs();
        }
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _logsink.init)(args));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(preflightChecks(parser, args));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(logStartupInfo(parser, args));

      case 8:
        router = (0, _appium2['default'])(args);
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap((0, _appiumBaseDriver.server)(router, args.port, args.address));

      case 11:
        server = context$1$0.sent;
        context$1$0.prev = 12;

        if (!(args.nodeconfig !== null)) {
          context$1$0.next = 16;
          break;
        }

        context$1$0.next = 16;
        return _regeneratorRuntime.awrap((0, _gridRegister2['default'])(args.nodeconfig, args.address, args.port));

      case 16:
        context$1$0.next = 22;
        break;

      case 18:
        context$1$0.prev = 18;
        context$1$0.t0 = context$1$0['catch'](12);

        server.close();
        throw context$1$0.t0;

      case 22:
        logServerPort(args.address, args.port);

        return context$1$0.abrupt('return', server);

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[12, 18]]);
}

if (require.main === module) {
  (0, _asyncbox.asyncify)(main);
}

exports.main = main;

// TODO prelaunch if args.launch is set
// TODO: startAlertSocket(server, appiumServer);

// configure as node on grid, if necessary
//# sourceMappingURL=data:application/json;base64,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Qzs7OztBQUdqQixxQkFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs0Q0FFaEMsTUFBTTs7Ozs7OztDQUNkOztBQUVELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7QUFDM0IsMEJBQVMsSUFBSSxDQUFDLENBQUM7Q0FDaEI7O1FBRVEsSUFBSSxHQUFKLElBQUkiLCJmaWxlIjoibGliL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIHRyYW5zcGlsZTptYWluXG5cbmltcG9ydCB7IGluaXQgYXMgbG9nc2lua0luaXQgfSBmcm9tICcuL2xvZ3NpbmsnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7IC8vIGxvZ2dlciBuZWVkcyB0byByZW1haW4gZmlyc3Qgb2YgaW1wb3J0c1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHNlcnZlciBhcyBiYXNlU2VydmVyIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcbmltcG9ydCB7IGFzeW5jaWZ5IH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IGdldFBhcnNlciBmcm9tICcuL3BhcnNlcic7XG5pbXBvcnQgeyBzaG93Q29uZmlnLCBjaGVja05vZGVPaywgdmFsaWRhdGVTZXJ2ZXJBcmdzLFxuICAgICAgICAgd2Fybk5vZGVEZXByZWNhdGlvbnMsIHZhbGlkYXRlVG1wRGlyLCBnZXROb25EZWZhdWx0QXJncyxcbiAgICAgICAgIGdldERlcHJlY2F0ZWRBcmdzLCBnZXRHaXRSZXYsIEFQUElVTV9WRVIgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgZ2V0QXBwaXVtUm91dGVyIGZyb20gJy4vYXBwaXVtJztcbmltcG9ydCByZWdpc3Rlck5vZGUgZnJvbSAnLi9ncmlkLXJlZ2lzdGVyJztcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHByZWZsaWdodENoZWNrcyAocGFyc2VyLCBhcmdzKSB7XG4gIHRyeSB7XG4gICAgY2hlY2tOb2RlT2soKTtcbiAgICBpZiAoYXJncy5hc3luY1RyYWNlKSB7XG4gICAgICByZXF1aXJlKCdsb25nam9obicpLmFzeW5jX3RyYWNlX2xpbWl0ID0gLTE7XG4gICAgfVxuICAgIGlmIChhcmdzLnNob3dDb25maWcpIHtcbiAgICAgIGF3YWl0IHNob3dDb25maWcoKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gICAgd2Fybk5vZGVEZXByZWNhdGlvbnMoKTtcbiAgICB2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTtcbiAgICBpZiAoYXJncy50bXBEaXIpIHtcbiAgICAgIGF3YWl0IHZhbGlkYXRlVG1wRGlyKGFyZ3MudG1wRGlyKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5lcnJvcihlcnIubWVzc2FnZS5yZWQpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsb2dEZXByZWNhdGlvbldhcm5pbmcgKGRlcHJlY2F0ZWRBcmdzKSB7XG4gIGxvZ2dlci53YXJuKCdEZXByZWNhdGVkIHNlcnZlciBhcmdzOicpO1xuICBmb3IgKGxldCBbYXJnLCByZWFsQXJnXSBvZiBfLnRvUGFpcnMoZGVwcmVjYXRlZEFyZ3MpKSB7XG4gICAgbG9nZ2VyLndhcm4oYCAgJHthcmcucmVkfSA9PiAke3JlYWxBcmd9YCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbG9nTm9uRGVmYXVsdEFyZ3NXYXJuaW5nIChhcmdzKSB7XG4gIGxvZ2dlci5pbmZvKCdOb24tZGVmYXVsdCBzZXJ2ZXIgYXJnczonKTtcbiAgZm9yIChsZXQgW2FyZywgdmFsdWVdIG9mIF8udG9QYWlycyhhcmdzKSkge1xuICAgIGxvZ2dlci5pbmZvKGAgICR7YXJnfTogJHt1dGlsLmluc3BlY3QodmFsdWUpfWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxvZ0RlZmF1bHRDYXBhYmlsaXRpZXNXYXJuaW5nIChjYXBzKSB7XG4gIGxvZ2dlci5pbmZvKCdEZWZhdWx0IGNhcGFiaWxpdGllcywgd2hpY2ggd2lsbCBiZSBhZGRlZCB0byBlYWNoIHJlcXVlc3QgJyArXG4gICAgICAgICAgICAgICd1bmxlc3Mgb3ZlcnJpZGRlbiBieSBkZXNpcmVkIGNhcGFiaWxpdGllczonKTtcbiAgdXRpbC5pbnNwZWN0KGNhcHMpO1xuICBmb3IgKGxldCBbY2FwLCB2YWx1ZV0gb2YgXy50b1BhaXJzKGNhcHMpKSB7XG4gICAgbG9nZ2VyLmluZm8oYCAgJHtjYXB9OiAke3V0aWwuaW5zcGVjdCh2YWx1ZSl9YCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9nU3RhcnR1cEluZm8gKHBhcnNlciwgYXJncykge1xuICBsZXQgd2VsY29tZSA9IGBXZWxjb21lIHRvIEFwcGl1bSB2JHtBUFBJVU1fVkVSfWA7XG4gIGxldCBhcHBpdW1SZXYgPSBhd2FpdCBnZXRHaXRSZXYoKTtcbiAgaWYgKGFwcGl1bVJldikge1xuICAgIHdlbGNvbWUgKz0gYCAoUkVWICR7YXBwaXVtUmV2fSlgO1xuICB9XG4gIGxvZ2dlci5pbmZvKHdlbGNvbWUpO1xuXG4gIGxldCBzaG93QXJncyA9IGdldE5vbkRlZmF1bHRBcmdzKHBhcnNlciwgYXJncyk7XG4gIGlmIChfLnNpemUoc2hvd0FyZ3MpKSB7XG4gICAgbG9nTm9uRGVmYXVsdEFyZ3NXYXJuaW5nKHNob3dBcmdzKTtcbiAgfVxuICBsZXQgZGVwcmVjYXRlZEFyZ3MgPSBnZXREZXByZWNhdGVkQXJncyhwYXJzZXIsIGFyZ3MpO1xuICBpZiAoXy5zaXplKGRlcHJlY2F0ZWRBcmdzKSkge1xuICAgIGxvZ0RlcHJlY2F0aW9uV2FybmluZyhkZXByZWNhdGVkQXJncyk7XG4gIH1cbiAgaWYgKCFfLmlzRW1wdHkoYXJncy5kZWZhdWx0Q2FwYWJpbGl0aWVzKSkge1xuICAgIGxvZ0RlZmF1bHRDYXBhYmlsaXRpZXNXYXJuaW5nKGFyZ3MuZGVmYXVsdENhcGFiaWxpdGllcyk7XG4gIH1cbiAgLy8gVE9ETzogYnJpbmcgYmFjayBsb2dsZXZlbCByZXBvcnRpbmcgYmVsb3cgb25jZSBsb2dnZXIgaXMgZmx1c2hlZCBvdXRcbiAgLy9sb2dnZXIuaW5mbygnQ29uc29sZSBMb2dMZXZlbDogJyArIGxvZ2dlci50cmFuc3BvcnRzLmNvbnNvbGUubGV2ZWwpO1xuICAvL2lmIChsb2dnZXIudHJhbnNwb3J0cy5maWxlKSB7XG4gICAgLy9sb2dnZXIuaW5mbygnRmlsZSBMb2dMZXZlbDogJyArIGxvZ2dlci50cmFuc3BvcnRzLmZpbGUubGV2ZWwpO1xuICAvL31cbn1cblxuZnVuY3Rpb24gbG9nU2VydmVyUG9ydCAoYWRkcmVzcywgcG9ydCkge1xuICBsZXQgbG9nTWVzc2FnZSA9IGBBcHBpdW0gUkVTVCBodHRwIGludGVyZmFjZSBsaXN0ZW5lciBzdGFydGVkIG9uIGAgK1xuICAgICAgICAgICAgICAgICAgIGAke2FkZHJlc3N9OiR7cG9ydH1gO1xuICBsb2dnZXIuaW5mbyhsb2dNZXNzYWdlKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbiAoYXJncyA9IG51bGwpIHtcbiAgbGV0IHBhcnNlciA9IGdldFBhcnNlcigpO1xuICBpZiAoIWFyZ3MpIHtcbiAgICBhcmdzID0gcGFyc2VyLnBhcnNlQXJncygpO1xuICB9XG4gIGF3YWl0IGxvZ3NpbmtJbml0KGFyZ3MpO1xuICBhd2FpdCBwcmVmbGlnaHRDaGVja3MocGFyc2VyLCBhcmdzKTtcbiAgYXdhaXQgbG9nU3RhcnR1cEluZm8ocGFyc2VyLCBhcmdzKTtcbiAgbGV0IHJvdXRlciA9IGdldEFwcGl1bVJvdXRlcihhcmdzKTtcbiAgbGV0IHNlcnZlciA9IGF3YWl0IGJhc2VTZXJ2ZXIocm91dGVyLCBhcmdzLnBvcnQsIGFyZ3MuYWRkcmVzcyk7XG4gIHRyeSB7XG4gICAgLy8gVE9ETyBwcmVsYXVuY2ggaWYgYXJncy5sYXVuY2ggaXMgc2V0XG4gICAgLy8gVE9ETzogc3RhcnRBbGVydFNvY2tldChzZXJ2ZXIsIGFwcGl1bVNlcnZlcik7XG5cbiAgICAvLyBjb25maWd1cmUgYXMgbm9kZSBvbiBncmlkLCBpZiBuZWNlc3NhcnlcbiAgICBpZiAoYXJncy5ub2RlY29uZmlnICE9PSBudWxsKSB7XG4gICAgICBhd2FpdCByZWdpc3Rlck5vZGUoYXJncy5ub2RlY29uZmlnLCBhcmdzLmFkZHJlc3MsIGFyZ3MucG9ydCk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBzZXJ2ZXIuY2xvc2UoKTtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgbG9nU2VydmVyUG9ydChhcmdzLmFkZHJlc3MsIGFyZ3MucG9ydCk7XG5cbiAgcmV0dXJuIHNlcnZlcjtcbn1cblxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIGFzeW5jaWZ5KG1haW4pO1xufVxuXG5leHBvcnQgeyBtYWluIH07XG4iXX0=