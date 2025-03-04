const express = require("express")
const cors = require("cors")
const { createServer } = require("node:http")
const { Server } = require("socket.io")
const connectToDb = require("./DbConnection")
const authRouter = require("./routes/auth-route")
const messageRouter=require('./routes/message-routes')
const chatRouter=require("./routes/chats-routes")
const friendRequestRouter=require("./routes/friend-request-route.js")
const searchRouter=require("./routes/search-users-route")



const PORT = 3000;
const uri = "mongodb+srv://mohith:mohith%40123@cluster0.eq57s.mongodb.net/";

connectToDb(uri);

const app = express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    allowedHeaders:["Content-Type", "Authorization"]
}))

app.use(express.json())

const server=createServer(app);

app.get("/",(req,res)=>{
    res.status(200).json({
        success:"Hello World"
    })
})

 
app.use("/api/auth",authRouter);

app.use("/api/friend-request",friendRequestRouter);

app.use("/api/message",messageRouter);

app.use("/api/chat",chatRouter);

app.use("/api/search",searchRouter);

const io=new Server(server,{
    cors:{
        origin:process.env.CLIENT_URL
    }
})

io.on("connection",(socket)=>{ 
    console.log("connected to socket successfully")

    socket.on('join-room',(room)=>{
        socket.join(room); 
        socket.emit("message","joined on load")
    })

    socket.on('join-chat',(room)=>{
        socket.join(room); 
        socket.emit("message","joined the chat")
    })

    socket.on("send-friend-request",(receiver,request)=>{ 
        socket.to(receiver).emit('receive-friend-request',request)
    })
    
    socket.on('send-message',(message,id)=>{
        socket.to(id).emit("receive-message",message)
    })

    socket.on('friend-request-accept',(user,id)=>{
        socket.to(id).emit('add-to-chat',user);
    })

})

server.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);  
})  