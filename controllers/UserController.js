const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) =>{
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d",
    });
}
// register user and sign-in
const register = async(req,res) =>{
    const {name,email,password} = req.body

    //  check if user already exists
    const user = await User.findOne({email})

    if(user){
        res.status(422).json({erros: ["Email ja cadastrado com este e-mail"]})
        return
    }

    // generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt);

    // create User
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })
    // if user was created sucessfuly, return token
    if(!newUser){
        res.status(422).json({errors: ["Houve um erro favor tente mais tarde"]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
}

module.exports = {
    register,
};