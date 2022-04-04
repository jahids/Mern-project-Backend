const UserModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken');

module.exports.checkuser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"secret key", (err, decodedToken)=>{
        if(err){
            res.json({status : false})
            next();
        }else{
            const user = UserModel.findById(decodedToken.id);
            if(user){
                res.json({status : true, user: user.email})
            }else{
                res.json({status : false})
                next();
            }
             
        }
        })
    }else{
        res.json({status : false})
        next();
    }
}