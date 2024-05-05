const express = require("express");
const router = express.Router();

// controler
const { register} = require("../controllers/UserController");

//  middlewares
const validate = require("../middlewares/handleValidation");
const {userCreateValidation} = require("../middlewares/userValidation");

// route
router.post("/register",userCreateValidation(),validate, register);

module.exports = router;