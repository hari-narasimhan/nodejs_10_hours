"use strict";

var fs = require('fs');

fs.stat(__dirname+'/readme.txt',function(err,stats){ if (err) { throw err; }
    console.log(stats.size);
});
