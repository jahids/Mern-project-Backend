const UserModel = require('../Models/UserModel')

module.exports.register = async (req,res,next) => {

    try {
        const {email, password, role} = req.body;
        console.log(email, password, role)
        const user = await UserModel.create({
            email,
            password,
            role
        })
        
    } catch (error) {
        console.log("your data database not save", error)
        
    }

   
}

module.exports.login = async (req,res,next) => {

}