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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYlxcZ3JpZC1yZWdpc3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzhCQUFvQixpQkFBaUI7Ozs7NkJBQ2xCLGdCQUFnQjs7c0JBQ2hCLFVBQVU7Ozs7QUFHN0IsU0FBZSxZQUFZLENBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJO01BQzdDLElBQUk7Ozs7QUFBSixZQUFJOzs7eUNBRU8sa0JBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7OztBQUE3QyxZQUFJOzs7Ozs7OztBQUVKLDRCQUFPLEtBQUssb0VBQWtFLGVBQUksT0FBTyxDQUFHLENBQUM7Ozs7WUFLMUYsSUFBSTs7Ozs7QUFDUCw0QkFBTyxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQzs7Ozs7eUNBRzdFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzs7Ozs7OztDQUNwQzs7QUFFRCxTQUFlLGNBQWMsQ0FBRSxZQUFZLEVBQUUsVUFBVTtNQUUvQyxRQUFRLEVBSVIsVUFBVTs7Ozs7O3lDQUpPLGlDQUFRLFlBQVksQ0FBQzs7O0FBQXRDLGdCQUFROztjQUNSLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUE7Ozs7O2NBQ2pELElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7QUFFL0Isa0JBQVUsd0RBQXNELFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxTQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTzs7QUFDeEksNEJBQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7OztBQUV6Qiw0QkFBTyxLQUFLLHNEQUFvRCxlQUFJLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRWxGOztBQUVELFNBQWUsV0FBVyxDQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtNQUV0QyxVQUFVLEVBc0JWLFlBQVksRUFLWixZQUFZLEVBYVosaUJBQWlCOzs7O0FBeENqQixrQkFBVTs7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LElBQUksQ0FBQzs7QUFDNUMsWUFBSSxZQUFZLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTs7QUFFakMsOEJBQU8sS0FBSywrQkFBNkIsWUFBWSxDQUFDLEdBQUcsQ0FBRyxDQUFDO1NBQzlEOzRDQUNNLFlBQVksQ0FBQyxPQUFPOzs7Ozs7QUFFM0IsNEJBQU8sS0FBSyxrQ0FBZ0MsZUFBSSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUU5RDs7cUJBR2MsWUFBWSIsImZpbGUiOiJsaWJcXGdyaWQtcmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuXG5hc3luYyBmdW5jdGlvbiByZWdpc3Rlck5vZGUgKGNvbmZpZ0ZpbGUsIGFkZHIsIHBvcnQpIHtcbiAgbGV0IGRhdGE7XG4gIHRyeSB7XG4gICAgZGF0YSA9IGF3YWl0IGZzLnJlYWRGaWxlKGNvbmZpZ0ZpbGUsICd1dGYtOCcpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZXJyb3IoYFVuYWJsZSB0byBsb2FkIG5vZGUgY29uZmlndXJhdGlvbiBmaWxlIHRvIHJlZ2lzdGVyIHdpdGggZ3JpZDogJHtlcnIubWVzc2FnZX1gKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDaGVjayBwcmVzZW5jZSBvZiBkYXRhIGJlZm9yZSBwb3N0aW5nICBpdCB0byB0aGUgc2VsZW5pdW0gZ3JpZFxuICBpZiAoIWRhdGEpIHtcbiAgICBsb2dnZXIuZXJyb3IoJ05vIGRhdGEgZm91bmQgaW4gdGhlIG5vZGUgY29uZmlndXJhdGlvbiBmaWxlIHRvIHNlbmQgdG8gdGhlIGdyaWQnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgYXdhaXQgcG9zdFJlcXVlc3QoZGF0YSwgYWRkciwgcG9ydCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVG9HcmlkIChvcHRpb25zX3Bvc3QsIGpzb25PYmplY3QpIHtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0KG9wdGlvbnNfcG9zdCk7XG4gICAgaWYgKHJlc3BvbnNlID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVlc3QgZmFpbGVkJyk7XG4gICAgfVxuICAgIGxldCBsb2dNZXNzYWdlID0gYEFwcGl1bSBzdWNjZXNzZnVsbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBncmlkIG9uICR7anNvbk9iamVjdC5jb25maWd1cmF0aW9uLmh1Ykhvc3R9OiR7anNvbk9iamVjdC5jb25maWd1cmF0aW9uLmh1YlBvcnR9YDtcbiAgICBsb2dnZXIuZGVidWcobG9nTWVzc2FnZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5lcnJvcihgUmVxdWVzdCB0byByZWdpc3RlciB3aXRoIGdyaWQgd2FzIHVuc3VjY2Vzc2Z1bDogJHtlcnIubWVzc2FnZX1gKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBwb3N0UmVxdWVzdCAoZGF0YSwgYWRkciwgcG9ydCkge1xuICAvLyBwYXJzZSBqc29uIHRvIGdldCBodWIgaG9zdCBhbmQgcG9ydFxuICBsZXQganNvbk9iamVjdDtcbiAgdHJ5IHtcbiAgICBqc29uT2JqZWN0ID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmVycm9yQW5kVGhyb3coYFN5bnRheCBlcnJvciBpbiBub2RlIGNvbmZpZ3VyYXRpb24gZmlsZTogJHtlcnIubWVzc2FnZX1gKTtcbiAgfVxuXG4gIC8vIGlmIHRoZSBub2RlIGNvbmZpZyBkb2VzIG5vdCBoYXZlIHRoZSBhcHBpdW0vd2ViZHJpdmVyIHVybCwgaG9zdCwgYW5kIHBvcnQsXG4gIC8vIGF1dG9tYXRpY2FsbHkgYWRkIGl0IGJhc2VkIG9uIGhvdyBhcHBpdW0gd2FzIGluaXRpYWxpemVkXG4gIC8vIG90aGVyd2lzZSwgd2Ugd2lsbCB0YWtlIHdoYXRldmVyIHRoZSB1c2VyIHNldHVwXG4gIC8vIGJlY2F1c2Ugd2Ugd2lsbCBhbHdheXMgc2V0IGxvY2FsaG9zdC8xMjcuMC4wLjEuIHRoaXMgd29uJ3Qgd29yayBpZiB5b3VyXG4gIC8vIG5vZGUgYW5kIGdyaWQgYXJlbid0IGluIHRoZSBzYW1lIHBsYWNlXG4gIGlmICghanNvbk9iamVjdC5jb25maWd1cmF0aW9uLnVybCB8fCAhanNvbk9iamVjdC5jb25maWd1cmF0aW9uLmhvc3QgfHwgIWpzb25PYmplY3QuY29uZmlndXJhdGlvbi5wb3J0KSB7XG4gICAganNvbk9iamVjdC5jb25maWd1cmF0aW9uLnVybCA9IGBodHRwOi8vJHthZGRyfToke3BvcnR9L3dkL2h1YmA7XG4gICAganNvbk9iamVjdC5jb25maWd1cmF0aW9uLmhvc3QgPSBhZGRyO1xuICAgIGpzb25PYmplY3QuY29uZmlndXJhdGlvbi5wb3J0ID0gcG9ydDtcblxuICAgIC8vIHJlLXNlcmlhbGl6ZSB0aGUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBhdXRvIHBvcHVsYXRlZCBkYXRhXG4gICAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KGpzb25PYmplY3QpO1xuICB9XG5cbiAgLy8gcHJlcGFyZSB0aGUgaGVhZGVyXG4gIGxldCBwb3N0X2hlYWRlcnMgPSB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnQ29udGVudC1MZW5ndGgnOiBkYXRhLmxlbmd0aFxuICB9O1xuICAvLyB0aGUgcG9zdCBvcHRpb25zXG4gIGxldCBwb3N0X29wdGlvbnMgPSB7XG4gICAgdXJsOiBgaHR0cDovLyR7anNvbk9iamVjdC5jb25maWd1cmF0aW9uLmh1Ykhvc3R9OiR7anNvbk9iamVjdC5jb25maWd1cmF0aW9uLmh1YlBvcnR9L2dyaWQvcmVnaXN0ZXJgLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGRhdGEsXG4gICAgaGVhZGVyczogcG9zdF9oZWFkZXJzLFxuICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlIC8vIHJldHVybiB0aGUgZnVsbCByZXNwb25zZSwgbm90IGp1c3QgdGhlIGJvZHlcbiAgfTtcblxuICBpZiAoanNvbk9iamVjdC5jb25maWd1cmF0aW9uLnJlZ2lzdGVyICE9PSB0cnVlKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBObyByZWdpc3RyYXRpb24gc2VudCAoJHtqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJ9ID0gZmFsc2UpYCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHJlZ2lzdGVyQ3ljbGVUaW1lID0ganNvbk9iamVjdC5jb25maWd1cmF0aW9uLnJlZ2lzdGVyQ3ljbGU7XG4gIGlmIChyZWdpc3RlckN5Y2xlVGltZSAhPT0gbnVsbCAmJiByZWdpc3RlckN5Y2xlVGltZSA+IDApIHtcbiAgICAvLyBpbml0aWF0ZSBhIG5ldyBUaHJlYWRcbiAgICBsZXQgZmlyc3QgPSB0cnVlO1xuICAgIGxvZ2dlci5kZWJ1ZyhgU3RhcnRpbmcgYXV0byByZWdpc3RlciB0aHJlYWQgZm9yIGdyaWQuIFdpbGwgdHJ5IHRvIHJlZ2lzdGVyIGV2ZXJ5ICR7cmVnaXN0ZXJDeWNsZVRpbWV9IG1zLmApO1xuICAgIHNldEludGVydmFsKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChmaXJzdCAhPT0gdHJ1ZSkge1xuICAgICAgICBsZXQgaXNSZWdpc3RlcmVkID0gYXdhaXQgaXNBbHJlYWR5UmVnaXN0ZXJlZChqc29uT2JqZWN0KTtcbiAgICAgICAgaWYgKGlzUmVnaXN0ZXJlZCAhPT0gbnVsbCAmJiBpc1JlZ2lzdGVyZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAvLyBtYWtlIHRoZSBodHRwIFBPU1QgdG8gdGhlIGdyaWQgZm9yIHJlZ2lzdHJhdGlvblxuICAgICAgICAgIGF3YWl0IHJlZ2lzdGVyVG9HcmlkKHBvc3Rfb3B0aW9ucywganNvbk9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHJlZ2lzdGVyVG9HcmlkKHBvc3Rfb3B0aW9ucywganNvbk9iamVjdCk7XG4gICAgICB9XG4gICAgfSwgcmVnaXN0ZXJDeWNsZVRpbWUpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGlzQWxyZWFkeVJlZ2lzdGVyZWQgKGpzb25PYmplY3QpIHtcbiAgLy9jaGVjayBpZiBub2RlIGlzIGFscmVhZHkgcmVnaXN0ZXJlZFxuICBsZXQgaWQgPSBgaHR0cDovLyR7anNvbk9iamVjdC5jb25maWd1cmF0aW9uLmhvc3R9OiR7anNvbk9iamVjdC5jb25maWd1cmF0aW9uLnBvcnR9YDtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVyaTogYGh0dHA6Ly8ke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5odWJIb3N0fToke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5odWJQb3J0fS9ncmlkL2FwaS9wcm94eT9pZD0ke2lkfWAsXG4gICAgICBtZXRob2QgIDogJ0dFVCcsXG4gICAgICB0aW1lb3V0IDogMTAwMDAsXG4gICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSAvLyByZXR1cm4gdGhlIGZ1bGwgcmVzcG9uc2UsIG5vdCBqdXN0IHRoZSBib2R5XG4gICAgfSk7XG4gICAgaWYgKHJlc3BvbnNlID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlcXVlc3QgZmFpbGVkYCk7XG4gICAgfVxuICAgIGxldCByZXNwb25zZURhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmJvZHkpO1xuICAgIGlmIChyZXNwb25zZURhdGEuc3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgLy8gaWYgcmVnaXN0ZXIgZmFpbCwgcHJpbnQgdGhlIGRlYnVnIG1zZ1xuICAgICAgbG9nZ2VyLmRlYnVnKGBHcmlkIHJlZ2lzdHJhdGlvbiBlcnJvcjogJHtyZXNwb25zZURhdGEubXNnfWApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VEYXRhLnN1Y2Nlc3M7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5kZWJ1ZyhgSHViIGRvd24gb3Igbm90IHJlc3BvbmRpbmc6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCByZWdpc3Rlck5vZGU7XG4iXX0=