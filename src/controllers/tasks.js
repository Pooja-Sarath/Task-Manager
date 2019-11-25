const Task = require('../models/tasks');

module.exports.createTasks = async(req,res)=>{

    var requiredFileds = ['taskName', 'completed', 'commenced', 'startTime'];
    var taskList = req.body;
    var isValid = false;
    if(Array.isArray(taskList)){
        var validArrays = [];
        taskList.forEach((eachTask)=>{
            validArrays.push(requiredFileds.every((each)=>{
                return Object.keys(eachTask).includes(each);
            }));
            eachTask.user = req.user.id;
        });
    } 
   isValid = !validArrays.includes(false);

   if(isValid){
       try{
            const tasks = await Task.insertMany(taskList);
            return res.status(200).json({success:1, tasks});
       }catch(error){
            return res.status(400).send("Database insertion error");
       }
       
   } else{
       return res.status(400).send("Kindly check the fields for each task");
   }
};


module.exports.getTasks = async(req,res)=>{

    var id = req.user.id;
    try{
        const tasks = await Task.find({user : id, deleted : false});
        return res.status(200).json({success :1, tasks})
    }catch{
        return res.status(400).send("Error getting the task created by you");
    }
};


module.exports.deleteTask = async(req, res) =>{

    var userId = req.user.id;
    var startTime = req.body.startTime;
    var taskName = req.body.taskName;
    try{
        console.log(userId, startTime, taskName);
        var task = await Task.find({user : userId, startTime, taskName})
        task.deleted = true;
        var updatedtask = await Task.findOneAndUpdate({user : userId, startTime, taskName},{$set : { 'deleted' : true}});
        res.status(200).json({success :1, updatedtask})
    }catch(error){
        res.status(400).send(error);
    }
}
