const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    taskName : {type : String, required : true, trim : true, unique : true},
    commenced : {type : Boolean, required : true},
    completed : {type : Boolean, required : true},
    startTime : {type : String, required : true, trim : true},
    endTime : {type : String, trim : true},
    deleted : {type : Boolean, default : false, required : true},
    user : {type : mongoose.Schema.Types.ObjectId, required : true, ref : 'User'}
}, {timestamps : true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

