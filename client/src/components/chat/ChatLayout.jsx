import { logOut } from "@/store/auth-slice";
import { Bell, LogOut, Menu, UserPlus, Users } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import AddFriendDialog from "./AddFriendDialog";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import NotificationDiag from "./NotificationDiag";
import { connectSocket, getSocket } from "../../services/socket"
import ChatMenu from "./ChatMenu";


function ChatLayout() {

  const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false)
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [openNotificationDialog, setOpenNotificationDialog] = useState(false)
  const [openChatSheet, setOpenChatSheet] = useState(false);

  const { user } = useSelector(state => state.auth)

  const socket = getSocket();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/auth/login')
  }

  const createGroup = () => {
    navigate("/chats/group")
  }

  const fetchUsers = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/search/get?keyword=${keyword}`)
    if (response?.data?.success) {
      setUsers(response?.data?.data)
    }
  }


  const fetchAllFriendRequests = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/friend-request/get/${user?._id}`)
    if (response?.data?.success) {
      setFriendRequests(response?.data?.data)
    }

  }


  const handleAddFriends = async () => {
    setOpenAddFriendDialog(true);
  }


  useEffect(() => {
    if (user) {
      fetchUsers()
      fetchAllFriendRequests()
    }
  }, [keyword])

  useMemo(() => {
    if (!socket) {
      connectSocket()
    }
  }, [])

  useMemo(() => {
    if (socket) {
      const userId = user?._id
      socket?.emit('join-room', userId)
    }
  }, [socket])

  useEffect(() => {

    socket?.on("message", (msg) => {
      console.log(msg);
    })

    socket?.on('receive-friend-request', (user) => {
      setFriendRequests(prev => [...prev, user])
    })

    return () => { socket?.off("meesdkgnosdjgvbnjki"); }

  }, [socket])



  let tempUsers = users?.filter(userItem => {
    return !friendRequests?.some(request => request?.receiver?._id === userItem?._id || request?.sender?._id === userItem?._id);
  });



  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="w-full flex bg-white px-4 py-2 justify-between items-center border">
        <div className="flex justify-center items-center gap-4">
          <Menu className={`lg:hidden ${location.pathname.includes('group') ? 'hidden' : ""}`} onClick={() => { setOpenChatSheet(true) }} />
          <div className="flex items-center gap-2" onClick={()=>{
            navigate("/chats/chat")
          }}>
            <div className="h-[50px] w-[50px]  rounded-full">
              <img className="rounded-full object-cover object-center w-full h-full" src={user?.image} alt="profile" />
            </div>
            <p className="md:text-xl text-[16px] text-amber-500  font-bold">
              Chit-Chat
            </p>
          </div>
        </div>
        <div className="flex  bg-gray-50 py-3 px-5 rounded-3xl gap-5 border-1">
          <div><Bell onClick={() => { setOpenNotificationDialog(true) }} strokeWidth={1.3} className="hover:text-[DarkOrange] cursor-pointer" /></div>
          <div><UserPlus onClick={handleAddFriends} strokeWidth={1.3} className="hover:text-[DarkOrange] cursor-pointer" /></div>
          <div><Users onClick={createGroup} strokeWidth={1.3} className="hover:text-[DarkOrange] cursor-pointer" /></div>
          <div><LogOut strokeWidth={1.3} onClick={handleLogOut} className="hover:text-[DarkOrange] cursor-pointer" /></div>
        </div>
      </header>
      <div className="flex flex-grow overflow-hidden">
        <div className="flex w-full h-full rounded-2xl">
          <Outlet />
        </div>
      </div>
      <AddFriendDialog
        handleAddFriends={handleAddFriends}
        openAddFriendDialog={openAddFriendDialog}
        setOpenAddFriendDialog={setOpenAddFriendDialog}
        keyword={keyword}
        setKeyword={setKeyword}
        tempUsers={tempUsers.length > 0 ? tempUsers : []}
        setUsers={setUsers}
        users={users}
      />
      <NotificationDiag
        openNotificationDialog={openNotificationDialog}
        setOpenNotificationDialog={setOpenNotificationDialog}
        friendRequests={friendRequests}
        setFriendRequests={setFriendRequests}
      />
      <ChatMenu openChatSheet={openChatSheet} setOpenChatSheet={setOpenChatSheet} />

    </div>
  )
}

export default ChatLayout
