"use strict";

var fs = require("fs");

new BufferedReader ("./readme.txt", { encoding: "utf8" })
    .on ("error", function (error){
        console.log ("error: " + error);
    })
    .on ("line", function (line){
        console.log ("line: " + line);
    })
    .on ("end", function (){
        console.log ("EOF");
    })
    .read ();
