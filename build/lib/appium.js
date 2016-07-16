'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('./config');

var _appiumBaseDriver = require('appium-base-driver');

var _appiumFakeDriver = require('appium-fake-driver');

var _appiumAndroidDriver = require('appium-android-driver');

var _appiumIosDriver = require('appium-ios-driver');

var _appiumSelendroidDriver = require('appium-selendroid-driver');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var AppiumDriver = (function (_BaseDriver) {
  _inherits(AppiumDriver, _BaseDriver);

  function AppiumDriver(args) {
    _classCallCheck(this, AppiumDriver);

    _get(Object.getPrototypeOf(AppiumDriver.prototype), 'constructor', this).call(this);

    // the main Appium Driver has no new command timeout
    this.newCommandTimeoutMs = 0;

    this.args = args;

    this.sessions = {};
  }

  // help decide which commands should be proxied to sub-drivers and which
  // should be handled by this, our umbrella driver

  _createClass(AppiumDriver, [{
    key: 'sessionExists',
    value: function sessionExists(sessionId) {
      return _lodash2['default'].includes(_lodash2['default'].keys(this.sessions), sessionId) && this.sessions[sessionId].sessionId !== null;
    }
  }, {
    key: 'driverForSession',
    value: function driverForSession(sessionId) {
      return this.sessions[sessionId];
    }
  }, {
    key: 'getDriverForCaps',
    value: function getDriverForCaps(caps) {
      // TODO if this logic ever becomes complex, should probably factor out
      // into its own file
      if (!caps.platformName || !_lodash2['default'].isString(caps.platformName)) {
        throw new Error("You must include a platformName capability");
      }

      // we don't necessarily have an `automationName` capability,
      // but if we do and it is 'Selendroid', act on it
      if ((caps.automationName || '').toLowerCase() === 'selendroid') {
        return _appiumSelendroidDriver.SelendroidDriver;
      }

      if (caps.platformName.toLowerCase() === "fake") {
        return _appiumFakeDriver.FakeDriver;
      }

      if (caps.platformName.toLowerCase() === 'android') {
        return _appiumAndroidDriver.AndroidDriver;
      }

      if (caps.platformName.toLowerCase() === 'ios') {
        return _appiumIosDriver.IosDriver;
      }

      var msg = undefined;
      if (caps.automationName) {
        msg = 'Could not find a driver for automationName \'' + caps.automationName + '\' and platformName ' + ('\'' + caps.platformName + '\'.');
      } else {
        msg = 'Could not find a driver for platformName \'' + caps.platformName + '\'.';
      }
      throw new Error(msg + ' Please check your desired capabilities.');
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      var config, gitSha, status;
      return _regeneratorRuntime.async(function getStatus$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap((0, _config.getAppiumConfig)());

          case 2:
            config = context$2$0.sent;
            gitSha = config['git-sha'];
            status = { build: { version: config.version } };

            if (typeof gitSha !== "undefined") {
              status.build.revision = gitSha;
            }
            return context$2$0.abrupt('return', status);

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getSessions',
    value: function getSessions() {
      var sessions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, id, driver;

      return _regeneratorRuntime.async(function getSessions$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            sessions = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 4;

            for (_iterator = _getIterator(_lodash2['default'].toPairs(this.sessions)); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _step$value = _slicedToArray(_step.value, 2);
              id = _step$value[0];
              driver = _step$value[1];

              sessions.push({ id: id, capabilities: driver.caps });
            }
            context$2$0.next = 12;
            break;

          case 8:
            context$2$0.prev = 8;
            context$2$0.t0 = context$2$0['catch'](4);
            _didIteratorError = true;
            _iteratorError = context$2$0.t0;

          case 12:
            context$2$0.prev = 12;
            context$2$0.prev = 13;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 15:
            context$2$0.prev = 15;

            if (!_didIteratorError) {
              context$2$0.next = 18;
              break;
            }

            throw _iteratorError;

          case 18:
            return context$2$0.finish(15);

          case 19:
            return context$2$0.finish(12);

          case 20:
            return context$2$0.abrupt('return', sessions);

          case 21:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[4, 8, 12, 20], [13,, 15, 19]]);
    }
  }, {
    key: 'createSession',
    value: function createSession(caps, reqCaps) {
      var InnerDriver, curSessions, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, cap, value, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, id, d, _ref, _ref2, innerSessionId, dCaps;

      return _regeneratorRuntime.async(function createSession$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            caps = _lodash2['default'].defaults(_lodash2['default'].clone(caps), this.args.defaultCapabilities);
            InnerDriver = this.getDriverForCaps(caps);
            curSessions = undefined;

            _logger2['default'].info('Creating new ' + InnerDriver.name + ' session');
            _logger2['default'].info('Capabilities:');
            _util2['default'].inspect(caps);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$2$0.prev = 9;
            for (_iterator2 = _getIterator(_lodash2['default'].toPairs(caps)); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _step2$value = _slicedToArray(_step2.value, 2);
              cap = _step2$value[0];
              value = _step2$value[1];

              _logger2['default'].info('  ' + cap + ': ' + _util2['default'].inspect(value));
            }

            // sessionOverride server flag check
            // this will need to be re-thought when we go to multiple session support
            context$2$0.next = 17;
            break;

          case 13:
            context$2$0.prev = 13;
            context$2$0.t0 = context$2$0['catch'](9);
            _didIteratorError2 = true;
            _iteratorError2 = context$2$0.t0;

          case 17:
            context$2$0.prev = 17;
            context$2$0.prev = 18;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 20:
            context$2$0.prev = 20;

            if (!_didIteratorError2) {
              context$2$0.next = 23;
              break;
            }

            throw _iteratorError2;

          case 23:
            return context$2$0.finish(20);

          case 24:
            return context$2$0.finish(17);

          case 25:
            if (!(this.args.sessionOverride && !!this.sessions && _lodash2['default'].keys(this.sessions).length > 0)) {
              context$2$0.next = 59;
              break;
            }

            _logger2['default'].info('Session override is on. Deleting other sessions.');
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            context$2$0.prev = 30;
            _iterator3 = _getIterator(_lodash2['default'].keys(this.sessions));

          case 32:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              context$2$0.next = 45;
              break;
            }

            id = _step3.value;

            _logger2['default'].info('    Deleting session \'' + id + '\'');
            context$2$0.prev = 35;
            context$2$0.next = 38;
            return _regeneratorRuntime.awrap(this.deleteSession(id));

          case 38:
            context$2$0.next = 42;
            break;

          case 40:
            context$2$0.prev = 40;
            context$2$0.t1 = context$2$0['catch'](35);

          case 42:
            _iteratorNormalCompletion3 = true;
            context$2$0.next = 32;
            break;

          case 45:
            context$2$0.next = 51;
            break;

          case 47:
            context$2$0.prev = 47;
            context$2$0.t2 = context$2$0['catch'](30);
            _didIteratorError3 = true;
            _iteratorError3 = context$2$0.t2;

          case 51:
            context$2$0.prev = 51;
            context$2$0.prev = 52;

            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }

          case 54:
            context$2$0.prev = 54;

            if (!_didIteratorError3) {
              context$2$0.next = 57;
              break;
            }

            throw _iteratorError3;

          case 57:
            return context$2$0.finish(54);

          case 58:
            return context$2$0.finish(51);

          case 59:
            context$2$0.prev = 59;

            curSessions = this.curSessionDataForDriver(InnerDriver);
            context$2$0.next = 66;
            break;

          case 63:
            context$2$0.prev = 63;
            context$2$0.t3 = context$2$0['catch'](59);
            throw new _appiumBaseDriver.errors.SessionNotCreatedError(context$2$0.t3.message);

          case 66:
            d = new InnerDriver(this.args);
            context$2$0.next = 69;
            return _regeneratorRuntime.awrap(d.createSession(caps, reqCaps, curSessions));

          case 69:
            _ref = context$2$0.sent;
            _ref2 = _slicedToArray(_ref, 2);
            innerSessionId = _ref2[0];
            dCaps = _ref2[1];

            this.sessions[innerSessionId] = d;

            // Remove the session on unexpected shutdown, so that we are in a position
            // to open another session later on.
            // TODO: this should be removed and replaced by a onShutdown callback.
            d.onUnexpectedShutdown.then(function () {
              throw new Error('Unexpected shutdown');
            })['catch'](_bluebird2['default'].CancellationError, function () {})['catch'](function (err) {
              _logger2['default'].warn('Closing session, cause was \'' + err.message + '\'');
              _logger2['default'].info('Removing session ' + innerSessionId + ' from our master session list');
              delete _this.sessions[innerSessionId];
            }).done();

            _logger2['default'].info('New ' + InnerDriver.name + ' session created successfully, session ' + (innerSessionId + ' added to master session list'));

            // set the New Command Timeout for the inner driver
            d.startNewCommandTimeout();

            return context$2$0.abrupt('return', [innerSessionId, dCaps]);

          case 78:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[9, 13, 17, 25], [18,, 20, 24], [30, 47, 51, 59], [35, 40], [52,, 54, 58], [59, 63]]);
    }
  }, {
    key: 'curSessionDataForDriver',
    value: function curSessionDataForDriver(InnerDriver) {
      var data = _lodash2['default'].values(this.sessions).filter(function (s) {
        return s.constructor.name === InnerDriver.name;
      }).map(function (s) {
        return s.driverData;
      });
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _getIterator(data), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var datum = _step4.value;

          if (!datum) {
            throw new Error('Problem getting session data for driver type ' + (InnerDriver.name + '; does it implement \'get ') + 'driverData\'?');
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

      return data;
    }
  }, {
    key: 'deleteSession',
    value: function deleteSession(sessionId) {
      return _regeneratorRuntime.async(function deleteSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;

            if (!this.sessions[sessionId]) {
              context$2$0.next = 4;
              break;
            }

            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.sessions[sessionId].deleteSession());

          case 4:
            context$2$0.next = 10;
            break;

          case 6:
            context$2$0.prev = 6;
            context$2$0.t0 = context$2$0['catch'](0);

            _logger2['default'].error('Had trouble ending session ' + sessionId + ': ' + context$2$0.t0.message);
            throw context$2$0.t0;

          case 10:
            context$2$0.prev = 10;

            // regardless of whether the deleteSession completes successfully or not
            // make the session unavailable, because who knows what state it might
            // be in otherwise
            _logger2['default'].info('Removing session ' + sessionId + ' from our master session list');
            delete this.sessions[sessionId];
            return context$2$0.finish(10);

          case 14:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 6, 10, 14]]);
    }
  }, {
    key: 'executeCommand',
    value: function executeCommand(cmd) {
      var _sessions$sessionId;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _get2, sessionId;

      return _regeneratorRuntime.async(function executeCommand$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!isAppiumDriverCommand(cmd)) {
              context$2$0.next = 2;
              break;
            }

            return context$2$0.abrupt('return', (_get2 = _get(Object.getPrototypeOf(AppiumDriver.prototype), 'executeCommand', this)).call.apply(_get2, [this, cmd].concat(args)));

          case 2:
            sessionId = args[args.length - 1];
            return context$2$0.abrupt('return', (_sessions$sessionId = this.sessions[sessionId]).executeCommand.apply(_sessions$sessionId, [cmd].concat(args)));

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive(sessionId) {
      return this.sessions[sessionId] && _lodash2['default'].isFunction(this.sessions[sessionId].proxyActive) && this.sessions[sessionId].proxyActive(sessionId);
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList(sessionId) {
      if (!this.sessions[sessionId]) {
        return [];
      }
      return this.sessions[sessionId].getProxyAvoidList();
    }
  }, {
    key: 'canProxy',
    value: function canProxy(sessionId) {
      return this.sessions[sessionId] && this.sessions[sessionId].canProxy(sessionId);
    }
  }]);

  return AppiumDriver;
})(_appiumBaseDriver.BaseDriver);

function isAppiumDriverCommand(cmd) {
  return !(0, _appiumBaseDriver.isSessionCommand)(cmd) || cmd === "deleteSession";
}

function getAppiumRouter(args) {
  var appium = new AppiumDriver(args);
  return (0, _appiumBaseDriver.routeConfiguringFunction)(appium);
}

exports.AppiumDriver = AppiumDriver;
exports.getAppiumRouter = getAppiumRouter;
exports['default'] = getAppiumRouter;

// the error has already been logged in AppiumDriver.deleteSession
// continue
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxTQUFPLGdEQUF5QixNQUFNLENBQUMsQ0FBQztDQUN6Qzs7UUFFUSxZQUFZLEdBQVosWUFBWTtRQUFFLGVBQWUsR0FBZixlQUFlO3FCQUN2QixlQUFlIiwiZmlsZSI6ImxpYlxcYXBwaXVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgZ2V0QXBwaXVtQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgQmFzZURyaXZlciwgcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uLCBlcnJvcnMsXG4gICAgICAgICBpc1Nlc3Npb25Db21tYW5kIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcbmltcG9ydCB7IEZha2VEcml2ZXIgfSBmcm9tICdhcHBpdW0tZmFrZS1kcml2ZXInO1xuaW1wb3J0IHsgQW5kcm9pZERyaXZlciB9IGZyb20gJ2FwcGl1bS1hbmRyb2lkLWRyaXZlcic7XG5pbXBvcnQgeyBJb3NEcml2ZXIgfSBmcm9tICdhcHBpdW0taW9zLWRyaXZlcic7XG5pbXBvcnQgeyBTZWxlbmRyb2lkRHJpdmVyIH0gZnJvbSAnYXBwaXVtLXNlbGVuZHJvaWQtZHJpdmVyJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuXG5cbmNsYXNzIEFwcGl1bURyaXZlciBleHRlbmRzIEJhc2VEcml2ZXIge1xuICBjb25zdHJ1Y3RvciAoYXJncykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyB0aGUgbWFpbiBBcHBpdW0gRHJpdmVyIGhhcyBubyBuZXcgY29tbWFuZCB0aW1lb3V0XG4gICAgdGhpcy5uZXdDb21tYW5kVGltZW91dE1zID0gMDtcblxuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG5cbiAgICB0aGlzLnNlc3Npb25zID0ge307XG4gIH1cblxuICBzZXNzaW9uRXhpc3RzIChzZXNzaW9uSWQpIHtcbiAgICByZXR1cm4gXy5pbmNsdWRlcyhfLmtleXModGhpcy5zZXNzaW9ucyksIHNlc3Npb25JZCkgJiZcbiAgICAgICAgICAgdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdLnNlc3Npb25JZCAhPT0gbnVsbDtcbiAgfVxuXG4gIGRyaXZlckZvclNlc3Npb24gKHNlc3Npb25JZCkge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF07XG4gIH1cblxuICBnZXREcml2ZXJGb3JDYXBzIChjYXBzKSB7XG4gICAgLy8gVE9ETyBpZiB0aGlzIGxvZ2ljIGV2ZXIgYmVjb21lcyBjb21wbGV4LCBzaG91bGQgcHJvYmFibHkgZmFjdG9yIG91dFxuICAgIC8vIGludG8gaXRzIG93biBmaWxlXG4gICAgaWYgKCFjYXBzLnBsYXRmb3JtTmFtZSB8fCAhXy5pc1N0cmluZyhjYXBzLnBsYXRmb3JtTmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBtdXN0IGluY2x1ZGUgYSBwbGF0Zm9ybU5hbWUgY2FwYWJpbGl0eVwiKTtcbiAgICB9XG5cbiAgICAvLyB3ZSBkb24ndCBuZWNlc3NhcmlseSBoYXZlIGFuIGBhdXRvbWF0aW9uTmFtZWAgY2FwYWJpbGl0eSxcbiAgICAvLyBidXQgaWYgd2UgZG8gYW5kIGl0IGlzICdTZWxlbmRyb2lkJywgYWN0IG9uIGl0XG4gICAgaWYgKChjYXBzLmF1dG9tYXRpb25OYW1lIHx8ICcnKS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZW5kcm9pZCcpIHtcbiAgICAgIHJldHVybiBTZWxlbmRyb2lkRHJpdmVyO1xuICAgIH1cblxuICAgIGlmIChjYXBzLnBsYXRmb3JtTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImZha2VcIikge1xuICAgICAgcmV0dXJuIEZha2VEcml2ZXI7XG4gICAgfVxuXG4gICAgaWYgKGNhcHMucGxhdGZvcm1OYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhbmRyb2lkJykge1xuICAgICAgcmV0dXJuIEFuZHJvaWREcml2ZXI7XG4gICAgfVxuXG4gICAgaWYgKGNhcHMucGxhdGZvcm1OYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpb3MnKSB7XG4gICAgICByZXR1cm4gSW9zRHJpdmVyO1xuICAgIH1cblxuICAgIGxldCBtc2c7XG4gICAgaWYgKGNhcHMuYXV0b21hdGlvbk5hbWUpIHtcbiAgICAgIG1zZyA9IGBDb3VsZCBub3QgZmluZCBhIGRyaXZlciBmb3IgYXV0b21hdGlvbk5hbWUgJyR7Y2Fwcy5hdXRvbWF0aW9uTmFtZX0nIGFuZCBwbGF0Zm9ybU5hbWUgYCArXG4gICAgICAgICAgICBgJyR7Y2Fwcy5wbGF0Zm9ybU5hbWV9Jy5gO1xuICAgIH0gZWxzZSB7XG4gICAgICBtc2cgPSBgQ291bGQgbm90IGZpbmQgYSBkcml2ZXIgZm9yIHBsYXRmb3JtTmFtZSAnJHtjYXBzLnBsYXRmb3JtTmFtZX0nLmA7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgJHttc2d9IFBsZWFzZSBjaGVjayB5b3VyIGRlc2lyZWQgY2FwYWJpbGl0aWVzLmApO1xuICB9XG5cbiAgYXN5bmMgZ2V0U3RhdHVzICgpIHtcbiAgICBsZXQgY29uZmlnID0gYXdhaXQgZ2V0QXBwaXVtQ29uZmlnKCk7XG4gICAgbGV0IGdpdFNoYSA9IGNvbmZpZ1snZ2l0LXNoYSddO1xuICAgIGxldCBzdGF0dXMgPSB7YnVpbGQ6IHt2ZXJzaW9uOiBjb25maWcudmVyc2lvbn19O1xuICAgIGlmICh0eXBlb2YgZ2l0U2hhICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBzdGF0dXMuYnVpbGQucmV2aXNpb24gPSBnaXRTaGE7XG4gICAgfVxuICAgIHJldHVybiBzdGF0dXM7XG4gIH1cblxuICBhc3luYyBnZXRTZXNzaW9ucyAoKSB7XG4gICAgbGV0IHNlc3Npb25zID0gW107XG4gICAgZm9yIChsZXQgW2lkLCBkcml2ZXJdIG9mIF8udG9QYWlycyh0aGlzLnNlc3Npb25zKSkge1xuICAgICAgc2Vzc2lvbnMucHVzaCh7aWQ6IGlkLCBjYXBhYmlsaXRpZXM6IGRyaXZlci5jYXBzfSk7XG4gICAgfVxuICAgIHJldHVybiBzZXNzaW9ucztcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb24gKGNhcHMsIHJlcUNhcHMpIHtcbiAgICBjYXBzID0gXy5kZWZhdWx0cyhfLmNsb25lKGNhcHMpLCB0aGlzLmFyZ3MuZGVmYXVsdENhcGFiaWxpdGllcyk7XG4gICAgbGV0IElubmVyRHJpdmVyID0gdGhpcy5nZXREcml2ZXJGb3JDYXBzKGNhcHMpO1xuICAgIGxldCBjdXJTZXNzaW9ucztcbiAgICBsb2cuaW5mbyhgQ3JlYXRpbmcgbmV3ICR7SW5uZXJEcml2ZXIubmFtZX0gc2Vzc2lvbmApO1xuICAgIGxvZy5pbmZvKCdDYXBhYmlsaXRpZXM6Jyk7XG4gICAgdXRpbC5pbnNwZWN0KGNhcHMpO1xuICAgIGZvciAobGV0IFtjYXAsIHZhbHVlXSBvZiBfLnRvUGFpcnMoY2FwcykpIHtcbiAgICAgIGxvZy5pbmZvKGAgICR7Y2FwfTogJHt1dGlsLmluc3BlY3QodmFsdWUpfWApO1xuICAgIH1cblxuICAgIC8vIHNlc3Npb25PdmVycmlkZSBzZXJ2ZXIgZmxhZyBjaGVja1xuICAgIC8vIHRoaXMgd2lsbCBuZWVkIHRvIGJlIHJlLXRob3VnaHQgd2hlbiB3ZSBnbyB0byBtdWx0aXBsZSBzZXNzaW9uIHN1cHBvcnRcbiAgICBpZiAodGhpcy5hcmdzLnNlc3Npb25PdmVycmlkZSAmJiAhIXRoaXMuc2Vzc2lvbnMgJiYgXy5rZXlzKHRoaXMuc2Vzc2lvbnMpLmxlbmd0aCA+IDApIHtcbiAgICAgIGxvZy5pbmZvKCdTZXNzaW9uIG92ZXJyaWRlIGlzIG9uLiBEZWxldGluZyBvdGhlciBzZXNzaW9ucy4nKTtcbiAgICAgIGZvciAobGV0IGlkIG9mIF8ua2V5cyh0aGlzLnNlc3Npb25zKSkge1xuICAgICAgICBsb2cuaW5mbyhgICAgIERlbGV0aW5nIHNlc3Npb24gJyR7aWR9J2ApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuZGVsZXRlU2Vzc2lvbihpZCk7XG4gICAgICAgIH0gY2F0Y2ggKGlnbikge1xuICAgICAgICAgIC8vIHRoZSBlcnJvciBoYXMgYWxyZWFkeSBiZWVuIGxvZ2dlZCBpbiBBcHBpdW1Ecml2ZXIuZGVsZXRlU2Vzc2lvblxuICAgICAgICAgIC8vIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY3VyU2Vzc2lvbnMgPSB0aGlzLmN1clNlc3Npb25EYXRhRm9yRHJpdmVyKElubmVyRHJpdmVyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLlNlc3Npb25Ob3RDcmVhdGVkRXJyb3IoZS5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICBsZXQgZCA9IG5ldyBJbm5lckRyaXZlcih0aGlzLmFyZ3MpO1xuICAgIGxldCBbaW5uZXJTZXNzaW9uSWQsIGRDYXBzXSA9IGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihjYXBzLCByZXFDYXBzLCBjdXJTZXNzaW9ucyk7XG4gICAgdGhpcy5zZXNzaW9uc1tpbm5lclNlc3Npb25JZF0gPSBkO1xuXG4gICAgLy8gUmVtb3ZlIHRoZSBzZXNzaW9uIG9uIHVuZXhwZWN0ZWQgc2h1dGRvd24sIHNvIHRoYXQgd2UgYXJlIGluIGEgcG9zaXRpb25cbiAgICAvLyB0byBvcGVuIGFub3RoZXIgc2Vzc2lvbiBsYXRlciBvbi5cbiAgICAvLyBUT0RPOiB0aGlzIHNob3VsZCBiZSByZW1vdmVkIGFuZCByZXBsYWNlZCBieSBhIG9uU2h1dGRvd24gY2FsbGJhY2suXG4gICAgZC5vblVuZXhwZWN0ZWRTaHV0ZG93blxuICAgICAgLnRoZW4oKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgc2h1dGRvd24nKTsgfSlcbiAgICAgIC5jYXRjaChCLkNhbmNlbGxhdGlvbkVycm9yLCAoKSA9PiB7fSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGxvZy53YXJuKGBDbG9zaW5nIHNlc3Npb24sIGNhdXNlIHdhcyAnJHtlcnIubWVzc2FnZX0nYCk7XG4gICAgICAgIGxvZy5pbmZvKGBSZW1vdmluZyBzZXNzaW9uICR7aW5uZXJTZXNzaW9uSWR9IGZyb20gb3VyIG1hc3RlciBzZXNzaW9uIGxpc3RgKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2Vzc2lvbnNbaW5uZXJTZXNzaW9uSWRdO1xuICAgICAgfSlcbiAgICAgIC5kb25lKCk7XG5cbiAgICBsb2cuaW5mbyhgTmV3ICR7SW5uZXJEcml2ZXIubmFtZX0gc2Vzc2lvbiBjcmVhdGVkIHN1Y2Nlc3NmdWxseSwgc2Vzc2lvbiBgICtcbiAgICAgICAgICAgICBgJHtpbm5lclNlc3Npb25JZH0gYWRkZWQgdG8gbWFzdGVyIHNlc3Npb24gbGlzdGApO1xuXG4gICAgLy8gc2V0IHRoZSBOZXcgQ29tbWFuZCBUaW1lb3V0IGZvciB0aGUgaW5uZXIgZHJpdmVyXG4gICAgZC5zdGFydE5ld0NvbW1hbmRUaW1lb3V0KCk7XG5cbiAgICByZXR1cm4gW2lubmVyU2Vzc2lvbklkLCBkQ2Fwc107XG4gIH1cblxuICBjdXJTZXNzaW9uRGF0YUZvckRyaXZlciAoSW5uZXJEcml2ZXIpIHtcbiAgICBsZXQgZGF0YSA9IF8udmFsdWVzKHRoaXMuc2Vzc2lvbnMpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihzID0+IHMuY29uc3RydWN0b3IubmFtZSA9PT0gSW5uZXJEcml2ZXIubmFtZSlcbiAgICAgICAgICAgICAgICAubWFwKHMgPT4gcy5kcml2ZXJEYXRhKTtcbiAgICBmb3IgKGxldCBkYXR1bSBvZiBkYXRhKSB7XG4gICAgICBpZiAoIWRhdHVtKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvYmxlbSBnZXR0aW5nIHNlc3Npb24gZGF0YSBmb3IgZHJpdmVyIHR5cGUgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgJHtJbm5lckRyaXZlci5uYW1lfTsgZG9lcyBpdCBpbXBsZW1lbnQgJ2dldCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBkcml2ZXJEYXRhJz9gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gICB9XG5cbiAgYXN5bmMgZGVsZXRlU2Vzc2lvbiAoc2Vzc2lvbklkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF0pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdLmRlbGV0ZVNlc3Npb24oKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2cuZXJyb3IoYEhhZCB0cm91YmxlIGVuZGluZyBzZXNzaW9uICR7c2Vzc2lvbklkfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlIGRlbGV0ZVNlc3Npb24gY29tcGxldGVzIHN1Y2Nlc3NmdWxseSBvciBub3RcbiAgICAgIC8vIG1ha2UgdGhlIHNlc3Npb24gdW5hdmFpbGFibGUsIGJlY2F1c2Ugd2hvIGtub3dzIHdoYXQgc3RhdGUgaXQgbWlnaHRcbiAgICAgIC8vIGJlIGluIG90aGVyd2lzZVxuICAgICAgbG9nLmluZm8oYFJlbW92aW5nIHNlc3Npb24gJHtzZXNzaW9uSWR9IGZyb20gb3VyIG1hc3RlciBzZXNzaW9uIGxpc3RgKTtcbiAgICAgIGRlbGV0ZSB0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF07XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZXhlY3V0ZUNvbW1hbmQgKGNtZCwgLi4uYXJncykge1xuICAgIGlmIChpc0FwcGl1bURyaXZlckNvbW1hbmQoY21kKSkge1xuICAgICAgcmV0dXJuIHN1cGVyLmV4ZWN1dGVDb21tYW5kKGNtZCwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgbGV0IHNlc3Npb25JZCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdLmV4ZWN1dGVDb21tYW5kKGNtZCwgLi4uYXJncyk7XG4gIH1cblxuICBwcm94eUFjdGl2ZSAoc2Vzc2lvbklkKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklkXSAmJlxuICAgICAgICAgICBfLmlzRnVuY3Rpb24odGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdLnByb3h5QWN0aXZlKSAmJlxuICAgICAgICAgICB0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF0ucHJveHlBY3RpdmUoc2Vzc2lvbklkKTtcbiAgfVxuXG4gIGdldFByb3h5QXZvaWRMaXN0IChzZXNzaW9uSWQpIHtcbiAgICBpZiAoIXRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklkXSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdLmdldFByb3h5QXZvaWRMaXN0KCk7XG4gIH1cblxuICBjYW5Qcm94eSAoc2Vzc2lvbklkKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklkXSAmJiB0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF0uY2FuUHJveHkoc2Vzc2lvbklkKTtcbiAgfVxufVxuXG4vLyBoZWxwIGRlY2lkZSB3aGljaCBjb21tYW5kcyBzaG91bGQgYmUgcHJveGllZCB0byBzdWItZHJpdmVycyBhbmQgd2hpY2hcbi8vIHNob3VsZCBiZSBoYW5kbGVkIGJ5IHRoaXMsIG91ciB1bWJyZWxsYSBkcml2ZXJcbmZ1bmN0aW9uIGlzQXBwaXVtRHJpdmVyQ29tbWFuZCAoY21kKSB7XG4gIHJldHVybiAhaXNTZXNzaW9uQ29tbWFuZChjbWQpIHx8IGNtZCA9PT0gXCJkZWxldGVTZXNzaW9uXCI7XG59XG5cbmZ1bmN0aW9uIGdldEFwcGl1bVJvdXRlciAoYXJncykge1xuICBsZXQgYXBwaXVtID0gbmV3IEFwcGl1bURyaXZlcihhcmdzKTtcbiAgcmV0dXJuIHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbihhcHBpdW0pO1xufVxuXG5leHBvcnQgeyBBcHBpdW1Ecml2ZXIsIGdldEFwcGl1bVJvdXRlciB9O1xuZXhwb3J0IGRlZmF1bHQgZ2V0QXBwaXVtUm91dGVyO1xuIl19