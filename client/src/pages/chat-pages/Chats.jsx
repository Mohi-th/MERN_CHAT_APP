import { Input } from "@/components/ui/input";
import { Paperclip, SendHorizontal } from "lucide-react";
import "./chat.css"
import { useEffect, useMemo, useRef, useState } from "react";
import ChatsListing from "@/components/chat/ChatsListing";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MessageListing from "@/components/chat/MessageListing";
import { getSocket } from "@/services/socket";
import { setChatss, setMessages } from "@/store/chat";


function Chats() {

  const { user } = useSelector(state => state.auth)
  const { chats, chatId,messages } = useSelector(state => state.chatRequest)
  const [message, setMessage] = useState('');

  // const [allMessages, setAllMessages] = useState([])

  console.log(messages,"messages")

  const socket = getSocket();

  const dispatch = useDispatch()

  const messageEndRef=useRef(null)


  const fetchAllChats = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/chat/get/${user?._id}`)
    return response?.data
  }

  const sendMessage = async () => {
    console.log(chatId, "chat id sneder")
    const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/message/send`, { sender: user._id, chatId: chatId, message: message })
    if (response?.data?.success) {
      socket.emit('send-message', response?.data?.data, chatId)
      // setAllMessages(prev => [...prev, response?.data?.data])
      dispatch(setMessages([...messages,response?.data?.data]))
      setMessage('');
    }
  }

  const fetchAllMessages = async (chatId) => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/message/get/${chatId}`)
    if (response?.data?.success) {
      // setAllMessages(response?.data?.data)
      dispatch(setMessages(response?.data?.data))
    }
  }

  useMemo(() => {
    if (user) {
      fetchAllChats().then((data) => {
        if (data?.success) {
          dispatch(setChatss(data?.data))
        }
      })
    }
  }, [user, dispatch])

  useEffect(() => {
    socket.on('receive-message', (message) => {
      console.log("hello world")
      dispatch(setMessages([...messages,message]))
    })

    socket.on('add-to-chat', (user) => {
      console.log(user, "chat accepted")
      dispatch(setChatss([...chats, user]));
    })

    return () => {
      socket.off("receive-message");
      socket.off("add-to-chat");
    };
  }, [dispatch, chats, socket,messages])

  useEffect(()=>{
    messageEndRef?.current.scrollIntoView();
  },[messages])


  return (
    <div className="flex w-full h-full ">
      <ul className=" w-full max-w-[350px] h-full border-r hidden lg:block overflow-auto no-scrollbar">
        {
          chats?.length > 0 ? chats?.map(chatItem => <ChatsListing key={chatItem?._id} chat={chatItem}  fetchAllMessages={fetchAllMessages}  setOpenChatSheet={null}/>) : null
        }
      </ul>
      <div className="flex flex-col flex-1">
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden p-2">
          <ul className="flex flex-col gap-4 justify-end">
            {messages?.length > 0 ? (
              messages.map((message) => (
                <MessageListing key={message?._id} message={message} />
              ))
            ) : (
              <p className="p-4 text-gray-500">No messages yet</p>
            )}
          </ul>
          <div ref={messageEndRef}></div>
        </div>
        <div className="w-full p-2 flex justify-start items-center gap-4 border px-6" >
          <Paperclip strokeWidth={1.3} />
          <Input type="text" id="input" value={message} onChange={(event) => {
            setMessage(event.target.value)
          }} className="border-none shadow-none outline-none " placeholder="Type a message" />
          <SendHorizontal onClick={sendMessage} size="30" strokeWidth={1} />
        </div>
      </div>
    </div>
  )
}

export default Chats
