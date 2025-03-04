const jwt = require("jsonwebtoken");
require("dotenv").config();

const userValidation = (req, res, next) => {

    try {

        const authHeader = req.header("Authorization");
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(500).json({
                success: false,
                message: "no bearer token"
            })
        }
        const token = authHeader.split(" ")[1];
        const isValid = jwt.verify(token, process.env.SECRET_KEY);

        if (!isValid) {
            return res.status(401).json({ 
                success: false,
                message: "bearer token is not valid"
            })
        }
        
        res.status(200).json({ 
            success: true,
            message: "valid user",
            user:isValid
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "not a valid user",
            error:error.message
        })
    }


}

module.exports=userValidation