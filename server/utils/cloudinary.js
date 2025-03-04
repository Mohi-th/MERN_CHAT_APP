const cloudinary=require('cloudinary').v2;
const multer=require("multer");
const streamifier = require("streamifier");


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:  process.env.CLOUDINARY_API_KEY,
    api_secret:  process.env.CLOUDINARY_API_SECRET
  });


const storage=new multer.memoryStorage();

const ImageUploadToCloudinary=async (file)=>{
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" }, 
          (error, result) => {
            if (error) reject(error);
            else resolve(result); 
          }
        );
    
        // Convert buffer to stream and send to Cloudinary
        streamifier.createReadStream(file).pipe(stream);
      });
}

const upload=multer({storage});

module.exports ={upload,ImageUploadToCloudinary};