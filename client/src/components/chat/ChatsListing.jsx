import { getSocket } from "@/services/socket"
import { setChatId } from "@/store/chat";
import { useDispatch, useSelector } from "react-redux"

function ChatsListing({ chat ,fetchAllMessages,setOpenChatSheet}) {


    const { user } = useSelector(state => state.auth)
    const {chatId}=useSelector(state=>state.chatRequest)
    const socket=getSocket();
    const dispatch=useDispatch();

    const changeColor=()=>{
        dispatch(setChatId(chat?._id))
        if(socket)socket?.emit('join-chat',chat?._id)
        fetchAllMessages(chat?._id);
        setOpenChatSheet!==null?setOpenChatSheet(false):null
    }

    
    return (
        <li className={`w-full ${chatId===chat?._id?'bg-amber-100':'bg-white'} p-2 border-b flex items-center gap-4 hover:cursor-pointer `} onClick={changeColor}>
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
        </li>
    )
}

export default ChatsListing
