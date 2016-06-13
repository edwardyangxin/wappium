require('source-map-support').install();

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _libAppium = require('../lib/appium');

var _appiumFakeDriver = require('appium-fake-driver');

var _helpers = require('./helpers');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

_chai2['default'].use(_chaiAsPromised2['default']);

var BASE_CAPS = { platformName: 'Fake', deviceName: 'Fake', app: _helpers.TEST_FAKE_APP };

describe('AppiumDriver', function () {
  describe('getAppiumRouter', function () {
    it('should return a route configuring function', function callee$2$0() {
      var routeConfiguringFunction;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            routeConfiguringFunction = (0, _libAppium.getAppiumRouter)({});

            routeConfiguringFunction.should.be.a['function'];

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('AppiumDriver', function () {
    function getDriverAndFakeDriver() {
      var appium = new _libAppium.AppiumDriver({});
      var fakeDriver = new _appiumFakeDriver.FakeDriver();
      var mockFakeDriver = _sinon2['default'].mock(fakeDriver);
      appium.getDriverForCaps = function () /*args*/{
        return function () {
          return fakeDriver;
        };
      };
      return [appium, mockFakeDriver];
    }
    describe('createSession', function () {
      var appium = undefined,
          mockFakeDriver = undefined;
      beforeEach(function () {
        var _getDriverAndFakeDriver = getDriverAndFakeDriver();

        var _getDriverAndFakeDriver2 = _slicedToArray(_getDriverAndFakeDriver, 2);

        appium = _getDriverAndFakeDriver2[0];
        mockFakeDriver = _getDriverAndFakeDriver2[1];
      });
      afterEach(function () {
        mockFakeDriver.restore();
        appium.args.defaultCapabilities = {};
      });

      it('should call inner driver\'s createSession with desired capabilities', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mockFakeDriver.expects("createSession").once().withExactArgs(BASE_CAPS, undefined, []).returns([1, BASE_CAPS]);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(appium.createSession(BASE_CAPS));

            case 3:
              mockFakeDriver.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call inner driver\'s createSession with desired and default capabilities', function callee$3$0() {
        var defaultCaps, allCaps;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              defaultCaps = { deviceName: 'Emulator' }, allCaps = _lodash2['default'].extend(_lodash2['default'].clone(defaultCaps), BASE_CAPS);

              appium.args.defaultCapabilities = defaultCaps;
              mockFakeDriver.expects("createSession").once().withArgs(allCaps).returns([1, allCaps]);
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(appium.createSession(BASE_CAPS));

            case 5:
              mockFakeDriver.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call inner driver\'s createSession with desired and default capabilities without overriding caps', function callee$3$0() {
        var defaultCaps;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              defaultCaps = { platformName: 'Ersatz' };

              appium.args.defaultCapabilities = defaultCaps;
              mockFakeDriver.expects("createSession").once().withArgs(BASE_CAPS).returns([1, BASE_CAPS]);
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(appium.createSession(BASE_CAPS));

            case 5:
              mockFakeDriver.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should kill all other sessions if sessionOverride is on', function callee$3$0() {
        var fakeDrivers, mockFakeDrivers, sessions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, mfd;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              appium.args.sessionOverride = true;

              // mock three sessions that should be removed when the new one is created
              fakeDrivers = [new _appiumFakeDriver.FakeDriver(), new _appiumFakeDriver.FakeDriver(), new _appiumFakeDriver.FakeDriver()];
              mockFakeDrivers = _lodash2['default'].map(fakeDrivers, function (fd) {
                return _sinon2['default'].mock(fd);
              });

              mockFakeDrivers[0].expects('deleteSession').once();
              mockFakeDrivers[1].expects('deleteSession').once().throws('Cannot shut down Android driver; it has already shut down');
              mockFakeDrivers[2].expects('deleteSession').once();
              appium.sessions['abc-123-xyz'] = fakeDrivers[0];
              appium.sessions['xyz-321-abc'] = fakeDrivers[1];
              appium.sessions['123-abc-xyz'] = fakeDrivers[2];

              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 11:
              sessions = context$4$0.sent;

              sessions.should.have.length(3);

              mockFakeDriver.expects("createSession").once().withExactArgs(BASE_CAPS, undefined, []).returns([1, BASE_CAPS]);
              context$4$0.next = 16;
              return _regeneratorRuntime.awrap(appium.createSession(BASE_CAPS));

            case 16:
              context$4$0.next = 18;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 18:
              sessions = context$4$0.sent;

              sessions.should.have.length(1);

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$4$0.prev = 23;
              for (_iterator = _getIterator(mockFakeDrivers); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                mfd = _step.value;

                mfd.verify();
              }
              context$4$0.next = 31;
              break;

            case 27:
              context$4$0.prev = 27;
              context$4$0.t0 = context$4$0['catch'](23);
              _didIteratorError = true;
              _iteratorError = context$4$0.t0;

            case 31:
              context$4$0.prev = 31;
              context$4$0.prev = 32;

              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }

            case 34:
              context$4$0.prev = 34;

              if (!_didIteratorError) {
                context$4$0.next = 37;
                break;
              }

              throw _iteratorError;

            case 37:
              return context$4$0.finish(34);

            case 38:
              return context$4$0.finish(31);

            case 39:
              mockFakeDriver.verify();

            case 40:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this, [[23, 27, 31, 39], [32,, 34, 38]]);
      });
    });
    describe('deleteSession', function () {
      var appium = undefined,
          mockFakeDriver = undefined;
      beforeEach(function () {
        var _getDriverAndFakeDriver3 = getDriverAndFakeDriver();

        var _getDriverAndFakeDriver32 = _slicedToArray(_getDriverAndFakeDriver3, 2);

        appium = _getDriverAndFakeDriver32[0];
        mockFakeDriver = _getDriverAndFakeDriver32[1];
      });
      afterEach(function () {
        mockFakeDriver.restore();
        appium.args.defaultCapabilities = {};
      });
      it('should remove the session if it is found', function callee$3$0() {
        var _ref, _ref2, sessionId, sessions;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.createSession(BASE_CAPS));

            case 2:
              _ref = context$4$0.sent;
              _ref2 = _slicedToArray(_ref, 1);
              sessionId = _ref2[0];
              context$4$0.next = 7;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 7:
              sessions = context$4$0.sent;

              sessions.should.have.length(1);
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(appium.deleteSession(sessionId));

            case 11:
              context$4$0.next = 13;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 13:
              sessions = context$4$0.sent;

              sessions.should.have.length(0);

            case 15:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call inner driver\'s deleteSession method', function callee$3$0() {
        var _ref3, _ref32, sessionId;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.createSession(BASE_CAPS));

            case 2:
              _ref3 = context$4$0.sent;
              _ref32 = _slicedToArray(_ref3, 1);
              sessionId = _ref32[0];

              mockFakeDriver.expects("deleteSession").once().withExactArgs().returns();
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(appium.deleteSession(sessionId));

            case 8:
              mockFakeDriver.verify();

            case 9:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
    describe('getSessions', function () {
      var appium = undefined;
      before(function () {
        appium = new _libAppium.AppiumDriver({});
      });
      it('should return an empty array of sessions', function callee$3$0() {
        var sessions;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 2:
              sessions = context$4$0.sent;

              sessions.should.be.an.array;
              sessions.should.be.empty;

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should return sessions created', function callee$3$0() {
        var session1, session2, sessions;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.createSession(_lodash2['default'].extend(_lodash2['default'].clone(BASE_CAPS), { cap: 'value' })));

            case 2:
              session1 = context$4$0.sent;
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(appium.createSession(_lodash2['default'].extend(_lodash2['default'].clone(BASE_CAPS), { cap: 'other value' })));

            case 5:
              session2 = context$4$0.sent;
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 8:
              sessions = context$4$0.sent;

              sessions.should.be.an.array;
              sessions.should.have.length(2);
              sessions[0].id.should.equal(session1[0]);
              sessions[0].capabilities.should.eql(session1[1]);
              sessions[1].id.should.equal(session2[0]);
              sessions[1].capabilities.should.eql(session2[1]);

            case 15:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      describe('getStatus', function () {
        var appium = undefined;
        before(function () {
          appium = new _libAppium.AppiumDriver({});
        });
        it('should return a status', function callee$4$0() {
          var status;
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                context$5$0.next = 2;
                return _regeneratorRuntime.awrap(appium.getStatus());

              case 2:
                status = context$5$0.sent;

                status.build.should.exist;
                status.build.version.should.exist;

              case 5:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
      });
    });
    describe('sessionExists', function () {});
    describe('getDriverForCaps', function () {
      it('should not blow up if user doesnt provide platformName', function () {
        var appium = new _libAppium.AppiumDriver({});
        (function () {
          appium.getDriverForCaps({});
        }).should['throw'](/platformName/);
      });
    });
  });
});

// a default capability with the same key as a desired capability
// should do nothing
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZHJpdmVyLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCB7IEFwcGl1bURyaXZlciwgZ2V0QXBwaXVtUm91dGVyIH0gZnJvbSAnLi4vbGliL2FwcGl1bSc7XG5pbXBvcnQgeyBGYWtlRHJpdmVyIH0gZnJvbSAnYXBwaXVtLWZha2UtZHJpdmVyJztcbmltcG9ydCB7IFRFU1RfRkFLRV9BUFAgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcblxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCBCQVNFX0NBUFMgPSB7cGxhdGZvcm1OYW1lOiAnRmFrZScsIGRldmljZU5hbWU6ICdGYWtlJywgYXBwOiBURVNUX0ZBS0VfQVBQfTtcblxuZGVzY3JpYmUoJ0FwcGl1bURyaXZlcicsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2dldEFwcGl1bVJvdXRlcicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhIHJvdXRlIGNvbmZpZ3VyaW5nIGZ1bmN0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiA9IGdldEFwcGl1bVJvdXRlcih7fSk7XG4gICAgICByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24uc2hvdWxkLmJlLmEuZnVuY3Rpb247XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdBcHBpdW1Ecml2ZXInLCAoKSA9PiB7XG4gICAgZnVuY3Rpb24gZ2V0RHJpdmVyQW5kRmFrZURyaXZlciAoKSB7XG4gICAgICBsZXQgYXBwaXVtID0gbmV3IEFwcGl1bURyaXZlcih7fSk7XG4gICAgICBsZXQgZmFrZURyaXZlciA9IG5ldyBGYWtlRHJpdmVyKCk7XG4gICAgICBsZXQgbW9ja0Zha2VEcml2ZXIgPSBzaW5vbi5tb2NrKGZha2VEcml2ZXIpO1xuICAgICAgYXBwaXVtLmdldERyaXZlckZvckNhcHMgPSBmdW5jdGlvbiAoLyphcmdzKi8pIHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gZmFrZURyaXZlcjtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gW2FwcGl1bSwgbW9ja0Zha2VEcml2ZXJdO1xuICAgIH1cbiAgICBkZXNjcmliZSgnY3JlYXRlU2Vzc2lvbicsICgpID0+IHtcbiAgICAgIGxldCBhcHBpdW1cbiAgICAgICAgLCBtb2NrRmFrZURyaXZlcjtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBbYXBwaXVtLCBtb2NrRmFrZURyaXZlcl0gPSBnZXREcml2ZXJBbmRGYWtlRHJpdmVyKCk7XG4gICAgICB9KTtcbiAgICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLnJlc3RvcmUoKTtcbiAgICAgICAgYXBwaXVtLmFyZ3MuZGVmYXVsdENhcGFiaWxpdGllcyA9IHt9O1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgY2FsbCBpbm5lciBkcml2ZXJcXCdzIGNyZWF0ZVNlc3Npb24gd2l0aCBkZXNpcmVkIGNhcGFiaWxpdGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbW9ja0Zha2VEcml2ZXIuZXhwZWN0cyhcImNyZWF0ZVNlc3Npb25cIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoQkFTRV9DQVBTLCB1bmRlZmluZWQsIFtdKVxuICAgICAgICAgIC5yZXR1cm5zKFsxLCBCQVNFX0NBUFNdKTtcbiAgICAgICAgYXdhaXQgYXBwaXVtLmNyZWF0ZVNlc3Npb24oQkFTRV9DQVBTKTtcbiAgICAgICAgbW9ja0Zha2VEcml2ZXIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBpbm5lciBkcml2ZXJcXCdzIGNyZWF0ZVNlc3Npb24gd2l0aCBkZXNpcmVkIGFuZCBkZWZhdWx0IGNhcGFiaWxpdGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IGRlZmF1bHRDYXBzID0ge2RldmljZU5hbWU6ICdFbXVsYXRvcid9XG4gICAgICAgICAgLCBhbGxDYXBzID0gXy5leHRlbmQoXy5jbG9uZShkZWZhdWx0Q2FwcyksIEJBU0VfQ0FQUyk7XG4gICAgICAgIGFwcGl1bS5hcmdzLmRlZmF1bHRDYXBhYmlsaXRpZXMgPSBkZWZhdWx0Q2FwcztcbiAgICAgICAgbW9ja0Zha2VEcml2ZXIuZXhwZWN0cyhcImNyZWF0ZVNlc3Npb25cIilcbiAgICAgICAgICAub25jZSgpLndpdGhBcmdzKGFsbENhcHMpXG4gICAgICAgICAgLnJldHVybnMoWzEsIGFsbENhcHNdKTtcbiAgICAgICAgYXdhaXQgYXBwaXVtLmNyZWF0ZVNlc3Npb24oQkFTRV9DQVBTKTtcbiAgICAgICAgbW9ja0Zha2VEcml2ZXIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBpbm5lciBkcml2ZXJcXCdzIGNyZWF0ZVNlc3Npb24gd2l0aCBkZXNpcmVkIGFuZCBkZWZhdWx0IGNhcGFiaWxpdGllcyB3aXRob3V0IG92ZXJyaWRpbmcgY2FwcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgLy8gYSBkZWZhdWx0IGNhcGFiaWxpdHkgd2l0aCB0aGUgc2FtZSBrZXkgYXMgYSBkZXNpcmVkIGNhcGFiaWxpdHlcbiAgICAgICAgLy8gc2hvdWxkIGRvIG5vdGhpbmdcbiAgICAgICAgbGV0IGRlZmF1bHRDYXBzID0ge3BsYXRmb3JtTmFtZTogJ0Vyc2F0eid9O1xuICAgICAgICBhcHBpdW0uYXJncy5kZWZhdWx0Q2FwYWJpbGl0aWVzID0gZGVmYXVsdENhcHM7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLmV4cGVjdHMoXCJjcmVhdGVTZXNzaW9uXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoQXJncyhCQVNFX0NBUFMpXG4gICAgICAgICAgLnJldHVybnMoWzEsIEJBU0VfQ0FQU10pO1xuICAgICAgICBhd2FpdCBhcHBpdW0uY3JlYXRlU2Vzc2lvbihCQVNFX0NBUFMpO1xuICAgICAgICBtb2NrRmFrZURyaXZlci52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBraWxsIGFsbCBvdGhlciBzZXNzaW9ucyBpZiBzZXNzaW9uT3ZlcnJpZGUgaXMgb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGFwcGl1bS5hcmdzLnNlc3Npb25PdmVycmlkZSA9IHRydWU7XG5cbiAgICAgICAgLy8gbW9jayB0aHJlZSBzZXNzaW9ucyB0aGF0IHNob3VsZCBiZSByZW1vdmVkIHdoZW4gdGhlIG5ldyBvbmUgaXMgY3JlYXRlZFxuICAgICAgICBsZXQgZmFrZURyaXZlcnMgPSBbbmV3IEZha2VEcml2ZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGYWtlRHJpdmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmFrZURyaXZlcigpXTtcbiAgICAgICAgbGV0IG1vY2tGYWtlRHJpdmVycyA9IF8ubWFwKGZha2VEcml2ZXJzLCAoZmQpID0+IHtyZXR1cm4gc2lub24ubW9jayhmZCk7fSk7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyc1swXS5leHBlY3RzKCdkZWxldGVTZXNzaW9uJylcbiAgICAgICAgICAub25jZSgpO1xuICAgICAgICBtb2NrRmFrZURyaXZlcnNbMV0uZXhwZWN0cygnZGVsZXRlU2Vzc2lvbicpXG4gICAgICAgICAgLm9uY2UoKVxuICAgICAgICAgIC50aHJvd3MoJ0Nhbm5vdCBzaHV0IGRvd24gQW5kcm9pZCBkcml2ZXI7IGl0IGhhcyBhbHJlYWR5IHNodXQgZG93bicpO1xuICAgICAgICBtb2NrRmFrZURyaXZlcnNbMl0uZXhwZWN0cygnZGVsZXRlU2Vzc2lvbicpXG4gICAgICAgICAgLm9uY2UoKTtcbiAgICAgICAgYXBwaXVtLnNlc3Npb25zWydhYmMtMTIzLXh5eiddID0gZmFrZURyaXZlcnNbMF07XG4gICAgICAgIGFwcGl1bS5zZXNzaW9uc1sneHl6LTMyMS1hYmMnXSA9IGZha2VEcml2ZXJzWzFdO1xuICAgICAgICBhcHBpdW0uc2Vzc2lvbnNbJzEyMy1hYmMteHl6J10gPSBmYWtlRHJpdmVyc1syXTtcblxuICAgICAgICBsZXQgc2Vzc2lvbnMgPSBhd2FpdCBhcHBpdW0uZ2V0U2Vzc2lvbnMoKTtcbiAgICAgICAgc2Vzc2lvbnMuc2hvdWxkLmhhdmUubGVuZ3RoKDMpO1xuXG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLmV4cGVjdHMoXCJjcmVhdGVTZXNzaW9uXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKEJBU0VfQ0FQUywgdW5kZWZpbmVkLCBbXSlcbiAgICAgICAgICAucmV0dXJucyhbMSwgQkFTRV9DQVBTXSk7XG4gICAgICAgIGF3YWl0IGFwcGl1bS5jcmVhdGVTZXNzaW9uKEJBU0VfQ0FQUyk7XG5cbiAgICAgICAgc2Vzc2lvbnMgPSBhd2FpdCBhcHBpdW0uZ2V0U2Vzc2lvbnMoKTtcbiAgICAgICAgc2Vzc2lvbnMuc2hvdWxkLmhhdmUubGVuZ3RoKDEpO1xuXG4gICAgICAgIGZvciAobGV0IG1mZCBvZiBtb2NrRmFrZURyaXZlcnMpIHtcbiAgICAgICAgICBtZmQudmVyaWZ5KCk7XG4gICAgICAgIH1cbiAgICAgICAgbW9ja0Zha2VEcml2ZXIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnZGVsZXRlU2Vzc2lvbicsICgpID0+IHtcbiAgICAgIGxldCBhcHBpdW1cbiAgICAgICAgLCBtb2NrRmFrZURyaXZlcjtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBbYXBwaXVtLCBtb2NrRmFrZURyaXZlcl0gPSBnZXREcml2ZXJBbmRGYWtlRHJpdmVyKCk7XG4gICAgICB9KTtcbiAgICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLnJlc3RvcmUoKTtcbiAgICAgICAgYXBwaXVtLmFyZ3MuZGVmYXVsdENhcGFiaWxpdGllcyA9IHt9O1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHJlbW92ZSB0aGUgc2Vzc2lvbiBpZiBpdCBpcyBmb3VuZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IFtzZXNzaW9uSWRdID0gYXdhaXQgYXBwaXVtLmNyZWF0ZVNlc3Npb24oQkFTRV9DQVBTKTtcbiAgICAgICAgbGV0IHNlc3Npb25zID0gYXdhaXQgYXBwaXVtLmdldFNlc3Npb25zKCk7XG4gICAgICAgIHNlc3Npb25zLnNob3VsZC5oYXZlLmxlbmd0aCgxKTtcbiAgICAgICAgYXdhaXQgYXBwaXVtLmRlbGV0ZVNlc3Npb24oc2Vzc2lvbklkKTtcbiAgICAgICAgc2Vzc2lvbnMgPSBhd2FpdCBhcHBpdW0uZ2V0U2Vzc2lvbnMoKTtcbiAgICAgICAgc2Vzc2lvbnMuc2hvdWxkLmhhdmUubGVuZ3RoKDApO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgaW5uZXIgZHJpdmVyXFwncyBkZWxldGVTZXNzaW9uIG1ldGhvZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IFtzZXNzaW9uSWRdID0gYXdhaXQgYXBwaXVtLmNyZWF0ZVNlc3Npb24oQkFTRV9DQVBTKTtcbiAgICAgICAgbW9ja0Zha2VEcml2ZXIuZXhwZWN0cyhcImRlbGV0ZVNlc3Npb25cIilcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxuICAgICAgICAgIC5yZXR1cm5zKCk7XG4gICAgICAgIGF3YWl0IGFwcGl1bS5kZWxldGVTZXNzaW9uKHNlc3Npb25JZCk7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ2dldFNlc3Npb25zJywgKCkgPT4ge1xuICAgICAgbGV0IGFwcGl1bTtcbiAgICAgIGJlZm9yZSgoKSA9PiB7XG4gICAgICAgIGFwcGl1bSA9IG5ldyBBcHBpdW1Ecml2ZXIoe30pO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlbXB0eSBhcnJheSBvZiBzZXNzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IHNlc3Npb25zID0gYXdhaXQgYXBwaXVtLmdldFNlc3Npb25zKCk7XG4gICAgICAgIHNlc3Npb25zLnNob3VsZC5iZS5hbi5hcnJheTtcbiAgICAgICAgc2Vzc2lvbnMuc2hvdWxkLmJlLmVtcHR5O1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBzZXNzaW9ucyBjcmVhdGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgc2Vzc2lvbjEgPSBhd2FpdCBhcHBpdW0uY3JlYXRlU2Vzc2lvbihfLmV4dGVuZChfLmNsb25lKEJBU0VfQ0FQUyksIHtjYXA6ICd2YWx1ZSd9KSk7XG4gICAgICAgIGxldCBzZXNzaW9uMiA9IGF3YWl0IGFwcGl1bS5jcmVhdGVTZXNzaW9uKF8uZXh0ZW5kKF8uY2xvbmUoQkFTRV9DQVBTKSwge2NhcDogJ290aGVyIHZhbHVlJ30pKTtcbiAgICAgICAgbGV0IHNlc3Npb25zID0gYXdhaXQgYXBwaXVtLmdldFNlc3Npb25zKCk7XG4gICAgICAgIHNlc3Npb25zLnNob3VsZC5iZS5hbi5hcnJheTtcbiAgICAgICAgc2Vzc2lvbnMuc2hvdWxkLmhhdmUubGVuZ3RoKDIpO1xuICAgICAgICBzZXNzaW9uc1swXS5pZC5zaG91bGQuZXF1YWwoc2Vzc2lvbjFbMF0pO1xuICAgICAgICBzZXNzaW9uc1swXS5jYXBhYmlsaXRpZXMuc2hvdWxkLmVxbChzZXNzaW9uMVsxXSk7XG4gICAgICAgIHNlc3Npb25zWzFdLmlkLnNob3VsZC5lcXVhbChzZXNzaW9uMlswXSk7XG4gICAgICAgIHNlc3Npb25zWzFdLmNhcGFiaWxpdGllcy5zaG91bGQuZXFsKHNlc3Npb24yWzFdKTtcbiAgICAgIH0pO1xuICAgICAgZGVzY3JpYmUoJ2dldFN0YXR1cycsICgpID0+IHtcbiAgICAgICAgbGV0IGFwcGl1bTtcbiAgICAgICAgYmVmb3JlKCgpID0+IHtcbiAgICAgICAgICBhcHBpdW0gPSBuZXcgQXBwaXVtRHJpdmVyKHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgc3RhdHVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxldCBzdGF0dXMgPSBhd2FpdCBhcHBpdW0uZ2V0U3RhdHVzKCk7XG4gICAgICAgICAgc3RhdHVzLmJ1aWxkLnNob3VsZC5leGlzdDtcbiAgICAgICAgICBzdGF0dXMuYnVpbGQudmVyc2lvbi5zaG91bGQuZXhpc3Q7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ3Nlc3Npb25FeGlzdHMnLCAoKSA9PiB7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ2dldERyaXZlckZvckNhcHMnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIG5vdCBibG93IHVwIGlmIHVzZXIgZG9lc250IHByb3ZpZGUgcGxhdGZvcm1OYW1lJywgKCkgPT4ge1xuICAgICAgICBsZXQgYXBwaXVtID0gbmV3IEFwcGl1bURyaXZlcih7fSk7XG4gICAgICAgICgoKSA9PiB7IGFwcGl1bS5nZXREcml2ZXJGb3JDYXBzKHt9KTsgfSkuc2hvdWxkLnRocm93KC9wbGF0Zm9ybU5hbWUvKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19