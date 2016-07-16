"use strict";

var http = require('http')
    ,querystring = require('querystring');

var logger = require('appium-logger');
logger = logger.getLogger('Appium');
var testwaServer = {};

var host ='localhost';
var port = 8008;
var path = '/attp/client';


testwaServer.SendDataNativeApp =  function(datas,response,res,req){

    //datas = {"status":0,"value":true,"runtime":1133,"cpurate":"0.0267639902676399","memory":"107556","sessionId":"267639902676399","deviceId":"6CY4266BJ3","testSuit":"115","testcaseId":"14","screenshotPath":"1449916262541.png","command":{"action":"element:install_app","params":{"elementId":"1"}}};
    var content = JSON.stringify(datas);
    var options = {
        host: host,
        port: port,
        path: path,
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length
        }
    };
    var req_testwa = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(data) {
            console.log(" waHeart beating!");
        });
    });

    req_testwa.write(content);
    req_testwa.end();
};


testwaServer.SendStartStatus =  function(datas, deviceid, testcaselogId, testwaport, res){
    var start_path = path + '/' + deviceid + '/' + testcaselogId + '/' + testwaport;
    logger.info("===start_path: "+start_path);
    var content = JSON.stringify(datas);
    var options = {
        host: host,
        port: port,
        path: start_path,
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length
        }
    };
    var req_testwa = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(data) {
            logger.info("waHeart beating!");
        });
    });

    req_testwa.write(content);
    req_testwa.end();
};

testwaServer.SendDataWebview =  function(datas,res){

    var content = JSON.stringify(datas);
    var options = {
        host: host,
        port: port,
        path: path,
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length
        }
    };
    var req_testwa = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(data) {
            console.log("test webview case is ok!");
        });
    });

    req_testwa.write(content);
    req_testwa.end();
};

module.exports = testwaServer;