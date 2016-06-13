// these are extra unit tests to ensure that appium is set up correctly for publishing

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

_chai2['default'].use(_chaiAsPromised2['default']);
var expect = _chai2['default'].expect;

describe('shrinkwrap checks', function () {
  it('shrinkwrap file should exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          require('../../npm-shrinkwrap.json');

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('shrinkwrap should not include fsevents', function callee$1$0() {
    var shrinkwrap, message;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          shrinkwrap = require('../../npm-shrinkwrap.json');

          expect(shrinkwrap.dependencies, 'no shrinkwrap file found. run `npm shrinkwrap`').to.exist;
          _lodash2['default'].values(shrinkwrap.dependencies).length.should.be.above(10);
          message = "'fsevents' entry found in shrinkwrap. It causes problems " + "on non-Mac systems. run `gulp fixShrinkwrap` and try again";

          expect(shrinkwrap.dependencies.fsevents, message).to.not.exist;

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// fsevents is an optional dep that only works on Mac.
// if it's in shrinkwrap, non-Mac hosts won't be able to install appium
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc2hyaW5rd3JhcC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3NCQUVjLFFBQVE7Ozs7b0JBQ0wsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7QUFFN0Msa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQztBQUN6QixJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO0FBQ2xDLElBQUUsQ0FBQyw4QkFBOEIsRUFBRTs7OztBQUNqQyxpQkFBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Ozs7Ozs7R0FDdEMsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtRQUd2QyxVQUFVLEVBR1YsT0FBTzs7OztBQUhQLG9CQUFVLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDOztBQUNyRCxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsZ0RBQWdELENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQzNGLDhCQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pELGlCQUFPLEdBQUcsMkRBQTJELEdBQzNELDREQUE0RDs7QUFDMUUsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUNoRSxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9zaHJpbmt3cmFwLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdGhlc2UgYXJlIGV4dHJhIHVuaXQgdGVzdHMgdG8gZW5zdXJlIHRoYXQgYXBwaXVtIGlzIHNldCB1cCBjb3JyZWN0bHkgZm9yIHB1Ymxpc2hpbmdcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG52YXIgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XG5cbmRlc2NyaWJlKCdzaHJpbmt3cmFwIGNoZWNrcycsICgpID0+IHtcbiAgaXQoJ3Nocmlua3dyYXAgZmlsZSBzaG91bGQgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVxdWlyZSgnLi4vLi4vbnBtLXNocmlua3dyYXAuanNvbicpO1xuICB9KTtcblxuICBpdCgnc2hyaW5rd3JhcCBzaG91bGQgbm90IGluY2x1ZGUgZnNldmVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgLy8gZnNldmVudHMgaXMgYW4gb3B0aW9uYWwgZGVwIHRoYXQgb25seSB3b3JrcyBvbiBNYWMuXG4gICAgLy8gaWYgaXQncyBpbiBzaHJpbmt3cmFwLCBub24tTWFjIGhvc3RzIHdvbid0IGJlIGFibGUgdG8gaW5zdGFsbCBhcHBpdW1cbiAgICBsZXQgc2hyaW5rd3JhcCA9IHJlcXVpcmUoJy4uLy4uL25wbS1zaHJpbmt3cmFwLmpzb24nKTtcbiAgICBleHBlY3Qoc2hyaW5rd3JhcC5kZXBlbmRlbmNpZXMsICdubyBzaHJpbmt3cmFwIGZpbGUgZm91bmQuIHJ1biBgbnBtIHNocmlua3dyYXBgJykudG8uZXhpc3Q7XG4gICAgXy52YWx1ZXMoc2hyaW5rd3JhcC5kZXBlbmRlbmNpZXMpLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMTApO1xuICAgIHZhciBtZXNzYWdlID0gXCInZnNldmVudHMnIGVudHJ5IGZvdW5kIGluIHNocmlua3dyYXAuIEl0IGNhdXNlcyBwcm9ibGVtcyBcIiArXG4gICAgICAgICAgICAgICAgICBcIm9uIG5vbi1NYWMgc3lzdGVtcy4gcnVuIGBndWxwIGZpeFNocmlua3dyYXBgIGFuZCB0cnkgYWdhaW5cIjtcbiAgICBleHBlY3Qoc2hyaW5rd3JhcC5kZXBlbmRlbmNpZXMuZnNldmVudHMsIG1lc3NhZ2UpLnRvLm5vdC5leGlzdDtcbiAgfSk7XG59KTtcbiJdfQ==