"use strict";

var fs = require('fs');

fs.watchFile('./watch.txt', function (curr, prev) {
  console.log('the current mtime is: ' + curr.mtime);
  console.log('the previous mtime was: ' + prev.mtime);
});

fs.writeFile('./watch.txt', "changed", function (err) {
  if (err) throw err;
  console.log("file changed");
});

