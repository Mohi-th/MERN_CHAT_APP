import { Camera, X } from "lucide-react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import axios from "axios";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";


function ImageUpload({ imageFile, setImageFile, imageUrl, setImageUrl, isImageLoading, setImageLoading ,setFormData}) {


  const handleImageChange = (event) => {
    const selectedFile = event?.target?.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  const handleImageRamove=()=>{
    if(imageFile!==null){
      setImageFile(null);
      setImageUrl("");
    }
  }

  const imageUploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append("myFile", imageFile);
    setImageLoading(true);
    const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/auth/image-upload`, formData);
    if (response?.data?.success) {
      setImageUrl(response?.data?.data?.url);
      setImageLoading(false)
    }
    return response.data;
  }

  useEffect(() => {
    if (imageFile !== null) {
      imageUploadToCloudinary();
    }
  }, [imageFile, setImageFile])

  return (
    <div className="w-[120px] h-[120px]   rounded-full flex justify-center items-center border relative">
      <Input id="image-input" className="hidden" type="file" onChange={handleImageChange} />
      {
        imageFile == null ?
          <Label className="w-full h-full rounded-full flex justify-center items-center" htmlFor="image-input">
            <Camera color="gray" size="35" />
          </Label> :
          isImageLoading ?
            <Skeleton className="w-full h-full rounded-full" /> : (
              <>
                <div className="w-full h-full rounded-full">
                  <img className="w-full h-full rounded-full object-center object-cover" src={imageUrl !== "" ? imageUrl : null} alt="profile" />
                </div>
                <div className="absolute top-1 right-1 bg-red-400 rounded-full" onClick={handleImageRamove}>
                <X color="white" size="20"/>
                </div>
              </>
            )

      }
    </div>
  )
}

export default ImageUpload