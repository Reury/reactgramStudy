 const Photo = require("../models/Photo") ;
 const mongoose = require("mongoose");
const User = require("../models/User");

//  insert a photo , with an user related to it

const insertPhoto = async(req,res)=>{

    const { title} = req.body;
    const image = req.file.filename;

    // console.log(req.body);

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

        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({ errors: ["Invalid photo ID format"] });
          }
      
        const photo = await Photo.findById(id);


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

const getAllPhotos = async(req,res)=>{

    const photos = await Photo.find({}).sort([["createdAt",-1]]).exec();

    return res.status(200).json(photos);
}

const getUserPhotos = async(req,res)=>{

    const {id} = req.params;

    const photos = await Photo.find({userId:id}).sort([["createdAt",-1]]).exec();

    return res.status(200).json(photos);
}

const getPhotoById = async(req,res)=>{

    const {id} = req.params;

    const photo = await Photo.findById(id);

    // check if photo exists
    if(!photo){
        res.status(404).json({errors: ["foto não encontrada"]});
        return
    }
    res.status(200).json(photo);
}

// update a photo
const updatePhoto = async(req,res)=>{
    const {id} = req.params;
    const {title} = req.body;

    const reqUser = req.user;

    const photo = await Photo.findById(id)
    
    // check if photo exists
    if(!photo){
        res.status(404).json({errors: ["foto não encontrada"]});
        return;
    }
    // check if photo belongs to user
    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors: ["ocorreu um erro tente novamente mais tarde"]});
        return;
    }
    if(title){
        photo.title = title;
    }
    await photo.save();

    res.status(200).json({photo,message:"foto atualizada com sucesso"});
}

// like functionality
const likePhoto = async(req,res)=>{
    const {id} = req.params;

    const reqUser = req.user;

    const photo = await Photo.findById(id);
    
    if(!photo){
        res.status(404).json({errors: ["foto não encontrada"]});
        return;
    }

    // check if user already liked the photo
    if(photo.likes.includes(reqUser._id)){
        res.status(422).json({errors: ["vocé ja curtiu a foto"]});
        return;
    }

    // put user id in likes array
    photo.likes.push(reqUser._id);

    photo.save();
    res.status(200).json({ photoId: id,userId: req.user._id, message: "a foto foi curtida"});
}

const commentPhoto = async(req,res)=>{
    const {id} = req.params;
    const {comment} = req.body;
    const reqUser = req.user;
    
    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

// check if photo exists
    if(!photo){
        res.status(404).json({errors: ["foto não encontrada"]});
        return;
    }

    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    };

    photo.comments.push(userComment);

    await photo.save();

    res.status(200).json({
        comment: userComment,
        message: "o comentario foi adicionado com sucesso",
    });
};

const searchPhotos = async(req,res)=>{

    const {q} = req.query;

    const photos = await Photo.find({ title: new RegExp(q, "i")}).exec();

    res.status(200).json(photos);
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos
}