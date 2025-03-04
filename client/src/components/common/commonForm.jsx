import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";



function InputRender(element,setFormData,formData) {

    return (
        <div key={element?.id} className='w-full'>
            <Label htmlFor={element?.id} className='ml-2'>{element.label}</Label>
            <Input type={element.type} id={element?.id} value={formData[element.name]} name={element?.name} onChange={(e)=>{
                setFormData({...formData,[e.target.name]:e.target.value})
            }} className="border w-full mt-1" placeholder={element.placeholder} />
        </div>
    )
}



function CommonForm({ formConfig, formType, buttonText, bottomText, bottomButtonText, navigate ,formData,setFormData ,onSubmit}) {

    const navigator = useNavigate();



    return (
        <div className=' min-w-[300px] w-full'>
            <div className='flex justify-center w-full'>
                <h1 className='text-2xl'>{formType}</h1>
            </div>
            <div className="flex flex-col gap-3">
                {
                    formConfig?.length > 0 ? formConfig?.map((element) => InputRender(element,setFormData,formData)) : null
                }
            </div>
            <p className="mx-2 mt-2">
                {bottomText}
                <span onClick={() => {
                    navigator(navigate)
                }} className="underline hover:cursor-pointer">{bottomButtonText}</span>
            </p>
            <Button onClick={onSubmit} variant="outline" className="w-full mt-3 bg-amber-400 hover:bg-amber-300">
                {buttonText}
            </Button>
        </div>
    )
}

export default CommonForm;