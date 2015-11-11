"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamp = require('mongoose-timestamp'),
    paginate = require('mongoose-paginate');

    
var ProjectSchema = new mongoose Schema({
    name: {type:String, unique:true, index:true},
    description: {type: String},
    startdate: {type:date, required:true},
    enddate: {type:date}
    team: {type:String}
});


// Add the plugins
ProjectSchema.plugin(timestamp);
projectSchema.plugin(paginate);

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;