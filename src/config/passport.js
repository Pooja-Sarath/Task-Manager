const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/users');

passport.use( new LocalStrategy({
    usernameField: "email"
}, async(email,password, done) =>{
    try{
        var user = await User.findOne({email});
        if(!user){
            return done(null, false, {
                message: "Incorrect email."
              })
        };
        if(user){
            const validUser = bcrypt.compare(password, user.password);
            if(validUser){
                return done(null, user)
            }else{
                return done(null, false, {message : "Incorrect Password"})
            }
        }
    }catch(error){
        console.log(error);
    }
}));


// obtains user from req.session.passport.user object
passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

//finds the user and attaches it to the req.user
passport.deserializeUser(function(id, done) {
    User.findById(id).then((user)=>{
        done(null,user)
    }).catch((error)=>{
        done(error, null)
    })
  });

  module.exports = passport;