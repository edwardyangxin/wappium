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
}], [['--genTool'], {
  defaultValue: false,
  dest: 'genTool',
  action: 'storeTrue',
  required: false,
  example: "true/false",
  help: "gen tool = true",
  nargs: 0
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
}], [['--installapp'], {
  defaultValue: true,
  dest: 'installapp',
  required: false,
  help: "reinstall app"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYlxccGFyc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tCQUFlLElBQUk7Ozs7b0JBQ0YsTUFBTTs7OztzQkFDVCxRQUFROzs7O3dCQUNTLFVBQVU7OzJCQUN0QixvQkFBb0I7Ozs7QUFHdkMsSUFBTSxJQUFJLEdBQUcsQ0FDWCxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDWixVQUFRLEVBQUUsS0FBSztBQUNmLGNBQVksRUFBRSxJQUFJO0FBQ2xCLE1BQUksRUFBRSxpQkFBaUI7QUFDdkIsT0FBSyxFQUFFLENBQUM7Q0FDVCxDQUFDLEVBRUYsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ1YsVUFBUSxFQUFFLEtBQUs7QUFDZixjQUFZLEVBQUUsSUFBSTtBQUNsQixNQUFJLEVBQUUsMkNBQTJDO0FBQ2pELFNBQU8sRUFBRSxxQkFBcUI7Q0FDL0IsQ0FBQyxFQUVGLENBQUMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEVBQUU7QUFDcEIsY0FBWSxFQUFFLFNBQVM7QUFDdkIsVUFBUSxFQUFFLEtBQUs7QUFDZixTQUFPLEVBQUUsU0FBUztBQUNsQixNQUFJLEVBQUUseUJBQXlCO0NBQ2hDLENBQUMsRUFFRixDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFO0FBQ2pCLGNBQVksRUFBRSxJQUFJO0FBQ2xCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsTUFBSSxFQUFFLEtBQUs7QUFDWCxTQUFPLEVBQUUsTUFBTTtBQUNmLE1BQUksRUFBRSxtQkFBbUI7Q0FDMUIsQ0FBQyxFQUVGLENBQUMsQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLENBQUMsRUFBRTtBQUM5QixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxpQkFBaUI7QUFDdkIsY0FBWSxFQUFFLElBQUk7QUFDbEIsU0FBTyxFQUFFLFdBQVc7QUFDcEIsTUFBSSxFQUFFLGtEQUFrRDtDQUN6RCxDQUFDLEVBRUYsQ0FBQyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxFQUFFO0FBQzNCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsTUFBSSxFQUFFLGNBQWM7QUFDcEIsY0FBWSxFQUFFLElBQUk7QUFDbEIsTUFBSSxFQUFFLEtBQUs7QUFDWCxTQUFPLEVBQUUsTUFBTTtBQUNmLE1BQUksRUFBRSx1Q0FBdUM7Q0FDOUMsQ0FBQyxFQUVGLENBQUMsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsRUFBRTtBQUM1QixjQUFZLEVBQUUsSUFBSTtBQUNsQixNQUFJLEVBQUUsZUFBZTtBQUNyQixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxLQUFLO0FBQ1gsU0FBTyxFQUFFLE1BQU07QUFDZixNQUFJLEVBQUUsd0RBQXdEO0NBQy9ELENBQUMsRUFFRixDQUFDLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLEVBQUU7QUFDNUIsY0FBWSxFQUFFLENBQUM7QUFDZixNQUFJLEVBQUUsZ0JBQWdCO0FBQ3RCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsTUFBSSxFQUFFLEtBQUs7QUFDWCxTQUFPLEVBQUUsR0FBRztBQUNaLE1BQUksRUFBRSwyREFBMkQsR0FDM0QsdUNBQXVDO0NBQzlDLENBQUMsRUFFRixDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRTtBQUN2QixjQUFZLEVBQUUsS0FBSztBQUNuQixNQUFJLEVBQUUsaUJBQWlCO0FBQ3ZCLFFBQU0sRUFBRSxXQUFXO0FBQ25CLFVBQVEsRUFBRSxLQUFLO0FBQ2YsTUFBSSxFQUFFLHVDQUF1QztBQUM3QyxPQUFLLEVBQUUsQ0FBQztDQUNULENBQUMsRUFFRixDQUFDLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxFQUFFO0FBQ3ZCLGNBQVksRUFBRSxLQUFLO0FBQ25CLE1BQUksRUFBRSxRQUFRO0FBQ2QsUUFBTSxFQUFFLFdBQVc7QUFDbkIsVUFBUSxFQUFFLEtBQUs7QUFDZixNQUFJLEVBQUUsK0RBQStELEdBQy9ELGlFQUFpRTtBQUN2RSxPQUFLLEVBQUUsQ0FBQztDQUNULENBQUMsRUFFRixDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFO0FBQ2hCLGNBQVksRUFBRSxJQUFJO0FBQ2xCLE1BQUksRUFBRSxLQUFLO0FBQ1gsVUFBUSxFQUFFLEtBQUs7QUFDZixTQUFPLEVBQUUscUJBQXFCO0FBQzlCLE1BQUksRUFBRSxtQ0FBbUM7Q0FDMUMsQ0FBQyxFQUVGLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRTtBQUNoQixTQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUM1RCxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO0FBQzVFLGNBQVksRUFBRSxPQUFPO0FBQ3JCLE1BQUksRUFBRSxVQUFVO0FBQ2hCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTyxFQUFFLE9BQU87QUFDaEIsTUFBSSxFQUFFLG9EQUFvRDtDQUMzRCxDQUFDLEVBRUYsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7QUFDcEIsY0FBWSxFQUFFLEtBQUs7QUFDbkIsVUFBUSxFQUFFLEtBQUs7QUFDZixNQUFJLEVBQUUsbUNBQW1DO0FBQ3pDLE9BQUssRUFBRSxDQUFDO0FBQ1IsUUFBTSxFQUFFLFdBQVc7QUFDbkIsTUFBSSxFQUFFLGNBQWM7Q0FDckIsQ0FBQyxFQUVGLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO0FBQ3JCLGNBQVksRUFBRSxLQUFLO0FBQ25CLFVBQVEsRUFBRSxLQUFLO0FBQ2YsTUFBSSxFQUFFLG1DQUFtQztBQUN6QyxPQUFLLEVBQUUsQ0FBQztBQUNSLFFBQU0sRUFBRSxXQUFXO0FBQ25CLE1BQUksRUFBRSxlQUFlO0NBQ3RCLENBQUMsRUFFRixDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRTtBQUNwQixjQUFZLEVBQUUsS0FBSztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxxQ0FBcUM7QUFDM0MsT0FBSyxFQUFFLENBQUM7QUFDUixRQUFNLEVBQUUsV0FBVztBQUNuQixNQUFJLEVBQUUsYUFBYTtDQUNwQixDQUFDLEVBRUYsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsRUFBRTtBQUNwQixjQUFZLEVBQUUsSUFBSTtBQUNsQixVQUFRLEVBQUUsS0FBSztBQUNmLFNBQU8sRUFBRSxnQkFBZ0I7QUFDekIsTUFBSSxFQUFFLDRDQUE0QztDQUNuRCxDQUFDLEVBRUYsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ2IsY0FBWSxFQUFFLEtBQUs7QUFDbkIsUUFBTSxFQUFFLFdBQVc7QUFDbkIsVUFBUSxFQUFFLEtBQUs7QUFDZixNQUFJLEVBQUUsK0JBQStCO0FBQ3JDLE9BQUssRUFBRSxDQUFDO0NBQ1QsQ0FBQyxFQUVGLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsRUFBRTtBQUM1QixNQUFJLEVBQUUsZUFBZTtBQUNyQixjQUFZLEVBQUUsS0FBSztBQUNuQixRQUFNLEVBQUUsV0FBVztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxrRUFBa0UsR0FDbEUscUJBQXFCO0NBQzVCLENBQUMsRUFFRixDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtBQUNuQixjQUFZLEVBQUUsS0FBSztBQUNuQixNQUFJLEVBQUUsYUFBYTtBQUNuQixRQUFNLEVBQUUsV0FBVztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxrRUFBa0U7QUFDeEUsT0FBSyxFQUFFLENBQUM7Q0FDVCxDQUFDLEVBRUYsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQ2pCLGNBQVksRUFBRSxLQUFLO0FBQ25CLE1BQUksRUFBRSxXQUFXO0FBQ2pCLFFBQU0sRUFBRSxXQUFXO0FBQ25CLFVBQVEsRUFBRSxLQUFLO0FBQ2YsTUFBSSxFQUFFLGdFQUFnRTtBQUN0RSxPQUFLLEVBQUUsQ0FBQztDQUNULENBQUMsRUFFRixDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRTtBQUNwQixjQUFZLEVBQUUsSUFBSTtBQUNsQixNQUFJLEVBQUUsNkJBQTZCO0FBQ25DLFVBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTyxFQUFFLG9DQUFvQztBQUM3QyxNQUFJLEVBQUUsd0RBQXdEO0NBQy9ELENBQUMsRUFFRixDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUU7QUFDbEIsY0FBWSxFQUFFLElBQUk7QUFDbEIsTUFBSSxFQUFFLGlCQUFpQjtBQUN2QixTQUFPLEVBQUUsS0FBSztBQUNkLFNBQU8sRUFBRSxzQkFBc0I7QUFDL0IsTUFBSSxFQUFFLHVDQUF1QztDQUM5QyxDQUFDLEVBRUYsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQ2pCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsY0FBWSxFQUFFLElBQUk7QUFDbEIsTUFBSSxFQUFFLCtEQUErRDtBQUNyRSxTQUFPLEVBQUUsOEJBQThCO0NBQ3hDLENBQUMsRUFFRixDQUFDLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLEVBQUU7QUFDM0IsY0FBWSxFQUFFLFNBQVM7QUFDdkIsTUFBSSxFQUFFLGNBQWM7QUFDcEIsVUFBUSxFQUFFLEtBQUs7QUFDZixTQUFPLEVBQUUsU0FBUztBQUNsQixNQUFJLEVBQUUscUJBQXFCO0NBQzVCLENBQUMsRUFFRixDQUFDLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxFQUFFO0FBQ3hCLGNBQVksRUFBRSxDQUFDLENBQUM7QUFDaEIsTUFBSSxFQUFFLFdBQVc7QUFDakIsVUFBUSxFQUFFLEtBQUs7QUFDZixNQUFJLEVBQUUsS0FBSztBQUNYLFNBQU8sRUFBRSxNQUFNO0FBQ2YsTUFBSSxFQUFFLGdCQUFnQjtDQUN2QixDQUFDLEVBRUYsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7QUFDdEIsY0FBWSxFQUFFLElBQUk7QUFDbEIsTUFBSSxFQUFFLGdCQUFnQjtBQUN0QixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxLQUFLO0FBQ1gsU0FBTyxFQUFFLE1BQU07QUFDZixNQUFJLEVBQUUsbURBQW1EO0NBQzFELENBQUMsRUFFRixDQUFDLENBQUMscUJBQXFCLENBQUMsRUFBRTtBQUN4QixjQUFZLEVBQUUsSUFBSTtBQUNsQixNQUFJLEVBQUUsa0JBQWtCO0FBQ3hCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsTUFBSSxFQUFFLEtBQUs7QUFDWCxTQUFPLEVBQUUsTUFBTTtBQUNmLE1BQUksRUFBRSx1Q0FBdUM7Q0FDOUMsQ0FBQyxFQUVGLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFO0FBQzlCLGNBQVksRUFBRSxJQUFJO0FBQ2xCLE1BQUksRUFBRSx3QkFBd0I7QUFDOUIsVUFBUSxFQUFFLEtBQUs7QUFDZixNQUFJLEVBQUUsbUNBQW1DO0NBQzFDLENBQUMsRUFFRixDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUU7QUFDbEIsY0FBWSxFQUFFLEtBQUs7QUFDbkIsTUFBSSxFQUFFLFlBQVk7QUFDbEIsUUFBTSxFQUFFLFdBQVc7QUFDbkIsVUFBUSxFQUFFLEtBQUs7QUFDZixNQUFJLEVBQUUsMERBQTBEO0NBQ2pFLENBQUMsRUFFRixDQUFDLENBQUMsa0JBQWtCLENBQUMsRUFBRTtBQUNyQixjQUFZLEVBQUUsS0FBSztBQUNuQixNQUFJLEVBQUUsY0FBYztBQUNwQixRQUFNLEVBQUUsV0FBVztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxxRUFBcUU7Q0FDNUUsQ0FBQyxFQUVGLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRTtBQUNsQixjQUFZLEVBQUUsS0FBSztBQUNuQixNQUFJLEVBQUUsbUJBQW1CO0FBQ3pCLFFBQU0sRUFBRSxXQUFXO0FBQ25CLFVBQVEsRUFBRSxLQUFLO0FBQ2YsTUFBSSxFQUFFLGlFQUFpRSxHQUNqRSxxREFBcUQ7QUFDM0QsT0FBSyxFQUFFLENBQUM7Q0FDVCxDQUFDLEVBRUYsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLEVBQUU7QUFDekIsY0FBWSxFQUFFLEtBQUs7QUFDbkIsTUFBSSxFQUFFLGtCQUFrQjtBQUN4QixRQUFNLEVBQUUsV0FBVztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxnRUFBZ0UsR0FDaEUsb0VBQW9FLEdBQ3BFLDZEQUE2RCxHQUM3RCxrRUFBa0UsR0FDbEUsb0VBQW9FLEdBQ3BFLGdFQUFnRTtBQUN0RSxPQUFLLEVBQUUsQ0FBQztDQUNULENBQUMsRUFFRixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDVixjQUFZLEVBQUUsSUFBSTtBQUNsQixNQUFJLEVBQUUsUUFBUTtBQUNkLFVBQVEsRUFBRSxLQUFLO0FBQ2YsTUFBSSxFQUFFLGdFQUFnRSxHQUNoRSxxRUFBcUUsR0FDckUsNERBQTREO0NBQ25FLENBQUMsRUFFRixDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUU7QUFDaEIsY0FBWSxFQUFFLElBQUk7QUFDbEIsTUFBSSxFQUFFLFVBQVU7QUFDaEIsVUFBUSxFQUFFLEtBQUs7QUFDZixNQUFJLEVBQUUsZ0VBQWdFLEdBQ2hFLGtEQUFrRDtDQUN6RCxDQUFDLEVBRUYsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7QUFDeEIsTUFBSSxFQUFFLGlCQUFpQjtBQUN2QixjQUFZLEVBQUUsS0FBSztBQUNuQixRQUFNLEVBQUUsV0FBVztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxnRUFBZ0U7Q0FDdkUsQ0FBQyxFQUVGLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFO0FBQy9CLE1BQUksRUFBRSx1QkFBdUI7QUFDN0IsY0FBWSxFQUFFLEtBQUs7QUFDbkIsUUFBTSxFQUFFLFdBQVc7QUFDbkIsVUFBUSxFQUFFLEtBQUs7QUFDZixNQUFJLEVBQUUsNkVBQTZFO0FBQ25GLE9BQUssRUFBRSxDQUFDO0NBQ1QsQ0FBQyxFQUVGLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRTtBQUNsQixNQUFJLEVBQUUsWUFBWTtBQUNsQixjQUFZLEVBQUUsS0FBSztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLFFBQU0sRUFBRSxXQUFXO0FBQ25CLE1BQUksRUFBRSx1RUFBdUU7Q0FDOUUsQ0FBQyxFQUVGLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFO0FBQzlCLGNBQVksRUFBRSxLQUFLO0FBQ25CLE1BQUksRUFBRSxzQkFBc0I7QUFDNUIsVUFBUSxFQUFFLEtBQUs7QUFDZixNQUFJLEVBQUUsS0FBSztBQUNYLFNBQU8sRUFBRSxPQUFPO0FBQ2hCLE1BQUksRUFBRSwwRUFBMEU7Q0FDakYsQ0FBQyxFQUVGLENBQUMsQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLENBQUMsRUFBRTtBQUNsQyxNQUFJLEVBQUUscUJBQXFCO0FBQzNCLGNBQVksRUFBRSxFQUFFO0FBQ2hCLE1BQUksRUFBRSxnQkFBZ0I7QUFDdEIsVUFBUSxFQUFFLEtBQUs7QUFDZixTQUFPLEVBQUUsK0RBQStELEdBQy9ELHdCQUF3QjtBQUNqQyxNQUFJLEVBQUUsa0VBQWtFLEdBQ2xFLHFEQUFxRDtDQUM1RCxDQUFDLENBQ0gsQ0FBQzs7QUFFRixJQUFNLGNBQWMsR0FBRyxDQUNyQixDQUFDLENBQUMsbUJBQW1CLENBQUMsRUFBRTtBQUN0QixjQUFZLEVBQUUsRUFBRTtBQUNoQixNQUFJLEVBQUUsdUJBQXVCO0FBQzdCLE1BQUksRUFBRSxLQUFLO0FBQ1gsVUFBUSxFQUFFLEtBQUs7QUFDZixNQUFJLEVBQUUsOERBQThELEdBQzlELGlFQUFpRSxHQUNqRSxpRUFBaUU7Q0FDeEUsQ0FBQyxFQUVGLENBQUMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsRUFBRTtBQUMzQixjQUFZLEVBQUUsS0FBSztBQUNuQixNQUFJLEVBQUUsZUFBZTtBQUNyQixRQUFNLEVBQUUsV0FBVztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxzRUFBc0UsR0FDdEUscUVBQXFFO0FBQzNFLE9BQUssRUFBRSxDQUFDO0NBQ1QsQ0FBQyxFQUVGLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO0FBQ3BCLE1BQUksRUFBRSxjQUFjO0FBQ3BCLGNBQVksRUFBRSxJQUFJO0FBQ2xCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxTQUFPLEVBQUUsS0FBSztBQUNkLE1BQUksRUFBRSx3RUFBd0U7Q0FDL0UsQ0FBQyxFQUVGLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO0FBQ3ZCLE1BQUksRUFBRSxpQkFBaUI7QUFDdkIsY0FBWSxFQUFFLElBQUk7QUFDbEIsVUFBUSxFQUFFLEtBQUs7QUFDZixlQUFhLEVBQUUsd0JBQXdCO0FBQ3ZDLFNBQU8sRUFBRSxLQUFLO0FBQ2QsTUFBSSxFQUFFLCtDQUErQztDQUN0RCxDQUFDLEVBRUYsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7QUFDdEIsTUFBSSxFQUFFLGdCQUFnQjtBQUN0QixjQUFZLEVBQUUsSUFBSTtBQUNsQixVQUFRLEVBQUUsS0FBSztBQUNmLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsU0FBTyxFQUFFLFFBQVE7QUFDakIsTUFBSSxFQUFFLGtFQUFrRTtDQUN6RSxDQUFDLEVBRUYsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO0FBQ2xCLE1BQUksRUFBRSxZQUFZO0FBQ2xCLGNBQVksRUFBRSxJQUFJO0FBQ2xCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxTQUFPLEVBQUUsMENBQTBDO0FBQ25ELE1BQUksRUFBRSxpREFBaUQ7Q0FDeEQsQ0FBQyxFQUVGLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO0FBQ25CLE1BQUksRUFBRSxhQUFhO0FBQ25CLGNBQVksRUFBRSxJQUFJO0FBQ2xCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxTQUFPLEVBQUUsUUFBUTtBQUNqQixNQUFJLEVBQUUsNkRBQTZEO0NBQ3BFLENBQUMsRUFFRixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDVixNQUFJLEVBQUUsS0FBSztBQUNYLFVBQVEsRUFBRSxLQUFLO0FBQ2YsY0FBWSxFQUFFLElBQUk7QUFDbEIsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsK0lBQStJO0FBQ3JKLFNBQU8sRUFBRSxxQkFBcUI7Q0FDL0IsQ0FBQyxFQUVGLENBQUMsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsRUFBRTtBQUM1QixjQUFZLEVBQUUsS0FBSztBQUNuQixNQUFJLEVBQUUsZUFBZTtBQUNyQixNQUFJLEVBQUUsS0FBSztBQUNYLFVBQVEsRUFBRSxLQUFLO0FBQ2YsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsNEVBQTRFO0NBQ25GLENBQUMsRUFFRixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUU7QUFDZixjQUFZLEVBQUUsSUFBSTtBQUNsQixNQUFJLEVBQUUsVUFBVTtBQUNoQixVQUFRLEVBQUUsS0FBSztBQUNmLFNBQU8sRUFBRSxJQUFJO0FBQ2IsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsa0VBQWtFO0NBQ3pFLENBQUMsRUFFRixDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDYixjQUFZLEVBQUUsSUFBSTtBQUNsQixNQUFJLEVBQUUsUUFBUTtBQUNkLFVBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTyxFQUFFLE9BQU87QUFDaEIsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsZ0VBQWdFO0NBQ3ZFLENBQUMsRUFFRixDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFO0FBQ2pCLE1BQUksRUFBRSxNQUFNO0FBQ1osVUFBUSxFQUFFLEtBQUs7QUFDZixjQUFZLEVBQUUsSUFBSTtBQUNsQixTQUFPLEVBQUUseUJBQXlCO0FBQ2xDLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsTUFBSSxFQUFFLDBFQUEwRTtDQUNqRixDQUFDLEVBRUYsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO0FBQ2xCLE1BQUksRUFBRSxhQUFhO0FBQ25CLGNBQVksRUFBRSxJQUFJO0FBQ2xCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTyxFQUFFLFdBQVc7QUFDcEIsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsaUZBQWlGLEdBQ2pGLHFCQUFxQjtDQUM1QixDQUFDLEVBRUYsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO0FBQ2YsY0FBWSxFQUFFLEtBQUs7QUFDbkIsTUFBSSxFQUFFLFNBQVM7QUFDZixRQUFNLEVBQUUsV0FBVztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsTUFBSSxFQUFFLGlGQUFpRixHQUNqRixnRUFBZ0U7QUFDdEUsT0FBSyxFQUFFLENBQUM7Q0FDVCxDQUFDLEVBRUYsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQ2pCLGNBQVksRUFBRSxLQUFLO0FBQ25CLE1BQUksRUFBRSxXQUFXO0FBQ2pCLFFBQU0sRUFBRSxXQUFXO0FBQ25CLFVBQVEsRUFBRSxLQUFLO0FBQ2YsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsK0VBQStFLEdBQy9FLDZEQUE2RCxHQUM3RCx1RUFBdUU7QUFDN0UsT0FBSyxFQUFFLENBQUM7Q0FDVCxDQUFDLEVBRUYsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBQ2QsTUFBSSxFQUFFLFlBQVk7QUFDbEIsY0FBWSxFQUFFLElBQUk7QUFDbEIsVUFBUSxFQUFFLEtBQUs7QUFDZixlQUFhLEVBQUUsd0JBQXdCO0FBQ3ZDLFNBQU8sRUFBRSwyQkFBMkI7QUFDcEMsTUFBSSxFQUFFLGdGQUFnRixHQUNoRixtQ0FBbUM7Q0FDMUMsQ0FBQyxFQUVGLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO0FBQ25CLE1BQUksRUFBRSxhQUFhO0FBQ25CLGNBQVksRUFBRSxJQUFJO0FBQ2xCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTyxFQUFFLGNBQWM7QUFDdkIsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsZ0ZBQWdGLEdBQ2hGLGtEQUFrRDtDQUN6RCxDQUFDLEVBRUYsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7QUFDdkIsTUFBSSxFQUFFLGdCQUFnQjtBQUN0QixjQUFZLEVBQUUsS0FBSztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLFNBQU8sRUFBRSwyQkFBMkI7QUFDcEMsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsK0VBQStFLEdBQy9FLCtDQUErQztDQUN0RCxDQUFDLEVBRUYsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7QUFDeEIsTUFBSSxFQUFFLGlCQUFpQjtBQUN2QixjQUFZLEVBQUUsS0FBSztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLFNBQU8sRUFBRSxnQkFBZ0I7QUFDekIsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsZ0ZBQWdGLEdBQ2hGLG9DQUFvQztDQUMzQyxDQUFDLEVBRUYsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLEVBQUU7QUFDM0IsTUFBSSxFQUFFLG9CQUFvQjtBQUMxQixjQUFZLEVBQUUsQ0FBQztBQUNmLFVBQVEsRUFBRSxLQUFLO0FBQ2YsTUFBSSxFQUFFLEtBQUs7QUFDWCxTQUFPLEVBQUUsR0FBRztBQUNaLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsTUFBSSxFQUFFLDJGQUEyRjtDQUNsRyxDQUFDLEVBRUYsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7QUFDdkIsTUFBSSxFQUFFLGlCQUFpQjtBQUN2QixjQUFZLEVBQUUsS0FBSztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLFNBQU8sRUFBRSx5REFBeUQ7QUFDbEUsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsdUZBQXVGLEdBQ3ZGLDhDQUE4QztDQUNyRCxDQUFDLEVBRUYsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ1YsTUFBSSxFQUFFLEtBQUs7QUFDWCxjQUFZLEVBQUUsSUFBSTtBQUNsQixVQUFRLEVBQUUsS0FBSztBQUNmLFNBQU8sRUFBRSxVQUFVO0FBQ25CLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsTUFBSSxFQUFFLHlEQUF5RDtDQUNoRSxDQUFDLEVBRUYsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO0FBQ2YsTUFBSSxFQUFFLFNBQVM7QUFDZixjQUFZLEVBQUUsSUFBSTtBQUNsQixVQUFRLEVBQUUsS0FBSztBQUNmLFNBQU8sRUFBRSxtQkFBbUI7QUFDNUIsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsK0VBQStFO0NBQ3RGLENBQUMsRUFFRixDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtBQUNuQixjQUFZLEVBQUUsS0FBSztBQUNuQixNQUFJLEVBQUUsYUFBYTtBQUNuQixRQUFNLEVBQUUsV0FBVztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsTUFBSSxFQUFFLGdGQUFnRjtDQUN2RixDQUFDLEVBRUYsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7QUFDcEIsY0FBWSxFQUFFLGtCQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixDQUFDO0FBQzNHLE1BQUksRUFBRSxjQUFjO0FBQ3BCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsZ0RBQWdEO0NBQ3ZELENBQUMsRUFFRixDQUFDLENBQUMscUJBQXFCLENBQUMsRUFBRTtBQUN4QixjQUFZLEVBQUUsU0FBUztBQUN2QixNQUFJLEVBQUUsa0JBQWtCO0FBQ3hCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsb0RBQW9EO0NBQzNELENBQUMsRUFFRixDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUU7QUFDaEIsY0FBWSxFQUFFLGlCQUFpQjtBQUMvQixNQUFJLEVBQUUsVUFBVTtBQUNoQixVQUFRLEVBQUUsS0FBSztBQUNmLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsTUFBSSxFQUFFLHlDQUF5QztDQUNoRCxDQUFDLEVBRUYsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7QUFDbkIsY0FBWSxFQUFFLFNBQVM7QUFDdkIsTUFBSSxFQUFFLGFBQWE7QUFDbkIsVUFBUSxFQUFFLEtBQUs7QUFDZixlQUFhLEVBQUUsd0JBQXdCO0FBQ3ZDLE1BQUksRUFBRSw0Q0FBNEM7Q0FDbkQsQ0FBQyxFQUVGLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO0FBQ3BCLE1BQUksRUFBRSxjQUFjO0FBQ3BCLGNBQVksRUFBRSw0QkFBNEI7QUFDMUMsVUFBUSxFQUFFLEtBQUs7QUFDZixTQUFPLEVBQUUsNEJBQTRCO0FBQ3JDLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsTUFBSSxFQUFFLGtGQUFrRjtDQUN6RixDQUFDLEVBRUYsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7QUFDdEIsTUFBSSxFQUFFLGdCQUFnQjtBQUN0QixjQUFZLEVBQUUsa0NBQWtDO0FBQ2hELFVBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTyxFQUFFLHNDQUFzQztBQUMvQyxlQUFhLEVBQUUsd0JBQXdCO0FBQ3ZDLE1BQUksRUFBRSxvRkFBb0Y7Q0FDM0YsQ0FBQyxFQUVGLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO0FBQ25CLE1BQUksRUFBRSxhQUFhO0FBQ25CLGNBQVksRUFBRSxZQUFZO0FBQzFCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTyxFQUFFLFlBQVk7QUFDckIsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUseUVBQXlFO0NBQ2hGLENBQUMsRUFFRixDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUU7QUFDbEIsTUFBSSxFQUFFLHlCQUF5QjtBQUMvQixjQUFZLEVBQUUsSUFBSTtBQUNsQixVQUFRLEVBQUUsS0FBSztBQUNmLFNBQU8sRUFBRSxZQUFZO0FBQ3JCLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsTUFBSSxFQUFFLGlGQUFpRixHQUNqRixnQkFBZ0I7Q0FDdkIsQ0FBQyxFQUVGLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO0FBQzdCLE1BQUksRUFBRSxvQkFBb0I7QUFDMUIsY0FBWSxFQUFFLEtBQUs7QUFDbkIsUUFBTSxFQUFFLFdBQVc7QUFDbkIsVUFBUSxFQUFFLEtBQUs7QUFDZixlQUFhLEVBQUUsd0JBQXdCO0FBQ3ZDLE1BQUksRUFBRSw0RkFBNEY7Q0FDbkcsQ0FBQyxFQUVGLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO0FBQ3RCLGNBQVksRUFBRSxJQUFJO0FBQ2xCLE1BQUksRUFBRSxnQkFBZ0I7QUFDdEIsVUFBUSxFQUFFLEtBQUs7QUFDZixTQUFPLEVBQUUsV0FBVztBQUNwQixlQUFhLEVBQUUsd0JBQXdCO0FBQ3ZDLE1BQUksRUFBRSxpRUFBaUU7Q0FDeEUsQ0FBQyxFQUVGLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO0FBQzdCLGNBQVksRUFBRSxLQUFLO0FBQ25CLE1BQUksRUFBRSxzQkFBc0I7QUFDNUIsUUFBTSxFQUFFLFdBQVc7QUFDbkIsVUFBUSxFQUFFLEtBQUs7QUFDZixlQUFhLEVBQUUsd0JBQXdCO0FBQ3ZDLE1BQUksRUFBRSxpRUFBaUUsR0FDakUsaUVBQWlFLEdBQ2pFLG9CQUFvQjtBQUMxQixPQUFLLEVBQUUsQ0FBQztDQUNULENBQUMsRUFFRixDQUFDLENBQUMsa0JBQWtCLENBQUMsRUFBRTtBQUNyQixjQUFZLEVBQUUsS0FBSztBQUNuQixNQUFJLEVBQUUsZUFBZTtBQUNyQixRQUFNLEVBQUUsV0FBVztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsTUFBSSxFQUFFLHlHQUF5RztBQUMvRyxPQUFLLEVBQUUsQ0FBQztDQUNULENBQUMsRUFFRixDQUFDLENBQUMsMkJBQTJCLENBQUMsRUFBRTtBQUM5QixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSx1QkFBdUI7QUFDN0IsY0FBWSxFQUFFLFVBQVU7QUFDeEIsZUFBYSxFQUFFLHdCQUF3QjtBQUN2QyxNQUFJLEVBQUUsZ0dBQWdHO0FBQ3RHLFNBQU8sRUFBRSxVQUFVO0NBQ3BCLENBQUMsRUFFRixDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtBQUNuQixjQUFZLEVBQUUsS0FBSztBQUNuQixNQUFJLEVBQUUsWUFBWTtBQUNsQixRQUFNLEVBQUUsV0FBVztBQUNuQixVQUFRLEVBQUUsS0FBSztBQUNmLGVBQWEsRUFBRSx3QkFBd0I7QUFDdkMsTUFBSSxFQUFFLHFGQUFxRjtBQUMzRixPQUFLLEVBQUUsQ0FBQztDQUNULENBQUMsRUFFRixDQUFDLENBQUMsbUJBQW1CLENBQUMsRUFBRTtBQUN0QixjQUFZLEVBQUUsSUFBSTtBQUNoQixNQUFJLEVBQUMsYUFBYTtBQUNsQixVQUFRLEVBQUUsS0FBSztBQUNmLFNBQU8sRUFBRSxHQUFHO0FBQ1osTUFBSSxFQUFFLG1CQUFtQjtDQUM1QixDQUFDLEVBQ0UsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQ3JCLGNBQVksRUFBRSxJQUFJO0FBQ2hCLE1BQUksRUFBQyxnQkFBZ0I7QUFDckIsVUFBUSxFQUFFLEtBQUs7QUFDZixTQUFPLEVBQUUsU0FBUztBQUNsQixNQUFJLEVBQUUscUJBQXFCO0NBQzlCLENBQUMsRUFDRixDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDZCxjQUFZLEVBQUUsS0FBSztBQUNqQixNQUFJLEVBQUMsU0FBUztBQUNkLFFBQU0sRUFBRSxXQUFXO0FBQ25CLFVBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTyxFQUFFLFlBQVk7QUFDckIsTUFBSSxFQUFFLGlCQUFpQjtBQUN2QixPQUFLLEVBQUUsQ0FBQztDQUNYLENBQUMsRUFDRixDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRTtBQUNwQixjQUFZLEVBQUUsR0FBRztBQUNmLE1BQUksRUFBQyxlQUFlO0FBQ3BCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsU0FBTyxFQUFFLEdBQUc7QUFDWixNQUFJLEVBQUUsbUJBQW1CO0NBQzVCLENBQUMsRUFDRixDQUFDLENBQUMsaUJBQWlCLEVBQUMsa0JBQWtCLENBQUMsRUFBRTtBQUN2QyxVQUFRLEVBQUUsS0FBSztBQUNiLGNBQVksRUFBRSxJQUFJO0FBQ2xCLFNBQU8sRUFBRSxVQUFVO0FBQ25CLE1BQUksRUFBRSwyRkFBMkY7Q0FDcEcsQ0FBQyxFQUNGLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRTtBQUNqQixjQUFZLEVBQUUsSUFBSTtBQUNoQixNQUFJLEVBQUMsWUFBWTtBQUNqQixVQUFRLEVBQUUsS0FBSztBQUNmLE1BQUksRUFBRSxlQUFlO0NBQ3hCLENBQUMsQ0FDSCxDQUFDOztBQUVGLFNBQVMscUNBQXFDLENBQUUsTUFBTSxFQUFFOzs7Ozs7QUFNdEQsUUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ3JDLFFBQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVSxJQUFJLEVBQUU7QUFDakMsUUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxjQUFVLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQzs7Ozs7O0FBQ3RFLHdDQUFxQixjQUFjLDRHQUFFO1lBQTVCLFFBQVE7O0FBQ2YsWUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUMzQixZQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssd0JBQXdCLEVBQUU7QUFDMUQsY0FBSSxHQUFHLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFO0FBQ3JFLHNCQUFVLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUV0RCxnQkFBSSxPQUFPLHVCQUFLLEdBQUcsRUFBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN2QyxvQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxvQ0FDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFHLENBQUM7V0FDNUQ7U0FDRjtPQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsV0FBTyxVQUFVLENBQUM7R0FDbkIsQ0FBQztDQUNIOztBQUVELFNBQVMsZ0JBQWdCLENBQUUsSUFBSSxFQUFFO0FBQy9CLE1BQUk7Ozs7OztBQU1GLFFBQUksZ0JBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO0FBQzlCLFVBQUksR0FBRyxnQkFBRyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ3RDO0dBQ0YsQ0FBQyxPQUFPLEdBQUcsRUFBRTs7R0FFYjtBQUNELE1BQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLE1BQUksQ0FBQyxvQkFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDMUIsVUFBTSx5Q0FBeUMsQ0FBQztHQUNqRDtBQUNELFNBQU8sSUFBSSxDQUFDO0NBQ2I7O0FBRUQsU0FBUyxTQUFTLEdBQUk7QUFDcEIsTUFBSSxNQUFNLEdBQUcsNkJBQW1CO0FBQzlCLFdBQU8sRUFBRSx5QkFBTyxPQUFPO0FBQ3ZCLFdBQU8sRUFBRSxJQUFJO0FBQ2IsZUFBVyxFQUFFLDRGQUE0RjtHQUMxRyxDQUFDLENBQUM7QUFDSCxNQUFJLE9BQU8sR0FBRyxvQkFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzVDLFFBQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7Ozs7QUFDekIsdUNBQWdCLE9BQU8saUhBQUU7VUFBaEIsR0FBRzs7QUFDVixZQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNwQzs7Ozs7Ozs7Ozs7Ozs7OztBQUNELHVDQUFxQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUU5QyxTQUFPLE1BQU0sQ0FBQztDQUNmOztBQUVELFNBQVMsY0FBYyxHQUFJO0FBQ3pCLE1BQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBQ2xCLHVDQUFtQixJQUFJLGlIQUFFOzs7VUFBZCxHQUFHOztBQUNaLGNBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztLQUN2Qzs7Ozs7Ozs7Ozs7Ozs7OztBQUNELFNBQU8sUUFBUSxDQUFDO0NBQ2pCOztxQkFFYyxTQUFTO1FBQ2YsY0FBYyxHQUFkLGNBQWM7UUFBRSxTQUFTLEdBQVQsU0FBUyIsImZpbGUiOiJsaWJcXHBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBBcmd1bWVudFBhcnNlciB9IGZyb20gJ2FyZ3BhcnNlJztcbmltcG9ydCBwa2dPYmogZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcblxuXG5jb25zdCBhcmdzID0gW1xuICBbWyctLXNoZWxsJ10sIHtcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGhlbHA6ICdFbnRlciBSRVBMIG1vZGUnLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLWlwYSddLCB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBoZWxwOiAnKElPUy1vbmx5KSBhYnMgcGF0aCB0byBjb21waWxlZCAuaXBhIGZpbGUnLFxuICAgIGV4YW1wbGU6ICcvYWJzL3BhdGgvdG8vbXkuaXBhJyxcbiAgfV0sXG5cbiAgW1snLWEnLCAnLS1hZGRyZXNzJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6ICcwLjAuMC4wJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJzAuMC4wLjAnLFxuICAgIGhlbHA6ICdJUCBBZGRyZXNzIHRvIGxpc3RlbiBvbicsXG4gIH1dLFxuXG4gIFtbJy1wJywgJy0tcG9ydCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiA0NzIzLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiAnaW50JyxcbiAgICBleGFtcGxlOiAnNDcyMycsXG4gICAgaGVscDogJ3BvcnQgdG8gbGlzdGVuIG9uJyxcbiAgfV0sXG5cbiAgW1snLWNhJywgJy0tY2FsbGJhY2stYWRkcmVzcyddLCB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlc3Q6ICdjYWxsYmFja0FkZHJlc3MnLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBleGFtcGxlOiAnMTI3LjAuMC4xJyxcbiAgICBoZWxwOiAnY2FsbGJhY2sgSVAgQWRkcmVzcyAoZGVmYXVsdDogc2FtZSBhcyAtLWFkZHJlc3MpJyxcbiAgfV0sXG5cbiAgW1snLWNwJywgJy0tY2FsbGJhY2stcG9ydCddLCB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlc3Q6ICdjYWxsYmFja1BvcnQnLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICB0eXBlOiAnaW50JyxcbiAgICBleGFtcGxlOiAnNDcyMycsXG4gICAgaGVscDogJ2NhbGxiYWNrIHBvcnQgKGRlZmF1bHQ6IHNhbWUgYXMgcG9ydCknLFxuICB9XSxcblxuICBbWyctYnAnLCAnLS1ib290c3RyYXAtcG9ydCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiA0NzI0LFxuICAgIGRlc3Q6ICdib290c3RyYXBQb3J0JyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgZXhhbXBsZTogJzQ3MjQnLFxuICAgIGhlbHA6ICcoQW5kcm9pZC1vbmx5KSBwb3J0IHRvIHVzZSBvbiBkZXZpY2UgdG8gdGFsayB0byBBcHBpdW0nLFxuICB9XSxcblxuICBbWyctcicsICctLWJhY2tlbmQtcmV0cmllcyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiAzLFxuICAgIGRlc3Q6ICdiYWNrZW5kUmV0cmllcycsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIGV4YW1wbGU6ICczJyxcbiAgICBoZWxwOiAnKGlPUy1vbmx5KSBIb3cgbWFueSB0aW1lcyB0byByZXRyeSBsYXVuY2hpbmcgSW5zdHJ1bWVudHMgJyArXG4gICAgICAgICAgJ2JlZm9yZSBzYXlpbmcgaXQgY3Jhc2hlZCBvciB0aW1lZCBvdXQnLFxuICB9XSxcblxuICBbWyctLXNlc3Npb24tb3ZlcnJpZGUnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ3Nlc3Npb25PdmVycmlkZScsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ0VuYWJsZXMgc2Vzc2lvbiBvdmVycmlkZSAoY2xvYmJlcmluZyknLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctbCcsICctLXByZS1sYXVuY2gnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ2xhdW5jaCcsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ1ByZS1sYXVuY2ggdGhlIGFwcGxpY2F0aW9uIGJlZm9yZSBhbGxvd2luZyB0aGUgZmlyc3Qgc2Vzc2lvbiAnICtcbiAgICAgICAgICAnKFJlcXVpcmVzIC0tYXBwIGFuZCwgZm9yIEFuZHJvaWQsIC0tYXBwLXBrZyBhbmQgLS1hcHAtYWN0aXZpdHkpJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLWcnLCAnLS1sb2cnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBkZXN0OiAnbG9nJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJy9wYXRoL3RvL2FwcGl1bS5sb2cnLFxuICAgIGhlbHA6ICdBbHNvIHNlbmQgbG9nIG91dHB1dCB0byB0aGlzIGZpbGUnLFxuICB9XSxcblxuICBbWyctLWxvZy1sZXZlbCddLCB7XG4gICAgY2hvaWNlczogWydpbmZvJywgJ2luZm86ZGVidWcnLCAnaW5mbzppbmZvJywgJ2luZm86d2FybicsICdpbmZvOmVycm9yJyxcbiAgICAgICAgICAgICAgJ3dhcm4nLCAnd2FybjpkZWJ1ZycsICd3YXJuOmluZm8nLCAnd2Fybjp3YXJuJywgJ3dhcm46ZXJyb3InLFxuICAgICAgICAgICAgICAnZXJyb3InLCAnZXJyb3I6ZGVidWcnLCAnZXJyb3I6aW5mbycsICdlcnJvcjp3YXJuJywgJ2Vycm9yOmVycm9yJyxcbiAgICAgICAgICAgICAgJ2RlYnVnJywgJ2RlYnVnOmRlYnVnJywgJ2RlYnVnOmluZm8nLCAnZGVidWc6d2FybicsICdkZWJ1ZzplcnJvciddLFxuICAgIGRlZmF1bHRWYWx1ZTogJ2RlYnVnJyxcbiAgICBkZXN0OiAnbG9nbGV2ZWwnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnZGVidWcnLFxuICAgIGhlbHA6ICdsb2cgbGV2ZWw7IGRlZmF1bHQgKGNvbnNvbGVbOmZpbGVdKTogZGVidWdbOmRlYnVnXScsXG4gIH1dLFxuXG4gIFtbJy0tbG9nLXRpbWVzdGFtcCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ1Nob3cgdGltZXN0YW1wcyBpbiBjb25zb2xlIG91dHB1dCcsXG4gICAgbmFyZ3M6IDAsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICBkZXN0OiAnbG9nVGltZXN0YW1wJyxcbiAgfV0sXG5cbiAgW1snLS1sb2NhbC10aW1lem9uZSddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ1VzZSBsb2NhbCB0aW1lem9uZSBmb3IgdGltZXN0YW1wcycsXG4gICAgbmFyZ3M6IDAsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICBkZXN0OiAnbG9jYWxUaW1lem9uZScsXG4gIH1dLFxuXG4gIFtbJy0tbG9nLW5vLWNvbG9ycyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ0RvIG5vdCB1c2UgY29sb3JzIGluIGNvbnNvbGUgb3V0cHV0JyxcbiAgICBuYXJnczogMCxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIGRlc3Q6ICdsb2dOb0NvbG9ycycsXG4gIH1dLFxuXG4gIFtbJy1HJywgJy0td2ViaG9vayddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnbG9jYWxob3N0Ojk4NzYnLFxuICAgIGhlbHA6ICdBbHNvIHNlbmQgbG9nIG91dHB1dCB0byB0aGlzIEhUVFAgbGlzdGVuZXInLFxuICB9XSxcblxuICBbWyctLXNhZmFyaSddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnKElPUy1Pbmx5KSBVc2UgdGhlIHNhZmFyaSBhcHAnLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLWRlZmF1bHQtZGV2aWNlJywgJy1kZCddLCB7XG4gICAgZGVzdDogJ2RlZmF1bHREZXZpY2UnLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJyhJT1MtU2ltdWxhdG9yLW9ubHkpIHVzZSB0aGUgZGVmYXVsdCBzaW11bGF0b3IgdGhhdCBpbnN0cnVtZW50cyAnICtcbiAgICAgICAgICAnbGF1bmNoZXMgb24gaXRzIG93bicsXG4gIH1dLFxuXG4gIFtbJy0tZm9yY2UtaXBob25lJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdmb3JjZUlwaG9uZScsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJyhJT1Mtb25seSkgVXNlIHRoZSBpUGhvbmUgU2ltdWxhdG9yIG5vIG1hdHRlciB3aGF0IHRoZSBhcHAgd2FudHMnLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLWZvcmNlLWlwYWQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ2ZvcmNlSXBhZCcsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJyhJT1Mtb25seSkgVXNlIHRoZSBpUGFkIFNpbXVsYXRvciBubyBtYXR0ZXIgd2hhdCB0aGUgYXBwIHdhbnRzJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS10cmFjZXRlbXBsYXRlJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZGVzdDogJ2F1dG9tYXRpb25UcmFjZVRlbXBsYXRlUGF0aCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICcvVXNlcnMvbWUvQXV0b21hdGlvbi50cmFjZXRlbXBsYXRlJyxcbiAgICBoZWxwOiAnKElPUy1vbmx5KSAudHJhY2V0ZW1wbGF0ZSBmaWxlIHRvIHVzZSB3aXRoIEluc3RydW1lbnRzJyxcbiAgfV0sXG5cbiAgW1snLS1pbnN0cnVtZW50cyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGRlc3Q6ICdpbnN0cnVtZW50c1BhdGgnLFxuICAgIHJlcXVpcmU6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICcvcGF0aC90by9pbnN0cnVtZW50cycsXG4gICAgaGVscDogJyhJT1Mtb25seSkgcGF0aCB0byBpbnN0cnVtZW50cyBiaW5hcnknLFxuICB9XSxcblxuICBbWyctLW5vZGVjb25maWcnXSwge1xuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgaGVscDogJ0NvbmZpZ3VyYXRpb24gSlNPTiBmaWxlIHRvIHJlZ2lzdGVyIGFwcGl1bSB3aXRoIHNlbGVuaXVtIGdyaWQnLFxuICAgIGV4YW1wbGU6ICcvYWJzL3BhdGgvdG8vbm9kZWNvbmZpZy5qc29uJyxcbiAgfV0sXG5cbiAgW1snLXJhJywgJy0tcm9ib3QtYWRkcmVzcyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiAnMC4wLjAuMCcsXG4gICAgZGVzdDogJ3JvYm90QWRkcmVzcycsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICcwLjAuMC4wJyxcbiAgICBoZWxwOiAnSVAgQWRkcmVzcyBvZiByb2JvdCcsXG4gIH1dLFxuXG4gIFtbJy1ycCcsICctLXJvYm90LXBvcnQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogLTEsXG4gICAgZGVzdDogJ3JvYm90UG9ydCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIGV4YW1wbGU6ICc0MjQyJyxcbiAgICBoZWxwOiAncG9ydCBmb3Igcm9ib3QnLFxuICB9XSxcblxuICBbWyctLXNlbGVuZHJvaWQtcG9ydCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiA4MDgwLFxuICAgIGRlc3Q6ICdzZWxlbmRyb2lkUG9ydCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIGV4YW1wbGU6ICc4MDgwJyxcbiAgICBoZWxwOiAnTG9jYWwgcG9ydCB1c2VkIGZvciBjb21tdW5pY2F0aW9uIHdpdGggU2VsZW5kcm9pZCcsXG4gIH1dLFxuXG4gIFtbJy0tY2hyb21lZHJpdmVyLXBvcnQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogOTUxNSxcbiAgICBkZXN0OiAnY2hyb21lRHJpdmVyUG9ydCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIGV4YW1wbGU6ICc5NTE1JyxcbiAgICBoZWxwOiAnUG9ydCB1cG9uIHdoaWNoIENocm9tZURyaXZlciB3aWxsIHJ1bicsXG4gIH1dLFxuXG4gIFtbJy0tY2hyb21lZHJpdmVyLWV4ZWN1dGFibGUnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBkZXN0OiAnY2hyb21lZHJpdmVyRXhlY3V0YWJsZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdDaHJvbWVEcml2ZXIgZXhlY3V0YWJsZSBmdWxsIHBhdGgnLFxuICB9XSxcblxuICBbWyctLXNob3ctY29uZmlnJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdzaG93Q29uZmlnJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnU2hvdyBpbmZvIGFib3V0IHRoZSBhcHBpdW0gc2VydmVyIGNvbmZpZ3VyYXRpb24gYW5kIGV4aXQnLFxuICB9XSxcblxuICBbWyctLW5vLXBlcm1zLWNoZWNrJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdub1Blcm1zQ2hlY2snLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdCeXBhc3MgQXBwaXVtXFwncyBjaGVja3MgdG8gZW5zdXJlIHdlIGNhbiByZWFkL3dyaXRlIG5lY2Vzc2FyeSBmaWxlcycsXG4gIH1dLFxuXG4gIFtbJy0tc3RyaWN0LWNhcHMnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ2VuZm9yY2VTdHJpY3RDYXBzJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnQ2F1c2Ugc2Vzc2lvbnMgdG8gZmFpbCBpZiBkZXNpcmVkIGNhcHMgYXJlIHNlbnQgaW4gdGhhdCBBcHBpdW0gJyArXG4gICAgICAgICAgJ2RvZXMgbm90IHJlY29nbml6ZSBhcyB2YWxpZCBmb3IgdGhlIHNlbGVjdGVkIGRldmljZScsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0taXNvbGF0ZS1zaW0tZGV2aWNlJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdpc29sYXRlU2ltRGV2aWNlJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnWGNvZGUgNiBoYXMgYSBidWcgb24gc29tZSBwbGF0Zm9ybXMgd2hlcmUgYSBjZXJ0YWluIHNpbXVsYXRvciAnICtcbiAgICAgICAgICAnY2FuIG9ubHkgYmUgbGF1bmNoZWQgd2l0aG91dCBlcnJvciBpZiBhbGwgb3RoZXIgc2ltdWxhdG9yIGRldmljZXMgJyArXG4gICAgICAgICAgJ2FyZSBmaXJzdCBkZWxldGVkLiBUaGlzIG9wdGlvbiBjYXVzZXMgQXBwaXVtIHRvIGRlbGV0ZSBhbGwgJyArXG4gICAgICAgICAgJ2RldmljZXMgb3RoZXIgdGhhbiB0aGUgb25lIGJlaW5nIHVzZWQgYnkgQXBwaXVtLiBOb3RlIHRoYXQgdGhpcyAnICtcbiAgICAgICAgICAnaXMgYSBwZXJtYW5lbnQgZGVsZXRpb24sIGFuZCB5b3UgYXJlIHJlc3BvbnNpYmxlIGZvciB1c2luZyBzaW1jdGwgJyArXG4gICAgICAgICAgJ29yIHhjb2RlIHRvIG1hbmFnZSB0aGUgY2F0ZWdvcmllcyBvZiBkZXZpY2VzIHVzZWQgd2l0aCBBcHBpdW0uJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS10bXAnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBkZXN0OiAndG1wRGlyJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ0Fic29sdXRlIHBhdGggdG8gZGlyZWN0b3J5IEFwcGl1bSBjYW4gdXNlIHRvIG1hbmFnZSB0ZW1wb3JhcnkgJyArXG4gICAgICAgICAgJ2ZpbGVzLCBsaWtlIGJ1aWx0LWluIGlPUyBhcHBzIGl0IG5lZWRzIHRvIG1vdmUgYXJvdW5kLiBPbiAqbml4L01hYyAnICtcbiAgICAgICAgICAnZGVmYXVsdHMgdG8gL3RtcCwgb24gV2luZG93cyBkZWZhdWx0cyB0byBDOlxcXFxXaW5kb3dzXFxcXFRlbXAnLFxuICB9XSxcblxuICBbWyctLXRyYWNlLWRpciddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGRlc3Q6ICd0cmFjZURpcicsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdBYnNvbHV0ZSBwYXRoIHRvIGRpcmVjdG9yeSBBcHBpdW0gdXNlIHRvIHNhdmUgaW9zIGluc3RydW1lbnRzICcgK1xuICAgICAgICAgICd0cmFjZXMsIGRlZmF1bHRzIHRvIDx0bXAgZGlyPi9hcHBpdW0taW5zdHJ1bWVudHMnLFxuICB9XSxcblxuICBbWyctLWRlYnVnLWxvZy1zcGFjaW5nJ10sIHtcbiAgICBkZXN0OiAnZGVidWdMb2dTcGFjaW5nJyxcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdBZGQgZXhhZ2dlcmF0ZWQgc3BhY2luZyBpbiBsb2dzIHRvIGhlbHAgd2l0aCB2aXN1YWwgaW5zcGVjdGlvbicsXG4gIH1dLFxuXG4gIFtbJy0tc3VwcHJlc3MtYWRiLWtpbGwtc2VydmVyJ10sIHtcbiAgICBkZXN0OiAnc3VwcHJlc3NBZGJLaWxsU2VydmVyJyxcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICcoQW5kcm9pZC1vbmx5KSBJZiBzZXQsIHByZXZlbnRzIEFwcGl1bSBmcm9tIGtpbGxpbmcgdGhlIGFkYiBzZXJ2ZXIgaW5zdGFuY2UnLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLWFzeW5jLXRyYWNlJ10sIHtcbiAgICBkZXN0OiAnYXN5bmNUcmFjZScsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICBoZWxwOiAnQWRkIGxvbmcgc3RhY2sgdHJhY2VzIHRvIGxvZyBlbnRyaWVzLiBSZWNvbW1lbmRlZCBmb3IgZGVidWdnaW5nIG9ubHkuJyxcbiAgfV0sXG5cbiAgW1snLS13ZWJraXQtZGVidWctcHJveHktcG9ydCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiAyNzc1MyxcbiAgICBkZXN0OiAnd2Via2l0RGVidWdQcm94eVBvcnQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiAnaW50JyxcbiAgICBleGFtcGxlOiBcIjI3NzUzXCIsXG4gICAgaGVscDogJyhJT1Mtb25seSkgTG9jYWwgcG9ydCB1c2VkIGZvciBjb21tdW5pY2F0aW9uIHdpdGggaW9zLXdlYmtpdC1kZWJ1Zy1wcm94eSdcbiAgfV0sXG5cbiAgW1snLWRjJywgJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnXSwge1xuICAgIGRlc3Q6ICdkZWZhdWx0Q2FwYWJpbGl0aWVzJyxcbiAgICBkZWZhdWx0VmFsdWU6IHt9LFxuICAgIHR5cGU6IHBhcnNlRGVmYXVsdENhcHMsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdbIFxcJ3tcImFwcFwiOiBcIm15YXBwLmFwcFwiLCBcImRldmljZU5hbWVcIjogXCJpUGhvbmUgU2ltdWxhdG9yXCJ9XFwnICcgK1xuICAgICAgICAgICAgICd8IC9wYXRoL3RvL2NhcHMuanNvbiBdJyxcbiAgICBoZWxwOiAnU2V0IHRoZSBkZWZhdWx0IGRlc2lyZWQgY2FwYWJpbGl0aWVzLCB3aGljaCB3aWxsIGJlIHNldCBvbiBlYWNoICcgK1xuICAgICAgICAgICdzZXNzaW9uIHVubGVzcyBvdmVycmlkZGVuIGJ5IHJlY2VpdmVkIGNhcGFiaWxpdGllcy4nXG4gIH1dLFxuXTtcblxuY29uc3QgZGVwcmVjYXRlZEFyZ3MgPSBbXG4gIFtbJy0tY29tbWFuZC10aW1lb3V0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IDYwLFxuICAgIGRlc3Q6ICdkZWZhdWx0Q29tbWFuZFRpbWVvdXQnLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIE5vIGVmZmVjdC4gVGhpcyB1c2VkIHRvIGJlIHRoZSBkZWZhdWx0IGNvbW1hbmQgJyArXG4gICAgICAgICAgJ3RpbWVvdXQgZm9yIHRoZSBzZXJ2ZXIgdG8gdXNlIGZvciBhbGwgc2Vzc2lvbnMgKGluIHNlY29uZHMgYW5kICcgK1xuICAgICAgICAgICdzaG91bGQgYmUgbGVzcyB0aGFuIDIxNDc0ODMpLiBVc2UgbmV3Q29tbWFuZFRpbWVvdXQgY2FwIGluc3RlYWQnXG4gIH1dLFxuXG4gIFtbJy1rJywgJy0ta2VlcC1hcnRpZmFjdHMnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ2tlZXBBcnRpZmFjdHMnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBubyBlZmZlY3QsIHRyYWNlIGlzIG5vdyBpbiB0bXAgZGlyIGJ5IGRlZmF1bHQgYW5kIGlzICcgK1xuICAgICAgICAgICdjbGVhcmVkIGJlZm9yZSBlYWNoIHJ1bi4gUGxlYXNlIGFsc28gcmVmZXIgdG8gdGhlIC0tdHJhY2UtZGlyIGZsYWcuJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS1wbGF0Zm9ybS1uYW1lJ10sIHtcbiAgICBkZXN0OiAncGxhdGZvcm1OYW1lJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBleGFtcGxlOiAnaU9TJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gTmFtZSBvZiB0aGUgbW9iaWxlIHBsYXRmb3JtOiBpT1MsIEFuZHJvaWQsIG9yIEZpcmVmb3hPUycsXG4gIH1dLFxuXG4gIFtbJy0tcGxhdGZvcm0tdmVyc2lvbiddLCB7XG4gICAgZGVzdDogJ3BsYXRmb3JtVmVyc2lvbicsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgZXhhbXBsZTogJzcuMScsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIFZlcnNpb24gb2YgdGhlIG1vYmlsZSBwbGF0Zm9ybScsXG4gIH1dLFxuXG4gIFtbJy0tYXV0b21hdGlvbi1uYW1lJ10sIHtcbiAgICBkZXN0OiAnYXV0b21hdGlvbk5hbWUnLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGV4YW1wbGU6ICdBcHBpdW0nLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBOYW1lIG9mIHRoZSBhdXRvbWF0aW9uIHRvb2w6IEFwcGl1bSBvciBTZWxlbmRyb2lkJyxcbiAgfV0sXG5cbiAgW1snLS1kZXZpY2UtbmFtZSddLCB7XG4gICAgZGVzdDogJ2RldmljZU5hbWUnLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGV4YW1wbGU6ICdpUGhvbmUgUmV0aW5hICg0LWluY2gpLCBBbmRyb2lkIEVtdWxhdG9yJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gTmFtZSBvZiB0aGUgbW9iaWxlIGRldmljZSB0byB1c2UnLFxuICB9XSxcblxuICBbWyctLWJyb3dzZXItbmFtZSddLCB7XG4gICAgZGVzdDogJ2Jyb3dzZXJOYW1lJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBleGFtcGxlOiAnU2FmYXJpJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gTmFtZSBvZiB0aGUgbW9iaWxlIGJyb3dzZXI6IFNhZmFyaSBvciBDaHJvbWUnLFxuICB9XSxcblxuICBbWyctLWFwcCddLCB7XG4gICAgZGVzdDogJ2FwcCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIElPUzogYWJzIHBhdGggdG8gc2ltdWxhdG9yLWNvbXBpbGVkIC5hcHAgZmlsZSBvciB0aGUgYnVuZGxlX2lkIG9mIHRoZSBkZXNpcmVkIHRhcmdldCBvbiBkZXZpY2U7IEFuZHJvaWQ6IGFicyBwYXRoIHRvIC5hcGsgZmlsZScsXG4gICAgZXhhbXBsZTogJy9hYnMvcGF0aC90by9teS5hcHAnLFxuICB9XSxcblxuICBbWyctbHQnLCAnLS1sYXVuY2gtdGltZW91dCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiA5MDAwMCxcbiAgICBkZXN0OiAnbGF1bmNoVGltZW91dCcsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKGlPUy1vbmx5KSBob3cgbG9uZyBpbiBtcyB0byB3YWl0IGZvciBJbnN0cnVtZW50cyB0byBsYXVuY2gnLFxuICB9XSxcblxuICBbWyctLWxhbmd1YWdlJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZGVzdDogJ2xhbmd1YWdlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ2VuJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIExhbmd1YWdlIGZvciB0aGUgaU9TIHNpbXVsYXRvciAvIEFuZHJvaWQgRW11bGF0b3InLFxuICB9XSxcblxuICBbWyctLWxvY2FsZSddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGRlc3Q6ICdsb2NhbGUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnZW5fVVMnLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gTG9jYWxlIGZvciB0aGUgaU9TIHNpbXVsYXRvciAvIEFuZHJvaWQgRW11bGF0b3InLFxuICB9XSxcblxuICBbWyctVScsICctLXVkaWQnXSwge1xuICAgIGRlc3Q6ICd1ZGlkJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGV4YW1wbGU6ICcxYWRzZi1zZGZhcy1hc2RmLTEyM3NkZicsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBVbmlxdWUgZGV2aWNlIGlkZW50aWZpZXIgb2YgdGhlIGNvbm5lY3RlZCBwaHlzaWNhbCBkZXZpY2UnLFxuICB9XSxcblxuICBbWyctLW9yaWVudGF0aW9uJ10sIHtcbiAgICBkZXN0OiAnb3JpZW50YXRpb24nLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ0xBTkRTQ0FQRScsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoSU9TLW9ubHkpIHVzZSBMQU5EU0NBUEUgb3IgUE9SVFJBSVQgdG8gaW5pdGlhbGl6ZSBhbGwgcmVxdWVzdHMgJyArXG4gICAgICAgICAgJ3RvIHRoaXMgb3JpZW50YXRpb24nLFxuICB9XSxcblxuICBbWyctLW5vLXJlc2V0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdub1Jlc2V0JyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIERvIG5vdCByZXNldCBhcHAgc3RhdGUgYmV0d2VlbiBzZXNzaW9ucyAoSU9TOiBkbyBub3QgZGVsZXRlIGFwcCAnICtcbiAgICAgICAgICAncGxpc3QgZmlsZXM7IEFuZHJvaWQ6IGRvIG5vdCB1bmluc3RhbGwgYXBwIGJlZm9yZSBuZXcgc2Vzc2lvbiknLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLWZ1bGwtcmVzZXQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ2Z1bGxSZXNldCcsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoaU9TKSBEZWxldGUgdGhlIGVudGlyZSBzaW11bGF0b3IgZm9sZGVyLiAoQW5kcm9pZCkgUmVzZXQgYXBwICcgK1xuICAgICAgICAgICdzdGF0ZSBieSB1bmluc3RhbGxpbmcgYXBwIGluc3RlYWQgb2YgY2xlYXJpbmcgYXBwIGRhdGEuIE9uICcgK1xuICAgICAgICAgICdBbmRyb2lkLCB0aGlzIHdpbGwgYWxzbyByZW1vdmUgdGhlIGFwcCBhZnRlciB0aGUgc2Vzc2lvbiBpcyBjb21wbGV0ZS4nLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLWFwcC1wa2cnXSwge1xuICAgIGRlc3Q6ICdhcHBQYWNrYWdlJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBleGFtcGxlOiAnY29tLmV4YW1wbGUuYW5kcm9pZC5teUFwcCcsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEphdmEgcGFja2FnZSBvZiB0aGUgQW5kcm9pZCBhcHAgeW91IHdhbnQgdG8gcnVuICcgK1xuICAgICAgICAgICcoZS5nLiwgY29tLmV4YW1wbGUuYW5kcm9pZC5teUFwcCknLFxuICB9XSxcblxuICBbWyctLWFwcC1hY3Rpdml0eSddLCB7XG4gICAgZGVzdDogJ2FwcEFjdGl2aXR5JyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdNYWluQWN0aXZpdHknLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgQWN0aXZpdHkgbmFtZSBmb3IgdGhlIEFuZHJvaWQgYWN0aXZpdHkgeW91IHdhbnQgJyArXG4gICAgICAgICAgJ3RvIGxhdW5jaCBmcm9tIHlvdXIgcGFja2FnZSAoZS5nLiwgTWFpbkFjdGl2aXR5KScsXG4gIH1dLFxuXG4gIFtbJy0tYXBwLXdhaXQtcGFja2FnZSddLCB7XG4gICAgZGVzdDogJ2FwcFdhaXRQYWNrYWdlJyxcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnY29tLmV4YW1wbGUuYW5kcm9pZC5teUFwcCcsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBQYWNrYWdlIG5hbWUgZm9yIHRoZSBBbmRyb2lkIGFjdGl2aXR5IHlvdSB3YW50ICcgK1xuICAgICAgICAgICd0byB3YWl0IGZvciAoZS5nLiwgY29tLmV4YW1wbGUuYW5kcm9pZC5teUFwcCknLFxuICB9XSxcblxuICBbWyctLWFwcC13YWl0LWFjdGl2aXR5J10sIHtcbiAgICBkZXN0OiAnYXBwV2FpdEFjdGl2aXR5JyxcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnU3BsYXNoQWN0aXZpdHknLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgQWN0aXZpdHkgbmFtZSBmb3IgdGhlIEFuZHJvaWQgYWN0aXZpdHkgeW91IHdhbnQgJyArXG4gICAgICAgICAgJ3RvIHdhaXQgZm9yIChlLmcuLCBTcGxhc2hBY3Rpdml0eSknLFxuICB9XSxcblxuICBbWyctLWRldmljZS1yZWFkeS10aW1lb3V0J10sIHtcbiAgICBkZXN0OiAnZGV2aWNlUmVhZHlUaW1lb3V0JyxcbiAgICBkZWZhdWx0VmFsdWU6IDUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIGV4YW1wbGU6ICc1JyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIFRpbWVvdXQgaW4gc2Vjb25kcyB3aGlsZSB3YWl0aW5nIGZvciBkZXZpY2UgdG8gYmVjb21lIHJlYWR5JyxcbiAgfV0sXG5cbiAgW1snLS1hbmRyb2lkLWNvdmVyYWdlJ10sIHtcbiAgICBkZXN0OiAnYW5kcm9pZENvdmVyYWdlJyxcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnY29tLm15LlBrZy9jb20ubXkuUGtnLmluc3RydW1lbnRhdGlvbi5NeUluc3RydW1lbnRhdGlvbicsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBGdWxseSBxdWFsaWZpZWQgaW5zdHJ1bWVudGF0aW9uIGNsYXNzLiBQYXNzZWQgdG8gLXcgaW4gJyArXG4gICAgICAgICAgJ2FkYiBzaGVsbCBhbSBpbnN0cnVtZW50IC1lIGNvdmVyYWdlIHRydWUgLXcgJyxcbiAgfV0sXG5cbiAgW1snLS1hdmQnXSwge1xuICAgIGRlc3Q6ICdhdmQnLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ0BkZWZhdWx0JyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIE5hbWUgb2YgdGhlIGF2ZCB0byBsYXVuY2gnLFxuICB9XSxcblxuICBbWyctLWF2ZC1hcmdzJ10sIHtcbiAgICBkZXN0OiAnYXZkQXJncycsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnLW5vLXNuYXBzaG90LWxvYWQnLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgQWRkaXRpb25hbCBlbXVsYXRvciBhcmd1bWVudHMgdG8gbGF1bmNoIHRoZSBhdmQnLFxuICB9XSxcblxuICBbWyctLXVzZS1rZXlzdG9yZSddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAndXNlS2V5c3RvcmUnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgV2hlbiBzZXQgdGhlIGtleXN0b3JlIHdpbGwgYmUgdXNlZCB0byBzaWduIGFwa3MuJyxcbiAgfV0sXG5cbiAgW1snLS1rZXlzdG9yZS1wYXRoJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IHBhdGgucmVzb2x2ZShwcm9jZXNzLmVudi5IT01FIHx8IHByb2Nlc3MuZW52LlVTRVJQUk9GSUxFIHx8ICcnLCAnLmFuZHJvaWQnLCAnZGVidWcua2V5c3RvcmUnKSxcbiAgICBkZXN0OiAna2V5c3RvcmVQYXRoJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBQYXRoIHRvIGtleXN0b3JlJyxcbiAgfV0sXG5cbiAgW1snLS1rZXlzdG9yZS1wYXNzd29yZCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiAnYW5kcm9pZCcsXG4gICAgZGVzdDogJ2tleXN0b3JlUGFzc3dvcmQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIFBhc3N3b3JkIHRvIGtleXN0b3JlJyxcbiAgfV0sXG5cbiAgW1snLS1rZXktYWxpYXMnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogJ2FuZHJvaWRkZWJ1Z2tleScsXG4gICAgZGVzdDogJ2tleUFsaWFzJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBLZXkgYWxpYXMnLFxuICB9XSxcblxuICBbWyctLWtleS1wYXNzd29yZCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiAnYW5kcm9pZCcsXG4gICAgZGVzdDogJ2tleVBhc3N3b3JkJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBLZXkgcGFzc3dvcmQnLFxuICB9XSxcblxuICBbWyctLWludGVudC1hY3Rpb24nXSwge1xuICAgIGRlc3Q6ICdpbnRlbnRBY3Rpb24nLFxuICAgIGRlZmF1bHRWYWx1ZTogJ2FuZHJvaWQuaW50ZW50LmFjdGlvbi5NQUlOJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ2FuZHJvaWQuaW50ZW50LmFjdGlvbi5NQUlOJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEludGVudCBhY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHN0YXJ0IGFjdGl2aXR5JyxcbiAgfV0sXG5cbiAgW1snLS1pbnRlbnQtY2F0ZWdvcnknXSwge1xuICAgIGRlc3Q6ICdpbnRlbnRDYXRlZ29yeScsXG4gICAgZGVmYXVsdFZhbHVlOiAnYW5kcm9pZC5pbnRlbnQuY2F0ZWdvcnkuTEFVTkNIRVInLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnYW5kcm9pZC5pbnRlbnQuY2F0ZWdvcnkuQVBQX0NPTlRBQ1RTJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEludGVudCBjYXRlZ29yeSB3aGljaCB3aWxsIGJlIHVzZWQgdG8gc3RhcnQgYWN0aXZpdHknLFxuICB9XSxcblxuICBbWyctLWludGVudC1mbGFncyddLCB7XG4gICAgZGVzdDogJ2ludGVudEZsYWdzJyxcbiAgICBkZWZhdWx0VmFsdWU6ICcweDEwMjAwMDAwJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJzB4MTAyMDAwMDAnLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgRmxhZ3MgdGhhdCB3aWxsIGJlIHVzZWQgdG8gc3RhcnQgYWN0aXZpdHknLFxuICB9XSxcblxuICBbWyctLWludGVudC1hcmdzJ10sIHtcbiAgICBkZXN0OiAnb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMnLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJzB4MTAyMDAwMDAnLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgQWRkaXRpb25hbCBpbnRlbnQgYXJndW1lbnRzIHRoYXQgd2lsbCBiZSB1c2VkIHRvICcgK1xuICAgICAgICAgICdzdGFydCBhY3Rpdml0eScsXG4gIH1dLFxuXG4gIFtbJy0tZG9udC1zdG9wLWFwcC1vbi1yZXNldCddLCB7XG4gICAgZGVzdDogJ2RvbnRTdG9wQXBwT25SZXNldCcsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIFdoZW4gaW5jbHVkZWQsIHJlZnJhaW5zIGZyb20gc3RvcHBpbmcgdGhlIGFwcCBiZWZvcmUgcmVzdGFydCcsXG4gIH1dLFxuXG4gIFtbJy0tY2FsZW5kYXItZm9ybWF0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZGVzdDogJ2NhbGVuZGFyRm9ybWF0JyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ2dyZWdvcmlhbicsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoSU9TLW9ubHkpIGNhbGVuZGFyIGZvcm1hdCBmb3IgdGhlIGlPUyBzaW11bGF0b3InLFxuICB9XSxcblxuICBbWyctLW5hdGl2ZS1pbnN0cnVtZW50cy1saWInXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ25hdGl2ZUluc3RydW1lbnRzTGliJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChJT1Mtb25seSkgSU9TIGhhcyBhIHdlaXJkIGJ1aWx0LWluIHVuYXZvaWRhYmxlICcgK1xuICAgICAgICAgICdkZWxheS4gV2UgcGF0Y2ggdGhpcyBpbiBhcHBpdW0uIElmIHlvdSBkbyBub3Qgd2FudCBpdCBwYXRjaGVkLCAnICtcbiAgICAgICAgICAncGFzcyBpbiB0aGlzIGZsYWcuJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS1rZWVwLWtleWNoYWlucyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAna2VlcEtleUNoYWlucycsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoaU9TLW9ubHkpIFdoZXRoZXIgdG8ga2VlcCBrZXljaGFpbnMgKExpYnJhcnkvS2V5Y2hhaW5zKSB3aGVuIHJlc2V0IGFwcCBiZXR3ZWVuIHNlc3Npb25zJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS1sb2NhbGl6YWJsZS1zdHJpbmdzLWRpciddLCB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlc3Q6ICdsb2NhbGl6YWJsZVN0cmluZ3NEaXInLFxuICAgIGRlZmF1bHRWYWx1ZTogJ2VuLmxwcm9qJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChJT1Mtb25seSkgdGhlIHJlbGF0aXZlIHBhdGggb2YgdGhlIGRpciB3aGVyZSBMb2NhbGl6YWJsZS5zdHJpbmdzIGZpbGUgcmVzaWRlcyAnLFxuICAgIGV4YW1wbGU6ICdlbi5scHJvaicsXG4gIH1dLFxuXG4gIFtbJy0tc2hvdy1pb3MtbG9nJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdzaG93SU9TTG9nJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChJT1Mtb25seSkgaWYgc2V0LCB0aGUgaU9TIHN5c3RlbSBsb2cgd2lsbCBiZSB3cml0dGVuIHRvIHRoZSBjb25zb2xlJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS10ZXN0d2FIZWFydGJlYXQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZVxuICAgICwgZGVzdDond2FIZWFydGJlYXQnXG4gICAgLCByZXF1aXJlZDogZmFsc2VcbiAgICAsIGV4YW1wbGU6IFwiMVwiXG4gICAgLCBoZWxwOiBcInJ1biB0ZXN0Y2FzZSdzIGlkXCJcbiAgfV0sXG4gICAgICBbWyctLXNjcmVlbnBhdGgnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbFxuICAgICwgZGVzdDonc2NyZWVuc2hvdFBhdGgnXG4gICAgLCByZXF1aXJlZDogZmFsc2VcbiAgICAsIGV4YW1wbGU6IFwiRTpcXFxcbGliXCJcbiAgICAsIGhlbHA6IFwidGhlIHNjcmVlbnNob3QgcGF0aFwiXG4gIH1dLFxuICBbWyctLWdlblRvb2wnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2VcbiAgICAsIGRlc3Q6J2dlblRvb2wnXG4gICAgLCBhY3Rpb246ICdzdG9yZVRydWUnXG4gICAgLCByZXF1aXJlZDogZmFsc2VcbiAgICAsIGV4YW1wbGU6IFwidHJ1ZS9mYWxzZVwiXG4gICAgLCBoZWxwOiBcImdlbiB0b29sID0gdHJ1ZVwiXG4gICAgLCBuYXJnczogMFxuICB9XSxcbiAgW1snLS10ZXN0Y2FzZWxvZ0lkJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IDIyMlxuICAgICwgZGVzdDondGVzdGNhc2Vsb2dJZCdcbiAgICAsIHJlcXVpcmVkOiBmYWxzZVxuICAgICwgZXhhbXBsZTogXCIxXCJcbiAgICAsIGhlbHA6IFwicnVuIHRlc3RjYXNlJ3MgaWRcIlxuICB9XSxcbiAgW1snLXRlc3R3YURldmljZUlkJywnLS10ZXN0d2FEZXZpY2VJZCddLCB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgLCBkZWZhdWx0VmFsdWU6IG51bGxcbiAgICAsIGV4YW1wbGU6IFwiaVBob25lIDVcIlxuICAgICwgaGVscDogJ1VuaXF1ZSB0ZXN0d2EgZGV2aWNlIGlkZW50aWZpZXIgb2YgdGhlIGNvbm5lY3RlZCBwaHlzaWNhbCBkZXZpY2UgZm9yIE1BQyx1c2UgdWRpZCBmb3Igd2luJ1xuICB9XSxcbiAgW1snLS1pbnN0YWxsYXBwJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IHRydWVcbiAgICAsIGRlc3Q6J2luc3RhbGxhcHAnXG4gICAgLCByZXF1aXJlZDogZmFsc2VcbiAgICAsIGhlbHA6IFwicmVpbnN0YWxsIGFwcFwiXG4gIH1dXG5dO1xuXG5mdW5jdGlvbiB1cGRhdGVQYXJzZUFyZ3NGb3JEZWZhdWx0Q2FwYWJpbGl0aWVzIChwYXJzZXIpIHtcbiAgLy8gaGVyZSB3ZSB3YW50IHRvIHVwZGF0ZSB0aGUgcGFyc2VyLnBhcnNlQXJncygpIGZ1bmN0aW9uXG4gIC8vIGluIG9yZGVyIHRvIGJyaW5nIHRvZ2V0aGVyIGFsbCB0aGUgYXJncyB0aGF0IGFyZSBhY3R1YWxseVxuICAvLyBkZWZhdWx0IGNhcHMuXG4gIC8vIG9uY2UgdGhvc2UgZGVwcmVjYXRlZCBhcmdzIGFyZSBhY3R1YWxseSByZW1vdmVkLCB0aGlzXG4gIC8vIGNhbiBhbHNvIGJlIHJlbW92ZWRcbiAgcGFyc2VyLl9wYXJzZUFyZ3MgPSBwYXJzZXIucGFyc2VBcmdzO1xuICBwYXJzZXIucGFyc2VBcmdzID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICBsZXQgcGFyc2VkQXJncyA9IHBhcnNlci5fcGFyc2VBcmdzKGFyZ3MpO1xuICAgIHBhcnNlZEFyZ3MuZGVmYXVsdENhcGFiaWxpdGllcyA9IHBhcnNlZEFyZ3MuZGVmYXVsdENhcGFiaWxpdGllcyB8fCB7fTtcbiAgICBmb3IgKGxldCBhcmdFbnRyeSBvZiBkZXByZWNhdGVkQXJncykge1xuICAgICAgbGV0IGFyZyA9IGFyZ0VudHJ5WzFdLmRlc3Q7XG4gICAgICBpZiAoYXJnRW50cnlbMV0uZGVwcmVjYXRlZEZvciA9PT0gJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnKSB7XG4gICAgICAgIGlmIChhcmcgaW4gcGFyc2VkQXJncyAmJiBwYXJzZWRBcmdzW2FyZ10gIT09IGFyZ0VudHJ5WzFdLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgIHBhcnNlZEFyZ3MuZGVmYXVsdENhcGFiaWxpdGllc1thcmddID0gcGFyc2VkQXJnc1thcmddO1xuICAgICAgICAgIC8vIGogcyBoIGkgbiB0IGNhbid0IGhhbmRsZSBjb21wbGV4IGludGVycG9sYXRlZCBzdHJpbmdzXG4gICAgICAgICAgbGV0IGNhcERpY3QgPSB7W2FyZ106IHBhcnNlZEFyZ3NbYXJnXX07XG4gICAgICAgICAgYXJnRW50cnlbMV0uZGVwcmVjYXRlZEZvciA9IGAtLWRlZmF1bHQtY2FwYWJpbGl0aWVzIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJyR7SlNPTi5zdHJpbmdpZnkoY2FwRGljdCl9J2A7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZEFyZ3M7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGVmYXVsdENhcHMgKGNhcHMpIHtcbiAgdHJ5IHtcbiAgICAvLyB1c2Ugc3luY2hyb25vdXMgZmlsZSBhY2Nlc3MsIGFzIGBhcmdwYXJzZWAgcHJvdmlkZXMgbm8gd2F5IG9mIGVpdGhlclxuICAgIC8vIGF3YWl0aW5nIG9yIHVzaW5nIGNhbGxiYWNrcy4gVGhpcyBzdGVwIGhhcHBlbnMgaW4gc3RhcnR1cCwgaW4gd2hhdCBpc1xuICAgIC8vIGVmZmVjdGl2ZWx5IGNvbW1hbmQtbGluZSBjb2RlLCBzbyBub3RoaW5nIGlzIGJsb2NrZWQgaW4gdGVybXMgb2ZcbiAgICAvLyBzZXNzaW9ucywgc28gaG9sZGluZyB1cCB0aGUgZXZlbnQgbG9vcCBkb2VzIG5vdCBpbmN1ciB0aGUgdXN1YWxcbiAgICAvLyBkcmF3YmFja3MuXG4gICAgaWYgKGZzLnN0YXRTeW5jKGNhcHMpLmlzRmlsZSgpKSB7XG4gICAgICBjYXBzID0gZnMucmVhZEZpbGVTeW5jKGNhcHMsICd1dGY4Jyk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBub3QgYSBmaWxlLCBvciBub3QgcmVhZGFibGVcbiAgfVxuICBjYXBzID0gSlNPTi5wYXJzZShjYXBzKTtcbiAgaWYgKCFfLmlzUGxhaW5PYmplY3QoY2FwcykpIHtcbiAgICB0aHJvdyAnSW52YWxpZCBmb3JtYXQgZm9yIGRlZmF1bHQgY2FwYWJpbGl0aWVzJztcbiAgfVxuICByZXR1cm4gY2Fwcztcbn1cblxuZnVuY3Rpb24gZ2V0UGFyc2VyICgpIHtcbiAgbGV0IHBhcnNlciA9IG5ldyBBcmd1bWVudFBhcnNlcih7XG4gICAgdmVyc2lvbjogcGtnT2JqLnZlcnNpb24sXG4gICAgYWRkSGVscDogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogJ0Egd2ViZHJpdmVyLWNvbXBhdGlibGUgc2VydmVyIGZvciB1c2Ugd2l0aCBuYXRpdmUgYW5kIGh5YnJpZCBpT1MgYW5kIEFuZHJvaWQgYXBwbGljYXRpb25zLidcbiAgfSk7XG4gIGxldCBhbGxBcmdzID0gXy51bmlvbihhcmdzLCBkZXByZWNhdGVkQXJncyk7XG4gIHBhcnNlci5yYXdBcmdzID0gYWxsQXJncztcbiAgZm9yIChsZXQgYXJnIG9mIGFsbEFyZ3MpIHtcbiAgICBwYXJzZXIuYWRkQXJndW1lbnQoYXJnWzBdLCBhcmdbMV0pO1xuICB9XG4gIHVwZGF0ZVBhcnNlQXJnc0ZvckRlZmF1bHRDYXBhYmlsaXRpZXMocGFyc2VyKTtcblxuICByZXR1cm4gcGFyc2VyO1xufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QXJncyAoKSB7XG4gIGxldCBkZWZhdWx0cyA9IHt9O1xuICBmb3IgKGxldCBbLGFyZ10gb2YgYXJncykge1xuICAgIGRlZmF1bHRzW2FyZy5kZXN0XSA9IGFyZy5kZWZhdWx0VmFsdWU7XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRQYXJzZXI7XG5leHBvcnQgeyBnZXREZWZhdWx0QXJncywgZ2V0UGFyc2VyIH07XG4iXX0=