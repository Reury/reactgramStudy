 const Photo = require("../models/Photo") ;
 const mongoose = require("mongoose");
const User = require("../models/User");

//  insert a photo , with an user related to it

const insertPhoto = async(req,res)=>{

    const { title} = req.body;
    const image = req.file.filename;

    console.log(req.body);

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    //  create photo

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,

    });

    // if photo created sucefully return data
    if(!newPhoto){
         res.status(422).json(
            {errors: ["houve um problema, por favor tente novamente mais tarde"]

            })
            return
    }

    res.status(201).json(newPhoto);
}; 

//  remove photo from DB
const deletePhoto = async(req,res)=>{
    const {id} = req.params;

    const reqUser = req.user;

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        // check if photo exists
        if(!photo){
            res.status(404).json({errors:["foto não encontrada"]});
            return;
        }
        // check if photo belongs to user
        if(!photo.userId.equals(reqUser._id)){
            res.status(422)
            .json(
                {errors: ["ocorreu um erro, por favor tente novamente mais tarde"]}
            );
        }
        await Photo.findByIdAndDelete(photo._id);
    
        res.status(200)
        .json({id: photo._id, message: "Foto exluida com sucesso"});
    } catch (error) {
        res.status(404).json({errors:["foto não encontrada"]});
    }
}

module.exports = {
    insertPhoto,
    deletePhoto,
}