"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamp = require('mongoose-timestamp'),
    paginate = require('mongoose-paginate');

    
var ProjectSchema = new Schema({
    name: {type:String, unique:true, index:true},
    description: {type: String},
    startdate: {type:Date},
    enddate: {type:Date},
    team: {type:String}
});


// Add the plugins
ProjectSchema.plugin(timestamp);
ProjectSchema.plugin(paginate);

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;