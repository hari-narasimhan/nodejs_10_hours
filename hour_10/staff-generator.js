var fs = require('fs');
var Chance = require('chance');
var chance = new Chance();

function generateRandomPerson () {
  var gender = chance.gender();
  var first = chance.first({gender: gender.toLowerCase()});
  var last = chance.last();
  return {
    firstname: first,
    lastname: last,
    gender: gender,
    email:  first + '.' + last + '@example.com'
  };
}

var stream = fs.createWriteStream("staff.json");
stream.once('open', function(fd){

  stream.write('[');
    for(var i=0; i < 50; i++) {
      i === 0 ? stream.write('') : stream.write(',');
      stream.write(JSON.stringify(generateRandomPerson()));
      stream.write('\n');
    }

  stream.write(']');
  stream.end();
});
