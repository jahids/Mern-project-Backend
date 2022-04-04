const app = require('express');
const AuthController = require('../Controllers/AuthController');
const { register, login } = require('../Controllers/AuthController');
const { checkuser } = require('../Middlewares/AuthMiddlewares');
const router = app.Router();

router.post("/", checkuser);
router.post("/register",AuthController.register)
router.post("/login",AuthController.login)

module.exports = router;