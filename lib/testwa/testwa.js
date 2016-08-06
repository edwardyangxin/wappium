#!/usr/bin/env node
// transpile:testwa

import { getLogger } from 'appium-logger';

let logger = getLogger("TestWa");

let  fs = require('fs')
    , temp = require('temp')
    , path = require('path')
    , _ = require('underscore')
    ,testwaresponse = require('./middleware.js')
    ,testData = require('./testcasedata.js')
    ,async = require('async')
    ,querystring = require("querystring");//testwa

let testwa = {};
let screenIndex=0;
let op_alue = "";
let memoryinfo = "0";
let cpurate = "0";
let packagename = "";
let sessionid = "";
let testsuit = "";
let testcaseid = "";
let deviceid = "";

//检测bootstrap是否已经安装在设备上
testwa.checkAppiumBootstrap = function(req){
    var myadb = req.device.adb;
    logger.debug("check testwa bootstrap if installed!");
    myadb.shell("pm list package |grep io.appium.settings", function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            var checkstring  = stdout.toString();
            //console.log("==================checkAppiumBootstrap true====================");
            //console.log( stdout.toString());
            if(checkstring.length > 0){
                // console.log("==================checkAppiumBootstrap true====================");
                return 1;
            }
            return 0;
        }
    });
};

//检测输入法是否安装
testwa.checkUnicodeIME = function(req){
    var myadb = req.device.adb;
    logger.debug("check testwa unicodeime if installed!");
    myadb.shell("pm list package |grep io.appium.android.ime", function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            var checkstring  = stdout.toString();
            //console.log("==================checkUnicodeIME true====================");
            //console.log( stdout.toString());
            if(checkstring.length >0){
                // console.log("==================checkUnicodeIME true====================");
                return 1;
            }
            return 0;
        }
    });
};

testwa.checkUnlockAPP = function(req){
    var myadb = req.device.adb;
    logger.debug("check testwa unlock if installed!");
    myadb.shell("pm list package |grep io.appium.unlock", function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            var checkstring  = stdout.toString();
            //console.log("==================checkUnlockAPP true====================");
            //console.log( stdout.toString());
            if(checkstring.length >0){
                // console.log("==================checkUnlockAPP true====================");
                return 1;
            }
            return 0;
        }
    });
};

testwa.getScreenshotFromPath = function(req,filepath,cb) {
    var myadb = req.device.adb;
    var localfile = temp.path({
        prefix: 'appium',
        suffix: '.png'
    });
    var b64data = "";
    var filetest = filepath;
    var devcieScreenPath="/data/local/tmp/";
    if(screenIndex>=5)
        screenIndex=0;
    devcieScreenPath=devcieScreenPath+"screenshot"+screenIndex+".png";
    async.series([
        function(cb) {

            var cmd = ['"/system/bin/rm', devcieScreenPath + ';', '/system/bin/screencap -p',
                devcieScreenPath, '"'
            ].join(' ');
            myadb.shell(cmd, cb);
            //console.log("$$$$androidController.getScreenshotFromPath 1");
            screenIndex=screenIndex+1;
        }.bind(this),
        function(cb) {
            if (fs.existsSync(filetest)) fs.unlinkSync(filetest);
            myadb.pull(devcieScreenPath, filetest, cb);
            //console.log("$$$$androidController.getScreenshotFromPath 2");
        }.bind(this),
        function(cb) {
            fs.readFile(localfile, function(err, data) {
                if (err) return cb(err);
                b64data = new Buffer(data).toString('base64');
                cb();
            });
            //console.log("$$$$androidController.getScreenshotFromPath 3");
        },
        function(cb) {
            fs.unlink(localfile, function(err) {
                if (err) return cb(err);
                cb();
                //console.log("$$$$androidController.getScreenshotFromPath error");
            });
            //console.log("$$$$androidController.getScreenshotFromPath 4");
        }
    ]);
};

testwa.getPerformance_chrome = function (req,appPackage) {
    var myadb = req.device.adb;
    logger.debug("Getting device memeory data performance!");
    myadb.shell("top -n 1 -d 1|grep -v "+appPackage+":|grep "+appPackage, function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            //var total =  stdout.substring(stdout.indexOf("TOTAL")).replace(/\s+/ig, " ");
            var reg_MEM = /[0-9]{1,9}([K])/g;
            var reg_CPU = /[0-9]{1,2}([%])/g;
            var memarray  = stdout.match(reg_MEM);
            var tmpcpurate  = stdout.match(reg_CPU);
            if(memarray == null ){
                memoryinfo = "0";
            }
            else
            {
                memoryinfo = memarray[1];
                memoryinfo = memoryinfo.replace('K','');
            }
            if(tmpcpurate == null ){
                cpurate = "0";
            }
            else
            {
                cpurate = cpurate.replace('%','');
            }
            var data = {mem:memoryinfo,cpu:cpurate};
            return data;
        }
    });
};

testwa.getMemoryUse = function (req,appPackage) {
    var myadb = req.device.adb;
    logger.debug("Getting device memeory data performance!");
    myadb.shell("top -n 1 -d 0.5 |grep "+appPackage, function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            //var total =  stdout.substring(stdout.indexOf("TOTAL")).replace(/\s+/ig, " ");
            var reg = /[0-9]{1,9}([K])/g;
            var memarray  = stdout.match(reg);
            memoryinfo = memarray[1];
            memoryinfo = memoryinfo.replace('K','');
            return memoryinfo[1];
        }
    });
};

testwa.getCPUUse = function (req,appPackage) {
    var myadb = req.device.adb;
    logger.debug("Getting device data about testing app process!");
    myadb.shell("top -n 1 -d 0.5|grep "+appPackage, function (err, stdout) {
        if (err) {
            logger.warn(err);
            return '';
        } else {
            var reg = /[0-9]{1,2}([%])/g;
            var tmpcpurate  = stdout.match(reg);
            cpurate = tmpcpurate[0];
            // console.log("=============%==================");
            console.log(cpurate);
            cpurate = cpurate.replace('%','');
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
            myadb.shell("logcat | grep "+appPackage, function (err, stdout) {
                return stdout.toString();
            });
        }
    });
};

//单独搜集每一步的内存信息
testwa.collectMem = function(paramsmem){
    testwaresponse.SendData(paramsmem,cb);
};

//发送基于native-app步骤的详细反馈信息
testwa.reponseCient_webview = function(params,filepath,res,req){
    this.getScreenshotFromPath(req,filepath, testwaresponse.SendDataWebview(params,res));
};

testwa.gettestAction_Webview = function(req,resstr,fileresponsepath){
    var action = null;
    var param = null;

    this.packagename = req.device.appProcess;
    this.sessionid = req.appium.sessionId;
    this.deviceid = req.device.adb.curDeviceId;
    this.testsuit = req.appium.desiredCapabilities.testSuit;
    this.testcaseid = req.appium.desiredCapabilities.testcaseId;

    var len = 0;
    len = resstr.length - 1;
    if(resstr[len] === "url"){
        action = "访问网址.url";//查找
        op_alue = req.body.url;
        param = "访问网址:" + op_alue;

    }
    else if (resstr[len] === "element") {
        action = "查找.find";//查找
        op_alue = req.body.value;
        param = "查找元素:" + op_alue;
    }
    else if(resstr[len] === "implicit_wait"){
        action = "访问等待.wait_complete";//查找
        op_alue = req.body.ms;
        param = "访问等待时长:" + op_alue +"ms";

        this.packagename = req.device.appProcess;
        this.deviceid = req.device.adb.curDeviceId;
    }
    else if (resstr[len] === "click") {
        action = "点击.click";//点击
        //console.log(op_alue);
        param = "点击按钮:" + op_alue;
    }
    else if (resstr[len] === "value") {
        action = "输入.setValue";//输入
        var str = req.body.value.toString();
        //console.log(str);
        var reg = /,/g;
        var resstrtmp = str.replace(reg, '');
        //console.log(resstrtmp);
        param = "输入内容： " + resstrtmp + "，输入框：" + op_alue;
    }
    else if (resstr[len] === "perform") {
        action = "滑屏.swipe";//滑动
        //console.log(req.body.actions[0].options.x);
        //console.log(req.body.actions[0].options.y);
        //console.log(req.body.actions[1]);
        //console.log(req.body.actions[2].options.x);
        //console.log(req.body.actions[2].options.y);
        param = "滑屏：swipe(startX:" + req.body.actions[0].options.x + ",startY:" + req.body.actions[0].options.y + ",startX:" + req.body.actions[2].options.x + ",startY:" + req.body.actions[2].options.y + ",ms:" + req.body.actions[1].options.ms + ")";
    }
    else if (resstr[len] === "back") {
        action = "回退.Back";//滑动
        param = "回退.pressBack";
    }
    else if (req.device.commandAction === "shutdown") {
        action = "退出.Quit_App";//滑动
        param = "退出应用：" + this.packagename;

        this.getPerformance_chrome(req,this.packagename);
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
        testData.testdata.command = {"action": action, "params": param};

        var resClientData = _.clone(testData);
        return resClientData;
    }
    //else
    //{
    // console.log("//////////////////////////////////////////////////////////////");
    this.getPerformance_chrome(req,this.packagename);
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
    testData.testdata.command = {"action": action, "params": param};

    var resClientData = _.clone(testData);
    return resClientData;
    //}
};

testwa.getiOStestAction = function(req,resstr,fileresponsepath){
    var action = null;
    var param = null;

    this.packagename =  req.device.appProcess;
    this.sessionid = req.appium.sessionId;
    this.testsuit = req.appium.desiredCapabilities.testSuit;
    this.testcaseid = req.appium.desiredCapabilities.testcaseId;
    
    if (req.appium.desiredCapabilities.udid){
        this.deviceid = req.appium.desiredCapabilities.udid;
    }
    else{
        this.deviceid = req.appium.desiredCapabilities.deviceName;
    }
    console.log("===deviceid:"+this.deviceid);
    // var time = value.time;
    // value = value.value;
    
var len = 0;
    len = resstr.length - 1;
    if (resstr[len] === "element") {
        action = "查找.find";//查找
        op_alue = req.body.value;
        param = "查找元素:" + op_alue;
        //退出应用所需变量
    }
    else if (req.device.commandAction === "click" && resstr[len] === "perform") {
        action = "点击.click";//点击
        //console.log(op_alue);
        param = "点击:tap(startX:" + req.device.commandParams.x+",startY:"+req.device.commandParams.y+")";
        //console.log("==============================================");
        //console.log(req.device.commandParams.x);
    }
    else if(resstr[len] === "press_keycode"){
        action = "键盘输入."+req.device.commandAction;//点击
        //console.log(op_alue);
        param = "键盘输入:pressKeyCode(" + req.device.commandParams.keycode+","+req.device.commandParams.metastate+")";
    }
    else if (resstr[len] === "click") {
        action = "点击.click";//点击
        //console.log(op_alue);
        param = "点击按钮:" + op_alue;
    }
    else if (resstr[len] === "value") {
        action = "输入.setValue";//输入
        var str = req.body.value.toString();
        //console.log(str);
        var reg = /,/g;
        var resstrtmp = str.replace(reg, '');
        //console.log(resstrtmp);
        param = "输入内容： " + resstrtmp + "，输入框：" + op_alue;
    }
    else if (resstr[len] === "perform" && req.device.commandAction !== "click") {
        action = "滑屏.swipe";//滑动
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
    }
    else if (resstr[len] === "back") {
        action = "回退.Back";//滑动
        param = "回退.pressBack";
    }
    else if ( req.device.commandAction === "shutdown") {
        action = "退出.Quit_App";//滑动
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
        testData.testdata.command = {"action": action, "params": param};

        console.log(testData.testdata);
        var resClientData = _.clone(testData);
        return resClientData;
    }
    else if (req.device.commandAction === "shutdown_web") {
        action = "关闭浏览器.Close_chrome";//滑动
        param = "关闭浏览器： Close_chrome";

        if(req.device.appProcess === "com.android.chrome"){
            this.getPerformance_chrome(req,req.device.appProcess);
        }
        else
        {
            this.getPerformance(req,req.device.appProcess);
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
        testData.testdata.command = {"action": action, "params": param};

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
    testData.testdata.command = {"action": action, "params": param};

    // console.log("===deviceId"+this.deviceid);
    var resClientData = _.clone(testData);
    return resClientData;
    //}
};

testwa.heartbeat = function (args) {
    if (args.waHeartbeat) {
        var returnStatus = {status: 0};
        //use testwaDeviceId instead of udid for MAC
        if (args.udid) {
            testwaresponse.SendStartStatus(returnStatus, args.udid, args.testcaselogId, args.port);
        }
        else {
            testwaresponse.SendStartStatus(returnStatus, args.testwaDeviceId, args.testcaselogId, args.port);
        }
    }
}

testwa.handler = async function (driver,req,httpStatus,httpResBody,commond,jsonObj) {

    if (commond !== 'deleteSession') {
        if (driver.sessions[httpResBody.sessionId].constructor.name === 'AndroidDriver') {
            await testwa.gettestAction(driver, req, httpStatus,httpResBody, commond, jsonObj);
        }
        else {
            msg = testwa.getiOStestAction(req, resstr, fileresponsepath);
            var time = 0;
            if (responseForiOS.time) {
                time = responseForiOS.time;
            }
            msg.testdata.runtime = time;
            msg.testdata.description = response.value.message;
            msg.testdata.status = response.status;
        }
    } else {
        //deleteSession
    }


    return;
}

//Android driver
testwa.gettestAction = async function(driver,req,httpStatus,httpResBody,commond,jsonObj){
    let androidDriver = driver.sessions[httpResBody.sessionId];
    let caps = androidDriver.caps;
    let args = driver.args;
    let action = commond;
    let param = jsonObj.value;

    let [memoryInfo,cpuRate] = await this.getPerformance(androidDriver,httpResBody);

    let testDataReply = _.clone(testData);
    testDataReply.testdata.status = 0;
    testDataReply.testdata.value = httpResBody.value;
    testDataReply.testdata.runtime = 0;
    testDataReply.testdata.cpurate = cpuRate ? cpuRate:"0";
    testDataReply.testdata.memory = memoryInfo ? memoryInfo:"0";
    testDataReply.testdata.sessionId = httpResBody.sessionId;
    testDataReply.testdata.deviceId = args ? args.deviceName : "";
    testDataReply.testdata.testSuit = args ? args.testSuit : "";
    testDataReply.testdata.testcaseId = args ? args.testcaseId : "";
    testDataReply.testdata.command = {"action": action, "params": param};
    testDataReply.testdata.screenshotPath = args ? args.screenshotPath : "";

    let myDate = new Date();
    let endTime = myDate.getTime();
    testDataReply.runtime = endTime - req._startTime.getTime();
    testDataReply.status = httpResBody.status;
    testDataReply.description = httpResBody.value.message;

    let screenshotPath = args ? args.screenshotPath:"";
    let tempPng = screenshotPath+endTime+".png";
    await testwa.getScreenshotAndroid(androidDriver,tempPng);
    testwaresponse.SendDataNativeApp(testDataReply.testdata)
};

//get memoryinfo and cpurate
testwa.getPerformance = async function (androidDriver,httpResBody) {
    logger.debug("Getting device memeory and cpu cost!");
    let adb = androidDriver.adb;
    let caps = androidDriver.caps;
    let appName = caps.appPackage;
    let out = await adb.shell("top -n 1 -d 0.5 | grep "+appName);
    let reg_MEM = /[0-9]{1,9}([K])/g;
    let reg_CPU = /[0-9]{1,2}([%])/g;
    let memarray  = out.match(reg_MEM);
    let tmpcpurate  = out.match(reg_CPU);
    let memoryinfo = memarray[1];
    memoryinfo = memoryinfo.replace('K','');
    let cpurate = tmpcpurate[0];
    cpurate = cpurate.replace('%','');
    return [memoryinfo,cpurate];
};

//发送基于native-app步骤的详细反馈信息
testwa.reponseCient_native = function(params,filepath,timeStr,response,res,req){

    if (req.device.commandAction != "shutdown"){
        // this.getScreenshotFromPath(req,filepath, testwaresponse.SendDataNativeApp(params,response,res,req));

        //add if to support iOS
        if (req.device.adb) {
            this.getScreenshotFromPath(req,filepath, testwaresponse.SendDataNativeApp(params,response,res,req));
        }
        else {
            if (req.device.args.platformName == "iOS") {
                console.log("===reportClient iOS");
                var arr = filepath.split("/");
                var filename = arr[arr.length-1];
                req.device.getiOSScreenshotFromPath(req,filepath,timeStr, function(){
                    testwaresponse.SendDataNativeApp(params,response,res,req);
                });
            }
        }

    }
    else{
        testwaresponse.SendDataNativeApp(params,response,res,req);
    }
};

testwa.getScreenshotAndroid = async function (androidDriver, tempPng) {
    let b64Str = await androidDriver.getScreenshot();
    // await fs.writeFile(tempPng,b64Str,'base64');
    // return;
    const png = '/data/local/tmp/screenshot.png';
    let cmd =  ['/system/bin/rm', `${png};`, '/system/bin/screencap', '-p', png];
    await androidDriver.adb.shell(cmd);
    if (await fs.exists(tempPng)) {
        await fs.unlink(tempPng);
    }
    await androidDriver.adb.pull(png, tempPng);
}

module.exports = testwa;