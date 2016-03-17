"use strict";

var fs = require('fs');

try {
    var rstream = fs.createReadStream('./readme.txt');

    rstream.on('readable', function() {
        console.log('readable ', rstream.read());
    });

    rstream.on('end', function(){
        console.log('end');
    });

    // Uncomment and see what happens

    // rstream.on('data', function(data){
    //    console.log("data ::" + data);
    // })

}
catch (e) {
    console.log('Error occured ' + e);
}