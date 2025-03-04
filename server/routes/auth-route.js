const express = require("express");
const { handleUserLogin, handleUserRegister ,handleImageUploadToCloudinary} = require("../controllers/auth/auth-controller");
const {upload}=require('../utils/cloudinary');
const userValidation=require("../middleware/auth");


const router = express.Router();
router.post("/register",handleUserRegister);
router.get("/login/:userId/:password",handleUserLogin);
router.get("/check-auth",userValidation);
router.post("/image-upload",upload.single("myFile"),handleImageUploadToCloudinary);

module.exports=router
