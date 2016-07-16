'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _argparse = require('argparse');

var _packageJson = require('../../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var args = [[['--shell'], {
  required: false,
  defaultValue: null,
  help: 'Enter REPL mode',
  nargs: 0
}], [['--ipa'], {
  required: false,
  defaultValue: null,
  help: '(IOS-only) abs path to compiled .ipa file',
  example: '/abs/path/to/my.ipa'
}], [['-a', '--address'], {
  defaultValue: '0.0.0.0',
  required: false,
  example: '0.0.0.0',
  help: 'IP Address to listen on'
}], [['-p', '--port'], {
  defaultValue: 4723,
  required: false,
  type: 'int',
  example: '4723',
  help: 'port to listen on'
}], [['-ca', '--callback-address'], {
  required: false,
  dest: 'callbackAddress',
  defaultValue: null,
  example: '127.0.0.1',
  help: 'callback IP Address (default: same as --address)'
}], [['-cp', '--callback-port'], {
  required: false,
  dest: 'callbackPort',
  defaultValue: null,
  type: 'int',
  example: '4723',
  help: 'callback port (default: same as port)'
}], [['-bp', '--bootstrap-port'], {
  defaultValue: 4724,
  dest: 'bootstrapPort',
  required: false,
  type: 'int',
  example: '4724',
  help: '(Android-only) port to use on device to talk to Appium'
}], [['-r', '--backend-retries'], {
  defaultValue: 3,
  dest: 'backendRetries',
  required: false,
  type: 'int',
  example: '3',
  help: '(iOS-only) How many times to retry launching Instruments ' + 'before saying it crashed or timed out'
}], [['--session-override'], {
  defaultValue: false,
  dest: 'sessionOverride',
  action: 'storeTrue',
  required: false,
  help: 'Enables session override (clobbering)',
  nargs: 0
}], [['-l', '--pre-launch'], {
  defaultValue: false,
  dest: 'launch',
  action: 'storeTrue',
  required: false,
  help: 'Pre-launch the application before allowing the first session ' + '(Requires --app and, for Android, --app-pkg and --app-activity)',
  nargs: 0
}], [['-g', '--log'], {
  defaultValue: null,
  dest: 'log',
  required: false,
  example: '/path/to/appium.log',
  help: 'Also send log output to this file'
}], [['--log-level'], {
  choices: ['info', 'info:debug', 'info:info', 'info:warn', 'info:error', 'warn', 'warn:debug', 'warn:info', 'warn:warn', 'warn:error', 'error', 'error:debug', 'error:info', 'error:warn', 'error:error', 'debug', 'debug:debug', 'debug:info', 'debug:warn', 'debug:error'],
  defaultValue: 'debug',
  dest: 'loglevel',
  required: false,
  example: 'debug',
  help: 'log level; default (console[:file]): debug[:debug]'
}], [['--log-timestamp'], {
  defaultValue: false,
  required: false,
  help: 'Show timestamps in console output',
  nargs: 0,
  action: 'storeTrue',
  dest: 'logTimestamp'
}], [['--local-timezone'], {
  defaultValue: false,
  required: false,
  help: 'Use local timezone for timestamps',
  nargs: 0,
  action: 'storeTrue',
  dest: 'localTimezone'
}], [['--log-no-colors'], {
  defaultValue: false,
  required: false,
  help: 'Do not use colors in console output',
  nargs: 0,
  action: 'storeTrue',
  dest: 'logNoColors'
}], [['-G', '--webhook'], {
  defaultValue: null,
  required: false,
  example: 'localhost:9876',
  help: 'Also send log output to this HTTP listener'
}], [['--safari'], {
  defaultValue: false,
  action: 'storeTrue',
  required: false,
  help: '(IOS-Only) Use the safari app',
  nargs: 0
}], [['--default-device', '-dd'], {
  dest: 'defaultDevice',
  defaultValue: false,
  action: 'storeTrue',
  required: false,
  help: '(IOS-Simulator-only) use the default simulator that instruments ' + 'launches on its own'
}], [['--force-iphone'], {
  defaultValue: false,
  dest: 'forceIphone',
  action: 'storeTrue',
  required: false,
  help: '(IOS-only) Use the iPhone Simulator no matter what the app wants',
  nargs: 0
}], [['--force-ipad'], {
  defaultValue: false,
  dest: 'forceIpad',
  action: 'storeTrue',
  required: false,
  help: '(IOS-only) Use the iPad Simulator no matter what the app wants',
  nargs: 0
}], [['--tracetemplate'], {
  defaultValue: null,
  dest: 'automationTraceTemplatePath',
  required: false,
  example: '/Users/me/Automation.tracetemplate',
  help: '(IOS-only) .tracetemplate file to use with Instruments'
}], [['--instruments'], {
  defaultValue: null,
  dest: 'instrumentsPath',
  require: false,
  example: '/path/to/instruments',
  help: '(IOS-only) path to instruments binary'
}], [['--nodeconfig'], {
  required: false,
  defaultValue: null,
  help: 'Configuration JSON file to register appium with selenium grid',
  example: '/abs/path/to/nodeconfig.json'
}], [['-ra', '--robot-address'], {
  defaultValue: '0.0.0.0',
  dest: 'robotAddress',
  required: false,
  example: '0.0.0.0',
  help: 'IP Address of robot'
}], [['-rp', '--robot-port'], {
  defaultValue: -1,
  dest: 'robotPort',
  required: false,
  type: 'int',
  example: '4242',
  help: 'port for robot'
}], [['--selendroid-port'], {
  defaultValue: 8080,
  dest: 'selendroidPort',
  required: false,
  type: 'int',
  example: '8080',
  help: 'Local port used for communication with Selendroid'
}], [['--chromedriver-port'], {
  defaultValue: 9515,
  dest: 'chromeDriverPort',
  required: false,
  type: 'int',
  example: '9515',
  help: 'Port upon which ChromeDriver will run'
}], [['--chromedriver-executable'], {
  defaultValue: null,
  dest: 'chromedriverExecutable',
  required: false,
  help: 'ChromeDriver executable full path'
}], [['--show-config'], {
  defaultValue: false,
  dest: 'showConfig',
  action: 'storeTrue',
  required: false,
  help: 'Show info about the appium server configuration and exit'
}], [['--no-perms-check'], {
  defaultValue: false,
  dest: 'noPermsCheck',
  action: 'storeTrue',
  required: false,
  help: 'Bypass Appium\'s checks to ensure we can read/write necessary files'
}], [['--strict-caps'], {
  defaultValue: false,
  dest: 'enforceStrictCaps',
  action: 'storeTrue',
  required: false,
  help: 'Cause sessions to fail if desired caps are sent in that Appium ' + 'does not recognize as valid for the selected device',
  nargs: 0
}], [['--isolate-sim-device'], {
  defaultValue: false,
  dest: 'isolateSimDevice',
  action: 'storeTrue',
  required: false,
  help: 'Xcode 6 has a bug on some platforms where a certain simulator ' + 'can only be launched without error if all other simulator devices ' + 'are first deleted. This option causes Appium to delete all ' + 'devices other than the one being used by Appium. Note that this ' + 'is a permanent deletion, and you are responsible for using simctl ' + 'or xcode to manage the categories of devices used with Appium.',
  nargs: 0
}], [['--tmp'], {
  defaultValue: null,
  dest: 'tmpDir',
  required: false,
  help: 'Absolute path to directory Appium can use to manage temporary ' + 'files, like built-in iOS apps it needs to move around. On *nix/Mac ' + 'defaults to /tmp, on Windows defaults to C:\\Windows\\Temp'
}], [['--trace-dir'], {
  defaultValue: null,
  dest: 'traceDir',
  required: false,
  help: 'Absolute path to directory Appium use to save ios instruments ' + 'traces, defaults to <tmp dir>/appium-instruments'
}], [['--debug-log-spacing'], {
  dest: 'debugLogSpacing',
  defaultValue: false,
  action: 'storeTrue',
  required: false,
  help: 'Add exaggerated spacing in logs to help with visual inspection'
}], [['--suppress-adb-kill-server'], {
  dest: 'suppressAdbKillServer',
  defaultValue: false,
  action: 'storeTrue',
  required: false,
  help: '(Android-only) If set, prevents Appium from killing the adb server instance',
  nargs: 0
}], [['--async-trace'], {
  dest: 'asyncTrace',
  defaultValue: false,
  required: false,
  action: 'storeTrue',
  help: 'Add long stack traces to log entries. Recommended for debugging only.'
}], [['--webkit-debug-proxy-port'], {
  defaultValue: 27753,
  dest: 'webkitDebugProxyPort',
  required: false,
  type: 'int',
  example: "27753",
  help: '(IOS-only) Local port used for communication with ios-webkit-debug-proxy'
}], [['-dc', '--default-capabilities'], {
  dest: 'defaultCapabilities',
  defaultValue: {},
  type: parseDefaultCaps,
  required: false,
  example: '[ \'{"app": "myapp.app", "deviceName": "iPhone Simulator"}\' ' + '| /path/to/caps.json ]',
  help: 'Set the default desired capabilities, which will be set on each ' + 'session unless overridden by received capabilities.'
}]];

var deprecatedArgs = [[['--command-timeout'], {
  defaultValue: 60,
  dest: 'defaultCommandTimeout',
  type: 'int',
  required: false,
  help: '[DEPRECATED] No effect. This used to be the default command ' + 'timeout for the server to use for all sessions (in seconds and ' + 'should be less than 2147483). Use newCommandTimeout cap instead'
}], [['-k', '--keep-artifacts'], {
  defaultValue: false,
  dest: 'keepArtifacts',
  action: 'storeTrue',
  required: false,
  help: '[DEPRECATED] - no effect, trace is now in tmp dir by default and is ' + 'cleared before each run. Please also refer to the --trace-dir flag.',
  nargs: 0
}], [['--platform-name'], {
  dest: 'platformName',
  defaultValue: null,
  required: false,
  deprecatedFor: '--default-capabilities',
  example: 'iOS',
  help: '[DEPRECATED] - Name of the mobile platform: iOS, Android, or FirefoxOS'
}], [['--platform-version'], {
  dest: 'platformVersion',
  defaultValue: null,
  required: false,
  deprecatedFor: '--default-capabilities',
  example: '7.1',
  help: '[DEPRECATED] - Version of the mobile platform'
}], [['--automation-name'], {
  dest: 'automationName',
  defaultValue: null,
  required: false,
  deprecatedFor: '--default-capabilities',
  example: 'Appium',
  help: '[DEPRECATED] - Name of the automation tool: Appium or Selendroid'
}], [['--device-name'], {
  dest: 'deviceName',
  defaultValue: null,
  required: false,
  deprecatedFor: '--default-capabilities',
  example: 'iPhone Retina (4-inch), Android Emulator',
  help: '[DEPRECATED] - Name of the mobile device to use'
}], [['--browser-name'], {
  dest: 'browserName',
  defaultValue: null,
  required: false,
  deprecatedFor: '--default-capabilities',
  example: 'Safari',
  help: '[DEPRECATED] - Name of the mobile browser: Safari or Chrome'
}], [['--app'], {
  dest: 'app',
  required: false,
  defaultValue: null,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - IOS: abs path to simulator-compiled .app file or the bundle_id of the desired target on device; Android: abs path to .apk file',
  example: '/abs/path/to/my.app'
}], [['-lt', '--launch-timeout'], {
  defaultValue: 90000,
  dest: 'launchTimeout',
  type: 'int',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (iOS-only) how long in ms to wait for Instruments to launch'
}], [['--language'], {
  defaultValue: null,
  dest: 'language',
  required: false,
  example: 'en',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - Language for the iOS simulator / Android Emulator'
}], [['--locale'], {
  defaultValue: null,
  dest: 'locale',
  required: false,
  example: 'en_US',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - Locale for the iOS simulator / Android Emulator'
}], [['-U', '--udid'], {
  dest: 'udid',
  required: false,
  defaultValue: null,
  example: '1adsf-sdfas-asdf-123sdf',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - Unique device identifier of the connected physical device'
}], [['--orientation'], {
  dest: 'orientation',
  defaultValue: null,
  required: false,
  example: 'LANDSCAPE',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (IOS-only) use LANDSCAPE or PORTRAIT to initialize all requests ' + 'to this orientation'
}], [['--no-reset'], {
  defaultValue: false,
  dest: 'noReset',
  action: 'storeTrue',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - Do not reset app state between sessions (IOS: do not delete app ' + 'plist files; Android: do not uninstall app before new session)',
  nargs: 0
}], [['--full-reset'], {
  defaultValue: false,
  dest: 'fullReset',
  action: 'storeTrue',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (iOS) Delete the entire simulator folder. (Android) Reset app ' + 'state by uninstalling app instead of clearing app data. On ' + 'Android, this will also remove the app after the session is complete.',
  nargs: 0
}], [['--app-pkg'], {
  dest: 'appPackage',
  defaultValue: null,
  required: false,
  deprecatedFor: '--default-capabilities',
  example: 'com.example.android.myApp',
  help: '[DEPRECATED] - (Android-only) Java package of the Android app you want to run ' + '(e.g., com.example.android.myApp)'
}], [['--app-activity'], {
  dest: 'appActivity',
  defaultValue: null,
  required: false,
  example: 'MainActivity',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Activity name for the Android activity you want ' + 'to launch from your package (e.g., MainActivity)'
}], [['--app-wait-package'], {
  dest: 'appWaitPackage',
  defaultValue: false,
  required: false,
  example: 'com.example.android.myApp',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Package name for the Android activity you want ' + 'to wait for (e.g., com.example.android.myApp)'
}], [['--app-wait-activity'], {
  dest: 'appWaitActivity',
  defaultValue: false,
  required: false,
  example: 'SplashActivity',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Activity name for the Android activity you want ' + 'to wait for (e.g., SplashActivity)'
}], [['--device-ready-timeout'], {
  dest: 'deviceReadyTimeout',
  defaultValue: 5,
  required: false,
  type: 'int',
  example: '5',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Timeout in seconds while waiting for device to become ready'
}], [['--android-coverage'], {
  dest: 'androidCoverage',
  defaultValue: false,
  required: false,
  example: 'com.my.Pkg/com.my.Pkg.instrumentation.MyInstrumentation',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Fully qualified instrumentation class. Passed to -w in ' + 'adb shell am instrument -e coverage true -w '
}], [['--avd'], {
  dest: 'avd',
  defaultValue: null,
  required: false,
  example: '@default',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Name of the avd to launch'
}], [['--avd-args'], {
  dest: 'avdArgs',
  defaultValue: null,
  required: false,
  example: '-no-snapshot-load',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Additional emulator arguments to launch the avd'
}], [['--use-keystore'], {
  defaultValue: false,
  dest: 'useKeystore',
  action: 'storeTrue',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) When set the keystore will be used to sign apks.'
}], [['--keystore-path'], {
  defaultValue: _path2['default'].resolve(process.env.HOME || process.env.USERPROFILE || '', '.android', 'debug.keystore'),
  dest: 'keystorePath',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Path to keystore'
}], [['--keystore-password'], {
  defaultValue: 'android',
  dest: 'keystorePassword',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Password to keystore'
}], [['--key-alias'], {
  defaultValue: 'androiddebugkey',
  dest: 'keyAlias',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Key alias'
}], [['--key-password'], {
  defaultValue: 'android',
  dest: 'keyPassword',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Key password'
}], [['--intent-action'], {
  dest: 'intentAction',
  defaultValue: 'android.intent.action.MAIN',
  required: false,
  example: 'android.intent.action.MAIN',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Intent action which will be used to start activity'
}], [['--intent-category'], {
  dest: 'intentCategory',
  defaultValue: 'android.intent.category.LAUNCHER',
  required: false,
  example: 'android.intent.category.APP_CONTACTS',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Intent category which will be used to start activity'
}], [['--intent-flags'], {
  dest: 'intentFlags',
  defaultValue: '0x10200000',
  required: false,
  example: '0x10200000',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Flags that will be used to start activity'
}], [['--intent-args'], {
  dest: 'optionalIntentArguments',
  defaultValue: null,
  required: false,
  example: '0x10200000',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) Additional intent arguments that will be used to ' + 'start activity'
}], [['--dont-stop-app-on-reset'], {
  dest: 'dontStopAppOnReset',
  defaultValue: false,
  action: 'storeTrue',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (Android-only) When included, refrains from stopping the app before restart'
}], [['--calendar-format'], {
  defaultValue: null,
  dest: 'calendarFormat',
  required: false,
  example: 'gregorian',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (IOS-only) calendar format for the iOS simulator'
}], [['--native-instruments-lib'], {
  defaultValue: false,
  dest: 'nativeInstrumentsLib',
  action: 'storeTrue',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (IOS-only) IOS has a weird built-in unavoidable ' + 'delay. We patch this in appium. If you do not want it patched, ' + 'pass in this flag.',
  nargs: 0
}], [['--keep-keychains'], {
  defaultValue: false,
  dest: 'keepKeyChains',
  action: 'storeTrue',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (iOS-only) Whether to keep keychains (Library/Keychains) when reset app between sessions',
  nargs: 0
}], [['--localizable-strings-dir'], {
  required: false,
  dest: 'localizableStringsDir',
  defaultValue: 'en.lproj',
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (IOS-only) the relative path of the dir where Localizable.strings file resides ',
  example: 'en.lproj'
}], [['--show-ios-log'], {
  defaultValue: false,
  dest: 'showIOSLog',
  action: 'storeTrue',
  required: false,
  deprecatedFor: '--default-capabilities',
  help: '[DEPRECATED] - (IOS-only) if set, the iOS system log will be written to the console',
  nargs: 0
}], [['--testwaHeartbeat'], {
  defaultValue: true,
  dest: 'waHeartbeat',
  required: false,
  example: "1",
  help: "run testcase's id"
}], [['--screenpath'], {
  defaultValue: null,
  dest: 'screenshotPath',
  required: false,
  example: "E:\\lib",
  help: "the screenshot path"
}], [['--testcaselogId'], {
  defaultValue: 222,
  dest: 'testcaselogId',
  required: false,
  example: "1",
  help: "run testcase's id"
}], [['-testwaDeviceId', '--testwaDeviceId'], {
  required: false,
  defaultValue: null,
  example: "iPhone 5",
  help: 'Unique testwa device identifier of the connected physical device for MAC,use udid for win'
}]];

function updateParseArgsForDefaultCapabilities(parser) {
  // here we want to update the parser.parseArgs() function
  // in order to bring together all the args that are actually
  // default caps.
  // once those deprecated args are actually removed, this
  // can also be removed
  parser._parseArgs = parser.parseArgs;
  parser.parseArgs = function (args) {
    var parsedArgs = parser._parseArgs(args);
    parsedArgs.defaultCapabilities = parsedArgs.defaultCapabilities || {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(deprecatedArgs), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var argEntry = _step.value;

        var arg = argEntry[1].dest;
        if (argEntry[1].deprecatedFor === '--default-capabilities') {
          if (arg in parsedArgs && parsedArgs[arg] !== argEntry[1].defaultValue) {
            parsedArgs.defaultCapabilities[arg] = parsedArgs[arg];
            // j s h i n t can't handle complex interpolated strings
            var capDict = _defineProperty({}, arg, parsedArgs[arg]);
            argEntry[1].deprecatedFor = '--default-capabilities ' + ('\'' + JSON.stringify(capDict) + '\'');
          }
        }
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

    return parsedArgs;
  };
}

function parseDefaultCaps(caps) {
  try {
    // use synchronous file access, as `argparse` provides no way of either
    // awaiting or using callbacks. This step happens in startup, in what is
    // effectively command-line code, so nothing is blocked in terms of
    // sessions, so holding up the event loop does not incur the usual
    // drawbacks.
    if (_fs2['default'].statSync(caps).isFile()) {
      caps = _fs2['default'].readFileSync(caps, 'utf8');
    }
  } catch (err) {
    // not a file, or not readable
  }
  caps = JSON.parse(caps);
  if (!_lodash2['default'].isPlainObject(caps)) {
    throw 'Invalid format for default capabilities';
  }
  return caps;
}

function getParser() {
  var parser = new _argparse.ArgumentParser({
    version: _packageJson2['default'].version,
    addHelp: true,
    description: 'A webdriver-compatible server for use with native and hybrid iOS and Android applications.'
  });
  var allArgs = _lodash2['default'].union(args, deprecatedArgs);
  parser.rawArgs = allArgs;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(allArgs), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var arg = _step2.value;

      parser.addArgument(arg[0], arg[1]);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  updateParseArgsForDefaultCapabilities(parser);

  return parser;
}

function getDefaultArgs() {
  var defaults = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(args), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = _slicedToArray(_step3.value, 2);

      var arg = _step3$value[1];

      defaults[arg.dest] = arg.defaultValue;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return defaults;
}

exports['default'] = getParser;
exports.getDefaultArgs = getDefaultArgs;
exports.getParser = getParser;
//# sourceMappingURL=data:application/json;base64,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QyxDQUFDO0dBQ2pEO0FBQ0QsU0FBTyxJQUFJLENBQUM7Q0FDYjs7QUFFRCxTQUFTLFNBQVMsR0FBSTtBQUNwQixNQUFJLE1BQU0sR0FBRyw2QkFBbUI7QUFDOUIsV0FBTyxFQUFFLHlCQUFPLE9BQU87QUFDdkIsV0FBTyxFQUFFLElBQUk7QUFDYixlQUFXLEVBQUUsNEZBQTRGO0dBQzFHLENBQUMsQ0FBQztBQUNILE1BQUksT0FBTyxHQUFHLG9CQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDNUMsUUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Ozs7OztBQUN6Qix1Q0FBZ0IsT0FBTyxpSEFBRTtVQUFoQixHQUFHOztBQUNWLFlBQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsdUNBQXFDLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTlDLFNBQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRUQsU0FBUyxjQUFjLEdBQUk7QUFDekIsTUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFDbEIsdUNBQW1CLElBQUksaUhBQUU7OztVQUFkLEdBQUc7O0FBQ1osY0FBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO0tBQ3ZDOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsU0FBTyxRQUFRLENBQUM7Q0FDakI7O3FCQUVjLFNBQVM7UUFDZixjQUFjLEdBQWQsY0FBYztRQUFFLFNBQVMsR0FBVCxTQUFTIiwiZmlsZSI6ImxpYlxccGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEFyZ3VtZW50UGFyc2VyIH0gZnJvbSAnYXJncGFyc2UnO1xuaW1wb3J0IHBrZ09iaiBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuXG5cbmNvbnN0IGFyZ3MgPSBbXG4gIFtbJy0tc2hlbGwnXSwge1xuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgaGVscDogJ0VudGVyIFJFUEwgbW9kZScsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0taXBhJ10sIHtcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGhlbHA6ICcoSU9TLW9ubHkpIGFicyBwYXRoIHRvIGNvbXBpbGVkIC5pcGEgZmlsZScsXG4gICAgZXhhbXBsZTogJy9hYnMvcGF0aC90by9teS5pcGEnLFxuICB9XSxcblxuICBbWyctYScsICctLWFkZHJlc3MnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogJzAuMC4wLjAnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnMC4wLjAuMCcsXG4gICAgaGVscDogJ0lQIEFkZHJlc3MgdG8gbGlzdGVuIG9uJyxcbiAgfV0sXG5cbiAgW1snLXAnLCAnLS1wb3J0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IDQ3MjMsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIGV4YW1wbGU6ICc0NzIzJyxcbiAgICBoZWxwOiAncG9ydCB0byBsaXN0ZW4gb24nLFxuICB9XSxcblxuICBbWyctY2EnLCAnLS1jYWxsYmFjay1hZGRyZXNzJ10sIHtcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVzdDogJ2NhbGxiYWNrQWRkcmVzcycsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGV4YW1wbGU6ICcxMjcuMC4wLjEnLFxuICAgIGhlbHA6ICdjYWxsYmFjayBJUCBBZGRyZXNzIChkZWZhdWx0OiBzYW1lIGFzIC0tYWRkcmVzcyknLFxuICB9XSxcblxuICBbWyctY3AnLCAnLS1jYWxsYmFjay1wb3J0J10sIHtcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVzdDogJ2NhbGxiYWNrUG9ydCcsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIGV4YW1wbGU6ICc0NzIzJyxcbiAgICBoZWxwOiAnY2FsbGJhY2sgcG9ydCAoZGVmYXVsdDogc2FtZSBhcyBwb3J0KScsXG4gIH1dLFxuXG4gIFtbJy1icCcsICctLWJvb3RzdHJhcC1wb3J0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IDQ3MjQsXG4gICAgZGVzdDogJ2Jvb3RzdHJhcFBvcnQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiAnaW50JyxcbiAgICBleGFtcGxlOiAnNDcyNCcsXG4gICAgaGVscDogJyhBbmRyb2lkLW9ubHkpIHBvcnQgdG8gdXNlIG9uIGRldmljZSB0byB0YWxrIHRvIEFwcGl1bScsXG4gIH1dLFxuXG4gIFtbJy1yJywgJy0tYmFja2VuZC1yZXRyaWVzJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IDMsXG4gICAgZGVzdDogJ2JhY2tlbmRSZXRyaWVzJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgZXhhbXBsZTogJzMnLFxuICAgIGhlbHA6ICcoaU9TLW9ubHkpIEhvdyBtYW55IHRpbWVzIHRvIHJldHJ5IGxhdW5jaGluZyBJbnN0cnVtZW50cyAnICtcbiAgICAgICAgICAnYmVmb3JlIHNheWluZyBpdCBjcmFzaGVkIG9yIHRpbWVkIG91dCcsXG4gIH1dLFxuXG4gIFtbJy0tc2Vzc2lvbi1vdmVycmlkZSddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnc2Vzc2lvbk92ZXJyaWRlJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnRW5hYmxlcyBzZXNzaW9uIG92ZXJyaWRlIChjbG9iYmVyaW5nKScsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy1sJywgJy0tcHJlLWxhdW5jaCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnbGF1bmNoJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnUHJlLWxhdW5jaCB0aGUgYXBwbGljYXRpb24gYmVmb3JlIGFsbG93aW5nIHRoZSBmaXJzdCBzZXNzaW9uICcgK1xuICAgICAgICAgICcoUmVxdWlyZXMgLS1hcHAgYW5kLCBmb3IgQW5kcm9pZCwgLS1hcHAtcGtnIGFuZCAtLWFwcC1hY3Rpdml0eSknLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctZycsICctLWxvZyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGRlc3Q6ICdsb2cnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnL3BhdGgvdG8vYXBwaXVtLmxvZycsXG4gICAgaGVscDogJ0Fsc28gc2VuZCBsb2cgb3V0cHV0IHRvIHRoaXMgZmlsZScsXG4gIH1dLFxuXG4gIFtbJy0tbG9nLWxldmVsJ10sIHtcbiAgICBjaG9pY2VzOiBbJ2luZm8nLCAnaW5mbzpkZWJ1ZycsICdpbmZvOmluZm8nLCAnaW5mbzp3YXJuJywgJ2luZm86ZXJyb3InLFxuICAgICAgICAgICAgICAnd2FybicsICd3YXJuOmRlYnVnJywgJ3dhcm46aW5mbycsICd3YXJuOndhcm4nLCAnd2FybjplcnJvcicsXG4gICAgICAgICAgICAgICdlcnJvcicsICdlcnJvcjpkZWJ1ZycsICdlcnJvcjppbmZvJywgJ2Vycm9yOndhcm4nLCAnZXJyb3I6ZXJyb3InLFxuICAgICAgICAgICAgICAnZGVidWcnLCAnZGVidWc6ZGVidWcnLCAnZGVidWc6aW5mbycsICdkZWJ1Zzp3YXJuJywgJ2RlYnVnOmVycm9yJ10sXG4gICAgZGVmYXVsdFZhbHVlOiAnZGVidWcnLFxuICAgIGRlc3Q6ICdsb2dsZXZlbCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdkZWJ1ZycsXG4gICAgaGVscDogJ2xvZyBsZXZlbDsgZGVmYXVsdCAoY29uc29sZVs6ZmlsZV0pOiBkZWJ1Z1s6ZGVidWddJyxcbiAgfV0sXG5cbiAgW1snLS1sb2ctdGltZXN0YW1wJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnU2hvdyB0aW1lc3RhbXBzIGluIGNvbnNvbGUgb3V0cHV0JyxcbiAgICBuYXJnczogMCxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIGRlc3Q6ICdsb2dUaW1lc3RhbXAnLFxuICB9XSxcblxuICBbWyctLWxvY2FsLXRpbWV6b25lJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnVXNlIGxvY2FsIHRpbWV6b25lIGZvciB0aW1lc3RhbXBzJyxcbiAgICBuYXJnczogMCxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIGRlc3Q6ICdsb2NhbFRpbWV6b25lJyxcbiAgfV0sXG5cbiAgW1snLS1sb2ctbm8tY29sb3JzJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnRG8gbm90IHVzZSBjb2xvcnMgaW4gY29uc29sZSBvdXRwdXQnLFxuICAgIG5hcmdzOiAwLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgZGVzdDogJ2xvZ05vQ29sb3JzJyxcbiAgfV0sXG5cbiAgW1snLUcnLCAnLS13ZWJob29rJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdsb2NhbGhvc3Q6OTg3NicsXG4gICAgaGVscDogJ0Fsc28gc2VuZCBsb2cgb3V0cHV0IHRvIHRoaXMgSFRUUCBsaXN0ZW5lcicsXG4gIH1dLFxuXG4gIFtbJy0tc2FmYXJpJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICcoSU9TLU9ubHkpIFVzZSB0aGUgc2FmYXJpIGFwcCcsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0tZGVmYXVsdC1kZXZpY2UnLCAnLWRkJ10sIHtcbiAgICBkZXN0OiAnZGVmYXVsdERldmljZScsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnKElPUy1TaW11bGF0b3Itb25seSkgdXNlIHRoZSBkZWZhdWx0IHNpbXVsYXRvciB0aGF0IGluc3RydW1lbnRzICcgK1xuICAgICAgICAgICdsYXVuY2hlcyBvbiBpdHMgb3duJyxcbiAgfV0sXG5cbiAgW1snLS1mb3JjZS1pcGhvbmUnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ2ZvcmNlSXBob25lJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnKElPUy1vbmx5KSBVc2UgdGhlIGlQaG9uZSBTaW11bGF0b3Igbm8gbWF0dGVyIHdoYXQgdGhlIGFwcCB3YW50cycsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0tZm9yY2UtaXBhZCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnZm9yY2VJcGFkJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnKElPUy1vbmx5KSBVc2UgdGhlIGlQYWQgU2ltdWxhdG9yIG5vIG1hdHRlciB3aGF0IHRoZSBhcHAgd2FudHMnLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLXRyYWNldGVtcGxhdGUnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBkZXN0OiAnYXV0b21hdGlvblRyYWNlVGVtcGxhdGVQYXRoJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJy9Vc2Vycy9tZS9BdXRvbWF0aW9uLnRyYWNldGVtcGxhdGUnLFxuICAgIGhlbHA6ICcoSU9TLW9ubHkpIC50cmFjZXRlbXBsYXRlIGZpbGUgdG8gdXNlIHdpdGggSW5zdHJ1bWVudHMnLFxuICB9XSxcblxuICBbWyctLWluc3RydW1lbnRzJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZGVzdDogJ2luc3RydW1lbnRzUGF0aCcsXG4gICAgcmVxdWlyZTogZmFsc2UsXG4gICAgZXhhbXBsZTogJy9wYXRoL3RvL2luc3RydW1lbnRzJyxcbiAgICBoZWxwOiAnKElPUy1vbmx5KSBwYXRoIHRvIGluc3RydW1lbnRzIGJpbmFyeScsXG4gIH1dLFxuXG4gIFtbJy0tbm9kZWNvbmZpZyddLCB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBoZWxwOiAnQ29uZmlndXJhdGlvbiBKU09OIGZpbGUgdG8gcmVnaXN0ZXIgYXBwaXVtIHdpdGggc2VsZW5pdW0gZ3JpZCcsXG4gICAgZXhhbXBsZTogJy9hYnMvcGF0aC90by9ub2RlY29uZmlnLmpzb24nLFxuICB9XSxcblxuICBbWyctcmEnLCAnLS1yb2JvdC1hZGRyZXNzJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6ICcwLjAuMC4wJyxcbiAgICBkZXN0OiAncm9ib3RBZGRyZXNzJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJzAuMC4wLjAnLFxuICAgIGhlbHA6ICdJUCBBZGRyZXNzIG9mIHJvYm90JyxcbiAgfV0sXG5cbiAgW1snLXJwJywgJy0tcm9ib3QtcG9ydCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiAtMSxcbiAgICBkZXN0OiAncm9ib3RQb3J0JyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgZXhhbXBsZTogJzQyNDInLFxuICAgIGhlbHA6ICdwb3J0IGZvciByb2JvdCcsXG4gIH1dLFxuXG4gIFtbJy0tc2VsZW5kcm9pZC1wb3J0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IDgwODAsXG4gICAgZGVzdDogJ3NlbGVuZHJvaWRQb3J0JyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgZXhhbXBsZTogJzgwODAnLFxuICAgIGhlbHA6ICdMb2NhbCBwb3J0IHVzZWQgZm9yIGNvbW11bmljYXRpb24gd2l0aCBTZWxlbmRyb2lkJyxcbiAgfV0sXG5cbiAgW1snLS1jaHJvbWVkcml2ZXItcG9ydCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiA5NTE1LFxuICAgIGRlc3Q6ICdjaHJvbWVEcml2ZXJQb3J0JyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgZXhhbXBsZTogJzk1MTUnLFxuICAgIGhlbHA6ICdQb3J0IHVwb24gd2hpY2ggQ2hyb21lRHJpdmVyIHdpbGwgcnVuJyxcbiAgfV0sXG5cbiAgW1snLS1jaHJvbWVkcml2ZXItZXhlY3V0YWJsZSddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGRlc3Q6ICdjaHJvbWVkcml2ZXJFeGVjdXRhYmxlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ0Nocm9tZURyaXZlciBleGVjdXRhYmxlIGZ1bGwgcGF0aCcsXG4gIH1dLFxuXG4gIFtbJy0tc2hvdy1jb25maWcnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ3Nob3dDb25maWcnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdTaG93IGluZm8gYWJvdXQgdGhlIGFwcGl1bSBzZXJ2ZXIgY29uZmlndXJhdGlvbiBhbmQgZXhpdCcsXG4gIH1dLFxuXG4gIFtbJy0tbm8tcGVybXMtY2hlY2snXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ25vUGVybXNDaGVjaycsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ0J5cGFzcyBBcHBpdW1cXCdzIGNoZWNrcyB0byBlbnN1cmUgd2UgY2FuIHJlYWQvd3JpdGUgbmVjZXNzYXJ5IGZpbGVzJyxcbiAgfV0sXG5cbiAgW1snLS1zdHJpY3QtY2FwcyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnZW5mb3JjZVN0cmljdENhcHMnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdDYXVzZSBzZXNzaW9ucyB0byBmYWlsIGlmIGRlc2lyZWQgY2FwcyBhcmUgc2VudCBpbiB0aGF0IEFwcGl1bSAnICtcbiAgICAgICAgICAnZG9lcyBub3QgcmVjb2duaXplIGFzIHZhbGlkIGZvciB0aGUgc2VsZWN0ZWQgZGV2aWNlJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS1pc29sYXRlLXNpbS1kZXZpY2UnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ2lzb2xhdGVTaW1EZXZpY2UnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdYY29kZSA2IGhhcyBhIGJ1ZyBvbiBzb21lIHBsYXRmb3JtcyB3aGVyZSBhIGNlcnRhaW4gc2ltdWxhdG9yICcgK1xuICAgICAgICAgICdjYW4gb25seSBiZSBsYXVuY2hlZCB3aXRob3V0IGVycm9yIGlmIGFsbCBvdGhlciBzaW11bGF0b3IgZGV2aWNlcyAnICtcbiAgICAgICAgICAnYXJlIGZpcnN0IGRlbGV0ZWQuIFRoaXMgb3B0aW9uIGNhdXNlcyBBcHBpdW0gdG8gZGVsZXRlIGFsbCAnICtcbiAgICAgICAgICAnZGV2aWNlcyBvdGhlciB0aGFuIHRoZSBvbmUgYmVpbmcgdXNlZCBieSBBcHBpdW0uIE5vdGUgdGhhdCB0aGlzICcgK1xuICAgICAgICAgICdpcyBhIHBlcm1hbmVudCBkZWxldGlvbiwgYW5kIHlvdSBhcmUgcmVzcG9uc2libGUgZm9yIHVzaW5nIHNpbWN0bCAnICtcbiAgICAgICAgICAnb3IgeGNvZGUgdG8gbWFuYWdlIHRoZSBjYXRlZ29yaWVzIG9mIGRldmljZXMgdXNlZCB3aXRoIEFwcGl1bS4nLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLXRtcCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGRlc3Q6ICd0bXBEaXInLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnQWJzb2x1dGUgcGF0aCB0byBkaXJlY3RvcnkgQXBwaXVtIGNhbiB1c2UgdG8gbWFuYWdlIHRlbXBvcmFyeSAnICtcbiAgICAgICAgICAnZmlsZXMsIGxpa2UgYnVpbHQtaW4gaU9TIGFwcHMgaXQgbmVlZHMgdG8gbW92ZSBhcm91bmQuIE9uICpuaXgvTWFjICcgK1xuICAgICAgICAgICdkZWZhdWx0cyB0byAvdG1wLCBvbiBXaW5kb3dzIGRlZmF1bHRzIHRvIEM6XFxcXFdpbmRvd3NcXFxcVGVtcCcsXG4gIH1dLFxuXG4gIFtbJy0tdHJhY2UtZGlyJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZGVzdDogJ3RyYWNlRGlyJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ0Fic29sdXRlIHBhdGggdG8gZGlyZWN0b3J5IEFwcGl1bSB1c2UgdG8gc2F2ZSBpb3MgaW5zdHJ1bWVudHMgJyArXG4gICAgICAgICAgJ3RyYWNlcywgZGVmYXVsdHMgdG8gPHRtcCBkaXI+L2FwcGl1bS1pbnN0cnVtZW50cycsXG4gIH1dLFxuXG4gIFtbJy0tZGVidWctbG9nLXNwYWNpbmcnXSwge1xuICAgIGRlc3Q6ICdkZWJ1Z0xvZ1NwYWNpbmcnLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ0FkZCBleGFnZ2VyYXRlZCBzcGFjaW5nIGluIGxvZ3MgdG8gaGVscCB3aXRoIHZpc3VhbCBpbnNwZWN0aW9uJyxcbiAgfV0sXG5cbiAgW1snLS1zdXBwcmVzcy1hZGIta2lsbC1zZXJ2ZXInXSwge1xuICAgIGRlc3Q6ICdzdXBwcmVzc0FkYktpbGxTZXJ2ZXInLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJyhBbmRyb2lkLW9ubHkpIElmIHNldCwgcHJldmVudHMgQXBwaXVtIGZyb20ga2lsbGluZyB0aGUgYWRiIHNlcnZlciBpbnN0YW5jZScsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0tYXN5bmMtdHJhY2UnXSwge1xuICAgIGRlc3Q6ICdhc3luY1RyYWNlJyxcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIGhlbHA6ICdBZGQgbG9uZyBzdGFjayB0cmFjZXMgdG8gbG9nIGVudHJpZXMuIFJlY29tbWVuZGVkIGZvciBkZWJ1Z2dpbmcgb25seS4nLFxuICB9XSxcblxuICBbWyctLXdlYmtpdC1kZWJ1Zy1wcm94eS1wb3J0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IDI3NzUzLFxuICAgIGRlc3Q6ICd3ZWJraXREZWJ1Z1Byb3h5UG9ydCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIGV4YW1wbGU6IFwiMjc3NTNcIixcbiAgICBoZWxwOiAnKElPUy1vbmx5KSBMb2NhbCBwb3J0IHVzZWQgZm9yIGNvbW11bmljYXRpb24gd2l0aCBpb3Mtd2Via2l0LWRlYnVnLXByb3h5J1xuICB9XSxcblxuICBbWyctZGMnLCAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcyddLCB7XG4gICAgZGVzdDogJ2RlZmF1bHRDYXBhYmlsaXRpZXMnLFxuICAgIGRlZmF1bHRWYWx1ZToge30sXG4gICAgdHlwZTogcGFyc2VEZWZhdWx0Q2FwcyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ1sgXFwne1wiYXBwXCI6IFwibXlhcHAuYXBwXCIsIFwiZGV2aWNlTmFtZVwiOiBcImlQaG9uZSBTaW11bGF0b3JcIn1cXCcgJyArXG4gICAgICAgICAgICAgJ3wgL3BhdGgvdG8vY2Fwcy5qc29uIF0nLFxuICAgIGhlbHA6ICdTZXQgdGhlIGRlZmF1bHQgZGVzaXJlZCBjYXBhYmlsaXRpZXMsIHdoaWNoIHdpbGwgYmUgc2V0IG9uIGVhY2ggJyArXG4gICAgICAgICAgJ3Nlc3Npb24gdW5sZXNzIG92ZXJyaWRkZW4gYnkgcmVjZWl2ZWQgY2FwYWJpbGl0aWVzLidcbiAgfV0sXG5dO1xuXG5jb25zdCBkZXByZWNhdGVkQXJncyA9IFtcbiAgW1snLS1jb21tYW5kLXRpbWVvdXQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogNjAsXG4gICAgZGVzdDogJ2RlZmF1bHRDb21tYW5kVGltZW91dCcsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gTm8gZWZmZWN0LiBUaGlzIHVzZWQgdG8gYmUgdGhlIGRlZmF1bHQgY29tbWFuZCAnICtcbiAgICAgICAgICAndGltZW91dCBmb3IgdGhlIHNlcnZlciB0byB1c2UgZm9yIGFsbCBzZXNzaW9ucyAoaW4gc2Vjb25kcyBhbmQgJyArXG4gICAgICAgICAgJ3Nob3VsZCBiZSBsZXNzIHRoYW4gMjE0NzQ4MykuIFVzZSBuZXdDb21tYW5kVGltZW91dCBjYXAgaW5zdGVhZCdcbiAgfV0sXG5cbiAgW1snLWsnLCAnLS1rZWVwLWFydGlmYWN0cyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAna2VlcEFydGlmYWN0cycsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIG5vIGVmZmVjdCwgdHJhY2UgaXMgbm93IGluIHRtcCBkaXIgYnkgZGVmYXVsdCBhbmQgaXMgJyArXG4gICAgICAgICAgJ2NsZWFyZWQgYmVmb3JlIGVhY2ggcnVuLiBQbGVhc2UgYWxzbyByZWZlciB0byB0aGUgLS10cmFjZS1kaXIgZmxhZy4nLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLXBsYXRmb3JtLW5hbWUnXSwge1xuICAgIGRlc3Q6ICdwbGF0Zm9ybU5hbWUnLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGV4YW1wbGU6ICdpT1MnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBOYW1lIG9mIHRoZSBtb2JpbGUgcGxhdGZvcm06IGlPUywgQW5kcm9pZCwgb3IgRmlyZWZveE9TJyxcbiAgfV0sXG5cbiAgW1snLS1wbGF0Zm9ybS12ZXJzaW9uJ10sIHtcbiAgICBkZXN0OiAncGxhdGZvcm1WZXJzaW9uJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBleGFtcGxlOiAnNy4xJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gVmVyc2lvbiBvZiB0aGUgbW9iaWxlIHBsYXRmb3JtJyxcbiAgfV0sXG5cbiAgW1snLS1hdXRvbWF0aW9uLW5hbWUnXSwge1xuICAgIGRlc3Q6ICdhdXRvbWF0aW9uTmFtZScsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgZXhhbXBsZTogJ0FwcGl1bScsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIE5hbWUgb2YgdGhlIGF1dG9tYXRpb24gdG9vbDogQXBwaXVtIG9yIFNlbGVuZHJvaWQnLFxuICB9XSxcblxuICBbWyctLWRldmljZS1uYW1lJ10sIHtcbiAgICBkZXN0OiAnZGV2aWNlTmFtZScsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgZXhhbXBsZTogJ2lQaG9uZSBSZXRpbmEgKDQtaW5jaCksIEFuZHJvaWQgRW11bGF0b3InLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBOYW1lIG9mIHRoZSBtb2JpbGUgZGV2aWNlIHRvIHVzZScsXG4gIH1dLFxuXG4gIFtbJy0tYnJvd3Nlci1uYW1lJ10sIHtcbiAgICBkZXN0OiAnYnJvd3Nlck5hbWUnLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGV4YW1wbGU6ICdTYWZhcmknLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBOYW1lIG9mIHRoZSBtb2JpbGUgYnJvd3NlcjogU2FmYXJpIG9yIENocm9tZScsXG4gIH1dLFxuXG4gIFtbJy0tYXBwJ10sIHtcbiAgICBkZXN0OiAnYXBwJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gSU9TOiBhYnMgcGF0aCB0byBzaW11bGF0b3ItY29tcGlsZWQgLmFwcCBmaWxlIG9yIHRoZSBidW5kbGVfaWQgb2YgdGhlIGRlc2lyZWQgdGFyZ2V0IG9uIGRldmljZTsgQW5kcm9pZDogYWJzIHBhdGggdG8gLmFwayBmaWxlJyxcbiAgICBleGFtcGxlOiAnL2Ficy9wYXRoL3RvL215LmFwcCcsXG4gIH1dLFxuXG4gIFtbJy1sdCcsICctLWxhdW5jaC10aW1lb3V0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IDkwMDAwLFxuICAgIGRlc3Q6ICdsYXVuY2hUaW1lb3V0JyxcbiAgICB0eXBlOiAnaW50JyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoaU9TLW9ubHkpIGhvdyBsb25nIGluIG1zIHRvIHdhaXQgZm9yIEluc3RydW1lbnRzIHRvIGxhdW5jaCcsXG4gIH1dLFxuXG4gIFtbJy0tbGFuZ3VhZ2UnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBkZXN0OiAnbGFuZ3VhZ2UnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnZW4nLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gTGFuZ3VhZ2UgZm9yIHRoZSBpT1Mgc2ltdWxhdG9yIC8gQW5kcm9pZCBFbXVsYXRvcicsXG4gIH1dLFxuXG4gIFtbJy0tbG9jYWxlJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZGVzdDogJ2xvY2FsZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdlbl9VUycsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBMb2NhbGUgZm9yIHRoZSBpT1Mgc2ltdWxhdG9yIC8gQW5kcm9pZCBFbXVsYXRvcicsXG4gIH1dLFxuXG4gIFtbJy1VJywgJy0tdWRpZCddLCB7XG4gICAgZGVzdDogJ3VkaWQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZXhhbXBsZTogJzFhZHNmLXNkZmFzLWFzZGYtMTIzc2RmJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIFVuaXF1ZSBkZXZpY2UgaWRlbnRpZmllciBvZiB0aGUgY29ubmVjdGVkIHBoeXNpY2FsIGRldmljZScsXG4gIH1dLFxuXG4gIFtbJy0tb3JpZW50YXRpb24nXSwge1xuICAgIGRlc3Q6ICdvcmllbnRhdGlvbicsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnTEFORFNDQVBFJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChJT1Mtb25seSkgdXNlIExBTkRTQ0FQRSBvciBQT1JUUkFJVCB0byBpbml0aWFsaXplIGFsbCByZXF1ZXN0cyAnICtcbiAgICAgICAgICAndG8gdGhpcyBvcmllbnRhdGlvbicsXG4gIH1dLFxuXG4gIFtbJy0tbm8tcmVzZXQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ25vUmVzZXQnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gRG8gbm90IHJlc2V0IGFwcCBzdGF0ZSBiZXR3ZWVuIHNlc3Npb25zIChJT1M6IGRvIG5vdCBkZWxldGUgYXBwICcgK1xuICAgICAgICAgICdwbGlzdCBmaWxlczsgQW5kcm9pZDogZG8gbm90IHVuaW5zdGFsbCBhcHAgYmVmb3JlIG5ldyBzZXNzaW9uKScsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0tZnVsbC1yZXNldCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnZnVsbFJlc2V0JyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChpT1MpIERlbGV0ZSB0aGUgZW50aXJlIHNpbXVsYXRvciBmb2xkZXIuIChBbmRyb2lkKSBSZXNldCBhcHAgJyArXG4gICAgICAgICAgJ3N0YXRlIGJ5IHVuaW5zdGFsbGluZyBhcHAgaW5zdGVhZCBvZiBjbGVhcmluZyBhcHAgZGF0YS4gT24gJyArXG4gICAgICAgICAgJ0FuZHJvaWQsIHRoaXMgd2lsbCBhbHNvIHJlbW92ZSB0aGUgYXBwIGFmdGVyIHRoZSBzZXNzaW9uIGlzIGNvbXBsZXRlLicsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0tYXBwLXBrZyddLCB7XG4gICAgZGVzdDogJ2FwcFBhY2thZ2UnLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGV4YW1wbGU6ICdjb20uZXhhbXBsZS5hbmRyb2lkLm15QXBwJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgSmF2YSBwYWNrYWdlIG9mIHRoZSBBbmRyb2lkIGFwcCB5b3Ugd2FudCB0byBydW4gJyArXG4gICAgICAgICAgJyhlLmcuLCBjb20uZXhhbXBsZS5hbmRyb2lkLm15QXBwKScsXG4gIH1dLFxuXG4gIFtbJy0tYXBwLWFjdGl2aXR5J10sIHtcbiAgICBkZXN0OiAnYXBwQWN0aXZpdHknLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ01haW5BY3Rpdml0eScsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBBY3Rpdml0eSBuYW1lIGZvciB0aGUgQW5kcm9pZCBhY3Rpdml0eSB5b3Ugd2FudCAnICtcbiAgICAgICAgICAndG8gbGF1bmNoIGZyb20geW91ciBwYWNrYWdlIChlLmcuLCBNYWluQWN0aXZpdHkpJyxcbiAgfV0sXG5cbiAgW1snLS1hcHAtd2FpdC1wYWNrYWdlJ10sIHtcbiAgICBkZXN0OiAnYXBwV2FpdFBhY2thZ2UnLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdjb20uZXhhbXBsZS5hbmRyb2lkLm15QXBwJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIFBhY2thZ2UgbmFtZSBmb3IgdGhlIEFuZHJvaWQgYWN0aXZpdHkgeW91IHdhbnQgJyArXG4gICAgICAgICAgJ3RvIHdhaXQgZm9yIChlLmcuLCBjb20uZXhhbXBsZS5hbmRyb2lkLm15QXBwKScsXG4gIH1dLFxuXG4gIFtbJy0tYXBwLXdhaXQtYWN0aXZpdHknXSwge1xuICAgIGRlc3Q6ICdhcHBXYWl0QWN0aXZpdHknLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdTcGxhc2hBY3Rpdml0eScsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBBY3Rpdml0eSBuYW1lIGZvciB0aGUgQW5kcm9pZCBhY3Rpdml0eSB5b3Ugd2FudCAnICtcbiAgICAgICAgICAndG8gd2FpdCBmb3IgKGUuZy4sIFNwbGFzaEFjdGl2aXR5KScsXG4gIH1dLFxuXG4gIFtbJy0tZGV2aWNlLXJlYWR5LXRpbWVvdXQnXSwge1xuICAgIGRlc3Q6ICdkZXZpY2VSZWFkeVRpbWVvdXQnLFxuICAgIGRlZmF1bHRWYWx1ZTogNSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgZXhhbXBsZTogJzUnLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgVGltZW91dCBpbiBzZWNvbmRzIHdoaWxlIHdhaXRpbmcgZm9yIGRldmljZSB0byBiZWNvbWUgcmVhZHknLFxuICB9XSxcblxuICBbWyctLWFuZHJvaWQtY292ZXJhZ2UnXSwge1xuICAgIGRlc3Q6ICdhbmRyb2lkQ292ZXJhZ2UnLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdjb20ubXkuUGtnL2NvbS5teS5Qa2cuaW5zdHJ1bWVudGF0aW9uLk15SW5zdHJ1bWVudGF0aW9uJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEZ1bGx5IHF1YWxpZmllZCBpbnN0cnVtZW50YXRpb24gY2xhc3MuIFBhc3NlZCB0byAtdyBpbiAnICtcbiAgICAgICAgICAnYWRiIHNoZWxsIGFtIGluc3RydW1lbnQgLWUgY292ZXJhZ2UgdHJ1ZSAtdyAnLFxuICB9XSxcblxuICBbWyctLWF2ZCddLCB7XG4gICAgZGVzdDogJ2F2ZCcsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnQGRlZmF1bHQnLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgTmFtZSBvZiB0aGUgYXZkIHRvIGxhdW5jaCcsXG4gIH1dLFxuXG4gIFtbJy0tYXZkLWFyZ3MnXSwge1xuICAgIGRlc3Q6ICdhdmRBcmdzJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICctbm8tc25hcHNob3QtbG9hZCcsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBBZGRpdGlvbmFsIGVtdWxhdG9yIGFyZ3VtZW50cyB0byBsYXVuY2ggdGhlIGF2ZCcsXG4gIH1dLFxuXG4gIFtbJy0tdXNlLWtleXN0b3JlJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICd1c2VLZXlzdG9yZScsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBXaGVuIHNldCB0aGUga2V5c3RvcmUgd2lsbCBiZSB1c2VkIHRvIHNpZ24gYXBrcy4nLFxuICB9XSxcblxuICBbWyctLWtleXN0b3JlLXBhdGgnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogcGF0aC5yZXNvbHZlKHByb2Nlc3MuZW52LkhPTUUgfHwgcHJvY2Vzcy5lbnYuVVNFUlBST0ZJTEUgfHwgJycsICcuYW5kcm9pZCcsICdkZWJ1Zy5rZXlzdG9yZScpLFxuICAgIGRlc3Q6ICdrZXlzdG9yZVBhdGgnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIFBhdGggdG8ga2V5c3RvcmUnLFxuICB9XSxcblxuICBbWyctLWtleXN0b3JlLXBhc3N3b3JkJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6ICdhbmRyb2lkJyxcbiAgICBkZXN0OiAna2V5c3RvcmVQYXNzd29yZCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgUGFzc3dvcmQgdG8ga2V5c3RvcmUnLFxuICB9XSxcblxuICBbWyctLWtleS1hbGlhcyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiAnYW5kcm9pZGRlYnVna2V5JyxcbiAgICBkZXN0OiAna2V5QWxpYXMnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEtleSBhbGlhcycsXG4gIH1dLFxuXG4gIFtbJy0ta2V5LXBhc3N3b3JkJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6ICdhbmRyb2lkJyxcbiAgICBkZXN0OiAna2V5UGFzc3dvcmQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEtleSBwYXNzd29yZCcsXG4gIH1dLFxuXG4gIFtbJy0taW50ZW50LWFjdGlvbiddLCB7XG4gICAgZGVzdDogJ2ludGVudEFjdGlvbicsXG4gICAgZGVmYXVsdFZhbHVlOiAnYW5kcm9pZC5pbnRlbnQuYWN0aW9uLk1BSU4nLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnYW5kcm9pZC5pbnRlbnQuYWN0aW9uLk1BSU4nLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgSW50ZW50IGFjdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gc3RhcnQgYWN0aXZpdHknLFxuICB9XSxcblxuICBbWyctLWludGVudC1jYXRlZ29yeSddLCB7XG4gICAgZGVzdDogJ2ludGVudENhdGVnb3J5JyxcbiAgICBkZWZhdWx0VmFsdWU6ICdhbmRyb2lkLmludGVudC5jYXRlZ29yeS5MQVVOQ0hFUicsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdhbmRyb2lkLmludGVudC5jYXRlZ29yeS5BUFBfQ09OVEFDVFMnLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgSW50ZW50IGNhdGVnb3J5IHdoaWNoIHdpbGwgYmUgdXNlZCB0byBzdGFydCBhY3Rpdml0eScsXG4gIH1dLFxuXG4gIFtbJy0taW50ZW50LWZsYWdzJ10sIHtcbiAgICBkZXN0OiAnaW50ZW50RmxhZ3MnLFxuICAgIGRlZmF1bHRWYWx1ZTogJzB4MTAyMDAwMDAnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnMHgxMDIwMDAwMCcsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBGbGFncyB0aGF0IHdpbGwgYmUgdXNlZCB0byBzdGFydCBhY3Rpdml0eScsXG4gIH1dLFxuXG4gIFtbJy0taW50ZW50LWFyZ3MnXSwge1xuICAgIGRlc3Q6ICdvcHRpb25hbEludGVudEFyZ3VtZW50cycsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnMHgxMDIwMDAwMCcsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBBZGRpdGlvbmFsIGludGVudCBhcmd1bWVudHMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gJyArXG4gICAgICAgICAgJ3N0YXJ0IGFjdGl2aXR5JyxcbiAgfV0sXG5cbiAgW1snLS1kb250LXN0b3AtYXBwLW9uLXJlc2V0J10sIHtcbiAgICBkZXN0OiAnZG9udFN0b3BBcHBPblJlc2V0JyxcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgV2hlbiBpbmNsdWRlZCwgcmVmcmFpbnMgZnJvbSBzdG9wcGluZyB0aGUgYXBwIGJlZm9yZSByZXN0YXJ0JyxcbiAgfV0sXG5cbiAgW1snLS1jYWxlbmRhci1mb3JtYXQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBkZXN0OiAnY2FsZW5kYXJGb3JtYXQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnZ3JlZ29yaWFuJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChJT1Mtb25seSkgY2FsZW5kYXIgZm9ybWF0IGZvciB0aGUgaU9TIHNpbXVsYXRvcicsXG4gIH1dLFxuXG4gIFtbJy0tbmF0aXZlLWluc3RydW1lbnRzLWxpYiddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnbmF0aXZlSW5zdHJ1bWVudHNMaWInLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKElPUy1vbmx5KSBJT1MgaGFzIGEgd2VpcmQgYnVpbHQtaW4gdW5hdm9pZGFibGUgJyArXG4gICAgICAgICAgJ2RlbGF5LiBXZSBwYXRjaCB0aGlzIGluIGFwcGl1bS4gSWYgeW91IGRvIG5vdCB3YW50IGl0IHBhdGNoZWQsICcgK1xuICAgICAgICAgICdwYXNzIGluIHRoaXMgZmxhZy4nLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLWtlZXAta2V5Y2hhaW5zJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdrZWVwS2V5Q2hhaW5zJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChpT1Mtb25seSkgV2hldGhlciB0byBrZWVwIGtleWNoYWlucyAoTGlicmFyeS9LZXljaGFpbnMpIHdoZW4gcmVzZXQgYXBwIGJldHdlZW4gc2Vzc2lvbnMnLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLWxvY2FsaXphYmxlLXN0cmluZ3MtZGlyJ10sIHtcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVzdDogJ2xvY2FsaXphYmxlU3RyaW5nc0RpcicsXG4gICAgZGVmYXVsdFZhbHVlOiAnZW4ubHByb2onLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKElPUy1vbmx5KSB0aGUgcmVsYXRpdmUgcGF0aCBvZiB0aGUgZGlyIHdoZXJlIExvY2FsaXphYmxlLnN0cmluZ3MgZmlsZSByZXNpZGVzICcsXG4gICAgZXhhbXBsZTogJ2VuLmxwcm9qJyxcbiAgfV0sXG5cbiAgW1snLS1zaG93LWlvcy1sb2cnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ3Nob3dJT1NMb2cnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKElPUy1vbmx5KSBpZiBzZXQsIHRoZSBpT1Mgc3lzdGVtIGxvZyB3aWxsIGJlIHdyaXR0ZW4gdG8gdGhlIGNvbnNvbGUnLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLXRlc3R3YUhlYXJ0YmVhdCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlXG4gICAgLCBkZXN0Oid3YUhlYXJ0YmVhdCdcbiAgICAsIHJlcXVpcmVkOiBmYWxzZVxuICAgICwgZXhhbXBsZTogXCIxXCJcbiAgICAsIGhlbHA6IFwicnVuIHRlc3RjYXNlJ3MgaWRcIlxuICB9XSxcbiAgICAgIFtbJy0tc2NyZWVucGF0aCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsXG4gICAgLCBkZXN0OidzY3JlZW5zaG90UGF0aCdcbiAgICAsIHJlcXVpcmVkOiBmYWxzZVxuICAgICwgZXhhbXBsZTogXCJFOlxcXFxsaWJcIlxuICAgICwgaGVscDogXCJ0aGUgc2NyZWVuc2hvdCBwYXRoXCJcbiAgfV0sXG4gIFtbJy0tdGVzdGNhc2Vsb2dJZCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiAyMjJcbiAgICAsIGRlc3Q6J3Rlc3RjYXNlbG9nSWQnXG4gICAgLCByZXF1aXJlZDogZmFsc2VcbiAgICAsIGV4YW1wbGU6IFwiMVwiXG4gICAgLCBoZWxwOiBcInJ1biB0ZXN0Y2FzZSdzIGlkXCJcbiAgfV0sXG4gIFtbJy10ZXN0d2FEZXZpY2VJZCcsJy0tdGVzdHdhRGV2aWNlSWQnXSwge1xuICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgICwgZGVmYXVsdFZhbHVlOiBudWxsXG4gICAgLCBleGFtcGxlOiBcImlQaG9uZSA1XCJcbiAgICAsIGhlbHA6ICdVbmlxdWUgdGVzdHdhIGRldmljZSBpZGVudGlmaWVyIG9mIHRoZSBjb25uZWN0ZWQgcGh5c2ljYWwgZGV2aWNlIGZvciBNQUMsdXNlIHVkaWQgZm9yIHdpbidcbiAgfV1cbl07XG5cbmZ1bmN0aW9uIHVwZGF0ZVBhcnNlQXJnc0ZvckRlZmF1bHRDYXBhYmlsaXRpZXMgKHBhcnNlcikge1xuICAvLyBoZXJlIHdlIHdhbnQgdG8gdXBkYXRlIHRoZSBwYXJzZXIucGFyc2VBcmdzKCkgZnVuY3Rpb25cbiAgLy8gaW4gb3JkZXIgdG8gYnJpbmcgdG9nZXRoZXIgYWxsIHRoZSBhcmdzIHRoYXQgYXJlIGFjdHVhbGx5XG4gIC8vIGRlZmF1bHQgY2Fwcy5cbiAgLy8gb25jZSB0aG9zZSBkZXByZWNhdGVkIGFyZ3MgYXJlIGFjdHVhbGx5IHJlbW92ZWQsIHRoaXNcbiAgLy8gY2FuIGFsc28gYmUgcmVtb3ZlZFxuICBwYXJzZXIuX3BhcnNlQXJncyA9IHBhcnNlci5wYXJzZUFyZ3M7XG4gIHBhcnNlci5wYXJzZUFyZ3MgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIGxldCBwYXJzZWRBcmdzID0gcGFyc2VyLl9wYXJzZUFyZ3MoYXJncyk7XG4gICAgcGFyc2VkQXJncy5kZWZhdWx0Q2FwYWJpbGl0aWVzID0gcGFyc2VkQXJncy5kZWZhdWx0Q2FwYWJpbGl0aWVzIHx8IHt9O1xuICAgIGZvciAobGV0IGFyZ0VudHJ5IG9mIGRlcHJlY2F0ZWRBcmdzKSB7XG4gICAgICBsZXQgYXJnID0gYXJnRW50cnlbMV0uZGVzdDtcbiAgICAgIGlmIChhcmdFbnRyeVsxXS5kZXByZWNhdGVkRm9yID09PSAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycpIHtcbiAgICAgICAgaWYgKGFyZyBpbiBwYXJzZWRBcmdzICYmIHBhcnNlZEFyZ3NbYXJnXSAhPT0gYXJnRW50cnlbMV0uZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgcGFyc2VkQXJncy5kZWZhdWx0Q2FwYWJpbGl0aWVzW2FyZ10gPSBwYXJzZWRBcmdzW2FyZ107XG4gICAgICAgICAgLy8gaiBzIGggaSBuIHQgY2FuJ3QgaGFuZGxlIGNvbXBsZXggaW50ZXJwb2xhdGVkIHN0cmluZ3NcbiAgICAgICAgICBsZXQgY2FwRGljdCA9IHtbYXJnXTogcGFyc2VkQXJnc1thcmddfTtcbiAgICAgICAgICBhcmdFbnRyeVsxXS5kZXByZWNhdGVkRm9yID0gYC0tZGVmYXVsdC1jYXBhYmlsaXRpZXMgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAnJHtKU09OLnN0cmluZ2lmeShjYXBEaWN0KX0nYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkQXJncztcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VEZWZhdWx0Q2FwcyAoY2Fwcykge1xuICB0cnkge1xuICAgIC8vIHVzZSBzeW5jaHJvbm91cyBmaWxlIGFjY2VzcywgYXMgYGFyZ3BhcnNlYCBwcm92aWRlcyBubyB3YXkgb2YgZWl0aGVyXG4gICAgLy8gYXdhaXRpbmcgb3IgdXNpbmcgY2FsbGJhY2tzLiBUaGlzIHN0ZXAgaGFwcGVucyBpbiBzdGFydHVwLCBpbiB3aGF0IGlzXG4gICAgLy8gZWZmZWN0aXZlbHkgY29tbWFuZC1saW5lIGNvZGUsIHNvIG5vdGhpbmcgaXMgYmxvY2tlZCBpbiB0ZXJtcyBvZlxuICAgIC8vIHNlc3Npb25zLCBzbyBob2xkaW5nIHVwIHRoZSBldmVudCBsb29wIGRvZXMgbm90IGluY3VyIHRoZSB1c3VhbFxuICAgIC8vIGRyYXdiYWNrcy5cbiAgICBpZiAoZnMuc3RhdFN5bmMoY2FwcykuaXNGaWxlKCkpIHtcbiAgICAgIGNhcHMgPSBmcy5yZWFkRmlsZVN5bmMoY2FwcywgJ3V0ZjgnKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIG5vdCBhIGZpbGUsIG9yIG5vdCByZWFkYWJsZVxuICB9XG4gIGNhcHMgPSBKU09OLnBhcnNlKGNhcHMpO1xuICBpZiAoIV8uaXNQbGFpbk9iamVjdChjYXBzKSkge1xuICAgIHRocm93ICdJbnZhbGlkIGZvcm1hdCBmb3IgZGVmYXVsdCBjYXBhYmlsaXRpZXMnO1xuICB9XG4gIHJldHVybiBjYXBzO1xufVxuXG5mdW5jdGlvbiBnZXRQYXJzZXIgKCkge1xuICBsZXQgcGFyc2VyID0gbmV3IEFyZ3VtZW50UGFyc2VyKHtcbiAgICB2ZXJzaW9uOiBwa2dPYmoudmVyc2lvbixcbiAgICBhZGRIZWxwOiB0cnVlLFxuICAgIGRlc2NyaXB0aW9uOiAnQSB3ZWJkcml2ZXItY29tcGF0aWJsZSBzZXJ2ZXIgZm9yIHVzZSB3aXRoIG5hdGl2ZSBhbmQgaHlicmlkIGlPUyBhbmQgQW5kcm9pZCBhcHBsaWNhdGlvbnMuJ1xuICB9KTtcbiAgbGV0IGFsbEFyZ3MgPSBfLnVuaW9uKGFyZ3MsIGRlcHJlY2F0ZWRBcmdzKTtcbiAgcGFyc2VyLnJhd0FyZ3MgPSBhbGxBcmdzO1xuICBmb3IgKGxldCBhcmcgb2YgYWxsQXJncykge1xuICAgIHBhcnNlci5hZGRBcmd1bWVudChhcmdbMF0sIGFyZ1sxXSk7XG4gIH1cbiAgdXBkYXRlUGFyc2VBcmdzRm9yRGVmYXVsdENhcGFiaWxpdGllcyhwYXJzZXIpO1xuXG4gIHJldHVybiBwYXJzZXI7XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBcmdzICgpIHtcbiAgbGV0IGRlZmF1bHRzID0ge307XG4gIGZvciAobGV0IFssYXJnXSBvZiBhcmdzKSB7XG4gICAgZGVmYXVsdHNbYXJnLmRlc3RdID0gYXJnLmRlZmF1bHRWYWx1ZTtcbiAgfVxuICByZXR1cm4gZGVmYXVsdHM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFBhcnNlcjtcbmV4cG9ydCB7IGdldERlZmF1bHRBcmdzLCBnZXRQYXJzZXIgfTtcbiJdfQ==