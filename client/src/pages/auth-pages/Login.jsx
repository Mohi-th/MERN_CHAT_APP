import CommonForm from '@/components/common/commonForm'
import { loginFormConfig } from '@/config'
import { useToast } from '@/hooks/use-toast';
import { handleUserLogin, setUserToken } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialFormData={
  userId:"",
  password:""
}

function Login() {

  const [formData,setFormData]=useState(initialFormData);

  const {toast}=useToast();

  const navigate=useNavigate()

  const dispatch=useDispatch();

  const onSubmit=()=>{
    dispatch(handleUserLogin(formData)).then((data)=>{
      console.log(data,"data");
      if(data?.payload?.success){
        toast({
          title:data?.payload?.message
        })
        setFormData(initialFormData);
        dispatch(setUserToken(data?.payload?.data?.token))
        navigate("/chats/chat")
      }else(
        toast({
          title:data?.payload?.message
        })
      )
    })
  }

  return (
    <div className='flex flex-col justify-center items-center w-full gap-5 min-w-[300px] md:max-w-[400px] border-2 rounded-[5px] md:px-8 px-4 max-w-[350px] py-15'>
      <CommonForm 
      formType="Login"
       formConfig={loginFormConfig} 
       formData={formData}
        setFormData={setFormData} 
        buttonText="login" 
        bottomButtonText="create account" 
        navigate="/auth/register"
        onSubmit={onSubmit} 
        bottomText="new user ?"/>
    </div>
  )
}

export default Login
Login