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

            console.log(user)

            if (user) {
                const token = createToken(user._id); //database id peramitar
                res.cookie("jwt", token, {
                    withCredentials: true,
                    httpOnly: false,
                    MAX_AGE: MAX_AGE * 1000,
                });

                //   res.cookie("loggedin", "true");
                //   res.send("Cookie sent!");

                res.status(201).json({ user: user._id, login: true });
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


    }
}

module.exports = AuthController