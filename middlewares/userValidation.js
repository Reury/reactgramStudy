const {body} = require("express-validator");

const userCreateValidation = ()=> {
   return [
        body("name")
            .isString()
            .withMessage("o nome é obrigatorio"),
        body("email")
            .isString()
            .withMessage("o e-mail é obrigatorio")
            .isEmail()
            .withMessage("insira um email valido"),
        body("password")
            .isString()
            .withMessage("A Senha é obrigatorio")
            .isLength({min: 5})
            .withMessage("A senha precisa ter no minimo 5 caracteres"),
        body("confirmPassword")
            .isString()
            .withMessage("favor confirmar a senha")
            .custom((value,{req}) =>{
                if(value != req.body.password) {
                    throw new Error("As senhas não são iguais.")
                }
                return true;
            })
                 
    ];


};

const loginValidation = ()=>{
    return [
        body("email")
            .isString()
            .withMessage("o e-mail é obrigatorio")
            .isEmail()
            .withMessage("insira um email valido"),
        body("password")
            .isString()
            .withMessage("A Senha é obrigatorio")
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
}