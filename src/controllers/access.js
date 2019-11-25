const User = require('../models/users');

/*****************************************
 * Callback function for signIn route *
 *****************************************/
module.exports.signIn = async(req,res) =>{
    var userDetails = req.body;
    var requiredFields = ['name', 'age', 'password', 'email'];

    const validBody = Object.keys(userDetails).every((eachField)=>{
        return requiredFields.includes(eachField);
    })

    if(validBody){

        const user = new User(userDetails);
        try{
            await user.save();
            return res.status(200).json({success:1});
        }catch(error){
            return res.status(400).send(error);
        }
    } else {
        return res.status(400).send("User not defined properly");
    }
    

};



/*****************************************
 * Callback function for login route *
 *****************************************/
 module.exports.login = async(req,res) =>{
     const requiredFields = ['email', 'password'];
     var userDetails = req.body;
     const isValid = Object.keys(userDetails).every((each) =>{
         return requiredFields.includes(each);
     })

     if(isValid){
         try{
            const user = await User.findByCredentials(userDetails.email, userDetails.password);
            return res.status(200).json({success: 1, user : user, loggedIn : true});
         }catch(error){
            return res.status(400).send(error);
         }
        

     } else{
        return res.status(400).send("User fields missing");
     }
 };


 /**********************************************
 * Callback function for updating user details *
 ***********************************************/
 module.exports.editUser = async(req,res) =>{
    
    var userDetails = req.body;
    const isValid = Object.keys(userDetails).includes('email');
    if(isValid){
        var user = new User(userDetails);
        try{
            var updateUser = await User.findOne({email : userDetails.email});

            Object.keys(userDetails).forEach((each)=>{
                updateUser[each] = userDetails[each];
            });
            
            await User.findOneAndUpdate({email : userDetails.email}, updateUser);
            return res.status(200).json({succes : 1, user : updateUser});

        }catch(error){
            return res.status(400).send(error);
        }
        
    }
    
 };


 /*******************************************
  ****Callback function for logout user *****
 ********************************************/
 module.exports.logout = async(req,res) =>{
    req.logout();
    req.session.destroy();
    res.status(200).send("Logged Out successfully");
 };