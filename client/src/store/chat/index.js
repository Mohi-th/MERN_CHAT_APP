import { createSlice } from "@reduxjs/toolkit";


const initialState={
    chats:[],
    messages:[],
    chatId:''
};

const chatSlice=createSlice({
    initialState,
    name:"chatSlice",
    reducers:{
        setChatss:(state,action)=>{
            state.chats=action.payload;
        },
        setMessages:(state,action)=>{
            state.messages=action.payload;
        },
        setChatId:(state,action)=>{
            state.chatId=action.payload;
        }

    }
})

export const { setChatss ,setMessages,setChatId} = chatSlice.actions;
export default chatSlice.reducer