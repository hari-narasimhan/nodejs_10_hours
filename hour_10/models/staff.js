var mongoose = require('mongoose');

var staff = mongoose.Schema({
  firstname:String,
  lastname:String,
  skills:String,
});

module.exports = mongoose.model('Staff', staff);
