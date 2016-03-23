var mongoose = require('mongoose');

var staffSchema = mongoose.Schema({
  firstname:String,
  lastname:String,
  skills:String,
});

module.exports = mongoose.model('Staff', staffSchema);
