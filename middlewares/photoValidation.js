const {body} = require("express-validator");

const photoInsertValidaion = () =>{
    return [
        body("title")
        .not()
        .equals("undefined")
    ]
}