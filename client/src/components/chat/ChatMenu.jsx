import { useDispatch, useSelector } from "react-redux"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import ChatsListing from "./ChatsListing"
import '../../pages/chat-pages/chat.css'
import { useState } from "react"
import axios from "axios"
import { setMessages } from "@/store/chat"


function ChatMenu({ openChatSheet, setOpenChatSheet }) {

    const { chats ,messages} = useSelector(state => state.chatRequest)
    const [chatId, setChatId] = useState('')
    const dispatch=useDispatch();
    
    const fetchAllMessages = async (chatId) => {
        console.log(chatId,"chatId")
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/message/get/${chatId}`)
        if (response?.data?.success) {
            console.log(response?.data?.data,"sheets messages")
            dispatch(setMessages(response?.data?.data))
            // setAllMessages(response?.data?.data)
        }
    }

    return (
        <Sheet open={openChatSheet} onOpenChange={setOpenChatSheet} >
            <SheetContent side="left" >
                <SheetHeader>
                    <SheetTitle>Persistent Sheet</SheetTitle>
                </SheetHeader>
                <div className="overflow-auto h-full scrollbar-hidden">
                    <ul className=" w-full max-w-[350px] h-full border-r ">
                        {
                            chats?.length > 0 ? chats?.map(chatItem => <ChatsListing key={chatItem?._id} setOpenChatSheet={setOpenChatSheet} chat={chatItem} chatId={chatId} fetchAllMessages={fetchAllMessages} setChatId={setChatId} />) : null
                        }
                    </ul>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default ChatMenu
