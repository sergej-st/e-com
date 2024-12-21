const express = require("express")
const { register, login, logout } = require("../controllers/authController")
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router()


router.route("/register").post(register)
router.route("/login").post(login)



module.exports = router