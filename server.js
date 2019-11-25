const express = require('express');
const db = require('./db');
const app = express();
const passport = require('passport');
const session = require('express-session');

const accessRouter = require('./src/routes/access');
const taskRouter = require('./src/routes/tasks');

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(session({ secret: "schedule application", resave: true, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());
app.use(accessRouter);
app.use(taskRouter);

app.listen(PORT, ()=>{
    db.dbConnection;
    console.log("App listening on port : "+ PORT);
});