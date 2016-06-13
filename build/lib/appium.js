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
//# sourceMappingURL=data:application/json;base64,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QUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLFNBQU8sZ0RBQXlCLE1BQU0sQ0FBQyxDQUFDO0NBQ3pDOztRQUVRLFlBQVksR0FBWixZQUFZO1FBQUUsZUFBZSxHQUFmLGVBQWU7cUJBQ3ZCLGVBQWUiLCJmaWxlIjoibGliL2FwcGl1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IGdldEFwcGl1bUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IEJhc2VEcml2ZXIsIHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiwgZXJyb3JzLFxuICAgICAgICAgaXNTZXNzaW9uQ29tbWFuZCB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XG5pbXBvcnQgeyBGYWtlRHJpdmVyIH0gZnJvbSAnYXBwaXVtLWZha2UtZHJpdmVyJztcbmltcG9ydCB7IEFuZHJvaWREcml2ZXIgfSBmcm9tICdhcHBpdW0tYW5kcm9pZC1kcml2ZXInO1xuaW1wb3J0IHsgSW9zRHJpdmVyIH0gZnJvbSAnYXBwaXVtLWlvcy1kcml2ZXInO1xuaW1wb3J0IHsgU2VsZW5kcm9pZERyaXZlciB9IGZyb20gJ2FwcGl1bS1zZWxlbmRyb2lkLWRyaXZlcic7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgdXRpbCBmcm9tICd1dGlsJztcblxuXG5jbGFzcyBBcHBpdW1Ecml2ZXIgZXh0ZW5kcyBCYXNlRHJpdmVyIHtcbiAgY29uc3RydWN0b3IgKGFyZ3MpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gdGhlIG1haW4gQXBwaXVtIERyaXZlciBoYXMgbm8gbmV3IGNvbW1hbmQgdGltZW91dFxuICAgIHRoaXMubmV3Q29tbWFuZFRpbWVvdXRNcyA9IDA7XG5cbiAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuXG4gICAgdGhpcy5zZXNzaW9ucyA9IHt9O1xuICB9XG5cbiAgc2Vzc2lvbkV4aXN0cyAoc2Vzc2lvbklkKSB7XG4gICAgcmV0dXJuIF8uaW5jbHVkZXMoXy5rZXlzKHRoaXMuc2Vzc2lvbnMpLCBzZXNzaW9uSWQpICYmXG4gICAgICAgICAgIHRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklkXS5zZXNzaW9uSWQgIT09IG51bGw7XG4gIH1cblxuICBkcml2ZXJGb3JTZXNzaW9uIChzZXNzaW9uSWQpIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdO1xuICB9XG5cbiAgZ2V0RHJpdmVyRm9yQ2FwcyAoY2Fwcykge1xuICAgIC8vIFRPRE8gaWYgdGhpcyBsb2dpYyBldmVyIGJlY29tZXMgY29tcGxleCwgc2hvdWxkIHByb2JhYmx5IGZhY3RvciBvdXRcbiAgICAvLyBpbnRvIGl0cyBvd24gZmlsZVxuICAgIGlmICghY2Fwcy5wbGF0Zm9ybU5hbWUgfHwgIV8uaXNTdHJpbmcoY2Fwcy5wbGF0Zm9ybU5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgbXVzdCBpbmNsdWRlIGEgcGxhdGZvcm1OYW1lIGNhcGFiaWxpdHlcIik7XG4gICAgfVxuXG4gICAgLy8gd2UgZG9uJ3QgbmVjZXNzYXJpbHkgaGF2ZSBhbiBgYXV0b21hdGlvbk5hbWVgIGNhcGFiaWxpdHksXG4gICAgLy8gYnV0IGlmIHdlIGRvIGFuZCBpdCBpcyAnU2VsZW5kcm9pZCcsIGFjdCBvbiBpdFxuICAgIGlmICgoY2Fwcy5hdXRvbWF0aW9uTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVuZHJvaWQnKSB7XG4gICAgICByZXR1cm4gU2VsZW5kcm9pZERyaXZlcjtcbiAgICB9XG5cbiAgICBpZiAoY2Fwcy5wbGF0Zm9ybU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJmYWtlXCIpIHtcbiAgICAgIHJldHVybiBGYWtlRHJpdmVyO1xuICAgIH1cblxuICAgIGlmIChjYXBzLnBsYXRmb3JtTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYW5kcm9pZCcpIHtcbiAgICAgIHJldHVybiBBbmRyb2lkRHJpdmVyO1xuICAgIH1cblxuICAgIGlmIChjYXBzLnBsYXRmb3JtTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW9zJykge1xuICAgICAgcmV0dXJuIElvc0RyaXZlcjtcbiAgICB9XG5cbiAgICBsZXQgbXNnO1xuICAgIGlmIChjYXBzLmF1dG9tYXRpb25OYW1lKSB7XG4gICAgICBtc2cgPSBgQ291bGQgbm90IGZpbmQgYSBkcml2ZXIgZm9yIGF1dG9tYXRpb25OYW1lICcke2NhcHMuYXV0b21hdGlvbk5hbWV9JyBhbmQgcGxhdGZvcm1OYW1lIGAgK1xuICAgICAgICAgICAgYCcke2NhcHMucGxhdGZvcm1OYW1lfScuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbXNnID0gYENvdWxkIG5vdCBmaW5kIGEgZHJpdmVyIGZvciBwbGF0Zm9ybU5hbWUgJyR7Y2Fwcy5wbGF0Zm9ybU5hbWV9Jy5gO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bXNnfSBQbGVhc2UgY2hlY2sgeW91ciBkZXNpcmVkIGNhcGFiaWxpdGllcy5gKTtcbiAgfVxuXG4gIGFzeW5jIGdldFN0YXR1cyAoKSB7XG4gICAgbGV0IGNvbmZpZyA9IGF3YWl0IGdldEFwcGl1bUNvbmZpZygpO1xuICAgIGxldCBnaXRTaGEgPSBjb25maWdbJ2dpdC1zaGEnXTtcbiAgICBsZXQgc3RhdHVzID0ge2J1aWxkOiB7dmVyc2lvbjogY29uZmlnLnZlcnNpb259fTtcbiAgICBpZiAodHlwZW9mIGdpdFNoYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgc3RhdHVzLmJ1aWxkLnJldmlzaW9uID0gZ2l0U2hhO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdHVzO1xuICB9XG5cbiAgYXN5bmMgZ2V0U2Vzc2lvbnMgKCkge1xuICAgIGxldCBzZXNzaW9ucyA9IFtdO1xuICAgIGZvciAobGV0IFtpZCwgZHJpdmVyXSBvZiBfLnRvUGFpcnModGhpcy5zZXNzaW9ucykpIHtcbiAgICAgIHNlc3Npb25zLnB1c2goe2lkOiBpZCwgY2FwYWJpbGl0aWVzOiBkcml2ZXIuY2Fwc30pO1xuICAgIH1cbiAgICByZXR1cm4gc2Vzc2lvbnM7XG4gIH1cblxuICBhc3luYyBjcmVhdGVTZXNzaW9uIChjYXBzLCByZXFDYXBzKSB7XG4gICAgY2FwcyA9IF8uZGVmYXVsdHMoXy5jbG9uZShjYXBzKSwgdGhpcy5hcmdzLmRlZmF1bHRDYXBhYmlsaXRpZXMpO1xuICAgIGxldCBJbm5lckRyaXZlciA9IHRoaXMuZ2V0RHJpdmVyRm9yQ2FwcyhjYXBzKTtcbiAgICBsZXQgY3VyU2Vzc2lvbnM7XG4gICAgbG9nLmluZm8oYENyZWF0aW5nIG5ldyAke0lubmVyRHJpdmVyLm5hbWV9IHNlc3Npb25gKTtcbiAgICBsb2cuaW5mbygnQ2FwYWJpbGl0aWVzOicpO1xuICAgIHV0aWwuaW5zcGVjdChjYXBzKTtcbiAgICBmb3IgKGxldCBbY2FwLCB2YWx1ZV0gb2YgXy50b1BhaXJzKGNhcHMpKSB7XG4gICAgICBsb2cuaW5mbyhgICAke2NhcH06ICR7dXRpbC5pbnNwZWN0KHZhbHVlKX1gKTtcbiAgICB9XG5cbiAgICAvLyBzZXNzaW9uT3ZlcnJpZGUgc2VydmVyIGZsYWcgY2hlY2tcbiAgICAvLyB0aGlzIHdpbGwgbmVlZCB0byBiZSByZS10aG91Z2h0IHdoZW4gd2UgZ28gdG8gbXVsdGlwbGUgc2Vzc2lvbiBzdXBwb3J0XG4gICAgaWYgKHRoaXMuYXJncy5zZXNzaW9uT3ZlcnJpZGUgJiYgISF0aGlzLnNlc3Npb25zICYmIF8ua2V5cyh0aGlzLnNlc3Npb25zKS5sZW5ndGggPiAwKSB7XG4gICAgICBsb2cuaW5mbygnU2Vzc2lvbiBvdmVycmlkZSBpcyBvbi4gRGVsZXRpbmcgb3RoZXIgc2Vzc2lvbnMuJyk7XG4gICAgICBmb3IgKGxldCBpZCBvZiBfLmtleXModGhpcy5zZXNzaW9ucykpIHtcbiAgICAgICAgbG9nLmluZm8oYCAgICBEZWxldGluZyBzZXNzaW9uICcke2lkfSdgKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZVNlc3Npb24oaWQpO1xuICAgICAgICB9IGNhdGNoIChpZ24pIHtcbiAgICAgICAgICAvLyB0aGUgZXJyb3IgaGFzIGFscmVhZHkgYmVlbiBsb2dnZWQgaW4gQXBwaXVtRHJpdmVyLmRlbGV0ZVNlc3Npb25cbiAgICAgICAgICAvLyBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGN1clNlc3Npb25zID0gdGhpcy5jdXJTZXNzaW9uRGF0YUZvckRyaXZlcihJbm5lckRyaXZlcik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5TZXNzaW9uTm90Q3JlYXRlZEVycm9yKGUubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgbGV0IGQgPSBuZXcgSW5uZXJEcml2ZXIodGhpcy5hcmdzKTtcbiAgICBsZXQgW2lubmVyU2Vzc2lvbklkLCBkQ2Fwc10gPSBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oY2FwcywgcmVxQ2FwcywgY3VyU2Vzc2lvbnMpO1xuICAgIHRoaXMuc2Vzc2lvbnNbaW5uZXJTZXNzaW9uSWRdID0gZDtcblxuICAgIC8vIFJlbW92ZSB0aGUgc2Vzc2lvbiBvbiB1bmV4cGVjdGVkIHNodXRkb3duLCBzbyB0aGF0IHdlIGFyZSBpbiBhIHBvc2l0aW9uXG4gICAgLy8gdG8gb3BlbiBhbm90aGVyIHNlc3Npb24gbGF0ZXIgb24uXG4gICAgLy8gVE9ETzogdGhpcyBzaG91bGQgYmUgcmVtb3ZlZCBhbmQgcmVwbGFjZWQgYnkgYSBvblNodXRkb3duIGNhbGxiYWNrLlxuICAgIGQub25VbmV4cGVjdGVkU2h1dGRvd25cbiAgICAgIC50aGVuKCgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHNodXRkb3duJyk7IH0pXG4gICAgICAuY2F0Y2goQi5DYW5jZWxsYXRpb25FcnJvciwgKCkgPT4ge30pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBsb2cud2FybihgQ2xvc2luZyBzZXNzaW9uLCBjYXVzZSB3YXMgJyR7ZXJyLm1lc3NhZ2V9J2ApO1xuICAgICAgICBsb2cuaW5mbyhgUmVtb3Zpbmcgc2Vzc2lvbiAke2lubmVyU2Vzc2lvbklkfSBmcm9tIG91ciBtYXN0ZXIgc2Vzc2lvbiBsaXN0YCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNlc3Npb25zW2lubmVyU2Vzc2lvbklkXTtcbiAgICAgIH0pXG4gICAgICAuZG9uZSgpO1xuXG4gICAgbG9nLmluZm8oYE5ldyAke0lubmVyRHJpdmVyLm5hbWV9IHNlc3Npb24gY3JlYXRlZCBzdWNjZXNzZnVsbHksIHNlc3Npb24gYCArXG4gICAgICAgICAgICAgYCR7aW5uZXJTZXNzaW9uSWR9IGFkZGVkIHRvIG1hc3RlciBzZXNzaW9uIGxpc3RgKTtcblxuICAgIC8vIHNldCB0aGUgTmV3IENvbW1hbmQgVGltZW91dCBmb3IgdGhlIGlubmVyIGRyaXZlclxuICAgIGQuc3RhcnROZXdDb21tYW5kVGltZW91dCgpO1xuXG4gICAgcmV0dXJuIFtpbm5lclNlc3Npb25JZCwgZENhcHNdO1xuICB9XG5cbiAgY3VyU2Vzc2lvbkRhdGFGb3JEcml2ZXIgKElubmVyRHJpdmVyKSB7XG4gICAgbGV0IGRhdGEgPSBfLnZhbHVlcyh0aGlzLnNlc3Npb25zKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIocyA9PiBzLmNvbnN0cnVjdG9yLm5hbWUgPT09IElubmVyRHJpdmVyLm5hbWUpXG4gICAgICAgICAgICAgICAgLm1hcChzID0+IHMuZHJpdmVyRGF0YSk7XG4gICAgZm9yIChsZXQgZGF0dW0gb2YgZGF0YSkge1xuICAgICAgaWYgKCFkYXR1bSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb2JsZW0gZ2V0dGluZyBzZXNzaW9uIGRhdGEgZm9yIGRyaXZlciB0eXBlIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCR7SW5uZXJEcml2ZXIubmFtZX07IGRvZXMgaXQgaW1wbGVtZW50ICdnZXQgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgZHJpdmVyRGF0YSc/YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICAgfVxuXG4gIGFzeW5jIGRlbGV0ZVNlc3Npb24gKHNlc3Npb25JZCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklkXS5kZWxldGVTZXNzaW9uKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nLmVycm9yKGBIYWQgdHJvdWJsZSBlbmRpbmcgc2Vzc2lvbiAke3Nlc3Npb25JZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgdGhyb3cgZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgLy8gcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBkZWxldGVTZXNzaW9uIGNvbXBsZXRlcyBzdWNjZXNzZnVsbHkgb3Igbm90XG4gICAgICAvLyBtYWtlIHRoZSBzZXNzaW9uIHVuYXZhaWxhYmxlLCBiZWNhdXNlIHdobyBrbm93cyB3aGF0IHN0YXRlIGl0IG1pZ2h0XG4gICAgICAvLyBiZSBpbiBvdGhlcndpc2VcbiAgICAgIGxvZy5pbmZvKGBSZW1vdmluZyBzZXNzaW9uICR7c2Vzc2lvbklkfSBmcm9tIG91ciBtYXN0ZXIgc2Vzc2lvbiBsaXN0YCk7XG4gICAgICBkZWxldGUgdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGV4ZWN1dGVDb21tYW5kIChjbWQsIC4uLmFyZ3MpIHtcbiAgICBpZiAoaXNBcHBpdW1Ecml2ZXJDb21tYW5kKGNtZCkpIHtcbiAgICAgIHJldHVybiBzdXBlci5leGVjdXRlQ29tbWFuZChjbWQsIC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGxldCBzZXNzaW9uSWQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklkXS5leGVjdXRlQ29tbWFuZChjbWQsIC4uLmFyZ3MpO1xuICB9XG5cbiAgcHJveHlBY3RpdmUgKHNlc3Npb25JZCkge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF0gJiZcbiAgICAgICAgICAgXy5pc0Z1bmN0aW9uKHRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklkXS5wcm94eUFjdGl2ZSkgJiZcbiAgICAgICAgICAgdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdLnByb3h5QWN0aXZlKHNlc3Npb25JZCk7XG4gIH1cblxuICBnZXRQcm94eUF2b2lkTGlzdCAoc2Vzc2lvbklkKSB7XG4gICAgaWYgKCF0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF0pIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklkXS5nZXRQcm94eUF2b2lkTGlzdCgpO1xuICB9XG5cbiAgY2FuUHJveHkgKHNlc3Npb25JZCkge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF0gJiYgdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdLmNhblByb3h5KHNlc3Npb25JZCk7XG4gIH1cbn1cblxuLy8gaGVscCBkZWNpZGUgd2hpY2ggY29tbWFuZHMgc2hvdWxkIGJlIHByb3hpZWQgdG8gc3ViLWRyaXZlcnMgYW5kIHdoaWNoXG4vLyBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGlzLCBvdXIgdW1icmVsbGEgZHJpdmVyXG5mdW5jdGlvbiBpc0FwcGl1bURyaXZlckNvbW1hbmQgKGNtZCkge1xuICByZXR1cm4gIWlzU2Vzc2lvbkNvbW1hbmQoY21kKSB8fCBjbWQgPT09IFwiZGVsZXRlU2Vzc2lvblwiO1xufVxuXG5mdW5jdGlvbiBnZXRBcHBpdW1Sb3V0ZXIgKGFyZ3MpIHtcbiAgbGV0IGFwcGl1bSA9IG5ldyBBcHBpdW1Ecml2ZXIoYXJncyk7XG4gIHJldHVybiByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24oYXBwaXVtKTtcbn1cblxuZXhwb3J0IHsgQXBwaXVtRHJpdmVyLCBnZXRBcHBpdW1Sb3V0ZXIgfTtcbmV4cG9ydCBkZWZhdWx0IGdldEFwcGl1bVJvdXRlcjtcbiJdfQ==