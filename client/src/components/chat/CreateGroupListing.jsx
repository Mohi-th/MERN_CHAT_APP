import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'
import { useSelector } from 'react-redux'

function CreateGroupListing({chat,formData,setFormData}) {

    const {user}=useSelector(state=>state.auth)

    const id=chat?.participants[0]?._id === user?._id ? chat?.participants[1]?._id:
    chat?.participants[0]?._id;

    const [btnFlag,setBtnFlag]=useState(true);
  
    
    const handleAddToGroup = () => {
        setFormData(prev=>({...prev,participants:[...prev.participants,id]}))
        setBtnFlag(false)
        
    }
    
    const handleRemovingParticipants=()=>{
        setFormData(prev=>({...prev,participants:prev?.participants.filter(participant=>participant!==id)}))
        setBtnFlag(true)
    }
    

    return (
        <li className={`w-full   p-2 border-b flex items-center justify-between gap-4`} >
            <div className="flex justify-center items-center gap-4">
                <figure className="w-[42px] h-[42px] rounded-full">
                    <img className="w-full h-full object-center rounded-full object-cover" src={chat?.isGroup ? chat?.groupImage : chat?.participants[0]?._id === user?._id ? chat?.participants[1]?.image :
                        chat?.participants[0]?.image}
                        alt="profile" />
                </figure>
                <p className="text-[18px] tracking-wide">
                    {chat?.isGroup ? chat?.groupName :
                        chat?.participants[0]?._id === user?._id ? chat?.participants[1]?.userName :
                            chat?.participants[0]?.userName}
                </p>
            </div>
            {btnFlag?<Button onClick={handleAddToGroup} className={"bg-amber-400 rounded-full w-[30px] h-[30px]"}><Plus /></Button>:
            <Button onClick={handleRemovingParticipants} className={"bg-amber-400 rounded-full w-[30px] h-[30px]"}><Minus /></Button>}
        </li>
    )
}

export default CreateGroupListing
