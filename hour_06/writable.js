"use strict";

var fs = require('fs');

var wstream = fs.createWriteStream ('readme.txt');

var count = 1000;

while (count > 0) {
    wstream.write(count + ' \n');
    count -= 1;
}

wstream.end('');

wstream.on('end', function(){
    wstream.close();
})