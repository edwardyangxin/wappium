'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _appiumSupport = require('appium-support');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function registerNode(configFile, addr, port) {
  var data;
  return _regeneratorRuntime.async(function registerNode$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        data = undefined;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(configFile, 'utf-8'));

      case 4:
        data = context$1$0.sent;
        context$1$0.next = 11;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        _logger2['default'].error('Unable to load node configuration file to register with grid: ' + context$1$0.t0.message);
        return context$1$0.abrupt('return');

      case 11:
        if (data) {
          context$1$0.next = 14;
          break;
        }

        _logger2['default'].error('No data found in the node configuration file to send to the grid');
        return context$1$0.abrupt('return');

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(postRequest(data, addr, port));

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
}

function registerToGrid(options_post, jsonObject) {
  var response, logMessage;
  return _regeneratorRuntime.async(function registerToGrid$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _requestPromise2['default'])(options_post));

      case 3:
        response = context$1$0.sent;

        if (!(response === undefined || response.statusCode !== 200)) {
          context$1$0.next = 6;
          break;
        }

        throw new Error('Request failed');

      case 6:
        logMessage = 'Appium successfully registered with the grid on ' + jsonObject.configuration.hubHost + ':' + jsonObject.configuration.hubPort;

        _logger2['default'].debug(logMessage);
        context$1$0.next = 13;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](0);

        _logger2['default'].error('Request to register with grid was unsuccessful: ' + context$1$0.t0.message);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 10]]);
}

function postRequest(data, addr, port) {
  var jsonObject, post_headers, post_options, registerCycleTime;
  return _regeneratorRuntime.async(function postRequest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        jsonObject = undefined;

        try {
          jsonObject = JSON.parse(data);
        } catch (err) {
          _logger2['default'].errorAndThrow('Syntax error in node configuration file: ' + err.message);
        }

        // if the node config does not have the appium/webdriver url, host, and port,
        // automatically add it based on how appium was initialized
        // otherwise, we will take whatever the user setup
        // because we will always set localhost/127.0.0.1. this won't work if your
        // node and grid aren't in the same place
        if (!jsonObject.configuration.url || !jsonObject.configuration.host || !jsonObject.configuration.port) {
          jsonObject.configuration.url = 'http://' + addr + ':' + port + '/wd/hub';
          jsonObject.configuration.host = addr;
          jsonObject.configuration.port = port;

          // re-serialize the configuration with the auto populated data
          data = JSON.stringify(jsonObject);
        }

        // prepare the header
        post_headers = {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        };
        post_options = {
          url: 'http://' + jsonObject.configuration.hubHost + ':' + jsonObject.configuration.hubPort + '/grid/register',
          method: 'POST',
          body: data,
          headers: post_headers,
          resolveWithFullResponse: true // return the full response, not just the body
        };

        if (!(jsonObject.configuration.register !== true)) {
          context$1$0.next = 8;
          break;
        }

        _logger2['default'].debug('No registration sent (' + jsonObject.configuration.register + ' = false)');
        return context$1$0.abrupt('return');

      case 8:
        registerCycleTime = jsonObject.configuration.registerCycle;

        if (registerCycleTime !== null && registerCycleTime > 0) {
          (function () {
            // initiate a new Thread
            var first = true;
            _logger2['default'].debug('Starting auto register thread for grid. Will try to register every ' + registerCycleTime + ' ms.');
            setInterval(function callee$2$0() {
              var isRegistered;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    if (!(first !== true)) {
                      context$3$0.next = 9;
                      break;
                    }

                    context$3$0.next = 3;
                    return _regeneratorRuntime.awrap(isAlreadyRegistered(jsonObject));

                  case 3:
                    isRegistered = context$3$0.sent;

                    if (!(isRegistered !== null && isRegistered !== true)) {
                      context$3$0.next = 7;
                      break;
                    }

                    context$3$0.next = 7;
                    return _regeneratorRuntime.awrap(registerToGrid(post_options, jsonObject));

                  case 7:
                    context$3$0.next = 12;
                    break;

                  case 9:
                    first = false;
                    context$3$0.next = 12;
                    return _regeneratorRuntime.awrap(registerToGrid(post_options, jsonObject));

                  case 12:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, this);
            }, registerCycleTime);
          })();
        }

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function isAlreadyRegistered(jsonObject) {
  var id, response, responseData;
  return _regeneratorRuntime.async(function isAlreadyRegistered$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        id = 'http://' + jsonObject.configuration.host + ':' + jsonObject.configuration.port;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
          uri: 'http://' + jsonObject.configuration.hubHost + ':' + jsonObject.configuration.hubPort + '/grid/api/proxy?id=' + id,
          method: 'GET',
          timeout: 10000,
          resolveWithFullResponse: true // return the full response, not just the body
        }));

      case 4:
        response = context$1$0.sent;

        if (!(response === undefined || response.statusCode !== 200)) {
          context$1$0.next = 7;
          break;
        }

        throw new Error('Request failed');

      case 7:
        responseData = JSON.parse(response.body);

        if (responseData.success !== true) {
          // if register fail, print the debug msg
          _logger2['default'].debug('Grid registration error: ' + responseData.msg);
        }
        return context$1$0.abrupt('return', responseData.success);

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](1);

        _logger2['default'].debug('Hub down or not responding: ' + context$1$0.t0.message);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 12]]);
}

exports['default'] = registerNode;
module.exports = exports['default'];

// Check presence of data before posting  it to the selenium grid

// parse json to get hub host and port

// the post options

// make the http POST to the grid for registration

//check if node is already registered
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9ncmlkLXJlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OEJBQW9CLGlCQUFpQjs7Ozs2QkFDbEIsZ0JBQWdCOztzQkFDaEIsVUFBVTs7OztBQUc3QixTQUFlLFlBQVksQ0FBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUk7TUFDN0MsSUFBSTs7OztBQUFKLFlBQUk7Ozt5Q0FFTyxrQkFBRyxRQUFRLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQzs7O0FBQTdDLFlBQUk7Ozs7Ozs7O0FBRUosNEJBQU8sS0FBSyxvRUFBa0UsZUFBSSxPQUFPLENBQUcsQ0FBQzs7OztZQUsxRixJQUFJOzs7OztBQUNQLDRCQUFPLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDOzs7Ozt5Q0FHN0UsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7Ozs7O0NBQ3BDOztBQUVELFNBQWUsY0FBYyxDQUFFLFlBQVksRUFBRSxVQUFVO01BRS9DLFFBQVEsRUFJUixVQUFVOzs7Ozs7eUNBSk8saUNBQVEsWUFBWSxDQUFDOzs7QUFBdEMsZ0JBQVE7O2NBQ1IsUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQTs7Ozs7Y0FDakQsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUM7OztBQUUvQixrQkFBVSx3REFBc0QsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLFNBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPOztBQUN4SSw0QkFBTyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7Ozs7O0FBRXpCLDRCQUFPLEtBQUssc0RBQW9ELGVBQUksT0FBTyxDQUFHLENBQUM7Ozs7Ozs7Q0FFbEY7O0FBRUQsU0FBZSxXQUFXLENBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO01BRXRDLFVBQVUsRUFzQlYsWUFBWSxFQUtaLFlBQVksRUFhWixpQkFBaUI7Ozs7QUF4Q2pCLGtCQUFVOztB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SUFBSSxDQUFDOztBQUM1QyxZQUFJLFlBQVksQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFOztBQUVqQyw4QkFBTyxLQUFLLCtCQUE2QixZQUFZLENBQUMsR0FBRyxDQUFHLENBQUM7U0FDOUQ7NENBQ00sWUFBWSxDQUFDLE9BQU87Ozs7OztBQUUzQiw0QkFBTyxLQUFLLGtDQUFnQyxlQUFJLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRTlEOztxQkFHYyxZQUFZIiwiZmlsZSI6ImxpYi9ncmlkLXJlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5cblxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJOb2RlIChjb25maWdGaWxlLCBhZGRyLCBwb3J0KSB7XG4gIGxldCBkYXRhO1xuICB0cnkge1xuICAgIGRhdGEgPSBhd2FpdCBmcy5yZWFkRmlsZShjb25maWdGaWxlLCAndXRmLTgnKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBVbmFibGUgdG8gbG9hZCBub2RlIGNvbmZpZ3VyYXRpb24gZmlsZSB0byByZWdpc3RlciB3aXRoIGdyaWQ6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQ2hlY2sgcHJlc2VuY2Ugb2YgZGF0YSBiZWZvcmUgcG9zdGluZyAgaXQgdG8gdGhlIHNlbGVuaXVtIGdyaWRcbiAgaWYgKCFkYXRhKSB7XG4gICAgbG9nZ2VyLmVycm9yKCdObyBkYXRhIGZvdW5kIGluIHRoZSBub2RlIGNvbmZpZ3VyYXRpb24gZmlsZSB0byBzZW5kIHRvIHRoZSBncmlkJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGF3YWl0IHBvc3RSZXF1ZXN0KGRhdGEsIGFkZHIsIHBvcnQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWdpc3RlclRvR3JpZCAob3B0aW9uc19wb3N0LCBqc29uT2JqZWN0KSB7XG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdChvcHRpb25zX3Bvc3QpO1xuICAgIGlmIChyZXNwb25zZSA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1ZXN0IGZhaWxlZCcpO1xuICAgIH1cbiAgICBsZXQgbG9nTWVzc2FnZSA9IGBBcHBpdW0gc3VjY2Vzc2Z1bGx5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ3JpZCBvbiAke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5odWJIb3N0fToke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5odWJQb3J0fWA7XG4gICAgbG9nZ2VyLmRlYnVnKGxvZ01lc3NhZ2UpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZXJyb3IoYFJlcXVlc3QgdG8gcmVnaXN0ZXIgd2l0aCBncmlkIHdhcyB1bnN1Y2Nlc3NmdWw6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdFJlcXVlc3QgKGRhdGEsIGFkZHIsIHBvcnQpIHtcbiAgLy8gcGFyc2UganNvbiB0byBnZXQgaHViIGhvc3QgYW5kIHBvcnRcbiAgbGV0IGpzb25PYmplY3Q7XG4gIHRyeSB7XG4gICAganNvbk9iamVjdCA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5lcnJvckFuZFRocm93KGBTeW50YXggZXJyb3IgaW4gbm9kZSBjb25maWd1cmF0aW9uIGZpbGU6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH1cblxuICAvLyBpZiB0aGUgbm9kZSBjb25maWcgZG9lcyBub3QgaGF2ZSB0aGUgYXBwaXVtL3dlYmRyaXZlciB1cmwsIGhvc3QsIGFuZCBwb3J0LFxuICAvLyBhdXRvbWF0aWNhbGx5IGFkZCBpdCBiYXNlZCBvbiBob3cgYXBwaXVtIHdhcyBpbml0aWFsaXplZFxuICAvLyBvdGhlcndpc2UsIHdlIHdpbGwgdGFrZSB3aGF0ZXZlciB0aGUgdXNlciBzZXR1cFxuICAvLyBiZWNhdXNlIHdlIHdpbGwgYWx3YXlzIHNldCBsb2NhbGhvc3QvMTI3LjAuMC4xLiB0aGlzIHdvbid0IHdvcmsgaWYgeW91clxuICAvLyBub2RlIGFuZCBncmlkIGFyZW4ndCBpbiB0aGUgc2FtZSBwbGFjZVxuICBpZiAoIWpzb25PYmplY3QuY29uZmlndXJhdGlvbi51cmwgfHwgIWpzb25PYmplY3QuY29uZmlndXJhdGlvbi5ob3N0IHx8ICFqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24ucG9ydCkge1xuICAgIGpzb25PYmplY3QuY29uZmlndXJhdGlvbi51cmwgPSBgaHR0cDovLyR7YWRkcn06JHtwb3J0fS93ZC9odWJgO1xuICAgIGpzb25PYmplY3QuY29uZmlndXJhdGlvbi5ob3N0ID0gYWRkcjtcbiAgICBqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24ucG9ydCA9IHBvcnQ7XG5cbiAgICAvLyByZS1zZXJpYWxpemUgdGhlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgYXV0byBwb3B1bGF0ZWQgZGF0YVxuICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShqc29uT2JqZWN0KTtcbiAgfVxuXG4gIC8vIHByZXBhcmUgdGhlIGhlYWRlclxuICBsZXQgcG9zdF9oZWFkZXJzID0ge1xuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgJ0NvbnRlbnQtTGVuZ3RoJzogZGF0YS5sZW5ndGhcbiAgfTtcbiAgLy8gdGhlIHBvc3Qgb3B0aW9uc1xuICBsZXQgcG9zdF9vcHRpb25zID0ge1xuICAgIHVybDogYGh0dHA6Ly8ke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5odWJIb3N0fToke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5odWJQb3J0fS9ncmlkL3JlZ2lzdGVyYCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBkYXRhLFxuICAgIGhlYWRlcnM6IHBvc3RfaGVhZGVycyxcbiAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSAvLyByZXR1cm4gdGhlIGZ1bGwgcmVzcG9uc2UsIG5vdCBqdXN0IHRoZSBib2R5XG4gIH07XG5cbiAgaWYgKGpzb25PYmplY3QuY29uZmlndXJhdGlvbi5yZWdpc3RlciAhPT0gdHJ1ZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgTm8gcmVnaXN0cmF0aW9uIHNlbnQgKCR7anNvbk9iamVjdC5jb25maWd1cmF0aW9uLnJlZ2lzdGVyfSA9IGZhbHNlKWApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCByZWdpc3RlckN5Y2xlVGltZSA9IGpzb25PYmplY3QuY29uZmlndXJhdGlvbi5yZWdpc3RlckN5Y2xlO1xuICBpZiAocmVnaXN0ZXJDeWNsZVRpbWUgIT09IG51bGwgJiYgcmVnaXN0ZXJDeWNsZVRpbWUgPiAwKSB7XG4gICAgLy8gaW5pdGlhdGUgYSBuZXcgVGhyZWFkXG4gICAgbGV0IGZpcnN0ID0gdHJ1ZTtcbiAgICBsb2dnZXIuZGVidWcoYFN0YXJ0aW5nIGF1dG8gcmVnaXN0ZXIgdGhyZWFkIGZvciBncmlkLiBXaWxsIHRyeSB0byByZWdpc3RlciBldmVyeSAke3JlZ2lzdGVyQ3ljbGVUaW1lfSBtcy5gKTtcbiAgICBzZXRJbnRlcnZhbChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZmlyc3QgIT09IHRydWUpIHtcbiAgICAgICAgbGV0IGlzUmVnaXN0ZXJlZCA9IGF3YWl0IGlzQWxyZWFkeVJlZ2lzdGVyZWQoanNvbk9iamVjdCk7XG4gICAgICAgIGlmIChpc1JlZ2lzdGVyZWQgIT09IG51bGwgJiYgaXNSZWdpc3RlcmVkICE9PSB0cnVlKSB7XG4gICAgICAgICAgLy8gbWFrZSB0aGUgaHR0cCBQT1NUIHRvIHRoZSBncmlkIGZvciByZWdpc3RyYXRpb25cbiAgICAgICAgICBhd2FpdCByZWdpc3RlclRvR3JpZChwb3N0X29wdGlvbnMsIGpzb25PYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCByZWdpc3RlclRvR3JpZChwb3N0X29wdGlvbnMsIGpzb25PYmplY3QpO1xuICAgICAgfVxuICAgIH0sIHJlZ2lzdGVyQ3ljbGVUaW1lKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBpc0FscmVhZHlSZWdpc3RlcmVkIChqc29uT2JqZWN0KSB7XG4gIC8vY2hlY2sgaWYgbm9kZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWRcbiAgbGV0IGlkID0gYGh0dHA6Ly8ke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5ob3N0fToke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5wb3J0fWA7XG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmk6IGBodHRwOi8vJHtqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24uaHViSG9zdH06JHtqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24uaHViUG9ydH0vZ3JpZC9hcGkvcHJveHk/aWQ9JHtpZH1gLFxuICAgICAgbWV0aG9kICA6ICdHRVQnLFxuICAgICAgdGltZW91dCA6IDEwMDAwLFxuICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUgLy8gcmV0dXJuIHRoZSBmdWxsIHJlc3BvbnNlLCBub3QganVzdCB0aGUgYm9keVxuICAgIH0pO1xuICAgIGlmIChyZXNwb25zZSA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZXF1ZXN0IGZhaWxlZGApO1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZS5ib2R5KTtcbiAgICBpZiAocmVzcG9uc2VEYXRhLnN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgIC8vIGlmIHJlZ2lzdGVyIGZhaWwsIHByaW50IHRoZSBkZWJ1ZyBtc2dcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgR3JpZCByZWdpc3RyYXRpb24gZXJyb3I6ICR7cmVzcG9uc2VEYXRhLm1zZ31gKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlRGF0YS5zdWNjZXNzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZGVidWcoYEh1YiBkb3duIG9yIG5vdCByZXNwb25kaW5nOiAke2Vyci5tZXNzYWdlfWApO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXJOb2RlO1xuIl19