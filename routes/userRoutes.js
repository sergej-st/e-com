const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")
const { getAllUsers, showCurrentUser, getUserById, updateUser, deleteUser } = require("../controllers/usersController")

const router = express.Router()


router.route("/")
    .get(authMiddleware,adminMiddleware,getAllUsers)

router.route("/showMe")
    .get(authMiddleware,showCurrentUser)

router.route("/:id")
    .get(authMiddleware,adminMiddleware,getUserById)
    .patch(authMiddleware,adminMiddleware,updateUser)
    .delete(authMiddleware,adminMiddleware,deleteUser)


module.exports = router

