const UserModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken');
// const { createToken, handleErrors } = require('../helpers/AuthHelper');

const MAX_AGE = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, "secret key", {
        expiresIn: MAX_AGE
    })
}

const handleErrors = (err) => {
    let errors = { email: "", password: "" };
    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        errors.email = "varificatun faield";
        return errors;
    }

}


const AuthController = {
    login: async  (req, res, next) => {

        try {
            const { email, password} = req.body;
            console.log(email, password)
            const user = await UserModel.findOne({
                email,
                password
            })

            console.log(user, "this is jahid test")
            // res.send(user);
            // res.json({user : user});

            if (user) {
                const token = createToken(user._id); //database id peramitar
                res.cookie("jwt", token, {
                    withCredentials: true,
                    httpOnly: false,
                    MAX_AGE: MAX_AGE * 1000,
                    data : { user: user._id, 
                        role: user.role, 
                        login: true }
                },

               
                );

                //   res.cookie("loggedin", "true");
                //   res.send("Cookie sent!");
                const obj = { user: user._id, 
                    role: user.role, 
                    login: true }

              res.cookie("info", obj)

                res.status(201).json({ user: user._id, role: user.role, login: true });
            } else {
                console.log('data on passing')
                res.json({ created: false });
            
            }



        } catch (error) {
            console.log("your data database not save", error)
            // const errors = handleErrors(error);
            res.json({ created: false });

        }

    },

    register: async (req, res, next) => {

        try {
            const { email, password} = req.body;
            console.log(email, password)
            const user = await UserModel.create({
                email,
                password
            })

            const token = createToken(user._id); //database id peramitar
            res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: false,
                MAX_AGE: MAX_AGE * 1000,
            });

            //   res.cookie("loggedin", "true");
            //   res.send("Cookie sent!");

            res.status(201).json({ user: user._id, created: true });

        } catch (error) {
            console.log("your data database not save", error)
            const errors = handleErrors(error);
            res.json({ errors, created: false });

        }


    },


    admin:  async (req, res , next) => {
        try {
            const AllUsers = await UserModel.find();
            res.send(AllUsers);
             const token = createToken('624ebcf9edfa1562069a6ed3'); //database id peramitar
            res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: false,
                MAX_AGE: MAX_AGE * 1000,
            });
            res.status(201).json({ user: user._id, created: true });
            console.log(AllUsers, 'test role')
    
        } catch (error) {
            
        }
    }

}

module.exports = AuthController