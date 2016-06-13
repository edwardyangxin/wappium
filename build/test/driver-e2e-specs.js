require('source-map-support').install();

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _wd = require('wd');

var _wd2 = _interopRequireDefault(_wd);

var _libMain = require('../lib/main');

var _libParser = require('../lib/parser');

var _helpers = require('./helpers');

_chai2['default'].use(_chaiAsPromised2['default']);

var should = _chai2['default'].should();
var shouldStartServer = process.env.USE_RUNNING_SERVER !== "0";
var caps = { platformName: "Fake", deviceName: "Fake", app: _helpers.TEST_FAKE_APP };

describe('FakeDriver - via HTTP', function () {
  var server = null;
  before(function callee$1$0() {
    var args;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!shouldStartServer) {
            context$2$0.next = 7;
            break;
          }

          args = (0, _libParser.getDefaultArgs)();

          args.port = _helpers.TEST_PORT;
          args.host = _helpers.TEST_HOST;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap((0, _libMain.main)(args));

        case 6:
          server = context$2$0.sent;

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!server) {
            context$2$0.next = 3;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(_bluebird2['default'].promisify(server.close.bind(server))());

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  describe('session handling', function () {
    it('should start and stop a session', function callee$2$0() {
      var driver, _ref, _ref2, sessionId;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.init(caps));

          case 3:
            _ref = context$3$0.sent;
            _ref2 = _slicedToArray(_ref, 1);
            sessionId = _ref2[0];

            should.exist(sessionId);
            sessionId.should.be.a('string');
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.quit());

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.title().should.eventually.be.rejectedWith(/terminated/));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should be able to run two FakeDriver sessions simultaneously', function callee$2$0() {
      var driver1, _ref3, _ref32, sessionId1, driver2, _ref4, _ref42, sessionId2;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver1 = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver1.init(caps));

          case 3:
            _ref3 = context$3$0.sent;
            _ref32 = _slicedToArray(_ref3, 1);
            sessionId1 = _ref32[0];

            should.exist(sessionId1);
            sessionId1.should.be.a('string');
            driver2 = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver2.init(caps));

          case 11:
            _ref4 = context$3$0.sent;
            _ref42 = _slicedToArray(_ref4, 1);
            sessionId2 = _ref42[0];

            should.exist(sessionId2);
            sessionId2.should.be.a('string');
            sessionId1.should.not.equal(sessionId2);
            context$3$0.next = 19;
            return _regeneratorRuntime.awrap(driver1.quit());

          case 19:
            context$3$0.next = 21;
            return _regeneratorRuntime.awrap(driver2.quit());

          case 21:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should not be able to run two FakeDriver sessions simultaneously when one is unique', function callee$2$0() {
      var uniqueCaps, driver1, _ref5, _ref52, sessionId1, driver2;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            uniqueCaps = _lodash2['default'].clone(caps);

            uniqueCaps.uniqueApp = true;
            driver1 = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver1.init(uniqueCaps));

          case 5:
            _ref5 = context$3$0.sent;
            _ref52 = _slicedToArray(_ref5, 1);
            sessionId1 = _ref52[0];

            should.exist(sessionId1);
            sessionId1.should.be.a('string');
            driver2 = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(driver2.init(caps).should.eventually.be.rejected);

          case 13:
            context$3$0.next = 15;
            return _regeneratorRuntime.awrap(driver1.quit());

          case 15:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should use the newCommandTimeout of the inner Driver on session creation', function callee$2$0() {
      var driver, _ref6, _ref62, sessionId;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);

            caps.newCommandTimeout = 0.25;

            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.init(caps));

          case 4:
            _ref6 = context$3$0.sent;
            _ref62 = _slicedToArray(_ref6, 1);
            sessionId = _ref62[0];

            should.exist(sessionId);

            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(250));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.source().should.eventually.be.rejectedWith(/terminated/));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZHJpdmVyLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7c0JBRWMsUUFBUTs7Ozt3QkFDUixVQUFVOzs7O29CQUNQLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2tCQUM5QixJQUFJOzs7O3VCQUNrQixhQUFhOzt5QkFDbkIsZUFBZTs7dUJBQ00sV0FBVzs7QUFFL0Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBTSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDN0IsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixLQUFLLEdBQUcsQ0FBQztBQUNqRSxJQUFNLElBQUksR0FBRyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLHdCQUFlLEVBQUMsQ0FBQzs7QUFFNUUsUUFBUSxDQUFDLHVCQUF1QixFQUFFLFlBQU07QUFDdEMsTUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFFBQU0sQ0FBQztRQUVDLElBQUk7Ozs7ZUFETixpQkFBaUI7Ozs7O0FBQ2YsY0FBSSxHQUFHLGdDQUFnQjs7QUFDM0IsY0FBSSxDQUFDLElBQUkscUJBQVksQ0FBQztBQUN0QixjQUFJLENBQUMsSUFBSSxxQkFBWSxDQUFDOzsyQ0FDUCxtQkFBYSxJQUFJLENBQUM7OztBQUFqQyxnQkFBTTs7Ozs7OztHQUVULENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7OztlQUNBLE1BQU07Ozs7OzsyQ0FDRixzQkFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTs7Ozs7OztHQUVqRCxDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDakMsTUFBRSxDQUFDLGlDQUFpQyxFQUFFO1VBQ2hDLE1BQU0sZUFDTCxTQUFTOzs7OztBQURWLGtCQUFN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LENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9kcml2ZXItZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB3ZCBmcm9tICd3ZCc7XG5pbXBvcnQgeyBtYWluIGFzIGFwcGl1bVNlcnZlciB9IGZyb20gJy4uL2xpYi9tYWluJztcbmltcG9ydCB7IGdldERlZmF1bHRBcmdzIH0gZnJvbSAnLi4vbGliL3BhcnNlcic7XG5pbXBvcnQgeyBURVNUX0ZBS0VfQVBQLCBURVNUX0hPU1QsIFRFU1RfUE9SVCB9IGZyb20gJy4vaGVscGVycyc7XG5cbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuY29uc3Qgc2hvdWxkID0gY2hhaS5zaG91bGQoKTtcbmNvbnN0IHNob3VsZFN0YXJ0U2VydmVyID0gcHJvY2Vzcy5lbnYuVVNFX1JVTk5JTkdfU0VSVkVSICE9PSBcIjBcIjtcbmNvbnN0IGNhcHMgPSB7cGxhdGZvcm1OYW1lOiBcIkZha2VcIiwgZGV2aWNlTmFtZTogXCJGYWtlXCIsIGFwcDogVEVTVF9GQUtFX0FQUH07XG5cbmRlc2NyaWJlKCdGYWtlRHJpdmVyIC0gdmlhIEhUVFAnLCAoKSA9PiB7XG4gIGxldCBzZXJ2ZXIgPSBudWxsO1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGlmIChzaG91bGRTdGFydFNlcnZlcikge1xuICAgICAgbGV0IGFyZ3MgPSBnZXREZWZhdWx0QXJncygpO1xuICAgICAgYXJncy5wb3J0ID0gVEVTVF9QT1JUO1xuICAgICAgYXJncy5ob3N0ID0gVEVTVF9IT1NUO1xuICAgICAgc2VydmVyID0gYXdhaXQgYXBwaXVtU2VydmVyKGFyZ3MpO1xuICAgIH1cbiAgfSk7XG4gIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICBpZiAoc2VydmVyKSB7XG4gICAgICBhd2FpdCBCLnByb21pc2lmeShzZXJ2ZXIuY2xvc2UuYmluZChzZXJ2ZXIpKSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Nlc3Npb24gaGFuZGxpbmcnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBzdGFydCBhbmQgc3RvcCBhIHNlc3Npb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgZHJpdmVyID0gd2QucHJvbWlzZUNoYWluUmVtb3RlKFRFU1RfSE9TVCwgVEVTVF9QT1JUKTtcbiAgICAgIGxldCBbc2Vzc2lvbklkXSA9IGF3YWl0IGRyaXZlci5pbml0KGNhcHMpO1xuICAgICAgc2hvdWxkLmV4aXN0KHNlc3Npb25JZCk7XG4gICAgICBzZXNzaW9uSWQuc2hvdWxkLmJlLmEoJ3N0cmluZycpO1xuICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICAgIGF3YWl0IGRyaXZlci50aXRsZSgpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvdGVybWluYXRlZC8pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHJ1biB0d28gRmFrZURyaXZlciBzZXNzaW9ucyBzaW11bHRhbmVvdXNseScsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBkcml2ZXIxID0gd2QucHJvbWlzZUNoYWluUmVtb3RlKFRFU1RfSE9TVCwgVEVTVF9QT1JUKTtcbiAgICAgIGxldCBbc2Vzc2lvbklkMV0gPSBhd2FpdCBkcml2ZXIxLmluaXQoY2Fwcyk7XG4gICAgICBzaG91bGQuZXhpc3Qoc2Vzc2lvbklkMSk7XG4gICAgICBzZXNzaW9uSWQxLnNob3VsZC5iZS5hKCdzdHJpbmcnKTtcbiAgICAgIGxldCBkcml2ZXIyID0gd2QucHJvbWlzZUNoYWluUmVtb3RlKFRFU1RfSE9TVCwgVEVTVF9QT1JUKTtcbiAgICAgIGxldCBbc2Vzc2lvbklkMl0gPSBhd2FpdCBkcml2ZXIyLmluaXQoY2Fwcyk7XG4gICAgICBzaG91bGQuZXhpc3Qoc2Vzc2lvbklkMik7XG4gICAgICBzZXNzaW9uSWQyLnNob3VsZC5iZS5hKCdzdHJpbmcnKTtcbiAgICAgIHNlc3Npb25JZDEuc2hvdWxkLm5vdC5lcXVhbChzZXNzaW9uSWQyKTtcbiAgICAgIGF3YWl0IGRyaXZlcjEucXVpdCgpO1xuICAgICAgYXdhaXQgZHJpdmVyMi5xdWl0KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBiZSBhYmxlIHRvIHJ1biB0d28gRmFrZURyaXZlciBzZXNzaW9ucyBzaW11bHRhbmVvdXNseSB3aGVuIG9uZSBpcyB1bmlxdWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgdW5pcXVlQ2FwcyA9IF8uY2xvbmUoY2Fwcyk7XG4gICAgICB1bmlxdWVDYXBzLnVuaXF1ZUFwcCA9IHRydWU7XG4gICAgICBsZXQgZHJpdmVyMSA9IHdkLnByb21pc2VDaGFpblJlbW90ZShURVNUX0hPU1QsIFRFU1RfUE9SVCk7XG4gICAgICBsZXQgW3Nlc3Npb25JZDFdID0gYXdhaXQgZHJpdmVyMS5pbml0KHVuaXF1ZUNhcHMpO1xuICAgICAgc2hvdWxkLmV4aXN0KHNlc3Npb25JZDEpO1xuICAgICAgc2Vzc2lvbklkMS5zaG91bGQuYmUuYSgnc3RyaW5nJyk7XG4gICAgICBsZXQgZHJpdmVyMiA9IHdkLnByb21pc2VDaGFpblJlbW90ZShURVNUX0hPU1QsIFRFU1RfUE9SVCk7XG4gICAgICBhd2FpdCBkcml2ZXIyLmluaXQoY2Fwcykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XG4gICAgICBhd2FpdCBkcml2ZXIxLnF1aXQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdXNlIHRoZSBuZXdDb21tYW5kVGltZW91dCBvZiB0aGUgaW5uZXIgRHJpdmVyIG9uIHNlc3Npb24gY3JlYXRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgZHJpdmVyID0gd2QucHJvbWlzZUNoYWluUmVtb3RlKFRFU1RfSE9TVCwgVEVTVF9QT1JUKTtcblxuICAgICAgY2Fwcy5uZXdDb21tYW5kVGltZW91dCA9IDAuMjU7XG5cbiAgICAgIGxldCBbc2Vzc2lvbklkXSA9IGF3YWl0IGRyaXZlci5pbml0KGNhcHMpO1xuICAgICAgc2hvdWxkLmV4aXN0KHNlc3Npb25JZCk7XG5cbiAgICAgIGF3YWl0IEIuZGVsYXkoMjUwKTtcbiAgICAgIGF3YWl0IGRyaXZlci5zb3VyY2UoKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL3Rlcm1pbmF0ZWQvKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==