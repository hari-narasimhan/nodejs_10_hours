"use strict";
var fs = require('fs');
var wstream = fs.createWriteStream ('large.txt', {flags: 'a'});


function writeLarge ( writer, data, encoding, callback ) {
    var i = 1000000;

    write();

    function write() {
        var ok = true;

        do {

            i -= 1;

            if(i === 0) {
                // Last time
                writer.write(data, encoding, callback);
            } else {
                // c
                // Dont pass the callbacl
                ok = writer.write(data, encoding);
            }

        }while( i > 0 && ok);

        // If we had exited early let us try once again
        if( i > 0) {
            console.log("Draining now");
            writer.once('drain', write);
        }
    }
}


writeLarge(wstream, "Writing large text", 'utf8', function(){
    console.log("done");
});
