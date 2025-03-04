import ImageUpload from "@/components/auth/ImageUpload"
import CreateGroupListing from "@/components/chat/CreateGroupListing"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { getSocket } from "@/services/socket"
import { setChatss } from "@/store/chat"
import { acceptFriendRequestAndCreateChat } from "@/store/friend-request-slice"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import './chat.css'


function CreateGroup() {

  const { user } = useSelector(state => state.auth)
  const { chats } = useSelector(state => state.chatRequest)

  const initialFormData = {
    groupName: "",
    participants: [user?._id],
    groupImage: "",
    isGroup: true,
  }

  const socket = getSocket();

  // const [chats, setChats] = useState([])

  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("")
  const [isImageLoading, setImageLoading] = useState(false);
  const [openChatSheet, setOpenChatSheet] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const fetchAllChats = async () => {
  //   const response = await axios.get(`http://localhost:3000/api/chat/get/${user?._id}`)
  //   return response?.data
  // }

  const handleCreateGroup = () => {
    dispatch(acceptFriendRequestAndCreateChat({ ...formData, groupImage: imageUrl })).then((data) => {
      if (data?.payload?.success) {
        setFormData(initialFormData);
        console.log(data?.payload?.data?.participants)
        socket.emit('friend-request-accept', data?.payload?.data, formData?.participants)
        dispatch(setChatss([...chats, data?.payload?.data]));
        setFormData(initialFormData)
        navigate("/chats/chat");
      }
    })
  }



  // useEffect(() => {
  //   if (user) {
  //     fetchAllChats().then((data) => {
  //       if (data?.success) {
  //         setChats(data.data)
  //       }
  //     })
  //   }
  // }, [user])


  return (
    <div className="h-full w-full flex">
      <div className="hidden lg:block w-full max-w-[350px] h-full border-r ">
          <h1 className="text-2xl p-4 text-center border-b">
            Add Group Members
          </h1>
        <ul className="w-full max-w-[350px] h-full border-r overflow-auto no-scrollbar">
          {
            chats?.length > 0 ? chats?.map(chatItem =>
              !chatItem.isGroup ?
                <CreateGroupListing key={chatItem?._id} chat={chatItem} formData={formData} setFormData={setFormData} /> :
                null) : null
          }
        </ul>
      </div>
      <div className="h-full flex-1 flex justify-center items-center ">
        <div className="flex flex-col justify-center items-center gap-4 p-10 border">
          <h1 className="text-4xl font-semibold ">Create Group</h1>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            isImageLoading={isImageLoading}
            setImageLoading={setImageLoading}
            setFormData={setFormData}
          />
          <div className="w-full">
            <Input
              id="groupName"
              name="groupName"
              onChange={(event) => { setFormData(prev => ({ ...prev, [event.target.name]: event.target.value })) }}
              placeholder="enter the group name"
            />
            <Button className={"w-full mt-2 lg:hidden"} onClick={() => {
              setOpenChatSheet(true)
            }} >Add Members</Button>
            <Button className={"w-full mt-2"} value={formData.groupName} onClick={handleCreateGroup}>Create Group</Button>
          </div>
        </div>
      </div>
      <Sheet open={openChatSheet} onOpenChange={setOpenChatSheet} >
        <SheetContent side="bottom" className={"flex flex-col items-center w-full max-h-[70vh]"}>
          <SheetHeader className={"mb-2"}>
            <SheetTitle>Add Group Members</SheetTitle>
          </SheetHeader>
          <div className="overflow-auto h-full scrollbar-hidden flex justify-center w-full">
            <ul className="w-full max-w-[350px] h-full border lg:hidden">
              {
                chats?.length > 0 ? chats?.map(chatItem =>
                  !chatItem.isGroup ?
                    <CreateGroupListing key={chatItem?._id} chat={chatItem} formData={formData} setFormData={setFormData} /> :
                    null) : null
              }
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default CreateGroup