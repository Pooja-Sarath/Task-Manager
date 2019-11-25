const mongoose = require('mongoose');

module.exports.dbConnection = mongoose.connect('mongodb://127.0.0.1:27017/schedule',
            {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true , useFindAndModify: false})
            .then((conn)=>{
                console.log("Connected to database");
            }).catch((error)=>{
                console.log(error.message());
            });
