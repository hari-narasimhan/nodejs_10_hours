var exec = require("child_process").exec;

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

function home() {
    console.log("Request Handler 'start' was called");
    sleep(10000);
    return "hello Start @ " + new Date();
}

function upload() {
    console.log("Request Handler 'upload' was called");
    return "hello Upload";
}

function ls() {
    var content = "empty";
    exec("ls -lah", function (error, stdout/*,stderr*/) { 
        content = stdout;
    });

    return content;
}

exports.home = home;
exports.upload = upload;
exports.ls = ls;
