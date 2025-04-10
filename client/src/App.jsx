import { Route, Routes, useNavigate } from "react-router-dom"
import AuthLayout from "./components/auth/AuthLayout"
import Login from "./pages/auth-pages/Login"
import Register from "./pages/auth-pages/Register"
import WelcomePanel from "./components/common/WelcomePanel"
import CheckAuth from "./components/common/CheckAuth"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuthUser } from "./store/auth-slice"
import ChatLayout from "./components/chat/ChatLayout"
import Chats from "./pages/chat-pages/Chats"
import CreateGroup from "./pages/chat-pages/CreateGroup"
import "./App.css"





function App() {

  const dispatch = useDispatch();
  const navigate=useNavigate()
  
  const { user , isAuthorized , isLoading } = useSelector(state => state.auth);

  const token = localStorage.getItem("token");

  useEffect(()=>{
    if (token) {
      dispatch(checkAuthUser(token)).then((data)=>{
        if(data?.payload?.success){
          navigate("/chats/chat");
        }else(
          navigate("/home")
        )
        return
      })
    }
    navigate("/home")
    
  },[token])


  if(isLoading){
    console.log("loading")
    return <div>isLoading</div>
  }

  return (
    <div className="overflow-hidden ">
      <Routes>
        
        <Route path="/home" element={
            <WelcomePanel />
        } />
        <Route path="/auth/*" element={
          <CheckAuth user={user} isAuthorized={isAuthorized}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/chats/*" element={
          <CheckAuth user={user} isAuthorized={isAuthorized}>
            <ChatLayout />
          </CheckAuth>
        }>
          <Route path="chat" element={<Chats/>}/>
          <Route path="group" element={<CreateGroup/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
