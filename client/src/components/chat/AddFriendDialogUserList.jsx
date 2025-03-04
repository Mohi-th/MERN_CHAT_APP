import { Separator } from "@radix-ui/react-separator"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { sendingFriendRequest } from "@/store/friend-request-slice";
import { getSocket } from "@/services/socket";

function AddFriendDialogUserList({ User ,filterUsers}) {

    const socket=getSocket();

    const {user}=useSelector(state=>state.auth)

    const dispatch=useDispatch();

    const receiver=User?._id

    const handleAddFriend=()=>{
        dispatch(sendingFriendRequest({sender:user?._id,receiver:User?._id})).then((result) => {
            if(result?.payload?.success){
                const request=result?.payload?.data
                filterUsers(User?._id);
                socket?.emit("send-friend-request",receiver,request)  
            }
        })
    }

    if(User?._id===user?._id)return;

    return (
        <li className='flex flex-col gap-2'>
            <div className='flex justify-between w-full items-center'>
                <div className='flex items-center gap-4'>
                    <div className='w-[40px] h-[40px] rounded-full'>
                        <img className='w-full h-full object-center object-cover rounded-full' src={User?.image}  />
                    </div>
                    <span className='text-[18px] '>{User?.userName}</span>
                    <span className='text-sm'>user id : {User?.userId} </span>
                </div>
                <Button onClick={handleAddFriend} className={"bg-amber-400 rounded-full w-[30px] h-[30px]"}><Plus /></Button>
            </div>
            <Separator />
        </li>
    )
}

export default AddFriendDialogUserList
