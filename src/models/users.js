const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String, required: true, trim: true, lowercase: true, unique: true,
        validate(value) {
            // if (!value.subStr('@'))
            //     throw new Error("Email is invalid")
        }
    },
    age: {
        type: Number, default: 0,
        validate(value) {
            if (value < 0)
                throw new Error("Age must be poitive number")
        }
    },
    password: {
        type: String, required: true, trim: true, minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password'))
                throw new Error('Password cannot conatin "Password"');
        }
    }
}, {
    timestamps: true
}
);

//Acts over whole Schema
userSchema.statics.findByCredentials = async(email,password) =>{
    
    const user = await User.findOne({email : email});
    
    if(!user)
         throw new Error ("User not found");
    const isValid = await bcrypt.compare(password, user.password);
    
    if(!isValid)
        throw new Error ("User not found");

    return user;
} 

//Acts over individual document
userSchema.methods.toJSON = function(){
    const user = this;
    const requiredData = user.toObject()

    delete requiredData.password;
    delete requiredData.tokens;

    return requiredData;
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;