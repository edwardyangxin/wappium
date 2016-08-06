#!/usr/bin/env node

// transpile:testwa

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _appiumLogger = require('appium-logger');

var logger = (0, _appiumLogger.getLogger)("TestWa");

var fs = require('fs'),
    temp = require('temp'),
    path = require('path'),
    _ = require('underscore'),
    testwaresponse = require('./middleware.js'),
    testData = require('./testcasedata.js'),
    async = require('async'),
    querystring = require("querystring"); //testwa

var testwa = {};
var screenIndex = 0;
var op_alue = "";
var memoryinfo = "0";
var cpurate = "0";
var packagename = "";
var sessionid = "";
var testsuit = "";
var testcaseid = "";
var deviceid = "";

//检测bootstrap是否已经安装在设备上
testwa.checkAppiumBootstrap = function (req) {
    var myadb = req.device.adb;
    logger.debug("check testwa bootstrap if installed!");
    myadb.shell("pm list package |grep io.appium.settings", function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            var checkstring = stdout.toString();
            //console.log("==================checkAppiumBootstrap true====================");
            //console.log( stdout.toString());
            if (checkstring.length > 0) {
                // console.log("==================checkAppiumBootstrap true====================");
                return 1;
            }
            return 0;
        }
    });
};

//检测输入法是否安装
testwa.checkUnicodeIME = function (req) {
    var myadb = req.device.adb;
    logger.debug("check testwa unicodeime if installed!");
    myadb.shell("pm list package |grep io.appium.android.ime", function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            var checkstring = stdout.toString();
            //console.log("==================checkUnicodeIME true====================");
            //console.log( stdout.toString());
            if (checkstring.length > 0) {
                // console.log("==================checkUnicodeIME true====================");
                return 1;
            }
            return 0;
        }
    });
};

testwa.checkUnlockAPP = function (req) {
    var myadb = req.device.adb;
    logger.debug("check testwa unlock if installed!");
    myadb.shell("pm list package |grep io.appium.unlock", function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            var checkstring = stdout.toString();
            //console.log("==================checkUnlockAPP true====================");
            //console.log( stdout.toString());
            if (checkstring.length > 0) {
                // console.log("==================checkUnlockAPP true====================");
                return 1;
            }
            return 0;
        }
    });
};

testwa.getScreenshotFromPath = function (req, filepath, cb) {
    var myadb = req.device.adb;
    var localfile = temp.path({
        prefix: 'appium',
        suffix: '.png'
    });
    var b64data = "";
    var filetest = filepath;
    var devcieScreenPath = "/data/local/tmp/";
    if (screenIndex >= 5) screenIndex = 0;
    devcieScreenPath = devcieScreenPath + "screenshot" + screenIndex + ".png";
    async.series([(function (cb) {

        var cmd = ['"/system/bin/rm', devcieScreenPath + ';', '/system/bin/screencap -p', devcieScreenPath, '"'].join(' ');
        myadb.shell(cmd, cb);
        //console.log("$$$$androidController.getScreenshotFromPath 1");
        screenIndex = screenIndex + 1;
    }).bind(this), (function (cb) {
        if (fs.existsSync(filetest)) fs.unlinkSync(filetest);
        myadb.pull(devcieScreenPath, filetest, cb);
        //console.log("$$$$androidController.getScreenshotFromPath 2");
    }).bind(this), function (cb) {
        fs.readFile(localfile, function (err, data) {
            if (err) return cb(err);
            b64data = new Buffer(data).toString('base64');
            cb();
        });
        //console.log("$$$$androidController.getScreenshotFromPath 3");
    }, function (cb) {
        fs.unlink(localfile, function (err) {
            if (err) return cb(err);
            cb();
            //console.log("$$$$androidController.getScreenshotFromPath error");
        });
        //console.log("$$$$androidController.getScreenshotFromPath 4");
    }]);
};

testwa.getPerformance_chrome = function (req, appPackage) {
    var myadb = req.device.adb;
    logger.debug("Getting device memeory data performance!");
    myadb.shell("top -n 1 -d 1|grep -v " + appPackage + ":|grep " + appPackage, function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            //var total =  stdout.substring(stdout.indexOf("TOTAL")).replace(/\s+/ig, " ");
            var reg_MEM = /[0-9]{1,9}([K])/g;
            var reg_CPU = /[0-9]{1,2}([%])/g;
            var memarray = stdout.match(reg_MEM);
            var tmpcpurate = stdout.match(reg_CPU);
            if (memarray == null) {
                memoryinfo = "0";
            } else {
                memoryinfo = memarray[1];
                memoryinfo = memoryinfo.replace('K', '');
            }
            if (tmpcpurate == null) {
                cpurate = "0";
            } else {
                cpurate = cpurate.replace('%', '');
            }
            var data = { mem: memoryinfo, cpu: cpurate };
            return data;
        }
    });
};

testwa.getMemoryUse = function (req, appPackage) {
    var myadb = req.device.adb;
    logger.debug("Getting device memeory data performance!");
    myadb.shell("top -n 1 -d 0.5 |grep " + appPackage, function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            //var total =  stdout.substring(stdout.indexOf("TOTAL")).replace(/\s+/ig, " ");
            var reg = /[0-9]{1,9}([K])/g;
            var memarray = stdout.match(reg);
            memoryinfo = memarray[1];
            memoryinfo = memoryinfo.replace('K', '');
            return memoryinfo[1];
        }
    });
};

testwa.getCPUUse = function (req, appPackage) {
    var myadb = req.device.adb;
    logger.debug("Getting device data about testing app process!");
    myadb.shell("top -n 1 -d 0.5|grep " + appPackage, function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            var reg = /[0-9]{1,2}([%])/g;
            var tmpcpurate = stdout.match(reg);
            cpurate = tmpcpurate[0];
            // console.log("=============%==================");
            console.log(cpurate);
            cpurate = cpurate.replace('%', '');
            // console.log("===============================");
            console.log(cpurate);
            return cpurate;
        }
    });
};

testwa.getRuntime_log = function (appPackage) {
    var myadb = new adbshell();
    logger.debug("Getting device logcat info!");
    myadb.shell("logcat -c", function (err, stdout) {
        if (err) {
            logger.warn(err);
            return err.toString();
        } else {
            myadb.shell("logcat | grep " + appPackage, function (err, stdout) {
                return stdout.toString();
            });
        }
    });
};

//单独搜集每一步的内存信息
testwa.collectMem = function (paramsmem) {
    testwaresponse.SendData(paramsmem, cb);
};

//发送基于native-app步骤的详细反馈信息
testwa.reponseCient_webview = function (params, filepath, res, req) {
    this.getScreenshotFromPath(req, filepath, testwaresponse.SendDataWebview(params, res));
};

testwa.gettestAction_Webview = function (req, resstr, fileresponsepath) {
    var action = null;
    var param = null;

    this.packagename = req.device.appProcess;
    this.sessionid = req.appium.sessionId;
    this.deviceid = req.device.adb.curDeviceId;
    this.testsuit = req.appium.desiredCapabilities.testSuit;
    this.testcaseid = req.appium.desiredCapabilities.testcaseId;

    var len = 0;
    len = resstr.length - 1;
    if (resstr[len] === "url") {
        action = "访问网址.url"; //查找
        op_alue = req.body.url;
        param = "访问网址:" + op_alue;
    } else if (resstr[len] === "element") {
        action = "查找.find"; //查找
        op_alue = req.body.value;
        param = "查找元素:" + op_alue;
    } else if (resstr[len] === "implicit_wait") {
        action = "访问等待.wait_complete"; //查找
        op_alue = req.body.ms;
        param = "访问等待时长:" + op_alue + "ms";

        this.packagename = req.device.appProcess;
        this.deviceid = req.device.adb.curDeviceId;
    } else if (resstr[len] === "click") {
        action = "点击.click"; //点击
        //console.log(op_alue);
        param = "点击按钮:" + op_alue;
    } else if (resstr[len] === "value") {
        action = "输入.setValue"; //输入
        var str = req.body.value.toString();
        //console.log(str);
        var reg = /,/g;
        var resstrtmp = str.replace(reg, '');
        //console.log(resstrtmp);
        param = "输入内容： " + resstrtmp + "，输入框：" + op_alue;
    } else if (resstr[len] === "perform") {
        action = "滑屏.swipe"; //滑动
        //console.log(req.body.actions[0].options.x);
        //console.log(req.body.actions[0].options.y);
        //console.log(req.body.actions[1]);
        //console.log(req.body.actions[2].options.x);
        //console.log(req.body.actions[2].options.y);
        param = "滑屏：swipe(startX:" + req.body.actions[0].options.x + ",startY:" + req.body.actions[0].options.y + ",startX:" + req.body.actions[2].options.x + ",startY:" + req.body.actions[2].options.y + ",ms:" + req.body.actions[1].options.ms + ")";
    } else if (resstr[len] === "back") {
        action = "回退.Back"; //滑动
        param = "回退.pressBack";
    } else if (req.device.commandAction === "shutdown") {
        action = "退出.Quit_App"; //滑动
        param = "退出应用：" + this.packagename;

        this.getPerformance_chrome(req, this.packagename);
        testData.testdata.status = 0;
        testData.testdata.value = true;
        testData.testdata.runtime = 0;
        testData.testdata.cpurate = cpurate;
        testData.testdata.memory = memoryinfo;
        testData.testdata.sessionId = this.sessionid;
        testData.testdata.deviceId = this.deviceid;
        testData.testdata.testSuit = this.testsuit;
        testData.testdata.testcaseId = this.testcaseid;
        testData.testdata.screenshotPath = fileresponsepath;
        testData.testdata.command = { "action": action, "params": param };

        var resClientData = _.clone(testData);
        return resClientData;
    }
    //else
    //{
    // console.log("//////////////////////////////////////////////////////////////");
    this.getPerformance_chrome(req, this.packagename);
    //console.log(memoryinfo);
    //console.log(cpurate);
    //console.log(req.appium.sessionId);
    //console.log(req.appium.desiredCapabilities.deviceName);
    //console.log(this.getMemoryUse_pro(req.appium.desiredCapabilities.appPackage));
    // console.log("//////////////////////////////////////////////////////////////");
    testData.testdata.status = 0;
    testData.testdata.value = true;
    testData.testdata.runtime = 0;
    testData.testdata.cpurate = cpurate;
    testData.testdata.memory = memoryinfo;
    testData.testdata.sessionId = req.appium.sessionId;
    testData.testdata.deviceId = this.deviceid;
    testData.testdata.testSuit = req.appium.desiredCapabilities.testSuit;
    testData.testdata.testcaseId = req.appium.desiredCapabilities.testcaseId;
    testData.testdata.screenshotPath = fileresponsepath;
    testData.testdata.command = { "action": action, "params": param };

    var resClientData = _.clone(testData);
    return resClientData;
    //}
};

testwa.getiOStestAction = function (req, resstr, fileresponsepath) {
    var action = null;
    var param = null;

    this.packagename = req.device.appProcess;
    this.sessionid = req.appium.sessionId;
    this.testsuit = req.appium.desiredCapabilities.testSuit;
    this.testcaseid = req.appium.desiredCapabilities.testcaseId;

    if (req.appium.desiredCapabilities.udid) {
        this.deviceid = req.appium.desiredCapabilities.udid;
    } else {
        this.deviceid = req.appium.desiredCapabilities.deviceName;
    }
    console.log("===deviceid:" + this.deviceid);
    // var time = value.time;
    // value = value.value;

    var len = 0;
    len = resstr.length - 1;
    if (resstr[len] === "element") {
        action = "查找.find"; //查找
        op_alue = req.body.value;
        param = "查找元素:" + op_alue;
        //退出应用所需变量
    } else if (req.device.commandAction === "click" && resstr[len] === "perform") {
            action = "点击.click"; //点击
            //console.log(op_alue);
            param = "点击:tap(startX:" + req.device.commandParams.x + ",startY:" + req.device.commandParams.y + ")";
            //console.log("==============================================");
            //console.log(req.device.commandParams.x);
        } else if (resstr[len] === "press_keycode") {
                action = "键盘输入." + req.device.commandAction; //点击
                //console.log(op_alue);
                param = "键盘输入:pressKeyCode(" + req.device.commandParams.keycode + "," + req.device.commandParams.metastate + ")";
            } else if (resstr[len] === "click") {
                action = "点击.click"; //点击
                //console.log(op_alue);
                param = "点击按钮:" + op_alue;
            } else if (resstr[len] === "value") {
                action = "输入.setValue"; //输入
                var str = req.body.value.toString();
                //console.log(str);
                var reg = /,/g;
                var resstrtmp = str.replace(reg, '');
                //console.log(resstrtmp);
                param = "输入内容： " + resstrtmp + "，输入框：" + op_alue;
            } else if (resstr[len] === "perform" && req.device.commandAction !== "click") {
                action = "滑屏.swipe"; //滑动
                console.log(req.device.commandAction);
                //console.log(req.body.actions[0].options.x);
                //console.log(req.body.actions[0].options.y);
                //console.log(req.body.actions[1]);
                //console.log(req.body.actions[2].options.x);
                //console.log(req.body.actions[2].options.y);
                param = "滑屏：swipe(startX:" + req.body.actions[0].options.x + ",startY:" + req.body.actions[0].options.y + ",startX:" + req.body.actions[2].options.x + ",startY:" + req.body.actions[2].options.y + ",ms:" + req.body.actions[1].options.ms + ")";
                //this.packagename = req.device.appProcesss;
                //this.sessionid = req.appium.sessionId;
                //this.deviceid = req.device.adb.curDeviceId;
                //this.testsuit = req.appium.desiredCapabilities.testSuit;
                //this.testcaseid = req.appium.desiredCapabilities.testcaseId;
            } else if (resstr[len] === "back") {
                    action = "回退.Back"; //滑动
                    param = "回退.pressBack";
                } else if (req.device.commandAction === "shutdown") {
                    action = "退出.Quit_App"; //滑动
                    param = "退出应用：" + this.packagename;

                    //if(req.device.appProcess === "com.android.chrome"){
                    //    this.getPerformance_chrome(req.device.appProcess);
                    //}
                    //else
                    //{
                    //    this.getPerformance(req.device.appProcess);
                    //}

                    testData.testdata.status = 0;
                    testData.testdata.value = true;
                    testData.testdata.runtime = 0;
                    testData.testdata.cpurate = 0;
                    testData.testdata.memory = 0;
                    testData.testdata.sessionId = this.sessionid;
                    testData.testdata.deviceId = this.deviceid;
                    testData.testdata.testSuit = this.testsuit;
                    testData.testdata.testcaseId = this.testcaseid;
                    testData.testdata.screenshotPath = fileresponsepath;
                    testData.testdata.command = { "action": action, "params": param };

                    console.log(testData.testdata);
                    var resClientData = _.clone(testData);
                    return resClientData;
                } else if (req.device.commandAction === "shutdown_web") {
                    action = "关闭浏览器.Close_chrome"; //滑动
                    param = "关闭浏览器： Close_chrome";

                    if (req.device.appProcess === "com.android.chrome") {
                        this.getPerformance_chrome(req, req.device.appProcess);
                    } else {
                        this.getPerformance(req, req.device.appProcess);
                    }

                    testData.testdata.status = 0;
                    testData.testdata.value = true;
                    testData.testdata.runtime = 0;
                    testData.testdata.cpurate = cpurate;
                    testData.testdata.memory = memoryinfo;
                    testData.testdata.sessionId = this.sessionid;
                    testData.testdata.deviceId = this.deviceid;
                    testData.testdata.testSuit = this.testsuit;
                    testData.testdata.testcaseId = this.testcaseid;
                    testData.testdata.screenshotPath = fileresponsepath;
                    testData.testdata.command = { "action": action, "params": param };

                    console.log(testData.testdata);
                    var resClientData = _.clone(testData);
                    return resClientData;
                }

    testData.testdata.status = 0;
    testData.testdata.value = true;
    testData.testdata.runtime = 0;
    // testData.testdata.cpurate = cpurate;
    // testData.testdata.memory = memoryinfo;
    testData.testdata.sessionId = req.appium.sessionId;
    testData.testdata.deviceId = this.deviceid;
    testData.testdata.testSuit = req.appium.desiredCapabilities.testSuit;
    testData.testdata.testcaseId = req.appium.desiredCapabilities.testcaseId;
    testData.testdata.screenshotPath = fileresponsepath;
    testData.testdata.command = { "action": action, "params": param };

    // console.log("===deviceId"+this.deviceid);
    var resClientData = _.clone(testData);
    return resClientData;
    //}
};

testwa.heartbeat = function (args) {
    if (args.waHeartbeat) {
        var returnStatus = { status: 0 };
        //use testwaDeviceId instead of udid for MAC
        if (args.udid) {
            testwaresponse.SendStartStatus(returnStatus, args.udid, args.testcaselogId, args.port);
        } else {
            testwaresponse.SendStartStatus(returnStatus, args.testwaDeviceId, args.testcaselogId, args.port);
        }
    }
};

testwa.handler = function callee$0$0(driver, req, httpStatus, httpResBody, commond, jsonObj) {
    var time;
    return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                if (!(commond !== 'deleteSession')) {
                    context$1$0.next = 14;
                    break;
                }

                if (!(driver.sessions[httpResBody.sessionId].constructor.name === 'AndroidDriver')) {
                    context$1$0.next = 6;
                    break;
                }

                context$1$0.next = 4;
                return _regeneratorRuntime.awrap(testwa.gettestAction(driver, req, httpStatus, httpResBody, commond, jsonObj));

            case 4:
                context$1$0.next = 12;
                break;

            case 6:
                msg = testwa.getiOStestAction(req, resstr, fileresponsepath);
                time = 0;

                if (responseForiOS.time) {
                    time = responseForiOS.time;
                }
                msg.testdata.runtime = time;
                msg.testdata.description = response.value.message;
                msg.testdata.status = response.status;

            case 12:
                context$1$0.next = 14;
                break;

            case 14:
                return context$1$0.abrupt('return');

            case 15:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

//Android driver
testwa.gettestAction = function callee$0$0(driver, req, httpStatus, httpResBody, commond, jsonObj) {
    var androidDriver, caps, args, action, param, _ref, _ref2, memoryInfo, cpuRate, testDataReply, myDate, endTime, screenshotPath, tempPng;

    return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                androidDriver = driver.sessions[httpResBody.sessionId];
                caps = androidDriver.caps;
                args = driver.args;
                action = commond;
                param = jsonObj.value;
                context$1$0.next = 7;
                return _regeneratorRuntime.awrap(this.getPerformance(androidDriver, httpResBody));

            case 7:
                _ref = context$1$0.sent;
                _ref2 = _slicedToArray(_ref, 2);
                memoryInfo = _ref2[0];
                cpuRate = _ref2[1];
                testDataReply = _.clone(testData);

                testDataReply.testdata.status = 0;
                testDataReply.testdata.value = httpResBody.value;
                testDataReply.testdata.runtime = 0;
                testDataReply.testdata.cpurate = cpuRate ? cpuRate : "0";
                testDataReply.testdata.memory = memoryInfo ? memoryInfo : "0";
                testDataReply.testdata.sessionId = httpResBody.sessionId;
                testDataReply.testdata.deviceId = args ? args.deviceName : "";
                testDataReply.testdata.testSuit = args ? args.testSuit : "";
                testDataReply.testdata.testcaseId = args ? args.testcaseId : "";
                testDataReply.testdata.command = { "action": action, "params": param };
                testDataReply.testdata.screenshotPath = args ? args.screenshotPath : "";

                myDate = new Date();
                endTime = myDate.getTime();

                testDataReply.runtime = endTime - req._startTime.getTime();
                testDataReply.status = httpResBody.status;
                testDataReply.description = httpResBody.value.message;

                screenshotPath = args ? args.screenshotPath : "";
                tempPng = screenshotPath + endTime + ".png";
                context$1$0.next = 32;
                return _regeneratorRuntime.awrap(testwa.getScreenshotAndroid(androidDriver, tempPng));

            case 32:
                testwaresponse.SendDataNativeApp(testDataReply.testdata);

            case 33:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

//get memoryinfo and cpurate
testwa.getPerformance = function callee$0$0(androidDriver, httpResBody) {
    var adb, caps, appName, out, reg_MEM, reg_CPU, memarray, tmpcpurate, memoryinfo, cpurate;
    return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                logger.debug("Getting device memeory and cpu cost!");
                adb = androidDriver.adb;
                caps = androidDriver.caps;
                appName = caps.appPackage;
                context$1$0.next = 6;
                return _regeneratorRuntime.awrap(adb.shell("top -n 1 -d 0.5 | grep " + appName));

            case 6:
                out = context$1$0.sent;
                reg_MEM = /[0-9]{1,9}([K])/g;
                reg_CPU = /[0-9]{1,2}([%])/g;
                memarray = out.match(reg_MEM);
                tmpcpurate = out.match(reg_CPU);
                memoryinfo = memarray[1];

                memoryinfo = memoryinfo.replace('K', '');
                cpurate = tmpcpurate[0];

                cpurate = cpurate.replace('%', '');
                return context$1$0.abrupt('return', [memoryinfo, cpurate]);

            case 16:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

//发送基于native-app步骤的详细反馈信息
testwa.reponseCient_native = function (params, filepath, timeStr, response, res, req) {

    if (req.device.commandAction != "shutdown") {
        // this.getScreenshotFromPath(req,filepath, testwaresponse.SendDataNativeApp(params,response,res,req));

        //add if to support iOS
        if (req.device.adb) {
            this.getScreenshotFromPath(req, filepath, testwaresponse.SendDataNativeApp(params, response, res, req));
        } else {
            if (req.device.args.platformName == "iOS") {
                console.log("===reportClient iOS");
                var arr = filepath.split("/");
                var filename = arr[arr.length - 1];
                req.device.getiOSScreenshotFromPath(req, filepath, timeStr, function () {
                    testwaresponse.SendDataNativeApp(params, response, res, req);
                });
            }
        }
    } else {
        testwaresponse.SendDataNativeApp(params, response, res, req);
    }
};

testwa.getScreenshotAndroid = function callee$0$0(androidDriver, tempPng) {
    var b64Str, png, cmd;
    return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return _regeneratorRuntime.awrap(androidDriver.getScreenshot());

            case 2:
                b64Str = context$1$0.sent;
                png = '/data/local/tmp/screenshot.png';
                cmd = ['/system/bin/rm', png + ';', '/system/bin/screencap', '-p', png];
                context$1$0.next = 7;
                return _regeneratorRuntime.awrap(androidDriver.adb.shell(cmd));

            case 7:
                context$1$0.next = 9;
                return _regeneratorRuntime.awrap(fs.exists(tempPng));

            case 9:
                if (!context$1$0.sent) {
                    context$1$0.next = 12;
                    break;
                }

                context$1$0.next = 12;
                return _regeneratorRuntime.awrap(fs.unlink(tempPng));

            case 12:
                context$1$0.next = 14;
                return _regeneratorRuntime.awrap(androidDriver.adb.pull(png, tempPng));

            case 14:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

module.exports = testwa;

//deleteSession

// await fs.writeFile(tempPng,b64Str,'base64');
// return;
//# sourceMappingURL=data:application/json;base64,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SSxDQUFDLGdCQUFnQixFQUFLLEdBQUcsUUFBSyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDOztpREFDdEUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOzs7O2lEQUN4QixFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7O2lEQUNsQixFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7OztpREFFdEIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQzs7Ozs7OztDQUM3QyxDQUFBOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImxpYlxcdGVzdHdhXFx0ZXN0d2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gdHJhbnNwaWxlOnRlc3R3YVxyXG5cclxuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSAnYXBwaXVtLWxvZ2dlcic7XHJcblxyXG5sZXQgbG9nZ2VyID0gZ2V0TG9nZ2VyKFwiVGVzdFdhXCIpO1xyXG5cclxubGV0ICBmcyA9IHJlcXVpcmUoJ2ZzJylcclxuICAgICwgdGVtcCA9IHJlcXVpcmUoJ3RlbXAnKVxyXG4gICAgLCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXHJcbiAgICAsIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJylcclxuICAgICx0ZXN0d2FyZXNwb25zZSA9IHJlcXVpcmUoJy4vbWlkZGxld2FyZS5qcycpXHJcbiAgICAsdGVzdERhdGEgPSByZXF1aXJlKCcuL3Rlc3RjYXNlZGF0YS5qcycpXHJcbiAgICAsYXN5bmMgPSByZXF1aXJlKCdhc3luYycpXHJcbiAgICAscXVlcnlzdHJpbmcgPSByZXF1aXJlKFwicXVlcnlzdHJpbmdcIik7Ly90ZXN0d2FcclxuXHJcbmxldCB0ZXN0d2EgPSB7fTtcclxubGV0IHNjcmVlbkluZGV4PTA7XHJcbmxldCBvcF9hbHVlID0gXCJcIjtcclxubGV0IG1lbW9yeWluZm8gPSBcIjBcIjtcclxubGV0IGNwdXJhdGUgPSBcIjBcIjtcclxubGV0IHBhY2thZ2VuYW1lID0gXCJcIjtcclxubGV0IHNlc3Npb25pZCA9IFwiXCI7XHJcbmxldCB0ZXN0c3VpdCA9IFwiXCI7XHJcbmxldCB0ZXN0Y2FzZWlkID0gXCJcIjtcclxubGV0IGRldmljZWlkID0gXCJcIjtcclxuXHJcbi8v5qOA5rWLYm9vdHN0cmFw5piv5ZCm5bey57uP5a6J6KOF5Zyo6K6+5aSH5LiKXHJcbnRlc3R3YS5jaGVja0FwcGl1bUJvb3RzdHJhcCA9IGZ1bmN0aW9uKHJlcSl7XHJcbiAgICB2YXIgbXlhZGIgPSByZXEuZGV2aWNlLmFkYjtcclxuICAgIGxvZ2dlci5kZWJ1ZyhcImNoZWNrIHRlc3R3YSBib290c3RyYXAgaWYgaW5zdGFsbGVkIVwiKTtcclxuICAgIG15YWRiLnNoZWxsKFwicG0gbGlzdCBwYWNrYWdlIHxncmVwIGlvLmFwcGl1bS5zZXR0aW5nc1wiLCBmdW5jdGlvbiAoZXJyLCBzdGRvdXQpIHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlci53YXJuKGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgY2hlY2tzdHJpbmcgID0gc3Rkb3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT1jaGVja0FwcGl1bUJvb3RzdHJhcCB0cnVlPT09PT09PT09PT09PT09PT09PT1cIik7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coIHN0ZG91dC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgaWYoY2hlY2tzdHJpbmcubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PWNoZWNrQXBwaXVtQm9vdHN0cmFwIHRydWU9PT09PT09PT09PT09PT09PT09PVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy/mo4DmtYvovpPlhaXms5XmmK/lkKblronoo4VcclxudGVzdHdhLmNoZWNrVW5pY29kZUlNRSA9IGZ1bmN0aW9uKHJlcSl7XHJcbiAgICB2YXIgbXlhZGIgPSByZXEuZGV2aWNlLmFkYjtcclxuICAgIGxvZ2dlci5kZWJ1ZyhcImNoZWNrIHRlc3R3YSB1bmljb2RlaW1lIGlmIGluc3RhbGxlZCFcIik7XHJcbiAgICBteWFkYi5zaGVsbChcInBtIGxpc3QgcGFja2FnZSB8Z3JlcCBpby5hcHBpdW0uYW5kcm9pZC5pbWVcIiwgZnVuY3Rpb24gKGVyciwgc3Rkb3V0KSB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICBsb2dnZXIud2FybihlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNoZWNrc3RyaW5nICA9IHN0ZG91dC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09Y2hlY2tVbmljb2RlSU1FIHRydWU9PT09PT09PT09PT09PT09PT09PVwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyggc3Rkb3V0LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBpZihjaGVja3N0cmluZy5sZW5ndGggPjApe1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT1jaGVja1VuaWNvZGVJTUUgdHJ1ZT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG50ZXN0d2EuY2hlY2tVbmxvY2tBUFAgPSBmdW5jdGlvbihyZXEpe1xyXG4gICAgdmFyIG15YWRiID0gcmVxLmRldmljZS5hZGI7XHJcbiAgICBsb2dnZXIuZGVidWcoXCJjaGVjayB0ZXN0d2EgdW5sb2NrIGlmIGluc3RhbGxlZCFcIik7XHJcbiAgICBteWFkYi5zaGVsbChcInBtIGxpc3QgcGFja2FnZSB8Z3JlcCBpby5hcHBpdW0udW5sb2NrXCIsIGZ1bmN0aW9uIChlcnIsIHN0ZG91dCkge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLndhcm4oZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjaGVja3N0cmluZyAgPSBzdGRvdXQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PWNoZWNrVW5sb2NrQVBQIHRydWU9PT09PT09PT09PT09PT09PT09PVwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyggc3Rkb3V0LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBpZihjaGVja3N0cmluZy5sZW5ndGggPjApe1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT1jaGVja1VubG9ja0FQUCB0cnVlPT09PT09PT09PT09PT09PT09PT1cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnRlc3R3YS5nZXRTY3JlZW5zaG90RnJvbVBhdGggPSBmdW5jdGlvbihyZXEsZmlsZXBhdGgsY2IpIHtcclxuICAgIHZhciBteWFkYiA9IHJlcS5kZXZpY2UuYWRiO1xyXG4gICAgdmFyIGxvY2FsZmlsZSA9IHRlbXAucGF0aCh7XHJcbiAgICAgICAgcHJlZml4OiAnYXBwaXVtJyxcclxuICAgICAgICBzdWZmaXg6ICcucG5nJ1xyXG4gICAgfSk7XHJcbiAgICB2YXIgYjY0ZGF0YSA9IFwiXCI7XHJcbiAgICB2YXIgZmlsZXRlc3QgPSBmaWxlcGF0aDtcclxuICAgIHZhciBkZXZjaWVTY3JlZW5QYXRoPVwiL2RhdGEvbG9jYWwvdG1wL1wiO1xyXG4gICAgaWYoc2NyZWVuSW5kZXg+PTUpXHJcbiAgICAgICAgc2NyZWVuSW5kZXg9MDtcclxuICAgIGRldmNpZVNjcmVlblBhdGg9ZGV2Y2llU2NyZWVuUGF0aCtcInNjcmVlbnNob3RcIitzY3JlZW5JbmRleCtcIi5wbmdcIjtcclxuICAgIGFzeW5jLnNlcmllcyhbXHJcbiAgICAgICAgZnVuY3Rpb24oY2IpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbWQgPSBbJ1wiL3N5c3RlbS9iaW4vcm0nLCBkZXZjaWVTY3JlZW5QYXRoICsgJzsnLCAnL3N5c3RlbS9iaW4vc2NyZWVuY2FwIC1wJyxcclxuICAgICAgICAgICAgICAgIGRldmNpZVNjcmVlblBhdGgsICdcIidcclxuICAgICAgICAgICAgXS5qb2luKCcgJyk7XHJcbiAgICAgICAgICAgIG15YWRiLnNoZWxsKGNtZCwgY2IpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiJCQkJGFuZHJvaWRDb250cm9sbGVyLmdldFNjcmVlbnNob3RGcm9tUGF0aCAxXCIpO1xyXG4gICAgICAgICAgICBzY3JlZW5JbmRleD1zY3JlZW5JbmRleCsxO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgICBmdW5jdGlvbihjYikge1xyXG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhmaWxldGVzdCkpIGZzLnVubGlua1N5bmMoZmlsZXRlc3QpO1xyXG4gICAgICAgICAgICBteWFkYi5wdWxsKGRldmNpZVNjcmVlblBhdGgsIGZpbGV0ZXN0LCBjYik7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIkJCQkYW5kcm9pZENvbnRyb2xsZXIuZ2V0U2NyZWVuc2hvdEZyb21QYXRoIDJcIik7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGZ1bmN0aW9uKGNiKSB7XHJcbiAgICAgICAgICAgIGZzLnJlYWRGaWxlKGxvY2FsZmlsZSwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcclxuICAgICAgICAgICAgICAgIGI2NGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEpLnRvU3RyaW5nKCdiYXNlNjQnKTtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiJCQkJGFuZHJvaWRDb250cm9sbGVyLmdldFNjcmVlbnNob3RGcm9tUGF0aCAzXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24oY2IpIHtcclxuICAgICAgICAgICAgZnMudW5saW5rKGxvY2FsZmlsZSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcclxuICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiJCQkJGFuZHJvaWRDb250cm9sbGVyLmdldFNjcmVlbnNob3RGcm9tUGF0aCBlcnJvclwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIkJCQkYW5kcm9pZENvbnRyb2xsZXIuZ2V0U2NyZWVuc2hvdEZyb21QYXRoIDRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgXSk7XHJcbn07XHJcblxyXG50ZXN0d2EuZ2V0UGVyZm9ybWFuY2VfY2hyb21lID0gZnVuY3Rpb24gKHJlcSxhcHBQYWNrYWdlKSB7XHJcbiAgICB2YXIgbXlhZGIgPSByZXEuZGV2aWNlLmFkYjtcclxuICAgIGxvZ2dlci5kZWJ1ZyhcIkdldHRpbmcgZGV2aWNlIG1lbWVvcnkgZGF0YSBwZXJmb3JtYW5jZSFcIik7XHJcbiAgICBteWFkYi5zaGVsbChcInRvcCAtbiAxIC1kIDF8Z3JlcCAtdiBcIithcHBQYWNrYWdlK1wiOnxncmVwIFwiK2FwcFBhY2thZ2UsIGZ1bmN0aW9uIChlcnIsIHN0ZG91dCkge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLndhcm4oZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vdmFyIHRvdGFsID0gIHN0ZG91dC5zdWJzdHJpbmcoc3Rkb3V0LmluZGV4T2YoXCJUT1RBTFwiKSkucmVwbGFjZSgvXFxzKy9pZywgXCIgXCIpO1xyXG4gICAgICAgICAgICB2YXIgcmVnX01FTSA9IC9bMC05XXsxLDl9KFtLXSkvZztcclxuICAgICAgICAgICAgdmFyIHJlZ19DUFUgPSAvWzAtOV17MSwyfShbJV0pL2c7XHJcbiAgICAgICAgICAgIHZhciBtZW1hcnJheSAgPSBzdGRvdXQubWF0Y2gocmVnX01FTSk7XHJcbiAgICAgICAgICAgIHZhciB0bXBjcHVyYXRlICA9IHN0ZG91dC5tYXRjaChyZWdfQ1BVKTtcclxuICAgICAgICAgICAgaWYobWVtYXJyYXkgPT0gbnVsbCApe1xyXG4gICAgICAgICAgICAgICAgbWVtb3J5aW5mbyA9IFwiMFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWVtb3J5aW5mbyA9IG1lbWFycmF5WzFdO1xyXG4gICAgICAgICAgICAgICAgbWVtb3J5aW5mbyA9IG1lbW9yeWluZm8ucmVwbGFjZSgnSycsJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRtcGNwdXJhdGUgPT0gbnVsbCApe1xyXG4gICAgICAgICAgICAgICAgY3B1cmF0ZSA9IFwiMFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3B1cmF0ZSA9IGNwdXJhdGUucmVwbGFjZSgnJScsJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge21lbTptZW1vcnlpbmZvLGNwdTpjcHVyYXRlfTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG50ZXN0d2EuZ2V0TWVtb3J5VXNlID0gZnVuY3Rpb24gKHJlcSxhcHBQYWNrYWdlKSB7XHJcbiAgICB2YXIgbXlhZGIgPSByZXEuZGV2aWNlLmFkYjtcclxuICAgIGxvZ2dlci5kZWJ1ZyhcIkdldHRpbmcgZGV2aWNlIG1lbWVvcnkgZGF0YSBwZXJmb3JtYW5jZSFcIik7XHJcbiAgICBteWFkYi5zaGVsbChcInRvcCAtbiAxIC1kIDAuNSB8Z3JlcCBcIithcHBQYWNrYWdlLCBmdW5jdGlvbiAoZXJyLCBzdGRvdXQpIHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlci53YXJuKGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3ZhciB0b3RhbCA9ICBzdGRvdXQuc3Vic3RyaW5nKHN0ZG91dC5pbmRleE9mKFwiVE9UQUxcIikpLnJlcGxhY2UoL1xccysvaWcsIFwiIFwiKTtcclxuICAgICAgICAgICAgdmFyIHJlZyA9IC9bMC05XXsxLDl9KFtLXSkvZztcclxuICAgICAgICAgICAgdmFyIG1lbWFycmF5ICA9IHN0ZG91dC5tYXRjaChyZWcpO1xyXG4gICAgICAgICAgICBtZW1vcnlpbmZvID0gbWVtYXJyYXlbMV07XHJcbiAgICAgICAgICAgIG1lbW9yeWluZm8gPSBtZW1vcnlpbmZvLnJlcGxhY2UoJ0snLCcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lbW9yeWluZm9bMV07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG50ZXN0d2EuZ2V0Q1BVVXNlID0gZnVuY3Rpb24gKHJlcSxhcHBQYWNrYWdlKSB7XHJcbiAgICB2YXIgbXlhZGIgPSByZXEuZGV2aWNlLmFkYjtcclxuICAgIGxvZ2dlci5kZWJ1ZyhcIkdldHRpbmcgZGV2aWNlIGRhdGEgYWJvdXQgdGVzdGluZyBhcHAgcHJvY2VzcyFcIik7XHJcbiAgICBteWFkYi5zaGVsbChcInRvcCAtbiAxIC1kIDAuNXxncmVwIFwiK2FwcFBhY2thZ2UsIGZ1bmN0aW9uIChlcnIsIHN0ZG91dCkge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLndhcm4oZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciByZWcgPSAvWzAtOV17MSwyfShbJV0pL2c7XHJcbiAgICAgICAgICAgIHZhciB0bXBjcHVyYXRlICA9IHN0ZG91dC5tYXRjaChyZWcpO1xyXG4gICAgICAgICAgICBjcHVyYXRlID0gdG1wY3B1cmF0ZVswXTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09PT09JT09PT09PT09PT09PT09PT09PVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY3B1cmF0ZSk7XHJcbiAgICAgICAgICAgIGNwdXJhdGUgPSBjcHVyYXRlLnJlcGxhY2UoJyUnLCcnKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjcHVyYXRlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNwdXJhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG50ZXN0d2EuZ2V0UnVudGltZV9sb2cgPSBmdW5jdGlvbiAoYXBwUGFja2FnZSkge1xyXG4gICAgdmFyIG15YWRiID0gbmV3IGFkYnNoZWxsKCk7XHJcbiAgICBsb2dnZXIuZGVidWcoXCJHZXR0aW5nIGRldmljZSBsb2djYXQgaW5mbyFcIik7XHJcbiAgICBteWFkYi5zaGVsbChcImxvZ2NhdCAtY1wiLCBmdW5jdGlvbiAoZXJyLCBzdGRvdXQpIHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlci53YXJuKGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnIudG9TdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBteWFkYi5zaGVsbChcImxvZ2NhdCB8IGdyZXAgXCIrYXBwUGFja2FnZSwgZnVuY3Rpb24gKGVyciwgc3Rkb3V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Rkb3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy/ljZXni6zmkJzpm4bmr4/kuIDmraXnmoTlhoXlrZjkv6Hmga9cclxudGVzdHdhLmNvbGxlY3RNZW0gPSBmdW5jdGlvbihwYXJhbXNtZW0pe1xyXG4gICAgdGVzdHdhcmVzcG9uc2UuU2VuZERhdGEocGFyYW1zbWVtLGNiKTtcclxufTtcclxuXHJcbi8v5Y+R6YCB5Z+65LqObmF0aXZlLWFwcOatpemqpOeahOivpue7huWPjemmiOS/oeaBr1xyXG50ZXN0d2EucmVwb25zZUNpZW50X3dlYnZpZXcgPSBmdW5jdGlvbihwYXJhbXMsZmlsZXBhdGgscmVzLHJlcSl7XHJcbiAgICB0aGlzLmdldFNjcmVlbnNob3RGcm9tUGF0aChyZXEsZmlsZXBhdGgsIHRlc3R3YXJlc3BvbnNlLlNlbmREYXRhV2VidmlldyhwYXJhbXMscmVzKSk7XHJcbn07XHJcblxyXG50ZXN0d2EuZ2V0dGVzdEFjdGlvbl9XZWJ2aWV3ID0gZnVuY3Rpb24ocmVxLHJlc3N0cixmaWxlcmVzcG9uc2VwYXRoKXtcclxuICAgIHZhciBhY3Rpb24gPSBudWxsO1xyXG4gICAgdmFyIHBhcmFtID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnBhY2thZ2VuYW1lID0gcmVxLmRldmljZS5hcHBQcm9jZXNzO1xyXG4gICAgdGhpcy5zZXNzaW9uaWQgPSByZXEuYXBwaXVtLnNlc3Npb25JZDtcclxuICAgIHRoaXMuZGV2aWNlaWQgPSByZXEuZGV2aWNlLmFkYi5jdXJEZXZpY2VJZDtcclxuICAgIHRoaXMudGVzdHN1aXQgPSByZXEuYXBwaXVtLmRlc2lyZWRDYXBhYmlsaXRpZXMudGVzdFN1aXQ7XHJcbiAgICB0aGlzLnRlc3RjYXNlaWQgPSByZXEuYXBwaXVtLmRlc2lyZWRDYXBhYmlsaXRpZXMudGVzdGNhc2VJZDtcclxuXHJcbiAgICB2YXIgbGVuID0gMDtcclxuICAgIGxlbiA9IHJlc3N0ci5sZW5ndGggLSAxO1xyXG4gICAgaWYocmVzc3RyW2xlbl0gPT09IFwidXJsXCIpe1xyXG4gICAgICAgIGFjdGlvbiA9IFwi6K6/6Zeu572R5Z2ALnVybFwiOy8v5p+l5om+XHJcbiAgICAgICAgb3BfYWx1ZSA9IHJlcS5ib2R5LnVybDtcclxuICAgICAgICBwYXJhbSA9IFwi6K6/6Zeu572R5Z2AOlwiICsgb3BfYWx1ZTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXNzdHJbbGVuXSA9PT0gXCJlbGVtZW50XCIpIHtcclxuICAgICAgICBhY3Rpb24gPSBcIuafpeaJvi5maW5kXCI7Ly/mn6Xmib5cclxuICAgICAgICBvcF9hbHVlID0gcmVxLmJvZHkudmFsdWU7XHJcbiAgICAgICAgcGFyYW0gPSBcIuafpeaJvuWFg+e0oDpcIiArIG9wX2FsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHJlc3N0cltsZW5dID09PSBcImltcGxpY2l0X3dhaXRcIil7XHJcbiAgICAgICAgYWN0aW9uID0gXCLorr/pl67nrYnlvoUud2FpdF9jb21wbGV0ZVwiOy8v5p+l5om+XHJcbiAgICAgICAgb3BfYWx1ZSA9IHJlcS5ib2R5Lm1zO1xyXG4gICAgICAgIHBhcmFtID0gXCLorr/pl67nrYnlvoXml7bplb86XCIgKyBvcF9hbHVlICtcIm1zXCI7XHJcblxyXG4gICAgICAgIHRoaXMucGFja2FnZW5hbWUgPSByZXEuZGV2aWNlLmFwcFByb2Nlc3M7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VpZCA9IHJlcS5kZXZpY2UuYWRiLmN1ckRldmljZUlkO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzc3RyW2xlbl0gPT09IFwiY2xpY2tcIikge1xyXG4gICAgICAgIGFjdGlvbiA9IFwi54K55Ye7LmNsaWNrXCI7Ly/ngrnlh7tcclxuICAgICAgICAvL2NvbnNvbGUubG9nKG9wX2FsdWUpO1xyXG4gICAgICAgIHBhcmFtID0gXCLngrnlh7vmjInpkq46XCIgKyBvcF9hbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzc3RyW2xlbl0gPT09IFwidmFsdWVcIikge1xyXG4gICAgICAgIGFjdGlvbiA9IFwi6L6T5YWlLnNldFZhbHVlXCI7Ly/ovpPlhaVcclxuICAgICAgICB2YXIgc3RyID0gcmVxLmJvZHkudmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHN0cik7XHJcbiAgICAgICAgdmFyIHJlZyA9IC8sL2c7XHJcbiAgICAgICAgdmFyIHJlc3N0cnRtcCA9IHN0ci5yZXBsYWNlKHJlZywgJycpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzc3RydG1wKTtcclxuICAgICAgICBwYXJhbSA9IFwi6L6T5YWl5YaF5a6577yaIFwiICsgcmVzc3RydG1wICsgXCLvvIzovpPlhaXmoYbvvJpcIiArIG9wX2FsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXNzdHJbbGVuXSA9PT0gXCJwZXJmb3JtXCIpIHtcclxuICAgICAgICBhY3Rpb24gPSBcIua7keWxjy5zd2lwZVwiOy8v5ruR5YqoXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXEuYm9keS5hY3Rpb25zWzBdLm9wdGlvbnMueCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXEuYm9keS5hY3Rpb25zWzBdLm9wdGlvbnMueSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXEuYm9keS5hY3Rpb25zWzFdKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlcS5ib2R5LmFjdGlvbnNbMl0ub3B0aW9ucy54KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlcS5ib2R5LmFjdGlvbnNbMl0ub3B0aW9ucy55KTtcclxuICAgICAgICBwYXJhbSA9IFwi5ruR5bGP77yac3dpcGUoc3RhcnRYOlwiICsgcmVxLmJvZHkuYWN0aW9uc1swXS5vcHRpb25zLnggKyBcIixzdGFydFk6XCIgKyByZXEuYm9keS5hY3Rpb25zWzBdLm9wdGlvbnMueSArIFwiLHN0YXJ0WDpcIiArIHJlcS5ib2R5LmFjdGlvbnNbMl0ub3B0aW9ucy54ICsgXCIsc3RhcnRZOlwiICsgcmVxLmJvZHkuYWN0aW9uc1syXS5vcHRpb25zLnkgKyBcIixtczpcIiArIHJlcS5ib2R5LmFjdGlvbnNbMV0ub3B0aW9ucy5tcyArIFwiKVwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzc3RyW2xlbl0gPT09IFwiYmFja1wiKSB7XHJcbiAgICAgICAgYWN0aW9uID0gXCLlm57pgIAuQmFja1wiOy8v5ruR5YqoXHJcbiAgICAgICAgcGFyYW0gPSBcIuWbnumAgC5wcmVzc0JhY2tcIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJlcS5kZXZpY2UuY29tbWFuZEFjdGlvbiA9PT0gXCJzaHV0ZG93blwiKSB7XHJcbiAgICAgICAgYWN0aW9uID0gXCLpgIDlh7ouUXVpdF9BcHBcIjsvL+a7keWKqFxyXG4gICAgICAgIHBhcmFtID0gXCLpgIDlh7rlupTnlKjvvJpcIiArIHRoaXMucGFja2FnZW5hbWU7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UGVyZm9ybWFuY2VfY2hyb21lKHJlcSx0aGlzLnBhY2thZ2VuYW1lKTtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5zdGF0dXMgPSAwO1xyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLnZhbHVlID0gdHJ1ZTtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5ydW50aW1lID0gMDtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5jcHVyYXRlID0gY3B1cmF0ZTtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5tZW1vcnkgPSBtZW1vcnlpbmZvO1xyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLnNlc3Npb25JZCA9IHRoaXMuc2Vzc2lvbmlkO1xyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLmRldmljZUlkID0gdGhpcy5kZXZpY2VpZDtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS50ZXN0U3VpdCA9IHRoaXMudGVzdHN1aXQ7XHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEudGVzdGNhc2VJZCA9IHRoaXMudGVzdGNhc2VpZDtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5zY3JlZW5zaG90UGF0aCA9IGZpbGVyZXNwb25zZXBhdGg7XHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEuY29tbWFuZCA9IHtcImFjdGlvblwiOiBhY3Rpb24sIFwicGFyYW1zXCI6IHBhcmFtfTtcclxuXHJcbiAgICAgICAgdmFyIHJlc0NsaWVudERhdGEgPSBfLmNsb25lKHRlc3REYXRhKTtcclxuICAgICAgICByZXR1cm4gcmVzQ2xpZW50RGF0YTtcclxuICAgIH1cclxuICAgIC8vZWxzZVxyXG4gICAgLy97XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXCIpO1xyXG4gICAgdGhpcy5nZXRQZXJmb3JtYW5jZV9jaHJvbWUocmVxLHRoaXMucGFja2FnZW5hbWUpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhtZW1vcnlpbmZvKTtcclxuICAgIC8vY29uc29sZS5sb2coY3B1cmF0ZSk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHJlcS5hcHBpdW0uc2Vzc2lvbklkKTtcclxuICAgIC8vY29uc29sZS5sb2cocmVxLmFwcGl1bS5kZXNpcmVkQ2FwYWJpbGl0aWVzLmRldmljZU5hbWUpO1xyXG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLmdldE1lbW9yeVVzZV9wcm8ocmVxLmFwcGl1bS5kZXNpcmVkQ2FwYWJpbGl0aWVzLmFwcFBhY2thZ2UpKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cIik7XHJcbiAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5zdGF0dXMgPSAwO1xyXG4gICAgdGVzdERhdGEudGVzdGRhdGEudmFsdWUgPSB0cnVlO1xyXG4gICAgdGVzdERhdGEudGVzdGRhdGEucnVudGltZSA9IDA7XHJcbiAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5jcHVyYXRlID0gY3B1cmF0ZTtcclxuICAgIHRlc3REYXRhLnRlc3RkYXRhLm1lbW9yeSA9IG1lbW9yeWluZm87XHJcbiAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5zZXNzaW9uSWQgPSByZXEuYXBwaXVtLnNlc3Npb25JZDtcclxuICAgIHRlc3REYXRhLnRlc3RkYXRhLmRldmljZUlkID0gdGhpcy5kZXZpY2VpZDtcclxuICAgIHRlc3REYXRhLnRlc3RkYXRhLnRlc3RTdWl0ID0gcmVxLmFwcGl1bS5kZXNpcmVkQ2FwYWJpbGl0aWVzLnRlc3RTdWl0O1xyXG4gICAgdGVzdERhdGEudGVzdGRhdGEudGVzdGNhc2VJZCA9IHJlcS5hcHBpdW0uZGVzaXJlZENhcGFiaWxpdGllcy50ZXN0Y2FzZUlkO1xyXG4gICAgdGVzdERhdGEudGVzdGRhdGEuc2NyZWVuc2hvdFBhdGggPSBmaWxlcmVzcG9uc2VwYXRoO1xyXG4gICAgdGVzdERhdGEudGVzdGRhdGEuY29tbWFuZCA9IHtcImFjdGlvblwiOiBhY3Rpb24sIFwicGFyYW1zXCI6IHBhcmFtfTtcclxuXHJcbiAgICB2YXIgcmVzQ2xpZW50RGF0YSA9IF8uY2xvbmUodGVzdERhdGEpO1xyXG4gICAgcmV0dXJuIHJlc0NsaWVudERhdGE7XHJcbiAgICAvL31cclxufTtcclxuXHJcbnRlc3R3YS5nZXRpT1N0ZXN0QWN0aW9uID0gZnVuY3Rpb24ocmVxLHJlc3N0cixmaWxlcmVzcG9uc2VwYXRoKXtcclxuICAgIHZhciBhY3Rpb24gPSBudWxsO1xyXG4gICAgdmFyIHBhcmFtID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnBhY2thZ2VuYW1lID0gIHJlcS5kZXZpY2UuYXBwUHJvY2VzcztcclxuICAgIHRoaXMuc2Vzc2lvbmlkID0gcmVxLmFwcGl1bS5zZXNzaW9uSWQ7XHJcbiAgICB0aGlzLnRlc3RzdWl0ID0gcmVxLmFwcGl1bS5kZXNpcmVkQ2FwYWJpbGl0aWVzLnRlc3RTdWl0O1xyXG4gICAgdGhpcy50ZXN0Y2FzZWlkID0gcmVxLmFwcGl1bS5kZXNpcmVkQ2FwYWJpbGl0aWVzLnRlc3RjYXNlSWQ7XHJcbiAgICBcclxuICAgIGlmIChyZXEuYXBwaXVtLmRlc2lyZWRDYXBhYmlsaXRpZXMudWRpZCl7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VpZCA9IHJlcS5hcHBpdW0uZGVzaXJlZENhcGFiaWxpdGllcy51ZGlkO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICB0aGlzLmRldmljZWlkID0gcmVxLmFwcGl1bS5kZXNpcmVkQ2FwYWJpbGl0aWVzLmRldmljZU5hbWU7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhcIj09PWRldmljZWlkOlwiK3RoaXMuZGV2aWNlaWQpO1xyXG4gICAgLy8gdmFyIHRpbWUgPSB2YWx1ZS50aW1lO1xyXG4gICAgLy8gdmFsdWUgPSB2YWx1ZS52YWx1ZTtcclxuICAgIFxyXG52YXIgbGVuID0gMDtcclxuICAgIGxlbiA9IHJlc3N0ci5sZW5ndGggLSAxO1xyXG4gICAgaWYgKHJlc3N0cltsZW5dID09PSBcImVsZW1lbnRcIikge1xyXG4gICAgICAgIGFjdGlvbiA9IFwi5p+l5om+LmZpbmRcIjsvL+afpeaJvlxyXG4gICAgICAgIG9wX2FsdWUgPSByZXEuYm9keS52YWx1ZTtcclxuICAgICAgICBwYXJhbSA9IFwi5p+l5om+5YWD57SgOlwiICsgb3BfYWx1ZTtcclxuICAgICAgICAvL+mAgOWHuuW6lOeUqOaJgOmcgOWPmOmHj1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVxLmRldmljZS5jb21tYW5kQWN0aW9uID09PSBcImNsaWNrXCIgJiYgcmVzc3RyW2xlbl0gPT09IFwicGVyZm9ybVwiKSB7XHJcbiAgICAgICAgYWN0aW9uID0gXCLngrnlh7suY2xpY2tcIjsvL+eCueWHu1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cob3BfYWx1ZSk7XHJcbiAgICAgICAgcGFyYW0gPSBcIueCueWHuzp0YXAoc3RhcnRYOlwiICsgcmVxLmRldmljZS5jb21tYW5kUGFyYW1zLngrXCIsc3RhcnRZOlwiK3JlcS5kZXZpY2UuY29tbWFuZFBhcmFtcy55K1wiKVwiO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVxLmRldmljZS5jb21tYW5kUGFyYW1zLngpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihyZXNzdHJbbGVuXSA9PT0gXCJwcmVzc19rZXljb2RlXCIpe1xyXG4gICAgICAgIGFjdGlvbiA9IFwi6ZSu55uY6L6T5YWlLlwiK3JlcS5kZXZpY2UuY29tbWFuZEFjdGlvbjsvL+eCueWHu1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cob3BfYWx1ZSk7XHJcbiAgICAgICAgcGFyYW0gPSBcIumUruebmOi+k+WFpTpwcmVzc0tleUNvZGUoXCIgKyByZXEuZGV2aWNlLmNvbW1hbmRQYXJhbXMua2V5Y29kZStcIixcIityZXEuZGV2aWNlLmNvbW1hbmRQYXJhbXMubWV0YXN0YXRlK1wiKVwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzc3RyW2xlbl0gPT09IFwiY2xpY2tcIikge1xyXG4gICAgICAgIGFjdGlvbiA9IFwi54K55Ye7LmNsaWNrXCI7Ly/ngrnlh7tcclxuICAgICAgICAvL2NvbnNvbGUubG9nKG9wX2FsdWUpO1xyXG4gICAgICAgIHBhcmFtID0gXCLngrnlh7vmjInpkq46XCIgKyBvcF9hbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVzc3RyW2xlbl0gPT09IFwidmFsdWVcIikge1xyXG4gICAgICAgIGFjdGlvbiA9IFwi6L6T5YWlLnNldFZhbHVlXCI7Ly/ovpPlhaVcclxuICAgICAgICB2YXIgc3RyID0gcmVxLmJvZHkudmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHN0cik7XHJcbiAgICAgICAgdmFyIHJlZyA9IC8sL2c7XHJcbiAgICAgICAgdmFyIHJlc3N0cnRtcCA9IHN0ci5yZXBsYWNlKHJlZywgJycpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzc3RydG1wKTtcclxuICAgICAgICBwYXJhbSA9IFwi6L6T5YWl5YaF5a6577yaIFwiICsgcmVzc3RydG1wICsgXCLvvIzovpPlhaXmoYbvvJpcIiArIG9wX2FsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXNzdHJbbGVuXSA9PT0gXCJwZXJmb3JtXCIgJiYgcmVxLmRldmljZS5jb21tYW5kQWN0aW9uICE9PSBcImNsaWNrXCIpIHtcclxuICAgICAgICBhY3Rpb24gPSBcIua7keWxjy5zd2lwZVwiOy8v5ruR5YqoXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVxLmRldmljZS5jb21tYW5kQWN0aW9uKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlcS5ib2R5LmFjdGlvbnNbMF0ub3B0aW9ucy54KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlcS5ib2R5LmFjdGlvbnNbMF0ub3B0aW9ucy55KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlcS5ib2R5LmFjdGlvbnNbMV0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVxLmJvZHkuYWN0aW9uc1syXS5vcHRpb25zLngpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVxLmJvZHkuYWN0aW9uc1syXS5vcHRpb25zLnkpO1xyXG4gICAgICAgIHBhcmFtID0gXCLmu5HlsY/vvJpzd2lwZShzdGFydFg6XCIgKyByZXEuYm9keS5hY3Rpb25zWzBdLm9wdGlvbnMueCArIFwiLHN0YXJ0WTpcIiArIHJlcS5ib2R5LmFjdGlvbnNbMF0ub3B0aW9ucy55ICsgXCIsc3RhcnRYOlwiICsgcmVxLmJvZHkuYWN0aW9uc1syXS5vcHRpb25zLnggKyBcIixzdGFydFk6XCIgKyByZXEuYm9keS5hY3Rpb25zWzJdLm9wdGlvbnMueSArIFwiLG1zOlwiICsgcmVxLmJvZHkuYWN0aW9uc1sxXS5vcHRpb25zLm1zICsgXCIpXCI7XHJcbiAgICAgICAgLy90aGlzLnBhY2thZ2VuYW1lID0gcmVxLmRldmljZS5hcHBQcm9jZXNzcztcclxuICAgICAgICAvL3RoaXMuc2Vzc2lvbmlkID0gcmVxLmFwcGl1bS5zZXNzaW9uSWQ7XHJcbiAgICAgICAgLy90aGlzLmRldmljZWlkID0gcmVxLmRldmljZS5hZGIuY3VyRGV2aWNlSWQ7XHJcbiAgICAgICAgLy90aGlzLnRlc3RzdWl0ID0gcmVxLmFwcGl1bS5kZXNpcmVkQ2FwYWJpbGl0aWVzLnRlc3RTdWl0O1xyXG4gICAgICAgIC8vdGhpcy50ZXN0Y2FzZWlkID0gcmVxLmFwcGl1bS5kZXNpcmVkQ2FwYWJpbGl0aWVzLnRlc3RjYXNlSWQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXNzdHJbbGVuXSA9PT0gXCJiYWNrXCIpIHtcclxuICAgICAgICBhY3Rpb24gPSBcIuWbnumAgC5CYWNrXCI7Ly/mu5HliqhcclxuICAgICAgICBwYXJhbSA9IFwi5Zue6YCALnByZXNzQmFja1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIHJlcS5kZXZpY2UuY29tbWFuZEFjdGlvbiA9PT0gXCJzaHV0ZG93blwiKSB7XHJcbiAgICAgICAgYWN0aW9uID0gXCLpgIDlh7ouUXVpdF9BcHBcIjsvL+a7keWKqFxyXG4gICAgICAgIHBhcmFtID0gXCLpgIDlh7rlupTnlKjvvJpcIiArIHRoaXMucGFja2FnZW5hbWU7XHJcblxyXG4gICAgICAgIC8vaWYocmVxLmRldmljZS5hcHBQcm9jZXNzID09PSBcImNvbS5hbmRyb2lkLmNocm9tZVwiKXtcclxuICAgICAgICAvLyAgICB0aGlzLmdldFBlcmZvcm1hbmNlX2Nocm9tZShyZXEuZGV2aWNlLmFwcFByb2Nlc3MpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHRoaXMuZ2V0UGVyZm9ybWFuY2UocmVxLmRldmljZS5hcHBQcm9jZXNzKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEuc3RhdHVzID0gMDtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS52YWx1ZSA9IHRydWU7XHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEucnVudGltZSA9IDA7XHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEuY3B1cmF0ZSA9IDA7XHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEubWVtb3J5ID0gMDtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5zZXNzaW9uSWQgPSB0aGlzLnNlc3Npb25pZDtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5kZXZpY2VJZCA9IHRoaXMuZGV2aWNlaWQ7XHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEudGVzdFN1aXQgPSB0aGlzLnRlc3RzdWl0O1xyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLnRlc3RjYXNlSWQgPSB0aGlzLnRlc3RjYXNlaWQ7XHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEuc2NyZWVuc2hvdFBhdGggPSBmaWxlcmVzcG9uc2VwYXRoO1xyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLmNvbW1hbmQgPSB7XCJhY3Rpb25cIjogYWN0aW9uLCBcInBhcmFtc1wiOiBwYXJhbX07XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRlc3REYXRhLnRlc3RkYXRhKTtcclxuICAgICAgICB2YXIgcmVzQ2xpZW50RGF0YSA9IF8uY2xvbmUodGVzdERhdGEpO1xyXG4gICAgICAgIHJldHVybiByZXNDbGllbnREYXRhO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVxLmRldmljZS5jb21tYW5kQWN0aW9uID09PSBcInNodXRkb3duX3dlYlwiKSB7XHJcbiAgICAgICAgYWN0aW9uID0gXCLlhbPpl63mtY/op4jlmaguQ2xvc2VfY2hyb21lXCI7Ly/mu5HliqhcclxuICAgICAgICBwYXJhbSA9IFwi5YWz6Zet5rWP6KeI5Zmo77yaIENsb3NlX2Nocm9tZVwiO1xyXG5cclxuICAgICAgICBpZihyZXEuZGV2aWNlLmFwcFByb2Nlc3MgPT09IFwiY29tLmFuZHJvaWQuY2hyb21lXCIpe1xyXG4gICAgICAgICAgICB0aGlzLmdldFBlcmZvcm1hbmNlX2Nocm9tZShyZXEscmVxLmRldmljZS5hcHBQcm9jZXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRQZXJmb3JtYW5jZShyZXEscmVxLmRldmljZS5hcHBQcm9jZXNzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEudmFsdWUgPSB0cnVlO1xyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLnJ1bnRpbWUgPSAwO1xyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLmNwdXJhdGUgPSBjcHVyYXRlO1xyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLm1lbW9yeSA9IG1lbW9yeWluZm87XHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEuc2Vzc2lvbklkID0gdGhpcy5zZXNzaW9uaWQ7XHJcbiAgICAgICAgdGVzdERhdGEudGVzdGRhdGEuZGV2aWNlSWQgPSB0aGlzLmRldmljZWlkO1xyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLnRlc3RTdWl0ID0gdGhpcy50ZXN0c3VpdDtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS50ZXN0Y2FzZUlkID0gdGhpcy50ZXN0Y2FzZWlkO1xyXG4gICAgICAgIHRlc3REYXRhLnRlc3RkYXRhLnNjcmVlbnNob3RQYXRoID0gZmlsZXJlc3BvbnNlcGF0aDtcclxuICAgICAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5jb21tYW5kID0ge1wiYWN0aW9uXCI6IGFjdGlvbiwgXCJwYXJhbXNcIjogcGFyYW19O1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0ZXN0RGF0YS50ZXN0ZGF0YSk7XHJcbiAgICAgICAgdmFyIHJlc0NsaWVudERhdGEgPSBfLmNsb25lKHRlc3REYXRhKTtcclxuICAgICAgICByZXR1cm4gcmVzQ2xpZW50RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5zdGF0dXMgPSAwO1xyXG4gICAgdGVzdERhdGEudGVzdGRhdGEudmFsdWUgPSB0cnVlO1xyXG4gICAgdGVzdERhdGEudGVzdGRhdGEucnVudGltZSA9IDA7XHJcbiAgICAvLyB0ZXN0RGF0YS50ZXN0ZGF0YS5jcHVyYXRlID0gY3B1cmF0ZTtcclxuICAgIC8vIHRlc3REYXRhLnRlc3RkYXRhLm1lbW9yeSA9IG1lbW9yeWluZm87XHJcbiAgICB0ZXN0RGF0YS50ZXN0ZGF0YS5zZXNzaW9uSWQgPSByZXEuYXBwaXVtLnNlc3Npb25JZDtcclxuICAgIHRlc3REYXRhLnRlc3RkYXRhLmRldmljZUlkID0gdGhpcy5kZXZpY2VpZDtcclxuICAgIHRlc3REYXRhLnRlc3RkYXRhLnRlc3RTdWl0ID0gcmVxLmFwcGl1bS5kZXNpcmVkQ2FwYWJpbGl0aWVzLnRlc3RTdWl0O1xyXG4gICAgdGVzdERhdGEudGVzdGRhdGEudGVzdGNhc2VJZCA9IHJlcS5hcHBpdW0uZGVzaXJlZENhcGFiaWxpdGllcy50ZXN0Y2FzZUlkO1xyXG4gICAgdGVzdERhdGEudGVzdGRhdGEuc2NyZWVuc2hvdFBhdGggPSBmaWxlcmVzcG9uc2VwYXRoO1xyXG4gICAgdGVzdERhdGEudGVzdGRhdGEuY29tbWFuZCA9IHtcImFjdGlvblwiOiBhY3Rpb24sIFwicGFyYW1zXCI6IHBhcmFtfTtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIj09PWRldmljZUlkXCIrdGhpcy5kZXZpY2VpZCk7XHJcbiAgICB2YXIgcmVzQ2xpZW50RGF0YSA9IF8uY2xvbmUodGVzdERhdGEpO1xyXG4gICAgcmV0dXJuIHJlc0NsaWVudERhdGE7XHJcbiAgICAvL31cclxufTtcclxuXHJcbnRlc3R3YS5oZWFydGJlYXQgPSBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgaWYgKGFyZ3Mud2FIZWFydGJlYXQpIHtcclxuICAgICAgICB2YXIgcmV0dXJuU3RhdHVzID0ge3N0YXR1czogMH07XHJcbiAgICAgICAgLy91c2UgdGVzdHdhRGV2aWNlSWQgaW5zdGVhZCBvZiB1ZGlkIGZvciBNQUNcclxuICAgICAgICBpZiAoYXJncy51ZGlkKSB7XHJcbiAgICAgICAgICAgIHRlc3R3YXJlc3BvbnNlLlNlbmRTdGFydFN0YXR1cyhyZXR1cm5TdGF0dXMsIGFyZ3MudWRpZCwgYXJncy50ZXN0Y2FzZWxvZ0lkLCBhcmdzLnBvcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGVzdHdhcmVzcG9uc2UuU2VuZFN0YXJ0U3RhdHVzKHJldHVyblN0YXR1cywgYXJncy50ZXN0d2FEZXZpY2VJZCwgYXJncy50ZXN0Y2FzZWxvZ0lkLCBhcmdzLnBvcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxudGVzdHdhLmhhbmRsZXIgPSBhc3luYyBmdW5jdGlvbiAoZHJpdmVyLHJlcSxodHRwU3RhdHVzLGh0dHBSZXNCb2R5LGNvbW1vbmQsanNvbk9iaikge1xyXG5cclxuICAgIGlmIChjb21tb25kICE9PSAnZGVsZXRlU2Vzc2lvbicpIHtcclxuICAgICAgICBpZiAoZHJpdmVyLnNlc3Npb25zW2h0dHBSZXNCb2R5LnNlc3Npb25JZF0uY29uc3RydWN0b3IubmFtZSA9PT0gJ0FuZHJvaWREcml2ZXInKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRlc3R3YS5nZXR0ZXN0QWN0aW9uKGRyaXZlciwgcmVxLCBodHRwU3RhdHVzLGh0dHBSZXNCb2R5LCBjb21tb25kLCBqc29uT2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG1zZyA9IHRlc3R3YS5nZXRpT1N0ZXN0QWN0aW9uKHJlcSwgcmVzc3RyLCBmaWxlcmVzcG9uc2VwYXRoKTtcclxuICAgICAgICAgICAgdmFyIHRpbWUgPSAwO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2VGb3JpT1MudGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGltZSA9IHJlc3BvbnNlRm9yaU9TLnRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbXNnLnRlc3RkYXRhLnJ1bnRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICBtc2cudGVzdGRhdGEuZGVzY3JpcHRpb24gPSByZXNwb25zZS52YWx1ZS5tZXNzYWdlO1xyXG4gICAgICAgICAgICBtc2cudGVzdGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9kZWxldGVTZXNzaW9uXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybjtcclxufVxyXG5cclxuLy9BbmRyb2lkIGRyaXZlclxyXG50ZXN0d2EuZ2V0dGVzdEFjdGlvbiA9IGFzeW5jIGZ1bmN0aW9uKGRyaXZlcixyZXEsaHR0cFN0YXR1cyxodHRwUmVzQm9keSxjb21tb25kLGpzb25PYmope1xyXG4gICAgbGV0IGFuZHJvaWREcml2ZXIgPSBkcml2ZXIuc2Vzc2lvbnNbaHR0cFJlc0JvZHkuc2Vzc2lvbklkXTtcclxuICAgIGxldCBjYXBzID0gYW5kcm9pZERyaXZlci5jYXBzO1xyXG4gICAgbGV0IGFyZ3MgPSBkcml2ZXIuYXJncztcclxuICAgIGxldCBhY3Rpb24gPSBjb21tb25kO1xyXG4gICAgbGV0IHBhcmFtID0ganNvbk9iai52YWx1ZTtcclxuXHJcbiAgICBsZXQgW21lbW9yeUluZm8sY3B1UmF0ZV0gPSBhd2FpdCB0aGlzLmdldFBlcmZvcm1hbmNlKGFuZHJvaWREcml2ZXIsaHR0cFJlc0JvZHkpO1xyXG5cclxuICAgIGxldCB0ZXN0RGF0YVJlcGx5ID0gXy5jbG9uZSh0ZXN0RGF0YSk7XHJcbiAgICB0ZXN0RGF0YVJlcGx5LnRlc3RkYXRhLnN0YXR1cyA9IDA7XHJcbiAgICB0ZXN0RGF0YVJlcGx5LnRlc3RkYXRhLnZhbHVlID0gaHR0cFJlc0JvZHkudmFsdWU7XHJcbiAgICB0ZXN0RGF0YVJlcGx5LnRlc3RkYXRhLnJ1bnRpbWUgPSAwO1xyXG4gICAgdGVzdERhdGFSZXBseS50ZXN0ZGF0YS5jcHVyYXRlID0gY3B1UmF0ZSA/IGNwdVJhdGU6XCIwXCI7XHJcbiAgICB0ZXN0RGF0YVJlcGx5LnRlc3RkYXRhLm1lbW9yeSA9IG1lbW9yeUluZm8gPyBtZW1vcnlJbmZvOlwiMFwiO1xyXG4gICAgdGVzdERhdGFSZXBseS50ZXN0ZGF0YS5zZXNzaW9uSWQgPSBodHRwUmVzQm9keS5zZXNzaW9uSWQ7XHJcbiAgICB0ZXN0RGF0YVJlcGx5LnRlc3RkYXRhLmRldmljZUlkID0gYXJncyA/IGFyZ3MuZGV2aWNlTmFtZSA6IFwiXCI7XHJcbiAgICB0ZXN0RGF0YVJlcGx5LnRlc3RkYXRhLnRlc3RTdWl0ID0gYXJncyA/IGFyZ3MudGVzdFN1aXQgOiBcIlwiO1xyXG4gICAgdGVzdERhdGFSZXBseS50ZXN0ZGF0YS50ZXN0Y2FzZUlkID0gYXJncyA/IGFyZ3MudGVzdGNhc2VJZCA6IFwiXCI7XHJcbiAgICB0ZXN0RGF0YVJlcGx5LnRlc3RkYXRhLmNvbW1hbmQgPSB7XCJhY3Rpb25cIjogYWN0aW9uLCBcInBhcmFtc1wiOiBwYXJhbX07XHJcbiAgICB0ZXN0RGF0YVJlcGx5LnRlc3RkYXRhLnNjcmVlbnNob3RQYXRoID0gYXJncyA/IGFyZ3Muc2NyZWVuc2hvdFBhdGggOiBcIlwiO1xyXG5cclxuICAgIGxldCBteURhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGVuZFRpbWUgPSBteURhdGUuZ2V0VGltZSgpO1xyXG4gICAgdGVzdERhdGFSZXBseS5ydW50aW1lID0gZW5kVGltZSAtIHJlcS5fc3RhcnRUaW1lLmdldFRpbWUoKTtcclxuICAgIHRlc3REYXRhUmVwbHkuc3RhdHVzID0gaHR0cFJlc0JvZHkuc3RhdHVzO1xyXG4gICAgdGVzdERhdGFSZXBseS5kZXNjcmlwdGlvbiA9IGh0dHBSZXNCb2R5LnZhbHVlLm1lc3NhZ2U7XHJcblxyXG4gICAgbGV0IHNjcmVlbnNob3RQYXRoID0gYXJncyA/IGFyZ3Muc2NyZWVuc2hvdFBhdGg6XCJcIjtcclxuICAgIGxldCB0ZW1wUG5nID0gc2NyZWVuc2hvdFBhdGgrZW5kVGltZStcIi5wbmdcIjtcclxuICAgIGF3YWl0IHRlc3R3YS5nZXRTY3JlZW5zaG90QW5kcm9pZChhbmRyb2lkRHJpdmVyLHRlbXBQbmcpO1xyXG4gICAgdGVzdHdhcmVzcG9uc2UuU2VuZERhdGFOYXRpdmVBcHAodGVzdERhdGFSZXBseS50ZXN0ZGF0YSlcclxufTtcclxuXHJcbi8vZ2V0IG1lbW9yeWluZm8gYW5kIGNwdXJhdGVcclxudGVzdHdhLmdldFBlcmZvcm1hbmNlID0gYXN5bmMgZnVuY3Rpb24gKGFuZHJvaWREcml2ZXIsaHR0cFJlc0JvZHkpIHtcclxuICAgIGxvZ2dlci5kZWJ1ZyhcIkdldHRpbmcgZGV2aWNlIG1lbWVvcnkgYW5kIGNwdSBjb3N0IVwiKTtcclxuICAgIGxldCBhZGIgPSBhbmRyb2lkRHJpdmVyLmFkYjtcclxuICAgIGxldCBjYXBzID0gYW5kcm9pZERyaXZlci5jYXBzO1xyXG4gICAgbGV0IGFwcE5hbWUgPSBjYXBzLmFwcFBhY2thZ2U7XHJcbiAgICBsZXQgb3V0ID0gYXdhaXQgYWRiLnNoZWxsKFwidG9wIC1uIDEgLWQgMC41IHwgZ3JlcCBcIithcHBOYW1lKTtcclxuICAgIGxldCByZWdfTUVNID0gL1swLTldezEsOX0oW0tdKS9nO1xyXG4gICAgbGV0IHJlZ19DUFUgPSAvWzAtOV17MSwyfShbJV0pL2c7XHJcbiAgICBsZXQgbWVtYXJyYXkgID0gb3V0Lm1hdGNoKHJlZ19NRU0pO1xyXG4gICAgbGV0IHRtcGNwdXJhdGUgID0gb3V0Lm1hdGNoKHJlZ19DUFUpO1xyXG4gICAgbGV0IG1lbW9yeWluZm8gPSBtZW1hcnJheVsxXTtcclxuICAgIG1lbW9yeWluZm8gPSBtZW1vcnlpbmZvLnJlcGxhY2UoJ0snLCcnKTtcclxuICAgIGxldCBjcHVyYXRlID0gdG1wY3B1cmF0ZVswXTtcclxuICAgIGNwdXJhdGUgPSBjcHVyYXRlLnJlcGxhY2UoJyUnLCcnKTtcclxuICAgIHJldHVybiBbbWVtb3J5aW5mbyxjcHVyYXRlXTtcclxufTtcclxuXHJcbi8v5Y+R6YCB5Z+65LqObmF0aXZlLWFwcOatpemqpOeahOivpue7huWPjemmiOS/oeaBr1xyXG50ZXN0d2EucmVwb25zZUNpZW50X25hdGl2ZSA9IGZ1bmN0aW9uKHBhcmFtcyxmaWxlcGF0aCx0aW1lU3RyLHJlc3BvbnNlLHJlcyxyZXEpe1xyXG5cclxuICAgIGlmIChyZXEuZGV2aWNlLmNvbW1hbmRBY3Rpb24gIT0gXCJzaHV0ZG93blwiKXtcclxuICAgICAgICAvLyB0aGlzLmdldFNjcmVlbnNob3RGcm9tUGF0aChyZXEsZmlsZXBhdGgsIHRlc3R3YXJlc3BvbnNlLlNlbmREYXRhTmF0aXZlQXBwKHBhcmFtcyxyZXNwb25zZSxyZXMscmVxKSk7XHJcblxyXG4gICAgICAgIC8vYWRkIGlmIHRvIHN1cHBvcnQgaU9TXHJcbiAgICAgICAgaWYgKHJlcS5kZXZpY2UuYWRiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0U2NyZWVuc2hvdEZyb21QYXRoKHJlcSxmaWxlcGF0aCwgdGVzdHdhcmVzcG9uc2UuU2VuZERhdGFOYXRpdmVBcHAocGFyYW1zLHJlc3BvbnNlLHJlcyxyZXEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChyZXEuZGV2aWNlLmFyZ3MucGxhdGZvcm1OYW1lID09IFwiaU9TXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09cmVwb3J0Q2xpZW50IGlPU1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciBhcnIgPSBmaWxlcGF0aC5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZW5hbWUgPSBhcnJbYXJyLmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgICAgIHJlcS5kZXZpY2UuZ2V0aU9TU2NyZWVuc2hvdEZyb21QYXRoKHJlcSxmaWxlcGF0aCx0aW1lU3RyLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlc3R3YXJlc3BvbnNlLlNlbmREYXRhTmF0aXZlQXBwKHBhcmFtcyxyZXNwb25zZSxyZXMscmVxKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgdGVzdHdhcmVzcG9uc2UuU2VuZERhdGFOYXRpdmVBcHAocGFyYW1zLHJlc3BvbnNlLHJlcyxyZXEpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudGVzdHdhLmdldFNjcmVlbnNob3RBbmRyb2lkID0gYXN5bmMgZnVuY3Rpb24gKGFuZHJvaWREcml2ZXIsIHRlbXBQbmcpIHtcclxuICAgIGxldCBiNjRTdHIgPSBhd2FpdCBhbmRyb2lkRHJpdmVyLmdldFNjcmVlbnNob3QoKTtcclxuICAgIC8vIGF3YWl0IGZzLndyaXRlRmlsZSh0ZW1wUG5nLGI2NFN0ciwnYmFzZTY0Jyk7XHJcbiAgICAvLyByZXR1cm47XHJcbiAgICBjb25zdCBwbmcgPSAnL2RhdGEvbG9jYWwvdG1wL3NjcmVlbnNob3QucG5nJztcclxuICAgIGxldCBjbWQgPSAgWycvc3lzdGVtL2Jpbi9ybScsIGAke3BuZ307YCwgJy9zeXN0ZW0vYmluL3NjcmVlbmNhcCcsICctcCcsIHBuZ107XHJcbiAgICBhd2FpdCBhbmRyb2lkRHJpdmVyLmFkYi5zaGVsbChjbWQpO1xyXG4gICAgaWYgKGF3YWl0IGZzLmV4aXN0cyh0ZW1wUG5nKSkge1xyXG4gICAgICAgIGF3YWl0IGZzLnVubGluayh0ZW1wUG5nKTtcclxuICAgIH1cclxuICAgIGF3YWl0IGFuZHJvaWREcml2ZXIuYWRiLnB1bGwocG5nLCB0ZW1wUG5nKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0ZXN0d2E7Il19