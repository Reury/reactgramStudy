const express = require("express");
const router = express.Router();


// controller
const {insertPhoto, 
      deletePhoto, 
      getAllPhotos, 
      getUserPhotos,
      getPhotoById,
      updatePhoto} = require("../controllers/PhotoController");
// middleware
const { photoInsertValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate= require("../middlewares/handleValidation");
const { imageUpload} = require("../middlewares/imageUpload");

// Routes
router.post(
    "/",
    authGuard,
    imageUpload.single("image"),
    photoInsertValidation(),
    validate,
    insertPhoto
  );
router.delete("/:id",authGuard,deletePhoto);
router.get("/", authGuard,getAllPhotos);
router.get("/user/:id", authGuard,getUserPhotos);
router.get("/:id", authGuard,getPhotoById);
router.patch("/:id", authGuard,updatePhoto);

module.exports = router;