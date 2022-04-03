const UserModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {

    return jwt.sign({id}, "secret key", {
        expiresIn : maxAge
    })

}

module.exports.register = async (req, res, next) => {

    try {
        const {email, password, role} = req.body;
        console.log(email, password, role)
        const user = await UserModel.create({
            email,
            password,
            role
        })

        const token = createToken(user._id); //database id peramitar
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
          });

        //   res.cookie("loggedin", "true");
        //   res.send("Cookie sent!");

          res.status(201).json({ user: user._id, created: true });
        
    } catch (error) {
        console.log("your data database not save", error)
        
    }

   
}

module.exports.login = async (req,res,next) => {

}