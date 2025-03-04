import ImageUpload from '@/components/auth/ImageUpload'
import CommonForm from '@/components/common/commonForm'
import { registerFormConfig } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { handleUserRegister } from '@/store/auth-slice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const initialFormData = {
  userName: "",
  userId: "",
  email: "",
  bio: "",
  password: "",
  image: ""
}


function Register() {

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoading, setImageLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigator=useNavigate();


  const onSubmit = () => {

    const isFormValid = Object.keys(formData).map((item) => formData[item].trim() != "").every(Boolean);
    if (!isFormValid) {
      toast({
        title: "fill all the fields in the form"
      })
      return
    }
    dispatch(handleUserRegister(formData)).then((data) => {
      if(data?.payload?.success){
        toast({
          title:data?.payload?.message
       })
       setFormData(initialFormData);
       setImageFile(null);
       navigator("/auth/login");
      }else{
        toast({
          title:data?.payload?.message
        })
      }
    })
  }

  useEffect(() => {
    if(imageUrl!==""){
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  }, [imageUrl])

  return (

    <div className='flex flex-col justify-center items-start md:max-w-[400px] w-full gap-5 border-2 md:p-8 rounded-md md:px-8 px-4 py-4 max-w-[350px]'>
      <h1 className='text-3xl w-full text-center'>
        Sign Up
      </h1>
      <div className='flex justify-center w-full'>
        <ImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          isImageLoading={isImageLoading}
          setImageLoading={setImageLoading}
          setFormData={setFormData}
        />
      </div>
      <CommonForm
        formData={formData}
        setFormData={setFormData}
        formConfig={registerFormConfig}
        buttonText="Register"
        bottomText="already have an account ?"
        bottomButtonText="login"
        navigate="/auth/login"
        onSubmit={onSubmit} />
    </div>
  )
}

export default Register
