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
}], [['--portal'], {
  defaultValue: false,
  dest: 'portal',
  action: 'storeTrue',
  required: false,
  example: "true/false",
  help: "portal = true",
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
//# sourceMappingURL=data:application/json;base64,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Ozs7Ozs7QUFDRCx1Q0FBcUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFOUMsU0FBTyxNQUFNLENBQUM7Q0FDZjs7QUFFRCxTQUFTLGNBQWMsR0FBSTtBQUN6QixNQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Ozs7OztBQUNsQix1Q0FBbUIsSUFBSSxpSEFBRTs7O1VBQWQsR0FBRzs7QUFDWixjQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7S0FDdkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxTQUFPLFFBQVEsQ0FBQztDQUNqQjs7cUJBRWMsU0FBUztRQUNmLGNBQWMsR0FBZCxjQUFjO1FBQUUsU0FBUyxHQUFULFNBQVMiLCJmaWxlIjoibGliXFxwYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQXJndW1lbnRQYXJzZXIgfSBmcm9tICdhcmdwYXJzZSc7XG5pbXBvcnQgcGtnT2JqIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5cblxuY29uc3QgYXJncyA9IFtcbiAgW1snLS1zaGVsbCddLCB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBoZWxwOiAnRW50ZXIgUkVQTCBtb2RlJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS1pcGEnXSwge1xuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgaGVscDogJyhJT1Mtb25seSkgYWJzIHBhdGggdG8gY29tcGlsZWQgLmlwYSBmaWxlJyxcbiAgICBleGFtcGxlOiAnL2Ficy9wYXRoL3RvL215LmlwYScsXG4gIH1dLFxuXG4gIFtbJy1hJywgJy0tYWRkcmVzcyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiAnMC4wLjAuMCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICcwLjAuMC4wJyxcbiAgICBoZWxwOiAnSVAgQWRkcmVzcyB0byBsaXN0ZW4gb24nLFxuICB9XSxcblxuICBbWyctcCcsICctLXBvcnQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogNDcyMyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgZXhhbXBsZTogJzQ3MjMnLFxuICAgIGhlbHA6ICdwb3J0IHRvIGxpc3RlbiBvbicsXG4gIH1dLFxuXG4gIFtbJy1jYScsICctLWNhbGxiYWNrLWFkZHJlc3MnXSwge1xuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXN0OiAnY2FsbGJhY2tBZGRyZXNzJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZXhhbXBsZTogJzEyNy4wLjAuMScsXG4gICAgaGVscDogJ2NhbGxiYWNrIElQIEFkZHJlc3MgKGRlZmF1bHQ6IHNhbWUgYXMgLS1hZGRyZXNzKScsXG4gIH1dLFxuXG4gIFtbJy1jcCcsICctLWNhbGxiYWNrLXBvcnQnXSwge1xuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXN0OiAnY2FsbGJhY2tQb3J0JyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgZXhhbXBsZTogJzQ3MjMnLFxuICAgIGhlbHA6ICdjYWxsYmFjayBwb3J0IChkZWZhdWx0OiBzYW1lIGFzIHBvcnQpJyxcbiAgfV0sXG5cbiAgW1snLWJwJywgJy0tYm9vdHN0cmFwLXBvcnQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogNDcyNCxcbiAgICBkZXN0OiAnYm9vdHN0cmFwUG9ydCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIGV4YW1wbGU6ICc0NzI0JyxcbiAgICBoZWxwOiAnKEFuZHJvaWQtb25seSkgcG9ydCB0byB1c2Ugb24gZGV2aWNlIHRvIHRhbGsgdG8gQXBwaXVtJyxcbiAgfV0sXG5cbiAgW1snLXInLCAnLS1iYWNrZW5kLXJldHJpZXMnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogMyxcbiAgICBkZXN0OiAnYmFja2VuZFJldHJpZXMnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiAnaW50JyxcbiAgICBleGFtcGxlOiAnMycsXG4gICAgaGVscDogJyhpT1Mtb25seSkgSG93IG1hbnkgdGltZXMgdG8gcmV0cnkgbGF1bmNoaW5nIEluc3RydW1lbnRzICcgK1xuICAgICAgICAgICdiZWZvcmUgc2F5aW5nIGl0IGNyYXNoZWQgb3IgdGltZWQgb3V0JyxcbiAgfV0sXG5cbiAgW1snLS1zZXNzaW9uLW92ZXJyaWRlJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdzZXNzaW9uT3ZlcnJpZGUnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdFbmFibGVzIHNlc3Npb24gb3ZlcnJpZGUgKGNsb2JiZXJpbmcpJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLWwnLCAnLS1wcmUtbGF1bmNoJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdsYXVuY2gnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdQcmUtbGF1bmNoIHRoZSBhcHBsaWNhdGlvbiBiZWZvcmUgYWxsb3dpbmcgdGhlIGZpcnN0IHNlc3Npb24gJyArXG4gICAgICAgICAgJyhSZXF1aXJlcyAtLWFwcCBhbmQsIGZvciBBbmRyb2lkLCAtLWFwcC1wa2cgYW5kIC0tYXBwLWFjdGl2aXR5KScsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy1nJywgJy0tbG9nJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZGVzdDogJ2xvZycsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICcvcGF0aC90by9hcHBpdW0ubG9nJyxcbiAgICBoZWxwOiAnQWxzbyBzZW5kIGxvZyBvdXRwdXQgdG8gdGhpcyBmaWxlJyxcbiAgfV0sXG5cbiAgW1snLS1sb2ctbGV2ZWwnXSwge1xuICAgIGNob2ljZXM6IFsnaW5mbycsICdpbmZvOmRlYnVnJywgJ2luZm86aW5mbycsICdpbmZvOndhcm4nLCAnaW5mbzplcnJvcicsXG4gICAgICAgICAgICAgICd3YXJuJywgJ3dhcm46ZGVidWcnLCAnd2FybjppbmZvJywgJ3dhcm46d2FybicsICd3YXJuOmVycm9yJyxcbiAgICAgICAgICAgICAgJ2Vycm9yJywgJ2Vycm9yOmRlYnVnJywgJ2Vycm9yOmluZm8nLCAnZXJyb3I6d2FybicsICdlcnJvcjplcnJvcicsXG4gICAgICAgICAgICAgICdkZWJ1ZycsICdkZWJ1ZzpkZWJ1ZycsICdkZWJ1ZzppbmZvJywgJ2RlYnVnOndhcm4nLCAnZGVidWc6ZXJyb3InXSxcbiAgICBkZWZhdWx0VmFsdWU6ICdkZWJ1ZycsXG4gICAgZGVzdDogJ2xvZ2xldmVsJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ2RlYnVnJyxcbiAgICBoZWxwOiAnbG9nIGxldmVsOyBkZWZhdWx0IChjb25zb2xlWzpmaWxlXSk6IGRlYnVnWzpkZWJ1Z10nLFxuICB9XSxcblxuICBbWyctLWxvZy10aW1lc3RhbXAnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdTaG93IHRpbWVzdGFtcHMgaW4gY29uc29sZSBvdXRwdXQnLFxuICAgIG5hcmdzOiAwLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgZGVzdDogJ2xvZ1RpbWVzdGFtcCcsXG4gIH1dLFxuXG4gIFtbJy0tbG9jYWwtdGltZXpvbmUnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdVc2UgbG9jYWwgdGltZXpvbmUgZm9yIHRpbWVzdGFtcHMnLFxuICAgIG5hcmdzOiAwLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgZGVzdDogJ2xvY2FsVGltZXpvbmUnLFxuICB9XSxcblxuICBbWyctLWxvZy1uby1jb2xvcnMnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdEbyBub3QgdXNlIGNvbG9ycyBpbiBjb25zb2xlIG91dHB1dCcsXG4gICAgbmFyZ3M6IDAsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICBkZXN0OiAnbG9nTm9Db2xvcnMnLFxuICB9XSxcblxuICBbWyctRycsICctLXdlYmhvb2snXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ2xvY2FsaG9zdDo5ODc2JyxcbiAgICBoZWxwOiAnQWxzbyBzZW5kIGxvZyBvdXRwdXQgdG8gdGhpcyBIVFRQIGxpc3RlbmVyJyxcbiAgfV0sXG5cbiAgW1snLS1zYWZhcmknXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJyhJT1MtT25seSkgVXNlIHRoZSBzYWZhcmkgYXBwJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS1kZWZhdWx0LWRldmljZScsICctZGQnXSwge1xuICAgIGRlc3Q6ICdkZWZhdWx0RGV2aWNlJyxcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICcoSU9TLVNpbXVsYXRvci1vbmx5KSB1c2UgdGhlIGRlZmF1bHQgc2ltdWxhdG9yIHRoYXQgaW5zdHJ1bWVudHMgJyArXG4gICAgICAgICAgJ2xhdW5jaGVzIG9uIGl0cyBvd24nLFxuICB9XSxcblxuICBbWyctLWZvcmNlLWlwaG9uZSddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnZm9yY2VJcGhvbmUnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICcoSU9TLW9ubHkpIFVzZSB0aGUgaVBob25lIFNpbXVsYXRvciBubyBtYXR0ZXIgd2hhdCB0aGUgYXBwIHdhbnRzJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS1mb3JjZS1pcGFkJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdmb3JjZUlwYWQnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICcoSU9TLW9ubHkpIFVzZSB0aGUgaVBhZCBTaW11bGF0b3Igbm8gbWF0dGVyIHdoYXQgdGhlIGFwcCB3YW50cycsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0tdHJhY2V0ZW1wbGF0ZSddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGRlc3Q6ICdhdXRvbWF0aW9uVHJhY2VUZW1wbGF0ZVBhdGgnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnL1VzZXJzL21lL0F1dG9tYXRpb24udHJhY2V0ZW1wbGF0ZScsXG4gICAgaGVscDogJyhJT1Mtb25seSkgLnRyYWNldGVtcGxhdGUgZmlsZSB0byB1c2Ugd2l0aCBJbnN0cnVtZW50cycsXG4gIH1dLFxuXG4gIFtbJy0taW5zdHJ1bWVudHMnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBkZXN0OiAnaW5zdHJ1bWVudHNQYXRoJyxcbiAgICByZXF1aXJlOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnL3BhdGgvdG8vaW5zdHJ1bWVudHMnLFxuICAgIGhlbHA6ICcoSU9TLW9ubHkpIHBhdGggdG8gaW5zdHJ1bWVudHMgYmluYXJ5JyxcbiAgfV0sXG5cbiAgW1snLS1ub2RlY29uZmlnJ10sIHtcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGhlbHA6ICdDb25maWd1cmF0aW9uIEpTT04gZmlsZSB0byByZWdpc3RlciBhcHBpdW0gd2l0aCBzZWxlbml1bSBncmlkJyxcbiAgICBleGFtcGxlOiAnL2Ficy9wYXRoL3RvL25vZGVjb25maWcuanNvbicsXG4gIH1dLFxuXG4gIFtbJy1yYScsICctLXJvYm90LWFkZHJlc3MnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogJzAuMC4wLjAnLFxuICAgIGRlc3Q6ICdyb2JvdEFkZHJlc3MnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnMC4wLjAuMCcsXG4gICAgaGVscDogJ0lQIEFkZHJlc3Mgb2Ygcm9ib3QnLFxuICB9XSxcblxuICBbWyctcnAnLCAnLS1yb2JvdC1wb3J0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IC0xLFxuICAgIGRlc3Q6ICdyb2JvdFBvcnQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiAnaW50JyxcbiAgICBleGFtcGxlOiAnNDI0MicsXG4gICAgaGVscDogJ3BvcnQgZm9yIHJvYm90JyxcbiAgfV0sXG5cbiAgW1snLS1zZWxlbmRyb2lkLXBvcnQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogODA4MCxcbiAgICBkZXN0OiAnc2VsZW5kcm9pZFBvcnQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiAnaW50JyxcbiAgICBleGFtcGxlOiAnODA4MCcsXG4gICAgaGVscDogJ0xvY2FsIHBvcnQgdXNlZCBmb3IgY29tbXVuaWNhdGlvbiB3aXRoIFNlbGVuZHJvaWQnLFxuICB9XSxcblxuICBbWyctLWNocm9tZWRyaXZlci1wb3J0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IDk1MTUsXG4gICAgZGVzdDogJ2Nocm9tZURyaXZlclBvcnQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiAnaW50JyxcbiAgICBleGFtcGxlOiAnOTUxNScsXG4gICAgaGVscDogJ1BvcnQgdXBvbiB3aGljaCBDaHJvbWVEcml2ZXIgd2lsbCBydW4nLFxuICB9XSxcblxuICBbWyctLWNocm9tZWRyaXZlci1leGVjdXRhYmxlJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZGVzdDogJ2Nocm9tZWRyaXZlckV4ZWN1dGFibGUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnQ2hyb21lRHJpdmVyIGV4ZWN1dGFibGUgZnVsbCBwYXRoJyxcbiAgfV0sXG5cbiAgW1snLS1zaG93LWNvbmZpZyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnc2hvd0NvbmZpZycsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ1Nob3cgaW5mbyBhYm91dCB0aGUgYXBwaXVtIHNlcnZlciBjb25maWd1cmF0aW9uIGFuZCBleGl0JyxcbiAgfV0sXG5cbiAgW1snLS1uby1wZXJtcy1jaGVjayddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnbm9QZXJtc0NoZWNrJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnQnlwYXNzIEFwcGl1bVxcJ3MgY2hlY2tzIHRvIGVuc3VyZSB3ZSBjYW4gcmVhZC93cml0ZSBuZWNlc3NhcnkgZmlsZXMnLFxuICB9XSxcblxuICBbWyctLXN0cmljdC1jYXBzJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdlbmZvcmNlU3RyaWN0Q2FwcycsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ0NhdXNlIHNlc3Npb25zIHRvIGZhaWwgaWYgZGVzaXJlZCBjYXBzIGFyZSBzZW50IGluIHRoYXQgQXBwaXVtICcgK1xuICAgICAgICAgICdkb2VzIG5vdCByZWNvZ25pemUgYXMgdmFsaWQgZm9yIHRoZSBzZWxlY3RlZCBkZXZpY2UnLFxuICAgIG5hcmdzOiAwLFxuICB9XSxcblxuICBbWyctLWlzb2xhdGUtc2ltLWRldmljZSddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnaXNvbGF0ZVNpbURldmljZScsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ1hjb2RlIDYgaGFzIGEgYnVnIG9uIHNvbWUgcGxhdGZvcm1zIHdoZXJlIGEgY2VydGFpbiBzaW11bGF0b3IgJyArXG4gICAgICAgICAgJ2NhbiBvbmx5IGJlIGxhdW5jaGVkIHdpdGhvdXQgZXJyb3IgaWYgYWxsIG90aGVyIHNpbXVsYXRvciBkZXZpY2VzICcgK1xuICAgICAgICAgICdhcmUgZmlyc3QgZGVsZXRlZC4gVGhpcyBvcHRpb24gY2F1c2VzIEFwcGl1bSB0byBkZWxldGUgYWxsICcgK1xuICAgICAgICAgICdkZXZpY2VzIG90aGVyIHRoYW4gdGhlIG9uZSBiZWluZyB1c2VkIGJ5IEFwcGl1bS4gTm90ZSB0aGF0IHRoaXMgJyArXG4gICAgICAgICAgJ2lzIGEgcGVybWFuZW50IGRlbGV0aW9uLCBhbmQgeW91IGFyZSByZXNwb25zaWJsZSBmb3IgdXNpbmcgc2ltY3RsICcgK1xuICAgICAgICAgICdvciB4Y29kZSB0byBtYW5hZ2UgdGhlIGNhdGVnb3JpZXMgb2YgZGV2aWNlcyB1c2VkIHdpdGggQXBwaXVtLicsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0tdG1wJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZGVzdDogJ3RtcERpcicsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGhlbHA6ICdBYnNvbHV0ZSBwYXRoIHRvIGRpcmVjdG9yeSBBcHBpdW0gY2FuIHVzZSB0byBtYW5hZ2UgdGVtcG9yYXJ5ICcgK1xuICAgICAgICAgICdmaWxlcywgbGlrZSBidWlsdC1pbiBpT1MgYXBwcyBpdCBuZWVkcyB0byBtb3ZlIGFyb3VuZC4gT24gKm5peC9NYWMgJyArXG4gICAgICAgICAgJ2RlZmF1bHRzIHRvIC90bXAsIG9uIFdpbmRvd3MgZGVmYXVsdHMgdG8gQzpcXFxcV2luZG93c1xcXFxUZW1wJyxcbiAgfV0sXG5cbiAgW1snLS10cmFjZS1kaXInXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBkZXN0OiAndHJhY2VEaXInLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnQWJzb2x1dGUgcGF0aCB0byBkaXJlY3RvcnkgQXBwaXVtIHVzZSB0byBzYXZlIGlvcyBpbnN0cnVtZW50cyAnICtcbiAgICAgICAgICAndHJhY2VzLCBkZWZhdWx0cyB0byA8dG1wIGRpcj4vYXBwaXVtLWluc3RydW1lbnRzJyxcbiAgfV0sXG5cbiAgW1snLS1kZWJ1Zy1sb2ctc3BhY2luZyddLCB7XG4gICAgZGVzdDogJ2RlYnVnTG9nU3BhY2luZycsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnQWRkIGV4YWdnZXJhdGVkIHNwYWNpbmcgaW4gbG9ncyB0byBoZWxwIHdpdGggdmlzdWFsIGluc3BlY3Rpb24nLFxuICB9XSxcblxuICBbWyctLXN1cHByZXNzLWFkYi1raWxsLXNlcnZlciddLCB7XG4gICAgZGVzdDogJ3N1cHByZXNzQWRiS2lsbFNlcnZlcicsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnKEFuZHJvaWQtb25seSkgSWYgc2V0LCBwcmV2ZW50cyBBcHBpdW0gZnJvbSBraWxsaW5nIHRoZSBhZGIgc2VydmVyIGluc3RhbmNlJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS1hc3luYy10cmFjZSddLCB7XG4gICAgZGVzdDogJ2FzeW5jVHJhY2UnLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgaGVscDogJ0FkZCBsb25nIHN0YWNrIHRyYWNlcyB0byBsb2cgZW50cmllcy4gUmVjb21tZW5kZWQgZm9yIGRlYnVnZ2luZyBvbmx5LicsXG4gIH1dLFxuXG4gIFtbJy0td2Via2l0LWRlYnVnLXByb3h5LXBvcnQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogMjc3NTMsXG4gICAgZGVzdDogJ3dlYmtpdERlYnVnUHJveHlQb3J0JyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHlwZTogJ2ludCcsXG4gICAgZXhhbXBsZTogXCIyNzc1M1wiLFxuICAgIGhlbHA6ICcoSU9TLW9ubHkpIExvY2FsIHBvcnQgdXNlZCBmb3IgY29tbXVuaWNhdGlvbiB3aXRoIGlvcy13ZWJraXQtZGVidWctcHJveHknXG4gIH1dLFxuXG4gIFtbJy1kYycsICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJ10sIHtcbiAgICBkZXN0OiAnZGVmYXVsdENhcGFiaWxpdGllcycsXG4gICAgZGVmYXVsdFZhbHVlOiB7fSxcbiAgICB0eXBlOiBwYXJzZURlZmF1bHRDYXBzLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnWyBcXCd7XCJhcHBcIjogXCJteWFwcC5hcHBcIiwgXCJkZXZpY2VOYW1lXCI6IFwiaVBob25lIFNpbXVsYXRvclwifVxcJyAnICtcbiAgICAgICAgICAgICAnfCAvcGF0aC90by9jYXBzLmpzb24gXScsXG4gICAgaGVscDogJ1NldCB0aGUgZGVmYXVsdCBkZXNpcmVkIGNhcGFiaWxpdGllcywgd2hpY2ggd2lsbCBiZSBzZXQgb24gZWFjaCAnICtcbiAgICAgICAgICAnc2Vzc2lvbiB1bmxlc3Mgb3ZlcnJpZGRlbiBieSByZWNlaXZlZCBjYXBhYmlsaXRpZXMuJ1xuICB9XSxcbl07XG5cbmNvbnN0IGRlcHJlY2F0ZWRBcmdzID0gW1xuICBbWyctLWNvbW1hbmQtdGltZW91dCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiA2MCxcbiAgICBkZXN0OiAnZGVmYXVsdENvbW1hbmRUaW1lb3V0JyxcbiAgICB0eXBlOiAnaW50JyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSBObyBlZmZlY3QuIFRoaXMgdXNlZCB0byBiZSB0aGUgZGVmYXVsdCBjb21tYW5kICcgK1xuICAgICAgICAgICd0aW1lb3V0IGZvciB0aGUgc2VydmVyIHRvIHVzZSBmb3IgYWxsIHNlc3Npb25zIChpbiBzZWNvbmRzIGFuZCAnICtcbiAgICAgICAgICAnc2hvdWxkIGJlIGxlc3MgdGhhbiAyMTQ3NDgzKS4gVXNlIG5ld0NvbW1hbmRUaW1lb3V0IGNhcCBpbnN0ZWFkJ1xuICB9XSxcblxuICBbWyctaycsICctLWtlZXAtYXJ0aWZhY3RzJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdrZWVwQXJ0aWZhY3RzJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gbm8gZWZmZWN0LCB0cmFjZSBpcyBub3cgaW4gdG1wIGRpciBieSBkZWZhdWx0IGFuZCBpcyAnICtcbiAgICAgICAgICAnY2xlYXJlZCBiZWZvcmUgZWFjaCBydW4uIFBsZWFzZSBhbHNvIHJlZmVyIHRvIHRoZSAtLXRyYWNlLWRpciBmbGFnLicsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0tcGxhdGZvcm0tbmFtZSddLCB7XG4gICAgZGVzdDogJ3BsYXRmb3JtTmFtZScsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgZXhhbXBsZTogJ2lPUycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIE5hbWUgb2YgdGhlIG1vYmlsZSBwbGF0Zm9ybTogaU9TLCBBbmRyb2lkLCBvciBGaXJlZm94T1MnLFxuICB9XSxcblxuICBbWyctLXBsYXRmb3JtLXZlcnNpb24nXSwge1xuICAgIGRlc3Q6ICdwbGF0Zm9ybVZlcnNpb24nLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGV4YW1wbGU6ICc3LjEnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBWZXJzaW9uIG9mIHRoZSBtb2JpbGUgcGxhdGZvcm0nLFxuICB9XSxcblxuICBbWyctLWF1dG9tYXRpb24tbmFtZSddLCB7XG4gICAgZGVzdDogJ2F1dG9tYXRpb25OYW1lJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBleGFtcGxlOiAnQXBwaXVtJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gTmFtZSBvZiB0aGUgYXV0b21hdGlvbiB0b29sOiBBcHBpdW0gb3IgU2VsZW5kcm9pZCcsXG4gIH1dLFxuXG4gIFtbJy0tZGV2aWNlLW5hbWUnXSwge1xuICAgIGRlc3Q6ICdkZXZpY2VOYW1lJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBleGFtcGxlOiAnaVBob25lIFJldGluYSAoNC1pbmNoKSwgQW5kcm9pZCBFbXVsYXRvcicsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIE5hbWUgb2YgdGhlIG1vYmlsZSBkZXZpY2UgdG8gdXNlJyxcbiAgfV0sXG5cbiAgW1snLS1icm93c2VyLW5hbWUnXSwge1xuICAgIGRlc3Q6ICdicm93c2VyTmFtZScsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgZXhhbXBsZTogJ1NhZmFyaScsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIE5hbWUgb2YgdGhlIG1vYmlsZSBicm93c2VyOiBTYWZhcmkgb3IgQ2hyb21lJyxcbiAgfV0sXG5cbiAgW1snLS1hcHAnXSwge1xuICAgIGRlc3Q6ICdhcHAnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBJT1M6IGFicyBwYXRoIHRvIHNpbXVsYXRvci1jb21waWxlZCAuYXBwIGZpbGUgb3IgdGhlIGJ1bmRsZV9pZCBvZiB0aGUgZGVzaXJlZCB0YXJnZXQgb24gZGV2aWNlOyBBbmRyb2lkOiBhYnMgcGF0aCB0byAuYXBrIGZpbGUnLFxuICAgIGV4YW1wbGU6ICcvYWJzL3BhdGgvdG8vbXkuYXBwJyxcbiAgfV0sXG5cbiAgW1snLWx0JywgJy0tbGF1bmNoLXRpbWVvdXQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogOTAwMDAsXG4gICAgZGVzdDogJ2xhdW5jaFRpbWVvdXQnLFxuICAgIHR5cGU6ICdpbnQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChpT1Mtb25seSkgaG93IGxvbmcgaW4gbXMgdG8gd2FpdCBmb3IgSW5zdHJ1bWVudHMgdG8gbGF1bmNoJyxcbiAgfV0sXG5cbiAgW1snLS1sYW5ndWFnZSddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGRlc3Q6ICdsYW5ndWFnZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdlbicsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBMYW5ndWFnZSBmb3IgdGhlIGlPUyBzaW11bGF0b3IgLyBBbmRyb2lkIEVtdWxhdG9yJyxcbiAgfV0sXG5cbiAgW1snLS1sb2NhbGUnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBkZXN0OiAnbG9jYWxlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ2VuX1VTJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIExvY2FsZSBmb3IgdGhlIGlPUyBzaW11bGF0b3IgLyBBbmRyb2lkIEVtdWxhdG9yJyxcbiAgfV0sXG5cbiAgW1snLVUnLCAnLS11ZGlkJ10sIHtcbiAgICBkZXN0OiAndWRpZCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICBleGFtcGxlOiAnMWFkc2Ytc2RmYXMtYXNkZi0xMjNzZGYnLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gVW5pcXVlIGRldmljZSBpZGVudGlmaWVyIG9mIHRoZSBjb25uZWN0ZWQgcGh5c2ljYWwgZGV2aWNlJyxcbiAgfV0sXG5cbiAgW1snLS1vcmllbnRhdGlvbiddLCB7XG4gICAgZGVzdDogJ29yaWVudGF0aW9uJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdMQU5EU0NBUEUnLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKElPUy1vbmx5KSB1c2UgTEFORFNDQVBFIG9yIFBPUlRSQUlUIHRvIGluaXRpYWxpemUgYWxsIHJlcXVlc3RzICcgK1xuICAgICAgICAgICd0byB0aGlzIG9yaWVudGF0aW9uJyxcbiAgfV0sXG5cbiAgW1snLS1uby1yZXNldCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnbm9SZXNldCcsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSBEbyBub3QgcmVzZXQgYXBwIHN0YXRlIGJldHdlZW4gc2Vzc2lvbnMgKElPUzogZG8gbm90IGRlbGV0ZSBhcHAgJyArXG4gICAgICAgICAgJ3BsaXN0IGZpbGVzOyBBbmRyb2lkOiBkbyBub3QgdW5pbnN0YWxsIGFwcCBiZWZvcmUgbmV3IHNlc3Npb24pJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS1mdWxsLXJlc2V0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICdmdWxsUmVzZXQnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKGlPUykgRGVsZXRlIHRoZSBlbnRpcmUgc2ltdWxhdG9yIGZvbGRlci4gKEFuZHJvaWQpIFJlc2V0IGFwcCAnICtcbiAgICAgICAgICAnc3RhdGUgYnkgdW5pbnN0YWxsaW5nIGFwcCBpbnN0ZWFkIG9mIGNsZWFyaW5nIGFwcCBkYXRhLiBPbiAnICtcbiAgICAgICAgICAnQW5kcm9pZCwgdGhpcyB3aWxsIGFsc28gcmVtb3ZlIHRoZSBhcHAgYWZ0ZXIgdGhlIHNlc3Npb24gaXMgY29tcGxldGUuJyxcbiAgICBuYXJnczogMCxcbiAgfV0sXG5cbiAgW1snLS1hcHAtcGtnJ10sIHtcbiAgICBkZXN0OiAnYXBwUGFja2FnZScsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgZXhhbXBsZTogJ2NvbS5leGFtcGxlLmFuZHJvaWQubXlBcHAnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBKYXZhIHBhY2thZ2Ugb2YgdGhlIEFuZHJvaWQgYXBwIHlvdSB3YW50IHRvIHJ1biAnICtcbiAgICAgICAgICAnKGUuZy4sIGNvbS5leGFtcGxlLmFuZHJvaWQubXlBcHApJyxcbiAgfV0sXG5cbiAgW1snLS1hcHAtYWN0aXZpdHknXSwge1xuICAgIGRlc3Q6ICdhcHBBY3Rpdml0eScsXG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBleGFtcGxlOiAnTWFpbkFjdGl2aXR5JyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEFjdGl2aXR5IG5hbWUgZm9yIHRoZSBBbmRyb2lkIGFjdGl2aXR5IHlvdSB3YW50ICcgK1xuICAgICAgICAgICd0byBsYXVuY2ggZnJvbSB5b3VyIHBhY2thZ2UgKGUuZy4sIE1haW5BY3Rpdml0eSknLFxuICB9XSxcblxuICBbWyctLWFwcC13YWl0LXBhY2thZ2UnXSwge1xuICAgIGRlc3Q6ICdhcHBXYWl0UGFja2FnZScsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ2NvbS5leGFtcGxlLmFuZHJvaWQubXlBcHAnLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgUGFja2FnZSBuYW1lIGZvciB0aGUgQW5kcm9pZCBhY3Rpdml0eSB5b3Ugd2FudCAnICtcbiAgICAgICAgICAndG8gd2FpdCBmb3IgKGUuZy4sIGNvbS5leGFtcGxlLmFuZHJvaWQubXlBcHApJyxcbiAgfV0sXG5cbiAgW1snLS1hcHAtd2FpdC1hY3Rpdml0eSddLCB7XG4gICAgZGVzdDogJ2FwcFdhaXRBY3Rpdml0eScsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ1NwbGFzaEFjdGl2aXR5JyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEFjdGl2aXR5IG5hbWUgZm9yIHRoZSBBbmRyb2lkIGFjdGl2aXR5IHlvdSB3YW50ICcgK1xuICAgICAgICAgICd0byB3YWl0IGZvciAoZS5nLiwgU3BsYXNoQWN0aXZpdHkpJyxcbiAgfV0sXG5cbiAgW1snLS1kZXZpY2UtcmVhZHktdGltZW91dCddLCB7XG4gICAgZGVzdDogJ2RldmljZVJlYWR5VGltZW91dCcsXG4gICAgZGVmYXVsdFZhbHVlOiA1LFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiAnaW50JyxcbiAgICBleGFtcGxlOiAnNScsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBUaW1lb3V0IGluIHNlY29uZHMgd2hpbGUgd2FpdGluZyBmb3IgZGV2aWNlIHRvIGJlY29tZSByZWFkeScsXG4gIH1dLFxuXG4gIFtbJy0tYW5kcm9pZC1jb3ZlcmFnZSddLCB7XG4gICAgZGVzdDogJ2FuZHJvaWRDb3ZlcmFnZScsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ2NvbS5teS5Qa2cvY29tLm15LlBrZy5pbnN0cnVtZW50YXRpb24uTXlJbnN0cnVtZW50YXRpb24nLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgRnVsbHkgcXVhbGlmaWVkIGluc3RydW1lbnRhdGlvbiBjbGFzcy4gUGFzc2VkIHRvIC13IGluICcgK1xuICAgICAgICAgICdhZGIgc2hlbGwgYW0gaW5zdHJ1bWVudCAtZSBjb3ZlcmFnZSB0cnVlIC13ICcsXG4gIH1dLFxuXG4gIFtbJy0tYXZkJ10sIHtcbiAgICBkZXN0OiAnYXZkJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdAZGVmYXVsdCcsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBOYW1lIG9mIHRoZSBhdmQgdG8gbGF1bmNoJyxcbiAgfV0sXG5cbiAgW1snLS1hdmQtYXJncyddLCB7XG4gICAgZGVzdDogJ2F2ZEFyZ3MnLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJy1uby1zbmFwc2hvdC1sb2FkJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEFkZGl0aW9uYWwgZW11bGF0b3IgYXJndW1lbnRzIHRvIGxhdW5jaCB0aGUgYXZkJyxcbiAgfV0sXG5cbiAgW1snLS11c2Uta2V5c3RvcmUnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ3VzZUtleXN0b3JlJyxcbiAgICBhY3Rpb246ICdzdG9yZVRydWUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIFdoZW4gc2V0IHRoZSBrZXlzdG9yZSB3aWxsIGJlIHVzZWQgdG8gc2lnbiBhcGtzLicsXG4gIH1dLFxuXG4gIFtbJy0ta2V5c3RvcmUtcGF0aCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBwYXRoLnJlc29sdmUocHJvY2Vzcy5lbnYuSE9NRSB8fCBwcm9jZXNzLmVudi5VU0VSUFJPRklMRSB8fCAnJywgJy5hbmRyb2lkJywgJ2RlYnVnLmtleXN0b3JlJyksXG4gICAgZGVzdDogJ2tleXN0b3JlUGF0aCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgUGF0aCB0byBrZXlzdG9yZScsXG4gIH1dLFxuXG4gIFtbJy0ta2V5c3RvcmUtcGFzc3dvcmQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogJ2FuZHJvaWQnLFxuICAgIGRlc3Q6ICdrZXlzdG9yZVBhc3N3b3JkJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBQYXNzd29yZCB0byBrZXlzdG9yZScsXG4gIH1dLFxuXG4gIFtbJy0ta2V5LWFsaWFzJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6ICdhbmRyb2lkZGVidWdrZXknLFxuICAgIGRlc3Q6ICdrZXlBbGlhcycsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgS2V5IGFsaWFzJyxcbiAgfV0sXG5cbiAgW1snLS1rZXktcGFzc3dvcmQnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogJ2FuZHJvaWQnLFxuICAgIGRlc3Q6ICdrZXlQYXNzd29yZCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKEFuZHJvaWQtb25seSkgS2V5IHBhc3N3b3JkJyxcbiAgfV0sXG5cbiAgW1snLS1pbnRlbnQtYWN0aW9uJ10sIHtcbiAgICBkZXN0OiAnaW50ZW50QWN0aW9uJyxcbiAgICBkZWZhdWx0VmFsdWU6ICdhbmRyb2lkLmludGVudC5hY3Rpb24uTUFJTicsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdhbmRyb2lkLmludGVudC5hY3Rpb24uTUFJTicsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBJbnRlbnQgYWN0aW9uIHdoaWNoIHdpbGwgYmUgdXNlZCB0byBzdGFydCBhY3Rpdml0eScsXG4gIH1dLFxuXG4gIFtbJy0taW50ZW50LWNhdGVnb3J5J10sIHtcbiAgICBkZXN0OiAnaW50ZW50Q2F0ZWdvcnknLFxuICAgIGRlZmF1bHRWYWx1ZTogJ2FuZHJvaWQuaW50ZW50LmNhdGVnb3J5LkxBVU5DSEVSJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZXhhbXBsZTogJ2FuZHJvaWQuaW50ZW50LmNhdGVnb3J5LkFQUF9DT05UQUNUUycsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBJbnRlbnQgY2F0ZWdvcnkgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHN0YXJ0IGFjdGl2aXR5JyxcbiAgfV0sXG5cbiAgW1snLS1pbnRlbnQtZmxhZ3MnXSwge1xuICAgIGRlc3Q6ICdpbnRlbnRGbGFncycsXG4gICAgZGVmYXVsdFZhbHVlOiAnMHgxMDIwMDAwMCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICcweDEwMjAwMDAwJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEZsYWdzIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHN0YXJ0IGFjdGl2aXR5JyxcbiAgfV0sXG5cbiAgW1snLS1pbnRlbnQtYXJncyddLCB7XG4gICAgZGVzdDogJ29wdGlvbmFsSW50ZW50QXJndW1lbnRzJyxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICcweDEwMjAwMDAwJyxcbiAgICBkZXByZWNhdGVkRm9yOiAnLS1kZWZhdWx0LWNhcGFiaWxpdGllcycsXG4gICAgaGVscDogJ1tERVBSRUNBVEVEXSAtIChBbmRyb2lkLW9ubHkpIEFkZGl0aW9uYWwgaW50ZW50IGFyZ3VtZW50cyB0aGF0IHdpbGwgYmUgdXNlZCB0byAnICtcbiAgICAgICAgICAnc3RhcnQgYWN0aXZpdHknLFxuICB9XSxcblxuICBbWyctLWRvbnQtc3RvcC1hcHAtb24tcmVzZXQnXSwge1xuICAgIGRlc3Q6ICdkb250U3RvcEFwcE9uUmVzZXQnLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoQW5kcm9pZC1vbmx5KSBXaGVuIGluY2x1ZGVkLCByZWZyYWlucyBmcm9tIHN0b3BwaW5nIHRoZSBhcHAgYmVmb3JlIHJlc3RhcnQnLFxuICB9XSxcblxuICBbWyctLWNhbGVuZGFyLWZvcm1hdCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBudWxsLFxuICAgIGRlc3Q6ICdjYWxlbmRhckZvcm1hdCcsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGV4YW1wbGU6ICdncmVnb3JpYW4nLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKElPUy1vbmx5KSBjYWxlbmRhciBmb3JtYXQgZm9yIHRoZSBpT1Mgc2ltdWxhdG9yJyxcbiAgfV0sXG5cbiAgW1snLS1uYXRpdmUtaW5zdHJ1bWVudHMtbGliJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIGRlc3Q6ICduYXRpdmVJbnN0cnVtZW50c0xpYicsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoSU9TLW9ubHkpIElPUyBoYXMgYSB3ZWlyZCBidWlsdC1pbiB1bmF2b2lkYWJsZSAnICtcbiAgICAgICAgICAnZGVsYXkuIFdlIHBhdGNoIHRoaXMgaW4gYXBwaXVtLiBJZiB5b3UgZG8gbm90IHdhbnQgaXQgcGF0Y2hlZCwgJyArXG4gICAgICAgICAgJ3Bhc3MgaW4gdGhpcyBmbGFnLicsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0ta2VlcC1rZXljaGFpbnMnXSwge1xuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgZGVzdDogJ2tlZXBLZXlDaGFpbnMnLFxuICAgIGFjdGlvbjogJ3N0b3JlVHJ1ZScsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRlcHJlY2F0ZWRGb3I6ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJyxcbiAgICBoZWxwOiAnW0RFUFJFQ0FURURdIC0gKGlPUy1vbmx5KSBXaGV0aGVyIHRvIGtlZXAga2V5Y2hhaW5zIChMaWJyYXJ5L0tleWNoYWlucykgd2hlbiByZXNldCBhcHAgYmV0d2VlbiBzZXNzaW9ucycsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0tbG9jYWxpemFibGUtc3RyaW5ncy1kaXInXSwge1xuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkZXN0OiAnbG9jYWxpemFibGVTdHJpbmdzRGlyJyxcbiAgICBkZWZhdWx0VmFsdWU6ICdlbi5scHJvaicsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoSU9TLW9ubHkpIHRoZSByZWxhdGl2ZSBwYXRoIG9mIHRoZSBkaXIgd2hlcmUgTG9jYWxpemFibGUuc3RyaW5ncyBmaWxlIHJlc2lkZXMgJyxcbiAgICBleGFtcGxlOiAnZW4ubHByb2onLFxuICB9XSxcblxuICBbWyctLXNob3ctaW9zLWxvZyddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBkZXN0OiAnc2hvd0lPU0xvZycsXG4gICAgYWN0aW9uOiAnc3RvcmVUcnVlJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVwcmVjYXRlZEZvcjogJy0tZGVmYXVsdC1jYXBhYmlsaXRpZXMnLFxuICAgIGhlbHA6ICdbREVQUkVDQVRFRF0gLSAoSU9TLW9ubHkpIGlmIHNldCwgdGhlIGlPUyBzeXN0ZW0gbG9nIHdpbGwgYmUgd3JpdHRlbiB0byB0aGUgY29uc29sZScsXG4gICAgbmFyZ3M6IDAsXG4gIH1dLFxuXG4gIFtbJy0tdGVzdHdhSGVhcnRiZWF0J10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IHRydWVcbiAgICAsIGRlc3Q6J3dhSGVhcnRiZWF0J1xuICAgICwgcmVxdWlyZWQ6IGZhbHNlXG4gICAgLCBleGFtcGxlOiBcIjFcIlxuICAgICwgaGVscDogXCJydW4gdGVzdGNhc2UncyBpZFwiXG4gIH1dLFxuICAgICAgW1snLS1zY3JlZW5wYXRoJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IG51bGxcbiAgICAsIGRlc3Q6J3NjcmVlbnNob3RQYXRoJ1xuICAgICwgcmVxdWlyZWQ6IGZhbHNlXG4gICAgLCBleGFtcGxlOiBcIkU6XFxcXGxpYlwiXG4gICAgLCBoZWxwOiBcInRoZSBzY3JlZW5zaG90IHBhdGhcIlxuICB9XSxcbiAgW1snLS1nZW5Ub29sJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlXG4gICAgLCBkZXN0OidnZW5Ub29sJ1xuICAgICwgYWN0aW9uOiAnc3RvcmVUcnVlJ1xuICAgICwgcmVxdWlyZWQ6IGZhbHNlXG4gICAgLCBleGFtcGxlOiBcInRydWUvZmFsc2VcIlxuICAgICwgaGVscDogXCJnZW4gdG9vbCA9IHRydWVcIlxuICAgICwgbmFyZ3M6IDBcbiAgfV0sXG4gIFtbJy0tcG9ydGFsJ10sIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlXG4gICAgLCBkZXN0Oidwb3J0YWwnXG4gICAgLCBhY3Rpb246ICdzdG9yZVRydWUnXG4gICAgLCByZXF1aXJlZDogZmFsc2VcbiAgICAsIGV4YW1wbGU6IFwidHJ1ZS9mYWxzZVwiXG4gICAgLCBoZWxwOiBcInBvcnRhbCA9IHRydWVcIlxuICAgICwgbmFyZ3M6IDBcbiAgfV0sXG4gIFtbJy0tdGVzdGNhc2Vsb2dJZCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiAyMjJcbiAgICAsIGRlc3Q6J3Rlc3RjYXNlbG9nSWQnXG4gICAgLCByZXF1aXJlZDogZmFsc2VcbiAgICAsIGV4YW1wbGU6IFwiMVwiXG4gICAgLCBoZWxwOiBcInJ1biB0ZXN0Y2FzZSdzIGlkXCJcbiAgfV0sXG4gIFtbJy10ZXN0d2FEZXZpY2VJZCcsJy0tdGVzdHdhRGV2aWNlSWQnXSwge1xuICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgICwgZGVmYXVsdFZhbHVlOiBudWxsXG4gICAgLCBleGFtcGxlOiBcImlQaG9uZSA1XCJcbiAgICAsIGhlbHA6ICdVbmlxdWUgdGVzdHdhIGRldmljZSBpZGVudGlmaWVyIG9mIHRoZSBjb25uZWN0ZWQgcGh5c2ljYWwgZGV2aWNlIGZvciBNQUMsdXNlIHVkaWQgZm9yIHdpbidcbiAgfV0sXG4gIFtbJy0taW5zdGFsbGFwcCddLCB7XG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlXG4gICAgLCBkZXN0OidpbnN0YWxsYXBwJ1xuICAgICwgcmVxdWlyZWQ6IGZhbHNlXG4gICAgLCBoZWxwOiBcInJlaW5zdGFsbCBhcHBcIlxuICB9XVxuXTtcblxuZnVuY3Rpb24gdXBkYXRlUGFyc2VBcmdzRm9yRGVmYXVsdENhcGFiaWxpdGllcyAocGFyc2VyKSB7XG4gIC8vIGhlcmUgd2Ugd2FudCB0byB1cGRhdGUgdGhlIHBhcnNlci5wYXJzZUFyZ3MoKSBmdW5jdGlvblxuICAvLyBpbiBvcmRlciB0byBicmluZyB0b2dldGhlciBhbGwgdGhlIGFyZ3MgdGhhdCBhcmUgYWN0dWFsbHlcbiAgLy8gZGVmYXVsdCBjYXBzLlxuICAvLyBvbmNlIHRob3NlIGRlcHJlY2F0ZWQgYXJncyBhcmUgYWN0dWFsbHkgcmVtb3ZlZCwgdGhpc1xuICAvLyBjYW4gYWxzbyBiZSByZW1vdmVkXG4gIHBhcnNlci5fcGFyc2VBcmdzID0gcGFyc2VyLnBhcnNlQXJncztcbiAgcGFyc2VyLnBhcnNlQXJncyA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgbGV0IHBhcnNlZEFyZ3MgPSBwYXJzZXIuX3BhcnNlQXJncyhhcmdzKTtcbiAgICBwYXJzZWRBcmdzLmRlZmF1bHRDYXBhYmlsaXRpZXMgPSBwYXJzZWRBcmdzLmRlZmF1bHRDYXBhYmlsaXRpZXMgfHwge307XG4gICAgZm9yIChsZXQgYXJnRW50cnkgb2YgZGVwcmVjYXRlZEFyZ3MpIHtcbiAgICAgIGxldCBhcmcgPSBhcmdFbnRyeVsxXS5kZXN0O1xuICAgICAgaWYgKGFyZ0VudHJ5WzFdLmRlcHJlY2F0ZWRGb3IgPT09ICctLWRlZmF1bHQtY2FwYWJpbGl0aWVzJykge1xuICAgICAgICBpZiAoYXJnIGluIHBhcnNlZEFyZ3MgJiYgcGFyc2VkQXJnc1thcmddICE9PSBhcmdFbnRyeVsxXS5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICBwYXJzZWRBcmdzLmRlZmF1bHRDYXBhYmlsaXRpZXNbYXJnXSA9IHBhcnNlZEFyZ3NbYXJnXTtcbiAgICAgICAgICAvLyBqIHMgaCBpIG4gdCBjYW4ndCBoYW5kbGUgY29tcGxleCBpbnRlcnBvbGF0ZWQgc3RyaW5nc1xuICAgICAgICAgIGxldCBjYXBEaWN0ID0ge1thcmddOiBwYXJzZWRBcmdzW2FyZ119O1xuICAgICAgICAgIGFyZ0VudHJ5WzFdLmRlcHJlY2F0ZWRGb3IgPSBgLS1kZWZhdWx0LWNhcGFiaWxpdGllcyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYCcke0pTT04uc3RyaW5naWZ5KGNhcERpY3QpfSdgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXJzZWRBcmdzO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZURlZmF1bHRDYXBzIChjYXBzKSB7XG4gIHRyeSB7XG4gICAgLy8gdXNlIHN5bmNocm9ub3VzIGZpbGUgYWNjZXNzLCBhcyBgYXJncGFyc2VgIHByb3ZpZGVzIG5vIHdheSBvZiBlaXRoZXJcbiAgICAvLyBhd2FpdGluZyBvciB1c2luZyBjYWxsYmFja3MuIFRoaXMgc3RlcCBoYXBwZW5zIGluIHN0YXJ0dXAsIGluIHdoYXQgaXNcbiAgICAvLyBlZmZlY3RpdmVseSBjb21tYW5kLWxpbmUgY29kZSwgc28gbm90aGluZyBpcyBibG9ja2VkIGluIHRlcm1zIG9mXG4gICAgLy8gc2Vzc2lvbnMsIHNvIGhvbGRpbmcgdXAgdGhlIGV2ZW50IGxvb3AgZG9lcyBub3QgaW5jdXIgdGhlIHVzdWFsXG4gICAgLy8gZHJhd2JhY2tzLlxuICAgIGlmIChmcy5zdGF0U3luYyhjYXBzKS5pc0ZpbGUoKSkge1xuICAgICAgY2FwcyA9IGZzLnJlYWRGaWxlU3luYyhjYXBzLCAndXRmOCcpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gbm90IGEgZmlsZSwgb3Igbm90IHJlYWRhYmxlXG4gIH1cbiAgY2FwcyA9IEpTT04ucGFyc2UoY2Fwcyk7XG4gIGlmICghXy5pc1BsYWluT2JqZWN0KGNhcHMpKSB7XG4gICAgdGhyb3cgJ0ludmFsaWQgZm9ybWF0IGZvciBkZWZhdWx0IGNhcGFiaWxpdGllcyc7XG4gIH1cbiAgcmV0dXJuIGNhcHM7XG59XG5cbmZ1bmN0aW9uIGdldFBhcnNlciAoKSB7XG4gIGxldCBwYXJzZXIgPSBuZXcgQXJndW1lbnRQYXJzZXIoe1xuICAgIHZlcnNpb246IHBrZ09iai52ZXJzaW9uLFxuICAgIGFkZEhlbHA6IHRydWUsXG4gICAgZGVzY3JpcHRpb246ICdBIHdlYmRyaXZlci1jb21wYXRpYmxlIHNlcnZlciBmb3IgdXNlIHdpdGggbmF0aXZlIGFuZCBoeWJyaWQgaU9TIGFuZCBBbmRyb2lkIGFwcGxpY2F0aW9ucy4nXG4gIH0pO1xuICBsZXQgYWxsQXJncyA9IF8udW5pb24oYXJncywgZGVwcmVjYXRlZEFyZ3MpO1xuICBwYXJzZXIucmF3QXJncyA9IGFsbEFyZ3M7XG4gIGZvciAobGV0IGFyZyBvZiBhbGxBcmdzKSB7XG4gICAgcGFyc2VyLmFkZEFyZ3VtZW50KGFyZ1swXSwgYXJnWzFdKTtcbiAgfVxuICB1cGRhdGVQYXJzZUFyZ3NGb3JEZWZhdWx0Q2FwYWJpbGl0aWVzKHBhcnNlcik7XG5cbiAgcmV0dXJuIHBhcnNlcjtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFyZ3MgKCkge1xuICBsZXQgZGVmYXVsdHMgPSB7fTtcbiAgZm9yIChsZXQgWyxhcmddIG9mIGFyZ3MpIHtcbiAgICBkZWZhdWx0c1thcmcuZGVzdF0gPSBhcmcuZGVmYXVsdFZhbHVlO1xuICB9XG4gIHJldHVybiBkZWZhdWx0cztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0UGFyc2VyO1xuZXhwb3J0IHsgZ2V0RGVmYXVsdEFyZ3MsIGdldFBhcnNlciB9O1xuIl19