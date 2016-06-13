'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _wd = require('wd');

var _wd2 = _interopRequireDefault(_wd);

var TEST_HOST = 'localhost';
var TEST_PORT = 4723;
var TEST_FAKE_APP = _path2['default'].resolve(__dirname, "..", "..", "node_modules", "appium-fake-driver", "test", "fixtures", "app.xml");

function initSession(caps) {
  var _this = this;

  var resolve = function resolve() {};
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = _wd2['default'].promiseChainRemote({ host: TEST_HOST, port: TEST_PORT });
          resolve(driver);
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.init(caps));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.quit());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  return new _Promise(function (_resolve) {
    resolve = _resolve;
  });
}

exports.initSession = initSession;
exports.TEST_FAKE_APP = TEST_FAKE_APP;
exports.TEST_HOST = TEST_HOST;
exports.TEST_PORT = TEST_PORT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvaGVscGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7a0JBQ1IsSUFBSTs7OztBQUVuQixJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFDOUIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLElBQU0sYUFBYSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQ3JDLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQ3hDLFNBQVMsQ0FBQyxDQUFDOztBQUU5QyxTQUFTLFdBQVcsQ0FBRSxJQUFJLEVBQUU7OztBQUMxQixNQUFJLE9BQU8sR0FBRyxtQkFBTSxFQUFFLENBQUM7QUFDdkIsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsZ0JBQUcsa0JBQWtCLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ25FLGlCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7OzJDQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ3hCLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztHQUNwQixDQUFDLENBQUM7QUFDSCxTQUFPLGFBQVksVUFBQyxRQUFRLEVBQUs7QUFDL0IsV0FBTyxHQUFHLFFBQVEsQ0FBQztHQUNwQixDQUFDLENBQUM7Q0FDSjs7UUFFUSxXQUFXLEdBQVgsV0FBVztRQUFFLGFBQWEsR0FBYixhQUFhO1FBQUUsU0FBUyxHQUFULFNBQVM7UUFBRSxTQUFTLEdBQVQsU0FBUyIsImZpbGUiOiJ0ZXN0L2hlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB3ZCBmcm9tICd3ZCc7XG5cbmNvbnN0IFRFU1RfSE9TVCA9ICdsb2NhbGhvc3QnO1xuY29uc3QgVEVTVF9QT1JUID0gNDcyMztcbmNvbnN0IFRFU1RfRkFLRV9BUFAgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIFwiLi5cIiwgXCJub2RlX21vZHVsZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBpdW0tZmFrZS1kcml2ZXJcIiwgXCJ0ZXN0XCIsIFwiZml4dHVyZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHAueG1sXCIpO1xuXG5mdW5jdGlvbiBpbml0U2Vzc2lvbiAoY2Fwcykge1xuICBsZXQgcmVzb2x2ZSA9ICgpID0+IHt9O1xuICBsZXQgZHJpdmVyO1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGRyaXZlciA9IHdkLnByb21pc2VDaGFpblJlbW90ZSh7aG9zdDogVEVTVF9IT1NULCBwb3J0OiBURVNUX1BPUlR9KTtcbiAgICByZXNvbHZlKGRyaXZlcik7XG4gICAgYXdhaXQgZHJpdmVyLmluaXQoY2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgfSk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoX3Jlc29sdmUpID0+IHtcbiAgICByZXNvbHZlID0gX3Jlc29sdmU7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBpbml0U2Vzc2lvbiwgVEVTVF9GQUtFX0FQUCwgVEVTVF9IT1NULCBURVNUX1BPUlQgfTtcbiJdfQ==