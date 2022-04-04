const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');

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

    // role : {
    //     type : String,
    //     required : [true]
    // }

});

// UserSchema.pre("save", async function(next) {

//     const salt = await bcrypt.genSalt();
//     // normal function use than this access
//     this.password = await bcrypt.hash(this.password, salt);

// })

const MODEL = mongoose.model('User' , UserSchema);
module.exports = MODEL;