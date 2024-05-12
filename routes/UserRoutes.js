const express = require("express");
const router = express.Router();
// controler
const { register, login, getCurrentUser,update} = require("../controllers/UserController");

//  middlewares
const validate = require("../middlewares/handleValidation");
const {userCreateValidation,loginValidation, userUpdateValidation} = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");
const {imageUpload} = require("../middlewares/imageUpload");



// route
router.post("/register",userCreateValidation(),validate, register);
router.post("/login",loginValidation(),validate, login);
router.get("/profile",authGuard,getCurrentUser);
router.patch("/",
    authGuard,
    userUpdateValidation(),
    imageUpload.single("profileImage"), 

    validate,
    update
);

module.exports = router;