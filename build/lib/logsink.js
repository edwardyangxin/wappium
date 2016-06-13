'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

var _appiumLogger = require('appium-logger');

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _appiumSupport = require('appium-support');

require('date-utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// set up distributed logging before everything else
(0, _appiumLogger.patchLogger)(_npmlog2['default']);
global._global_npmlog = _npmlog2['default'];

// npmlog is used only for emitting, we use winston for output
_npmlog2['default'].level = "silent";
var levels = {
  debug: 4,
  info: 3,
  warn: 2,
  error: 1
};

var colors = {
  info: 'cyan',
  debug: 'grey',
  warn: 'yellow',
  error: 'red'
};

var npmToWinstonLevels = {
  silly: 'debug',
  verbose: 'debug',
  debug: 'debug',
  info: 'info',
  http: 'info',
  warn: 'warn',
  error: 'error'
};

var logger = null;
var timeZone = null;

function timestamp() {
  var date = new Date();
  if (!timeZone) {
    date = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
  }
  return date.toFormat("YYYY-MM-DD HH24:MI:SS:LL");
}

// Strip the color marking within messages.
// We need to patch the transports, because the stripColor functionality in
// Winston is wrongly implemented at the logger level, and we want to avoid
// having to create 2 loggers.
function applyStripColorPatch(transport) {
  var _log = transport.log.bind(transport);
  transport.log = function (level, msg, meta, callback) {
    var code = /\u001b\[(\d+(;\d+)*)?m/g;
    msg = ('' + msg).replace(code, '');
    _log(level, msg, meta, callback);
  };
}

function _createConsoleTransport(args, logLvl) {
  var transport = new _winston2['default'].transports.Console({
    name: "console",
    timestamp: args.logTimestamp ? timestamp : undefined,
    colorize: !args.logNoColors,
    handleExceptions: true,
    exitOnError: false,
    json: false,
    level: logLvl,
    formatter: function formatter(options) {
      var meta = options.meta && _Object$keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '';
      var timestampPrefix = '';
      if (options.timestamp) {
        timestampPrefix = options.timestamp() + ' - ';
      }
      return '' + timestampPrefix + (options.message || '') + meta;
    }
  });
  if (args.logNoColors) {
    applyStripColorPatch(transport);
  }
  return transport;
}

function _createFileTransport(args, logLvl) {
  var transport = new _winston2['default'].transports.File({
    name: "file",
    timestamp: timestamp,
    filename: args.log,
    maxFiles: 1,
    handleExceptions: true,
    exitOnError: false,
    json: false,
    level: logLvl
  });
  applyStripColorPatch(transport);
  return transport;
}

function _createHttpTransport(args, logLvl) {
  var host = null,
      port = null;

  if (args.webhook.match(':')) {
    var hostAndPort = args.webhook.split(':');
    host = hostAndPort[0];
    port = parseInt(hostAndPort[1], 10);
  }

  var transport = new _winston2['default'].transports.Http({
    name: "http",
    host: host || '127.0.0.1',
    port: port || 9003,
    path: '/',
    handleExceptions: true,
    exitOnError: false,
    json: false,
    level: logLvl
  });
  applyStripColorPatch(transport);
  return transport;
}

function _createTransports(args) {
  var transports, consoleLogLevel, fileLogLevel, lvlPair;
  return _regeneratorRuntime.async(function _createTransports$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        transports = [];
        consoleLogLevel = null;
        fileLogLevel = null;

        if (args.loglevel && args.loglevel.match(":")) {
          lvlPair = args.loglevel.split(':');

          consoleLogLevel = lvlPair[0] || consoleLogLevel;
          fileLogLevel = lvlPair[1] || fileLogLevel;
        } else {
          consoleLogLevel = fileLogLevel = args.loglevel;
        }

        transports.push(_createConsoleTransport(args, consoleLogLevel));

        if (!args.log) {
          context$1$0.next = 18;
          break;
        }

        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(args.log));

      case 9:
        if (!context$1$0.sent) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(args.log));

      case 12:

        transports.push(_createFileTransport(args, fileLogLevel));
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](6);

        console.log('Tried to attach logging to file ' + args.log + ' but an error ' + ('occurred: ' + context$1$0.t0.message));

      case 18:

        if (args.webhook) {
          try {
            transports.push(_createHttpTransport(args, fileLogLevel));
          } catch (e) {
            console.log('Tried to attach logging to Http at ' + args.webhook + ' but ' + ('an error occurred: ' + e.message));
          }
        }

        return context$1$0.abrupt('return', transports);

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 15]]);
}

function init(args) {
  return _regeneratorRuntime.async(function init$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // set de facto param passed to timestamp function
        timeZone = args.localTimezone;

        // by not adding colors here and not setting 'colorize' in transports
        // when logNoColors === true, console output is fully stripped of color.
        if (!args.logNoColors) {
          _winston2['default'].addColors(colors);
        }

        context$1$0.t0 = _winston2['default'].Logger;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_createTransports(args));

      case 5:
        context$1$0.t1 = context$1$0.sent;
        context$1$0.t2 = {
          transports: context$1$0.t1
        };
        logger = new context$1$0.t0(context$1$0.t2);

        // Capture logs emitted via npmlog and pass them through winston
        _npmlog2['default'].on('log', function (logObj) {
          var winstonLevel = npmToWinstonLevels[logObj.level] || 'info';
          var msg = logObj.message;
          if (logObj.prefix) {
            var prefix = '[' + logObj.prefix + ']';
            msg = prefix.magenta + ' ' + msg;
          }
          logger[winstonLevel](msg);
        });

        logger.setLevels(levels);

        // 8/19/14 this is a hack to force Winston to print debug messages to stdout rather than stderr.
        // TODO: remove this if winston provides an API for directing streams.
        if (levels[logger.transports.console.level] === levels.debug) {
          logger.debug = function (msg) {
            logger.info('[debug] ' + msg);
          };
        }

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function clear() {
  if (logger) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(_lodash2['default'].keys(logger.transports)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var transport = _step.value;

        logger.remove(transport);
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
  _npmlog2['default'].removeAllListeners('log');
}

exports.init = init;
exports.clear = clear;
exports['default'] = init;

// --log-level arg can optionally provide diff logging levels for console and file, separated by a colon

// if we don't delete the log file, winston will always append and it will grow infinitely large;
// winston allows for limiting log file size, but as of 9.2.14 there's a serious bug when using
// maxFiles and maxSize together. https://github.com/flatiron/winston/issues/397
//# sourceMappingURL=data:application/json;base64,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QyxNQUFNLEVBQUU7QUFDakIsZ0JBQUksTUFBTSxTQUFPLE1BQU0sQ0FBQyxNQUFNLE1BQUcsQ0FBQztBQUNsQyxlQUFHLEdBQU0sTUFBTSxDQUFDLE9BQU8sU0FBSSxHQUFHLEFBQUUsQ0FBQztXQUNsQztBQUNELGdCQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0IsQ0FBQyxDQUFDOztBQUdILGNBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7QUFJekIsWUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssTUFBTSxDQUFDLEtBQUssRUFBRTtBQUM1RCxnQkFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsRUFBRTtBQUM1QixrQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7V0FDL0IsQ0FBQztTQUNIOzs7Ozs7O0NBQ0Y7O0FBRUQsU0FBUyxLQUFLLEdBQUk7QUFDaEIsTUFBSSxNQUFNLEVBQUU7Ozs7OztBQUNWLHdDQUFzQixvQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyw0R0FBRTtZQUF4QyxTQUFTOztBQUNoQixjQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQzFCOzs7Ozs7Ozs7Ozs7Ozs7R0FDRjtBQUNELHNCQUFPLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2xDOztRQUdRLElBQUksR0FBSixJQUFJO1FBQUUsS0FBSyxHQUFMLEtBQUs7cUJBQ0wsSUFBSSIsImZpbGUiOiJsaWIvbG9nc2luay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBucG1sb2cgZnJvbSAnbnBtbG9nJztcbmltcG9ydCB7IHBhdGNoTG9nZ2VyIH0gZnJvbSAnYXBwaXVtLWxvZ2dlcic7XG5pbXBvcnQgd2luc3RvbiAgZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCAnZGF0ZS11dGlscyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbi8vIHNldCB1cCBkaXN0cmlidXRlZCBsb2dnaW5nIGJlZm9yZSBldmVyeXRoaW5nIGVsc2VcbnBhdGNoTG9nZ2VyKG5wbWxvZyk7XG5nbG9iYWwuX2dsb2JhbF9ucG1sb2cgPSBucG1sb2c7XG5cbi8vIG5wbWxvZyBpcyB1c2VkIG9ubHkgZm9yIGVtaXR0aW5nLCB3ZSB1c2Ugd2luc3RvbiBmb3Igb3V0cHV0XG5ucG1sb2cubGV2ZWwgPSBcInNpbGVudFwiO1xuY29uc3QgbGV2ZWxzID0ge1xuICBkZWJ1ZzogNCxcbiAgaW5mbzogMyxcbiAgd2FybjogMixcbiAgZXJyb3I6IDEsXG59O1xuXG5jb25zdCBjb2xvcnMgPSB7XG4gIGluZm86ICdjeWFuJyxcbiAgZGVidWc6ICdncmV5JyxcbiAgd2FybjogJ3llbGxvdycsXG4gIGVycm9yOiAncmVkJyxcbn07XG5cbmNvbnN0IG5wbVRvV2luc3RvbkxldmVscyA9IHtcbiAgc2lsbHk6ICdkZWJ1ZycsXG4gIHZlcmJvc2U6ICdkZWJ1ZycsXG4gIGRlYnVnOiAnZGVidWcnLFxuICBpbmZvOiAnaW5mbycsXG4gIGh0dHA6ICdpbmZvJyxcbiAgd2FybjogJ3dhcm4nLFxuICBlcnJvcjogJ2Vycm9yJyxcbn07XG5cbmxldCBsb2dnZXIgPSBudWxsO1xubGV0IHRpbWVab25lID0gbnVsbDtcblxuZnVuY3Rpb24gdGltZXN0YW1wICgpIHtcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICBpZiAoIXRpbWVab25lKSB7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUudmFsdWVPZigpICsgZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApO1xuICB9XG4gIHJldHVybiBkYXRlLnRvRm9ybWF0KFwiWVlZWS1NTS1ERCBISDI0Ok1JOlNTOkxMXCIpO1xufVxuXG4vLyBTdHJpcCB0aGUgY29sb3IgbWFya2luZyB3aXRoaW4gbWVzc2FnZXMuXG4vLyBXZSBuZWVkIHRvIHBhdGNoIHRoZSB0cmFuc3BvcnRzLCBiZWNhdXNlIHRoZSBzdHJpcENvbG9yIGZ1bmN0aW9uYWxpdHkgaW5cbi8vIFdpbnN0b24gaXMgd3JvbmdseSBpbXBsZW1lbnRlZCBhdCB0aGUgbG9nZ2VyIGxldmVsLCBhbmQgd2Ugd2FudCB0byBhdm9pZFxuLy8gaGF2aW5nIHRvIGNyZWF0ZSAyIGxvZ2dlcnMuXG5mdW5jdGlvbiBhcHBseVN0cmlwQ29sb3JQYXRjaCAodHJhbnNwb3J0KSB7XG4gIGxldCBfbG9nID0gdHJhbnNwb3J0LmxvZy5iaW5kKHRyYW5zcG9ydCk7XG4gIHRyYW5zcG9ydC5sb2cgPSBmdW5jdGlvbiAobGV2ZWwsIG1zZywgbWV0YSwgY2FsbGJhY2spIHtcbiAgICBsZXQgY29kZSA9IC9cXHUwMDFiXFxbKFxcZCsoO1xcZCspKik/bS9nO1xuICAgIG1zZyA9ICgnJyArIG1zZykucmVwbGFjZShjb2RlLCAnJyk7XG4gICAgX2xvZyhsZXZlbCwgbXNnLCBtZXRhLCBjYWxsYmFjayk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDb25zb2xlVHJhbnNwb3J0IChhcmdzLCBsb2dMdmwpIHtcbiAgbGV0IHRyYW5zcG9ydCA9IG5ldyAod2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUpKHtcbiAgICBuYW1lOiBcImNvbnNvbGVcIixcbiAgICB0aW1lc3RhbXA6IGFyZ3MubG9nVGltZXN0YW1wID8gdGltZXN0YW1wIDogdW5kZWZpbmVkLFxuICAgIGNvbG9yaXplOiAhYXJncy5sb2dOb0NvbG9ycyxcbiAgICBoYW5kbGVFeGNlcHRpb25zOiB0cnVlLFxuICAgIGV4aXRPbkVycm9yOiBmYWxzZSxcbiAgICBqc29uOiBmYWxzZSxcbiAgICBsZXZlbDogbG9nTHZsLFxuICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgIGxldCBtZXRhID0gb3B0aW9ucy5tZXRhICYmIE9iamVjdC5rZXlzKG9wdGlvbnMubWV0YSkubGVuZ3RoID8gYFxcblxcdCR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucy5tZXRhKX1gIDogJyc7XG4gICAgICBsZXQgdGltZXN0YW1wUHJlZml4ID0gJyc7XG4gICAgICBpZiAob3B0aW9ucy50aW1lc3RhbXApIHtcbiAgICAgICAgdGltZXN0YW1wUHJlZml4ID0gYCR7b3B0aW9ucy50aW1lc3RhbXAoKX0gLSBgO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGAke3RpbWVzdGFtcFByZWZpeH0ke29wdGlvbnMubWVzc2FnZSB8fCAnJ30ke21ldGF9YDtcbiAgICB9XG4gIH0pO1xuICBpZiAoYXJncy5sb2dOb0NvbG9ycykge1xuICAgIGFwcGx5U3RyaXBDb2xvclBhdGNoKHRyYW5zcG9ydCk7XG4gIH1cbiAgcmV0dXJuIHRyYW5zcG9ydDtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUZpbGVUcmFuc3BvcnQgKGFyZ3MsIGxvZ0x2bCkge1xuICBsZXQgdHJhbnNwb3J0ID0gbmV3ICh3aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSkoe1xuICAgICAgbmFtZTogXCJmaWxlXCIsXG4gICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICAgIGZpbGVuYW1lOiBhcmdzLmxvZyxcbiAgICAgIG1heEZpbGVzOiAxLFxuICAgICAgaGFuZGxlRXhjZXB0aW9uczogdHJ1ZSxcbiAgICAgIGV4aXRPbkVycm9yOiBmYWxzZSxcbiAgICAgIGpzb246IGZhbHNlLFxuICAgICAgbGV2ZWw6IGxvZ0x2bCxcbiAgICB9XG4gICk7XG4gIGFwcGx5U3RyaXBDb2xvclBhdGNoKHRyYW5zcG9ydCk7XG4gIHJldHVybiB0cmFuc3BvcnQ7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVIdHRwVHJhbnNwb3J0IChhcmdzLCBsb2dMdmwpIHtcbiAgbGV0IGhvc3QgPSBudWxsLFxuICAgICAgcG9ydCA9IG51bGw7XG5cbiAgaWYgKGFyZ3Mud2ViaG9vay5tYXRjaCgnOicpKSB7XG4gICAgbGV0IGhvc3RBbmRQb3J0ID0gYXJncy53ZWJob29rLnNwbGl0KCc6Jyk7XG4gICAgaG9zdCA9IGhvc3RBbmRQb3J0WzBdO1xuICAgIHBvcnQgPSBwYXJzZUludChob3N0QW5kUG9ydFsxXSwgMTApO1xuICB9XG5cbiAgbGV0IHRyYW5zcG9ydCA9IG5ldyAod2luc3Rvbi50cmFuc3BvcnRzLkh0dHApKHtcbiAgICBuYW1lOiBcImh0dHBcIixcbiAgICBob3N0OiBob3N0IHx8ICcxMjcuMC4wLjEnLFxuICAgIHBvcnQ6IHBvcnQgfHwgOTAwMyxcbiAgICBwYXRoOiAnLycsXG4gICAgaGFuZGxlRXhjZXB0aW9uczogdHJ1ZSxcbiAgICBleGl0T25FcnJvcjogZmFsc2UsXG4gICAganNvbjogZmFsc2UsXG4gICAgbGV2ZWw6IGxvZ0x2bCxcbiAgfSk7XG4gIGFwcGx5U3RyaXBDb2xvclBhdGNoKHRyYW5zcG9ydCk7XG4gIHJldHVybiB0cmFuc3BvcnQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9jcmVhdGVUcmFuc3BvcnRzIChhcmdzKSB7XG4gIGxldCB0cmFuc3BvcnRzID0gW107XG4gIGxldCBjb25zb2xlTG9nTGV2ZWwgPSBudWxsO1xuICBsZXQgZmlsZUxvZ0xldmVsID0gbnVsbDtcblxuICBpZiAoYXJncy5sb2dsZXZlbCAmJiBhcmdzLmxvZ2xldmVsLm1hdGNoKFwiOlwiKSkge1xuICAgIC8vIC0tbG9nLWxldmVsIGFyZyBjYW4gb3B0aW9uYWxseSBwcm92aWRlIGRpZmYgbG9nZ2luZyBsZXZlbHMgZm9yIGNvbnNvbGUgYW5kIGZpbGUsIHNlcGFyYXRlZCBieSBhIGNvbG9uXG4gICAgbGV0IGx2bFBhaXIgPSBhcmdzLmxvZ2xldmVsLnNwbGl0KCc6Jyk7XG4gICAgY29uc29sZUxvZ0xldmVsID0gIGx2bFBhaXJbMF0gfHwgY29uc29sZUxvZ0xldmVsO1xuICAgIGZpbGVMb2dMZXZlbCA9IGx2bFBhaXJbMV0gfHwgZmlsZUxvZ0xldmVsO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGVMb2dMZXZlbCA9IGZpbGVMb2dMZXZlbCA9IGFyZ3MubG9nbGV2ZWw7XG4gIH1cblxuICB0cmFuc3BvcnRzLnB1c2goX2NyZWF0ZUNvbnNvbGVUcmFuc3BvcnQoYXJncywgY29uc29sZUxvZ0xldmVsKSk7XG5cbiAgaWYgKGFyZ3MubG9nKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGlmIHdlIGRvbid0IGRlbGV0ZSB0aGUgbG9nIGZpbGUsIHdpbnN0b24gd2lsbCBhbHdheXMgYXBwZW5kIGFuZCBpdCB3aWxsIGdyb3cgaW5maW5pdGVseSBsYXJnZTtcbiAgICAgIC8vIHdpbnN0b24gYWxsb3dzIGZvciBsaW1pdGluZyBsb2cgZmlsZSBzaXplLCBidXQgYXMgb2YgOS4yLjE0IHRoZXJlJ3MgYSBzZXJpb3VzIGJ1ZyB3aGVuIHVzaW5nXG4gICAgICAvLyBtYXhGaWxlcyBhbmQgbWF4U2l6ZSB0b2dldGhlci4gaHR0cHM6Ly9naXRodWIuY29tL2ZsYXRpcm9uL3dpbnN0b24vaXNzdWVzLzM5N1xuICAgICAgaWYgKGF3YWl0IGZzLmV4aXN0cyhhcmdzLmxvZykpIHtcbiAgICAgICAgYXdhaXQgZnMudW5saW5rKGFyZ3MubG9nKTtcbiAgICAgIH1cblxuICAgICAgdHJhbnNwb3J0cy5wdXNoKF9jcmVhdGVGaWxlVHJhbnNwb3J0KGFyZ3MsIGZpbGVMb2dMZXZlbCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBUcmllZCB0byBhdHRhY2ggbG9nZ2luZyB0byBmaWxlICR7YXJncy5sb2d9IGJ1dCBhbiBlcnJvciBgICtcbiAgICAgICAgICAgICAgICAgIGBvY2N1cnJlZDogJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFyZ3Mud2ViaG9vaykge1xuICAgIHRyeSB7XG4gICAgICB0cmFuc3BvcnRzLnB1c2goX2NyZWF0ZUh0dHBUcmFuc3BvcnQoYXJncywgZmlsZUxvZ0xldmVsKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coYFRyaWVkIHRvIGF0dGFjaCBsb2dnaW5nIHRvIEh0dHAgYXQgJHthcmdzLndlYmhvb2t9IGJ1dCBgICtcbiAgICAgICAgICAgICAgICAgIGBhbiBlcnJvciBvY2N1cnJlZDogJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRyYW5zcG9ydHM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXQgKGFyZ3MpIHtcbiAgLy8gc2V0IGRlIGZhY3RvIHBhcmFtIHBhc3NlZCB0byB0aW1lc3RhbXAgZnVuY3Rpb25cbiAgdGltZVpvbmUgPSBhcmdzLmxvY2FsVGltZXpvbmU7XG5cbiAgLy8gYnkgbm90IGFkZGluZyBjb2xvcnMgaGVyZSBhbmQgbm90IHNldHRpbmcgJ2NvbG9yaXplJyBpbiB0cmFuc3BvcnRzXG4gIC8vIHdoZW4gbG9nTm9Db2xvcnMgPT09IHRydWUsIGNvbnNvbGUgb3V0cHV0IGlzIGZ1bGx5IHN0cmlwcGVkIG9mIGNvbG9yLlxuICBpZiAoIWFyZ3MubG9nTm9Db2xvcnMpIHtcbiAgICB3aW5zdG9uLmFkZENvbG9ycyhjb2xvcnMpO1xuICB9XG5cbiAgbG9nZ2VyID0gbmV3ICh3aW5zdG9uLkxvZ2dlcikoe1xuICAgIHRyYW5zcG9ydHM6IGF3YWl0IF9jcmVhdGVUcmFuc3BvcnRzKGFyZ3MpXG4gIH0pO1xuXG4gIC8vIENhcHR1cmUgbG9ncyBlbWl0dGVkIHZpYSBucG1sb2cgYW5kIHBhc3MgdGhlbSB0aHJvdWdoIHdpbnN0b25cbiAgbnBtbG9nLm9uKCdsb2cnLCAobG9nT2JqKSA9PiB7XG4gICAgbGV0IHdpbnN0b25MZXZlbCA9IG5wbVRvV2luc3RvbkxldmVsc1tsb2dPYmoubGV2ZWxdIHx8ICdpbmZvJztcbiAgICBsZXQgbXNnID0gbG9nT2JqLm1lc3NhZ2U7XG4gICAgaWYgKGxvZ09iai5wcmVmaXgpIHtcbiAgICAgIGxldCBwcmVmaXggPSBgWyR7bG9nT2JqLnByZWZpeH1dYDtcbiAgICAgIG1zZyA9IGAke3ByZWZpeC5tYWdlbnRhfSAke21zZ31gO1xuICAgIH1cbiAgICBsb2dnZXJbd2luc3RvbkxldmVsXShtc2cpO1xuICB9KTtcblxuXG4gIGxvZ2dlci5zZXRMZXZlbHMobGV2ZWxzKTtcblxuICAvLyA4LzE5LzE0IHRoaXMgaXMgYSBoYWNrIHRvIGZvcmNlIFdpbnN0b24gdG8gcHJpbnQgZGVidWcgbWVzc2FnZXMgdG8gc3Rkb3V0IHJhdGhlciB0aGFuIHN0ZGVyci5cbiAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgaWYgd2luc3RvbiBwcm92aWRlcyBhbiBBUEkgZm9yIGRpcmVjdGluZyBzdHJlYW1zLlxuICBpZiAobGV2ZWxzW2xvZ2dlci50cmFuc3BvcnRzLmNvbnNvbGUubGV2ZWxdID09PSBsZXZlbHMuZGVidWcpIHtcbiAgICBsb2dnZXIuZGVidWcgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICBsb2dnZXIuaW5mbygnW2RlYnVnXSAnICsgbXNnKTtcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgaWYgKGxvZ2dlcikge1xuICAgIGZvciAobGV0IHRyYW5zcG9ydCBvZiBfLmtleXMobG9nZ2VyLnRyYW5zcG9ydHMpKSB7XG4gICAgICBsb2dnZXIucmVtb3ZlKHRyYW5zcG9ydCk7XG4gICAgfVxuICB9XG4gIG5wbWxvZy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2xvZycpO1xufVxuXG5cbmV4cG9ydCB7IGluaXQsIGNsZWFyIH07XG5leHBvcnQgZGVmYXVsdCBpbml0O1xuIl19