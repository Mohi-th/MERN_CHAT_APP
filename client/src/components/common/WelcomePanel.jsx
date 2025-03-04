import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"


function WelcomePanel() {

    const navigator=useNavigate();

    return (
        <div className="flex h-screen justify-center">
            <div className="  w-1/2  flex-col items-center justify-center hidden md:flex">
                <div className="w-[500px] h-[500px]">
                    <img
                        src="https://thumbs.dreamstime.com/b/virtual-meeting-online-teamwork-woman-man-having-video-chat-discuss-work-issues-illustration-people-scene-virtual-meeting-339391456.jpg"
                        alt="welcome"
                    />
                </div>
                <h1 className="font-bold text-4xl text-yellow-400">Chit-Chat</h1>
            </div>
            <div className="flex items-center justify-center w-full md:w-1/2 px-5">
                <div className="w-[500px] ">
                    <p className="text-center ">
                    A chat application enables real-time messaging and multimedia sharing between users. It offers features like user authentication, group chats, and notifications for seamless communication.
                    </p>
                    <Button 
                    onClick={()=>{
                        navigator("/auth/register")
                    }} 
                    className='bg-amber-400 w-full mt-6 ' 
                    varient="outline">
                        Get Started 
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WelcomePanel
