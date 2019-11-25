module.exports = function(req,res, next){

    if(req.user){
        next();
    }
    else return res.status(400).send("Kindly login in")
}