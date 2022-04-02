const app= require('express');
const { register, login } = require('../Controllers/AuthController');
const router = app.Router();

router.post("/");
router.post("/register",register)
router.post("/login",login)

module.exports = router;