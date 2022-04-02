const mongoose  = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type : String,
        required : [true , "Email is required"],
        unique : true,
    },

    password : {
        type : String,
        required :[true, 'password is required']

    }
});

const MODEL = mongoose.model('User' , UserSchema);
module.exports = MODEL;