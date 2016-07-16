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
//# sourceMappingURL=data:application/json;base64,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QUMsTUFBTSxFQUFFO0FBQ2pCLGdCQUFJLE1BQU0sU0FBTyxNQUFNLENBQUMsTUFBTSxNQUFHLENBQUM7QUFDbEMsZUFBRyxHQUFNLE1BQU0sQ0FBQyxPQUFPLFNBQUksR0FBRyxBQUFFLENBQUM7V0FDbEM7QUFDRCxnQkFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCLENBQUMsQ0FBQzs7QUFHSCxjQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O0FBSXpCLFlBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUU7QUFDNUQsZ0JBQU0sQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUU7QUFDNUIsa0JBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1dBQy9CLENBQUM7U0FDSDs7Ozs7OztDQUNGOztBQUVELFNBQVMsS0FBSyxHQUFJO0FBQ2hCLE1BQUksTUFBTSxFQUFFOzs7Ozs7QUFDVix3Q0FBc0Isb0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsNEdBQUU7WUFBeEMsU0FBUzs7QUFDaEIsY0FBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztPQUMxQjs7Ozs7Ozs7Ozs7Ozs7O0dBQ0Y7QUFDRCxzQkFBTyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNsQzs7UUFHUSxJQUFJLEdBQUosSUFBSTtRQUFFLEtBQUssR0FBTCxLQUFLO3FCQUNMLElBQUkiLCJmaWxlIjoibGliXFxsb2dzaW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5wbWxvZyBmcm9tICducG1sb2cnO1xuaW1wb3J0IHsgcGF0Y2hMb2dnZXIgfSBmcm9tICdhcHBpdW0tbG9nZ2VyJztcbmltcG9ydCB3aW5zdG9uICBmcm9tICd3aW5zdG9uJztcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0ICdkYXRlLXV0aWxzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cblxuLy8gc2V0IHVwIGRpc3RyaWJ1dGVkIGxvZ2dpbmcgYmVmb3JlIGV2ZXJ5dGhpbmcgZWxzZVxucGF0Y2hMb2dnZXIobnBtbG9nKTtcbmdsb2JhbC5fZ2xvYmFsX25wbWxvZyA9IG5wbWxvZztcblxuLy8gbnBtbG9nIGlzIHVzZWQgb25seSBmb3IgZW1pdHRpbmcsIHdlIHVzZSB3aW5zdG9uIGZvciBvdXRwdXRcbm5wbWxvZy5sZXZlbCA9IFwic2lsZW50XCI7XG5jb25zdCBsZXZlbHMgPSB7XG4gIGRlYnVnOiA0LFxuICBpbmZvOiAzLFxuICB3YXJuOiAyLFxuICBlcnJvcjogMSxcbn07XG5cbmNvbnN0IGNvbG9ycyA9IHtcbiAgaW5mbzogJ2N5YW4nLFxuICBkZWJ1ZzogJ2dyZXknLFxuICB3YXJuOiAneWVsbG93JyxcbiAgZXJyb3I6ICdyZWQnLFxufTtcblxuY29uc3QgbnBtVG9XaW5zdG9uTGV2ZWxzID0ge1xuICBzaWxseTogJ2RlYnVnJyxcbiAgdmVyYm9zZTogJ2RlYnVnJyxcbiAgZGVidWc6ICdkZWJ1ZycsXG4gIGluZm86ICdpbmZvJyxcbiAgaHR0cDogJ2luZm8nLFxuICB3YXJuOiAnd2FybicsXG4gIGVycm9yOiAnZXJyb3InLFxufTtcblxubGV0IGxvZ2dlciA9IG51bGw7XG5sZXQgdGltZVpvbmUgPSBudWxsO1xuXG5mdW5jdGlvbiB0aW1lc3RhbXAgKCkge1xuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGlmICghdGltZVpvbmUpIHtcbiAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS52YWx1ZU9mKCkgKyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMCk7XG4gIH1cbiAgcmV0dXJuIGRhdGUudG9Gb3JtYXQoXCJZWVlZLU1NLUREIEhIMjQ6TUk6U1M6TExcIik7XG59XG5cbi8vIFN0cmlwIHRoZSBjb2xvciBtYXJraW5nIHdpdGhpbiBtZXNzYWdlcy5cbi8vIFdlIG5lZWQgdG8gcGF0Y2ggdGhlIHRyYW5zcG9ydHMsIGJlY2F1c2UgdGhlIHN0cmlwQ29sb3IgZnVuY3Rpb25hbGl0eSBpblxuLy8gV2luc3RvbiBpcyB3cm9uZ2x5IGltcGxlbWVudGVkIGF0IHRoZSBsb2dnZXIgbGV2ZWwsIGFuZCB3ZSB3YW50IHRvIGF2b2lkXG4vLyBoYXZpbmcgdG8gY3JlYXRlIDIgbG9nZ2Vycy5cbmZ1bmN0aW9uIGFwcGx5U3RyaXBDb2xvclBhdGNoICh0cmFuc3BvcnQpIHtcbiAgbGV0IF9sb2cgPSB0cmFuc3BvcnQubG9nLmJpbmQodHJhbnNwb3J0KTtcbiAgdHJhbnNwb3J0LmxvZyA9IGZ1bmN0aW9uIChsZXZlbCwgbXNnLCBtZXRhLCBjYWxsYmFjaykge1xuICAgIGxldCBjb2RlID0gL1xcdTAwMWJcXFsoXFxkKyg7XFxkKykqKT9tL2c7XG4gICAgbXNnID0gKCcnICsgbXNnKS5yZXBsYWNlKGNvZGUsICcnKTtcbiAgICBfbG9nKGxldmVsLCBtc2csIG1ldGEsIGNhbGxiYWNrKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNvbnNvbGVUcmFuc3BvcnQgKGFyZ3MsIGxvZ0x2bCkge1xuICBsZXQgdHJhbnNwb3J0ID0gbmV3ICh3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSkoe1xuICAgIG5hbWU6IFwiY29uc29sZVwiLFxuICAgIHRpbWVzdGFtcDogYXJncy5sb2dUaW1lc3RhbXAgPyB0aW1lc3RhbXAgOiB1bmRlZmluZWQsXG4gICAgY29sb3JpemU6ICFhcmdzLmxvZ05vQ29sb3JzLFxuICAgIGhhbmRsZUV4Y2VwdGlvbnM6IHRydWUsXG4gICAgZXhpdE9uRXJyb3I6IGZhbHNlLFxuICAgIGpzb246IGZhbHNlLFxuICAgIGxldmVsOiBsb2dMdmwsXG4gICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgbGV0IG1ldGEgPSBvcHRpb25zLm1ldGEgJiYgT2JqZWN0LmtleXMob3B0aW9ucy5tZXRhKS5sZW5ndGggPyBgXFxuXFx0JHtKU09OLnN0cmluZ2lmeShvcHRpb25zLm1ldGEpfWAgOiAnJztcbiAgICAgIGxldCB0aW1lc3RhbXBQcmVmaXggPSAnJztcbiAgICAgIGlmIChvcHRpb25zLnRpbWVzdGFtcCkge1xuICAgICAgICB0aW1lc3RhbXBQcmVmaXggPSBgJHtvcHRpb25zLnRpbWVzdGFtcCgpfSAtIGA7XG4gICAgICB9XG4gICAgICByZXR1cm4gYCR7dGltZXN0YW1wUHJlZml4fSR7b3B0aW9ucy5tZXNzYWdlIHx8ICcnfSR7bWV0YX1gO1xuICAgIH1cbiAgfSk7XG4gIGlmIChhcmdzLmxvZ05vQ29sb3JzKSB7XG4gICAgYXBwbHlTdHJpcENvbG9yUGF0Y2godHJhbnNwb3J0KTtcbiAgfVxuICByZXR1cm4gdHJhbnNwb3J0O1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlRmlsZVRyYW5zcG9ydCAoYXJncywgbG9nTHZsKSB7XG4gIGxldCB0cmFuc3BvcnQgPSBuZXcgKHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKSh7XG4gICAgICBuYW1lOiBcImZpbGVcIixcbiAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgICAgZmlsZW5hbWU6IGFyZ3MubG9nLFxuICAgICAgbWF4RmlsZXM6IDEsXG4gICAgICBoYW5kbGVFeGNlcHRpb25zOiB0cnVlLFxuICAgICAgZXhpdE9uRXJyb3I6IGZhbHNlLFxuICAgICAganNvbjogZmFsc2UsXG4gICAgICBsZXZlbDogbG9nTHZsLFxuICAgIH1cbiAgKTtcbiAgYXBwbHlTdHJpcENvbG9yUGF0Y2godHJhbnNwb3J0KTtcbiAgcmV0dXJuIHRyYW5zcG9ydDtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUh0dHBUcmFuc3BvcnQgKGFyZ3MsIGxvZ0x2bCkge1xuICBsZXQgaG9zdCA9IG51bGwsXG4gICAgICBwb3J0ID0gbnVsbDtcblxuICBpZiAoYXJncy53ZWJob29rLm1hdGNoKCc6JykpIHtcbiAgICBsZXQgaG9zdEFuZFBvcnQgPSBhcmdzLndlYmhvb2suc3BsaXQoJzonKTtcbiAgICBob3N0ID0gaG9zdEFuZFBvcnRbMF07XG4gICAgcG9ydCA9IHBhcnNlSW50KGhvc3RBbmRQb3J0WzFdLCAxMCk7XG4gIH1cblxuICBsZXQgdHJhbnNwb3J0ID0gbmV3ICh3aW5zdG9uLnRyYW5zcG9ydHMuSHR0cCkoe1xuICAgIG5hbWU6IFwiaHR0cFwiLFxuICAgIGhvc3Q6IGhvc3QgfHwgJzEyNy4wLjAuMScsXG4gICAgcG9ydDogcG9ydCB8fCA5MDAzLFxuICAgIHBhdGg6ICcvJyxcbiAgICBoYW5kbGVFeGNlcHRpb25zOiB0cnVlLFxuICAgIGV4aXRPbkVycm9yOiBmYWxzZSxcbiAgICBqc29uOiBmYWxzZSxcbiAgICBsZXZlbDogbG9nTHZsLFxuICB9KTtcbiAgYXBwbHlTdHJpcENvbG9yUGF0Y2godHJhbnNwb3J0KTtcbiAgcmV0dXJuIHRyYW5zcG9ydDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2NyZWF0ZVRyYW5zcG9ydHMgKGFyZ3MpIHtcbiAgbGV0IHRyYW5zcG9ydHMgPSBbXTtcbiAgbGV0IGNvbnNvbGVMb2dMZXZlbCA9IG51bGw7XG4gIGxldCBmaWxlTG9nTGV2ZWwgPSBudWxsO1xuXG4gIGlmIChhcmdzLmxvZ2xldmVsICYmIGFyZ3MubG9nbGV2ZWwubWF0Y2goXCI6XCIpKSB7XG4gICAgLy8gLS1sb2ctbGV2ZWwgYXJnIGNhbiBvcHRpb25hbGx5IHByb3ZpZGUgZGlmZiBsb2dnaW5nIGxldmVscyBmb3IgY29uc29sZSBhbmQgZmlsZSwgc2VwYXJhdGVkIGJ5IGEgY29sb25cbiAgICBsZXQgbHZsUGFpciA9IGFyZ3MubG9nbGV2ZWwuc3BsaXQoJzonKTtcbiAgICBjb25zb2xlTG9nTGV2ZWwgPSAgbHZsUGFpclswXSB8fCBjb25zb2xlTG9nTGV2ZWw7XG4gICAgZmlsZUxvZ0xldmVsID0gbHZsUGFpclsxXSB8fCBmaWxlTG9nTGV2ZWw7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZUxvZ0xldmVsID0gZmlsZUxvZ0xldmVsID0gYXJncy5sb2dsZXZlbDtcbiAgfVxuXG4gIHRyYW5zcG9ydHMucHVzaChfY3JlYXRlQ29uc29sZVRyYW5zcG9ydChhcmdzLCBjb25zb2xlTG9nTGV2ZWwpKTtcblxuICBpZiAoYXJncy5sb2cpIHtcbiAgICB0cnkge1xuICAgICAgLy8gaWYgd2UgZG9uJ3QgZGVsZXRlIHRoZSBsb2cgZmlsZSwgd2luc3RvbiB3aWxsIGFsd2F5cyBhcHBlbmQgYW5kIGl0IHdpbGwgZ3JvdyBpbmZpbml0ZWx5IGxhcmdlO1xuICAgICAgLy8gd2luc3RvbiBhbGxvd3MgZm9yIGxpbWl0aW5nIGxvZyBmaWxlIHNpemUsIGJ1dCBhcyBvZiA5LjIuMTQgdGhlcmUncyBhIHNlcmlvdXMgYnVnIHdoZW4gdXNpbmdcbiAgICAgIC8vIG1heEZpbGVzIGFuZCBtYXhTaXplIHRvZ2V0aGVyLiBodHRwczovL2dpdGh1Yi5jb20vZmxhdGlyb24vd2luc3Rvbi9pc3N1ZXMvMzk3XG4gICAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKGFyZ3MubG9nKSkge1xuICAgICAgICBhd2FpdCBmcy51bmxpbmsoYXJncy5sb2cpO1xuICAgICAgfVxuXG4gICAgICB0cmFuc3BvcnRzLnB1c2goX2NyZWF0ZUZpbGVUcmFuc3BvcnQoYXJncywgZmlsZUxvZ0xldmVsKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coYFRyaWVkIHRvIGF0dGFjaCBsb2dnaW5nIHRvIGZpbGUgJHthcmdzLmxvZ30gYnV0IGFuIGVycm9yIGAgK1xuICAgICAgICAgICAgICAgICAgYG9jY3VycmVkOiAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXJncy53ZWJob29rKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRyYW5zcG9ydHMucHVzaChfY3JlYXRlSHR0cFRyYW5zcG9ydChhcmdzLCBmaWxlTG9nTGV2ZWwpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhgVHJpZWQgdG8gYXR0YWNoIGxvZ2dpbmcgdG8gSHR0cCBhdCAke2FyZ3Mud2ViaG9va30gYnV0IGAgK1xuICAgICAgICAgICAgICAgICAgYGFuIGVycm9yIG9jY3VycmVkOiAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJhbnNwb3J0cztcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5pdCAoYXJncykge1xuICAvLyBzZXQgZGUgZmFjdG8gcGFyYW0gcGFzc2VkIHRvIHRpbWVzdGFtcCBmdW5jdGlvblxuICB0aW1lWm9uZSA9IGFyZ3MubG9jYWxUaW1lem9uZTtcblxuICAvLyBieSBub3QgYWRkaW5nIGNvbG9ycyBoZXJlIGFuZCBub3Qgc2V0dGluZyAnY29sb3JpemUnIGluIHRyYW5zcG9ydHNcbiAgLy8gd2hlbiBsb2dOb0NvbG9ycyA9PT0gdHJ1ZSwgY29uc29sZSBvdXRwdXQgaXMgZnVsbHkgc3RyaXBwZWQgb2YgY29sb3IuXG4gIGlmICghYXJncy5sb2dOb0NvbG9ycykge1xuICAgIHdpbnN0b24uYWRkQ29sb3JzKGNvbG9ycyk7XG4gIH1cblxuICBsb2dnZXIgPSBuZXcgKHdpbnN0b24uTG9nZ2VyKSh7XG4gICAgdHJhbnNwb3J0czogYXdhaXQgX2NyZWF0ZVRyYW5zcG9ydHMoYXJncylcbiAgfSk7XG5cbiAgLy8gQ2FwdHVyZSBsb2dzIGVtaXR0ZWQgdmlhIG5wbWxvZyBhbmQgcGFzcyB0aGVtIHRocm91Z2ggd2luc3RvblxuICBucG1sb2cub24oJ2xvZycsIChsb2dPYmopID0+IHtcbiAgICBsZXQgd2luc3RvbkxldmVsID0gbnBtVG9XaW5zdG9uTGV2ZWxzW2xvZ09iai5sZXZlbF0gfHwgJ2luZm8nO1xuICAgIGxldCBtc2cgPSBsb2dPYmoubWVzc2FnZTtcbiAgICBpZiAobG9nT2JqLnByZWZpeCkge1xuICAgICAgbGV0IHByZWZpeCA9IGBbJHtsb2dPYmoucHJlZml4fV1gO1xuICAgICAgbXNnID0gYCR7cHJlZml4Lm1hZ2VudGF9ICR7bXNnfWA7XG4gICAgfVxuICAgIGxvZ2dlclt3aW5zdG9uTGV2ZWxdKG1zZyk7XG4gIH0pO1xuXG5cbiAgbG9nZ2VyLnNldExldmVscyhsZXZlbHMpO1xuXG4gIC8vIDgvMTkvMTQgdGhpcyBpcyBhIGhhY2sgdG8gZm9yY2UgV2luc3RvbiB0byBwcmludCBkZWJ1ZyBtZXNzYWdlcyB0byBzdGRvdXQgcmF0aGVyIHRoYW4gc3RkZXJyLlxuICAvLyBUT0RPOiByZW1vdmUgdGhpcyBpZiB3aW5zdG9uIHByb3ZpZGVzIGFuIEFQSSBmb3IgZGlyZWN0aW5nIHN0cmVhbXMuXG4gIGlmIChsZXZlbHNbbG9nZ2VyLnRyYW5zcG9ydHMuY29uc29sZS5sZXZlbF0gPT09IGxldmVscy5kZWJ1Zykge1xuICAgIGxvZ2dlci5kZWJ1ZyA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgIGxvZ2dlci5pbmZvKCdbZGVidWddICcgKyBtc2cpO1xuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXIgKCkge1xuICBpZiAobG9nZ2VyKSB7XG4gICAgZm9yIChsZXQgdHJhbnNwb3J0IG9mIF8ua2V5cyhsb2dnZXIudHJhbnNwb3J0cykpIHtcbiAgICAgIGxvZ2dlci5yZW1vdmUodHJhbnNwb3J0KTtcbiAgICB9XG4gIH1cbiAgbnBtbG9nLnJlbW92ZUFsbExpc3RlbmVycygnbG9nJyk7XG59XG5cblxuZXhwb3J0IHsgaW5pdCwgY2xlYXIgfTtcbmV4cG9ydCBkZWZhdWx0IGluaXQ7XG4iXX0=