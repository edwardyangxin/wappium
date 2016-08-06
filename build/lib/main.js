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

var _testwaTestwaJs = require('./testwa/testwa.js');

var _testwaTestwaJs2 = _interopRequireDefault(_testwaTestwaJs);

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
        if (!args.portal) {
          context$1$0.next = 19;
          break;
        }

        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(_testwaTestwaJs2['default'].heartbeat(args));

      case 19:
        context$1$0.next = 25;
        break;

      case 21:
        context$1$0.prev = 21;
        context$1$0.t0 = context$1$0['catch'](12);

        server.close();
        throw context$1$0.t0;

      case 25:
        logServerPort(args.address, args.port);

        return context$1$0.abrupt('return', server);

      case 27:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[12, 21]]);
}

if (require.main === module) {
  (0, _asyncbox.asyncify)(main);
}

exports.main = main;

// TODO prelaunch if args.launch is set
// TODO: startAlertSocket(server, appiumServer);

// configure as node on grid, if necessary
//# sourceMappingURL=data:application/json;base64,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TTs7Ozs7O3lDQUNQLDRCQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7QUFJOUIsY0FBTSxDQUFDLEtBQUssRUFBRSxDQUFDOzs7O0FBR2pCLHFCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7OzRDQUVoQyxNQUFNOzs7Ozs7O0NBQ2Q7O0FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtBQUMzQiwwQkFBUyxJQUFJLENBQUMsQ0FBQztDQUNoQjs7UUFFUSxJQUFJLEdBQUosSUFBSSIsImZpbGUiOiJsaWJcXG1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIHRyYW5zcGlsZTptYWluXG5cbmltcG9ydCB7IGluaXQgYXMgbG9nc2lua0luaXQgfSBmcm9tICcuL2xvZ3NpbmsnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7IC8vIGxvZ2dlciBuZWVkcyB0byByZW1haW4gZmlyc3Qgb2YgaW1wb3J0c1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHNlcnZlciBhcyBiYXNlU2VydmVyIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcbmltcG9ydCB7IGFzeW5jaWZ5IH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IGdldFBhcnNlciBmcm9tICcuL3BhcnNlcic7XG5pbXBvcnQgeyBzaG93Q29uZmlnLCBjaGVja05vZGVPaywgdmFsaWRhdGVTZXJ2ZXJBcmdzLFxuICAgICAgICAgd2Fybk5vZGVEZXByZWNhdGlvbnMsIHZhbGlkYXRlVG1wRGlyLCBnZXROb25EZWZhdWx0QXJncyxcbiAgICAgICAgIGdldERlcHJlY2F0ZWRBcmdzLCBnZXRHaXRSZXYsIEFQUElVTV9WRVIgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgZ2V0QXBwaXVtUm91dGVyIGZyb20gJy4vYXBwaXVtJztcbmltcG9ydCByZWdpc3Rlck5vZGUgZnJvbSAnLi9ncmlkLXJlZ2lzdGVyJztcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuaW1wb3J0IHRlc3R3YSBmcm9tICcuL3Rlc3R3YS90ZXN0d2EuanMnO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHByZWZsaWdodENoZWNrcyAocGFyc2VyLCBhcmdzKSB7XG4gIHRyeSB7XG4gICAgY2hlY2tOb2RlT2soKTtcbiAgICBpZiAoYXJncy5hc3luY1RyYWNlKSB7XG4gICAgICByZXF1aXJlKCdsb25nam9obicpLmFzeW5jX3RyYWNlX2xpbWl0ID0gLTE7XG4gICAgfVxuICAgIGlmIChhcmdzLnNob3dDb25maWcpIHtcbiAgICAgIGF3YWl0IHNob3dDb25maWcoKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gICAgd2Fybk5vZGVEZXByZWNhdGlvbnMoKTtcbiAgICB2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTtcbiAgICBpZiAoYXJncy50bXBEaXIpIHtcbiAgICAgIGF3YWl0IHZhbGlkYXRlVG1wRGlyKGFyZ3MudG1wRGlyKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5lcnJvcihlcnIubWVzc2FnZS5yZWQpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsb2dEZXByZWNhdGlvbldhcm5pbmcgKGRlcHJlY2F0ZWRBcmdzKSB7XG4gIGxvZ2dlci53YXJuKCdEZXByZWNhdGVkIHNlcnZlciBhcmdzOicpO1xuICBmb3IgKGxldCBbYXJnLCByZWFsQXJnXSBvZiBfLnRvUGFpcnMoZGVwcmVjYXRlZEFyZ3MpKSB7XG4gICAgbG9nZ2VyLndhcm4oYCAgJHthcmcucmVkfSA9PiAke3JlYWxBcmd9YCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbG9nTm9uRGVmYXVsdEFyZ3NXYXJuaW5nIChhcmdzKSB7XG4gIGxvZ2dlci5pbmZvKCdOb24tZGVmYXVsdCBzZXJ2ZXIgYXJnczonKTtcbiAgZm9yIChsZXQgW2FyZywgdmFsdWVdIG9mIF8udG9QYWlycyhhcmdzKSkge1xuICAgIGxvZ2dlci5pbmZvKGAgICR7YXJnfTogJHt1dGlsLmluc3BlY3QodmFsdWUpfWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxvZ0RlZmF1bHRDYXBhYmlsaXRpZXNXYXJuaW5nIChjYXBzKSB7XG4gIGxvZ2dlci5pbmZvKCdEZWZhdWx0IGNhcGFiaWxpdGllcywgd2hpY2ggd2lsbCBiZSBhZGRlZCB0byBlYWNoIHJlcXVlc3QgJyArXG4gICAgICAgICAgICAgICd1bmxlc3Mgb3ZlcnJpZGRlbiBieSBkZXNpcmVkIGNhcGFiaWxpdGllczonKTtcbiAgdXRpbC5pbnNwZWN0KGNhcHMpO1xuICBmb3IgKGxldCBbY2FwLCB2YWx1ZV0gb2YgXy50b1BhaXJzKGNhcHMpKSB7XG4gICAgbG9nZ2VyLmluZm8oYCAgJHtjYXB9OiAke3V0aWwuaW5zcGVjdCh2YWx1ZSl9YCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9nU3RhcnR1cEluZm8gKHBhcnNlciwgYXJncykge1xuICBsZXQgd2VsY29tZSA9IGBXZWxjb21lIHRvIEFwcGl1bSB2JHtBUFBJVU1fVkVSfWA7XG4gIGxldCBhcHBpdW1SZXYgPSBhd2FpdCBnZXRHaXRSZXYoKTtcbiAgaWYgKGFwcGl1bVJldikge1xuICAgIHdlbGNvbWUgKz0gYCAoUkVWICR7YXBwaXVtUmV2fSlgO1xuICB9XG4gIGxvZ2dlci5pbmZvKHdlbGNvbWUpO1xuXG4gIGxldCBzaG93QXJncyA9IGdldE5vbkRlZmF1bHRBcmdzKHBhcnNlciwgYXJncyk7XG4gIGlmIChfLnNpemUoc2hvd0FyZ3MpKSB7XG4gICAgbG9nTm9uRGVmYXVsdEFyZ3NXYXJuaW5nKHNob3dBcmdzKTtcbiAgfVxuICBsZXQgZGVwcmVjYXRlZEFyZ3MgPSBnZXREZXByZWNhdGVkQXJncyhwYXJzZXIsIGFyZ3MpO1xuICBpZiAoXy5zaXplKGRlcHJlY2F0ZWRBcmdzKSkge1xuICAgIGxvZ0RlcHJlY2F0aW9uV2FybmluZyhkZXByZWNhdGVkQXJncyk7XG4gIH1cbiAgaWYgKCFfLmlzRW1wdHkoYXJncy5kZWZhdWx0Q2FwYWJpbGl0aWVzKSkge1xuICAgIGxvZ0RlZmF1bHRDYXBhYmlsaXRpZXNXYXJuaW5nKGFyZ3MuZGVmYXVsdENhcGFiaWxpdGllcyk7XG4gIH1cbiAgLy8gVE9ETzogYnJpbmcgYmFjayBsb2dsZXZlbCByZXBvcnRpbmcgYmVsb3cgb25jZSBsb2dnZXIgaXMgZmx1c2hlZCBvdXRcbiAgLy9sb2dnZXIuaW5mbygnQ29uc29sZSBMb2dMZXZlbDogJyArIGxvZ2dlci50cmFuc3BvcnRzLmNvbnNvbGUubGV2ZWwpO1xuICAvL2lmIChsb2dnZXIudHJhbnNwb3J0cy5maWxlKSB7XG4gICAgLy9sb2dnZXIuaW5mbygnRmlsZSBMb2dMZXZlbDogJyArIGxvZ2dlci50cmFuc3BvcnRzLmZpbGUubGV2ZWwpO1xuICAvL31cbn1cblxuZnVuY3Rpb24gbG9nU2VydmVyUG9ydCAoYWRkcmVzcywgcG9ydCkge1xuICBsZXQgbG9nTWVzc2FnZSA9IGBBcHBpdW0gUkVTVCBodHRwIGludGVyZmFjZSBsaXN0ZW5lciBzdGFydGVkIG9uIGAgK1xuICAgICAgICAgICAgICAgICAgIGAke2FkZHJlc3N9OiR7cG9ydH1gO1xuICBsb2dnZXIuaW5mbyhsb2dNZXNzYWdlKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbiAoYXJncyA9IG51bGwpIHtcbiAgbGV0IHBhcnNlciA9IGdldFBhcnNlcigpO1xuICBpZiAoIWFyZ3MpIHtcbiAgICBhcmdzID0gcGFyc2VyLnBhcnNlQXJncygpO1xuICB9XG4gIGF3YWl0IGxvZ3NpbmtJbml0KGFyZ3MpO1xuICBhd2FpdCBwcmVmbGlnaHRDaGVja3MocGFyc2VyLCBhcmdzKTtcbiAgYXdhaXQgbG9nU3RhcnR1cEluZm8ocGFyc2VyLCBhcmdzKTtcbiAgbGV0IHJvdXRlciA9IGdldEFwcGl1bVJvdXRlcihhcmdzKTtcbiAgbGV0IHNlcnZlciA9IGF3YWl0IGJhc2VTZXJ2ZXIocm91dGVyLCBhcmdzLnBvcnQsIGFyZ3MuYWRkcmVzcyk7XG4gIHRyeSB7XG4gICAgLy8gVE9ETyBwcmVsYXVuY2ggaWYgYXJncy5sYXVuY2ggaXMgc2V0XG4gICAgLy8gVE9ETzogc3RhcnRBbGVydFNvY2tldChzZXJ2ZXIsIGFwcGl1bVNlcnZlcik7XG5cbiAgICAvLyBjb25maWd1cmUgYXMgbm9kZSBvbiBncmlkLCBpZiBuZWNlc3NhcnlcbiAgICBpZiAoYXJncy5ub2RlY29uZmlnICE9PSBudWxsKSB7XG4gICAgICBhd2FpdCByZWdpc3Rlck5vZGUoYXJncy5ub2RlY29uZmlnLCBhcmdzLmFkZHJlc3MsIGFyZ3MucG9ydCk7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3MucG9ydGFsKSB7XG4gICAgICBhd2FpdCB0ZXN0d2EuaGVhcnRiZWF0KGFyZ3MpO1xuICAgIH1cblxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBzZXJ2ZXIuY2xvc2UoKTtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgbG9nU2VydmVyUG9ydChhcmdzLmFkZHJlc3MsIGFyZ3MucG9ydCk7XG5cbiAgcmV0dXJuIHNlcnZlcjtcbn1cblxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIGFzeW5jaWZ5KG1haW4pO1xufVxuXG5leHBvcnQgeyBtYWluIH07XG4iXX0=