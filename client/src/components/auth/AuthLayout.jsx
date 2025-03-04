import { Outlet } from "react-router-dom"


function AuthLayout() {
  return (
    <div className="flex h-screen w-screen">
      <div className= "  w-[50%] lg:flex flex-col items-center justify-center hidden ">
        <div className="w-[500px] h-[500px]">
          <img 
           src="https://thumbs.dreamstime.com/b/virtual-meeting-online-teamwork-woman-man-having-video-chat-discuss-work-issues-illustration-people-scene-virtual-meeting-339391456.jpg" 
           alt="welcome"  
           />
        </div>
        <h1 className="font-bold text-4xl text-yellow-400">Chit-Chat</h1>
      </div>
      <div className="flex items-center justify-center lg:w-1/2 w-full ">
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthLayout

