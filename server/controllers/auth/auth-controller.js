const { emitWarning } = require('process');
const Users = require('../../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { ImageUploadToCloudinary } = require("../../utils/cloudinary");
const bcrypt = require("bcrypt")


const handleUserRegister = async (req, res) => {
    try {

        const { userName, userId, email, password, bio, image } = req.body;

        if (!userName || !userId || !email || !password || !bio || !image) {
            return res.status(500).json({
                success: false,
                message: "all user's details are required"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const user = await Users.create({
            userName,
            userId,
            email,
            password: hashPassword,
            bio,
            image,
        })

        res.status(200).json({
            success: true,
            message: "Registration successfull",
            data: user
        })


    } catch (err) {

        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: `this ${Object.keys(err.keyValue)[0]} is already taken`
            })
        }
        res.status(500).json({
            success: false,
            message: "registration error , please try again"
        })
    }
}

const handleUserLogin = async (req, res) => {

    try {

        const { userId, password } = req.params;

        if (!userId || !password) {
            return res.status(500).json({
                success: false,
                message: "all user's details are required"
            })
        }

        const user = await Users.findOne({userId:userId});

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        const isPasswordValid=await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "wrong password"
            })
        }


        const token = jwt.sign({user}, process.env.SECRET_KEY);

        res.status(200).json({
            success: true,
            message: "login successfully",
            data: { user, token }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "login error , please try again"
        })
    }
}

const handleImageUploadToCloudinary = async (req, res) => {
    try {

        const myFile = req.file.buffer

        if (!myFile) {
            return res.status(400).json({
                success: false,
                message: "Image file not found"
            })
        }

        const result = await ImageUploadToCloudinary(myFile);

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "cloudinary error"
            })
        }

        res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "some error has occured during image upload"
        })
    }
}

module.exports = { handleUserLogin, handleUserRegister, handleImageUploadToCloudinary }